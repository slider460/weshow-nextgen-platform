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
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 min-h-[400px] flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 relative overflow-hidden">
                  <img
                    src={member.avatarUrl}
                    alt={`${member.name} avatar`}
                    className="w-20 h-20 rounded-full object-cover border-2 border-white"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                
                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {member.name}
                </h3>
                
                {/* Title Badge */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-2">
                  {member.title}
                </div>
                
                {/* Experience */}
                <p className="text-gray-600 text-sm mb-3">
                  {member.experience}
                </p>
                
                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                  {member.description}
                </p>
              </div>
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
