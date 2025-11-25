import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { 
  Puzzle, 
  Layers, 
  Target, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Zap,
  Users,
  Phone,
  Mail,
  Globe,
  Monitor,
  Sparkles,
  Rocket
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ComplexSolutions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const solutions = [
    {
      icon: Puzzle,
      title: "Интеграция систем",
      description: "Объединение различных технологий в единое решение",
      features: ["Совместимость оборудования", "Единое управление", "Оптимизация процессов"]
    },
    {
      icon: Layers,
      title: "Многоуровневые проекты",
      description: "Сложные решения для крупных мероприятий",
      features: ["Масштабируемость", "Надежность", "Гибкость настройки"]
    },
    {
      icon: Target,
      title: "Целевые решения",
      description: "Специализированные решения под конкретные задачи",
      features: ["Индивидуальный подход", "Экспертиза", "Результативность"]
    }
  ];

  const industries = [
    "Корпоративные мероприятия",
    "Выставки и конференции",
    "Развлекательные шоу",
    "Спортивные события",
    "Образовательные проекты",
    "Медицинские презентации"
  ];

  const benefits = [
    "Единый подрядчик",
    "Согласованность решений",
    "Оптимизация бюджета",
    "Сокращение сроков",
    "Гарантия качества",
    "Техническая поддержка"
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
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-3xl opacity-60"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-700 mb-6">
                🚀 Комплексные решения
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Создаем
                <span className="text-gradient bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent block">
                  комплексные решения
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Интегрированные решения, объединяющие различные технологии и услуги 
                для достижения максимального результата вашего проекта
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  Обсудить проект
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold">
                  Посмотреть кейсы
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Наши решения
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Комплексный подход к решению сложных задач
              </p>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-slate-200/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <solution.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">
                      {solution.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {solution.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

          </div>
        </section>

        {/* Industries */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Отрасли применения
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Наши комплексные решения подходят для различных отраслей 
                  и типов мероприятий любого масштаба
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {industries.map((industry, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-slate-700">{industry}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-8 border border-emerald-200/50">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto">
                    <Rocket className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Инновационный подход
                  </h3>
                  <p className="text-slate-600">
                    Используем передовые технологии для создания эффективных решений
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Преимущества комплексных решений
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Почему выгодно заказывать комплексные решения у нас
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{benefit}</h3>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Мы обеспечиваем {benefit.toLowerCase()} для всех проектов
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Как мы работаем
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Пошаговый процесс создания комплексных решений
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { step: "01", title: "Анализ", description: "Изучение требований и возможностей" },
                { step: "02", title: "Концепция", description: "Разработка общей стратегии" },
                { step: "03", title: "Планирование", description: "Детальное планирование реализации" },
                { step: "04", title: "Реализация", description: "Выполнение всех этапов проекта" },
                { step: "05", title: "Запуск", description: "Тестирование и запуск решения" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Почему выбирают нас
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Наши преимущества в создании комплексных решений
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Команда экспертов",
                  description: "Специалисты в различных областях технологий"
                },
                {
                  icon: Globe,
                  title: "Опыт реализации",
                  description: "Успешно реализовали сотни сложных проектов"
                },
                {
                  icon: Monitor,
                  title: "Техническая экспертиза",
                  description: "Глубокое понимание всех используемых технологий"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Нужно комплексное решение?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для обсуждения вашего проекта и разработки 
              индивидуального комплексного решения
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                Позвонить
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10">
                <Mail className="mr-2 h-5 w-5" />
                Написать
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ComplexSolutions;
