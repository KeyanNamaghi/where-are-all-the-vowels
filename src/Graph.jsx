import React from "react";
import { ResponsiveLine } from "@nivo/line";

const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
    xScale={{ type: "linear" }}
    yScale={{ type: "linear", min: 0, max: 100 }}
    curve="monotoneX"
    axisTop={null}
    axisRight={{
      tickValues: [0, 20, 40, 60, 80, 100],
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: ".2s",
      legend: "",
      legendOffset: 0
    }}
    axisLeft={{
      tickValues: [0, 20, 40, 60, 80, 100],
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      format: ".2s",
      legend: "percentage",
      legendOffset: -40,
      legendPosition: "middle"
    }}
    enableGridX={false}
    colors={["#ffffff", "#f00000"]}
    lineWidth={1}
    pointSize={4}
    pointColor={{ theme: "background" }}
    pointBorderWidth={1}
    pointBorderColor={{ from: "serieColor" }}
    enablePointLabel={false}
    pointLabel="y"
    pointLabelYOffset={-12}
    useMesh={true}
    gridXValues={[0, 20, 40, 60, 80, 100, 120]}
    gridYValues={[]}
    legends={[
      {
        itemTextColor: "#ffffff",
        anchor: "right",
        direction: "column",
        justify: false,
        translateX: 140,
        translateY: 0,
        itemsSpacing: 2,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 12,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1
            }
          }
        ]
      }
    ]}
  />
);

export default MyResponsiveLine;
