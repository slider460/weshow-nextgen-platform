import React, { useState, useEffect } from 'react';
import { Play, Eye, Star, Zap, Sparkles, Monitor, Smartphone, Tablet } from 'lucide-react';

const FigmaExactDemo = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">Точная копия из Figma</h1>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <Monitor className="h-4 w-4" />
              <span>Desktop</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Title Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 text-sm font-medium text-slate-700 mb-6">
            <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
            Точная копия дизайна из Figma
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
            Интерактивные
            <span className="text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent block md:inline animate-gradient-shift">
              {" "}решения
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Современные мультимедийные технологии для ваших проектов
          </p>
        </div>

        {/* Cards Grid - Exact Figma Layout */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Card 1: Комплексная аренда - Large card spanning 2 columns */}
          <div 
            className="lg:col-span-2 gradient-card-purple-dark rounded-3xl p-8 relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 group"
            onMouseEnter={() => setHoveredCard('rental')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* 3D Geometric Elements - точно как в Figma */}
            <div className="absolute top-6 right-6 w-24 h-24 opacity-60">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-white/20 rounded-lg transform rotate-45 scale-75 animate-float"></div>
                <div className="absolute top-0 left-0 w-3/4 h-3/4 bg-white/30 rounded-lg transform rotate-45 scale-75 translate-x-2 -translate-y-2 animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 bg-white/25 rounded-full animate-pulse-slow"></div>
              </div>
            </div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  Цена аренды нашего цифрового оборудования включает в себя полный спектр обслуживания: оперативная доставка, качественный монтаж и техническое сопровождение.
                </p>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                  КОМПЛЕКСНАЯ АРЕНДА ИНТЕРАКТИВНОГО ОБОРУДОВАНИЯ
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="border-white/50 text-white group-hover:bg-white/25 bg-white/10 group-hover:border-white/70 transition-all duration-300 drop-shadow-md backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium group-hover:animate-pulse">
                  Подробнее →
                </div>
                {hoveredCard === 'rental' && (
                  <div className="flex items-center space-x-2 text-white/80 animate-fade-in-scale">
                    <Sparkles className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Интерактивно</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: SHOW REEL */}
          <div 
            className="gradient-card-purple rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 transition-all duration-500 group"
            onMouseEnter={() => setHoveredCard('showreel')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 className="text-4xl font-bold text-white mb-6 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
              SHOW<br />REEL
            </h3>
            <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300 group-hover:scale-110 group-hover:animate-spin">
              <Play className="h-10 w-10 text-white ml-1 drop-shadow-md" />
            </div>
            {hoveredCard === 'showreel' && (
              <div className="mt-4 flex items-center space-x-2 text-white/80 animate-fade-in-scale">
                <Zap className="h-4 w-4 animate-bounce" />
                <span className="text-sm">Нажмите для просмотра</span>
              </div>
            )}
          </div>

          {/* Card 3: ВДНХ */}
          <div 
            className="gradient-card-cyan rounded-3xl p-8 flex flex-col cursor-pointer hover:scale-105 transition-all duration-500 group relative overflow-hidden"
            onMouseEnter={() => setHoveredCard('vdnh')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* 3D Avatar Element - как в Figma */}
            <div className="absolute top-4 right-4 w-16 h-16 opacity-80">
              <div className="w-full h-full bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">👤</span>
                </div>
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                ВДНХ
              </h3>
              <p className="text-white/95 text-base mb-6 drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                стенд Самарской области<br />
                на выставке-форуме<br />
                «Россия»
              </p>
              <div className="border-white/40 text-white group-hover:bg-white/20 bg-white/10 group-hover:border-white/60 transition-all duration-300 drop-shadow-md px-4 py-2 rounded-full text-sm font-medium group-hover:animate-pulse">
                посмотреть →
              </div>
            </div>
          </div>

          {/* Card 4: A Galaxy Event - Large card spanning 2 columns */}
          <div 
            className="lg:col-span-2 gradient-card-dark rounded-3xl p-8 relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 group"
            onMouseEnter={() => setHoveredCard('galaxy')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Event Stage Background Effect - как в Figma */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-400/20 via-pink-400/20 to-blue-400/20"></div>
              <div className="absolute top-0 left-1/4 w-2 h-32 bg-yellow-400/40 transform -skew-x-12"></div>
              <div className="absolute top-0 left-1/2 w-2 h-32 bg-pink-400/40 transform -skew-x-12"></div>
              <div className="absolute top-0 left-3/4 w-2 h-32 bg-blue-400/40 transform -skew-x-12"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                A Galaxy Event
              </h3>
              <p className="text-white/95 text-xl mb-6 drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                Особенный новый год Samsung
              </p>
              <div className="border-white/40 text-white group-hover:bg-white/20 bg-white/10 group-hover:border-white/60 transition-all duration-300 drop-shadow-md px-4 py-2 rounded-full text-sm font-medium group-hover:animate-pulse">
                посмотреть →
              </div>
            </div>
          </div>

          {/* Card 5: SHOW ROOM */}
          <div 
            className="gradient-card-cyan rounded-3xl p-8 flex flex-col group hover:scale-105 transition-all duration-500"
            onMouseEnter={() => setHoveredCard('showroom')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3 className="text-3xl font-bold text-white mb-6 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
              SHOW<br />ROOM
            </h3>
            <p className="text-white/95 text-base mb-6 drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
              Посмотрите наши решения в живую!
            </p>
            
            {/* Tech Icons Grid - как в Figma */}
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <div className="w-12 h-12 bg-white/30 rounded-xl hover:bg-white/40 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                <span className="text-white text-lg">💡</span>
              </div>
              <div className="w-12 h-12 bg-white/30 rounded-xl hover:bg-white/40 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                <span className="text-white text-lg">🥽</span>
              </div>
              <div className="w-12 h-12 bg-white/30 rounded-xl hover:bg-white/40 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                <span className="text-white text-lg">⚡</span>
              </div>
              <div className="w-12 h-12 bg-white/30 rounded-xl hover:bg-white/40 transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                <span className="text-white text-lg">🔲</span>
              </div>
            </div>
            
            {hoveredCard === 'showroom' && (
              <div className="mt-4 border-white/40 text-white group-hover:bg-white/20 bg-white/10 group-hover:border-white/60 transition-all duration-300 drop-shadow-md px-4 py-2 rounded-full text-sm font-medium group-hover:animate-pulse">
                Подробнее →
              </div>
            )}
          </div>

          {/* Card 6: Выставка Самара */}
          <div 
            className="gradient-card-purple rounded-3xl p-8 flex flex-col group hover:scale-105 transition-all duration-500 relative overflow-hidden"
            onMouseEnter={() => setHoveredCard('samara')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* 2025 Overlay - точно как в Figma */}
            <div className="absolute bottom-4 right-4 text-white/20 text-6xl font-bold transform rotate-12">
              2025
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
                Выставка «Самара»
              </h3>
              <p className="text-white/95 text-base drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
                интерактивные решения
              </p>
              
              {hoveredCard === 'samara' && (
                <div className="mt-4 border-white/40 text-white group-hover:bg-white/20 bg-white/10 group-hover:border-white/60 transition-all duration-300 drop-shadow-md px-4 py-2 rounded-full text-sm font-medium group-hover:animate-pulse">
                  посмотреть →
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center space-x-4 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-2 text-slate-600">
              <Star className="h-5 w-5 text-yellow-500 animate-pulse" />
              <span className="font-medium">Точная копия из Figma</span>
            </div>
            <div className="w-px h-6 bg-slate-300"></div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Zap className="h-5 w-5 text-blue-500 animate-bounce" />
              <span className="font-medium">Интерактивные элементы</span>
            </div>
            <div className="w-px h-6 bg-slate-300"></div>
            <div className="flex items-center space-x-2 text-slate-600">
              <Sparkles className="h-5 w-5 text-purple-500 animate-spin" />
              <span className="font-medium">Анимации и эффекты</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigmaExactDemo;