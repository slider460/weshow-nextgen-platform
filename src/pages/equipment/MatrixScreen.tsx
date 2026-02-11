import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { ArrowLeft, ArrowRight, Monitor, Zap, CheckCircle, Settings, Power } from "lucide-react";
import { Link } from "react-router-dom";

const MatrixScreen = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px] bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Scalelike Matrix</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Модульная световая матрица с интегрированным контроллером, управляемая через Art-Net, DMX и sACN
            </p>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Описание оборудования</h2>
            <p className="text-lg text-slate-700 mb-4">
              Scalelike Matrix — это модульная и масштабируемая световая матрица с интегрированным контроллером, 
              управляемая через Art-Net, DMX и sACN. Каждый модуль размером 250 x 250 мм содержит 9 квадратных линз (3 x 3), 
              изготовленных из нержавеющей стали, устойчивых к пыли и отпечаткам пальцев, и легко очищаемых.
            </p>
            <p className="text-lg text-slate-700 mb-4">
              RGB-светодиоды установлены с обеих сторон, а угол наклона составляет 60° с переменной скоростью в зависимости от кривизны. 
              Модули размещены в корпусе размером 500 x 500 мм, который вмещает 4 модуля с помощью задних панелей с магнитными креплениями.
            </p>
            <p className="text-lg text-slate-700">
              Принцип работы основан на наклоне линзы, на задней поверхности которой расположены светодиоды; 
              конечный эффект — анимированная сценография с глубиной. Идеально подходит для создания сценографии в торговых центрах, 
              на выставках и ночных турах, добавляя очарование и атмосферу с уникальными световыми эффектами.
            </p>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8">Технические характеристики</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <Power className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Рабочее напряжение</h3>
                  <p className="text-slate-600">110–220 В AC</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Zap className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Мощность</h3>
                  <p className="text-slate-600">180 Вт</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Monitor className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Тип светодиодов</h3>
                  <p className="text-slate-600">2835 RGB</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Срок службы светодиодов</h3>
                  <p className="text-slate-600">50 000 часов</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Settings className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Режим управления</h3>
                  <p className="text-slate-600">Art-Net / DMX / sACN</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Monitor className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Размер модуля</h3>
                  <p className="text-slate-600">250 x 250 мм (9 линз 3x3)</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Monitor className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Размер корпуса</h3>
                  <p className="text-slate-600">500 x 500 x 120 мм</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Zap className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Вес корпуса</h3>
                  <p className="text-slate-600">11 кг</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Угол наклона</h3>
                  <p className="text-slate-600">60° с переменной скоростью</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Settings className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Каскадирование</h3>
                  <p className="text-slate-600">До 255 корпусов</p>
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
                <p className="text-slate-700">Широкодиапазонный блок питания</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Вход сигнала DMX</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Интегрированный дизайн контроллера, простое и удобное управление</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Автоматическая калибровка (сброс) после включения питания</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Кнопка однократного кодирования для автоматического завершения адресного кодирования</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Угол наклона 60° может контролироваться произвольно, а скорость изменяется</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Управление сигналом DMX: несколько устройств могут быть подключены последовательно</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Может работать с программным обеспечением Art-Net (MAD-SHOW, MADRIX) и поддерживает офлайн-использование</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-slate-700">Возможность онлайн-обновления</p>
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

export default MatrixScreen;




