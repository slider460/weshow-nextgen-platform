import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import AnimatedContent from "../../components/AnimatedContent";
import GradientText from "../../components/GradientText";
import { 
  ArrowRight, 
  CheckCircle, 
  Target,
  Zap,
  BarChart3,
  Wrench,
  Phone,
  Mail,
  Building2,
  Monitor,
  Boxes,
  Projector,
  Sparkles,
  RotateCcw,
  Hand,
  Video,
  Palette,
  Play,
  Volume2,
  Settings2,
  Cpu,
  Users,
  Brain,
  LineChart,
  Link2,
  Factory,
  Truck,
  Headphones,
  Clock,
  FileText,
  Camera,
  HelpCircle,
  Car,
  Gem,
  Landmark,
  Globe,
  MessageCircle,
  Clapperboard,
  Layers,
  Move3d,
  Eye,
  Music,
  Code,
  Package,
  ClipboardCheck,
  GraduationCap,
  AreaChart,
  ShieldCheck,
  CalendarCheck
} from "lucide-react";
import { Link } from "react-router-dom";

// Данные преимуществ
const advantages = [
  {
    icon: Target,
    title: "Полный цикл",
    description: "От первой идеи до финального отчёта — всё в одних руках. Без посредников и потери качества на стыках.",
    color: "from-cyan-500 to-teal-500"
  },
  {
    icon: Zap,
    title: "Синхронизация на миллисекундах",
    description: "Системы Show Control объединяют видео, свет, звук и движение в единое безупречное шоу.",
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: BarChart3,
    title: "Измеримый результат",
    description: "Встроенная аналитика: количество посетителей, время на стенде, конверсия в лиды — вы видите ROI.",
    color: "from-blue-500 to-indigo-500"
  },
  {
    icon: Wrench,
    title: "Техподдержка 24/7",
    description: "Наша команда на площадке во время всей выставки. Мониторинг в реальном времени, мгновенное устранение проблем.",
    color: "from-orange-500 to-amber-500"
  }
];

// Что входит в стенд
const standFeatures = [
  {
    icon: Building2,
    title: "Архитектура и конструкции",
    description: "3D-проектирование, фотореалистичная визуализация, производство модульных и эксклюзивных конструкций любой сложности."
  },
  {
    icon: Monitor,
    title: "LED-экраны и кинетические дисплеи",
    description: "От классических видеостен до кинетических экранов — каждый пиксель выезжает вперёд на 20 см с управляемой скоростью."
  },
  {
    icon: Boxes,
    title: "Naked Eye 3D",
    description: "Безочковые 3D-экраны, которые создают эффект парящих в воздухе объектов. Максимальный wow-эффект без дополнительных устройств."
  },
  {
    icon: Projector,
    title: "Projection Mapping",
    description: "Видеопроекция на сложные поверхности с LIDAR-сканированием. Стенд буквально оживает на глазах посетителей."
  },
  {
    icon: Sparkles,
    title: "Голографические системы",
    description: "Pepper's Ghost, голографические столы и volume-дисплеи — объекты парят в воздухе без специальных очков."
  },
  {
    icon: RotateCcw,
    title: "Кинетические системы",
    description: "Вращающиеся платформы, движущиеся панели, динамические элементы — всё синхронизировано с медиа."
  },
  {
    icon: Hand,
    title: "Интерактивные решения",
    description: "Сенсорные панели, датчики движения, распознавание жестов и лиц — посетитель становится участником."
  }
];

// Услуги
const services = [
  {
    id: "consulting",
    icon: Target,
    title: "Консалтинг и стратегия",
    description: "Начинаем с глубокого погружения в вашу задачу. Анализируем целевую аудиторию, формулируем KPI, предлагаем концептуальные решения и рассчитываем бюджет.",
    features: [
      "Анализ аудитории и конкурентов",
      "Стратегический план с KPI",
      "Несколько концепций на выбор",
      "Расчёт бюджета и ROI",
      "Определение технологий и типа контента"
    ],
    color: "from-cyan-500 to-teal-500"
  },
  {
    id: "design",
    icon: Palette,
    title: "Дизайн и архитектурное проектирование",
    description: "Создаём визуальную концепцию и полную техническую документацию. От первых скетчей до чертежей, готовых к производству.",
    subsections: [
      { title: "Концептуальный дизайн", text: "Несколько вариантов в стиле вашего бренда, определение материалов и планировка пространства" },
      { title: "3D-визуализация", text: "Фотореалистичные ракурсы со всех сторон, визуализация всех эффектов" },
      { title: "Техническое проектирование", text: "Чертежи, электрические схемы, сетевая архитектура, спецификация оборудования" },
      { title: "Световой дизайн", text: "Планы размещения источников света, сценарии синхронизации со звуком и видео" }
    ],
    color: "from-purple-500 to-violet-500"
  },
  {
    id: "content",
    icon: Video,
    title: "Видеоконтент и мультимедиа",
    description: "Создаём весь контент, который будет жить на вашем стенде: от видеороликов до интерактивных приложений. Полный цикл продакшена.",
    subsections: [
      { title: "Видеопроизводство", text: "Сценарий, съёмка, монтаж, цветокоррекция. Разрешение 4K и выше, 60fps" },
      { title: "3D-анимация и VFX", text: "Фотореалистичные модели ваших продуктов, визуальные эффекты, motion graphics" },
      { title: "Контент для Naked Eye 3D", text: "Специализированный контент с расчётом глубины и параллакса под конкретный угол обзора" },
      { title: "Контент для кинетических экранов", text: "Уникальный контент, синхронизированный с физическим движением пикселей" },
      { title: "Интерактивный контент", text: "HTML5/WebGL приложения, игровые элементы, триггеры для реагирования" },
      { title: "Аудиодизайн", text: "Оригинальная музыка, профессиональное озвучивание, пространственный звук" }
    ],
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: "tech-integration",
    icon: Cpu,
    title: "Интеграция сложных технологий",
    description: "Встраиваем инновационные решения в ваш стенд. От подбора оборудования до финальной калибровки.",
    subsections: [
      { title: "Кинетические LED-экраны", text: "Революционная технология: каждый пиксель способен выезжать вперёд на 20 см с программируемой скоростью" },
      { title: "Naked Eye 3D LED", text: "Безочковые 3D-экраны с яркостью до 10 000 nits — видно даже при дневном свете" },
      { title: "Projection Mapping", text: "Видеопроекция на сложные поверхности с точностью ±1-2 см. LIDAR-сканирование" },
      { title: "Голографические системы", text: "Pepper's Ghost, голографические столы для 2-4 пользователей, volume-дисплеи" },
      { title: "Кинетические системы", text: "Вращающиеся платформы до 1000 кг, линейные слайдеры до 5 м, синхронизация через DMX" }
    ],
    color: "from-orange-500 to-red-500"
  },
  {
    id: "show-control",
    icon: Settings2,
    title: "Программирование Show Control",
    description: "Разрабатываем системы, которые объединяют все элементы стенда в единое синхронизированное шоу.",
    subsections: [
      { title: "Синхронизация видео", text: "Управление несколькими экранами/проекторами, синхронизация с точностью до миллисекунд" },
      { title: "Управление светом (DMX)", text: "Полный контроль над RGB-источниками, создание световых сцен" },
      { title: "Аудиосистемы", text: "Многоканальный звук, пространственное позиционирование, реактивность" },
      { title: "Кинетика и движение", text: "Управление всеми механическими элементами, плавные траектории" },
      { title: "Интерактивные триггеры", text: "Датчики движения, распознавание жестов, RFID" }
    ],
    platforms: ["Medialon by 7thSense", "Alcorn McBride V-16", "QLab", "Кастомное ПО"],
    color: "from-teal-500 to-emerald-500"
  },
  {
    id: "software",
    icon: Code,
    title: "Кастомное программное обеспечение",
    description: "Создаём уникальные программные решения под ваши задачи. От интерактивных приложений до AI-систем.",
    subsections: [
      { title: "Интерактивные приложения", text: "Сенсорные киоски, конфигураторы продуктов, игровые механики" },
      { title: "AI-решения", text: "Распознавание лиц и эмоций, голосовые ассистенты, персонализация в реальном времени" },
      { title: "Аналитические системы", text: "Подсчёт посетителей, тепловые карты, время взаимодействия, сбор лидов" },
      { title: "Интеграции", text: "Связь с вашей CRM, синхронизация данных, API для внешних систем" }
    ],
    color: "from-violet-500 to-purple-500"
  },
  {
    id: "production",
    icon: Factory,
    title: "Производство конструкций",
    description: "Изготавливаем все элементы стенда на собственном производстве и у проверенных партнёров.",
    subsections: [
      { title: "Модульные системы", text: "Быстрая сборка/разборка, адаптация под разные площадки, экономия на повторных выставках" },
      { title: "Эксклюзивные конструкции", text: "Нестандартные формы, премиальные материалы, уникальный дизайн" },
      { title: "Технические элементы", text: "Крепления для экранов и проекторов, скрытая разводка кабелей, вентиляция" }
    ],
    color: "from-slate-600 to-slate-800"
  },
  {
    id: "logistics",
    icon: Truck,
    title: "Логистика и монтаж",
    description: "Берём на себя всю логистику и монтаж. Доставка в любую точку России и мира, профессиональная сборка.",
    features: [
      "Подготовка площадки, разметка",
      "Сборка конструкции",
      "Электромонтаж, подключение к сети",
      "Установка оборудования, настройка сети",
      "Загрузка контента, тестирование",
      "Согласование с органами надзора",
      "Обучение вашей команды"
    ],
    color: "from-amber-500 to-yellow-500"
  },
  {
    id: "support",
    icon: Headphones,
    title: "Техподдержка и аналитика",
    description: "Наша команда на площадке во время всей выставки. Мониторим системы, устраняем проблемы, собираем данные.",
    subsections: [
      { title: "Во время выставки", text: "Техническая команда на месте, мониторинг всех систем, быстрое устранение неисправностей" },
      { title: "Собираем данные", text: "Количество посетителей, среднее время на стенде, популярность зон, контактные данные" },
      { title: "После выставки", text: "Профессиональный демонтаж, итоговый аналитический отчёт, рекомендации" }
    ],
    color: "from-green-500 to-emerald-500"
  }
];

// Процесс работы
const processSteps = [
  { step: "01", title: "Консультация", description: "Встреча, обсуждение целей и задач, расчёт примерного бюджета", icon: MessageCircle },
  { step: "02", title: "Проектирование", description: "3D-дизайн, визуализация, техническое решение, согласование", icon: Palette },
  { step: "03", title: "Контент и ПО", description: "Разработка видео, анимации, программирование систем управления", icon: Clapperboard },
  { step: "04", title: "Производство", description: "Изготовление конструкции, подготовка оборудования", icon: Factory },
  { step: "05", title: "Логистика", description: "Доставка на место выставки", icon: Truck },
  { step: "06", title: "Монтаж", description: "Сборка, подключение, тестирование, обучение команды", icon: Wrench },
  { step: "07", title: "Выставка", description: "Техническая поддержка, сбор аналитики", icon: Users },
  { step: "08", title: "Анализ", description: "Итоговый отчёт, рекомендации для следующей выставки", icon: BarChart3 }
];

// Отрасли
const industries = [
  {
    icon: Cpu,
    title: "Tech и IT",
    solutions: [
      "Кинетические LED-экраны для максимального wow-эффекта",
      "Naked Eye 3D для демонстрации продуктов",
      "Интерактивные конфигураторы",
      "Реал-тайм аналитика посетителей"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Car,
    title: "Automotive",
    solutions: [
      "Вращающаяся платформа для автомобиля",
      "Синхронизированное шоу (видео + свет + звук)",
      "Projection Mapping на кузов"
    ],
    color: "from-slate-600 to-slate-800"
  },
  {
    icon: Gem,
    title: "Luxury & Fashion",
    solutions: [
      "Элегантный минималистичный дизайн",
      "Projection Mapping + голограммы",
      "Премиальное звуковое оформление"
    ],
    color: "from-amber-500 to-orange-500"
  },
  {
    icon: Landmark,
    title: "Музеи и выставки",
    solutions: [
      "Голографические персонажи-рассказчики",
      "Интерактивные образовательные инсталляции",
      "Геймификация для вовлечения"
    ],
    color: "from-purple-500 to-violet-500"
  },
  {
    icon: Globe,
    title: "Госструктуры и регионы",
    solutions: [
      "Масштабные мультимедийные инсталляции",
      "Интерактивные карты и визуализации данных",
      "Имиджевый контент высочайшего качества"
    ],
    color: "from-green-500 to-emerald-500"
  }
];

// FAQ
const faqItems = [
  {
    q: "Можно ли адаптировать стенд под другую выставку?",
    a: "Да! Модульные решения легко переиспользовать. Обновляем только контент и адаптируем под новую площадку — это значительно дешевле, чем создавать с нуля."
  },
  {
    q: "Что такое Naked Eye 3D?",
    a: "Это высокотехнологичные LED-экраны, которые показывают объёмное 3D-изображение без специальных очков. Объекты кажутся парящими прямо перед экраном — wow-эффект гарантирован."
  },
  {
    q: "Есть ли гарантия на оборудование?",
    a: "Да, гарантия на всё оборудование и программное обеспечение. Техническая поддержка во время выставки включена."
  },
  {
    q: "Можно выбрать только часть услуг?",
    a: "Конечно! Работаем по принципу «меню» — выбирайте только нужные услуги. Например, можем сделать только контент или только Show Control для вашего стенда."
  },
  {
    q: "Работаете ли вы в других городах?",
    a: "Да, работаем по всей России и за рубежом. Логистика и выезд команды на монтаж включены в смету."
  }
];

// Компонент карточки услуги
const ServiceCard = ({ service }: { service: typeof services[0] }) => (
  <Card className="bg-white border-slate-200 hover:border-cyan-300 hover:shadow-xl transition-all duration-500 h-full overflow-hidden group">
    <CardHeader className="pb-4">
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <service.icon className="w-7 h-7 text-white" />
      </div>
      <CardTitle className="text-xl font-bold text-slate-900">{service.title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <p className="text-slate-600 leading-relaxed">{service.description}</p>
      
      {service.features && (
        <ul className="space-y-2">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
      
      {service.subsections && (
        <div className="space-y-3 pt-2">
          {service.subsections.map((sub, idx) => (
            <div key={idx} className="bg-slate-50 rounded-xl p-4">
              <h4 className="font-semibold text-slate-900 mb-1">{sub.title}</h4>
              <p className="text-sm text-slate-600">{sub.text}</p>
            </div>
          ))}
        </div>
      )}
      
      {service.platforms && (
        <div className="pt-2">
          <p className="text-xs text-slate-500 mb-2">Платформы:</p>
          <div className="flex flex-wrap gap-2">
            {service.platforms.map((platform, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs bg-cyan-50 text-cyan-700">
                {platform}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </CardContent>
  </Card>
);

// Основной компонент
const TechnologicalExhibitionStands = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24">
        {/* HERO SECTION */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-cyan-50/30 to-purple-50/20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-cyan-200/40 to-purple-200/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              <AnimatedContent distance={60} delay={0.2}>
                <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-cyan-100 text-sm font-medium text-cyan-700 mb-8 shadow-sm">
                  <Sparkles className="w-4 h-4 mr-2 text-cyan-500" />
                  WESHOW.SU — Технологичные выставочные решения
                </div>
              </AnimatedContent>
              
              <AnimatedContent distance={80} delay={0.4}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                  <span className="text-slate-900">Технологичные выставочные стенды:</span>
                  <br />
                  <GradientText
                    colors={['#06b6d4', '#8b5cf6', '#06b6d4']}
                    animationSpeed={6}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold"
                  >
                    от концепции до WOW-эффекта
                  </GradientText>
                </h1>
              </AnimatedContent>
              
              <AnimatedContent distance={60} delay={0.6}>
                <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl mx-auto">
                  Проектируем и реализуем стенды, которые привлекают внимание и превращают посетителей в клиентов. Комбинируем архитектуру, мультимедиа и интерактивные сценарии в единое запоминающееся пространство.
                </p>
              </AnimatedContent>
              
              <AnimatedContent distance={40} delay={0.8}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                    Обсудить проект
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Link to="/portfolio">
                    <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-6 text-lg">
                      Смотреть кейсы
                    </Button>
                  </Link>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </section>

        {/* КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {advantages.map((adv, index) => (
                <AnimatedContent key={adv.title} distance={60} delay={index * 0.1}>
                  <Card className="h-full bg-white border-slate-200 hover:border-cyan-300 hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${adv.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <adv.icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{adv.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{adv.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* ЧТО МЫ СОЗДАЁМ */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50/30">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                  Что входит в технологичный стенд
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Каждый проект уникален, но вот технологии и решения, которые мы интегрируем чаще всего
                </p>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {standFeatures.map((feature, index) => (
                <AnimatedContent key={feature.title} distance={60} delay={index * 0.08}>
                  <Card className="h-full bg-white border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* УСЛУГИ ПОЛНОГО ЦИКЛА */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                  Услуги полного цикла
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  От стратегии до аналитики — закрываем все этапы создания технологичного стенда
                </p>
              </div>
            </AnimatedContent>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <AnimatedContent key={service.id} distance={60} delay={index * 0.08}>
                  <ServiceCard service={service} />
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* ПРОЦЕСС РАБОТЫ */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50/30">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                  Как мы работаем
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Прозрачный процесс от первого звонка до итогового отчёта
                </p>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {processSteps.map((step, index) => (
                <AnimatedContent key={step.step} distance={60} delay={index * 0.08}>
                  <div className="relative text-center group">
                    {/* Connecting line */}
                    {index < processSteps.length - 1 && index !== 3 && (
                      <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-200 to-purple-200"></div>
                    )}
                    
                    <div className="relative z-10 mb-4">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600">{step.description}</p>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* ОТРАСЛИ */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900">
                  Решения для вашей отрасли
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Опыт работы с компаниями из разных сфер
                </p>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {industries.map((industry, index) => (
                <AnimatedContent key={industry.title} distance={60} delay={index * 0.1}>
                  <Card className="h-full bg-white border-slate-200 hover:border-cyan-300 hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-5">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <industry.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-3">{industry.title}</h3>
                      <ul className="space-y-2">
                        {industry.solutions.map((solution, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle className="w-3 h-3 text-cyan-500 mt-0.5 flex-shrink-0" />
                            <span>{solution}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-cyan-50/30">
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
                        <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-4 h-4 text-cyan-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
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
        <section className="py-24 relative overflow-hidden bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
            <AnimatedContent distance={60}>
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
                Готовы создать стенд, который запомнят?
              </h2>
            </AnimatedContent>
            
            <AnimatedContent distance={40} delay={0.2}>
              <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
                Расскажите о вашем проекте — подготовим концепцию и расчёт бюджета
              </p>
            </AnimatedContent>
            
            <AnimatedContent distance={30} delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all">
                  Обсудить проект
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </AnimatedContent>
            
            <AnimatedContent distance={20} delay={0.6}>
              <p className="text-white/80">
                Или напишите нам:{" "}
                <a href="mailto:info@weshow.su" className="text-white font-medium hover:underline">
                  info@weshow.su
                </a>
              </p>
            </AnimatedContent>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TechnologicalExhibitionStands;


