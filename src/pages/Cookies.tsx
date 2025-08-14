import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Settings, 
  Eye, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Info,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { Link } from "react-router-dom";

const Cookies = () => {
  const cookieTypes = [
    {
      name: "Необходимые cookies",
      description: "Эти файлы cookie необходимы для работы сайта и не могут быть отключены.",
      examples: ["Аутентификация", "Безопасность", "Основная функциональность"],
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      required: true
    },
    {
      name: "Функциональные cookies",
      description: "Улучшают функциональность и персонализацию сайта.",
      examples: ["Языковые настройки", "Региональные настройки", "Заполненные формы"],
      icon: Settings,
      color: "from-blue-500 to-cyan-500",
      required: false
    },
    {
      name: "Аналитические cookies",
      description: "Помогают понять, как посетители взаимодействуют с сайтом.",
      examples: ["Google Analytics", "Статистика посещений", "Поведение пользователей"],
      icon: Eye,
      color: "from-purple-500 to-pink-500",
      required: false
    },
    {
      name: "Маркетинговые cookies",
      description: "Используются для отслеживания посетителей на разных сайтах.",
      examples: ["Рекламные сети", "Социальные сети", "Партнерские программы"],
      icon: AlertTriangle,
      color: "from-orange-500 to-red-500",
      required: false
    }
  ];

  const cookieManagement = [
    {
      title: "Браузерные настройки",
      description: "Большинство браузеров позволяют управлять настройками cookies через меню настроек.",
      steps: [
        "Откройте настройки браузера",
        "Найдите раздел 'Конфиденциальность' или 'Безопасность'",
        "Настройте параметры cookies"
      ]
    },
    {
      title: "Специальные инструменты",
      description: "Используйте специальные инструменты для управления cookies.",
      steps: [
        "Установите расширение для управления cookies",
        "Настройте автоматическую очистку",
        "Выберите, какие cookies разрешить"
      ]
    },
    {
      title: "Наши настройки",
      description: "Мы предоставляем возможность управлять cookies прямо на сайте.",
      steps: [
        "Используйте панель настроек cookies",
        "Выберите предпочтения",
        "Сохраните настройки"
      ]
    }
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
                🍪 Cookies
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Политика использования
                <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  файлов cookie
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Узнайте, как мы используем файлы cookie для улучшения работы сайта 
                и как вы можете управлять этими настройками
              </p>
            </div>
          </div>
        </section>

        {/* What are Cookies */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Что такое файлы cookie?
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Файлы cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве 
                  при посещении веб-сайта. Они помогают сайту запоминать ваши предпочтения и 
                  обеспечивают более удобный пользовательский опыт.
                </p>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Мы используем cookies для улучшения функциональности сайта, анализа трафика 
                  и персонализации контента в соответствии с вашими интересами.
                </p>
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <Info className="h-4 w-4" />
                  <span>Последнее обновление: 15 января 2024 года</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-slate-700">Необходимые для работы сайта</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700">Улучшают функциональность</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-700">Анализируют использование</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-slate-700">Маркетинговые цели</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cookie Types */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Типы используемых cookies
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Мы используем различные типы cookies для обеспечения оптимальной работы сайта
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cookieTypes.map((type, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200/50">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <type.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-xl text-slate-900">
                            {type.name}
                          </CardTitle>
                          {type.required ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Обязательно
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <Settings className="h-3 w-3 mr-1" />
                              Опционально
                            </span>
                          )}
                        </div>
                        <CardDescription className="text-slate-600 text-base">
                          {type.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-medium text-slate-900 text-sm">Примеры использования:</h4>
                      <ul className="space-y-1">
                        {type.examples.map((example, idx) => (
                          <li key={idx} className="flex items-center space-x-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cookie Management */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Управление cookies
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Узнайте, как вы можете контролировать использование cookies на нашем сайте
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cookieManagement.map((method, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200/50">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900 mb-2">
                      {method.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      {method.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium text-slate-900 text-sm">Пошаговая инструкция:</h4>
                      <ol className="space-y-2">
                        {method.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-slate-600">
                            <span className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-xs font-medium text-slate-600 flex-shrink-0">
                              {idx + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cookie Settings */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Настройки cookies
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Управляйте своими предпочтениями по использованию cookies прямо сейчас
                </p>
              </div>

              <Card className="border-slate-200/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-900">
                    Ваши предпочтения
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Выберите, какие типы cookies разрешить на нашем сайте
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {cookieTypes.map((type, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gradient-to-br ${type.color} rounded-lg flex items-center justify-center`}>
                          <type.icon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{type.name}</h4>
                          <p className="text-sm text-slate-600">{type.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {type.required ? (
                          <span className="text-sm text-slate-500">Обязательно</span>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Разрешить
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                              <XCircle className="h-4 w-4 mr-1" />
                              Отклонить
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Сохранить настройки
                    </Button>
                    <Button variant="outline">
                      Принять все
                    </Button>
                    <Button variant="outline">
                      Отклонить все
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Дополнительная информация
                </h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Полезные ссылки и ресурсы по управлению cookies
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="border-slate-200/50">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900 flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-blue-500" />
                      Безопасность
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Мы принимаем все необходимые меры для защиты ваших данных и обеспечения 
                      безопасного использования cookies.
                    </p>
                    <Link to="/privacy" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                      Политика конфиденциальности
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-slate-200/50">
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900 flex items-center">
                      <ExternalLink className="h-5 w-5 mr-2 text-green-500" />
                      Внешние ресурсы
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Узнайте больше о cookies и управлении конфиденциальностью в интернете.
                    </p>
                    <a 
                      href="https://www.allaboutcookies.org" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                    >
                      All About Cookies
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Остались вопросы?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Если у вас есть вопросы о нашей политике cookies или вы хотите 
              изменить настройки, свяжитесь с нами
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10">
                Связаться с нами
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/20 bg-white/10">
                Настройки cookies
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cookies;
