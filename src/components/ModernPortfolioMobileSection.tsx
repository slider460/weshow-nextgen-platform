import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { ExternalLink, ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import ProjectOrderModal from "./ProjectOrderModal";
import useCases from "../hooks/useCases";
import { useProjects } from "../hooks/useProjects";
import { ProjectsGridSkeleton } from "./ui/skeletons/ProjectSkeleton";
import MobileCarousel from "./ui/MobileCarousel";

interface ModernPortfolioMobileSectionProps {
  onShowShowreel?: () => void;
}

const ModernPortfolioMobileSection = ({ onShowShowreel }: ModernPortfolioMobileSectionProps) => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  
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
      id: caseItem.id,
      title: caseItem.title,
      category: caseItem.category || 'Проект',
      description: caseItem.description,
      image: caseItem.image_url || '/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png',
      year: caseItem.year || '2024',
      results: results,
      technologies: caseItem.technologies || [],
      client: caseItem.client || '',
      link: caseItem.title && caseItem.title.includes('Samsung') 
        ? '/portfolio/samsung-new-year-2020' 
        : `/case/${caseItem.id}`
    };
  });

  // Статические проекты как fallback
  const staticProjects = [
    {
      id: 'static-1',
      title: "Интерактивная выставка 'Цифровое будущее'",
      category: "3D Mapping / Interactive",
      description: "Создание иммерсивного пространства с использованием 3D-проекций, интерактивных стен и VR-зоны для выставки технологий будущего",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      year: "2024",
      results: ["15,000+ посетителей", "95% положительных отзывов", "3 награды на выставке"],
      technologies: ["3D Mapping", "VR", "Interactive Design"],
      client: "Технологический музей",
      link: "#"
    },
    {
      id: 'static-2',
      title: "Корпоративная презентация 'Инновации 2024'",
      category: "Presentation / Event",
      description: "Комплексное техническое обеспечение корпоративного мероприятия с интерактивными презентациями и live-стримингом",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      year: "2024",
      results: ["500+ участников", "99.9% uptime", "Международная трансляция"],
      technologies: ["Live Streaming", "Interactive Presentation", "Multi-camera"],
      client: "IT Корпорация",
      link: "#"
    }
  ];

  // Объединяем проекты из БД и статические
  const allProjects = [...projects, ...staticProjects];

  if (loading || projectsLoading) {
    return <ProjectsGridSkeleton />;
  }

  if (error || projectsError) {
    console.error('Error loading projects:', error || projectsError);
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
          >
            Наши проекты
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto mb-8"
          >
            Реализованные проекты, которые демонстрируют наш опыт и экспертизу
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              onClick={onShowShowreel}
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              <Play className="mr-2 h-4 w-4" />
              Смотреть шоурил
            </Button>
            <Button 
              onClick={() => setIsProjectModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Заказать проект
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {allProjects.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-slate-50">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-blue-600 text-white">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-slate-700">
                      {project.year}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </CardTitle>
                  {project.client && (
                    <CardDescription className="text-slate-600">
                      Клиент: {project.client}
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardContent>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {project.results && project.results.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-900 mb-2">Результаты:</h4>
                      <ul className="space-y-1">
                        {project.results.slice(0, 2).map((result, resultIndex) => (
                          <li key={resultIndex} className="text-xs text-slate-600 flex items-center">
                            <div className="w-1 h-1 bg-blue-600 rounded-full mr-2" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      asChild
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        Подробнее
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <MobileCarousel showOnMobile={true} showOnDesktop={false}>
          {allProjects.slice(0, 6).map((project, index) => (
            <Card key={project.id} className="h-full overflow-hidden border-0 bg-slate-50 mx-2">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white">
                    {project.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-slate-700">
                    {project.year}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-slate-900">
                  {project.title}
                </CardTitle>
                {project.client && (
                  <CardDescription className="text-slate-600 text-sm">
                    Клиент: {project.client}
                  </CardDescription>
                )}
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                
                {project.results && project.results.length > 0 && (
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-slate-900 mb-1">Результаты:</h4>
                    <ul className="space-y-1">
                      {project.results.slice(0, 1).map((result, resultIndex) => (
                        <li key={resultIndex} className="text-xs text-slate-600 flex items-center">
                          <div className="w-1 h-1 bg-blue-600 rounded-full mr-2" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full"
                  asChild
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    Подробнее
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </MobileCarousel>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full" asChild>
            <a href="/portfolio">
              Все проекты
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Project Order Modal */}
      <ProjectOrderModal 
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </section>
  );
};

export default ModernPortfolioMobileSection;
