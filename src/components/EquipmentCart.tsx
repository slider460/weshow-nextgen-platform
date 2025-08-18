import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ShoppingCart, 
  X, 
  Trash2, 
  Calculator, 
  Package,
  ArrowRight,
  Info,
  AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEquipmentCart } from "@/hooks/useEquipmentCart";

interface EquipmentCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const EquipmentCart: React.FC<EquipmentCartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, forceClearCart, loadCart } = useEquipmentCart();
  const navigate = useNavigate();

  // Принудительно загружаем корзину при открытии
  useEffect(() => {
    if (isOpen) {
      // Небольшая задержка для гарантии загрузки
      const timer = setTimeout(() => {
        loadCart();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, loadCart]);

  // Хук автоматически загружает корзину при изменении

  // Переход в калькулятор с выбранным оборудованием
  const goToCalculator = () => {
    if (cartItems.length === 0) return;
    
    // Сохраняем выбранное оборудование для калькулятора
    const selectedEquipment = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      specs: item.specs,
      quantity: item.quantity
    }));
    
    localStorage.setItem('cartEquipment', JSON.stringify(selectedEquipment));
    
    // Переходим в калькулятор
    navigate('/services/equipment-calculation');
    onClose();
  };

  // Расчет общей стоимости
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999999] flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl relative z-[999999]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingCart className="h-6 w-6" />
              <div>
                <h2 className="text-xl font-bold">Корзина оборудования</h2>
                <p className="text-sm text-white/80">
                  {totalItems > 0 
                    ? `Выбрано товаров: ${totalItems}` 
                    : 'Выберите оборудование для аренды'
                  }
                </p>
              </div>
              {totalItems > 0 && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {totalItems} {totalItems === 1 ? 'позиция' : totalItems < 5 ? 'позиции' : 'позиций'}
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Ваша корзина пуста
              </h3>
              <p className="text-gray-500 mb-4">
                Здесь будут отображаться выбранные товары для аренды
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center space-x-2 text-blue-700">
                  <Info className="h-4 w-4" />
                  <span className="text-sm font-medium">Как добавить товары?</span>
                </div>
                <div className="text-xs text-blue-600 mt-2 space-y-1">
                  <div>• Перейдите в раздел "Оборудование"</div>
                  <div>• Выберите нужные позиции</div>
                  <div>• Нажмите "В корзину"</div>
                </div>
              </div>
              
              {/* Кнопка перехода к оборудованию */}
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  onClose();
                  window.location.href = '/equipment';
                }}
                className="w-full"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Перейти к оборудованию
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.specs}
                        </p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-gray-500">
                            Категория: {item.category}
                          </span>
                          <span className="font-semibold text-blue-600">
                            {item.price.toLocaleString()} ₽/день
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 ml-4">
                        {/* Количество */}
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              updateQuantity(item.id, item.quantity - 1);
                            }}
                            className="w-8 h-8 p-0"
                          >
                            -
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              updateQuantity(item.id, item.quantity + 1);
                            }}
                            className="w-8 h-8 p-0"
                          >
                            +
                          </Button>
                        </div>
                        
                        {/* Стоимость позиции */}
                        <div className="text-right min-w-[80px]">
                          <div className="font-semibold text-gray-900">
                            {(item.price * item.quantity).toLocaleString()} ₽
                          </div>
                          <div className="text-xs text-gray-500">
                            за {item.quantity} {item.quantity === 1 ? 'день' : 'дня'}
                          </div>
                        </div>
                        
                        {/* Удалить */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 ? (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold text-gray-900">
                Общая стоимость: {totalPrice.toLocaleString()} ₽/день
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Очистить корзину
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={forceClearCart}
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                  title="Принудительно очистить корзину (включая старые данные)"
                >
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Сброс
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Продолжить выбор
              </Button>
              <Button
                onClick={goToCalculator}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Оформить заказ
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  В калькуляторе вы сможете указать количество дней аренды, 
                  выбрать дополнительные услуги и оформить заказ.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                Готовы начать выбор оборудования?
              </p>
              <Button
                variant="default"
                onClick={() => {
                  onClose();
                  window.location.href = '/equipment';
                }}
                className="w-full"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Перейти к каталогу оборудования
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentCart;
