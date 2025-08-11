import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, Award, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-extralight text-foreground mb-6 tracking-tight">
              О WESHOW
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light leading-relaxed">
              Мы создаем впечатляющие мультимедийные решения, которые превращают обычные события в незабываемые впечатления
            </p>
            <Button variant="hero" size="lg" className="group">
              Узнать больше
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-foreground mb-6">Наша миссия</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Трансформировать способ взаимодействия людей с технологиями через инновационные мультимедийные решения
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Мы верим, что технологии должны быть незаметными, но их воздействие — незабываемым
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">500+</h3>
                <p className="text-muted-foreground">Клиентов</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-2">15+</h3>
                <p className="text-muted-foreground">Лет опыта</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-foreground mb-6">Команда экспертов</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Профессионалы с многолетним опытом в области мультимедийных технологий
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <img 
              src="/lovable-uploads/53f0f373-e1ea-40ea-8a8a-573832a7506b.png" 
              alt="Команда WESHOW" 
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;