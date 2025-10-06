import { useState, useEffect, useCallback, useMemo } from 'react';
import type { 
  Equipment, 
  CartItem, 
  Cart, 
  PricingCalculation, 
  AvailabilityStatus,
  CartConfig 
} from '../types/equipment';

// Конфигурация по умолчанию
const DEFAULT_CONFIG: CartConfig = {
  maxItems: 50,
  maxQuantityPerItem: 10,
  minRentalDays: 1,
  maxRentalDays: 90,
  allowSameDayRental: false,
  delivery: {
    enabled: true,
    freeDeliveryThreshold: 50000, // 50,000 ₽
    leadTime: 24, // 24 часа
    workingHours: {
      start: '09:00',
      end: '18:00'
    },
    workingDays: [1, 2, 3, 4, 5] // Пн-Пт
  },
  payment: {
    methods: ['card', 'bank_transfer', 'corporate'],
    requirePrepayment: true,
    prepaymentPercent: 50
  }
};

const STORAGE_KEY = 'weshow_equipment_cart';
const CART_UPDATE_EVENT = 'cartUpdated';

export const useAdvancedCart = (config: Partial<CartConfig> = {}) => {
  const finalConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);
  
  const [cart, setCart] = useState<Cart>(() => {
    const savedCart = loadCartFromStorage();
    console.log('useAdvancedCart: Загружаем корзину из localStorage', {
      savedCart,
      hasItems: savedCart?.items?.length || 0
    });
    return savedCart || createEmptyCart();
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Создание пустой корзины
  function createEmptyCart(): Cart {
    const now = new Date();
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
      createdAt: now,
      updatedAt: now
    };
  }

  // Загрузка корзины из localStorage
  function loadCartFromStorage(): Cart | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      
      const parsed = JSON.parse(stored);
      
      // Проверка валидности данных и миграция если нужно
      if (parsed && Array.isArray(parsed.items)) {
        return {
          ...parsed,
          createdAt: new Date(parsed.createdAt || Date.now()),
          updatedAt: new Date(parsed.updatedAt || Date.now()),
          rentalPeriod: parsed.rentalPeriod ? {
            ...parsed.rentalPeriod,
            startDate: new Date(parsed.rentalPeriod.startDate),
            endDate: new Date(parsed.rentalPeriod.endDate)
          } : undefined,
          estimatedDelivery: parsed.estimatedDelivery 
            ? new Date(parsed.estimatedDelivery) 
            : undefined
        };
      }
      
      return null;
    } catch (error) {
      console.warn('Ошибка загрузки корзины:', error);
      return null;
    }
  }

  // Сохранение корзины в localStorage
  const saveCartToStorage = useCallback((cartData: Cart) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartData));
    } catch (error) {
      console.error('Ошибка сохранения корзины:', error);
      setError('Не удалось сохранить корзину');
    }
  }, []);

  // Пересчет итогов корзины
  const recalculateCart = useCallback((items: CartItem[]): Cart => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const updatedCart: Cart = {
      ...cart,
      items,
      totalItems,
      totalPrice,
      updatedAt: new Date()
    };

    return updatedCart;
  }, [cart]);

  // Добавление товара в корзину
  const addToCart = useCallback(async (equipment: Equipment, quantity: number = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      // Валидация
      if (quantity <= 0 || quantity > finalConfig.maxQuantityPerItem) {
        throw new Error(`Количество должно быть от 1 до ${finalConfig.maxQuantityPerItem}`);
      }

      if (cart.items.length >= finalConfig.maxItems) {
        throw new Error(`Максимальное количество позиций в корзине: ${finalConfig.maxItems}`);
      }

      // Проверка доступности
      if (equipment.availability.available < quantity) {
        throw new Error(`Недостаточно товара в наличии. Доступно: ${equipment.availability.available}`);
      }

      const existingItemIndex = cart.items.findIndex(item => item.equipmentId === equipment.id);
      const newItems = [...cart.items];

      if (existingItemIndex >= 0) {
        // Обновляем существующую позицию
        const existingItem = newItems[existingItemIndex];
        const newQuantity = existingItem.quantity + quantity;
        
        if (newQuantity > finalConfig.maxQuantityPerItem) {
          throw new Error(`Максимальное количество одной позиции: ${finalConfig.maxQuantityPerItem}`);
        }

        if (newQuantity > equipment.availability.available) {
          throw new Error(`Недостаточно товара в наличии. Доступно: ${equipment.availability.available}`);
        }

        newItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          subtotal: equipment.pricing.dailyRate * newQuantity
        };
      } else {
        // Добавляем новую позицию
        const newItem: CartItem = {
          id: `${equipment.id}-${Date.now()}`,
          equipmentId: equipment.id,
          name: equipment.name,
          category: equipment.category,
          specifications: Object.entries(equipment.specifications)
            .slice(0, 3)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', '),
          price: equipment.pricing.dailyRate,
          quantity,
          image: equipment.media.thumbnail || equipment.media.images[0],
          availability: equipment.availability.available > 0 ? 'available' : 'unavailable',
          minRentalDays: equipment.pricing.minimumRental,
          subtotal: equipment.pricing.dailyRate * quantity
        };

        newItems.push(newItem);
      }

      const updatedCart = recalculateCart(newItems);
      setCart(updatedCart);
      saveCartToStorage(updatedCart);

      // Уведомляем другие компоненты
      window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT, { 
        detail: { cart: updatedCart } 
      }));

      return updatedCart;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка добавления в корзину';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [cart, finalConfig, recalculateCart, saveCartToStorage]);

  // Удаление товара из корзины
  const removeFromCart = useCallback((itemId: string) => {
    const newItems = cart.items.filter(item => item.id !== itemId);
    const updatedCart = recalculateCart(newItems);
    
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
    
    window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT, { 
      detail: { cart: updatedCart } 
    }));
  }, [cart.items, recalculateCart, saveCartToStorage]);

  // Обновление количества товара
  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    if (newQuantity > finalConfig.maxQuantityPerItem) {
      setError(`Максимальное количество одной позиции: ${finalConfig.maxQuantityPerItem}`);
      return;
    }

    const newItems = cart.items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQuantity,
          subtotal: item.price * newQuantity
        };
      }
      return item;
    });

    const updatedCart = recalculateCart(newItems);
    setCart(updatedCart);
    saveCartToStorage(updatedCart);
    
    window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT, { 
      detail: { cart: updatedCart } 
    }));
  }, [cart.items, finalConfig.maxQuantityPerItem, recalculateCart, removeFromCart, saveCartToStorage]);

  // Установка периода аренды
  const setRentalPeriod = useCallback((startDate: Date, endDate: Date) => {
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days < finalConfig.minRentalDays) {
      setError(`Минимальный срок аренды: ${finalConfig.minRentalDays} дней`);
      return;
    }

    if (days > finalConfig.maxRentalDays) {
      setError(`Максимальный срок аренды: ${finalConfig.maxRentalDays} дней`);
      return;
    }

    // Проверка на аренду в тот же день
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!finalConfig.allowSameDayRental && startDate <= today) {
      setError('Аренда в тот же день недоступна');
      return;
    }

    const updatedCart: Cart = {
      ...cart,
      rentalPeriod: {
        startDate,
        endDate,
        days
      },
      updatedAt: new Date()
    };

    setCart(updatedCart);
    saveCartToStorage(updatedCart);
    setError(null);
  }, [cart, finalConfig, saveCartToStorage]);

  // Установка дополнительных услуг
  const setServices = useCallback((services: Cart['services']) => {
    const updatedCart: Cart = {
      ...cart,
      services,
      updatedAt: new Date()
    };

    setCart(updatedCart);
    saveCartToStorage(updatedCart);
  }, [cart, saveCartToStorage]);

  // Расчет полной стоимости с услугами
  const calculateFullPrice = useCallback((): PricingCalculation | null => {
    if (!cart.rentalPeriod || cart.items.length === 0) {
      return null;
    }

    const { days } = cart.rentalPeriod;
    let basePrice = 0;
    let deliveryFee = 0;
    let setupFee = 0;
    let supportFee = 0;

    // Расчет базовой стоимости оборудования
    cart.items.forEach(item => {
      basePrice += item.price * item.quantity * days;
    });

    // Расчет дополнительных услуг
    if (cart.services?.delivery) {
      deliveryFee = basePrice >= (finalConfig.delivery.freeDeliveryThreshold || 0) 
        ? 0 
        : 5000; // Стандартная стоимость доставки
    }

    if (cart.services?.setup) {
      setupFee = Math.max(basePrice * 0.15, 10000); // 15% от стоимости или минимум 10,000₽
    }

    if (cart.services?.support) {
      supportFee = days * 5000; // 5,000₽ за день поддержки
    }

    const subtotal = basePrice;
    const servicesTotal = deliveryFee + setupFee + supportFee;
    const totalPrice = subtotal + servicesTotal;

    return {
      basePrice,
      rentalDays: days,
      quantity: cart.totalItems,
      deliveryFee,
      setupFee,
      supportFee,
      subtotal,
      servicesTotal,
      totalPrice,
      priceBreakdown: {
        equipment: basePrice,
        delivery: deliveryFee,
        setup: setupFee,
        support: supportFee
      }
    };
  }, [cart, finalConfig]);

  // Очистка корзины
  const clearCart = useCallback(() => {
    const emptyCart = createEmptyCart();
    setCart(emptyCart);
    localStorage.removeItem(STORAGE_KEY);
    setError(null);
    
    window.dispatchEvent(new CustomEvent(CART_UPDATE_EVENT, { 
      detail: { cart: emptyCart } 
    }));
  }, []);

  // Проверка валидности корзины для оформления заказа
  const validateCart = useCallback((): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    console.log('validateCart: Проверяем корзину', {
      itemsCount: cart.items.length,
      rentalPeriod: cart.rentalPeriod,
      cart
    });

    if (cart.items.length === 0) {
      errors.push('Корзина пуста');
    }

    // Временно отключаем проверку периода аренды для тестирования
    // if (!cart.rentalPeriod) {
    //   errors.push('Не указан период аренды');
    // }

    // Проверка доступности товаров
    cart.items.forEach(item => {
      if (item.availability === 'unavailable') {
        errors.push(`${item.name} недоступен для аренды`);
      }
    });

    const result = {
      isValid: errors.length === 0,
      errors
    };

    console.log('validateCart: Результат валидации', result);
    return result;
  }, [cart]);

  // Слушаем изменения в других вкладках
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        const updatedCart = loadCartFromStorage();
        if (updatedCart) {
          setCart(updatedCart);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Автосохранение каждые 30 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      if (cart.items.length > 0) {
        saveCartToStorage(cart);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [cart, saveCartToStorage]);

  // Очистка ошибок через некоторое время
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return {
    // Состояние
    cart,
    isLoading,
    error,
    config: finalConfig,
    
    // Действия
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setRentalPeriod,
    setServices,
    
    // Вычисления
    calculateFullPrice,
    validateCart,
    
    // Вспомогательные данные
    isEmpty: cart.items.length === 0,
    itemCount: cart.totalItems,
    hasRentalPeriod: !!cart.rentalPeriod,
    
    // Методы для интеграции
    exportCart: () => ({ ...cart }),
    loadCart: (cartData: Cart) => {
      setCart(cartData);
      saveCartToStorage(cartData);
    }
  };
};