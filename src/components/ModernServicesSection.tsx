
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Code, Settings, Calendar, Palette, Store } from "lucide-react";

const ModernServicesSection = () => {
  const services = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Мультимедийные решения",
      description: "3D-маппинг, LED-экраны, интерактивные инсталляции для создания впечатляющих визуальных эффектов",
      features: ["3D-маппинг шоу", "LED-видеостены", "Интерактивные дисплеи"],
      gradient: "gradient-card-purple"
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Разработка ПО и игр",
      description: "Создание интерактивных приложений и игровых решений для вашего бизнеса",
      features: ["AR/VR приложения", "Игры на Kinect", "Интерактивный контент"],
      gradient: "gradient-card-blue"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Техническое сопровождение",
      description: "Профессиональная поддержка мероприятий и инсталляций 24/7",
      features: ["24/7 поддержка", "Выездное обслуживание", "Консультации"],
      gradient: "gradient-card-cyan"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Мероприятия под ключ",
      description: "Комплексная организация корпоративных и частных мероприятий",
      features: ["Концепция", "Техническое оснащение", "Сопровождение"],
      gradient: "gradient-card-dark"
    },
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Брендинг и дизайн",
      description: "Создание уникального визуального образа для ваших событий",
      features: ["Фирменный стиль", "Брендированный контент", "Визуализация"],
      gradient: "gradient-card-purple"
    },
    {
      icon: <Store className="h-8 w-8" />,
      title: "Продажа оборудования",
      description: "Поставка профессионального мультимедийного оборудования",
      features: ["LED-панели", "Проекторы", "Звуковые системы"],
      gradient: "gradient-card-blue"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Наши услуги
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Полный спектр мультимедийных решений от разработки контента до технической реализации
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className={`${service.gradient} rounded-3xl p-8 hover:scale-105 transition-all duration-300`}>
              <div className="text-white mb-6">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {service.title}
              </h3>
              
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-white/80">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/20">
                Узнать больше
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-slate-50 rounded-3xl p-12 border border-slate-200">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Готовы обсудить ваш проект?
            </h3>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Наши эксперты разработают техническое решение, которое идеально подойдет для ваших задач
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="hero">
                Обсудить проект
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                Все услуги
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernServicesSection;
