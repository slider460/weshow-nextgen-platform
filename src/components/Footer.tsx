import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  ArrowUp,
  Heart,
  Sparkles,
  Zap,
  Star
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-pattern-dots opacity-5"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">W</span>
                </div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    ESHOW
                  </div>
                  <div className="text-sm text-slate-400">NextGen Platform</div>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                Создаем будущее мультимедийных технологий. Инновационные решения для вашего бизнеса с 15+ летним опытом.
              </p>
              
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <Facebook className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <Twitter className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <Instagram className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <Linkedin className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                  <Youtube className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Быстрые ссылки</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/about" 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    О компании
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services" 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Услуги
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/portfolio" 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-pink-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Проекты
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/team" 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Команда
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/careers" 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-yellow-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Карьера
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/news" 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-cyan-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Новости
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Услуги</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/services/multimedia" 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Мультимедиа
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/development" 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-purple-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Разработка
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/design" 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-pink-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Дизайн
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/equipment-rental" 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-yellow-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Аренда
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/complex-solutions" 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-orange-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Комплексные решения
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/services/technical-support" 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-green-500 rounded-full mr-3 group-hover:scale-150 transition-transform duration-300"></span>
                    Поддержка
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact & Hours Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 pt-16 border-t border-slate-700/50">
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Контакты</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-slate-300 font-medium">Телефон</div>
                    <a href="tel:+74955807537" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                      +7 (495) 580-75-37
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-slate-300 font-medium">Email</div>
                    <a href="mailto:info@weshow.ru" className="text-slate-400 hover:text-purple-400 transition-colors duration-300">
                      info@weshow.ru
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600/20 to-cyan-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-slate-300 font-medium">Адрес</div>
                    <div className="text-slate-400">
                      Москва, ул. Рочдельская, 14А
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Режим работы</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-slate-300 font-medium">Рабочие дни</div>
                    <div className="text-slate-400">Пн-Пт: 9:00 - 21:00</div>
                    <div className="text-slate-400">Сб-Вс: 10:00 - 18:00</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-slate-300 font-medium">Экстренная поддержка</div>
                    <div className="text-slate-400">24/7 для критических проектов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700/50 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2 text-slate-400">
              <span>© {currentYear} WESHOW. Все права защищены.</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>Сделано с любовью</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link to="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                Условия использования
              </Link>
              <Link to="/cookies" className="text-slate-400 hover:text-blue-400 transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6 mx-auto group-hover:-translate-y-1 transition-transform duration-300" />
      </button>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="absolute top-40 left-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-40 right-32 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce-slow"></div>
    </footer>
  );
};

export default Footer;