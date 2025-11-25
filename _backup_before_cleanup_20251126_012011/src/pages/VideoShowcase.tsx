import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GlareHover from '../components/GlareHover';
import AnimatedContent from '../components/AnimatedContent';

// Прямая ссылка на видео из Dropbox (используем raw=1 для прямого доступа)
const DROPBOX_VIDEO_URL = 'https://www.dropbox.com/scl/fi/b2ivtik0ttc7bonru4j59/Vivax-Samburskaya.mp4?rlkey=wzo381ja98w1lyvjxeedrbing&st=mv62tn2e&raw=1';

// Создаем массив видео для демонстрации (используем одно и то же видео с разными описаниями)
const demoVideos = [
  {
    id: 1,
    title: 'Vivax - Концерт Самбурской',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Организация и техническое сопровождение концерта',
    category: 'Концерты',
  },
  {
    id: 2,
    title: 'Корпоративное мероприятие Vivax',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Полный цикл подготовки корпоративного события',
    category: 'Корпоративные мероприятия',
  },
  {
    id: 3,
    title: 'LED-экраны и мультимедиа',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Установка и настройка LED-экранов высокого разрешения',
    category: 'Техническое оснащение',
  },
  {
    id: 4,
    title: 'Световое шоу Vivax',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Профессиональное световое оформление мероприятия',
    category: 'Световое оборудование',
  },
  {
    id: 5,
    title: 'Звуковое сопровождение',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Аренда и настройка профессионального звукового оборудования',
    category: 'Звуковое оборудование',
  },
  {
    id: 6,
    title: 'Сценическое оформление',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Дизайн и монтаж сценических конструкций',
    category: 'Сценография',
  },
  {
    id: 7,
    title: 'Интерактивные инсталляции',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Создание интерактивных мультимедийных зон',
    category: 'Интерактив',
  },
  {
    id: 8,
    title: 'Видеопроекция и маппинг',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: '3D-маппинг и проекционное шоу',
    category: 'Видеопроекция',
  },
  {
    id: 9,
    title: 'Выставочный стенд',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Комплексное оснащение выставочного пространства',
    category: 'Выставки',
  },
  {
    id: 10,
    title: 'Презентация продукта',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Мультимедийное сопровождение презентации',
    category: 'Презентации',
  },
  {
    id: 11,
    title: 'Конференция и форум',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Техническое обеспечение деловых мероприятий',
    category: 'Конференции',
  },
  {
    id: 12,
    title: 'Фестиваль под открытым небом',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Полное техническое оснащение outdoor-мероприятия',
    category: 'Фестивали',
  },
  {
    id: 13,
    title: 'Модный показ',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Световое и мультимедийное оформление подиума',
    category: 'Fashion-показы',
  },
  {
    id: 14,
    title: 'Спортивное мероприятие',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Видеотрансляция и медиа-сопровождение',
    category: 'Спорт',
  },
  {
    id: 15,
    title: 'Церемония награждения',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Торжественное оформление церемонии',
    category: 'Церемонии',
  },
  {
    id: 16,
    title: 'Новогодний корпоратив',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Праздничное оформление и развлекательная программа',
    category: 'Праздники',
  },
  {
    id: 17,
    title: 'Запуск продукта',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Эффектная презентация нового продукта',
    category: 'Product Launch',
  },
  {
    id: 18,
    title: 'Благотворительный вечер',
    url: DROPBOX_VIDEO_URL,
    thumbnail: '',
    description: 'Организация благотворительного мероприятия',
    category: 'Благотворительность',
  },
];

interface VideoCardProps {
  video: typeof demoVideos[0];
  variant?: 'default' | 'hover' | 'glare';
}

const VideoCard: React.FC<VideoCardProps> = ({ video, variant = 'default' }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const cardContent = (
    <div className="relative group overflow-hidden rounded-xl bg-slate-900 shadow-xl hover:shadow-2xl transition-all duration-500">
      {/* Видео с встроенными контролами */}
      <div className="relative aspect-video overflow-hidden bg-slate-800">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          loop
          playsInline
          preload="metadata"
          controls
          controlsList="nodownload"
          style={{
            width: '100%',
            height: '100%',
            display: 'block'
          }}
        >
          <source src={video.url} type="video/mp4" />
          <source src="https://www.dropbox.com/scl/fi/b2ivtik0ttc7bonru4j59/Vivax-Samburskaya.mp4?rlkey=wzo381ja98w1lyvjxeedrbing&st=mv62tn2e&dl=1" type="video/mp4" />
          Ваш браузер не поддерживает воспроизведение видео. 
          <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">
            Скачать видео
          </a>
        </video>
      </div>

      {/* Информация о видео */}
      <div className="p-4 bg-slate-900">
        <h3 className="text-lg font-bold text-white mb-2">{video.title}</h3>
        <p className="text-sm text-slate-400 mb-2">{video.description}</p>
        <span className="inline-block px-3 py-1 bg-indigo-600/20 text-indigo-400 text-xs rounded-full">
          {video.category}
        </span>
      </div>
    </div>
  );

  if (variant === 'glare') {
    return <GlareHover>{cardContent}</GlareHover>;
  }

  return cardContent;
};

const VideoShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'masonry' | 'carousel' | 'grid'>('masonry');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
        <div className="container mx-auto px-4 relative">
          <AnimatedContent distance={80} delay={0.2}>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                🎬 Витрина видео-решений
              </h1>
              <p className="text-xl text-slate-300 mb-4">
                Тестовая страница с тремя вариантами галереи для отчетных роликов
              </p>
              <div className="inline-block bg-indigo-600/20 backdrop-blur-sm border border-indigo-400/30 rounded-full px-6 py-2 mb-4">
                <span className="text-indigo-300 font-semibold">{demoVideos.length} проектов</span>
                <span className="text-slate-400 mx-2">•</span>
                <span className="text-slate-300">Vivax - Самбурская</span>
              </div>
              
              {/* Тестовое видео для проверки */}
              <div className="max-w-2xl mx-auto mb-8 bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700">
                <p className="text-slate-300 text-sm mb-2">🔍 Тестовое видео (для проверки загрузки):</p>
                <video 
                  src={DROPBOX_VIDEO_URL} 
                  controls 
                  className="w-full rounded-lg"
                  preload="metadata"
                  onError={(e) => {
                    console.error('Test video error:', e);
                    console.log('Trying alternative URL...');
                  }}
                  onLoadedData={() => console.log('Test video loaded!')}
                >
                  <source src={DROPBOX_VIDEO_URL} type="video/mp4" />
                  <source src="https://www.dropbox.com/scl/fi/b2ivtik0ttc7bonru4j59/Vivax-Samburskaya.mp4?rlkey=wzo381ja98w1lyvjxeedrbing&st=mv62tn2e&dl=1" type="video/mp4" />
                  Ваш браузер не поддерживает видео. 
                  <a href={DROPBOX_VIDEO_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline">
                    Скачать видео
                  </a>
                </video>
                <div className="mt-2 text-xs text-slate-400">
                  Если видео не загружается, попробуйте: 
                  <a href={DROPBOX_VIDEO_URL} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline ml-1">
                    открыть в новой вкладке
                  </a>
                </div>
              </div>
              
              {/* Табы для переключения между вариантами */}
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => setActiveTab('masonry')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'masonry'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/50'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  🧱 Masonry Layout
                </button>
                <button
                  onClick={() => setActiveTab('carousel')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'carousel'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/50'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  🎠 Carousel
                </button>
                <button
                  onClick={() => setActiveTab('grid')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'grid'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/50'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                  }`}
                >
                  🎨 Chroma Grid
                </button>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Галереи */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          {/* Masonry Layout */}
          {activeTab === 'masonry' && (
            <AnimatedContent distance={60} delay={0.3}>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-4 text-center">
                  Masonry Layout - Адаптивная кладка
                </h2>
                <p className="text-slate-400 text-center mb-8">
                  Автоматическая оптимизация расположения с плавными анимациями
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {demoVideos.map((video) => (
                  <VideoCard key={video.id} video={video} variant="glare" />
                ))}
              </div>
            </AnimatedContent>
          )}

          {/* Carousel */}
          {activeTab === 'carousel' && (
            <AnimatedContent distance={60} delay={0.3}>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-4 text-center">
                  Carousel - Карусель с жестами
                </h2>
                <p className="text-slate-400 text-center mb-8">
                  Поддержка свайпов и плавные переходы между видео
                </p>
              </div>
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {demoVideos.map((video) => (
                    <VideoCard key={video.id} video={video} variant="glare" />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <p className="text-slate-400">
                    Показано {demoVideos.length} видео
                  </p>
                </div>
              </div>
            </AnimatedContent>
          )}

          {/* Chroma Grid */}
          {activeTab === 'grid' && (
            <AnimatedContent distance={60} delay={0.3}>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-4 text-center">
                  Chroma Grid - Интерактивная сетка
                </h2>
                <p className="text-slate-400 text-center mb-8">
                  Эффект раскрытия цветов при наведении
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {demoVideos.map((video) => (
                  <div key={video.id} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-1 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-500">
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
            </AnimatedContent>
          )}
        </div>
      </section>

      {/* Информационная секция */}
      <section className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <AnimatedContent distance={60} delay={0.4}>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Особенности реализации
              </h2>
              <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
                <div className="text-5xl font-bold text-white mb-2">{demoVideos.length}</div>
                <p className="text-slate-300 text-lg">
                  Видео-проектов в галерее для демонстрации
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-white mb-2">Прямые ссылки</h3>
                  <p className="text-slate-400">
                    Видео загружается напрямую из Dropbox с параметром dl=1
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-white mb-2">Оптимизация</h3>
                  <p className="text-slate-400">
                    Lazy loading и preload="metadata" для быстрой загрузки
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold text-white mb-2">Интерактивность</h3>
                  <p className="text-slate-400">
                    Контролы воспроизведения и эффекты при наведении
                  </p>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VideoShowcase;

