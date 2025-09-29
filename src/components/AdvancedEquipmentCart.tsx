import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  X, 
  Trash2, 
  Calculator, 
  Package,
  ArrowRight,
  Info,
  AlertTriangle,
  Calendar,
  MapPin,
  Settings,
  Plus,
  Minus,
  Clock,
  Truck,
  Wrench,
  Headphones
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdvancedCart } from "../hooks/useAdvancedCart";
import { TouchButton, TouchCard } from "./TouchFriendlyComponents";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { cn } from "../lib/utils";
import type { CartItem, PricingCalculation } from "../types/equipment";
import { useResponsive } from "../hooks/useResponsive";

interface AdvancedEquipmentCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdvancedEquipmentCart: React.FC<AdvancedEquipmentCartProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setRentalPeriod,
    setServices,
    calculateFullPrice,
    validateCart,
    isLoading,
    error
  } = useAdvancedCart();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Инициализация дат по умолчанию
  useEffect(() => {
    if (isOpen && !cart.rentalPeriod) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date();
      dayAfter.setDate(dayAfter.getDate() + 2);
      
      setStartDate(tomorrow.toISOString().split('T')[0]);
      setEndDate(dayAfter.toISOString().split('T')[0]);
    }
  }, [isOpen, cart.rentalPeriod]);

  // Обработка установки периода аренды
  const handleSetRentalPeriod = () => {
    if (startDate && endDate) {
      const start = new Date(startDate + 'T00:00:00');
      const end = new Date(endDate + 'T23:59:59');
      
      if (start >= end) {
        return; // Можно показать ошибку
      }
      
      setRentalPeriod(start, end);
      setShowDatePicker(false);
    }
  };

  // Обработка изменения услуг
  const handleServiceChange = (service: keyof NonNullable<typeof cart.services>, value: boolean) => {
    setServices({
      ...cart.services,
      [service]: value
    });
  };

  // Переход к оформлению заказа
  const handleProceedToCheckout = () => {
    const validation = validateCart();
    if (validation.isValid) {
      navigate('/checkout');
      onClose();
    }
  };

  // Расчет полной стоимости
  const pricing = calculateFullPrice();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        >
          {/* Заголовок */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingCart className="h-6 w-6" />
                <div>
                  <h2 className="text-xl font-bold">Корзина оборудования</h2>
                  <p className="text-sm text-white/80">
                    {cart.totalItems > 0 
                      ? `Выбрано ${cart.totalItems} ${cart.totalItems === 1 ? 'позиция' : cart.totalItems < 5 ? 'позиции' : 'позиций'}` 
                      : 'Добавьте оборудование для аренды'
                    }
                  </p>
                </div>
                {cart.totalItems > 0 && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {cart.totalItems}
                  </Badge>
                )}
              </div>
              
              <TouchButton
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </TouchButton>
            </div>
          </div>

          {/* Контент */}
          <div className="flex flex-col max-h-[70vh]">
            {cart.items.length === 0 ? (
              /* Пустая корзина */
              <div className="flex-1 p-6 text-center">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Ваша корзина пуста
                </h3>
                <p className="text-gray-500 mb-6">
                  Добавьте оборудование из каталога для начала работы
                </p>
                
                <TouchButton
                  variant="primary"
                  onClick={() => {
                    onClose();
                    navigate('/equipment');
                  }}
                  fullWidth
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Перейти к каталогу
                </TouchButton>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                {/* Список товаров */}
                <div className="p-6 space-y-4">
                  <AnimatePresence mode="popLayout">
                    {cart.items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CartItemCard
                          item={item}
                          onUpdateQuantity={updateQuantity}
                          onRemove={removeFromCart}
                          isLoading={isLoading}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <Separator />

                {/* Период аренды */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Период аренды
                    </h3>
                    {cart.rentalPeriod && (
                      <Badge variant="secondary">
                        {cart.rentalPeriod.days} дней
                      </Badge>
                    )}
                  </div>

                  {cart.rentalPeriod ? (
                    <div className="bg-blue-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <div className="text-gray-600">С {cart.rentalPeriod.startDate.toLocaleDateString('ru')}</div>
                          <div className="text-gray-600">По {cart.rentalPeriod.endDate.toLocaleDateString('ru')}</div>
                        </div>
                        <TouchButton
                          variant="outline"
                          size="sm"
                          onClick={() => setShowDatePicker(true)}
                        >
                          Изменить
                        </TouchButton>
                      </div>
                    </div>
                  ) : showDatePicker ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Начало
                          </label>
                          <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Окончание
                          </label>
                          <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <TouchButton
                          variant="outline"
                          size="sm"
                          onClick={() => setShowDatePicker(false)}
                          className="flex-1"
                        >
                          Отмена
                        </TouchButton>
                        <TouchButton
                          variant="primary"
                          size="sm"
                          onClick={handleSetRentalPeriod}
                          className="flex-1"
                        >
                          Применить
                        </TouchButton>
                      </div>
                    </div>
                  ) : (
                    <TouchButton
                      variant="outline"
                      onClick={() => setShowDatePicker(true)}
                      fullWidth
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Выбрать даты
                    </TouchButton>
                  )}
                </div>

                <Separator />

                {/* Дополнительные услуги */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    Дополнительные услуги
                  </h3>
                  
                  <div className="space-y-3">
                    <ServiceToggle
                      icon={Truck}
                      title="Доставка"
                      description="Доставка и самовывоз оборудования"
                      checked={cart.services?.delivery ?? false}
                      onChange={(checked) => handleServiceChange('delivery', checked)}
                    />
                    
                    <ServiceToggle
                      icon={Wrench}
                      title="Установка и настройка"
                      description="Монтаж и настройка оборудования на площадке"
                      checked={cart.services?.setup ?? false}
                      onChange={(checked) => handleServiceChange('setup', checked)}
                    />
                    
                    <ServiceToggle
                      icon={Headphones}
                      title="Техническая поддержка"
                      description="Консультации и техподдержка во время мероприятия"
                      checked={cart.services?.support ?? false}
                      onChange={(checked) => handleServiceChange('support', checked)}
                    />
                  </div>
                </div>

                {/* Расчет стоимости */}
                {pricing && (
                  <>
                    <Separator />
                    <div className="p-6">
                      <PricingBreakdown pricing={pricing} />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Подвал */}
          {cart.items.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <TouchButton
                  variant="outline"
                  onClick={clearCart}
                  className="sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Очистить
                </TouchButton>
                
                <TouchButton
                  variant="primary"
                  onClick={handleProceedToCheckout}
                  disabled={!cart.rentalPeriod || isLoading}
                  className="flex-1"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Calculator className="h-4 w-4 mr-2" />
                  )}
                  Оформить заказ
                  <ArrowRight className="h-4 w-4 ml-2" />
                </TouchButton>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Компонент карточки товара в корзине
interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  isLoading: boolean;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemove, 
  isLoading 
}) => {
  const { isMobile } = useResponsive();
  
  return (
    <TouchCard className="p-4">
      <div className="flex items-start gap-4">
        {/* Изображение */}
        {item.image && (
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Информация */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 mb-1 line-clamp-1">
            {item.name}
          </h4>
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            {item.specifications}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="secondary">{item.category}</Badge>
            <span className="font-semibold text-blue-600">
              {item.price.toLocaleString()} ₽/день
            </span>
          </div>
        </div>
        
        {/* Управление количеством */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1">
            <TouchButton
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={isLoading}
              className="w-8 h-8 p-0"
            >
              <Minus className="w-3 h-3" />
            </TouchButton>
            
            <span className="w-8 text-center font-medium text-sm">
              {item.quantity}
            </span>
            
            <TouchButton
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={isLoading}
              className="w-8 h-8 p-0"
            >
              <Plus className="w-3 h-3" />
            </TouchButton>
          </div>
          
          {/* Стоимость позиции */}
          <div className="text-right">
            <div className="font-semibold text-gray-900 text-sm">
              {(item.price * item.quantity).toLocaleString()} ₽
            </div>
          </div>
          
          {/* Кнопка удаления */}
          <TouchButton
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <Trash2 className="h-4 w-4" />
          </TouchButton>
        </div>
      </div>
    </TouchCard>
  );
};

// Компонент переключателя услуг
interface ServiceToggleProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ServiceToggle: React.FC<ServiceToggleProps> = ({
  icon: Icon,
  title,
  description,
  checked,
  onChange
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-gray-600" />
        </div>
        <div>
          <div className="font-medium text-gray-900 text-sm">{title}</div>
          <div className="text-xs text-gray-600">{description}</div>
        </div>
      </div>
      
      <Switch
        checked={checked}
        onCheckedChange={onChange}
      />
    </div>
  );
};

// Компонент разбивки стоимости
interface PricingBreakdownProps {
  pricing: PricingCalculation;
}

const PricingBreakdown: React.FC<PricingBreakdownProps> = ({ pricing }) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">Расчет стоимости</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Оборудование ({pricing.rentalDays} дней)
          </span>
          <span>{pricing.priceBreakdown.equipment.toLocaleString()} ₽</span>
        </div>
        
        {pricing.priceBreakdown.delivery > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Доставка</span>
            <span>{pricing.priceBreakdown.delivery.toLocaleString()} ₽</span>
          </div>
        )}
        
        {pricing.priceBreakdown.setup > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Установка</span>
            <span>{pricing.priceBreakdown.setup.toLocaleString()} ₽</span>
          </div>
        )}
        
        {pricing.priceBreakdown.support && pricing.priceBreakdown.support > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Поддержка</span>
            <span>{pricing.priceBreakdown.support.toLocaleString()} ₽</span>
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
    </div>
  );
};

export default AdvancedEquipmentCart;