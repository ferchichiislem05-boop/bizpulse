import type { RevenueData, Department, Anomaly, KPI } from '../types';

export const revenueData: RevenueData[] = [
  { month: 'Jan', revenue: 4_200_000, target: 4_800_000, expenses: 2_940_000 },
  { month: 'Feb', revenue: 4_850_000, target: 5_000_000, expenses: 3_250_000 },
  { month: 'Mar', revenue: 5_620_000, target: 5_400_000, expenses: 3_710_000 },
  { month: 'Apr', revenue: 5_890_000, target: 5_600_000, expenses: 3_830_000 },
  { month: 'May', revenue: 6_140_000, target: 5_800_000, expenses: 3_930_000 },
  { month: 'Jun', revenue: 4_320_000, target: 5_500_000, expenses: 3_110_000 },
  { month: 'Jul', revenue: 3_980_000, target: 5_200_000, expenses: 2_940_000 },
  { month: 'Aug', revenue: 4_150_000, target: 4_800_000, expenses: 2_960_000 },
  { month: 'Sep', revenue: 5_740_000, target: 5_600_000, expenses: 3_770_000 },
  { month: 'Oct', revenue: 6_280_000, target: 6_000_000, expenses: 4_010_000 },
  { month: 'Nov', revenue: 6_850_000, target: 6_200_000, expenses: 4_350_000 },
  { month: 'Dec', revenue: 5_940_000, target: 6_000_000, expenses: 3_870_000 },
];

export const departments: Department[] = [
  { id: 'sales',      name: 'Sales',           budget: 8_500_000,  actual: 9_200_000,  headcount: 82,  color: '#3B82F6' },
  { id: 'marketing',  name: 'Marketing',        budget: 4_200_000,  actual: 3_850_000,  headcount: 34,  color: '#8B5CF6' },
  { id: 'operations', name: 'Operations',       budget: 12_000_000, actual: 11_750_000, headcount: 156, color: '#06B6D4' },
  { id: 'technology', name: 'Technology',       budget: 6_800_000,  actual: 7_420_000,  headcount: 94,  color: '#F59E0B' },
  { id: 'hr',         name: 'Human Resources',  budget: 5_500_000,  actual: 5_180_000,  headcount: 121, color: '#10B981' },
];

export const anomalies: Anomaly[] = [
  {
    id: 'a1',
    type: 'overspend',
    severity: 'high',
    department: 'Technology',
    description:
      'Cloud infrastructure costs exceeded forecast by 34.2% in November. Unoptimised batch-processing jobs ran continuously on production-grade instances without auto-scaling limits, resulting in AED 618K in unbudgeted cloud spend.',
    amount: 618_000,
    delta: 34.2,
    date: 'Nov 2024',
  },
  {
    id: 'a2',
    type: 'overspend',
    severity: 'medium',
    department: 'Sales',
    description:
      'Q4 commission payouts exceeded the approved pool by 28.1% following an exceptional deal-closing sprint. Three enterprise contracts closed simultaneously in October, triggering a multi-tier accelerator payout not fully provisioned in the Q4 budget.',
    amount: 700_000,
    delta: 28.1,
    date: 'Oct–Nov 2024',
  },
  {
    id: 'a3',
    type: 'miss',
    severity: 'medium',
    department: 'Marketing',
    description:
      'Summer digital campaign ROI fell 22.5% below the quarterly KPI threshold during June–July. Audience conversion rates on paid channels dropped sharply, attributed to reduced engagement during peak UAE summer travel and a competitive bid environment.',
    amount: 350_000,
    delta: -22.5,
    date: 'Jun–Jul 2024',
  },
];

export const kpis: KPI[] = [
  {
    id: 'revenue',
    label: 'Total Revenue YTD',
    value: 'AED 63.96M',
    trend: 'up',
    trendValue: '+12.4%',
    iconName: 'DollarSign',
  },
  {
    id: 'margin',
    label: 'Gross Operating Margin',
    value: '33.3%',
    trend: 'up',
    trendValue: '+2.1 pp',
    iconName: 'Percent',
  },
  {
    id: 'clients',
    label: 'Active Clients',
    value: '142',
    trend: 'up',
    trendValue: '+8 clients',
    iconName: 'Users',
  },
  {
    id: 'headcount',
    label: 'Total Headcount',
    value: '487',
    trend: 'up',
    trendValue: '+23 hires',
    iconName: 'UserCheck',
  },
];

export function formatAED(value: number, short = false): string {
  if (short) {
    if (value >= 1_000_000) return `AED ${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000)     return `AED ${(value / 1_000).toFixed(0)}K`;
    return `AED ${value.toLocaleString('en-AE')}`;
  }
  return `AED ${value.toLocaleString('en-AE')}`;
}
