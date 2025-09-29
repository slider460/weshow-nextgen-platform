import React from 'react';

const FigmaDebug = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-900">
          🎨 Figma Debug - Тестовая страница
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Простая карточка для теста */}
          <div className="gradient-card-purple-dark rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Тестовая карточка
            </h3>
            <p className="text-white/80 mb-4">
              Проверяем работу CSS классов
            </p>
            <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
              Кнопка
            </div>
          </div>
          
          <div className="gradient-card-purple rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Карточка 2
            </h3>
            <p className="text-white/80 mb-4">
              Вторая карточка для теста
            </p>
            <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
              Кнопка 2
            </div>
          </div>
          
          <div className="gradient-card-cyan rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Карточка 3
            </h3>
            <p className="text-white/80 mb-4">
              Третья карточка для теста
            </p>
            <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm">
              Кнопка 3
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Статус: Работает! ✅
            </h2>
            <p className="text-slate-600">
              Если вы видите эту страницу, значит компонент загружается корректно
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigmaDebug;



