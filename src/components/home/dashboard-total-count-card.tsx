import { totalCountVariants } from "@/constants";
import { Card, Skeleton } from "antd";
import { Text } from "../text";
import { Area, AreaConfig } from "@ant-design/plots";

type DashboardCardProp = {
  isLoading: boolean;
  resource: "contacts" | "deals" | "companies";
  totalCount: number;
};
const DashboardTotalCountCard = ({
  isLoading,
  resource,
  totalCount,
}: DashboardCardProp) => {
  const { primaryColor, secondaryColor, icon, title } =
    totalCountVariants[resource];

  const config: AreaConfig = {
    data: totalCountVariants[resource].data,
    xField: "index",
    yField: "value",
    appendPadding: [1, 0, 0, 0],
    padding: 0,
    syncViewPadding: true,
    autoFit: true,
    tooltip: false,
    xAxis: false,
    animation: false,
    yAxis: {
      tickCount: 12,
      label: {
        style: {
          stroke: "transparent",
        },
      },
      grid: {
        line: {
          style: {
            stroke: "transparent",
          },
        },
      },
    },
    smooth: true,
    line: {
      color: primaryColor,
    },
    areaStyle: () => {
      return {
        fill: `l(270) 0:#fff 0.2${secondaryColor} 1:${primaryColor}`,
      };
    },
  };
  return (
    <Card
      style={{ height: "93px", padding: "0" }}
      styles={{
        body: {
          padding: "8px 8px 8px 12px",
        },
      }}
      size="small"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      >
        {icon}
        <Text
          size="md"
          className="secondary"
          style={{
            marginLeft: "8px",
          }}
        >
          {title}
        </Text>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Text
          size="xxxl"
          strong
          style={{
            flex: 1,
            whiteSpace: "nowrap",
            textAlign: "start",
            marginRight: "48px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {isLoading ? (
            <Skeleton.Button
              style={{
                marginTop: "8px",
                width: "74px",
              }}
            ></Skeleton.Button>
          ) : (
            totalCount
          )}
        </Text>
        <Area
          {...config}
          style={{
            width: "50%",
          }}
        />
      </div>
    </Card>
  );
};

export default DashboardTotalCountCard;
