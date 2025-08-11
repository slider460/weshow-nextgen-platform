import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Award, Star, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Team = () => {
  const teamMembers = [
    {
      name: "Александр Петров",
      position: "Генеральный директор",
      experience: "15+ лет",
      description: "Эксперт в области мультимедийных технологий и управления проектами",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png"
    },
    {
      name: "Мария Иванова",
      position: "Технический директор",
      experience: "12+ лет",
      description: "Специалист по интеграции сложных технических решений",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png"
    },
    {
      name: "Дмитрий Сидоров",
      position: "Руководитель отдела разработки",
      experience: "10+ лет",
      description: "Разработчик AR/VR решений и интерактивных приложений",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png"
    },
    {
      name: "Анна Смирнова",
      position: "Менеджер проектов",
      experience: "8+ лет",
      description: "Координатор крупных мероприятий и технических проектов",
      image: "/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png"
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
      title: "50+",
      description: "Специалистов в команде"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "15+",
      description: "Лет на рынке"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-accent">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Наша команда
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Профессионалы с многолетним опытом в области мультимедийных технологий
            </p>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
                    <div className="text-primary">
                      {achievement.icon}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-slate-600">
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
                Наша команда объединяет опытных профессионалов в области технологий и управления проектами
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 text-center hover:shadow-lg transition-all duration-300">
                  <div className="relative mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
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