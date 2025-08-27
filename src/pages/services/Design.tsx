import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { 
  Palette, 
  Brush, 
  Eye, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Zap,
  Users,
  Phone,
  Mail,
  Globe,
  Monitor,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";

const Design = () => {
  const services = [
    {
      icon: Palette,
      title: "Визуальная идентификация",
      description: "Создание уникального визуального образа бренда",
      features: ["Логотипы и символы", "Цветовые палитры", "Типографика"]
    },
    {
      icon: Brush,
      title: "Дизайн-макеты",
      description: "Разработка дизайна для различных носителей",
      features: ["Печатные материалы", "Цифровые форматы", "Наружная реклама"]
    },
    {
      icon: Eye,
      title: "Брендинг мероприятий",
      description: "Создание единого стиля для мероприятий",
      features: ["Оформление площадок", "Промо-материалы", "Сувенирная продукция"]
    }
  ];

  const designTypes = [
    "Логотипы и фирменные знаки",
    "Брендбуки и гайдлайны",
    "Упаковка и этикетки",
    "Веб-дизайн и интерфейсы",
    "Полиграфия и реклама",
    "Наружная реклама"
  ];

  const benefits = [
    "Уникальный визуальный образ",
    "Повышение узнаваемости",
    "Профессиональный подход",
    "Современные тренды",
    "Адаптивность дизайна",
    "Быстрые сроки"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full blur-3xl opacity-60"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-pink-50 border border-pink-200 text-sm font-medium text-pink-700 mb-6">
                🎨 Дизайн и брендинг
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Создаем
                <span className="text-gradient bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent block">
                  уникальные образы
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Профессиональный дизайн и брендинг для создания запоминающегося 
                визуального образа вашей компании или мероприятия
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700">
                  Заказать дизайн
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold">
                  Посмотреть портфолио
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Наши услуги
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Полный спектр дизайн-услуг для развития вашего бренда
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-slate-200/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
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

        {/* Design Types */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Виды дизайна
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Мы создаем дизайн для всех видов носителей и форматов, 
                  обеспечивая единый стиль и узнаваемость бренда
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {designTypes.map((type, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="text-slate-700">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8 border border-pink-200/50">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Креативный подход
                  </h3>
                  <p className="text-slate-600">
                    Каждый проект уникален и создается с учетом особенностей бренда
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
                Преимущества работы с нами
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Почему клиенты выбирают наш дизайн и брендинг
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{benefit}</h3>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Мы гарантируем {benefit.toLowerCase()} для всех наших проектов
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-pink-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Как мы работаем
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Пошаговый процесс создания дизайна и брендинга
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Брифинг", description: "Изучение требований и целей" },
                { step: "02", title: "Концепция", description: "Разработка творческих идей" },
                { step: "03", title: "Дизайн", description: "Создание визуальных решений" },
                { step: "04", title: "Финальная версия", description: "Доработка и утверждение" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
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
                Наши преимущества в дизайне и брендинге
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Опытные дизайнеры",
                  description: "Команда профессионалов с многолетним опытом в дизайне"
                },
                {
                  icon: Globe,
                  title: "Современные тренды",
                  description: "Следим за актуальными тенденциями в дизайне"
                },
                {
                  icon: Monitor,
                  title: "Техническая экспертиза",
                  description: "Знаем все требования к различным форматам"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
        <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Готовы создать уникальный дизайн?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для обсуждения вашего проекта и получения 
              бесплатной консультации по дизайну
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

export default Design;
