import React, { useMemo, useCallback, useState } from 'react';
import { Edit, Plus } from 'lucide-react';
import { useLogos } from '../contexts/LogosContextDB';
import { Button } from './ui/button';

interface LogosDisplayProps {
  showEditButton?: boolean;
  onEditClick?: () => void;
  className?: string;
}

const LogosDisplay = React.memo<LogosDisplayProps>(({ 
  showEditButton = false, 
  onEditClick,
  className = '' 
}) => {
  const { getActiveLogos } = useLogos();
  const [isHovered, setIsHovered] = useState(false);

  const activeLogos = useMemo(() => {
    const logos = getActiveLogos();
    console.log('LogosDisplay: Активные логотипы:', logos.length, logos);
    console.log('LogosDisplay: showEditButton:', showEditButton);
    console.log('LogosDisplay: className:', className);
    
    // Дополнительная проверка каждого логотипа
    logos.forEach((logo, index) => {
      console.log(`LogosDisplay: Логотип ${index + 1}:`, {
        id: logo.id,
        name: logo.name,
        logo_url: logo.logo_url,
        is_active: logo.is_active,
        category: logo.category
      });
    });
    
    return logos;
  }, [getActiveLogos, showEditButton, className]);

  const handleEditClick = useCallback(() => {
    if (onEditClick) {
      onEditClick();
    } else {
      window.location.href = '/admin/logos';
    }
  }, [onEditClick]);

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
    <div 
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Edit Button */}
      {showEditButton && (
        <div className="absolute top-0 right-0 z-10">
          <Button
            onClick={handleEditClick}
            variant="outline"
            size="sm"
            className={`
              transition-all duration-300
              ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
            `}
          >
            <Edit className="w-4 h-4 mr-2" />
            Редактировать
          </Button>
        </div>
      )}

      {/* Logos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {activeLogos.map((logo) => (
          <div 
            key={logo.id} 
            className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center relative"
          >
            {/* Logo Image */}
            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mb-3 overflow-hidden">
              {(logo.logo_url || logo.logoUrl) && (logo.logo_url !== '/placeholder.svg' && logo.logoUrl !== '/placeholder.svg') ? (
                <img 
                  src={logo.logo_url || logo.logoUrl} 
                  alt={logo.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    console.log('LogosDisplay: Ошибка загрузки изображения для', logo.name, logo.logo_url);
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
