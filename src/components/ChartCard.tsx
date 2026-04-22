import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  insight?: string;
  children: ReactNode;
}

export default function ChartCard({ title, insight, children }: ChartCardProps) {
  return (
    <div style={{
      background: '#0F1C34',
      border: '1px solid #1A2744',
      borderRadius: 12,
      padding: '20px 24px 16px',
    }}>
      <div style={{ marginBottom: 16 }}>
        <h3 style={{
          color: '#F0F4FF',
          fontSize: 14,
          fontWeight: 600,
          margin: 0,
          letterSpacing: '-0.2px',
        }}>
          {title}
        </h3>
        {insight && (
          <p style={{
            color: '#8896B0',
            fontSize: 12.5,
            margin: '5px 0 0',
            lineHeight: 1.55,
          }}>
            {insight}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
