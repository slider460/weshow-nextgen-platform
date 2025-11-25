import React, { useMemo } from 'react';
import { Plus } from 'lucide-react';
import { localLogos } from '../data/logos';

interface LogosDisplayProps {
  className?: string;
}

const LogosDisplay = React.memo<LogosDisplayProps>(({ 
  className = '' 
}) => {
  const activeLogos = useMemo(() => {
    // Используем локальные логотипы вместо БД
    const logos = localLogos
      .filter(logo => logo.is_active)
      .sort((a, b) => a.sort_order - b.sort_order);
    
    return logos;
  }, []);

  if (activeLogos.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Plus className="w-8 h-8 text-slate-400" />
        </div>
        <h4 className="text-lg font-medium text-slate-600 mb-2">
          Логотипы партнеров
        </h4>
        <p className="text-slate-500">
          Добавьте логотипы ваших партнеров
        </p>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Logos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {activeLogos.map((logo) => (
          <div 
            key={logo.id} 
            className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center relative"
          >
            {/* Logo Image */}
            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
              {logo.logo_url && logo.logo_url !== '/placeholder.svg' ? (
                <img 
                  src={logo.logo_url} 
                  alt={logo.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    console.warn('LogosDisplay: Ошибка загрузки изображения для', logo.name, logo.logo_url);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="text-xs font-medium text-slate-600 text-center">
                  {logo.name ? logo.name.substring(0, 3).toUpperCase() : 'LOGO'}
                </div>
              )}
            </div>
            
            {/* Company Name */}
            <div className="text-xs text-slate-600 font-medium text-center group-hover:text-slate-800 transition-colors duration-300">
              {logo.name}
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          </div>
        ))}
      </div>

      {/* Quick Edit Hint - убрано для обычных пользователей */}
    </div>
  );
});

export default LogosDisplay;
