import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import ComplexSolutionsSection from "@/components/ComplexSolutionsSection";
import RentalEquipmentSection from "@/components/RentalEquipmentSection";
import ShowreelSection from "@/components/ShowreelSection";
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
        <ServicesSection />
        <PortfolioSection />
        <AboutSection />
        <ComplexSolutionsSection />
        <RentalEquipmentSection />
        <ShowreelSection />
        <SocialProofSection />
        <WorkProcessSection />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
