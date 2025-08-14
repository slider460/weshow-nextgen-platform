import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Lightbulb, 
  Monitor, 
  Projector, 
  Mail, 
  Play,
  ArrowRight,
  Star,
  Award,
  Zap
} from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";
import ProjectOrderModal from "@/components/ProjectOrderModal";

const SamsungEvent = () => {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const projectDetails = {
    title: "Особенный Новый год Samsung, 2020",
    client: "SAMSUNG",
    description: "Разработали уникальный контент для поддержки мероприятия и создания новогодней атмосферы с использованием современных мультимедийных решений.",
    date: "Декабрь 2020",
    location: "Москва",
    duration: "1 день",
    team: "15 специалистов",
    budget: "По запросу"
  };

  const tasks = [
    "Разработать уникальный контент для поддержки мероприятия и создания новогодней атмосферы",
    "Подобрать и инсталлировать мультимедийное оборудование",
    "Оказать полное техническое сопровождение всего мероприятия"
  ];

  const solutions = [
    {
      title: "3D Mapping декорации",
      description: "Панорамные проекционные декорации новогоднего зимнего леса, сказочных персонажей и главного новогоднего символа",
      icon: Monitor
    },
    {
      title: "Digital зоны",
      description: "Интерактивные зоны с современными мультимедийными решениями",
      icon: Zap
    },
    {
      title: "Проекционные сетки",
      description: "Система автоматического сброса проекционных сеток",
      icon: Projector
    },
    {
      title: "Digital почтовый ящик",
      description: "Отдельно разработанная проекционная зона 'Почтовый ящик Деда Мороза' для отправки поздравительных открыток в любую точку мира",
      icon: Mail
    }
  ];

  const technicalDetails = [
    "Проектор с ультракоротким фокусом для скрытой установки",
    "Яркость проектора подобрана с учетом освещенности площадки",
    "Прозрачное стекло с датчиком для интерактивности",
    "Автоматическая смена аудио-визуального контента",
    "Система проекционных сеток с автоматическим сбросом"
  ];

  const results = [
    "Участники погружены в атмосферу новогодней сказки",
    "Зимний лес, олени, белки и Дед Мороз на санях",
    "Интерактивная зона отправки поздравительных открыток",
    "Уникальный контент для поддержки мероприятия",
    "Полное техническое сопровождение"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="absolute inset-0 bg-[url('/src/assets/office-building.jpg')] bg-cover bg-center opacity-5"></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-full mb-6">
              <Star className="w-4 h-4 mr-2" />
              Проект года 2020
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent mb-6 leading-tight">
              Особенный Новый год Samsung
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-600 mb-8 leading-relaxed">
              Создали волшебную новогоднюю атмосферу с помощью современных мультимедийных технологий
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => setIsConsultModalOpen(true)}
              >
                <Zap className="w-5 h-5 mr-2" />
                Получить консультацию
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg font-semibold bg-white/70 backdrop-blur-sm border-slate-300 text-slate-700 hover:bg-white/90 transition-all duration-300"
                onClick={() => setIsProjectModalOpen(true)}
              >
                Заказать похожий проект
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">О проекте</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Компания Samsung доверила нам создание уникального новогоднего мероприятия. 
                Мы разработали комплексное мультимедийное решение, которое погрузило участников 
                в атмосферу новогодней сказки.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-slate-600">
                  <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                  <span className="font-medium">Дата:</span>
                  <span className="ml-2">{projectDetails.date}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <MapPin className="w-5 h-5 mr-3 text-purple-600" />
                  <span className="font-medium">Место:</span>
                  <span className="ml-2">{projectDetails.location}</span>
                </div>
                <div className="flex items-center text-slate-600">
                  <Users className="w-5 h-5 mr-3 text-green-600" />
                  <span className="font-medium">Команда:</span>
                  <span className="ml-2">{projectDetails.team}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Клиент</h3>
              <p className="text-lg mb-4">
                SAMSUNG - Транснациональная компания по производству электроники, 
                полупроводников, телекоммуникационного оборудования, чипов памяти, 
                жидкокристаллических дисплеев, мобильных телефонов и мониторов. 
                Основана в 1969 году.
              </p>
              <div className="flex items-center">
                <Award className="w-6 h-6 mr-2 text-yellow-300" />
                <span className="font-medium">Премиум клиент</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tasks Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Задачи проекта</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Комплексный подход к созданию новогоднего мероприятия
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tasks.map((task, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-slate-50 to-slate-100">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-slate-900">{task}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Наши решения</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Инновационные технологии для создания волшебной атмосферы
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <solution.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-slate-900">{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Техническое решение</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Профессиональное оборудование и инновационные технологии
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technicalDetails.map((detail, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-slate-600">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Результат</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Успешная реализация проекта и восторженные отзывы участников
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((result, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-slate-700 font-medium">{result}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Давайте сделаем проект вместе?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Создадим уникальное мероприятие, которое запомнится вашим гостям надолго
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setIsConsultModalOpen(true)}
            >
              <Zap className="w-5 h-5 mr-2" />
              Получить консультацию
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg font-semibold border-white/30 text-white hover:bg-white/20 transition-all duration-300"
              onClick={() => setIsProjectModalOpen(true)}
            >
              Заказать проект
            </Button>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ConsultationModal 
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        title="Получить консультацию по проекту Samsung"
        triggerText="Получить консультацию"
      />
      
      <ProjectOrderModal 
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title="Заказать похожий проект"
        triggerText="Заказать проект"
      />
    </div>
  );
};

export default SamsungEvent;
