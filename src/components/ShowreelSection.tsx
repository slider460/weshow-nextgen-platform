import { Button } from "@/components/ui/button";
import { Play, MapPin, Calendar, ArrowRight } from "lucide-react";

const ShowreelSection = () => {
  return (
    <section id="showreel" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Showreel */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Шоурил
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Посмотрите лучшие моменты наших проектов
            </p>
            
            {/* Video placeholder */}
            <div className="relative max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-border/50 flex items-center justify-center group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Демонстрация возможностей WESHOW
                  </h3>
                  <p className="text-muted-foreground">
                    3D-маппинг, интерактивные инсталляции, мультимедийные решения
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Showroom */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Шоурум WESHOW
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Приглашаем вас посетить наш шоурум, где вы сможете увидеть современное 
                мультимедийное оборудование в действии и оценить качество наших решений.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <span>Москва, ул. Примерная, 123</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-5 w-5 text-primary mr-3" />
                  <span>Пн-Пт: 10:00-19:00, Сб: 11:00-16:00</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground mb-2">
                    Демонстрационная зона
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    LED-экраны, проекторы, интерактивные панели
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground mb-2">
                    VR-зона
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Виртуальная реальность и дополненная реальность
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg">
                  Записаться на демонстрацию
                </Button>
                <Button variant="outline" size="lg">
                  Виртуальный тур
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Showroom image placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl border border-border/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <span className="text-white font-bold text-xl">360°</span>
                  </div>
                  <p className="text-muted-foreground">Фото шоурума WESHOW</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowreelSection;