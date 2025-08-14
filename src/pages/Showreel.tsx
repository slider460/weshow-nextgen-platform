import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShowreelPlayer from "@/components/ShowreelPlayer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  ArrowRight, 
  Star, 
  Zap, 
  Award,
  Users,
  Calendar,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

const Showreel = () => {
  const stats = [
    {
      number: "150+",
      label: "Проектов",
      description: "Успешно реализовано"
    },
    {
      number: "15+",
      label: "Лет опыта",
      description: "В индустрии"
    },
    {
      number: "50+",
      label: "Клиентов",
      description: "Доверяют нам"
    },
    {
      number: "24/7",
      label: "Поддержка",
      description: "Техническое сопровождение"
    }
  ];

  const featuredProjects = [
    {
      title: "Особенный Новый год Samsung",
      category: "Corporate Events",
      year: "2020",
      link: "/portfolio/samsung-event"
    },
    {
      title: "Стенд Самарской области",
      category: "Exhibition",
      year: "2023-2024",
      link: "/portfolio/samara-stand"
    },
    {
      title: "Интерактивные музеи",
      category: "Cultural",
      year: "2023",
      link: "/portfolio"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="absolute inset-0 bg-[url('/src/assets/office-building.jpg')] bg-cover bg-center opacity-5"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-full mb-6">
              <Play className="w-4 h-4 mr-2" />
              Наш Showreel
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-6 leading-tight">
              WESHOW Showreel
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-600 mb-8 leading-relaxed">
              Погрузитесь в мир наших лучших проектов и инновационных решений в области мультимедиа
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link to="/portfolio">
                  <Zap className="w-5 h-5 mr-2" />
                  Все проекты
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg font-semibold bg-white/70 backdrop-blur-sm border-slate-300 text-slate-700 hover:bg-white/90 transition-all duration-300"
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

      {/* Video Player Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Наши лучшие работы</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                От корпоративных мероприятий до интерактивных выставок - каждый проект уникален
              </p>
            </div>
            
            <ShowreelPlayer 
              videoSrc="/showreel.mp4"
              title="WESHOW Showreel 2024"
              description="Лучшие проекты и инновационные решения"
              className="aspect-video w-full"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Цифры говорят сами за себя</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Наш опыт и достижения в цифрах
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-slate-900 mb-1">{stat.label}</div>
                <div className="text-sm text-slate-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Избранные проекты</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Познакомьтесь с нашими ключевыми работами
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    {project.category}
                  </Badge>
                  <span className="text-sm text-slate-500">{project.year}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                
                <Link 
                  to={project.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform duration-300"
                >
                  Подробнее
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Готовы создать что-то удивительное?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Давайте обсудим ваш проект и создадим незабываемый опыт для ваших гостей
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link to="/contact">
                <Zap className="w-5 h-5 mr-2" />
                Обсудить проект
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg font-semibold border-white/30 text-white hover:bg-white/20 transition-all duration-300"
              asChild
            >
              <Link to="/portfolio">
                Посмотреть портфолио
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Showreel;
