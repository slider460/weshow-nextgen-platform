import { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

// Компонент с эффектом ряби при клике
export const RippleButton = ({ children, onClick, className = '', ...props }) => {
  const [ripples, setRipples] = useState([]);
  const buttonRef = useRef(null);

  const createRipple = (event) => {
    const button = buttonRef.current;
    if (!button) return;

    // Батчим чтение rect для избежания forced reflow
    requestAnimationFrame(() => {
      if (!button) return;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

        const newRipple = {
        id: Date.now(),
        x,
        y,
        size
      };

      setRipples(prev => [...prev, newRipple]);

      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    });

    if (onClick) onClick(event);
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onClick={createRipple}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animationDuration: '600ms'
          }}
        />
      ))}
    </motion.button>
  );
};

// Анимированный счетчик
export const AnimatedCounter = ({ target, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * target));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="font-bold">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// Интерактивная карточка с 3D эффектом
export const Interactive3DCard = ({ children, className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef(null);

  // Кешируем rect для оптимизации
  const cardRectCache = useRef(null);
  
  useEffect(() => {
    const updateCache = () => {
      if (cardRef.current) {
        cardRectCache.current = cardRef.current.getBoundingClientRect();
      }
    };
    updateCache();
    window.addEventListener('resize', updateCache);
    return () => window.removeEventListener('resize', updateCache);
  }, []);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRectCache.current || cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  };

  const transform = isHovering
    ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * 10}deg) rotateY(${(mousePosition.x - 0.5) * -10}deg) translateZ(20px)`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0.5, y: 0.5 });
      }}
    >
      {children}
    </div>
  );
};

// Анимированный прогресс-бар
export const AnimatedProgressBar = ({ progress, className = '', showPercentage = true }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, progress]);

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        {showPercentage && (
          <span className="text-sm font-medium text-gray-700">
            {Math.round(animatedProgress)}%
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${animatedProgress}%` }}
        />
      </div>
    </div>
  );
};

// Плавающие элементы
export const FloatingElements = () => {
  const elements = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
          initial={{
            x: Math.random() * 100 + '%',
            y: '100%',
          }}
          animate={{
            y: ['-10%', '-110%'],
            x: [
              Math.random() * 100 + '%',
              Math.random() * 100 + '%',
            ],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// Интерактивная кнопка с градиентом
export const GradientButton = ({ children, onClick, className = '', disabled = false }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      className={`
        relative px-6 py-3 font-semibold text-white rounded-lg overflow-hidden
        bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600
        hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      <span className={`relative z-10 ${isPressed ? 'transform scale-95' : ''} transition-transform`}>
        {children}
      </span>
      
      {/* Анимированный фон */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600
        opacity-0 hover:opacity-100 transition-opacity duration-300
      `} />
      
      {/* Блик */}
      <div className={`
        absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
        transform -skew-x-12 -translate-x-full
        hover:translate-x-full transition-transform duration-1000
      `} />
    </motion.button>
  );
};