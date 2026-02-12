import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Award, Trophy, Heart, Target, Rocket, Lightbulb, Video as VideoIcon, Monitor, Eye, Zap, Globe, Headphones, Gamepad2, Ship, Image as ImageIcon, Star } from "lucide-react";

const CaseSamaraStandVDNH: React.FC = () => {
  const [isConsultOpen, setConsultOpen] = useState(false);
  const [isOrderOpen, setOrderOpen] = useState(false);

  const handleVideoPlay = (_id: string, event: React.SyntheticEvent<HTMLVideoElement>) => {
    const all = document.querySelectorAll<HTMLVideoElement>("video");
    all.forEach(v => { if (v !== event.currentTarget) v.pause(); });
  };
  const handleVideoPause = (_id: string) => _id;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Хлебные крошки */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6">
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
                <Link to="/portfolio">Портфолио</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Стенд Самарской области</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Hero */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700"><Award className="w-4 h-4 mr-2" />Проект 2024</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">Стенд Самарской области<br /><span className="text-blue-600">на выставке-форуме «Россия»</span></h1>
          <div className="flex gap-2 justify-center">
            <Badge variant="outline" className="bg-white/80"><Calendar className="w-4 h-4 mr-2" />4 ноября 2023 — 8 июля 2024</Badge>
            <Badge variant="outline" className="bg-white/80"><MapPin className="w-4 h-4 mr-2" />Москва, ВДНХ</Badge>
            <Badge variant="outline" className="bg-white/80"><Users className="w-4 h-4 mr-2" />18+ млн посетителей</Badge>
          </div>
        </div>
      </section>

      {/* Галерея */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Галерея</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "/portfolio/samara-vdnh/hero-preview.jpg",
              "/portfolio/samara-vdnh/touch-panels.jpg",
              "/portfolio/samara-vdnh/Ball-samara.jpg",
              "/portfolio/samara-vdnh/vr-ar.jpg",
              "/portfolio/samara-vdnh/transparent.jpg",
              "/portfolio/samara-vdnh/kinetic.jpg",
              "/portfolio/samara-vdnh/Benefit_samara.jpg",
              "/portfolio/samara-vdnh/screen-sail.jpg",
            ].map((src, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100">
                <img src={src} alt="Самара ВДНХ" className="w-full h-full object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}} />
                <div className="absolute inset-0 hidden items-center justify-center text-slate-400">
                  <ImageIcon className="w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* О проекте */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">О проекте</h2>
          <Card className="shadow-lg mb-8">
            <CardContent className="p-8">
              <p className="text-slate-600 mb-0 leading-relaxed">
                Стенд Самарской области был представлен на международной выставке-форуме «Россия» в Москве (ВДНХ), которая проходила с 4 ноября 2023 года по 8 июля 2024 года и привлекла более 18 миллионов посетителей. Главная задача — демонстрация культурных, экономических и инновационных достижений региона через современную экспозицию в виде ладьи, символизирующей историческое наследие Самарской области. Проект реализован нашей группой совместно с правительством Самарской области.
              </p>
            </CardContent>
          </Card>

          {/* PLACEHOLDER_FOR_HERO_VIDEO: Главный видеоролик о проекте */}
          <Card className="shadow-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">Главный видеоролик о проекте</CardTitle>
              <CardDescription>Показывает стенд в действии и WOW‑эффекты</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video bg-slate-900 flex items-center justify-center text-slate-400">
                <VideoIcon className="w-10 h-10 mr-3" />
                <span>PLACEHOLDER_FOR_HERO_VIDEO</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      
      {/* Технологии */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">Технологии</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader><CardTitle>Мультимедийные решения</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-slate-600 space-y-2 mb-0">
                  <li>Naked Eye 3D для иммерсивного контента</li>
                  <li>Кинетический экран с ходом пикселя 20 см</li>
                  <li>Прозрачные LED‑панели для исторического контента</li>
                  <li>Интерактивные тач‑панели LUMIEN (LFT3201PC, LMP8602ELRU)</li>
                  <li>Технология Kinect для спортивных игр</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader><CardTitle>Аудиовизуальные системы</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-slate-600 space-y-2 mb-0">
                  <li>Звуковой душ для локализации звука</li>
                  <li>ИК‑наушники с беспроводной передачей сигнала</li>
                  <li>LED‑шары для визуальной идентификации</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="shadow-lg md:col-span-2">
              <CardHeader><CardTitle>Контент и интерактив</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-slate-600 space-y-2 mb-0">
                  <li>Уникальный 3D‑контент с учётом региональной специфики</li>
                  <li>Нейросети для арт‑проектов («Самара в лицах»)</li>
                  <li>VR/AR‑приложения для обучения и развлечения</li>
                  <li>Синхронный запуск контента на всех поверхностях стенда</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      

      

      {/* Контент стенда – расширенный список */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Контент стенда</h2>
          <Card className="shadow-lg mb-8">
            <CardContent>
              <ul className="space-y-4 text-slate-600 mb-0">
                <li className="flex items-start gap-3"><Globe className="w-5 h-5 mt-0.5 text-blue-500 flex-shrink-0" /><span><strong>3D‑визуализация:</strong> города, предприятия, инфраструктура, культура, спорт, достижения.</span></li>
                <li className="flex items-start gap-3"><Target className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" /><span><strong>3D‑модели</strong> ключевых объектов региона.</span></li>
                <li className="flex items-start gap-3"><Star className="w-5 h-5 mt-0.5 text-yellow-500 flex-shrink-0" /><span><strong>Интерактивные карты</strong> с информацией о регионе.</span></li>
                <li className="flex items-start gap-3"><Heart className="w-5 h-5 mt-0.5 text-red-500 flex-shrink-0" /><span><strong>«Самара в лицах»:</strong> арт‑проект с нейросетями, известные личности региона.</span></li>
                <li className="flex items-start gap-3"><Trophy className="w-5 h-5 mt-0.5 text-yellow-500 flex-shrink-0" /><span><strong>«Спорт в лицах»:</strong> известные спортсмены региона.</span></li>
                <li className="flex items-start gap-3"><Target className="w-5 h-5 mt-0.5 text-green-500 flex-shrink-0" /><span><strong>«Было/стало»:</strong> демонстрация ключевых проектов развития.</span></li>
                <li className="flex items-start gap-3"><Award className="w-5 h-5 mt-0.5 text-purple-500 flex-shrink-0" /><span><strong>«Лица армии»:</strong> участники СВО, герои региона.</span></li>
                <li className="flex items-start gap-3"><Heart className="w-5 h-5 mt-0.5 text-red-500 flex-shrink-0" /><span><strong>Виртуальные экскурсии</strong> по достопримечательностям Самарской области.</span></li>
                <li className="flex items-start gap-3"><Rocket className="w-5 h-5 mt-0.5 text-indigo-500 flex-shrink-0" /><span><strong>Видеошоу «Запуск ракеты в космос»:</strong> реалистичная симуляция запуска «Союз» с отделением ступеней и выводом на орбиту; финал с подсветкой Самарской области в виде сердца. <span className="inline-flex items-center gap-2 ml-2 text-slate-500"><VideoIcon className="w-4 h-4" /> PLACEHOLDER_FOR_VIDEO_SNIPPET</span></span></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Проект в деталях – 12 карточек метрик */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Проект в деталях</h2>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { n: '16 000 000+', d: 'Посетителей выставки' },
                  { n: '1000+', d: 'Мастер‑классов' },
                  { n: '3200+', d: 'Часов работы' },
                  { n: '2400+', d: 'Запусков «Союз»' },
                  { n: '200+', d: 'Презентаций' },
                  { n: '600+', d: 'Виртуальных экскурсий' },
                  { n: '100+', d: 'Образовательных программ' },
                  { n: '500+', d: 'Игровых сессий' },
                  { n: '20+', d: 'Спецпроектов' },
                  { n: '6', d: 'Вертикальных панелей' },
                  { n: '2', d: 'Зоны Naked Eye 3D' },
                  { n: '1,5 м', d: 'Диаметр LED‑сферы' },
                ].map((m, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200">
                    <div className="text-center mb-2">
                      <div className="text-lg font-bold text-slate-900 mb-0.5">{m.n}</div>
                      <div className="text-xs text-slate-600 leading-tight">{m.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      

      {/* Инновационные мультимедийные системы */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Инновационные мультимедийные системы</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Концепция стенда */}
            <Card className="shadow-lg lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Ship className="w-5 h-5 text-blue-600" />Концепция стенда</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  Стенд выполнен в виде древнерусской ладьи, символизирующей культурное наследие и динамичное развитие региона.
                  Парус – метафора движения и открытий, соотнесённая с современной Самарской областью.
                </p>
                <div className="mt-4 aspect-[16/6] rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-6 h-6 mr-2" /> PLACEHOLDER_FOR_PHOTO: Фото концепции стенда (ладья)
                </div>
              </CardContent>
            </Card>

            {/* Двусторонний экран-парус */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Eye className="w-5 h-5 text-blue-600" />Двусторонний экран‑парус</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-3">Изогнутая часть служит «обложкой» стенда с Naked Eye 3D‑контентом.</p>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">Naked Eye 3D</Badge>
                <div className="mt-4 aspect-video rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-6 h-6 mr-2" /> PLACEHOLDER_FOR_PHOTO: Фото двустороннего экрана‑паруса
                </div>
              </CardContent>
            </Card>

            {/* Шесть вертикальных тач‑панелей */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Monitor className="w-5 h-5 text-green-600" />Шесть вертикальных тач‑панелей</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-3">Информация о регионе, интерактивные игры и виртуальный ассистент.</p>
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-900">
                  <video controls className="w-full h-full object-contain" preload="metadata" poster="/portfolio/samara-vdnh/video-previews/touch-panels-preview.jpg" onPlay={(e)=>handleVideoPlay("touch-panels",e)} onPause={()=>handleVideoPause("touch-panels")}>
                    <source src="https://www.dropbox.com/scl/fi/d9jnc8iox0628vrfodcav/5_.mp4?rlkey=jua2l5gl13zlpcl8xfm83qtxy&st=x6et7dhd&dl=1" type="video/mp4" />
                    <source src="https://www.dropbox.com/scl/fi/d9jnc8iox0628vrfodcav/5_.mp4?rlkey=jua2l5gl13zlpcl8xfm83qtxy&st=x6et7dhd&raw=1" type="video/mp4" />
                  </video>
                </div>
                <div className="mt-4 aspect-[4/3] rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-6 h-6 mr-2" /> PLACEHOLDER_FOR_PHOTO: Фото вертикальных тач‑панелей
                </div>
              </CardContent>
            </Card>

            {/* Горизонтальные панели с Kinect */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Gamepad2 className="w-5 h-5 text-purple-600" />Горизонтальные панели с Kinect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-2">Жестовое управление играми: хоккей, футбол, баскетбол.</p>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">Управление жестами</Badge>
                <div className="mt-4 aspect-[4/3] rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-6 h-6 mr-2" /> PLACEHOLDER_FOR_PHOTO: Фото зоны Kinect
                </div>
              </CardContent>
            </Card>

            {/* LED‑сфера */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-yellow-600" />LED‑сфера (1,5 м)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Интерактивная сфера для контента 360°.</p>
                <div className="mt-4 aspect-square rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-6 h-6 mr-2" /> PLACEHOLDER_FOR_PHOTO: Фото LED‑сферы
                </div>
              </CardContent>
            </Card>

            {/* Кинетический экран */}
            <Card className="shadow-lg lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-orange-600" />Кинетический экран (5×3 м)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-3">Выдвижение пикселей на 20 см, программируемая скорость.</p>
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-900">
                  <video controls className="w-full h-full object-contain" preload="metadata" poster="/portfolio/samara-vdnh/video-previews/kinetic-screen-preview.jpg" onPlay={(e)=>handleVideoPlay("kinetic-screen",e)} onPause={()=>handleVideoPause("kinetic-screen")}>
                    <source src="https://www.dropbox.com/scl/fi/ujm4v27s5g8n0j0rp8nmt/3_.mp4?rlkey=bfjbizphbofe4oiyt5taf8ynn&st=4mifmnte&dl=1" type="video/mp4" />
                    <source src="https://www.dropbox.com/scl/fi/ujm4v27s5g8n0j0rp8nmt/3_.mp4?rlkey=bfjbizphbofe4oiyt5taf8ynn&st=4mifmnte&raw=1" type="video/mp4" />
                  </video>
                </div>
                <div className="mt-4 aspect-video rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-6 h-6 mr-2" /> PLACEHOLDER_FOR_PHOTO: Фото кинетического экрана
                </div>
              </CardContent>
            </Card>

            {/* Прозрачный экран */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Eye className="w-5 h-5 text-cyan-600" />Прозрачный экран (55")</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Демонстрация контента с сохранением видимости фона.</p>
                <div className="mt-4 aspect-[4/3] rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-6 h-6 mr-2" /> PLACEHOLDER_FOR_PHOTO: Фото прозрачных панелей
                </div>
              </CardContent>
            </Card>

            {/* Профессиональные аудиосистемы */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Headphones className="w-5 h-5 text-blue-600" />Профессиональные аудиосистемы</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Высококачественное озвучивание контента и мероприятий.</p>
                <div className="mt-4 aspect-[4/3] rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                  <ImageIcon className="w-6 h-6 mr-2" /> PLACEHOLDER_FOR_PHOTO: Фото аудиозоны / звукового душа
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* О проекте */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">О проекте</h2>
          <Card className="shadow-lg mb-8">
            <CardContent className="p-8">
              <p className="text-slate-600 mb-0 leading-relaxed">
                Стенд Самарской области был представлен на международной выставке-форуме «Россия» в Москве (ВДНХ), которая проходила с 4 ноября 2023 года по 8 июля 2024 года и привлекла более 18 миллионов посетителей. Главная задача — демонстрация культурных, экономических и инновационных достижений региона через современную экспозицию в виде ладьи, символизирующей историческое наследие Самарской области. Проект реализован нашей группой совместно с правительством Самарской области.
              </p>
            </CardContent>
          </Card>

          {/* PLACEHOLDER_FOR_HERO_VIDEO: Главный видеоролик о проекте */}
          <Card className="shadow-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">Главный видеоролик о проекте</CardTitle>
              <CardDescription>Показывает стенд в действии и WOW‑эффекты</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video bg-slate-900 flex items-center justify-center text-slate-400">
                <VideoIcon className="w-10 h-10 mr-3" />
                <span>PLACEHOLDER_FOR_HERO_VIDEO</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Результаты и достижения */}
      <section className="py-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Результаты и достижения</h2>
          <div className="mb-12">
            <Carousel className="w-full" opts={{ align: "start", loop: true }}>
              <CarouselContent className="-ml-2 md:-ml-4">
                <CarouselItem className="pl-2 md:pl-4">
                  <Card className="shadow-xl h-full flex flex-col">
                    <CardContent className="pt-6 pb-6 flex-1 flex flex-col">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
                        <div className="flex flex-col">
                          <h3 className="text-xl font-semibold text-slate-900 mb-4 text-center">Ключевые результаты</h3>
                          <div className="grid grid-cols-2 gap-3 flex-1">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-100 h-full min-h-[80px]"><div className="flex-shrink-0 h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">16</div><div className="flex-1 min-w-0"><div className="text-2xl font-bold text-blue-600 leading-tight">16 000 000+</div><div className="text-xs text-slate-600 leading-tight">Общее количество посетителей</div></div></div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-100 h-full min-h-[80px]"><div className="flex-shrink-0 h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center text-white">1000</div><div className="flex-1 min-w-0"><div className="text-2xl font-bold text-green-600 leading-tight">1000+</div><div className="text-xs text-slate-600 leading-tight">Проведено мастер-классов</div></div></div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-100 h-full min-h-[80px]"><div className="flex-shrink-0 h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">3200</div><div className="flex-1 min-w-0"><div className="text-2xl font-bold text-indigo-600 leading-tight">3200+</div><div className="text-xs text-slate-600 leading-tight">Часов работы</div></div></div>
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-100 h-full min-h-[80px]"><div className="flex-shrink-0 h-10 w-10 bg-red-600 rounded-lg flex items-center justify-center text-white">2400</div><div className="flex-1 min-w-0"><div className="text-2xl font-bold text-red-600 leading-tight">2400+</div><div className="text-xs text-slate-600 leading-tight">Запусков «Союз»</div></div></div>
                          </div>
                        </div>
                        <div className="flex flex-col h-full">
                          <h3 className="text-lg font-semibold text-slate-900 mb-2 text-center">Видео о проекте</h3>
                          <div className="flex-1 bg-slate-900 rounded-lg overflow-hidden relative w-full min-h-[200px]">
                            <video controls className="w-full h-full object-cover" preload="metadata" poster="/portfolio/samara-vdnh/video-previews/history-samara-preview.jpg" onPlay={(e)=>handleVideoPlay("metrics-video",e)} onPause={()=>handleVideoPause("metrics-video")}>
                              <source src="https://www.dropbox.com/scl/fi/75fboz3vw5l2na679mdpp/History_Samara.mp4?rlkey=fkznf3px1a3u7zqfu89bho2db&st=vsiy7h5x&dl=1" type="video/mp4" />
                              <source src="https://www.dropbox.com/scl/fi/75fboz3vw5l2na679mdpp/History_Samara.mp4?rlkey=fkznf3px1a3u7zqfu89bho2db&st=vsiy7h5x&raw=1" type="video/mp4" />
                            </video>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      

      {/* Видеорепортаж */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">Видеорепортаж</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto text-center mb-8">День Самарской области на выставке-форуме "Россия"</p>
            <Card className="shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-slate-900 relative">
                  <video controls className="w-full h-full object-contain" preload="metadata" poster="/portfolio/samara-vdnh/video-previews/reportage-preview.jpg" onPlay={(e)=>handleVideoPlay("reportage",e)} onPause={()=>handleVideoPause("reportage")}>
                    <source src="https://www.dropbox.com/scl/fi/0u4diw8kbjn41lye9ld9y/30_-_.mp4?rlkey=vzu7j58zq7pkqu413lk4d6uw4&st=9og2qfsz&dl=1" type="video/mp4" />
                    <source src="https://www.dropbox.com/scl/fi/0u4diw8kbjn41lye9ld9y/30_-_.mp4?rlkey=vzu7j58zq7pkqu413lk4d6uw4&st=9og2qfsz&raw=1" type="video/mp4" />
                  </video>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Готовы создать что-то подобное?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">Обратитесь к нашей команде для обсуждения вашего проекта и получения консультации.</p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" onClick={()=>setOrderOpen(true)}><Lightbulb className="w-5 h-5 mr-2" />Заказать проект</Button>
            <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white/20 hover:border-white" onClick={()=>setConsultOpen(true)}><Users className="w-5 h-5 mr-2" />Получить консультацию</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CaseSamaraStandVDNH;


