import React, { useRef, useEffect, useState, createRef } from "react";
import { ResponsiveLine, Line } from "@nivo/line";
import styled from "styled-components";
import { get } from "lodash/fp";

const StyledTooltip = styled.div`
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #888;
  background: #fff;
  padding: 8px;
`;

const NivoLine = ({ data }) => {

  const min = React.useMemo(() => Math.min(...data), [data]);
  const max = React.useMemo(() => Math.max(...data), [data]);
  const divideVal = (max - min) / 300;
  const plist = data.map((e) => (e - min) / divideVal);

  const chartData = [
    {
      id: "sparkline",
      data: plist.map((e, i) => ({
        x: i + 1,
        y: e,
      })),
    },
  ];

  const lineColor = "rgb(37, 99, 235)";

  return (
    <div style={{ height: 300 }}>
      <ResponsiveLine
        margin={{ top: 12, right: 0, bottom: 12, left: 0 }}
        data={chartData}
        colors={lineColor}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableSlices={"x"}
        enableArea={true}
        yScale={{
          type: "linear",
          stacked: true,
        }}
        enablePoints={false}
        enableGridX={false}
        enableGridY={false}
        sliceTooltip={({ slice }) => {
          return (
            <StyledTooltip>
              ${" "}
              {Number(
                parseInt(get("points[0].data.y")(slice))
              ).toLocaleString()}
            </StyledTooltip>
          );
        }}
        legends={[]}
        defs={[
          {
            id: "gradientC",
            type: "linearGradient",
            colors: [
              { offset: 0, color: lineColor },
              { offset: 100, color: "#ffffff" },
            ],
          },
        ]}
        fill={[{ match: "*", id: "gradientC" }]}
      />
    </div>
  );
};

export default NivoLine;
