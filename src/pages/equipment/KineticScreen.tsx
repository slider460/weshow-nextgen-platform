import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEOHead from "../../components/SEOHead";
import ConsultationModal from "../../components/ConsultationModal";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../components/ui/breadcrumb";
import {
  ArrowRight, Monitor, Zap, CheckCircle, Settings, Power, Move,
  Presentation, Building2, Landmark, ShoppingBag, Rocket, Eye,
  Users, TrendingUp, Clock, Palette, Headset, Play, Star, ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";

const KineticScreen = () => {
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  const useCases = [
    { icon: Presentation, title: "Выставочные стенды", desc: "Привлечение внимания на выставках и форумах. Гарантированный WOW-эффект среди конкурентов." },
    { icon: Building2, title: "Корпоративные мероприятия", desc: "Эффектные презентации продуктов, запуски брендов и внутренние конференции." },
    { icon: Landmark, title: "Музеи и инсталляции", desc: "Интерактивные экспозиции, арт-инсталляции и образовательные проекты." },
    { icon: ShoppingBag, title: "Ритейл и шоурумы", desc: "Витрины нового поколения для привлечения покупателей и демонстрации продукции." },
    { icon: Rocket, title: "Презентации продуктов", desc: "Запускайте продукты с максимальным вниманием. Кинетический экран усилит любую презентацию." },
  ];

  const benefits = [
    { icon: Eye, title: "Гарантированное внимание", desc: "Движущиеся пиксели невозможно не заметить — 100% посетителей обращают внимание" },
    { icon: Star, title: "WOW-эффект", desc: "Незабываемые впечатления для гостей, которые увеличивают лояльность к бренду" },
    { icon: Clock, title: "+40% времени у стенда", desc: "Посетители проводят значительно больше времени, наблюдая за динамическим контентом" },
    { icon: Palette, title: "Полная кастомизация", desc: "Любой контент, любые анимации — мы адаптируем экран под ваш бренд и задачи" },
    { icon: TrendingUp, title: "Измеримый ROI", desc: "Увеличение конверсии в лиды на мероприятиях благодаря привлечению целевой аудитории" },
    { icon: Headset, title: "Техподдержка 24/7", desc: "Наша команда обеспечивает полное сопровождение на протяжении всего мероприятия" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Кинетический экран — WESHOW"
        description="Кинетический экран: движущиеся пиксели до 20 см, 3D-визуализация и интерактив. Аренда и интеграция. WESHOW."
        url="https://weshow.su/equipment/kinetic-screen"
        breadcrumbs={[
          { name: 'Главная', url: 'https://weshow.su/' },
          { name: 'Оборудование', url: 'https://weshow.su/equipment' },
          { name: 'Кинетический экран', url: 'https://weshow.su/equipment/kinetic-screen' }
        ]}
      />
      <Header />
      <main className="pt-20">

        {/* Хлебные крошки */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-2">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/equipment">Оборудование</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Кинетический экран</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Hero Section с фото */}
        <section className="relative h-[65vh] min-h-[520px] flex items-center justify-center overflow-hidden">
          <img
            src="/portfolio/samara-vdnh/kinetick_samara.jpg"
            alt="Кинетический экран на стенде Самарской области, ВДНХ"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"></div>
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <Badge className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm text-sm">
              <Zap className="w-4 h-4 mr-2" />Инновационная технология
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight text-white drop-shadow-2xl">
              Кинетический экран
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-lg">
              Движущиеся интерактивные поверхности, способные выдвигать каждый пиксель на 20 см с программируемой скоростью
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-slate-900 hover:bg-blue-50 text-lg px-8"
                onClick={() => setIsConsultModalOpen(true)}
              >
                Получить консультацию
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white/20 text-lg px-8"
                onClick={() => {
                  const el = document.getElementById("video-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Play className="mr-2 h-5 w-5" />
                Смотреть видео
              </Button>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Что такое кинетический экран?</h2>
            <p className="text-lg text-slate-700 mb-4">
              Кинетический экран — это революционная технология визуализации, которая позволяет каждому пикселю
              физически перемещаться в пространстве на расстояние до 20 см с программируемой скоростью.
              Это создает уникальные 3D-визуальные эффекты и интерактивные возможности, недоступные традиционным дисплеям.
            </p>
            <p className="text-lg text-slate-700 mb-4">
              Каждый пиксель экрана может независимо выдвигаться и втягиваться, создавая динамические трехмерные формы и паттерны.
              Технология позволяет программировать сложные анимации, где пиксели движутся синхронно или независимо,
              создавая эффект «живого» экрана, который реагирует на контент и взаимодействует со зрителями.
            </p>
            <p className="text-lg text-slate-700">
              Идеально подходит для создания WOW-эффектов на выставках, презентациях, интерактивных инсталляциях и
              масштабных мероприятиях, где требуется привлечь внимание и создать незабываемое впечатление.
            </p>
          </div>
        </section>

        {/* Видео в действии */}
        <section id="video-section" className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-3 text-center">Кинетический экран в действии</h2>
            <p className="text-lg text-slate-600 text-center mb-8 max-w-2xl mx-auto">
              Посмотрите, как кинетический экран размером 5×3 метра работает на реальном проекте —
              стенде Самарской области на выставке «Россия» (ВДНХ)
            </p>
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-slate-900">
              <div className="aspect-video">
                <video
                  controls
                  className="w-full h-full object-contain"
                  preload="metadata"
                  poster="/portfolio/samara-vdnh/video-previews/kinetic-screen-preview.jpg"
                >
                  <source
                    src="https://www.dropbox.com/scl/fi/ujm4v27s5g8n0j0rp8nmt/3_.mp4?rlkey=bfjbizphbofe4oiyt5taf8ynn&st=4mifmnte&dl=1"
                    type="video/mp4"
                  />
                  <source
                    src="https://www.dropbox.com/scl/fi/ujm4v27s5g8n0j0rp8nmt/3_.mp4?rlkey=bfjbizphbofe4oiyt5taf8ynn&st=4mifmnte&raw=1"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Технические характеристики</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Monitor, title: "Разрешение", value: "До 4K (3840×2160)" },
                { icon: Move, title: "Ход пикселя", value: "До 20 см с программируемой скоростью" },
                { icon: Zap, title: "Скорость движения", value: "Программируемая, до 10 циклов в секунду" },
                { icon: Monitor, title: "Размер экрана", value: "До 5×3 метра (настраивается под проект)" },
                { icon: CheckCircle, title: "Интерактивность", value: "Полная поддержка touch-взаимодействия и сенсорного управления" },
                { icon: Settings, title: "Управление", value: "Программное управление через специализированное ПО" },
                { icon: Power, title: "Энергопотребление", value: "Зависит от размера и конфигурации экрана" },
                { icon: CheckCircle, title: "Точность позиционирования", value: "Высокая точность позиционирования каждого пикселя" },
              ].map((spec, i) => (
                <div key={i} className="flex items-start space-x-4 bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                  <spec.icon className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{spec.title}</h3>
                    <p className="text-slate-600">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-3 text-center">Почему кинетический экран?</h2>
            <p className="text-lg text-slate-600 text-center mb-10 max-w-2xl mx-auto">
              Технология, которая выделит ваш проект среди конкурентов
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((b, i) => (
                <Card key={i} className="shadow-md hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-white to-slate-50">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                      <b.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{b.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Сценарии применения */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-3 text-center">Сценарии применения</h2>
            <p className="text-lg text-slate-600 text-center mb-10 max-w-2xl mx-auto">
              Кинетический экран адаптируется под любые задачи и форматы мероприятий
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((uc, i) => (
                <div
                  key={i}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <uc.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{uc.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Реальный кейс */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Реальный проект</h2>
            <Card className="shadow-xl overflow-hidden border-0">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative aspect-[4/3] lg:aspect-auto">
                    <img
                      src="/portfolio/samara-vdnh/kinetick_samara.jpg"
                      alt="Кинетический экран на стенде Самарской области"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-blue-600 text-white border-0">Кейс 2024</Badge>
                    </div>
                  </div>
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-3">
                      Стенд Самарской области на выставке «Россия»
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      Кинетический экран размером 5×3 метра стал центральным элементом стенда Самарской области
                      на международной выставке-форуме «Россия» на ВДНХ. Экран демонстрировал 3D-контент
                      о достижениях региона, привлекая внимание миллионов посетителей.
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <div className="text-2xl font-bold text-blue-600">18 млн+</div>
                        <div className="text-xs text-slate-600 mt-1">Посетителей</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <div className="text-2xl font-bold text-green-600">5×3 м</div>
                        <div className="text-xs text-slate-600 mt-1">Размер экрана</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-xl">
                        <div className="text-2xl font-bold text-purple-600">8 мес</div>
                        <div className="text-xs text-slate-600 mt-1">Работы</div>
                      </div>
                    </div>
                    <Button asChild variant="outline" className="w-fit">
                      <Link to="/portfolio/samara-stand-vdnh">
                        Подробнее о проекте
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Особенности */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Особенности технологии</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Каждый пиксель может двигаться независимо",
                "Программируемая скорость движения пикселей",
                "Создание трехмерных визуальных эффектов в реальном времени",
                "Интерактивное управление через touch-интерфейс",
                "Высокая точность позиционирования каждого элемента",
                "Масштабируемость под размер проекта",
                "Синхронизация с аудио и видео контентом",
                "Возможность создания сложных анимационных последовательностей",
              ].map((feat, i) => (
                <div key={i} className="flex items-start space-x-3 bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-700">{feat}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
          <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-5 text-white">Готовы удивить вашу аудиторию?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Наши специалисты помогут подобрать оптимальное решение кинетического экрана для вашего мероприятия —
              от концепции до реализации
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8"
                onClick={() => setIsConsultModalOpen(true)}
              >
                <Users className="mr-2 h-5 w-5" />
                Получить консультацию
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white bg-transparent hover:bg-white/20 text-lg px-8"
                asChild
              >
                <Link to="/portfolio/samara-stand-vdnh">
                  Посмотреть кейс
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <ConsultationModal
        isOpen={isConsultModalOpen}
        onClose={() => setIsConsultModalOpen(false)}
      />
    </div>
  );
};

export default KineticScreen;
