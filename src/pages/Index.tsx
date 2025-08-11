import Header from "@/components/Header";
import BentoGridSection from "@/components/BentoGridSection";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import ComplexSolutionsSection from "@/components/ComplexSolutionsSection";
import RentalEquipmentSection from "@/components/RentalEquipmentSection";
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
        <BentoGridSection />
        <ServicesSection />
        <PortfolioSection />
        <AboutSection />
        <ComplexSolutionsSection />
        <RentalEquipmentSection />
        <SocialProofSection />
        <WorkProcessSection />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
