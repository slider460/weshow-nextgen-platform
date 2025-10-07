import { Users } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Народецкий Александр",
      position: "Client Service Director / CEO",
      experience: "Более 10 лет",
      description: "Руководитель клиентского сервиса и генеральный директор агентства",
      image: "/team/alexander-narodetsky.jpg",
      linkedin: "#",
      email: "alexander@weshow.ru"
    },
    {
      name: "Сергей Кличановский",
      position: "Business Development Director",
      experience: "Более 10 лет",
      description: "Директор по развитию бизнеса, стратегическое планирование и рост",
      image: "/team/sergey-klichanovsky.jpg",
      linkedin: "#",
      email: "sergey@weshow.ru"
    },
    {
      name: "Семенов Эдвард",
      position: "Commercial Director",
      experience: "Более 10 лет",
      description: "Коммерческий директор, отвечает за развитие бизнеса и партнерские отношения",
      image: "/team/edward-semenov.jpg",
      linkedin: "#",
      email: "edward@weshow.ru"
    },
    {
      name: "Дементьев Святослав",
      position: "Chief Creative Officer",
      experience: "Более 10 лет",
      description: "Главный креативный директор, создает уникальные творческие решения",
      image: "/team/svyatoslav-dementyev.jpg",
      linkedin: "#",
      email: "svyatoslav@weshow.ru"
    },
    {
      name: "Осотов Алексей",
      position: "Chief Information Officer",
      experience: "Более 10 лет",
      description: "Главный информационный директор, управление IT-инфраструктурой",
      image: "/team/alexey-osotov.jpg",
      linkedin: "#",
      email: "alexey@weshow.ru"
    },
    {
      name: "Муратов Денис",
      position: "Technical Director",
      experience: "Более 10 лет",
      description: "Технический директор, контроль качества и техническое обеспечение",
      image: "/team/denis-muratov.jpg",
      linkedin: "#",
      email: "denis@weshow.ru"
    },
    {
      name: "Агафонова Илона",
      position: "Senior Account Manager",
      experience: "Более 10 лет",
      description: "Старший менеджер по работе с клиентами, координация проектов",
      image: "/team/ilona-agafonova.jpg",
      linkedin: "#",
      email: "ilona@weshow.ru"
    },
    {
      name: "Иншакова Ксения",
      position: "Creative Project Manager",
      experience: "Более 8 лет",
      description: "Креативный менеджер проектов, координация творческих процессов и клиентских запросов",
      image: "/team/ksenia-inshakova.jpg",
      linkedin: "#",
      email: "ksenia@weshow.ru"
    },
    {
      name: "Овсянникова Мария",
      position: "Marketing Communications Specialist",
      experience: "Более 7 лет",
      description: "Специалист по маркетинговым коммуникациям, развитие бренда и внешних связей",
      image: "/team/maria-ovsyanikova.jpg",
      linkedin: "#",
      email: "maria@weshow.ru"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            Наша команда
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Наша команда
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> экспертов</span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            9 опытных специалистов, объединенных общей целью создания впечатляющих мультимедийных проектов
          </p>
        </div>


        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
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

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Хотите работать с нами?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Присоединяйтесь к команде профессионалов и создавайте впечатляющие проекты вместе с нами
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/20 bg-white/10"
              >
                Открытые вакансии
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/20 bg-white/10"
              >
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
