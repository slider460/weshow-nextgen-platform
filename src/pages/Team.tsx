import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Award, Star, Linkedin, Building, Globe, Users2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const Team = () => {
  const teamMembers = [
    {
      name: "Народецкий Александр",
      position: "Client Service Director / CEO",
      experience: "Более 10 лет",
      description: "Руководитель клиентского сервиса и генеральный директор агентства",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png"
    },
    {
      name: "Семенов Эдвард",
      position: "Commercial Director",
      experience: "Более 10 лет",
      description: "Коммерческий директор, отвечает за развитие бизнеса и партнерские отношения",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png"
    },
    {
      name: "Дементьев Святослав",
      position: "Chief Creative Officer",
      experience: "Более 10 лет",
      description: "Главный креативный директор, создает уникальные творческие решения",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png"
    },
    {
      name: "Кличановский Сергей",
      position: "Business Development Director",
      experience: "Более 10 лет",
      description: "Директор по развитию бизнеса, стратегическое планирование и рост",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png"
    },
    {
      name: "Осотов Алексей",
      position: "Chief Information Officer",
      experience: "Более 10 лет",
      description: "Главный информационный директор, управление IT-инфраструктурой",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png"
    },
    {
      name: "Муратов Денис",
      position: "Technical Director",
      experience: "Более 10 лет",
      description: "Технический директор, контроль качества и техническое обеспечение",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png"
    },
    {
      name: "Агафонова Илона",
      position: "Senior Account Manager",
      experience: "Более 10 лет",
      description: "Старший менеджер по работе с клиентами, координация проектов",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png"
    }
  ];

  const companyInfo = [
    {
      icon: <Building className="h-8 w-8" />,
      title: "БОЛЕЕ 10 ЛЕТ",
      description: "мы преумножаем успехи"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "FULL SERVICE",
      description: "Любые услуги в области маркетинговых коммуникаций"
    },
    {
      icon: <Users2 className="h-8 w-8" />,
      title: "СОТРУДНИЧЕСТВО",
      description: "Целеустремленность и внимание к партнерам - залог долгосрочного партнерства"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "ЛОКАЦИЯ",
      description: "Офис в центре Москвы. Региональная партнерская сеть с охватом более 100 городов России"
    }
  ];

  const achievements = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "200+",
      description: "Успешных проектов"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "7+",
      description: "Ключевых специалистов"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "10+",
      description: "Лет на рынке"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative">
            <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-8 border border-white/30">
              <Users className="h-5 w-5 mr-2 animate-pulse" />
              Команда профессионалов
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Наша команда
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Профессионалы с многолетним опытом в области мультимедийных технологий и маркетинговых коммуникаций
            </p>
          </div>
        </section>

        {/* Company Philosophy */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8">
                Философия компании
              </h2>
              <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
                <p>
                  Основную бизнес-философию агентства можно охарактеризовать словом «прозрачность»: клиент 
                  имеет возможность наблюдать за исполнением заказа на каждом этапе работы, получая экспертную 
                  оценку исполняемых процедур.
                </p>
                <p>
                  Главной движущей силой нашей компании являются ее сотрудники. На сегодняшний день в агентстве 
                  работают специалисты, имеющие богатый опыт работы в рекламном бизнесе.
                </p>
                <p>
                  Основной принцип нашей работы - комплексное обеспечение клиентского сервиса на основе 
                  ситуационного анализа его потребностей, с последующей выработкой наиболее оптимальных 
                  методик и инструментов продвижения продуктов и услуг.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {companyInfo.map((info, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                    <div className="text-white">
                      {info.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {info.title}
                  </h3>
                  <p className="text-slate-600 font-medium text-base leading-relaxed">
                    {info.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50"></div>
          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                    <div className="text-white">
                      {achievement.icon}
                    </div>
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 mb-3">
                    {achievement.title}
                  </h3>
                  <p className="text-slate-600 font-medium text-lg">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Ключевые специалисты
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Наша команда объединяет опытных профессионалов в области маркетинговых коммуникаций и технологий
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100">
                  <div className="relative mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <Linkedin className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {member.name}
                  </h3>
                  
                  <p className="text-primary font-medium mb-2">
                    {member.position}
                  </p>
                  
                  <p className="text-sm text-slate-500 mb-4">
                    Опыт: {member.experience}
                  </p>
                  
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Присоединяйтесь к нашей команде
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Мы всегда ищем талантливых специалистов для работы над интересными проектами
              </p>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10">
                Открытые вакансии
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Team;