'use client';
import ContentLayout from '@/components/marketing/ContentLayout';

export default function ChangelogPage() {
  return (
    <ContentLayout 
      title="Product Updates" 
      subtitle="The latest features, fixes, and improvements."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {[
          { v: 'v1.1.0', date: 'Apr 04, 2026', t: 'Mobile Responsive Overhaul', items: ['Improved sidebar on tablets', 'Enhanced card padding on mobile', 'New responsive grid utilities', 'Stacked form support'] },
          { v: 'v1.0.5', date: 'Mar 28, 2026', t: 'Supabase Integration', items: ['Direct Supabase Client support', 'Improved Auth Store', 'Real-time project data', 'Avatar uploads'] },
          { v: 'v1.0.0', date: 'Mar 15, 2026', t: 'Public Launch', items: ['Dashboard analytics', 'Project management', 'Task tracking', 'Stripe billing'] },
        ].map(r => (
          <div key={r.v}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span className="badge badge-indigo">{r.v}</span>
              <span style={{ fontSize: '0.875rem', color: '#475569' }}>{r.date}</span>
            </div>
            <h2 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: 800, marginBottom: 16 }}>{r.t}</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {r.items.map(i => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9375rem' }}>
                  <span style={{ color: '#6366f1' }}>•</span> {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </ContentLayout>
  );
}
