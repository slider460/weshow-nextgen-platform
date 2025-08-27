import { useState } from "react";
import { ArrowRight, Lightbulb, Users, Settings, Zap, Rocket } from "lucide-react";
import ConsultationModal from "./ConsultationModal";
import ProjectOrderModal from "./ProjectOrderModal";

const WorkflowRoadmapSection = () => {
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
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-full blur-3xl opacity-60"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 border border-purple-200 text-sm font-medium text-purple-700 mb-6">
            🚀 Рабочий процесс
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Как мы работаем
            <span className="text-gradient bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
              над проектами
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Прозрачный и эффективный процесс разработки, который гарантирует 
            качественный результат в установленные сроки
          </p>
        </div>

        {/* Workflow Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center group">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>
                  
                  {/* Duration */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-600">
                    ⏱️ {step.duration}
                  </div>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-4">
                    <ArrowRight className="h-6 w-6 text-slate-400 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Готовы начать?
            </h3>
            <p className="text-slate-600 mb-6">
              Первый шаг - бесплатная консультация. Свяжитесь с нами прямо сейчас!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => setIsProjectModalOpen(true)}
              >
                Начать проект
              </button>
              <button 
                className="px-8 py-3 border border-purple-300 text-purple-700 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300"
                onClick={() => setIsConsultModalOpen(true)}
              >
                Узнать детали
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal 
        isOpen={isConsultModalOpen} 
        onClose={() => setIsConsultModalOpen(false)}
        title="Узнать детали"
        triggerText="Узнать детали"
      />

      <ProjectOrderModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
      />
    </section>
  );
};

export default WorkflowRoadmapSection;