import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

// === СОВРЕМЕННЫЕ ГРАДИЕНТЫ ===

export const gradients = {
  // WeShow брендинговые градиенты
  primary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600',
  primarySoft: 'bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50',
  primaryDark: 'bg-gradient-to-r from-blue-800 via-purple-800 to-cyan-800',
  
  // Функциональные градиенты
  success: 'bg-gradient-to-r from-green-500 to-emerald-600',
  warning: 'bg-gradient-to-r from-yellow-400 to-orange-500',
  error: 'bg-gradient-to-r from-red-500 to-pink-600',
  info: 'bg-gradient-to-r from-blue-500 to-indigo-600',
  
  // Декоративные градиенты
  sunset: 'bg-gradient-to-r from-orange-400 via-red-500 to-pink-600',
  ocean: 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600',
  forest: 'bg-gradient-to-r from-green-400 via-teal-500 to-blue-500',
  aurora: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
  
  // Нейтральные градиенты
  glass: 'bg-gradient-to-r from-white/80 via-white/90 to-white/80',
  dark: 'bg-gradient-to-r from-gray-800 via-gray-900 to-black',
  light: 'bg-gradient-to-r from-gray-50 via-white to-gray-100',
  
  // Радиальные градиенты
  radialPrimary: 'bg-gradient-radial from-blue-500 via-purple-600 to-cyan-700',
  radialSoft: 'bg-gradient-radial from-blue-100 via-purple-50 to-white',
};

// === GLASS MORPHISM ЭФФЕКТЫ ===

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  blur = 'md',
  opacity = 0.8
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl'
  };

  return (
    <div 
      className={cn(
        'bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl',
        blurClasses[blur],
        className
      )}
      style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}
    >
      {children}
    </div>
  );
};

// === НЕОМОРФИЗМ КОМПОНЕНТЫ ===

interface NeumorphicCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'raised' | 'inset' | 'flat';
  size?: 'sm' | 'md' | 'lg';
}

export const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  children,
  className,
  variant = 'raised',
  size = 'md'
}) => {
  const variants = {
    raised: 'shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]',
    inset: 'shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff]',
    flat: 'shadow-[0px_0px_0px_#d1d9e6,0px_0px_0px_#ffffff]'
  };

  const sizes = {
    sm: 'p-4 rounded-xl',
    md: 'p-6 rounded-2xl',
    lg: 'p-8 rounded-3xl'
  };

  return (
    <div 
      className={cn(
        'bg-gradient-to-br from-gray-100 to-gray-200 transition-all duration-300',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  );
};

// === ГРАДИЕНТНЫЕ ГРАНИЦЫ ===

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  gradient?: keyof typeof gradients;
  borderWidth?: number;
  radius?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  className,
  gradient = 'primary',
  borderWidth = 2,
  radius = 'lg'
}) => {
  const radiusClasses = {
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    full: 'rounded-full'
  };

  return (
    <div 
      className={cn(
        'p-0.5',
        gradients[gradient],
        radiusClasses[radius],
        className
      )}
      style={{ padding: `${borderWidth}px` }}
    >
      <div className={cn(
        'bg-white h-full w-full',
        radiusClasses[radius]
      )}>
        {children}
      </div>
    </div>
  );
};

// === АНИМИРОВАННЫЕ ГРАДИЕНТЫ ===

interface AnimatedGradientProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  duration?: number;
}

export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  children,
  className,
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4'],
  duration = 3
}) => {
  return (
    <motion.div
      className={cn('relative overflow-hidden', className)}
      animate={{
        background: [
          `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`,
          `linear-gradient(45deg, ${colors[1]}, ${colors[2]})`,
          `linear-gradient(45deg, ${colors[2]}, ${colors[0]})`,
          `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`
        ]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  );
};

// === ЭФФЕКТ СВЕЧЕНИЯ ===

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: 'blue' | 'purple' | 'pink' | 'green' | 'yellow';
  intensity?: 'low' | 'medium' | 'high';
  pulse?: boolean;
}

export const GlowEffect: React.FC<GlowEffectProps> = ({
  children,
  className,
  color = 'blue',
  intensity = 'medium',
  pulse = false
}) => {
  const colors = {
    blue: 'shadow-blue-500/50',
    purple: 'shadow-purple-500/50',
    pink: 'shadow-pink-500/50',
    green: 'shadow-green-500/50',
    yellow: 'shadow-yellow-500/50'
  };

  const intensities = {
    low: 'shadow-lg',
    medium: 'shadow-2xl',
    high: 'shadow-[0_0_50px_rgba(0,0,0,0.3)]'
  };

  return (
    <motion.div
      className={cn(
        intensities[intensity],
        colors[color],
        className
      )}
      animate={pulse ? {
        boxShadow: [
          `0 0 20px rgba(59, 130, 246, 0.3)`,
          `0 0 40px rgba(59, 130, 246, 0.6)`,
          `0 0 20px rgba(59, 130, 246, 0.3)`
        ]
      } : {}}
      transition={pulse ? {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      } : {}}
    >
      {children}
    </motion.div>
  );
};

// === СОВРЕМЕННЫЕ ТЕКСТУРЫ ===

export const patterns = {
  dots: {
    backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
    backgroundSize: '20px 20px'
  },
  grid: {
    backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
    backgroundSize: '20px 20px'
  },
  diagonal: {
    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #e5e7eb 10px, #e5e7eb 11px)',
  },
  waves: {
    backgroundImage: 'url(\"data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23e5e7eb\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")',
  }
};

interface PatternBackgroundProps {
  children: React.ReactNode;
  pattern: keyof typeof patterns;
  className?: string;
  opacity?: number;
}

export const PatternBackground: React.FC<PatternBackgroundProps> = ({
  children,
  pattern,
  className,
  opacity = 0.5
}) => {
  return (
    <div 
      className={cn('relative', className)}
      style={{
        ...patterns[pattern],
        opacity
      }}
    >
      {children}
    </div>
  );
};

// === СОВРЕМЕННЫЙ HERO SECTION ===

interface ModernHeroProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
  backgroundType?: 'gradient' | 'glass' | 'pattern';
}

export const ModernHero: React.FC<ModernHeroProps> = ({
  title,
  subtitle,
  children,
  className,
  backgroundType = 'gradient'
}) => {
  const backgrounds = {
    gradient: gradients.primary,
    glass: 'bg-gradient-to-br from-blue-50/90 via-purple-50/90 to-cyan-50/90 backdrop-blur-xl',
    pattern: 'bg-white'
  };

  return (
    <section className={cn(
      'relative min-h-screen flex items-center justify-center overflow-hidden',
      backgrounds[backgroundType],
      className
    )}>
      {/* Анимированный фон */}
      {backgroundType === 'pattern' && (
        <div 
          className=\"absolute inset-0 opacity-5\"
          style={patterns.dots}
        />
      )}
      
      {/* Плавающие элементы */}
      <div className=\"absolute inset-0 pointer-events-none\">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className=\"absolute w-32 h-32 bg-white/10 rounded-full\"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5
            }
          />
        ))}
      </div>
      
      {/* Контент */}
      <div className=\"relative z-10 text-center px-4 max-w-6xl mx-auto\">
        <motion.h1 
          className=\"text-5xl md:text-7xl font-bold text-white mb-6 leading-tight\"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            className=\"text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto\"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {subtitle}
          </motion.p>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

// === FLOATING PARTICLES ===

interface FloatingParticlesProps {
  count?: number;
  colors?: string[];
  className?: string;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 50,
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'],
  className
}) => {
  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        return (
          <motion.div
            key={i}
            className=\"absolute rounded-full opacity-60\"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay
            }}
          />
        );
      })}
    </div>
  );
};

// === СОВРЕМЕННЫЙ GRID LAYOUT ===

interface ModernGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const ModernGrid: React.FC<ModernGridProps> = ({
  children,
  columns = 3,
  gap = 'md',
  className
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  };

  return (
    <div className={cn(
      'grid',
      columnClasses[columns],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
};

export default {
  gradients,
  patterns,
  GlassCard,
  NeumorphicCard,
  GradientBorder,
  AnimatedGradient,
  GlowEffect,
  PatternBackground,
  ModernHero,
  FloatingParticles,
  ModernGrid
};