import { useState } from "react";
import { Zap, Users, Clock, Star, CheckCircle } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const UniqueValueProposition = () => {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  const features = [
    {
      icon: Zap,
      title: "Скорость",
      description: "Быстрая реализация проектов без потери качества",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Users,
      title: "Команда экспертов",
      description: "Опытные специалисты с 15+ летним стажем",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Время - деньги",
      description: "Оптимизируем процессы для экономии ваших ресурсов",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Star,
      title: "Инновации",
      description: "Используем передовые технологии и креативные решения",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: CheckCircle,
      title: "Результат",
      description: "Измеримые результаты и ROI для вашего бизнеса",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-40"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-6">
            ✨ Наши преимущества
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Почему выбирают
            <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              именно нас
            </span>
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl p-8 border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 border border-slate-200/50 shadow-sm max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Готовы начать проект?
            </h3>
            <p className="text-slate-600 mb-6">
              Свяжитесь с нами для бесплатной консультации и оценки вашего проекта
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => setIsConsultModalOpen(true)}
              >
                Получить консультацию
              </button>
              <button 
                className="px-8 py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-300"
                onClick={() => setIsConsultModalOpen(true)}
              >
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal 
        isOpen={isConsultModalOpen} 
        onClose={() => setIsConsultModalOpen(false)}
        title="Получить консультацию"
        triggerText="Получить консультацию"
      />
    </section>
  );
};

export default UniqueValueProposition;