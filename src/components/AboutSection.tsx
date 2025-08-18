import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Award, Clock, Target } from "lucide-react";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const stats = [
    { icon: Users, value: "15+", label: "Лет опыта" },
    { icon: Award, value: "200+", label: "Реализованных проектов" },
    { icon: Clock, value: "24/7", label: "Поддержка" },
    { icon: Target, value: "98%", label: "Довольных клиентов" },
  ];

  return (
    <section className="py-12 lg:py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-full blur-3xl opacity-60"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left side - Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-3 lg:space-y-4">
              <div className="inline-flex items-center px-3 py-1 lg:px-4 lg:py-2 rounded-full bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700">
                🏆 О компании
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 leading-tight">
                Мы создаем
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  инновационные решения
                </span>
                для вашего бизнеса
              </h2>
              <p className="text-base lg:text-lg text-slate-600 leading-relaxed">
                WeShow - это команда профессионалов, специализирующаяся на создании 
                комплексных мультимедийных решений. Мы помогаем компаниям 
                преображать их присутствие в цифровом мире через интерактивные 
                технологии и креативные решения.
              </p>
            </div>

            <div className="space-y-4 lg:space-y-6">
              <div className="space-y-3 lg:space-y-4">
                <h3 className="text-lg lg:text-xl font-semibold text-slate-800">Наши преимущества:</h3>
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm lg:text-base text-slate-600">Полный цикл разработки от концепции до реализации</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm lg:text-base text-slate-600">Современные технологии и инновационные подходы</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm lg:text-base text-slate-600">Персональный подход к каждому клиенту</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <Button size="lg" className="px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold" asChild>
                <Link to="/about" className="inline-flex items-center">
                  Узнать больше
                  <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold" asChild>
                <Link to="/contact">
                  Связаться с нами
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side - Stats and Image */}
          <div className="space-y-6 lg:space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-center border border-slate-200/50">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-3 lg:mb-4">
                    <stat.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-slate-900 mb-1 lg:mb-2">{stat.value}</div>
                  <div className="text-xs lg:text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Company Image */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl lg:rounded-2xl overflow-hidden border border-slate-200/50">
                <div className="w-full h-full bg-gradient-to-br from-blue-200/50 to-purple-200/50 flex items-center justify-center">
                  <div className="text-center space-y-3 lg:space-y-4">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-white text-xl lg:text-2xl font-bold">WS</span>
                    </div>
                    <div className="text-sm lg:text-base text-slate-600 font-medium">
                      WeShow NextGen Agency
                    </div>
                  </div>
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