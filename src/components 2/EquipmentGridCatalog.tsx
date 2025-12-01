import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Grid, 
  List,
  ChevronDown,
  Star,
  Eye,
  Zap,
  Shield,
  ArrowUpDown,
  X,
  Smartphone
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import type { Equipment, EquipmentCategory, EquipmentFilters } from '../types/equipment';
import type { Equipment3DModel } from './3d/ThreeViewer';
import { ARPreview } from './ar/ARPreview';
import { useResponsive } from '../hooks/useResponsive';
import { EquipmentGridSkeleton } from './EquipmentGridSkeleton';
import { AddToCartButton } from './AddToCartButton';
import { cn } from '../lib/utils';

interface EquipmentGridProps {
  equipment: Equipment[];
  loading?: boolean;
  onEquipmentClick?: (equipment: Equipment) => void;
  onFiltersChange?: (filters: EquipmentFilters) => void;
  className?: string;
}

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'price' | 'rating' | 'popularity' | 'newest';

// Константы категорий с русскими названиями
const CATEGORY_LABELS: Record<EquipmentCategory, string> = {
  'led-displays': 'LED-экраны',
  'projection': 'Проекторы',
  'audio': 'Аудиосистемы',
  'lighting': 'Освещение',
  'interactive': 'Интерактивное',
  'ar-vr': 'AR/VR',
  'presentation': 'Презентация',
  'decoration': 'Декор',
  'other': 'Прочее'
};

const SORT_LABELS: Record<SortOption, string> = {
  name: 'По названию',
  price: 'По цене',
  rating: 'По рейтингу',
  popularity: 'По популярности',
  newest: 'Сначала новые'
};

export const EquipmentGrid: React.FC<EquipmentGridProps> = ({
  equipment,
  loading = false,
  onEquipmentClick,
  onFiltersChange,
  className
}) => {
  const { isMobile, isTablet } = useResponsive();
  
  // Debug logging
  console.log('EquipmentGrid render - equipment count:', equipment.length, 'loading:', loading);

  // Состояние UI
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [showARPreview, setShowARPreview] = useState(false);
  const [selectedEquipmentForAR, setSelectedEquipmentForAR] = useState<Equipment | null>(null);

  // Состояние фильтров
  const [selectedCategories, setSelectedCategories] = useState<EquipmentCategory[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  // Получение уникальных брендов из оборудования
  const availableBrands = useMemo(() => {
    const brands = new Set(equipment.map(item => item.brand));
    return Array.from(brands).sort();
  }, [equipment]);

  // Получение диапазона цен
  const priceRangeInfo = useMemo(() => {
    if (equipment.length === 0) return { min: 0, max: 100000 };
    
    const prices = equipment.map(item => item.pricing.dailyRate);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [equipment]);

  // Фильтрация и сортировка оборудования
  const filteredEquipment = useMemo(() => {
    let result = [...equipment];

    // Поиск по тексту
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.brand.toLowerCase().includes(query) ||
        item.model.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query)) ||
        Object.values(item.specifications).some(spec => 
          spec.toString().toLowerCase().includes(query)
        )
      );
    }

    // Фильтр по категориям
    if (selectedCategories.length > 0) {
      result = result.filter(item => selectedCategories.includes(item.category));
    }

    // Фильтр по цене
    result = result.filter(item => 
      item.pricing.dailyRate >= priceRange[0] && 
      item.pricing.dailyRate <= priceRange[1]
    );

    // Фильтр по брендам
    if (selectedBrands.length > 0) {
      result = result.filter(item => selectedBrands.includes(item.brand));
    }

    // Фильтр по наличию
    if (onlyAvailable) {
      result = result.filter(item => item.availability.available > 0);
    }

    // Фильтр рекомендуемого
    if (onlyFeatured) {
      result = result.filter(item => item.featured);
    }

    // Сортировка
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name, 'ru');
          break;
        case 'price':
          comparison = a.pricing.dailyRate - b.pricing.dailyRate;
          break;
        case 'rating':
          comparison = (b.rating?.average || 0) - (a.rating?.average || 0);
          break;
        case 'newest':
          comparison = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          break;
        case 'popularity':
          comparison = (b.rating?.count || 0) - (a.rating?.count || 0);
          break;
      }
      
      return sortOrder === 'desc' ? comparison : -comparison;
    });

    return result;
  }, [
    equipment, searchQuery, selectedCategories, priceRange, 
    selectedBrands, onlyAvailable, onlyFeatured, sortBy, sortOrder
  ]);

  // Обновление фильтров для родительского компонента
  const currentFilters = useMemo((): EquipmentFilters => ({
    categories: selectedCategories.length > 0 ? selectedCategories : undefined,
    priceRange: { min: priceRange[0], max: priceRange[1] },
    brands: selectedBrands.length > 0 ? selectedBrands : undefined,
    availability: onlyAvailable ? ['available'] : undefined,
    featured: onlyFeatured || undefined,
    sortBy,
    sortOrder
  }), [selectedCategories, priceRange, selectedBrands, onlyAvailable, onlyFeatured, sortBy, sortOrder]);

  // Уведомляем об изменении фильтров
  React.useEffect(() => {
    onFiltersChange?.(currentFilters);
  }, [currentFilters, onFiltersChange]);

  // Добавление в корзину

  // Определение количества колонок в зависимости от экрана
  const getGridCols = () => {
    if (isMobile) return 'grid-cols-1';
    if (isTablet) return 'grid-cols-2';
    return 'grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
  };

  // Обработка AR превью
  const handleARPreview = useCallback((equipment: Equipment, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedEquipmentForAR(equipment);
    setShowARPreview(true);
  }, []);

  // Конвертация оборудования для AR
  const convertEquipmentToAR = useCallback((equipment: Equipment): Equipment3DModel[] => {
    return [{
      id: equipment.id,
      name: equipment.name,
      type: equipment.category as any,
      modelUrl: '/models/default-equipment.glb', // Заглушка
      thumbnailUrl: equipment.media.thumbnail || equipment.media.images[0] || '',
      scale: [1, 1, 1],
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      materials: {
        primary: '#3b82f6',
        secondary: '#6b7280'
      }
    }];
  }, []);

  // Обработка AR сессии
  const handleARSessionSave = useCallback((session: any) => {
    console.log('AR session saved from catalog:', session);
  }, []);

  const handleAREquipmentSelect = useCallback((equipment: Equipment3DModel) => {
    console.log('AR equipment selected from catalog:', equipment);
  }, []);

  // Компонент карточки оборудования
  const EquipmentCard = ({ equipment: item }: { equipment: Equipment }) => {

    const cardContent = (
      <Card className={cn(
        "group cursor-pointer transition-all duration-300 hover:shadow-lg",
        "relative overflow-hidden",
        isUnavailable && "opacity-60",
        className
      )}>
        {/* Изображение */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {item.media.images[0] ? (
            <img
              src={item.media.images[0]}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <Grid className="w-12 h-12 text-gray-400" />
            </div>
          )}
          
          {/* Бейджи */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {item.featured && (
              <Badge className="bg-orange-500 text-white">
                <Star className="w-3 h-3 mr-1" />
                Хит
              </Badge>
            )}
            {item.availability.available > 0 && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Shield className="w-3 h-3 mr-1" />
                В наличии
              </Badge>
            )}
          </div>

          {/* Кнопки действий */}
          <div className="absolute top-3 right-3 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              size="sm" 
              variant="secondary"
              className="w-8 h-8 p-0 bg-white/90 hover:bg-white"
              onClick={() => onEquipmentClick?.(item)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            
            {/* AR превью кнопка */}
            <Button 
              size="sm" 
              variant="secondary"
              className="w-8 h-8 p-0 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={(e) => handleARPreview(item, e)}
              title="Посмотреть в AR"
            >
              <Smartphone className="w-3 h-3" />
            </Button>
          </div>

          {/* Цена */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1">
            <span className="text-sm font-semibold text-gray-900">
              {item.pricing.dailyRate.toLocaleString()} ₽/день
            </span>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            {/* Название и категория */}
            <div>
              <h3 className="font-semibold text-gray-900 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600">
                {CATEGORY_LABELS[item.category]} • {item.brand}
              </p>
            </div>

            {/* Характеристики */}
            <div className="text-xs text-gray-500 line-clamp-2">
              {Object.entries(item.specifications)
                .slice(0, 2)
                .map(([key, value]) => `${key}: ${value}`)
                .join(', ')}
            </div>

            {/* Рейтинг */}
            {item.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600">
                  {item.rating.average.toFixed(1)} ({item.rating.count})
                </span>
              </div>
            )}

            {/* Кнопка добавления в корзину */}
            <AddToCartButton 
              item={{
                id: item.id,
                name: item.name,
                price: item.price || 0,
                image: item.image
              }}
              className="w-full mt-3"
            />
          </div>
        </CardContent>
      </Card>
    );

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        onClick={() => onEquipmentClick?.(item)}
      >
        {cardContent}
      </motion.div>
    );
  };

  // Компонент фильтров
  const FiltersContent = () => (
    <div className="space-y-6">
      {/* Поиск */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Поиск
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Название, бренд, характеристики..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Категории */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Категории
        </label>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {Object.entries(CATEGORY_LABELS).map(([category, label]) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category as EquipmentCategory)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories(prev => [...prev, category as EquipmentCategory]);
                  } else {
                    setSelectedCategories(prev => prev.filter(c => c !== category));
                  }
                }}
              />
              <label htmlFor={category} className="text-sm text-gray-600 cursor-pointer">
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Диапазон цен */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Цена за день (₽)
        </label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={priceRangeInfo.max}
            min={priceRangeInfo.min}
            step={1000}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{priceRange[0].toLocaleString()} ₽</span>
            <span>{priceRange[1].toLocaleString()} ₽</span>
          </div>
        </div>
      </div>

      {/* Бренды */}
      {availableBrands.length > 0 && (
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Бренды
          </label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {availableBrands.map(brand => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedBrands(prev => [...prev, brand]);
                    } else {
                      setSelectedBrands(prev => prev.filter(b => b !== brand));
                    }
                  }}
                />
                <label htmlFor={`brand-${brand}`} className="text-sm text-gray-600 cursor-pointer">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Дополнительные фильтры */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Дополнительно
        </label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="only-available"
              checked={onlyAvailable}
              onCheckedChange={setOnlyAvailable}
            />
            <label htmlFor="only-available" className="text-sm text-gray-600 cursor-pointer">
              Только в наличии
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="only-featured"
              checked={onlyFeatured}
              onCheckedChange={setOnlyFeatured}
            />
            <label htmlFor="only-featured" className="text-sm text-gray-600 cursor-pointer">
              Только рекомендуемое
            </label>
          </div>
        </div>
      </div>

      {/* Сброс фильтров */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          setSearchQuery('');
          setSelectedCategories([]);
          setPriceRange([priceRangeInfo.min, priceRangeInfo.max]);
          setSelectedBrands([]);
          setOnlyAvailable(false);
          setOnlyFeatured(false);
          setSortBy('popularity');
          setSortOrder('desc');
        }}
      >
        <X className="w-4 h-4 mr-2" />
        Сбросить фильтры
      </Button>
    </div>
  );

  return (
    <div className={cn("space-y-4", className)}>
      {/* Панель управления */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Поиск для десктопа */}
        <div className="hidden sm:block flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Поиск оборудования..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Сортировка */}
          <div className="flex items-center gap-1">
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SORT_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>

          {/* Переключатель вида */}
          <div className="hidden sm:flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>

          {/* Фильтры */}
          {isMobile ? (
            <Sheet open={showFilters} onOpenChange={setShowFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Фильтры
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Фильтры
              <ChevronDown className={cn(
                "w-4 h-4 ml-2 transition-transform",
                showFilters && "rotate-180"
              )} />
            </Button>
          )}
        </div>
      </div>

      {/* Фильтры для десктопа */}
      <AnimatePresence>
        {!isMobile && showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <FiltersContent />
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Результаты */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>
          Найдено: {filteredEquipment.length} из {equipment.length}
        </span>
        
        {/* Активные фильтры */}
        <div className="flex flex-wrap gap-1">
          {selectedCategories.map(category => (
            <Badge 
              key={category} 
              variant="secondary"
              className="text-xs cursor-pointer"
              onClick={() => setSelectedCategories(prev => prev.filter(c => c !== category))}
            >
              {CATEGORY_LABELS[category]}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          {selectedBrands.map(brand => (
            <Badge 
              key={brand} 
              variant="secondary"
              className="text-xs cursor-pointer"
              onClick={() => setSelectedBrands(prev => prev.filter(b => b !== brand))}
            >
              {brand}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
      </div>

      {/* Сетка оборудования */}
      {loading ? (
        <EquipmentGridSkeleton count={8} />
      ) : filteredEquipment.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">
            Ничего не найдено
          </h3>
          <p className="text-gray-500 mb-4">
            Попробуйте изменить параметры поиска или фильтры
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategories([]);
              setSelectedBrands([]);
              setOnlyAvailable(false);
              setOnlyFeatured(false);
            }}
          >
            Сбросить фильтры
          </Button>
        </div>
      ) : (
        <div className={cn(
          "grid gap-4 sm:gap-6",
          getGridCols()
        )}>
          <AnimatePresence mode="popLayout">
            {filteredEquipment.map((item) => (
              <EquipmentCard key={item.id} equipment={item} />
            ))}
          </AnimatePresence>
        </div>
      )}
      
      {/* AR Preview Modal */}
      <AnimatePresence>
        {showARPreview && selectedEquipmentForAR && (
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
                <Button
                  variant="secondary"
                  onClick={() => setShowARPreview(false)}
                  className="bg-white/90 backdrop-blur-sm"
                >
                  Закрыть
                </Button>
              </div>
              
              <ARPreview
                equipment={convertEquipmentToAR(selectedEquipmentForAR)}
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