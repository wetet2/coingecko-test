import React from 'react';
import utils from '../../utils';
import * as C from './Common.style';

export const PercentRenderer = ({ value, style = {} }) => {
   return <C.Percent className={value < 0 ? 'falling' : 'rising'}>{value?.toFixed(2) + '%'}</C.Percent>;
}

export const AmountRenderer = ({ row, col, value }) => {
   return utils.comma3Digits(value);
}