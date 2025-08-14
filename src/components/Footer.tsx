import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight, Facebook, Twitter, Instagram, Linkedin, Youtube, Clock, Globe } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const services = [
    { name: "Мультимедийные решения", href: "/services/multimedia" },
    { name: "Разработка ПО и игр", href: "/services/development" },
    { name: "Техническое сопровождение", href: "/services/technical-support" },
    { name: "Дизайн и брендинг", href: "/services/design" },
    { name: "Комплексные решения", href: "/services/complex-solutions" },
    { name: "Аренда оборудования", href: "/equipment" }
  ];

  const company = [
    { name: "О компании", href: "/about" },
    { name: "Команда", href: "/team" },
    { name: "Портфолио", href: "/portfolio" },
    { name: "Блог", href: "/blog" },
    { name: "Карьера", href: "/careers" },
    { name: "Новости", href: "/news" }
  ];

  const support = [
    { name: "Контакты", href: "/contact" },
    { name: "Техподдержка", href: "/services/technical-support" },
    { name: "Оборудование", href: "/equipment" },
    { name: "Портфолио", href: "/portfolio" },
    { name: "Команда", href: "/team" }
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">W</span>
              </div>
              <span className="text-3xl font-bold text-white">WESHOW</span>
            </div>
            
            <p className="text-slate-300 mb-8 max-w-md leading-relaxed text-lg">
              Ведущая компания в области комплексных мультимедийных технологий, 
              технической интеграции и организации мероприятий для B2B сегмента.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Phone className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-slate-300 text-sm">Телефон</div>
                  <a href="tel:+74955807537" className="text-white font-medium hover:text-blue-400 transition-colors">
                    +7 (495) 580-75-37
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <Mail className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-slate-300 text-sm">Email</div>
                  <a href="mailto:info@weshow.ru" className="text-white font-medium hover:text-purple-400 transition-colors">
                    info@weshow.ru
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors">
                  <MapPin className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-slate-300 text-sm">Адрес</div>
                  <div className="text-white font-medium">
                    Москва, ул. Рочдельская, 14А
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <Clock className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-slate-300 text-sm">Время работы</div>
                  <div className="text-white font-medium">
                    Пн-Пт: 9:00-18:00
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-slate-300 text-sm font-medium mb-4">Мы в соцсетях</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-slate-700/50 hover:bg-blue-500/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-slate-300 group-hover:text-blue-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-slate-700 pb-2">
              Услуги
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.href} 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-slate-700 pb-2">
              Компания
            </h3>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href} 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white border-b border-slate-700 pb-2">
              Поддержка
            </h3>
            <ul className="space-y-3">
              {support.map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.href} 
                    className="text-slate-300 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="py-12 border-t border-slate-700/50">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-slate-700/50">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold mb-3 text-white">
                  📧 Подписка на новости
                </h3>
                <p className="text-slate-300 max-w-md">
                  Получайте информацию о новых технологиях, успешных проектах и эксклюзивных предложениях
                </p>
              </div>
              <div className="flex w-full lg:w-auto max-w-md space-x-3">
                <Input 
                  type="email" 
                  placeholder="Ваш email" 
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20" 
                />
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 px-6"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6 text-sm">
              <div className="text-slate-400">
                © {currentYear} WESHOW. Все права защищены.
              </div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Globe className="h-4 w-4" />
                <span>RU</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link to="/privacy" className="text-slate-400 hover:text-blue-400 transition-colors">
                Политика конфиденциальности
              </Link>
              <Link to="/terms" className="text-slate-400 hover:text-blue-400 transition-colors">
                Условия использования
              </Link>
              <Link to="/sitemap" className="text-slate-400 hover:text-blue-400 transition-colors">
                Карта сайта
              </Link>
              <Link to="/cookies" className="text-slate-400 hover:text-blue-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;