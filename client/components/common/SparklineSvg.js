import React, { useRef, useEffect, useState, createRef } from "react";

import styled from "styled-components";

const svgWidth = 190;
const svgHeight = 40;

const StyleSvg = styled.svg`
  position: relative;
  width: ${svgWidth}px;
  height: ${svgHeight}px;
  transform: rotateX(180deg);

  transition: all 0.3s;
  &:hover {
    z-index: 1;
    polyline {
      stroke-width: 2px;
    }
  }
`;
const StylePolyline = styled.polyline`
  stroke-width: 1px;
  fill: none;
  transition: all 0.3s;
`;
const StylePolygon = styled.polygon`
  stroke: transparent;
`;

const interpolateArray = (data, fitCount) => {
  const linearInterpolate = (before, after, atPoint) =>
    before + (after - before) * atPoint;

  const newData = new Array();
  const springFactor = new Number((data.length - 1) / (fitCount - 1));
  newData[0] = data[0];
  for (var i = 1; i < fitCount - 1; i++) {
    var tmp = i * springFactor;
    var before = new Number(Math.floor(tmp)).toFixed();
    var after = new Number(Math.ceil(tmp)).toFixed();
    var atPoint = tmp - before;
    newData[i] = linearInterpolate(data[before], data[after], atPoint);
  }
  newData[fitCount - 1] = data[data.length - 1];
  return newData;
};

const SparklineSvg = ({ id, data, percentage7d }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const divideVal = (max - min) / svgHeight;
  let plist = data.map((e) => (e - min) / divideVal);

  let filtered = plist.filter((e, i) => i % 1 === 0);
  filtered = interpolateArray(filtered, svgWidth);
  const viewWidth = filtered.length;
  const linePoints = filtered.map((e, i) => `${i},${e}`).join(" ");

  const lineColor =
    percentage7d > 0 ? "rgba(220,38,38,1)" : "rgba(37,99,235,1)";
  const backColor =
    percentage7d > 0 ? "rgb(255 178 178 / 70%)" : "rgb(145 179 253 / 70%)";

  return (
    <StyleSvg viewBox={`0 0 ${viewWidth} ${svgHeight}`}>
      <defs>
        <linearGradient id={`grad_${id}`} x2="0" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor={backColor} />
        </linearGradient>
      </defs>
      <StylePolyline points={linePoints} style={{ stroke: lineColor }} />
      <StylePolygon
        points={`0,0 ${linePoints} ${viewWidth},0 `}
        style={{ fill: `url(#${`grad_${id}`})` }}
      />
    </StyleSvg>
  );
};

export default SparklineSvg;
