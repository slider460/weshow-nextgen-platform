import { Button } from "@/components/ui/button";
import { ArrowRight, Building, Users, Trophy, Globe, Presentation, Store, Construction, Video } from "lucide-react";

const ComplexSolutionsSection = () => {
  const solutions = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Частные мероприятия",
      description: "Свадьбы, дни рождения, корпоративы",
      features: ["Световое оформление", "Звуковое сопровождение", "Фото/видео"]
    },
    {
      icon: <Presentation className="h-6 w-6" />,
      title: "Презентации/конференции/форумы",
      description: "Профессиональное техническое обеспечение",
      features: ["Проекция", "Синхронный перевод", "Стриминг"]
    },
    {
      icon: <Store className="h-6 w-6" />,
      title: "Выставочные стенды",
      description: "Мультимедийное оформление стендов",
      features: ["Интерактивные панели", "LED-экраны", "Презентации"]
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Спортивные мероприятия",
      description: "Техническое сопровождение соревнований",
      features: ["Табло", "Звуковое сопровождение", "Видеоповторы"]
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: "Корпоративные мероприятия",
      description: "Комплексные решения для бизнеса",
      features: ["Брендинг", "Презентации", "Развлечения"]
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Online мероприятия",
      description: "Цифровые события и стриминг",
      features: ["Многокамерная съемка", "Стриминг", "Интерактив"]
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Презентации спортивных объектов",
      description: "Техническое оснащение спортивных арен",
      features: ["Видеокубы", "Медиафасады", "Системы управления"]
    },
    {
      icon: <Store className="h-6 w-6" />,
      title: "Презентации ТРЦ",
      description: "Мультимедийные решения для торговых центров",
      features: ["Навигация", "Реклама", "Интерактивные зоны"]
    },
    {
      icon: <Construction className="h-6 w-6" />,
      title: "Презентации строительных объектов",
      description: "Визуализация проектов недвижимости",
      features: ["3D-туры", "Интерактивные макеты", "VR-презентации"]
    }
  ];

  return (
    <section id="complex-solutions" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Комплексные решения для различных задач
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Индивидуальный подход к каждому типу мероприятий и проектов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-lg mr-3">
                  {solution.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {solution.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-4">
                {solution.description}
              </p>
              
              <ul className="space-y-2 mb-4">
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                Узнать больше
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Обсудим ваш проект?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Расскажите о ваших задачах, и мы предложим оптимальное решение
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Обсудить проект
              </Button>
              <Button variant="outline" size="lg">
                Посмотреть кейсы
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplexSolutionsSection;