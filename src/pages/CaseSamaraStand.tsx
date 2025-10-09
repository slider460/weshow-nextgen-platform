import React, { useEffect, useMemo, useState } from "react";
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
  ArrowRight,
  Play,
  Eye,
  Trophy,
  Lightbulb,
  Settings,
  CheckCircle2,
  Heart,
  Rocket
} from "lucide-react";
import { Link } from "react-router-dom";
import ConsultationModal from "../components/ConsultationModal";
import ProjectOrderModal from "../components/ProjectOrderModal";
import ClickableKeyword from "../components/ClickableKeyword";

const CaseSamaraStand: React.FC = () => {
  // SEO: title, meta, canonical, breadcrumbs JSON-LD
  useEffect(() => {
    const title = "Стенд Самарской области — кейс ВДНХ ‘Россия’ 2023–2024";
    const description = "Кейс: мультимедийный стенд Самарской области на выставке‑форуме ‘Россия’ — Naked Eye, Kinect‑игры, VR/AR, кинетический экран, LED‑шары.";
    document.title = title;

    const metaName = "description";
    let meta = document.querySelector(`meta[name="${metaName}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", metaName);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    // Canonical
    const canonicalHref = window.location.origin + "/portfolio/samara-stand";
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.setAttribute("rel", "canonical");
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute("href", canonicalHref);

    // Breadcrumbs JSON-LD
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: window.location.origin + "/" },
        { "@type": "ListItem", position: 2, name: "Портфолио", item: window.location.origin + "/portfolio" },
        { "@type": "ListItem", position: 3, name: "Стенд Самарской области" }
      ]
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Modals state
  const [isConsultOpen, setConsultOpen] = useState(false);
  const [isOrderOpen, setOrderOpen] = useState(false);

  const anchors = useMemo(() => (
    [
      { id: "tasks", label: "Задачи" },
      { id: "implementation", label: "Реализация" },
      { id: "content", label: "Контент" },
      { id: "management", label: "Управление" },
      { id: "awards", label: "Премии" },
      { id: "gallery", label: "Медиа" },
    ]
  ), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 text-slate-900">
      <Header />

      <header className="pt-28 sm:pt-32 pb-8 bg-gradient-to-r from-blue-600/5 to-purple-600/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="hover:text-blue-600 transition-colors">Главная</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/portfolio" className="hover:text-blue-600 transition-colors">Портфолио</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-blue-600 font-medium">Стенд Самарской области</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="pb-20">
        <section className="py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="mb-12">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50">
                <img
                  src="/portfolio/samara-stand-main.jpg"
                  alt="Стенд Самарской области на выставке-форуме «Россия» 2023–2024"
                  className="w-full h-[400px] lg:h-[600px] object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-white/90 text-slate-700">
                      <MapPin className="w-3 h-3 mr-1" />
                      ВДНХ, Москва
                    </Badge>
                    <Badge variant="secondary" className="bg-white/90 text-slate-700">
                      <Calendar className="w-3 h-3 mr-1" />
                      04.11.2023 — 08.07.2024
                    </Badge>
                    <Badge variant="secondary" className="bg-white/90 text-slate-700">
                      <Award className="w-3 h-3 mr-1" />
                      Лучший просветительский стенд
                    </Badge>
                  </div>
                  <h1 className="text-3xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    Стенд Самарской области на выставке‑форуме «Россия»
                  </h1>
                  <p className="text-lg lg:text-xl text-white/90 leading-relaxed max-w-4xl mb-6">
                    Интерактивный просветительский стенд с инновационными технологиями: Naked Eye эффекты, Kinect‑игры, VR/AR, кинетический экран и мультимедийные панели.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button size="lg" onClick={() => setOrderOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Обсудить проект
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setConsultOpen(true)} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <Users className="w-4 h-4 mr-2" />
                      Получить консультацию
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <article className="lg:col-span-8 max-w-3xl">
                {/* Project Stats */}
                <Card className="mb-8 border-slate-200/50 shadow-sm">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">8+</div>
                        <div className="text-sm text-slate-600">Технологий</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">6</div>
                        <div className="text-sm text-slate-600">Месяцев работы</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">1</div>
                        <div className="text-sm text-slate-600">Главная премия</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
                        <div className="text-sm text-slate-600">Успех проекта</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </article>

              <aside className="lg:col-span-4 lg:pl-6">
                <Card className="sticky top-24 border-slate-200/50 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Навигация по проекту</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <nav>
                      <ul className="space-y-2">
                        {anchors.map((a) => (
                          <li key={a.id}>
                            <a 
                              className="flex items-center text-sm text-slate-600 hover:text-blue-600 transition-colors py-2 px-3 rounded-lg hover:bg-blue-50" 
                              href={`#${a.id}`}
                            >
                              <ArrowRight className="w-3 h-3 mr-2" />
                              {a.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </div>
        </section>

        <section id="tasks" className="py-16 bg-white/50 scroll-mt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Задачи проекта
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Комплексный подход к созданию интерактивного просветительского стенда
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: <Lightbulb className="w-6 h-6" />,
                  title: "Концепция стенда",
                  description: "Разработать концепцию представления стенда Самарской области на выставке‑форуме"
                },
                {
                  icon: <Monitor className="w-6 h-6" />,
                  title: "Мультимедийное решение",
                  description: "Создать интерактивное решение, демонстрирующее инновационность и технологичность региона"
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "Контент для стенда",
                  description: "Подготовить качественный контент для отображения на всех интерактивных поверхностях"
                },
                {
                  icon: <Settings className="w-6 h-6" />,
                  title: "Техническое решение",
                  description: "Разработать комплексную систему управления всеми мультимедийными компонентами стенда"
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Техническое сопровождение",
                  description: "Обеспечить полное техническое сопровождение в период работы выставки"
                },
                {
                  icon: <Trophy className="w-6 h-6" />,
                  title: "Достижение результата",
                  description: "Получить признание как лучший просветительский стенд выставки"
                }
              ].map((task, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-slate-200/50 hover:border-blue-200">
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                      {task.icon}
                    </div>
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">{task.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="implementation" className="py-16 bg-gradient-to-br from-blue-50/30 to-purple-50/30 scroll-mt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Реализация проекта
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Инновационные мультимедийные решения и передовые технологии
              </p>
            </div>

            <Tabs defaultValue="concept" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="concept">Концепция</TabsTrigger>
                <TabsTrigger value="technologies">Технологии</TabsTrigger>
                <TabsTrigger value="systems">Системы</TabsTrigger>
              </TabsList>
              
              <TabsContent value="concept" className="space-y-6">
                <Card className="border-slate-200/50 shadow-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <Star className="w-6 h-6 mr-3 text-yellow-500" />
                      Концепция стенда
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg text-slate-700 leading-relaxed mb-4">
                      Стенд выполнен в виде ладьи, символизирующей историческое наследие Самарской области. 
                      Эта концепция объединяет прошлое и будущее региона через современные мультимедийные технологии.
                    </p>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-lg mb-2">Ключевые элементы дизайна:</h4>
                      <ul className="space-y-2 text-slate-700">
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                          Форма ладьи как символ исторического наследия
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                          Современные материалы и технологии
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                          Интерактивные элементы для вовлечения посетителей
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="technologies" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: <Eye className="w-6 h-6" />,
                      title: "Naked Eye 3D",
                      description: "Стереоэффект без очков на двустороннем экране-парусе",
                      features: ["Изогнутая поверхность", "Стереоэффект", "Двустороннее отображение"]
                    },
                    {
                      icon: <Gamepad2 className="w-6 h-6" />,
                      title: "Kinect технологии",
                      description: "Жестовое управление спортивными играми",
                      features: ["Хоккей", "Футбол", "Баскетбол"]
                    },
                    {
                      icon: <Globe className="w-6 h-6" />,
                      title: "VR/AR решения",
                      description: "Иммерсивные демонстрации и интерактивные сценарии",
                      features: ["VR-кинотеатр", "AR-приложения", "Иммерсивный контент"]
                    },
                    {
                      icon: <Monitor className="w-6 h-6" />,
                      title: "Кинетический экран",
                      description: "Пиксели выдвигаются до 20 см с программируемой скоростью",
                      features: ["5×3 метра", "Кинетический контент", "Программируемые движения"]
                    }
                  ].map((tech, index) => (
                    <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-slate-200/50 hover:border-blue-200">
                      <CardHeader>
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mr-3">
                            {tech.icon}
                          </div>
                          <CardTitle className="text-lg">{tech.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 mb-4">{tech.description}</p>
                        <div className="space-y-1">
                          {tech.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-slate-500">
                              <CheckCircle2 className="w-3 h-3 mr-2 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="systems" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Двусторонний экран‑парус",
                      description: "Обложка стенда с контентом формата Naked Eye",
                      details: ["Стереоэффект без очков", "Презентации и трансляции", "Мастер-классы"]
                    },
                    {
                      title: "Шесть вертикальных тач‑панелей (32″)",
                      description: "Информационные киоски по бокам стенда",
                      details: ["Информация по департаментам", "Интерактивные игры", "Профориентация"]
                    },
                    {
                      title: "Две горизонтальных тач‑панели (86″) с Kinect",
                      description: "Жестовое управление спортивными играми",
                      details: ["Хоккей ХК «Лада»", "Футбол ФК «Крылья Советов»", "Баскетбол БК «Самара»"]
                    },
                    {
                      title: "Три LED‑шара (1,5 м)",
                      description: "Идентификация стенда и поддержка контента",
                      details: ["Быстрая идентификация", "Контентная поддержка", "Визуальные эффекты"]
                    },
                    {
                      title: "Прозрачный экран",
                      description: "Две вертикальные панели по 55″ каждая",
                      details: ["Прозрачность", "Современный дизайн", "Интерактивность"]
                    },
                    {
                      title: "Звуковой душ",
                      description: "Локальное звукоусиление без избыточного шума",
                      details: ["Локальное звучание", "Контроль шума", "Качественный звук"]
                    }
                  ].map((system, index) => (
                    <Card key={index} className="border-slate-200/50 shadow-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">{system.title}</CardTitle>
                        <CardDescription>{system.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {system.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center text-sm text-slate-600">
                              <CheckCircle2 className="w-3 h-3 mr-2 text-green-500" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="content" className="py-16 bg-white scroll-mt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Контент стенда
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Многообразие интерактивного контента и проектов региона
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "3D‑контент",
                  description: "Природа, водная гладь, ладья, мост, автомобиль «Лада», памятник «Слава»",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  icon: <Star className="w-6 h-6" />,
                  title: "3D‑герб области",
                  description: "Герб Самарской области на парусе ладьи с анимацией",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  icon: <Settings className="w-6 h-6" />,
                  title: "Цифровые достижения",
                  description: "Презентация инновационных проектов и технологических достижений региона",
                  color: "from-green-500 to-emerald-500"
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "«Самара в лицах»",
                  description: "Арт‑проект с нейросетями о выдающихся деятелях области",
                  color: "from-orange-500 to-red-500"
                },
                {
                  icon: <Trophy className="w-6 h-6" />,
                  title: "«Спорт в лицах»",
                  description: "Известные спортсмены региона и их достижения",
                  color: "from-yellow-500 to-orange-500"
                },
                {
                  icon: <Lightbulb className="w-6 h-6" />,
                  title: "«Было/стало»",
                  description: "Ключевые проекты и их результаты в формате до/после",
                  color: "from-indigo-500 to-purple-500"
                },
                {
                  icon: <Award className="w-6 h-6" />,
                  title: "«Лица армии»",
                  description: "Участники СВО и их героические истории",
                  color: "from-red-500 to-pink-500"
                },
                {
                  icon: <Heart className="w-6 h-6" />,
                  title: "«Жены героев»",
                  description: "Истории жен и матерей участников СВО",
                  color: "from-pink-500 to-rose-500"
                },
                {
                  icon: <Rocket className="w-6 h-6" />,
                  title: "AR‑приложение «Союз»",
                  description: "Интерактивная сборка ракеты «Союз» и её запуск",
                  color: "from-cyan-500 to-blue-500"
                },
                {
                  icon: <Play className="w-6 h-6" />,
                  title: "VR‑кинотеатр",
                  description: "Ключевые фильмы о Самарской области в виртуальной реальности",
                  color: "from-violet-500 to-purple-500"
                }
              ].map((content, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-slate-200/50 hover:border-blue-200 overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${content.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      {content.icon}
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{content.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">{content.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="management" className="py-16 bg-gradient-to-br from-green-50/30 to-blue-50/30 scroll-mt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Управление стендом
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Профессиональное сопровождение и техническая поддержка
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-slate-200/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                    Ежедневные мероприятия
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Каждый день стенд работал по индивидуальному сценарию, адаптированному под конкретные мероприятия и аудиторию.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      Индивидуальные сценарии
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      Адаптация под аудиторию
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      Интерактивные программы
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Settings className="w-6 h-6 mr-3 text-green-600" />
                    Техническое сопровождение
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    Круглосуточная техническая поддержка командой высококвалифицированных специалистов.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      Круглосуточная поддержка
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      Профилактическое обслуживание
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                      Быстрое устранение неисправностей
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="awards" className="py-16 bg-gradient-to-br from-yellow-50/30 to-orange-50/30 scroll-mt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Премии и награды
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Признание профессионального сообщества и высокие оценки посетителей
              </p>
            </div>

            <Card className="max-w-4xl mx-auto border-slate-200/50 shadow-xl bg-gradient-to-br from-yellow-50/50 to-orange-50/50">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Trophy className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Главная премия выставки
                  </h3>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 text-lg">
                    «Лучший просветительский стенд»
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-lg mb-4 flex items-center">
                      <Star className="w-5 h-5 mr-2 text-yellow-500" />
                      Оценки экспертов
                    </h4>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                        Инновационность решений
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                        Качество технической реализации
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                        Интерактивность и вовлеченность
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-500" />
                      Отзывы посетителей
                    </h4>
                    <ul className="space-y-2 text-slate-700">
                      <li className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                        Высокие оценки первых лиц РФ
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                        Положительные отзывы посетителей
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                        Признание в профессиональном сообществе
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="gallery" className="py-16 bg-gradient-to-br from-slate-50 to-blue-50/30 scroll-mt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Медиа и фотогалерея
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Визуальные материалы проекта и моменты работы стенда
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                "/portfolio/samara-exhibition-1.jpg",
                "/portfolio/auto-exhibition.jpg", 
                "/portfolio/regions-presentation.jpg",
                "/portfolio/samara-booth.jpg",
                "/portfolio/russia-exhibition.jpg",
                "/portfolio/samara-interactive.jpg"
              ].map((src, index) => (
                <div key={index} className="aspect-video rounded-xl overflow-hidden border border-slate-200/50 bg-muted group hover:shadow-xl hover:border-blue-200 transition-all duration-300">
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
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Обсудим похожий проект?
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Расскажите о задаче — предложим лучшее мультимедийное решение под ваши цели. 
                Создадим интерактивный стенд, который впечатлит посетителей и принесет результат.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Консультация экспертов</h3>
                  <p className="text-white/80 text-sm">Получите профессиональную консультацию по вашему проекту</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Индивидуальный подход</h3>
                  <p className="text-white/80 text-sm">Разработаем уникальное решение под ваши задачи</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  onClick={() => setOrderOpen(true)}
                  className="bg-white text-blue-600 hover:bg-white/90 px-8 py-3 text-lg font-semibold"
                >
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Обсудить проект
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
    </div>
  );
};

export default CaseSamaraStand;
