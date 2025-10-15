import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { ArrowRight, Monitor, Speaker, Eye, Projector, Gamepad, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEquipment } from "../hooks/useEquipment";
import { LazyLoadWrapper } from "./LazyLoadWrapper";

const RentalEquipmentSection = () => {
  const [showAll, setShowAll] = useState(false);
  
  // Используем React Query хук для оборудования
  const { data: equipmentData = [], isLoading, error } = useEquipment();
  const [equipmentItems, setEquipmentItems] = useState<any[]>([]);

  // Иконки для маппинга
  const iconMap = {
    Monitor: Monitor,
    Speaker: Speaker,
    Eye: Eye,
    Projector: Projector,
    Gamepad: Gamepad,
    Zap: Zap
  };

  // Обрабатываем данные из React Query
  useEffect(() => {
    if (equipmentData && equipmentData.length > 0) {
      // Преобразуем данные из базы в формат компонента
      const formattedItems = equipmentData.slice(0, 6).map((item, index) => {
        // Определяем иконку на основе названия оборудования
        let IconComponent = Monitor;
        if (item.name?.toLowerCase().includes('звук') || item.name?.toLowerCase().includes('аудио')) {
          IconComponent = Speaker;
        } else if (item.name?.toLowerCase().includes('свет') || item.name?.toLowerCase().includes('освещение')) {
          IconComponent = Zap;
        } else if (item.name?.toLowerCase().includes('проектор')) {
          IconComponent = Projector;
        }

        // Определяем градиент на основе индекса
        const gradients = [
          "gradient-card-purple",
          "gradient-card-blue", 
          "gradient-card-cyan",
          "gradient-card-dark",
          "gradient-card-green",
          "gradient-card-orange"
        ];

        return {
          id: item.id,
          title: item.name || `Оборудование ${index + 1}`,
          description: item.description || "Профессиональное оборудование для мероприятий",
          icon: <IconComponent className="h-6 w-6 lg:h-8 lg:w-8" />,
          gradient: gradients[index % gradients.length],
          link: `/equipment/${item.id}`
        };
      });

      setEquipmentItems(formattedItems);
    } else {
      // Fallback к статическим данным если нет данных из БД
      setEquipmentItems([
        {
          id: 1,
          title: "Кинетический экран",
          description: "Движущиеся интерактивные поверхности",
          icon: <Monitor className="h-6 w-6 lg:h-8 lg:w-8" />,
          gradient: "gradient-card-purple",
          link: "/services/kinetic-screen"
        },
        {
          id: 2,
          title: "Матричный экран",
          description: "Многосегментные LED дисплеи",
          icon: <Monitor className="h-6 w-6 lg:h-8 lg:w-8" />,
          gradient: "gradient-card-blue",
          link: "/services/matrix-screen"
        },
        {
          id: 3,
          title: "Прозрачный экран",
          description: "Полупрозрачные дисплеи",
          icon: <Eye className="h-6 w-6 lg:h-8 lg:w-8" />,
          gradient: "gradient-card-cyan",
          link: "/services/transparent-screen"
        },
        {
          id: 4,
          title: "Информационные панели",
          description: "Цифровые вывески",
          icon: <Monitor className="h-6 w-6 lg:h-8 lg:w-8" />,
          gradient: "gradient-card-dark",
          link: "/services/info-panels"
        },
        {
          id: 5,
          title: "Проектора (от 10000 люмен)",
          description: "Высокояркостная проекция",
          icon: <Projector className="h-6 w-6 lg:h-8 lg:w-8" />,
          gradient: "gradient-card-purple",
          link: "/services/projectors"
        },
        {
          id: 6,
          title: "Гибкий неон",
          description: "Эластичная LED подсветка",
          icon: <Zap className="h-6 w-6 lg:h-8 lg:w-8" />,
          gradient: "gradient-card-blue",
          link: "/services/flexible-neon"
        }
      ]);
    }
  }, [equipmentData]);

  const visibleItems = showAll ? equipmentItems : equipmentItems.slice(0, 6);

  if (isLoading) {
    return (
      <section className="py-12 lg:py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка оборудования...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 lg:py-24 bg-slate-50 relative overflow-hidden">
      <LazyLoadWrapper>
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-full blur-3xl opacity-60"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-3 py-1 lg:px-4 lg:py-2 rounded-full bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-4">
            🎬 Аренда оборудования
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 leading-tight mb-4">
            Интерактивное оборудование
            <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              для ваших мероприятий
            </span>
          </h2>
          <p className="text-base lg:text-lg text-slate-600 max-w-3xl mx-auto">
            Широкий спектр современного мультимедийного оборудования для создания 
            незабываемых впечатлений на любых мероприятиях
          </p>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {visibleItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className={`${item.gradient} rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white hover:scale-105 transition-all duration-300 group cursor-pointer`}
            >
              <div className="flex items-start space-x-3 lg:space-x-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-all duration-300">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm lg:text-base font-semibold mb-1 lg:mb-2 group-hover:text-white/90 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-white/80 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Show More/Less Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAll(!showAll)}
            className="px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
          >
            {showAll ? "Показать меньше" : "Показать все"}
            <ArrowRight className={`ml-2 h-4 w-4 lg:h-5 lg:w-5 transition-transform duration-300 ${showAll ? 'rotate-90' : ''}`} />
          </Button>
        </div>

        {/* CTA Section */}
        <div className="mt-12 lg:mt-16 text-center">
          <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-slate-200/50">
            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3 lg:mb-4">
              Нужна консультация по оборудованию?
            </h3>
            <p className="text-sm lg:text-base text-slate-600 mb-6 lg:mb-8">
              Наши специалисты помогут подобрать оптимальное решение для вашего мероприятия
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
              <Button size="lg" className="px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold" asChild>
                <Link to="/equipment" className="inline-flex items-center">
                  Перейти к оборудованию
                  <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold" asChild>
                <Link to="/contact">
                  Получить консультацию
                </Link>
              </Button>
            </div>
          </div>
        </div>
        </div>
      </LazyLoadWrapper>
    </section>
  );
};

export default RentalEquipmentSection;