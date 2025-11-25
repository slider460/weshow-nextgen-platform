import React from 'react'

export function ServiceSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      {/* Иконка */}
      <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
      
      {/* Заголовок */}
      <div className="h-6 bg-gray-200 rounded mb-3"></div>
      
      {/* Описание */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded w-3/5"></div>
      </div>
      
      {/* Цена */}
      <div className="h-5 bg-gray-200 rounded w-1/3"></div>
    </div>
  )
}

export function ServicesGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ServiceSkeleton key={i} />
      ))}
    </div>
  )
}
