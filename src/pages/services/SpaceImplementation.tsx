import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Construction, HardHat, Settings, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const SpaceImplementation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
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
            <h1 className="text-2xl font-bold text-gray-900">Реализация пространств</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            <Construction className="h-4 w-4 mr-2" />
            Реализация проектов
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Воплощаем проекты
            <span className="text-green-600"> в реальность</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Полный цикл реализации проектов: от монтажа оборудования до финальной настройки 
            и сдачи объекта в эксплуатацию
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Обсудить проект
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
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <HardHat className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Монтаж и установка</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Профессиональный монтаж оборудования с соблюдением всех 
                технических требований и стандартов безопасности
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
                Точная настройка всех систем для оптимальной работы 
                и достижения желаемого результата
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Техническое обслуживание</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Регулярное обслуживание и поддержка работоспособности 
                всех установленных систем
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
                Многоступенчатый контроль качества на всех этапах 
                реализации проекта
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
                Выполнение необходимых строительных и отделочных работ 
                для подготовки пространства
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Интеграция систем</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Объединение различных технологических систем в единую 
                управляемую экосистему
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Готовы реализовать ваш проект?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Наша команда готова воплотить ваши идеи в реальность 
            с соблюдением всех сроков и требований
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
              Начать проект
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-green-700">
              Получить консультацию
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceImplementation;
