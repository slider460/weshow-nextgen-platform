import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { 
  ArrowLeft, 
  Move, 
  Zap, 
  Monitor, 
  Users, 
  Calendar, 
  Phone, 
  ArrowRight,
  Play,
  Camera,
  FileText,
  X,
  Send,
  CheckCircle,
  Settings,
  Wrench,
  Palette
} from "lucide-react";
import { Link } from "react-router-dom";
import { defaultSuccessMessage, submitForm } from "../../utils/submitForm";

// Типы для галереи
type GalleryItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  type: 'video' | 'photo' | 'case';
  videoUrl?: string;
  caseData?: {
    task: string;
    solution: string;
    result: string;
  };
};

const KineticScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'video' | 'photo' | 'case'>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: ''
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Данные галереи
  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Кинетическая Инсталляция 'Волна'",
      description: "Интерактивная инсталляция на международной выставке технологий будущего",
      image: "/media/services/kinetic-screen/cases/wave-installation/main.jpg",
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/example1'
    },
    {
      id: 2,
      title: "Корпоративная Презентация Samsung",
      description: "Динамичная презентация новых продуктов с 6 кинетическими экранами",
      image: "/media/services/kinetic-screen/cases/samsung-presentation/main.jpg",
      type: 'photo'
    },
    {
      id: 3,
      title: "Торговый Центр 'Метрополис'",
      description: "Кинетические экраны в розничном пространстве для привлечения клиентов",
      image: "/media/services/kinetic-screen/cases/metropolis-mall/main.jpg",
      type: 'case',
      caseData: {
        task: "Создать привлекающие внимание интерактивные экраны для торгового центра",
        solution: "Установили 4 кинетических LED экрана с датчиками движения и AI-анализом",
        result: "Увеличение времени пребывания посетителей на 40%, рост продаж на 25%"
      }
    },
    {
      id: 4,
      title: "Музей Современного Искусства",
      description: "Интерактивная выставка 'Технологии в Искусстве' с кинетическими элементами",
      image: "/media/services/kinetic-screen/cases/modern-art-museum/main.jpg",
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/example2'
    },
    {
      id: 5,
      title: "Спортивный Стадион 'Олимпийский'",
      description: "Кинетические экраны для трансляции матчей и рекламы",
      image: "/media/services/kinetic-screen/cases/olympic-stadium/main.jpg",
      type: 'photo'
    },
    {
      id: 6,
      title: "IT-Конференция 'Digital Future'",
      description: "Технологическая конференция с кинетическими экранами для презентаций",
      image: "/media/services/kinetic-screen/cases/digital-future-conference/main.jpg",
      type: 'case',
      caseData: {
        task: "Организовать впечатляющую презентацию для IT-конференции с 2000+ участниками",
        solution: "Создали кинетическую стену с 8 движущимися экранами и синхронизированным контентом",
        result: "100% положительных отзывов, приглашения на другие конференции, рост продаж билетов на 60%"
      }
    },
    {
      id: 7,
      title: "Выставка Автомобилей 'AutoExpo'",
      description: "Кинетические экраны для демонстрации новых моделей автомобилей",
      image: "/media/services/kinetic-screen/cases/auto-expo/main.jpg",
      type: 'video',
      videoUrl: 'https://www.youtube.com/embed/example3'
    },
    {
      id: 8,
      title: "Концертный Зал 'Филармония'",
      description: "Кинетические экраны для музыкальных представлений и опер",
      image: "/media/services/kinetic-screen/cases/philharmonic-hall/main.jpg",
      type: 'case',
      caseData: {
        task: "Создать динамичное визуальное сопровождение для классических концертов",
        solution: "Установили 3 кинетических экрана с синхронизацией под музыку",
        result: "Увеличение посещаемости на 35%, восторженные отзывы критиков и публики"
      }
    }
  ];

  // Фильтрация галереи
  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === activeFilter);

  // Обработчики
  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitForm("Кинетические экраны", {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        description: formData.description,
      });

      setIsFormSubmitted(true);

      setTimeout(() => {
        setIsFormSubmitted(false);
        setFormData({ name: '', phone: '', email: '', description: '' });
      }, 3000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Ошибка отправки");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  if (isFormSubmitted) {
    return (
      <div className="min-h-screen bg-[#121212] text-white">
        <Header />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-4">
            <div className="w-20 h-20 bg-gradient-to-r from-[#00F2A9] to-[#007BFF] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Спасибо за заявку!
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              {defaultSuccessMessage}
            </p>
            <Button 
              onClick={() => setIsFormSubmitted(false)}
              className="px-8 py-3 bg-gradient-to-r from-[#00F2A9] to-[#007BFF] hover:from-[#00E0A0] hover:to-[#0066CC] text-white"
            >
              Отправить еще одну заявку
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Видео фон (заглушка) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#007BFF]/20 to-[#00F2A9]/20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" className="mb-8 text-gray-400 hover:text-white" asChild>
              <Link to="/services">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к услугам
              </Link>
            </Button>
            
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#007BFF] to-[#00F2A9] rounded-3xl mb-6">
                <Move className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Аренда Кинетических LED Экранов: 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00F2A9] to-[#007BFF]">
                  Превратите Ваше Мероприятие в WOW-Событие
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Инновационные решения, где изображение и движение сливаются воедино, 
                создавая незабываемый визуальный опыт.
              </p>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#00F2A9] to-[#007BFF] hover:from-[#00E0A0] hover:to-[#0066CC] text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                onClick={scrollToForm}
              >
                Рассчитать стоимость проекта
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Галерея Наших Проектов: Вдохновение в Движении
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Посмотрите, как кинетические технологии трансформируют пространства 
                и создают уникальную атмосферу.
              </p>
            </div>

            {/* Фильтры */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { key: 'all', label: 'Все', icon: null },
                { key: 'video', label: 'Видео', icon: Play },
                { key: 'photo', label: 'Фото', icon: Camera },
                { key: 'case', label: 'Кейсы', icon: FileText }
              ].map((filter) => (
                <Button
                  key={filter.key}
                  variant={activeFilter === filter.key ? "default" : "outline"}
                  className={`px-6 py-3 ${
                    activeFilter === filter.key 
                      ? 'bg-gradient-to-r from-[#00F2A9] to-[#007BFF] text-white border-0' 
                      : 'border-gray-600 text-gray-300 hover:border-[#007BFF] hover:text-white'
                  }`}
                  onClick={() => setActiveFilter(filter.key as any)}
                >
                  {filter.icon && <filter.icon className="h-4 w-4 mr-2" />}
                  {filter.label}
                </Button>
              ))}
            </div>

            {/* Сетка галереи */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#2a2a2a] rounded-2xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#007BFF]/20"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="relative h-48 bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#007BFF] to-[#00F2A9] rounded-full flex items-center justify-center">
                      {item.type === 'video' && <Play className="h-8 w-8 text-white ml-1" />}
                      {item.type === 'photo' && <Camera className="h-8 w-8 text-white" />}
                      {item.type === 'case' && <FileText className="h-8 w-8 text-white" />}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Overview Section */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Технология Кинетических Экранов: Будущее Уже Здесь
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Кинетические экраны представляют собой революционную технологию, где физическое движение 
                и цифровое изображение создают уникальный интерактивный опыт.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Как Работает Кинетический Экран?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#00F2A9] to-[#007BFF] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Датчики Движения</h4>
                      <p className="text-gray-400 text-sm">Специальные сенсоры отслеживают перемещение объектов и людей в пространстве</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#00F2A9] to-[#007BFF] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Анализ Данных</h4>
                      <p className="text-gray-400 text-sm">Компьютер обрабатывает информацию и определяет оптимальную траекторию движения</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#00F2A9] to-[#007BFF] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Физическое Движение</h4>
                      <p className="text-gray-400 text-sm">Экраны плавно перемещаются, создавая динамичную композицию</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#00F2A9] to-[#007BFF] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Синхронизация Контента</h4>
                      <p className="text-gray-400 text-sm">Визуальный контент адаптируется под новое расположение экранов</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-[#3a3a3a]">
                <h4 className="text-xl font-semibold text-white mb-4">Ключевые Преимущества</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00F2A9] rounded-full"></div>
                    <span className="text-gray-300">Привлечение внимания на 300% больше</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00F2A9] rounded-full"></div>
                    <span className="text-gray-300">Уникальный пользовательский опыт</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00F2A9] rounded-full"></div>
                    <span className="text-gray-300">Адаптивность под любые пространства</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00F2A9] rounded-full"></div>
                    <span className="text-gray-300">Технологическое превосходство</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00F2A9] rounded-full"></div>
                    <span className="text-gray-300">Высокая рентабельность инвестиций</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Section */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Технические Характеристики
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Профессиональное оборудование для создания впечатляющих кинетических инсталляций
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-[#3a3a3a]">
                <div className="w-16 h-16 bg-gradient-to-r from-[#007BFF] to-[#00F2A9] rounded-2xl flex items-center justify-center mb-6">
                  <Monitor className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Экраны</h3>
                <div className="space-y-2 text-gray-400">
                  <div>• Разрешение: 4K Ultra HD (3840×2160)</div>
                  <div>• Яркость: 5000+ нит</div>
                  <div>• Контрастность: 5000:1</div>
                  <div>• Угол обзора: 178°</div>
                  <div>• Размеры: 55" - 86"</div>
                </div>
              </div>
              
              <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-[#3a3a3a]">
                <div className="w-16 h-16 bg-gradient-to-r from-[#00F2A9] to-[#007BFF] rounded-2xl flex items-center justify-center mb-6">
                  <Move className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Кинетическая Система</h3>
                <div className="space-y-2 text-gray-400">
                  <div>• Скорость движения: до 2 м/с</div>
                  <div>• Точность позиционирования: ±1мм</div>
                  <div>• Грузоподъемность: до 50 кг</div>
                  <div>• Диапазон движения: 360°</div>
                  <div>• Время отклика: &lt;50мс</div>
                </div>
              </div>
              
              <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-[#3a3a3a]">
                <div className="w-16 h-16 bg-gradient-to-r from-[#007BFF] to-[#00F2A9] rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Питание и Управление</h3>
                <div className="space-y-2 text-gray-400">
                  <div>• Потребление: 200-500 Вт</div>
                  <div>• Напряжение: 220-240В</div>
                  <div>• Интерфейс: Ethernet, Wi-Fi</div>
                  <div>• Управление: ПК, планшет, смартфон</div>
                  <div>• Автономность: до 8 часов</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Applications & Statistics Section */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Реальные Применения и Статистика
              </h2>
              <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                Доказанная эффективность кинетических экранов в различных отраслях и сферах применения
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Где Используются Кинетические Экраны?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-[#2a2a2a] rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#00F2A9] to-[#007BFF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">🏢</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Корпоративные Мероприятия</h4>
                      <p className="text-gray-400 text-sm">Презентации, конференции, выставки</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-[#2a2a2a] rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#00F2A9] to-[#007BFF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">🛍️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Торговые Центры</h4>
                      <p className="text-gray-400 text-sm">Реклама, навигация, развлечения</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-[#2a2a2a] rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#00F2A9] to-[#007BFF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">🎭</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Культурные Учреждения</h4>
                      <p className="text-gray-400 text-sm">Музеи, театры, концертные залы</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-[#2a2a2a] rounded-xl">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#00F2A9] to-[#007BFF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">🏟️</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Спортивные Объекты</h4>
                      <p className="text-gray-400 text-sm">Стадионы, арены, фитнес-центры</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-[#3a3a3a]">
                <h4 className="text-xl font-semibold text-white mb-6">Статистика Эффективности</h4>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#00F2A9] mb-2">300%</div>
                    <div className="text-gray-300">Увеличение внимания аудитории</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#007BFF] mb-2">85%</div>
                    <div className="text-gray-300">Повышение запоминаемости контента</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#00F2A9] mb-2">40%</div>
                    <div className="text-gray-300">Рост времени взаимодействия</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-[#007BFF] mb-2">60%</div>
                    <div className="text-gray-300">Увеличение конверсии</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#0f0f0f]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Полный Цикл Услуг для Вашего Успеха
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#2a2a2a] rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-[#007BFF] to-[#00F2A9] rounded-2xl flex items-center justify-center mb-6">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">1. Аренда и Конфигурация</h3>
                <p className="text-gray-400 leading-relaxed">
                  Подбираем оптимальную конфигурацию кинетических экранов под ваши задачи. 
                  Предоставляем в аренду современное оборудование с полным техническим сопровождением.
                </p>
              </div>
              
              <div className="bg-[#2a2a2a] rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-[#00F2A9] to-[#007BFF] rounded-2xl flex items-center justify-center mb-6">
                  <Wrench className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">2. Монтаж и Сопровождение</h3>
                <p className="text-gray-400 leading-relaxed">
                  Профессиональная установка и настройка кинетических экранов. 
                  Техническое сопровождение на протяжении всего мероприятия.
                </p>
              </div>
              
              <div className="bg-[#2a2a2a] rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-[#007BFF] to-[#00F2A9] rounded-2xl flex items-center justify-center mb-6">
                  <Palette className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">3. Создание Контента</h3>
                <p className="text-gray-400 leading-relaxed">
                  Разрабатываем уникальный контент для кинетических экранов. 
                  Анимации, интерактивные элементы и визуальные эффекты.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing & Packages Section */}
      <section className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Тарифы и Пакеты Услуг
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Выберите оптимальный пакет для вашего мероприятия или получите индивидуальное предложение
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-[#3a3a3a] hover:border-[#007BFF] transition-all duration-300">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Старт</h3>
                  <div className="text-4xl font-bold text-[#00F2A9] mb-2">от 150₽</div>
                  <div className="text-gray-400">за час аренды</div>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00F2A9] rounded-full"></div>
                    <span className="text-gray-300">1 кинетический экран 55"</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00F2A9] rounded-full"></div>
                    <span className="text-gray-300">Базовая настройка</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00F2A9] rounded-full"></div>
                    <span className="text-gray-300">Техническая поддержка</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00F2A9] rounded-full"></div>
                    <span className="text-gray-300">Монтаж и демонтаж</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-[#00F2A9] to-[#007BFF] hover:from-[#00E0A0] hover:to-[#0066CC] text-white"
                  onClick={scrollToForm}
                >
                  Забронировать
                </Button>
              </div>
              
              <div className="bg-[#2a2a2a] rounded-2xl p-8 border-2 border-[#007BFF] relative hover:scale-105 transition-all duration-300">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#007BFF] text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Популярный
                  </div>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Профи</h3>
                  <div className="text-4xl font-bold text-[#007BFF] mb-2">от 250₽</div>
                  <div className="text-gray-400">за час аренды</div>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#007BFF] rounded-full"></div>
                    <span className="text-gray-300">2-3 кинетических экрана 65"</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#007BFF] rounded-full"></div>
                    <span className="text-gray-300">Продвинутая настройка</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#007BFF] rounded-full"></div>
                    <span className="text-gray-300">Синхронизация экранов</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#007BFF] rounded-full"></div>
                    <span className="text-gray-300">Базовый контент</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#007BFF] rounded-full"></div>
                    <span className="text-gray-300">24/7 поддержка</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-[#007BFF] to-[#00F2A9] hover:from-[#0066CC] hover:to-[#00E0A0] text-white"
                  onClick={scrollToForm}
                >
                  Забронировать
                </Button>
              </div>
              
              <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-[#3a3a3a] hover:border-[#00F2A9] transition-all duration-300">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Премиум</h3>
                  <div className="text-4xl font-bold text-[#00F2A9] mb-2">от 400₽</div>
                  <div className="text-gray-400">за час аренды</div>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00F2A9] rounded-full"></div>
                    <span className="text-gray-300">4+ кинетических экрана 86"</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00F2A9] rounded-full"></div>
                    <span className="text-gray-300">Полная настройка</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00F2A9] rounded-full"></div>
                    <span className="text-gray-300">AI-анализ движения</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00F2A9] rounded-full"></div>
                    <span className="text-gray-300">Кастомный контент</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#00F2A9] rounded-full"></div>
                    <span className="text-gray-300">Персональный менеджер</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-[#00F2A9] to-[#007BFF] hover:from-[#00E0A0] hover:to-[#0066CC] text-white"
                  onClick={scrollToForm}
                >
                  Забронировать
                </Button>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-gray-400 mb-4">
                * Цены указаны за базовую аренду. Финальная стоимость зависит от сложности проекта, 
                длительности мероприятия и дополнительных услуг.
              </p>
              <Button 
                variant="outline" 
                className="border-[#007BFF] text-[#007BFF] hover:bg-[#007BFF] hover:text-white"
                onClick={scrollToForm}
              >
                Получить индивидуальное предложение
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-[#1a1a1a]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">
                Готовы Создать Нечто Уникальное?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Оставьте заявку, и наш менеджер свяжется с вами, чтобы обсудить детали проекта 
                и рассчитать предварительную стоимость.
              </p>
            </div>

            <div className="bg-[#2a2a2a] rounded-2xl p-8 border border-[#3a3a3a]">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ваше Имя *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleFormChange("name", e.target.value)}
                      placeholder="Ваше имя"
                      required
                      className="w-full bg-[#3a3a3a] border-[#4a4a4a] text-white placeholder:text-gray-500 focus:border-[#007BFF] focus:ring-[#007BFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Телефон *
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleFormChange("phone", e.target.value)}
                      placeholder="+7 (___) ___-__-__"
                      required
                      className="w-full bg-[#3a3a3a] border-[#4a4a4a] text-white placeholder:text-gray-500 focus:border-[#007BFF] focus:ring-[#007BFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-[#3a3a3a] border-[#4a4a4a] text-white placeholder:text-gray-500 focus:border-[#007BFF] focus:ring-[#007BFF]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Краткое описание задачи
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleFormChange("description", e.target.value)}
                    placeholder="Опишите ваш проект или задачу..."
                    rows={4}
                    className="w-full bg-[#3a3a3a] border-[#4a4a4a] text-white placeholder:text-gray-500 focus:border-[#007BFF] focus:ring-[#007BFF]"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-[#00F2A9] to-[#007BFF] hover:from-[#00E0A0] hover:to-[#0066CC] text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </Button>
                {submitError && (
                  <p className="text-sm text-red-400">{submitError}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modal для галереи */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#2a2a2a] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-white">{selectedItem.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {selectedItem.type === 'video' && selectedItem.videoUrl && (
                <div className="aspect-video bg-black rounded-xl mb-6">
                  <iframe
                    src={selectedItem.videoUrl}
                    title={selectedItem.title}
                    className="w-full h-full rounded-xl"
                    allowFullScreen
                  />
                </div>
              )}

              {selectedItem.type === 'photo' && (
                <div className="aspect-video bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] rounded-xl mb-6 flex items-center justify-center">
                  <Camera className="h-20 w-20 text-[#007BFF]" />
                </div>
              )}

              {selectedItem.type === 'case' && selectedItem.caseData && (
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="aspect-video bg-gradient-to-br from-[#3a3a3a] to-[#2a2a2a] rounded-xl flex items-center justify-center">
                    <FileText className="h-20 w-20 text-[#00F2A9]" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-[#00F2A9] mb-2">Задача</h4>
                      <p className="text-gray-300">{selectedItem.caseData.task}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#007BFF] mb-2">Решение</h4>
                      <p className="text-gray-300">{selectedItem.caseData.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#00F2A9] mb-2">Результат</h4>
                      <p className="text-gray-300">{selectedItem.caseData.result}</p>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-gray-400">{selectedItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KineticScreen;
