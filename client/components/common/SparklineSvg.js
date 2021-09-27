import React, { useRef, useEffect, useState, createRef } from 'react';

import styled from 'styled-components';
const StyleSvg = styled.svg`
   position: relative;
   transform: rotateX(180deg);
   width: 200px;
   height: 48px;

   transition: all .3s;
   &:hover{
      // transform: rotateX(180deg) scale(1.5);
      z-index: 1;

      polyline{
         stroke-width: 2px;       
      }
   }
`;
const StylePolyline = styled.polyline`
   stroke-width: 1px; 
   fill: none;
   transition: all .3s;
  
`;
const StylePolygon = styled.polygon`
   stroke: transparent;
`;

const standardNumber = 1000;
const Sparkline2 = ({ id, data, percentage7d }) => {

   let min = Math.min(...data);
   let plist = data.map(e => e * (standardNumber / min));
   let minInList = Math.min(...plist);

   const filtered = plist.filter((e, i) => i % 1 === 0).map(e => e - minInList);
   const linePoints = filtered.map((e, i) => `${i},${e}`);
   const max = Math.max(...filtered);

   const color = percentage7d > 0 ? 'rgba(220,38,38,1)' : 'rgba(37,99,235,1)';
   const backColor = percentage7d > 0 ? 'rgb(255 178 178 / 30%)' : 'rgb(145 179 253 / 30%)';

   return (
      <StyleSvg viewBox={`0 0 ${filtered.length} ${max}`} preserveAspectRatio="none">
         <defs>
            <linearGradient id={`grad_${id}`} x2="0" y2="1">
               <stop offset="0" stopColor="#fff" />
               <stop offset="1" stopColor={backColor} />
            </linearGradient>
         </defs>
         <StylePolyline points={linePoints.join(' ')}
            style={{ stroke: color }} />
         <StylePolygon points={`0,0 ${linePoints} ${filtered.length},0 `}
            style={{ fill: `url(#${`grad_${id}`})` }}
         />
      </StyleSvg>
   )
}

export default Sparkline2;