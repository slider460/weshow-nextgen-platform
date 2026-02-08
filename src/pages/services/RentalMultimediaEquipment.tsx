import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "../../components/ui/card";
import AnimatedContent from "../../components/AnimatedContent";
import SpotlightCard from "../../components/SpotlightCard";
import GradientText from "../../components/GradientText";
import { 
  Monitor, 
  Video, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Zap,
  Clock,
  Phone,
  Mail,
  Users,
  Globe,
  Settings,
  Truck,
  Calculator,
  Shield,
  Award,
  Headphones,
  Camera,
  Mic,
  Lightbulb,
  Projector,
  Smartphone,
  Wifi,
  Play,
  Eye,
  Download,
  Calendar,
  MapPin,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Target,
  FileText,
  Wrench,
  HelpCircle,
  MessageCircle,
  Layers,
  Box,
  Cpu,
  Glasses,
  Scan,
  Gamepad2,
  BookOpen,
  Fan,
  Cable,
  Power,
  Usb,
  ScreenShare,
  Aperture
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Типы данных
interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  badge?: string;
  badgeColor?: string;
  specs: { label: string; value: string }[];
  description: string;
  applications: string[];
  image?: string;
}

interface Category {
  id: string;
  icon: React.ElementType;
  name: string;
  count: number;
}

// Данные категорий
const categories: Category[] = [
  { id: "led-screens", icon: Monitor, name: "LED-экраны и дисплеи", count: 11 },
  { id: "projectors", icon: Projector, name: "Проекторы", count: 6 },
  { id: "projection-surfaces", icon: Layers, name: "Проекционные поверхности", count: 6 },
  { id: "media-servers", icon: Cpu, name: "Системы управления", count: 3 },
  { id: "switching", icon: Cable, name: "Коммутация и сигнал", count: 6 },
  { id: "cameras", icon: Camera, name: "Видеокамеры и съёмка", count: 6 },
  { id: "vr-ar", icon: Glasses, name: "VR/AR и интерактив", count: 10 },
  { id: "lighting", icon: Lightbulb, name: "Световое оборудование", count: 1 },
  { id: "lenses", icon: Aperture, name: "Линзы и аксессуары", count: 4 },
];

// LED-экраны и дисплеи
const ledScreens: EquipmentItem[] = [
  {
    id: "led-p195-h",
    name: "LED-экран P1.95 (горизонтальный)",
    category: "LED-экраны",
    specs: [
      { label: "Размер", value: "3 × 2 м" },
      { label: "Разрешение", value: "1536 × 1024 px" },
      { label: "Шаг пикселя", value: "1.95 мм" },
      { label: "Управление", value: "DMX512" }
    ],
    description: "Профессиональный LED-экран с высокой плотностью пикселей для презентаций, конференций и выставок. Идеальная цветопередача и широкий угол обзора.",
    applications: ["Конференции", "Презентации", "Выставочные стенды"]
  },
  {
    id: "led-p195-v",
    name: "LED-экран P1.95 (вертикальный)",
    category: "LED-экраны",
    specs: [
      { label: "Размер", value: "1,5 × 2 м" },
      { label: "Разрешение", value: "768 × 1024 px" },
      { label: "Шаг пикселя", value: "1.95 мм" },
      { label: "Ориентация", value: "Портретная" }
    ],
    description: "Вертикальный формат для цифровых вывесок, меню, информационных стендов. Компактное решение с высоким разрешением.",
    applications: ["Digital signage", "Информационные стенды", "Ресепшн"]
  },
  {
    id: "kinetic-1x1",
    name: "Кинетический экран Scalelike Matrix 1×1 м",
    category: "Кинетические экраны",
    badge: "WOW-эффект",
    badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    specs: [
      { label: "Размер", value: "1 × 1 м" },
      { label: "Количество матриц", value: "144" },
      { label: "Ход пикселя", value: "до 20 см" },
      { label: "Угол наклона", value: "до 45°" }
    ],
    description: "Уникальный 3D-экран, где каждый пиксель физически выдвигается вперёд. Создаёт объёмные световые формы в движении. Идеален для фотозон, рилс и инсталляций.",
    applications: ["Выставки", "Фотозоны", "Презентации премиальных продуктов"]
  },
  {
    id: "kinetic-3x2",
    name: "Кинетический экран Scalelike Matrix 3×2 м",
    category: "Кинетические экраны",
    badge: "WOW-эффект",
    badgeColor: "bg-gradient-to-r from-purple-500 to-pink-500",
    specs: [
      { label: "Размер", value: "3 × 2 м" },
      { label: "Количество матриц", value: "864" },
      { label: "Ход пикселя", value: "до 20 см" },
      { label: "Вес", value: "240 кг" }
    ],
    description: "Масштабная версия кинетического экрана для крупных мероприятий. Синхронизированное движение сотен пикселей создаёт захватывающие 3D-эффекты.",
    applications: ["Главные сцены", "Флагманские стенды", "Шоу-программы"]
  },
  {
    id: "oled-55",
    name: "Прозрачный OLED-дисплей Lumien 55\"",
    category: "Прозрачные экраны",
    badge: "Premium",
    badgeColor: "bg-gradient-to-r from-amber-500 to-orange-500",
    specs: [
      { label: "Диагональ", value: "55 дюймов" },
      { label: "Разрешение", value: "1920 × 1080 px" },
      { label: "Тип", value: "OLED, сенсорный" },
      { label: "ОС", value: "Windows" }
    ],
    description: "Премиальный прозрачный дисплей с ультратонкими рамками. Сенсорный экран, возможность встраивания в мебель и витрины. Идеален для презентации продуктов.",
    applications: ["Витрины", "Шоурумы", "Музеи", "Luxury-ритейл"]
  },
  {
    id: "led-mesh-1x1",
    name: "Прозрачный LED экран-сетка 1×1 м",
    category: "Прозрачные экраны",
    specs: [
      { label: "Размер", value: "1 × 1 м" },
      { label: "Разрешение", value: "256 × 256 px" },
      { label: "Вес", value: "10 кг" },
      { label: "Тип", value: "Прозрачный" }
    ],
    description: "Тонкий прозрачный экран для оформления витрин и подвесных конструкций. Контент виден на большом расстоянии, при этом сохраняется видимость фона.",
    applications: ["Витрины магазинов", "Подвесные конструкции", "Декорации"]
  },
  {
    id: "led-flexible",
    name: "Модульный прозрачный LED-экран (гибкий)",
    category: "Прозрачные экраны",
    badge: "Гибкий",
    badgeColor: "bg-gradient-to-r from-cyan-500 to-blue-500",
    specs: [
      { label: "Размер модуля", value: "1 × 0,4 м" },
      { label: "Шаг пикселя", value: "6 мм" },
      { label: "В наличии", value: "8 модулей" },
      { label: "Особенность", value: "Гибкий" }
    ],
    description: "Гибкие прозрачные модули для нестандартных поверхностей. Можно крепить на изогнутые конструкции, колонны, арки.",
    applications: ["Криволинейные поверхности", "Арки", "Колонны"]
  },
  {
    id: "led-fabric",
    name: "Транспарентная LED-ткань P15",
    category: "LED-ткань",
    badge: "Инновация",
    badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500",
    specs: [
      { label: "Размер", value: "1,5 × 4 м (в наличии)" },
      { label: "Плотность", value: "4356 точек/м²" },
      { label: "Вес", value: "1,4 кг/м²" },
      { label: "Автономность", value: "от 3 часов" }
    ],
    description: "Революционная светодиодная ткань — лёгкая, гибкая, работает от пауэрбанка. Идеальна для костюмов, занавесов, движущихся арт-объектов.",
    applications: ["Шоу-программы", "Театр", "Перформансы", "Костюмы"]
  },
  {
    id: "led-mesh-ultra",
    name: "Сверхлёгкая гибкая LED-сетка",
    category: "LED-сетка",
    badge: "Инновация",
    badgeColor: "bg-gradient-to-r from-green-500 to-emerald-500",
    specs: [
      { label: "Конфигурации", value: "P6.25 / P15 / P20" },
      { label: "Вес", value: "от 0,9 кг/м²" },
      { label: "Макс. размер", value: "100 × 15 м" },
      { label: "Автономность", value: "от 3 часов" }
    ],
    description: "Ультралёгкая LED-сетка для масштабных инсталляций. Беспроводное управление, каскадное подключение. Подходит для флагов, занавесов, архитектурных форм.",
    applications: ["Стадионы", "Концерты", "Спортивный маркетинг", "Театры"]
  },
  {
    id: "hisense-75",
    name: "Коммерческий дисплей Hisense 75\"",
    category: "Профессиональные дисплеи",
    specs: [
      { label: "Диагональ", value: "75 дюймов" },
      { label: "Разрешение", value: "4K Ultra HD" },
      { label: "Особенности", value: "8 микрофонов, 4K-камера" },
      { label: "Сенсорный ввод", value: "Да" }
    ],
    description: "Интерактивный коммерческий дисплей с технологией отслеживания говорящего. Встроенный WiFi, датчик освещённости. Идеален для переговорных и презентаций.",
    applications: ["Переговорные", "Конференц-залы", "Презентации"]
  },
  {
    id: "hisense-43",
    name: "Дисплей Hisense 43\"",
    category: "Профессиональные дисплеи",
    specs: [
      { label: "Диагональ", value: "43 дюйма" },
      { label: "Разрешение", value: "4K Ultra HD" },
      { label: "Формат", value: "Компактный" }
    ],
    description: "Компактный 4K-дисплей для небольших помещений, информационных стендов и цифровых вывесок.",
    applications: ["Небольшие переговорные", "Информационные стенды"]
  }
];

// Проекторы
const projectors: EquipmentItem[] = [
  {
    id: "epson-pu2220b",
    name: "Epson EB-PU2220B (20 000 люмен)",
    category: "Инсталляционные проекторы",
    badge: "Топ выбор",
    badgeColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
    specs: [
      { label: "Яркость", value: "20 000 ANSI люмен" },
      { label: "Разрешение", value: "WUXGA (1920 × 1200)" },
      { label: "Технология", value: "Лазер, 3LCD" },
      { label: "Вес", value: "24 кг" }
    ],
    description: "Мощный лазерный проектор для больших залов и архитектурного маппинга. Высокая яркость обеспечивает чёткое изображение даже при дневном свете.",
    applications: ["Конференц-залы", "3D mapping", "Большие экраны"]
  },
  {
    id: "epson-l1715s",
    name: "Epson L1715s (15 000 люмен)",
    category: "Инсталляционные проекторы",
    specs: [
      { label: "Яркость", value: "15 000 ANSI люмен" },
      { label: "Разрешение", value: "1400 × 1050 px" },
      { label: "Технология", value: "Лазер, 3LCD" },
      { label: "Линзы", value: "Сменные (0.35–7.41)" }
    ],
    description: "Универсальный лазерный проектор с широким выбором сменных линз. Подходит для различных дистанций проекции.",
    applications: ["Конференции", "Выставки", "Проекция на экраны"]
  },
  {
    id: "diello-ust",
    name: "DIELLO DL-LU525UST (ультракороткофокусный)",
    category: "Ультракороткофокусные",
    badge: "УКФ",
    badgeColor: "bg-gradient-to-r from-teal-500 to-cyan-500",
    specs: [
      { label: "Яркость", value: "5 250 люмен" },
      { label: "Разрешение", value: "WUXGA (1920 × 1200)" },
      { label: "Throw ratio", value: "0.23:1" },
      { label: "Размер экрана", value: "80\"–180\"" }
    ],
    description: "Ультракороткофокусный проектор для установки вплотную к экрану. Идеален для интерактивных досок и ограниченных пространств.",
    applications: ["Переговорные", "Интерактивные доски", "Музеи"]
  },
  {
    id: "qumi",
    name: "Компактный проектор QUMI",
    category: "Мобильные проекторы",
    badge: "Компактный",
    badgeColor: "bg-gradient-to-r from-violet-500 to-purple-500",
    specs: [
      { label: "Яркость", value: "1 000 люмен" },
      { label: "Разрешение", value: "Full HD (1920 × 1080)" },
      { label: "Вес", value: "0,5 кг" },
      { label: "Размер экрана", value: "до 200\"" }
    ],
    description: "Ультракомпактный проектор весом всего 500 грамм. Идеален для мобильных презентаций и выездных мероприятий.",
    applications: ["Мобильные презентации", "Выездные мероприятия"]
  },
  {
    id: "compact-4k",
    name: "Ультракомпактный 4K-проектор",
    category: "Мобильные проекторы",
    badge: "4K",
    badgeColor: "bg-gradient-to-r from-rose-500 to-red-500",
    specs: [
      { label: "Яркость", value: "800 люмен" },
      { label: "Разрешение", value: "4K (3840 × 2160)" },
      { label: "Вес", value: "0,8 кг" },
      { label: "Питание", value: "От пауэрбанка" }
    ],
    description: "Карманный 4K-проектор с возможностью работы от пауэрбанка. Максимальная мобильность при высоком разрешении.",
    applications: ["Выездные презентации", "Демо на встречах"]
  },
  {
    id: "gobo-eidolon",
    name: "Гобо-проектор Arctik EIDOLON 800",
    category: "Гобо-проекторы",
    specs: [
      { label: "Мощность LED", value: "600 Вт" },
      { label: "Цветовая температура", value: "6500K" },
      { label: "Сила света", value: "2 455 300 кд" },
      { label: "Зум", value: "5°–52° (моторизированный)" }
    ],
    description: "Архитектурный LED-проектор для логотипов, эффектов и гобо. Проекция на фасады зданий, художественное освещение катков, ярмарок, праздничных инсталляций.",
    applications: ["Проекция логотипов", "Фасадное освещение", "События"]
  }
];

// Проекционные поверхности
const projectionSurfaces: EquipmentItem[] = [
  {
    id: "screen-150",
    name: "Проекционный экран на раме 150\"",
    category: "Экраны",
    specs: [
      { label: "Диагональ", value: "150 дюймов" },
      { label: "Тип проекции", value: "Прямая и обратная" },
      { label: "Конструкция", value: "На раме" }
    ],
    description: "Профессиональный проекционный экран на жёсткой раме. Поддерживает как прямую, так и обратную проекцию.",
    applications: ["Конференции", "Презентации", "Кинопоказы"]
  },
  {
    id: "tuchler-black-16x10",
    name: "Проекционная чёрная сетка TUCHLER 16×10 м",
    category: "Проекционные сетки",
    badge: "Масштаб",
    badgeColor: "bg-gradient-to-r from-slate-600 to-slate-800",
    specs: [
      { label: "Размер", value: "16 × 10 м" },
      { label: "Цвет", value: "Чёрный" },
      { label: "Тип проекции", value: "Прямая и обратная" },
      { label: "Бренд", value: "TUCHLER" }
    ],
    description: "Профессиональная проекционная сетка для масштабных инсталляций. Создаёт эффект парящего изображения в пространстве.",
    applications: ["Театры", "Концерты", "Масштабные шоу"]
  },
  {
    id: "tuchler-white-10x4",
    name: "Проекционная белая сетка TUCHLER 10×4 м",
    category: "Проекционные сетки",
    specs: [
      { label: "Размер", value: "10 × 4 м" },
      { label: "Цвет", value: "Белый" },
      { label: "В наличии", value: "4 шт" },
      { label: "Тип проекции", value: "Прямая и обратная" }
    ],
    description: "Белая проекционная сетка для более яркого изображения. Доступно несколько полотен для масштабных инсталляций.",
    applications: ["Сценография", "Инсталляции", "Выставки"]
  },
  {
    id: "showtex-4x5",
    name: "Проекционная чёрная сетка ShowTex 4×5 м",
    category: "Проекционные сетки",
    specs: [
      { label: "Размер", value: "4 × 5 м" },
      { label: "Цвет", value: "Чёрный" },
      { label: "В наличии", value: "4 шт" },
      { label: "Бренд", value: "ShowTex" }
    ],
    description: "Компактные проекционные сетки для средних инсталляций. Можно комбинировать несколько полотен.",
    applications: ["Выставки", "Презентации", "Театральные постановки"]
  },
  {
    id: "holo-tuchler",
    name: "Голографическая сетка TUCHLER 1×1 м",
    category: "Голографические сетки",
    badge: "Голография",
    badgeColor: "bg-gradient-to-r from-fuchsia-500 to-pink-500",
    specs: [
      { label: "Размер", value: "1 × 1 м" },
      { label: "Цвета", value: "Серая и белая" },
      { label: "Эффект", value: "Голографический" }
    ],
    description: "Специальная сетка для создания голографических эффектов. Изображение кажется парящим в воздухе.",
    applications: ["Голографические шоу", "Презентации", "Инсталляции"]
  },
  {
    id: "nano-air",
    name: "Прозрачный экран Nano Air 2×1 м",
    category: "Прозрачные экраны",
    specs: [
      { label: "Размер", value: "2 × 1 м" },
      { label: "Тип", value: "Прозрачный" },
      { label: "Материал", value: "Nano Air" }
    ],
    description: "Прозрачный проекционный экран нового поколения. Изображение видно с обеих сторон при сохранении прозрачности.",
    applications: ["Витрины", "Шоурумы", "Голографические эффекты"]
  }
];

// Медиа-серверы
const mediaServers: EquipmentItem[] = [
  {
    id: "watchout-4x4k",
    name: "Watchout DATATONE Media Server 4×4K",
    category: "Медиа-серверы",
    badge: "Топ",
    badgeColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
    specs: [
      { label: "Выходы", value: "4 × DisplayPort 1.4 (4K)" },
      { label: "Процессор", value: "Intel Core i9" },
      { label: "RAM", value: "32 ГБ DDR4" },
      { label: "ПО", value: "Dataton WATCHOUT 6" }
    ],
    description: "Флагманский медиа-сервер для сложных многоэкранных инсталляций. 4 независимых 4K-выхода, поддержка EDID эмуляции, видеозахват.",
    applications: ["Многоэкранные инсталляции", "Mapping", "Выставки"]
  },
  {
    id: "resolume-2x4k",
    name: "Resolume Media Server 2×4K",
    category: "Медиа-серверы",
    specs: [
      { label: "Выходы", value: "8 × DisplayPort" },
      { label: "Процессор", value: "Intel Xeon" },
      { label: "RAM", value: "64 ГБ DDR4" },
      { label: "ПО", value: "Resolume Arena" }
    ],
    description: "Мощный сервер с двумя профессиональными видеокартами для масштабных проектов. 8 независимых выходов.",
    applications: ["VJ-инсталляции", "Концерты", "Масштабные шоу"]
  },
  {
    id: "resolume-1x4k",
    name: "Resolume Media Server 1×4K",
    category: "Медиа-серверы",
    badge: "Компактный",
    badgeColor: "bg-gradient-to-r from-violet-500 to-purple-500",
    specs: [
      { label: "Выходы", value: "4 × DisplayPort" },
      { label: "Процессор", value: "Intel Core i7" },
      { label: "RAM", value: "32 ГБ DDR4" },
      { label: "ПО", value: "Resolume Arena" }
    ],
    description: "Компактный медиа-сервер для средних проектов. 4 выхода, полная функциональность Resolume Arena.",
    applications: ["Презентации", "Небольшие инсталляции", "События"]
  }
];

// Коммутация
const switching: EquipmentItem[] = [
  {
    id: "matrix-8x8",
    name: "Матричный коммутатор Infobit iMatrix H88 8×8",
    category: "Матричные коммутаторы",
    specs: [
      { label: "Конфигурация", value: "8 входов × 8 выходов" },
      { label: "Стандарт", value: "HDMI 18 Гбит/с, 4K@60" },
      { label: "Технология", value: "HDBaseT" }
    ],
    description: "Профессиональный матричный коммутатор для разветвления и маршрутизации видеосигналов. 8 входов на 8 выходов с поддержкой 4K.",
    applications: ["Конференц-залы", "Ситуационные центры", "Студии"]
  },
  {
    id: "matrix-4x4",
    name: "Матричный коммутатор Infobit iMatrix H44A 4×4",
    category: "Матричные коммутаторы",
    specs: [
      { label: "Конфигурация", value: "4 входа × 4 выхода" },
      { label: "Стандарт", value: "HDMI 4K@60" }
    ],
    description: "Компактный матричный коммутатор для небольших инсталляций. 4 входа на 4 выхода с полной поддержкой 4K.",
    applications: ["Переговорные", "Небольшие мероприятия"]
  },
  {
    id: "splitter-1x4",
    name: "HDMI Splitter 1×4 (до 8K)",
    category: "Разветвители",
    specs: [
      { label: "Конфигурация", value: "1 вход × 4 выхода" },
      { label: "Пропускная способность", value: "48 Гбит/с" },
      { label: "Поддержка", value: "до 8K" }
    ],
    description: "Усилитель-разделитель сигнала HDMI. Один источник на 4 дисплея с поддержкой разрешения до 8K.",
    applications: ["Дублирование сигнала на несколько экранов"]
  },
  {
    id: "extender-150m",
    name: "HDMI HDBaseT Extender 150 м",
    category: "Удлинители",
    specs: [
      { label: "Дальность", value: "до 150 метров" },
      { label: "Кабель", value: "Один CAT5e/6" },
      { label: "Стандарт", value: "HDMI 18 Гбит/с" }
    ],
    description: "Удлинитель HDMI-сигнала на расстояние до 150 метров по одному сетевому кабелю. В комплекте приёмник и передатчик.",
    applications: ["Крупные площадки", "Удалённые дисплеи"]
  },
  {
    id: "usb-extender",
    name: "Удлинитель USB 2.0 Infobit iTrans (100 м)",
    category: "Удлинители",
    specs: [
      { label: "Дальность", value: "до 100 метров" },
      { label: "Стандарт", value: "USB 2.0" },
      { label: "Комплект", value: "Приёмник + передатчик" }
    ],
    description: "Удлинитель USB-сигнала для подключения периферии на большом расстоянии. Идеален для интерактивных инсталляций.",
    applications: ["Интерактивные экраны", "Удалённая периферия"]
  },
  {
    id: "ups-3kw",
    name: "Источник бесперебойного питания DEXP 3 кВт",
    category: "Питание",
    specs: [
      { label: "Мощность", value: "3 кВт" },
      { label: "Тип", value: "LCD-дисплей" },
      { label: "Назначение", value: "Защита оборудования" }
    ],
    description: "ИБП для защиты проекционного и медиа-оборудования от скачков напряжения и отключений электричества.",
    applications: ["Защита критичного оборудования"]
  }
];

// Видеокамеры
const cameras: EquipmentItem[] = [
  {
    id: "ptz-panasonic",
    name: "PTZ-камера Panasonic AW-UE50KEJ",
    category: "PTZ-камеры",
    badge: "Профи",
    badgeColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
    specs: [
      { label: "Зум", value: "24× оптический (до 36× в Full HD)" },
      { label: "Угол обзора", value: "74,1°" },
      { label: "Разрешение", value: "4K UHD" },
      { label: "Управление", value: "Дистанционное" }
    ],
    description: "Профессиональная PTZ-камера с широкоугольным объективом и интеллектуальным зумом. Идеальна для больших переговорных и конференц-залов.",
    applications: ["Трансляции", "Гибридные мероприятия", "Конференц-залы"]
  },
  {
    id: "conf-cam-p20",
    name: "Конференц-камера Infobit iCam P20",
    category: "Конференц-камеры",
    specs: [
      { label: "Зум", value: "12× оптический + 16× цифровой" },
      { label: "Автотрекинг", value: "Да" },
      { label: "Назначение", value: "Конференции без оператора" }
    ],
    description: "Интеллектуальная камера с автоматическим отслеживанием объектов. Не требует оператора — сама следит за спикером.",
    applications: ["Переговорные", "Онлайн-конференции", "Трансляции"]
  },
  {
    id: "camcorder-panasonic",
    name: "Камкордер Panasonic AG-CX350EJ",
    category: "Профессиональные камкордеры",
    specs: [
      { label: "Съёмка", value: "4K, 10-бит, 60 к/с" },
      { label: "HDR", value: "Поддержка" },
      { label: "Стабилизация", value: "Оптическая" },
      { label: "Сенсор", value: "1.0\" MOS" }
    ],
    description: "Профессиональный камкордер для съёмки событий в 4K с поддержкой HDR. Интеллектуальный автофокус, высокая детализация.",
    applications: ["Съёмка мероприятий", "Репортажи", "Производство контента"]
  },
  {
    id: "camera-360",
    name: "Камера 360°",
    category: "Специальные камеры",
    specs: [
      { label: "Обзор", value: "360°" },
      { label: "Назначение", value: "VR-контент, соцсети" }
    ],
    description: "Профессиональная камера 360 для создания контента виртуальной реальности и захватывающего контента для социальных сетей.",
    applications: ["VR-контент", "Instagram", "YouTube 360"]
  },
  {
    id: "steadicam-q3",
    name: "Стедикам SMOOTH Q3",
    category: "Стабилизаторы",
    specs: [
      { label: "Функции", value: "Стабилизация, автотрекинг" },
      { label: "Управление", value: "Жестами" },
      { label: "Совместимость", value: "Смартфоны" }
    ],
    description: "Интеллектуальный стабилизатор с функцией автоматического слежения и управления жестами. Плавная съёмка без тряски.",
    applications: ["Мобильная съёмка", "Контент для соцсетей"]
  },
  {
    id: "mixer-panasonic",
    name: "Видеомикшер Panasonic AV-HLC100E",
    category: "Микшеры",
    specs: [
      { label: "Тип", value: "1ME видеомикшер" },
      { label: "Функции", value: "Управление PTZ, звуковой микшер" },
      { label: "Режим", value: "Работа одного оператора" }
    ],
    description: "Универсальный видеомикшер для прямых трансляций. Один оператор может управлять камерами, видео и звуком одновременно.",
    applications: ["Прямые трансляции", "Гибридные мероприятия"]
  }
];

// VR/AR
const vrAr: EquipmentItem[] = [
  {
    id: "quest-2",
    name: "VR-шлем Oculus Meta Quest 2",
    category: "VR-устройства",
    badge: "Популярный",
    badgeColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
    specs: [
      { label: "Тип", value: "Автономный VR-шлем" },
      { label: "Разрешение", value: "Высокое" },
      { label: "Назначение", value: "VR-кинотеатры, игры" }
    ],
    description: "Мощный автономный VR-шлем без проводов. Подходит для геймеров и профессионалов. Идеален для VR-кинотеатров на мероприятиях.",
    applications: ["VR-зоны на мероприятиях", "Обучение", "Презентации"]
  },
  {
    id: "xreal",
    name: "AR-очки Xreal",
    category: "AR-устройства",
    specs: [
      { label: "Тип", value: "Очки дополненной реальности" },
      { label: "Дизайн", value: "Элегантный" },
      { label: "Качество изображения", value: "Высокое" }
    ],
    description: "Революционные AR-очки с невероятным качеством изображения. Элегантный дизайн, передовые технологии взаимодействия с окружающим миром.",
    applications: ["AR-презентации", "Обучение", "Развлечения"]
  },
  {
    id: "nreal-air",
    name: "Очки смешанной реальности Nreal Air",
    category: "MR-устройства",
    specs: [
      { label: "Вес", value: "76 грамм" },
      { label: "Дисплей", value: "micro-OLED 1920×1080" },
      { label: "Частота", value: "90 Гц" }
    ],
    description: "Ультралёгкие очки смешанной реальности. Выглядят как обычные солнцезащитные очки. Высокая детализация, плавная картинка.",
    applications: ["MR-демонстрации", "Презентации", "Развлечения"]
  },
  {
    id: "kinect-2",
    name: "Камера глубины Kinect 2.0",
    category: "Сенсоры",
    specs: [
      { label: "Технология", value: "Real Vision" },
      { label: "Возможности", value: "Работа в темноте, 3D-геометрия" },
      { label: "Отслеживание", value: "Движения, положения тела" }
    ],
    description: "Сенсор для отслеживания движений и жестов. Позволяет создавать интерактивные игры и инсталляции с управлением телом.",
    applications: ["Интерактивные игры", "Спортивные симуляторы", "Инсталляции"]
  },
  {
    id: "lidar-s2e",
    name: "Лидар RPLIDAR S2E",
    category: "Сенсоры",
    specs: [
      { label: "Радиус действия", value: "30–50 метров" },
      { label: "Назначение", value: "Навигация, картографирование" }
    ],
    description: "Лидар для интерактивных инсталляций, навигации роботов и точного позиционирования в пространстве.",
    applications: ["Интерактивные стены", "Роботизированные системы"]
  },
  {
    id: "lidar-s3",
    name: "Лидар RPLIDAR S3",
    category: "Сенсоры",
    specs: [
      { label: "Радиус", value: "40 метров (стабильный)" },
      { label: "Выборка", value: "32 000 раз/сек" },
      { label: "Точность", value: "Высокая" }
    ],
    description: "Высокоточный лидар для масштабных интерактивных инсталляций. Быстрое и точное картографирование пространства.",
    applications: ["Большие интерактивные зоны", "Музеи", "Выставки"]
  },
  {
    id: "sandbox",
    name: "Интерактивная песочница",
    category: "Интерактивные комплексы",
    badge: "Дети",
    badgeColor: "bg-gradient-to-r from-amber-500 to-yellow-500",
    specs: [
      { label: "Технология", value: "AR + камера глубины" },
      { label: "Назначение", value: "Образование, развлечение" }
    ],
    description: "Комплекс дополненной реальности: дети строят на песке миры с горами, озёрами, вулканами. Изучение географии, развитие логики.",
    applications: ["Детские зоны", "Образовательные мероприятия"]
  },
  {
    id: "wishbook",
    name: "Интерактивная книга пожеланий",
    category: "Интерактивные комплексы",
    specs: [
      { label: "Диагональ", value: "31,5\"" },
      { label: "Разрешение", value: "Full HD" },
      { label: "Сенсор", value: "10 касаний" },
      { label: "Функции", value: "Пожелания, регистрация" }
    ],
    description: "Мультимедийная книга в форме раскрытой книги. Гости оставляют пожелания, фото сохраняются, данные собираются для рассылки.",
    applications: ["Свадьбы", "Корпоративы", "Презентации"]
  },
  {
    id: "holo-fan",
    name: "3D-голографический вентилятор (1 м)",
    category: "Голография",
    specs: [
      { label: "Диаметр", value: "1 метр" },
      { label: "Эффект", value: "3D-голограмма" },
      { label: "Яркость", value: "Высокая" }
    ],
    description: "Светодиодный вентилятор, создающий эффект парящей в воздухе голограммы. Яркое, контрастное 3D-изображение.",
    applications: ["Рекламные инсталляции", "Выставки", "Ритейл"]
  },
  {
    id: "scanner-sv600",
    name: "Сканер открытого типа ScanSnap SV600",
    category: "Сканеры",
    specs: [
      { label: "Тип", value: "Планетарный (бесконтактный)" },
      { label: "Разрешение", value: "Высокое" },
      { label: "Назначение", value: "Сканирование без контакта" }
    ],
    description: "Бесконтактный сканер для оцифровки документов и объектов без физического прикосновения. Идеален для музеев и архивов.",
    applications: ["Музеи", "Интерактивные экспозиции", "Архивы"]
  }
];

// Световое оборудование
const lighting: EquipmentItem[] = [
  {
    id: "flex-neon",
    name: "Гибкий управляемый неон (13 м)",
    category: "LED-освещение",
    specs: [
      { label: "Длина", value: "13 метров" },
      { label: "Эффекты", value: "Многоцветные, динамические" },
      { label: "Управление", value: "Программируемое" }
    ],
    description: "Гибкий LED-неон для создания световых эффектов любой сложности. От простых статичных до сложных динамических изображений.",
    applications: ["Вывески", "Витрины", "Дискотеки", "Шоу"]
  }
];

// Линзы
const lenses: { model: string; throwRatio: string; description: string }[] = [
  { model: "Epson ELPLL08", throwRatio: "5.27–7.41", description: "Длиннофокусная — для больших дистанций" },
  { model: "Epson ELPLW06", throwRatio: "1.19–1.62", description: "Широкоугольная — для средних помещений" },
  { model: "Epson ELPLW05", throwRatio: "1.04–1.46", description: "Для проектора L1755, средние дистанции" },
  { model: "Epson ELPLM15", throwRatio: "1.57–2.56", description: "Универсальная — широкий диапазон" }
];

// Компонент карточки оборудования
const EquipmentCard = ({ item }: { item: EquipmentItem }) => (
  <Card className="group h-full bg-white border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all duration-500 overflow-hidden">
    <CardHeader className="pb-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant="outline" className="text-xs text-slate-500 border-slate-300">
              {item.category}
            </Badge>
            {item.badge && (
              <Badge className={`text-xs text-white border-0 ${item.badgeColor}`}>
                {item.badge}
              </Badge>
            )}
          </div>
          <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {item.name}
          </CardTitle>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      {/* Характеристики */}
      <div className="bg-slate-50 rounded-xl p-4 space-y-2">
        {item.specs.map((spec, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-slate-500">{spec.label}</span>
            <span className="font-medium text-slate-800">{spec.value}</span>
          </div>
        ))}
      </div>
      
      {/* Описание */}
      <p className="text-slate-600 text-sm leading-relaxed">
        {item.description}
      </p>
      
      {/* Применение */}
      <div className="flex flex-wrap gap-1.5">
        {item.applications.map((app, idx) => (
          <Badge key={idx} variant="secondary" className="text-xs bg-blue-50 text-blue-700 hover:bg-blue-100">
            {app}
          </Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter className="pt-4 border-t border-slate-100">
      <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white group-hover:shadow-lg transition-all">
        Запросить стоимость
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </CardFooter>
  </Card>
);

// Основной компонент страницы
const RentalMultimediaEquipment = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveCategory(id);
  };

  const processSteps = [
    { step: "01", title: "Заявка", description: "Опишите задачу, площадку и даты — мы подберём оптимальный комплект оборудования", icon: FileText },
    { step: "02", title: "Расчёт", description: "Получите детальную смету с учётом доставки, монтажа и техподдержки", icon: Calculator },
    { step: "03", title: "Доставка и монтаж", description: "Привезём оборудование, смонтируем и настроим на вашей площадке", icon: Truck },
    { step: "04", title: "Техподдержка", description: "Наши инженеры на связи во время мероприятия — оперативно решим любые вопросы", icon: Headphones },
    { step: "05", title: "Демонтаж", description: "После мероприятия демонтируем и вывезем всё оборудование", icon: Wrench }
  ];

  const services = [
    { icon: Truck, title: "Доставка", description: "Доставка оборудования по Москве и всей России" },
    { icon: Wrench, title: "Монтаж и настройка", description: "Профессиональный монтаж и калибровка оборудования" },
    { icon: Users, title: "Техническое сопровождение", description: "Инженер на площадке во время мероприятия" },
    { icon: Video, title: "Производство контента", description: "Создание видео, анимации, интерактивного ПО" },
    { icon: FileText, title: "Проектирование", description: "Разработка технического решения под вашу задачу" },
    { icon: MessageCircle, title: "Консультация", description: "Поможем выбрать оптимальное решение" }
  ];

  const faqItems = [
    { q: "Работаете ли вы в регионах?", a: "Да, доставляем и монтируем оборудование по всей России. Стоимость логистики рассчитывается отдельно." },
    { q: "Можно ли арендовать оборудование без монтажа?", a: "Да, возможен самовывоз и самостоятельная установка. Но мы рекомендуем профессиональный монтаж для гарантии качества." },
    { q: "За сколько дней нужно бронировать?", a: "Рекомендуем бронировать минимум за 5–7 дней. В высокий сезон — за 2–3 недели." },
    { q: "Что делать, если оборудование вышло из строя?", a: "При техническом сопровождении — оперативно заменим или отремонтируем. Без сопровождения — связывайтесь с нами для решения." },
    { q: "Есть ли оборудование, которого нет в каталоге?", a: "Каталог не исчерпывающий. Если нужно что-то специфическое — спрашивайте, найдём или привезём." }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24">
        {/* HERO SECTION */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20">
          {/* Декоративные элементы */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-200/40 to-cyan-200/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-indigo-200/30 to-blue-200/30 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/80 to-transparent rounded-full"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              <AnimatedContent distance={60} delay={0.2}>
                <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-blue-100 text-sm font-medium text-blue-700 mb-8 shadow-sm">
                  <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                  WESHOW.SU — Аренда профессионального оборудования
                </div>
              </AnimatedContent>
              
              <AnimatedContent distance={80} delay={0.4}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                  <span className="text-slate-900">Аренда профессионального</span>
                  <br />
                  <GradientText
                    colors={['#3b82f6', '#06b6d4', '#0ea5e9', '#3b82f6']}
                    animationSpeed={6}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold"
                  >
                    мультимедийного оборудования
                  </GradientText>
                </h1>
              </AnimatedContent>
              
              <AnimatedContent distance={60} delay={0.6}>
                <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl mx-auto">
                  Современное оборудование для мероприятий любого масштаба — от камерных презентаций до международных конференций. Доставка, монтаж, настройка и техническое сопровождение.
                </p>
              </AnimatedContent>
              
              <AnimatedContent distance={40} delay={0.8}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                    Получить расчёт
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg">
                    <Download className="w-5 h-5 mr-2" />
                    Скачать каталог PDF
                  </Button>
                </div>
              </AnimatedContent>
              
              <AnimatedContent distance={30} delay={1}>
                <div className="flex flex-wrap justify-center gap-6">
                  {[
                    "Доставка по всей России",
                    "Техподдержка 24/7",
                    "Монтаж под ключ"
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-center text-slate-600">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </AnimatedContent>
            </div>
          </div>
        </section>

        {/* КАТЕГОРИИ ОБОРУДОВАНИЯ */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                  Каталог оборудования
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Выберите категорию или прокрутите страницу для просмотра всего каталога
                </p>
              </div>
            </AnimatedContent>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
              {categories.map((cat, index) => (
                <AnimatedContent key={cat.id} distance={50} delay={index * 0.05}>
                  <button
                    onClick={() => scrollToSection(cat.id)}
                    className={`group p-5 rounded-2xl border-2 transition-all duration-300 text-left w-full ${
                      activeCategory === cat.id 
                        ? 'border-blue-500 bg-blue-50 shadow-lg' 
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 hover:shadow-md'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <cat.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 text-sm mb-1 leading-tight">{cat.name}</h3>
                    <p className="text-xs text-slate-500">{cat.count} позиций</p>
                  </button>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* LED-ЭКРАНЫ И ДИСПЛЕИ */}
        <section id="led-screens" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Monitor className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">LED-экраны и дисплеи</h2>
                  <p className="text-slate-600">От классических видеостен до инновационных кинетических и прозрачных решений</p>
                </div>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {ledScreens.map((item, index) => (
                <AnimatedContent key={item.id} distance={60} delay={index * 0.08}>
                  <EquipmentCard item={item} />
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* ПРОЕКТОРЫ */}
        <section id="projectors" className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Projector className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Проекторы</h2>
                  <p className="text-slate-600">Лазерные инсталляционные проекторы для любых задач — от мобильных презентаций до архитектурного маппинга</p>
                </div>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {projectors.map((item, index) => (
                <AnimatedContent key={item.id} distance={60} delay={index * 0.08}>
                  <EquipmentCard item={item} />
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* ПРОЕКЦИОННЫЕ ПОВЕРХНОСТИ */}
        <section id="projection-surfaces" className="py-20 bg-gradient-to-br from-slate-50 to-purple-50/30">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Проекционные поверхности</h2>
                  <p className="text-slate-600">Экраны, сетки и специальные материалы для прямой и обратной проекции</p>
                </div>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {projectionSurfaces.map((item, index) => (
                <AnimatedContent key={item.id} distance={60} delay={index * 0.08}>
                  <EquipmentCard item={item} />
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* СИСТЕМЫ УПРАВЛЕНИЯ */}
        <section id="media-servers" className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                  <Cpu className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Медиа-серверы и системы управления</h2>
                  <p className="text-slate-600">Профессиональные решения для управления многоканальным видеоконтентом</p>
                </div>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {mediaServers.map((item, index) => (
                <AnimatedContent key={item.id} distance={60} delay={index * 0.08}>
                  <EquipmentCard item={item} />
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* КОММУТАЦИЯ */}
        <section id="switching" className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50/30">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                  <Cable className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Коммутация и передача сигнала</h2>
                  <p className="text-slate-600">Матричные коммутаторы, удлинители и разветвители для профессиональной AV-инфраструктуры</p>
                </div>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {switching.map((item, index) => (
                <AnimatedContent key={item.id} distance={60} delay={index * 0.08}>
                  <EquipmentCard item={item} />
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* ВИДЕОКАМЕРЫ */}
        <section id="cameras" className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-red-500 flex items-center justify-center">
                  <Camera className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Видеокамеры и съёмочное оборудование</h2>
                  <p className="text-slate-600">Профессиональные камеры для трансляций, конференций и производства контента</p>
                </div>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {cameras.map((item, index) => (
                <AnimatedContent key={item.id} distance={60} delay={index * 0.08}>
                  <EquipmentCard item={item} />
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* VR/AR */}
        <section id="vr-ar" className="py-20 bg-gradient-to-br from-slate-50 to-violet-50/30">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                  <Glasses className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">VR/AR и интерактивные системы</h2>
                  <p className="text-slate-600">Погружение в виртуальные миры и взаимодействие с цифровым контентом</p>
                </div>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {vrAr.map((item, index) => (
                <AnimatedContent key={item.id} distance={60} delay={index * 0.08}>
                  <EquipmentCard item={item} />
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* СВЕТОВОЕ ОБОРУДОВАНИЕ */}
        <section id="lighting" className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Lightbulb className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Световое оборудование</h2>
                  <p className="text-slate-600">Управляемый свет для создания атмосферы и спецэффектов</p>
                </div>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {lighting.map((item, index) => (
                <AnimatedContent key={item.id} distance={60} delay={index * 0.08}>
                  <EquipmentCard item={item} />
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* ЛИНЗЫ */}
        <section id="lenses" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center">
                  <Aperture className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">Линзы для проекторов</h2>
                  <p className="text-slate-600">Сменные объективы для проекторов Epson под разные дистанции</p>
                </div>
              </div>
            </AnimatedContent>

            <AnimatedContent distance={60} delay={0.2}>
              <Card className="mt-12 bg-white border-slate-200 overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Модель</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Throw Ratio</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Описание</th>
                          <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {lenses.map((lens, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-900">{lens.model}</td>
                            <td className="px-6 py-4">
                              <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                                {lens.throwRatio}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-slate-600">{lens.description}</td>
                            <td className="px-6 py-4 text-right">
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                Запросить
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              <p className="text-sm text-slate-500 mt-4 text-center">
                Перед выбором линзы рекомендуем уточнить размер проекционной области и расстояние до проектора.
              </p>
            </AnimatedContent>
          </div>
        </section>

        {/* КАК РАБОТАЕТ АРЕНДА */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                  Как арендовать оборудование
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Простой процесс от заявки до демонтажа
                </p>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <AnimatedContent key={step.step} distance={60} delay={index * 0.1}>
                  <div className="relative text-center group">
                    {/* Connecting line */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 to-cyan-200"></div>
                    )}
                    
                    <div className="relative z-10 mb-4">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                  Что входит в аренду
                </h2>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <AnimatedContent key={service.title} distance={60} delay={index * 0.1}>
                  <Card className="bg-white border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                          <service.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900 mb-2">{service.title}</h3>
                          <p className="text-slate-600 text-sm">{service.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* УСЛОВИЯ АРЕНДЫ */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                  Условия аренды
                </h2>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Стоимость", text: "Цена аренды рассчитывается индивидуально и зависит от комплектации, сроков и объёма услуг. Запросите персональный расчёт.", icon: Calculator },
                { title: "Что не входит в базовую стоимость", text: "Доставка, монтаж, демонтаж, работа инженеров, изготовление контента и каркасов рассчитываются дополнительно.", icon: FileText },
                { title: "Минимальный срок", text: "Минимальный срок аренды — 1 день. Для долгосрочных проектов предусмотрены специальные условия.", icon: Calendar }
              ].map((item, index) => (
                <AnimatedContent key={item.title} distance={60} delay={index * 0.1}>
                  <Card className="bg-gradient-to-br from-slate-50 to-blue-50/50 border-slate-200 h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-3">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.text}</p>
                    </CardContent>
                  </Card>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                  Частые вопросы
                </h2>
              </div>
            </AnimatedContent>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((faq, index) => (
                <AnimatedContent key={index} distance={40} delay={index * 0.08}>
                  <Card className="bg-white border-slate-200 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-900 mb-2">{faq.q}</h3>
                          <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600">
          <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
            <AnimatedContent distance={60}>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
                Нужен расчёт аренды?
              </h2>
            </AnimatedContent>
            
            <AnimatedContent distance={40} delay={0.2}>
              <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
                Опишите вашу задачу — подберём оптимальный комплект и рассчитаем стоимость
              </p>
            </AnimatedContent>
            
            <AnimatedContent distance={30} delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all">
                  Получить расчёт
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </AnimatedContent>
            
            <AnimatedContent distance={20} delay={0.6}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/90">
                <a href="tel:+74955807537" className="flex items-center hover:text-white transition-colors">
                  <Phone className="w-5 h-5 mr-2" />
                  +7 (495) 580-75-37
                </a>
                <a href="mailto:info@weshow.su" className="flex items-center hover:text-white transition-colors">
                  <Mail className="w-5 h-5 mr-2" />
                  info@weshow.su
                </a>
              </div>
            </AnimatedContent>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RentalMultimediaEquipment;

