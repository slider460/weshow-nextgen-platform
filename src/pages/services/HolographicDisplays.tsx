import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Star, Users, Award, Zap } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const HolographicDisplays: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Голографические дисплеи
              </h1>
              <p className="text-xl text-cyan-100 mb-8 leading-relaxed">
                Создаем футуристические голографические инсталляции и дисплеи. 
                Показываем контент в объеме без специальных очков.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-cyan-900 hover:bg-cyan-50">
                  <Play className="w-5 h-5 mr-2" />
                  Смотреть работы
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-cyan-900">
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
                Типы голографических дисплеев
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Мы создаем различные типы голографических инсталляций для разных целей
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-cyan-600" />
                  </div>
                  <CardTitle>Пирамидальные дисплеи</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    360-градусные голографические пирамиды для демонстрации 
                    продуктов и презентаций
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <CardTitle>Голографические вентиляторы</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    LED-вентиляторы создают объемные изображения в воздухе 
                    для выставок и мероприятий
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <CardTitle>Пепперс-призрачные дисплеи</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Классические голографические эффекты с использованием 
                    полупрозрачных поверхностей
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Применение голографических дисплеев
              </h2>
              <p className="text-xl text-slate-600">
                Где и как используются наши голографические решения
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Выставки и мероприятия</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-cyan-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Демонстрация продуктов в объеме</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-cyan-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Интерактивные презентации</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-cyan-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Привлечение внимания посетителей</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Образование и наука</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-cyan-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">3D визуализация сложных процессов</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-cyan-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Интерактивные обучающие материалы</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-cyan-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Научные симуляции и модели</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Готовы создать голографическую инсталляцию?
            </h2>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для обсуждения вашего проекта и получения персонального предложения
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-cyan-50">
                <Link to="/contact">Обсудить проект</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-cyan-600">
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

export default HolographicDisplays;
