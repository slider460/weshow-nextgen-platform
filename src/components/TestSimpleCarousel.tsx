import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TestSimpleCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const items = [
    { id: 1, title: "Тест 1", color: "bg-red-500" },
    { id: 2, title: "Тест 2", color: "bg-blue-500" },
    { id: 3, title: "Тест 3", color: "bg-green-500" },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Тест простой карусели</h2>
        
        <div className="relative w-full">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {items.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <div className={`${item.color} p-6 rounded-lg text-white text-center min-h-[200px] flex items-center justify-center`}>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSimpleCarousel;
