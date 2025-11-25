import React, { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { useResponsive } from '../hooks/useResponsive';

// Touch-friendly размеры согласно iOS/Android HIG
const TOUCH_TARGET_SIZE = {
  small: 'min-h-[44px] min-w-[44px]',    // iOS минимум
  medium: 'min-h-[48px] min-w-[48px]',   // Android минимум  
  large: 'min-h-[56px] min-w-[56px]'     // Комфортный размер
};

// Touch-friendly кнопка
interface TouchButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  motionProps?: HTMLMotionProps<'button'>;
}

export const TouchButton = forwardRef<HTMLButtonElement, TouchButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  disabled,
  className,
  motionProps,
  ...props
}, ref) => {
  const { isMobile } = useResponsive();
  
  // Адаптивные размеры
  const sizeClasses = {
    sm: cn(
      isMobile ? TOUCH_TARGET_SIZE.small : 'h-8 px-3',
      'text-sm'
    ),
    md: cn(
      isMobile ? TOUCH_TARGET_SIZE.medium : 'h-10 px-4',
      'text-base'
    ),
    lg: cn(
      isMobile ? TOUCH_TARGET_SIZE.large : 'h-12 px-6',
      'text-lg'
    ),
    xl: cn(
      isMobile ? 'min-h-[64px] min-w-[64px] px-8' : 'h-14 px-8',
      'text-xl'
    )
  };

  // Стили вариантов
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-md hover:shadow-lg disabled:bg-gray-400',
    secondary: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-900 disabled:bg-gray-50 disabled:text-gray-400',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:border-gray-300 disabled:text-gray-400',
    ghost: 'text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-400',
    danger: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white shadow-md hover:shadow-lg disabled:bg-gray-400'
  };

  const baseClasses = cn(
    // Базовые стили
    'relative inline-flex items-center justify-center',
    'font-medium rounded-xl transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:shadow-none',
    
    // Touch оптимизации
    'touch-manipulation select-none',
    isMobile && 'active:scale-[0.98]', // Легкий scale эффект на мобильном
    
    // Размеры
    sizeClasses[size],
    fullWidth && 'w-full',
    
    // Вариант
    variantClasses[variant],
    
    className
  );

  const content = (
    <>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      <div className={cn(
        'flex items-center gap-2',
        loading && 'invisible'
      )}>
        {Icon && iconPosition === 'left' && (
          <Icon className={cn(
            size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : size === 'xl' ? 'w-7 h-7' : 'w-5 h-5'
          )} />
        )}
        
        {children}
        
        {Icon && iconPosition === 'right' && (
          <Icon className={cn(
            size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : size === 'xl' ? 'w-7 h-7' : 'w-5 h-5'
          )} />
        )}
      </div>
    </>
  );

  if (motionProps) {
    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        whileTap={isMobile ? { scale: 0.98 } : undefined}
        {...motionProps}
        {...props}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <button
      ref={ref}
      className={baseClasses}
      disabled={disabled || loading}
      {...props}
    >
      {content}
    </button>
  );
});

TouchButton.displayName = 'TouchButton';

// Touch-friendly input
interface TouchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'className'> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TouchInput = forwardRef<HTMLInputElement, TouchInputProps>(({
  label,
  error,
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
  className,
  ...props
}, ref) => {
  const { isMobile } = useResponsive();
  
  const sizeClasses = {
    sm: cn(
      isMobile ? 'h-12 px-4 text-base' : 'h-9 px-3 text-sm'
    ),
    md: cn(
      isMobile ? 'h-14 px-4 text-lg' : 'h-10 px-3 text-base'
    ),
    lg: cn(
      isMobile ? 'h-16 px-5 text-xl' : 'h-11 px-4 text-lg'
    )
  };

  const inputClasses = cn(
    // Базовые стили
    'w-full border border-gray-300 rounded-xl',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
    
    // Touch оптимизации
    'touch-manipulation',
    
    // Размеры
    sizeClasses[size],
    
    // Иконки
    Icon && iconPosition === 'left' && 'pl-12',
    Icon && iconPosition === 'right' && 'pr-12',
    
    // Ошибки
    error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    
    className
  );

  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <div className="space-y-2">
      {label && (
        <label className={cn(
          'block font-medium text-gray-700',
          isMobile ? 'text-lg' : 'text-sm'
        )}>
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        
        {Icon && (
          <div className={cn(
            'absolute top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none',
            iconPosition === 'left' ? 'left-4' : 'right-4'
          )}>
            <Icon className={iconSize} />
          </div>
        )}
      </div>
      
      {error && (
        <p className={cn(
          'text-red-500',
          isMobile ? 'text-base' : 'text-sm'
        )}>
          {error}
        </p>
      )}
    </div>
  );
});

TouchInput.displayName = 'TouchInput';

// Touch-friendly card
interface TouchCardProps {
  children: ReactNode;
  className?: string;
  clickable?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const TouchCard: React.FC<TouchCardProps> = ({
  children,
  className,
  clickable = false,
  onClick,
  padding = 'md'
}) => {
  const { isMobile } = useResponsive();
  
  const paddingClasses = {
    none: '',
    sm: isMobile ? 'p-4' : 'p-3',
    md: isMobile ? 'p-6' : 'p-4',
    lg: isMobile ? 'p-8' : 'p-6'
  };

  const baseClasses = cn(
    'bg-white rounded-2xl border border-gray-200 shadow-sm',
    paddingClasses[padding],
    
    // Clickable стили
    clickable && [
      'cursor-pointer transition-all duration-200',
      'hover:shadow-md active:shadow-lg',
      isMobile && 'active:scale-[0.99]'
    ],
    
    className
  );

  if (clickable && onClick) {
    return (
      <motion.div
        className={baseClasses}
        onClick={onClick}
        whileTap={isMobile ? { scale: 0.99 } : undefined}
        transition={{ duration: 0.1 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
};

// Touch-friendly checkbox
interface TouchCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TouchCheckbox: React.FC<TouchCheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  size = 'md',
  className
}) => {
  const { isMobile } = useResponsive();
  
  const sizeClasses = {
    sm: {
      container: isMobile ? 'min-h-[44px] py-2' : 'py-1',
      checkbox: isMobile ? 'w-6 h-6' : 'w-4 h-4',
      text: isMobile ? 'text-base' : 'text-sm'
    },
    md: {
      container: isMobile ? 'min-h-[48px] py-3' : 'py-2',
      checkbox: isMobile ? 'w-7 h-7' : 'w-5 h-5',
      text: isMobile ? 'text-lg' : 'text-base'
    },
    lg: {
      container: isMobile ? 'min-h-[56px] py-4' : 'py-3',
      checkbox: isMobile ? 'w-8 h-8' : 'w-6 h-6',
      text: isMobile ? 'text-xl' : 'text-lg'
    }
  };

  const styles = sizeClasses[size];

  return (
    <label
      className={cn(
        'flex items-center space-x-3 cursor-pointer touch-manipulation',
        styles.container,
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        
        <div
          className={cn(
            'border-2 rounded transition-all duration-200',
            styles.checkbox,
            checked 
              ? 'bg-blue-600 border-blue-600' 
              : 'bg-white border-gray-300 hover:border-gray-400',
            disabled && 'bg-gray-100 border-gray-200'
          )}
        >
          {checked && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.1 }}
              className="w-full h-full text-white p-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </motion.svg>
          )}
        </div>
      </div>
      
      <span className={cn(
        'font-medium text-gray-700 select-none',
        styles.text,
        disabled && 'text-gray-400'
      )}>
        {label}
      </span>
    </label>
  );
};

// Touch-friendly slider
interface TouchSliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  formatValue?: (value: number) => string;
  className?: string;
}

export const TouchSlider: React.FC<TouchSliderProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  formatValue,
  className
}) => {
  const { isMobile } = useResponsive();
  
  const percentage = ((value[0] - min) / (max - min)) * 100;
  
  return (
    <div className={cn('space-y-4', className)}>
      {label && (
        <div className="flex justify-between items-center">
          <span className={cn(
            'font-medium text-gray-700',
            isMobile ? 'text-lg' : 'text-sm'
          )}>
            {label}
          </span>
          <span className={cn(
            'text-gray-600',
            isMobile ? 'text-base' : 'text-sm'
          )}>
            {formatValue ? formatValue(value[0]) : value[0]}
          </span>
        </div>
      )}
      
      <div className="relative">
        {/* Трек */}
        <div className={cn(
          'w-full bg-gray-200 rounded-full',
          isMobile ? 'h-3' : 'h-2'
        )}>
          <div
            className={cn(
              'bg-blue-600 rounded-full transition-all duration-200',
              isMobile ? 'h-3' : 'h-2'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Ползунок */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => onValueChange([parseInt(e.target.value)])}
          className={cn(
            'absolute inset-0 w-full opacity-0 cursor-pointer',
            isMobile ? 'h-12' : 'h-6', // Увеличенная область касания
            'touch-manipulation'
          )}
        />
        
        {/* Визуальный ползунок */}
        <div
          className={cn(
            'absolute top-1/2 transform -translate-y-1/2 bg-white border-2 border-blue-600 rounded-full shadow-md',
            isMobile ? 'w-6 h-6' : 'w-5 h-5',
            'pointer-events-none'
          )}
          style={{ left: `calc(${percentage}% - ${isMobile ? '12px' : '10px'})` }}
        />
      </div>
    </div>
  );
};

// Touch-friendly toggle
interface TouchToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const TouchToggle: React.FC<TouchToggleProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className
}) => {
  const { isMobile } = useResponsive();
  
  const sizeClasses = {
    sm: {
      container: isMobile ? 'min-h-[44px]' : '',
      switch: isMobile ? 'w-12 h-7' : 'w-10 h-6',
      thumb: isMobile ? 'w-5 h-5' : 'w-4 h-4',
      text: isMobile ? 'text-base' : 'text-sm'
    },
    md: {
      container: isMobile ? 'min-h-[48px]' : '',
      switch: isMobile ? 'w-14 h-8' : 'w-12 h-7',
      thumb: isMobile ? 'w-6 h-6' : 'w-5 h-5',
      text: isMobile ? 'text-lg' : 'text-base'
    },
    lg: {
      container: isMobile ? 'min-h-[56px]' : '',
      switch: isMobile ? 'w-16 h-9' : 'w-14 h-8',
      thumb: isMobile ? 'w-7 h-7' : 'w-6 h-6',
      text: isMobile ? 'text-xl' : 'text-lg'
    }
  };

  const styles = sizeClasses[size];

  return (
    <label
      className={cn(
        'flex items-center justify-between cursor-pointer touch-manipulation',
        styles.container,
        disabled && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      {label && (
        <span className={cn(
          'font-medium text-gray-700 select-none',
          styles.text,
          disabled && 'text-gray-400'
        )}>
          {label}
        </span>
      )}
      
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        
        <div
          className={cn(
            'relative rounded-full transition-all duration-200',
            styles.switch,
            checked 
              ? 'bg-blue-600' 
              : 'bg-gray-300',
            disabled && 'bg-gray-200'
          )}
        >
          <motion.div
            className={cn(
              'absolute top-1 bg-white rounded-full shadow-sm',
              styles.thumb
            )}
            animate={{ 
              x: checked 
                ? `calc(100% + ${isMobile ? '4px' : '2px'})` 
                : '4px' 
            }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </label>
  );
};

// Экспорт всех компонентов
export {
  TOUCH_TARGET_SIZE
};