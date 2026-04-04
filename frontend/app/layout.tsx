import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'NovaSaaS — Build Smarter, Scale Faster',
    template: '%s | NovaSaaS',
  },
  description:
    'The all-in-one SaaS platform that gives your team superpowers. Automate workflows, centralize data, and ship faster.',
  keywords: ['SaaS', 'productivity', 'automation', 'workflow', 'dashboard'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'NovaSaaS',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-[#080c14] text-white">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#111827',
              color: '#fff',
              border: '1px solid rgba(99,102,241,0.3)',
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
