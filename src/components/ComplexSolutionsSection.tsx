import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Users, Trophy, Globe, Presentation, Store, Construction, Video } from "lucide-react";
import { Link } from "react-router-dom";

const ComplexSolutionsSection = () => {
  const solutions = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Частные мероприятия",
      description: "Свадьбы, дни рождения, корпоративы",
      features: ["Световое оформление", "Звуковое сопровождение", "Фото/видео"],
      gradient: "gradient-card-purple"
    },
    {
      icon: <Presentation className="h-8 w-8" />,
      title: "Презентации/конференции/форумы",
      description: "Профессиональное техническое обеспечение",
      features: ["Проекция", "Синхронный перевод", "Стриминг"],
      gradient: "gradient-card-blue"
    },
    {
      icon: <Store className="h-8 w-8" />,
      title: "Выставочные стенды",
      description: "Мультимедийное оформление стендов",
      features: ["Интерактивные панели", "LED-экраны", "Презентации"],
      gradient: "gradient-card-cyan"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Спортивные мероприятия",
      description: "Техническое сопровождение соревнований",
      features: ["Табло", "Звуковое сопровождение", "Видеоповторы"],
      gradient: "gradient-card-dark"
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Корпоративные мероприятия",
      description: "Комплексные решения для бизнеса",
      features: ["Брендинг", "Презентации", "Развлечения"],
      gradient: "gradient-card-purple"
    },
    {
      icon: <Video className="h-8 w-8" />,
      title: "Online мероприятия",
      description: "Цифровые события и стриминг",
      features: ["Многокамерная съемка", "Стриминг", "Интерактив"],
      gradient: "gradient-card-blue"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Презентации спортивных объектов",
      description: "Техническое оснащение спортивных арен",
      features: ["Видеокубы", "Медиафасады", "Системы управления"],
      gradient: "gradient-card-cyan"
    },
    {
      icon: <Store className="h-8 w-8" />,
      title: "Презентации ТРЦ",
      description: "Мультимедийные решения для торговых центров",
      features: ["Навигация", "Реклама", "Интерактивные зоны"],
      gradient: "gradient-card-dark"
    },
    {
      icon: <Construction className="h-8 w-8" />,
      title: "Презентации строительных объектов",
      description: "Визуализация проектов недвижимости",
      features: ["3D-туры", "Интерактивные макеты", "VR-презентации"],
      gradient: "gradient-card-purple"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Комплексные решения для различных задач
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Индивидуальный подход к каждому типу мероприятий и проектов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <div key={index} className={`${solution.gradient} rounded-3xl p-8 hover:scale-105 transition-all duration-300`}>
              <div className="text-white mb-6">
                {solution.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {solution.title}
              </h3>
              
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                {solution.description}
              </p>
              
              <ul className="space-y-2 mb-8">
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-white/80">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/20 bg-white/10" asChild>
                <Link to="/services/complex-solutions">
                  Узнать больше
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="gradient-card-blue rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Обсудим ваш проект?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Расскажите о ваших задачах, и мы предложим оптимальное решение
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10" asChild>
                <Link to="/contact">
                  Обсудить проект
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10" asChild>
                <Link to="/portfolio">
                  Посмотреть кейсы
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplexSolutionsSection;