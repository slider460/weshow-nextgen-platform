import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import UniqueValueProposition from "@/components/UniqueValueProposition";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import SocialProofSection from "@/components/SocialProofSection";
import WorkProcessSection from "@/components/WorkProcessSection";
import ContactFormSection from "@/components/ContactFormSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <UniqueValueProposition />
        <ServicesSection />
        <PortfolioSection />
        <SocialProofSection />
        <WorkProcessSection />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
