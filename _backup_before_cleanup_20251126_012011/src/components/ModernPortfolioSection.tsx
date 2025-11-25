
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, ChevronRight, Play } from "lucide-react";
import ProjectOrderModal from "./ProjectOrderModal";
import { projects } from "../data/projects";
import { Link } from "react-router-dom";

interface ModernPortfolioSectionProps {
  onShowShowreel?: () => void;
}

const ModernPortfolioSection = ({ onShowShowreel }: ModernPortfolioSectionProps) => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const displayedProjects = projects;
  const visibleProjects = displayedProjects.slice(0, visibleCount);
  const hasMore = visibleCount < displayedProjects.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, displayedProjects.length));
  };

  return (
    <section className="relative overflow-hidden bg-[#0A192F] py-24 md:py-28">
      <div className="container relative mx-auto flex max-w-7xl flex-col gap-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl">Наши проекты</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[#E6F1FF]/80">
            Реализованные кейсы, которые демонстрируют нашу экспертизу в интерактивных и мультимедийных решениях
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={onShowShowreel}
              variant="outline"
              className="border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
            >
              <Play className="mr-2 h-4 w-4" /> Смотреть шоурил
            </Button>
            <Button
              onClick={() => setIsProjectModalOpen(true)}
              className="bg-white text-[#0A192F] shadow-lg shadow-white/10 hover:bg-white/90 hover:text-[#0A192F] font-bold"
            >
              Заказать проект <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link 
                to={project.link}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-[#0A192F] to-[#1E1A34] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#64FFDA]/10 block"
              >
                <div className="flex-grow">
                  <div className="mb-6">
                    <div 
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg p-1 transition-shadow duration-300"
                      style={{ 
                        boxShadow: '0 0 16px rgba(100, 255, 218, 0.3), inset 0 0 8px rgba(100, 255, 218, 0.2)'
                      }}
                    >
                      <img
                        className="h-full w-full rounded-md bg-cover bg-center object-cover"
                        src={project.image}
                        alt={project.title}
                        onError={(event) => {
                          const img = event.currentTarget;
                          if (!img.src.includes("data:image/svg+xml")) {
                            img.src = `data:image/svg+xml,${encodeURIComponent(
                              '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%230A192F" width="400" height="300"/><text x="50%25" y="50%25" font-family="Arial" font-size="20" fill="%2364FFDA" text-anchor="middle" dy=".35em">WESHOW</text></svg>'
                            )}`;
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-normal leading-normal text-[#E6F1FF]/70">
                      {project.client} — {project.year}
                    </p>
                    <h3 
                      className="text-2xl font-bold leading-tight tracking-tight text-[#64FFDA] transition-colors group-hover:text-[#64FFDA]/80"
                      style={{ textShadow: '0 0 8px rgba(100, 255, 218, 0.4)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-base font-normal leading-relaxed text-[#E6F1FF]/80 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
                
                {project.results && project.results.length > 0 && (
                  <footer className="mt-6 flex flex-wrap items-center gap-2">
                    {project.results.slice(0, 3).map((result, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-[#64FFDA]/10 px-3 py-1 text-xs font-medium text-[#64FFDA]"
                      >
                        {result.length > 20 ? `${result.slice(0, 20)}…` : result}
                      </span>
                    ))}
                  </footer>
                )}
                
                <div className="absolute bottom-6 right-6 text-[#64FFDA] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <Button
              onClick={loadMore}
              variant="outline"
              className="border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm px-8 py-3 text-lg font-semibold"
            >
              Загрузить еще
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      <ProjectOrderModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} />
    </section>
  );
};

export default ModernPortfolioSection;
