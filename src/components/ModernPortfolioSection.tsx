
import { useState } from "react";
import { Button } from "../components/ui/button";
import { ExternalLink, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import vdnhStand from "../assets/office-building.jpg";
import ProjectOrderModal from "./ProjectOrderModal";
import useCases from "../hooks/useCases";


interface ModernPortfolioSectionProps {
  onShowShowreel?: () => void;
}

const ModernPortfolioSection = ({ onShowShowreel }: ModernPortfolioSectionProps) => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(4);
  
  // Загружаем кейсы из базы данных
  const { cases, loading, error } = useCases();

  // Преобразуем кейсы из базы данных в формат для отображения
  const projects = cases.map(caseItem => {
    // Обрабатываем results - может быть строкой JSON, массивом или обычной строкой
    let results = [];
    if (Array.isArray(caseItem.results)) {
      results = caseItem.results;
    } else if (typeof caseItem.results === 'string' && caseItem.results.trim()) {
      try {
        // Пытаемся распарсить как JSON массив
        const parsed = JSON.parse(caseItem.results);
        if (Array.isArray(parsed)) {
          results = parsed;
        } else {
          // Если не массив, разбиваем по переносам строк или запятым
          results = caseItem.results.split(/[\n,;]/).map(r => r.trim()).filter(r => r.length > 0);
        }
      } catch {
        // Если не JSON, разбиваем по переносам строк или запятым
        results = caseItem.results.split(/[\n,;]/).map(r => r.trim()).filter(r => r.length > 0);
      }
    }
    
    return {
      title: caseItem.title,
      client: caseItem.client || 'Клиент не указан',
      date: caseItem.year?.toString() || 'Год не указан',
      description: caseItem.description,
      image: caseItem.image_url || "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      results: results,
      tech: [] // В таблице нет поля technologies
    };
  });

  // Функция для загрузки еще проектов
  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 4, projects.length));
  };

  // Получаем проекты для отображения
  const displayedProjects = projects.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < projects.length;

  // Отладочная информация
  console.log('ModernPortfolioSection: Загружено кейсов:', cases.length);
  console.log('ModernPortfolioSection: Обработано проектов:', projects.length);
  console.log('ModernPortfolioSection: Отображается проектов:', displayedProjects.length);
  console.log('ModernPortfolioSection: Есть еще проекты:', hasMoreProjects);

  return (
    <section className="py-20 bg-slate-50 relative z-10 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Наши проекты
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Наиболее значимые и визуально впечатляющие проекты, демонстрирующие масштаб и качество работы WESHOW
          </p>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-600">Загрузка проектов...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600">Ошибка загрузки проектов: {error}</p>
              <p className="text-sm text-red-500 mt-2">Обратитесь к администратору</p>
            </div>
          </div>
        )}

        {!loading && !error && cases.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-blue-600">Проекты будут добавлены в ближайшее время</p>
              <p className="text-sm text-blue-500 mt-2">Следите за обновлениями</p>
            </div>
          </div>
        )}

        {!loading && !error && cases.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {displayedProjects.map((project, index) => (
            <div key={index} className="bg-white rounded-3xl overflow-visible shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col min-h-[700px]">
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
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="mb-6 flex-grow">
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">Результаты:</h4>
                  <ul className="space-y-2">
                    {project.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-start text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                        <span>{result}</span>
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
                
                <Button className="w-full mt-auto py-3" variant="default" asChild>
                  <Link to={`/case/${cases[index].id}`}>
                    Подробнее о проекте
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
          </div>
        )}

        {/* Кнопка "Загрузить еще" */}
        {!loading && !error && cases.length > 0 && hasMoreProjects && (
          <div className="text-center mb-12">
            <Button 
              onClick={loadMoreProjects}
              variant="outline" 
              size="lg"
              className="px-8 py-3"
            >
              Загрузить еще
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="hero" asChild>
              <Link to="/portfolio">
                Все проекты
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setIsProjectModalOpen(true)}
            >
              Заказать проект
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onShowShowreel}
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              <Play className="mr-2 h-4 w-4" />
              Смотреть Showreel
            </Button>
          </div>
        </div>
      </div>

      <ProjectOrderModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
      />
    </section>
  );
};

export default ModernPortfolioSection;
