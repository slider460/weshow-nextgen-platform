import { useState, useEffect, useCallback } from 'react';

interface CartItem {
  id: string;
  name: string;
  specs: string;
  price: number;
  category: string;
  quantity: number;
}

export const useEquipmentCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  // Загружаем корзину из localStorage
  const loadCart = useCallback(() => {
    try {
      const storedCart = localStorage.getItem('equipmentCart');
      if (storedCart) {
        const items = JSON.parse(storedCart);
        // Проверяем валидность данных
        if (Array.isArray(items) && items.length > 0) {
          const validItems = items.filter(item => 
            item && item.id && item.name && typeof item.price === 'number' && item.quantity > 0
          );
          setCartItems(validItems);
          const count = validItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
          setCartCount(count);
          
          // Если данные были исправлены, сохраняем обратно
          if (validItems.length !== items.length) {
            localStorage.setItem('equipmentCart', JSON.stringify(validItems));
          }
        } else {
          setCartItems([]);
          setCartCount(0);
          localStorage.removeItem('equipmentCart');
        }
      } else {
        setCartItems([]);
        setCartCount(0);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      setCartItems([]);
      setCartCount(0);
      localStorage.removeItem('equipmentCart');
    }
  }, []);

  // Добавляем товар в корзину
  const addToCart = (equipment: any) => {
    if (!equipment || !equipment.id || !equipment.name) {
      console.error('Invalid equipment data:', equipment);
      return;
    }

    const newCart = [...cartItems];
    const existingItem = newCart.find(item => item.id === equipment.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newCart.push({
        id: equipment.id,
        name: equipment.name,
        specs: equipment.specs || '',
        price: equipment.priceValue || 0,
        category: equipment.category || 'other',
        quantity: 1
      });
    }
    
    setCartItems(newCart);
    localStorage.setItem('equipmentCart', JSON.stringify(newCart));
    
    // Обновляем счетчик
    const newCount = newCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(newCount);
    
    // Уведомляем другие компоненты
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: newCount } }));
    
    return newCart;
  };

  // Удаляем товар из корзины
  const removeFromCart = (itemId: string) => {
    const newCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(newCart);
    
    if (newCart.length === 0) {
      localStorage.removeItem('equipmentCart');
      setCartCount(0);
    } else {
      localStorage.setItem('equipmentCart', JSON.stringify(newCart));
      const newCount = newCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(newCount);
    }
    
    // Уведомляем другие компоненты
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: newCart.length > 0 ? newCart.reduce((sum, item) => sum + item.quantity, 0) : 0 } }));
  };

  // Обновляем количество товара
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    const newCart = cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(newCart);
    localStorage.setItem('equipmentCart', JSON.stringify(newCart));
    
    // Обновляем счетчик
    const newCount = newCart.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(newCount);
    
    // Уведомляем другие компоненты
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: newCount } }));
  };

  // Очищаем корзину
  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem('equipmentCart');
    
    // Уведомляем другие компоненты
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: 0 } }));
  };

  // Принудительно очищаем корзину (для отладки)
  const forceClearCart = () => {
    setCartItems([]);
    setCartCount(0);
    localStorage.removeItem('equipmentCart');
    localStorage.removeItem('cartEquipment'); // Также очищаем старые данные
    
    // Уведомляем другие компоненты
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: 0 } }));
  };

  // Слушаем изменения в localStorage
  useEffect(() => {
    loadCart();
    
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'equipmentCart') {
        loadCart();
      }
    };
    
    const handleCartUpdate = (event: CustomEvent) => {
      setCartCount(event.detail.count);
    };
    
    // Слушаем изменения в других вкладках
    window.addEventListener('storage', handleStorageChange);
    
    // Слушаем события обновления корзины
    window.addEventListener('cartUpdated', handleCartUpdate as EventListener);
    
    // Периодически проверяем localStorage (каждые 2 секунды)
    const interval = setInterval(() => {
      const storedCart = localStorage.getItem('equipmentCart');
      if (storedCart) {
        try {
          const items = JSON.parse(storedCart);
          const currentCount = items.reduce((sum: number, item: CartItem) => sum + (item.quantity || 0), 0);
          if (currentCount !== cartCount) {
            loadCart();
          }
        } catch (error) {
          // Игнорируем ошибки парсинга
        }
      }
    }, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate as EventListener);
      clearInterval(interval);
    };
  }, [loadCart, cartCount]);

  return {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    forceClearCart,
    loadCart
  };
};
