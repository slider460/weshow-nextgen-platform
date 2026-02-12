import React, { useState, useEffect, ReactNode } from 'react';

// Хук для работы с размерами экрана
export const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });

      // Определяем тип устройства
      if (width < 640) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize(); // Установить начальные значения
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return {
    screenSize,
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice,
    isSmallScreen: screenSize.width < 768,
    isLargeScreen: screenSize.width >= 1280,
  };
};

// Компонент для адаптивного контента
interface ResponsiveContentProps {
  mobile?: ReactNode;
  tablet?: ReactNode;
  desktop?: ReactNode;
  children?: ReactNode;
}

export const ResponsiveContent: React.FC<ResponsiveContentProps> = ({ mobile, tablet, desktop, children }) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  if (isMobile && mobile) return mobile;
  if (isTablet && tablet) return tablet;
  if (isDesktop && desktop) return desktop;
  
  return children;
};

// Хук для детекции ориентации устройства
export const useOrientation = () => {
  const [orientation, setOrientation] = useState('portrait');

  useEffect(() => {
    const handleOrientationChange = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      setOrientation(isLandscape ? 'landscape' : 'portrait');
    };

    handleOrientationChange();
    window.addEventListener('resize', handleOrientationChange);
    return () => window.removeEventListener('resize', handleOrientationChange);
  }, []);

  return {
    orientation,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
  };
};

// Хук для детекции прокрутки
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrollPosition(currentScrollY);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setIsScrolling(true);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return {
    scrollPosition,
    scrollDirection,
    isScrolling,
    isAtTop: scrollPosition < 10,
    scrollPercentage: Math.min((scrollPosition / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100),
  };
};

// Компонент для адаптивной сетки
interface ResponsiveGridProps {
  children: ReactNode;
  cols?: { mobile: number; tablet: number; desktop: number };
  gap?: string;
  className?: string;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'gap-6',
  className = '' 
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getCols = () => {
    if (isMobile) return `grid-cols-${cols.mobile}`;
    if (isTablet) return `grid-cols-${cols.tablet}`;
    return `grid-cols-${cols.desktop}`;
  };

  return (
    <div className={`grid ${getCols()} ${gap} ${className}`}>
      {children}
    </div>
  );
};

export default useResponsive;