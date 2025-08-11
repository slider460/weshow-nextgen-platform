import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star, Clock, Users } from "lucide-react";
import { useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const serviceDetails: Record<string, any> = {
    multimedia: {
      title: "Мультимедийные решения",
      description: "Создание впечатляющих визуальных эффектов с использованием передовых технологий",
      hero: "Погрузите аудиторию в мир невероятных визуальных впечатлений",
      image: "/src/assets/hero-bg.jpg",
      features: [
        "3D-маппинг на любые поверхности",
        "LED-видеостены высокого разрешения",
        "Интерактивные дисплеи и киоски",
        "Голографические проекции",
        "Системы синхронизации мультимедиа",
        "Управление контентом в реальном времени"
      ],
      benefits: [
        "Увеличение вовлеченности аудитории на 85%",
        "Запоминаемость бренда повышается в 3 раза",
        "Профессиональная техническая поддержка 24/7",
        "Индивидуальный подход к каждому проекту"
      ],
      process: [
        { step: "Анализ задач", description: "Изучаем ваши цели и требования" },
        { step: "Концепция", description: "Разрабатываем техническое решение" },
        { step: "Производство", description: "Создаем контент и настраиваем оборудование" },
        { step: "Реализация", description: "Монтаж и запуск системы" },
        { step: "Поддержка", description: "Техническое сопровождение проекта" }
      ],
      cases: [
        {
          title: "3D-маппинг на здании мэрии",
          description: "Световое шоу к 870-летию Москвы",
          result: "2 млн зрителей"
        },
        {
          title: "LED-экран на стадионе",
          description: "Видеотрансляция чемпионата мира",
          result: "100% визуальное покрытие"
        }
      ]
    },
    development: {
      title: "Разработка ПО и игр",
      description: "Создание интерактивных приложений и игровых решений для бизнеса",
      hero: "Превратите идеи в интерактивные решения",
      image: "/src/assets/office-building.jpg",
      features: [
        "AR/VR приложения для бизнеса",
        "Игры на Kinect и сенсорных экранах",
        "Интерактивный контент для презентаций",
        "Мобильные приложения",
        "Web-платформы",
        "Системы управления контентом"
      ],
      benefits: [
        "Увеличение конверсии на 40%",
        "Повышение времени взаимодействия в 5 раз",
        "Современные технологии разработки",
        "Полная документация и поддержка"
      ],
      process: [
        { step: "Техзадание", description: "Определяем функциональные требования" },
        { step: "Дизайн", description: "Создаем UX/UI дизайн приложения" },
        { step: "Разработка", description: "Программирование и тестирование" },
        { step: "Внедрение", description: "Развертывание и настройка" },
        { step: "Обновления", description: "Постоянная поддержка и развитие" }
      ],
      cases: [
        {
          title: "VR-тур по квартирам",
          description: "Виртуальная демонстрация недвижимости",
          result: "Продажи +60%"
        },
        {
          title: "Интерактивная игра для автосалона",
          description: "Kinect-игра для презентации авто",
          result: "Время в салоне +200%"
        }
      ]
    },
    support: {
      title: "Техническое сопровождение",
      description: "Профессиональная поддержка мероприятий и инсталляций 24/7",
      hero: "Надежная техническая поддержка ваших проектов",
      image: "/src/assets/team-work.jpg",
      features: [
        "Круглосуточная техническая поддержка",
        "Выездное обслуживание",
        "Профилактическое обслуживание",
        "Экстренное реагирование",
        "Консультации по эксплуатации",
        "Обучение персонала"
      ],
      benefits: [
        "Время реакции менее 1 часа",
        "99.9% времени бесперебойной работы",
        "Команда из 20+ специалистов",
        "Покрытие по всей России"
      ],
      process: [
        { step: "Диагностика", description: "Анализируем текущее состояние системы" },
        { step: "План поддержки", description: "Составляем индивидуальный план" },
        { step: "Мониторинг", description: "Постоянный контроль работы системы" },
        { step: "Профилактика", description: "Плановое техническое обслуживание" },
        { step: "Развитие", description: "Модернизация и улучшение системы" }
      ],
      cases: [
        {
          title: "Техподдержка конференц-залов",
          description: "Обслуживание 15 залов в бизнес-центре",
          result: "0 сбоев за год"
        }
      ]
    },
    integration: {
      title: "Интеграция мультимедии",
      description: "Комплексная интеграция мультимедийных систем в корпоративную среду",
      hero: "Объединяем технологии для максимальной эффективности",
      image: "/src/assets/office-building.jpg",
      features: [
        "Интеграция с корпоративными системами",
        "Централизованное управление",
        "Автоматизация процессов",
        "Синхронизация устройств",
        "API для внешних систем",
        "Масштабируемая архитектура"
      ],
      benefits: [
        "Снижение операционных расходов на 30%",
        "Автоматизация рутинных задач",
        "Единая точка управления",
        "Простота эксплуатации"
      ],
      process: [
        { step: "Аудит", description: "Анализ существующей инфраструктуры" },
        { step: "Архитектура", description: "Проектирование системы интеграции" },
        { step: "Внедрение", description: "Поэтапная интеграция компонентов" },
        { step: "Тестирование", description: "Комплексное тестирование системы" },
        { step: "Оптимизация", description: "Настройка и оптимизация работы" }
      ],
      cases: [
        {
          title: "Интеграция систем в банке",
          description: "Объединение AV-систем 50 отделений",
          result: "Управление из центра"
        }
      ]
    },
    branding: {
      title: "Брендинг мероприятий",
      description: "Создание уникального визуального образа для ваших событий",
      hero: "Сделайте ваше мероприятие незабываемым",
      image: "/src/assets/hero-bg.jpg",
      features: [
        "Разработка фирменного стиля мероприятия",
        "Брендированный мультимедиа контент",
        "3D-визуализация концепции",
        "Фирменная навигация и указатели",
        "Брендированные презентации",
        "Сувенирная продукция"
      ],
      benefits: [
        "Узнаваемость бренда +150%",
        "Профессиональный имидж",
        "Единый стиль всех материалов",
        "Впечатление на участников"
      ],
      process: [
        { step: "Бриф", description: "Изучаем бренд и цели мероприятия" },
        { step: "Концепция", description: "Разрабатываем визуальную концепцию" },
        { step: "Дизайн", description: "Создаем все элементы фирменного стиля" },
        { step: "Производство", description: "Изготавливаем материалы и контент" },
        { step: "Реализация", description: "Воплощаем концепцию на мероприятии" }
      ],
      cases: [
        {
          title: "Корпоративная конференция",
          description: "Полное брендирование форума на 500 человек",
          result: "100% соответствие фирменному стилю"
        }
      ]
    },
    equipment: {
      title: "Аренда оборудования",
      description: "Профессиональное мультимедийное оборудование в аренду",
      hero: "Все необходимое оборудование в одном месте",
      image: "/src/assets/team-work.jpg",
      features: [
        "LED-панели и видеостены",
        "Проекторы и экраны",
        "Звуковые системы",
        "Освещение и световые эффекты",
        "Интерактивные панели",
        "Системы управления и коммутации"
      ],
      benefits: [
        "Современное оборудование ведущих брендов",
        "Гибкие условия аренды",
        "Техническая поддержка включена",
        "Доставка и монтаж"
      ],
      process: [
        { step: "Консультация", description: "Определяем ваши потребности" },
        { step: "Подбор", description: "Выбираем оптимальное оборудование" },
        { step: "Доставка", description: "Привозим и устанавливаем оборудование" },
        { step: "Поддержка", description: "Обеспечиваем техническую поддержку" },
        { step: "Демонтаж", description: "Забираем оборудование после мероприятия" }
      ],
      cases: [
        {
          title: "Аренда для выставки",
          description: "Комплект оборудования для стенда 100м²",
          result: "Успешная экспозиция"
        }
      ]
    }
  };

  const service = serviceDetails[serviceId || ""] || serviceDetails.multimedia;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-accent">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                  {service.title}
                </h1>
                <p className="text-xl text-white/90 mb-8">
                  {service.hero}
                </p>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/20 bg-white/10"
                  onClick={() => setIsConsultationOpen(true)}
                >
                  Получить консультацию
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="relative">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
              Что входит в услугу
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center mt-1">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
              Преимущества работы с нами
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start space-x-4 bg-white p-6 rounded-2xl">
                  <div className="flex-shrink-0">
                    <Star className="h-6 w-6 text-yellow-500" />
                  </div>
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
              Как мы работаем
            </h2>
            <div className="space-y-8">
              {service.process.map((step: any, index: number) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{step.step}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cases */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
              Примеры проектов
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {service.cases.map((caseItem: any, index: number) => (
                <div key={index} className="bg-white rounded-2xl p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{caseItem.title}</h3>
                  <p className="text-slate-600 mb-4">{caseItem.description}</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-primary font-medium">Результат: {caseItem.result}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-3xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Готовы начать проект?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Свяжитесь с нами для получения персональной консультации и расчета стоимости
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/20 bg-white/10"
                  onClick={() => setIsConsultationOpen(true)}
                >
                  <Clock className="mr-2 h-5 w-5" />
                  Получить консультацию
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/20 bg-white/10"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Обсудить проект
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <ConsultationModal 
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        title="Консультация по услуге"
      />
    </div>
  );
};

export default ServiceDetail;