
import Header from "@/components/Header";
import ModernHeroSection from "@/components/ModernHeroSection";
import ModernServicesSection from "@/components/ModernServicesSection";
import ModernPortfolioSection from "@/components/ModernPortfolioSection";
import ModernShowreelSection from "@/components/ModernShowreelSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="space-y-0">
        <ModernHeroSection />
        <ModernServicesSection />
        <ModernPortfolioSection />
        <ModernShowreelSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
