import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { loadingSpinner, loadingPulse, skeletonShimmer } from '../../lib/animations';

// === ОСНОВНЫЕ LOADING КОМПОНЕНТЫ ===

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'white';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  color = 'primary'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    accent: 'text-purple-600',
    white: 'text-white'
  };

  return (
    <motion.div
      className={cn(
        'inline-block border-2 border-current border-t-transparent rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      variants={loadingSpinner}
      animate=\"animate\"
    />
  );
};

// === ПУЛЬСИРУЮЩИЙ ЛОАДЕР ===

interface PulseLoaderProps {
  className?: string;
  dotCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const PulseLoader: React.FC<PulseLoaderProps> = ({
  className,
  dotCount = 3,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className={cn('flex space-x-1 items-center', className)}>
      {Array.from({ length: dotCount }).map((_, index) => (
        <motion.div
          key={index}
          className={cn(
            'rounded-full bg-current',
            sizeClasses[size]
          )}
          variants={loadingPulse}
          animate=\"animate\"
          style={{
            animationDelay: `${index * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};

// === СОВРЕМЕННЫЙ LOADING OVERLAY ===

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  backdrop?: boolean;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  message = 'Загрузка...',
  backdrop = true,
  className
}) => {
  return (
    <div className={cn('relative', className)}>
      {children}
      
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center z-50',
            backdrop ? 'bg-white/80 backdrop-blur-sm' : ''
          )}
        >
          <LoadingSpinner size=\"lg\" className=\"mb-4\" />
          <p className=\"text-gray-600 font-medium\">{message}</p>
        </motion.div>
      )}
    </div>
  );
};

// === СКЕЛЕТОНЫ ===

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  animate = true 
}) => {
  return (
    <div 
      className={cn(
        'bg-gray-200 rounded-lg overflow-hidden relative',
        className
      )}
    >
      {animate && (
        <motion.div
          className=\"absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent\"
          variants={skeletonShimmer}
          animate=\"animate\"
        />
      )}
    </div>
  );
};

// === СКЕЛЕТОНЫ ДЛЯ КАРТОЧЕК ОБОРУДОВАНИЯ ===

export const EquipmentCardSkeleton: React.FC = () => {
  return (
    <div className=\"bg-white rounded-xl border border-gray-200 overflow-hidden\">
      {/* Изображение */}
      <Skeleton className=\"w-full h-48\" />
      
      {/* Контент */}
      <div className=\"p-6 space-y-4\">
        {/* Заголовок */}
        <Skeleton className=\"h-6 w-3/4\" />
        
        {/* Описание */}
        <div className=\"space-y-2\">
          <Skeleton className=\"h-4 w-full\" />
          <Skeleton className=\"h-4 w-2/3\" />
        </div>
        
        {/* Цена */}
        <Skeleton className=\"h-8 w-1/3\" />
        
        {/* Кнопка */}
        <Skeleton className=\"h-12 w-full\" />
      </div>
    </div>
  );
};

// === СКЕЛЕТОН ДЛЯ СПИСКА ===

interface ListSkeletonProps {
  itemCount?: number;
  itemHeight?: string;
  showAvatar?: boolean;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
  itemCount = 5,
  itemHeight = 'h-16',
  showAvatar = false
}) => {
  return (
    <div className=\"space-y-4\">
      {Array.from({ length: itemCount }).map((_, index) => (
        <div key={index} className={cn('flex items-center space-x-4 p-4', itemHeight)}>
          {showAvatar && <Skeleton className=\"w-12 h-12 rounded-full flex-shrink-0\" />}
          
          <div className=\"flex-1 space-y-2\">
            <Skeleton className=\"h-4 w-3/4\" />
            <Skeleton className=\"h-3 w-1/2\" />
          </div>
          
          <Skeleton className=\"w-20 h-8\" />
        </div>
      ))}
    </div>
  );
};

// === СКЕЛЕТОН ДЛЯ ПРОФИЛЯ ===

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className=\"bg-white rounded-xl border border-gray-200 p-6\">
      {/* Заголовок профиля */}
      <div className=\"flex items-center space-x-4 mb-6\">
        <Skeleton className=\"w-20 h-20 rounded-full\" />
        <div className=\"flex-1 space-y-2\">
          <Skeleton className=\"h-6 w-1/3\" />
          <Skeleton className=\"h-4 w-1/2\" />
        </div>
      </div>
      
      {/* Поля формы */}
      <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6\">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className=\"space-y-2\">
            <Skeleton className=\"h-4 w-1/4\" />
            <Skeleton className=\"h-12 w-full\" />
          </div>
        ))}
      </div>
    </div>
  );
};

// === СКЕЛЕТОН ДЛЯ НАВИГАЦИИ ===

export const NavigationSkeleton: React.FC = () => {
  return (
    <div className=\"space-y-2\">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className=\"flex items-center space-x-3 p-3\">
          <Skeleton className=\"w-6 h-6\" />
          <Skeleton className=\"h-4 w-24\" />
        </div>
      ))}
    </div>
  );
};

// === СКЕЛЕТОН ДЛЯ ТАБЛИЦЫ ===

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4
}) => {
  return (
    <div className=\"bg-white rounded-xl border border-gray-200 overflow-hidden\">
      {/* Заголовок таблицы */}
      <div className=\"border-b border-gray-200 p-4\">
        <div className=\"grid gap-4\" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={`header-${index}`} className=\"h-4 w-3/4\" />
          ))}
        </div>
      </div>
      
      {/* Строки таблицы */}
      <div className=\"divide-y divide-gray-200\">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className=\"p-4\">
            <div className=\"grid gap-4\" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <Skeleton key={`cell-${rowIndex}-${colIndex}`} className=\"h-4 w-full\" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// === СКЕЛЕТОН ДЛЯ ГРАФИКОВ/ЧАРТОВ ===

export const ChartSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('bg-white rounded-xl border border-gray-200 p-6', className)}>
      {/* Заголовок */}
      <div className=\"mb-6\">
        <Skeleton className=\"h-6 w-1/3 mb-2\" />
        <Skeleton className=\"h-4 w-1/2\" />
      </div>
      
      {/* График */}
      <div className=\"relative h-64\">
        {/* Y-ось */}
        <div className=\"absolute left-0 top-0 bottom-0 flex flex-col justify-between w-12\">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className=\"h-3 w-8\" />
          ))}
        </div>
        
        {/* Область графика */}
        <div className=\"ml-16 h-full relative\">
          <Skeleton className=\"absolute inset-0\" />
          
          {/* Линии графика */}
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton 
              key={index} 
              className={`absolute h-1 bg-blue-200`}
              style={{
                top: `${20 + index * 20}%`,
                left: '10%',
                width: '80%'
              }}
            />
          ))}
        </div>
        
        {/* X-ось */}
        <div className=\"flex justify-between mt-4 ml-16\">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className=\"h-3 w-8\" />
          ))}
        </div>
      </div>
    </div>
  );
};

// === СОСТАВНЫЕ СКЕЛЕТОНЫ ===

// Скелетон для полной страницы каталога
export const CatalogPageSkeleton: React.FC = () => {
  return (
    <div className=\"min-h-screen bg-gray-50 p-4\">
      {/* Заголовок */}
      <div className=\"mb-8\">
        <Skeleton className=\"h-10 w-1/3 mb-4\" />
        <Skeleton className=\"h-6 w-2/3\" />
      </div>
      
      {/* Фильтры */}
      <div className=\"flex space-x-4 mb-8\">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className=\"h-10 w-24\" />
        ))}
      </div>
      
      {/* Сетка карточек */}
      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6\">
        {Array.from({ length: 12 }).map((_, index) => (
          <EquipmentCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

// === УТИЛИТНЫЕ КОМПОНЕНТЫ ===

// Обертка для плавного перехода между загрузкой и контентом
interface ContentTransitionProps {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const ContentTransition: React.FC<ContentTransitionProps> = ({
  isLoading,
  skeleton,
  children,
  className
}) => {
  return (
    <div className={className}>
      {isLoading ? (
        <motion.div
          key=\"skeleton\"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {skeleton}
        </motion.div>
      ) : (
        <motion.div
          key=\"content\"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

export default {
  LoadingSpinner,
  PulseLoader,
  LoadingOverlay,
  Skeleton,
  EquipmentCardSkeleton,
  ListSkeleton,
  ProfileSkeleton,
  NavigationSkeleton,
  TableSkeleton,
  ChartSkeleton,
  CatalogPageSkeleton,
  ContentTransition
};