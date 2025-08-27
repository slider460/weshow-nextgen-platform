import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, CheckCircle, Construction, HardHat, Settings, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const InstallationServices: React.FC = () => {
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
            <h1 className="text-2xl font-bold text-gray-900">Услуги по установке</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Construction className="h-4 w-4 mr-2" />
            Монтаж и установка
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Профессиональные
            <span className="text-cyan-600"> услуги установки</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Полный спектр услуг по монтажу, настройке и запуску мультимедийных систем, 
            интерактивного оборудования и технологических решений
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-cyan-600 hover:bg-cyan-700">
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
              <div className="mx-auto w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <HardHat className="h-6 w-6 text-cyan-600" />
              </div>
              <CardTitle>Монтаж оборудования</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Установка проекторов, экранов, звуковых систем 
                и другого мультимедийного оборудования
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Настройка систем</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Калибровка и настройка всех компонентов 
                для оптимальной работы
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Техническое обслуживание</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Регулярное обслуживание и ремонт 
                установленного оборудования
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Контроль качества</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Проверка работоспособности всех систем 
                после установки
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Construction className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle>Строительные работы</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Подготовка помещений и выполнение 
                необходимых строительных работ
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Интеграция систем</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Объединение различных технологических 
                решений в единую систему
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-cyan-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Нужны услуги по установке?
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Наша команда профессионалов готова качественно установить 
            и настроить любое оборудование
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

export default InstallationServices;
