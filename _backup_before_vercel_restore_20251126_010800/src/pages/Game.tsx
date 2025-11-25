import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Game: React.FC = () => {
  const navigate = useNavigate();

                useEffect(() => {
                // Перенаправляем на оптимизированную версию игры
                window.location.href = '/game-optimized.html';
              }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🚴‍♂️ Велосипедные гонки</h1>
        <p className="text-xl mb-6">Перенаправление на финальную версию...</p>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
        <p className="mt-4 text-sm text-gray-300">
          Если перенаправление не произошло автоматически, 
          <a 
            href="/game-final.html" 
            className="text-blue-400 hover:text-blue-300 underline ml-1"
          >
            нажмите здесь
          </a>
        </p>
                            <div className="mt-6 p-4 bg-white bg-opacity-10 rounded-lg max-w-md mx-auto">
                      <h3 className="text-lg font-bold mb-2">✨ Что нового в оптимизированной версии:</h3>
                      <ul className="text-sm text-left space-y-1">
                        <li>✅ Блокировка прокрутки экрана</li>
                        <li>✅ Система жизней (3 жизни)</li>
                        <li>✅ Игра заканчивается при потере всех жизней</li>
                        <li>✅ Подсчет успешных прыжков</li>
                        <li>✅ Красивые фотореалистичные препятствия</li>
                        <li>✅ Система частиц и эффектов</li>
                        <li>✅ Улучшенная физика и анимация</li>
                        <li>✅ Статистика точности</li>
                        <li>🚀 Оптимизация производительности</li>
                        <li>🚀 Мониторинг FPS</li>
                        <li>🚀 Упрощенная графика для плавности</li>
                        <li>🚀 Пул частиц для экономии памяти</li>
                      </ul>
                    </div>
      </div>
    </div>
  );
};

export default Game;
