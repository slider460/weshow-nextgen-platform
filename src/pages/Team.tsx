import Header from "../components/Header";
import Footer from "../components/Footer";
import { Users } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";

const Team = () => {
  
  const teamMembers = [
    {
      name: "Народецкий Александр",
      position: "Client Service Director / CEO",
      experience: "Более 10 лет",
      description: "Руководитель клиентского сервиса и генеральный директор агентства",
      image: "/team/alexander-narodetsky.jpg"
    },
    {
      name: "Семенов Эдвард",
      position: "Commercial Director",
      experience: "Более 10 лет",
      description: "Коммерческий директор, отвечает за развитие бизнеса и партнерские отношения",
      image: "/team/edward-semenov.jpg"
    },
    {
      name: "Дементьев Святослав",
      position: "Chief Creative Officer",
      experience: "Более 10 лет",
      description: "Главный креативный директор, создает уникальные творческие решения",
      image: "/team/svyatoslav-dementyev.jpg"
    },
    {
      name: "Кличановский Сергей",
      position: "Business Development Director",
      experience: "Более 10 лет",
      description: "Директор по развитию бизнеса, стратегическое планирование и рост",
      image: "/team/sergey-klichanovsky.jpg"
    },
    {
      name: "Осотов Алексей",
      position: "Chief Information Officer",
      experience: "Более 10 лет",
      description: "Главный информационный директор, управление IT-инфраструктурой",
      image: "/team/alexey-osotov.jpg"
    },
    {
      name: "Муратов Денис",
      position: "Technical Director",
      experience: "Более 10 лет",
      description: "Технический директор, контроль качества и техническое обеспечение",
      image: "/team/denis-muratov.jpg"
    },
    {
      name: "Агафонова Илона",
      position: "Senior Account Manager",
      experience: "Более 10 лет",
      description: "Старший менеджер по работе с клиентами, координация проектов",
      image: "/team/ilona-agafonova.jpg"
    },
    {
      name: "Иншакова Ксения",
      position: "Creative Project Manager",
      experience: "Более 8 лет",
      description: "Креативный менеджер проектов, координация творческих процессов и клиентских запросов",
      image: "/team/ksenia-inshakova.jpg"
    },
    {
      name: "Овсянникова Мария",
      position: "Marketing Communications Specialist",
      experience: "Более 7 лет",
      description: "Специалист по маркетинговым коммуникациям, развитие бренда и внешних связей",
      image: "/team/maria-ovsyanikova.jpg"
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
              Профессионалы с многолетним опытом в области мультимедийных технологий
            </p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="group h-full bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                    {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <CardHeader className="text-center pb-3 relative">
                      <div className="relative mb-3">
                        <div className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300">
                          <img 
                            src={`${member.image}?v=${Date.now()}`} 
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onLoad={() => {
                              console.log('✅ Изображение загружено:', member.name, member.image);
                            }}
                            onError={(e) => {
                              console.error('❌ Ошибка загрузки изображения:', member.name, member.image);
                              // При ошибке загрузки изображения показываем инициалы
                              const target = e.target as HTMLImageElement;
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg">
                                    ${member.name.split(' ').map(n => n[0]).join('')}
                                  </div>
                                `;
                              }
                            }}
                          />
                        </div>
                        
                      </div>
                      
                      <CardTitle className="text-base font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                        {member.name}
                      </CardTitle>
                      
                      <Badge variant="secondary" className="w-fit mx-auto mb-2 bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors text-xs">
                        {member.position}
                      </Badge>
                      
                      <CardDescription className="text-xs text-slate-500 mb-2">
                        Опыт: {member.experience}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0 pb-4">
                      <p className="text-xs text-slate-600 leading-relaxed text-center line-clamp-3">
                        {member.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
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