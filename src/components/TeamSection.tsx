import { Users, Award, Star, Mail } from "lucide-react";
import { Button } from "./ui/button";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Народецкий Александр",
      position: "Client Service Director / CEO",
      experience: "Более 10 лет",
      description: "Руководитель клиентского сервиса и генеральный директор агентства",
      image: "/team/alexander-narodetsky.svg",
      linkedin: "#",
      email: "alexander@weshow.ru"
    },
    {
      name: "Сергей Кличановский",
      position: "Business Development Director",
      experience: "Более 10 лет",
      description: "Директор по развитию бизнеса, стратегическое планирование и рост",
      image: "/team/sergey-klichanovsky.svg",
      linkedin: "#",
      email: "sergey@weshow.ru"
    },
    {
      name: "Семенов Эдвард",
      position: "Commercial Director",
      experience: "Более 10 лет",
      description: "Коммерческий директор, отвечает за развитие бизнеса и партнерские отношения",
      image: "/team/edward-semenov.svg",
      linkedin: "#",
      email: "edward@weshow.ru"
    },
    {
      name: "Дементьев Святослав",
      position: "Chief Creative Officer",
      experience: "Более 10 лет",
      description: "Главный креативный директор, создает уникальные творческие решения",
      image: "/team/svyatoslav-dementyev.svg",
      linkedin: "#",
      email: "svyatoslav@weshow.ru"
    },
    {
      name: "Осотов Алексей",
      position: "Chief Information Officer",
      experience: "Более 10 лет",
      description: "Главный информационный директор, управление IT-инфраструктурой",
      image: "/team/alexey-osotov.svg",
      linkedin: "#",
      email: "alexey@weshow.ru"
    },
    {
      name: "Муратов Денис",
      position: "Technical Director",
      experience: "Более 10 лет",
      description: "Технический директор, контроль качества и техническое обеспечение",
      image: "/team/denis-muratov.svg",
      linkedin: "#",
      email: "denis@weshow.ru"
    },
    {
      name: "Агафонова Илона",
      position: "Senior Account Manager",
      experience: "Более 10 лет",
      description: "Старший менеджер по работе с клиентами, координация проектов",
      image: "/team/ilona-agafonova.svg",
      linkedin: "#",
      email: "ilona@weshow.ru"
    },
    {
      name: "Иншакова Ксения",
      position: "Creative Project Manager",
      experience: "Более 8 лет",
      description: "Креативный менеджер проектов, координация творческих процессов и клиентских запросов",
      image: "/team/ksenia-inshakova.svg",
      linkedin: "#",
      email: "ksenia@weshow.ru"
    },
    {
      name: "Овсянникова Мария",
      position: "Marketing Communications Specialist",
      experience: "Более 7 лет",
      description: "Специалист по маркетинговым коммуникациям, развитие бренда и внешних связей",
      image: "/team/maria-ovsyanikova.svg",
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

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">9</div>
            <div className="text-slate-600">Специалистов</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">10+</div>
            <div className="text-slate-600">Лет опыта</div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-2">500+</div>
            <div className="text-slate-600">Проектов</div>
          </div>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-blue-200"
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                {/* Email Link */}
                <div className="absolute -bottom-2 -right-2">
                  <a 
                    href={`mailto:${member.email}`}
                    className="w-8 h-8 bg-slate-500 rounded-full flex items-center justify-center hover:bg-slate-600 transition-colors"
                  >
                    <Mail className="h-4 w-4 text-white" />
                  </a>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {member.name}
                </h3>
                
                <p className="text-blue-600 font-medium mb-2 text-sm">
                  {member.position}
                </p>
                
                <p className="text-xs text-slate-500 mb-3">
                  Опыт: {member.experience}
                </p>
                
                <p className="text-sm text-slate-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
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
