'use client';
import { BarChart3, TrendingUp, Search } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f1f5f9', marginBottom: 6, letterSpacing: '-0.02em' }}>
            Analytics Overview
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9375rem' }}>Track your metrics and usage across the platform.</p>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400, border: '2px dashed var(--border)', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ textAlign: 'center', maxWidth: 320 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#6366f1' }}>
            <BarChart3 size={32} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 12 }}>Coming Soon</h2>
          <p style={{ color: '#64748b', lineHeight: 1.6 }}>Advanced analytics and reporting tools are currently under development. Stay tuned!</p>
        </div>
      </div>
    </div>
  );
}
