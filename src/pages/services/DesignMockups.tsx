import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Image, Palette, Smartphone, Tablet } from "lucide-react";
import { Link } from "react-router-dom";

const DesignMockups: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50">
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
            <h1 className="text-2xl font-bold text-gray-900">Дизайн-макеты</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Image className="h-4 w-4 mr-2" />
            Макеты и прототипы
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Создаем качественные
            <span className="text-emerald-600"> дизайн-макеты</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Разработка профессиональных макетов для веб-сайтов, мобильных приложений, 
            печатных материалов и рекламных кампаний
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Заказать макеты
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
              <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle>Веб-дизайн</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Создание макетов для веб-сайтов, 
                лендингов и веб-приложений
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Tablet className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Мобильные приложения</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Дизайн интерфейсов для iOS и Android 
                приложений
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Печатные материалы</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Макеты для буклетов, плакатов, 
                каталогов и другой печатной продукции
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Рекламные кампании</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Дизайн рекламных материалов для 
                различных медиа-носителей
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Image className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>UI/UX дизайн</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Создание интуитивных и удобных 
                пользовательских интерфейсов
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Прототипирование</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Создание интерактивных прототипов 
                для тестирования и презентации
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Нужны качественные дизайн-макеты?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Наши дизайнеры создадут профессиональные макеты, 
            которые привлекут внимание и достигнут целей
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100">
              Обсудить проект
            </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-emerald-700">
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignMockups;
