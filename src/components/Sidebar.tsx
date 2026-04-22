import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, Building2, AlertTriangle, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  Icon: LucideIcon;
}

const navItems: NavItem[] = [
  { path: '/',           label: 'Overview',           Icon: LayoutDashboard },
  { path: '/revenue',    label: 'Revenue',             Icon: TrendingUp      },
  { path: '/departments',label: 'Departments',         Icon: Building2       },
  { path: '/anomalies',  label: 'Anomalies',           Icon: AlertTriangle   },
  { path: '/briefing',   label: 'Executive Briefing',  Icon: FileText        },
];

export default function Sidebar() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <aside style={{
      width: 240,
      minHeight: '100vh',
      backgroundColor: '#070B18',
      borderRight: '1px solid #1A2744',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      zIndex: 100,
    }}>
      {/* Brand */}
      <div style={{ padding: '22px 20px', borderBottom: '1px solid #1A2744' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 0 16px rgba(59,130,246,0.35)',
          }}>
            <span style={{ color: '#fff', fontSize: 13, fontWeight: 800, letterSpacing: '-0.5px' }}>BP</span>
          </div>
          <div>
            <div style={{ color: '#F0F4FF', fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px', lineHeight: 1 }}>
              BizPulse
            </div>
            <div style={{ color: '#4B5A72', fontSize: 11, marginTop: 3 }}>Analytics Suite</div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: '14px 0' }}>
        <div style={{
          padding: '0 16px 10px',
          color: '#4B5A72',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Navigation
        </div>

        {navItems.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            onMouseEnter={() => setHovered(path)}
            onMouseLeave={() => setHovered(null)}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              margin: '1px 8px',
              borderRadius: 8,
              textDecoration: 'none',
              backgroundColor: isActive
                ? 'rgba(59,130,246,0.14)'
                : hovered === path
                ? 'rgba(255,255,255,0.04)'
                : 'transparent',
              color: isActive ? '#60A5FA' : '#8896B0',
              fontSize: 13.5,
              fontWeight: isActive ? 600 : 400,
              transition: 'background-color 0.12s ease, color 0.12s ease',
              borderLeft: isActive ? '2px solid #3B82F6' : '2px solid transparent',
            })}
          >
            {({ isActive }: { isActive: boolean }) => (
              <>
                <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '14px 18px', borderTop: '1px solid #1A2744' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 6,
        }}>
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: '#10B981',
            boxShadow: '0 0 6px #10B981',
          }} />
          <span style={{ color: '#4B5A72', fontSize: 11 }}>Live · FY 2024</span>
        </div>
        <div style={{ color: '#4B5A72', fontSize: 11 }}>Gulf Dynamics Group</div>
        <div style={{ color: '#334155', fontSize: 10, marginTop: 2 }}>Dubai, United Arab Emirates</div>
      </div>
    </aside>
  );
}
