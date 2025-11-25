import React from 'react'

export function TestimonialSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      {/* Звезды рейтинга */}
      <div className="flex space-x-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
        ))}
      </div>
      
      {/* Текст отзыва */}
      <div className="space-y-3 mb-4">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      
      {/* Имя клиента */}
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  )
}

export function TestimonialsGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <TestimonialSkeleton key={i} />
      ))}
    </div>
  )
}
