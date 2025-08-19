import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Code, Settings, Calendar, Package, Palette, Layers, ShoppingCart, Cog, Video, Users, Gamepad2, Smartphone, Globe, Zap, Shield, Wrench, Headphones, Database, Phone, Building2, Hammer, Puzzle, Sparkles, Eye, Projector, Lightbulb, Box, Grid3X3, Move, View, Info, Play } from "lucide-react";
import { Link } from "react-router-dom";
import ShowreelButton from "@/components/ShowreelButton";

const Services = () => {
  const serviceCategories = [
    {
      title: "Аренда и продажа мультимедийных решений",
      icon: <Monitor className="h-12 w-12" />,
      description: "LED-видеостены, проекторы, звуковое оборудование",
      gradient: "from-blue-500 to-purple-600",
      services: [
        { name: "Кинетический экран", icon: <Move className="h-5 w-5" />, description: "Движущиеся интерактивные поверхности", link: "kinetic-screen" },
        { name: "Матричный экран", icon: <Grid3X3 className="h-5 w-5" />, description: "Многосегментные LED дисплеи", link: "matrix-screen" },
        { name: "Прозрачный экран", icon: <View className="h-5 w-5" />, description: "Полупрозрачные дисплеи", link: "transparent-screen" },
        { name: "Информационные панели", icon: <Info className="h-5 w-5" />, description: "Цифровые вывески", link: "info-panels" },
        { name: "Проекторы (от 10000 люмен)", icon: <Projector className="h-5 w-5" />, description: "Высокояркостная проекция", link: "projectors" },
        { name: "Гибкий неон", icon: <Lightbulb className="h-5 w-5" />, description: "Эластичная LED подсветка", link: "flexible-neon" },
        { name: "Проекционные сетки", icon: <Projector className="h-5 w-5" />, description: "Специальные поверхности для проекции", link: "projection-screens" },
        { name: "Голографические вентиляторы", icon: <Box className="h-5 w-5" />, description: "3D голограммы в воздухе", link: "holographic-fans" },
        { name: "Очки дополненной реальности", icon: <Eye className="h-5 w-5" />, description: "AR технологии", link: "ar-glasses" }
      ],
      link: "equipment-rental"
    },
    {
      title: "Разработка уникального ПО и игр",
      icon: <Code className="h-12 w-12" />,
      description: "AR/VR приложения, интерактивные игры, специальные решения",
      gradient: "from-green-500 to-blue-600",
      services: [
        { name: "AR/VR приложения", icon: <Layers className="h-5 w-5" />, description: "Дополненная и виртуальная реальность", link: "ar-vr-apps" },
        { name: "Интерактивные игры", icon: <Gamepad2 className="h-5 w-5" />, description: "Жестовое управление и распознавание движений", link: "interactive-games" },
        { name: "Специальные решения", icon: <Smartphone className="h-5 w-5" />, description: "iOS и Android разработка", link: "mobile-solutions" },
        { name: "Web-платформы", icon: <Globe className="h-5 w-5" />, description: "Современные веб-технологии", link: "web-platforms" },
        { name: "Кроссплатформенные решения", icon: <Code className="h-5 w-5" />, description: "Работа на всех устройствах", link: "cross-platform" }
      ],
      link: "development"
    },
    {
      title: "Разработка и адаптация контента",
      icon: <Palette className="h-12 w-12" />,
      description: "Создание и адаптация мультимедийного контента",
      gradient: "from-pink-500 to-rose-600",
      services: [
        { name: "Создание контента", icon: <Video className="h-5 w-5" />, description: "Анимация и видеоконтент", link: "content-creation" },
        { name: "Адаптация", icon: <Palette className="h-5 w-5" />, description: "Разработка визуальной концепции", link: "content-adaptation" },
        { name: "Мультимедиа", icon: <Monitor className="h-5 w-5" />, description: "Стильные презентации и слайды", link: "multimedia-content" },
        { name: "Фирменная презентация", icon: <Package className="h-5 w-5" />, description: "Дизайн корпоративных подарков", link: "corporate-design" },
        { name: "Оформление пространства", icon: <Layers className="h-5 w-5" />, description: "Декор и навигация на мероприятии", link: "space-decoration" }
      ],
      link: "design"
    },
    {
      title: "Техническое сопровождение",
      icon: <Settings className="h-12 w-12" />,
      description: "Полное техническое сопровождение мероприятий",
      gradient: "from-orange-500 to-red-600",
      services: [
        { name: "Техническая поддержка", icon: <Headphones className="h-5 w-5" />, description: "Круглосуточная онлайн поддержка", link: "tech-support" },
        { name: "Монтаж", icon: <Wrench className="h-5 w-5" />, description: "Оперативный выезд специалистов", link: "installation" },
        { name: "Настройка", icon: <Users className="h-5 w-5" />, description: "Консультации по оптимизации", link: "configuration" },
        { name: "Диагностика оборудования", icon: <Shield className="h-5 w-5" />, description: "Полная проверка систем", link: "equipment-diagnostics" },
        { name: "Плановое обслуживание", icon: <Calendar className="h-5 w-5" />, description: "Регулярные профилактические работы", link: "maintenance" }
      ],
      link: "technical-support"
    },
    {
      title: "Интеграция мультимедиа",
      icon: <Puzzle className="h-12 w-12" />,
      description: "Комплексная интеграция мультимедийных систем",
      gradient: "from-purple-500 to-pink-600",
      services: [
        { name: "Системная интеграция", icon: <Database className="h-5 w-5" />, description: "Объединение различных технологий", link: "system-integration" },
        { name: "Настройка", icon: <Settings className="h-5 w-5" />, description: "Профессиональная калибровка", link: "system-configuration" },
        { name: "Тестирование", icon: <Zap className="h-5 w-5" />, description: "Идеальная синхронизация всех элементов", link: "system-testing" },
        { name: "Автоматизация процессов", icon: <Cog className="h-5 w-5" />, description: "Умные сценарии управления", link: "process-automation" },
        { name: "Масштабирование систем", icon: <Layers className="h-5 w-5" />, description: "Готовность к росту проекта", link: "system-scaling" }
      ],
      link: "complex-solutions"
    },
    {
      title: "Брендинг мероприятий",
      icon: <Sparkles className="h-12 w-12" />,
      description: "Создание уникального брендинга для мероприятий",
      gradient: "from-cyan-500 to-blue-600",
      services: [
        { name: "Визуальная идентификация", icon: <Palette className="h-5 w-5" />, description: "Разработка визуальной концепции", link: "visual-identity" },
        { name: "Дизайн-макеты", icon: <Video className="h-5 w-5" />, description: "Анимация и видеоконтент", link: "design-mockups" },
        { name: "Брендинг", icon: <Monitor className="h-5 w-5" />, description: "Стильные презентации и слайды", link: "event-branding" },
        { name: "Фирменная презентация", icon: <Package className="h-5 w-5" />, description: "Дизайн корпоративных подарков", link: "corporate-presentation" },
        { name: "Оформление пространства", icon: <Layers className="h-5 w-5" />, description: "Декор и навигация на мероприятии", link: "space-branding" }
      ],
      link: "design"
    },
    {
      title: "Проектирование пространств",
      icon: <Building2 className="h-12 w-12" />,
      description: "Проектирование и планирование пространств",
      gradient: "from-teal-500 to-cyan-600",
      services: [
        { name: "Планирование", icon: <Layers className="h-5 w-5" />, description: "Архитектурное планирование", link: "space-planning" },
        { name: "Дизайн", icon: <Palette className="h-5 w-5" />, description: "Визуальное оформление", link: "space-design" },
        { name: "Реализация", icon: <Wrench className="h-5 w-5" />, description: "Техническая реализация", link: "space-implementation" },
        { name: "3D моделирование", icon: <Monitor className="h-5 w-5" />, description: "Создание 3D моделей", link: "3d-modeling" },
        { name: "Техническая документация", icon: <Database className="h-5 w-5" />, description: "Полная документация проекта", link: "technical-documentation" }
      ],
      link: "complex-solutions"
    },
    {
      title: "Проектирование временных и постоянных инсталляций",
      icon: <Hammer className="h-12 w-12" />,
      description: "Создание инсталляций любой сложности",
      gradient: "from-slate-600 to-slate-800",
      services: [
        { name: "Временные инсталляции", icon: <Calendar className="h-5 w-5" />, description: "Для мероприятий и выставок", link: "temporary-installations" },
        { name: "Постоянные инсталляции", icon: <Building2 className="h-5 w-5" />, description: "Долгосрочные проекты", link: "permanent-installations" },
        { name: "Монтаж", icon: <Wrench className="h-5 w-5" />, description: "Профессиональный монтаж", link: "installation-services" },
        { name: "Техническое обслуживание", icon: <Settings className="h-5 w-5" />, description: "Регулярное обслуживание", link: "technical-maintenance" },
        { name: "Модернизация", icon: <Zap className="h-5 w-5" />, description: "Обновление существующих систем", link: "system-upgrade" }
      ],
      link: "complex-solutions"
    },
    {
      title: "3D маппинг шоу",
      icon: <Video className="h-12 w-12" />,
      description: "От расчета оборудования до разработки контента и технической реализации",
      gradient: "from-blue-500 to-purple-600",
      services: [
        { name: "Расчет оборудования", icon: <Settings className="h-5 w-5" />, description: "Технический расчет и подбор", link: "equipment-calculation" },
        { name: "Разработка контента", icon: <Video className="h-5 w-5" />, description: "Создание уникального контента", link: "content-development" },
        { name: "Техническая реализация", icon: <Wrench className="h-5 w-5" />, description: "Монтаж и настройка", link: "technical-implementation" },
        { name: "3D моделирование", icon: <Monitor className="h-5 w-5" />, description: "Создание 3D моделей", link: "3d-mapping-modeling" },
        { name: "Проекция и маппинг", icon: <Zap className="h-5 w-5" />, description: "Проекция на любые поверхности", link: "projection-mapping" }
      ],
      link: "multimedia"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/20 to-accent/20 text-primary rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-primary/30">
              <Zap className="h-5 w-5 mr-2 animate-pulse" />
              Полный спектр услуг
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-8 leading-tight">
              Наши услуги
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl mx-auto">
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
              <div key={index} className={`relative bg-gradient-to-br ${category.gradient} rounded-3xl p-8 text-white overflow-hidden group hover:scale-105 transition-all duration-700 shadow-2xl hover:shadow-3xl`}>
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-700"></div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-white/5 rounded-full blur-lg group-hover:scale-125 transition-transform duration-700"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-8">
                    <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/30">
                      {category.icon}
                    </div>
                    <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                      <ArrowRight className="h-6 w-6 opacity-60 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-white transition-colors duration-500">{category.title}</h3>
                  <p className="text-white/90 mb-8 text-lg leading-relaxed">{category.description}</p>
                  
                  <div className="space-y-4 mb-8">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="group/service flex items-start space-x-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40">
                        <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg group-hover/service:scale-110 transition-transform duration-300">
                          {service.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1 group-hover/service:text-white transition-colors duration-300">{service.name}</h4>
                          <p className="text-white/80 text-sm leading-relaxed">{service.description}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="opacity-0 group-hover/service:opacity-100 transition-all duration-300 text-white hover:bg-white/20"
                          asChild
                        >
                          <Link to={`/services/${service.link}`}>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="secondary" 
                    className="w-full bg-white/20 border-white/30 text-white hover:bg-white hover:text-slate-900 backdrop-blur-sm transition-all duration-500 hover:scale-105 shadow-lg hover:shadow-xl"
                    asChild
                  >
                    <Link to={`/services/${category.link}`}>
                      Узнать подробнее
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-slate-900 mb-8">
                Почему выбирают нас
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Наша команда профессионалов готова воплотить любые идеи в жизнь
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-6">Надежность</h3>
                <p className="text-slate-600 leading-relaxed">Гарантируем стабильную работу всех систем</p>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-3xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                  <Zap className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-6">Инновации</h3>
                <p className="text-slate-600 leading-relaxed">Используем самые современные технологии</p>
              </div>
              
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-6">Поддержка</h3>
                <p className="text-slate-600 leading-relaxed">Индивидуальный подход к каждому проекту</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Готовы создать что-то удивительное?
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Обсудим ваш проект и найдем оптимальное решение. Первая консультация — бесплатно!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-slate-900 hover:bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 px-8 py-4 text-lg"
                asChild
              >
                <Link to="/contact">
                  <Phone className="mr-2 h-5 w-5" />
                  Связаться с нами
                </Link>
              </Button>
              
              <ShowreelButton
                variant="outline"
                size="lg"
                icon="film"
                className="border-white/30 text-white hover:bg-white hover:text-slate-900 transition-all duration-500 hover:scale-105 px-8 py-4 text-lg backdrop-blur-sm"
              >
                <Play className="mr-2 h-5 w-5" />
                Смотреть шоурил
              </ShowreelButton>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-slate-900 transition-all duration-500 hover:scale-105 px-8 py-4 text-lg backdrop-blur-sm"
                asChild
              >
                <Link to="/portfolio">
                  Смотреть портфолио
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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