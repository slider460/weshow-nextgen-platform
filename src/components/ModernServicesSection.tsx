import { useState } from "react";
import { Button } from "../components/ui/button";
import { ArrowRight, Sparkles, Monitor, Smartphone, Users, Palette, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationModal from "./ConsultationModal";

const ModernServicesSection = () => {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  const services = [
    {
      icon: Monitor,
      title: "Мультимедийные решения",
      description: "Интерактивные дисплеи, видеостены и проекционные системы для вашего бизнеса",
      features: ["LED-видеостены", "Интерактивные панели", "Проекционные системы"],
      color: "from-blue-500 to-cyan-500",
      link: "multimedia-content"
    },
    {
      icon: Smartphone,
      title: "Разработка ПО и игр",
      description: "Создание современных приложений, игр и интерактивных решений",
      features: ["Мобильные приложения", "Интерактивные игры", "AR/VR решения"],
      color: "from-purple-500 to-pink-500",
      link: "software-and-games"
    },
    {
      icon: Users,
      title: "Техническое сопровождение",
      description: "Полная поддержка и обслуживание всех установленных систем",
      features: ["24/7 мониторинг", "Профилактика", "Экстренная поддержка"],
      color: "from-green-500 to-emerald-500",
      link: "technical-support"
    },
    {
      icon: Palette,
      title: "Видеопродакшн",
      description: "Создание уникального визуального контента для ваших проектов",
      features: ["Съёмка видео", "Монтаж", "Анимация и графика"],
      color: "from-indigo-500 to-purple-500",
      link: "video-production"
    },
    {
      icon: Zap,
      title: "Аренда оборудования",
      description: "Временное использование профессионального мультимедийного оборудования",
      features: ["Гибкие условия", "Техподдержка", "Быстрая доставка"],
      color: "from-yellow-500 to-orange-500",
      link: "rental-multimedia-equipment"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-full blur-3xl opacity-60"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 border border-purple-200 text-sm font-medium text-purple-700 mb-6">
            🚀 Наши услуги
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Наши
            <span className="text-gradient bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
              услуги
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl p-8 border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
              
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-white transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-slate-600 text-sm leading-relaxed mb-6 group-hover:text-white/90 transition-colors duration-300">
                {service.description}
              </p>
              
              {/* Features */}
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-slate-600 group-hover:text-white/80 transition-colors duration-300">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-3 group-hover:bg-white/60 transition-colors duration-300" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Button */}
              <Button 
                variant="outline" 
                className="w-full border-slate-300 text-slate-700 hover:border-white/30 hover:text-white hover:bg-white/20 transition-all duration-300" 
                asChild
              >
                <Link to={`/services/${service.link}`}>
                  Узнать больше
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              {/* Sparkle effect */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="h-5 w-5 text-white/60" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-12 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">
                Нужен индивидуальный подход?
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Свяжитесь с нами для бесплатной консультации и разработки персонального предложения.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 text-lg font-semibold border-white/30 text-white hover:bg-white/20 bg-white/10"
                  onClick={() => setIsConsultModalOpen(true)}
                >
                  Получить консультацию
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="px-8 py-4 text-lg font-semibold border-white/30 text-white hover:bg-white/20 bg-white/10" 
                  asChild
                >
                  <Link to="/services">
                    Все услуги
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal 
        isOpen={isConsultModalOpen} 
        onClose={() => setIsConsultModalOpen(false)}
        title="Получить консультацию"
        triggerText="Получить консультацию"
      />
    </section>
  );
};

export default ModernServicesSection;
