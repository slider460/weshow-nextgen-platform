import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectOrderModal from "./ProjectOrderModal";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold text-foreground">WESHOW</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                О компании
              </Link>
              
              {/* Services Dropdown */}
              <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
                <button className="flex items-center text-foreground hover:text-primary transition-colors">
                  Услуги
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isServicesOpen && <div className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border border-border z-50">
                    <div className="py-2">
                       <Link to="/services" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                         Все услуги
                       </Link>
                       <a href="#services" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                         Мультимедийные решения
                       </a>
                       <a href="#services" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                         Разработка ПО и игр
                       </a>
                       <a href="#services" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                         Техническое сопровождение
                       </a>
                       <a href="#services" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                         Интеграция мультимедии
                       </a>
                       <a href="#services" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                         Брендинг мероприятий
                       </a>
                    </div>
                  </div>}
              </div>
              
                <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                Команда
               </Link>
               <Link to="/portfolio" className="text-foreground hover:text-primary transition-colors">
                 Проекты
               </Link>
               <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                 Контакты
               </Link>
              
              <div className="hidden lg:flex items-center space-x-6 text-sm text-muted-foreground">
                <a href="tel:+74951234567" className="hover:text-primary transition-colors">+7 (495) 580- 75-37</a>
                <span className="text-muted-foreground">Москва, ул. Рочдельская, 14А</span>
                <a href="mailto:info@weshow.ru" className="hover:text-primary transition-colors">
                  info@weshow.ru
                </a>
              </div>
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
        {isMenuOpen && <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <Link to="/about" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md" onClick={toggleMenu}>
                О компании
              </Link>
              <Link to="/services" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md" onClick={toggleMenu}>
                Услуги
              </Link>
              <Link to="/about" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md" onClick={toggleMenu}>
                Команда
              </Link>
              <Link to="/portfolio" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md" onClick={toggleMenu}>
                Проекты
              </Link>
              <Link to="/contact" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md" onClick={toggleMenu}>
                Контакты
              </Link>
              <div className="pt-4 pb-2 border-t border-border mt-4">
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  <div>+7 (495) 123-45-67</div>
                  <div>info@weshow.ru</div>
                  <div>Москва, ул. Примерная, 123</div>
                </div>
              </div>
              <div className="pt-4">
                <Button variant="hero" size="lg" className="w-full" onClick={() => setIsOrderModalOpen(true)}>
                  Заказать проект
                </Button>
              </div>
            </div>
          </div>}
      </nav>
      
      <ProjectOrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </header>;
};
export default Header;