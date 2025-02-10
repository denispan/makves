import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

interface DataPoint {
  name: string;
  uv: number;
  pv: number;
  uvZScore?: number;
  pvZScore?: number;
}

const data: DataPoint[] = [
  { name: "Page A", uv: 4000, pv: 2400 },
  { name: "Page B", uv: 3000, pv: 1398 },
  { name: "Page C", uv: 2000, pv: 9800 },
  { name: "Page D", uv: 2780, pv: 3908 },
  { name: "Page E", uv: 1890, pv: 4800 },
  { name: "Page F", uv: 2390, pv: 3800 },
  { name: "Page G", uv: 3490, pv: 4300 },
];

// Calculate z-score for an array of numbers
const calculateZScores = (values: number[]): number[] => {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
  const stdDev = Math.sqrt(variance);
  return values.map(value => (value - mean) / stdDev);
};

const createGradientStops = (data: DataPoint[], key: 'pv' | 'uv', zScoreKey: 'pvZScore' | 'uvZScore') => {
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

interface CustomActiveDotProps {
  cx?: number;
  cy?: number;
  payload?: DataPoint;
  dataKey: 'pv' | 'uv';
}

const CustomActiveDot = (props: CustomActiveDotProps) => {
  const { cx, cy, payload, dataKey } = props;
  if (!cx || !cy || !payload) return null;

  const zScore = dataKey === 'pv' ? payload.pvZScore : payload.uvZScore;
  const defaultColor = dataKey === 'pv' ? '#8884d8' : '#82ca9d';
  const color = Math.abs(zScore || 0) > 1 ? '#ff0000' : defaultColor;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={8}
      fill={color}
    />
  );
};

export default function ZScoreLineChart() {
  // Calculate z-scores for both series
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

  const pvStops = createGradientStops(enrichedData, 'pv', 'pvZScore');
  const uvStops = createGradientStops(enrichedData, 'uv', 'uvZScore');

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={enrichedData} margin={{ top: 20 }}>
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
        <Legend />
        <Line
          type="monotone"
          dataKey="pv"
          stroke="url(#pvGradient)"
          dot={{ fill: '#000000' }}
          activeDot={<CustomActiveDot dataKey="pv" />}
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="url(#uvGradient)"
          dot={{ fill: '#000000' }}
          activeDot={<CustomActiveDot dataKey="uv" />}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
