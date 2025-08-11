import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold text-foreground">WESHOW</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#about" className="text-foreground hover:text-primary transition-colors">
                О компании
              </a>
              
              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="flex items-center text-foreground hover:text-primary transition-colors">
                  Услуги
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                {isServicesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-border z-50">
                    <div className="py-2">
                      <a href="#multimedia" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                        Мультимедийные решения
                      </a>
                      <a href="#integration" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                        Техническая интеграция
                      </a>
                      <a href="#events" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                        Организация мероприятий
                      </a>
                      <a href="#equipment" className="block px-4 py-2 text-sm text-foreground hover:bg-muted">
                        Поставка оборудования
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              <a href="#projects" className="text-foreground hover:text-primary transition-colors">
                Проекты
              </a>
              <a href="#blog" className="text-foreground hover:text-primary transition-colors">
                Ресурсы
              </a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors">
                Контакты
              </a>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="hero" size="lg">
              Заказать проект
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <a
                href="#about"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md"
                onClick={toggleMenu}
              >
                О компании
              </a>
              <a
                href="#services"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md"
                onClick={toggleMenu}
              >
                Услуги
              </a>
              <a
                href="#projects"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md"
                onClick={toggleMenu}
              >
                Проекты
              </a>
              <a
                href="#blog"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md"
                onClick={toggleMenu}
              >
                Ресурсы
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md"
                onClick={toggleMenu}
              >
                Контакты
              </a>
              <div className="pt-4">
                <Button variant="hero" size="lg" className="w-full">
                  Заказать проект
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;