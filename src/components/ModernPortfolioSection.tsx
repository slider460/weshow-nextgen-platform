
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ExternalLink, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import vdnhStand from "../assets/office-building.jpg";
import ProjectOrderModal from "./ProjectOrderModal";
import useCases from "../hooks/useCases";
import { useProjects } from "../hooks/useProjects";
import { ProjectsGridSkeleton } from "./ui/skeletons/ProjectSkeleton";
import LightRays from "./LightRays";


interface ModernPortfolioSectionProps {
  onShowShowreel?: () => void;
}

const ModernPortfolioSection = ({ onShowShowreel }: ModernPortfolioSectionProps) => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(6);
  
  // Загружаем проекты из базы данных с React Query
  const { data: projectsData, isLoading: projectsLoading, error: projectsError } = useProjects();
  const { cases, loading, error } = useCases();

  // Преобразуем кейсы из базы данных в формат для отображения
  const projects = (cases || []).map(caseItem => {
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
    setVisibleProjects(prev => Math.min(prev + 6, projects.length));
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
    <section className="py-20 relative min-h-screen overflow-hidden">
      {/* Light Rays Background - покрывает всю секцию */}
      <LightRays 
        raysOrigin="top-center"
        raysColor="#3b82f6"
        raysSpeed={0.4}
        lightSpread={2.5}
        rayLength={4.0}
        pulsating={true}
        fadeDistance={2.0}
        saturation={0.9}
        followMouse={true}
        mouseInfluence={0.15}
        noiseAmount={0.05}
        distortion={0.05}
        className="absolute inset-0 z-0 w-full h-full"
      />
      
      {/* Полупрозрачный фон для лучшей читаемости */}
      <div className="absolute inset-0 bg-slate-50/80 z-5"></div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Наши проекты
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Наиболее значимые и визуально впечатляющие проекты, демонстрирующие масштаб и качество работы WESHOW
          </p>
        </div>

        {/* Показываем skeleton loader во время загрузки */}
        {(projectsLoading || loading) && (
          <ProjectsGridSkeleton count={6} />
        )}

        {/* Показываем ошибку только если нет fallback данных */}
        {projectsError && !projectsData && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600">Ошибка загрузки проектов</p>
              <p className="text-sm text-red-500 mt-2">Используются демонстрационные данные</p>
            </div>
          </div>
        )}

        {/* Показываем проекты если они загружены */}
        {!projectsLoading && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => {
                  // Используем window.location для навигации
                  window.location.href = `/case/${cases[index].id}`;
                }}
              >
                <Card className="group h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative hover:scale-105">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Image Section */}
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Project Info Overlay */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge variant="secondary" className="mb-2 bg-white/20 text-white border-white/30">
                        {project.client}
                      </Badge>
                      <div className="text-sm opacity-80">{project.date}</div>
                    </div>
                    
                    {/* Click Indicator */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full p-2 transition-all duration-200 hover:bg-white/30 hover:scale-110">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    {/* Results/Tags */}
                    {project.results && project.results.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.results.slice(0, 3).map((result, resultIndex) => (
                          <Badge key={resultIndex} variant="outline" className="text-xs">
                            {result}
                          </Badge>
                        ))}
                        {project.results.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.results.length - 3} еще
                          </Badge>
                        )}
                      </div>
                    )}
                    
                  </CardContent>
                </Card>
              </motion.div>
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
            <Button 
              size="lg" 
              variant="hero"
              onClick={() => {
                window.location.href = '/portfolio';
              }}
            >
              Все проекты
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setIsProjectModalOpen(true)}
            >
              Забронировать проект
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
