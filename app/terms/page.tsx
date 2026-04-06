'use client';
import ContentLayout from '@/components/marketing/ContentLayout';

export default function TermsPage() {
  return (
    <ContentLayout 
      title="Terms of Service" 
      subtitle="The rules and guidelines for using NovaSaaS."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>1. Agreement</h2>
        <p>By using NovaSaaS, you agree to be bound by these Terms of Service. If you do not agree, you may not use our services.</p>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>2. Account Responsibility</h2>
        <p>You are responsible for maintaining the security of your account and password. NovaSaaS cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.</p>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>3. Service Availability</h2>
        <p>We strive for 99.9% uptime, but we do not guarantee that the service will be uninterrupted or error-free.</p>
      </div>
    </ContentLayout>
  );
}
