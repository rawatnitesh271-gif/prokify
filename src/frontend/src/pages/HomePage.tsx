import FAQSection from "@/components/sections/FAQSection";
import FooterSection from "@/components/sections/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import ProductsSection from "@/components/sections/ProductsSection";
import SliderSection from "@/components/sections/SliderSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen" data-ocid="home.page">
      <HeroSection />
      <SliderSection />
      <ProductsSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <FooterSection />
    </main>
  );
}
