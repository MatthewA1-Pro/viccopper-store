'use client';
import { useAuthStore } from '@/lib/auth-store';
import {
  Shield, ArrowUpRight,
  Activity, CreditCard, Clock,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();

  const planName = user?.planId ? user.planId.charAt(0).toUpperCase() + user.planId.slice(1) : 'Free';

  const STAT_CARDS = [
    {
      label: 'Current Plan',
      value: planName,
      icon: <CreditCard size={20} />,
      color: '#6366f1',
      sub: planName === 'Free' ? 'Free tier' : 'Paid tier',
    },
    {
      label: 'Engagement',
      value: '100%',
      icon: <Clock size={20} />,
      color: '#8b5cf6',
      sub: 'Active User',
    },
    {
      label: 'Platform Status',
      value: 'Stable',
      icon: <Activity size={20} />,
      color: '#22d3ee',
      sub: 'All systems go',
    },
    {
      label: 'Identity',
      value: 'Verified',
      icon: <Shield size={20} />,
      color: '#34d399',
      sub: 'Supabase Auth',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* Welcome */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 6, letterSpacing: '-0.02em' }}>
            Good morning, {user?.name?.split(' ')[0] ?? 'there'} 👋
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Your workspace is ready. What are we building today?</p>
        </div>
        <span className="badge badge-indigo">
          {planName} Plan
        </span>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {STAT_CARDS.map(s => (
          <div key={s.label} className="stat-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <p style={{ fontSize: '0.8125rem', color: '#64748b', fontWeight: 500 }}>{s.label}</p>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: `${s.color}1a`, border: `1px solid ${s.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: s.color,
              }}>
                {s.icon}
              </div>
            </div>
            <p style={{ fontSize: '1.625rem', fontWeight: 800, color: '#f1f5f9', lineHeight: 1, marginBottom: 8 }}>{s.value}</p>
            <p style={{ fontSize: '0.75rem', color: '#475569' }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick upgrade CTA */}
      {planName === 'Free' ? (
        <div style={{
          padding: '28px 32px', borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
          border: '1px solid rgba(99,102,241,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>Unlock the full power of NovaSaaS</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Supabase is now powering your backend. Seamlessly scale with real-time data.</p>
          </div>
          <a href="/dashboard/billing" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Upgrade to Pro <ArrowUpRight size={16} />
          </a>
        </div>
      ) : null}
    </div>
  );
}
