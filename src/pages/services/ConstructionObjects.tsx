import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building, 
  Monitor, 
  Globe, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Zap,
  Phone,
  Mail,
  Users,
  Lightbulb,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";

const ConstructionObjects = () => {
  const solutionTypes = [
    {
      icon: Building,
      title: "3D-туры",
      description: "Виртуальные экскурсии по объектам",
      features: ["Интерактивная навигация", "Детализация", "Реалистичность"]
    },
    {
      icon: Monitor,
      title: "Интерактивные макеты",
      description: "3D-модели и визуализация",
      features: ["Масштабирование", "Детализация", "Интерактивность"]
    },
    {
      icon: Globe,
      title: "VR-презентации",
      description: "Иммерсивные презентации",
      features: ["Полное погружение", "Интерактивность", "Запоминаемость"]
    }
  ];

  const technologies = [
    "3D-моделирование и визуализация",
    "VR/AR технологии",
    "Интерактивные дисплеи",
    "Системы управления контентом",
    "Облачные решения",
    "Мобильные приложения"
  ];

  const benefits = [
    "Наглядность презентации",
    "Интерактивность",
    "Запоминаемость",
    "Профессиональный вид",
    "Гибкость настройки",
    "Масштабируемость"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full blur-3xl opacity-60"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-50 border border-purple-200 text-sm font-medium text-purple-700 mb-6">
                🏗️ Презентации строительных объектов
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Визуализация
                <span className="text-gradient bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent block">
                  проектов недвижимости
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Современные технологии для презентации строительных проектов: 
                3D-туры, интерактивные макеты, VR-презентации и многое другое
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Заказать решение
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold">
                  Получить консультацию
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Types Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Типы решений
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Мы предлагаем различные форматы презентации строительных объектов
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {solutionTypes.map((solution, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-slate-200/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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

        {/* Technologies */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Используемые технологии
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Мы применяем специализированные технологии для строительных объектов, 
                  обеспечивая высокое качество визуализации
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {technologies.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-slate-700">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 border border-purple-200/50">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Специализированные решения
                  </h3>
                  <p className="text-slate-600">
                    Технологии, адаптированные под специфику строительных объектов
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
                Преимущества наших решений
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Почему строительные компании выбирают нас
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{benefit}</h3>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Наши решения обеспечивают {benefit.toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Как мы работаем
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Пошаговый процесс создания презентации строительного объекта
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Анализ", description: "Изучение проекта и требований" },
                { step: "02", title: "Моделирование", description: "Создание 3D-моделей" },
                { step: "03", title: "Разработка", description: "Создание интерактивных элементов" },
                { step: "04", title: "Запуск", description: "Тестирование и презентация" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
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
                Наши преимущества в работе со строительными объектами
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Опыт в строительстве",
                  description: "Многолетний опыт работы со строительными проектами"
                },
                {
                  icon: Lightbulb,
                  title: "Инновационные решения",
                  description: "Внедрение передовых технологий визуализации"
                },
                {
                  icon: Home,
                  title: "Комплексный подход",
                  description: "Полное сопровождение от концепции до реализации"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Нужна презентация строительного объекта?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для обсуждения концепции презентации 
              и получения коммерческого предложения
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

export default ConstructionObjects;
