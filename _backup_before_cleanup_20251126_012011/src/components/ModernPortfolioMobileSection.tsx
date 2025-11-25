import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, ChevronRight, ExternalLink, Play } from "lucide-react";
import ProjectOrderModal from "./ProjectOrderModal";
import MobileCarousel from "./ui/MobileCarousel";
import { projects } from "../data/projects";
import { Link } from "react-router-dom";

interface ModernPortfolioMobileSectionProps {
  onShowShowreel?: () => void;
}

const ModernPortfolioMobileSection = ({ onShowShowreel }: ModernPortfolioMobileSectionProps) => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const displayedProjects = useMemo(() => projects, []);

  return (
    <section className="relative overflow-hidden bg-[#0A192F] py-20">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">Наши проекты</h2>
          <p className="mt-3 max-w-2xl mx-auto text-base text-[#E6F1FF]/80">
            Подборка ключевых кейсов, отражающих наш подход и технологии
          </p>
          <div className="mt-6 flex flex-col items-center gap-4">
            <Button
              onClick={onShowShowreel}
              variant="outline"
              className="w-full max-w-sm border-2 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
            >
              <Play className="mr-2 h-4 w-4" /> Смотреть шоурил
            </Button>
            <Button
              onClick={() => setIsProjectModalOpen(true)}
              className="w-full max-w-sm bg-white text-[#0A192F] shadow-lg shadow-white/10 hover:bg-white/90 hover:text-[#0A192F] font-bold"
            >
              Заказать проект <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        <div className="md:hidden">
          <MobileCarousel>
            {displayedProjects.map((project) => (
              <Link key={project.id} to={project.link} className="px-1">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-[#0A192F] to-[#1E1A34] p-6 transition-all duration-300">
                  <div className="mb-4">
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
                  
                  <div className="flex flex-col gap-3 flex-1">
                    <p className="text-sm font-normal leading-normal text-[#E6F1FF]/70">
                      {project.client} — {project.year}
                    </p>
                    <h3 
                      className="text-xl font-bold leading-tight tracking-tight text-[#64FFDA]"
                      style={{ textShadow: '0 0 8px rgba(100, 255, 218, 0.4)' }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-[#E6F1FF]/80 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {project.results && project.results.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.results.slice(0, 2).map((result, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-[#64FFDA]/10 px-3 py-1 text-xs font-medium text-[#64FFDA]"
                          >
                            {result.length > 20 ? `${result.slice(0, 20)}…` : result}
                          </span>
                        ))}
                        {project.results.length > 2 && (
                          <span className="rounded-full bg-[#64FFDA]/10 px-3 py-1 text-xs font-medium text-[#64FFDA]">
                            +{project.results.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </MobileCarousel>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-white text-[#0A192F] shadow-lg shadow-white/10 hover:bg-white/90 font-semibold"
            asChild
          >
            <Link to="/portfolio">
              Все проекты
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <ProjectOrderModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} />
    </section>
  );
};

export default ModernPortfolioMobileSection;
