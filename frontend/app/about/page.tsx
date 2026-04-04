'use client';
import ContentLayout from '@/components/marketing/ContentLayout';

export default function AboutPage() {
  return (
    <ContentLayout 
      title="Our Mission" 
      subtitle="Building the infrastructure for the next generation of software teams."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <p>
          NovaSaaS was founded on a simple premise: building a SaaS shouldn't require reinventing the wheel. 
          Every modern application needs authentication, billing, analytics, and a robust data layer. 
          We've built those foundations so you don't have to.
        </p>

        <div className="divider" />

        <h2 style={{ color: '#f1f5f9', fontSize: '1.5rem', fontWeight: 800 }}>Our Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginTop: 12 }}>
          {[
            { t: 'Developer First', d: 'We build tools we use ourselves every day.' },
            { t: 'Security Always', d: 'Data protection is woven into our core architecture.' },
            { t: 'Move Fast', d: 'Ship value daily and iterate with our customers.' },
          ].map(v => (
            <div key={v.t}>
              <h3 style={{ color: '#f1f5f9', fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>{v.t}</h3>
              <p style={{ fontSize: '0.875rem' }}>{v.d}</p>
            </div>
          ))}
        </div>

        <p>
          Today, thousands of developers use NovaSaaS to launch faster, scale smarter, 
          and focus on what truly matters: solving problems for their users.
        </p>
      </div>
    </ContentLayout>
  );
}
