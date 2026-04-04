'use client';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useAuthStore } from '@/lib/auth-store';
import { api } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  BarChart3, Users, TrendingUp, Shield, ArrowUpRight,
  Activity, CreditCard, Clock,
} from 'lucide-react';

interface Stats {
  plan: string;
  planStatus: string;
  daysActive: number;
  totalActions: number;
  periodEnd: string | null;
}

interface LogEntry {
  id: string;
  action: string;
  ipAddress: string;
  createdAt: string;
  metadata: any;
}

const ACTION_LABELS: Record<string, string> = {
  USER_REGISTERED: 'Account created',
  USER_LOGIN:      'Signed in',
};

export default function DashboardPage() {
  const { user, accessToken, fetchMe } = useAuthStore();

  useEffect(() => { fetchMe(); }, []);

  const { data: statsData } = useSWR<{ stats: Stats }>(
    accessToken ? ['/dashboard/stats', accessToken] : null,
    ([path, token]: [string, string]) => api.get<{ stats: Stats }>(path, token)
  );

  const { data: activityData } = useSWR<{ logs: LogEntry[]; pagination: any }>(
    accessToken ? ['/dashboard/activity?limit=5', accessToken] : null,
    ([path, token]: [string, string]) => api.get<{ logs: LogEntry[]; pagination: any }>(path, token)
  );

  const stats = statsData?.stats;
  const logs  = activityData?.logs ?? [];

  const STAT_CARDS = [
    {
      label: 'Current Plan',
      value: stats?.plan ?? '—',
      icon: <CreditCard size={20} />,
      color: '#6366f1',
      sub: stats?.periodEnd ? `Renews ${formatDate(stats.periodEnd)}` : 'Free tier',
    },
    {
      label: 'Days Active',
      value: stats?.daysActive?.toString() ?? '—',
      icon: <Clock size={20} />,
      color: '#8b5cf6',
      sub: 'Since you joined',
    },
    {
      label: 'Total Actions',
      value: stats?.totalActions?.toString() ?? '—',
      icon: <Activity size={20} />,
      color: '#22d3ee',
      sub: 'Across all sessions',
    },
    {
      label: 'Plan Status',
      value: stats?.planStatus ?? 'FREE',
      icon: <Shield size={20} />,
      color: '#34d399',
      sub: 'Account standing',
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
          <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Here's what's happening with your account today.</p>
        </div>
        <span className={`badge ${stats?.planStatus === 'ACTIVE' ? 'badge-emerald' : 'badge-indigo'}`}>
          {stats?.plan ?? 'Free'} Plan
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

      {/* Chart placeholder + activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* Chart */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 4 }}>Activity Overview</h2>
              <p style={{ fontSize: '0.8125rem', color: '#475569' }}>Last 12 weeks</p>
            </div>
            <span className="badge badge-indigo"><TrendingUp size={11} /> +14.2%</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
            {[40,60,45,80,70,90,65,100,75,85,95,88].map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                <div style={{
                  width: '100%', height: `${h}%`,
                  background: i === 11
                    ? 'linear-gradient(to top, #6366f1, #8b5cf6)'
                    : 'rgba(99,102,241,0.25)',
                  borderRadius: '4px 4px 0 0',
                  transition: 'background 0.2s',
                }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
              <span key={m} style={{ flex: 1, textAlign: 'center', fontSize: '0.625rem', color: '#334155' }}>{m}</span>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="card">
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 20 }}>Recent Activity</h2>
          {logs.length === 0 ? (
            <p style={{ color: '#475569', fontSize: '0.875rem', textAlign: 'center', paddingTop: 24 }}>No activity yet</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {logs.map(log => (
                <div key={log.id} style={{
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                  padding: '10px 12px', borderRadius: 8, background: 'var(--bg-elevated)',
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(99,102,241,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Activity size={14} color="#6366f1" />
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>
                      {ACTION_LABELS[log.action] ?? log.action}
                    </p>
                    <p style={{ fontSize: '0.7rem', color: '#475569' }}>
                      {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick upgrade CTA */}
      {!stats?.plan || stats.plan === 'Free' ? (
        <div style={{
          padding: '28px 32px', borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
          border: '1px solid rgba(99,102,241,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>Unlock the full power of NovaSaaS</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Upgrade to Pro for unlimited API calls, advanced analytics, and priority support.</p>
          </div>
          <a href="/dashboard/billing" className="btn btn-primary">
            Upgrade to Pro <ArrowUpRight size={16} />
          </a>
        </div>
      ) : null}
    </div>
  );
}
