
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import officeBuilding from "@/assets/office-building.jpg";
import teamWork from "@/assets/team-work.jpg";
import vdnhStand from "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png";

const ModernPortfolioSection = () => {
  const projects = [
    {
      title: "Мультимедийная инсталляция для банка ВТБ",
      client: "ВТБ",
      date: "2024",
      description: "Комплексное оснащение головного офиса интерактивными LED-панелями и системами управления",
      image: officeBuilding,
      results: ["Увеличение клиентского трафика на 35%", "Сокращение времени ожидания на 50%"],
      tech: ["LED-видеостены", "Интерактивные киоски", "Система управления контентом"],
      gradient: "gradient-card-purple"
    },
    {
      title: "3D-маппинг для корпоративного мероприятия",
      client: "Сбербанк",
      date: "2024", 
      description: "Проекционный маппинг для презентации новых технологических решений на конференции",
      image: teamWork,
      results: ["5000+ участников", "100% выполнение технических требований"],
      tech: ["Проекционный маппинг", "Синхронизация звука", "Интерактивное управление"],
      gradient: "gradient-card-blue"
    },
    {
      title: "Стенд Самарской области на ВДНХ",
      client: "ВДНХ",
      date: "2024",
      description: "Интерактивный мультимедийный стенд с цифровыми решениями для представления региона",
      image: vdnhStand,
      results: ["Более 10,000 посетителей", "Интерактивное взаимодействие с контентом"],
      tech: ["Интерактивные дисплеи", "Мультимедийный контент", "Система презентаций"],
      gradient: "gradient-card-cyan"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Наши проекты
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Наиболее значимые и визуально впечатляющие проекты, демонстрирующие масштаб и качество работы WESHOW
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="relative overflow-hidden h-64">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-medium">{project.client}</div>
                  <div className="text-sm opacity-80">{project.date}</div>
                </div>
                <Button variant="outline" size="sm" className="absolute top-4 right-4 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Результаты:</h4>
                  <ul className="space-y-2">
                    {project.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-start text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Технологии:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Подробнее о проекте
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4">
              Все проекты
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 border-slate-300 text-slate-700 hover:bg-slate-100">
              Заказать проект
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernPortfolioSection;
