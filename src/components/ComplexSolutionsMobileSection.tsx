import { Button } from "./ui/button";
import { ArrowRight, Building, Users, Trophy, Globe, Presentation, Store, Construction, Video, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ComplexSolutionsMobileSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const solutions = [
    {
      icon: <Video className="h-8 w-8" />,
      title: "Мультимедийные решения",
      description: "Интерактивные дисплеи, видеостены и проекционные системы для вашего бизнеса",
      features: ["LED-видеостены", "Интерактивные панели", "Проекционные системы"],
      gradient: "gradient-card-blue"
    },
    {
      icon: <Building className="h-8 w-8" />,
      title: "Разработка ПО и игр",
      description: "Создание современных приложений и интерактивных игр для любых платформ",
      features: ["Мобильные приложения", "Веб-приложения", "Игры и симуляторы"],
      gradient: "gradient-card-purple"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Частные мероприятия",
      description: "Свадьбы, дни рождения, корпоративы",
      features: ["Световое оформление", "Звуковое сопровождение", "Фото/видео"],
      gradient: "gradient-card-green"
    },
    {
      icon: <Presentation className="h-8 w-8" />,
      title: "Презентации/конференции/форумы",
      description: "Профессиональное техническое обеспечение",
      features: ["Проекция", "Синхронный перевод", "Стриминг"],
      gradient: "gradient-card-orange"
    },
    {
      icon: <Store className="h-8 w-8" />,
      title: "Выставочные стенды",
      description: "Мультимедийное оформление стендов",
      features: ["Интерактивные панели", "LED-экраны", "Презентации"],
      gradient: "gradient-card-indigo"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Спортивные мероприятия",
      description: "Техническое сопровождение соревнований",
      features: ["Табло", "Звуковое сопровождение", "Видеоповторы"],
      gradient: "gradient-card-yellow"
    }
  ];
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === solutions.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? solutions.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Комплексные решения для различных задач
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Индивидуальный подход к каждому типу мероприятий и проектов
          </p>
        </div>

        {/* Mobile Carousel - ВСЕГДА ВИДИМАЯ ДЛЯ ТЕСТА */}
        <div style={{ border: '2px solid red', padding: '10px', margin: '20px 0' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            {/* Debug info */}
            <div className="text-center mb-4 text-sm text-gray-600">
              ТЕСТ КАРУСЕЛИ - Текущий слайд: {currentIndex + 1} из {solutions.length}
            </div>
            
            <div style={{ overflow: 'hidden', border: '1px solid blue' }}>
              <div 
                style={{ 
                  display: 'flex',
                  transition: 'transform 0.3s ease-in-out',
                  transform: `translateX(-${currentIndex * 100}%)`,
                  width: `${solutions.length * 100}%`,
                  border: '1px solid green'
                }}
              >
                {solutions.map((solution, index) => (
                  <div key={index} style={{ width: `${100 / solutions.length}%`, flexShrink: 0, border: '1px solid yellow' }}>
                    <div className={`${solution.gradient} rounded-3xl p-6 mx-2 min-h-[400px]`}>
                      <div className="text-white mb-4">
                        {solution.icon}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3">
                        {solution.title}
                      </h3>
                      
                      <p className="text-white/90 text-sm leading-relaxed mb-4">
                        {solution.description}
                      </p>
                      
                      <ul className="space-y-2 mb-6">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-white/80">
                            <div className="w-1.5 h-1.5 bg-white rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/20 bg-white/10 w-full" asChild>
                        <Link to="/services/complex-solutions">
                          Узнать больше
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-4 space-x-2">
              {solutions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full" asChild>
            <Link to="/services/complex-solutions">
              Все комплексные решения
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ComplexSolutionsMobileSection;
