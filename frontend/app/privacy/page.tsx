'carousel'
<<<< slide >>>>
'use client';
import ContentLayout from '@/components/marketing/ContentLayout';

export default function PrivacyPage() {
  return (
    <ContentLayout 
      title="Privacy Policy" 
      subtitle="How we collect, use, and protect your personal information."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>1. Introduction</h2>
        <p>Your privacy is important to us. This Privacy Policy explains how NovaSaaS collects, uses, and shares your personal information when you use our website and services.</p>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>2. Data Collection</h2>
        <p>We collect information you provide directly to us when you create an account, such as your name, email address, and payment information.</p>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>3. How We Use Data</h2>
        <p>We use the information we collect to provide, maintain, and improve our services, communicate with you, and process payments.</p>
      </div>
    </ContentLayout>
  );
}
<<<< slide >>>>
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
