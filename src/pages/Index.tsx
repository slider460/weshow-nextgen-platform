import Header from "../components/Header";
import AdvancedHeroSection from "../components/AdvancedHeroSection";
import ModernServicesSection from "../components/ModernServicesSection";
import ModernPortfolioSection from "../components/ModernPortfolioSection";
import RentalEquipmentSection from "../components/RentalEquipmentSection";
import WorkflowRoadmapSection from "../components/WorkflowRoadmapSection";
import ContactFormSection from "../components/ContactFormSection";
import TeamSection from "../components/TeamSection";
import LettersCertificatesSection from "../components/LettersCertificatesSection";
import Footer from "../components/Footer";
import ShowreelModal from "../components/ShowreelModal";
import LogoLoopSection from "../components/LogoLoopSection";
import { useAutoPrefetch } from "../hooks/usePrefetch";

import { useState } from "react";

const Index = () => {
  const [isShowreelModalOpen, setIsShowreelModalOpen] = useState(false);
  
  // Автоматический prefetching критических данных
  useAutoPrefetch();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="space-y-0 overflow-x-hidden">
        <AdvancedHeroSection onShowShowreel={() => setIsShowreelModalOpen(true)} />
        <RentalEquipmentSection />
        <ModernServicesSection />
        <ModernPortfolioSection onShowShowreel={() => setIsShowreelModalOpen(true)} />
        <TeamSection />
        <LettersCertificatesSection />
        {/* Убраны блоки: GamePromoSection, ComplexSolutionsSection, UniqueValueProposition, ModernShowreelSection и SocialProofSection */}
        <WorkflowRoadmapSection />
        <LogoLoopSection />
        <ContactFormSection />
      </main>
      <Footer />
      
      {/* Showreel Modal */}
      <ShowreelModal 
        isOpen={isShowreelModalOpen}
        onClose={() => setIsShowreelModalOpen(false)}
      />
    </div>
  );
};

export default Index;
