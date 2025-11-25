import React, { useEffect, useRef, ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  speed?: number;
  colors?: string[];
  className?: string;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
}

const GradientText: React.FC<GradientTextProps> = ({
  children,
  speed = 1,
  colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'],
  className = '',
  direction = 'horizontal'
}) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Создаем градиент с плавными переходами
    const createGradient = () => {
      const colorStops = colors.map((color, index) => {
        const position = (index / (colors.length - 1)) * 100;
        return `${color} ${position}%`;
      }).join(', ');

      return `linear-gradient(90deg, ${colorStops})`;
    };

    // Настраиваем градиент в зависимости от направления
    const getGradientDirection = () => {
      switch (direction) {
        case 'vertical':
          return 'linear-gradient(180deg, ';
        case 'diagonal':
          return 'linear-gradient(45deg, ';
        default:
          return 'linear-gradient(90deg, ';
      }
    };

    const gradientColors = colors.map((color, index) => {
      const position = (index / (colors.length - 1)) * 100;
      return `${color} ${position}%`;
    }).join(', ');

    const fullGradient = `${getGradientDirection()}${gradientColors})`;

    // Применяем градиент к тексту
    element.style.background = fullGradient;
    element.style.backgroundSize = '300% 300%';
    element.style.webkitBackgroundClip = 'text';
    element.style.backgroundClip = 'text';
    element.style.webkitTextFillColor = 'transparent';
    element.style.color = 'transparent';
    element.style.backgroundRepeat = 'no-repeat';

    // Создаем плавную анимацию градиента
    let animationId: number;
    let startTime: number;
    const duration = (4000 / speed); // 4 секунды деленные на скорость

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      
      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;
      
      // Создаем волновой эффект
      const wave = Math.sin(progress * Math.PI * 2) * 0.5 + 0.5;
      
      if (direction === 'horizontal') {
        element.style.backgroundPosition = `${(progress * 200) - 100}% 0%`;
      } else if (direction === 'vertical') {
        element.style.backgroundPosition = `0% ${(progress * 200) - 100}%`;
      } else {
        element.style.backgroundPosition = `${(progress * 200) - 100}% ${(progress * 200) - 100}%`;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [speed, colors, direction]);

  return (
    <div
      ref={textRef}
      className={`inline-block ${className}`}
      style={{
        animation: 'none', // Отключаем CSS анимации для избежания конфликтов
      }}
    >
      {children}
    </div>
  );
};

export default GradientText;
