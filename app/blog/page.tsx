'use client';
import ContentLayout from '@/components/marketing/ContentLayout';

export default function BlogPage() {
  return (
    <ContentLayout 
      title="Latest News" 
      subtitle="Insights, updates, and deep dives from the NovaSaaS team."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {[
          { date: 'Apr 02, 2026', t: 'Introducing Supabase Native Support', d: 'How we migrated our base architecture to follow Supabase best practices for seamless scaling.' },
          { date: 'Mar 25, 2026', t: 'Responsive Design in 2026', d: 'Best practices for the modern web: from ultra-wide desktops to pocket-sized devices.' },
          { date: 'Mar 10, 2026', t: 'Scaling to Your First 10k Users', d: 'The common bottlenecks in every SaaS and how NovaSaaS automatically handles them.' },
        ].map(p => (
          <div key={p.t}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', marginBottom: 12 }}>{p.date}</span>
            <h2 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: 800, marginBottom: 12 }}>{p.t}</h2>
            <p style={{ fontSize: '0.9375rem', marginBottom: 16 }}>{p.d}</p>
            <a href="#" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem' }}>Read Article →</a>
          </div>
        ))}
      </div>
    </ContentLayout>
  );
}
