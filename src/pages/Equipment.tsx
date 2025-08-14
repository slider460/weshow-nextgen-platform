import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Monitor, Projector, Speaker, Lightbulb, Cpu, Tv, ArrowRight } from "lucide-react";
import { useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";

const Equipment = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const equipmentCategories = [
    {
      icon: <Tv className="h-8 w-8" />,
      title: "LED-панели и видеостены",
      description: "Высококачественные LED-дисплеи для любых задач",
      items: [
        { name: "LED-панель P2.5 (indoor)", specs: "500x500мм, 200000 точек/м²", price: "от 5000₽/день" },
        { name: "LED-панель P3.9 (outdoor)", specs: "500x1000мм, 65536 точек/м²", price: "от 3500₽/день" },
        { name: "Видеостена 3x3", specs: "1.5x1.5м, Full HD", price: "от 25000₽/день" },
        { name: "Мобильный LED-экран", specs: "6x4м, P5, трейлер", price: "от 45000₽/день" }
      ],
      gradient: "gradient-card-blue"
    },
    {
      icon: <Projector className="h-8 w-8" />,
      title: "Проекторы и экраны",
      description: "Профессиональное проекционное оборудование",
      items: [
        { name: "Проектор 6000 ANSI", specs: "Full HD, LCD", price: "от 8000₽/день" },
        { name: "Проектор 12000 ANSI", specs: "4K, лазерный", price: "от 15000₽/день" },
        { name: "Экран 3x4м", specs: "Fast-fold, front/rear", price: "от 3000₽/день" },
        { name: "Экран 6x8м", specs: "Натяжной, seamless", price: "от 8000₽/день" }
      ],
      gradient: "gradient-card-purple"
    },
    {
      icon: <Speaker className="h-8 w-8" />,
      title: "Звуковые системы",
      description: "Профессиональное звуковое оборудование",
      items: [
        { name: "Линейный массив", specs: "L-Acoustics KARA, 2x12", price: "от 12000₽/день" },
        { name: "Активная акустика", specs: "JBL VTX A12, комплект", price: "от 8000₽/день" },
        { name: "Микрофонная система", specs: "Shure ULXD, 8 каналов", price: "от 5000₽/день" },
        { name: "Микшерный пульт", specs: "Yamaha CL5, 72 канала", price: "от 6000₽/день" }
      ],
      gradient: "gradient-card-cyan"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Освещение",
      description: "Световое оборудование для мероприятий",
      items: [
        { name: "Moving Head", specs: "Clay Paky Sharpy Plus, 1200W", price: "от 2500₽/день" },
        { name: "LED Par", specs: "RGBW, 18x15W", price: "от 800₽/день" },
        { name: "Стробоскопы", specs: "Atomic 3000W", price: "от 1500₽/день" },
        { name: "Лазерная установка", specs: "RGB 10W, ILDA", price: "от 4000₽/день" }
      ],
      gradient: "gradient-card-dark"
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Интерактивные панели",
      description: "Сенсорные дисплеи и интерактивные решения",
      items: [
        { name: "Сенсорная панель 55\"", specs: "4K, мультитач 20 точек", price: "от 4000₽/день" },
        { name: "Интерактивная доска", specs: "SMART Board, 77\"", price: "от 3500₽/день" },
        { name: "Киоск-терминал", specs: "32\", металлический корпус", price: "от 2500₽/день" },
        { name: "Голографический дисплей", specs: "46\", 3D эффект", price: "от 8000₽/день" }
      ],
      gradient: "gradient-card-purple"
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Системы управления",
      description: "Оборудование для управления и коммутации",
      items: [
        { name: "Медиасервер", specs: "4K, 8 выходов", price: "от 6000₽/день" },
        { name: "Видеокоммутатор", specs: "16x16, HDMI 4K", price: "от 3000₽/день" },
        { name: "Система видеоконференций", specs: "Poly Studio X70", price: "от 4500₽/день" },
        { name: "Контроллер освещения", specs: "MA Lighting, 2048 каналов", price: "от 5000₽/день" }
      ],
      gradient: "gradient-card-blue"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D220.1%22%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8 border border-white/30">
              <Monitor className="h-5 w-5 mr-2 animate-pulse" />
              Оборудование в аренду
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Каталог оборудования
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Профессиональное мультимедийное оборудование в аренду для любых мероприятий
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/20 bg-white/10"
              onClick={() => setIsConsultationOpen(true)}
            >
              Получить консультацию
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Equipment Categories */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Категории оборудования
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Весь спектр технического оборудования для проведения мероприятий любого масштаба
              </p>
            </div>

            <div className="space-y-16">
              {equipmentCategories.map((category, index) => (
                <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Category Header */}
                  <div className={`${category.gradient} rounded-3xl p-8`}>
                    <div className="text-white mb-6">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {category.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Equipment Items */}
                  <div className="lg:col-span-2 space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-slate-50 rounded-2xl p-6 hover:bg-slate-100 transition-colors">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="mb-4 md:mb-0">
                            <h4 className="text-lg font-bold text-slate-900 mb-2">
                              {item.name}
                            </h4>
                            <p className="text-slate-600 text-sm">
                              {item.specs}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="text-xl font-bold text-primary">
                              {item.price}
                            </span>
                            <Button size="sm" variant="outline">
                              Заказать
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Дополнительные услуги
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ArrowRight className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Доставка и монтаж</h3>
                <p className="text-slate-600">Доставим и установим оборудование в любой точке Москвы и области</p>
              </div>

              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Cpu className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Техническая поддержка</h3>
                <p className="text-slate-600">Специалист на объекте на протяжении всего мероприятия</p>
              </div>

              <div className="bg-white rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Monitor className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Настройка и калибровка</h3>
                <p className="text-slate-600">Профессиональная настройка оборудования под ваши задачи</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Нужна консультация по оборудованию?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Наши специалисты помогут подобрать оптимальный комплект оборудования для вашего мероприятия
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/20 bg-white/10"
                  onClick={() => setIsConsultationOpen(true)}
                >
                  Получить консультацию
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/20 bg-white/10"
                >
                  Скачать каталог
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <ConsultationModal 
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        title="Консультация по оборудованию"
      />
    </div>
  );
};

export default Equipment;