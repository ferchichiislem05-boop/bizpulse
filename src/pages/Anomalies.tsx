import { AlertTriangle, TrendingDown, Zap, BrainCircuit } from 'lucide-react';
import { anomalies, formatAED } from '../data/mockData';
import type { Anomaly } from '../types';

const severityConfig: Record<Anomaly['severity'], { label: string; color: string; bg: string; border: string }> = {
  high:   { label: 'High',   color: '#EF4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.25)'   },
  medium: { label: 'Medium', color: '#F59E0B', bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.25)'  },
  low:    { label: 'Low',    color: '#10B981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.25)'  },
};

const typeConfig: Record<Anomaly['type'], { label: string; Icon: typeof AlertTriangle }> = {
  overspend: { label: 'Overspend',    Icon: AlertTriangle },
  miss:      { label: 'Target Miss',  Icon: TrendingDown  },
  spike:     { label: 'Cost Spike',   Icon: Zap           },
};

export default function Anomalies() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#F0F4FF', fontSize: 21, fontWeight: 700, letterSpacing: '-0.5px', margin: 0 }}>
          Anomaly Detection
        </h1>
        <p style={{ color: '#8896B0', fontSize: 13, marginTop: 5 }}>
          {anomalies.length} anomalies detected · FY 2024 · Powered by statistical analysis
        </p>
      </div>

      {/* How it works banner */}
      <div style={{
        background: 'rgba(59,130,246,0.06)',
        border: '1px solid rgba(59,130,246,0.2)',
        borderRadius: 12,
        padding: '16px 20px',
        marginBottom: 20,
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
      }}>
        <BrainCircuit size={20} color="#3B82F6" strokeWidth={1.7} style={{ marginTop: 1, flexShrink: 0 }} />
        <div>
          <div style={{ color: '#60A5FA', fontSize: 13, fontWeight: 600, marginBottom: 5 }}>
            How anomalies are detected
          </div>
          <p style={{ color: '#8896B0', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
            A <strong style={{ color: '#94A3B8' }}>Python statistical model</strong> processes monthly spend
            and revenue records using <strong style={{ color: '#94A3B8' }}>z-score analysis</strong> — any
            variance exceeding ±2 standard deviations from the rolling 3-month baseline triggers an alert.
            Budget-miss anomalies use percentage-deviation thresholds calibrated per department.
            High-severity alerts require CFO sign-off before period close.
          </p>
        </div>
      </div>

      {/* Anomaly cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {anomalies.map(anomaly => {
          const sev  = severityConfig[anomaly.severity];
          const type = typeConfig[anomaly.type];
          const { Icon } = type;
          const isNegativeDelta = anomaly.delta < 0;

          return (
            <div key={anomaly.id} style={{
              background: '#0F1C34',
              border: `1px solid #1A2744`,
              borderLeft: `4px solid ${sev.color}`,
              borderRadius: 12,
              padding: '20px 24px',
            }}>
              {/* Header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    background: sev.bg,
                    border: `1px solid ${sev.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={17} color={sev.color} strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: '#F0F4FF', fontSize: 14, fontWeight: 600 }}>
                        {anomaly.department} · {type.label}
                      </span>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: sev.color,
                        background: sev.bg,
                        border: `1px solid ${sev.border}`,
                        borderRadius: 4,
                        padding: '2px 7px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}>
                        {sev.label}
                      </span>
                    </div>
                    <div style={{ color: '#4B5A72', fontSize: 12, marginTop: 3 }}>{anomaly.date}</div>
                  </div>
                </div>

                {/* Impact metrics */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ color: sev.color, fontSize: 17, fontWeight: 700, letterSpacing: '-0.4px' }}>
                    {formatAED(anomaly.amount, true)}
                  </div>
                  <div style={{ color: '#4B5A72', fontSize: 12, marginTop: 2 }}>
                    {isNegativeDelta ? '' : '+'}{anomaly.delta.toFixed(1)}% variance
                  </div>
                </div>
              </div>

              {/* Description */}
              <p style={{ color: '#8896B0', fontSize: 13, lineHeight: 1.65, margin: 0 }}>
                {anomaly.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Summary bar */}
      <div style={{
        marginTop: 20,
        background: '#0F1C34',
        border: '1px solid #1A2744',
        borderRadius: 12,
        padding: '14px 20px',
        display: 'flex',
        gap: 32,
        alignItems: 'center',
      }}>
        {[
          { label: 'Total Anomaly Impact', value: formatAED(anomalies.reduce((s, a) => s + a.amount, 0), true), color: '#F0F4FF' },
          { label: 'High Severity',        value: `${anomalies.filter(a => a.severity === 'high').length} detected`,   color: '#EF4444' },
          { label: 'Medium Severity',      value: `${anomalies.filter(a => a.severity === 'medium').length} detected`, color: '#F59E0B' },
        ].map(stat => (
          <div key={stat.label}>
            <div style={{ color: '#4B5A72', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>
              {stat.label}
            </div>
            <div style={{ color: stat.color, fontSize: 15, fontWeight: 700 }}>{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
