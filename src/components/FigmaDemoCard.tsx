import { useState } from 'react';
import { Play, Eye, Star, Zap, Sparkles, ArrowRight } from 'lucide-react';

interface FigmaDemoCardProps {
  title: string;
  description: string;
  gradient: string;
  icon?: React.ReactNode;
  isLarge?: boolean;
  onHover?: (isHovered: boolean) => void;
  onClick?: () => void;
  children?: React.ReactNode;
}

const FigmaDemoCard = ({ 
  title, 
  description, 
  gradient, 
  icon, 
  isLarge = false,
  onHover,
  onClick,
  children 
}: FigmaDemoCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHover?.(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHover?.(false);
  };

  return (
    <div
      className={`${gradient} rounded-3xl p-8 relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 group ${
        isLarge ? 'lg:col-span-2' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Animated background elements */}
      {isHovered && (
        <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {icon && (
          <div className="mb-4 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            {icon}
          </div>
        )}
        
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 drop-shadow-lg group-hover:text-white/90 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-white/95 text-base mb-6 drop-shadow-md group-hover:text-white/80 transition-colors duration-300">
          {description}
        </p>
        
        {children}
        
        {/* Interactive elements */}
        <div className="flex items-center justify-between mt-6">
          <div className="border-white/50 text-white group-hover:bg-white/25 bg-white/10 group-hover:border-white/70 transition-all duration-300 drop-shadow-md backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium group-hover:animate-pulse">
            Подробнее →
          </div>
          
          {isHovered && (
            <div className="flex items-center space-x-2 text-white/80 animate-fade-in-scale">
              <Sparkles className="h-4 w-4 animate-spin" />
              <span className="text-sm">Интерактивно</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FigmaDemoCard;







