import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const ModernHeroSection = () => {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  return <section className="relative min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-purple-50/20"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
      
      {/* Navigation spacing */}
      <div className="relative pt-24 pb-16">
        {/* Main content grid */}
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-160px)]">
            
            {/* Left side - Main content */}
            <div className="lg:col-span-5 space-y-8 lg:pr-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-white/30 text-sm font-medium text-slate-700">
                  🎯 Профессиональные решения
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight break-words">
                  Комплексные
                  <br />
                  <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block sm:inline">
                    мультимедийные
                  </span>
                  <br />
                  решения
                </h1>
                
                <p className="text-lg lg:text-xl text-slate-700 leading-relaxed max-w-lg">Аренда на мероприятия, продажа, разработка и интеграция</p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => setIsConsultModalOpen(true)}
                  >
                    Получить консультацию
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold bg-white/70 backdrop-blur-sm border-slate-300 text-slate-700 hover:bg-white/90 transition-all duration-300" asChild>
                    <a href="/portfolio" className="inline-flex items-center">
                      Наши проекты
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right side - Cards grid */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 h-full max-h-[600px]">
              
              {/* Large purple card */}
              <div className="gradient-card-purple rounded-3xl p-8 flex flex-col justify-between row-span-2">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    КОМПЛЕКСНАЯ<br />
                    АРЕНДА<br />
                    ИНТЕРАКТИВНОГО<br />
                    ОБОРУДОВАНИЯ
                  </h3>
                  <p className="text-white text-sm leading-relaxed mb-6">
                    Цена аренды нашего цифрового оборудования включает в себя 
                    полный спектр обслуживания: оперативная доставка, 
                    качественный монтаж и техническое сопровождение.
                  </p>
                </div>
                <Button variant="outline" className="self-start border-white/30 text-white hover:bg-white/20 bg-white/10" asChild>
                  <a href="/equipment">
                    Подробнее
                  </a>
                </Button>
              </div>

              {/* SHOWREEL card */}
              <div className="gradient-card-purple rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                <h3 className="text-4xl font-bold text-white mb-4">
                  SHOW<br />REEL
                </h3>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
              </div>

              {/* ВДНХ card */}
              <div className="gradient-card-cyan rounded-3xl p-6 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-2">ВДНХ</h3>
                <p className="text-white/90 text-sm mb-4">
                  стенд Самарской области<br />
                  на выставке-форуме<br />
                  «Россия»
                </p>
                <Button variant="outline" className="self-start border-white/30 text-white hover:bg-white/20 bg-white/10 mt-auto" asChild>
                  <a href="/portfolio/samara-stand">
                    посмотреть
                  </a>
                </Button>
              </div>

              {/* Samsung event card */}
              <div className="gradient-card-dark rounded-3xl p-6 flex flex-col row-span-1">
                <h3 className="text-xl font-bold text-white mb-2">A Galaxy Event</h3>
                <p className="text-white/90 text-sm mb-4">
                  Особенный новый год Samsung
                </p>
                <Button variant="outline" className="self-start border-white/30 text-white hover:bg-white/20 bg-white/10 mt-auto" asChild>
                  <a href="/portfolio">
                    посмотреть
                  </a>
                </Button>
              </div>

              {/* SHOWROOM card */}
              <div className="gradient-card-cyan rounded-3xl p-6 flex flex-col col-span-1">
                <h3 className="text-2xl font-bold text-white mb-4">
                  SHOW<br />ROOM
                </h3>
                <div className="flex items-center space-x-2 mt-auto">
                  <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl"></div>
                </div>
              </div>

              {/* Samara exhibition card */}
              <div className="gradient-card-purple rounded-3xl p-6 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">
                  Выставка «Самара»
                </h3>
                <p className="text-white/90 text-sm">
                  интерактивные решения
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <ConsultationModal isOpen={isConsultModalOpen} onClose={() => setIsConsultModalOpen(false)} />
    </section>;
};
export default ModernHeroSection;