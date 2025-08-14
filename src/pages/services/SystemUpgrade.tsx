import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowUp, CheckCircle, Settings, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const SystemUpgrade: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
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
            <h1 className="text-2xl font-bold text-gray-900">Обновление систем</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <ArrowUp className="h-4 w-4 mr-2" />
            Модернизация
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Обновляем ваши
            <span className="text-violet-600"> системы до современного уровня</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Модернизация устаревшего оборудования и программного обеспечения 
            для повышения производительности и функциональности
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
              Заказать обновление
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
              <div className="mx-auto w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-violet-600" />
              </div>
              <CardTitle>Повышение производительности</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Увеличение скорости работы и улучшение 
                качества выходных данных
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Новые функции</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Добавление современных возможностей 
                и улучшенного интерфейса
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Улучшение безопасности</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Обновление протоколов безопасности 
                и защитных механизмов
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Совместимость</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Обеспечение совместимости с новыми 
                технологиями и стандартами
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <ArrowUp className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Масштабируемость</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Подготовка систем к будущему росту 
                и расширению возможностей
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Оптимизация</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Улучшение энергоэффективности и 
                снижение затрат на эксплуатацию
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-violet-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы обновить ваши системы?
          </h2>
          <p className="text-xl text-violet-100 mb-8 max-w-2xl mx-auto">
            Мы модернизируем ваше оборудование и выведем 
            его на современный технологический уровень
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-violet-600 hover:bg-gray-100">
              Обсудить обновление
            </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-violet-700">
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemUpgrade;
