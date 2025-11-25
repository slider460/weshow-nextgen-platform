import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import DarkVeil from "../components/DarkVeil";
import { Highlighter } from "../components/ui/highlighter";
import { HeroVideoDialog } from "../components/ui/hero-video-dialog";

const CaseSamaraExhibition: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950/90 px-4 sm:px-8 py-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 opacity-70"><DarkVeil speed={0.3} scanlineIntensity={0.08} scanlineFrequency={0.03} noiseIntensity={0.02} /></div>
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[10px]">🏛️</span>
                Проект 2024-2025
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Выставка «Самара»
                <br />
                <span className="text-blue-400">в Музее им. П.В. Алабина</span>
              </h1>
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Calendar className="w-4 h-4" /> Ноябрь 2024 — Январь 2025
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <MapPin className="w-4 h-4" /> Самара, Музей им. П.В. Алабина
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Users className="w-4 h-4" /> 3 месяца работы
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* О проекте */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">О проекте</h2>
          <Card className="shadow-lg mb-8">
            <CardContent className="p-6">
              <p className="text-slate-700 mb-4">
                <Highlighter action="highlight" color="#bfdbfe" strokeWidth={2}>Выставка «Самара»</Highlighter> – это продолжение масштабного проекта <Highlighter action="underline" color="#3b82f6" strokeWidth={2}>«Россия»</Highlighter> с ВДНХ в Москве. Она знакомит жителей и туристов с историей, достижениями, современным развитием и перспективными проектами Самарской области.
              </p>
              <p className="text-slate-700 mb-4">
                Каждое муниципальное образование области представило свои достопримечательности, культурные и производственные достижения. Посетители могут познакомиться с богатым наследием региона через современные интерактивные технологии.
              </p>
              <p className="text-slate-700 mb-0">
                Выставка открывалась в два этапа: <strong>предоткрытие состоялось 27 сентября 2024</strong>, полномасштабное открытие произошло <strong>4 ноября 2024</strong>. <strong>30 января 2025</strong> состоялось торжественное закрытие.
              </p>
            </CardContent>
          </Card>

          {/* Информация о проекте */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Инициатор</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">Губернатор Самарской области Вячеслав Федорищев</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Место проведения</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">Музей им. П.В. Алабина, ул. Ленинская, 142</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Период работы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">3 месяца (ноябрь 2024 — январь 2025)</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Статус</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">Завершённый проект</p>
              </CardContent>
            </Card>
          </div>

          {/* Главный плейсхолдер видео */}
          <Card className="shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video">
                <HeroVideoDialog
                  animationStyle="from-center"
                  thumbnailSrc="/portfolio/samara-exhibition/video-previews/Cadr_vistavca_Samara.jpg"
                  thumbnailAlt="Главный видеоролик о выставке 'Самара', показывающий экспозицию и интерактив"
                  videoSrc="https://www.dropbox.com/scl/fi/3yhjl1ls6jj2tw2kqgz0o/Obzor_Samara.mp4?rlkey=qm6q92rwde82l08o949weglql&st=0cgz764n&raw=1"
                  useVideoTag
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Концепция */}
      <section className="py-14 bg-slate-50">
        <div className="container mx-auto px-4 text-center text-gray-600 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl mb-6">Концепция</h2>
            <p className="mt-3 mb-8">
              Выставка была построена в музее Алабина в городе Самара. Мы полностью сохранили стилистику стенда Самарской области на ВДНХ, но интегрировали ее в новое пространство.
            </p>
            <p className="mb-0">
              Инновационный подход к презентации региона через современные мультимедийные технологии позволил создать уникальный интерактивный опыт для посетителей.
            </p>
          </div>
        </div>
      </section>

      {/* Мультимедиа на выставке Самара */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Мультимедиа на выставке Самара</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Экран-парус для демонстрации 3D контента</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  Изогнутый экран в виде паруса демонстрирует 3D контент, создавая впечатляющий визуальный эффект и рассказывая историю Самарской области через современные технологии.
                </p>
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img 
                    src="/portfolio/samara-exhibition/photos/Ekran_parus.jpg" 
                    alt="Фото экрана-паруса с 3D контентом" 
                    className="w-full h-full object-cover"
                    onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Панели для игры с помощью камеры Kinect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  Интерактивные панели с камерой Kinect позволяли посетителям играть в спортивные игры: футбол с ФК «Крылья Советов», баскетбол с БК «Самара», хоккей с ХК «Лада». Управление происходило через жесты.
                </p>
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img 
                    src="/portfolio/samara-exhibition/photos/Game_kinect.jpg" 
                    alt="Фото панелей с камерой Kinect" 
                    className="w-full h-full object-cover"
                    onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Информационные тач-панели</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  Тач-панели предоставляли информацию о проектах министерств, позволяли участвовать в голосованиях и розыгрышах, создавая интерактивный формат взаимодействия с контентом.
                </p>
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img 
                    src="/portfolio/samara-exhibition/photos/Inform_samara.jpg" 
                    alt="Фото информационных тач-панелей" 
                    className="w-full h-full object-cover"
                    onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>VR очки для виртуального кинотеатра</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  5 комплектов VR очков позволяли посетителям просматривать ролики о Самарской области в виртуальном кинотеатре, создавая полное погружение в виртуальные миры региона.
                </p>
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img 
                    src="/portfolio/samara-exhibition/photos/VR_Samara.jpg" 
                    alt="Фото VR очков для виртуального кинотеатра" 
                    className="w-full h-full object-cover"
                    onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>LED экран в зоне лектория</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  LED экран поддерживал проведение презентаций, мастер-классов, выступлений и официальных мероприятий первых лиц, создавая профессиональную площадку для различных событий.
                </p>
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img 
                    src="/portfolio/samara-exhibition/photos/LED_Lector_Samara.jpg" 
                    alt="Фото LED экрана в зоне лектория" 
                    className="w-full h-full object-cover"
                    onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Кинетический экран</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  Экран, способный выдвигать каждый пиксель на 20 см с программируемой скоростью, использовался для демонстрации кинетического видеоконтента. Технология создавала динамичные визуальные эффекты, привлекая внимание посетителей и демонстрируя инновационные возможности мультимедийных решений.
                </p>
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img 
                    src="/portfolio/samara-vdnh/kinetick_samara.jpg" 
                    alt="Фото кинетического экрана" 
                    className="w-full h-full object-cover"
                    onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Прозрачный телевизор</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  Прозрачный телевизор организовал мультимедийную витрину, где каждый муниципалитет выставлял свои достижения, создавая наглядную презентацию региональных проектов.
                </p>
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img 
                    src="/portfolio/samara-exhibition/photos/transparent-tv.jpg" 
                    alt="Фото прозрачного телевизора" 
                    className="w-full h-full object-cover"
                    onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Горизонтальная панель с расписанием</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  Выполненная на базе Unity, панель обновлялась ежедневно, сразу после формирования плана мероприятий на следующий день, обеспечивая актуальную информацию для посетителей.
                </p>
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img 
                    src="/portfolio/samara-vdnh/Inform_panel_Samara.jpg" 
                    alt="Фото горизонтальной панели с расписанием" 
                    className="w-full h-full object-cover"
                    onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Песня виртуального маскота Ладушки */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Песня виртуального маскота Ладушки</h2>
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle>Проект виртуального маскота</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4">
                Был реализован проект, где мы разработали виртуального маскота, который спел песню про Самарскую область. Для видеоряда мы использовали отснятые кадры с красотами Самарской области, создавая эмоциональную связь с регионом.
              </p>
              <div className="aspect-video rounded-lg overflow-hidden">
                <HeroVideoDialog
                  animationStyle="from-center"
                  thumbnailSrc="/portfolio/samara-vdnh/Cadr_ladushca.jpg"
                  thumbnailAlt="Видеоклип с песней виртуального маскота Ладушки"
                  videoSrc="https://www.dropbox.com/scl/fi/9mh75591pendioh3aywnf/Samara_ladushca.mp4?rlkey=g1wsoitwilioyx6i1wvoyzacr&st=jdlbq5ji&raw=1"
                  useVideoTag
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ключевые особенности */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ключевые особенности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🥽 Виртуальная реальность</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">5 комплектов VR очков для погружения в виртуальные миры Самарского региона</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🤖 Робот Ладушка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">Интерактивный робот, ранее встречавший гостей павильона «Россия» на ВДНХ</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📱 Мультимедийные технологии</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">Современные интерактивные дисплеи и цифровые решения</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🗺️ 5 тематических зон</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">Разделение экспозиции по направлениям развития региона</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🧭 Туристическая навигация</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">Система навигации с путеводителями и рекомендациями</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎭 Тематические дни</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">Еженедельные презентации городов и районов Самарской области</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🎟️ Свободный вход</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">Доступна для всех категорий посетителей без ограничений</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📊 Интерактивные голосования</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">Участие посетителей в голосованиях и розыгрышах</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Благодарственное письмо */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Результаты и достижения</h2>
          <Card>
            <CardHeader>
              <CardTitle>Благодарственное письмо</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4">
                За успешную реализацию проекта было получено благодарственное письмо от министерства Самарской области, подтверждающее высокое качество работы и положительный отклик от посетителей.
              </p>
              <div className="rounded-lg overflow-visible bg-slate-100 border border-slate-200 p-6">
                <img 
                  src="/portfolio/samara-exhibition/photos/Samara_premia.jpg" 
                  alt="Скан/фото благодарственного письма от министерства Самарской области" 
                  className="w-full max-w-[90%] h-auto object-contain mx-auto"
                  onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Галерея */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Фотографии и визуальные материалы</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "/portfolio/samara-exhibition/gallery/gallery-1.jpg",
              "/portfolio/samara-exhibition/gallery/gallery-2.jpg",
              "/portfolio/samara-exhibition/gallery/gallery-3.jpg",
              "/portfolio/samara-exhibition/gallery/gallery-4.jpg",
              "/portfolio/samara-exhibition/gallery/gallery-5.jpg",
              "/portfolio/samara-exhibition/gallery/gallery-6.jpg"
            ].map((src, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <img src={src} alt={`Галерея выставки Самара ${i + 1}`} className="w-full h-full object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Заключение */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Заключение</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4">
                Выставка «Самара» в Музее им. П.В. Алабина успешно продолжила масштабный проект «Россия», перенеся его концепцию и стилистику в новое пространство. Проект продемонстрировал эффективное использование современных мультимедийных технологий для презентации регионального наследия и достижений.
              </p>
              <p className="text-slate-700 mb-0">
                Интерактивные технологии, виртуальная реальность, инновационные дисплеи и зонированный звук создали уникальный опыт для посетителей, позволив им познакомиться с богатым наследием Самарской области через современные форматы взаимодействия.
              </p>
              <p className="text-slate-900 font-semibold mt-4">
                Проект успешно реализован в партнёрстве с Министерством туризма Самарской области и получил официальное признание.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Готовы к совместному проекту?</h2>
          <p className="text-white/95">Расскажите нам о задаче — предложим решение и смету.</p>
          <div className="mt-6 inline-flex gap-2">
            <Button asChild className="bg-white text-blue-700 hover:bg-blue-50">
              <a href="/contact">Обсудить проект</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseSamaraExhibition;

