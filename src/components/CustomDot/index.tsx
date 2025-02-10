import {CustomDotProps} from '../../types/common.ts';
import * as React from 'react';

const CustomDot: React.FC<CustomDotProps> = (props) => {
  const { cx, cy, payload, dataKey, isActive } = props;
  if (!cx || !cy || !payload) return null;

  const zScore = dataKey === 'pv' ? payload.pvZScore : payload.uvZScore;
  const defaultColor = dataKey === 'pv' ? '#8884d8' : '#82ca9d';
  const color = Math.abs(zScore || 0) > 1 ? '#ff0000' : defaultColor;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={isActive ? 8 : 4}
      fill={color}
    />
  );
};

export default CustomDot
