import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, Globe } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Кто мы
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                О компании WESHOW — это команда профессионалов, созданная на базе компаний 
                Триплан и Hand Marketing. Более 20 лет мы воплощаем в жизнь яркие идеи и 
                масштабные проекты, делая каждое мероприятие уникальным и запоминающимся.
              </p>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Мы специализируемся на разработке мультимедийных решений, организации шоу, 
                реализации комплексных проектов под ключ, а также предоставляем в аренду 
                современное мультимедийное оборудование.
              </p>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Наш опыт позволяет нам находить подход к каждому клиенту и создавать решения, 
                которые работают. С WESHOW ваше мероприятие станет не просто событием, а 
                настоящим зрелищем, которое останется в памяти надолго.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-3 mx-auto">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">20+</div>
                  <div className="text-sm text-muted-foreground">Лет опыта</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 text-accent rounded-lg mb-3 mx-auto">
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Проектов</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-success/10 text-success rounded-lg mb-3 mx-auto">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">150+</div>
                  <div className="text-sm text-muted-foreground">Клиентов</div>
                </div>
              </div>
              
              <Button variant="hero" size="lg">
                Узнать больше о WESHOW
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Image placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-border/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <span className="text-white font-bold text-2xl">W</span>
                  </div>
                  <p className="text-muted-foreground">Фото команды WESHOW</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;