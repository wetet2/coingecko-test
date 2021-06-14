import React, { useRef, useEffect, useState, createRef } from 'react';

import styled from 'styled-components';

const Canvas = styled.canvas`
   width: 100%;
   height: 48px;

   // width: 150px;
   // height: 150px;
   // border: 1px solid gold;
`;

let EXCHANGE = 1116.59;


const Sparkline = ({ data, percentage7d }) => {
   const refCanvas = useRef();

   useEffect(() => {

      let dataArr = data.map(e => e * EXCHANGE);
      
      let canvas = refCanvas.current;
      let style = getComputedStyle(canvas);
      canvas.width = parseInt(style.width.replace('px', ''));
      canvas.height = parseInt(style.height.replace('px', ''));
      const ctx = canvas.getContext('2d');

      let w = canvas.width;
      let h = canvas.height;

      let min;
      let max = 0;
      let xTick = w / (dataArr.length + 2);

      dataArr.forEach(e => {
         if (!min || e < min) min = e;
         if (e > max) max = e;
      })
      min = Math.round(min * 0.9);
      max = Math.round(max * 1.1);

      ctx.strokeStyle = percentage7d > 0 ? 'rgba(220,38,38,1)' : 'rgba(37,99,235,1)';
      for (let i = 0; i < dataArr.length; i++) {
         if (i === dataArr.length - 1) continue;
         let c1 = dataArr[i];
         let c2 = dataArr[i + 1];
         let y1 = Math.round((max - c1) / (max - min) * h);
         let y2 = Math.round((max - c2) / (max - min) * h);
         
         ctx.beginPath();
         ctx.moveTo((i + 1) * xTick, y1);
         ctx.lineTo((i + 2) * xTick, y2);
         ctx.stroke();
      }
   }, [])

   return (
      <Canvas ref={refCanvas}></Canvas>
   )
}

export default Sparkline;