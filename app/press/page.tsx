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
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.6 }}>For press inquiries, please email us at press@novasaas.io. We aim to respond within 24 hours.</p>
        </div>
      </div>
    </ContentLayout>
  );
}
