import { APIClient } from './client';
import { emailService } from './email';

export interface OrderItem {
  equipmentId: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface OrderContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
}

export interface OrderAddress {
  street: string;
  city: string;
  postalCode?: string;
  apartment?: string;
}

export interface OrderService {
  id: string;
  name: string;
  price: number;
  required: boolean;
}

export interface OrderData {
  items: OrderItem[];
  services: OrderService[];
  contact: OrderContact;
  address: OrderAddress;
  eventName?: string;
  comment?: string;
  rentalPeriod: {
    startDate: string;
    endDate: string;
    days: number;
  };
  pricing: {
    equipmentTotal: number;
    servicesTotal: number;
    totalPrice: number;
  };
  paymentMethod: 'card' | 'bank_transfer' | 'cash';
}

export interface OrderResponse {
  success: boolean;
  orderId?: string;
  message: string;
  error?: string;
}

class OrdersAPI {
  private api: APIClient;

  constructor() {
    this.api = new APIClient();
  }

  /**
   * Создание заказа
   */
  async createOrder(orderData: OrderData): Promise<OrderResponse> {
    try {
      // Валидация данных
      const validation = this.validateOrderData(orderData);
      if (!validation.isValid) {
        return {
          success: false,
          message: 'Ошибка валидации данных',
          error: validation.errors.join(', ')
        };
      }

      // Отправка заказа на сервер
      const response = await this.api.post<{ orderId: string }>('/orders', orderData);
      
      if (response.success && response.data) {
        // Отправка email уведомления
        await emailService.sendOrderNotification(orderData, response.data.orderId);
        
        return {
          success: true,
          orderId: response.data.orderId,
          message: 'Заказ успешно создан'
        };
      } else {
        return {
          success: false,
          message: 'Ошибка при создании заказа',
          error: response.error?.message || 'Неизвестная ошибка'
        };
      }
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
      return {
        success: false,
        message: 'Ошибка при создании заказа',
        error: error instanceof Error ? error.message : 'Неизвестная ошибка'
      };
    }
  }

  /**
   * Валидация данных заказа
   */
  private validateOrderData(orderData: OrderData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Проверка товаров
    if (!orderData.items || orderData.items.length === 0) {
      errors.push('Корзина пуста');
    }

    // Проверка контактных данных
    if (!orderData.contact.firstName?.trim()) {
      errors.push('Не указано имя');
    }
    if (!orderData.contact.lastName?.trim()) {
      errors.push('Не указана фамилия');
    }
    if (!orderData.contact.email?.trim()) {
      errors.push('Не указан email');
    }
    if (!orderData.contact.phone?.trim()) {
      errors.push('Не указан телефон');
    }

    // Проверка адреса
    if (!orderData.address.street?.trim()) {
      errors.push('Не указан адрес');
    }
    if (!orderData.address.city?.trim()) {
      errors.push('Не указан город');
    }

    // Проверка обязательных услуг
    const requiredServices = orderData.services.filter(s => s.required);
    if (requiredServices.length === 0) {
      errors.push('Не выбраны обязательные услуги');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

}

// Экспорт экземпляра API
export const ordersAPI = new OrdersAPI();

// Хук для React компонентов
export const useOrdersAPI = () => {
  return {
    createOrder: ordersAPI.createOrder.bind(ordersAPI)
  };
};
