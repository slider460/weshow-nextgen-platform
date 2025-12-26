/**
 * @file: VivaxCase.tsx
 * @description: Кейс-страница рекламного ролика спортивных гелей VIVAX с Настасьей Самбурской
 * @dependencies: React, Header, Footer, Card, HeroVideoDialog, DarkVeil, Highlighter, lucide-react
 * @created: 2025-01-XX
 */

import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Card, CardContent } from '../components/ui/card'
import { Calendar, MapPin, Users, Film, Target, Lightbulb, CheckCircle } from 'lucide-react'
import DarkVeil from '../components/DarkVeil'
import { Highlighter } from '../components/ui/highlighter'
import { HeroVideoDialog } from '../components/ui/hero-video-dialog'

const VivaxCase = () => {
  // Данные кейса
  const caseData = {
    title: "Вирусный ролик VIVAX & Самбурская",
    subtitle: "Video Production & Creative",
    company: {
      name: "VIVAX / Академия Научной Красоты",
      description: "Компания VIVAX занимается производством лечебно-профилактических и гигиенических средств, формулы которых базируются на инновационных разработках, не имеющих аналогов в мире. Корпорация Академия Научной Красоты — эксклюзивный дистрибьютор профессиональных косметических средств, инъекционных препаратов и оборудования для предприятий индустрии красоты, медицинских клиник и спортивных центров в России, СНГ и странах Балтии."
    },
    tasks: [
      "Разработать креативную концепцию вирусного ролика",
      "Привлечь известную медийную персону для съёмок",
      "Создать серию комедийных ситуаций для максимального охвата аудитории",
      "Обеспечить органическое продвижение через развлекательный контент"
    ],
    solution: {
      title: "Решение",
      description: [
        "Для съёмки ролика была приглашена популярная актриса Настасья Самбурская, что обеспечило высокий интерес целевой аудитории.",
        "Сценарий включал серию комичных ситуаций, в которые актриса попадает во время тренировки, демонстрируя преимущества спортивных гелей VIVAX.",
        "В качестве локации был выбран престижный фитнес-центр X-FIT, создающий аутентичную атмосферу."
      ]
    },
    creativeConcept: {
      title: "Креативная концепция",
      description: "Юмористический подход позволил показать продукт в естественной среде использования, избегая стандартных рекламных клише. Комичные ситуации обеспечили виральность контента и органическое распространение в социальных сетях."
    },
    results: {
      title: "Результат",
      video: {
        // Placeholder - пользователь добавит свою ссылку
        src: "PLACEHOLDER_VIDEO_URL",
        poster: "/images/cases/cadr_samburskaya.jpg",
        title: "VIVAX & Самбурская — Вирусный ролик"
      }
    },
    images: {
      hero: "/images/cases/cadr_samburskaya.jpg",
      // Дополнительные изображения можно добавить позже
      gallery: []
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-sm font-medium mb-4">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-white text-[10px]">
                  <Film className="w-3 h-3" />
                </span>
                Video Production
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Вирусный ролик VIVAX
                <br />
                <span className="text-pink-400">& Настасья Самбурская</span>
              </h1>
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Calendar className="w-4 h-4" /> Проект
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <MapPin className="w-4 h-4" /> Москва, X-FIT
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Users className="w-4 h-4" /> VIVAX / Академия Научной Красоты
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
                <Highlighter action="highlight" color="#fbcfe8" strokeWidth={2}>Вирусный маркетинг</Highlighter> — 
                это искусство создания контента, которым хочется делиться. Для продвижения спортивных гелей VIVAX 
                мы разработали <Highlighter action="underline" color="#ec4899" strokeWidth={2}>креативную концепцию</Highlighter> с 
                участием <Highlighter action="highlight" color="#fde68a" strokeWidth={2}>Настасьи Самбурской</Highlighter> — 
                популярной актрисы и блогера с многомиллионной аудиторией. Юмористический сценарий обеспечил 
                <Highlighter action="box" color="#a7f3d0" strokeWidth={2}>органическое распространение</Highlighter> в социальных сетях.
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
                  poster="/images/cases/cadr_samburskaya.jpg"
                >
                  <source src="https://www.dropbox.com/scl/fi/86icczgwvhmofz1mju12r/2.VIVAX_ti_mojesh.mp4?rlkey=h2y6ls6jtoxlmuiqhpjwupp8f&st=l7rlun9d&dl=1" type="video/mp4" />
                  <source src="https://www.dropbox.com/scl/fi/86icczgwvhmofz1mju12r/2.VIVAX_ti_mojesh.mp4?rlkey=h2y6ls6jtoxlmuiqhpjwupp8f&st=l7rlun9d&raw=1" type="video/mp4" />
                </video>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Задачи */}
        <div className="flex flex-col space-y-12">
          <div className="relative pl-16">
            <h3 className="absolute left-0 top-0 text-pink-500 text-2xl font-bold transform -rotate-90 origin-top-left whitespace-nowrap">
              Задачи
            </h3>
            <ul className="space-y-4 text-lg">
              {caseData.tasks.map((task, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-pink-500 mr-3 mt-1">✓</span>
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* О компании */}
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-pink-600" />
              О заказчике
            </h3>
            <p className="text-slate-700 leading-relaxed">
              {caseData.company.description}
            </p>
          </div>
        </div>

        {/* Right Column - Решение */}
        <div className="flex flex-col space-y-12">
          <div className="relative pr-16">
            <h3 className="absolute right-0 top-0 text-purple-500 text-2xl font-bold transform rotate-90 origin-top-right whitespace-nowrap">
              Решение
            </h3>
            <div className="space-y-4 text-lg">
              {caseData.solution.description.map((desc, index) => (
                <p key={index}>{desc}</p>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-12">
            <img
              src={caseData.images.hero}
              alt="VIVAX & Самбурская — кадр из ролика"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Креативная концепция */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-pink-600 flex items-center gap-3">
                <Lightbulb className="w-8 h-8" />
                {caseData.creativeConcept.title}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {caseData.creativeConcept.description}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Узнаваемая персона</h4>
                    <p className="text-slate-600">Настасья Самбурская — гарантия внимания аудитории</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Юмористический сценарий</h4>
                    <p className="text-slate-600">Серия комичных ситуаций на тренировке</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Аутентичная локация</h4>
                    <p className="text-slate-600">Премиальный фитнес-центр X-FIT</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Вирусный потенциал</h4>
                    <p className="text-slate-600">Контент, которым хочется делиться</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Формат проекта</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Тип контента</span>
                    <span className="font-semibold text-slate-900">Вирусный ролик</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Жанр</span>
                    <span className="font-semibold text-slate-900">Комедия</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Продукт</span>
                    <span className="font-semibold text-slate-900">Спортивные гели VIVAX</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Селебрити</span>
                    <span className="font-semibold text-slate-900">Настасья Самбурская</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Локация</span>
                    <span className="font-semibold text-slate-900">X-FIT, Москва</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-pink-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Хотите создать вирусный контент?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Мы разработаем креативную концепцию, которая найдёт отклик у вашей аудитории
          </p>
          <a
            href="/contacts"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-pink-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Обсудить проект
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default VivaxCase
