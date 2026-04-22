import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, Legend,
} from 'recharts';
import { departments, formatAED } from '../data/mockData';
import ChartCard from '../components/ChartCard';

interface TooltipItem { value: number; name: string; color: string }

const DeptTooltip = ({ active, payload, label }: {
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
      <p style={{ color: '#F0F4FF', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{label}</p>
      {payload.map(entry => (
        <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: entry.color, flexShrink: 0 }} />
          <span style={{ color: '#8896B0', fontSize: 12.5 }}>
            {entry.name}: <span style={{ color: '#F0F4FF', fontWeight: 600 }}>{formatAED(entry.value, true)}</span>
          </span>
        </div>
      ))}
    </div>
  );
};

const chartData = departments.map(d => ({
  name: d.name === 'Human Resources' ? 'HR' : d.name,
  Budget: d.budget,
  Actual: d.actual,
  color: d.color,
}));

export default function Departments() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#F0F4FF', fontSize: 21, fontWeight: 700, letterSpacing: '-0.5px', margin: 0 }}>
          Department Budgets
        </h1>
        <p style={{ color: '#8896B0', fontSize: 13, marginTop: 5 }}>
          FY 2024 approved budget vs actual spend · 5 departments
        </p>
      </div>

      {/* Horizontal bar chart */}
      <ChartCard
        title="Budget vs Actual Spend"
        insight="3 of 5 departments came in under budget. Technology and Sales were the only overruns, totalling AED 1.32M in excess spend."
      >
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 4, right: 20, bottom: 4, left: 0 }}
            barGap={2}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1A2744" horizontal={false} />
            <XAxis
              type="number"
              tickFormatter={v => `${(v / 1_000_000).toFixed(0)}M`}
              tick={{ fill: '#8896B0', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: '#8896B0', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip content={<DeptTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#8896B0', paddingTop: 10 }} />
            <Bar dataKey="Budget" name="Budget" fill="rgba(148,163,184,0.18)" radius={[0, 4, 4, 0]} barSize={11} />
            <Bar dataKey="Actual"  name="Actual"  radius={[0, 4, 4, 0]} barSize={11}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Department status cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: 16 }}>
        {departments.map(dept => {
          const variance = ((dept.actual - dept.budget) / dept.budget) * 100;
          const isOver   = dept.actual > dept.budget;
          const badgeColor  = isOver ? '#EF4444' : '#10B981';
          const badgeBg     = isOver ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)';
          const badgeBorder = isOver ? 'rgba(239,68,68,0.25)' : 'rgba(16,185,129,0.25)';

          return (
            <div key={dept.id} style={{
              background: '#0F1C34',
              border: `1px solid #1A2744`,
              borderRadius: 12,
              padding: '16px 18px',
              borderTop: `3px solid ${dept.color}`,
            }}>
              {/* Name + badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ color: '#F0F4FF', fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>
                  {dept.name}
                </div>
                <span style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: badgeColor,
                  background: badgeBg,
                  border: `1px solid ${badgeBorder}`,
                  borderRadius: 4,
                  padding: '2px 6px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}>
                  {isOver ? 'Over' : 'Under'}
                </span>
              </div>

              {/* Metrics */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <div>
                  <div style={{ color: '#4B5A72', fontSize: 10, marginBottom: 2 }}>Budget</div>
                  <div style={{ color: '#8896B0', fontSize: 13, fontWeight: 500 }}>{formatAED(dept.budget, true)}</div>
                </div>
                <div>
                  <div style={{ color: '#4B5A72', fontSize: 10, marginBottom: 2 }}>Actual</div>
                  <div style={{ color: '#F0F4FF', fontSize: 13, fontWeight: 600 }}>{formatAED(dept.actual, true)}</div>
                </div>
                <div style={{ borderTop: '1px solid #1A2744', paddingTop: 7 }}>
                  <div style={{ color: badgeColor, fontSize: 13, fontWeight: 700 }}>
                    {variance > 0 ? '+' : ''}{variance.toFixed(1)}%
                  </div>
                  <div style={{ color: '#4B5A72', fontSize: 11, marginTop: 1 }}>
                    {dept.headcount} headcount
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
