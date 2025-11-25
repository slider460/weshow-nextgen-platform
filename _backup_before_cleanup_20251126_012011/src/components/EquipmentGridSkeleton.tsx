import React from 'react';
import { Skeleton } from './ui/skeleton';

interface EquipmentGridSkeletonProps {
  count?: number;
  className?: string;
}

export const EquipmentGridSkeleton: React.FC<EquipmentGridSkeletonProps> = ({ 
  count = 6, 
  className = '' 
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Изображение */}
          <Skeleton className="w-full h-48" />
          
          <div className="p-4 lg:p-6">
            {/* Заголовок */}
            <Skeleton className="h-5 w-3/4 mb-2" />
            
            {/* Описание */}
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            
            {/* Цена */}
            <Skeleton className="h-6 w-1/3 mb-4" />
            
            {/* Кнопки */}
            <div className="flex gap-2">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EquipmentGridSkeleton;
