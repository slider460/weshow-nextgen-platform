import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'gradient' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  ripple?: boolean;
  glow?: boolean;
  hoverEffect?: 'scale' | 'lift' | 'slide' | 'rotate';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className,
  ripple = true,
  glow = false,
  hoverEffect = 'scale',
  icon,
  iconPosition = 'left',
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);

  // Эффект пульсации при нажатии
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      id: rippleId.current++,
      x,
      y,
      size,
    };

    setRipples(prev => [...prev, newRipple]);

    // Удаляем ripple через анимацию
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  // Обработчики событий
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsPressed(true);
    createRipple(e);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };

  // Базовые классы для разных вариантов
  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl';
      case 'outline':
        return 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white';
      case 'ghost':
        return 'bg-transparent hover:bg-slate-100 text-slate-700 hover:text-slate-900';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-md hover:shadow-lg';
    }
  };

  // Классы для размеров
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  // Классы для эффектов при наведении
  const getHoverEffectClasses = () => {
    switch (hoverEffect) {
      case 'scale':
        return 'hover:scale-105 active:scale-95';
      case 'lift':
        return 'hover:-translate-y-1 active:translate-y-0';
      case 'slide':
        return 'hover:translate-x-1 active:translate-x-0';
      case 'rotate':
        return 'hover:rotate-1 active:rotate-0';
      default:
        return 'hover:scale-105 active:scale-95';
    }
  };

  // Классы для свечения
  const getGlowClasses = () => {
    if (!glow) return '';
    return 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000';
  };

  return (
    <Button
      ref={buttonRef}
      className={cn(
        'relative overflow-hidden transition-all duration-300 ease-out transform',
        getVariantClasses(),
        getSizeClasses(),
        getHoverEffectClasses(),
        getGlowClasses(),
        isPressed && 'scale-95',
        isHovered && glow && 'shadow-2xl',
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Ripple эффекты */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}

      {/* Иконка слева */}
      {icon && iconPosition === 'left' && (
        <span className={cn(
          'inline-flex items-center transition-transform duration-300',
          isHovered && 'scale-110',
          size === 'sm' ? 'mr-2' : 'mr-3'
        )}>
          {icon}
        </span>
      )}

      {/* Содержимое кнопки */}
      <span className="relative z-10">{children}</span>

      {/* Иконка справа */}
      {icon && iconPosition === 'right' && (
        <span className={cn(
          'inline-flex items-center transition-transform duration-300',
          isHovered && 'scale-110',
          size === 'sm' ? 'ml-2' : 'ml-3'
        )}>
          {icon}
        </span>
      )}

      {/* Дополнительный эффект свечения при наведении */}
      {glow && (
        <div
          className={cn(
            'absolute inset-0 rounded-md transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          }}
        />
      )}
    </Button>
  );
};

export default AnimatedButton;
