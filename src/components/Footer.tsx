import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  Phone, 
  Mail, 
  MapPin,
  Youtube,
  ArrowUp,
  Send
} from "lucide-react";
import { Button } from "./ui/button";
import { subscriptionSuccessMessage, submitForm } from "../utils/submitForm";

// WhatsApp Icon SVG
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// Telegram Icon SVG
const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.12l-6.87 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitForm("Подписка", { email });
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Ошибка отправки");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 text-gray-300 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="lg:col-span-3">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-black text-2xl tracking-tight">W</span>
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-30"></div>
              </div>
              <div>
                <div className="flex items-center">
                  <span className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">
                    WE
                  </span>
                  <span className="text-2xl font-black bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-tight">
                    SHOW
                  </span>
                </div>
                <div className="text-sm text-gray-400 tracking-wide">NextGen Agency</div>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Современные мультимедийные решения для ваших мероприятий. Создаем незабываемые впечатления с помощью передовых технологий.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://wa.me/74955807537" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-[#25D366] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a 
                href="https://t.me/weshow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-[#0088cc] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="Telegram"
              >
                <TelegramIcon className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a 
                href="https://www.youtube.com/@weshow" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-4">Разделы</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Услуги
                </Link>
              </li>
              <li>
                <Link 
                  to="/portfolio" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Портфолио
                </Link>
              </li>
              <li>
                <Link 
                  to="/team" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Команда
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Контакты
                </Link>
              </li>
              <li>
                <Link
                  to="/tetris"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  🎮 Играть в Тетрис
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-semibold text-lg mb-4">Услуги</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Колонка 1: Контент и продакшн */}
              <div>
                <h4 className="text-white font-medium text-sm mb-3 uppercase tracking-wider">Контент и продакшн</h4>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      to="/services/multimedia-content" 
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      Мультимедийный контент
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/video-production" 
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      Видеопродакшн
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Колонка 2: Разработка и инсталляции */}
              <div>
                <h4 className="text-white font-medium text-sm mb-3 uppercase tracking-wider">Разработка и инсталляции</h4>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      to="/services/software-and-games" 
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      ПО и игры для мероприятий
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/multimedia-installations" 
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      Мультимедийные инсталляции
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Колонка 3: Оборудование и стенды */}
              <div>
                <h4 className="text-white font-medium text-sm mb-3 uppercase tracking-wider">Оборудование и стенды</h4>
                <ul className="space-y-2">
                  <li>
                    <Link 
                      to="/services/rental-multimedia-equipment" 
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      Аренда мультимедийного оборудования
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/services/technological-exhibition-stands" 
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      Технологичные выставочные стенды
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-lg mb-4">Подпишитесь на рассылку</h3>
            <p className="text-gray-400 text-sm mb-6">
              Получайте последние новости о наших проектах, технологиях и специальных предложениях.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col gap-3">
                <label className="sr-only" htmlFor="footer-email">
                  Email
                </label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Введите ваш email"
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || submitted}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitted ? (
                    <>
                      <span>✓</span>
                      <span>Подписка оформлена</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Подписаться</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
            {submitted && (
              <p className="text-green-400 text-sm mt-2">
                {subscriptionSuccessMessage}
              </p>
            )}
            {submitError && (
              <p className="text-red-400 text-sm mt-2">
                {submitError}
              </p>
            )}
            
            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-4 w-4 text-gray-500" />
                <a href="tel:+74955807537" className="hover:text-white transition-colors duration-300">
                  +7 (495) 580-75-37
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4 text-gray-500" />
                <a href="mailto:info@weshow.su" className="hover:text-white transition-colors duration-300">
                  info@weshow.su
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>Москва, ул. Рочдельская, 14А</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} WESHOW. Все права защищены.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6 mx-auto group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </footer>
  );
};

export default Footer;
