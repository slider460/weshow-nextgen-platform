import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Building, CheckCircle, Home, Shield, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const PermanentInstallations: React.FC = () => {
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
            <h1 className="text-2xl font-bold text-gray-900">Постоянные установки</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Building className="h-4 w-4 mr-2" />
            Постоянные решения
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Надежные
            <span className="text-emerald-600"> постоянные установки</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Создание долговечных и надежных систем для постоянного использования 
            в коммерческих, промышленных и общественных объектах
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
              Заказать установку
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
              <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-emerald-600" />
              </div>
              <CardTitle>Долговечность</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Использование качественных материалов и технологий 
                для длительной эксплуатации
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Надежность</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Стабильная работа систем с минимальным 
                риском поломок и сбоев
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Home className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Интеграция в архитектуру</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Гармоничное встраивание систем в существующую 
                архитектуру зданий
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Техническое обслуживание</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Регулярное обслуживание и профилактика 
                для поддержания работоспособности
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Соответствие стандартам</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Соблюдение всех технических требований 
                и нормативов безопасности
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Масштабируемость</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Возможность расширения и модернизации 
                систем в будущем
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы создать постоянную установку?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Мы построим надежную и долговечную систему, которая будет 
            служить вам годами
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

export default PermanentInstallations;
