import { CalendarOutlined } from "@ant-design/icons";
import { Badge, Card, List } from "antd";
import { Text } from "../text";
import UpcomingEventsSkeleton from "../skeleton/upcoming-events";
import { getDate } from "@/utilities/helpers";
import { useList } from "@refinedev/core";
import { DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY } from "@/graphql/quaries";

const UpcomingEvents = () => {
  const { data, isLoading } = useList({
    resource: "events",
    pagination: {
      pageSize: 4,
    },
    sorters: [{ field: "startDate", order: "asc" }],
    filters: [
      {
        field: "startDate",
        operator: "gte",
        value: "2024-04-01",
      },
    ],
    meta: {
      gqlQuery: DASHBORAD_CALENDAR_UPCOMING_EVENTS_QUERY,
    },
  });

  // alert(dayjs().subtract(1, "year").format("YYYY-MM-DD"));
  return (
    <>
      <Card
        style={{ height: "100%" }}
        styles={{
          header: { padding: "8px, 16px" },
          body: { padding: "0 1rem" },
        }}
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <CalendarOutlined />
            <Text size="sm" style={{ marginLeft: "0.7rem" }}>
              Upcoming Event
            </Text>
          </div>
        }
      >
        {isLoading ? (
          <List
            itemLayout="horizontal"
            dataSource={Array.from({ length: 5 }).map((_, index) => ({
              id: index,
            }))}
            renderItem={() => <UpcomingEventsSkeleton />}
          ></List>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={data?.data ?? []}
            renderItem={(item) => {
              const renderDate = getDate(item.startDate, item.endDate);
              return (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Badge color={item.color} />}
                    title={<Text size="xs">{renderDate}</Text>}
                    description={<Text ellipsis={{ tooltip: true }}></Text>}
                  />
                  {item.title}
                </List.Item>
              );
            }}
          ></List>
        )}
        {!isLoading && data?.data?.length === 0 ? (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "220px ",
            }}
          >
            No Upcoming Events
          </span>
        ) : (
          <span></span>
        )}
      </Card>
    </>
  );
};

export default UpcomingEvents;
