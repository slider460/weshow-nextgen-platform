import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Star, Users, Award, Zap } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const ProjectionMapping: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Проекционный маппинг
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Создаем невероятные визуальные эффекты с помощью проекционного маппинга. 
                Превращаем любые поверхности в интерактивные дисплеи и захватывающие инсталляции.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-blue-50">
                  <Play className="w-5 h-5 mr-2" />
                  Смотреть работы
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-900">
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
                Возможности проекционного маппинга
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Мы создаем проекционные инсталляции любой сложности для различных целей и мероприятий
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>Архитектурный маппинг</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Проекция на фасады зданий, создание динамических световых шоу 
                    и интерактивных инсталляций
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>Корпоративные мероприятия</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Презентации, конференции, выставки с использованием 
                    проекционного маппинга для максимального эффекта
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle>Интерактивные инсталляции</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Создание интерактивных проекций, реагирующих на движения 
                    и действия зрителей
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
                Как мы работаем
              </h2>
              <p className="text-xl text-slate-600">
                Процесс создания проекционного маппинга от идеи до реализации
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Анализ объекта</h3>
                <p className="text-slate-600">
                  Изучаем архитектуру, освещение и особенности поверхности для проекции
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Концепция</h3>
                <p className="text-slate-600">
                  Разрабатываем уникальную концепцию и сценарий проекционного шоу
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">3D моделирование</h3>
                <p className="text-slate-600">
                  Создаем 3D модель объекта и контент для проекции
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Реализация</h3>
                <p className="text-slate-600">
                  Устанавливаем оборудование и проводим финальное шоу
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Готовы создать невероятный проекционный маппинг?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для обсуждения вашего проекта и получения персонального предложения
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50">
                <Link to="/contact">Обсудить проект</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
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

export default ProjectionMapping;