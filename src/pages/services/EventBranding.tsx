import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Calendar, Eye, Palette, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const EventBranding: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
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
            <h1 className="text-2xl font-bold text-gray-900">Брендинг мероприятий</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Calendar className="h-4 w-4 mr-2" />
            Брендинг событий
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Создаем запоминающийся
            <span className="text-cyan-600"> брендинг мероприятий</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Разработка уникального визуального стиля для мероприятий, выставок, 
            конференций и корпоративных событий
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
              Заказать брендинг
            </Button>
              <Button variant="outline" size="lg">
              Посмотреть примеры
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-cyan-600" />
              </div>
              <CardTitle>Логотип мероприятия</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Создание уникального логотипа, 
                отражающего суть события
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Фирменный стиль</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Разработка цветовой палитры и 
                визуальных элементов
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Печатные материалы</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Дизайн афиш, буклетов, программ 
                и других материалов
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Цифровые носители</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Дизайн для веб-сайтов, социальных 
                сетей и презентаций
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Оформление площадки</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Дизайн баннеров, стендов и 
                декоративных элементов
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Сувенирная продукция</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Дизайн подарков и сувениров 
                с символикой мероприятия
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-cyan-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы создать брендинг для мероприятия?
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Мы разработаем уникальный визуальный стиль, который 
            сделает ваше событие запоминающимся
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-cyan-600 hover:bg-gray-100">
              Обсудить проект
            </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-cyan-700">
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBranding;
