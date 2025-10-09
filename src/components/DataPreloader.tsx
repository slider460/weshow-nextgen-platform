import React, { ReactNode } from 'react';
import { usePreloader } from '../hooks/usePreloader';

interface DataPreloaderProps {
  children: ReactNode;
}

/**
 * Компонент для предзагрузки критических данных
 * Показывает загрузочный экран пока данные не загружены
 */
export const DataPreloader: React.FC<DataPreloaderProps> = ({ children }) => {
  const { isLoading, error, isReady } = usePreloader();

  // Если есть ошибка, показываем её
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Ошибка загрузки данных
          </h2>
          <p className="text-slate-600 mb-4">
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  // Если данные загружаются, показываем загрузочный экран
  if (isLoading || !isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          {/* Логотип или брендинг */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">W</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">WESHOW</h1>
            <p className="text-slate-600">Загружаем данные...</p>
          </div>

          {/* Прогресс-бар */}
          <div className="w-64 bg-slate-200 rounded-full h-2 mx-auto mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse"></div>
          </div>

          {/* Спиннер */}
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          
          {/* Дополнительная информация */}
          <div className="mt-6 text-sm text-slate-500">
            <p>Подготавливаем каталог оборудования...</p>
            <p className="mt-1">Это займет всего несколько секунд</p>
          </div>
          
          {/* Кнопка пропуска загрузки */}
          <div className="mt-8">
            <button 
              onClick={() => {
                console.log('⚠️ Пользователь пропустил загрузку');
                // Принудительно завершаем загрузку
                window.location.reload();
              }}
              className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Пропустить загрузку
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Если данные загружены, показываем приложение
  return <>{children}</>;
};
