import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { BentoCard } from "../../components/ui/bento-card";
import TextType from "../../components/TextType";
import { BlockGameModal } from "../../components/BlockGameModal";
import { 
  Gamepad2, 
  Smartphone, 
  Globe, 
  Zap, 
  BarChart3, 
  Palette, 
  Settings, 
  Clock,
  Infinity,
  Users,
  Edit3,
  Rocket,
  Puzzle,
  Camera,
  Trophy,
  Target,
  Brain,
  MapPin,
  QrCode,
  Smartphone as Mobile,
  Bot,
  Monitor,
  Touchpad,
  Eye,
  Sparkles,
  RefreshCw,
  Printer,
  Database,
  TrendingUp,
  FileText,
  CheckCircle2
} from "lucide-react";

// Данные услуг с изображениями
const servicesData = {
  gamification: [
    {
      title: "Брендированные игры",
      description: "Разработка соревновательных, логических или аркадных игр (раннеры, мемори, пазлы) в фирменном стиле вашей компании. Полное погружение в бренд через геймплей.",
      icon: <Trophy className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/branded-games.jpg",
      size: "default" as const,
    },
    {
      title: "Квизы и Викторины",
      description: "Интеллектуальные битвы и тесты с вариативной логикой. Идеально для проверки знаний о продукте с выдачей сертификатов или призов.",
      icon: <Brain className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/quizzes.jpg",
      size: "default" as const,
    },
    {
      title: "Виртуальные квесты",
      description: "Цифровая «охота за сокровищами». Участники выполняют задания (фото, поиск QR-кодов, GPS-метки) по всей территории выставки, используя свои смартфоны.",
      icon: <MapPin className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/virtual-quests.jpg",
      size: "wide" as const,
    },
    {
      title: "Турниры и Рейтинги",
      description: "Внедрение глобальных таблиц лидеров (Leaderboards) в реальном времени. Дух соперничества мотивирует посетителей возвращаться на стенд, чтобы улучшить результат.",
      icon: <Target className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/tournaments.jpg",
      size: "default" as const,
    },
  ],
  webMobile: [
    {
      title: "Event-приложения",
      description: "Полнофункциональные мобильные приложения с программой, нетворкингом и пуш-уведомлениями.",
      icon: <Mobile className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/event-apps.jpg",
      size: "default" as const,
    },
    {
      title: "Чат-боты и Telegram Mini Apps",
      description: "Мгновенный доступ к сервисам мероприятия без установки лишнего ПО. Регистрация, рассылки, AI-ассистенты прямо в мессенджере.",
      icon: <Bot className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/chatbots.jpg",
      size: "default" as const,
    },
    {
      title: "Браузерные игры (WebGames)",
      description: "Легкие игры, работающие на любом устройстве по ссылке или QR-коду. Адаптируются под смартфоны, планшеты и огромные видеостены.",
      icon: <Globe className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/webgames.jpg",
      size: "wide" as const,
    },
    {
      title: "ПО для сенсорных киосков",
      description: "Интуитивные интерфейсы для тач-панелей и столов (Android/Windows/iOS). Каталоги, карты навигации и презентации.",
      icon: <Touchpad className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/touch-kiosks.jpg",
      size: "default" as const,
    },
  ],
  phygital: [
    {
      title: "Phygital-игры",
      description: "Управление цифровым контентом через физические действия. Баланс-борды, датчики движения (Kinect/Lidar), лазерные касания, «умные» кнопки и реальные предметы в качестве контроллеров.",
      icon: <Zap className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/phygital-games.jpg",
      size: "large" as const,
    },
    {
      title: "AR и Дополненная реальность",
      description: "«Оживление» стенда через камеру смартфона. Виртуальные объекты, информация и персонажи поверх реального мира.",
      icon: <Eye className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/ar.jpg",
      size: "default" as const,
    },
    {
      title: "Синхронизация оборудования",
      description: "Единая экосистема управления. Нажатие кнопки на планшете меняет свет, запускает видео на стене и дым-машину одновременно.",
      icon: <RefreshCw className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/sync.jpg",
      size: "default" as const,
    },
    {
      title: "Фотобудки с AI и AR",
      description: "Виртуальная примерка, замена фона, наложение масок и мгновенная печать или отправка на почту.",
      icon: <Camera className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/photo-booths.jpg",
      size: "default" as const,
    },
  ],
  leadGeneration: [
    {
      title: "Сбор данных (Data Capture)",
      description: "Встроенные лид-формы перед началом или после игры. Локальное хранение данных в формате CSV/JSON. Соблюдение 152-ФЗ.",
      icon: <Database className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/data-capture.jpg",
      size: "default" as const,
    },
    {
      title: "Локальное хранение данных",
      description: "Все данные хранятся локально на устройстве. Возможность экспорта в удобном формате для дальнейшей обработки.",
      icon: <Database className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/local-storage.jpg",
      size: "default" as const,
    },
    {
      title: "Сквозная аналитика",
      description: "Дашборды в реальном времени. Кто играл? Сколько времени? Какой приз выиграл?",
      icon: <TrendingUp className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/analytics.jpg",
      size: "wide" as const,
    },
    {
      title: "Цифровой паспорт посетителя",
      description: "Единый профиль гостя, накапливающий баллы за активность на разных зонах мероприятия.",
      icon: <FileText className="h-6 w-6 text-[#0d7ff2]" />,
      image: "/images/services/software-and-games/services/digital-passport.jpg",
      size: "default" as const,
    },
  ],
};

// Компонент карточки технологии
const TechLogoCard = ({ tech }: { tech: { name: string; src: string; fallback: string } }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-white/5 via-white/5 to-white/0 dark:from-white/10 dark:via-white/5 dark:to-white/0 p-8 border border-white/10 dark:border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/20 hover:shadow-2xl hover:shadow-indigo-500/20">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/0 via-blue-500/0 to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:via-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-300 -z-10"></div>
      
      {/* Logo container */}
      <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
        <img
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          alt={tech.name}
          src={imageError ? tech.fallback : tech.src}
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>
      
      {/* Technology name */}
      <span className="text-sm font-semibold text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition-colors duration-300 text-center">
        {tech.name}
      </span>
    </div>
  );
};

const SoftwareAndGames = () => {
  const [isTetrisGameOpen, setIsTetrisGameOpen] = useState(false);

  const handleConsultation = () => {
    // Логика открытия модального окна консультации
    console.log("Открыть консультацию");
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Header />
      
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="flex h-full grow flex-col">
          <div className="flex flex-1 justify-center px-4 sm:px-8 md:px-20 lg:px-40 py-5">
            <div className="flex w-full max-w-[960px] flex-1 flex-col">
              
              {/* Header */}
              <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200/10 dark:border-white/10 px-4 md:px-10 py-3 mb-5">
                <div className="flex items-center gap-4 text-black dark:text-white">
                  <div className="size-6 text-[#0d7ff2]">
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2H15V8.5H8.5V15H2V22H22V2Z"></path>
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-black dark:text-white">
                    Interactive Solutions
                  </h2>
                </div>
                <Button 
                  onClick={handleConsultation}
                  className="hidden sm:flex min-w-[84px] max-w-[480px] h-10 px-4 bg-[#0d7ff2] text-white text-sm font-bold hover:bg-[#0b6dd9]"
                >
                  <span className="truncate">Обсудить задачу</span>
                </Button>
              </header>

              <main className="flex-1">
                {/* Hero Section */}
                <div className="py-10 -mx-4 sm:-mx-8 md:-mx-20 lg:-mx-40">
                  <div className="flex min-h-[600px] flex-col items-center justify-center gap-6 rounded-xl bg-cover bg-center bg-no-repeat p-8 sm:p-12 text-center relative overflow-visible"
                    style={{
                      backgroundImage: `linear-gradient(rgba(16, 25, 34, 0.3) 0%, rgba(16, 25, 34, 0.5) 100%), url("/images/services/software-and-games/hero/hero-background.jpg")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="flex flex-col gap-2 z-10">
                      <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-white sm:text-5xl">
                        Разработка интерактивного ПО и игр для мероприятий
                      </h1>
                      <h2 className="mx-auto max-w-3xl text-sm font-normal leading-normal text-white/80 sm:text-base">
                        Мы создаем цифровые решения, которые превращают обычное бизнес мероприятие в центр притяжения. От простых промо-игр, до сложных VR-тренажеров и систем управления шоу - полный цикл разработки для Event-индустрии.
                      </h2>
                    </div>
                    <Button 
                      onClick={handleConsultation}
                      className="flex min-w-[84px] max-w-[480px] h-10 sm:h-12 px-4 sm:px-5 bg-[#0d7ff2] text-white text-sm sm:text-base font-bold z-10"
                    >
                      <span className="truncate">Обсудить задачу</span>
                    </Button>
                  </div>
                </div>

                {/* Почему это важно */}
                <div className="px-4 py-10">
                  <div className="rounded-xl bg-[#0d7ff2]/10 dark:bg-[#0d7ff2]/5 p-6 border border-[#0d7ff2]/20">
                    <div className="flex items-start gap-4">
                      <Rocket className="h-8 w-8 text-[#0d7ff2] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                          Почему это важно?
                        </h3>
                        <div className="text-base text-black/70 dark:text-white/70 leading-relaxed">
                          <TextType
                            text="В эпоху цифрового шума стандартные презентации больше не работают. Мы создаем программные продукты, которые останавливают взгляд, удерживают внимание и мотивируют аудиторию взаимодействовать с вашим брендом. От простых квизов до сложных Phygital-систем с управлением жестами."
                            as="p"
                            typingSpeed={8}
                            initialDelay={500}
                            loop={false}
                            showCursor={true}
                            cursorCharacter="|"
                            className="text-base text-black/70 dark:text-white/70 leading-relaxed"
                            startOnVisible={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Наши Услуги */}
                <div className="flex flex-col gap-10 px-4 py-10">
                  <div className="flex flex-col gap-6">
                    <div className="relative">
                      <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight bg-gradient-to-r from-[#0d7ff2] via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                        Наши Услуги
                      </h1>
                      <div className="absolute -bottom-2 left-0 h-1.5 w-32 bg-gradient-to-r from-[#0d7ff2] to-purple-600 rounded-full"></div>
                    </div>
                    <p className="text-lg font-normal leading-relaxed text-black/70 dark:text-white/70 max-w-3xl">
                      Мы предлагаем полный спектр услуг по созданию интерактивных решений для мероприятий любого масштаба.
                    </p>
                  </div>

                  {/* Геймификация */}
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0d7ff2] to-purple-600 shadow-lg shadow-[#0d7ff2]/25">
                          <Gamepad2 className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-3xl md:text-4xl font-black leading-tight bg-gradient-to-r from-[#0d7ff2] via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Геймификация и Интерактивный контент
                          </h2>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 left-0 h-1 w-24 bg-gradient-to-r from-[#0d7ff2] to-purple-600 rounded-full"></div>
                    </div>
                    <p className="text-lg text-black/70 dark:text-white/70 leading-relaxed max-w-3xl">
                      Вовлекаем аудиторию через игровые механики, разработанные по индивидуальному сценарию.
                    </p>
                    
                    <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3">
                      {/* Брендированные игры */}
                      <BentoCard
                        title={servicesData.gamification[0].title}
                        description={servicesData.gamification[0].description}
                        icon={servicesData.gamification[0].icon}
                        image={servicesData.gamification[0].image}
                        imageAlt={servicesData.gamification[0].title}
                        size="default"
                        gradient="from-[#0d7ff2]/10 via-purple-500/5 to-pink-500/5"
                      />
                      
                      {/* Квизы и Викторины */}
                      <BentoCard
                        title={servicesData.gamification[1].title}
                        description={servicesData.gamification[1].description}
                        icon={servicesData.gamification[1].icon}
                        image={servicesData.gamification[1].image}
                        imageAlt={servicesData.gamification[1].title}
                        size="default"
                        gradient="from-[#0d7ff2]/10 via-purple-500/5 to-pink-500/5"
                      />
                      
                      {/* Турниры и Рейтинги */}
                      <BentoCard
                        title={servicesData.gamification[3].title}
                        description={servicesData.gamification[3].description}
                        icon={servicesData.gamification[3].icon}
                        image={servicesData.gamification[3].image}
                        imageAlt={servicesData.gamification[3].title}
                        size="default"
                        gradient="from-[#0d7ff2]/10 via-purple-500/5 to-pink-500/5"
                      />
                      
                      {/* Виртуальные квесты (2/3 ширины - 2 колонки) */}
                      <BentoCard
                        title={servicesData.gamification[2].title}
                        description={servicesData.gamification[2].description}
                        icon={servicesData.gamification[2].icon}
                        image={servicesData.gamification[2].image}
                        imageAlt={servicesData.gamification[2].title}
                        size="wide"
                        gradient="from-[#0d7ff2]/10 via-purple-500/5 to-pink-500/5"
                      />
                      
                      {/* Карточка с игрой в тетрис (1/3 ширины - 1 колонка) */}
                      <div
                        onClick={() => setIsTetrisGameOpen(true)}
                        className="cursor-pointer group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                      >
                        <div className="absolute inset-0 z-0 bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative z-20 flex h-full flex-col p-6">
                          <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 shadow-lg mb-4">
                            <Puzzle className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                            Играть в Тетрис
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                            Попробуйте нашу фирменную игру Neon Block Challenge прямо сейчас!
                          </p>
                          <div className="mt-auto inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:brightness-110">
                            🎮 Играть
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Приложения и Веб-решения */}
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/25">
                          <Smartphone className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-3xl md:text-4xl font-black leading-tight bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Приложения и Веб-решения
                          </h2>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 left-0 h-1 w-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                    </div>
                    <p className="text-lg text-black/70 dark:text-white/70 leading-relaxed max-w-3xl">
                      Создаем удобные цифровые инструменты для коммуникации и навигации.
                    </p>
                    
                    <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3">
                      {servicesData.webMobile.map((service, index) => (
                        <BentoCard
                          key={index}
                          title={service.title}
                          description={service.description}
                          icon={service.icon}
                          image={service.image}
                          imageAlt={service.title}
                          size={service.size}
                          gradient="from-cyan-500/10 via-blue-500/5 to-indigo-500/5"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Phygital */}
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/25">
                          <Sparkles className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-3xl md:text-4xl font-black leading-tight bg-gradient-to-r from-purple-500 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                            Phygital и Технологическая магия
                          </h2>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 left-0 h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
                    </div>
                    <p className="text-lg text-black/70 dark:text-white/70 leading-relaxed max-w-3xl">
                      Стираем грань между физическим и цифровым миром.
                    </p>
                    
                    <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3">
                      {servicesData.phygital.map((service, index) => (
                        <BentoCard
                          key={index}
                          title={service.title}
                          description={service.description}
                          icon={service.icon}
                          image={service.image}
                          imageAlt={service.title}
                          size={service.size}
                          gradient="from-purple-500/10 via-pink-500/5 to-rose-500/5"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Лидогенерация */}
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
                          <BarChart3 className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-3xl md:text-4xl font-black leading-tight bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                            Лидогенерация и Data-Driven подход
                          </h2>
                        </div>
                      </div>
                      <div className="absolute -bottom-2 left-0 h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full"></div>
                    </div>
                    <p className="text-lg text-black/70 dark:text-white/70 leading-relaxed max-w-3xl">
                      Не просто развлекаем, а собираем базу контактов и анализируем эффективность.
                    </p>
                    
                    <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-3">
                      {servicesData.leadGeneration.map((service, index) => (
                        <BentoCard
                          key={index}
                          title={service.title}
                          description={service.description}
                          icon={service.icon}
                          image={service.image}
                          imageAlt={service.title}
                          size={service.size}
                          gradient="from-emerald-500/10 via-teal-500/5 to-cyan-500/5"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Наш подход */}
                <div className="px-4 py-10 bg-white dark:bg-gray-900">
                  <div className="max-w-6xl mx-auto">
                    {/* Заголовок */}
                    <div className="text-center mb-12">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500">
                          <Settings className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black leading-tight text-orange-500">
                          Наш подход к разработке
                        </h2>
                      </div>
                      <div className="h-1 w-32 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mb-4"></div>
                      <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                        Мы используем гибкий и технологичный подход, чтобы превратить ваши идеи в эффективные интерактивные решения.
                      </p>
                    </div>
                    
                    {/* Карточки */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Карточка 1: Дизайн и White-label */}
                      <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl overflow-hidden">
                        {/* Shine effect */}
                        <div className="pointer-events-none absolute inset-0 -left-full top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[200%] group-hover:opacity-100" />
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                            <Palette className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Дизайн и White-label
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed relative z-10">
                          Никаких чужих логотипов. Мы создаем продукт, который выглядит как часть вашей экосистемы. Полное соответствие бренд-буку, кастомные иконки, шрифты и адаптация под любые разрешения экранов.
                        </p>
                      </div>

                      {/* Карточка 2: Интеграции и Сценарии */}
                      <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl overflow-hidden">
                        {/* Shine effect */}
                        <div className="pointer-events-none absolute inset-0 -left-full top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[200%] group-hover:opacity-100" />
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                            <Settings className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Интеграции и Сценарии
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 relative z-10">
                          Мы не просто пишем код, мы прописываем сценарий поведения пользователя.
                        </p>
                        <div className="space-y-3 relative z-10">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Offline-режим</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Live-трансляции</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">Сложные механики</span>
                          </div>
                        </div>
                      </div>

                      {/* Карточка 3: Гибкость сроков и Бюджета */}
                      <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl overflow-hidden">
                        {/* Shine effect */}
                        <div className="pointer-events-none absolute inset-0 -left-full top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 group-hover:left-[200%] group-hover:opacity-100" />
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Гибкость сроков и Бюджета
                          </h3>
                        </div>
                        <div className="space-y-4 relative z-10">
                          <div>
                            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                              Быстрый запуск (от 3 дней)
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                              Используем проверенные платформы (Interacty, myQuiz, Eventzee) для сборки решений из готовых, надежных модулей. Бюджетно и оперативно.
                            </p>
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                              Кастомная разработка (от 2 недель)
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                              Создание уникального ПО с нуля под специфические задачи, нестандартное оборудование и эксклюзивную логику.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Технологический стек */}
                <div className="px-4 py-10">
                  <div className="relative mb-12">
                    <h2 className="text-3xl md:text-4xl font-black leading-tight text-center bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                      Наш технологический стек
                    </h2>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-32 bg-gradient-to-r from-indigo-500 to-cyan-600 rounded-full"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
                    {[
                      { name: "Unity", src: "/tech-logos/unity.png", fallback: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq1DmwbitZ1gjaEMiJiL2gKscuXnAkQfROSfOtF6GxSRwA2TCa_0g2s1onxUngAlEpX1__00GwrIB2JIiy5p0HfK-vT8VkiqLvQnd2DI60JIZn1PjgDc9NJhPEMoJHi0DXQqDx6UvAEGjQ1VXHpAsT5PXF7srCc9Y6R1x-fKGb64An12kx3xmsI070-KDEhcO-vbudhv7qNHE4L5kvooo8aK4Rykb7em7JyXy07A13CkAwumu8L71SLWezy7iUT4LfchHP_1CQp-A" },
                      { name: "Unreal Engine", src: "/tech-logos/unreal.png", fallback: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGEZOFIxVqhc3kAXHXEF2tahRDBf0P_yabAT_Je9TNijf2qErVNb33C242L-p4P6TZPl98vRSo2BGe_X5cwUDrgsz6LZcEI62hz_lj-ipuvhmV-2nwWa3fVxSeirlVPfqrYzHXfPseB4uFuGQWcqCAIacug4AeG1mSe6kjwVg6rMJGsw3Ohr3tSC1Rg8FcpXR5axeHJ74WAqsnEpPV9StaYT__IgUmuNQ3TNfX9WLm8liH92VQL7OhMBR9sPAsiJgTnLaGiW5PMrk" },
                      { name: "WebGL", src: "/tech-logos/webgl.png", fallback: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtMsA8NQXHML5alQUSu4M12StYM0ws4XIVnhvVltaA30li8TiWFT51p5tVEqT3XbVicplcWWldJW65Dr22ix1JOpcnEh7Esx9PYphuBz3maGX2LX0Vny5-zpoW4Am0O_Og_n42ZFXrSaVZeTEvh2iofTLxS12JLCb8oUtTHrjQyEdZ0SU0jq8k1E1rAcH2ctKMX6oyjQPENri-bSH91uE9ZJff4uadnP-m45zeZoitFB2VDfwT5sSGL46XwGz5cNELfcGT2VHiRHo" },
                      { name: "C#", src: "/tech-logos/csharp.png", fallback: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ1-X8D9162Aj1kDV9ziNZuSXzEC3ye0QZ1UImy3nqJfT2owIGHKH8RstkcvySj-IRVAvMBGENtnsd597VRzBfWTzrFckaPXB3yyvl1BjFCOBdJhFBYgIYkBLvYTPUOKWIozNWj6Pt247ioQA8glRjhl2IAWHLS1WpUUUVeCdl6As6BK0mK_j33JttV-Nu4oxAmAfP-gV3t1We9wOauvFFYMCdm8u1qX9BsvVemHDF46iCKF-rE2NS1O0zE9Ea1V08jmrUB5Am8_8" },
                      { name: "C++", src: "/tech-logos/cpp.png", fallback: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyNaKN7lm32lLeS4tMh4Z5ZjMrUU7xYc7EP84FXmepmU59_Y2VrtTiNx9bUkb048p70c_lcu59l7jkLG4_BugzzdKCJnkwVOm5UuhaR83L5RC1vr3tC3dg5uNKMx_epQGZHF_doao66o481kHHJCATfdq7-VsYr53YYOzKT6FWRaLwRohRF1ByB67wUw49GELvyR4g42omFo8W1APkHNbifAz2A1DZsX0D4hblbnHfJbpGqA8AkrX9RVWbQfuF5GY9taAwAfrA-yw" },
                      { name: "Python", src: "/tech-logos/python.png", fallback: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYSvJLManguWG5BVJts_iGkuqoK-Okl9s8zW-ydAZqd9eV_H32So9w3Rstwz2paz8ZEl_xSvixqIEsm1SoKUhWu7osnwEt8R0ko2ilInIVRV5bln0K9mPQXuWWvlrUUVvmcIHT0h_2i2Rk-IaU3j9pDtQzLngq0cpRHmC4AF6kaXy46bwJv_7-5lMjwKbE4JhwYdc_r8x9s3jz8tORafDJk5WqrY2UFtCGJfELCajBVXATRzggj7kHPiwbgdfP5QAI47J6XfGKAQ8" }
                    ].map((tech, index) => (
                      <TechLogoCard key={index} tech={tech} />
                    ))}
                  </div>
                </div>

                {/* Почему выбирают нас */}
                <div className="px-4 py-10">
                  <div className="relative mb-8">
                    <h2 className="text-3xl md:text-4xl font-black leading-tight text-center bg-gradient-to-r from-violet-500 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
                      Почему выбирают нас
                    </h2>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-32 bg-gradient-to-r from-violet-500 to-fuchsia-600 rounded-full"></div>
                  </div>
                  <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-3">
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d7ff2]/20 text-[#0d7ff2]">
                        <Infinity className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-black dark:text-white">Полный цикл разработки</h3>
                      <p className="text-sm text-black/70 dark:text-white/60">
                        От идеи и концепции до реализации и технической поддержки на мероприятии.
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d7ff2]/20 text-[#0d7ff2]">
                        <Users className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-black dark:text-white">Команда экспертов</h3>
                      <p className="text-sm text-black/70 dark:text-white/60">
                        Наши разработчики, дизайнеры и менеджеры обладают глубокой экспертизой в Event-индустрии.
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-3 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d7ff2]/20 text-[#0d7ff2]">
                        <Edit3 className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-black dark:text-white">Индивидуальные решения</h3>
                      <p className="text-sm text-black/70 dark:text-white/60">
                        Мы создаем уникальные проекты, полностью соответствующие целям и задачам вашего бренда.
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="px-4 py-10 text-center">
                  <div className="rounded-xl bg-[#0d7ff2]/90 p-10">
                    <h2 className="text-3xl font-bold text-white">
                      Готовы превратить вашу идею в реальность?
                    </h2>
                    <p className="mt-2 text-white/80">
                      Свяжитесь с нами, чтобы обсудить ваш проект и получить индивидуальное предложение.
                    </p>
                    <p className="mt-4 text-white/90 text-sm">
                      Мы предлагаем полный цикл услуг «под ключ»: от креативной идеи и написания кода до технического сопровождения на площадке 24/7.
                    </p>
                    <Button 
                      onClick={handleConsultation}
                      className="mt-6 flex min-w-[84px] max-w-[480px] h-12 px-5 bg-white text-[#0d7ff2] text-base font-bold mx-auto"
                    >
                      <span className="truncate">Обсудить задачу</span>
                    </Button>
                  </div>
                </div>
              </main>

              <footer className="mt-10 border-t border-solid border-gray-200/10 dark:border-white/10 px-10 py-6 text-center text-sm text-black/50 dark:text-white/40">
                <p>© 2024 WESHOW. Все права защищены.</p>
              </footer>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Tetris Game Modal */}
      <BlockGameModal 
        isOpen={isTetrisGameOpen}
        onClose={() => setIsTetrisGameOpen(false)}
      />
    </div>
  );
};

export default SoftwareAndGames;

