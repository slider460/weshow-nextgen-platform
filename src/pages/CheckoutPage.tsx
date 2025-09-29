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
import type { PricingCalculation } from '../types/equipment';
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

  // Проверка корзины при загрузке
  useEffect(() => {
    const validation = validateCart();
    if (!validation.isValid || cart.items.length === 0) {
      navigate('/equipment');
    }
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
                >
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
                  <div className="flex justify-between">
                    <span>Оборудование ({pricing.rentalDays} дн.)</span>
                    <span>{pricing.priceBreakdown.equipment.toLocaleString()} ₽</span>
                  </div>
                  
                  {pricing.priceBreakdown.delivery > 0 && (
                    <div className="flex justify-between">
                      <span>Доставка</span>
                      <span>{pricing.priceBreakdown.delivery.toLocaleString()} ₽</span>
                    </div>
                  )}
                  
                  {pricing.priceBreakdown.setup > 0 && (
                    <div className="flex justify-between">
                      <span>Установка</span>
                      <span>{pricing.priceBreakdown.setup.toLocaleString()} ₽</span>
                    </div>
                  )}
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Итого:</span>
                  <span className="text-blue-600">
                    {pricing.totalPrice.toLocaleString()} ₽
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