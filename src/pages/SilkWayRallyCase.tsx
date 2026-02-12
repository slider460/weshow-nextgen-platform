/**
 * @file: SilkWayRallyCase.tsx
 * @description: Кейс-страница 3D визуализации маршрута ралли Silk Way Rally
 * @dependencies: React, Header, Footer, Card, HeroVideoDialog, DarkVeil, Highlighter, lucide-react
 * @created: 2025-01-XX
 */

import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEOHead from '../components/SEOHead'
import { Card, CardContent } from '../components/ui/card'
import { Calendar, MapPin, Users, Map, Globe, Compass, Mountain, CheckCircle, Target, Layers, Monitor, Palette } from 'lucide-react'
import DarkVeil from '../components/DarkVeil'
import { Highlighter } from '../components/ui/highlighter'
import { HeroVideoDialog } from '../components/ui/hero-video-dialog'

const SilkWayRallyCase = () => {
  // Данные кейса
  const caseData = {
    title: "3D визуализация маршрута Silk Way Rally",
    subtitle: "Video Production & Creative",
    company: {
      name: "Silk Way Rally",
      description: "Международный ралли-марафон, проводимый с 2009 года на территории России, а также — в отдельные годы — государств Центральной Азии и Китая. Одно из крупнейших ралли-рейдовых соревнований в мире."
    },
    tasks: [
      "Разработать 3D визуализацию маршрута ралли с учётом ландшафта местности",
      "Создать презентационные материалы для предстоящей гонки",
      "Оказать техническую поддержку мероприятия"
    ],
    solution: {
      title: "Решение",
      description: [
        "Мы учли весь ландшафт местности при разработке карты. Для точности изображения мы использовали Google Earth, куда вносили координаты легенды трассы.",
        "На выходе мы подготовили для презентации полный 3D маршрут, который Владимир Чагин использовал в своей презентации.",
        "Для поддержки презентации мы произвели специальный стол для рисования песком. Контент подавался в общую презентацию верхним слоем через альфа-канал."
      ]
    },
    technologies: [
      { icon: "globe", title: "Google Earth", description: "Точные координаты легенды трассы" },
      { icon: "layers", title: "3D-моделирование", description: "Визуализация ландшафта местности" },
      { icon: "palette", title: "Sand Art", description: "Стол для рисования песком" },
      { icon: "monitor", title: "Альфа-канал", description: "Наложение контента в презентацию" }
    ],
    presenter: {
      name: "Владимир Чагин",
      role: "Использовал 3D маршрут в презентации"
    },
    results: {
      guests: "200",
      status: "KPI выполнены",
      level: "Высокий уровень проведения",
      video: {
        src: "PLACEHOLDER_VIDEO_URL",
        poster: "/images/cases/cadr_silkway.jpg",
        title: "3D Silk Way Rally — Визуализация маршрута"
      }
    },
    images: {
      hero: "/images/cases/cadr_silkway.jpg",
      backstage: [
        "/images/cases/silkway_backstage_1.jpg",
        "/images/cases/silkway_backstage_2.jpg"
      ]
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <SEOHead
        title="3D визуализация маршрута Silk Way Rally — WESHOW"
        description="3D визуализация маршрута ралли Silk Way Rally для презентации. Video production и техническая поддержка от WESHOW."
        url="https://weshow.su/portfolio/silk-way-rally"
      />
      <Header />
      
      {/* Hero Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950/90 px-4 sm:px-8 py-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <DarkVeil speed={0.3} scanlineIntensity={0.08} scanlineFrequency={0.03} noiseIntensity={0.02} />
            </div>
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-sm font-medium mb-4">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-white text-[10px]">
                  <Map className="w-3 h-3" />
                </span>
                3D Visualization
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                3D визуализация маршрута
                <br />
                <span className="text-amber-400">Silk Way Rally</span>
              </h1>
              <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto">
                Презентация предстоящей гонки с полным 3D маршрутом
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Globe className="w-4 h-4" /> Международный ралли-марафон
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Compass className="w-4 h-4" /> Россия — Азия — Китай
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Users className="w-4 h-4" /> 200 гостей
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
              <p className="text-slate-700 mb-0">
                <Highlighter action="highlight" color="#fde68a" strokeWidth={2}>Silk Way Rally</Highlighter> — 
                международный ралли-марафон, проводимый с 2009 года. Наша задача — создать 
                <Highlighter action="underline" color="#f59e0b" strokeWidth={2}>3D визуализацию маршрута</Highlighter> с 
                учётом ландшафта местности. Для точности мы использовали 
                <Highlighter action="highlight" color="#bfdbfe" strokeWidth={2}>Google Earth</Highlighter> с 
                координатами легенды трассы. Презентацию провёл 
                <Highlighter action="box" color="#a7f3d0" strokeWidth={2}>Владимир Чагин</Highlighter>.
              </p>
            </CardContent>
          </Card>

          {/* Главное видео */}
          <Card className="shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                <video 
                  controls 
                  className="w-full h-full object-contain" 
                  preload="metadata"
                  poster="/images/cases/cadr_silkway.jpg"
                >
                  <source src="https://www.dropbox.com/scl/fi/u9s9dxw4k78ptrwkix4lt/3D-Silk-Way.mp4?rlkey=rczpzy02awvwxqa0xhj2ri1dx&st=v3r23bms&dl=1" type="video/mp4" />
                  <source src="https://www.dropbox.com/scl/fi/u9s9dxw4k78ptrwkix4lt/3D-Silk-Way.mp4?rlkey=rczpzy02awvwxqa0xhj2ri1dx&st=v3r23bms&raw=1" type="video/mp4" />
                </video>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* О компании */}
      <section className="py-12 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-l-4 border-l-amber-600">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Compass className="w-8 h-8 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{caseData.company.name}</h3>
                    <p className="text-slate-600 mb-4">{caseData.company.description}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full">
                      <span className="text-amber-700 font-semibold">С 2009 года</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Задачи */}
        <div className="flex flex-col space-y-12">
          <div className="relative pl-16">
            <h3 className="absolute left-0 top-0 text-amber-500 text-2xl font-bold transform -rotate-90 origin-top-left whitespace-nowrap" style={{ transform: 'rotate(-90deg) translateX(-100%)' }}>
              Задачи
            </h3>
            <ul className="space-y-4 text-lg">
              {caseData.tasks.map((task, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-500 mr-3 mt-1">✓</span>
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* Результаты */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Результаты
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">200</span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Гостей мероприятия</div>
                  <div className="text-sm text-slate-500">Участники презентации</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">KPI проекта выполнены</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-slate-700">Мероприятие прошло на высоком уровне</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Решение */}
        <div className="flex flex-col space-y-12">
          <div className="relative pr-16">
            <h3 className="absolute right-0 top-0 text-orange-500 text-2xl font-bold transform rotate-90 origin-top-right whitespace-nowrap">
              Решение
            </h3>
            <div className="space-y-4 text-lg text-slate-700">
              {caseData.solution.description.map((desc, index) => (
                <p key={index}>{desc}</p>
              ))}
            </div>
          </div>

          {/* Владимир Чагин */}
          <Card className="shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Маршрут презентовал Владимир Чагин</h4>
                  <p className="opacity-90 text-sm leading-relaxed">Владимир Геннадьевич Чагин — российский автогонщик, семикратный победитель «Ралли Дакар» в классе грузовиков.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Технологии */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Технологии проекта
          </h2>
          <p className="text-slate-400 text-center mb-10 max-w-2xl mx-auto">
            Для создания точной 3D визуализации мы использовали передовые технологии и нестандартные решения
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Google Earth */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Google Earth</h3>
              <p className="text-slate-400">Точные координаты легенды трассы</p>
            </div>

            {/* 3D-моделирование */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">3D-моделирование</h3>
              <p className="text-slate-400">Визуализация ландшафта местности</p>
            </div>

            {/* Sand Art */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sand Art</h3>
              <p className="text-slate-400">Специальный стол для рисования песком</p>
            </div>

            {/* Альфа-канал */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Monitor className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Альфа-канал</h3>
              <p className="text-slate-400">Наложение контента в презентацию</p>
            </div>
          </div>
        </div>
      </section>

      {/* Бекстейдж */}
      <section className="py-16 bg-gradient-to-br from-slate-100 to-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
            Бекстейдж
          </h2>
          <p className="text-slate-600 text-center mb-10 max-w-2xl mx-auto">
            Для поддержки презентации мы произвели специальный стол для рисования песком. 
            Контент подавался в общую презентацию верхним слоем через альфа-канал.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Backstage Photo 1 */}
            <div className="relative group overflow-hidden rounded-xl shadow-xl">
              <div className="aspect-[4/3]">
                <img 
                  src="/images/cases/silkway_backstage_1.jpg" 
                  alt="Sand Art стол"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Sand Art стол</p>
                  <p className="text-sm opacity-80">Рисование песком для презентации</p>
                </div>
              </div>
            </div>
            
            {/* Backstage Photo 2 */}
            <div className="relative group overflow-hidden rounded-xl shadow-xl">
              <div className="aspect-[4/3]">
                <img 
                  src="/images/cases/silkway_backstage_2.jpg" 
                  alt="Техническая поддержка"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Техническая поддержка</p>
                  <p className="text-sm opacity-80">Презентация с альфа-каналом</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Детали проекта */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                <Map className="w-8 h-8 text-amber-600" />
                О проекте
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Silk Way Rally — одно из крупнейших ралли-рейдовых соревнований в мире. 
                Для презентации предстоящей гонки требовалась детальная 3D визуализация 
                маршрута с учётом реального ландшафта местности.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Точность данных</h4>
                    <p className="text-slate-600">Координаты из Google Earth</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Реалистичный ландшафт</h4>
                    <p className="text-slate-600">Полная 3D визуализация местности</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Sand Art интеграция</h4>
                    <p className="text-slate-600">Уникальный стол для рисования песком</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Техническая поддержка</h4>
                    <p className="text-slate-600">Полное сопровождение мероприятия</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Детали проекта</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Тип</span>
                    <span className="font-semibold text-slate-900">3D визуализация</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Событие</span>
                    <span className="font-semibold text-slate-900">Silk Way Rally</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Спикер</span>
                    <span className="font-semibold text-slate-900">Владимир Чагин</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Технологии</span>
                    <span className="font-semibold text-slate-900">Google Earth, Sand Art</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Гости</span>
                    <span className="font-semibold text-slate-900">200 человек</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-amber-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Нужна 3D визуализация для вашего проекта?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Создадим детальную визуализацию любого маршрута, объекта или пространства
          </p>
          <a
            href="/contacts"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-amber-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Обсудить проект
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default SilkWayRallyCase
