import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { 
  Monitor, 
  Video, 
  Speaker, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Zap,
  Clock,
  Phone,
  Mail,
  Users,
  Globe,
  Settings,
  Truck,
  Calculator
} from "lucide-react";
import { Link } from "react-router-dom";

const EquipmentRental = () => {
  const equipment = [
    {
      icon: Monitor,
      title: "Видеооборудование",
      description: "Проекторы, экраны, LED-панели",
      features: ["4K проекторы", "LED-видеостены", "Интерактивные экраны"]
    },
    {
      icon: Speaker,
      title: "Аудиооборудование",
      description: "Микрофоны, колонки, микшеры",
      features: ["Беспроводные микрофоны", "Профессиональные колонки", "Цифровые микшеры"]
    },
    {
      icon: Video,
      title: "Световое оборудование",
      description: "Прожекторы, стробоскопы, лазеры",
      features: ["RGB прожекторы", "Светодиодные панели", "Лазерные установки"]
    }
  ];

  const rentalTypes = [
    "Краткосрочная аренда (1-7 дней)",
    "Среднесрочная аренда (1-4 недели)",
    "Долгосрочная аренда (от 1 месяца)",
    "Аренда с обслуживанием",
    "Аренда без обслуживания",
    "Аренда с доставкой"
  ];

  const benefits = [
    "Гибкие условия аренды",
    "Профессиональное оборудование",
    "Быстрая доставка",
    "Техническая поддержка",
    "Конкурентные цены",
    "Гарантия качества"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-100 to-indigo-100 rounded-full blur-3xl opacity-60"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 text-sm font-medium text-indigo-700 mb-6">
                📺 Аренда оборудования
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Арендуем
                <span className="text-gradient bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent block">
                  профессиональное оборудование
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Широкий выбор современного оборудования для мероприятий любого масштаба: 
                от небольших презентаций до крупных концертов
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                  Заказать аренду
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold">
                  Посмотреть каталог
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold" asChild>
                  <a href="/services/equipment-calculation">
                    Калькулятор аренды
                    <Calculator className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Наше оборудование
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Профессиональное оборудование для любых мероприятий
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {equipment.map((item, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-slate-200/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.features.map((feature, idx) => (
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

        {/* Rental Types */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Условия аренды
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Мы предлагаем гибкие условия аренды оборудования 
                  для удовлетворения любых потребностей наших клиентов
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rentalTypes.map((type, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-slate-700">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl p-8 border border-indigo-200/50">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Гибкие условия
                  </h3>
                  <p className="text-slate-600">
                    Адаптируем условия аренды под ваши потребности и бюджет
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
                Преимущества аренды
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Почему выгодно арендовать оборудование у нас
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{benefit}</h3>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Мы обеспечиваем {benefit.toLowerCase()} для всех клиентов
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Как заказать аренду
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Простой процесс заказа оборудования в аренду
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Заявка", description: "Оставляете заявку на сайте или по телефону" },
                { step: "02", title: "Подбор", description: "Мы подбираем подходящее оборудование" },
                { step: "03", title: "Подтверждение", description: "Согласовываем условия и стоимость" },
                { step: "04", title: "Доставка", description: "Доставляем и устанавливаем оборудование" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
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
                Наши преимущества в аренде оборудования
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Опытная команда",
                  description: "Специалисты с многолетним опытом работы с оборудованием"
                },
                {
                  icon: Truck,
                  title: "Быстрая доставка",
                  description: "Доставляем оборудование в кратчайшие сроки"
                },
                {
                  icon: Settings,
                  title: "Техническая поддержка",
                  description: "Помогаем с настройкой и решением проблем"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-600">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Нужно оборудование в аренду?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для обсуждения ваших потребностей и получения 
              коммерческого предложения по аренде
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
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10" asChild>
                <a href="/services/equipment-calculation">
                  <Calculator className="mr-2 h-5 w-5" />
                  Калькулятор аренды
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EquipmentRental;
