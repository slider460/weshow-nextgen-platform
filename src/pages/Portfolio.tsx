import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import ShowreelModal from "@/components/ShowreelModal";
import { useState } from "react";

const Portfolio = () => {
  const [isShowreelModalOpen, setIsShowreelModalOpen] = useState(false);
  
  const projects = [
    {
      title: "Интерактивная выставка",
      category: "3D Mapping",
      description: "Создание иммерсивного пространства с использованием 3D-проекций",
      image: "/placeholder.svg",
      year: "2024"
    },
    {
      title: "Корпоративное мероприятие",
      category: "LED Solutions",
      description: "Масштабная LED-инсталляция для презентации продукта",
      image: "/placeholder.svg", 
      year: "2024"
    },
    {
      title: "Музейная экспозиция",
      category: "Interactive",
      description: "Интерактивные столы и AR-приложения для музея",
      image: "/placeholder.svg",
      year: "2023"
    },
    {
      title: "Торговый центр",
      category: "Digital Signage",
      description: "Система цифровых вывесок и навигации",
      image: "/placeholder.svg",
      year: "2023"
    },
    {
      title: "Концертная площадка",
      category: "Stage Design",
      description: "Мультимедийное оформление сцены",
      image: "/placeholder.svg",
      year: "2023"
    },
    {
      title: "Образовательный центр",
      category: "EdTech",
      description: "Интерактивные классы и обучающие системы",
      image: "/placeholder.svg",
      year: "2022"
    }
  ];

  const extendedProjects = [
    {
      title: "Особенный Новый год Samsung",
      category: "Corporate Events / 3D Mapping",
      description: "Новогоднее мероприятие с 3D-проекциями, digital зонами и интерактивными решениями",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      year: "2020",
      link: "/portfolio/samsung-event"
    },
    {
      title: "Стенд Самарской области на форуме «Россия»",
      category: "Exhibition / Interactive",
      description: "Мультимедийный стенд: Naked Eye, Kinect‑игры, VR/AR, кинетический экран",
      image: "/placeholder.svg",
      year: "2023–2024",
      link: "/portfolio/samara-stand"
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
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
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