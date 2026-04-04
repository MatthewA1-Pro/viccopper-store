'carousel'
<<<< slide >>>>
'use client';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import FeaturesSection from '@/components/marketing/FeaturesSection';

export default function FeaturesPage() {
  return (
    <div className="bg-grid" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
<<<< slide >>>>
'use client';
import Navbar from '@/components/marketing/Navbar';
import Footer from '@/components/marketing/Footer';
import PricingSection from '@/components/marketing/PricingSection';

export default function PricingPage() {
  return (
    <div className="bg-grid" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: 80 }}>
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
