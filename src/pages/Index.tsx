
import Header from "@/components/Header";
import ModernHeroSection from "@/components/ModernHeroSection";
import ModernServicesSection from "@/components/ModernServicesSection";
import ModernPortfolioSection from "@/components/ModernPortfolioSection";
import ModernShowreelSection from "@/components/ModernShowreelSection";
import ComplexSolutionsSection from "@/components/ComplexSolutionsSection";
import RentalEquipmentSection from "@/components/RentalEquipmentSection";
import WorkflowRoadmapSection from "@/components/WorkflowRoadmapSection";
import SocialProofSection from "@/components/SocialProofSection";
import ContactFormSection from "@/components/ContactFormSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="space-y-0">
        <ModernHeroSection />
        <ModernServicesSection />
        <RentalEquipmentSection />
        <ModernPortfolioSection />
        <ComplexSolutionsSection />
        <WorkflowRoadmapSection />
        <SocialProofSection />
        <ModernShowreelSection />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
