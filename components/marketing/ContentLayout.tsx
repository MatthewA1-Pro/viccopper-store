'use client';
import Link from 'next/link';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import { ArrowLeft } from 'lucide-react';

export default function ContentLayout({ 
  title, 
  subtitle, 
  children 
}: { 
  title: string; 
  subtitle: string; 
  children: React.ReactNode 
}) {
  return (
    <div className="bg-grid" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, paddingTop: 140, paddingBottom: 100 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <Link href="/" style={{ 
            display: 'inline-flex', alignItems: 'center', gap: 8, 
            color: '#64748b', textDecoration: 'none', marginBottom: 40,
            fontSize: '0.875rem', fontWeight: 600, transition: 'color 0.2s'
          }} className="hover-text-indigo">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <header style={{ marginBottom: 64 }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, 
              letterSpacing: '-0.04em', marginBottom: 20, color: '#f1f5f9' 
            }}>{title}</h1>
            <p style={{ 
              fontSize: '1.25rem', color: '#64748b', lineHeight: 1.6, 
              maxWidth: 600, fontWeight: 500 
            }}>{subtitle}</p>
          </header>

          <div 
            className="card glass responsive-card-padding" 
            style={{ 
              borderRadius: 24, 
              color: '#94a3b8', 
              lineHeight: 1.8, 
              fontSize: '1.0625rem' 
            }}
          >
            {children}
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .hover-text-indigo:hover { color: #6366f1 !important; }
      `}</style>
    </div>
  );
}
