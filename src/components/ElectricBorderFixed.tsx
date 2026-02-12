import { useState, useEffect } from "react";

interface ElectricBorderProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  color?: "blue" | "purple" | "cyan" | "green";
  animated?: boolean;
}

export const ElectricBorderFixed = ({ 
  children, 
  className = "", 
  intensity = "medium",
  color = "blue",
  animated = true 
}: ElectricBorderProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Цветовые схемы
  const colorSchemes = {
    blue: {
      primary: "rgba(59, 130, 246, 0.8)",
      secondary: "rgba(59, 130, 246, 0.6)",
      light: "rgba(59, 130, 246, 0.3)",
      glow: "0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.6)",
      borderColor: "rgba(59, 130, 246, 0.8)"
    },
    purple: {
      primary: "rgba(147, 51, 234, 0.8)",
      secondary: "rgba(147, 51, 234, 0.6)",
      light: "rgba(147, 51, 234, 0.3)",
      glow: "0 0 10px rgba(147, 51, 234, 0.8), 0 0 20px rgba(147, 51, 234, 0.6)",
      borderColor: "rgba(147, 51, 234, 0.8)"
    },
    cyan: {
      primary: "rgba(6, 182, 212, 0.8)",
      secondary: "rgba(6, 182, 212, 0.6)",
      light: "rgba(6, 182, 212, 0.3)",
      glow: "0 0 10px rgba(6, 182, 212, 0.8), 0 0 20px rgba(6, 182, 212, 0.6)",
      borderColor: "rgba(6, 182, 212, 0.8)"
    },
    green: {
      primary: "rgba(34, 197, 94, 0.8)",
      secondary: "rgba(34, 197, 94, 0.6)",
      light: "rgba(34, 197, 94, 0.3)",
      glow: "0 0 10px rgba(34, 197, 94, 0.8), 0 0 20px rgba(34, 197, 94, 0.6)",
      borderColor: "rgba(34, 197, 94, 0.8)"
    }
  };

  const currentColors = colorSchemes[color];

  // Интенсивность эффектов
  const intensitySettings = {
    low: { radius: 400, opacity: 0.2 },
    medium: { radius: 600, opacity: 0.3 },
    high: { radius: 800, opacity: 0.4 }
  };

  const settings = intensitySettings[intensity];

  // Кешируем rect для избежания forced reflow
  const rectCacheRef = useRef<DOMRect | null>(null);
  
  useEffect(() => {
    const updateCache = () => {
      const element = document.querySelector('.electric-border-container');
      if (element) {
        rectCacheRef.current = element.getBoundingClientRect();
      }
    };
    updateCache();
    window.addEventListener('resize', updateCache);
    return () => window.removeEventListener('resize', updateCache);
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = rectCacheRef.current || e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className={`relative group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Электрическая граница */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        {/* Анимированный градиент */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(${settings.radius}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${currentColors.light}, transparent 40%)`,
          }}
        />
        
        {/* Электрические линии */}
        <div className="absolute inset-0 rounded-xl">
          {/* Верхняя линия */}
          <div 
            className="absolute top-0 left-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              width: '100%',
              background: `linear-gradient(to right, transparent, ${currentColors.borderColor}, transparent)`,
              boxShadow: currentColors.glow,
              animation: animated && isHovered ? 'pulse 2s ease-in-out infinite' : 'none'
            }}
          />
          
          {/* Правая линия */}
          <div 
            className="absolute top-0 right-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              height: '100%',
              background: `linear-gradient(to bottom, transparent, ${currentColors.borderColor}, transparent)`,
              boxShadow: currentColors.glow,
              animation: animated && isHovered ? 'pulse 2s ease-in-out infinite 0.5s' : 'none'
            }}
          />
          
          {/* Нижняя линия */}
          <div 
            className="absolute bottom-0 left-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              width: '100%',
              background: `linear-gradient(to right, transparent, ${currentColors.borderColor}, transparent)`,
              boxShadow: currentColors.glow,
              animation: animated && isHovered ? 'pulse 2s ease-in-out infinite 1s' : 'none'
            }}
          />
          
          {/* Левая линия */}
          <div 
            className="absolute top-0 left-0 w-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              height: '100%',
              background: `linear-gradient(to bottom, transparent, ${currentColors.borderColor}, transparent)`,
              boxShadow: currentColors.glow,
              animation: animated && isHovered ? 'pulse 2s ease-in-out infinite 1.5s' : 'none'
            }}
          />
        </div>
      </div>
      
      {/* Контент */}
      <div className="relative z-10">
        {children}
      </div>

      {/* CSS анимации */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes pulse {
            0%, 100% {
              opacity: 0.6;
              transform: scaleX(1);
            }
            50% {
              opacity: 1;
              transform: scaleX(1.02);
            }
          }
        `
      }} />
    </div>
  );
};

export default ElectricBorderFixed;



