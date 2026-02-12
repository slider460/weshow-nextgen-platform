import { useState } from "react";
import { ArrowRight, Lightbulb, Users, Settings, Zap, Rocket } from "lucide-react";
import { Button } from "./ui/button";
import ConsultationModal from "./ConsultationModal";
import ProjectOrderModal from "./ProjectOrderModal";
import MobileCarousel from "./ui/MobileCarousel";

const WorkflowMobileSection = () => {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const steps = [
    {
      icon: Lightbulb,
      title: "Анализ",
      description: "Изучаем ваши потребности и формируем техническое задание",
      color: "from-blue-500 to-cyan-500",
      duration: "1-2 дня"
    },
    {
      icon: Users,
      title: "Планирование",
      description: "Разрабатываем детальный план и согласовываем этапы",
      color: "from-cyan-500 to-green-500",
      duration: "2-3 дня"
    },
    {
      icon: Settings,
      title: "Разработка",
      description: "Создаем решение согласно утвержденному плану",
      color: "from-green-500 to-yellow-500",
      duration: "5-15 дней"
    },
    {
      icon: Zap,
      title: "Тестирование",
      description: "Проводим комплексное тестирование и отладку",
      color: "from-yellow-500 to-orange-500",
      duration: "2-3 дня"
    },
    {
      icon: Rocket,
      title: "Запуск",
      description: "Внедрение и техническое сопровождение проекта",
      color: "from-indigo-500 to-purple-500",
      duration: "1-2 дня"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Как мы работаем над проектами
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Структурированный подход к реализации ваших идей с гарантией качества
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-cyan-500 via-green-500 via-yellow-500 to-purple-500 rounded-full" />
            
            {steps.map((step, index) => (
              <div key={index} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Step content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-white shadow-lg mb-4 ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-slate-600 mb-2">{step.description}</p>
                  <span className="inline-block bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                    {step.duration}
                  </span>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-slate-300 rounded-full shadow-lg z-10" />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Carousel */}
        <MobileCarousel showOnMobile={true} showOnDesktop={false}>
          {steps.map((step, index) => (
            <div key={index} className="mx-2">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <div className="flex items-center mb-4">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${step.color} text-white shadow-lg mr-4`}>
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                    <span className="inline-block bg-slate-100 text-slate-700 px-2 py-1 rounded-full text-xs font-medium">
                      {step.duration}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
                <div className="mt-4 text-center">
                  <span className="text-2xl font-bold text-slate-400">{(index + 1).toString().padStart(2, '0')}</span>
                </div>
              </div>
            </div>
          ))}
        </MobileCarousel>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Готовы начать проект?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Свяжитесь с нами для консультации и получите персональное предложение
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setIsConsultModalOpen(true)}
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Получить консультацию
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                onClick={() => setIsProjectModalOpen(true)}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/20"
              >
                Заказать проект
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ConsultationModal 
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
      />
      <ProjectOrderModal 
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </section>
  );
};

export default WorkflowMobileSection;
