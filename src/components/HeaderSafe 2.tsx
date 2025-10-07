import React from 'react';
import ErrorBoundary from './ErrorBoundary';

// Импортируем оригинальный Header
import Header from './Header';

// Создаем fallback для Header
const HeaderFallback = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-lg">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center h-20 justify-between">
        {/* Простой логотип */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">W</span>
          </div>
          <span className="text-xl font-bold text-slate-900">WESHOW</span>
        </div>
        
        {/* Простое меню */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/" className="text-slate-700 hover:text-blue-600">Главная</a>
          <a href="/services" className="text-slate-700 hover:text-blue-600">Услуги</a>
          <a href="/portfolio" className="text-slate-700 hover:text-blue-600">Портфолио</a>
          <a href="/contact" className="text-slate-700 hover:text-blue-600">Контакты</a>
        </nav>
        
        {/* Кнопка консультации */}
        <button className="hidden lg:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Получить консультацию
        </button>
        
        {/* Мобильное меню */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </header>
);

// Безопасный Header с error boundary
const HeaderSafe: React.FC = () => {
  return (
    <ErrorBoundary fallback={<HeaderFallback />}>
      <Header />
    </ErrorBoundary>
  );
};

export default HeaderSafe;