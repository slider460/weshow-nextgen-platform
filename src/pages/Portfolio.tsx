import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Portfolio = () => {
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
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Портфолио
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Примеры наших работ и реализованных проектов
            </p>
            <Button variant="outline" size="lg" className="group">
              <Play className="mr-2 h-4 w-4" />
              Смотреть шоурил
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {extendedProjects.map((project: any, index: number) => {
              const card = (
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="aspect-video bg-slate-100 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <ExternalLink className="h-4 w-4 text-white" />
                      </div>
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
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Хотите увидеть свой проект здесь?
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Начните свой проект с нами уже сегодня
            </p>
            <Button size="lg">
              Обсудить проект
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;