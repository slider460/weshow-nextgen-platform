import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Speaker, Eye, Projector, Gamepad, Zap } from "lucide-react";

const RentalEquipmentSection = () => {
  const [showAll, setShowAll] = useState(false);

  const equipmentItems = [
    {
      id: 1,
      title: "3D проекционные экраны",
      description: "Динамичные 3D поверхности",
      icon: <Monitor className="h-6 w-6" />,
      size: "large"
    },
    {
      id: 2,
      title: "Гибкие LED экраны",
      description: "Гибкие LED матрицы",
      icon: <Monitor className="h-6 w-6" />,
      size: "medium"
    },
    {
      id: 3,
      title: "Звуковые системы высокого качества",
      description: "Чистое звучание без искажений",
      icon: <Speaker className="h-6 w-6" />,
      size: "medium"
    },
    {
      id: 4,
      title: "Прозрачные дисплеи",
      description: "Полупрозрачные дисплеи",
      icon: <Eye className="h-6 w-6" />,
      size: "medium"
    },
    {
      id: 5,
      title: "Гобо проекторы",
      description: "Проекция логотипов и узоров",
      icon: <Projector className="h-6 w-6" />,
      size: "large"
    },
    {
      id: 6,
      title: "VR очки",
      description: "Погружение в виртуальность",
      icon: <Gamepad className="h-6 w-6" />,
      size: "medium"
    },
    {
      id: 7,
      title: "Направленные звуковые системы",
      description: "Направленные аудиопотоки",
      icon: <Speaker className="h-6 w-6" />,
      size: "medium"
    },
    {
      id: 8,
      title: "Голографические проекторы",
      description: "3D голограммы в воздухе",
      icon: <Zap className="h-6 w-6" />,
      size: "medium"
    },
    {
      id: 9,
      title: "Интерактивные панели",
      description: "Сенсорные мультимедиа решения",
      icon: <Monitor className="h-6 w-6" />,
      size: "medium"
    },
    {
      id: 10,
      title: "Информационные панели",
      description: "Цифровые вывески",
      icon: <Monitor className="h-6 w-6" />,
      size: "medium"
    },
    {
      id: 11,
      title: "Винтовые прозрачные экраны",
      description: "Изогнутые прозрачные поверхности",
      icon: <Eye className="h-6 w-6" />,
      size: "large"
    },
    {
      id: 12,
      title: "Очки дополненной реальности",
      description: "AR технологии",
      icon: <Eye className="h-6 w-6" />,
      size: "medium"
    }
  ];

  const visibleItems = showAll ? equipmentItems : equipmentItems.slice(0, 9);

  return (
    <section id="rental-equipment" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Аренда и продажа мультимедийных решений
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Современное оборудование для создания незабываемых впечатлений
          </p>
        </div>

        {/* Простая читаемая сетка */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visibleItems.map((item, index) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-lg mr-3">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-4">
                {item.description}
              </p>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
              >
                Подробнее
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* Кнопка показать все/скрыть */}
        <div className="text-center mb-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAll(!showAll)}
            className="min-w-[200px]"
          >
            {showAll ? "Скрыть" : "Показать все"}
            <ArrowRight 
              className={`ml-2 h-4 w-4 transition-transform ${showAll ? "rotate-90" : ""}`}
            />
          </Button>
        </div>

        {/* CTA секция */}
        <div className="text-center">
          <div className="bg-muted/30 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Нужна помощь с выбором оборудования?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Наши эксперты помогут подобрать оптимальный комплект оборудования под ваши задачи и бюджет
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