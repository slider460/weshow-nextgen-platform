import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Award, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialProofSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Массив с данными о благодарственных письмах и грамотах
  const documents = [
    {
      id: 1,
      title: "Благодарственное письмо от ВТБ",
      description: "За качественное выполнение работ по техническому оснащению головного офиса",
      image: "/public/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png", // Заглушка
      type: "letter",
      year: "2024"
    },
    {
      id: 2,
      title: "Грамота Лучший системный интегратор",
      description: "Награда за выдающиеся достижения в области системной интеграции",
      image: "/public/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png", // Заглушка
      type: "award",
      year: "2023"
    },
    {
      id: 3,
      title: "Благодарность от Сбербанка",
      description: "За успешную реализацию мультимедийных решений для корпоративных мероприятий",
      image: "/public/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png", // Заглушка
      type: "letter",
      year: "2024"
    },
    {
      id: 4,
      title: "Сертификат партнера года",
      description: "Признание заслуг в области инноваций и качества обслуживания",
      image: "/public/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png", // Заглушка
      type: "certificate",
      year: "2024"
    },
    {
      id: 5,
      title: "Благодарственное письмо от Газпрома",
      description: "За профессиональное техническое сопровождение масштабного проекта",
      image: "/public/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png", // Заглушка
      type: "letter",
      year: "2023"
    }
  ];

  const clients = [
    "ВТБ", "Сбербанк", "Газпром", "Роснефть", "МТС", "Билайн", "Мегафон", "Тинькофф"
  ];

  // Автоматическая смена слайдов
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % documents.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [documents.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % documents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + documents.length) % documents.length);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "award":
        return <Award className="h-6 w-6 text-yellow-500" />;
      case "certificate":
        return <Award className="h-6 w-6 text-blue-500" />;
      default:
        return <FileText className="h-6 w-6 text-green-500" />;
    }
  };

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

        {/* Documents Carousel */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
            Благодарственные письма и грамоты
          </h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {documents.map((doc, index) => (
                  <div key={doc.id} className="w-full flex-shrink-0">
                    <div className="bg-card p-8 shadow-sm border border-border">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Document Image */}
                        <div className="order-2 lg:order-1">
                          <div className="relative group">
                            <img 
                              src={doc.image} 
                              alt={doc.title}
                              className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition-colors duration-300" />
                          </div>
                        </div>
                        
                        {/* Document Info */}
                        <div className="order-1 lg:order-2">
                          <div className="flex items-center mb-4">
                            {getIcon(doc.type)}
                            <span className="ml-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                              {doc.year}
                            </span>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-foreground mb-4">
                            {doc.title}
                          </h3>
                          
                          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                            {doc.description}
                          </p>
                          
                          <Button variant="outline" className="group">
                            Посмотреть полностью
                            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background z-10"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {documents.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
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