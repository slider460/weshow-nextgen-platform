import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Monitor, Code, Settings, Calendar, Package, Palette, Layers, ShoppingCart } from "lucide-react";

const Services = () => {
  const serviceCategories = [
    {
      title: "Мультимедийные решения",
      icon: <Monitor className="h-12 w-12" />,
      description: "Создание впечатляющих визуальных эффектов",
      services: [
        "3D-маппинг проекции",
        "LED-видеостены и экраны",
        "Интерактивные инсталляции",
        "Голографические дисплеи",
        "Иммерсивные среды"
      ]
    },
    {
      title: "Разработка ПО",
      icon: <Code className="h-12 w-12" />,
      description: "Индивидуальные программные решения",
      services: [
        "Интерактивные приложения",
        "AR/VR разработка",
        "Игры на базе Kinect",
        "Мобильные приложения",
        "Web-платформы"
      ]
    },
    {
      title: "Техническая поддержка",
      icon: <Settings className="h-12 w-12" />,
      description: "Профессиональное сопровождение",
      services: [
        "24/7 техническая поддержка",
        "Выездное обслуживание",
        "Консультации экспертов",
        "Диагностика оборудования",
        "Плановое обслуживание"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-extralight text-foreground mb-6 tracking-tight">
              Услуги
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light leading-relaxed">
              Полный спектр мультимедийных решений от концепции до реализации
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {serviceCategories.map((category, index) => (
              <div key={index} className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 hover:border-primary/20 transition-all duration-300 group">
                <div className="text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">{category.title}</h3>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                <ul className="space-y-3">
                  {category.services.map((service, serviceIndex) => (
                    <li key={serviceIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3" />
                      {service}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="mt-6 w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Подробнее
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light text-foreground mb-6">
              Готовы создать что-то удивительное?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Обсудим ваш проект и найдем оптимальное решение
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Связаться с нами
              </Button>
              <Button variant="outline" size="lg">
                Смотреть портфолио
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;