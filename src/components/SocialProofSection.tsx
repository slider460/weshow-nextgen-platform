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
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      type: "letter",
      year: "2024"
    },
    {
      id: 2,
      title: "Грамота Лучший системный интегратор",
      description: "Награда за выдающиеся достижения в области системной интеграции",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      type: "award",
      year: "2023"
    },
    {
      id: 3,
      title: "Благодарность от Сбербанка",
      description: "За успешную реализацию мультимедийных решений для корпоративных мероприятий",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      type: "letter",
      year: "2024"
    },
    {
      id: 4,
      title: "Сертификат партнера года",
      description: "Признание заслуг в области инноваций и качества обслуживания",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      type: "certificate",
      year: "2024"
    },
    {
      id: 5,
      title: "Благодарственное письмо от Газпрома",
      description: "За профессиональное техническое сопровождение масштабного проекта",
      image: "/lovable-uploads/01b05963-12d9-42c2-b515-e67dd048540f.png",
      type: "letter",
      year: "2023"
    }
  ];

  // Клиенты для отображения
  const clients = [
    { name: "ВТБ", logo: "/placeholder.svg" },
    { name: "Сбербанк", logo: "/placeholder.svg" },
    { name: "Газпром", logo: "/placeholder.svg" },
    { name: "Российские железные дороги", logo: "/placeholder.svg" },
    { name: "МТС", logo: "/placeholder.svg" },
    { name: "Лукойл", logo: "/placeholder.svg" },
    { name: "Ростелеком", logo: "/placeholder.svg" },
    { name: "Аэрофлот", logo: "/placeholder.svg" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % documents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + documents.length) % documents.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "award":
        return <Award className="h-6 w-6 text-success" />;
      case "certificate":
        return <Award className="h-6 w-6 text-primary" />;
      default:
        return <FileText className="h-6 w-6 text-accent" />;
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clients Section */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
            Нам доверяют
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {clients.map((client, index) => (
              <div key={index} className="flex items-center justify-center p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center mb-2 mx-auto">
                    <span className="text-xs font-medium text-muted-foreground">LOGO</span>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">{client.name}</div>
                </div>
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
                    <div className="bg-card border border-border p-8 shadow-sm">
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
                            Читать полностью
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
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/80 border border-border text-foreground rounded-full flex items-center justify-center hover:bg-background/90 transition-colors duration-200 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-background/80 border border-border text-foreground rounded-full flex items-center justify-center hover:bg-background/90 transition-colors duration-200 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {documents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentSlide ? "bg-primary" : "bg-muted"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Проектов выполнено</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-success mb-2">15+</div>
            <div className="text-muted-foreground">Лет на рынке</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-accent mb-2">50+</div>
            <div className="text-muted-foreground">Партнеров</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Техподдержка</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;