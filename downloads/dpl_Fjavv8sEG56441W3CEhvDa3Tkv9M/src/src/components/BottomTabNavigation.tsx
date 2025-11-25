import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Package,
  ShoppingCart, 
  User,
  Search,
  Phone
} from 'lucide-react';
import { Badge } from './ui/badge';
import { useAdvancedCart } from '../hooks/useAdvancedCart';
import { useAuth } from '../contexts/AuthContext';
import { useResponsive } from '../hooks/useResponsive';
import { cn } from '../lib/utils';

interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: number | string;
  description?: string;
}

interface BottomTabNavigationProps {
  className?: string;
}

export const BottomTabNavigation: React.FC<BottomTabNavigationProps> = ({ 
  className 
}) => {
  const location = useLocation();
  const { cart } = useAdvancedCart();
  const { isAuthenticated } = useAuth();
  const { isMobile } = useResponsive();

  // Не показываем на десктопе
  if (!isMobile) return null;

  const tabs: TabItem[] = [
    {
      id: 'home',
      label: 'Главная',
      icon: Home,
      path: '/',
      description: 'Главная страница'
    },
    {
      id: 'catalog',
      label: 'Каталог',
      icon: Package,
      path: '/equipment',
      description: 'Каталог оборудования'
    },
    {
      id: 'search',
      label: 'Поиск',
      icon: Search,
      path: '/search',
      description: 'Поиск по сайту'
    },
    ...(cart.totalItems > 0 ? [{
      id: 'cart',
      label: 'Корзина',
      icon: ShoppingCart,
      path: '/cart',
      badge: cart.totalItems,
      description: 'Корзина покупок'
    }] : []),
    {
      id: 'profile',
      label: isAuthenticated ? 'Профиль' : 'Войти',
      icon: User,
      path: isAuthenticated ? '/profile' : '/login',
      description: isAuthenticated ? 'Личный кабинет' : 'Вход в систему'
    }
  ];

  const isActiveTab = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40",
        "bg-white/95 backdrop-blur-md border-t border-gray-200",
        "safe-area-pb", // Поддержка safe area для iOS
        className
      )}
    >
      {/* Основная панель навигации */}
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive = isActiveTab(tab.path);
          const IconComponent = tab.icon;

          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={cn(
                "relative flex flex-col items-center justify-center",
                "min-w-[60px] py-2 px-3 rounded-xl",
                "transition-all duration-200 ease-in-out",
                "touch-manipulation", // Оптимизация для тач-экранов
                isActive 
                  ? "text-blue-600 bg-blue-50" 
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100"
              )}
              aria-label={tab.description}
            >
              {/* Активный индикатор */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-50 rounded-xl border border-blue-100"
                  transition={{ type: "spring", duration: 0.3 }}
                />
              )}

              {/* Иконка с бейджем */}
              <div className="relative z-10 mb-1">
                <IconComponent 
                  className={cn(
                    "w-6 h-6 transition-colors duration-200",
                    isActive ? "text-blue-600" : "text-gray-600"
                  )} 
                />
                
                {/* Бейдж для корзины */}
                {tab.badge && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.3 }}
                    className="absolute -top-2 -right-2"
                  >
                    <Badge 
                      className="bg-red-500 text-white text-xs min-w-[18px] h-[18px] p-0 flex items-center justify-center rounded-full"
                    >
                      {typeof tab.badge === 'number' && tab.badge > 99 ? '99+' : tab.badge}
                    </Badge>
                  </motion.div>
                )}
              </div>

              {/* Текст */}
              <span 
                className={cn(
                  "text-xs font-medium leading-none transition-colors duration-200",
                  isActive ? "text-blue-600" : "text-gray-600"
                )}
              >
                {tab.label}
              </span>

              {/* Рипл-эффект при нажатии */}
              <motion.div
                className="absolute inset-0 rounded-xl bg-gray-900/10 opacity-0"
                whileTap={{ opacity: 0.1 }}
                transition={{ duration: 0.1 }}
              />
            </Link>
          );
        })}
      </div>

      {/* Индикатор home для iPhone */}
      <div className="h-safe-area-inset-bottom bg-white/95" />
    </motion.div>
  );
};

export default BottomTabNavigation;