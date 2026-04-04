'use client';
import ContentLayout from '@/components/marketing/ContentLayout';

export default function CareersPage() {
  return (
    <ContentLayout 
      title="Join the Team" 
      subtitle="Help us build the foundations of the modern SaaS platform."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        <p>At NovaSaaS, we're a remote-first team of developers, designers, and dreamers. We value autonomy, transparency, and shipping great code.</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { t: 'Senior Fullstack Engineer', loc: 'Remote', dept: 'Engineering' },
            { t: 'Product Designer', loc: 'Remote', dept: 'Design' },
            { t: 'Customer Success Lead', loc: 'Remote', dept: 'Operations' },
          ].map(j => (
            <div key={j.t} style={{ padding: 24, borderRadius: 16, background: 'var(--bg-elevated)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h3 style={{ color: '#f1f5f9', fontSize: '1rem', fontWeight: 700, marginBottom: 4 }}>{j.t}</h3>
                <p style={{ fontSize: '0.8125rem' }}>{j.dept} • {j.loc}</p>
              </div>
              <button className="btn btn-secondary btn-sm">Apply Now →</button>
            </div>
          ))}
        </div>
      </div>
    </ContentLayout>
  );
}
