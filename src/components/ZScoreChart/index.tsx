import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import * as React from 'react';
import {useMemo} from 'react';
import {data} from '../../mocks/data.ts';
import CustomLegend from '../CustomLegend';
import {calculateZScores, createGradientStops} from './helpers.ts';
import CustomDot from '../CustomDot';
import {CHARTS} from '../../constants.ts';

const ZScoreChart: React.FC = ()=> {
  const enrichedData = useMemo(() => {
    const pvValues = data.map(d => d.pv);
    const uvValues = data.map(d => d.uv);
    const pvZScores = calculateZScores(pvValues);
    const uvZScores = calculateZScores(uvValues);

    return data.map((item, index) => ({
      ...item,
      pvZScore: pvZScores[index],
      uvZScore: uvZScores[index],
    }));
  }, []);

  const pvStops = createGradientStops(enrichedData, CHARTS.pv, 'pvZScore');
  const uvStops = createGradientStops(enrichedData, CHARTS.uv, 'uvZScore');

  return (
    <ResponsiveContainer width="95%" height={600} >
      <LineChart data={enrichedData} margin={{ top: 100 }}>
        <defs>
          <linearGradient id="pvGradient" x1="0" y1="0" x2="1" y2="0">
            {pvStops.map((stop, index) => (
              <stop
                key={index}
                offset={stop.offset}
                stopColor={stop.color}
              />
            ))}
          </linearGradient>
          <linearGradient id="uvGradient" x1="0" y1="0" x2="1" y2="0">
            {uvStops.map((stop, index) => (
              <stop
                key={index}
                offset={stop.offset}
                stopColor={stop.color}
              />
            ))}
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend content={<CustomLegend />} verticalAlign="bottom" height={36} />
        <Line
          type="monotone"
          dataKey={CHARTS.pv}
          stroke="url(#pvGradient)"
          dot={<CustomDot dataKey={CHARTS.pv} />}
          activeDot={<CustomDot dataKey={CHARTS.pv} isActive />}
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey={CHARTS.uv}
          stroke="url(#uvGradient)"
          dot={<CustomDot dataKey={CHARTS.uv} />}
          activeDot={<CustomDot dataKey={CHARTS.uv} isActive />}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default ZScoreChart;
