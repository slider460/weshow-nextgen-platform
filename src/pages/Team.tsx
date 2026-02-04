import Header from "../components/Header";
import Footer from "../components/Footer";
import { Users } from "lucide-react";
import { Button } from "../components/ui/button";
import TeamCard from "../components/TeamCard";

const Team = () => {
  
  const teamMembers = [
    {
      id: '1',
      name: 'Народецкий Александр',
      title: 'Client Service Director / CEO',
      experience: 'Опыт: Более 10 лет',
      description: 'Руководитель клиентского сервиса и генеральный директор агентства',
      avatarUrl: '/team/alexander-narodetsky.jpg'
    },
    {
      id: '2',
      name: 'Семенов Эдвард',
      title: 'Commercial Director',
      experience: 'Опыт: Более 10 лет',
      description: 'Коммерческий директор, отвечает за развитие бизнеса и партнерские отношения',
      avatarUrl: '/team/edward-semenov.jpg'
    },
    {
      id: '3',
      name: 'Дементьев Святослав',
      title: 'Chief Creative Officer',
      experience: 'Опыт: Более 10 лет',
      description: 'Главный креативный директор, создает уникальные творческие решения',
      avatarUrl: '/team/svyatoslav-dementyev.jpg'
    },
    {
      id: '4',
      name: 'Кличановский Сергей',
      title: 'Business Development Director',
      experience: 'Опыт: Более 10 лет',
      description: 'Директор по развитию бизнеса, стратегическое планирование и рост',
      avatarUrl: '/team/sergey-klichanovsky.jpg'
    },
    {
      id: '5',
      name: 'Осотов Алексей',
      title: 'Chief Information Officer',
      experience: 'Опыт: Более 10 лет',
      description: 'Главный информационный директор, управление IT-инфраструктурой',
      avatarUrl: '/team/alexey-osotov.jpg'
    },
    {
      id: '6',
      name: 'Муратов Денис',
      title: 'Technical Director',
      experience: 'Опыт: Более 10 лет',
      description: 'Технический директор, контроль качества и техническое обеспечение',
      avatarUrl: '/team/denis-muratov.jpg'
    },
    {
      id: '7',
      name: 'Агафонова Илона',
      title: 'Senior Account Manager',
      experience: 'Опыт: Более 10 лет',
      description: 'Старший менеджер по работе с клиентами, координация проектов',
      avatarUrl: '/team/ilona-agafonova.jpg'
    },
    {
      id: '8',
      name: 'Иншакова Ксения',
      title: 'Creative Project Manager',
      experience: 'Опыт: Более 8 лет',
      description: 'Креативный менеджер проектов, координация творческих процессов и клиентских запросов',
      avatarUrl: '/team/ksenia-inshakova.jpg'
    },
    {
      id: '9',
      name: 'Овсянникова Мария',
      title: 'Marketing Communications Specialist',
      experience: 'Опыт: Более 7 лет',
      description: 'Специалист по маркетинговым коммуникациям, развитие бренда и внешних связей',
      avatarUrl: '/team/maria-ovsyanikova.jpg'
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <TeamCard
                  key={member.id}
                  avatarUrl={member.avatarUrl}
                  name={member.name}
                  title={member.title}
                  experience={member.experience}
                  description={member.description}
                  enableTilt={true}
                />
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