import React from "react";
import CompanyList from "./list";
import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { UPDATE_COMPANY_MUTATION } from "@/graphql/mutations";
import CustomAvatar from "@/components/custom-avatar";
import { getNameInitials } from "@/utilities";
import { User } from "@/graphql/schema.types";
import { SelectOptionWithAvatar } from "@/components";
import { USERS_SELECT_QUERY } from "@/graphql/quaries";
import {
  businessTypeOptions,
  companySizeOptions,
  industryOptions,
} from "@/constants";
import { CompanyContactsTable } from "./contacts-table";

const CompanyEdit = () => {
  const { formProps, saveButtonProps, formLoading, queryResult } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });

  const { avatarUrl, name } = queryResult?.data?.data ?? {};
  const { selectProps, queryResult: usersSelectQueryResult } = useSelect({
    resource: "users",
    optionLabel: "name",
    pagination: { mode: "off" },
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });
  console.log({ formProps });
  return (
    <div style={{ marginTop: "32px" }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
          >
            <Form {...formProps} layout="vertical">
              <CustomAvatar
                shape="square"
                src={avatarUrl}
                name={getNameInitials(name ?? "")}
                style={{ width: "96px", height: "96px", marginBottom: "24px" }}
              />

              <Form.Item
                label="Sales Owner"
                name="salesOwnerId"
                initialValue={formProps?.initialValues?.salesOwner?.id}
              >
                <Select
                  {...selectProps}
                  placeholder="Please select a sales owner"
                  options={usersSelectQueryResult?.data?.data?.map(
                    (userEntry) => {
                      const user = userEntry as User;
                      return {
                        value: user.id,
                        label: (
                          <SelectOptionWithAvatar
                            name={user.name}
                            avatarUrl={user.avatarUrl ?? undefined}
                          />
                        ),
                      };
                    }
                  )}
                />
              </Form.Item>
              <Form.Item label="Company Size">
                <Select options={companySizeOptions}></Select>
              </Form.Item>
              <Form.Item label="Total Revenue">
                <InputNumber
                  autoFocus
                  addonBefore="$"
                  min={0}
                  placeholder="0.00"
                />
              </Form.Item>
              <Form.Item label="Industry" name="industry">
                <Select options={industryOptions}></Select>
              </Form.Item>
              <Form.Item label="Business Type" name="businessType">
                <Select options={businessTypeOptions}></Select>
              </Form.Item>
              <Form.Item label="Country" name="country">
                <Input placeholder="Country"></Input>
              </Form.Item>
              <Form.Item label="Website" name="website">
                <Input placeholder="Country"></Input>
              </Form.Item>
            </Form>
          </Edit>
        </Col>
        <Col xs={24} xl={12}>
          <CompanyContactsTable />
        </Col>
      </Row>
    </div>
  );
};

export default CompanyEdit;
