import { CheckCircle, Award, Users, Zap } from "lucide-react";

const UniqueValueProposition = () => {
  const benefits = [
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Комплексный подход",
      description: "От проектирования до сервисного обслуживания - все услуги в одном месте"
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Экспертность",
      description: "15+ лет опыта и команда сертифицированных специалистов"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "B2B фокус",
      description: "Глубокое понимание потребностей корпоративных клиентов"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Инновационные технологии",
      description: "Использование передовых решений и оборудования мирового уровня"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Почему выбирают именно WESHOW?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Мы не просто поставляем оборудование — мы создаем комплексные технологические решения, 
            которые увеличивают ROI и укрепляют имидж вашей компании
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-center">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
          
          {/* Key UVP Statement */}
          <div className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl border border-primary/10">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Гарантируем результат
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Увеличиваем эффективность ваших мероприятий на 40% благодаря инновационным 
              мультимедийным технологиям и профессиональному техническому сопровождению
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span className="bg-success/10 text-success px-3 py-1 rounded-full">
                ✓ Полная техническая поддержка 24/7
              </span>
              <span className="bg-success/10 text-success px-3 py-1 rounded-full">
                ✓ Гарантия качества 2 года
              </span>
              <span className="bg-success/10 text-success px-3 py-1 rounded-full">
                ✓ Соответствие ГОСТ и международным стандартам
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniqueValueProposition;