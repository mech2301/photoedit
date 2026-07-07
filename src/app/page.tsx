import HeroSection from '@/components/landing/HeroSection';
import HowItWorks from '@/components/landing/HowItWorks';
import FeatureGrid from '@/components/landing/FeatureGrid';
import UseCases from '@/components/landing/UseCases';
import FAQSection from '@/components/landing/FAQSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FeatureGrid />
      <UseCases />
      <FAQSection />
    </>
  );
}
