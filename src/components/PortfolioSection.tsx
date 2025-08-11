import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import officeBuilding from "@/assets/office-building.jpg";
import teamWork from "@/assets/team-work.jpg";

const PortfolioSection = () => {
  const projects = [
    {
      title: "Мультимедийная инсталляция для банка ВТБ",
      client: "ВТБ",
      date: "2024",
      description: "Комплексное оснащение головного офиса интерактивными LED-панелями и системами управления",
      image: officeBuilding,
      results: ["Увеличение клиентского трафика на 35%", "Сокращение времени ожидания на 50%"],
      tech: ["LED-видеостены", "Интерактивные киоски", "Система управления контентом"]
    },
    {
      title: "3D-маппинг для корпоративного мероприятия Сбербанка",
      client: "Сбербанк",
      date: "2024",
      description: "Проекционный маппинг для презентации новых технологических решений на конференции",
      image: teamWork,
      results: ["5000+ участников", "100% выполнение технических требований"],
      tech: ["Проекционный маппинг", "Синхронизация звука", "Интерактивное управление"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Наши проекты
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Успешно реализованные проекты для ведущих российских компаний и государственных учреждений
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-medium">{project.client}</div>
                  <div className="text-sm opacity-80">{project.date}</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-4 right-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Results */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Результаты:</h4>
                  <ul className="space-y-1">
                    {project.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-start text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-success rounded-full mr-2 mt-2 flex-shrink-0" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-2">Технологии:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Button variant="outline" className="w-full group">
                  Подробнее о проекте
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Оснащение конференц-зала Газпрома", type: "Аудиовизуальные системы" },
            { title: "LED-экраны для торгового центра", type: "Цифровые технологии" },
            { title: "Звуковая система для стадиона", type: "Профессиональный звук" }
          ].map((item, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover:border-primary/30 transition-colors group cursor-pointer"
            >
              <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-4">{item.type}</p>
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                Смотреть кейс
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="xl">
            Все проекты
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;