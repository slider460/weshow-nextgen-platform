import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ExternalLink } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-extralight text-foreground mb-6 tracking-tight">
              Портфолио
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light leading-relaxed">
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
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-card/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-border/50 hover:border-primary/20 transition-all duration-300">
                  <div className="aspect-video bg-muted/50 relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
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
                      <span className="text-xs text-accent font-medium tracking-wide uppercase">
                        {project.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light text-foreground mb-6">
              Хотите увидеть свой проект здесь?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Начните свой проект с нами уже сегодня
            </p>
            <Button variant="hero" size="lg">
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