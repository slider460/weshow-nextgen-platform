import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  ArrowLeft,
  Star,
  TrendingUp,
  Zap,
  Package
} from 'lucide-react';
import { EquipmentGrid } from '../components/EquipmentGridCatalog';
import { TouchButton } from '../components/TouchFriendlyComponents';
import { EquipmentGridSkeleton } from '../components/EquipmentGridSkeleton';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { AddToCartButton } from '../components/AddToCartButton';
import { useResponsive } from '../hooks/useResponsive';
import { mockEquipment, getFeaturedEquipment, getEquipmentCategories } from '../data/equipmentData';
import { getEquipment } from '../api/equipment';
import { usePreloadedData } from '../hooks/usePreloader';
import type { Equipment, EquipmentFilters, EquipmentCategory } from '../types/equipment';
import { cn } from '../lib/utils';

// Статистика каталога для отображения
interface CatalogStats {
  totalItems: number;
  categories: number;
  featuredItems: number;
  brands: number;
}

const CATEGORY_ICONS: Record<EquipmentCategory, React.ComponentType<{ className?: string }>> = {
  'led-displays': Package,
  'projection': Package,
  'audio': Package,
  'lighting': Zap,
  'interactive': Package,
  'ar-vr': Package,
  'presentation': Package,
  'decoration': Package,
  'other': Package
};

const CATEGORY_LABELS: Record<EquipmentCategory, string> = {
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

export const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMobile } = useResponsive();
  
  // Используем предзагруженные данные
  const { equipment: preloadedEquipment, categories: preloadedCategories, isLoading: preloadedLoading } = usePreloadedData();

  // Состояние страницы
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<EquipmentFilters>({});

  // Получение параметров из URL
  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') as EquipmentCategory;

  // Используем предзагруженные данные
  useEffect(() => {
    if (preloadedEquipment && preloadedEquipment.length > 0) {
      console.log('✅ Используем предзагруженные данные каталога:', preloadedEquipment.length);
      
      // Маппинг категорий
      const categoryMapping: Record<string, string> = {
        '464a3da6-4944-4778-9e84-e28fa43f4f03': 'audio',
        'aafa4e79-347b-4e5a-99e8-fad53f77abb6': 'projection', 
        'eaece304-35d0-4909-8f4f-621cee215257': 'projection',
        '18eaed84-0ef1-4fd4-ac8f-4882a039ceb1': 'lighting'
      };
      
      // Преобразуем данные из Supabase в формат приложения
      const transformedData = preloadedEquipment.map((item: any) => ({
        id: item.id,
        name: item.name,
        category: categoryMapping[item.category_id] || 'other',
        brand: 'WESHOW',
        model: item.name,
        description: item.description || '',
        specifications: item.specifications || {},
        pricing: {
          dailyRate: item.price_per_day,
          weeklyRate: item.price_per_day * 5,
          monthlyRate: item.price_per_day * 20,
          setupFee: 0,
          deliveryFee: 0,
          minimumRental: 1
        },
        availability: {
          total: item.stock_quantity,
          available: item.stock_quantity,
          reserved: 0,
          inRepair: 0
        },
        media: {
          images: item.main_image_url ? [item.main_image_url] : ['/api/placeholder/600/400'],
          thumbnail: item.main_image_url || '/api/placeholder/300/200',
          videos: [],
          documents: []
        },
        requirements: {
          power: '220В',
          space: 'Стандартное',
          setup: 'Профессиональная установка',
          staff: '1-2 специалиста'
        },
        tags: [item.equipment_categories?.name || 'Оборудование'],
        rating: {
          average: 4.5,
          count: Math.floor(Math.random() * 50) + 10
        },
        createdAt: new Date(item.created_at),
        updatedAt: new Date(item.updated_at),
        isActive: true,
        featured: Math.random() > 0.7
      }));
      
      console.log('✅ Преобразовано товаров:', transformedData.length);
      setEquipment(transformedData);
      setLoading(false);
    } else if (!preloadedLoading) {
      // Если предзагрузка завершена, но данных нет, используем mock данные
      console.log('⚠️ Предзагруженных данных нет, используем mock данные');
      setEquipment(mockEquipment);
      setLoading(false);
    }
  }, [preloadedEquipment, preloadedLoading]);

  // Инициализация фильтров из URL параметров
  useEffect(() => {
    const filters: EquipmentFilters = {};
    
    if (searchQuery) {
      // Поиск будет обрабатываться в EquipmentGrid
    }
    
    if (categoryParam && Object.keys(CATEGORY_LABELS).includes(categoryParam)) {
      filters.categories = [categoryParam];
    }
    
    setCurrentFilters(filters);
  }, [searchQuery, categoryParam]);

  // Обработка изменения фильтров
  const handleFiltersChange = (filters: EquipmentFilters) => {
    setCurrentFilters(filters);
    
    // Обновляем URL параметры
    const newParams = new URLSearchParams();
    
    if (filters.categories && filters.categories.length === 1) {
      newParams.set('category', filters.categories[0]);
    }
    
    setSearchParams(newParams);
  };

  // Обработка клика по оборудованию
  const handleEquipmentClick = (equipment: Equipment) => {
    navigate(`/equipment/${equipment.id}`);
  };

  // Статистика каталога
  const catalogStats: CatalogStats = useMemo(() => {
    const activeEquipment = equipment.filter(item => item.isActive);
    const categories = new Set(activeEquipment.map(item => item.category));
    const brands = new Set(activeEquipment.map(item => item.brand));
    const featured = activeEquipment.filter(item => item.featured);
    
    return {
      totalItems: activeEquipment.length,
      categories: categories.size,
      featuredItems: featured.length,
      brands: brands.size
    };
  }, [equipment]);

  // Быстрые фильтры по категориям
  const quickCategories = useMemo(() => {
    const categories = getEquipmentCategories();
    return categories.slice(0, isMobile ? 4 : 8).map(category => ({
      id: category,
      label: CATEGORY_LABELS[category],
      icon: CATEGORY_ICONS[category],
      count: equipment.filter(item => item.category === category && item.isActive).length
    }));
  }, [equipment, isMobile]);

  // Debug logging
  console.log('CatalogPage render - equipment count:', equipment.length, 'loading:', loading);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок страницы */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Навигация назад */}
            <div className="flex items-center space-x-4">
              <TouchButton
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {!isMobile && <span>Назад</span>}
              </TouchButton>
              
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Каталог оборудования
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">
                  {catalogStats.totalItems} позиций в {catalogStats.categories} категориях
                </p>
              </div>
            </div>
            
            {/* Корзина */}
            <TouchButton
              variant="outline"
              onClick={() => setShowCart(true)}
              className="relative"
            >
              <Package className="h-4 w-4 mr-2" />
              Корзина
              {cart.totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center">
                  {cart.totalItems > 99 ? '99+' : cart.totalItems}
                </Badge>
              )}
            </TouchButton>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Статистика и быстрые действия */}
        <div className="mb-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              icon={Package}
              label="Всего позиций"
              value={catalogStats.totalItems}
              color="blue"
            />
            <StatCard
              icon={Star}
              label="Рекомендуемые"
              value={catalogStats.featuredItems}
              color="orange"
            />
            <StatCard
              icon={TrendingUp}
              label="Категорий"
              value={catalogStats.categories}
              color="green"
            />
            <StatCard
              icon={Zap}
              label="Брендов"
              value={catalogStats.brands}
              color="purple"
            />
          </div>

          {/* Быстрые фильтры по категориям */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Популярные категории
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {quickCategories.map((category) => {
                const IconComponent = category.icon;
                const isActive = currentFilters.categories?.includes(category.id);
                
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const newFilters = {
                        ...currentFilters,
                        categories: isActive ? [] : [category.id]
                      };
                      handleFiltersChange(newFilters);
                    }}
                    className={cn(
                      'p-4 rounded-xl border-2 transition-all duration-200 text-center',
                      isActive
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center',
                      isActive ? 'bg-blue-100' : 'bg-gray-100'
                    )}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="text-sm font-medium mb-1">
                      {category.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {category.count} шт.
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Основной каталог */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <EquipmentGrid
              equipment={equipment}
              loading={loading}
              onEquipmentClick={handleEquipmentClick}
              onFiltersChange={handleFiltersChange}
            />
          </div>
        </div>
      </div>

      {/* Корзина */}
      <AdvancedEquipmentCart
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />
    </div>
  );
};

// Компонент карточки статистики
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: 'blue' | 'orange' | 'green' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-100',
    orange: 'text-orange-600 bg-orange-100',
    green: 'text-green-600 bg-green-100',
    purple: 'text-purple-600 bg-purple-100'
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', colorClasses[color])}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {value.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              {label}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CatalogPage;