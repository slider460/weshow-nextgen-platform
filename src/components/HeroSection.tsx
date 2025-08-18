import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import ConsultationModal from "./ConsultationModal";

const HeroSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [preferReducedMotion, setPreferReducedMotion] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPreferReducedMotion(mediaQuery.matches);
    const handleChange = () => setPreferReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <section className="relative h-[33vh] flex items-center justify-center overflow-hidden">
      {/* Background - Image for reduced motion, video for others */}
      {preferReducedMotion ? (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: `url(${heroImage})` }} 
        />
      ) : (
        <>
          {/* Video Background Placeholder - Using image as fallback */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
            style={{ backgroundImage: `url(${heroImage})` }} 
          />
          
          {/* Video Controls */}
          <button 
            onClick={toggleVideo} 
            className="absolute bottom-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors" 
            aria-label={isVideoPlaying ? "Pause video" : "Play video"}
          >
            {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </>
      )}
      
      {/* Overlay */}
      <div className="video-overlay" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            Комплексные
            <span className="text-white block">мультимедийные решения</span>
            для вашего бизнеса
          </h1>
          
          <p className="text-sm md:text-lg text-white/90 mb-4 max-w-2xl mx-auto leading-relaxed">
            Профессиональное техническое оснащение и интерактивные инсталляции для корпоративных клиентов
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="animate-pulse-glow"
              onClick={() => setIsConsultModalOpen(true)}
            >
              Получить консультацию
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50">
              Посмотреть проекты
            </Button>
          </div>
        </div>
      </div>

      <ConsultationModal 
        isOpen={isConsultModalOpen} 
        onClose={() => setIsConsultModalOpen(false)} 
      />
    </section>
  );
};

export default HeroSection;