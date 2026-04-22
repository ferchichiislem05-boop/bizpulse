export interface RevenueData {
  month: string;
  revenue: number;
  target: number;
  expenses: number;
}

export interface Department {
  id: string;
  name: string;
  budget: number;
  actual: number;
  headcount: number;
  color: string;
}

export interface Anomaly {
  id: string;
  type: 'overspend' | 'miss' | 'spike';
  severity: 'high' | 'medium' | 'low';
  department: string;
  message: string;
  amount: number;
  delta: string;
  month: string;
}

export interface KPI {
  id: string;
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  iconName: string;
}
