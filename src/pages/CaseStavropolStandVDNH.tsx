import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { HeroVideoDialog } from '../components/ui/hero-video-dialog';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Award,
  Mountain,
  Bike,
  Wind,
  Monitor,
  Eye,
  Sparkles,
  Camera,
  Zap,
  Play,
  Trophy,
  Heart,
  TrendingUp,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Video as VideoIcon
} from 'lucide-react';

// Галерея изображений
const galleryImages = [
  '/portfolio/stavropol-vdnh/gallery-1.jpg',
  '/portfolio/stavropol-vdnh/gallery-2.jpg',
  '/portfolio/stavropol-vdnh/gallery-3.jpg',
  '/portfolio/stavropol-vdnh/gallery-4.jpg',
  '/portfolio/stavropol-vdnh/gallery-5.jpg',
  '/portfolio/stavropol-vdnh/gallery-6.jpg',
];

const CaseStavropolStandVDNH = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [a101SlideIndex, setA101SlideIndex] = useState(0);

  // Модалка галереи
  const openModal = (src: string, alt: string, index: number) => {
    setModalImage(src);
    setModalAlt(alt);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  const nextImage = () => {
    const nextIndex = currentImageIndex === galleryImages.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(nextIndex);
    setModalImage(galleryImages[nextIndex]);
    setModalAlt(`Фотография стенда Ставропольского края ${nextIndex + 1}`);
  };
  
  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setModalImage(galleryImages[prevIndex]);
    setModalAlt(`Фотография стенда Ставропольского края ${prevIndex + 1}`);
  };
  
  // Обработка клавиш
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) closeModal();
      else if (event.key === 'ArrowLeft' && isModalOpen) prevImage();
      else if (event.key === 'ArrowRight' && isModalOpen) nextImage();
    };
    
    if (isModalOpen) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentImageIndex]);
  
  // SEO
  useEffect(() => {
    const title = "Стенд Ставропольского края на выставке «Россия» — кейс ВДНХ 2023–2024 | WESHOW";
    const description = "Кейс: мультимедийный стенд Ставропольского края на выставке‑форуме «Россия» — Naked Eye 3D LED куб, интерактивный слон, виртуальный терренкур, прозрачные тач‑панели. Приз зрительских симпатий. 3+ млн посетителей.";
    document.title = title;

    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "description");
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", description);

    const canonicalHref = window.location.origin + "/portfolio/stavropol-stand-vdnh";
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalHref);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        {/* Градиентный фон в цветах Ставрополья (зеленый/природный) */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900" />
        <div className="absolute inset-0 bg-[url('/portfolio/stavropol-vdnh/spirit-installation.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Button
            variant="ghost"
            onClick={() => navigate('/portfolio')}
            className="mb-6 text-white/80 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Назад к портфолио
          </Button>
          
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-amber-500/90 text-white border-0">
              <Trophy className="w-3 h-3 mr-1" /> Приз зрительских симпатий 2024
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Стенд Ставропольского края
              <br />
              <span className="text-emerald-300">на выставке «Россия»</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              Мультимедийный стенд с рекордной концентрацией технологий: 
              Naked Eye 3D LED куб, интерактивный слон, виртуальный терренкур 
              и прозрачные тач-панели
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Badge variant="outline" className="bg-white/10 border-white/30 text-white backdrop-blur">
                <Calendar className="w-4 h-4 mr-2" />
                4 ноября 2023 — 8 июля 2024
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white/30 text-white backdrop-blur">
                <MapPin className="w-4 h-4 mr-2" />
                Павильон №75, ВДНХ, Москва
              </Badge>
              <Badge variant="outline" className="bg-white/10 border-white/30 text-white backdrop-blur">
                <Users className="w-4 h-4 mr-2" />
                3+ млн посетителей
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* О проекте */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">О проекте</h2>
          <Card className="shadow-lg mb-8">
            <CardContent className="p-8">
              <p className="text-slate-700 leading-relaxed mb-4">
                Стенд Ставропольского края на Международной выставке‑форуме «Россия» на ВДНХ 
                стал одним из самых выдающихся региональных проектов 2023–2024 года. 
                Экспозиция располагалась в павильоне №75 и работала с 4 ноября 2023 года по 8 июля 2024 года.
              </p>
              <p className="text-slate-700 leading-relaxed mb-4">
                Основной слоган выставочной экспозиции — <strong>«Ставрополье — край для жизни!»</strong>
              </p>
              <p className="text-slate-700 leading-relaxed">
                Стенд по концентрации мультимедийных решений на квадратный метр экспозиции 
                стал одним из лидеров всей выставки и получил высшую награду — 
                приз зрительских симпатий как лучший региональный стенд.
              </p>
            </CardContent>
          </Card>

          {/* Главное видео */}
          <Card className="shadow-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">Главный видеоролик о проекте</CardTitle>
              <CardDescription>Обзор мультимедийных решений стенда</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video bg-slate-900 flex items-center justify-center">
                <HeroVideoDialog
                  animationStyle="from-center"
                  videoSrc="https://www.dropbox.com/scl/fi/9jlp1gsayffiek381f5e6/.mp4?rlkey=c2jcsbdu0gh5coqk1cz27il6l&st=k4smx9m7&raw=1"
                  thumbnailSrc="/portfolio/stavropol-vdnh/stavropol-video-preview.jpg"
                  thumbnailAlt="Видео о стенде Ставропольского края"
                  className="w-full h-full"
                  useVideoTag
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Концепция */}
      <section className="py-14 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Концепция</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Стенд объединил уникальные природные богатства Ставрополья — 17 гор‑лакколитов 
              Кавказских Минеральных Вод, курортное наследие, промышленные достижения в области 
              ветроэнергетики и «умных» технологий. Особое место занял слон — символ региона, 
              связанный с палеонтологическими находками Южного слона, сделавшими Ставрополье 
              «родиной слонов».
            </p>
          </div>
        </div>
      </section>

      {/* Проект в деталях — метрики */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Проект в деталях</h2>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Users, n: '3 000 000+', d: 'Посетителей за период', color: 'text-emerald-600' },
                  { icon: Eye, n: '1 800 000', d: 'За первые 3 месяца', color: 'text-blue-600' },
                  { icon: TrendingUp, n: '92 000', d: 'За последнюю неделю', color: 'text-purple-600' },
                  { icon: Trophy, n: '2', d: 'Высшие награды', color: 'text-amber-600' },
                  { icon: Mountain, n: '17', d: 'Гор‑лакколитов КМВ', color: 'text-green-600' },
                  { icon: Monitor, n: '2', d: 'Точки просмотра Naked Eye', color: 'text-cyan-600' },
                  { icon: Bike, n: '∞', d: 'Виртуальных терренкуров', color: 'text-orange-600' },
                  { icon: Zap, n: '100%', d: 'Зарядка от ветрогенератора', color: 'text-yellow-600' },
                ].map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
                    <m.icon className={`w-6 h-6 ${m.color} mb-2`} />
                    <div className="text-2xl font-bold text-slate-900">{m.n}</div>
                    <div className="text-sm text-slate-600">{m.d}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Мультимедийные системы */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Инновационные мультимедийные системы</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Naked Eye 3D LED Куб */}
            <Card className="shadow-lg lg:col-span-2">
              <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles className="w-6 h-6" /> Naked Eye 3D LED Куб
                </CardTitle>
                <CardDescription className="text-cyan-100">
                  Главная WOW-технология стенда
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-slate-700 mb-4 leading-relaxed">
                  LED куб, установленный в верхней части стенда, демонстрировал контент с технологией 
                  Naked Eye 3D. Каждые две недели контент обновлялся. Были рассчитаны две идеальные 
                  точки просмотра, с которых контент буквально «вылезал» из экрана, 
                  создавая незабываемый WOW-эффект.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-200">
                    <img 
                      src="/portfolio/stavropol-vdnh/naked-eye-3d-cube.jpg" 
                      alt="Naked Eye 3D LED Куб" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <HeroVideoDialog
                      animationStyle="from-center"
                      thumbnailSrc="/portfolio/stavropol-vdnh/naked-eye-video-preview.jpg"
                      thumbnailAlt="Naked Eye 3D LED Куб - видео"
                      videoSrc="https://www.dropbox.com/scl/fi/15jhyf8zht2jloiug82n1/Niked-Eye_weshow.mp4?rlkey=ugalj75kk0uigmd85jbdzkuph&st=d35ze1un&raw=1"
                      useVideoTag
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Прозрачный экран А101 */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-violet-600" /> Прозрачная тач‑панель А101
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  Презентация жилого квартала А101 — мультимедийная система из прозрачной 
                  тач‑панели с меню и навигацией и большого LED экрана за ней. 
                  Посетители взаимодействовали с прозрачным экраном, смотрели сквозь него 
                  на большой и совершали виртуальные путешествия.
                </p>
                <div className="aspect-video rounded-lg bg-slate-100 border border-slate-200 overflow-hidden relative group">
                  <img 
                    src={`/portfolio/stavropol-vdnh/a101-touch-panel-${a101SlideIndex + 1}.jpg`}
                    alt={`Прозрачная тач-панель А101 - фото ${a101SlideIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Навигация */}
                  <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setA101SlideIndex(prev => prev === 0 ? 1 : 0)}
                      className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setA101SlideIndex(prev => prev === 0 ? 1 : 0)}
                      className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  {/* Индикаторы */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {[0, 1].map((idx) => (
                      <button
                        key={idx}
                        onClick={() => setA101SlideIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === a101SlideIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Интерактивный велосипед */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bike className="w-5 h-5 text-orange-600" /> Виртуальный терренкур
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  Интерактивный велосипед позволял посетителям совершить виртуальное путешествие 
                  по заповедным тропам региона. Меняющийся пейзаж на видеостенах синхронизировался 
                  с движением педалей, создавая эффект полного погружения в природу Ставрополья.
                </p>
                <div className="aspect-video rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                  <img 
                    src="/portfolio/stavropol-vdnh/terrenkur.jpg" 
                    alt="Виртуальный терренкур" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Интерактивный слон */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-600" /> Интерактивный слон
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  Арт‑объект слон — символ региона, связанный с палеонтологическими находками 
                  Южного слона в Ставрополье. Скульптура меняла окраску при прикосновении, 
                  создавая уникальный интерактивный опыт для посетителей всех возрастов.
                </p>
                <div className="aspect-video rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                  <img 
                    src="/portfolio/stavropol-vdnh/interactive-elephant.jpg" 
                    alt="Интерактивный слон" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Тропинка с бинокулярами */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-green-600" /> Тропинка с бинокулярами
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  Специальная тропинка с бинокулярами для рассматривания уменьшенных моделей 
                  17 уникальных гор‑лакколитов курортов Ставрополья: Бештау, Машук, Развалка, 
                  Железная и другие — «недообразовавшиеся вулканы» Кавказских Минеральных Вод.
                </p>
                <div className="aspect-video rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                  <img 
                    src="/portfolio/stavropol-vdnh/binoculars-path.jpg" 
                    alt="Тропинка с бинокулярами" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Дух курортов */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-600" /> Дух ставропольских курортов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  Зелёное мультимедийное пространство с волшебными холмиками, 
                  где с посетителями «разговаривал» Дух ставропольских курортов — 
                  иммерсивная инсталляция, погружающая в атмосферу Кавказских Минеральных Вод.
                </p>
                <div className="aspect-video rounded-lg bg-slate-100 border border-slate-200 overflow-hidden">
                  <img 
                    src="/portfolio/stavropol-vdnh/spirit-installation.jpg" 
                    alt="Дух ставропольских курортов" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* Награды и достижения */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Награды и признание</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="shadow-lg border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Приз зрительских симпатий</h3>
                <p className="text-slate-600">
                  По голосованию посетителей признан лучшим среди всех региональных стендов выставки
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Награда за спортивную активность</h3>
                <p className="text-slate-600">
                  За поддержку марафона зарядок и спортивных активностей на выставке
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg mt-8 max-w-4xl mx-auto">
            <CardContent className="p-6">
              <p className="text-slate-700 text-center leading-relaxed">
                Награды губернатору Ставропольского края <strong>Владимиру Владимирову</strong> вручил 
                первый заместитель руководителя Администрации Президента России <strong>Сергей Кириенко</strong>
              </p>
              <div className="mt-4 aspect-video max-w-xl mx-auto rounded-lg overflow-hidden">
                <img 
                  src="/portfolio/stavropol-vdnh/award-ceremony.jpg" 
                  alt="Церемония награждения" 
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Долгосрочное влияние */}
      <section className="py-12 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Долгосрочное влияние</h2>
            <p className="text-slate-700 text-lg leading-relaxed">
              Успех стенда способствовал укреплению имиджа Ставропольского края как 
              инновационного региона с развитой туристической и промышленной инфраструктурой. 
              Экспозиция продемонстрировала возможности современных мультимедийных технологий 
              для региональной презентации на федеральном уровне.
            </p>
          </div>
        </div>
      </section>

      {/* Галерея */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Галерея проекта</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, idx) => (
              <div
                key={idx}
                className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity bg-slate-200"
                onClick={() => openModal(src, `Фото стенда ${idx + 1}`, idx)}
              >
                <img 
                  src={src} 
                  alt={`Фото стенда Ставропольского края ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Технологии — сводная таблица */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Использованные технологии</h2>
          <Card className="shadow-lg max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Мультимедийные системы</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                      Naked Eye 3D LED куб
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-violet-500 rounded-full"></span>
                      Прозрачные тач‑панели
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      LED видеостены
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      Иммерсивные аудиосистемы
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Интерактивные решения</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      Велотренажёр с синхронизацией видео
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      Touch-reactive арт‑объекты
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Бинокуляры с AR-контентом
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      Работающий макет ветрогенератора
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Хотите создать впечатляющий выставочный стенд?
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Мы разрабатываем мультимедийные экспозиции для выставок любого масштаба — 
            от региональных до международных
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/contact')}
            className="bg-white text-emerald-700 hover:bg-emerald-50"
          >
            Обсудить проект
          </Button>
        </div>
      </section>

      {/* Модалка галереи */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 text-white hover:text-gray-300 z-50"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 text-white hover:text-gray-300 z-50"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
          <div
            className="max-w-5xl max-h-[90vh] rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={modalImage} 
              alt={modalAlt}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>
          <div className="absolute bottom-4 text-white text-sm">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CaseStavropolStandVDNH;

