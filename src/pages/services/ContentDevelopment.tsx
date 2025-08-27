import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, Edit3, Film, Image, Music, Palette } from "lucide-react";
import { Link } from "react-router-dom";

const ContentDevelopment: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-pink-50">
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
            <h1 className="text-2xl font-bold text-gray-900">Разработка контента</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Edit3 className="h-4 w-4 mr-2" />
            Создание контента
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Создаем уникальный
            <span className="text-pink-600"> контент</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Разработка качественного мультимедийного контента: видео, аудио, 
            графические материалы и интерактивные элементы для ваших проектов
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-pink-600 hover:bg-pink-700">
              Заказать контент
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
              <div className="mx-auto w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Film className="h-6 w-6 text-pink-600" />
              </div>
              <CardTitle>Видеопроизводство</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Создание рекламных роликов, презентаций, 
                обучающих видео и документальных фильмов
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Image className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Графический дизайн</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Разработка логотипов, брендинга, рекламных 
                материалов и иллюстраций
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Music className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Аудио контент</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Создание музыкальных композиций, звуковых 
                эффектов и аудио сопровождения
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>3D моделирование</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Создание трехмерных моделей, анимаций 
                и визуализаций
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Edit3 className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Интерактивный контент</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Разработка интерактивных презентаций, 
                игр и обучающих приложений
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Film className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Монтаж и постобработка</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Профессиональный монтаж видео и аудио, 
                цветокоррекция и спецэффекты
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-pink-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Нужен качественный контент?
          </h2>
          <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
            Наша команда создаст уникальный контент, который 
            привлечет внимание и достигнет ваших целей
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-pink-600 hover:bg-gray-100">
              Обсудить проект
            </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-pink-700">
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDevelopment;
