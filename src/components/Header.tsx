import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectOrderModal from "./ProjectOrderModal";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  
  let hoverTimeout: NodeJS.Timeout;
  
  const handleServicesEnter = () => {
    clearTimeout(hoverTimeout);
    setIsServicesOpen(true);
  };
  
  const handleServicesLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsServicesOpen(false);
    }, 100);
  };
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-primary-foreground font-bold text-xl">W</span>
              </div>
              <span className="text-2xl font-bold text-foreground tracking-tight">WESHOW</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block flex-1">
            <div className="flex items-center justify-center space-x-8">
              <Link to="/about" className="relative text-foreground/80 hover:text-primary transition-all duration-200 font-medium group">
                О компании
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </Link>
              
              {/* Services Dropdown */}
              <div className="relative" onMouseEnter={handleServicesEnter} onMouseLeave={handleServicesLeave}>
                <button className="relative flex items-center text-foreground/80 hover:text-primary transition-all duration-200 font-medium group">
                  Услуги
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </button>
                {isServicesOpen && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-80 z-[9999]"
                    onMouseEnter={handleServicesEnter} 
                    onMouseLeave={handleServicesLeave}
                  >
                    <div className="bg-background border border-border/50 rounded-2xl shadow-2xl overflow-hidden">
                      <div className="p-3">
                         <Link to="/services" className="flex items-center px-4 py-3 text-sm text-foreground hover:bg-primary/5 hover:text-primary rounded-xl transition-all duration-200 font-medium">
                           <span className="w-2 h-2 bg-primary/30 rounded-full mr-3"></span>
                           Все услуги
                         </Link>
                         <a href="#services" className="flex items-center px-4 py-3 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary rounded-xl transition-all duration-200">
                           <span className="w-2 h-2 bg-accent/30 rounded-full mr-3"></span>
                           Мультимедийные решения
                         </a>
                         <a href="#services" className="flex items-center px-4 py-3 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary rounded-xl transition-all duration-200">
                           <span className="w-2 h-2 bg-accent/30 rounded-full mr-3"></span>
                           Разработка ПО и игр
                         </a>
                         <a href="#services" className="flex items-center px-4 py-3 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary rounded-xl transition-all duration-200">
                           <span className="w-2 h-2 bg-accent/30 rounded-full mr-3"></span>
                           Техническое сопровождение
                         </a>
                         <a href="#services" className="flex items-center px-4 py-3 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary rounded-xl transition-all duration-200">
                           <span className="w-2 h-2 bg-accent/30 rounded-full mr-3"></span>
                           Интеграция мультимедии
                         </a>
                         <a href="#services" className="flex items-center px-4 py-3 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary rounded-xl transition-all duration-200">
                           <span className="w-2 h-2 bg-accent/30 rounded-full mr-3"></span>
                           Брендинг мероприятий
                         </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Link to="/about" className="relative text-foreground/80 hover:text-primary transition-all duration-200 font-medium group">
                Команда
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link to="/portfolio" className="relative text-foreground/80 hover:text-primary transition-all duration-200 font-medium group">
                Проекты
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link to="/contact" className="relative text-foreground/80 hover:text-primary transition-all duration-200 font-medium group">
                Контакты
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </div>
            
            {/* Contact Info */}
            <div className="hidden xl:flex items-center justify-end space-x-6 text-sm text-muted-foreground mt-1">
              <a href="tel:+74955807537" className="flex items-center space-x-1 hover:text-primary transition-colors group">
                <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>+7 (495) 580-75-37</span>
              </a>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Москва, ул. Рочдельская, 14А</span>
              </div>
              <a href="mailto:info@weshow.ru" className="flex items-center space-x-1 hover:text-primary transition-colors group">
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>info@weshow.ru</span>
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="lg" onClick={() => setIsOrderModalOpen(true)}>
              Заказать проект
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 pt-4 pb-6 space-y-3 bg-background/95 backdrop-blur-lg border-t border-border/50 shadow-lg">
              <Link 
                to="/about" 
                className="flex items-center px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200" 
                onClick={toggleMenu}
              >
                <span className="w-2 h-2 bg-primary/30 rounded-full mr-3"></span>
                О компании
              </Link>
              <Link 
                to="/services" 
                className="flex items-center px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200" 
                onClick={toggleMenu}
              >
                <span className="w-2 h-2 bg-accent/30 rounded-full mr-3"></span>
                Услуги
              </Link>
              <Link 
                to="/about" 
                className="flex items-center px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200" 
                onClick={toggleMenu}
              >
                <span className="w-2 h-2 bg-primary/30 rounded-full mr-3"></span>
                Команда
              </Link>
              <Link 
                to="/portfolio" 
                className="flex items-center px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200" 
                onClick={toggleMenu}
              >
                <span className="w-2 h-2 bg-accent/30 rounded-full mr-3"></span>
                Проекты
              </Link>
              <Link 
                to="/contact" 
                className="flex items-center px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200" 
                onClick={toggleMenu}
              >
                <span className="w-2 h-2 bg-primary/30 rounded-full mr-3"></span>
                Контакты
              </Link>
              
              <div className="pt-4 mt-4 border-t border-border/50">
                <div className="space-y-3 px-4 py-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>+7 (495) 580-75-37</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>info@weshow.ru</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Москва, ул. Рочдельская, 14А</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full shadow-lg" 
                  onClick={() => {
                    setIsOrderModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                >
                  Заказать проект
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      <ProjectOrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </header>;
};
export default Header;