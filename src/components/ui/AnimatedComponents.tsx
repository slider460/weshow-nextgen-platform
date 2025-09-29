import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';
import { 
  cardHover, 
  buttonPress, 
  buttonRipple, 
  hoverScale,
  formFieldFocus,
  springConfigs 
} from '../../lib/animations';

// === АНИМИРОВАННАЯ КНОПКА С РИПЛ-ЭФФЕКТОМ ===

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  ripple?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  ripple = true,
  children,
  className,
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700',
    ghost: 'text-blue-600 hover:bg-blue-50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const newRipple = {
        id: Date.now(),
        x,
        y,
        size
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Удаляем рипл через 600ms
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 600);
    }
    
    onClick?.(e);
  };

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        'relative font-medium rounded-xl overflow-hidden transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      variants={buttonPress}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      disabled={loading}
      {...props}
    >
      <span className={cn('relative z-10 flex items-center justify-center', loading && 'opacity-0')}>
        {children}
      </span>
      
      {/* Лоадер */}
      {loading && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: 'linear', repeat: Infinity }}
          />
        </motion.div>
      )}
      
      {/* Рипл-эффекты */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size
            }}
            variants={buttonRipple}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
};

// === АНИМИРОВАННАЯ КАРТОЧКА ===

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  index?: number;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className,
  hover = true,
  onClick,
  index = 0
}) => {
  return (
    <motion.div
      className={cn(
        'bg-white rounded-xl border border-gray-200 cursor-pointer transition-all duration-200',
        onClick && 'cursor-pointer',
        className
      )}
      variants={hover ? cardHover : undefined}
      initial="initial"
      whileHover={hover ? "hover" : undefined}
      whileTap={hover ? "tap" : undefined}
      custom={index}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

// === АНИМИРОВАННОЕ ПОЛЕ ВВОДА ===

interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    props.onChange?.(e);
  };

  return (
    <div className={cn('relative', className)}>
      <motion.div
        className="relative"
        variants={formFieldFocus}
        animate={isFocused ? 'focus' : 'blur'}
      >
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            {icon}
          </div>
        )}
        
        <input
          className={cn(
            'w-full px-4 py-3 rounded-xl border border-gray-200 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
            'placeholder-transparent peer',
            icon && 'pl-10',
            error && 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          {...props}
        />
        
        {label && (
          <motion.label
            className={cn(
              'absolute left-3 transition-all duration-200 pointer-events-none',
              'peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base',
              'peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-600',
              (isFocused || hasValue) && 'top-2 text-xs text-blue-600',
              icon && 'peer-placeholder-shown:left-10 peer-focus:left-3'
            )}
            animate={{
              y: isFocused || hasValue ? -8 : 0,
              scale: isFocused || hasValue ? 0.875 : 1,
              color: isFocused ? '#2563eb' : '#6b7280'
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {label}
          </motion.label>
        )}
      </motion.div>
      
      {error && (
        <motion.p
          className="mt-2 text-sm text-red-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

// === АНИМИРОВАННЫЙ ПЕРЕКЛЮЧАТЕЛЬ ===

interface AnimatedToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AnimatedToggle: React.FC<AnimatedToggleProps> = ({
  checked,
  onChange,
  label,
  description,
  size = 'md',
  className
}) => {
  const sizes = {
    sm: { track: 'w-8 h-5', thumb: 'w-4 h-4', translate: 'translate-x-3' },
    md: { track: 'w-12 h-6', thumb: 'w-5 h-5', translate: 'translate-x-6' },
    lg: { track: 'w-16 h-8', thumb: 'w-7 h-7', translate: 'translate-x-8' }
  };

  return (
    <div className={cn('flex items-center space-x-3', className)}>
      <motion.button
        className={cn(
          'relative rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
          sizes[size].track,
          checked ? 'bg-blue-600' : 'bg-gray-300'
        )}
        onClick={() => onChange(!checked)}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className={cn(
            'absolute top-0.5 left-0.5 bg-white rounded-full shadow-md',
            sizes[size].thumb
          )}
          animate={{
            x: checked ? sizes[size].translate.replace('translate-x-', '') : '0px'
          }}
          transition={springConfigs.gentle}
        />
      </motion.button>
      
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <div className="font-medium text-gray-900">{label}</div>
          )}
          {description && (
            <div className="text-sm text-gray-500">{description}</div>
          )}
        </div>
      )}
    </div>
  );
};

// === АНИМИРОВАННЫЙ BADGE ===

interface AnimatedBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
  className?: string;
}

export const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  pulse = false,
  className
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <motion.span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        ...(pulse && {
          boxShadow: [
            '0 0 0 0 rgba(59, 130, 246, 0.4)',
            '0 0 0 10px rgba(59, 130, 246, 0)',
            '0 0 0 0 rgba(59, 130, 246, 0)'
          ]
        })
      }}
      transition={{
        scale: { duration: 0.3, ease: 'easeOut' },
        opacity: { duration: 0.3 },
        ...(pulse && {
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }
        })
      }}
    >
      {children}
    </motion.span>
  );
};

// === АНИМИРОВАННЫЙ PROGRESS BAR ===

interface AnimatedProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'purple' | 'red';
  showLabel?: boolean;
  className?: string;
}

export const AnimatedProgress: React.FC<AnimatedProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'blue',
  showLabel = false,
  className
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    red: 'bg-red-600'
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Прогресс</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      
      <div className={cn(
        'w-full bg-gray-200 rounded-full overflow-hidden',
        sizes[size]
      )}>
        <motion.div
          className={cn(
            'h-full rounded-full',
            colors[color]
          )}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

// === АНИМИРОВАННЫЙ TOOLTIP ===

interface AnimatedTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  content,
  children,
  position = 'top',
  className
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div 
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={cn(
              'absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap',
              positions[position]
            )}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// === АНИМИРОВАННЫЙ FLOATING ACTION BUTTON ===

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'md' | 'lg';
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onClick,
  position = 'bottom-right',
  size = 'lg',
  className
}) => {
  const positions = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-6 right-6',
    'top-left': 'fixed top-6 left-6'
  };

  const sizes = {
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <motion.button
      className={cn(
        'z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg',
        'flex items-center justify-center transition-all duration-200',
        positions[position],
        sizes[size],
        className
      )}
      onClick={onClick}
      variants={{
        initial: { scale: 0, rotate: -180 },
        animate: { scale: 1, rotate: 0 },
        hover: { 
          scale: 1.1, 
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)' 
        },
        tap: { scale: 0.9 }
      }}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      transition={springConfigs.gentle}
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>
    </motion.button>
  );
};

export default {
  AnimatedButton,
  AnimatedCard,
  AnimatedInput,
  AnimatedToggle,
  AnimatedBadge,
  AnimatedProgress,
  AnimatedTooltip,
  FloatingActionButton
};