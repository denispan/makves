import {CustomDotProps} from '../../types/common.ts';
import * as React from 'react';
import {COLORS} from '../../constants.ts';

const CustomDot: React.FC<CustomDotProps> = (props) => {
  const { cx, cy, payload, dataKey, isActive } = props;
  if (!cx || !cy || !payload) return null;

  const zScore = dataKey === 'pv' ? payload.pvZScore : payload.uvZScore;
  const defaultColor = dataKey === 'pv' ? COLORS.purple : COLORS.blue;
  const color = Math.abs(zScore || 0) > 1 ? COLORS.red : defaultColor;

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
