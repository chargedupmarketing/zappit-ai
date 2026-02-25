import TopControls from "@/components/landing/TopControls";
import HeroSection from "@/components/landing/HeroSection";
import ProductsSection from "@/components/landing/ProductsSection";
import PlatformSection from "@/components/landing/PlatformSection";
import UseCaseSection from "@/components/landing/UseCaseSection";
import PricingSection from "@/components/landing/PricingSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <TopControls />
      <main>
        <HeroSection />
        <ProductsSection />
        <PlatformSection />
        <UseCaseSection />
        <PricingSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
