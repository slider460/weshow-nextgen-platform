/**
 * @file: UazPatriotCase.tsx
 * @description: Кейс-страница рекламного ролика УАЗ Патриот & Eaton
 * @dependencies: React, Header, Footer, Card, HeroVideoDialog, DarkVeil, Highlighter, lucide-react
 * @created: 2025-01-XX
 */

import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SEOHead from '../components/SEOHead'
import { Card, CardContent } from '../components/ui/card'
import { Calendar, MapPin, Users, Film, Target, Cog, CheckCircle, Car, Mountain, Clock } from 'lucide-react'
import DarkVeil from '../components/DarkVeil'
import { Highlighter } from '../components/ui/highlighter'
import { HeroVideoDialog } from '../components/ui/hero-video-dialog'

const UazPatriotCase = () => {
  // Данные кейса
  const caseData = {
    title: "Рекламный ролик УАЗ Патриот & Eaton",
    subtitle: "Продвижение блокирующего дифференциала",
    company: {
      uaz: {
        name: "УАЗ",
        description: "Предприятие в Ульяновске, основано в июле 1941 года. Является российским производителем полноприводных автомобилей: внедорожников, легких грузовиков и микроавтобусов. Входит в состав автомобильного холдинга «Соллерс»."
      },
      eaton: {
        name: "EATON",
        description: "Американская машиностроительная корпорация, основана в 1911 году. Производитель электротехнического и гидравлического оборудования, автокомплектующих, компонентов для авиационной промышленности."
      }
    },
    tasks: [
      "Снять рекламный ролик, демонстрирующий преимущества блокировки дифференциала",
      "Согласовать сценарий с двумя компаниями — российской и международной",
      "Показать реальные возможности автомобиля в условиях бездорожья",
      "Создать убедительную картину серьёзного испытания"
    ],
    solution: {
      title: "Решение",
      description: [
        "Две крупнейшие компании, один автомобиль. Перед нами стояла непростая задача: сценарий нужно было согласовать как с российской компанией, так и с международной.",
        "Так как блокировка дифференциала — это прежде всего умение полноприводного автомобиля преодолеть суровое бездорожье, для съёмок мы взяли тестовый автомобиль и отправились проверять его возможности.",
        "В самой картине нам было необходимо, чтобы зритель поверил в серьёзное испытание, а не просто увидел «диагональное вывешивание колёс».",
        "На прешутинге с нами был представитель компании, который давал экспертную оценку возможностей автомобиля."
      ]
    },
    production: {
      title: "Производство",
      stats: [
        { label: "Съёмочных дней", value: "3", icon: "calendar" },
        { label: "Недель постпродакшн", value: "4", icon: "clock" },
        { label: "Компании-заказчика", value: "2", icon: "users" }
      ]
    },
    results: {
      title: "Результат",
      description: "За три съёмочных дня нам удалось отснять весь необходимый материал. Спустя четыре недели мы завершили постпродакшн и выпустили ролик.",
      video: {
        src: "PLACEHOLDER_VIDEO_URL",
        poster: "/images/cases/cadr_yaz.jpg",
        title: "УАЗ Патриот & Eaton — Рекламный ролик"
      }
    },
    images: {
      hero: "/images/cases/cadr_yaz.jpg",
      backstage: [
        "/images/cases/uaz_backstage_1.jpg",
        "/images/cases/uaz_backstage_2.jpg"
      ]
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <SEOHead
        title="Рекламный ролик УАЗ Патриот & Eaton — WESHOW"
        description="Видеопродакшн рекламного ролика УАЗ Патриот и Eaton: блокирующий дифференциал, съёмки в условиях бездорожья. Кейс WESHOW."
        url="https://weshow.su/portfolio/uaz-patriot-eaton"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-sm font-medium mb-4">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-white text-[10px]">
                  <Car className="w-3 h-3" />
                </span>
                Video Production
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Рекламный ролик
                <br />
                <span className="text-orange-400">УАЗ Патриот & Eaton</span>
              </h1>
              <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto">
                Продвижение блокирующего дифференциала
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Calendar className="w-4 h-4" /> 3 съёмочных дня
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Mountain className="w-4 h-4" /> Бездорожье
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Users className="w-4 h-4" /> УАЗ & EATON
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
                <Highlighter action="highlight" color="#fed7aa" strokeWidth={2}>Две крупнейшие компании</Highlighter> — 
                российский УАЗ и американская EATON — объединились для создания рекламного ролика. 
                Наша задача: <Highlighter action="underline" color="#ea580c" strokeWidth={2}>показать реальные возможности</Highlighter> блокировки 
                дифференциала в условиях <Highlighter action="highlight" color="#d1d5db" strokeWidth={2}>сурового бездорожья</Highlighter>. 
                Зритель должен был поверить в <Highlighter action="box" color="#86efac" strokeWidth={2}>серьёзное испытание</Highlighter>, 
                а не просто увидеть постановочные кадры.
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
                  poster="/images/cases/cadr_yaz.jpg"
                >
                  <source src="https://www.dropbox.com/scl/fi/mdlh2n2cgjf0isub18ccv/Eaton-Yaz.mp4?rlkey=xjpsfo2ze8s0jw0h13s8nvtm8&st=jrzjndfy&dl=1" type="video/mp4" />
                  <source src="https://www.dropbox.com/scl/fi/mdlh2n2cgjf0isub18ccv/Eaton-Yaz.mp4?rlkey=xjpsfo2ze8s0jw0h13s8nvtm8&st=jrzjndfy&raw=1" type="video/mp4" />
                </video>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Компании-заказчики */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Компании-заказчики</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="shadow-lg border-l-4 border-l-green-600">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-700 font-bold text-lg">УАЗ</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{caseData.company.uaz.name}</h3>
                </div>
                <p className="text-slate-600">{caseData.company.uaz.description}</p>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg border-l-4 border-l-orange-600">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Cog className="w-6 h-6 text-orange-700" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{caseData.company.eaton.name}</h3>
                </div>
                <p className="text-slate-600">{caseData.company.eaton.description}</p>
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
            <h3 className="absolute left-0 top-0 text-orange-500 text-2xl font-bold transform -rotate-90 origin-top-left whitespace-nowrap" style={{ transform: 'rotate(-90deg) translateX(-100%)' }}>
              Задачи
            </h3>
            <ul className="space-y-4 text-lg">
              {caseData.tasks.map((task, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-500 mr-3 mt-1">✓</span>
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* Статистика производства */}
          <div className="bg-gradient-to-br from-slate-100 to-orange-50 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Производство
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">3</div>
                <div className="text-sm text-slate-600">съёмочных дня</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">4</div>
                <div className="text-sm text-slate-600">недели постпродакшн</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">2</div>
                <div className="text-sm text-slate-600">компании-заказчика</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Решение */}
        <div className="flex flex-col space-y-12">
          <div className="relative pr-16">
            <h3 className="absolute right-0 top-0 text-slate-500 text-2xl font-bold transform rotate-90 origin-top-right whitespace-nowrap">
              Решение
            </h3>
            <div className="space-y-4 text-lg text-slate-700">
              {caseData.solution.description.map((desc, index) => (
                <p key={index}>{desc}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Бекстейдж */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Бекстейдж со съёмок
          </h2>
          <p className="text-slate-400 text-center mb-10 max-w-2xl mx-auto">
            На прешутинге с нами был представитель компании, который давал экспертную оценку возможностей автомобиля. После освоения локаций и согласования сценария съёмкам был дан старт.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Backstage Photo 1 */}
            <div className="relative group overflow-hidden rounded-xl">
              <div className="aspect-[4/3]">
                <img 
                  src="/images/cases/uaz_backstage_1.jpg" 
                  alt="Съёмка главного героя"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Съёмка главного героя</p>
                </div>
              </div>
            </div>
            
            {/* Backstage Photo 2 */}
            <div className="relative group overflow-hidden rounded-xl">
              <div className="aspect-[4/3]">
                <img 
                  src="/images/cases/uaz_backstage_2.jpg" 
                  alt="Съёмочный процесс"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Съёмочный процесс</p>
                  <p className="text-sm opacity-80">Работа на локации</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Особенности проекта */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-slate-900 flex items-center gap-3">
                <Target className="w-8 h-8 text-orange-600" />
                Особенности проекта
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Главная сложность проекта — согласование сценария с двумя крупными компаниями из разных стран. 
                Требовалось соблюсти интересы обеих сторон и создать контент, который удовлетворит как российского, 
                так и международного заказчика.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Международное согласование</h4>
                    <p className="text-slate-600">Работа с российской и американской компанией</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Реальные испытания</h4>
                    <p className="text-slate-600">Тестовый автомобиль на настоящем бездорожье</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Экспертная оценка</h4>
                    <p className="text-slate-600">Представитель компании на прешутинге</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">Убедительная картина</h4>
                    <p className="text-slate-600">Серьёзные испытания, а не постановка</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 to-slate-500 rounded-2xl blur-2xl opacity-20"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Детали проекта</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Тип контента</span>
                    <span className="font-semibold text-slate-900">Рекламный ролик</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Продукт</span>
                    <span className="font-semibold text-slate-900">Блокировка дифференциала</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Автомобиль</span>
                    <span className="font-semibold text-slate-900">УАЗ Патриот</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="text-gray-600">Заказчики</span>
                    <span className="font-semibold text-slate-900">УАЗ & EATON</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Локация</span>
                    <span className="font-semibold text-slate-900">Бездорожье</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Нужен рекламный ролик для вашего продукта?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Мы создадим контент, который покажет реальные преимущества вашего товара
          </p>
          <a
            href="/contacts"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Обсудить проект
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default UazPatriotCase
