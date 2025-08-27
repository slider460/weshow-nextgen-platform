
import Header from "../components/Header";
import ModernHeroSection from "../components/ModernHeroSection";
import GamePromoSection from "../components/GamePromoSection";
import ModernServicesSection from "../components/ModernServicesSection";
import ModernPortfolioSection from "../components/ModernPortfolioSection";
import ModernShowreelSection from "../components/ModernShowreelSection";
import ComplexSolutionsSection from "../components/ComplexSolutionsSection";
import RentalEquipmentSection from "../components/RentalEquipmentSection";
import SocialProofSection from "../components/SocialProofSection";
import UniqueValueProposition from "../components/UniqueValueProposition";

import WorkflowRoadmapSection from "../components/WorkflowRoadmapSection";
import ContactFormSection from "../components/ContactFormSection";
import Footer from "../components/Footer";
import ShowreelModal from "../components/ShowreelModal";

import { useState } from "react";

const Index = () => {
  const [isShowreelModalOpen, setIsShowreelModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="space-y-0">
        <ModernHeroSection onShowShowreel={() => setIsShowreelModalOpen(true)} />
        <RentalEquipmentSection />
        <ModernServicesSection />
        <UniqueValueProposition />

        <ModernPortfolioSection onShowShowreel={() => setIsShowreelModalOpen(true)} />
        <ComplexSolutionsSection />
        <WorkflowRoadmapSection />
        <GamePromoSection />
        <ModernShowreelSection onShowShowreel={() => setIsShowreelModalOpen(true)} />
        <SocialProofSection />
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
