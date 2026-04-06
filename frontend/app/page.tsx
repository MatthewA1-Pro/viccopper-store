import { HeroSection } from '@/components/marketing/HeroSection';
import { FeaturedCollections } from '@/components/marketing/FeaturedCollections';
import { TrendingProducts, BrandIdentity } from '@/components/marketing/TrendingProducts';
import { Footer } from '@/components/Footer';
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FeaturedCollections />
      <BrandIdentity />
      <TrendingProducts />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
