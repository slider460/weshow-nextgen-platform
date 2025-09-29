import { Variants } from 'framer-motion';

/**
 * Коллекция современных анимаций для WeShow Platform
 * Включает анимации входа, выхода, переходов и взаимодействий
 */

// === ОСНОВНЫЕ АНИМАЦИИ ВХОДА ===

export const fadeIn: Variants = {
  initial: { 
    opacity: 0,
    y: 20
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] // cubic-bezier для плавности
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const slideInFromRight: Variants = {
  initial: { 
    opacity: 0,
    x: 100,
    scale: 0.95
  },
  animate: { 
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: {
    opacity: 0,
    x: -50,
    scale: 0.98,
    transition: {
      duration: 0.3
    }
  }
};

export const slideInFromLeft: Variants = {
  initial: { 
    opacity: 0,
    x: -100,
    scale: 0.95
  },
  animate: { 
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: {
    opacity: 0,
    x: 50,
    scale: 0.98,
    transition: {
      duration: 0.3
    }
  }
};

export const scaleIn: Variants = {
  initial: { 
    opacity: 0,
    scale: 0.8,
    y: 20
  },
  animate: { 
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 10,
    transition: {
      duration: 0.3
    }
  }
};

// === АНИМАЦИИ ДЛЯ КАРТОЧЕК ===

export const cardHover: Variants = {
  initial: {
    scale: 1,
    y: 0,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
  },
  hover: {
    scale: 1.02,
    y: -5,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: {
      duration: 0.1
    }
  }
};

export const cardSlideIn: Variants = {
  initial: { 
    opacity: 0,
    y: 60,
    scale: 0.9
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
      delay: index * 0.1 // Каскадная анимация
    }
  }),
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  }
};

// === АНИМАЦИИ ДЛЯ КНОПОК ===

export const buttonPress: Variants = {
  initial: {
    scale: 1,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  tap: {
    scale: 0.95,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.1
    }
  }
};

export const buttonRipple = {
  initial: {
    scale: 0,
    opacity: 0.6
  },
  animate: {
    scale: 2,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// === АНИМАЦИИ ДЛЯ МОДАЛЬНЫХ ОКОН ===

export const modalBackdrop: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

export const modalContent: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 100
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 50,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// === АНИМАЦИИ ДЛЯ МОБИЛЬНОЙ НАВИГАЦИИ ===

export const mobileMenuSlide: Variants = {
  initial: {
    x: "-100%",
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
      duration: 0.4
    }
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export const bottomTabAnimation: Variants = {
  initial: {
    y: 100,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      duration: 0.5
    }
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// === СТAGGERED АНИМАЦИИ ===

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

export const staggerChild: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: {
      duration: 0.2
    }
  }
};

// === АНИМАЦИИ ДЛЯ ЗАГРУЗКИ ===

export const loadingSpinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: "linear",
      repeat: Infinity
    }
  }
};

export const loadingPulse: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

export const skeletonShimmer: Variants = {
  animate: {
    x: ["0%", "100%"],
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity
    }
  }
};

// === АНИМАЦИИ ДЛЯ УВЕДОМЛЕНИЙ ===

export const notificationSlide: Variants = {
  initial: {
    opacity: 0,
    x: 300,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    x: 300,
    scale: 0.9,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// === АНИМАЦИИ ДЛЯ ФОРМ ===

export const formFieldFocus: Variants = {
  initial: {
    scale: 1,
    borderColor: "rgba(229, 231, 235, 1)" // gray-200
  },
  focus: {
    scale: 1.02,
    borderColor: "rgba(59, 130, 246, 1)", // blue-500
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  blur: {
    scale: 1,
    borderColor: "rgba(229, 231, 235, 1)",
    boxShadow: "none",
    transition: {
      duration: 0.2
    }
  }
};

export const formSubmitSuccess: Variants = {
  initial: {
    scale: 1
  },
  animate: {
    scale: [1, 1.05, 1],
    backgroundColor: ["rgba(34, 197, 94, 0.1)", "rgba(34, 197, 94, 0.2)", "rgba(34, 197, 94, 0.1)"],
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

// === АНИМАЦИИ ДЛЯ ПЕРЕХОДОВ МЕЖДУ СТРАНИЦАМИ ===

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    x: 20
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

// === МИКРОАНИМАЦИИ ===

export const hoverScale = {
  whileHover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  whileTap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

export const iconBounce: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1
    }
  }
};

// === ФУНКЦИИ-УТИЛИТЫ ===

// Создание каскадной анимации для списков
export const createStaggerAnimation = (
  childDelay: number = 0.1, 
  delayChildren: number = 0.2
): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren: childDelay,
      delayChildren: delayChildren
    }
  },
  exit: {
    transition: {
      staggerChildren: childDelay / 2,
      staggerDirection: -1
    }
  }
});

// Создание анимации появления с задержкой
export const createDelayedAnimation = (
  delay: number = 0,
  duration: number = 0.5
): Variants => ({
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration,
      delay,
      ease: [0.25, 0.1, 0.25, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -15,
    scale: 0.98,
    transition: {
      duration: duration * 0.6
    }
  }
});

// Предустановленные конфигурации spring анимаций
export const springConfigs = {
  gentle: {
    type: "spring" as const,
    damping: 30,
    stiffness: 300
  },
  wobbly: {
    type: "spring" as const,
    damping: 15,
    stiffness: 400
  },
  stiff: {
    type: "spring" as const,
    damping: 40,
    stiffness: 600
  },
  slow: {
    type: "spring" as const,
    damping: 35,
    stiffness: 200
  }
};

// Предустановленные easing функции
export const easings = {
  smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
  snappy: [0.4, 0, 0.2, 1] as [number, number, number, number],
  bouncy: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
  linear: [0, 0, 1, 1] as [number, number, number, number]
};