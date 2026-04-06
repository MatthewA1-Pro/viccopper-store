'use client';
import ContentLayout from '@/components/marketing/ContentLayout';

export default function RoadmapPage() {
  return (
    <ContentLayout 
      title="Our Roadmap" 
      subtitle="What we're working on and what's coming soon."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <p>Innovation never stops. Here's a glimpse into the future of NovaSaaS and what's on our priority list for the coming quarters.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {[
            { q: 'Q2 2026', t: 'Team Workspaces', s: 'Better collaboration with shared projects and granular permissions.', status: 'current' },
            { q: 'Q3 2026', t: 'AI Analytics', s: 'Predictive insights and natural language reports for your data.', status: 'planned' },
            { q: 'Q4 2026', t: 'Mobile Apps', s: 'Native iOS and Android apps for managing your SaaS on the go.', status: 'planned' },
          ].map(r => (
            <div key={r.q} style={{ padding: 24, borderRadius: 20, background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: r.status === 'current' ? '#6366f1' : '#475569', textTransform: 'uppercase', marginBottom: 12, display: 'block' }}>{r.q}</span>
              <h3 style={{ color: '#f1f5f9', fontSize: '1.125rem', fontWeight: 700, marginBottom: 8 }}>{r.t}</h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{r.s}</p>
            </div>
          ))}
        </div>
      </div>
    </ContentLayout>
  );
}
