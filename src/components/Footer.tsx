import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 gradient-card-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-2xl font-bold text-slate-900">WESHOW</span>
            </div>
            <p className="text-slate-600 mb-6 max-w-md leading-relaxed">
              Ведущая компания в области комплексных мультимедийных технологий, 
              технической интеграции и организации мероприятий для B2B сегмента.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-500" />
                <span className="text-slate-700">+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <span className="text-slate-700">info@weshow.ru</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span className="text-slate-700">г. Москва, ул. Тверская, д. 123</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-slate-900">Услуги</h3>
            <ul className="space-y-3">
              <li>
                <a href="#multimedia" className="text-slate-600 hover:text-blue-500 transition-colors">
                  Мультимедийные решения
                </a>
              </li>
              <li>
                <a href="#integration" className="text-slate-600 hover:text-blue-500 transition-colors">
                  Техническая интеграция
                </a>
              </li>
              <li>
                <a href="#events" className="text-slate-600 hover:text-blue-500 transition-colors">
                  Организация мероприятий
                </a>
              </li>
              <li>
                <a href="#equipment" className="text-slate-600 hover:text-blue-500 transition-colors">
                  Поставка оборудования
                </a>
              </li>
              <li>
                <a href="#support" className="text-slate-600 hover:text-blue-500 transition-colors">
                  Техническая поддержка
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-slate-900">Компания</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-slate-600 hover:text-blue-500 transition-colors">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-slate-600 hover:text-blue-500 transition-colors">
                  Портфолио
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 hover:text-blue-500 transition-colors">
                  Услуги
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 hover:text-blue-500 transition-colors">
                  Команда
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-blue-500 transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="py-8 border-t border-slate-200">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">Подписка на новости</h3>
              <p className="text-slate-600">
                Получайте информацию о новых технологиях и успешных проектах
              </p>
            </div>
            <div className="flex w-full lg:w-auto max-w-md">
              <Input
                type="email"
                placeholder="Ваш email"
                className="bg-white border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-blue-500"
              />
              <Button variant="default" className="ml-2 flex-shrink-0">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-slate-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-600 text-sm">
              © 2024 WESHOW. Все права защищены.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-slate-600 hover:text-blue-500 transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="text-slate-600 hover:text-blue-500 transition-colors">
                Условия использования
              </Link>
              <a href="/sitemap" className="text-slate-600 hover:text-blue-500 transition-colors">
                Карта сайта
              </a>
            </div>
          </div>
        </div>

        {/* Quick Contact CTAs */}
        <div className="pb-8">
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold mb-1 text-slate-900">Готовы начать проект?</h4>
                <p className="text-slate-600 text-sm">
                  Свяжитесь с нами для бесплатной консультации
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="default" size="sm">
                  Заказать звонок
                </Button>
                <Button variant="outline" size="sm">
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