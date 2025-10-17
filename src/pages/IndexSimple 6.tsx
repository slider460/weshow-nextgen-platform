import { useState } from "react";

const IndexSimple = () => {
  const [isShowreelModalOpen, setIsShowreelModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Простой Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-black text-2xl">W</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">WESHOW</h1>
                <p className="text-sm text-gray-600">Мультимедийные решения</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-700 hover:text-blue-600">Главная</a>
              <a href="/portfolio" className="text-gray-700 hover:text-blue-600">Портфолио</a>
              <a href="/services" className="text-gray-700 hover:text-blue-600">Услуги</a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600">Контакты</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="space-y-0 overflow-x-hidden">
        {/* Простая Hero секция */}
        <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              WESHOW
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Комплексные мультимедийные решения для бизнеса
            </p>
            <div className="space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Получить консультацию
              </button>
              <button 
                onClick={() => setIsShowreelModalOpen(true)}
                className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Смотреть шоурил
              </button>
            </div>
          </div>
        </section>

        {/* Простая секция услуг */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
              Наши услуги
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎥</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Мультимедиа</h3>
                <p className="text-gray-600">Проекционное оборудование и интерактивные решения</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Разработка</h3>
                <p className="text-gray-600">Веб-платформы и мобильные приложения</p>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Дизайн</h3>
                <p className="text-gray-600">UI/UX дизайн и брендинг</p>
              </div>
            </div>
          </div>
        </section>

        {/* Простая секция портфолио */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
              Наши проекты
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-2xl">Проект {i}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">Название проекта {i}</h3>
                    <p className="text-gray-600 text-sm mt-1">Описание проекта</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Простая секция контактов */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
              Свяжитесь с нами
            </h2>
            <div className="max-w-2xl mx-auto">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ваше сообщение"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Простой Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-black text-2xl">W</span>
              </div>
              <h3 className="text-2xl font-bold">WESHOW</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Комплексные мультимедийные решения для бизнеса
            </p>
            <div className="flex justify-center space-x-6">
              <a href="/portfolio" className="text-gray-400 hover:text-white">Портфолио</a>
              <a href="/services" className="text-gray-400 hover:text-white">Услуги</a>
              <a href="/contact" className="text-gray-400 hover:text-white">Контакты</a>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              © 2024 WESHOW. Все права защищены.
            </p>
          </div>
        </div>
      </footer>

      {/* Простой модал */}
      {isShowreelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Шоурил WESHOW</h3>
              <button 
                onClick={() => setIsShowreelModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Видео шоурила</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexSimple;


