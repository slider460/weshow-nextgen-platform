import React from 'react';
import TeamCard from './TeamCard';
import MobileCarousel from './ui/MobileCarousel';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  experience: string;
  description: string;
  avatarUrl: string;
}

const teamMembers: TeamMember[] = [
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
    name: 'Сергей Кличановский',
    title: 'Business Development Director',
    experience: 'Опыт: Более 10 лет',
    description: 'Директор по развитию бизнеса, стратегическое планирование и рост',
    avatarUrl: '/team/sergey-klichanovsky.jpg'
  },
  {
    id: '3',
    name: 'Семенов Эдвард',
    title: 'Commercial Director',
    experience: 'Опыт: Более 10 лет',
    description: 'Коммерческий директор, отвечает за развитие бизнеса и партнерские отношения',
    avatarUrl: '/team/edward-semenov.jpg'
  },
  {
    id: '4',
    name: 'Дементьев Святослав',
    title: 'Chief Creative Officer',
    experience: 'Опыт: Более 10 лет',
    description: 'Главный креативный директор, создает уникальные творческие решения',
    avatarUrl: '/team/svyatoslav-dementyev.jpg'
  },
  {
    id: '5',
    name: 'Осотов Алексей',
    title: 'Chief Information Officer',
    experience: 'Опыт: Более 10 лет',
    description: 'Главный информационный директор, отвечает за IT-инфраструктуру и технологии',
    avatarUrl: '/team/alexey-osotov.jpg'
  }
];

const TeamMobileSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Наша команда
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Эксперты с многолетним опытом в области мультимедиа и технологий
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <MobileCarousel showOnMobile={true} showOnDesktop={false}>
          {teamMembers.map((member) => (
            <div key={member.id} className="mx-2">
              <TeamCard member={member} />
            </div>
          ))}
        </MobileCarousel>

        <div className="text-center mt-16">
          <p className="text-slate-600 mb-6">
            Хотите присоединиться к нашей команде?
          </p>
          <a 
            href="/careers" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Открытые вакансии
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamMobileSection;
