import { Search, FileText, Cog, Truck, Settings, Headphones } from "lucide-react";

const WorkProcessSection = () => {
  const steps = [
    {
      number: 1,
      icon: <Search className="h-8 w-8" />,
      title: "Консультация и анализ потребностей",
      description: "Выезд специалиста, анализ технических требований, разработка концепции решения",
      duration: "1-2 дня"
    },
    {
      number: 2,
      icon: <FileText className="h-8 w-8" />,
      title: "Техническое проектирование",
      description: "Создание детального проекта, подготовка спецификации оборудования, согласование бюджета",
      duration: "3-5 дней"
    },
    {
      number: 3,
      icon: <Truck className="h-8 w-8" />,
      title: "Поставка оборудования",
      description: "Закупка и доставка сертифицированного оборудования от ведущих производителей",
      duration: "1-2 недели"
    },
    {
      number: 4,
      icon: <Cog className="h-8 w-8" />,
      title: "Монтаж и настройка",
      description: "Профессиональный монтаж, настройка и интеграция всех систем, тестирование",
      duration: "1-3 недели"
    },
    {
      number: 5,
      icon: <Settings className="h-8 w-8" />,
      title: "Пуско-наладочные работы",
      description: "Финальная настройка, обучение персонала, подготовка технической документации",
      duration: "3-5 дней"
    },
    {
      number: 6,
      icon: <Headphones className="h-8 w-8" />,
      title: "Сервисное обслуживание",
      description: "Техническая поддержка 24/7, плановое обслуживание, гарантийное сопровождение",
      duration: "Постоянно"
    }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Процесс работы
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Пошаговый подход к реализации мультимедийных проектов любой сложности
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mr-4">
                  {step.icon}
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                  {step.number}
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {step.description}
              </p>
              
              <div className="text-sm font-medium text-primary">
                Длительность: {step.duration}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline for desktop */}
        <div className="hidden lg:block mt-16">
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border"></div>
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={step.number} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-card border border-border rounded-lg p-4">
                      <div className="text-sm font-medium text-primary mb-1">Этап {step.number}</div>
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full font-bold text-sm">
                    {step.number}
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcessSection;