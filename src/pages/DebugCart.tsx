import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, RefreshCw, ShoppingCart, AlertTriangle } from "lucide-react";

const DebugCart = () => {
  const clearAllCartData = () => {
    // Очищаем все возможные ключи корзины
    localStorage.removeItem('equipmentCart');
    localStorage.removeItem('cartEquipment');
    localStorage.removeItem('preSelectedEquipment');
    
    // Очищаем все ключи, которые могут содержать данные корзины
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes('cart') || key.includes('equipment') || key.includes('Cart'))) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
      console.log(`Removed: ${key}`);
    });
    
    // Перезагружаем страницу
    window.location.reload();
  };

  const showCartData = () => {
    console.log('=== CART DEBUG INFO ===');
    console.log('equipmentCart:', localStorage.getItem('equipmentCart'));
    console.log('cartEquipment:', localStorage.getItem('cartEquipment'));
    console.log('preSelectedEquipment:', localStorage.getItem('preSelectedEquipment'));
    
    // Показываем все ключи localStorage
    console.log('All localStorage keys:');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        console.log(`${key}:`, localStorage.getItem(key));
      }
    }
  };

  const forceClearCart = () => {
    if (confirm('Вы уверены, что хотите полностью очистить корзину? Это действие нельзя отменить.')) {
      clearAllCartData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                <span>Отладка корзины</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  Эта страница предназначена для отладки проблем с корзиной. 
                  Используйте её только при необходимости.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={showCartData}
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Показать данные корзины
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => window.dispatchEvent(new CustomEvent('openEquipmentCart'))}
                  className="w-full"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Открыть корзину
                </Button>
              </div>
              
              <div className="border-t pt-4">
                <Button
                  variant="destructive"
                  onClick={forceClearCart}
                  className="w-full"
                  size="lg"
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Принудительно очистить корзину
                </Button>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Это действие очистит все данные корзины и перезагрузит страницу
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Текущие данные корзины:</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>equipmentCart:</strong> {localStorage.getItem('equipmentCart') ? 'Есть данные' : 'Пусто'}
                  </div>
                  <div>
                    <strong>cartEquipment:</strong> {localStorage.getItem('cartEquipment') ? 'Есть данные' : 'Пусто'}
                  </div>
                  <div>
                    <strong>preSelectedEquipment:</strong> {localStorage.getItem('preSelectedEquipment') ? 'Есть данные' : 'Пусто'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DebugCart;
