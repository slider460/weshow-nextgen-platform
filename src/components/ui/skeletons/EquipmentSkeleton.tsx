import React from 'react';

export const EquipmentCardSkeleton = () => (
  <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-xl p-6 animate-pulse h-96">
    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
    <div className="flex items-center justify-between mb-4">
      <div className="h-5 bg-gray-200 rounded w-20"></div>
      <div className="h-5 bg-gray-200 rounded w-16"></div>
    </div>
    <div className="h-10 bg-gray-200 rounded-md w-full"></div>
  </div>
);

export const EquipmentGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
    {Array.from({ length: count }).map((_, index) => (
      <EquipmentCardSkeleton key={index} />
    ))}
  </div>
);

export const EquipmentDetailSkeleton = () => (
  <div className="max-w-6xl mx-auto p-6 animate-pulse">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Изображения */}
      <div className="space-y-4">
        <div className="w-full h-96 bg-gray-200 rounded-lg"></div>
        <div className="grid grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
      
      {/* Информация */}
      <div className="space-y-6">
        <div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        
        <div className="h-12 bg-gray-200 rounded-md w-full"></div>
      </div>
    </div>
  </div>
);

export const EquipmentListSkeleton = ({ count = 10 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-xl p-4 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded"></div>
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="text-right">
            <div className="h-5 bg-gray-200 rounded w-20 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
