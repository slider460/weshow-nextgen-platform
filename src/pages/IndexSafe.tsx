import { useState } from "react";
import HeaderSafe from "../components/HeaderSafe";
import { Button } from "../components/ui/button";
import { Play, ArrowRight, Sparkles, Zap, Star, Monitor, Code, Settings, Calendar, Package, Palette, Layers, ShoppingCart, Cog, Video, Users, Gamepad2, Smartphone, Globe, Zap as ZapIcon, Shield, Wrench, Headphones, Database, Phone, Building2, Hammer, Puzzle, Sparkles as SparklesIcon, Eye, Projector, Lightbulb, Box, Grid3X3, Move, View, Info } from "lucide-react";

const IndexSafe = () => {
  const [isShowreelModalOpen, setIsShowreelModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <HeaderSafe />
      
      <main className="space-y-0 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          
          <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                WESHOW
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
                Комплексные мультимедийные решения для бизнеса. 
                Создаем интерактивные инсталляции, проекционный маппинг и цифровые платформы.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Получить консультацию
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => setIsShowreelModalOpen(true)}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                <Play className="mr-2 w-5 h-5" />
                Смотреть шоурил
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">500+ проектов</h3>
                <p className="text-gray-300">Успешно реализованных</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">10+ лет</h3>
                <p className="text-gray-300">Опыта работы</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100%</h3>
                <p className="text-gray-300">Довольных клиентов</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Наши услуги
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Полный спектр мультимедийных решений для вашего бизнеса
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="group p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Мультимедиа решения</h3>
                <p className="text-gray-600 mb-6">
                  LED-видеостены, проекторы, звуковое оборудование и интерактивные инсталляции
                </p>
                <Button variant="outline" className="group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                  Подробнее
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              
              <div className="group p-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Разработка</h3>
                <p className="text-gray-600 mb-6">
                  Веб-платформы, мобильные приложения, AR/VR решения и кроссплатформенная разработка
                </p>
                <Button variant="outline" className="group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600">
                  Подробнее
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
              
              <div className="group p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Дизайн</h3>
                <p className="text-gray-600 mb-6">
                  UI/UX дизайн, брендинг, 3D-визуализация и создание интерактивных интерфейсов
                </p>
                <Button variant="outline" className="group-hover:bg-purple-600 group-hover:text-white group-hover:border-purple-600">
                  Подробнее
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Наши проекты
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Примеры успешно реализованных проектов
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 text-center text-white">
                      <Video className="w-16 h-16 mx-auto mb-4 opacity-80" />
                      <h3 className="text-2xl font-bold">Проект {i}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Название проекта {i}</h3>
                    <p className="text-gray-600 mb-4">Краткое описание проекта и его особенностей</p>
                    <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600">
                      Подробнее
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Готовы начать проект?
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Свяжитесь с нами для обсуждения ваших задач
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Контакты</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Phone className="w-6 h-6 text-blue-600" />
                      <span className="text-gray-700">+7 (495) 123-45-67</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Mail className="w-6 h-6 text-blue-600" />
                      <span className="text-gray-700">info@weshow.ru</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Building2 className="w-6 h-6 text-blue-600" />
                      <span className="text-gray-700">Москва, ул. Примерная, 123</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Быстрая заявка</h3>
                  <form className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Ваше имя"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input 
                      type="email" 
                      placeholder="Email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea 
                      rows={4}
                      placeholder="Сообщение"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold">
                      Отправить заявку
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-black text-2xl">W</span>
                </div>
                <span className="text-2xl font-bold">WESHOW</span>
              </div>
              <p className="text-gray-400 mb-6">
                Комплексные мультимедийные решения для бизнеса
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2">
                <li><a href="/services/multimedia" className="text-gray-400 hover:text-white transition-colors">Мультимедиа</a></li>
                <li><a href="/services/development" className="text-gray-400 hover:text-white transition-colors">Разработка</a></li>
                <li><a href="/services/design" className="text-gray-400 hover:text-white transition-colors">Дизайн</a></li>
                <li><a href="/services/equipment-rental" className="text-gray-400 hover:text-white transition-colors">Аренда оборудования</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Компания</h3>
              <ul className="space-y-2">
                <li><a href="/portfolio" className="text-gray-400 hover:text-white transition-colors">Портфолио</a></li>
                <li><a href="/team" className="text-gray-400 hover:text-white transition-colors">Команда</a></li>
                <li><a href="/news" className="text-gray-400 hover:text-white transition-colors">Новости</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-white transition-colors">Блог</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Контакты</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">+7 (495) 123-45-67</li>
                <li className="text-gray-400">info@weshow.ru</li>
                <li className="text-gray-400">Москва, ул. Примерная, 123</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 WESHOW. Все права защищены.
            </p>
          </div>
        </div>
      </footer>

      {/* Showreel Modal */}
      {isShowreelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold text-gray-900">Шоурил WESHOW</h3>
              <button 
                onClick={() => setIsShowreelModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl"
              >
                ×
              </button>
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Видео шоурила</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexSafe;

