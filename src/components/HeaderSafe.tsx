import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Sparkles,
  Zap,
  Star,
  ShoppingCart,
  Search,
  ArrowRight
} from "lucide-react";

const HeaderSafe = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

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

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg" 
          : "bg-white/80 backdrop-blur-md border-b border-slate-200/50"
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
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
              <div className="relative">
                <span className="text-white font-black text-2xl tracking-tight">W</span>
                <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
              </div>
            </div>
            
            {/* Company name */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                WESHOW
              </span>
              <span className="text-xs text-gray-600 font-medium tracking-wide">
                Мультимедиа решения
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive("/") 
                  ? "text-blue-600" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Главная
            </Link>
            
            <div className="relative group">
              <button 
                onClick={toggleServices}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <span>Услуги</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <Link to="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Все услуги
                  </Link>
                  <Link to="/services/multimedia" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Мультимедиа
                  </Link>
                  <Link to="/services/development" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Разработка
                  </Link>
                  <Link to="/services/equipment-rental" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Аренда оборудования
                  </Link>
                </div>
              )}
            </div>
            
            <Link 
              to="/portfolio" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive("/portfolio") 
                  ? "text-blue-600" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Портфолио
            </Link>
            
            <Link 
              to="/news" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive("/news") 
                  ? "text-blue-600" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Новости
            </Link>
            
            <Link 
              to="/blog" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive("/blog") 
                  ? "text-blue-600" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Блог
            </Link>
            
            <Link 
              to="/team" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive("/team") 
                  ? "text-blue-600" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Команда
            </Link>
            
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive("/contact") 
                  ? "text-blue-600" 
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Контакты
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Получить консультацию
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={closeMenu}
              >
                Главная
              </Link>
              <Link 
                to="/services" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={closeMenu}
              >
                Услуги
              </Link>
              <Link 
                to="/portfolio" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={closeMenu}
              >
                Портфолио
              </Link>
              <Link 
                to="/news" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={closeMenu}
              >
                Новости
              </Link>
              <Link 
                to="/blog" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={closeMenu}
              >
                Блог
              </Link>
              <Link 
                to="/team" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={closeMenu}
              >
                Команда
              </Link>
              <Link 
                to="/contact" 
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={closeMenu}
              >
                Контакты
              </Link>
              <div className="px-4 py-2">
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
                  onClick={closeMenu}
                >
                  Получить консультацию
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderSafe;
