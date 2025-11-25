# 🚀 Руководство по оптимизации медиа контента для WESHOW

## 📋 Содержание
1. [Обзор системы](#обзор-системы)
2. [Структура папок](#структура-папок)
3. [Добавление изображений](#добавление-изображений)
4. [Добавление видео](#добавление-видео)
5. [Персонализация страниц](#персонализация-страниц)
6. [Оптимизация производительности](#оптимизация-производительности)
7. [Примеры использования](#примеры-использования)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Обзор системы

Мы создали полноценную систему оптимизации медиа контента для вашего сайта WESHOW, которая включает:

- **OptimizedImage** - компонент для изображений с lazy loading и WebP поддержкой
- **OptimizedVideo** - компонент для видео с адаптивным качеством
- **MediaGallery** - галерея с лайтбоксом и фильтрацией
- **Service Worker** - кэширование и офлайн поддержка
- **Конфигурация** - централизованные настройки для всех медиа

---

## 📁 Структура папок

```
public/media/
├── cases/                    # Кейсы и проекты
│   ├── samsung-event/       # Конкретный кейс
│   │   ├── images/          # Основные изображения
│   │   ├── videos/          # Видео файлы
│   │   └── thumbnails/      # Превью изображения
│   └── samara-stand/        # Другой кейс
├── services/                 # Услуги
├── equipment/                # Оборудование
├── team/                     # Команда
└── blog/                     # Блог
```

### Рекомендуемые размеры файлов:

**Изображения:**
- Thumbnail: 300x200px (80% качество)
- Small: 600x400px (85% качество)
- Medium: 1200x800px (90% качество)
- Large: 1920x1080px (95% качество)

**Видео:**
- 480p: 854x480px (800k битрейт)
- 720p: 1280x720px (1500k битрейт)
- 1080p: 1920x1080px (3000k битрейт)
- 4K: 3840x2160px (8000k битрейт)

---

## 🖼️ Добавление изображений

### 1. Подготовка файлов

1. **Создайте папку** для вашего проекта в `public/media/`
2. **Подготовьте изображения** в разных размерах
3. **Оптимизируйте** с помощью инструментов (TinyPNG, ImageOptim)
4. **Конвертируйте в WebP** для лучшей производительности

### 2. Использование в коде

```tsx
import { OptimizedImage } from '@/components/ui/optimized-image';

// Простое изображение
<OptimizedImage
  src="/media/cases/my-project/images/main.jpg"
  alt="Описание изображения"
  width={1200}
  height={800}
  className="rounded-lg shadow-lg"
/>

// С приоритетной загрузкой (для hero секций)
<OptimizedImage
  src="/media/cases/my-project/images/hero.jpg"
  alt="Главное изображение"
  priority={true}
  className="w-full h-64 object-cover"
/>

// С fallback изображением
<OptimizedImage
  src="/media/cases/my-project/images/main.jpg"
  alt="Описание"
  fallback="/placeholder.svg"
  className="w-full h-48 object-cover"
/>
```

### 3. Автоматическая оптимизация

Система автоматически:
- ✅ Генерирует WebP версии
- ✅ Создает разные размеры для разных устройств
- ✅ Применяет lazy loading
- ✅ Показывает плейсхолдеры во время загрузки

---

## 🎥 Добавление видео

### 1. Подготовка видео файлов

1. **Создайте несколько качеств** (480p, 720p, 1080p)
2. **Добавьте превью изображение** (poster)
3. **Оптимизируйте формат** (MP4 для совместимости, WebM для веб)

### 2. Использование в коде

```tsx
import { OptimizedVideo } from '@/components/ui/optimized-video';

// Простое видео
<OptimizedVideo
  sources={[
    { quality: '720p', url: '/media/cases/my-project/videos/main-720p.mp4', type: 'video/mp4' },
    { quality: '1080p', url: '/media/cases/my-project/videos/main-1080p.mp4', type: 'video/mp4' }
  ]}
  poster="/media/cases/my-project/images/poster.jpg"
  width={1920}
  height={1080}
  className="rounded-lg"
/>

// Автовоспроизведение (для hero секций)
<OptimizedVideo
  sources={[
    { quality: '720p', url: '/media/cases/my-project/videos/hero-720p.mp4', type: 'video/mp4' }
  ]}
  autoplay={true}
  muted={true}
  loop={true}
  controls={false}
  className="w-full h-screen object-cover"
/>
```

### 3. Автоматическое определение качества

Система автоматически:
- ✅ Определяет скорость соединения
- ✅ Выбирает оптимальное качество
- ✅ Показывает превью до загрузки
- ✅ Предоставляет кастомные контролы

---

## 🎨 Персонализация страниц

### 1. Страница кейса (пример)

```tsx
import React from 'react';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { OptimizedVideo } from '@/components/ui/optimized-video';
import { MediaGallery } from '@/components/ui/media-gallery';

const CaseStudy = () => {
  const caseImages = [
    {
      id: '1',
      type: 'image',
      src: '/media/cases/my-project/images/main.jpg',
      alt: 'Главное изображение проекта',
      thumbnail: '/media/cases/my-project/thumbnails/main-thumb.jpg',
      width: 1920,
      height: 1080
    },
    {
      id: '2',
      type: 'video',
      src: '/media/cases/my-project/videos/demo.mp4',
      alt: 'Демонстрация проекта',
      poster: '/media/cases/my-project/images/demo-poster.jpg',
      thumbnail: '/media/cases/my-project/thumbnails/demo-thumb.jpg',
      width: 1920,
      height: 1080,
      videoSources: [
        { quality: '720p', url: '/media/cases/my-project/videos/demo-720p.mp4', type: 'video/mp4' },
        { quality: '1080p', url: '/media/cases/my-project/videos/demo-1080p.mp4', type: 'video/mp4' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Hero секция с видео фоном */}
      <section className="relative h-screen">
        <OptimizedVideo
          sources={[
            { quality: '720p', url: '/media/cases/my-project/videos/hero-bg.mp4', type: 'video/mp4' }
          ]}
          autoplay={true}
          muted={true}
          loop={true}
          controls={false}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6">Название проекта</h1>
            <p className="text-xl">Описание проекта</p>
          </div>
        </div>
      </section>

      {/* Описание проекта */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">О проекте</h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                Подробное описание проекта, технологии, результаты...
              </p>
            </div>
            <div>
              <OptimizedImage
                src="/media/cases/my-project/images/process.jpg"
                alt="Процесс работы"
                width={800}
                height={600}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Галерея проекта */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Галерея проекта</h2>
          <MediaGallery
            items={caseImages}
            columns={3}
            gap={6}
            showLightbox={true}
            className="mt-8"
          />
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;
```

### 2. Страница услуги

```tsx
const ServicePage = () => {
  const serviceImages = [
    {
      id: '1',
      type: 'image',
      src: '/media/services/led-screens/images/example1.jpg',
      alt: 'LED экран в торговом центре',
      thumbnail: '/media/services/led-screens/thumbnails/example1-thumb.jpg',
      width: 1200,
      height: 800
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Hero с изображением */}
      <section className="relative h-96">
        <OptimizedImage
          src="/media/services/led-screens/images/hero.jpg"
          alt="LED экраны"
          priority={true}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <h1 className="text-5xl font-bold">LED экраны</h1>
        </div>
      </section>

      {/* Описание услуги */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Описание услуги</h2>
          <p className="text-slate-300 text-lg">
            Подробное описание услуги по установке и обслуживанию LED экранов...
          </p>
        </div>
      </section>

      {/* Примеры работ */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Примеры работ</h2>
          <MediaGallery
            items={serviceImages}
            columns={4}
            gap={4}
            showLightbox={true}
          />
        </div>
      </section>
    </div>
  );
};
```

---

## ⚡ Оптимизация производительности

### 1. Lazy Loading

Все изображения и видео автоматически используют lazy loading:

```tsx
// Изображение загрузится только когда появится в viewport
<OptimizedImage
  src="/media/large-image.jpg"
  alt="Большое изображение"
  className="w-full h-96 object-cover"
/>

// Видео загрузится только при клике или появлении в viewport
<OptimizedVideo
  sources={[{ quality: '720p', url: '/media/video.mp4', type: 'video/mp4' }]}
  poster="/media/poster.jpg"
  className="w-full h-64"
/>
```

### 2. Автоматическая оптимизация

- **WebP формат** для современных браузеров
- **Адаптивные размеры** для разных устройств
- **Оптимальное качество** на основе соединения
- **Кэширование** через Service Worker

### 3. Service Worker

Автоматически:
- ✅ Кэширует статические файлы
- ✅ Кэширует медиа контент (с ограничениями)
- ✅ Предзагружает важные ресурсы
- ✅ Очищает устаревшие кэши

---

## 📚 Примеры использования

### 1. Главная страница с видео фоном

```tsx
const HeroSection = () => (
  <section className="relative h-screen">
    <OptimizedVideo
      sources={[
        { quality: '720p', url: '/media/hero/background-720p.mp4', type: 'video/mp4' }
      ]}
      autoplay={true}
      muted={true}
      loop={true}
      controls={false}
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/30" />
    <div className="relative z-10 flex items-center justify-center h-full text-white">
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-6">WESHOW</h1>
        <p className="text-2xl">Мультимедийные решения для бизнеса</p>
      </div>
    </div>
  </section>
);
```

### 2. Портфолио с фильтрацией

```tsx
const PortfolioSection = () => {
  const [filter, setFilter] = useState('all');
  
  const portfolioItems = [
    // ... ваши проекты
  ];

  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Фильтры */}
        <div className="flex gap-4 mb-12 justify-center">
          {['all', 'corporate', 'exhibition', 'multimedia'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-lg transition-all ${
                filter === cat 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {cat === 'all' ? 'Все' : cat}
            </button>
          ))}
        </div>

        {/* Галерея */}
        <MediaGallery
          items={filteredItems}
          columns={3}
          gap={6}
          showLightbox={true}
        />
      </div>
    </section>
  );
};
```

### 3. Блог с изображениями

```tsx
const BlogPost = () => (
  <article className="max-w-4xl mx-auto py-20 px-4">
    <header className="mb-12">
      <h1 className="text-5xl font-bold text-slate-900 mb-6">
        Заголовок статьи
      </h1>
      <OptimizedImage
        src="/media/blog/article-1/hero.jpg"
        alt="Главное изображение статьи"
        priority={true}
        className="w-full h-96 object-cover rounded-2xl"
      />
    </header>

    <div className="prose prose-lg max-w-none">
      <p>Текст статьи...</p>
      
      <OptimizedImage
        src="/media/blog/article-1/diagram.jpg"
        alt="Диаграмма процесса"
        width={800}
        height={600}
        className="my-8 rounded-lg"
      />
      
      <p>Продолжение статьи...</p>
    </div>
  </article>
);
```

---

## 🔧 Troubleshooting

### 1. Изображения не загружаются

**Проблема:** Изображения показывают плейсхолдер
**Решение:**
- Проверьте путь к файлу
- Убедитесь, что файл существует в `public/media/`
- Проверьте консоль браузера на ошибки

### 2. Видео не воспроизводится

**Проблема:** Видео не загружается или не воспроизводится
**Решение:**
- Проверьте формат файла (MP4, WebM)
- Убедитесь, что poster изображение загружено
- Проверьте размер файла (не более 100MB для кэширования)

### 3. Медленная загрузка

**Проблема:** Медиа загружается медленно
**Решение:**
- Используйте thumbnails для превью
- Оптимизируйте размеры файлов
- Включите Service Worker
- Используйте CDN в продакшене

### 4. Service Worker не работает

**Проблема:** Кэширование не работает
**Решение:**
- Проверьте регистрацию в консоли
- Убедитесь, что `sw.js` доступен по `/sw.js`
- Очистите кэш браузера
- Проверьте HTTPS (требуется для Service Worker)

---

## 🚀 Следующие шаги

1. **Добавьте свои медиа файлы** в соответствующие папки
2. **Обновите компоненты** для использования новых оптимизированных версий
3. **Настройте CDN** для продакшена (Cloudflare, AWS CloudFront)
4. **Мониторьте производительность** через Lighthouse
5. **Добавьте аналитику** для отслеживания загрузки медиа

---

## 📞 Поддержка

Если у вас возникли вопросы или проблемы:

1. Проверьте консоль браузера на ошибки
2. Убедитесь, что все файлы находятся в правильных папках
3. Проверьте, что Service Worker зарегистрирован
4. Обратитесь к документации компонентов

**Удачи с вашим сайтом WESHOW! 🎉**
