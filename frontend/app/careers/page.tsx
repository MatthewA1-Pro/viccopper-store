'carousel'
<<<< slide >>>>
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
<<<< slide >>>>
'use client';
import ContentLayout from '@/components/marketing/ContentLayout';

export default function PressPage() {
  return (
    <ContentLayout 
      title="Press Info" 
      subtitle="Resources for media and news organizations."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <p>Welcome to our press center. Here you can find our latest announcements, brand assets, and contact information for media inquiries.</p>
        
        <div style={{ padding: 24, borderRadius: 16, border: '1px dashed var(--border)', textAlign: 'center' }}>
          <h3 style={{ color: '#f1f5f9', fontSize: '1.125rem', fontWeight: 700, marginBottom: 12 }}>Brand Assets</h3>
          <p style={{ fontSize: '0.875rem', marginBottom: 20 }}>Download high-resolution logos, screenshots, and team photos.</p>
          <button className="btn btn-primary btn-sm">Download Kit (45MB)</button>
        </div>

        <div>
          <h3 style={{ color: '#f1f5f9', fontSize: '1.25rem', fontWeight: 800, marginBottom: 12 }}>Contact Media Relations</h3>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>For press inquiries, please email us at <a href="mailto:press@novasaas.io" style={{ color: '#6366f1', textDecoration: 'none', fontWeight: 700 }}>press@novasaas.io</a>. We aim to respond within 24 hours.</p>
        </div>
      </div>
    </ContentLayout>
  );
}
