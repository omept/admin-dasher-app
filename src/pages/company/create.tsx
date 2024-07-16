import { Form, Input, Modal, Select } from "antd";
import CompanyList from "./list";
import { useModalForm, useSelect } from "@refinedev/antd";
import { useGo } from "@refinedev/core";
import { CREATE_COMPANY_MUTATION } from "@/graphql/mutations";
import { USERS_SELECT_QUERY } from "@/graphql/quaries";
import { SelectOptionWithAvatar } from "@/components";
import { User } from "@/graphql/schema.types";

const CompanyCreate = () => {
  const go = useGo();

  const goToRoutePage = () => {
    go({
      to: {
        resource: "companies",
        action: "list",
      },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });
  };

  const { formProps, modalProps } = useModalForm({
    action: "create",
    defaultVisible: true,
    resource: "companies",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: goToRoutePage,
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION,
    },
  });

  const { selectProps, queryResult } = useSelect({
    resource: "users",
    optionLabel: "name",
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });

  return (
    <>
      <CompanyList>
        <Modal
          {...modalProps}
          title="Create Company"
          mask={true}
          onCancel={goToRoutePage}
          width={512}
        >
          <Form {...formProps} layout="vertical">
            <Form.Item
              label="Company Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please enter company name" />
            </Form.Item>
            <Form.Item
              label="Sales Owner"
              name="salesOwnerId"
              rules={[{ required: true }]}
            >
              <Select
                {...selectProps}
                placeholder="Please select a sales owner"
                options={queryResult?.data?.data?.map((userEntry) => {
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
                })}
              />
            </Form.Item>
          </Form>
        </Modal>
      </CompanyList>
    </>
  );
};

export default CompanyCreate;
