import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Clock, Construction, MapPin, Settings, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const TemporaryInstallations: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-yellow-50">
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
            <h1 className="text-2xl font-bold text-gray-900">Временные установки</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Clock className="h-4 w-4 mr-2" />
            Временные решения
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Быстрые
            <span className="text-yellow-600"> временные установки</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Мобильные и временные решения для мероприятий, выставок и специальных проектов 
            с возможностью быстрого монтажа и демонтажа
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700">
              Забронировать установку
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
              <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
              <CardTitle>Быстрый монтаж</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Установка и настройка систем в кратчайшие сроки 
                для срочных проектов
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Мобильность</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Легко транспортируемые и переносимые решения 
                для различных локаций
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Гибкая настройка</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Адаптация под конкретные требования 
                и условия проекта
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Construction className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Временные конструкции</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Создание временных стендов, павильонов 
                и инсталляций
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Краткосрочные проекты</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Решения для мероприятий, выставок 
                и временных акций
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Энергоэффективность</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Оптимизированные решения с минимальным 
                энергопотреблением
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-yellow-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Нужна временная установка?
          </h2>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Мы быстро создадим мобильное решение для вашего 
            временного проекта или мероприятия
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-yellow-600 hover:bg-gray-100">
              Обсудить проект
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-yellow-700">
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemporaryInstallations;
