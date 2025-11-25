import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { 
  Code, 
  Gamepad2, 
  Smartphone, 
  Monitor, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Zap,
  Palette,
  Phone,
  Mail,
  Globe,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

const Development = () => {
  const services = [
    {
      icon: Smartphone,
      title: "AR/VR приложения",
      description: "Создание приложений дополненной и виртуальной реальности",
      features: ["Интерактивные 3D-модели", "Иммерсивный опыт", "Кроссплатформенность"]
    },
    {
      icon: Gamepad2,
      title: "Игры на Kinect",
      description: "Разработка игр с использованием технологии распознавания движений",
      features: ["Распознавание жестов", "Физическая активность", "Социальное взаимодействие"]
    },
    {
      icon: Monitor,
      title: "Интерактивный контент",
      description: "Создание интерактивных презентаций и обучающих материалов",
      features: ["Мультимедийность", "Адаптивность", "Аналитика"]
    }
  ];

  const technologies = [
    "Unity 3D",
    "Unreal Engine",
    "React Native",
    "Flutter",
    "WebGL",
    "Three.js",
    "ARCore/ARKit",
    "Kinect SDK"
  ];

  const industries = [
    "Образование и обучение",
    "Медицина и здравоохранение",
    "Ритейл и торговля",
    "Недвижимость",
    "Автомобильная промышленность",
    "Развлечения и геймификация"
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-teal-100 to-green-100 rounded-full blur-3xl opacity-60"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 border border-green-200 text-sm font-medium text-green-700 mb-6">
                💻 Разработка ПО и игр
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Создаем
                <span className="text-gradient bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent block">
                  инновационные приложения
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
                Разработка современных приложений, игр и интерактивных решений 
                с использованием передовых технологий AR/VR и AI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  Обсудить проект
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold">
                  Посмотреть демо
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
                Полный спектр услуг по разработке интерактивных приложений
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-slate-200/50">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
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

        {/* Technologies */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Используемые технологии
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Мы применяем самые современные технологии и фреймворки 
                  для создания качественных приложений
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {technologies.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-slate-700">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 border border-green-200/50">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Современный стек
                  </h3>
                  <p className="text-slate-600">
                    Используем актуальные технологии для создания быстрых и надежных приложений
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Отрасли применения
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Наши решения подходят для различных отраслей бизнеса
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-6 border border-slate-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Star className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900">{industry}</h3>
                  </div>
                  <p className="text-slate-600 text-sm">
                    Специализированные решения для {industry.toLowerCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Development Process */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-green-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Процесс разработки
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Пошаговый подход к созданию качественных приложений
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { step: "01", title: "Анализ", description: "Изучение требований и планирование" },
                { step: "02", title: "Дизайн", description: "Создание UI/UX и прототипов" },
                { step: "03", title: "Разработка", description: "Программирование и интеграция" },
                { step: "04", title: "Тестирование", description: "Проверка качества и исправление ошибок" },
                { step: "05", title: "Запуск", description: "Развертывание и поддержка" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
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
                Преимущества работы с нашей командой разработчиков
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Опытная команда",
                  description: "Разработчики с 5+ летним опытом в создании AR/VR приложений"
                },
                {
                  icon: Globe,
                  title: "Кроссплатформенность",
                  description: "Приложения работают на всех популярных платформах"
                },
                {
                  icon: Palette,
                  title: "Креативный подход",
                  description: "Уникальные дизайн-решения для каждого проекта"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Готовы создать инновационное приложение?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для обсуждения вашего проекта и получения 
              бесплатной консультации по разработке
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

export default Development;
