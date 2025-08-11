import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Speaker, Projector, Camera, Gamepad, Eye } from "lucide-react";

const RentalEquipmentSection = () => {
  const equipmentCategories = [
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Экраны и дисплеи",
      items: ["Кинетический экран", "Матричный экран", "Прозрачный экран", "Информационные панели", "Прозрачные телевизоры", "Винтовые прозрачные экраны"],
      gradient: "from-primary/20 to-primary/5",
      size: "large"
    },
    {
      icon: <Projector className="h-8 w-8" />,
      title: "Проекционное оборудование",
      items: ["Проектора (от 10000 люмен)", "Проекционные сетки", "ГОБО проектора", "Голографические вентиляторы"],
      gradient: "from-accent/20 to-accent/5",
      size: "medium"
    },
    {
      icon: <Speaker className="h-8 w-8" />,
      title: "Звуковые решения",
      items: ["Безмембранный звук", "Зонированный звук", "Профессиональные аудиосистемы"],
      gradient: "from-success/20 to-success/5",
      size: "medium"
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "AR/VR технологии",
      items: ["Очки дополненной реальности", "VR кинотеатр", "Интерактивные инсталляции"],
      gradient: "from-purple-500/20 to-purple-500/5",
      size: "medium"
    },
    {
      icon: <Gamepad className="h-8 w-8" />,
      title: "Интерактивные решения",
      items: ["Игры на базе Kinect", "Мультимедийные витрины", "Интерактивные панели"],
      gradient: "from-orange-500/20 to-orange-500/5",
      size: "medium"
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Световые эффекты",
      items: ["Гибкий неон", "Светодиодные струны", "Профессиональное освещение"],
      gradient: "from-teal-500/20 to-teal-500/5",
      size: "large"
    }
  ];

  return (
    <section id="rental-equipment" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Аренда и продажа мультимедийных решений
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Современное оборудование для создания незабываемых впечатлений
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {equipmentCategories.map((category, index) => (
            <div
              key={index}
              className={`bento-item bg-gradient-to-br ${category.gradient} border border-border/50 group cursor-pointer
                ${category.size === 'large' ? 'md:col-span-2' : ''}
                ${index === 0 ? 'lg:col-span-2' : ''}
                ${index === 5 ? 'lg:col-span-2' : ''}
              `}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-white/10 rounded-lg">
                  <div className="text-primary">
                    {category.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {category.title}
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Узнать цены
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Нужна консультация по оборудованию?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Наши эксперты помогут подобрать оптимальное решение для вашего мероприятия
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Получить консультацию
              </Button>
              <Button variant="outline" size="lg">
                Каталог оборудования
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalEquipmentSection;