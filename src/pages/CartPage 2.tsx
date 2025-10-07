import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Calendar,
  MapPin,
  CreditCard,
  CheckCircle,
  Wrench,
  Truck,
  Settings
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { useAdvancedCart } from '../hooks/useAdvancedCart';
import { useResponsive } from '../hooks/useResponsive';
import type { PricingCalculation } from '../types/equipment';

interface AdditionalService {
  id: string;
  name: string;
  description: string;
  price: number;
  required: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

const ADDITIONAL_SERVICES: AdditionalService[] = [
  {
    id: 'technical_support',
    name: 'Техническое сопровождение',
    description: 'Настройка и поддержка оборудования во время мероприятия',
    price: 5000,
    required: false,
    icon: Wrench
  },
  {
    id: 'logistics',
    name: 'Логистика (Доставка/Забор)',
    description: 'Доставка оборудования на место и обратный забор',
    price: 3000,
    required: true,
    icon: Truck
  },
  {
    id: 'installation',
    name: 'Монтаж/Демонтаж',
    description: 'Установка и демонтаж оборудования',
    price: 4000,
    required: false,
    icon: Settings
  }
];

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const { cart, removeFromCart, updateQuantity, clearCart, calculateFullPrice } = useAdvancedCart();
  
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set(['logistics']));
  const [comment, setComment] = useState('');
  const [pricing, setPricing] = useState<PricingCalculation | null>(null);

  // Пересчитываем цену при изменении корзины
  useEffect(() => {
    const newPricing = calculateFullPrice();
    setPricing(newPricing);
  }, [cart, calculateFullPrice]);

  const handleServiceToggle = (serviceId: string) => {
    const newSelected = new Set(selectedServices);
    if (newSelected.has(serviceId)) {
      newSelected.delete(serviceId);
    } else {
      newSelected.add(serviceId);
    }
    setSelectedServices(newSelected);
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    console.log('CartPage: Начинаем оформление заказа', {
      cartItems: cart.items.length,
      selectedServices: Array.from(selectedServices),
      comment
    });
    
    // Устанавливаем период аренды по умолчанию, если не установлен
    if (!cart.rentalPeriod) {
      console.log('CartPage: Устанавливаем период аренды по умолчанию');
      setRentalPeriod({
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // +7 дней
        days: 7
      });
    }
    
    // Сохраняем выбранные услуги в localStorage для страницы оформления
    localStorage.setItem('selectedServices', JSON.stringify(Array.from(selectedServices)));
    localStorage.setItem('orderComment', comment);
    
    // Обновляем корзину с выбранными услугами
    const services = {
      delivery: selectedServices.has('logistics'),
      setup: selectedServices.has('installation'),
      support: selectedServices.has('technical_support')
    };
    
    console.log('CartPage: Переходим на /checkout');
    console.log('CartPage: Состояние корзины перед переходом:', {
      items: cart.items.length,
      totalItems: cart.totalItems,
      cart
    });
    
    // Небольшая задержка, чтобы корзина успела обновиться
    setTimeout(() => {
      console.log('CartPage: Выполняем переход на /checkout');
      navigate('/checkout');
    }, 100);
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h2>
            <p className="text-gray-600 mb-6">
              Добавьте оборудование в корзину, чтобы оформить заказ
            </p>
            <Button onClick={() => navigate('/equipment')} className="w-full">
              Перейти к каталогу
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Назад</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
              <p className="text-gray-600">
                {cart.totalItems} {cart.totalItems === 1 ? 'товар' : 'товаров'} в корзине
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Товары в корзине */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Оборудование</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.items.map((item) => (
                  <motion.div
                    key={item.equipmentId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="h-8 w-8 text-gray-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.equipment.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {item.equipment.category}
                      </p>
                      <p className="text-sm font-medium text-blue-600">
                        {item.equipment.priceValue?.toLocaleString()} ₽/день
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.equipmentId, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.equipmentId, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {(item.equipment.priceValue || 0) * item.quantity} ₽
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.equipmentId)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Дополнительные услуги */}
            <Card>
              <CardHeader>
                <CardTitle>Дополнительные услуги</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ADDITIONAL_SERVICES.map((service) => {
                  const Icon = service.icon;
                  const isSelected = selectedServices.has(service.id);
                  
                  return (
                    <div
                      key={service.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleServiceToggle(service.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-gray-900">{service.name}</h3>
                              {service.required && (
                                <Badge variant="secondary" className="text-xs">
                                  Обязательно
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {service.price.toLocaleString()} ₽
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Комментарий к заказу */}
            <Card>
              <CardHeader>
                <CardTitle>Комментарий к заказу</CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Дополнительные пожелания или требования к заказу..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </CardContent>
            </Card>
          </div>

          {/* Сводка заказа */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Сводка заказа</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pricing && (
                  <>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Оборудование ({pricing.rentalDays} дн.)</span>
                        <span>{pricing.priceBreakdown.equipment.toLocaleString()} ₽</span>
                      </div>
                      
                      {selectedServices.has('logistics') && (
                        <div className="flex justify-between">
                          <span>Доставка</span>
                          <span>3,000 ₽</span>
                        </div>
                      )}
                      
                      {selectedServices.has('installation') && (
                        <div className="flex justify-between">
                          <span>Монтаж</span>
                          <span>4,000 ₽</span>
                        </div>
                      )}
                      
                      {selectedServices.has('technical_support') && (
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
                        {(pricing.totalPrice + 
                          (selectedServices.has('logistics') ? 3000 : 0) +
                          (selectedServices.has('installation') ? 4000 : 0) +
                          (selectedServices.has('technical_support') ? 5000 : 0)
                        ).toLocaleString()} ₽
                      </span>
                    </div>
                  </>
                )}

                <Button
                  onClick={handleCheckout}
                  className="w-full mt-6"
                  size="lg"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Оформить заказ
                </Button>

                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full"
                >
                  Очистить корзину
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
