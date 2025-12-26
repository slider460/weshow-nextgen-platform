/**
 * @file: SalarisCase.tsx
 * @description: Кейс-страница презентации ТРЦ "Саларис" для ритейлеров
 * @dependencies: React, Header, Footer, Card, HeroVideoDialog, DarkVeil, Highlighter, lucide-react
 * @created: 2025-01-XX
 */

import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Card, CardContent } from '../components/ui/card'
import { Calendar, MapPin, Users, Building2, Presentation, Camera, Music, Gift, UtensilsCrossed, CheckCircle, Target, Sparkles } from 'lucide-react'
import DarkVeil from '../components/DarkVeil'
import { Highlighter } from '../components/ui/highlighter'
import { HeroVideoDialog } from '../components/ui/hero-video-dialog'

const SalarisCase = () => {
  // Данные кейса
  const caseData = {
    title: "Презентация ТРЦ «Саларис»",
    subtitle: "Event-маркетинг для ритейлеров",
    company: {
      name: "МФК Саларис",
      description: "МФК Саларис — один из крупнейших проектов в Новой Москве. Концепцией проекта предусмотрен гипермаркет, многозальный кинотеатр ведущей национальной сети, магазин электроники и бытовой техники, мебельный гипермаркет, развлекательно-досуговые форматы для всей семьи, магазины одежды и обуви, видовые рестораны и кафе.",
      area: "310 000 кв. м"
    },
    tasks: [
      "Позволить ритейлерам увидеть проект глазами собственника",
      "Рассказать о деталях инфраструктуры и архитектуры комплекса",
      "Подобрать площадку в центре Москвы рядом со станцией метро",
      "Разработать концепцию и наполнение мероприятия",
      "Оформить основную презентацию",
      "Разработать ТЗ, осуществить съёмку и монтаж видеоролика"
    ],
    solution: {
      venue: {
        name: "Арт-пространство ФотоФактура",
        description: "Площадка в центре Москвы, соответствующая всем требованиям заказчика"
      },
      elements: [
        { icon: "drink", title: "Велком-дринк", description: "Встреча гостей в начале мероприятия" },
        { icon: "food", title: "Фуршет", description: "Работал до конца мероприятия" },
        { icon: "stations", title: "3 гастростанции", description: "Крем-брюле, сорбет, оленина" },
        { icon: "photo", title: "Фото 180°", description: "3D-фото с моментальной отправкой на email" },
        { icon: "music", title: "DJ", description: "Музыкальное сопровождение всего мероприятия" },
        { icon: "gift", title: "Подарки гостям", description: "Зонтики с логотипом МФК Саларис" }
      ]
    },
    results: {
      guests: "200",
      status: "KPI выполнены",
      level: "Высокий уровень проведения",
      video: {
        src: "PLACEHOLDER_VIDEO_URL",
        poster: "/images/cases/cadr_salaris.jpg",
        title: "Презентация ТРЦ Саларис — Event"
      }
    },
    images: {
      hero: "/images/cases/cadr_salaris.jpg"
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950/90 px-4 sm:px-8 py-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <DarkVeil speed={0.3} scanlineIntensity={0.08} scanlineFrequency={0.03} noiseIntensity={0.02} />
            </div>
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-sm font-medium mb-4">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white text-[10px]">
                  <Presentation className="w-3 h-3" />
                </span>
                Event Marketing
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Презентация
                <br />
                <span className="text-violet-400">ТРЦ «Саларис»</span>
              </h1>
              <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto">
                Event-маркетинг для ритейлеров
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Users className="w-4 h-4" /> 200 гостей
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <MapPin className="w-4 h-4" /> Москва
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Building2 className="w-4 h-4" /> 310 000 м²
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
                <Highlighter action="highlight" color="#ddd6fe" strokeWidth={2}>МФК Саларис</Highlighter> — 
                один из крупнейших проектов в Новой Москве площадью <Highlighter action="underline" color="#8b5cf6" strokeWidth={2}>310 000 кв. м</Highlighter>. 
                Наша задача — провести <Highlighter action="highlight" color="#fef3c7" strokeWidth={2}>презентацию для ритейлеров</Highlighter>, 
                позволив им увидеть проект глазами собственника и оценить потенциал 
                <Highlighter action="box" color="#a7f3d0" strokeWidth={2}>коммерческих площадей</Highlighter>.
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
                  poster="/images/cases/cadr_salaris.jpg"
                >
                  <source src="https://www.dropbox.com/scl/fi/jz5iacdkdrbrysk5wfnqg/Salaris-Event-FIN180416.mp4?rlkey=0g49wp4tw2xpqmcgm3my5vxx2&st=jdq40uyi&dl=1" type="video/mp4" />
                  <source src="https://www.dropbox.com/scl/fi/jz5iacdkdrbrysk5wfnqg/Salaris-Event-FIN180416.mp4?rlkey=0g49wp4tw2xpqmcgm3my5vxx2&st=jdq40uyi&raw=1" type="video/mp4" />
                </video>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* О компании */}
      <section className="py-12 bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-xl border-l-4 border-l-violet-600">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-8 h-8 text-violet-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{caseData.company.name}</h3>
                    <p className="text-slate-600 mb-4">{caseData.company.description}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 rounded-full">
                      <span className="text-violet-700 font-semibold">Общая площадь:</span>
                      <span className="text-violet-900 font-bold">{caseData.company.area}</span>
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
            <h3 className="absolute left-0 top-0 text-violet-500 text-2xl font-bold transform -rotate-90 origin-top-left whitespace-nowrap" style={{ transform: 'rotate(-90deg) translateX(-100%)' }}>
              Задачи
            </h3>
            <ul className="space-y-4 text-lg">
              {caseData.tasks.map((task, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-violet-500 mr-3 mt-1">✓</span>
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Площадка */}
        <div className="flex flex-col space-y-12">
          <div className="relative pr-16">
            <h3 className="absolute right-0 top-0 text-purple-500 text-2xl font-bold transform rotate-90 origin-top-right whitespace-nowrap">
              Площадка
            </h3>
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{caseData.solution.venue.name}</h4>
                    <p className="text-slate-500 text-sm">Центр Москвы, рядом с метро</p>
                  </div>
                </div>
                <p className="text-slate-600">{caseData.solution.venue.description}</p>
              </CardContent>
            </Card>
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
                  <div className="text-sm text-slate-500">Представители ритейл-компаний</div>
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
      </div>

      {/* Элементы мероприятия */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Элементы мероприятия
          </h2>
          <p className="text-slate-400 text-center mb-10 max-w-2xl mx-auto">
            Мы создали комплексное событие с продуманной программой и множеством интерактивных зон
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Велком-дринк */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                <UtensilsCrossed className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Велком-дринк</h3>
              <p className="text-slate-400">Встреча гостей в начале мероприятия</p>
            </div>

            {/* Фуршет */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                <UtensilsCrossed className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Фуршет</h3>
              <p className="text-slate-400">Работал до конца мероприятия</p>
            </div>

            {/* 3 гастростанции */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">3 гастростанции</h3>
              <p className="text-slate-400">Крем-брюле, сорбет, оленина</p>
            </div>

            {/* Фото 180° */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Фото 180°</h3>
              <p className="text-slate-400">3D-фото с моментальной отправкой на email</p>
            </div>

            {/* DJ */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <Music className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">DJ</h3>
              <p className="text-slate-400">Музыкальное сопровождение всего мероприятия</p>
            </div>

            {/* Подарки */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
                <Gift className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Подарки гостям</h3>
              <p className="text-slate-400">Зонтики с логотипом МФК Саларис</p>
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
                <Presentation className="w-8 h-8 text-violet-600" />
                О мероприятии
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Цель мероприятия — показать ритейлерам потенциал одного из крупнейших 
                многофункциональных комплексов в Новой Москве. Гости получили полную информацию 
                о статусе строительства, планах открытия и возможностях для бизнеса.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Презентация проекта</h4>
                    <p className="text-slate-600">Детали инфраструктуры и архитектуры комплекса</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Видеоролик об объекте</h4>
                    <p className="text-slate-600">Профессиональная съёмка и монтаж</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Нетворкинг</h4>
                    <p className="text-slate-600">Возможность для ритейлеров познакомиться с проектом</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Интерактивные зоны</h4>
                    <p className="text-slate-600">Фото 180° и гастростанции</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Детали проекта</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Тип</span>
                    <span className="font-semibold text-slate-900">B2B Event</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Формат</span>
                    <span className="font-semibold text-slate-900">Презентация + нетворкинг</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Гости</span>
                    <span className="font-semibold text-slate-900">200 человек</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Площадка</span>
                    <span className="font-semibold text-slate-900">Арт-пространство ФотоФактура</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Локация</span>
                    <span className="font-semibold text-slate-900">Центр Москвы</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-violet-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Планируете мероприятие для партнёров?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Мы организуем event любого масштаба — от камерной презентации до масштабного форума
          </p>
          <a
            href="/contacts"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-violet-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Обсудить проект
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default SalarisCase
