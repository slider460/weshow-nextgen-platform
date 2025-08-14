import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Move, Zap, Monitor, Users, Calendar, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const KineticScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" className="mb-8 text-slate-600 hover:text-slate-900" asChild>
              <Link to="/services">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к услугам
              </Link>
            </Button>
            
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6">
                <Move className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Кинетический экран
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Движущиеся интерактивные поверхности для создания захватывающих визуальных эффектов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  Что такое кинетический экран?
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Кинетический экран — это инновационная технология, которая объединяет физическое движение 
                  с цифровым контентом, создавая уникальные интерактивные впечатления.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Наши экраны могут двигаться, трансформироваться и реагировать на действия пользователей, 
                  открывая новые возможности для презентаций, выставок и мероприятий.
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ключевые преимущества</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Zap className="h-5 w-5 mr-3 text-yellow-300" />
                    Интерактивность в реальном времени
                  </li>
                  <li className="flex items-center">
                    <Monitor className="h-5 w-5 mr-3 text-yellow-300" />
                    Высокое разрешение и яркость
                  </li>
                  <li className="flex items-center">
                    <Users className="h-5 w-5 mr-3 text-yellow-300" />
                    Привлечение внимания аудитории
                  </li>
                  <li className="flex items-center">
                    <Calendar className="h-5 w-5 mr-3 text-yellow-300" />
                    Быстрая настройка и монтаж
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Применение кинетических экранов
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Наши решения подходят для различных сфер применения
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Выставки и мероприятия</h3>
                <p className="text-slate-600">Создание интерактивных стендов и презентаций</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Monitor className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Розничная торговля</h3>
                <p className="text-slate-600">Интерактивные витрины и рекламные дисплеи</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Корпоративные презентации</h3>
                <p className="text-slate-600">Динамичные презентации для клиентов и партнеров</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Готовы создать что-то удивительное?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Обсудим ваш проект и подберем оптимальное решение для кинетического экрана
            </p>
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" asChild>
              <Link to="/contact">
                <Phone className="mr-2 h-5 w-5" />
                Связаться с нами
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KineticScreen;
