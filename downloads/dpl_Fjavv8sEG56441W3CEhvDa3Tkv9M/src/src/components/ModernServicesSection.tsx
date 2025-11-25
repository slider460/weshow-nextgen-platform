
import { useState } from "react";
import { Button } from "../components/ui/button";
import { ArrowRight, Sparkles, Monitor, Smartphone, Users, Palette, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationModal from "./ConsultationModal";
import { useEdgeServices } from "../hooks/useEdgeAPI";
import { ServicesGridSkeleton } from "./ui/skeletons/ServiceSkeleton";

const ModernServicesSection = () => {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const { services, loading, error } = useEdgeServices();

  // Fallback сервисы для случаев ошибок
  const fallbackServices = [
    {
      icon: Monitor,
      title: "Мультимедийные решения",
      description: "Интерактивные дисплеи, видеостены и проекционные системы для вашего бизнеса",
      features: ["LED-видеостены", "Интерактивные панели", "Проекционные системы"],
      color: "from-blue-500 to-cyan-500",
      link: "multimedia"
    },
    {
      icon: Smartphone,
      title: "Разработка ПО и игр",
      description: "Создание современных приложений, игр и интерактивных решений",
      features: ["Мобильные приложения", "Интерактивные игры", "AR/VR решения"],
      color: "from-purple-500 to-pink-500",
      link: "development"
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
      title: "Брендинг мероприятий",
      description: "Создание уникального визуального образа для ваших событий",
      features: ["Визуальная идентичность", "Интерактивные элементы", "Цифровые решения"],
      color: "from-indigo-500 to-purple-500",
      link: "design"
    },
    {
      icon: Zap,
      title: "Аренда оборудования",
      description: "Временное использование профессионального мультимедийного оборудования",
      features: ["Гибкие условия", "Техподдержка", "Быстрая доставка"],
      color: "from-yellow-500 to-orange-500",
      link: "equipment-rental"
    }
  ];

  // Используем данные из БД или fallback
  const processedServices = services && services.length > 0 ? services.map((service, index) => ({
    icon: fallbackServices[index % fallbackServices.length]?.icon || Monitor,
    title: service.name,
    description: service.description,
    features: service.features || fallbackServices[index % fallbackServices.length]?.features || [],
    color: fallbackServices[index % fallbackServices.length]?.color || "from-blue-500 to-cyan-500",
    link: service.slug || fallbackServices[index % fallbackServices.length]?.link || "service"
  })) : fallbackServices;

  // Показываем skeleton во время загрузки
  if (loading) {
    return (
      <section className="py-24 bg-slate-50 relative overflow-hidden">
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
          <ServicesGridSkeleton count={6} />
        </div>
      </section>
    );
  }

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
          {processedServices.map((service, index) => (
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
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            
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
