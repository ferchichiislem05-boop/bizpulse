import { TrendingUp, TrendingDown, DollarSign, Percent, Users, UserCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { KPI } from '../types';

const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  Percent,
  Users,
  UserCheck,
};

interface KPICardProps {
  kpi: KPI;
}

export default function KPICard({ kpi }: KPICardProps) {
  const Icon = iconMap[kpi.iconName] ?? DollarSign;
  const isUp   = kpi.trend === 'up';
  const isDown = kpi.trend === 'down';
  const trendColor = isUp ? '#10B981' : isDown ? '#EF4444' : '#8896B0';

  return (
    <div style={{
      background: '#0F1C34',
      border: '1px solid #1A2744',
      borderRadius: 12,
      padding: '20px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ color: '#8896B0', fontSize: 11.5, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
          {kpi.label}
        </div>
        <div style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          background: 'rgba(59,130,246,0.1)',
          border: '1px solid rgba(59,130,246,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={17} color="#3B82F6" strokeWidth={1.8} />
        </div>
      </div>

      {/* Value */}
      <div style={{
        color: '#F0F4FF',
        fontSize: 26,
        fontWeight: 700,
        letterSpacing: '-0.8px',
        lineHeight: 1,
        marginTop: 12,
      }}>
        {kpi.value}
      </div>

      {/* Trend */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 10 }}>
        {isUp && <TrendingUp size={13} color={trendColor} />}
        {isDown && <TrendingDown size={13} color={trendColor} />}
        <span style={{ color: trendColor, fontSize: 12, fontWeight: 600 }}>{kpi.trendValue}</span>
        <span style={{ color: '#4B5A72', fontSize: 12 }}>vs prior year</span>
      </div>
    </div>
  );
}
