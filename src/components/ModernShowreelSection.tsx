
import { Button } from "@/components/ui/button";
import { Play, MapPin, Calendar, ArrowRight, Phone } from "lucide-react";

const ModernShowreelSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left side - Showreel */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Шоурил наших работ
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Посмотрите лучшие моменты наших проектов и убедитесь в качестве наших решений
            </p>
            
            {/* Video placeholder */}
            <div className="relative aspect-video rounded-3xl overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300">
              <div className="gradient-card-purple w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <Play className="h-10 w-10 text-white ml-1" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    WESHOW SHOWREEL 2024
                  </h3>
                  <p className="text-white/90">
                    3D-маппинг • Интерактивные инсталляции • LED-решения
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Showroom info */}
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              Шоурум WESHOW
            </h3>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Приглашаем вас посетить наш шоурум, где вы сможете увидеть современное 
              мультимедийное оборудование в действии и оценить качество наших решений.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Адрес</h4>
                  <p className="text-slate-600">Москва, ул. Примерная, 123</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Режим работы</h4>
                  <p className="text-slate-600">Пн-Пт: 10:00-19:00<br />Сб: 11:00-16:00</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Телефон</h4>
                  <p className="text-slate-600">+7 495 580 75 37</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="clean-card">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Демонстрационная зона
                </h4>
                <p className="text-sm text-slate-600">
                  LED-экраны, проекторы, интерактивные панели
                </p>
              </div>
              <div className="clean-card">
                <h4 className="font-semibold text-slate-900 mb-2">
                  VR/AR зона
                </h4>
                <p className="text-sm text-slate-600">
                  Виртуальная и дополненная реальность
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4">
                Записаться на демонстрацию
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 border-slate-300 text-slate-700 hover:bg-slate-100">
                Виртуальный тур
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernShowreelSection;
