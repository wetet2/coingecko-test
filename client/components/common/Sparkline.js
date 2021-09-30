import React, { useRef, useEffect, useState, createRef } from "react";

import styled from "styled-components";

const canvasWidth = 190;
const canvasHeight = 40;
const Canvas = styled.canvas`
  width: ${canvasWidth}px;
  height: ${canvasHeight}px;
  transform: rotateX(180deg);
`;

const Sparkline = ({ data, percentage7d }) => {
  const refCanvas = useRef();

  useEffect(() => {
    let canvas = refCanvas.current;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");

    const min = Math.min(...data);
    const max = Math.max(...data);
    const gap = max - min;
    let xTick = canvasWidth / data.length;

    let color = percentage7d > 0 ? "rgba(220,38,38,1)" : "rgba(37,99,235,1)";
    let backColor =
      percentage7d > 0 ? "rgba(220,38,38,0.7)" : "rgba(37,99,235,0.7)";
    ctx.strokeStyle = color;

    const linePoints = [];
    for (let i = 0; i < data.length; i++) {
      if (i === data.length - 1) continue;
      let value = data[i];
      let nextValue = data[i + 1];
      let y1 = Math.round(((value - min) / gap) * canvasHeight);
      let y2 = Math.round(((nextValue - min) / gap) * canvasHeight);

      let x1 = i * xTick;
      let x2 = (i + 1) * xTick;
      if (linePoints.length === 0) {
        linePoints.push({ x: x1, y: y1 });
      }
      linePoints.push({ x: x2, y: y2 });

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    /** polygon and fill **/
    let grd = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    grd.addColorStop(0, "#fff");
    grd.addColorStop(1, backColor);
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(linePoints[0].x, linePoints[0].y);
    ctx.stroke();

    linePoints.forEach((p, i) => ctx.lineTo(p.x, p.y));
    ctx.lineTo(
      linePoints[linePoints.length - 1].x,
      linePoints[linePoints.length - 1].y
    );
    ctx.lineTo(canvasWidth, 0);
    ctx.closePath();
    ctx.fill();

  }, []);

  return <Canvas ref={refCanvas}></Canvas>;
};

export default Sparkline;
