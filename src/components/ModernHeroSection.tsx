
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

const ModernHeroSection = () => {
  return (
    <section className="relative min-h-screen bg-slate-50 overflow-hidden">
      {/* Navigation spacing */}
      <div className="pt-20">
        {/* Main content grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            
            {/* Left side - Main content */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                  Комплексные
                  <br />
                  <span className="text-gradient">мультимедийные</span>
                  <br />
                  решения
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Профессиональное техническое оснащение и интерактивные 
                  инсталляции для корпоративных клиентов
                </p>
              </div>
              
              <div className="flex justify-start">
                <Button size="lg" variant="default" className="px-8 py-4 text-lg">
                  Получить консультацию
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right side - Cards grid */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 h-full">
              
              {/* Large purple card */}
              <div className="gradient-card-purple rounded-3xl p-8 flex flex-col justify-between row-span-2">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    КОМПЛЕКСНАЯ<br />
                    АРЕНДА<br />
                    ИНТЕРАКТИВНОГО<br />
                    ОБОРУДОВАНИЯ
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed mb-6">
                    Цена аренды нашего цифрового оборудования включает в себя 
                    полный спектр обслуживания: оперативная доставка, 
                    качественный монтаж и техническое сопровождение.
                  </p>
                </div>
                <Button variant="outline" className="self-start border-white/30 text-white hover:bg-white/20 bg-white/10">
                  Подробнее
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
                <Button variant="outline" className="self-start border-white/30 text-white hover:bg-white/20 bg-white/10 mt-auto">
                  посмотреть
                </Button>
              </div>

              {/* Samsung event card */}
              <div className="gradient-card-dark rounded-3xl p-6 flex flex-col row-span-1">
                <h3 className="text-xl font-bold text-white mb-2">A Galaxy Event</h3>
                <p className="text-white/90 text-sm mb-4">
                  Особенный новый год Samsung
                </p>
                <Button variant="outline" className="self-start border-white/30 text-white hover:bg-white/20 bg-white/10 mt-auto">
                  посмотреть
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
    </section>
  );
};

export default ModernHeroSection;
