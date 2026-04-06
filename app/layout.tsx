import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { CartDrawer } from '@/components/ui/CartDrawer';
import { BackgroundSplash } from '@/components/ui/BackgroundSplash';
import { cn } from '@/lib/utils';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://viccoopper.com'),
  title: {
    default: 'VICCOOPPER | Modern Luxury Streetwear',
    template: '%s | VICCOOPPER',
  },
  description:
    'High-end streetwear for the future. Architectural silhouettes, technical fabrics, and premium craftsmanship.',
  keywords: ['Luxury', 'Streetwear', 'Fashion', 'Viccoopper', 'Clothing', 'Gen Z', 'Millennials'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://viccoopper.com',
    siteName: 'VICCOOPPER',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1200&h=630&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'VICCOOPPER STUDIO',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(inter.variable, "dark")}>
      <body className="antialiased font-sans selection:bg-accent selection:text-white overflow-x-hidden">
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#0a0a0a',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '0px',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            },
          }}
        />
        <BackgroundSplash />
        <Navbar />
        <CartDrawer />
        <main className="min-h-screen">
          {children}
        </main>
        {/* Footer will be added in individual pages or globally */}
      </body>
    </html>
  );
}
