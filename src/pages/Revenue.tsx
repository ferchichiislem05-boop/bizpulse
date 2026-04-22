import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import { revenueData, formatAED } from '../data/mockData';
import ChartCard from '../components/ChartCard';

interface TooltipItem { value: number; name: string; color: string }

const RevenueTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: TooltipItem[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#0D1526',
      border: '1px solid #1A2744',
      borderRadius: 8,
      padding: '10px 14px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
    }}>
      <p style={{ color: '#8896B0', fontSize: 11.5, marginBottom: 8 }}>{label}</p>
      {payload.map(entry => (
        <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: entry.color, flexShrink: 0 }} />
          <span style={{ color: '#F0F4FF', fontSize: 12.5 }}>
            {entry.name}: <strong>{formatAED(entry.value, true)}</strong>
          </span>
        </div>
      ))}
    </div>
  );
};

const bestMonth  = revenueData.reduce((a, b) => a.revenue > b.revenue ? a : b);
const worstMonth = revenueData.reduce((a, b) => a.revenue < b.revenue ? a : b);
const totalRev   = revenueData.reduce((s, d) => s + d.revenue, 0);
const totalExp   = revenueData.reduce((s, d) => s + d.expenses, 0);
const avgMargin  = (((totalRev - totalExp) / totalRev) * 100).toFixed(1);

const statCards = [
  {
    label: 'Best Month',
    value: `${bestMonth.month} — ${formatAED(bestMonth.revenue, true)}`,
    sub: `AED ${((bestMonth.revenue - bestMonth.expenses) / 1_000_000).toFixed(2)}M net`,
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
  },
  {
    label: 'Lowest Month',
    value: `${worstMonth.month} — ${formatAED(worstMonth.revenue, true)}`,
    sub: `${(((worstMonth.revenue / bestMonth.revenue) - 1) * 100).toFixed(1)}% below peak`,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
  },
  {
    label: 'Avg Gross Margin',
    value: `${avgMargin}%`,
    sub: 'Across all 12 months',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.2)',
  },
];

export default function Revenue() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#F0F4FF', fontSize: 21, fontWeight: 700, letterSpacing: '-0.5px', margin: 0 }}>
          Revenue Analysis
        </h1>
        <p style={{ color: '#8896B0', fontSize: 13, marginTop: 5 }}>
          Monthly revenue & expense breakdown · FY 2024
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 20 }}>
        {statCards.map(card => (
          <div key={card.label} style={{
            background: card.bg,
            border: `1px solid ${card.border}`,
            borderRadius: 12,
            padding: '18px 20px',
          }}>
            <div style={{ color: '#8896B0', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              {card.label}
            </div>
            <div style={{ color: card.color, fontSize: 17, fontWeight: 700, letterSpacing: '-0.3px' }}>
              {card.value}
            </div>
            <div style={{ color: '#4B5A72', fontSize: 12, marginTop: 4 }}>
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <ChartCard
        title="Monthly Revenue vs Expenses — 2024"
        insight="Revenue stayed above expenses every month. The gap widens in Mar–May and Sep–Nov, reflecting strong operating leverage in peak periods."
      >
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={revenueData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A2744" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#8896B0', fontSize: 11.5 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={v => `${(v / 1_000_000).toFixed(0)}M`}
              tick={{ fill: '#8896B0', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            <Tooltip content={<RevenueTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#8896B0', paddingTop: 12 }} />
            <Bar dataKey="revenue"  name="Revenue"  fill="#3B82F6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expenses" name="Expenses" fill="#1E3A5F" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
