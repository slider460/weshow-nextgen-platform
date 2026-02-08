import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AnimatedButton from "./AnimatedButton";
import { Menu, X, ChevronDown, Zap } from "lucide-react";
import ConsultationModal from "./ConsultationModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
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

  const openConsultModal = () => {
    setIsConsultModalOpen(true);
    closeMenu();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`font-sans fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-lg" 
          : "bg-white/80 backdrop-blur-md border-b border-slate-200/50"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 justify-between">
          {/* Logo — font-sans чтобы на всех страницах был один шрифт (не наследует font-display) */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group flex-shrink-0 font-sans"
            onClick={closeMenu}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
              <span className="text-white font-black text-2xl tracking-tight">W</span>
            </div>
            
            <div className="hidden sm:block">
              <div className="flex items-center">
                <span className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent tracking-tight">
                  WE
                </span>
                <span className="text-2xl font-black bg-gradient-to-r from-purple-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
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
              className={`relative text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium group ${
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
                className="flex items-center space-x-1 text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                onClick={toggleServices}
              >
                <span>Услуги</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
              
              <div className="absolute top-full left-0 mt-2 w-[800px] bg-white border border-slate-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4">
                  <div className="flex items-center space-x-4 mb-4 pb-3 border-b border-slate-200">
                    <Link to="/services" className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors">
                      Все услуги
                    </Link>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">Контент и продакшн</h3>
                      
                      <Link to="/services/multimedia-content" className="block group">
                        <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm mb-1">Мультимедийный контент</h4>
                          <p className="text-xs text-slate-600">2D/3D анимация, видеоролики, motion-дизайн</p>
                        </div>
                      </Link>
                      
                      <Link to="/services/video-production" className="block group">
                        <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm mb-1">Видеопродакшн</h4>
                          <p className="text-xs text-slate-600">Полный цикл производства для любых площадок</p>
                        </div>
                      </Link>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">Разработка и инсталляции</h3>
                      
                      <Link to="/services/software-and-games" className="block group">
                        <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm mb-1">ПО и игры для мероприятий</h4>
                          <p className="text-xs text-slate-600">Интерактивные приложения и брендированные игры</p>
                        </div>
                      </Link>
                      
                      <Link to="/services/multimedia-installations" className="block group">
                        <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm mb-1">Мультимедийные инсталляции</h4>
                          <p className="text-xs text-slate-600">Световые, аудио- и кинетические инсталляции</p>
                        </div>
                      </Link>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">Оборудование и стенды</h3>
                      
                      <Link to="/services/rental-multimedia-equipment" className="block group">
                        <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm mb-1">Аренда мультимедийного оборудования</h4>
                          <p className="text-xs text-slate-600">LED-экраны, проекторы, звук с технической поддержкой</p>
                        </div>
                      </Link>
                      
                      <Link to="/services/technological-exhibition-stands" className="block group">
                        <div className="p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200">
                          <h4 className="font-medium text-slate-900 group-hover:text-blue-600 text-sm mb-1">Технологичные выставочные стенды</h4>
                          <p className="text-xs text-slate-600">Архитектура, мультимедиа и интерактивные сценарии</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link 
              to="/team" 
              className={`relative text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium group ${
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
              className={`relative text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium group ${
                isActive("/portfolio") ? "text-blue-600" : ""
              }`}
            >
              Портфолио
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 ${
                isActive("/portfolio") ? "w-full" : "w-0 group-hover:w-full"
              }`}></span>
            </Link>
            
            <Link 
              to="/contact" 
              className={`relative text-slate-700 hover:text-blue-600 transition-colors duration-200 font-medium group ${
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
            <AnimatedButton 
              variant="gradient"
              hoverEffect="lift"
              glow={true}
              icon={<Zap className="w-4 h-4" />}
              onClick={openConsultModal}
              className="text-white px-3 py-2 text-sm"
            >
              Получить консультацию
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
      <div className={`lg:hidden transition-all duration-200 ease-in-out ${
        isMenuOpen 
          ? "max-h-screen opacity-100 visible" 
          : "max-h-0 opacity-0 invisible"
      }`}>
        <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="space-y-1">
              <Link 
                to="/" 
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                Главная
              </Link>
              
              <Link 
                to="/about" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                О нас
              </Link>
              
              {/* Services Section */}
              <div className="space-y-1">
                <div className="px-3 py-1">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Услуги:</h3>
                </div>
                
                <Link 
                  to="/services/multimedia-content" 
                  className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                  onClick={closeMenu}
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Мультимедийный контент
                </Link>
                
                <Link 
                  to="/services/video-production" 
                  className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                  onClick={closeMenu}
                >
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Видеопродакшн
                </Link>
                
                <Link 
                  to="/services/software-and-games" 
                  className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                  onClick={closeMenu}
                >
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  ПО и игры для мероприятий
                </Link>
                
                <Link 
                  to="/services/multimedia-installations" 
                  className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                  onClick={closeMenu}
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Мультимедийные инсталляции
                </Link>
                
                <Link 
                  to="/services/rental-multimedia-equipment" 
                  className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                  onClick={closeMenu}
                >
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Аренда мультимедийного оборудования
                </Link>
                  
                <Link 
                  to="/services/technological-exhibition-stands" 
                  className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                  onClick={closeMenu}
                >
                  <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                  Технологичные выставочные стенды
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
              
              <Link
                to="/contact" 
                className="flex items-center px-4 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200" 
                onClick={closeMenu}
              >
                <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                Контакты
              </Link>
              
              {/* Mobile CTA */}
              <div className="pt-4">
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
    </header>
  );
};

export default Header;
