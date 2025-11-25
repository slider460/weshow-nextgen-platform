import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { 
  Settings, 
  Wrench, 
  Shield, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Zap,
  Clock,
  Phone,
  Mail,
  Users,
  Globe,
  Monitor
} from "lucide-react";
import { Link } from "react-router-dom";

const TechnicalSupport = () => {
  const services = [
    {
      icon: Monitor,
      title: "Аудио-видео системы",
      description: "Профессиональное оборудование для мероприятий",
      features: ["Микрофоны и колонки", "Проекторы и экраны", "Системы синхронизации"]
    },
    {
      icon: Wrench,
      title: "Монтаж и настройка",
      description: "Установка и настройка всего оборудования",
      features: ["Быстрая установка", "Профессиональная настройка", "Тестирование систем"]
    },
    {
      icon: Shield,
      title: "Техническая поддержка",
      description: "Круглосуточная поддержка во время мероприятий",
      features: ["24/7 поддержка", "Быстрое реагирование", "Резервное оборудование"]
    }
  ];

  const equipment = [
    "Профессиональные проекторы",
    "LED-видеостены",
    "Акустические системы",
    "Микрофонные системы",
    "Системы синхронизации",
    "Контрольное оборудование"
  ];

  const benefits = [
    "Быстрая установка и настройка",
    "Профессиональное оборудование",
    "Круглосуточная поддержка",
    "Гарантия качества",
    "Гибкие тарифы",
    "Опытные специалисты"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-100 to-red-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full blur-3xl opacity-60"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-50 border border-orange-200 text-sm font-medium text-orange-700 mb-6">
                ⚙️ Техническое обеспечение
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Профессиональное
                <span className="text-gradient bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent block">
                  техническое обеспечение
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Полный спектр технических услуг для проведения мероприятий любого масштаба: 
                от установки оборудования до круглосуточной поддержки
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                  Забронировать услугу
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold">
                  Получить консультацию
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
                Комплексное техническое обеспечение для успешного проведения мероприятий
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-slate-200/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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

        {/* Equipment */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Наше оборудование
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Мы используем только профессиональное оборудование ведущих производителей 
                  для обеспечения высочайшего качества технического обеспечения
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {equipment.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl p-8 border border-orange-200/50">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Качественное оборудование
                  </h3>
                  <p className="text-slate-600">
                    Только проверенные бренды и модели для надежной работы
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
                Почему клиенты выбирают наше техническое обеспечение
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{benefit}</h3>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Мы гарантируем {benefit.toLowerCase()} для всех наших клиентов
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-orange-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Как мы работаем
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Пошаговый процесс технического обеспечения мероприятий
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Консультация", description: "Обсуждение технических требований" },
                { step: "02", title: "Планирование", description: "Разработка технического решения" },
                { step: "03", title: "Установка", description: "Монтаж и настройка оборудования" },
                { step: "04", title: "Поддержка", description: "Техническая поддержка мероприятия" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
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
                Наши преимущества в техническом обеспечении мероприятий
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Опытная команда",
                  description: "Техники с многолетним опытом работы на крупных мероприятиях"
                },
                {
                  icon: Clock,
                  title: "Быстрое реагирование",
                  description: "Решение технических проблем в кратчайшие сроки"
                },
                {
                  icon: Globe,
                  title: "Широкий охват",
                  description: "Работаем по всей России и за рубежом"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Нужно техническое обеспечение?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для обсуждения технических требований 
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

export default TechnicalSupport;
