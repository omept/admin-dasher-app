import { UnorderedListOutlined } from "@ant-design/icons";
import { Card, List, Space } from "antd";
import { Text } from "../text";
import LatestActivitiesSkeleton from "../skeleton/latest-activities";
import { useList } from "@refinedev/core";
import {
  DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
  DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
} from "@/graphql/quaries";
import dayjs from "dayjs";
import CustomAvatar from "../custom-avatar";

const DashboardLatestActivities = () => {
  //   const isLoading = false;
  const {
    data: audit,
    isLoading: isLoadingAudits,
    isError,
    error,
  } = useList({
    resource: "audits",
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    },
  });

  const dealsIds = audit?.data.map((audit) => audit.targetId);
  const { data: deals, isLoading: isLoadingDeals } = useList({
    resource: "deals",
    queryOptions: { enabled: !!dealsIds?.length },
    pagination: {
      mode: "off",
    },
    filters: [
      {
        field: "id",
        operator: "in",
        value: dealsIds,
      },
    ],
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
    },
  });

  if (isError) {
    console.log(error);
    return null;
  }

  return (
    <Card
      styles={{
        header: {
          padding: "16px",
        },
        body: {
          padding: "0 1rem",
        },
      }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <UnorderedListOutlined />
          <Text size="sm" style={{ marginLeft: "0.5rem" }}>
            Latest Activities
          </Text>
        </div>
      }
    >
      {isLoadingDeals || isLoadingAudits ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, i) => {
            return { id: i };
          })}
          renderItem={(_, i) => {
            return <LatestActivitiesSkeleton key={i} />;
          }}
        />
      ) : (
        <List
          dataSource={audit?.data}
          itemLayout="horizontal"
          renderItem={(item) => {
            const deal = deals?.data.find((deal) => deal.id == item.targetId);
            if (deal == undefined) {
              return <></>;
            }
            return (
              <List.Item>
                <List.Item.Meta
                  title={dayjs(deal?.createdAt).format("MMM DD, YYYY - HH:MM")}
                  avatar={
                    <CustomAvatar
                      shape="square"
                      size={48}
                      src={deal?.company?.avatarUrl}
                      name={deal?.company?.name}
                    />
                  }
                  description={
                    <Space size={4}>
                      <Text strong> {item?.user?.name ?? "Unkwown Staff"}</Text>
                      <Text>
                        {item.action === "CREATE" ? "created" : "moved"}
                      </Text>
                      <Text strong> {deal?.title} </Text>
                      <Text> deal</Text>
                      <Text>{item.action === "CREATE" ? "in" : "to"}</Text>
                      <Text strong> {deal?.stage?.title} </Text>
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
};

export default DashboardLatestActivities;
