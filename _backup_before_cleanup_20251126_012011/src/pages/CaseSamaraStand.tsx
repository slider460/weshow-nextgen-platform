import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import { 
  Calendar, 
  MapPin, 
  Award, 
  Monitor, 
  Smartphone, 
  Gamepad2, 
  Globe, 
  Users, 
  Star,
  Play,
  Eye,
  Zap,
  Target,
  Trophy,
  Heart,
  Rocket,
  Ship,
  Lightbulb,
  Cpu,
  Headphones,
  Volume2
} from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationModal from "../components/ConsultationModal";
import ProjectOrderModal from "../components/ProjectOrderModal";

const CaseSamaraStand: React.FC = () => {
  const [isConsultOpen, setConsultOpen] = useState(false);
  const [isOrderOpen, setOrderOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalAlt, setModalAlt] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Массив изображений для галереи
  const galleryImages = [
    "/portfolio/samara-exhibition-1.jpg",
    "/portfolio/auto-exhibition.jpg", 
    "/portfolio/regions-presentation.jpg",
    "/portfolio/samara-booth.jpg",
    "/portfolio/russia-exhibition.jpg"
  ];
  
  // Функции для модального окна
  const openModal = (imageSrc: string, imageAlt: string) => {
    const index = galleryImages.indexOf(imageSrc);
    setCurrentImageIndex(index >= 0 ? index : 0);
    setModalImage(imageSrc);
    setModalAlt(imageAlt);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage("");
    setModalAlt("");
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };
  
  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(nextIndex);
    setModalImage(galleryImages[nextIndex]);
    setModalAlt(`Фотография стенда Самарской области ${nextIndex + 1}`);
  };
  
  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? galleryImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setModalImage(galleryImages[prevIndex]);
    setModalAlt(`Фотография стенда Самарской области ${prevIndex + 1}`);
  };
  
  // Обработка клавиши Escape и навигации
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      } else if (event.key === 'ArrowLeft' && isModalOpen) {
        prevImage();
      } else if (event.key === 'ArrowRight' && isModalOpen) {
        nextImage();
      }
    };
    
    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, currentImageIndex]);
  
  // SEO: title, meta, canonical, breadcrumbs JSON-LD
  useEffect(() => {
    const title = "Стенд Самарской области на выставке «Россия» — кейс ВДНХ 2023–2024";
    const description = "Кейс: мультимедийный стенд Самарской области на выставке‑форуме «Россия» — Naked Eye, Kinect‑игры, VR/AR, кинетический экран, LED‑шары.";
    document.title = title;

    const metaName = "description";
    let metaTag = document.querySelector(`meta[name="${metaName}"]`);
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", metaName);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", description);

    const canonicalHref = window.location.origin + "/portfolio/samara-stand";
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalHref);

    // JSON-LD для хлебных крошек
    const breadcrumbJsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Главная",
          "item": window.location.origin
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Портфолио",
          "item": window.location.origin + "/portfolio"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Стенд Самарской области",
          "item": canonicalHref
        }
      ]
    };

    let existingJsonLd = document.querySelector('script[type="application/ld+json"]');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(breadcrumbJsonLd);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-20">
        {/* Breadcrumbs */}
        <section className="py-6 bg-white border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
        </section>

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-700">
                <Award className="w-4 h-4 mr-2" />
                Победитель выставки «Россия» 2024
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Стенд Самарской области
                <br />
                <span className="text-blue-600">на выставке «Россия»</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
                Мультимедийный стенд в виде древнерусской ладьи с инновационными технологиями: 
                Naked Eye 3D, кинетический экран, VR/AR и интерактивные игры
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Badge variant="outline" className="bg-white/80">
                  <Calendar className="w-4 h-4 mr-2" />
                  4 ноября 2023 — 8 июля 2024
                </Badge>
                <Badge variant="outline" className="bg-white/80">
                  <MapPin className="w-4 h-4 mr-2" />
                  ВДНХ, Москва
                </Badge>
                <Badge variant="outline" className="bg-white/80">
                  <Users className="w-4 h-4 mr-2" />
                  18+ млн посетителей
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Main Video Placeholder */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <Card className="overflow-hidden shadow-xl">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center relative">
                    <div className="text-center text-white">
                      <Play className="w-16 h-16 mx-auto mb-4 opacity-80" />
                      <h3 className="text-2xl font-bold mb-2">Главный видеоролик о проекте</h3>
                      <p className="text-lg opacity-80">Показывает стенд в действии и WOW-эффекты</p>
                    </div>
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* О проекте */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                О проекте
              </h2>
              
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">
                        Концепция стенда
                      </h3>
                      <p className="text-slate-600 mb-6">
                        Стенд выполнен в виде древнерусской ладьи, символизирующей культурное наследие 
                        и динамичное развитие региона. Парус олицетворяет движение, порыв, динамику и 
                        жажду открытий — всё то, с чем ассоциируется современная Самарская область.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Ship className="w-4 h-4" />
                        <span>Символ исторического наследия</span>
                      </div>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                      <div className="text-center text-slate-600">
                        <Ship className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-sm">Концептуальная визуализация ладьи</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Инновационные мультимедийные системы */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Инновационные мультимедийные системы
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Двусторонний экран-парус */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5 text-blue-600" />
                      Двусторонний экран-парус
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Изогнутая часть экрана служит обложкой стенда с контентом, созданным по технологии 
                      Naked Eye, обеспечивающей стереоскопические 3D визуальные эффекты без дополнительных устройств.
                    </p>
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-slate-600">
                        <Eye className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Фото двустороннего экрана-паруса Naked Eye</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Naked Eye 3D технология
                    </Badge>
                  </CardContent>
                </Card>

                {/* Тач-панели */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Monitor className="w-5 h-5 text-green-600" />
                      Шесть вертикальных тач-панелей
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Размещены по бокам кормы стенда. ПО панелей включает информацию о Самарском крае, 
                      структурированную по департаментам правительства, а также интерактивные игры.
                    </p>
                    <div className="aspect-video bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-slate-600">
                        <Monitor className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Фото интерактивных тач-панелей</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">32 дюйма</Badge>
                      <Badge variant="outline">Интерактивные игры</Badge>
                      <Badge variant="outline">Виртуальный ассистент</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Kinect панели */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-purple-600" />
                      Горизонтальные тач-панели с Kinect
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Позволяют играть в спортивные игры с управлением через жесты — отбить шайбу хоккеиста 
                      ХК «Лада», отбить мяч футболиста ФК «Крылья Советов», забросить мяч в корзину БК «Самара».
                    </p>
                    <div className="aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-slate-600">
                        <Gamepad2 className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Фото Kinect-игр в действии</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      Управление жестами
                    </Badge>
                  </CardContent>
                </Card>

                {/* Кинетический экран */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-600" />
                      Кинетический экран
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Экран размером 5x3 метра, способный выдвигать каждый пиксель на 20 см с программируемой 
                      скоростью, используется для демонстрации кинетического и видеоконтента.
                    </p>
                    <div className="aspect-video bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-slate-600">
                        <Zap className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Фото кинетического экрана в движении</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                      5x3 метра, движение пикселей
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Контент стенда */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Контент стенда
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      Проекты региона
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-slate-600">
                      <li className="flex items-start gap-2">
                        <Heart className="w-4 h-4 mt-1 text-red-500" />
                        <span>«Самара в лицах» — арт-проект с нейросетями</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Trophy className="w-4 h-4 mt-1 text-yellow-500" />
                        <span>«Спорт в лицах» — известные спортсмены региона</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Target className="w-4 h-4 mt-1 text-green-500" />
                        <span>«Было/стало» — демонстрация ключевых проектов</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Award className="w-4 h-4 mt-1 text-purple-500" />
                        <span>«Лица армии» — участники СВО</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-orange-600" />
                      Видеошоу «Запуск ракеты»
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      Масштабное шоу, где полет ракетоносителя «Союз» смоделирован с учётом реального запуска, 
                      включая отделение всех ступеней и вывод корабля на орбиту Земли.
                    </p>
                    <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-100 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-slate-600">
                        <Rocket className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Видеофрагмент шоу «Запуск ракеты»</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                      WOW-эффект
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Результаты и достижения */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Результаты и достижения
              </h2>
              
              <Card className="shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-2xl">
                    <Trophy className="w-8 h-8 text-yellow-600" />
                    Специальный приз оргкомитета
                  </CardTitle>
                  <CardDescription className="text-lg">
                    «За лучшую просветительскую деятельность»
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">
                        Награждение
                      </h3>
                      <p className="text-slate-600 mb-4">
                        18 января 2024 года стенд Самарской области получил специальный приз оргкомитета. 
                        Награду губернатору Дмитрию Азарову вручил первый заместитель руководителя Администрации 
                        Президента, председатель оргкомитета Сергей Кириенко.
                      </p>
                      <div className="aspect-video bg-gradient-to-br from-yellow-100 to-amber-100 rounded-lg flex items-center justify-center">
                        <div className="text-center text-slate-600">
                          <Trophy className="w-8 h-8 mx-auto mb-2" />
                          <p className="text-sm">Фото с церемонии награждения</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">
                        Отзыв Сергея Кириенко
                      </h3>
                      <blockquote className="text-slate-600 italic border-l-4 border-blue-500 pl-4">
                        «Если их предшественники, их современники создают такие предметы и поводы для гордости, 
                        то это заставляет их самих смелее мечтать, ставить себе цели. И это, наверное, самое главное. 
                        Это важнее количественных показателей, потому что эти изменения – в душах и в сердцах людей.»
                      </blockquote>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Технологии */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Технологии
              </h2>
              
              <Tabs defaultValue="multimedia" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="multimedia">Мультимедиа</TabsTrigger>
                  <TabsTrigger value="audio">Аудио</TabsTrigger>
                  <TabsTrigger value="content">Контент</TabsTrigger>
                </TabsList>
                
                <TabsContent value="multimedia" className="mt-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Eye className="w-5 h-5 text-blue-600" />
                          Naked Eye 3D
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Технология стереоскопических визуальных эффектов без дополнительных устройств 
                          для создания иммерсивного контента.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-yellow-600" />
                          Кинетический экран
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Уникальная технология с программируемым движением каждого пикселя на 20 см.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Monitor className="w-5 h-5 text-green-600" />
                          Тач-панели LUMIEN
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Специализированное ПО с играми, квизами и информационным контентом.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Gamepad2 className="w-5 h-5 text-purple-600" />
                          Kinect технология
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Отслеживание движений рук для спортивных VR-игр.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="audio" className="mt-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Volume2 className="w-5 h-5 text-blue-600" />
                          Звуковой душ
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Локализация аудио для ограничения распространения звуков за пределы стенда.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Headphones className="w-5 h-5 text-green-600" />
                          ИК-наушники
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Беспроводная передача сигнала с возможностью использования на всей площади стенда.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="content" className="mt-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Cpu className="w-5 h-5 text-purple-600" />
                          Нейросетевые технологии
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Создание арт-проектов «Самара в лицах» с использованием ИИ.
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Globe className="w-5 h-5 text-blue-600" />
                          VR и AR приложения
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600">
                          Образовательные и развлекательные приложения для виртуальной реальности.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Галерея */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Галерея проекта
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto text-center mb-12">
                Визуальные материалы проекта и моменты работы стенда
              </p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((src, index) => (
                  <div 
                    key={index} 
                    className="aspect-video rounded-xl overflow-hidden border border-slate-200/50 bg-muted group hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer relative"
                    onClick={() => openModal(src, `Фотография стенда Самарской области ${index + 1}`)}
                  >
                    <img
                      src={src}
                      loading="lazy"
                      alt={`Фотография стенда Самарской области ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        console.log('❌ Ошибка загрузки изображения:', src);
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    {/* Индикатор увеличения */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3 shadow-lg">
                        <svg className="w-8 h-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                    {/* Подсказка о клике */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Клик для увеличения
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Хотите создать подобный проект?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Мы поможем воплотить ваши идеи в жизнь с использованием самых современных технологий
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => setOrderOpen(true)}
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
                >
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Заказать проект
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => setConsultOpen(true)}
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg font-semibold"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Получить консультацию
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modals */}
      <ConsultationModal isOpen={isConsultOpen} onClose={() => setConsultOpen(false)} />
      <ProjectOrderModal isOpen={isOrderOpen} onClose={() => setOrderOpen(false)} />
      
      {/* Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full mx-4 animate-in zoom-in-95 duration-300">
            {/* Кнопка закрытия */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors duration-200 hover:scale-110"
              aria-label="Закрыть изображение"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Кнопка предыдущего изображения */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-200 hover:scale-110"
              aria-label="Предыдущее изображение"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Кнопка следующего изображения */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-200 hover:scale-110"
              aria-label="Следующее изображение"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Изображение */}
            <div className="bg-white rounded-lg p-2 shadow-2xl">
              <img
                src={modalImage}
                alt={modalAlt}
                className="w-full h-full object-contain rounded-lg max-h-[85vh]"
                onClick={(e) => e.stopPropagation()}
                onError={(e) => {
                  console.log('❌ Ошибка загрузки изображения в модальном окне:', modalImage);
                  e.currentTarget.src = '/placeholder.svg';
                }}
              />
            </div>
            
            {/* Счетчик изображений */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} из {galleryImages.length}
            </div>
            
            {/* Подсказка */}
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-xs">
              ← → для навигации, Escape для закрытия
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseSamaraStand;