import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTextProps {
  texts: string[];
  duration?: number;
  className?: string;
  textClassName?: string;
  delay?: number;
}

const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  duration = 3000,
  className = '',
  textClassName = '',
  delay = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Задержка перед началом анимации
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    // Интервал для смены текста
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, duration);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [texts.length, duration, delay]);

  return (
    <div className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ 
            opacity: 0, 
            y: 20,
            rotateX: 90,
            transformOrigin: 'bottom'
          }}
          animate={{ 
            opacity: isVisible ? 1 : 0, 
            y: 0,
            rotateX: 0,
            transformOrigin: 'bottom'
          }}
          exit={{ 
            opacity: 0, 
            y: -20,
            rotateX: -90,
            transformOrigin: 'top'
          }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className={`inline-block ${textClassName}`}
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default RotatingText;




