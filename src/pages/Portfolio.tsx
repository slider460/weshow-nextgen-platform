import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { Button } from "../components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import ShowreelModal from "../components/ShowreelModal";
import { BlockGameModal } from "../components/BlockGameModal";
import { projects } from "../data/projects";

const Portfolio = () => {
  const [isShowreelModalOpen, setIsShowreelModalOpen] = useState(false);
  const [isTetrisGameOpen, setIsTetrisGameOpen] = useState(false);

  // Обработчик события для открытия игры из футера
  useEffect(() => {
    const handleOpenTetrisGame = () => {
      setIsTetrisGameOpen(true);
    };

    window.addEventListener('openTetrisGame', handleOpenTetrisGame);
    return () => {
      window.removeEventListener('openTetrisGame', handleOpenTetrisGame);
    };
  }, []);

  // Используем новые проекты из локального массива
  const displayedProjects = projects;


  return (
    <div className="min-h-screen bg-[#0A192F]">
      <SEOHead
        title="Портфолио — WESHOW"
        description="Примеры работ WESHOW: мультимедийные инсталляции, 3D-маппинг, корпоративные мероприятия, выставки и интерактивные проекты."
        url="https://weshow.su/portfolio"
      />
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-[#0A192F]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 bg-[#64FFDA]/10 border border-[#64FFDA]/30 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
              <Play className="h-5 w-5 mr-2 animate-pulse text-[#64FFDA]" />
              <span className="text-[#64FFDA]">Наши проекты</span>
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Портфолио
            </h1>
            <p className="text-xl text-[#E6F1FF]/80 leading-relaxed mb-10 max-w-3xl mx-auto">
              Примеры наших работ и реализованных проектов в области мультимедиа и интерактивных технологий
            </p>
            <Button
              size="lg"
              className="bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 border-0 shadow-lg shadow-[#64FFDA]/25 hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 text-lg font-semibold group"
              onClick={() => setIsShowreelModalOpen(true)}
            >
              <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Смотреть шоурил
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 relative bg-[#0A192F]">
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedProjects.map((project, index) => (
              <Link
                key={project.id}
                to={project.link}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-[#0A192F] to-[#1E1A34] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#64FFDA]/10"
                aria-label={`${project.title} — подробнее`}
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
                        loading="lazy"
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          if (img.src && !img.src.includes('data:image/svg+xml')) {
                            const placeholderSvg = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%230A192F" width="400" height="300"/><text x="50%25" y="50%25" font-family="Arial" font-size="20" fill="%2364FFDA" text-anchor="middle" dy=".3em">WESHOW</text></svg>')}`;
                            img.src = placeholderSvg;
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
                    {project.results.slice(0, 3).map((result: string, resultIndex: number) => (
                      <span
                        key={resultIndex}
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
            ))}

            {/* Блок "Новые проекты" - всегда последний */}
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#0A192F] to-[#1E1A34] p-8 border-2 border-dashed border-[#64FFDA]/30 min-h-[320px]">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#64FFDA]/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#64FFDA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#64FFDA] mb-3">
                  Новые проекты
                </h3>
                <p className="text-[#E6F1FF]/70 text-sm leading-relaxed max-w-[200px] mx-auto">
                  Сейчас оформляются новые проекты, следите за обновлением
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0A192F] to-[#1E1A34] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Хотите увидеть свой проект здесь?
            </h2>
            <p className="text-xl text-[#E6F1FF]/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Начните свой проект с нами уже сегодня и создайте что-то удивительное
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-[#64FFDA] text-[#0A192F] hover:bg-[#64FFDA]/90 shadow-xl hover:shadow-2xl hover:shadow-[#64FFDA]/30 transition-all duration-500 hover:scale-105 px-8 py-4 text-lg font-semibold"
              >
                <Link to="/contact">
                  Обсудить проект
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 inline" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#64FFDA]/50 text-[#64FFDA] hover:bg-[#64FFDA]/10 transition-all duration-500 hover:scale-105 px-8 py-4 text-lg backdrop-blur-sm bg-[#64FFDA]/5"
                asChild
              >
                <Link to="/contact">
                  Связаться с нами
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ShowreelModal
        isOpen={isShowreelModalOpen}
        onClose={() => setIsShowreelModalOpen(false)}
      />

      {/* Tetris Game Modal */}
      <BlockGameModal
        isOpen={isTetrisGameOpen}
        onClose={() => setIsTetrisGameOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default Portfolio;

