// Типы для системы управления оборудованием
// Следует спецификации из документации

export type EquipmentCategory = 
  | 'led-displays'     // LED-экраны
  | 'projection'       // Проекторы и экраны
  | 'audio'           // Аудиосистемы
  | 'lighting'        // Освещение
  | 'interactive'     // Интерактивное оборудование
  | 'ar-vr'          // AR/VR оборудование
  | 'presentation'    // Презентационное оборудование
  | 'decoration'      // Декоративные элементы
  | 'other';          // Прочее

export type AvailabilityStatus = 'available' | 'limited' | 'unavailable' | 'reserved';

export type OrderStatus = 
  | 'draft'           // Черновик
  | 'pending'         // Ожидает подтверждения
  | 'confirmed'       // Подтвержден
  | 'in-progress'     // Выполняется
  | 'delivered'       // Доставлен
  | 'returned'        // Возвращен
  | 'cancelled'       // Отменен
  | 'completed';      // Завершен

// Базовая информация об оборудовании
export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  brand: string;
  model: string;
  description?: string;
  
  // Технические характеристики
  specifications: Record<string, string | number>;
  
  // Ценообразование
  pricing: {
    dailyRate: number;      // Стоимость аренды за день
    weeklyRate: number;     // Стоимость аренды за неделю
    monthlyRate: number;    // Стоимость аренды за месяц
    setupFee?: number;      // Стоимость установки
    deliveryFee?: number;   // Стоимость доставки
    minimumRental: number;  // Минимальный срок аренды (дни)
  };
  
  // Доступность
  availability: {
    total: number;          // Общее количество
    available: number;      // Доступно для аренды
    reserved: number;       // Зарезервировано
    inRepair?: number;      // В ремонте
  };
  
  // Медиа-контент
  media: {
    images: string[];       // Основные фотографии
    thumbnail?: string;     // Миниатюра
    videos?: string[];      // Видео-обзоры
    documents?: string[];   // Техническая документация
    ar3dModel?: string;     // 3D-модель для AR
  };
  
  // Требования к эксплуатации
  requirements: {
    power?: string;         // Энергопотребление
    space?: string;         // Требования к пространству
    setup?: string;         // Особенности установки
    staff?: string;         // Требования к персоналу
  };
  
  // Теги для поиска и фильтрации
  tags: string[];
  
  // Рейтинг и отзывы
  rating?: {
    average: number;        // Средний рейтинг
    count: number;          // Количество отзывов
  };
  
  // Метаданные
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  featured?: boolean;       // Рекомендуемое оборудование
}

// Элемент корзины оборудования
export interface CartItem {
  id: string;
  equipmentId: string;
  name: string;
  category: EquipmentCategory;
  specifications: string;   // Краткие характеристики
  price: number;           // Цена за единицу за день
  quantity: number;
  
  // Дополнительная информация
  image?: string;
  availability: AvailabilityStatus;
  minRentalDays: number;
  
  // Расчеты
  subtotal?: number;       // Подсчитывается автоматически
}

// Состояние корзины
export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;      // Общая стоимость за день
  
  // Период аренды
  rentalPeriod?: {
    startDate: Date;
    endDate: Date;
    days: number;
  };
  
  // Дополнительные услуги
  services?: {
    delivery: boolean;
    setup: boolean;
    support: boolean;
    training: boolean;
  };
  
  // Предполагаемая доставка
  estimatedDelivery?: Date;
  
  // Метаданные
  createdAt: Date;
  updatedAt: Date;
}

// Расчет стоимости аренды
export interface PricingCalculation {
  basePrice: number;       // Базовая стоимость
  rentalDays: number;      // Количество дней аренды
  quantity: number;        // Количество единиц
  
  // Скидки
  discountPercent?: number;
  discountAmount?: number;
  
  // Дополнительные услуги
  deliveryFee: number;
  setupFee: number;
  supportFee?: number;
  
  // Итоги
  subtotal: number;        // Сумма без услуг
  servicesTotal: number;   // Стоимость услуг
  totalPrice: number;      // Итоговая сумма
  
  // Детализация
  priceBreakdown: {
    equipment: number;
    delivery: number;
    setup: number;
    support?: number;
    discount?: number;
  };
}

// Адрес доставки/самовывоза
export interface Address {
  id?: string;
  type: 'delivery' | 'pickup' | 'venue';
  title?: string;          // Название места (например, "Офис", "Дом")
  
  // Основные поля
  street: string;
  city: string;
  region?: string;
  postalCode?: string;
  country: string;
  
  // Дополнительная информация
  apartment?: string;
  floor?: string;
  entrance?: string;
  intercom?: string;
  
  // Координаты
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  
  // Контактная информация
  contactPerson?: string;
  contactPhone?: string;
  notes?: string;          // Особые указания
  
  // Время доступности
  availableFrom?: string;  // Время начала (например, "09:00")
  availableTo?: string;    // Время окончания (например, "18:00")
  
  // Метаданные
  isDefault?: boolean;
  verified?: boolean;
}

// Элемент заказа
export interface OrderItem {
  id: string;
  equipmentId: string;
  name: string;
  category: EquipmentCategory;
  specifications: string;
  
  // Количество и цены
  quantity: number;
  dailyRate: number;
  rentalDays: number;
  subtotal: number;
  
  // Дополнительные услуги для этой позиции
  services?: {
    setup?: boolean;
    support?: boolean;
  };
  
  // Состояние позиции
  status: 'pending' | 'confirmed' | 'delivered' | 'returned' | 'cancelled';
  notes?: string;
}

// Основная структура заказа
export interface Order {
  id: string;
  orderNumber: string;     // Человекочитаемый номер заказа
  customerId: string;
  status: OrderStatus;
  
  // Позиции заказа
  items: OrderItem[];
  
  // Временные рамки
  timeline: {
    createdAt: Date;
    confirmedAt?: Date;
    deliveryDate: Date;
    pickupDate: Date;
    completedAt?: Date;
  };
  
  // Период аренды
  rentalPeriod: {
    startDate: Date;
    endDate: Date;
    days: number;
  };
  
  // Адреса
  addresses: {
    delivery?: Address;
    pickup?: Address;
    venue?: Address;       // Место проведения мероприятия
  };
  
  // Ценообразование
  pricing: PricingCalculation;
  
  // Услуги
  services: {
    delivery: boolean;
    setup: boolean;
    support: boolean;
    training: boolean;
  };
  
  // Контактная информация
  contact: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    position?: string;
  };
  
  // Дополнительная информация
  eventDetails?: {
    name?: string;         // Название мероприятия
    type?: string;         // Тип мероприятия
    attendees?: number;    // Количество участников
    description?: string;  // Описание мероприятия
  };
  
  // Особые требования
  specialRequirements?: string;
  
  // Платежная информация
  payment?: {
    method: 'card' | 'bank_transfer' | 'cash' | 'corporate';
    status: 'pending' | 'paid' | 'partial' | 'overdue' | 'cancelled';
    amount: number;
    paidAt?: Date;
    transactionId?: string;
  };
  
  // Документы
  documents?: {
    contract?: string;     // Ссылка на договор
    invoice?: string;      // Ссылка на счет
    receipt?: string;      // Ссылка на чек
  };
  
  // Метаданные
  createdAt: Date;
  updatedAt: Date;
  notes?: string;          // Внутренние заметки
}

// Фильтры для поиска оборудования
export interface EquipmentFilters {
  categories?: EquipmentCategory[];
  priceRange?: {
    min: number;
    max: number;
  };
  availability?: AvailabilityStatus[];
  brands?: string[];
  tags?: string[];
  featured?: boolean;
  
  // Технические требования
  specifications?: Record<string, string | number | boolean>;
  
  // Период аренды (для проверки доступности)
  rentalPeriod?: {
    startDate: Date;
    endDate: Date;
  };
  
  // Сортировка
  sortBy?: 'name' | 'price' | 'rating' | 'popularity' | 'newest';
  sortOrder?: 'asc' | 'desc';
  
  // Пагинация
  page?: number;
  limit?: number;
}

// Результат поиска оборудования
export interface EquipmentSearchResult {
  items: Equipment[];
  totalCount: number;
  page: number;
  totalPages: number;
  filters: EquipmentFilters;
}

// Рекомендации по оборудованию
export interface EquipmentRecommendation {
  equipment: Equipment;
  reason: 'popular' | 'similar' | 'complementary' | 'alternative';
  confidence: number;      // 0-1, уровень уверенности в рекомендации
  description?: string;    // Объяснение рекомендации
}

// Конфигурация корзины и заказов
export interface CartConfig {
  maxItems: number;        // Максимальное количество позиций
  maxQuantityPerItem: number; // Максимальное количество одной позиции
  minRentalDays: number;   // Минимальный срок аренды
  maxRentalDays: number;   // Максимальный срок аренды
  allowSameDayRental: boolean; // Разрешить аренду в тот же день
  
  // Настройки доставки
  delivery: {
    enabled: boolean;
    freeDeliveryThreshold?: number; // Сумма для бесплатной доставки
    leadTime: number;      // Время доставки в часах
    workingHours: {
      start: string;       // Начало рабочего дня
      end: string;         // Конец рабочего дня
    };
    workingDays: number[]; // Рабочие дни (0-6, где 0 = воскресенье)
  };
  
  // Настройки оплаты
  payment: {
    methods: Array<'card' | 'bank_transfer' | 'cash' | 'corporate'>;
    requirePrepayment: boolean;
    prepaymentPercent?: number;
  };
}