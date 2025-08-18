import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import ShowreelModal from "@/components/ShowreelModal";
import ClickableKeyword from "@/components/ClickableKeyword";

import { useState } from "react";

const Portfolio = () => {
  const [isShowreelModalOpen, setIsShowreelModalOpen] = useState(false);
  
  const projects = [
    {
      title: "Интерактивная выставка 'Цифровое будущее'",
      category: "3D Mapping / Interactive",
      description: "Создание иммерсивного пространства с использованием <ClickableKeyword keyword='3D-проекций' link='/services/three-d-mapping-modeling' />, <ClickableKeyword keyword='интерактивных стен' link='/services/interactive-games' /> и <ClickableKeyword keyword='VR-зоны' link='/services/ar-vr-apps' /> для выставки технологий будущего",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      year: "2024",
      results: ["15,000+ посетителей", "95% положительных отзывов", "Увеличение времени пребывания на 40%"],
      tech: ["3D-маппинг", "Интерактивные стены", "VR-гарнитуры", "Проекционные экраны"]
    },
    {
      title: "Корпоративное мероприятие 'Инновации 2024'",
      category: "LED Solutions / Corporate",
      description: "Масштабная <ClickableKeyword keyword='LED-инсталляция' link='/services/flexible-neon' /> для презентации новых продуктов с <ClickableKeyword keyword='интерактивными зонами' link='/services/interactive-games' /> и <ClickableKeyword keyword='3D-визуализацией' link='/services/three-d-modeling' />",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png",
      year: "2024",
      results: ["500+ участников", "100% выполнение технических требований", "Высокая оценка от руководства"],
      tech: ["LED-видеостены", "Интерактивные панели", "3D-проекции", "Звуковые системы"]
    },
    {
      title: "Музейная экспозиция 'История технологий'",
      category: "Interactive / Museums",
      description: "Интерактивные столы, AR-приложения и голографические дисплеи для современного музея технологий",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      year: "2023",
      results: ["Увеличение посещаемости на 60%", "Среднее время пребывания 2.5 часа", "Высокая вовлеченность детей"],
      tech: ["Интерактивные столы", "AR-приложения", "Голографические дисплеи", "Сенсорные экраны"]
    },
    {
      title: "Торговый центр 'Метрополис'",
      category: "Digital Signage / Retail",
      description: "Система <ClickableKeyword keyword='цифровых вывесок' link='/services/info-panels' />, <ClickableKeyword keyword='интерактивной навигации' link='/services/interactive-games' /> и <ClickableKeyword keyword='информационных киосков' link='/services/info-panels' /> для современного ТЦ",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png",
      year: "2023",
      results: ["Улучшение навигации на 80%", "Сокращение времени поиска товаров", "Увеличение продаж на 25%"],
      tech: ["Цифровые вывески", "Интерактивная навигация", "Информационные киоски", "Система управления"]
    },
    {
      title: "Концертная площадка 'Звездный зал'",
      category: "Stage Design / Entertainment",
      description: "Мультимедийное оформление сцены с <ClickableKeyword keyword='проекционными экранами' link='/services/projection-screens' />, <ClickableKeyword keyword='световыми эффектами' link='/services/lighting' /> и <ClickableKeyword keyword='интерактивными элементами' link='/services/interactive-games' />",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      year: "2023",
      results: ["50+ успешных концертов", "Восторженные отзывы артистов", "Увеличение продаж билетов"],
      tech: ["Проекционные экраны", "Световые эффекты", "Интерактивные элементы", "Звуковые системы"]
    },
    {
      title: "Образовательный центр 'ТехноШкола'",
      category: "EdTech / Education",
      description: "<ClickableKeyword keyword='Интерактивные классы' link='/services/interactive-games' /> с <ClickableKeyword keyword='3D-проекциями' link='/services/three-d-modeling' />, <ClickableKeyword keyword='VR-лабораториями' link='/services/ar-vr-apps' /> и <ClickableKeyword keyword='умными досками' link='/services/interactive-games' /> для современного обучения",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png",
      year: "2022",
      results: ["Улучшение усвоения материала на 45%", "Повышение интереса к учебе", "100% положительных отзывов"],
      tech: ["3D-проекции", "VR-лаборатории", "Интерактивные доски", "Умные системы"]
    }
  ];

  const extendedProjects = [
    {
      title: "Особенный Новый год Samsung",
      category: "Corporate Events / 3D Mapping",
      description: "Новогоднее мероприятие с <ClickableKeyword keyword='3D-проекциями' link='/services/three-d-mapping-modeling' />, <ClickableKeyword keyword='digital зонами' link='/services/interactive-games' /> и <ClickableKeyword keyword='интерактивными решениями' link='/services/interactive-games' /> для корпоративного праздника",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      year: "2020",
      link: "/portfolio/samsung-event",
      results: ["500+ участников", "Уникальный новогодний контент", "Полное техническое сопровождение"],
      tech: ["3D-маппинг", "Интерактивные зоны", "Проекционные сетки", "Digital почтовый ящик"]
    },
    {
      title: "Стенд Самарской области на форуме «Россия»",
      category: "Exhibition / Interactive",
      description: "Мультимедийный стенд с <ClickableKeyword keyword='Naked Eye технологиями' link='/services/transparent-screen' />, <ClickableKeyword keyword='Kinect‑играми' link='/services/interactive-games' />, <ClickableKeyword keyword='VR/AR зонами' link='/services/ar-vr-apps' /> и <ClickableKeyword keyword='кинетическим экраном' link='/services/kinetic-screen' />",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png",
      year: "2023–2024",
      link: "/portfolio/samara-stand",
      results: ["10,000+ посетителей", "Высокая интерактивность", "Положительные отзывы от руководства"],
      tech: ["Naked Eye", "Kinect-игры", "VR/AR", "Кинетический экран"]
    },
    ...projects,
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-5"></div>
        

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-700 rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-blue-300/30">
              <Play className="h-5 w-5 mr-2 animate-pulse" />
              Наши проекты
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-8 leading-tight">
              Портфолио
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl mx-auto">
              Примеры наших работ и реализованных проектов в области мультимедиа и интерактивных технологий
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 text-lg font-semibold group"
              onClick={() => setIsShowreelModalOpen(true)}
            >
              <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Смотреть шоурил
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {extendedProjects.map((project: any, index: number) => {
              const card = (
                <div className="group bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative">
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700">
                        {project.year}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <ExternalLink className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-blue-500 font-medium tracking-wide uppercase">
                        {project.category}
                      </span>
                      <span className="text-xs text-slate-600">{project.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-500 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    
                    {/* Results and Technologies */}
                    {project.results && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">Результаты:</h4>
                        <div className="space-y-1">
                          {project.results.slice(0, 2).map((result: string, resultIndex: number) => (
                            <div key={resultIndex} className="flex items-center text-xs text-slate-600">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 flex-shrink-0" />
                              {result}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {project.tech && (
                      <div>
                        <h4 className="text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">Технологии:</h4>
                        <div className="flex flex-wrap gap-1">
                          {project.tech.slice(0, 3).map((tech: string, techIndex: number) => {
                            // Определяем ссылку для каждой технологии
                            const getTechLink = (techName: string) => {
                              const techMap: { [key: string]: string } = {
                                '3D-маппинг': '/services/three-d-mapping-modeling',
                                'Интерактивные стены': '/services/interactive-games',
                                'VR-гарнитуры': '/services/ar-vr-apps',
                                'Проекционные экраны': '/services/projection-screens',
                                'LED-видеостены': '/services/flexible-neon',
                                'Интерактивные панели': '/services/interactive-games',
                                '3D-проекции': '/services/three-d-modeling',
                                'Звуковые системы': '/services/audio-systems',
                                'Интерактивные столы': '/services/interactive-games',
                                'AR-приложения': '/services/ar-vr-apps',
                                'Голографические дисплеи': '/services/holographic-fans',
                                'Сенсорные экраны': '/services/interactive-games',
                                'Цифровые вывески': '/services/info-panels',
                                'Интерактивная навигация': '/services/interactive-games',
                                'Информационные киоски': '/services/info-panels',
                                'Система управления': '/services/system-integration',
                                'Световые эффекты': '/services/lighting',
                                'Интерактивные элементы': '/services/interactive-games',
                                'VR-лаборатории': '/services/ar-vr-apps',
                                'Интерактивные доски': '/services/interactive-games',
                                'Умные системы': '/services/system-integration',
                                'Naked Eye': '/services/transparent-screen',
                                'Kinect-игры': '/services/interactive-games',
                                'VR/AR': '/services/ar-vr-apps',
                                'Кинетический экран': '/services/kinetic-screen'
                              };
                              return techMap[techName] || '/services';
                            };

                            return (
                              <ClickableKeyword
                                key={techIndex}
                                keyword={tech}
                                link={getTechLink(tech)}
                                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 text-xs rounded-full transition-all duration-200 cursor-pointer"
                              />
                            );
                          })}
                          {project.tech.length > 3 && (
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                              +{project.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );

              return project.link ? (
                <Link key={index} to={project.link} className="group cursor-pointer block" aria-label={`${project.title} — подробнее`}>
                  {card}
                </Link>
              ) : (
                <div key={index} className="group cursor-pointer">{card}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Хотите увидеть свой проект здесь?
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Начните свой проект с нами уже сегодня и создайте что-то удивительное
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-slate-900 hover:bg-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 px-8 py-4 text-lg font-semibold"
              >
                Обсудить проект
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-slate-900 transition-all duration-500 hover:scale-105 px-8 py-4 text-lg backdrop-blur-sm"
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

      {/* Showreel Modal */}
      <ShowreelModal 
        isOpen={isShowreelModalOpen}
        onClose={() => setIsShowreelModalOpen(false)}
      />
      
      <Footer />
    </div>
  );
};

export default Portfolio;