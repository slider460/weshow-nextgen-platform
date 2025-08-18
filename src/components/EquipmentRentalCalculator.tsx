import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Calculator, 
  Calendar, 
  Monitor, 
  Speaker, 
  Lightbulb, 
  Cpu, 
  Tv, 
  Projector,
  Zap,
  Truck,
  Settings,
  DollarSign,
  Clock,
  ShoppingCart,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  Info
} from "lucide-react";

interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  icon: React.ReactNode;
  description: string;
}

interface ServiceItem {
  id: string;
  name: string;
  price: number;
  icon: React.ReactNode;
  description: string;
}

const EquipmentRentalCalculator: React.FC = () => {
  const [rentalDays, setRentalDays] = useState<number>(1);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [preSelectedEquipment, setPreSelectedEquipment] = useState<any>(null);
  const [orderFormData, setOrderFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    eventLocation: '',
    additionalInfo: ''
  });

  // Проверяем предварительно выбранное оборудование при загрузке
  useEffect(() => {
    // Сначала проверяем корзину
    const cartEquipment = localStorage.getItem('cartEquipment');
    if (cartEquipment) {
      try {
        const cartItems = JSON.parse(cartEquipment);
        setPreSelectedEquipment({
          name: `Оборудование из корзины (${cartItems.length} позиций)`,
          specs: `Общая стоимость: ${cartItems.reduce((sum: any, item: any) => sum + (item.price * item.quantity), 0).toLocaleString()} ₽/день`,
          price: cartItems.reduce((sum: any, item: any) => sum + (item.price * item.quantity), 0),
          category: 'Корзина'
        });
        
        // Автоматически добавляем все оборудование из корзины
        cartItems.forEach((item: any) => {
          const equipmentId = mapEquipmentNameToId(item.name);
          if (equipmentId) {
            setSelectedEquipment(prev => {
              if (!prev.includes(equipmentId)) {
                return [...prev, equipmentId];
              }
              return prev;
            });
          }
        });
        
        // Очищаем localStorage после использования
        localStorage.removeItem('cartEquipment');
      } catch (error) {
        console.error('Error parsing cart equipment:', error);
        localStorage.removeItem('cartEquipment');
      }
    } else {
      // Проверяем предварительно выбранное оборудование (для обратной совместимости)
      const storedEquipment = localStorage.getItem('preSelectedEquipment');
      if (storedEquipment) {
        try {
          const equipment = JSON.parse(storedEquipment);
          setPreSelectedEquipment(equipment);
          
          // Автоматически добавляем оборудование в выбранные
          const equipmentId = mapEquipmentNameToId(equipment.name);
          if (equipmentId) {
            setSelectedEquipment(prev => {
              if (!prev.includes(equipmentId)) {
                return [...prev, equipmentId];
              }
              return prev;
            });
          }
          
          // Очищаем localStorage после использования
          localStorage.removeItem('preSelectedEquipment');
        } catch (error) {
          console.error('Error parsing pre-selected equipment:', error);
          localStorage.removeItem('preSelectedEquipment');
        }
      }
    }
  }, []);

  // Функция для сопоставления названия оборудования с ID в калькуляторе
  const mapEquipmentNameToId = (equipmentName: string): string | null => {
    const nameMapping: { [key: string]: string } = {
      'LED-панель P2.5 (indoor)': 'led-panel-p2.5',
      'LED-панель P3.9 (outdoor)': 'led-panel-p3.9',
      'Видеостена 3x3': 'videowall-3x3',
      'Мобильный LED-экран': 'mobile-led-screen',
      'Проектор 6000 ANSI': 'projector-6000',
      'Проектор 12000 ANSI': 'projector-12000',
      'Экран 3x4м': 'screen-3x4',
      'Экран 6x8м': 'screen-6x8',
      'Линейный массив': 'line-array',
      'Активная акустика': 'active-speakers',
      'Микрофонная система': 'microphone-system',
      'Микшерный пульт': 'mixing-desk',
      'Moving Head': 'moving-heads',
      'LED Par': 'led-par',
      'Стробоскопы': 'strobe-lights',
      'Лазерная установка': 'laser-system',
      'Сенсорная панель 55"': 'touch-panel',
      'Интерактивная доска': 'interactive-board',
      'Киоск-терминал': 'kiosk-terminal',
      'Голографический дисплей': 'holographic-display',
      'Медиасервер': 'media-server',
      'Видеокоммутатор': 'video-switcher',
      'Система видеоконференций': 'video-conference',
      'Контроллер освещения': 'lighting-controller'
    };
    
    return nameMapping[equipmentName] || null;
  };

  const equipmentItems: EquipmentItem[] = [
    {
      id: "led-panel-p2.5",
      name: "LED-панель P2.5 (indoor)",
      category: "Видеооборудование",
      pricePerDay: 5000,
      icon: <Tv className="h-5 w-5" />,
      description: "500x500мм, 200000 точек/м²"
    },
    {
      id: "led-panel-p3.9",
      name: "LED-панель P3.9 (outdoor)",
      category: "Видеооборудование",
      pricePerDay: 3500,
      icon: <Tv className="h-5 w-5" />,
      description: "500x1000мм, 65536 точек/м²"
    },
    {
      id: "videowall-3x3",
      name: "Видеостена 3x3",
      category: "Видеооборудование",
      pricePerDay: 25000,
      icon: <Monitor className="h-5 w-5" />,
      description: "1.5x1.5м, Full HD"
    },
    {
      id: "mobile-led-screen",
      name: "Мобильный LED-экран",
      category: "Видеооборудование",
      pricePerDay: 45000,
      icon: <Tv className="h-5 w-5" />,
      description: "6x4м, P5, трейлер"
    },
    {
      id: "projector-6000",
      name: "Проектор 6000 ANSI",
      category: "Проекционное оборудование",
      pricePerDay: 8000,
      icon: <Projector className="h-5 w-5" />,
      description: "Full HD, LCD"
    },
    {
      id: "projector-12000",
      name: "Проектор 12000 ANSI",
      category: "Проекционное оборудование",
      pricePerDay: 15000,
      icon: <Projector className="h-5 w-5" />,
      description: "4K, лазерный"
    },
    {
      id: "screen-3x4",
      name: "Экран 3x4м",
      category: "Проекционное оборудование",
      pricePerDay: 3000,
      icon: <Monitor className="h-5 w-5" />,
      description: "Fast-fold, front/rear"
    },
    {
      id: "screen-6x8",
      name: "Экран 6x8м",
      category: "Проекционное оборудование",
      pricePerDay: 8000,
      icon: <Monitor className="h-5 w-5" />,
      description: "Натяжной, seamless"
    },
    {
      id: "line-array",
      name: "Линейный массив",
      category: "Аудиооборудование",
      pricePerDay: 12000,
      icon: <Speaker className="h-5 w-5" />,
      description: "L-Acoustics KARA, 2x12"
    },
    {
      id: "active-speakers",
      name: "Активная акустика",
      category: "Аудиооборудование",
      pricePerDay: 8000,
      icon: <Speaker className="h-5 w-5" />,
      description: "JBL VTX A12, комплект"
    },
    {
      id: "microphone-system",
      name: "Микрофонная система",
      category: "Аудиооборудование",
      pricePerDay: 5000,
      icon: <Speaker className="h-5 w-5" />,
      description: "Shure ULXD, 8 каналов"
    },
    {
      id: "mixing-desk",
      name: "Микшерный пульт",
      category: "Аудиооборудование",
      pricePerDay: 6000,
      icon: <Speaker className="h-5 w-5" />,
      description: "Yamaha CL5, 72 канала"
    },
    {
      id: "moving-heads",
      name: "Moving Head",
      category: "Освещение",
      pricePerDay: 2500,
      icon: <Lightbulb className="h-5 w-5" />,
      description: "Clay Paky Sharpy Plus, 1200W"
    },
    {
      id: "led-par",
      name: "LED Par",
      category: "Освещение",
      pricePerDay: 800,
      icon: <Lightbulb className="h-5 w-5" />,
      description: "RGBW, 18x15W"
    },
    {
      id: "strobe-lights",
      name: "Стробоскопы",
      category: "Освещение",
      pricePerDay: 1500,
      icon: <Lightbulb className="h-5 w-5" />,
      description: "Atomic 3000W"
    },
    {
      id: "laser-system",
      name: "Лазерная установка",
      category: "Освещение",
      pricePerDay: 4000,
      icon: <Lightbulb className="h-5 w-5" />,
      description: "RGB 10W, ILDA"
    },
    {
      id: "touch-panel",
      name: "Сенсорная панель 55\"",
      category: "Интерактивное оборудование",
      pricePerDay: 4000,
      icon: <Monitor className="h-5 w-5" />,
      description: "4K, мультитач 20 точек"
    },
    {
      id: "interactive-board",
      name: "Интерактивная доска",
      category: "Интерактивное оборудование",
      pricePerDay: 3500,
      icon: <Monitor className="h-5 w-5" />,
      description: "SMART Board, 77\""
    },
    {
      id: "kiosk-terminal",
      name: "Киоск-терминал",
      category: "Интерактивное оборудование",
      pricePerDay: 2500,
      icon: <Cpu className="h-5 w-5" />,
      description: "32\", металлический корпус"
    },
    {
      id: "holographic-display",
      name: "Голографический дисплей",
      category: "Интерактивное оборудование",
      pricePerDay: 8000,
      icon: <Monitor className="h-5 w-5" />,
      description: "46\", 3D эффект"
    },
    {
      id: "media-server",
      name: "Медиасервер",
      category: "Системы управления",
      pricePerDay: 6000,
      icon: <Cpu className="h-5 w-5" />,
      description: "4K, 8 выходов"
    },
    {
      id: "video-switcher",
      name: "Видеокоммутатор",
      category: "Системы управления",
      pricePerDay: 3000,
      icon: <Cpu className="h-5 w-5" />,
      description: "16x16, HDMI 4K"
    },
    {
      id: "video-conference",
      name: "Система видеоконференций",
      category: "Системы управления",
      pricePerDay: 4500,
      icon: <Cpu className="h-5 w-5" />,
      description: "Poly Studio X70"
    },
    {
      id: "lighting-controller",
      name: "Контроллер освещения",
      category: "Системы управления",
      pricePerDay: 5000,
      icon: <Cpu className="h-5 w-5" />,
      description: "MA Lighting, 2048 каналов"
    }
  ];

  const serviceItems: ServiceItem[] = [
    {
      id: "delivery",
      name: "Доставка и монтаж",
      price: 15000,
      icon: <Truck className="h-5 w-5" />,
      description: "Доставка и установка оборудования"
    },
    {
      id: "technical-support",
      name: "Техническая поддержка",
      price: 8000,
      icon: <Settings className="h-5 w-5" />,
      description: "Специалист на объекте"
    },
    {
      id: "setup-calibration",
      name: "Настройка и калибровка",
      price: 5000,
      icon: <Settings className="h-5 w-5" />,
      description: "Профессиональная настройка"
    },
    {
      id: "insurance",
      name: "Страхование оборудования",
      price: 3000,
      icon: <Zap className="h-5 w-5" />,
      description: "Полная страховка на период аренды"
    }
  ];

  const handleEquipmentToggle = (equipmentId: string) => {
    setSelectedEquipment(prev => 
      prev.includes(equipmentId) 
        ? prev.filter(id => id !== equipmentId)
        : [...prev, equipmentId]
    );
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleOrderFormChange = (field: string, value: string) => {
    setOrderFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleOrderSubmit = async () => {
    if (!orderFormData.name || !orderFormData.phone || !orderFormData.eventDate) {
      alert('Пожалуйста, заполните обязательные поля');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Имитация отправки заказа
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Здесь можно добавить реальную логику отправки заказа
      console.log('Заказ отправлен:', {
        equipment: selectedEquipment,
        services: selectedServices,
        rentalDays,
        totalPrice,
        formData: orderFormData
      });
      
      // Показываем уведомление об успешной отправке
      alert('🎉 Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.');
      setIsOrderModalOpen(false);
      
      // Сбрасываем форму
      setOrderFormData({
        name: '',
        phone: '',
        email: '',
        eventDate: '',
        eventLocation: '',
        additionalInfo: ''
      });
    } catch (error) {
      alert('Произошла ошибка при отправке заказа. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openOrderModal = () => {
    if (total >= 5000) {
      // Устанавливаем минимальную дату (сегодня)
      const today = new Date().toISOString().split('T')[0];
      setOrderFormData(prev => ({
        ...prev,
        eventDate: prev.eventDate || today
      }));
      setIsOrderModalOpen(true);
    }
  };

  const calculateTotalPrice = () => {
    let equipmentCost = 0;
    let servicesCost = 0;

    // Расчет стоимости оборудования
    selectedEquipment.forEach(equipmentId => {
      const equipment = equipmentItems.find(item => item.id === equipmentId);
      if (equipment) {
        equipmentCost += equipment.pricePerDay * rentalDays;
      }
    });

    // Расчет стоимости услуг
    selectedServices.forEach(serviceId => {
      const service = serviceItems.find(item => item.id === serviceId);
      if (service) {
        servicesCost += service.price;
      }
    });

    let total = equipmentCost + servicesCost;
    
    // Применение скидок
    let discount = 0;
    let discountText = "";
    
    if (rentalDays >= 30) {
      discount = total * 0.20; // 20% скидка при аренде от 30 дней
      discountText = "Скидка 20% (аренда от 30 дней)";
    } else if (rentalDays >= 14) {
      discount = total * 0.15; // 15% скидка при аренде от 14 дней
      discountText = "Скидка 15% (аренда от 14 дней)";
    } else if (rentalDays >= 7) {
      discount = total * 0.10; // 10% скидка при аренде от 7 дней
      discountText = "Скидка 10% (аренда от 7 дней)";
    }
    
    total = total - discount;
    
    setTotalPrice(total);
    return { total, discount, discountText };
  };

  const { total, discount, discountText } = React.useMemo(() => {
    let equipmentCost = 0;
    let servicesCost = 0;

    // Расчет стоимости оборудования
    selectedEquipment.forEach(equipmentId => {
      const equipment = equipmentItems.find(item => item.id === equipmentId);
      if (equipment) {
        equipmentCost += equipment.pricePerDay * rentalDays;
      }
    });

    // Расчет стоимости услуг
    selectedServices.forEach(serviceId => {
      const service = serviceItems.find(item => item.id === serviceId);
      if (service) {
        servicesCost += service.price;
      }
    });

    let total = equipmentCost + servicesCost;
    
    // Применение скидок
    let discount = 0;
    let discountText = "";
    
    if (rentalDays >= 30) {
      discount = total * 0.20; // 20% скидка при аренде от 30 дней
      discountText = "Скидка 20% (аренда от 30 дней)";
    } else if (rentalDays >= 14) {
      discount = total * 0.15; // 15% скидка при аренде от 14 дней
      discountText = "Скидка 15% (аренда от 14 дней)";
    } else if (rentalDays >= 7) {
      discount = total * 0.10; // 10% скидка при аренде от 7 дней
      discountText = "Скидка 10% (аренда от 7 дней)";
    }
    
    total = total - discount;
    
    return { total, discount, discountText };
  }, [selectedEquipment, selectedServices, rentalDays]);

  React.useEffect(() => {
    setTotalPrice(total);
  }, [total]);

  const getEquipmentByCategory = () => {
    const categories = [...new Set(equipmentItems.map(item => item.category))];
    return categories.map(category => ({
      category,
      items: equipmentItems.filter(item => item.category === category)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Calculator className="h-4 w-4 mr-2" />
            Калькулятор аренды
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Калькулятор
            <span className="text-blue-600"> аренды оборудования</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Рассчитайте стоимость аренды интерактивного оборудования для вашего мероприятия
          </p>
        </div>

        {/* Уведомление о предварительно выбранном оборудовании */}
        {preSelectedEquipment && (
          <div className="mb-8">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Info className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      Оборудование добавлено в заказ
                    </h3>
                    <p className="text-green-700 mb-3">
                      <strong>{preSelectedEquipment.name}</strong> автоматически добавлено в ваш заказ.
                      {preSelectedEquipment.specs && (
                        <span className="block text-sm text-green-600 mt-1">
                          Характеристики: {preSelectedEquipment.specs}
                        </span>
                      )}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <span>Цена: от {preSelectedEquipment.price?.toLocaleString()} ₽/день</span>
                      <span>•</span>
                      <span>Категория: {preSelectedEquipment.category}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - Выбор оборудования и услуг */}
          <div className="lg:col-span-2 space-y-8">
            {/* Выбор количества дней */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Период аренды
                </CardTitle>
                <CardDescription>
                  Выберите количество дней для аренды оборудования
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rental-days" className="text-sm font-medium">
                    Количество дней: {rentalDays}
                  </Label>
                  <Slider
                    value={[rentalDays]}
                    onValueChange={(value) => setRentalDays(value[0])}
                    max={30}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>1 день</span>
                    <span>30 дней</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    id="rental-days"
                    type="number"
                    value={rentalDays}
                    onChange={(e) => setRentalDays(Number(e.target.value))}
                    min={1}
                    max={30}
                    className="w-20"
                  />
                  <span className="text-sm text-slate-600">дней</span>
                </div>
              </CardContent>
            </Card>

            {/* Выбор оборудования по категориям */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Monitor className="h-5 w-5 mr-2 text-blue-600" />
                    Выбор оборудования
                  </div>
                  {selectedEquipment.length > 0 && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {selectedEquipment.length} выбрано
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Отметьте необходимое оборудование для аренды
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {getEquipmentByCategory().map((categoryGroup) => (
                    <div key={categoryGroup.category} className="space-y-3">
                      <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                        {categoryGroup.category}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {categoryGroup.items.map((item) => (
                          <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                            <Checkbox
                              id={item.id}
                              checked={selectedEquipment.includes(item.id)}
                              onCheckedChange={() => handleEquipmentToggle(item.id)}
                            />
                            <div className="flex-1 min-w-0">
                              <Label 
                                htmlFor={item.id} 
                                className="text-sm font-medium text-slate-900 cursor-pointer"
                              >
                                <div className="flex items-center space-x-2">
                                  {item.icon}
                                  <span>{item.name}</span>
                                </div>
                              </Label>
                              <p className="text-xs text-slate-600 mt-1">
                                {item.description}
                              </p>
                              <p className="text-sm font-semibold text-blue-600 mt-1">
                                {item.pricePerDay.toLocaleString()} ₽/день
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Дополнительные услуги */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 mr-2 text-blue-600" />
                    Дополнительные услуги
                  </div>
                  {selectedServices.length > 0 && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {selectedServices.length} выбрано
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  Выберите дополнительные услуги для вашего мероприятия
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {serviceItems.map((service) => (
                    <div key={service.id} className="flex items-start space-x-3 p-3 rounded-lg border border-slate-200 hover:border-blue-300 transition-colors">
                      <Checkbox
                        id={service.id}
                        checked={selectedServices.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                      />
                      <div className="flex-1 min-w-0">
                        <Label 
                          htmlFor={service.id} 
                          className="text-sm font-medium text-slate-900 cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            {service.icon}
                            <span>{service.name}</span>
                          </div>
                        </Label>
                        <p className="text-xs text-slate-600 mt-1">
                          {service.description}
                        </p>
                        <p className="text-sm font-semibold text-blue-600 mt-1">
                          {service.price.toLocaleString()} ₽
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Правая колонка - Итоговый расчет */}
          <div className="space-y-6">
            {/* Карточка с итоговым расчетом */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center text-white font-bold text-xl">
                  <DollarSign className="h-6 w-6 mr-3" />
                  Итоговый расчет
                </CardTitle>
                <CardDescription className="text-blue-100 text-base font-medium">
                  Стоимость аренды на {rentalDays} {rentalDays === 1 ? 'день' : rentalDays < 5 ? 'дня' : 'дней'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Детализация стоимости */}
                <div className="space-y-3">
                  {selectedEquipment.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white">Оборудование:</h4>
                      {selectedEquipment.map(equipmentId => {
                        const equipment = equipmentItems.find(item => item.id === equipmentId);
                        if (!equipment) return null;
                        const totalCost = equipment.pricePerDay * rentalDays;
                        return (
                          <div key={equipmentId} className="flex justify-between text-sm">
                            <span className="text-blue-100">{equipment.name}</span>
                            <span className="font-semibold text-white">{totalCost.toLocaleString()} ₽</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {selectedServices.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-white">Услуги:</h4>
                      {selectedServices.map(serviceId => {
                        const service = serviceItems.find(item => item.id === serviceId);
                        if (!service) return null;
                        return (
                          <div key={serviceId} className="flex justify-between text-sm">
                            <span className="text-blue-100">{service.name}</span>
                            <span className="font-semibold text-white">{service.price.toLocaleString()} ₽</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Итоговая сумма */}
                <div className="border-t border-blue-500 pt-4">
                  {discount > 0 && (
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between items-center text-sm text-blue-200">
                        <span>Базовая стоимость:</span>
                        <span className="line-through text-blue-200">{(total + discount).toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-green-300 font-semibold">
                        <span>Скидка:</span>
                        <span>-{discount.toLocaleString()} ₽</span>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-lg font-bold text-white">
                    <span>Итого:</span>
                    <span className="text-2xl text-white">{total.toLocaleString()} ₽</span>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="space-y-3 pt-4">
                  <Button 
                    className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none font-bold text-lg py-6 ${
                      total >= 5000 ? 'animate-pulse' : ''
                    }`}
                    size="lg"
                    disabled={total < 5000}
                    onClick={openOrderModal}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    {total < 5000 ? 'Минимум 5,000 ₽' : 'Заказать аренду'}
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                  
                  {/* Подсказка для кнопки заказа */}
                  {total >= 5000 && (
                    <div className="text-center">
                      <p className="text-xs text-blue-100">
                        💡 Нажмите для оформления заказа
                      </p>
                    </div>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 bg-transparent font-semibold"
                    size="lg"
                  >
                    Получить консультацию
                  </Button>
                  {(selectedEquipment.length > 0 || selectedServices.length > 0) && (
                    <Button 
                      variant="outline" 
                      className="w-full border-2 border-white/30 text-white/90 hover:bg-white/20 hover:border-white/50 hover:text-white bg-transparent font-medium"
                      size="sm"
                      onClick={() => {
                        setSelectedEquipment([]);
                        setSelectedServices([]);
                      }}
                    >
                      Сбросить выбор
                    </Button>
                  )}
                </div>

                {/* Информация о скидках */}
                {discountText && (
                  <div className="bg-blue-500/20 rounded-lg p-3 text-center border border-blue-400/30">
                    <p className="text-sm text-white font-semibold">
                      🎉 {discountText}
                    </p>
                    <p className="text-xs text-blue-100 mt-1">
                      Экономия: {discount.toLocaleString()} ₽
                    </p>
                  </div>
                )}
                
                {/* Информация о скидках при отсутствии выбранных товаров */}
                {selectedEquipment.length === 0 && (
                  <div className="bg-blue-500/10 rounded-lg p-3 text-center border border-blue-400/30">
                    <p className="text-sm text-blue-100 font-medium">
                      💡 Выберите оборудование для расчета стоимости
                    </p>
                  </div>
                )}
                
                {/* Предупреждение о минимальной стоимости */}
                {total > 0 && total < 5000 && (
                  <div className="bg-yellow-500/20 rounded-lg p-3 text-center border border-yellow-400/30">
                    <p className="text-sm text-yellow-100 font-semibold">
                      ⚠️ Минимальная стоимость заказа: 5,000 ₽
                    </p>
                    <p className="text-xs text-yellow-200 mt-1">
                      Добавьте еще оборудования или услуг
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Информационная карточка */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800">Информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Минимальный срок аренды: 1 день</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Доставка по Москве и области</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Техническая поддержка включена</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Скидки при долгосрочной аренде</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Минимальная стоимость заказа: 5,000 ₽</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Бронирование за 3 дня до мероприятия</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Модальное окно заказа */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Заголовок */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Оформить заказ</h2>
                    <p className="text-slate-600">Заполните форму для заказа аренды оборудования</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOrderModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </Button>
              </div>

              {/* Сводка заказа */}
              <div className="bg-slate-50 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  Сводка заказа
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Период аренды:</span>
                    <span className="font-medium text-slate-900 ml-2">{rentalDays} {rentalDays === 1 ? 'день' : rentalDays < 5 ? 'дня' : 'дней'}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Оборудование:</span>
                    <span className="font-medium text-slate-900 ml-2">{selectedEquipment.length} позиций</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Услуги:</span>
                    <span className="font-medium text-slate-900 ml-2">{selectedServices.length} позиций</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Итого:</span>
                    <span className="font-bold text-green-600 text-lg ml-2">{total.toLocaleString()} ₽</span>
                  </div>
                </div>
              </div>

              {/* Форма заказа */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-slate-700">Имя *</Label>
                    <Input
                      id="name"
                      value={orderFormData.name}
                      onChange={(e) => handleOrderFormChange('name', e.target.value)}
                      placeholder="Ваше имя"
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700">Телефон *</Label>
                    <Input
                      id="phone"
                      value={orderFormData.phone}
                      onChange={(e) => handleOrderFormChange('phone', e.target.value)}
                      placeholder="+7 (999) 123-45-67"
                      className="mt-1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={orderFormData.email}
                    onChange={(e) => handleOrderFormChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventDate" className="text-sm font-medium text-slate-700">Дата мероприятия *</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={orderFormData.eventDate}
                      onChange={(e) => handleOrderFormChange('eventDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventLocation" className="text-sm font-medium text-slate-700">Место проведения</Label>
                    <Input
                      id="eventLocation"
                      value={orderFormData.eventLocation}
                      onChange={(e) => handleOrderFormChange('eventLocation', e.target.value)}
                      placeholder="Адрес или название места"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalInfo" className="text-sm font-medium text-slate-700">Дополнительная информация</Label>
                  <textarea
                    id="additionalInfo"
                    value={orderFormData.additionalInfo}
                    onChange={(e) => handleOrderFormChange('additionalInfo', e.target.value)}
                    placeholder="Особые требования, пожелания..."
                    className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  />
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button
                  onClick={handleOrderSubmit}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3"
                  disabled={!orderFormData.name || !orderFormData.phone || !orderFormData.eventDate || isSubmitting}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <CheckCircle className="h-5 w-5 mr-2" />
                  )}
                  {isSubmitting ? 'Отправка...' : 'Отправить заказ'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsOrderModalOpen(false)}
                  className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Отмена
                </Button>
              </div>

              {/* Контактная информация */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>+7 (495) 123-45-67</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>info@weshow.ru</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentRentalCalculator;
