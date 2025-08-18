import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedButton from "./AnimatedButton";
import { useEquipmentCart } from "@/hooks/useEquipmentCart";

import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Sparkles,
  Zap,
  Star,
  ShoppingCart
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useEquipmentCart();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setIsServicesOpen(false);
    }
  };

  const toggleServices = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  const openConsultModal = () => {
    setIsConsultModalOpen(true);
    closeMenu();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 header-no-flicker header-transition scroll-optimized backdrop-transition page-transition-optimized z-index-optimized animation-optimized ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-optimized border-b border-slate-200 shadow-lg" 
          : "bg-white/80 backdrop-blur-optimized border-b border-slate-200/50"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group flex-shrink-0"
            onClick={closeMenu}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300 gradient-no-flicker">
              <div className="relative">
                <span className="text-white font-black text-2xl tracking-tight">W</span>
                <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Company name */}
            <div className="hidden sm:block">
              <div className="flex items-center">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent tracking-tight gradient-no-flicker">
                  WE
                </span>
                <span className="text-2xl font-black bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent tracking-tight gradient-no-flicker">
                  SHOW
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium tracking-wide">NextGen Agency</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 ml-8 flex-shrink-0">
            <Link 
              to="/" 
              className={`relative text-slate-700 hover:text-blue-600 hover-no-flicker interactive-optimized transition-colors duration-200 font-medium group ${
                isActive("/") ? "text-blue-600" : ""
              }`}
            >
              {t('nav.home')}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 ${
                isActive("/") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 hover-no-flicker interactive-optimized transition-colors duration-200 font-medium group"
                onClick={toggleServices}
              >
                <span>{t('nav.services')}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  isServicesOpen ? "rotate-180" : ""
                }`} />
              </button>
              
              <div className={`absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-optimized border border-slate-200 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-1`}>
                <div className="p-4">
                  <div className="mb-4">
                    <Link to="/services" className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200 font-medium group">
                      <Sparkles className="w-4 h-4 mr-3 text-blue-600" />
                      Все услуги
                    </Link>
                  </div>
                  
                  {/* Основные услуги */}
                  <div className="grid grid-cols-1 gap-2">
                    <Link to="/services/multimedia" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200 group">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Мультимедийные решения
                    </Link>
                    
                    <Link to="/services/development" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200 group">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      Разработка ПО и игр
                    </Link>
                    
                    <Link to="/services/design" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200 group">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                      Дизайн и брендинг
                    </Link>
                    
                    <Link to="/services/technical-support" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200 group">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      Техническое сопровождение
                    </Link>
                    
                    <Link to="/services/equipment-rental" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200 group">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      Аренда оборудования
                    </Link>
                    
                    <Link to="/services/equipment-calculation" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200 group">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      Калькулятор аренды
                    </Link>
                    
                    <Link to="/services/kinetic-screen" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200 group">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                      Кинетические LED экраны
                    </Link>
                    
                    <Link to="/services/complex-solutions" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200 group">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      Комплексные решения
                    </Link>
                    
                    <Link to="/services/space-planning" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200 group">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                      Пространственное проектирование
                    </Link>
                    
                    <Link to="/services/tech-support" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200 group">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                      Техническая поддержка
                    </Link>
                    
                    <Link to="/services/system-integration" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-colors duration-200 group">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                      Системная интеграция
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link 
              to="/team" 
              className={`relative text-slate-700 hover:text-blue-600 hover-no-flicker interactive-optimized transition-colors duration-200 font-medium group ${
                isActive("/team") ? "text-blue-600" : ""
              }`}
            >
              {t('nav.team')}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 ${
                isActive("/team") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
            
            <Link 
              to="/portfolio" 
              className={`relative text-slate-700 hover:text-blue-600 hover-no-flicker interactive-optimized transition-colors duration-200 font-medium group ${
                isActive("/portfolio") ? "text-blue-600" : ""
              }`}
            >
              {t('nav.portfolio')}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 ${
                isActive("/portfolio") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
            
            <Link 
              to="/news" 
              className={`relative text-slate-700 hover:text-blue-600 hover-no-flicker interactive-optimized transition-colors duration-200 font-medium group ${
                isActive("/news") ? "text-blue-600" : ""
              }`}
            >
              {t('nav.news')}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 ${
                isActive("/news") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
            
            <Link 
              to="/blog" 
              className={`relative text-slate-700 hover:text-blue-600 hover-no-flicker interactive-optimized transition-colors duration-200 font-medium group ${
                isActive("/blog") ? "text-blue-600" : ""
              }`}
            >
              {t('nav.blog')}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 ${
                isActive("/blog") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
            
            <Link 
              to="/contact" 
              className={`relative text-slate-700 hover:text-blue-600 hover-no-flicker interactive-optimized transition-colors duration-200 font-medium group ${
                isActive("/contact") ? "text-blue-600" : ""
              }`}
            >
              {t('nav.contact')}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 ${
                isActive("/contact") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <LanguageSwitcher 
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />
            
            {/* Кнопка корзины */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Пытаемся открыть корзину разными способами
                try {
                  // Способ 1: через событие
                  window.dispatchEvent(new CustomEvent('openEquipmentCart'));
                  
                  // Способ 2: прямая навигация на страницу с корзиной
                  setTimeout(() => {
                    if (window.location.pathname === '/equipment') {
                      // Если мы на странице Equipment, открываем корзину там
                      window.dispatchEvent(new CustomEvent('openEquipmentCart'));
                    } else {
                      // Иначе переходим на страницу Equipment
                      window.location.href = '/equipment';
                    }
                  }, 100);
                } catch (error) {
                  console.error('Error opening cart:', error);
                  // Fallback: переходим на страницу Equipment
                  window.location.href = '/equipment';
                }
              }}
              className="relative border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 px-2"
              title={`Корзина: ${cartCount} товаров`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden lg:inline ml-1">Корзина</span>
              {cartCount > 0 && (
                <Badge variant="secondary" className="ml-1 bg-blue-600 text-white border-0 text-xs min-w-[16px] h-4 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </Badge>
              )}
            </Button>
            
            <AnimatedButton 
              variant="gradient"
              hoverEffect="lift"
              glow={true}
              icon={<Zap className="w-4 h-4" />}
              onClick={openConsultModal}
              className="text-white px-3 py-2 text-sm"
            >
              <span className="hidden lg:inline">{t('btn.get-consultation')}</span>
              <span className="lg:hidden">Консультация</span>
            </AnimatedButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-200 ease-in-out state-change-optimized ${
        isMenuOpen 
          ? "max-h-screen opacity-100 visible" 
          : "max-h-0 opacity-0 invisible"
      }`}>
        <div className="bg-white/95 backdrop-blur-optimized backdrop-element-optimized border-t border-slate-200 shadow-xl">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="space-y-1">
              <Link 
                to="/" 
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                {t('nav.home')}
              </Link>
              
              {/* Services Section */}
              <div className="space-y-1">
                <div className="px-3 py-1">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t('nav.services')}:</h3>
                </div>
                
                <Link 
                  to="/services/multimedia" 
                  className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" 
                  onClick={closeMenu}
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Мультимедийные решения
                </Link>
                
                <Link 
                  to="/services/development" 
                  className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" 
                  onClick={closeMenu}
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Разработка ПО и игр
                </Link>
                
                <Link 
                  to="/services/design" 
                  className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" 
                  onClick={closeMenu}
                >
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                  Дизайн и брендинг
                </Link>
                
                <Link 
                  to="/services/technical-support" 
                  className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" 
                  onClick={closeMenu}
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Техническое сопровождение
                </Link>
                
                <Link 
                  to="/services/equipment-rental" 
                  className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                  onClick={closeMenu}
                >
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Аренда оборудования
                </Link>
                  
                  <Link 
                    to="/services/equipment-calculation" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Калькулятор аренды
                  </Link>
                  
                  <Link 
                    to="/services/kinetic-screen" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                    Кинетические LED экраны
                  </Link>
                  
                  <Link 
                    to="/services/complex-solutions" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Комплексные решения
                  </Link>
                  
                  <Link 
                    to="/services/space-planning" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    Пространственное проектирование
                  </Link>
                  
                  <Link 
                    to="/services/tech-support" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    Техническая поддержка
                  </Link>
                  
                  <Link 
                    to="/services/system-integration" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Системная интеграция
                  </Link>
              </div>
              
              <Link 
                to="/team" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                {t('nav.team')}
              </Link>
              
              <Link 
                to="/portfolio" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                {t('nav.portfolio')}
              </Link>
              
              <Link 
                to="/news" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                {t('nav.news')}
              </Link>
              
              <Link 
                to="/blog" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                {t('nav.blog')}
              </Link>
              
              <Link 
                to="/contact" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                {t('nav.contact')}
              </Link>
              
              {/* Mobile CTA */}
              <div className="pt-4 space-y-3">
                {/* Кнопка корзины */}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    closeMenu();
                    // Пытаемся открыть корзину разными способами
                    try {
                      // Способ 1: через событие
                      window.dispatchEvent(new CustomEvent('openEquipmentCart'));
                      
                      // Способ 2: прямая навигация на страницу с корзиной
                      setTimeout(() => {
                        if (window.location.pathname === '/equipment') {
                          // Если мы на странице Equipment, открываем корзину там
                          window.dispatchEvent(new CustomEvent('openEquipmentCart'));
                        } else {
                          // Иначе переходим на страницу Equipment
                          window.location.href = '/equipment';
                        }
                      }, 100);
                    } catch (error) {
                      console.error('Error opening cart:', error);
                      // Fallback: переходим на страницу Equipment
                      window.location.href = '/equipment';
                    }
                  }}
                  className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Корзина
                  {cartCount > 0 && (
                    <Badge variant="secondary" className="ml-2 bg-blue-600 text-white border-0 min-w-[20px] h-5 flex items-center justify-center">
                      {cartCount > 99 ? '99+' : cartCount}
                    </Badge>
                  )}
                </Button>
                
                <AnimatedButton 
                  variant="gradient"
                  hoverEffect="scale"
                  glow={true}
                  icon={<Zap className="w-4 h-4" />}
                  onClick={openConsultModal}
                  className="w-full text-white"
                >
                  {t('btn.get-consultation')}
                </AnimatedButton>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal 
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
        title={t('btn.get-consultation')}
        triggerText={t('btn.get-consultation')}
      />
    </header>
  );
};

export default Header;