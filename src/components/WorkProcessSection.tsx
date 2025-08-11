import { Search, FileText, Cog, Truck, Settings, Headphones } from "lucide-react";

const WorkProcessSection = () => {
  const steps = [
    {
      number: 1,
      icon: <Search className="h-8 w-8" />,
      title: "Консультация и анализ потребностей",
      description: "Выезд специалиста, анализ технических требований, разработка концепции решения",
      duration: "1-2 дня",
      gradient: "gradient-card-purple"
    },
    {
      number: 2,
      icon: <FileText className="h-8 w-8" />,
      title: "Техническое проектирование",
      description: "Создание детального проекта, подготовка спецификации оборудования, согласование бюджета",
      duration: "3-5 дней",
      gradient: "gradient-card-blue"
    },
    {
      number: 3,
      icon: <Truck className="h-8 w-8" />,
      title: "Поставка оборудования",
      description: "Закупка и доставка сертифицированного оборудования от ведущих производителей",
      duration: "1-2 недели",
      gradient: "gradient-card-cyan"
    },
    {
      number: 4,
      icon: <Cog className="h-8 w-8" />,
      title: "Монтаж и настройка",
      description: "Профессиональный монтаж, настройка и интеграция всех систем, тестирование",
      duration: "1-3 недели",
      gradient: "gradient-card-dark"
    },
    {
      number: 5,
      icon: <Settings className="h-8 w-8" />,
      title: "Пуско-наладочные работы",
      description: "Финальная настройка, обучение персонала, подготовка технической документации",
      duration: "3-5 дней",
      gradient: "gradient-card-purple"
    },
    {
      number: 6,
      icon: <Headphones className="h-8 w-8" />,
      title: "Сервисное обслуживание",
      description: "Техническая поддержка 24/7, плановое обслуживание, гарантийное сопровождение",
      duration: "Постоянно",
      gradient: "gradient-card-blue"
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Процесс работы
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Пошаговый подход к реализации мультимедийных проектов любой сложности
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className={`${step.gradient} rounded-3xl p-8 hover:scale-105 transition-all duration-300 relative`}>
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{step.number}</span>
              </div>
              
              <div className="text-white mb-6">
                {step.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                {step.title}
              </h3>
              
              <p className="text-white/90 text-sm leading-relaxed mb-6">
                {step.description}
              </p>
              
              <div className="text-sm font-medium text-white/80 bg-white/10 rounded-lg px-3 py-2 inline-block">
                Длительность: {step.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcessSection;