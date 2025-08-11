import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-2xl font-bold">WESHOW</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md leading-relaxed">
              Ведущая компания в области комплексных мультимедийных технологий, 
              технической интеграции и организации мероприятий для B2B сегмента.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span>+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span>info@weshow.ru</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span>г. Москва, ул. Тверская, д. 123</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Услуги</h3>
            <ul className="space-y-3">
              <li>
                <a href="#multimedia" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Мультимедийные решения
                </a>
              </li>
              <li>
                <a href="#integration" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Техническая интеграция
                </a>
              </li>
              <li>
                <a href="#events" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Организация мероприятий
                </a>
              </li>
              <li>
                <a href="#equipment" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Поставка оборудования
                </a>
              </li>
              <li>
                <a href="#support" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Техническая поддержка
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Компания</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-white transition-colors">
                  О компании
                </a>
              </li>
              <li>
                <a href="#projects" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Портфолио
                </a>
              </li>
              <li>
                <a href="#blog" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Блог
                </a>
              </li>
              <li>
                <a href="#careers" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Карьера
                </a>
              </li>
              <li>
                <a href="#contact" className="text-primary-foreground/80 hover:text-white transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Подписка на новости</h3>
              <p className="text-primary-foreground/80">
                Получайте информацию о новых технологиях и успешных проектах
              </p>
            </div>
            <div className="flex w-full lg:w-auto max-w-md">
              <Input
                type="email"
                placeholder="Ваш email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-accent"
              />
              <Button variant="accent" className="ml-2 flex-shrink-0">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-primary-foreground/80 text-sm">
              © 2024 WESHOW. Все права защищены.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy" className="text-primary-foreground/80 hover:text-white transition-colors">
                Политика конфиденциальности
              </a>
              <a href="/terms" className="text-primary-foreground/80 hover:text-white transition-colors">
                Условия использования
              </a>
              <a href="/sitemap" className="text-primary-foreground/80 hover:text-white transition-colors">
                Карта сайта
              </a>
            </div>
          </div>
        </div>

        {/* Quick Contact CTAs */}
        <div className="pb-8">
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold mb-1">Готовы начать проект?</h4>
                <p className="text-primary-foreground/80 text-sm">
                  Свяжитесь с нами для бесплатной консультации
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="accent" size="sm">
                  Заказать звонок
                </Button>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  Написать нам
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;