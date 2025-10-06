import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle,
  Calendar,
  MapPin,
  CreditCard,
  User,
  Package,
  Building2,
  Phone,
  Mail,
  FileText,
  Check,
  Shield
} from 'lucide-react';
import { TouchButton, TouchInput, TouchCard, TouchCheckbox } from '../components/TouchFriendlyComponents';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useAdvancedCart } from '../hooks/useAdvancedCart';
import { useResponsive } from '../hooks/useResponsive';
// import { useOrdersAPI } from '../api/orders';
// import type { PricingCalculation } from '../types/equipment';
import { cn } from '../lib/utils';

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  address: {
    street: string;
    city: string;
    postalCode?: string;
    apartment?: string;
  };
  eventName?: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

const PAYMENT_METHODS = [
  { id: 'card', name: 'Банковская карта', description: 'Visa, MasterCard, МИР', icon: CreditCard },
  { id: 'bank_transfer', name: 'Банковский перевод', description: 'По реквизитам', icon: Building2 },
  { id: 'cash', name: 'Наличные', description: 'При доставке', icon: User }
] as const;

type PaymentMethod = typeof PAYMENT_METHODS[number]['id'];

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const { cart, calculateFullPrice, validateCart, clearCart } = useAdvancedCart();
  // const { createOrder } = useOrdersAPI();
  const createOrder = async () => ({ success: true });

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    address: { street: '', city: '' },
    eventName: '',
    agreeTerms: false,
    agreePrivacy: false
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('selectedServices') || '[]');
    } catch {
      return [];
    }
  });

  // Сохраняем выбранные услуги в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
  }, [selectedServices]);

  // Проверка корзины при загрузке
  useEffect(() => {
    console.log('CheckoutPage: Проверка корзины', {
      cartItems: cart.items.length,
      cartTotal: cart.totalItems,
      cartData: cart
    });
    
    const validation = validateCart();
    console.log('CheckoutPage: Валидация корзины', validation);
    
    // Временно отключаем перенаправление для тестирования
    // if (!validation.isValid || cart.items.length === 0) {
    //   console.log('CheckoutPage: Перенаправление на /equipment из-за пустой корзины');
    //   navigate('/equipment');
    // }
  }, [cart, validateCart, navigate]);

  const pricing = calculateFullPrice();

  const steps = [
    { id: 1, name: 'Контакты', icon: User, completed: currentStep > 1 },
    { id: 2, name: 'Доставка', icon: MapPin, completed: currentStep > 2 },
    { id: 3, name: 'Оплата', icon: CreditCard, completed: currentStep > 3 },
    { id: 4, name: 'Подтверждение', icon: CheckCircle, completed: false }
  ];

  const updateFormData = (updates: Partial<CheckoutFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) errors.firstName = 'Введите имя';
        if (!formData.lastName.trim()) errors.lastName = 'Введите фамилию';
        if (!formData.email.trim()) errors.email = 'Введите email';
        if (!formData.phone.trim()) errors.phone = 'Введите телефон';
        break;
      case 2:
        if (!formData.address.street.trim()) errors['address.street'] = 'Введите адрес';
        if (!formData.address.city.trim()) errors['address.city'] = 'Введите город';
        break;
      case 3:
        if (!formData.agreeTerms) errors.agreeTerms = 'Необходимо согласие с условиями';
        if (!formData.agreePrivacy) errors.agreePrivacy = 'Необходимо согласие с обработкой данных';
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const submitOrder = async () => {
    if (!validateStep(3) || !pricing) return;

    setIsSubmitting(true);
    
    try {
      // Получаем выбранные услуги из localStorage
      const orderComment = localStorage.getItem('orderComment') || '';

      // Подготавливаем данные заказа
      const orderData = {
        items: cart.items.map(item => ({
          equipmentId: item.equipmentId,
          name: item.equipment.name,
          category: item.equipment.category || 'other',
          price: item.equipment.priceValue || 0,
          quantity: item.quantity,
          totalPrice: (item.equipment.priceValue || 0) * item.quantity
        })),
        services: [
          { id: 'technical_support', name: 'Техническое сопровождение', price: 5000, required: false },
          { id: 'logistics', name: 'Логистика (Доставка/Забор)', price: 3000, required: true },
          { id: 'installation', name: 'Монтаж/Демонтаж', price: 4000, required: false }
        ].filter(service => selectedServices.includes(service.id)),
        contact: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company
        },
        address: formData.address,
        eventName: formData.eventName,
        comment: orderComment,
        rentalPeriod: {
          startDate: cart.rentalPeriod?.startDate?.toISOString() || new Date().toISOString(),
          endDate: cart.rentalPeriod?.endDate?.toISOString() || new Date().toISOString(),
          days: pricing.rentalDays
        },
        pricing: {
          equipmentTotal: pricing.priceBreakdown.equipment,
          servicesTotal: (selectedServices.includes('logistics') ? 3000 : 0) + 
                        (selectedServices.includes('installation') ? 4000 : 0) + 
                        (selectedServices.includes('technical_support') ? 5000 : 0),
          totalPrice: pricing.priceBreakdown.equipment + 
                     (selectedServices.includes('logistics') ? 3000 : 0) + 
                     (selectedServices.includes('installation') ? 4000 : 0) + 
                     (selectedServices.includes('technical_support') ? 5000 : 0)
        },
        paymentMethod: selectedPaymentMethod
      };

      // Отправляем заказ
      const result = await createOrder(orderData);
      
      if (result.success) {
        // Очищаем корзину и localStorage
        clearCart();
        localStorage.removeItem('selectedServices');
        localStorage.removeItem('orderComment');
        
        // Переходим на страницу успеха
        navigate('/order-success', { 
          state: { 
            orderId: result.orderId,
            message: 'Спасибо за заказ! Мы свяжемся с вами в ближайшее время для уточнения деталей и подтверждения.'
          }
        });
      } else {
        throw new Error(result.error || 'Ошибка при создании заказа');
      }
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      alert('Ошибка при оформлении заказа. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Проверка на пустую корзину
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Корзина пуста</h2>
          <p className="text-gray-600 mb-6">Добавьте товары в корзину для оформления заказа</p>
          <TouchButton onClick={() => navigate('/equipment')}>
            Перейти к каталогу
          </TouchButton>
        </div>
      </div>
    );
  }

  if (!pricing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <TouchButton onClick={() => navigate('/cart')}>
          Вернуться к корзине
        </TouchButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <TouchButton
                variant="ghost"
                size="sm"
                onClick={() => navigate('/cart')}
              >
                <ArrowLeft className="h-4 w-4" />
                {!isMobile && <span className="ml-2">Назад</span>}
              </TouchButton>
              <h1 className="text-xl font-bold text-gray-900">
                Оформление заказа
              </h1>
            </div>
            
            {/* Индикатор шагов */}
            <div className="hidden md:flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    step.completed
                      ? "bg-green-100 text-green-600"
                      : step.id === currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-400"
                  )}>
                    {step.completed ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-8 h-0.5 bg-gray-200 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основная форма */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {/* Шаги формы здесь... */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Дополнительные услуги */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Package className="w-5 h-5 mr-2" />
                        Дополнительные услуги
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="logistics"
                              checked={selectedServices.includes('logistics')}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedServices(prev => [...prev, 'logistics']);
                                } else {
                                  setSelectedServices(prev => prev.filter(s => s !== 'logistics'));
                                }
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <div>
                              <label htmlFor="logistics" className="font-medium">Доставка и логистика</label>
                              <p className="text-sm text-gray-500">Доставка оборудования на объект</p>
                            </div>
                          </div>
                          <span className="font-semibold text-blue-600">3,000 ₽</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="installation"
                              checked={selectedServices.includes('installation')}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedServices(prev => [...prev, 'installation']);
                                } else {
                                  setSelectedServices(prev => prev.filter(s => s !== 'installation'));
                                }
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <div>
                              <label htmlFor="installation" className="font-medium">Монтаж и демонтаж</label>
                              <p className="text-sm text-gray-500">Установка и настройка оборудования</p>
                            </div>
                          </div>
                          <span className="font-semibold text-blue-600">4,000 ₽</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id="technical_support"
                              checked={selectedServices.includes('technical_support')}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedServices(prev => [...prev, 'technical_support']);
                                } else {
                                  setSelectedServices(prev => prev.filter(s => s !== 'technical_support'));
                                }
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <div>
                              <label htmlFor="technical_support" className="font-medium">Техническое сопровождение</label>
                              <p className="text-sm text-gray-500">Поддержка во время мероприятия</p>
                            </div>
                          </div>
                          <span className="font-semibold text-blue-600">5,000 ₽</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Контактная информация */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Контактная информация
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <TouchInput
                          label="Имя *"
                          value={formData.firstName}
                          onChange={(e) => updateFormData({ firstName: e.target.value })}
                          error={validationErrors.firstName}
                        />
                        <TouchInput
                          label="Фамилия *"
                          value={formData.lastName}
                          onChange={(e) => updateFormData({ lastName: e.target.value })}
                          error={validationErrors.lastName}
                        />
                      </div>
                      
                      <TouchInput
                        label="Email *"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData({ email: e.target.value })}
                        error={validationErrors.email}
                        icon={Mail}
                      />
                      
                      <TouchInput
                        label="Телефон *"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData({ phone: e.target.value })}
                        error={validationErrors.phone}
                        icon={Phone}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Навигация */}
            <div className="flex justify-between">
              <TouchButton
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </TouchButton>
              
              {currentStep < 4 ? (
                <TouchButton onClick={nextStep}>
                  Далее
                </TouchButton>
              ) : (
                <TouchButton
                  variant="primary"
                  onClick={submitOrder}
                  disabled={isSubmitting}
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Оформляем...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Подтвердить заказ
                    </>
                  )}
                </TouchButton>
              )}
            </div>
          </div>

          {/* Сводка заказа */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Сводка заказа</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  {/* Список товаров */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Товары в заказе:</h4>
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">
                            {item.selectedQuantity} шт. × {item.price_per_day ? item.price_per_day.toLocaleString() : 'Цена не указана'} ₽/день
                          </p>
                        </div>
                        <div className="text-sm font-medium">
                          {item.totalPrice.toLocaleString()} ₽
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span>Оборудование ({pricing.rentalDays} дн.)</span>
                    <span>{pricing.priceBreakdown.equipment.toLocaleString()} ₽</span>
                  </div>
                  
                  {selectedServices.includes('logistics') && (
                    <div className="flex justify-between">
                      <span>Доставка</span>
                      <span>3,000 ₽</span>
                    </div>
                  )}
                  
                  {selectedServices.includes('installation') && (
                    <div className="flex justify-between">
                      <span>Установка</span>
                      <span>4,000 ₽</span>
                    </div>
                  )}
                  
                  {selectedServices.includes('technical_support') && (
                    <div className="flex justify-between">
                      <span>Техподдержка</span>
                      <span>5,000 ₽</span>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Итого:</span>
                  <span className="text-blue-600">
                    {(pricing.priceBreakdown.equipment + 
                     (selectedServices.includes('logistics') ? 3000 : 0) + 
                     (selectedServices.includes('installation') ? 4000 : 0) + 
                     (selectedServices.includes('technical_support') ? 5000 : 0)
                    ).toLocaleString()} ₽
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;