'use client';
import ContentLayout from '@/components/marketing/ContentLayout';

export default function CookiesPage() {
  return (
    <ContentLayout 
      title="Cookie Policy" 
      subtitle="How we use cookies to improve your experience."
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>What are Cookies?</h2>
        <p>Cookies are small text files that are stored on your device when you visit a website. They are used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>Essential Cookies</h2>
        <p>We use essential cookies to manage your login session and maintain your preferences across our platform. These cookies are required for the service to function.</p>
        
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>Managing Cookies</h2>
        <p>You can control and/or delete cookies as you wish – for details, see aboutcookies.org. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed.</p>
      </div>
    </ContentLayout>
  );
}
