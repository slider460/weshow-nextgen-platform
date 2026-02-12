import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Star, Users, Award, Wrench } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';

const TechSupport: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
                <Wrench className="w-8 h-8" />
              </div>
              <h1 className="text-5xl font-bold mb-6">
                Техническая поддержка
              </h1>
              <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                Полный спектр технической поддержки для мультимедийного оборудования. 
                Гарантируем стабильную работу ваших систем 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-orange-900 hover:bg-orange-50">
                  <Play className="w-5 h-5 mr-2" />
                  Смотреть работы
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-900">
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
                Услуги технической поддержки
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Комплексная техническая поддержка для всех типов мультимедийного оборудования
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                  <CardTitle>Диагностика и ремонт</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Полная диагностика оборудования, выявление неисправностей 
                    и их устранение
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle>Удаленная поддержка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Техническая поддержка через удаленный доступ 
                    для быстрого решения проблем
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-pink-600" />
                  </div>
                  <CardTitle>Профилактическое обслуживание</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Регулярное техническое обслуживание для предотвращения 
                    поломок и сбоев
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Support Types Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">
                Типы технической поддержки
              </h2>
              <p className="text-xl text-slate-600">
                Различные уровни поддержки в зависимости от ваших потребностей
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Базовая поддержка</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Консультации по телефону и email</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Удаленная диагностика</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Обновление программного обеспечения</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Время реакции: 24 часа</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Премиум поддержка</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">24/7 техническая поддержка</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Выезд специалиста на объект</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Приоритетное обслуживание</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-slate-700">Время реакции: 2 часа</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Нужна техническая поддержка?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Свяжитесь с нами для получения технической поддержки или обсуждения условий обслуживания
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
                <Link to="/contact">Связаться с нами</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
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

export default TechSupport;