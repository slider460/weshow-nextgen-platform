import { useState } from "react";
import { Button } from "../components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import ConsultationModal from "./ConsultationModal";
import { Link } from "react-router-dom";

interface ModernHeroSectionProps {
  onShowShowreel?: () => void;
}

const ModernHeroSection = ({ onShowShowreel }: ModernHeroSectionProps) => {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-orange-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      {/* Navigation spacing */}
      <div className="relative pt-20 pb-12 lg:pt-24 lg:pb-16">
        {/* Main content grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-160px)]">
            
            {/* Left side - Main content */}
            <div className="lg:col-span-5 space-y-6 lg:space-y-8 lg:pr-8">
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center px-4 py-2 lg:px-6 lg:py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 text-sm font-medium text-white/90 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300">
                  <span className="mr-2 text-lg">🎯</span>
                  Профессиональные решения
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] tracking-tight break-words">
                  Комплексные
                  <br />
                  <span className="text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent block sm:inline animate-pulse-slow">
                    мультимедийные
                  </span>
                  <br />
                  решения
                </h1>
                
                <p className="text-lg lg:text-2xl text-white/80 leading-relaxed max-w-lg font-light">Аренда на мероприятия, продажа, разработка и интеграция интерактивного оборудования</p>
                
                <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 pt-4 lg:pt-6">
                  <Button 
                    size="lg" 
                    className="px-8 lg:px-10 py-4 lg:py-5 text-base lg:text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white border-0 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 rounded-full"
                    onClick={() => setIsConsultModalOpen(true)}
                  >
                    Получить консультацию
                    <ArrowRight className="ml-3 h-5 w-5 lg:h-6 lg:w-6" />
                  </Button>
                  
                  <Button size="lg" variant="outline" className="px-8 lg:px-10 py-4 lg:py-5 text-base lg:text-lg font-semibold bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 rounded-full hover:scale-105" asChild>
                    <a href="/portfolio" className="inline-flex items-center">
                      Наши проекты
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right side - Cards grid - упрощенная мобильная версия */}
            <div className="lg:col-span-7">
              {/* Мобильная версия - упрощенная сетка */}
              <div className="lg:hidden space-y-6">
                {/* Основная карточка аренды - весь блок кликабельный */}
                <Link 
                  to="/equipment"
                  className="gradient-card-purple-dark rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 group"
                >
                  {/* Анимированные элементы фона */}
                  <div className="absolute top-4 right-4 w-20 h-20 opacity-60">
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-white/20 rounded-lg transform rotate-45 scale-75 animate-float"></div>
                      <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-white/30 rounded-lg transform rotate-45 scale-75 translate-x-2 -translate-y-2 animate-float" style={{animationDelay: '1s'}}></div>
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
                  <div className="self-start border-white/50 text-white group-hover:bg-white/25 bg-white/10 group-hover:border-white/70 transition-all duration-300 drop-shadow-md backdrop-blur-sm relative z-10 px-4 py-2 rounded-full text-sm font-medium">
                    Подробнее →
                  </div>
                </Link>

                {/* SHOWREEL карточка */}
                <div 
                  className="gradient-card-purple rounded-3xl p-8 flex items-center justify-between cursor-pointer hover:scale-105 transition-all duration-500 group"
                  onClick={onShowShowreel}
                >
                  <h3 className="text-3xl font-bold text-white drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                    SHOWREEL
                  </h3>
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300 group-hover:scale-110">
                    <Play className="h-8 w-8 text-white ml-1 drop-shadow-md" />
                  </div>
                </div>

                {/* ВДНХ карточка - весь блок кликабельный */}
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
                  <div className="border-white/40 text-white group-hover:bg-white/20 bg-white/10 group-hover:border-white/60 transition-all duration-300 drop-shadow-md px-4 py-2 rounded-full text-sm font-medium">
                    посмотреть →
                  </div>
                </Link>
              </div>

              {/* Десктопная версия - оригинальная сетка */}
              <div className="hidden lg:grid grid-cols-2 gap-6 h-full max-h-[700px]">
                {/* Large purple card - весь блок кликабельный */}
                <Link 
                  to="/equipment"
                  className="gradient-card-purple-dark rounded-3xl p-10 flex flex-col justify-between row-span-2 relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 group"
                >
                  {/* Анимированная 3D геометрическая фигура */}
                  <div className="absolute top-6 right-6 w-32 h-32 opacity-60">
                    <div className="relative w-full h-full">
                      {/* Основной куб */}
                      <div className="absolute inset-0 bg-white/20 rounded-lg transform rotate-45 scale-75 animate-float"></div>
                      {/* Верхняя грань */}
                      <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-white/30 rounded-lg transform rotate-45 scale-75 translate-x-2 -translate-y-2 animate-float" style={{animationDelay: '1s'}}></div>
                      {/* Боковая грань */}
                      <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-white/15 rounded-lg transform rotate-45 scale-75 -translate-x-2 -translate-y-2 animate-float" style={{animationDelay: '2s'}}></div>
                      {/* Дополнительные элементы */}
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
                  <div className="self-start border-white/50 text-white group-hover:bg-white/25 bg-white/10 group-hover:border-white/70 transition-all duration-300 drop-shadow-md backdrop-blur-sm relative z-10 px-6 py-3 rounded-full text-sm font-medium">
                    Подробнее →
                  </div>
                </Link>

                {/* SHOWREEL card */}
                <div 
                  className="gradient-card-purple rounded-3xl p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition-all duration-500 group"
                  onClick={onShowShowreel}
                >
                  <h3 className="text-5xl font-bold text-white mb-6 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                    SHOW<br />REEL
                  </h3>
                  <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300 group-hover:scale-110">
                    <Play className="h-10 w-10 text-white ml-1 drop-shadow-md" />
                  </div>
                </div>

                {/* ВДНХ card - весь блок кликабельный */}
                <Link 
                  to="/portfolio/samara-stand"
                  className="gradient-card-cyan rounded-3xl p-8 flex flex-col cursor-pointer hover:scale-105 transition-all duration-500 group"
                >
                  <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">ВДНХ</h3>
                  <p className="text-white/95 text-base mb-6 drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                    стенд Самарской области<br />
                    на выставке-форуме<br />
                    «Россия»
                  </p>
                  <div className="self-start border-white/40 text-white group-hover:bg-white/20 bg-white/10 group-hover:border-white/60 transition-all duration-300 mt-auto drop-shadow-md px-4 py-2 rounded-full text-sm font-medium">
                    посмотреть →
                  </div>
                </Link>

                {/* Samsung event card - весь блок кликабельный */}
                <Link 
                  to="/portfolio/samsung-event"
                  className="gradient-card-dark rounded-3xl p-8 flex flex-col row-span-1 cursor-pointer hover:scale-105 transition-all duration-500 group"
                >
                  <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">A Galaxy Event</h3>
                  <p className="text-white/95 text-base mb-6 drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                    Особенный новый год Samsung
                  </p>
                  <div className="self-start border-white/40 text-white group-hover:bg-white/20 bg-white/10 group-hover:border-white/60 transition-all duration-300 mt-auto drop-shadow-md px-4 py-2 rounded-full text-sm font-medium">
                    посмотреть →
                  </div>
                </Link>

                {/* SHOWROOM card */}
                <div className="gradient-card-cyan rounded-3xl p-8 flex flex-col col-span-1 group hover:scale-105 transition-all duration-500">
                  <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                    SHOW<br />ROOM
                  </h3>
                  <div className="flex items-center space-x-3 mt-auto">
                    <div className="w-16 h-16 bg-white/30 rounded-xl hover:bg-white/40 transition-all duration-300 group-hover:scale-110"></div>
                    <div className="w-16 h-16 bg-white/30 rounded-xl hover:bg-white/40 transition-all duration-300 group-hover:scale-110" style={{animationDelay: '0.1s'}}></div>
                  </div>
                </div>

                {/* Samara exhibition card */}
                <div className="gradient-card-purple rounded-3xl p-8 flex flex-col group hover:scale-105 transition-all duration-500">
                  <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                    Выставка «Самара»
                  </h3>
                  <p className="text-white/95 text-base drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                    интерактивные решения
                  </p>
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

export default ModernHeroSection;