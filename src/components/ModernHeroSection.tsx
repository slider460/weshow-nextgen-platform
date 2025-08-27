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
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
      
      {/* Navigation spacing */}
      <div className="relative pt-20 pb-12 lg:pt-24 lg:pb-16">
        {/* Main content grid */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-120px)] lg:min-h-[calc(100vh-160px)]">
            
            {/* Left side - Main content */}
            <div className="lg:col-span-5 space-y-6 lg:space-y-8 lg:pr-8">
              <div className="space-y-4 lg:space-y-6">
                <div className="inline-flex items-center px-3 py-1 lg:px-4 lg:py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/30 text-sm font-medium text-slate-700">
                  🎯 Профессиональные решения
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight break-words">
                  Комплексные
                  <br />
                  <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block sm:inline">
                    мультимедийные
                  </span>
                  <br />
                  решения
                </h1>
                
                <p className="text-base lg:text-xl text-slate-700 leading-relaxed max-w-lg">Аренда на мероприятия, продажа, разработка и интеграция</p>
                
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2 lg:pt-4">
                  <Button 
                    size="lg" 
                    className="px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setIsConsultModalOpen(true)}
                  >
                    Получить консультацию
                    <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                  </Button>
                  
                  <Button size="lg" variant="outline" className="px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold bg-white/70 backdrop-blur-sm border-slate-300 text-slate-700 hover:bg-white/90 transition-all duration-300" asChild>
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
              <div className="lg:hidden space-y-4">
                {/* Основная карточка аренды - весь блок кликабельный */}
                <Link 
                  to="/equipment"
                  className="gradient-card-purple-dark rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 group"
                >
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                      КОМПЛЕКСНАЯ АРЕНДА
                    </h3>
                    <p className="text-white/95 text-sm leading-relaxed mb-4 drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                      Цена аренды включает доставку, монтаж и сопровождение
                    </p>
                  </div>
                  <div className="self-start border-white/50 text-white group-hover:bg-white/25 bg-white/10 group-hover:border-white/70 transition-all duration-300 drop-shadow-md backdrop-blur-sm relative z-10 px-3 py-1 rounded text-sm">
                    Подробнее →
                  </div>
                </Link>

                {/* SHOWREEL карточка */}
                <div 
                  className="gradient-card-purple rounded-2xl p-6 flex items-center justify-between cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={onShowShowreel}
                >
                  <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                    SHOWREEL
                  </h3>
                  <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300">
                    <Play className="h-6 w-6 text-white ml-1 drop-shadow-md" />
                  </div>
                </div>

                {/* ВДНХ карточка - весь блок кликабельный */}
                <Link 
                  to="/portfolio/samara-stand"
                  className="gradient-card-cyan rounded-2xl p-6 flex items-center justify-between cursor-pointer hover:scale-105 transition-all duration-300 group"
                >
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">ВДНХ</h3>
                    <p className="text-white/95 text-sm drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                      стенд Самарской области
                    </p>
                  </div>
                  <div className="border-white/40 text-white group-hover:bg-white/20 bg-white/10 group-hover:border-white/60 transition-all duration-300 drop-shadow-md px-3 py-1 rounded text-sm">
                    посмотреть →
                  </div>
                </Link>
              </div>

              {/* Десктопная версия - оригинальная сетка */}
              <div className="hidden lg:grid grid-cols-2 gap-4 h-full max-h-[600px]">
                {/* Large purple card - весь блок кликабельный */}
                <Link 
                  to="/equipment"
                  className="gradient-card-purple-dark rounded-3xl p-8 flex flex-col justify-between row-span-2 relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 group"
                >
                  {/* Абстрактная 3D геометрическая фигура */}
                  <div className="absolute top-4 right-4 w-24 h-24 opacity-60">
                    <div className="relative w-full h-full">
                      {/* Основной куб */}
                      <div className="absolute inset-0 bg-white/20 rounded-lg transform rotate-45 scale-75"></div>
                      {/* Верхняя грань */}
                      <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-white/30 rounded-lg transform rotate-45 scale-75 translate-x-2 -translate-y-2"></div>
                      {/* Боковая грань */}
                      <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-white/15 rounded-lg transform rotate-45 scale-75 -translate-x-2 -translate-y-2"></div>
                      {/* Дополнительные элементы */}
                      <div className="absolute bottom-2 right-2 w-8 h-8 bg-white/25 rounded-full"></div>
                      <div className="absolute top-2 left-2 w-6 h-6 bg-white/20 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                      КОМПЛЕКСНАЯ<br />
                      АРЕНДА<br />
                      ИНТЕРАКТИВНОГО<br />
                      ОБОРУДОВАНИЯ
                    </h3>
                    <p className="text-white/95 text-sm leading-relaxed mb-6 drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                      Цена аренды нашего цифрового оборудования включает в себя 
                      полный спектр обслуживания: оперативная доставка, 
                      качественный монтаж и техническое сопровождение.
                    </p>
                  </div>
                  <div className="self-start border-white/50 text-white group-hover:bg-white/25 bg-white/10 group-hover:border-white/70 transition-all duration-300 drop-shadow-md backdrop-blur-sm relative z-10 px-4 py-2 rounded text-sm">
                    Подробнее →
                  </div>
                </Link>

                {/* SHOWREEL card */}
                <div 
                  className="gradient-card-purple rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={onShowShowreel}
                >
                  <h3 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                    SHOW<br />REEL
                  </h3>
                  <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300">
                    <Play className="h-8 w-8 text-white ml-1 drop-shadow-md" />
                  </div>
                </div>

                {/* ВДНХ card - весь блок кликабельный */}
                <Link 
                  to="/portfolio/samara-stand"
                  className="gradient-card-cyan rounded-3xl p-6 flex flex-col cursor-pointer hover:scale-105 transition-all duration-300 group"
                >
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">ВДНХ</h3>
                  <p className="text-white/95 text-sm mb-4 drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                    стенд Самарской области<br />
                    на выставке-форуме<br />
                    «Россия»
                  </p>
                  <div className="self-start border-white/40 text-white group-hover:bg-white/20 bg-white/10 group-hover:border-white/60 transition-all duration-300 mt-auto drop-shadow-md px-3 py-1 rounded text-sm">
                    посмотреть →
                  </div>
                </Link>

                {/* Samsung event card - весь блок кликабельный */}
                <Link 
                  to="/portfolio/samsung-event"
                  className="gradient-card-dark rounded-3xl p-6 flex flex-col row-span-1 cursor-pointer hover:scale-105 transition-all duration-300 group"
                >
                  <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">A Galaxy Event</h3>
                  <p className="text-white/95 text-sm mb-4 drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                    Особенный новый год Samsung
                  </p>
                  <div className="self-start border-white/40 text-white group-hover:bg-white/20 bg-white/10 group-hover:border-white/60 transition-all duration-300 mt-auto drop-shadow-md px-3 py-1 rounded text-sm">
                    посмотреть →
                  </div>
                </Link>

                {/* SHOWROOM card */}
                <div className="gradient-card-cyan rounded-3xl p-6 flex flex-col col-span-1">
                  <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-lg">
                    SHOW<br />ROOM
                  </h3>
                  <div className="flex items-center space-x-2 mt-auto">
                    <div className="w-12 h-12 bg-white/30 rounded-xl hover:bg-white/40 transition-all duration-300"></div>
                    <div className="w-12 h-12 bg-white/30 rounded-xl hover:bg-white/40 transition-all duration-300"></div>
                  </div>
                </div>

                {/* Samara exhibition card */}
                <div className="gradient-card-purple rounded-3xl p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">
                    Выставка «Самара»
                  </h3>
                  <p className="text-white/95 text-sm drop-shadow-md">
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