import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { 
  Home, 
  Users, 
  Briefcase, 
  FileText, 
  Phone, 
  Settings, 
  Palette, 
  Monitor,
  Code,
  Calendar,
  Store,
  BookOpen,
  TrendingUp,
  MapPin,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Sitemap = () => {
  const siteStructure = {
    main: [
      { name: "Главная", href: "/", icon: Home, description: "Главная страница с обзором услуг и проектов" },
      { name: "О компании", href: "/about", icon: Users, description: "Информация о компании, миссии и ценностях" },
      { name: "Команда", href: "/team", icon: Users, description: "Знакомство с нашей командой профессионалов" },
      { name: "Контакты", href: "/contact", icon: Phone, description: "Способы связи и контактная информация" }
    ],
    services: [
      { name: "Все услуги", href: "/services", icon: Settings, description: "Общий обзор всех предоставляемых услуг" },
      { name: "Мультимедийные решения", href: "/services/multimedia", icon: Monitor, description: "3D-маппинг, LED-экраны, интерактивные инсталляции" },
      { name: "Разработка ПО и игр", href: "/services/development", icon: Code, description: "Создание интерактивных приложений и игровых решений" },
      { name: "Техническое сопровождение", href: "/services/support", icon: Settings, description: "Профессиональная поддержка мероприятий 24/7" },
      { name: "Мероприятия под ключ", href: "/services/events", icon: Calendar, description: "Комплексная организация корпоративных и частных мероприятий" },
      { name: "Брендинг и дизайн", href: "/services/branding", icon: Palette, description: "Создание уникального визуального образа для событий" },
      { name: "Аренда оборудования", href: "/equipment", icon: Store, description: "Аренда профессионального мультимедийного оборудования" }
    ],
    portfolio: [
      { name: "Портфолио", href: "/portfolio", icon: Briefcase, description: "Обзор выполненных проектов и кейсов" },
      { name: "Стенд Самарской области", href: "/portfolio/samara-stand-vdnh", icon: MapPin, description: "Детальный кейс проекта для ВДНХ" }
    ],
    content: [
      { name: "Блог", href: "/blog", icon: BookOpen, description: "Полезные статьи и экспертные мнения" },
      { name: "Новости", href: "/news", icon: TrendingUp, description: "Новости компании и индустрии" },
      { name: "Карьера", href: "/careers", icon: Users, description: "Вакансии и возможности карьерного роста" }
    ],
    legal: [
      { name: "Политика конфиденциальности", href: "/privacy", icon: FileText, description: "Политика обработки персональных данных" },
      { name: "Условия использования", href: "/terms", icon: FileText, description: "Условия использования сайта и услуг" }
    ]
  };

  const quickActions = [
    { name: "Получить консультацию", href: "/contact", description: "Связаться с нами для бесплатной консультации" },
    { name: "Забронировать проект", href: "/contact", description: "Оставить заявку на разработку проекта" },
    { name: "Арендовать оборудование", href: "/equipment", description: "Забронировать аренду мультимедийного оборудования" },
    { name: "Посмотреть портфолио", href: "/portfolio", description: "Изучить наши выполненные проекты" }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-60"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-sm font-medium text-blue-700 mb-6">
                🗺️ Карта сайта
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Навигация по
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  сайту WeShow
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Удобная карта сайта поможет быстро найти нужную информацию 
                и сориентироваться в структуре нашего ресурса
              </p>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Быстрые действия
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Самые популярные разделы и действия на сайте
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200/50">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-slate-900">
                      {action.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 mb-4">
                      {action.description}
                    </CardDescription>
                    <Button asChild className="w-full">
                      <Link to={action.href}>
                        Перейти
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Main Pages */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Основные разделы
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Главные страницы сайта с ключевой информацией о компании
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteStructure.main.map((page, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200/50">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                      <page.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-slate-900">
                      {page.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 mb-4">
                      {page.description}
                    </CardDescription>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={page.href}>
                        Открыть
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Услуги
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Полный спектр мультимедийных решений и услуг
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {siteStructure.services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200/50">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-slate-900">
                      {service.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 mb-4">
                      {service.description}
                    </CardDescription>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={service.href}>
                        Подробнее
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Портфолио
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Наши выполненные проекты и кейсы
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {siteStructure.portfolio.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200/50">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-slate-900">
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 mb-4">
                      {item.description}
                    </CardDescription>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={item.href}>
                        Смотреть
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Content Pages */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Контент и ресурсы
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Полезные материалы, новости и возможности для развития
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {siteStructure.content.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200/50">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-slate-900">
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 mb-4">
                      {item.description}
                    </CardDescription>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={item.href}>
                        Открыть
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Legal Pages */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Правовая информация
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Документы и политики компании
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {siteStructure.legal.map((item, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200/50">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-700 rounded-xl flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-slate-900">
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 mb-4">
                      {item.description}
                    </CardDescription>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={item.href}>
                        Читать
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Нужна помощь с навигацией?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Наши специалисты готовы помочь найти нужную информацию 
              и ответить на все ваши вопросы
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                Позвонить
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
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

export default Sitemap;
