import React from 'react'

export function ProjectSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Изображение */}
      <div className="w-full h-48 bg-gray-200"></div>
      
      {/* Контент */}
      <div className="p-6">
        {/* Заголовок */}
        <div className="h-6 bg-gray-200 rounded mb-3"></div>
        
        {/* Описание */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        {/* Дата */}
        <div className="h-4 bg-gray-200 rounded w-1/3 mt-4"></div>
      </div>
    </div>
  )
}

export function ProjectsGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectSkeleton key={i} />
      ))}
    </div>
  )
}
