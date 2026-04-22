import { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { formatAED } from '../data/mockData';
import { fetchKPIs, fetchRevenue, fetchDepartments } from '../api';
import type { KPI, RevenueData, Department } from '../types';
import KPICard from '../components/KPICard';
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
          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: entry.color, flexShrink: 0 }} />
          <span style={{ color: '#F0F4FF', fontSize: 12.5 }}>
            {entry.name}: <strong>{formatAED(entry.value, true)}</strong>
          </span>
        </div>
      ))}
    </div>
  );
};

const PieTooltip = ({ active, payload }: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; payload: { color: string } }>;
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
      <p style={{ color: '#F0F4FF', fontSize: 13, fontWeight: 600 }}>{payload[0].name}</p>
      <p style={{ color: '#8896B0', fontSize: 12, marginTop: 2 }}>{formatAED(payload[0].value, true)}</p>
    </div>
  );
};

export default function Overview() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchKPIs(), fetchRevenue(), fetchDepartments()])
      .then(([kpisData, revData, deptsData]) => {
        setKpis(kpisData);
        setRevenueData(revData);
        setDepartments(deptsData);
      })
      .catch(err => setError(err.message ?? 'Failed to load data'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, color: '#8896B0', fontSize: 14 }}>
      Loading…
    </div>
  );

  if (error) return (
    <div style={{
      background: 'rgba(239,68,68,0.08)',
      border: '1px solid rgba(239,68,68,0.25)',
      borderRadius: 12,
      padding: '20px 24px',
      color: '#EF4444',
      fontSize: 14,
    }}>
      Failed to load data: {error}
    </div>
  );

  const pieData = departments.map(d => ({ name: d.name, value: d.actual, color: d.color }));

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#F0F4FF', fontSize: 21, fontWeight: 700, letterSpacing: '-0.5px', margin: 0 }}>
          Executive Overview
        </h1>
        <p style={{ color: '#8896B0', fontSize: 13, marginTop: 5 }}>
          Gulf Dynamics Group · FY 2024 · All figures in AED
        </p>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {kpis.map(kpi => <KPICard key={kpi.id} kpi={kpi} />)}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
        <ChartCard
          title="Revenue vs Target — Monthly 2024"
          insight="Revenue exceeded target in 7 of 12 months. Summer dip (Jun–Aug) reflects seasonal UAE market patterns."
        >
          <ResponsiveContainer width="100%" height={270}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="gradRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.28} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradTgt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#8B5CF6" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Legend wrapperStyle={{ fontSize: 12, color: '#8896B0', paddingTop: 10 }} />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#gradRev)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="target"
                name="Target"
                stroke="#8B5CF6"
                strokeWidth={2}
                fill="url(#gradTgt)"
                strokeDasharray="5 3"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Spend by Department"
          insight="Operations is the largest cost centre at 31% of total spend."
        >
          <ResponsiveContainer width="100%" height={270}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="44%"
                innerRadius={65}
                outerRadius={96}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`pie-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 11.5, color: '#8896B0', paddingTop: 6 }}
                iconType="circle"
                iconSize={8}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}
