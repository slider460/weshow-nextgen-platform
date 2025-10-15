import React from 'react';
import MobileCarousel from './ui/MobileCarousel';

const TestCarousel = () => {
  const testItems = [
    { id: 1, title: "Тест 1", color: "bg-red-500" },
    { id: 2, title: "Тест 2", color: "bg-blue-500" },
    { id: 3, title: "Тест 3", color: "bg-green-500" },
    { id: 4, title: "Тест 4", color: "bg-yellow-500" },
  ];

  return (
    <div className="py-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Тест карусели</h2>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 gap-4 mb-8">
          {testItems.map((item) => (
            <div key={item.id} className={`${item.color} p-6 rounded-lg text-white text-center`}>
              <h3 className="text-xl font-bold">{item.title}</h3>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <MobileCarousel showOnMobile={true} showOnDesktop={false}>
          {testItems.map((item) => (
            <div key={item.id} className={`${item.color} p-6 rounded-lg text-white text-center min-h-[200px] flex items-center justify-center`}>
              <h3 className="text-xl font-bold">{item.title}</h3>
            </div>
          ))}
        </MobileCarousel>
      </div>
    </div>
  );
};

export default TestCarousel;
