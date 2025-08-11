import { Button } from "@/components/ui/button";
import { Play, MapPin, Calendar, ArrowRight, Phone } from "lucide-react";
const ModernShowreelSection = () => {
  return <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Шоурум WESHOW
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Приглашаем вас посетить наш шоурум, где вы сможете увидеть современное 
              мультимедийное оборудование в действии и оценить качество наших решений
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-slate-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Адрес</h4>
                <p className="text-slate-600">Москва, ул. Б. Набережная, 12</p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="font-semibold text-slate-900 mb-2">
                Демонстрационная зона
              </h4>
              <p className="text-sm text-slate-600">
                LED-экраны, проекторы, интерактивные панели
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <h4 className="font-semibold text-slate-900 mb-2">
                VR/AR зона
              </h4>
              <p className="text-sm text-slate-600">
                Виртуальная и дополненная реальность
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="default">
                Записаться на демонстрацию
              </Button>
              <Button variant="outline" size="lg">
                Виртуальный тур
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ModernShowreelSection;