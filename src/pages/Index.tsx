
import Header from "@/components/Header";
import ModernHeroSection from "@/components/ModernHeroSection";
import ModernServicesSection from "@/components/ModernServicesSection";
import ModernPortfolioSection from "@/components/ModernPortfolioSection";
import ModernShowreelSection from "@/components/ModernShowreelSection";
import ComplexSolutionsSection from "@/components/ComplexSolutionsSection";
import RentalEquipmentSection from "@/components/RentalEquipmentSection";
import SocialProofSection from "@/components/SocialProofSection";
import AboutSection from "@/components/AboutSection";
import UniqueValueProposition from "@/components/UniqueValueProposition";
import WorkflowRoadmapSection from "@/components/WorkflowRoadmapSection";
import ContactFormSection from "@/components/ContactFormSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="space-y-0">
        <ModernHeroSection />
        <AboutSection />
        <RentalEquipmentSection />
        <ModernServicesSection />
        <UniqueValueProposition />
        <ModernPortfolioSection />
        <ComplexSolutionsSection />
        <WorkflowRoadmapSection />
        <ModernShowreelSection />
        <SocialProofSection />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
