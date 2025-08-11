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
      icon: <Monitor className="h-8 w-8" />,
      gradient: "gradient-card-purple"
    },
    {
      id: 2,
      title: "Гибкие LED экраны",
      description: "Гибкие LED матрицы",
      icon: <Monitor className="h-8 w-8" />,
      gradient: "gradient-card-blue"
    },
    {
      id: 3,
      title: "Звуковые системы высокого качества",
      description: "Чистое звучание без искажений",
      icon: <Speaker className="h-8 w-8" />,
      gradient: "gradient-card-cyan"
    },
    {
      id: 4,
      title: "Прозрачные дисплеи",
      description: "Полупрозрачные дисплеи",
      icon: <Eye className="h-8 w-8" />,
      gradient: "gradient-card-dark"
    },
    {
      id: 5,
      title: "Гобо проекторы",
      description: "Проекция логотипов и узоров",
      icon: <Projector className="h-8 w-8" />,
      gradient: "gradient-card-purple"
    },
    {
      id: 6,
      title: "VR очки",
      description: "Погружение в виртуальность",
      icon: <Gamepad className="h-8 w-8" />,
      gradient: "gradient-card-blue"
    },
    {
      id: 7,
      title: "Направленные звуковые системы",
      description: "Направленные аудиопотоки",
      icon: <Speaker className="h-8 w-8" />,
      gradient: "gradient-card-cyan"
    },
    {
      id: 8,
      title: "Голографические проекторы",
      description: "3D голограммы в воздухе",
      icon: <Zap className="h-8 w-8" />,
      gradient: "gradient-card-dark"
    },
    {
      id: 9,
      title: "Интерактивные панели",
      description: "Сенсорные мультимедиа решения",
      icon: <Monitor className="h-8 w-8" />,
      gradient: "gradient-card-purple"
    },
    {
      id: 10,
      title: "Информационные панели",
      description: "Цифровые вывески",
      icon: <Monitor className="h-8 w-8" />,
      gradient: "gradient-card-blue"
    },
    {
      id: 11,
      title: "Винтовые прозрачные экраны",
      description: "Изогнутые прозрачные поверхности",
      icon: <Eye className="h-8 w-8" />,
      gradient: "gradient-card-cyan"
    },
    {
      id: 12,
      title: "Очки дополненной реальности",
      description: "AR технологии",
      icon: <Eye className="h-8 w-8" />,
      gradient: "gradient-card-dark"
    }
  ];

  const visibleItems = showAll ? equipmentItems : equipmentItems.slice(0, 9);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Аренда и продажа мультимедийных решений
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Современное оборудование для создания незабываемых впечатлений
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {visibleItems.map((item, index) => (
            <div key={item.id} className={`${item.gradient} rounded-3xl p-8 hover:scale-105 transition-all duration-300`}>
              <div className="text-white mb-6">
                {item.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {item.title}
              </h3>
              
              <p className="text-white/90 text-sm leading-relaxed mb-8">
                {item.description}
              </p>
              
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/20">
                Подробнее
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

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

        <div className="text-center">
          <div className="bg-slate-50 rounded-3xl p-12 border border-slate-200">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Нужна помощь с выбором оборудования?
            </h3>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Наши эксперты помогут подобрать оптимальный комплект оборудования под ваши задачи и бюджет
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="hero">
                Получить консультацию
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                Каталог оборудования
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalEquipmentSection;