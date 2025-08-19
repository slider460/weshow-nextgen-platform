import React, { useState } from 'react';
import { Filter, Grid, List, Search, Play, Image as ImageIcon } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { OptimizedVideo } from '@/components/ui/optimized-video';
import { MediaGallery } from '@/components/ui/media-gallery';
import { MediaItem } from '@/config/media-config';
import ShowreelButton from '@/components/ShowreelButton';

// Пример данных для портфолио
const portfolioData: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    src: '/media/cases/samsung-event/images/main.jpg',
    alt: 'Samsung Event - Главная сцена',
    title: 'Samsung Event 2024',
    description: 'Масштабное мероприятие с интерактивными экранами',
    thumbnail: '/media/cases/samsung-event/thumbnails/main-thumb.jpg',
    width: 1920,
    height: 1080,
    category: 'corporate-events',
    tags: ['samsung', 'event', 'interactive', 'screens']
  },
  {
    id: '2',
    type: 'video',
    src: '/media/cases/samsung-event/videos/highlight.mp4',
    alt: 'Samsung Event - Видео обзор',
    title: 'Samsung Event - Видео обзор',
    description: 'Полный обзор мероприятия Samsung',
    poster: '/media/cases/samsung-event/images/poster.jpg',
    thumbnail: '/media/cases/samsung-event/thumbnails/video-thumb.jpg',
    width: 1920,
    height: 1080,
    duration: 120,
    category: 'corporate-events',
    tags: ['samsung', 'video', 'highlight'],
    videoSources: [
      { quality: '480p', url: '/media/cases/samsung-event/videos/highlight-480p.mp4', type: 'video/mp4' },
      { quality: '720p', url: '/media/cases/samsung-event/videos/highlight-720p.mp4', type: 'video/mp4' },
      { quality: '1080p', url: '/media/cases/samsung-event/videos/highlight-1080p.mp4', type: 'video/mp4' }
    ]
  },
  {
    id: '3',
    type: 'image',
    src: '/media/cases/samara-stand/images/main.jpg',
    alt: 'Самарский стенд - Выставочный стенд',
    title: 'Самарский выставочный стенд',
    description: 'Современный дизайн выставочного стенда',
    thumbnail: '/media/cases/samara-stand/thumbnails/main-thumb.jpg',
    width: 1600,
    height: 900,
    category: 'exhibition-stands',
    tags: ['samara', 'exhibition', 'stand', 'design']
  },
  {
    id: '4',
    type: 'image',
    src: '/media/cases/samara-stand/images/detail.jpg',
    alt: 'Самарский стенд - Детали',
    title: 'Самарский стенд - Детали',
    description: 'Детализация выставочного стенда',
    thumbnail: '/media/cases/samara-stand/thumbnails/detail-thumb.jpg',
    width: 1200,
    height: 800,
    category: 'exhibition-stands',
    tags: ['samara', 'exhibition', 'stand', 'details']
  },
  {
    id: '5',
    type: 'video',
    src: '/media/cases/samara-stand/videos/walkthrough.mp4',
    alt: 'Самарский стенд - Виртуальный тур',
    title: 'Виртуальный тур по стенду',
    description: '3D тур по выставочному стенду',
    poster: '/media/cases/samara-stand/images/3d-poster.jpg',
    thumbnail: '/media/cases/samara-stand/thumbnails/3d-thumb.jpg',
    width: 1920,
    height: 1080,
    duration: 45,
    category: 'exhibition-stands',
    tags: ['samara', '3d', 'virtual-tour', 'stand'],
    videoSources: [
      { quality: '720p', url: '/media/cases/samara-stand/videos/walkthrough-720p.mp4', type: 'video/mp4' },
      { quality: '1080p', url: '/media/cases/samara-stand/videos/walkthrough-1080p.mp4', type: 'video/mp4' }
    ]
  }
];

const categories = [
  { id: 'all', name: 'Все проекты', count: portfolioData.length },
  { id: 'corporate-events', name: 'Корпоративные мероприятия', count: portfolioData.filter(item => item.category === 'corporate-events').length },
  { id: 'exhibition-stands', name: 'Выставочные стенды', count: portfolioData.filter(item => item.category === 'exhibition-stands').length },
  { id: 'multimedia', name: 'Мультимедиа', count: portfolioData.filter(item => item.tags?.includes('multimedia')).length },
  { id: '3d-design', name: '3D дизайн', count: portfolioData.filter(item => item.tags?.includes('3d')).length }
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  // Фильтрация по категории и поиску
  const filteredData = portfolioData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleItemClick = (item: MediaItem, index: number) => {
    setSelectedItem(item);
    console.log('Выбран элемент:', item.title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-3xl"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Наше <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Портфолио</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Реализованные проекты, которые демонстрируют наш опыт в создании 
            инновационных мультимедийных решений для бизнеса
          </p>
          
          {/* Кнопка Showreel */}
          <div className="flex justify-center">
            <ShowreelButton
              variant="outline"
              size="lg"
              icon="film"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40"
            >
              <Play className="mr-2 h-5 w-5" />
              Смотреть шоурил
            </ShowreelButton>
          </div>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          {/* Поиск */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск по проектам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Переключатель вида */}
            <div className="flex bg-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Категории */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Портфолио */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        {filteredData.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/10 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">Ничего не найдено</h3>
            <p className="text-slate-400">Попробуйте изменить параметры поиска или категорию</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Заголовок секции */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                {selectedCategory === 'all' ? 'Все проекты' : 
                 categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-slate-400">
                Найдено {filteredData.length} {filteredData.length === 1 ? 'проект' : 
                filteredData.length < 5 ? 'проекта' : 'проектов'}
              </p>
            </div>

            {/* Галерея */}
            <MediaGallery
              items={filteredData}
              columns={viewMode === 'grid' ? 3 : 1}
              gap={6}
              showLightbox={true}
              onItemClick={handleItemClick}
              className="mt-8"
            />
          </div>
        )}
      </div>

      {/* Статистика */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-2xl flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">150+</div>
            <div className="text-slate-400">Реализованных проектов</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-2xl flex items-center justify-center">
              <Play className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-slate-400">Видео проектов</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-2xl flex items-center justify-center">
              <Filter className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">25+</div>
            <div className="text-slate-400">Категорий услуг</div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-500/20 rounded-2xl flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-400 rounded-lg"></div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">5+</div>
            <div className="text-slate-400">Лет опыта</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;