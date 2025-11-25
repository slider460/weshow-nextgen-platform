import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Clock,
  TrendingUp,
  Filter,
  ArrowLeft,
  X,
  Zap,
  Package,
  Star
} from 'lucide-react';
import { TouchButton, TouchInput, TouchCard } from '../components/TouchFriendlyComponents';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useResponsive } from '../hooks/useResponsive';
import { searchEquipment, mockEquipment, getEquipmentCategories } from '../data/equipmentData';
import type { Equipment, EquipmentCategory } from '../types/equipment';
import { cn } from '../lib/utils';

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

// Популярные поисковые запросы
const POPULAR_SEARCHES = [
  'LED экран',
  'проектор',
  'звук',
  'освещение',
  'интерактивная панель',
  'AR очки',
  'микрофон',
  'камера 4K'
];

// Интерфейс для предложений автодополнения
interface SearchSuggestion {
  id: string;
  text: string;
  type: 'equipment' | 'category' | 'brand' | 'tag';
  equipment?: Equipment;
  category?: EquipmentCategory;
  count?: number;
}

export const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isMobile } = useResponsive();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Состояние поиска
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState<Equipment[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  // Фокус на поле поиска при загрузке страницы
  useEffect(() => {
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Загрузка недавних поисков из localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Ошибка загрузки недавних поисков:', error);
      }
    }
  }, []);

  // Выполнение поиска при изменении query из URL
  useEffect(() => {
    const urlQuery = searchParams.get('q');
    if (urlQuery && urlQuery !== query) {
      setQuery(urlQuery);
      performSearch(urlQuery);
    }
  }, [searchParams]);

  // Генерация предложений автодополнения
  const generateSuggestions = useMemo(() => {
    return (searchTerm: string): SearchSuggestion[] => {
      if (!searchTerm.trim()) return [];
      
      const term = searchTerm.toLowerCase();
      const suggestions: SearchSuggestion[] = [];
      
      // Поиск по названиям оборудования
      mockEquipment
        .filter(item => 
          item.isActive && 
          item.name.toLowerCase().includes(term)
        )
        .slice(0, 3)
        .forEach(item => {
          suggestions.push({
            id: `equipment-${item.id}`,
            text: item.name,
            type: 'equipment',
            equipment: item
          });
        });
      
      // Поиск по категориям
      Object.entries(CATEGORY_LABELS)
        .filter(([_, label]) => label.toLowerCase().includes(term))
        .forEach(([category, label]) => {
          const count = mockEquipment.filter(
            item => item.category === category && item.isActive
          ).length;
          
          suggestions.push({
            id: `category-${category}`,
            text: label,
            type: 'category',
            category: category as EquipmentCategory,
            count
          });
        });
      
      // Поиск по брендам
      const brands = new Set(
        mockEquipment
          .filter(item => 
            item.isActive && 
            item.brand.toLowerCase().includes(term)
          )
          .map(item => item.brand)
      );
      
      Array.from(brands).slice(0, 2).forEach(brand => {
        const count = mockEquipment.filter(
          item => item.brand === brand && item.isActive
        ).length;
        
        suggestions.push({
          id: `brand-${brand}`,
          text: brand,
          type: 'brand',
          count
        });
      });
      
      // Поиск по тегам
      const matchingTags = new Set<string>();
      mockEquipment.forEach(item => {
        if (item.isActive) {
          item.tags.forEach(tag => {
            if (tag.toLowerCase().includes(term)) {
              matchingTags.add(tag);
            }
          });
        }
      });
      
      Array.from(matchingTags).slice(0, 2).forEach(tag => {
        suggestions.push({
          id: `tag-${tag}`,
          text: tag,
          type: 'tag'
        });
      });
      
      return suggestions.slice(0, 8);
    };
  }, []);

  // Обновление предложений при изменении запроса
  useEffect(() => {
    const suggestions = generateSuggestions(query);
    setSuggestions(suggestions);
    setSelectedSuggestionIndex(-1);
  }, [query, generateSuggestions]);

  // Выполнение поиска
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    
    try {
      // Имитация задержки API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const results = searchEquipment(searchQuery);
      setSearchResults(results);
      
      // Сохранение в недавние поиски
      saveRecentSearch(searchQuery);
      
    } catch (error) {
      console.error('Ошибка поиска:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Сохранение недавнего поиска
  const saveRecentSearch = (searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (!trimmed || recentSearches.includes(trimmed)) return;
    
    const updated = [trimmed, ...recentSearches.slice(0, 9)];
    setRecentSearches(updated);
    localStorage.setItem('recent_searches', JSON.stringify(updated));
  };

  // Обработка отправки формы поиска
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    
    if (trimmed) {
      setShowSuggestions(false);
      setSearchParams({ q: trimmed });
      performSearch(trimmed);
    }
  };

  // Обработка изменения поискового запроса
  const handleQueryChange = (value: string) => {
    setQuery(value);
    setShowSuggestions(true);
    
    if (!value.trim()) {
      setSearchResults([]);
      setSearchParams({});
    }
  };

  // Обработка клика по предложению
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    switch (suggestion.type) {
      case 'equipment':
        navigate(`/equipment/${suggestion.equipment?.id}`);
        break;
      case 'category':
        navigate(`/equipment?category=${suggestion.category}`);
        break;
      case 'brand':
      case 'tag':
        setQuery(suggestion.text);
        setSearchParams({ q: suggestion.text });
        performSearch(suggestion.text);
        break;
    }
    setShowSuggestions(false);
  };

  // Обработка клавиш навигации
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        if (selectedSuggestionIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Очистка недавних поисков
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recent_searches');
  };

  // Иконка для типа предложения
  const getSuggestionIcon = (type: SearchSuggestion['type']) => {
    switch (type) {
      case 'equipment': return Package;
      case 'category': return Filter;
      case 'brand': return Star;
      case 'tag': return Zap;
      default: return Search;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Заголовок */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 space-x-4">
            <TouchButton
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </TouchButton>
            
            <div className="flex-1 relative">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Поиск оборудования..."
                    value={query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(true)}
                    className={cn(
                      "w-full pl-10 pr-10 py-3 bg-gray-100 rounded-xl",
                      "border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white",
                      "transition-colors duration-200",
                      isMobile ? "text-lg" : "text-base"
                    )}
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        setSearchResults([]);
                        setSearchParams({});
                        setShowSuggestions(false);
                      }}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </form>
              
              {/* Предложения автодополнения */}
              <AnimatePresence>
                {showSuggestions && (query || recentSearches.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
                  >
                    {query ? (
                      // Предложения на основе запроса
                      suggestions.length > 0 ? (
                        <div className="max-h-80 overflow-y-auto">
                          {suggestions.map((suggestion, index) => {
                            const IconComponent = getSuggestionIcon(suggestion.type);
                            const isSelected = index === selectedSuggestionIndex;
                            
                            return (
                              <button
                                key={suggestion.id}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className={cn(
                                  "w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors",
                                  isSelected && "bg-blue-50"
                                )}
                              >
                                <IconComponent className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-gray-900 truncate">
                                    {suggestion.text}
                                  </div>
                                  {suggestion.type === 'equipment' && suggestion.equipment && (
                                    <div className="text-sm text-gray-500 truncate">
                                      {suggestion.equipment.brand} • {CATEGORY_LABELS[suggestion.equipment.category]}
                                    </div>
                                  )}
                                </div>
                                {suggestion.count && (
                                  <Badge variant="secondary" className="text-xs">
                                    {suggestion.count}
                                  </Badge>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="px-4 py-6 text-center text-gray-500">
                          Нет предложений для "{query}"
                        </div>
                      )
                    ) : (
                      // Недавние поиски
                      <div>
                        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                          <span className="text-sm font-medium text-gray-600">
                            Недавние поиски
                          </span>
                          {recentSearches.length > 0 && (
                            <button
                              onClick={clearRecentSearches}
                              className="text-xs text-blue-600 hover:text-blue-700"
                            >
                              Очистить
                            </button>
                          )}
                        </div>
                        
                        {recentSearches.length > 0 ? (
                          <div className="max-h-60 overflow-y-auto">
                            {recentSearches.map((search, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setQuery(search);
                                  setSearchParams({ q: search });
                                  performSearch(search);
                                  setShowSuggestions(false);
                                }}
                                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                              >
                                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                <span className="flex-1 text-gray-900 truncate">
                                  {search}
                                </span>
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="px-4 py-6 text-center text-gray-500">
                            Нет недавних поисков
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!query && !searchResults.length ? (
          // Стартовое состояние
          <div className="space-y-8">
            {/* Популярные запросы */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Популярные запросы
              </h2>
              
              <div className="flex flex-wrap gap-3">
                {POPULAR_SEARCHES.map((search, index) => (
                  <TouchButton
                    key={index}
                    variant="outline"
                    onClick={() => {
                      setQuery(search);
                      setSearchParams({ q: search });
                      performSearch(search);
                    }}
                    className="text-sm"
                  >
                    {search}
                  </TouchButton>
                ))}
              </div>
            </div>

            {/* Категории */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Поиск по категориям
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(CATEGORY_LABELS).map(([category, label]) => {
                  const count = mockEquipment.filter(
                    item => item.category === category && item.isActive
                  ).length;
                  
                  return (
                    <TouchCard
                      key={category}
                      clickable
                      onClick={() => navigate(`/equipment?category=${category}`)}
                      className="p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {label}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {count} позиций
                          </p>
                        </div>
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                    </TouchCard>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          // Результаты поиска
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {isSearching ? 'Поиск...' : `Результаты для "${query}"`}
              </h2>
              
              {!isSearching && (
                <span className="text-gray-600">
                  Найдено: {searchResults.length}
                </span>
              )}
            </div>

            {isSearching ? (
              // Загрузка
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-square bg-gray-200 animate-pulse" />
                    <CardContent className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              // Результаты
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((equipment) => (
                  <SearchResultCard
                    key={equipment.id}
                    equipment={equipment}
                    query={query}
                    onClick={() => navigate(`/equipment/${equipment.id}`)}
                  />
                ))}
              </div>
            ) : (
              // Нет результатов
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  Ничего не найдено
                </h3>
                <p className="text-gray-500 mb-6">
                  Попробуйте изменить поисковый запрос или воспользоваться фильтрами
                </p>
                
                <TouchButton
                  variant="outline"
                  onClick={() => navigate('/equipment')}
                >
                  Перейти к каталогу
                </TouchButton>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Компонент карточки результата поиска
interface SearchResultCardProps {
  equipment: Equipment;
  query: string;
  onClick: () => void;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ 
  equipment, 
  query, 
  onClick 
}) => {
  // Подсветка совпадений в тексте
  const highlightText = (text: string, searchQuery: string) => {
    if (!searchQuery.trim()) return text;
    
    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return (
      <>
        {parts.map((part, index) => 
          regex.test(part) ? (
            <mark key={index} className="bg-yellow-200 px-1 rounded">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <TouchCard clickable onClick={onClick} className="group overflow-hidden">
      {/* Изображение */}
      <div className="aspect-square bg-gray-100 overflow-hidden">
        {equipment.media.thumbnail ? (
          <img
            src={equipment.media.thumbnail}
            alt={equipment.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-gray-300" />
          </div>
        )}
      </div>
      
      {/* Контент */}
      <div className="p-4 space-y-2">
        {/* Бейджи */}
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="text-xs">
            {CATEGORY_LABELS[equipment.category]}
          </Badge>
          {equipment.featured && (
            <Badge className="bg-orange-500 text-white text-xs">
              <Star className="w-2 h-2 mr-1 fill-current" />
              Хит
            </Badge>
          )}
        </div>
        
        {/* Название */}
        <h3 className="font-semibold text-gray-900 line-clamp-2">
          {highlightText(equipment.name, query)}
        </h3>
        
        {/* Бренд */}
        <p className="text-sm text-gray-600">
          {highlightText(equipment.brand, query)}
        </p>
        
        {/* Цена и рейтинг */}
        <div className="flex items-center justify-between">
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
        
        {/* Доступность */}
        <div className="flex items-center space-x-1">
          {equipment.availability.available > 0 ? (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-xs text-gray-600">
                В наличии {equipment.availability.available} шт.
              </span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-xs text-gray-600">
                Недоступно
              </span>
            </>
          )}
        </div>
      </div>
    </TouchCard>
  );
};

export default SearchPage;