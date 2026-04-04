'use client';
import ContentLayout from '@/components/marketing/ContentLayout';

export default function GDPRPage() {
  return (
    <ContentLayout 
      title="GDPR Compliance" 
      subtitle="How we protect European Union citizens' data."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>General Data Protection Regulation</h2>
        <p>NovaSaaS is fully committed to compliance with the General Data Protection Regulation (GDPR). We believe in user data rights and provide tools to manage, export, and delete your personal data.</p>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>Data Residency</h2>
        <p>All user data is stored on encrypted servers within our secure data centers. We maintain strict access controls and audit logs to ensure data remains private.</p>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>Your Rights</h2>
        <p>As a user, you have the right to access, rectify, or erase your personal data. You also have the right to data portability and to object to the processing of your data.</p>
      </div>
    </ContentLayout>
  );
}
