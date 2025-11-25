import Header from "../components/Header";
import AdvancedHeroSection from "../components/AdvancedHeroSection";
import ModernPortfolioSection from "../components/ModernPortfolioSection";
import ModernPortfolioMobileSection from "../components/ModernPortfolioMobileSection";
import EquipmentCarouselSection from "../components/EquipmentCarouselSection";
import InteractiveSolutionsSection from "../components/InteractiveSolutionsSection";
import WorkflowRoadmapSection from "../components/WorkflowRoadmapSection";
import WorkflowMobileSection from "../components/WorkflowMobileSection";
import ContactFormSection from "../components/ContactFormSection";
import TeamSection from "../components/TeamSection";
import TeamMobileSection from "../components/TeamMobileSection";
import LettersCertificatesSection from "../components/LettersCertificatesSection";
import LettersCertificatesMobileSection from "../components/LettersCertificatesMobileSection";
import Footer from "../components/Footer";
import ShowreelModal from "../components/ShowreelModal";
import LogoLoopSection from "../components/LogoLoopSection";

import { useState } from "react";

const Index = () => {
  const [isShowreelModalOpen, setIsShowreelModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="space-y-0 overflow-x-hidden">
        <AdvancedHeroSection onShowShowreel={() => setIsShowreelModalOpen(true)} />
        <EquipmentCarouselSection />
        <InteractiveSolutionsSection />
        
        {/* Desktop Portfolio Section */}
        <div className="hidden md:block">
          <ModernPortfolioSection onShowShowreel={() => setIsShowreelModalOpen(true)} />
        </div>
        
        {/* Mobile Portfolio Section */}
        <div className="block md:hidden">
          <ModernPortfolioMobileSection onShowShowreel={() => setIsShowreelModalOpen(true)} />
        </div>
        
        {/* Desktop Team Section */}
        <div className="hidden md:block">
          <TeamSection />
        </div>
        
        {/* Mobile Team Section */}
        <div className="block md:hidden">
          <TeamMobileSection />
        </div>
        
        {/* Desktop Letters & Certificates Section */}
        <div className="hidden md:block">
          <LettersCertificatesSection />
        </div>
        
        {/* Mobile Letters & Certificates Section */}
        <div className="block md:hidden">
          <LettersCertificatesMobileSection />
        </div>
        
        {/* Desktop Workflow Section */}
        <div className="hidden md:block">
          <WorkflowRoadmapSection />
        </div>
        
        {/* Mobile Workflow Section */}
        <div className="block md:hidden">
          <WorkflowMobileSection />
        </div>
        
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
