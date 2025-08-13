import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, Award, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              О WESHOW
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Мы создаем впечатляющие мультимедийные решения, которые превращают обычные события в незабываемые впечатления
            </p>
            <Button size="lg" className="group" asChild>
              <a href="/contact">
                Узнать больше
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Наша миссия</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Трансформировать способ взаимодействия людей с технологиями через инновационные мультимедийные решения
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Мы верим, что технологии должны быть незаметными, но их воздействие — незабываемым
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-slate-600" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">500+</h3>
                <p className="text-slate-600">Клиентов</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-slate-600" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">15+</h3>
                <p className="text-slate-600">Лет опыта</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Команда экспертов</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
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