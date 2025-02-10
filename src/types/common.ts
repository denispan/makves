export interface DataPoint {
  name: string;
  uv: number;
  pv: number;
  amt: number;
  uvZScore?: number;
  pvZScore?: number;
}

export interface CustomDotProps {
  cx?: number;
  cy?: number;
  payload?: DataPoint;
  dataKey: 'pv' | 'uv';
  isActive?: boolean;
}
