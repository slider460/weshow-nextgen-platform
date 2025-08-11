import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Speaker, Projector, Camera, Gamepad, Eye, Zap, Palette, Users } from "lucide-react";

const RentalEquipmentSection = () => {
  const [showAll, setShowAll] = useState(false);

  const equipmentItems = [
    {
      id: 1,
      title: "Кинетический экран",
      description: "Динамичные 3D поверхности",
      icon: <Monitor className="h-6 w-6" />,
      gradient: "from-primary/20 to-primary/5",
      size: "large" // 2 колонки
    },
    {
      id: 2,
      title: "Матричный экран",
      description: "Гибкие LED матрицы",
      icon: <Monitor className="h-6 w-6" />,
      gradient: "from-accent/20 to-accent/5",
      size: "medium"
    },
    {
      id: 3,
      title: "Безмембранный звук",
      description: "Чистое звучание без искажений",
      icon: <Speaker className="h-6 w-6" />,
      gradient: "from-success/20 to-success/5",
      size: "medium"
    },
    {
      id: 4,
      title: "Прозрачный экран",
      description: "Полупрозрачные дисплеи",
      icon: <Eye className="h-6 w-6" />,
      gradient: "from-primary/20 to-primary/5",
      size: "medium"
    },
    {
      id: 5,
      title: "ГОБО проектора",
      description: "Проекция логотипов и узоров",
      icon: <Projector className="h-6 w-6" />,
      gradient: "from-accent/20 to-accent/5",
      size: "large" // 2 колонки
    },
    {
      id: 6,
      title: "VR кинотеатр",
      description: "Погружение в виртуальность",
      icon: <Gamepad className="h-6 w-6" />,
      gradient: "from-success/20 to-success/5",
      size: "medium"
    },
    {
      id: 7,
      title: "Зонированный звук",
      description: "Направленные аудиопотоки",
      icon: <Speaker className="h-6 w-6" />,
      gradient: "from-primary/20 to-primary/5",
      size: "medium"
    },
    {
      id: 8,
      title: "Голографические вентиляторы",
      description: "3D голограммы в воздухе",
      icon: <Zap className="h-6 w-6" />,
      gradient: "from-accent/20 to-accent/5",
      size: "medium"
    },
    {
      id: 9,
      title: "Интерактивные панели",
      description: "Сенсорные мультимедиа решения",
      icon: <Monitor className="h-6 w-6" />,
      gradient: "from-success/20 to-success/5",
      size: "medium"
    },
    // Скрытые элементы
    {
      id: 10,
      title: "Информационные панели",
      description: "Цифровые вывески",
      icon: <Monitor className="h-6 w-6" />,
      gradient: "from-muted/50 to-muted/20",
      size: "medium"
    },
    {
      id: 11,
      title: "Винтовые прозрачные экраны",
      description: "Изогнутые прозрачные поверхности",
      icon: <Eye className="h-6 w-6" />,
      gradient: "from-primary/20 to-primary/5",
      size: "large"
    },
    {
      id: 12,
      title: "Очки дополненной реальности",
      description: "AR технологии",
      icon: <Eye className="h-6 w-6" />,
      gradient: "from-success/20 to-success/5",
      size: "medium"
    }
  ];

  const visibleItems = showAll ? equipmentItems : equipmentItems.slice(0, 9);

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

        {/* Асимметричная Бенто сетка */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {visibleItems.map((item, index) => {
            // Определяем размеры для асимметричного расположения
            let colSpan = "col-span-1 md:col-span-1 lg:col-span-2";
            
            if (item.size === "large") {
              colSpan = "col-span-1 md:col-span-2 lg:col-span-2";
            }
            
            // Специальные размеры для создания асимметрии
            if (index === 0) colSpan = "col-span-1 md:col-span-2 lg:col-span-2"; // Большой первый блок
            if (index === 4) colSpan = "col-span-1 md:col-span-2 lg:col-span-2"; // Большой пятый блок
            
            return (
              <div
                key={item.id}
                className={`${colSpan} group cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} 
                  hover:scale-[1.02] transition-all duration-300 min-h-[180px] flex flex-col justify-between p-6`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-white/20 rounded-lg text-white">
                      {item.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-white/80 text-sm mb-4">
                    {item.description}
                  </p>
                </div>
                
                <div className="relative z-10">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 group-hover:scale-105 transition-all duration-300"
                  >
                    Узнать цены
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Кнопка "Посмотреть все" */}
        {!showAll && (
          <div className="text-center mb-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setShowAll(true)}
              className="group"
            >
              Посмотреть все решения
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        )}

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