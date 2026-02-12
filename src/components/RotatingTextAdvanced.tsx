import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTextAdvancedProps {
  texts: string[];
  duration?: number;
  className?: string;
  textClassName?: string;
  delay?: number;
  variant?: 'fade' | 'slide' | 'rotate' | 'flip' | 'scale' | 'typewriter';
  direction?: 'up' | 'down' | 'left' | 'right';
  gradient?: boolean;
  glow?: boolean;
}

const RotatingTextAdvanced: React.FC<RotatingTextAdvancedProps> = ({
  texts,
  duration = 3000,
  className = '',
  textClassName = '',
  delay = 0,
  variant = 'rotate',
  direction = 'up',
  gradient = true,
  glow = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, duration);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [texts.length, duration, delay]);

  // Анимации для разных вариантов
  const getAnimations = () => {
    const baseTransition = { 
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94]
    };

    switch (variant) {
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: isVisible ? 1 : 0 },
          exit: { opacity: 0 },
          transition: { 
            duration: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        };
      
      case 'slide':
        const slideDirection = direction === 'up' ? { y: 30 } : 
                              direction === 'down' ? { y: -30 } :
                              direction === 'left' ? { x: 30 } : { x: -30 };
        return {
          initial: { ...slideDirection, opacity: 0 },
          animate: { x: 0, y: 0, opacity: isVisible ? 1 : 0 },
          exit: { ...slideDirection, opacity: 0 },
          transition: { 
            duration: 1.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        };
      
      case 'rotate':
        return {
          initial: { 
            opacity: 0, 
            y: 20,
            rotateX: 90,
            transformOrigin: 'bottom'
          },
          animate: { 
            opacity: isVisible ? 1 : 0, 
            y: 0,
            rotateX: 0,
            transformOrigin: 'bottom'
          },
          exit: { 
            opacity: 0, 
            y: -20,
            rotateX: -90,
            transformOrigin: 'top'
          },
          transition: baseTransition
        };
      
      case 'flip':
        return {
          initial: { 
            opacity: 0,
            rotateY: 90,
            transformOrigin: 'center'
          },
          animate: { 
            opacity: isVisible ? 1 : 0,
            rotateY: 0,
            transformOrigin: 'center'
          },
          exit: { 
            opacity: 0,
            rotateY: -90,
            transformOrigin: 'center'
          },
          transition: baseTransition
        };
      
      case 'scale':
        return {
          initial: { 
            opacity: 0,
            scale: 0.5,
            transformOrigin: 'center'
          },
          animate: { 
            opacity: isVisible ? 1 : 0,
            scale: 1,
            transformOrigin: 'center'
          },
          exit: { 
            opacity: 0,
            scale: 1.5,
            transformOrigin: 'center'
          },
          transition: baseTransition
        };
      
      case 'typewriter':
        return {
          initial: { 
            opacity: 0,
            width: 0,
            overflow: 'hidden'
          },
          animate: { 
            opacity: isVisible ? 1 : 0,
            width: 'auto'
          },
          exit: { 
            opacity: 0,
            width: 0,
            overflow: 'hidden'
          },
          transition: baseTransition
        };
      
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: isVisible ? 1 : 0, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: baseTransition
        };
    }
  };

  const animations = getAnimations();

  return (
    <div className={`relative inline-block max-w-full ${className}`} style={{wordBreak: 'break-word', hyphens: 'auto'}}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={animations.initial}
          animate={animations.animate}
          exit={animations.exit}
          transition={animations.transition}
          className={`inline-block break-words hyphens-auto ${textClassName} ${
            gradient ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent' : ''
          } ${
            glow ? 'drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]' : ''
          } relative z-10`}
          style={{wordBreak: 'break-word', hyphens: 'auto'}}
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default RotatingTextAdvanced;
