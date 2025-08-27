import { Button } from "../components/ui/button";
import { ArrowRight, Monitor, Settings, Calendar, Package, Code, Palette, Layers, ShoppingCart } from "lucide-react";
const ServicesSection = () => {
  const services = [{
    icon: <Monitor className="h-8 w-8" />,
    title: "Мультимедийные решения",
    description: "3D-маппинг, LED-экраны, интерактивные инсталляции для создания впечатляющих визуальных эффектов",
    features: ["3D-маппинг шоу", "LED-видеостены", "Интерактивные дисплеи"],
    gradient: "from-primary/20 to-primary/5",
    size: "large"
  }, {
    icon: <Code className="h-8 w-8" />,
    title: "Разработка уникального ПО и игр",
    description: "Создание интерактивных приложений и игровых решений",
    features: ["Игры на базе Kinect", "AR/VR приложения", "Интерактивный контент"],
    gradient: "from-accent/20 to-accent/5",
    size: "medium"
  }, {
    icon: <Calendar className="h-8 w-8" />,
    title: "Техническое сопровождение",
    description: "Профессиональная поддержка мероприятий и инсталляций",
    features: ["24/7 поддержка", "Выездное обслуживание", "Техническое консультирование"],
    gradient: "from-success/20 to-success/5",
    size: "medium"
  }, {
    icon: <Layers className="h-8 w-8" />,
    title: "Интеграция мультимедиа",
    description: "Комплексная интеграция AV-систем и мультимедийных решений",
    features: ["Системы управления", "Автоматизация", "Интеграция оборудования"],
    gradient: "from-accent/20 to-accent/5",
    size: "medium"
  }, {
    icon: <Palette className="h-8 w-8" />,
    title: "Брендинг мероприятий",
    description: "Создание уникального визуального образа для ваших событий",
    features: ["Концепция дизайна", "Брендированный контент", "Фирменный стиль"],
    gradient: "from-success/20 to-success/5",
    size: "medium"
  }, {
    icon: <Settings className="h-8 w-8" />,
    title: "Проектирование пространств",
    description: "Дизайн и планирование мультимедийных пространств",
    features: ["Архитектурная визуализация", "Планирование инсталляций", "3D-моделирование"],
    gradient: "from-accent/20 to-accent/5",
    size: "large"
  }, {
    icon: <ShoppingCart className="h-8 w-8" />,
    title: "Продажа мультимедийного оборудования",
    description: "Поставка и продажа профессионального мультимедийного оборудования",
    features: ["LED-панели и экраны", "Проекционное оборудование", "Звуковые системы"],
    gradient: "from-primary/20 to-primary/5",
    size: "medium"
  }];
  return <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Услуги</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Полный спектр мультимедийных решений от разработки контента до технической реализации
          </p>
        </div>

        {/* Простая читаемая сетка */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 group">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg">
                  <div className="text-primary">
                    {service.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Узнать больше
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-muted/30 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Нужно индивидуальное решение?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Наши эксперты разработают техническое решение, которое идеально подойдет 
              для ваших задач и бюджета
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Обсудить проект
              </Button>
              <Button variant="outline" size="lg">
                Все услуги
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ServicesSection;