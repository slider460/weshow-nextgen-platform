import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Film, MapPin, Settings, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectionMapping: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-fuchsia-50">
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
            <h1 className="text-2xl font-bold text-gray-900">Проекционный маппинг</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Eye className="h-4 w-4 mr-2" />
            Проекционные технологии
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Превращаем любые
            <span className="text-fuchsia-600"> поверхности в экраны</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Профессиональный проекционный маппинг для создания захватывающих 
            визуальных шоу и интерактивных инсталляций
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-fuchsia-600 hover:bg-fuchsia-700">
              Заказать маппинг
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
              <div className="mx-auto w-12 h-12 bg-fuchsia-100 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-fuchsia-600" />
              </div>
              <CardTitle>3D маппинг</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Проекция на сложные трехмерные поверхности 
                с учетом их геометрии
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Film className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Видео контент</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Создание специального видеоконтента 
                для проекционного маппинга
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Техническая настройка</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Точная настройка проекторов и 
                калибровка систем
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Интерактивность</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Создание интерактивных элементов 
                и реакций на действия зрителей
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Визуальные эффекты</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Разработка уникальных визуальных 
                эффектов и анимаций
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Синхронизация</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Синхронизация нескольких проекторов 
                для больших поверхностей
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-fuchsia-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы создать проекционный маппинг?
          </h2>
          <p className="text-xl text-fuchsia-100 mb-8 max-w-2xl mx-auto">
            Мы превратим любую поверхность в захватывающий 
            визуальный опыт для ваших мероприятий
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-fuchsia-600 hover:bg-gray-100">
              Обсудить проект
            </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-fuchsia-700">
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectionMapping;
