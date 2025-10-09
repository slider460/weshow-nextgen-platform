import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, Settings, Shield, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const TechnicalMaintenance: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/services">
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Назад к услугам</span>
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-2xl font-bold text-gray-900">Техническое обслуживание</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Wrench className="h-4 w-4 mr-2" />
            Обслуживание систем
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Поддерживаем ваши
            <span className="text-rose-600"> системы в рабочем состоянии</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Комплексное техническое обслуживание мультимедийного оборудования, 
            интерактивных систем и технологических решений
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
              Забронировать обслуживание
            </Button>
              <Button variant="outline" size="lg">
              Получить расчет
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-rose-600" />
              </div>
              <CardTitle>Плановое обслуживание</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Регулярные проверки и профилактические работы 
                по расписанию
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Ремонтные работы</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Диагностика и устранение неисправностей 
                в кратчайшие сроки
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Настройка и калибровка</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Восстановление оптимальных параметров 
                работы оборудования
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Мониторинг состояния</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Постоянный контроль работоспособности 
                и предупреждение сбоев
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Обновление систем</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Установка обновлений и модернизация 
                устаревшего оборудования
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Запасные части</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Поставка и замена изношенных компонентов 
                оригинальными запчастями
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-rose-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Нужно техническое обслуживание?
          </h2>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
            Мы обеспечим бесперебойную работу ваших систем 
            и продлим срок их службы
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-rose-600 hover:bg-gray-100">
              Обсудить обслуживание
            </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-rose-700">
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalMaintenance;
