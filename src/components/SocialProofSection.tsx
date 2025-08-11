import { Star, Quote } from "lucide-react";

const SocialProofSection = () => {
  const testimonials = [
    {
      quote: "WESHOW реализовали для нас комплексное техническое оснащение головного офиса. Профессиональный подход и качество работ превзошли наши ожидания.",
      author: "Михаил Петров",
      position: "Директор по развитию",
      company: "ВТБ",
      rating: 5
    },
    {
      quote: "Благодаря мультимедийным решениям от WESHOW наши корпоративные мероприятия стали более эффективными и запоминающимися для участников.",
      author: "Анна Сидорова",
      position: "Event-менеджер",
      company: "Сбербанк",
      rating: 5
    }
  ];

  const clients = [
    "ВТБ", "Сбербанк", "Газпром", "Роснефть", "МТС", "Билайн", "Мегафон", "Тинькофф"
  ];

  const achievements = [
    { icon: "🏆", title: "Лучший системный интегратор", year: "2023" },
    { icon: "⭐", title: "Премия за инновации", year: "2023" },
    { icon: "🎖️", title: "Сертификат качества ISO", year: "2024" },
    { icon: "🥇", title: "Партнер года", year: "2024" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Client Logos */}
        <div className="text-center mb-16">
          <h3 className="text-lg font-semibold text-muted-foreground mb-8 uppercase tracking-wider">
            Нам доверяют ведущие компании
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <span className="text-sm font-semibold text-muted-foreground">{client}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Отзывы наших клиентов
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                <blockquote className="text-lg text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-semibold">
                      {testimonial.author.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.position}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements and Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-primary/10"
            >
              <div className="text-4xl mb-3">{achievement.icon}</div>
              <h3 className="font-semibold text-foreground mb-1">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground">{achievement.year}</p>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Успешных проектов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-sm text-muted-foreground">Благодарственных писем</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Время работы систем</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Техническая поддержка</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;