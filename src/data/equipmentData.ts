import type { Equipment, EquipmentCategory } from '../types/equipment';

// Демонстрационные данные оборудования
export const mockEquipment: Equipment[] = [
  // LED-экраны
  {
    id: 'led-p3-indoor',
    name: 'LED-экран P3 Indoor',
    category: 'led-displays' as EquipmentCategory,
    brand: 'Absen',
    model: 'A3 Pro',
    description: 'Высококачественный LED-экран для внутренних мероприятий с пиксельным шагом 3мм',
    specifications: {
      'Пиксельный шаг': '3мм',
      'Разрешение модуля': '192x192px',
      'Размер модуля': '576x576мм',
      'Яркость': '1200 нит',
      'Угол обзора': '160°x160°',
      'Частота обновления': '3840Гц',
      'Вес модуля': '8кг'
    },
    pricing: {
      dailyRate: 3500,
      weeklyRate: 20000,
      monthlyRate: 70000,
      setupFee: 15000,
      deliveryFee: 5000,
      minimumRental: 1
    },
    availability: {
      total: 50,
      available: 42,
      reserved: 8,
      inRepair: 0
    },
    media: {
      images: [
        '/api/placeholder/600/400',
        '/api/placeholder/600/400',
        '/api/placeholder/600/400'
      ],
      thumbnail: '/api/placeholder/300/200',
      videos: ['/api/placeholder/video'],
      documents: ['/docs/led-p3-specs.pdf']
    },
    requirements: {
      power: '220В, 300Вт на модуль',
      space: '0.33м² на модуль',
      setup: 'Требуется ровная поверхность или ферменная конструкция'
    },
    tags: ['led', 'экран', 'indoor', 'высокое разрешение', 'мероприятия'],
    rating: {
      average: 4.8,
      count: 124
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-01'),
    isActive: true,
    featured: true
  },
  {
    id: 'led-p6-outdoor',
    name: 'LED-экран P6 Outdoor',
    category: 'led-displays' as EquipmentCategory,
    brand: 'Novastar',
    model: 'P6-Outdoor',
    description: 'Уличный LED-экран высокой яркости для наружных мероприятий',
    specifications: {
      'Пиксельный шаг': '6мм',
      'Разрешение модуля': '160x160px',
      'Размер модуля': '960x960мм',
      'Яркость': '6500 нит',
      'Защита': 'IP65',
      'Угол обзора': '140°x140°',
      'Рабочая температура': '-20°C до +50°C'
    },
    pricing: {
      dailyRate: 2800,
      weeklyRate: 16000,
      monthlyRate: 55000,
      setupFee: 20000,
      deliveryFee: 7000,
      minimumRental: 1
    },
    availability: {
      total: 30,
      available: 25,
      reserved: 5,
      inRepair: 0
    },
    media: {
      images: ['/api/placeholder/600/400'],
      thumbnail: '/api/placeholder/300/200'
    },
    requirements: {
      power: '220В, 450Вт на модуль',
      space: '0.92м² на модуль',
      setup: 'Ферменная конструкция, защита от осадков'
    },
    tags: ['led', 'экран', 'outdoor', 'уличный', 'влагозащита'],
    rating: {
      average: 4.6,
      count: 89
    },
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-11-28'),
    isActive: true,
    featured: false
  },

  // Проекторы
  {
    id: 'projector-laser-20k',
    name: 'Лазерный проектор 20000 люмен',
    category: 'projection' as EquipmentCategory,
    brand: 'Panasonic',
    model: 'PT-RZ21K',
    description: 'Профессиональный лазерный проектор для больших площадок',
    specifications: {
      'Яркость': '20000 ANSI люмен',
      'Разрешение': 'WUXGA (1920x1200)',
      'Технология': 'DLP 1-chip',
      'Источник света': 'Лазерный модуль',
      'Срок службы': '20000 часов',
      'Вес': '58кг',
      'Шум': '42дБ'
    },
    pricing: {
      dailyRate: 8500,
      weeklyRate: 50000,
      monthlyRate: 180000,
      setupFee: 12000,
      deliveryFee: 3000,
      minimumRental: 1
    },
    availability: {
      total: 8,
      available: 6,
      reserved: 2,
      inRepair: 0
    },
    media: {
      images: ['/api/placeholder/600/400'],
      thumbnail: '/api/placeholder/300/200'
    },
    requirements: {
      power: '220В, 1200Вт',
      setup: 'Подвесной монтаж или напольная установка'
    },
    tags: ['проектор', 'лазерный', 'высокая яркость', '4K ready'],
    rating: {
      average: 4.9,
      count: 45
    },
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-11-25'),
    isActive: true,
    featured: true
  },

  // Звуковое оборудование
  {
    id: 'line-array-l-acoustics',
    name: 'Line Array L-Acoustics K2',
    category: 'audio' as EquipmentCategory,
    brand: 'L-Acoustics',
    model: 'K2',
    description: 'Профессиональная линейная акустическая система для крупных мероприятий',
    specifications: {
      'Максимальная мощность': '1000Вт RMS',
      'Частотный диапазон': '35Гц - 20кГц',
      'Угол распределения': '110° x 10°',
      'Максимальное SPL': '139дБ',
      'Количество драйверов': '12x3" + 2x1"',
      'Вес': '68кг',
      'Размеры': '715x380x620мм'
    },
    pricing: {
      dailyRate: 12000,
      weeklyRate: 70000,
      monthlyRate: 250000,
      setupFee: 25000,
      deliveryFee: 8000,
      minimumRental: 1
    },
    availability: {
      total: 16,
      available: 14,
      reserved: 2,
      inRepair: 0
    },
    media: {
      images: ['/api/placeholder/600/400'],
      thumbnail: '/api/placeholder/300/200'
    },
    requirements: {
      power: '220В, специальный усилитель',
      setup: 'Подвесная система rigging, сертифицированный монтаж'
    },
    tags: ['звук', 'line array', 'концерт', 'профессиональный'],
    rating: {
      average: 4.9,
      count: 78
    },
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-11-30'),
    isActive: true,
    featured: true
  },

  // Освещение
  {
    id: 'moving-head-spot',
    name: 'Прожектор Moving Head Spot',
    category: 'lighting' as EquipmentCategory,
    brand: 'Martin Professional',
    model: 'MAC Quantum Wash',
    description: 'Интеллектуальный световой прибор с функцией spot и wash',
    specifications: {
      'Источник света': 'LED 1000Вт',
      'Световой поток': '17000 люмен',
      'Цветовая температура': '2700K - 12000K',
      'Поворот': 'Pan 540°, Tilt 270°',
      'Цветовое колесо': '7 цветов + белый',
      'Гобо колесо': '7 гобо + открытый',
      'Зум': '6° - 55°'
    },
    pricing: {
      dailyRate: 2500,
      weeklyRate: 14000,
      monthlyRate: 50000,
      setupFee: 3000,
      deliveryFee: 2000,
      minimumRental: 1
    },
    availability: {
      total: 24,
      available: 20,
      reserved: 4,
      inRepair: 0
    },
    media: {
      images: ['/api/placeholder/600/400'],
      thumbnail: '/api/placeholder/300/200'
    },
    requirements: {
      power: '220В, 1200Вт',
      setup: 'Ферменная конструкция, DMX контроллер'
    },
    tags: ['свет', 'moving head', 'LED', 'DMX', 'сценический'],
    rating: {
      average: 4.7,
      count: 156
    },
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-12-02'),
    isActive: true,
    featured: false
  },

  // Интерактивное оборудование
  {
    id: 'interactive-touch-panel-86',
    name: 'Интерактивная панель 86"',
    category: 'interactive' as EquipmentCategory,
    brand: 'Samsung',
    model: 'Flip 3 WM85R',
    description: 'Интерактивная сенсорная панель для презентаций и обучения',
    specifications: {
      'Диагональ': '86 дюймов',
      'Разрешение': '3840x2160 4K UHD',
      'Технология касания': 'Инфракрасная, 20 точек',
      'Яркость': '350 нит',
      'Операционная система': 'Tizen 6.5',
      'Подключения': 'HDMI, USB-C, Wi-Fi',
      'Вес': '67кг'
    },
    pricing: {
      dailyRate: 4500,
      weeklyRate: 25000,
      monthlyRate: 90000,
      setupFee: 8000,
      deliveryFee: 4000,
      minimumRental: 1
    },
    availability: {
      total: 12,
      available: 10,
      reserved: 2,
      inRepair: 0
    },
    media: {
      images: ['/api/placeholder/600/400'],
      thumbnail: '/api/placeholder/300/200'
    },
    requirements: {
      power: '220В, 250Вт',
      setup: 'Настенный монтаж или мобильная стойка'
    },
    tags: ['интерактивный', 'сенсорный', 'презентация', '4K'],
    rating: {
      average: 4.6,
      count: 93
    },
    createdAt: new Date('2024-04-12'),
    updatedAt: new Date('2024-11-27'),
    isActive: true,
    featured: false
  },

  // AR/VR оборудование
  {
    id: 'vr-headset-pro',
    name: 'VR-шлем Professional',
    category: 'ar-vr' as EquipmentCategory,
    brand: 'HTC',
    model: 'Vive Pro 2 Business Edition',
    description: 'Профессиональный VR-шлем для бизнес-применений',
    specifications: {
      'Разрешение': '2448x2448 на глаз',
      'Частота обновления': '90/120Гц',
      'Поле зрения': '120°',
      'Отслеживание': 'SteamVR Tracking 2.0',
      'Подключение': 'DisplayPort 1.2, USB 3.0',
      'Регулировка IPD': '57-72мм',
      'Вес': '850г'
    },
    pricing: {
      dailyRate: 3500,
      weeklyRate: 20000,
      monthlyRate: 70000,
      setupFee: 5000,
      deliveryFee: 1500,
      minimumRental: 1
    },
    availability: {
      total: 20,
      available: 16,
      reserved: 4,
      inRepair: 0
    },
    media: {
      images: ['/api/placeholder/600/400'],
      thumbnail: '/api/placeholder/300/200'
    },
    requirements: {
      setup: 'Игровой ПК с RTX 3080 или выше, пространство 2x2м'
    },
    tags: ['VR', 'виртуальная реальность', 'обучение', 'презентация'],
    rating: {
      average: 4.8,
      count: 67
    },
    createdAt: new Date('2024-05-18'),
    updatedAt: new Date('2024-12-01'),
    isActive: true,
    featured: true
  },

  // Презентационное оборудование
  {
    id: 'conference-camera-4k',
    name: 'Конференц-камера 4K PTZ',
    category: 'presentation' as EquipmentCategory,
    brand: 'Logitech',
    model: 'Rally Plus',
    description: 'Профессиональная камера для видеоконференций и трансляций',
    specifications: {
      'Разрешение': '4K Ultra HD (3840x2160)',
      'Зум': 'Оптический 15x',
      'Поворот': 'Pan ±175°, Tilt +90°/-30°',
      'Угол обзора': '82° диагональ',
      'Автофокус': 'Непрерывный',
      'Подключения': 'USB 3.0, HDMI',
      'Управление': 'Пульт ДУ, приложение'
    },
    pricing: {
      dailyRate: 2800,
      weeklyRate: 16000,
      monthlyRate: 55000,
      setupFee: 4000,
      deliveryFee: 2000,
      minimumRental: 1
    },
    availability: {
      total: 15,
      available: 13,
      reserved: 2,
      inRepair: 0
    },
    media: {
      images: ['/api/placeholder/600/400'],
      thumbnail: '/api/placeholder/300/200'
    },
    requirements: {
      power: '12В от адаптера',
      setup: 'Потолочный/настенный монтаж или тренога'
    },
    tags: ['видеоконференция', '4K', 'PTZ', 'трансляция'],
    rating: {
      average: 4.5,
      count: 112
    },
    createdAt: new Date('2024-06-03'),
    updatedAt: new Date('2024-11-29'),
    isActive: true,
    featured: false
  }
];

// Утилитарные функции для работы с данными
export const getEquipmentById = (id: string): Equipment | undefined => {
  return mockEquipment.find(item => item.id === id);
};

export const getEquipmentByCategory = (category: EquipmentCategory): Equipment[] => {
  return mockEquipment.filter(item => item.category === category && item.isActive);
};

export const getFeaturedEquipment = (): Equipment[] => {
  return mockEquipment.filter(item => item.featured && item.isActive);
};

export const getAvailableEquipment = (): Equipment[] => {
  return mockEquipment.filter(item => item.availability.available > 0 && item.isActive);
};

export const searchEquipment = (query: string): Equipment[] => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return mockEquipment.filter(item => item.isActive);
  
  return mockEquipment.filter(item => {
    if (!item.isActive) return false;
    
    return (
      item.name.toLowerCase().includes(searchTerm) ||
      item.brand.toLowerCase().includes(searchTerm) ||
      item.model.toLowerCase().includes(searchTerm) ||
      item.description?.toLowerCase().includes(searchTerm) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      Object.values(item.specifications).some(spec => 
        spec.toString().toLowerCase().includes(searchTerm)
      )
    );
  });
};

export const getEquipmentCategories = () => {
  const categories = new Set(mockEquipment.map(item => item.category));
  return Array.from(categories);
};

export const getEquipmentBrands = () => {
  const brands = new Set(mockEquipment.map(item => item.brand));
  return Array.from(brands).sort();
};

export const getPriceRange = () => {
  const prices = mockEquipment.map(item => item.pricing.dailyRate);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};