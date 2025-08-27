import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, Award, FileText } from "lucide-react";
import { Button } from "../components/ui/button";
import { useLogos } from "../contexts/LogosContext";
import LogosDisplay from "./LogosDisplay";

const SocialProofSection = React.memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { getActiveLogos } = useLogos();

  const documents = useMemo(() => [
    {
      id: 1,
      title: "Благодарственное письмо от ВТБ",
      description: "За качественное выполнение работ по техническому оснащению головного офиса",
      image: "/placeholder.svg",
      type: "letter",
      year: "2024"
    },
    {
      id: 2,
      title: "Грамота Лучший системный интегратор",
      description: "Награда за выдающиеся достижения в области системной интеграции",
      image: "/placeholder.svg",
      type: "award",
      year: "2023"
    },
    {
      id: 3,
      title: "Благодарность от Сбербанка",
      description: "За успешную реализацию мультимедийных решений для корпоративных мероприятий",
      image: "/placeholder.svg",
      type: "letter",
      year: "2024"
    }
  ], []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % documents.length);
  }, [documents.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + documents.length) % documents.length);
  }, [documents.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20">
          <div className="gradient-card-purple rounded-3xl p-8">
            <div className="text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-white/90">Проектов выполнено</div>
          </div>
          <div className="gradient-card-blue rounded-3xl p-8">
            <div className="text-4xl font-bold text-white mb-2">15+</div>
            <div className="text-white/90">Лет на рынке</div>
          </div>
          <div className="gradient-card-cyan rounded-3xl p-8">
            <div className="text-4xl font-bold text-white mb-2">50+</div>
            <div className="text-white/90">Партнеров</div>
          </div>
          <div className="gradient-card-dark rounded-3xl p-8">
            <div className="text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-white/90">Техподдержка</div>
          </div>
        </div>

        {/* Clients Section */}
        <div className="mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 text-center mb-12">
            Нам доверяют
          </h2>
          
          <LogosDisplay showEditButton={true} />
        </div>

        {/* Documents Carousel */}
        <div className="mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 text-center mb-12">
            Благодарственные письма и грамоты
          </h2>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {documents.map((doc, index) => (
                  <div key={doc.id} className="w-full flex-shrink-0">
                    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-lg mx-2">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="order-2 lg:order-1">
                          <div className="relative group">
                            <img 
                              src={doc.image} 
                              alt={doc.title}
                              className="w-full h-64 lg:h-80 object-cover rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                              style={{ backgroundColor: '#f1f5f9' }}
                            />
                          </div>
                        </div>
                        
                        <div className="order-1 lg:order-2">
                          <div className="flex items-center mb-4">
                            <Award className="h-6 w-6 text-blue-500" />
                            <span className="ml-2 text-sm font-medium text-slate-600 uppercase tracking-wider">
                              {doc.year}
                            </span>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-slate-900 mb-4">
                            {doc.title}
                          </h3>
                          
                          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            {doc.description}
                          </p>
                          
                          <Button variant="outline">
                            Читать полностью
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors duration-200 z-10 shadow-lg"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center hover:bg-slate-50 transition-colors duration-200 z-10 shadow-lg"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="flex justify-center mt-6 space-x-2">
              {documents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentSlide ? "bg-blue-500" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SocialProofSection;