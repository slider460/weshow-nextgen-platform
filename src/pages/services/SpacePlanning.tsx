import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Star, Users, Award, Layout } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const SpacePlanning: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <Layout className="w-8 h-8" />
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Планирование пространства
              </h1>
              <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                Профессиональное планирование пространства для мультимедийных инсталляций. 
                Создаем оптимальные решения для любых помещений и мероприятий.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-emerald-900 hover:bg-emerald-50">
                  <Play className="w-5 h-5 mr-2" />
                  Смотреть работы
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-900">
                  <Link to="/contact">Получить консультацию</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Наши услуги по планированию пространства
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Комплексный подход к организации пространства для мультимедийных решений
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-emerald-600" />
                  </div>
                  <CardTitle>3D моделирование</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Создаем детальные 3D модели помещений с размещением 
                    мультимедийного оборудования
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-teal-600" />
                  </div>
                  <CardTitle>Зонирование пространства</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Оптимальное разделение пространства на функциональные 
                    зоны для различных активностей
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-cyan-600" />
                  </div>
                  <CardTitle>Техническое планирование</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Разработка технических решений для размещения 
                    оборудования и прокладки коммуникаций
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Этапы планирования пространства
              </h2>
              <p className="text-xl text-slate-600">
                Пошаговый процесс создания оптимального пространства
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Анализ помещения</h3>
                <p className="text-slate-600">
                  Изучаем архитектуру, освещение, акустику и технические возможности
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Концепция</h3>
                <p className="text-slate-600">
                  Разрабатываем концепцию использования пространства 
                  под ваши задачи
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">3D визуализация</h3>
                <p className="text-slate-600">
                  Создаем детальную 3D модель с размещением 
                  всего оборудования
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Реализация</h3>
                <p className="text-slate-600">
                  Контролируем процесс установки и настройки 
                  оборудования
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Нужно спланировать пространство?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для обсуждения вашего проекта и получения персонального предложения
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
                <Link to="/contact">Обсудить проект</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                <Link to="/portfolio">Посмотреть работы</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SpacePlanning;