import React from 'react';
import TeamCard from './TeamCard';

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
    description: 'Главный информационный директор, управление ІТ-инфраструктурой',
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
    name: 'Овсянникова Мария',
    title: 'Senior Account Manager',
    experience: 'Опыт: Более 10 лет',
    description: 'Старший менеджер по работе с клиентами, координация проектов',
    avatarUrl: '/team/maria-ovsyanikova.jpg'
  },
  {
    id: '8',
    name: 'Иншакова Ксения',
    title: 'Creative Project Manager',
    experience: 'Опыт: Более 8 лет',
    description: 'Креативный менеджер проектов, координация творческих процессов и клиентских запросов',
    avatarUrl: '/team/ksenia-inshakova.jpg'
  }
];

const TeamSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Наша <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">команда</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Профессионалы с многолетним опытом, которые создают инновационные решения для вашего бизнеса
          </p>
        </div>

        {/* Сетка карточек команды */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamCard
              key={member.id}
              avatarUrl={member.avatarUrl}
              name={member.name}
              title={member.title}
              experience={member.experience}
              description={member.description}
              className="w-full"
            />
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Готовы работать с нами?
            </h3>
            <p className="text-gray-300 mb-6">
              Наша команда экспертов готова воплотить ваши идеи в жизнь
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Связаться с нами
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;