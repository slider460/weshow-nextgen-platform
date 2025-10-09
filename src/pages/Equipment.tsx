import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
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
  Palette,
  ShoppingCart,
  Tv,
  Projector,
  Speaker,
  Lightbulb,
  Cpu,
  Trash2
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Badge } from "../components/ui/badge";
import { Calculator } from "lucide-react";
import ConsultationModal from "../components/ConsultationModal";
import BookingCalendar from "../components/BookingCalendar";
import { getEquipment, getCategories } from "../api/equipment";
import { AddToCartButton } from "../components/AddToCartButton";

const Equipment = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [showBookingCalendar, setShowBookingCalendar] = useState(false);
  const [selectedEquipmentForBooking, setSelectedEquipmentForBooking] = useState<any>(null);
  
  // Состояние для данных из базы
  const [dbEquipment, setDbEquipment] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Добавляем CSS стили для уведомлений
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .cart-notification {
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        pointer-events: none;
      }
      
      .cart-notification:hover {
        transform: translateX(0) scale(1.02);
        transition: transform 0.2s ease;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);


  // Загружаем данные из базы
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [equipmentData, categoriesData] = await Promise.all([
          getEquipment(),
          getCategories()
        ]);
        
        setDbEquipment(equipmentData);
        setDbCategories(categoriesData);
        setError(null);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);



  // Функция для показа уведомления
  const showNotification = (message: string) => {
    // Удаляем все существующие уведомления
    const existingNotifications = document.querySelectorAll('.cart-notification');
    existingNotifications.forEach(notification => {
      if (document.body.contains(notification)) {
        (notification as HTMLElement).style.transform = 'translateX(full)';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    });
    
    // Ждем немного перед показом нового уведомления
    setTimeout(() => {
      // Создаем новое уведомление
      const notification = document.createElement('div');
      notification.className = 'cart-notification fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[999998] transform translate-x-full transition-transform duration-300 max-w-sm font-medium';
      notification.textContent = message;
      
      // Добавляем иконку корзины
      const icon = document.createElement('span');
      icon.innerHTML = '🛒 ';
      icon.className = 'mr-2';
      notification.insertBefore(icon, notification.firstChild);
      
      document.body.appendChild(notification);
      
      // Анимируем появление
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 100);
      
      // Убираем через 3 секунды
      setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }, 3000);
    }, 100);
  };

  // Обработчик добавления в корзину с уведомлением

  // Обработчик открытия календаря бронирования
  const handleOpenBookingCalendar = (equipment: any) => {
    setSelectedEquipmentForBooking(equipment);
    setShowBookingCalendar(true);
  };

  // Обработчик закрытия календаря бронирования
  const handleCloseBookingCalendar = () => {
    setShowBookingCalendar(false);
    setSelectedEquipmentForBooking(null);
  };

  // Преобразуем данные из базы в формат для отображения
  const getEquipmentByCategory = (categorySlug: string) => {
    // Распределяем товары по категориям на основе названия
    const categoryKeywords = {
      'projectors': ['проектор', 'экран', 'mapping', 'купол', 'сетка'],
      'led-displays': ['led', 'экран', 'видеостена', 'панель', 'куб', 'прозрачный', 'изогнутый', 'мобильный'],
      'audio': ['микшер', 'микрофон', 'акустическая', 'сабвуфер', 'обработка', 'радиосистема', 'гид'],
      'lighting': ['прожектор', 'лазер', 'стробоскоп', 'дым', 'ультрафиолет', 'молний', 'голографический']
    };
    
    const keywords = categoryKeywords[categorySlug as keyof typeof categoryKeywords] || [];
    
    return dbEquipment
      .filter(item => {
        const itemName = item.name?.toLowerCase() || '';
        return keywords.some(keyword => itemName.includes(keyword));
      })
      .map(item => ({
        id: item.id,
        name: item.name,
        specs: item.description || 'Описание отсутствует',
        price: `от ${item.price_per_day || 1000}₽/день`,
        priceValue: item.price_per_day || 1000,
        category: categorySlug,
        stock_quantity: item.stock_quantity || 1
      }));
  };

  // Создаем категории оборудования с данными из базы
  const equipmentCategories = [
    {
      icon: <Projector className="h-8 w-8" />,
      title: "Проекционное оборудование",
      description: "Проекторы, экраны и аксессуары для презентаций",
      items: getEquipmentByCategory('projectors'),
      gradient: "gradient-card-purple"
    },
    {
      icon: <Speaker className="h-8 w-8" />,
      title: "Аудиооборудование",
      description: "Микрофоны, колонки, микшеры и звуковое оборудование",
      items: getEquipmentByCategory('audio'),
      gradient: "gradient-card-cyan"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Световое оборудование",
      description: "Прожекторы, стробоскопы, лазеры и световые эффекты",
      items: getEquipmentByCategory('lighting'),
      gradient: "gradient-card-dark"
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Видеооборудование",
      description: "Камеры, видеомикшеры, мониторы и видеотехника",
      items: getEquipmentByCategory('led-displays'),
      gradient: "gradient-card-blue"
    },
    {
      icon: <Tv className="h-8 w-8" />,
      title: "LED-панели и видеостены",
      description: "Высококачественные LED-дисплеи для любых задач",
      items: [
        { 
          id: "led-p2.5-indoor",
          name: "LED-панель P2.5 (indoor)", 
          specs: "500x500мм, 200000 точек/м²", 
          price: "от 5000₽/день",
          priceValue: 5000,
          category: "led-panels"
        },
        { 
          id: "led-p3.9-outdoor",
          name: "LED-панель P3.9 (outdoor)", 
          specs: "500x1000мм, 65536 точек/м²", 
          price: "от 3500₽/день",
          priceValue: 3500,
          category: "led-panels"
        },
        { 
          id: "videowall-3x3",
          name: "Видеостена 3x3", 
          specs: "1.5x1.5м, Full HD", 
          price: "от 25000₽/день",
          priceValue: 25000,
          category: "led-panels"
        },
        { 
          id: "mobile-led-screen",
          name: "Мобильный LED-экран", 
          specs: "6x4м, P5, трейлер", 
          price: "от 45000₽/день",
          priceValue: 45000,
          category: "led-panels"
        }
      ],
      gradient: "gradient-card-blue"
    },
    {
      icon: <Projector className="h-8 w-8" />,
      title: "Проекторы и экраны",
      description: "Профессиональное проекционное оборудование",
      items: [
        { 
          id: "projector-6000-ansi",
          name: "Проектор 6000 ANSI", 
          specs: "Full HD, LCD", 
          price: "от 8000₽/день",
          priceValue: 8000,
          category: "projectors"
        },
        { 
          id: "projector-12000-ansi",
          name: "Проектор 12000 ANSI", 
          specs: "4K, лазерный", 
          price: "от 15000₽/день",
          priceValue: 15000,
          category: "projectors"
        },
        { 
          id: "screen-3x4m",
          name: "Экран 3x4м", 
          specs: "Fast-fold, front/rear", 
          price: "от 3000₽/день",
          priceValue: 3000,
          category: "projectors"
        },
        { 
          id: "screen-6x8m",
          name: "Экран 6x8м", 
          specs: "Натяжной, seamless", 
          price: "от 8000₽/день",
          priceValue: 8000,
          category: "projectors"
        }
      ],
      gradient: "gradient-card-purple"
    },
    {
      icon: <Speaker className="h-8 w-8" />,
      title: "Звуковые системы",
      description: "Профессиональное звуковое оборудование",
      items: [
        { 
          id: "line-array-l-acoustics",
          name: "Линейный массив", 
          specs: "L-Acoustics KARA, 2x12", 
          price: "от 12000₽/день",
          priceValue: 12000,
          category: "audio"
        },
        { 
          id: "active-speakers-jbl",
          name: "Активная акустика", 
          specs: "JBL VTX A12, комплект", 
          price: "от 8000₽/день",
          priceValue: 8000,
          category: "audio"
        },
        { 
          id: "microphone-system-shure",
          name: "Микрофонная система", 
          specs: "Shure ULXD, 8 каналов", 
          price: "от 5000₽/день",
          priceValue: 5000,
          category: "audio"
        },
        { 
          id: "mixer-yamaha-cl5",
          name: "Микшерный пульт", 
          specs: "Yamaha CL5, 72 канала", 
          price: "от 6000₽/день",
          priceValue: 6000,
          category: "audio"
        }
      ],
      gradient: "gradient-card-cyan"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Освещение",
      description: "Световое оборудование для мероприятий",
      items: [
        { 
          id: "moving-head-clay-paky",
          name: "Moving Head", 
          specs: "Clay Paky Sharpy Plus, 1200W", 
          price: "от 2500₽/день",
          priceValue: 2500,
          category: "lighting"
        },
        { 
          id: "led-par-rgbw",
          name: "LED Par", 
          specs: "RGBW, 18x15W", 
          price: "от 800₽/день",
          priceValue: 800,
          category: "lighting"
        },
        { 
          id: "strobe-atomic-3000w",
          name: "Стробоскопы", 
          specs: "Atomic 3000W", 
          price: "от 1500₽/день",
          priceValue: 1500,
          category: "lighting"
        },
        { 
          id: "laser-rgb-10w",
          name: "Лазерная установка", 
          specs: "RGB 10W, ILDA", 
          price: "от 4000₽/день",
          priceValue: 4000,
          category: "lighting"
        }
      ],
      gradient: "gradient-card-dark"
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Интерактивные панели",
      description: "Сенсорные дисплеи и интерактивные решения",
      items: [
        { 
          id: "touch-panel-55",
          name: "Сенсорная панель 55\"", 
          specs: "4K, мультитач 20 точек", 
          price: "от 4000₽/день",
          priceValue: 4000,
          category: "interactive"
        },
        { 
          id: "smart-board-77",
          name: "Интерактивная доска", 
          specs: "SMART Board, 77\"", 
          price: "от 3500₽/день",
          priceValue: 3500,
          category: "interactive"
        },
        { 
          id: "kiosk-terminal-32",
          name: "Киоск-терминал", 
          specs: "32\", металлический корпус", 
          price: "от 2500₽/день",
          priceValue: 2500,
          category: "interactive"
        },
        { 
          id: "holographic-display-46",
          name: "Голографический дисплей", 
          specs: "46\", 3D эффект", 
          price: "от 8000₽/день",
          priceValue: 8000,
          category: "interactive"
        }
      ],
      gradient: "gradient-card-purple"
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: "Системы управления",
      description: "Оборудование для управления и коммутации",
      items: [
        { 
          id: "media-server-4k",
          name: "Медиасервер", 
          specs: "4K, 8 выходов", 
          price: "от 6000₽/день",
          priceValue: 6000,
          category: "control"
        },
        { 
          id: "video-switcher-16x16",
          name: "Видеокоммутатор", 
          specs: "16x16, HDMI 4K", 
          price: "от 3000₽/день",
          priceValue: 3000,
          category: "control"
        },
        { 
          id: "video-conference-poly",
          name: "Система видеоконференций", 
          specs: "Poly Studio X70", 
          price: "от 4500₽/день",
          priceValue: 4500,
          category: "control"
        },
        { 
          id: "lighting-controller-ma",
          name: "Контроллер освещения", 
          specs: "MA Lighting, 2048 каналов", 
          price: "от 5000₽/день",
          priceValue: 5000,
          category: "control"
        }
      ],
      gradient: "gradient-card-blue"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 lg:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D220.1%22%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative">
            <div className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs lg:text-sm font-medium mb-6 lg:mb-8 border border-white/30">
              <Monitor className="h-4 w-4 lg:h-5 lg:w-5 mr-2 animate-pulse" />
              Оборудование в аренду
            </div>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 lg:mb-8 leading-tight">
              Категории оборудования
            </h1>
            <p className="text-base lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4">
              Весь спектр технического оборудования для проведения мероприятий любого масштаба
            </p>
            
            {/* Кнопки корзины */}
            <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center items-center">
              <Link to="/cart">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/20 bg-white/10 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-semibold hover:scale-105 transition-transform duration-200"
                >
                  <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                  Корзина
                </Button>
              </Link>
              
            </div>
          </div>
        </section>

        {/* Equipment Categories */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            {loading && (
              <div className="text-center py-12">
                <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Загрузка оборудования...
                </div>
              </div>
            )}
            
            {error && (
              <div className="text-center py-12">
                <div className="inline-flex items-center px-6 py-3 bg-red-500/20 backdrop-blur-sm text-red-200 rounded-full text-sm font-medium mb-4">
                  ❌ Ошибка загрузки: {error}
                </div>
                <p className="text-white/70 text-sm">
                  Попробуйте обновить страницу или обратитесь к администратору
                </p>
              </div>
            )}
            
            {!loading && !error && (
              <div className="space-y-12 lg:space-y-16">
                {equipmentCategories
                  .filter(category => category.items && category.items.length > 0)
                  .length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4">
                      📦 Оборудование временно недоступно
                    </div>
                    <p className="text-white/70 text-sm">
                      Попробуйте обновить страницу или обратитесь к администратору
                    </p>
                  </div>
                ) : (
                  equipmentCategories
                    .filter(category => category.items && category.items.length > 0)
                    .map((category, categoryIndex) => (
                <div key={categoryIndex} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  {/* Category Card */}
                  <div className={`${category.gradient} rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white shadow-lg`}>
                    <div className="mb-4 lg:mb-6">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-4">
                        {category.icon}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 lg:mb-4">
                        {category.title}
                      </h3>
                      <p className="text-white/90 leading-relaxed text-sm lg:text-base">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Equipment Items */}
                  <div className="lg:col-span-2 space-y-3 lg:space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 hover:bg-slate-50 transition-all duration-200 shadow-sm hover:shadow-md border border-slate-100">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 lg:gap-4">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base lg:text-lg font-bold text-slate-900 mb-1 lg:mb-2 truncate">
                              {item.name}
                            </h4>
                            <p className="text-slate-600 text-xs lg:text-sm leading-relaxed">
                              {item.specs}
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 lg:gap-4">
                            <span className="text-lg lg:text-xl font-bold text-primary whitespace-nowrap">
                              {item.price}
                            </span>
                            <div className="flex flex-col sm:flex-row gap-2">
                              <AddToCartButton 
                                equipmentId={item.id}
                                name={item.name}
                                category={item.category || 'Прочее'}
                                price={parseInt(item.price?.toString().replace(/[^\d]/g, '') || '1000')}
                                image={item.image}
                                className="text-xs lg:text-sm px-3 lg:px-4 py-1 lg:py-2"
                              />
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleOpenBookingCalendar(item)}
                                className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors duration-200 text-xs lg:text-sm px-3 lg:px-4 py-1 lg:py-2"
                              >
                                <Calendar className="h-3 w-3 lg:h-4 lg:w-4 mr-1 lg:mr-2" />
                                Забронировать
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                asChild
                                className="text-xs lg:text-sm px-3 lg:px-4 py-1 lg:py-2"
                              >
                                <Link to="/services/equipment-calculation">
                                  Забронировать
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                ))
                )}
              </div>
            )}
          </div>
        </section>

        {/* Services */}
        <section className="py-12 lg:py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 lg:mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 lg:mb-6">
                Дополнительные услуги
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/20 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <ArrowRight className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-3 lg:mb-4">Доставка и монтаж</h3>
                <p className="text-slate-600 text-sm lg:text-base">Доставим и установим оборудование в любой точке Москвы и области</p>
              </div>

              <div className="bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/20 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <Cpu className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-3 lg:mb-4">Техническая поддержка</h3>
                <p className="text-slate-600 text-sm lg:text-base">Специалист на объекте на протяжении всего мероприятия</p>
              </div>

              <div className="bg-white rounded-xl lg:rounded-2xl p-6 lg:p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-primary/20 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6">
                  <Monitor className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-3 lg:mb-4">Настройка и калибровка</h3>
                <p className="text-slate-600 text-sm lg:text-base">Профессиональная настройка оборудования под ваши задачи</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 lg:py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-gradient-to-br from-primary via-primary/90 to-accent rounded-2xl lg:rounded-3xl p-8 lg:p-12 shadow-lg">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-4">
                Нужна консультация по оборудованию?
              </h2>
              <p className="text-base lg:text-xl text-white/90 mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed">
                Наши специалисты помогут подобрать оптимальный комплект оборудования для вашего мероприятия
              </p>
              <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/20 bg-white/10 text-sm lg:text-base px-6 lg:px-8 py-2 lg:py-3"
                  onClick={() => setIsConsultationOpen(true)}
                >
                  Получить консультацию
                  <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/20 bg-white/10 text-sm lg:text-base px-6 lg:px-8 py-2 lg:py-3"
                  asChild
                >
                  <a href="/services/equipment-calculation">
                    Калькулятор аренды
                    <Calculator className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                  </a>
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
        title="Консультация по оборудованию"
      />


      {/* Календарь бронирования */}
      {showBookingCalendar && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Бронирование оборудования</h2>
                  <p className="text-slate-600 mt-1">
                    Выберите дату и время для {selectedEquipmentForBooking?.name}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseBookingCalendar}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              
              <BookingCalendar
                equipmentId={selectedEquipmentForBooking?.id}
                equipmentName={selectedEquipmentForBooking?.name}
                onBookingSelect={(booking) => {
                  console.log('Booking selected:', booking);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipment;