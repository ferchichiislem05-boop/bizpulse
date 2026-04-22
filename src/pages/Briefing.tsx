import { TrendingUp, ShieldCheck, AlertCircle, ChevronRight } from 'lucide-react';
import { revenueData, departments, anomalies, formatAED } from '../data/mockData';

const totalRevenue  = revenueData.reduce((s, d) => s + d.revenue, 0);
const totalExpenses = revenueData.reduce((s, d) => s + d.expenses, 0);
const grossMargin   = (((totalRevenue - totalExpenses) / totalRevenue) * 100).toFixed(1);
const bestMonth     = revenueData.reduce((a, b) => a.revenue > b.revenue ? a : b);
const q4Revenue     = revenueData.slice(9).reduce((s, d) => s + d.revenue, 0);
const q1Revenue     = revenueData.slice(0, 3).reduce((s, d) => s + d.revenue, 0);
const q4Growth      = (((q4Revenue - q1Revenue) / q1Revenue) * 100).toFixed(1);

const overBudgetDepts  = departments.filter(d => d.actual > d.budget);
const underBudgetDepts = departments.filter(d => d.actual <= d.budget);
const totalOverspend   = overBudgetDepts.reduce((s, d) => s + (d.actual - d.budget), 0);
const totalSavings     = underBudgetDepts.reduce((s, d) => s + (d.budget - d.actual), 0);

const highAnomalies = anomalies.filter(a => a.severity === 'high');
const totalAnomalyImpact = anomalies.reduce((s, a) => s + a.amount, 0);

interface Slide {
  id: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  Icon: typeof TrendingUp;
  eyebrow: string;
  title: string;
  headline: string;
  bullets: string[];
  recommendation: string;
}

const slides: Slide[] = [
  {
    id: 'revenue',
    accentColor: '#3B82F6',
    accentBg: 'rgba(59,130,246,0.08)',
    accentBorder: 'rgba(59,130,246,0.2)',
    Icon: TrendingUp,
    eyebrow: 'Slide 01 — Revenue Performance',
    title: 'Strong Full-Year Growth with a Resilient Q4 Recovery',
    headline: `AED ${(totalRevenue / 1_000_000).toFixed(2)}M total revenue, ${grossMargin}% gross operating margin`,
    bullets: [
      `Peak month was ${bestMonth.month} at ${formatAED(bestMonth.revenue, true)}, driven by GITEX enterprise deal closures and accelerated Q4 procurement cycles.`,
      `Q4 revenue of ${formatAED(q4Revenue, true)} represents a ${q4Growth}% lift over Q1, confirming a strong second-half pattern consistent with UAE market seasonality.`,
      `The Jun–Aug summer dip was contained at ${formatAED(revenueData[5].revenue, true)}–${formatAED(revenueData[6].revenue, true)} per month — within historical norms for this sector.`,
      `Revenue exceeded monthly targets in 7 of 12 months, with target misses concentrated in the low-demand summer quarter.`,
    ],
    recommendation:
      'For FY 2025, consider front-loading contract renewals to Feb–Mar to reduce Q3 revenue dependency on late-year deal cycles.',
  },
  {
    id: 'budget',
    accentColor: '#10B981',
    accentBg: 'rgba(16,185,129,0.08)',
    accentBorder: 'rgba(16,185,129,0.2)',
    Icon: ShieldCheck,
    eyebrow: 'Slide 02 — Budget & Operational Efficiency',
    title: '3 of 5 Departments Delivered Under Budget',
    headline: `Net budget savings of ${formatAED(totalSavings, true)} offset ${formatAED(totalOverspend, true)} in overruns`,
    bullets: [
      `Operations — the largest cost centre at ${formatAED(departments[2].actual, true)} — came in ${(((departments[2].budget - departments[2].actual) / departments[2].budget) * 100).toFixed(1)}% under budget, demonstrating strong procurement discipline.`,
      `Marketing returned ${formatAED(departments[1].budget - departments[1].actual, true)} in unspent budget, primarily from deferred campaign activations following low summer conversion rates.`,
      `Technology overspent by ${formatAED(departments[3].actual - departments[3].budget, true)} (+${(((departments[3].actual - departments[3].budget) / departments[3].budget) * 100).toFixed(1)}%), entirely attributable to the November cloud infrastructure anomaly.`,
      `Sales commission overruns of ${formatAED(departments[0].actual - departments[0].budget, true)} were performance-driven and are a positive indicator of deal velocity.`,
    ],
    recommendation:
      'Implement cloud cost governance guardrails in Technology and review commission structure scaling thresholds before Q1 FY 2025 planning.',
  },
  {
    id: 'risk',
    accentColor: '#F59E0B',
    accentBg: 'rgba(245,158,11,0.08)',
    accentBorder: 'rgba(245,158,11,0.2)',
    Icon: AlertCircle,
    eyebrow: 'Slide 03 — Risk Indicators & Recommendations',
    title: `${anomalies.length} Anomalies Flagged — ${highAnomalies.length} Requiring Immediate Action`,
    headline: `Total anomaly financial impact: ${formatAED(totalAnomalyImpact, true)}`,
    bullets: [
      `The Technology cloud spend spike (${formatAED(anomalies[0].amount, true)}, ${anomalies[0].delta}) is the most critical issue. Root cause identified as untagged batch workloads bypassing budget alerting. A FinOps policy has been drafted for Q1 activation.`,
      `Sales commission overrun (${anomalies[1].delta}) is an isolated Q4 outcome tied to accelerator clauses. Recommend restructuring the enterprise deal accelerator cap for FY 2025.`,
      `Marketing Q3 ROI miss (${anomalies[2].delta} below threshold) reflects an under-optimised summer channel mix. Attribution modelling and creative refresh are planned for H1 FY 2025.`,
      'No anomalies were detected in Operations or Human Resources — both departments maintained expenditure within approved thresholds for all 12 months.',
    ],
    recommendation:
      'Net FY 2024 outlook is positive. Entering FY 2025 with strong deal pipeline, 487 headcount, and 142 active client relationships. Gross margin trajectory supports a conservative 15% revenue growth target.',
  },
];

export default function Briefing() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ color: '#F0F4FF', fontSize: 21, fontWeight: 700, letterSpacing: '-0.5px', margin: 0 }}>
          Executive Briefing
        </h1>
        <p style={{ color: '#8896B0', fontSize: 13, marginTop: 5 }}>
          Auto-generated insights · Gulf Dynamics Group · FY 2024 Close
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {slides.map(slide => {
          const { Icon } = slide;
          return (
            <div key={slide.id} style={{
              background: '#0F1C34',
              border: '1px solid #1A2744',
              borderRadius: 14,
              overflow: 'hidden',
            }}>
              {/* Slide header */}
              <div style={{
                background: slide.accentBg,
                borderBottom: `1px solid ${slide.accentBorder}`,
                padding: '18px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}>
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  background: `rgba(${slide.accentColor === '#3B82F6' ? '59,130,246' : slide.accentColor === '#10B981' ? '16,185,129' : '245,158,11'},0.15)`,
                  border: `1px solid ${slide.accentBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={20} color={slide.accentColor} strokeWidth={1.8} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: slide.accentColor, fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                    {slide.eyebrow}
                  </div>
                  <h2 style={{ color: '#F0F4FF', fontSize: 16, fontWeight: 700, margin: 0, letterSpacing: '-0.3px' }}>
                    {slide.title}
                  </h2>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '20px 24px' }}>
                {/* Headline metric */}
                <div style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid #1A2744',
                  borderRadius: 8,
                  padding: '12px 16px',
                  marginBottom: 18,
                  color: '#94A3B8',
                  fontSize: 13.5,
                  fontStyle: 'italic',
                }}>
                  {slide.headline}
                </div>

                {/* Bullet points */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {slide.bullets.map((bullet, i) => (
                    <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <ChevronRight size={14} color={slide.accentColor} style={{ marginTop: 3, flexShrink: 0 }} />
                      <span style={{ color: '#94A3B8', fontSize: 13.5, lineHeight: 1.65 }}>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Recommendation */}
                <div style={{
                  borderTop: '1px solid #1A2744',
                  paddingTop: 14,
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                }}>
                  <div style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: slide.accentColor,
                    background: slide.accentBg,
                    border: `1px solid ${slide.accentBorder}`,
                    borderRadius: 4,
                    padding: '3px 8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    whiteSpace: 'nowrap',
                    marginTop: 1,
                    flexShrink: 0,
                  }}>
                    Action
                  </div>
                  <p style={{ color: '#F0F4FF', fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>
                    {slide.recommendation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
