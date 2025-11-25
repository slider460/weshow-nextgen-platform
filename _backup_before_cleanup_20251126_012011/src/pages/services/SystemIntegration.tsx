import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Star, Users, Award, Settings } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const SystemIntegration: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <Settings className="w-8 h-8" />
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Системная интеграция
              </h1>
              <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
                Комплексная интеграция мультимедийных систем. Создаем единую экосистему 
                из различных компонентов для максимальной эффективности.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50">
                  <Play className="w-5 h-5 mr-2" />
                  Смотреть работы
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-900">
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
                Услуги системной интеграции
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Создаем интегрированные решения из различных мультимедийных компонентов
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-indigo-600" />
                  </div>
                  <CardTitle>Аудиовизуальная интеграция</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Объединяем аудио и видео системы в единое 
                    управляемое решение
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>Управляющие системы</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Создаем централизованные системы управления 
                    для всех мультимедийных компонентов
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-pink-600" />
                  </div>
                  <CardTitle>Сетевые решения</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Интеграция мультимедийных систем в корпоративную 
                    сетевую инфраструктуру
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Integration Process Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Процесс системной интеграции
              </h2>
              <p className="text-xl text-slate-600">
                Пошаговый подход к созданию интегрированных решений
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Анализ требований</h3>
                <p className="text-slate-600">
                  Изучаем ваши потребности и существующую 
                  инфраструктуру
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Архитектура решения</h3>
                <p className="text-slate-600">
                  Разрабатываем архитектуру интегрированной 
                  системы
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Интеграция</h3>
                <p className="text-slate-600">
                  Объединяем различные компоненты в единую 
                  систему
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Тестирование</h3>
                <p className="text-slate-600">
                  Проводим комплексное тестирование 
                  интегрированной системы
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Нужна системная интеграция?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для обсуждения вашего проекта интеграции и получения персонального предложения
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                <Link to="/contact">Обсудить проект</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600">
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

export default SystemIntegration;