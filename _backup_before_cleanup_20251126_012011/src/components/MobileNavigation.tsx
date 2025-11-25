import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Briefcase, 
  Phone, 
  Settings,
  X,
  ChevronRight,
  Search,
  Package,
  Users,
  FileText,
  Zap,
  Monitor,
  Palette,
  Headphones,
  ShoppingCart
} from 'lucide-react';
import { useResponsive } from '../hooks/useResponsive';
import { useAdvancedCart } from '../hooks/useAdvancedCart';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { isMobile } = useResponsive();
  const { cart } = useAdvancedCart();

  // Закрываем меню при изменении маршрута
  useEffect(() => {
    onClose();
  }, [location.pathname, onClose]);

  // Блокируем скролл body когда меню открыто
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Главные разделы меню
  const mainMenuItems = [
    {
      title: 'Главная',
      href: '/',
      icon: Home,
      description: 'Начальная страница',
      color: 'text-blue-600'
    },
    {
      title: 'Услуги',
      href: '/services',
      icon: Briefcase,
      description: 'Наши решения',
      color: 'text-purple-600',
      submenu: [
        { title: 'Мультимедиа', href: '/services/multimedia', icon: Monitor },
        { title: 'Разработка', href: '/services/development', icon: Zap },
        { title: 'Дизайн', href: '/services/design', icon: Palette },
        { title: 'Поддержка', href: '/services/technical-support', icon: Headphones }
      ]
    },
    {
      title: 'Оборудование',
      href: '/equipment',
      icon: Package,
      description: 'Каталог оборудования',
      color: 'text-green-600'
    },
    {
      title: 'Портфолио',
      href: '/portfolio',
      icon: Settings,
      description: 'Наши проекты',
      color: 'text-orange-600'
    },
    {
      title: 'О компании',
      href: '/about',
      icon: Users,
      description: 'О нашей команде',
      color: 'text-teal-600'
    },
    {
      title: 'Блог',
      href: '/blog',
      icon: FileText,
      description: 'Статьи и новости',
      color: 'text-indigo-600'
    },
    {
      title: 'Контакты',
      href: '/contact',
      icon: Phone,
      description: 'Связаться с нами',
      color: 'text-red-600'
    }
  ];

  // Состояние раскрытых подменю
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Переключение подменю
  const toggleSubmenu = useCallback((href: string) => {
    setExpandedMenus(prev => 
      prev.includes(href) 
        ? prev.filter(item => item !== href)
        : [...prev, href]
    );
  }, []);

  // Закрытие всех подменю при смене маршрута
  useEffect(() => {
    setExpandedMenus([]);
  }, [location.pathname]);

  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: {
        delay: 0.2
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const menuVariants = {
    closed: {
      x: '-100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  const itemVariants = {
    closed: {
      x: -20,
      opacity: 0
    },
    open: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + index * 0.1,
        duration: 0.3
      }
    })
  };

  if (!isMobile) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 flex flex-col"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Заголовок с корзиной */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-lg">W</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">WeShow</div>
                  <div className="text-xs text-gray-500">NextGen Platform</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Корзина в заголовке - показывается только если есть товары */}
                {cart.totalItems > 0 && (
                  <Link 
                    to="/cart"
                    className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={onClose}
                  >
                    <ShoppingCart className="w-5 h-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cart.totalItems > 99 ? '99+' : cart.totalItems}
                    </span>
                  </Link>
                )}
                
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-gray-600" />
                </motion.button>
              </div>
            </div>

            {/* Search */}
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск услуг..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border-0 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Элементы меню */}
            <div className="flex-1 overflow-y-auto py-4">
              {mainMenuItems.map((item, index) => {
                const IconComponent = item.icon;
                const isExpanded = expandedMenus.includes(item.href);
                const hasSubmenu = item.submenu && item.submenu.length > 0;
                
                return (
                  <motion.div
                    key={item.href}
                    custom={index}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    className="px-6 py-1"
                  >
                    {hasSubmenu ? (
                      /* Элемент с подменю */
                      <div>
                        <button
                          onClick={() => toggleSubmenu(item.href)}
                          className="w-full flex items-center space-x-4 py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                        >
                          <div className={`w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors`}>
                            <IconComponent className={`w-5 h-5 text-gray-600 group-hover:${item.color || 'text-blue-600'} transition-colors`} />
                          </div>
                          
                          <div className="flex-1 text-left">
                            <div className="font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                          </div>
                          
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-5 h-5 text-gray-400 transition-colors" />
                          </motion.div>
                        </button>

                        {/* Подменю */}
                        <AnimatePresence>
                          {isExpanded && item.submenu && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="ml-14 mt-2 space-y-1 pb-2">
                                {item.submenu.map((subitem) => {
                                  const SubIcon = subitem.icon;
                                  return (
                                    <Link
                                      key={subitem.href}
                                      to={subitem.href}
                                      onClick={onClose}
                                      className="flex items-center space-x-3 py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
                                    >
                                      {SubIcon && (
                                        <SubIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                      )}
                                      <span>{subitem.title}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      /* Обычный элемент */
                      <Link
                        to={item.href}
                        onClick={onClose}
                        className="flex items-center space-x-4 py-3 px-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                      >
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                          <IconComponent className={`w-5 h-5 text-gray-600 group-hover:${item.color || 'text-blue-600'} transition-colors`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                        
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200">
              <div className="text-center">
                <div className="text-sm text-gray-500">
                  © 2025 WeShow NextGen Platform
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Современные мультимедийные решения
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;