import CustomAvatar from "@/components/custom-avatar";
import { Text } from "@/components/text";
import { COMPANIES_LIST_QUERY } from "@/graphql/quaries";
import { Company } from "@/graphql/schema.types";
import { currencyNumber } from "@/utilities";
import { SearchOutlined } from "@ant-design/icons";
import {
  CreateButton,
  DeleteButton,
  EditButton,
  FilterDropdown,
  List,
  useTable,
} from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";
import { Input, Space, Table } from "antd";

const CompanyList = ({ children }: React.PropsWithChildren) => {
  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: "companies",
    pagination: {
      pageSize: 12,
    },
    onSearch: (values) => {
      const vals = values as Company;
      return [
        {
          field: "name",
          operator: "contains",
          value: vals.name,
        },
      ];
    },
    filters: {
      initial: [{ field: "name", operator: "contains", value: undefined }],
    },
    sorters: {
      initial: [{ field: "createdAt", order: "desc" }],
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });

  return (
    <div style={{ marginTop: "32px" }}>
      {children ? children : <></>}
      <List
        breadcrumb={false}
        headerButtons={() => {
          return (
            <CreateButton
              onClick={() =>
                go({
                  to: {
                    resource: "companies",
                    action: "create",
                  },
                  options: {
                    keepQuery: true,
                  },
                  type: "replace",
                })
              }
            />
          );
        }}
      >
        <Table
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
          }}
        >
          <Table.Column
            dataIndex="name"
            title="Company Name"
            defaultFilteredValue={getDefaultFilter("id", filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search Company" />
              </FilterDropdown>
            )}
            render={(value, recordEntry) => {
              const record: Company = recordEntry as unknown as Company;
              return (
                <Space>
                  <CustomAvatar
                    shape="square"
                    name={record.name}
                    src={record.avatarUrl}
                  />
                  <Text
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    {record.name}
                  </Text>
                </Space>
              );
            }}
          />
          <Table.Column
            dataIndex="totalRevenue"
            title="Open Deals Amount"
            render={(value, companyEntry) => {
              const company: Company = companyEntry as unknown as Company;
              return (
                <Text
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {currencyNumber(
                    company?.dealsAggregate?.[0]?.sum?.value ?? 0
                  )}
                </Text>
              );
            }}
          />
          <Table.Column
            dataIndex="id"
            title="Actions"
            fixed="right"
            render={(value, company) => {
              return (
                <Space>
                  <EditButton hideText size="small" recordItemId={value} />
                  <DeleteButton hideText size="small" recordItemId={value} />
                </Space>
              );
            }}
          />
        </Table>
      </List>
    </div>
  );
};

export default CompanyList;
