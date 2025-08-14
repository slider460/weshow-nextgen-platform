import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Speaker, Eye, Projector, Gamepad, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const RentalEquipmentSection = () => {
  const [showAll, setShowAll] = useState(false);

  const equipmentItems = [
    {
      id: 1,
      title: "Кинетический экран",
      description: "Движущиеся интерактивные поверхности",
      icon: <Monitor className="h-8 w-8" />,
      gradient: "gradient-card-purple",
      link: "/services/kinetic-screen"
    },
    {
      id: 2,
      title: "Матричный экран",
      description: "Многосегментные LED дисплеи",
      icon: <Monitor className="h-8 w-8" />,
      gradient: "gradient-card-blue",
      link: "/services/matrix-screen"
    },
    {
      id: 3,
      title: "Прозрачный экран",
      description: "Полупрозрачные дисплеи",
      icon: <Eye className="h-8 w-8" />,
      gradient: "gradient-card-cyan",
      link: "/services/transparent-screen"
    },
    {
      id: 4,
      title: "Информационные панели",
      description: "Цифровые вывески",
      icon: <Monitor className="h-8 w-8" />,
      gradient: "gradient-card-dark",
      link: "/services/info-panels"
    },
    {
      id: 5,
      title: "Проектора (от 10000 люмен)",
      description: "Высокояркостная проекция",
      icon: <Projector className="h-8 w-8" />,
      gradient: "gradient-card-purple",
      link: "/services/projectors"
    },
    {
      id: 6,
      title: "Гибкий неон",
      description: "Эластичная LED подсветка",
      icon: <Zap className="h-8 w-8" />,
      gradient: "gradient-card-blue",
      link: "/services/flexible-neon"
    },
    {
      id: 7,
      title: "Проекционные сетки",
      description: "Специальные поверхности для проекции",
      icon: <Projector className="h-8 w-8" />,
      gradient: "gradient-card-cyan",
      link: "/services/projection-screens"
    },
    {
      id: 8,
      title: "Голографические вентиляторы",
      description: "3D голограммы в воздухе",
      icon: <Zap className="h-8 w-8" />,
      gradient: "gradient-card-dark",
      link: "/services/holographic-fans"
    },
    {
      id: 9,
      title: "Очки дополненной реальности",
      description: "AR технологии",
      icon: <Eye className="h-8 w-8" />,
      gradient: "gradient-card-purple",
      link: "/services/ar-glasses"
    },
    {
      id: 10,
      title: "Игры на базе Kinect",
      description: "Интерактивные игровые решения",
      icon: <Gamepad className="h-8 w-8" />,
      gradient: "gradient-card-blue",
      link: "/services/interactive-games"
    },
    {
      id: 11,
      title: "VR кинотеатр",
      description: "Виртуальная реальность для просмотра",
      icon: <Gamepad className="h-8 w-8" />,
      gradient: "gradient-card-cyan",
      link: "/services/ar-vr-apps"
    },
    {
      id: 12,
      title: "Прозрачные телевизоры",
      description: "Прозрачные дисплеи высокого разрешения",
      icon: <Eye className="h-8 w-8" />,
      gradient: "gradient-card-dark",
      link: "/services/transparent-screen"
    },
    {
      id: 13,
      title: "Мультимедийные витрины",
      description: "Интерактивные торговые решения",
      icon: <Monitor className="h-8 w-8" />,
      gradient: "gradient-card-purple",
      link: "/services/info-panels"
    },
    {
      id: 14,
      title: "Светодиодные струны",
      description: "Декоративная LED подсветка",
      icon: <Zap className="h-8 w-8" />,
      gradient: "gradient-card-blue"
    },
    {
      id: 15,
      title: "Винтовые прозрачные экраны",
      description: "Изогнутые прозрачные поверхности",
      icon: <Eye className="h-8 w-8" />,
      gradient: "gradient-card-cyan"
    },
    {
      id: 16,
      title: "ГОБО проектора",
      description: "Проекция логотипов и узоров",
      icon: <Projector className="h-8 w-8" />,
      gradient: "gradient-card-dark"
    },
    {
      id: 17,
      title: "Безмембранный звук",
      description: "Инновационные аудио технологии",
      icon: <Speaker className="h-8 w-8" />,
      gradient: "gradient-card-purple"
    },
    {
      id: 18,
      title: "Зонированный звук",
      description: "Направленные аудиопотоки",
      icon: <Speaker className="h-8 w-8" />,
      gradient: "gradient-card-blue"
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
              
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/20 bg-white/10" asChild>
                <Link to={item.link}>
                  Подробнее
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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
          <div className="gradient-card-cyan rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Нужна помощь с выбором оборудования?
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Наши эксперты помогут подобрать оптимальный комплект оборудования под ваши задачи и бюджет
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10" asChild>
                <Link to="/contact">
                  Получить консультацию
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10" asChild>
                <Link to="/equipment">
                  Каталог оборудования
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RentalEquipmentSection;