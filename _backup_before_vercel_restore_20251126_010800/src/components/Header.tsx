import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import AnimatedButton from "./AnimatedButton";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "./auth/AuthModal";
import { UserMenu } from "./auth/UserMenu";
import { HeaderCart } from "./HeaderCart";

import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Sparkles,
  Zap,
  Star,
  Search,
  ArrowRight
} from "lucide-react";
import ConsultationModal from "./ConsultationModal";
// import LanguageSwitcher from "./LanguageSwitcher";
// import { useLanguage } from "../contexts/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const location = useLocation();
  const { user, profile, loading } = useAuth();

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

  const openAuthModal = (mode: 'signin' | 'signup' | 'reset' = 'signin') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    closeMenu();
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
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
              to="/about" 
              className={`relative text-slate-700 hover:text-blue-600 hover-no-flicker interactive-optimized transition-colors duration-200 font-medium group ${
                isActive("/about") ? "text-blue-600" : ""
              }`}
            >
              О нас
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 ${
                isActive("/about") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 hover-no-flicker interactive-optimized transition-colors duration-200 font-medium group"
                onClick={toggleServices}
              >
                <span>Услуги</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  isServicesOpen ? "rotate-180" : ""
                }`} />
              </button>
              
              <div className={`absolute top-full left-0 mt-2 w-[800px] bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50`}>
                <div className="p-4">
                  {/* Верхняя навигация */}
                  <div className="flex items-center space-x-4 mb-4 pb-3 border-b border-slate-200">
                    <Link to="/services" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
                      Все услуги
                    </Link>
                    <Link to="/services/multimedia" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
                      Мультимедиа
                    </Link>
                    <Link to="/services/development" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
                      Разработка
                    </Link>
                    <Link to="/services/equipment-rental" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
                      Оборудование
                    </Link>
                    <Link to="/services/design" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
                      Дизайн
                    </Link>
                  </div>

                  {/* Поиск */}
                  <div className="mb-4">
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Подобрать услугу..." 
                        className="w-full px-3 py-2 pl-10 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  {/* Основной контент в колонках */}
                  <div className="grid grid-cols-4 gap-6">
                    {/* Колонка 1: Популярное */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">Популярное</h3>
                      
                      <Link to="/services/equipment-rental" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">Аренда оборудования</h4>
                          <p className="text-xs text-slate-600 mt-1">Готовые решения для мероприятий любого масштаба</p>
                        </div>
                      </Link>
                      
                      <Link to="/services/kinetic-screen" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">Кинетические LED экраны</h4>
                          <p className="text-xs text-slate-600 mt-1">Инновационные решения для создания wow-эффекта</p>
                        </div>
                      </Link>
                      
                      <Link to="/services/complex-solutions" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">Комплексные решения</h4>
                          <p className="text-xs text-slate-600 mt-1">От концепции до реализации под ключ</p>
                        </div>
                      </Link>
                      
                      <Button className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2">
                        Мои услуги
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>

                    {/* Колонка 2: Мультимедиа */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">Мультимедиа</h3>
                      
                      <Link to="/services/multimedia" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">Мультимедийные решения</h4>
                          <p className="text-xs text-slate-600 mt-1">Видео, аудио, интерактив</p>
                        </div>
                      </Link>
                      
                      <Link to="/services/projection-mapping" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">Проекционное маппинг</h4>
                          <p className="text-xs text-slate-600 mt-1">3D проекции на любые поверхности</p>
                        </div>
                      </Link>
                      
                      <Link to="/services/interactive-games" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">Интерактивные игры</h4>
                          <p className="text-xs text-slate-600 mt-1">Motion tracking и VR/AR</p>
                        </div>
                      </Link>
                      
                      <Link to="/services/holographic-displays" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">Голографические дисплеи</h4>
                          <p className="text-xs text-slate-600 mt-1">3D эффекты без очков</p>
                        </div>
                      </Link>
                    </div>

                    {/* Колонка 3: Разработка */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">Разработка</h3>
                      
                      <Link to="/services/development" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">Разработка ПО и игр</h4>
                          <p className="text-xs text-slate-600 mt-1">Мобильные приложения и игры</p>
                        </div>
                      </Link>
                      
                      <Link to="/services/web-platforms" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">Веб-платформы</h4>
                          <p className="text-xs text-slate-600 mt-1">Современные веб-решения</p>
                        </div>
                      </Link>
                      
                      <Link to="/services/ar-vr-apps" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">AR/VR приложения</h4>
                          <p className="text-xs text-slate-600 mt-1">Дополненная и виртуальная реальность</p>
                        </div>
                      </Link>
                      
                      <Link to="/services/cross-platform" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">Кроссплатформенность</h4>
                          <p className="text-xs text-slate-600 mt-1">Работа на всех устройствах</p>
                        </div>
                      </Link>
                    </div>

                    {/* Колонка 4: Оборудование */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">Оборудование</h3>
                      
                      <Link to="/services/equipment-calculation" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">Калькулятор аренды</h4>
                          <p className="text-xs text-slate-600 mt-1">Расчет стоимости оборудования</p>
                        </div>
                      </Link>
                      
                      <Link to="/services/installation" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">Монтаж и установка</h4>
                          <p className="text-xs text-slate-600 mt-1">Профессиональная установка</p>
                        </div>
                      </Link>
                      
                      <Link to="/services/maintenance" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">Техобслуживание</h4>
                          <p className="text-xs text-slate-600 mt-1">Поддержка и ремонт</p>
                        </div>
                      </Link>
                      
                      <Link to="/services/equipment-diagnostics" className="block group">
                        <div className="p-2 rounded hover:bg-slate-50 transition-colors">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm">Диагностика</h4>
                          <p className="text-xs text-slate-600 mt-1">Проверка состояния оборудования</p>
                        </div>
                      </Link>
                    </div>
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
              Команда
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
              Портфолио
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 ${
                isActive("/portfolio") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
            
            {/* Скрытые ссылки на Новости и Блог */}
            <div className="hidden">
              <Link 
                to="/news" 
                className={`relative text-slate-700 hover:text-blue-600 hover-no-flicker interactive-optimized transition-colors duration-200 font-medium group ${
                  isActive("/news") ? "text-blue-600" : ""
                }`}
              >
                Новости
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
                Блог
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 ${
                  isActive("/blog") ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            </div>
            
            <Link 
              to="/contact" 
              className={`relative text-slate-700 hover:text-blue-600 hover-no-flicker interactive-optimized transition-colors duration-200 font-medium group ${
                isActive("/contact") ? "text-blue-600" : ""
              }`}
            >
              Контакты
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 ${
                isActive("/contact") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <HeaderCart />
            
            <AnimatedButton 
              variant="gradient"
              hoverEffect="lift"
              glow={true}
              icon={<Zap className="w-4 h-4" />}
              onClick={openConsultModal}
              className="text-white px-3 py-2 text-sm"
            >
              <span className="hidden lg:inline">Получить консультацию</span>
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
                to="/about" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                О нас
              </Link>
              
              <Link 
                to="/" 
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Главная
              </Link>
              
              {/* Services Section */}
              <div className="space-y-1">
                <div className="px-3 py-1">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Услуги:</h3>
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
                Команда
              </Link>
              
              <Link 
                to="/portfolio" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                Портфолио
              </Link>
              
              {/* Скрытые ссылки на Новости и Блог в мобильном меню */}
              <div className="hidden">
                <Link 
                  to="/news" 
                  className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                  onClick={closeMenu}
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Новости
                </Link>
                
                <Link 
                  to="/blog" 
                  className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                  onClick={closeMenu}
                >
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Блог
                </Link>
              </div>
              
              <Link
                to="/contact" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                Контакты
              </Link>
              
              <Link
                to="/test-figma" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-cyan-600 rounded-full mr-3"></span>
                Тест Figma
              </Link>
              
              {/* Mobile CTA */}
              <div className="pt-4 space-y-3">
                

                {/* Кнопки авторизации для мобильных */}
                {loading ? (
                  <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                ) : user && profile ? (
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">{profile.company_name || profile.full_name}</p>
                      <p className="text-xs text-blue-600">{user.email}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        closeMenu();
                        window.location.href = '/profile';
                      }}
                      className="w-full"
                    >
                      Личный кабинет
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => openAuthModal('signin')}
                      className="w-full"
                    >
                      Войти
                    </Button>
                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => openAuthModal('signup')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Регистрация
                    </Button>
                  </div>
                )}
                
                <AnimatedButton 
                  variant="gradient"
                  hoverEffect="scale"
                  glow={true}
                  icon={<Zap className="w-4 h-4" />}
                  onClick={openConsultModal}
                  className="w-full text-white"
                >
                  Получить консультацию
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
        title="Получить консультацию"
        triggerText="Получить консультацию"
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialMode={authMode}
      />
    </header>
  );
};

export default Header;