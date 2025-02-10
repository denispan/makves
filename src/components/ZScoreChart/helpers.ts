import {DataPoint} from '../../types/common.ts';

export const calculateZScores = (values: number[]): number[] => {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);
  return values.map(value => (value - mean) / stdDev);
};

export const createGradientStops = (data: DataPoint[], key: 'pv' | 'uv', zScoreKey: 'pvZScore' | 'uvZScore') => {
  const stops: { offset: string; color: string }[] = [];
  const totalPoints = data.length - 1;
  const defaultColor = key === 'pv' ? '#8884d8' : '#82ca9d';

  // Add initial stop
  const firstZScore = data[0][zScoreKey] || 0;
  stops.push({
    offset: '0%',
    color: Math.abs(firstZScore) > 1 ? '#ff0000' : defaultColor
  });

  // Add stops for transitions between points
  for (let i = 1; i < data.length; i++) {
    const percentage = (i / totalPoints) * 100;
    const prevZScore = data[i - 1][zScoreKey] || 0;
    const currentZScore = data[i][zScoreKey] || 0;
    const prevColor = Math.abs(prevZScore) > 1 ? '#ff0000' : defaultColor;
    const currentColor = Math.abs(currentZScore) > 1 ? '#ff0000' : defaultColor;

    // Only add transition stops if the color changes
    if (prevColor !== currentColor) {
      // Add two stops at the same position for sharp transition
      stops.push(
        {
          offset: `${percentage}%`,
          color: prevColor
        },
        {
          offset: `${percentage}%`,
          color: currentColor
        }
      );
    }
  }

  // Add final stop
  const lastZScore = data[data.length - 1][zScoreKey] || 0;
  stops.push({
    offset: '100%',
    color: Math.abs(lastZScore) > 1 ? '#ff0000' : defaultColor
  });

  return stops;
};
