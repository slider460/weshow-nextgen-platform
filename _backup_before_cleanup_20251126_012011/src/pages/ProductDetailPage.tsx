import React, { useState, useEffect, useMemo } from 'react';
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Play,
  Download,
  Truck,
  Wrench,
  Shield,
  Clock,
  Info,
  Check,
  AlertTriangle,
  Zap,
  Calendar,
  Calculator,
  Smartphone
} from 'lucide-react';
import { TouchButton, TouchCard } from '../components/TouchFriendlyComponents';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { useResponsive } from '../hooks/useResponsive';
import { getEquipmentById, mockEquipment } from '../data/equipmentData';
import type { Equipment } from '../types/equipment';
import { ARPreview } from '../components/ar/ARPreview';
import type { Equipment3DModel } from '../components/3d/ThreeViewer';
import { cn } from '../lib/utils';

const CATEGORY_LABELS: Record<string, string> = {
  'led-displays': 'LED-экраны',
  'projection': 'Проекторы',
  'audio': 'Звук',
  'lighting': 'Свет',
  'interactive': 'Интерактивное',
  'ar-vr': 'AR/VR',
  'presentation': 'Презентация',
  'decoration': 'Декор',
  'other': 'Прочее'
};

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isMobile } = useResponsive();
  // Cart functionality temporarily disabled
  const addToCart = () => console.log('Add to cart');
  const cart = [];
  const cartLoading = false;

  // Состояние компонента
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showARPreview, setShowARPreview] = useState(false);

  // Загрузка данных оборудования
  useEffect(() => {
    if (id) {
      setLoading(true);
      // Имитация загрузки данных
      setTimeout(() => {
        const item = getEquipmentById(id);
        setEquipment(item || null);
        setLoading(false);
      }, 300);
    }
  }, [id]);

  // Рекомендуемые товары (той же категории)
  const recommendedEquipment = useMemo(() => {
    if (!equipment) return [];
    
    return mockEquipment
      .filter(item => 
        item.category === equipment.category && 
        item.id !== equipment.id && 
        item.isActive
      )
      .slice(0, 4);
  }, [equipment]);

  // Конвертация оборудования для AR
  const equipmentFor3D = useMemo((): Equipment3DModel[] => {
    if (!equipment) return [];
    
    return [{
      id: equipment.id,
      name: equipment.name,
      type: equipment.category as any,
      modelUrl: '/models/default-equipment.glb', // Заглушка для модели
      thumbnailUrl: equipment.media.thumbnail || equipment.media.images[0] || '',
      scale: [1, 1, 1],
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      materials: {
        primary: '#3b82f6',
        secondary: '#6b7280'
      }
    }];
  }, [equipment]);

  // Обработка AR сессии
  const handleARSessionSave = (session: any) => {
    console.log('AR session saved:', session);
    // Здесь можно сохранить размещение для последующего просмотра
  };

  // Обработка выбора оборудования в AR
  const handleAREquipmentSelect = (equipment: Equipment3DModel) => {
    console.log('AR equipment selected:', equipment);
  };
  const isInCart = useMemo(() => {
    return equipment ? cart.items.some(item => item.equipmentId === equipment.id) : false;
  }, [cart.items, equipment]);

  // Обработка добавления в корзину
  const handleAddToCart = async () => {
    if (!equipment) return;
    
    try {
      await addToCart(equipment);
      // Показать уведомление об успехе
    } catch (error) {
      console.error('Ошибка добавления в корзину:', error);
      // Показать уведомление об ошибке
    }
  };

  // Обработка поделиться
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: equipment?.name,
          text: equipment?.description,
          url: window.location.href,
        });
      } catch (error) {
        // Фолбэк - копировать ссылку
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Переключение изображений
  const nextImage = () => {
    if (equipment?.media.images) {
      setCurrentImageIndex((prev) => 
        prev === equipment.media.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (equipment?.media.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? equipment.media.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!equipment) {
    return <ProductNotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <TouchButton
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {!isMobile && <span>Назад к каталогу</span>}
            </TouchButton>
            
            <div className="flex items-center space-x-2">
              <TouchButton
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
                className={cn(
                  isFavorite ? 'text-red-500' : 'text-gray-500'
                )}
              >
                <Heart className={cn(
                  'h-4 w-4',
                  isFavorite && 'fill-current'
                )} />
              </TouchButton>
              
              <TouchButton
                variant="ghost"
                size="sm"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </TouchButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Галерея изображений */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200">
              {equipment.media.images.length > 0 ? (
                <>
                  <motion.img
                    key={currentImageIndex}
                    src={equipment.media.images[currentImageIndex]}
                    alt={equipment.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {equipment.media.images.length > 1 && (
                    <>
                      <TouchButton
                        variant="ghost"
                        size="sm"
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </TouchButton>
                      
                      <TouchButton
                        variant="ghost"
                        size="sm"
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </TouchButton>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <Zap className="w-16 h-16 mx-auto mb-2" />
                    <p>Изображение не доступно</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Миниатюры */}
            {equipment.media.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {equipment.media.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors",
                      index === currentImageIndex
                        ? "border-blue-500"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${equipment.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Информация о товаре */}
          <div className="space-y-6">
            {/* Заголовок */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary">
                  {CATEGORY_LABELS[equipment.category]}
                </Badge>
                {equipment.featured && (
                  <Badge className="bg-orange-500 text-white">
                    <Star className="w-3 h-3 mr-1 fill-current" />
                    Рекомендуем
                  </Badge>
                )}
                {equipment.availability.available > 0 ? (
                  <Badge className="bg-green-100 text-green-800">
                    <Check className="w-3 h-3 mr-1" />
                    В наличии
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Недоступно
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {equipment.name}
              </h1>
              
              <p className="text-lg text-gray-600 mb-4">
                {equipment.brand} • {equipment.model}
              </p>
              
              {equipment.description && (
                <p className="text-gray-700 leading-relaxed">
                  {equipment.description}
                </p>
              )}
            </div>

            {/* Рейтинг */}
            {equipment.rating && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(equipment.rating!.average)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  {equipment.rating.average.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">
                  ({equipment.rating.count} отзывов)
                </span>
              </div>
            )}

            {/* Цены */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Стоимость аренды</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <PriceCard
                  period="День"
                  price={equipment.pricing.dailyRate}
                  recommended={true}
                />
                <PriceCard
                  period="Неделя"
                  price={equipment.pricing.weeklyRate}
                  savings={equipment.pricing.dailyRate * 7 - equipment.pricing.weeklyRate}
                />
                <PriceCard
                  period="Месяц"
                  price={equipment.pricing.monthlyRate}
                  savings={equipment.pricing.dailyRate * 30 - equipment.pricing.monthlyRate}
                />
              </div>
            </div>

            {/* Доступность */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium text-gray-900">
                    Доступно: {equipment.availability.available} из {equipment.availability.total}
                  </div>
                  <div className="text-sm text-gray-600">
                    Минимальная аренда: {equipment.pricing.minimumRental} день
                  </div>
                </div>
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="space-y-3">
              <TouchButton
                variant={isInCart ? "secondary" : "primary"}
                size="lg"
                onClick={handleAddToCart}
                disabled={equipment.availability.available === 0 || cartLoading}
                fullWidth
              >
                {cartLoading ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <ShoppingCart className="w-5 h-5 mr-2" />
                )}
                {isInCart ? 'В корзине' : 'Добавить в корзину'}
              </TouchButton>
              
              <div className="grid grid-cols-2 gap-3">
                <TouchButton
                  variant="outline"
                  onClick={() => navigate('/cart')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Выбрать даты
                </TouchButton>
                
                <TouchButton
                  variant="outline"
                  onClick={() => navigate('/calculator')}
                >
                  <Calculator className="w-4 h-4 mr-2" />
                  Калькулятор
                </TouchButton>
              </div>
              
              {/* AR превью */}
              <TouchButton
                variant="outline"
                onClick={() => setShowARPreview(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 hover:from-purple-700 hover:to-blue-700"
                fullWidth
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Посмотреть в AR
              </TouchButton>
            </div>
          </div>
        </div>

        {/* Детальная информация */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <div className="border-b border-gray-200">
              <TabsList className="w-full h-auto p-0 bg-transparent">
                <div className="flex w-full overflow-x-auto">
                  <TabsTrigger 
                    value="overview" 
                    className="flex-1 min-w-0 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                  >
                    Обзор
                  </TabsTrigger>
                  <TabsTrigger 
                    value="specifications"
                    className="flex-1 min-w-0 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                  >
                    Характеристики
                  </TabsTrigger>
                  <TabsTrigger 
                    value="services"
                    className="flex-1 min-w-0 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                  >
                    Услуги
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reviews"
                    className="flex-1 min-w-0 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                  >
                    Отзывы
                  </TabsTrigger>
                </div>
              </TabsList>
            </div>
            
            <div className="p-6">
              <TabsContent value="overview" className="mt-0">
                <OverviewTab equipment={equipment} />
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-0">
                <SpecificationsTab equipment={equipment} />
              </TabsContent>
              
              <TabsContent value="services" className="mt-0">
                <ServicesTab equipment={equipment} />
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-0">
                <ReviewsTab equipment={equipment} />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Рекомендуемые товары */}
        {recommendedEquipment.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Похожее оборудование
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedEquipment.map((item) => (
                <RecommendedCard
                  key={item.id}
                  equipment={item}
                  onClick={() => navigate(`/equipment/${item.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* AR Preview Modal */}
      <AnimatePresence>
        {showARPreview && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowARPreview(false)}
          >
            <motion.div
              className="w-full h-full max-w-4xl mx-auto relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-4 right-4 z-10">
                <TouchButton
                  variant="secondary"
                  onClick={() => setShowARPreview(false)}
                  className="bg-white/90 backdrop-blur-sm"
                >
                  Закрыть
                </TouchButton>
              </div>
              
              <ARPreview
                equipment={equipmentFor3D}
                onEquipmentSelect={handleAREquipmentSelect}
                onSessionSave={handleARSessionSave}
                className="w-full h-full rounded-xl overflow-hidden"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Компонент карточки цены
interface PriceCardProps {
  period: string;
  price: number;
  recommended?: boolean;
  savings?: number;
}

const PriceCard: React.FC<PriceCardProps> = ({ period, price, recommended, savings }) => (
  <div className={cn(
    "p-4 rounded-xl border-2 text-center",
    recommended 
      ? "border-blue-500 bg-blue-50" 
      : "border-gray-200 bg-white"
  )}>
    {recommended && (
      <Badge className="mb-2 bg-blue-500 text-white">
        Популярно
      </Badge>
    )}
    <div className="text-sm text-gray-600 mb-1">{period}</div>
    <div className="text-lg font-bold text-gray-900">
      {price.toLocaleString()} ₽
    </div>
    {savings && savings > 0 && (
      <div className="text-xs text-green-600 mt-1">
        Экономия {savings.toLocaleString()} ₽
      </div>
    )}
  </div>
);

// Вкладка "Обзор"
const OverviewTab: React.FC<{ equipment: Equipment }> = ({ equipment }) => (
  <div className="space-y-6">
    <div>
      <h3 className="font-semibold text-gray-900 mb-2">Описание</h3>
      <p className="text-gray-700 leading-relaxed">
        {equipment.description}
      </p>
    </div>
    
    <div>
      <h3 className="font-semibold text-gray-900 mb-2">Основные характеристики</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(equipment.specifications).slice(0, 6).map(([key, value]) => (
          <div key={key} className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-600">{key}:</span>
            <span className="font-medium text-gray-900">{value}</span>
          </div>
        ))}
      </div>
    </div>
    
    {equipment.tags.length > 0 && (
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Теги</h3>
        <div className="flex flex-wrap gap-2">
          {equipment.tags.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    )}
  </div>
);

// Вкладка "Характеристики"
const SpecificationsTab: React.FC<{ equipment: Equipment }> = ({ equipment }) => (
  <div className="space-y-4">
    {Object.entries(equipment.specifications).map(([key, value]) => (
      <div key={key} className="flex justify-between py-3 border-b border-gray-100">
        <span className="text-gray-600 font-medium">{key}:</span>
        <span className="text-gray-900">{value}</span>
      </div>
    ))}
  </div>
);

// Вкладка "Услуги"
const ServicesTab: React.FC<{ equipment: Equipment }> = ({ equipment }) => (
  <div className="space-y-4">
    <ServiceItem
      icon={Truck}
      title="Доставка и самовывоз"
      description="Бесплатная доставка при заказе от 50,000₽"
      price={equipment.pricing.deliveryFee}
    />
    <ServiceItem
      icon={Wrench}
      title="Установка и настройка"
      description="Профессиональный монтаж и настройка оборудования"
      price={equipment.pricing.setupFee}
    />
    <ServiceItem
      icon={Clock}
      title="Техническая поддержка"
      description="Консультации и поддержка во время мероприятия"
      price={5000}
    />
  </div>
);

// Компонент услуги
interface ServiceItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  price?: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ icon: Icon, title, description, price }) => (
  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <div className="flex-1">
      <h4 className="font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    {price && (
      <div className="text-lg font-semibold text-gray-900">
        {price.toLocaleString()} ₽
      </div>
    )}
  </div>
);

// Вкладка "Отзывы"
const ReviewsTab: React.FC<{ equipment: Equipment }> = ({ equipment }) => (
  <div className="space-y-6">
    <div className="text-center py-8">
      <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-600 mb-2">
        Отзывы пока не добавлены
      </h3>
      <p className="text-gray-500">
        Станьте первым, кто оставит отзыв об этом оборудовании
      </p>
    </div>
  </div>
);

// Карточка рекомендуемого товара
const RecommendedCard: React.FC<{ equipment: Equipment; onClick: () => void }> = ({ 
  equipment, 
  onClick 
}) => (
  <TouchCard clickable onClick={onClick} className="group">
    <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-3">
      {equipment.media.thumbnail ? (
        <img
          src={equipment.media.thumbnail}
          alt={equipment.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Zap className="w-8 h-8 text-gray-400" />
        </div>
      )}
    </div>
    
    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
      {equipment.name}
    </h3>
    
    <p className="text-sm text-gray-600 mb-2">
      {equipment.brand}
    </p>
    
    <div className="flex justify-between items-center">
      <span className="font-semibold text-blue-600">
        {equipment.pricing.dailyRate.toLocaleString()} ₽/день
      </span>
      {equipment.rating && (
        <div className="flex items-center space-x-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs text-gray-600">
            {equipment.rating.average.toFixed(1)}
          </span>
        </div>
      )}
    </div>
  </TouchCard>
);

// Компонент скелетона загрузки
const ProductDetailSkeleton: React.FC = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-white border-b border-gray-200 h-16" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
          <div className="h-20 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

// Компонент "Товар не найден"
const ProductNotFound: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Товар не найден
      </h1>
      <p className="text-gray-600 mb-6">
        Запрашиваемое оборудование не существует или было удалено
      </p>
      <TouchButton 
        variant="primary" 
        onClick={() => window.history.back()}
      >
        Вернуться назад
      </TouchButton>
    </div>
  </div>
);

export default ProductDetailPage;