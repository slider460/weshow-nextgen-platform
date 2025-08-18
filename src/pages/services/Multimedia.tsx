import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Monitor, 
  Video, 
  Lightbulb, 
  Settings, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Play,
  Zap,
  Palette,
  Phone,
  Mail
} from "lucide-react";
import { Link } from "react-router-dom";

const Multimedia = () => {
  const features = [
    {
      icon: Video,
      title: "3D-маппинг",
      description: "Создание захватывающих 3D-проекций на любых поверхностях",
      benefits: ["Визуальный эффект", "Интерактивность", "Запоминаемость"]
    },
    {
      icon: Monitor,
      title: "LED-видеостены",
      description: "Высококачественные LED-панели для ярких впечатлений",
      benefits: ["Высокое разрешение", "Яркость", "Надежность"]
    },
    {
      icon: Lightbulb,
      title: "Интерактивные дисплеи",
      description: "Сенсорные экраны для вовлечения аудитории",
      benefits: ["Взаимодействие", "Вовлеченность", "Современность"]
    }
  ];

  const technologies = [
    "3D-моделирование и анимация",
    "Проекционное оборудование",
    "LED-технологии",
    "Интерактивные сенсоры",
    "Программное обеспечение",
    "Аудио-видео интеграция"
  ];

  const applications = [
    "Выставки и экспозиции",
    "Корпоративные мероприятия",
    "Презентации продуктов",
    "Развлекательные шоу",
    "Музеи и галереи",
    "Торговые центры"
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
                🎬 Мультимедийные решения
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Создаем
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  захватывающие впечатления
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Инновационные мультимедийные технологии для создания незабываемых 
                визуальных эффектов и интерактивных инсталляций
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Получить консультацию
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold">
                  Посмотреть портфолио
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Наши решения
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Комплексные мультимедийные решения для любых задач
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-slate-200/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {benefit}
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
                  Мы применяем самые современные технологии и оборудование 
                  для создания качественных мультимедийных решений
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {technologies.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-700">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 border border-blue-200/50">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Инновационные решения
                  </h3>
                  <p className="text-slate-600">
                    Мы постоянно следим за новыми технологиями и внедряем их в наши проекты
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Области применения
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Наши мультимедийные решения подходят для различных сфер деятельности
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{app}</h3>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Специализированные решения для {app.toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Как мы работаем
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Пошаговый процесс создания мультимедийных решений
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Консультация", description: "Анализ потребностей и техническое задание" },
                { step: "02", title: "Концепция", description: "Разработка творческой концепции и дизайна" },
                { step: "03", title: "Реализация", description: "Создание контента и техническая интеграция" },
                { step: "04", title: "Запуск", description: "Тестирование и запуск проекта" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Готовы создать впечатляющий проект?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для бесплатной консультации и разработки 
              индивидуального мультимедийного решения
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

export default Multimedia;
