import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, CheckCircle, Lightbulb, Palette, Ruler, Users } from "lucide-react";
import { Link } from "react-router-dom";

const SpaceDesign: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
            <h1 className="text-2xl font-bold text-gray-900">Дизайн пространств</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Palette className="h-4 w-4 mr-2" />
            Дизайн и планирование
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Создаем уникальные
            <span className="text-blue-600"> пространства</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Профессиональное проектирование и дизайн пространств для выставок, 
            мероприятий и коммерческих объектов с учетом всех технических требований
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Получить консультацию
            </Button>
            <Button variant="outline" size="lg">
              Посмотреть портфолио
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Ruler className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Пространственное планирование</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Оптимальное использование пространства с учетом функциональности, 
                эргономики и визуального восприятия
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Визуальное оформление</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Создание уникального визуального стиля, соответствующего 
                бренду и целям проекта
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Инновационные решения</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Внедрение современных технологий и креативных подходов 
                для создания запоминающихся пространств
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Команда экспертов</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Работа с опытными дизайнерами, архитекторами и техническими специалистами
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Качество исполнения</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Внимание к деталям и контроль качества на всех этапах реализации проекта
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Ruler className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Техническая документация</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Полный комплект документации для реализации проекта 
                и дальнейшего обслуживания
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы создать уникальное пространство?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами для обсуждения вашего проекта и получения 
            профессиональной консультации
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Обсудить проект
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
              Заказать звонок
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceDesign;
