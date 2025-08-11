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
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Как мы работаем
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Наш проверенный процесс гарантирует качественную реализацию проектов любой сложности 
            в установленные сроки
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary transform -translate-y-1/2" />
          
          <div className="grid grid-cols-6 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Circle */}
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-6 shadow-lg relative z-10">
                  <span className="text-white font-bold text-lg">{step.number}</span>
                </div>
                
                {/* Content Card */}
                <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mx-auto mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 text-center leading-relaxed">
                    {step.description}
                  </p>
                  <div className="text-center">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                      {step.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet Vertical Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary" />
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="relative flex items-start">
                  {/* Step Circle */}
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg relative z-10 mr-6">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 bg-card p-6 rounded-xl shadow-sm border border-border">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-lg mr-3">
                        {step.icon}
                      </div>
                      <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/10 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Готовы начать проект?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Свяжитесь с нами для бесплатной консультации. Наши эксперты проанализируют ваши 
              потребности и предложат оптимальное решение
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-primary-light text-primary-foreground rounded-lg font-semibold hover:from-primary-light hover:to-primary-glow shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                Получить консультацию
              </button>
              <button className="px-8 py-3 border border-border bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent rounded-lg font-semibold transition-all">
                Рассчитать стоимость
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcessSection;