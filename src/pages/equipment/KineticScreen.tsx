import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { ArrowLeft, ArrowRight, Monitor, Zap, CheckCircle, Settings, Power, Move } from "lucide-react";
import { Link } from "react-router-dom";

const KineticScreen = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Кинетический экран</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Движущиеся интерактивные поверхности, способные выдвигать каждый пиксель на 20 см с программируемой скоростью
            </p>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Описание оборудования</h2>
            <p className="text-lg text-slate-700 mb-4">
              Кинетический экран — это революционная технология визуализации, которая позволяет каждому пикселю 
              физически перемещаться в пространстве на расстояние до 20 см с программируемой скоростью. 
              Это создает уникальные 3D-визуальные эффекты и интерактивные возможности, недоступные традиционным дисплеям.
            </p>
            <p className="text-lg text-slate-700 mb-4">
              Каждый пиксель экрана может независимо выдвигаться и втягиваться, создавая динамические трехмерные формы и паттерны. 
              Технология позволяет программировать сложные анимации, где пиксели движутся синхронно или независимо, 
              создавая эффект "живого" экрана, который реагирует на контент и взаимодействует со зрителями.
            </p>
            <p className="text-lg text-slate-700">
              Идеально подходит для создания WOW-эффектов на выставках, презентациях, интерактивных инсталляциях и 
              масштабных мероприятиях, где требуется привлечь внимание и создать незабываемое впечатление.
            </p>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Технические характеристики</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <Monitor className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Разрешение</h3>
                  <p className="text-slate-600">До 4K (3840×2160)</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Move className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Ход пикселя</h3>
                  <p className="text-slate-600">До 20 см с программируемой скоростью</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Zap className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Скорость движения</h3>
                  <p className="text-slate-600">Программируемая, до 10 циклов в секунду</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Monitor className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Размер экрана</h3>
                  <p className="text-slate-600">До 5×3 метра (настраивается под проект)</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Интерактивность</h3>
                  <p className="text-slate-600">Полная поддержка touch-взаимодействия и сенсорного управления</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Settings className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Управление</h3>
                  <p className="text-slate-600">Программное управление через специализированное ПО</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Power className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Энергопотребление</h3>
                  <p className="text-slate-600">Зависит от размера и конфигурации экрана</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Точность позиционирования</h3>
                  <p className="text-slate-600">Высокая точность позиционирования каждого пикселя</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Особенности</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Каждый пиксель может двигаться независимо</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Программируемая скорость движения пикселей</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Создание трехмерных визуальных эффектов в реальном времени</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Интерактивное управление через touch-интерфейс</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Высокая точность позиционирования каждого элемента</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Масштабируемость под размер проекта</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Синхронизация с аудио и видео контентом</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Возможность создания сложных анимационных последовательностей</p>
              </div>
            </div>
          </div>
        </section>

        {/* Примеры использования — скрыто, пока нет фото */}

        {/* CTA Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">Готовы начать проект?</h2>
            <p className="text-lg text-slate-600 mb-8">
              Наши специалисты помогут подобрать оптимальное решение для вашего мероприятия
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contact">
                  Получить консультацию
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Вернуться на главную
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default KineticScreen;

