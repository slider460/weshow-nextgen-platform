import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Box, Box3d, Eye, Layers, Palette, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const ThreeDMappingModeling: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-sky-50">
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
            <h1 className="text-2xl font-bold text-gray-900">3D маппинг и моделирование</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Box3d className="h-4 w-4 mr-2" />
            3D технологии
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Создаем объемные
            <span className="text-sky-600"> миры и проекции</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Профессиональное 3D моделирование и проекционный маппинг для создания 
            захватывающих визуальных эффектов и интерактивных пространств
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-sky-600 hover:bg-sky-700">
              Забронировать проект
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
              <div className="mx-auto w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
                <Box className="h-6 w-6 text-sky-600" />
              </div>
              <CardTitle>3D моделирование</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Создание детализированных 3D моделей 
                зданий, объектов и пространств
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Проекционный маппинг</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Проекция контента на сложные поверхности 
                с учетом их геометрии
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Текстурирование</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Создание реалистичных текстур и материалов 
                для 3D моделей
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Анимация</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Создание динамических анимаций и 
                интерактивных элементов
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Визуальные эффекты</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Разработка спецэффектов и 
                визуальных решений
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Cube className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>AR/VR интеграция</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Подготовка контента для дополненной 
                и виртуальной реальности
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-sky-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы создать 3D проект?
          </h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Наши 3D художники и технические специалисты готовы 
            воплотить ваши идеи в объемные модели и проекции
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-sky-600 hover:bg-gray-100">
              Обсудить проект
            </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-sky-700">
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDMappingModeling;
