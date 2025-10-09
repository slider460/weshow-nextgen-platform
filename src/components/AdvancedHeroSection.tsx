import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Play, ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import ConsultationModal from "./ConsultationModal";
import { Link } from "react-router-dom";
import RotatingTextAdvanced from "./RotatingTextAdvanced";

interface AdvancedHeroSectionProps {
  onShowShowreel?: () => void;
}

const AdvancedHeroSection = ({ onShowShowreel }: AdvancedHeroSectionProps) => {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>
      
      {/* Animated floating orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
      
      {/* Mouse-following gradient */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      ></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Navigation spacing */}
      <div className="relative pt-20 pb-12 lg:pt-24 lg:pb-16">
        {/* Main content grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-160px)]">
            
            {/* Left side - Main content */}
            <div className="lg:col-span-5 lg:pr-4 relative z-20 overflow-hidden min-h-[400px] lg:min-h-[500px]">
              <div className="space-y-4 lg:space-y-6 relative z-20 max-w-full pb-24 lg:pb-28">
                {/* Enhanced badge */}
                <div className="inline-flex items-center px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 text-sm font-medium text-white/90 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 group">
                  <Sparkles className="mr-2 h-4 w-4 text-blue-400 animate-pulse" />
                  Профессиональные решения
                  <Zap className="ml-2 h-4 w-4 text-purple-400 animate-bounce" />
                </div>
                
                {/* Enhanced title with Rotating Text effect */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight break-words relative z-10 max-w-full overflow-hidden" style={{wordBreak: 'break-word', hyphens: 'auto'}}>
                  Комплексные
                  <br />
                  <RotatingTextAdvanced
                    texts={[
                      'интерактивные', 
                      'цифровые',
                      'инновационные',
                      'современные'
                    ]}
                    duration={10000}
                    variant="rotate"
                    gradient={true}
                    glow={true}
                    delay={500}
                    className="block sm:inline relative max-w-full"
                    textClassName="text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)] break-words"
                  />
                  <br />
                  решения
                </h1>
                
                <div className="text-lg lg:text-2xl text-white/80 leading-relaxed max-w-lg font-light relative z-10">
                  <RotatingTextAdvanced
                    texts={[
                      'Аренда на мероприятия, продажа, разработка и интеграция интерактивного оборудования',
                      'Создаем незабываемые впечатления с помощью современных технологий',
                      'Полный цикл: от концепции до реализации мультимедийных проектов',
                      'Профессиональное оборудование для любых мероприятий и пространств'
                    ]}
                    duration={16000}
                    variant="slide"
                    direction="up"
                    delay={1000}
                    className="block relative z-10"
                    textClassName="transition-all duration-500 relative z-10"
                  />
                </div>
                
              </div>
              
              {/* Fixed buttons at bottom */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-col sm:flex-row gap-4 lg:gap-6 pt-4 lg:pt-6">
                  <Button 
                    size="lg" 
                    className="px-8 lg:px-10 py-4 lg:py-5 text-base lg:text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white border-0 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 rounded-full group relative overflow-hidden"
                    onClick={() => setIsConsultModalOpen(true)}
                  >
                    <span className="relative z-10 flex items-center">
                      Получить консультацию
                      <ArrowRight className="ml-3 h-5 w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                  
                  <Button size="lg" variant="outline" className="px-8 lg:px-10 py-4 lg:py-5 text-base lg:text-lg font-semibold bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 rounded-full hover:scale-105 group" asChild>
                    <a href="/portfolio" className="inline-flex items-center">
                      <span className="group-hover:animate-pulse">Наши проекты</span>
                    </a>
                  </Button>
              </div>
            </div>

            {/* Right side - Enhanced cards grid */}
            <div className="lg:col-span-7 relative z-20">
              {/* Mobile version */}
              <div className="lg:hidden space-y-6">
                {/* Main rental card */}
                <Link 
                  to="/equipment"
                  className="gradient-card-purple-dark rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 group"
                >
                  {/* Enhanced animated elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 opacity-60">
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-white/20 rounded-lg transform rotate-45 scale-75 animate-float"></div>
                      <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-white/30 rounded-lg transform rotate-45 scale-75 translate-x-2 -translate-y-2 animate-float" style={{animationDelay: '1s'}}></div>
                      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-white/25 rounded-full animate-pulse-slow"></div>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                      КОМПЛЕКСНАЯ АРЕНДА
                    </h3>
                    <p className="text-white/95 text-base leading-relaxed mb-6 drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                      Цена аренды включает доставку, монтаж и сопровождение
                    </p>
                  </div>
                  <div className="self-start border-white/50 text-white group-hover:bg-white/25 bg-white/10 group-hover:border-white/70 transition-all duration-300 drop-shadow-md backdrop-blur-sm relative z-10 px-4 py-2 rounded-full text-sm font-medium group-hover:animate-pulse">
                    Подробнее →
                  </div>
                </Link>

                {/* SHOWREEL card */}
                <div 
                  className="gradient-card-purple rounded-3xl p-8 flex items-center justify-between cursor-pointer hover:scale-105 transition-all duration-500 group"
                  onClick={onShowShowreel}
                >
                  <h3 className="text-3xl font-bold text-white drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                    SHOWREEL
                  </h3>
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300 group-hover:scale-110 group-hover:animate-spin">
                    <Play className="h-8 w-8 text-white ml-1 drop-shadow-md" />
                  </div>
                </div>

                {/* VDNKh card */}
                <Link 
                  to="/portfolio/samara-stand"
                  className="gradient-card-cyan rounded-3xl p-8 flex items-center justify-between cursor-pointer hover:scale-105 transition-all duration-500 group"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">ВДНХ</h3>
                    <p className="text-white/95 text-base drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                      стенд Самарской области
                    </p>
                  </div>
                  <div className="border-white/40 text-white group-hover:bg-white/20 bg-white/10 group-hover:border-white/60 transition-all duration-300 drop-shadow-md px-4 py-2 rounded-full text-sm font-medium group-hover:animate-pulse">
                    посмотреть →
                  </div>
                </Link>
              </div>

              {/* Desktop version */}
              <div className="hidden lg:grid grid-cols-2 gap-6 h-full max-h-[700px]">
                {/* Large purple card */}
                <Link 
                  to="/equipment"
                  className="gradient-card-purple-dark rounded-3xl p-10 flex flex-col justify-between row-span-2 relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 group z-30"
                >
                  {/* Enhanced 3D elements */}
                  <div className="absolute top-6 right-6 w-32 h-32 opacity-60">
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-white/20 rounded-lg transform rotate-45 scale-75 animate-float"></div>
                      <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-white/30 rounded-lg transform rotate-45 scale-75 translate-x-2 -translate-y-2 animate-float" style={{animationDelay: '1s'}}></div>
                      <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-white/15 rounded-lg transform rotate-45 scale-75 -translate-x-2 -translate-y-2 animate-float" style={{animationDelay: '2s'}}></div>
                      <div className="absolute bottom-2 right-2 w-10 h-10 bg-white/25 rounded-full animate-pulse-slow"></div>
                      <div className="absolute top-2 left-2 w-8 h-8 bg-white/20 rounded-full animate-pulse-slow" style={{animationDelay: '1s'}}></div>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                      КОМПЛЕКСНАЯ<br />
                      АРЕНДА<br />
                      ИНТЕРАКТИВНОГО<br />
                      ОБОРУДОВАНИЯ
                    </h3>
                    <p className="text-white/95 text-base leading-relaxed mb-8 drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                      Цена аренды нашего цифрового оборудования включает в себя 
                      полный спектр обслуживания: оперативная доставка, 
                      качественный монтаж и техническое сопровождение.
                    </p>
                  </div>
                  <div className="self-start border-white/50 text-white group-hover:bg-white/25 bg-white/10 group-hover:border-white/70 transition-all duration-300 drop-shadow-md backdrop-blur-sm relative z-10 px-6 py-3 rounded-full text-sm font-medium group-hover:animate-pulse">
                    Подробнее →
                  </div>
                </Link>

                {/* SHOWREEL card */}
                <div 
                  className="gradient-card-purple rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition-all duration-500 group z-30"
                  onClick={onShowShowreel}
                >
                  <h3 className="text-5xl font-bold text-white mb-6 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                    SHOW<br />REEL
                  </h3>
                  <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300 group-hover:scale-110 group-hover:animate-spin">
                    <Play className="h-10 w-10 text-white ml-1 drop-shadow-md" />
                  </div>
                </div>

                {/* VDNKh card */}
                <Link 
                  to="/portfolio/samara-stand"
                  className="gradient-card-cyan rounded-3xl p-8 flex flex-col cursor-pointer hover:scale-105 transition-all duration-500 group z-30"
                >
                  <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">ВДНХ</h3>
                  <p className="text-white/95 text-base mb-6 drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                    стенд Самарской области<br />
                    на выставке-форуме<br />
                    «Россия»
                  </p>
                  <div className="self-start border-white/40 text-white group-hover:bg-white/20 bg-white/10 group-hover:border-white/60 transition-all duration-300 mt-auto drop-shadow-md px-4 py-2 rounded-full text-sm font-medium group-hover:animate-pulse">
                    посмотреть →
                  </div>
                </Link>

                {/* Samsung event card */}
                <Link 
                  to="/portfolio"
                  className="gradient-card-dark rounded-3xl p-8 flex flex-col row-span-1 cursor-pointer hover:scale-105 transition-all duration-500 group z-30"
                >
                  <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">Самсунг</h3>
                  <p className="text-white/95 text-base mb-6 drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                    Особенный новый год Samsung
                  </p>
                  <div className="self-start border-white/40 text-white group-hover:bg-white/20 bg-white/10 group-hover:border-white/60 transition-all duration-300 mt-auto drop-shadow-md px-4 py-2 rounded-full text-sm font-medium group-hover:animate-pulse">
                    посмотреть →
                  </div>
                </Link>

                {/* SHOWROOM card */}
                <div className="gradient-card-cyan rounded-3xl p-8 flex flex-col col-span-1 group hover:scale-105 transition-all duration-500 z-30">
                  <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                    SHOW<br />ROOM
                  </h3>
                  <div className="flex items-center space-x-3 mt-auto">
                    <div className="w-16 h-16 bg-white/30 rounded-xl hover:bg-white/40 transition-all duration-300 group-hover:scale-110 group-hover:animate-bounce"></div>
                    <div className="w-16 h-16 bg-white/30 rounded-xl hover:bg-white/40 transition-all duration-300 group-hover:scale-110 group-hover:animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <ConsultationModal isOpen={isConsultModalOpen} onClose={() => setIsConsultModalOpen(false)} />
    </section>
  );
};

export default AdvancedHeroSection;




