import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Code, Settings, Calendar, Package, Palette, Layers, ShoppingCart, Cog, Video, Users, Gamepad2, Smartphone, Globe, Zap, Shield, Wrench, Headphones, Database, Phone } from "lucide-react";

const Services = () => {
  const serviceCategories = [
    {
      title: "Мультимедийные решения",
      icon: <Monitor className="h-12 w-12" />,
      description: "Создание впечатляющих визуальных эффектов и интерактивного контента",
      gradient: "from-blue-500 to-purple-600",
      services: [
        { name: "3D-маппинг проекции", icon: <Video className="h-5 w-5" />, description: "Проекции на любые поверхности с идеальной геометрией" },
        { name: "LED-видеостены и экраны", icon: <Monitor className="h-5 w-5" />, description: "Высокое разрешение для любых масштабов" },
        { name: "Интерактивные инсталляции", icon: <Zap className="h-5 w-5" />, description: "Сенсорные и жестовые технологии" },
        { name: "Голографические дисплеи", icon: <Layers className="h-5 w-5" />, description: "Объемное изображение без очков" },
        { name: "Иммерсивные среды", icon: <Globe className="h-5 w-5" />, description: "360° погружение в виртуальную реальность" }
      ]
    },
    {
      title: "Разработка ПО и игр",
      icon: <Code className="h-12 w-12" />,
      description: "Индивидуальные программные решения для любых задач",
      gradient: "from-green-500 to-blue-600",
      services: [
        { name: "Интерактивные приложения", icon: <Smartphone className="h-5 w-5" />, description: "Кроссплатформенные решения" },
        { name: "AR/VR разработка", icon: <Layers className="h-5 w-5" />, description: "Дополненная и виртуальная реальность" },
        { name: "Игры на базе Kinect", icon: <Gamepad2 className="h-5 w-5" />, description: "Жестовое управление и распознавание движений" },
        { name: "Мобильные приложения", icon: <Smartphone className="h-5 w-5" />, description: "iOS и Android разработка" },
        { name: "Web-платформы", icon: <Globe className="h-5 w-5" />, description: "Современные веб-технологии" }
      ]
    },
    {
      title: "Техническое сопровождение",
      icon: <Settings className="h-12 w-12" />,
      description: "Профессиональная поддержка на всех этапах проекта",
      gradient: "from-orange-500 to-red-600",
      services: [
        { name: "24/7 техническая поддержка", icon: <Headphones className="h-5 w-5" />, description: "Круглосуточная онлайн поддержка" },
        { name: "Выездное обслуживание", icon: <Wrench className="h-5 w-5" />, description: "Оперативный выезд специалистов" },
        { name: "Консультации экспертов", icon: <Users className="h-5 w-5" />, description: "Консультации по оптимизации" },
        { name: "Диагностика оборудования", icon: <Shield className="h-5 w-5" />, description: "Полная проверка систем" },
        { name: "Плановое обслуживание", icon: <Calendar className="h-5 w-5" />, description: "Регулярные профилактические работы" }
      ]
    },
    {
      title: "Интеграция мультимедии",
      icon: <Cog className="h-12 w-12" />,
      description: "Комплексная интеграция всех систем в единое решение",
      gradient: "from-purple-500 to-pink-600",
      services: [
        { name: "Системная интеграция", icon: <Database className="h-5 w-5" />, description: "Объединение различных технологий" },
        { name: "Настройка оборудования", icon: <Settings className="h-5 w-5" />, description: "Профессиональная калибровка" },
        { name: "Синхронизация контента", icon: <Zap className="h-5 w-5" />, description: "Идеальная синхронизация всех элементов" },
        { name: "Автоматизация процессов", icon: <Cog className="h-5 w-5" />, description: "Умные сценарии управления" },
        { name: "Масштабирование систем", icon: <Layers className="h-5 w-5" />, description: "Готовность к росту проекта" }
      ]
    },
    {
      title: "Брендинг мероприятий",
      icon: <Palette className="h-12 w-12" />,
      description: "Создание уникального визуального стиля для событий",
      gradient: "from-pink-500 to-rose-600",
      services: [
        { name: "Концепция и дизайн", icon: <Palette className="h-5 w-5" />, description: "Разработка визуальной концепции" },
        { name: "Брендированный контент", icon: <Video className="h-5 w-5" />, description: "Анимация и видеоконтент" },
        { name: "Фирменная презентация", icon: <Monitor className="h-5 w-5" />, description: "Стильные презентации и слайды" },
        { name: "Сувенирная продукция", icon: <Package className="h-5 w-5" />, description: "Дизайн корпоративных подарков" },
        { name: "Оформление пространства", icon: <Layers className="h-5 w-5" />, description: "Декор и навигация на мероприятии" }
      ]
    },
    {
      title: "Аренда оборудования",
      icon: <ShoppingCart className="h-12 w-12" />,
      description: "Профессиональное оборудование в аренду с поддержкой",
      gradient: "from-indigo-500 to-blue-600",
      services: [
        { name: "LED-экраны и панели", icon: <Monitor className="h-5 w-5" />, description: "Различные размеры и разрешения" },
        { name: "Проекционное оборудование", icon: <Video className="h-5 w-5" />, description: "Проекторы высокого разрешения" },
        { name: "Звуковые системы", icon: <Headphones className="h-5 w-5" />, description: "Профессиональный звук" },
        { name: "Интерактивные панели", icon: <Zap className="h-5 w-5" />, description: "Сенсорные дисплеи и киоски" },
        { name: "Системы управления", icon: <Settings className="h-5 w-5" />, description: "Пульты и системы контроля" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Полный спектр услуг
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">
              Наши услуги
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              От концепции до реализации — создаем уникальные мультимедийные решения для любых задач
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {serviceCategories.map((category, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${category.gradient} rounded-3xl p-8 text-white overflow-hidden group hover:scale-105 transition-all duration-500 shadow-2xl`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <ArrowRight className="h-6 w-6 opacity-60 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4">{category.title}</h3>
                  <p className="text-white/90 mb-8 text-lg">{category.description}</p>
                  
                  <div className="space-y-4">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-start space-x-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                        <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg">
                          {service.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-1">{service.name}</h4>
                          <p className="text-white/80 text-sm">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="secondary" 
                    className="mt-8 w-full bg-white/20 border-white/30 text-white hover:bg-white hover:text-slate-900 backdrop-blur-sm transition-all duration-300"
                  >
                    Узнать подробнее
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Почему выбирают нас
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Наша команда профессионалов готова воплотить любые идеи в жизнь
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Надежность</h3>
                <p className="text-slate-600">Гарантируем стабильную работу всех систем</p>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Инновации</h3>
                <p className="text-slate-600">Используем самые современные технологии</p>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Поддержка</h3>
                <p className="text-slate-600">Индивидуальный подход к каждому проекту</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Готовы создать что-то удивительное?
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
              Обсудим ваш проект и найдем оптимальное решение. Первая консультация — бесплатно!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-slate-900 hover:bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Phone className="mr-2 h-5 w-5" />
                Связаться с нами
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-slate-900 transition-all duration-300"
              >
                Смотреть портфолио
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;