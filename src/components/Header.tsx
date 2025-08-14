import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Sparkles,
  Zap,
  Star
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
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

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg" 
          : "bg-white/80 backdrop-blur-sm border-b border-slate-200/50"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={closeMenu}
          >
            <div className="relative">
              {/* Main logo container */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                {/* W letter with modern styling */}
                <div className="relative">
                  <span className="text-white font-black text-2xl tracking-tight">W</span>
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                </div>
              </div>
              
              {/* Outer glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              
              {/* Animated corner accents */}
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>
            </div>
            
            {/* Company name */}
            <div className="hidden sm:block">
              <div className="flex items-center space-x-1">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent tracking-tight">
                  E
                </span>
                <span className="text-2xl font-black bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
                  S
                </span>
                <span className="text-2xl font-black bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                  H
                </span>
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent tracking-tight">
                  O
                </span>
                <span className="text-2xl font-black bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
                  W
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium tracking-wide">NextGen Platform</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`relative text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium group ${
                isActive("/") ? "text-blue-600" : ""
              }`}
            >
              Главная
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                isActive("/") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>

            {/* Services Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium group"
                onClick={toggleServices}
              >
                <span>Услуги</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${
                  isServicesOpen ? "rotate-180" : ""
                }`} />
              </button>
              
              <div className={`absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2`}>
                <div className="p-4">
                  <div className="mb-4">
                    <Link to="/services" className="flex items-center px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 font-medium group">
                      <Sparkles className="w-4 h-4 mr-3 text-blue-600" />
                      Все услуги
                    </Link>
                  </div>
                  
                  {/* Основные услуги */}
                  <div className="grid grid-cols-1 gap-2">
                    <Link to="/services/multimedia" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 group">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                      Мультимедийные решения
                    </Link>
                    
                    <Link to="/services/development" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 group">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                      Разработка ПО и игр
                    </Link>
                    
                    <Link to="/services/design" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 group">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                      Дизайн и брендинг
                    </Link>
                    
                    <Link to="/services/technical-support" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 group">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                      Техническое сопровождение
                    </Link>
                    
                    <Link to="/services/equipment-rental" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 group">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                      Аренда оборудования
                    </Link>
                    
                    <Link to="/services/complex-solutions" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 group">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                      Комплексные решения
                    </Link>
                    
                    <Link to="/services/space-planning" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 group">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                      Пространственное проектирование
                    </Link>
                    
                    <Link to="/services/tech-support" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 group">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></div>
                      Техническая поддержка
                    </Link>
                    
                    <Link to="/services/system-integration" className="flex items-center px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 group">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-3 group-hover:scale-300"></div>
                      Системная интеграция
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link 
              to="/team" 
              className={`relative text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium group ${
                isActive("/team") ? "text-blue-600" : ""
              }`}
            >
              Команда
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                isActive("/team") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
            
            <Link 
              to="/portfolio" 
              className={`relative text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium group ${
                isActive("/portfolio") ? "text-blue-600" : ""
              }`}
            >
              Проекты
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                isActive("/portfolio") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
            
            <Link 
              to="/news" 
              className={`relative text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium group ${
                isActive("/news") ? "text-blue-600" : ""
              }`}
            >
              Новости
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                isActive("/news") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
            
            <Link 
              to="/careers" 
              className={`relative text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium group ${
                isActive("/careers") ? "text-blue-600" : ""
              }`}
            >
              Карьера
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                isActive("/careers") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
            
            <Link 
              to="/blog" 
              className={`relative text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium group ${
                isActive("/blog") ? "text-blue-600" : ""
              }`}
            >
              Блог
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                isActive("/blog") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
            
            <Link 
              to="/contact" 
              className={`relative text-slate-700 hover:text-blue-600 transition-all duration-300 font-medium group ${
                isActive("/contact") ? "text-blue-600" : ""
              }`}
            >
              Контакты
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ${
                isActive("/contact") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('consultation-modal')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="w-4 h-4 mr-2" />
              Получить консультацию
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-white/10 transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? "max-h-screen opacity-100 visible" 
          : "max-h-0 opacity-0 invisible"
      }`}>
        <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <nav className="space-y-2">
                              <Link 
                  to="/" 
                  className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                  onClick={closeMenu}
                >
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Главная
                </Link>
              
              {/* Services Section */}
              <div className="space-y-2">
                <div className="px-4 py-2">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Услуги:</h3>
                </div>
                
                                  <Link 
                    to="/services/multimedia" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Мультимедийные решения
                  </Link>
                  
                  <Link 
                    to="/services/development" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Разработка ПО и игр
                  </Link>
                  
                  <Link 
                    to="/services/design" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                    Дизайн и брендинг
                  </Link>
                  
                  <Link 
                    to="/services/technical-support" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    Техническое сопровождение
                  </Link>
                  
                  <Link 
                    to="/services/equipment-rental" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                    Аренда оборудования
                  </Link>
                  
                  <Link 
                    to="/services/complex-solutions" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    Комплексные решения
                  </Link>
                  
                  <Link 
                    to="/services/space-planning" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                    Пространственное проектирование
                  </Link>
                  
                  <Link 
                    to="/services/tech-support" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                    Техническая поддержка
                  </Link>
                  
                  <Link 
                    to="/services/system-integration" 
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                    onClick={closeMenu}
                  >
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Системная интеграция
                  </Link>
              </div>
              
              <Link 
                to="/team" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Команда
              </Link>
              
              <Link 
                to="/portfolio" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                Проекты
              </Link>
              
              <Link 
                to="/news" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Новости
              </Link>
              
              <Link 
                to="/careers" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Карьера
              </Link>
              
              <Link 
                to="/blog" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                Блог
              </Link>
              
              <Link 
                to="/contact" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                Контакты
              </Link>
              
              {/* Mobile CTA */}
              <div className="pt-4">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
                  onClick={() => {
                    closeMenu();
                    document.getElementById('consultation-modal')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Получить консультацию
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;