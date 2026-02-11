import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import DarkVeil from "../components/DarkVeil";
import { Highlighter } from "../components/ui/highlighter";
import { HeroVideoDialog } from "../components/ui/hero-video-dialog";
import SpotlightCard from "../components/SpotlightCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";

const CaseStavropol3DMapping: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="3D Mapping шоу в Ставрополе — WESHOW"
        description="3D mapping на открытии новогодних мероприятий в Ставрополе: проекционное шоу на фасаде здания. Кейс WESHOW."
        url="https://weshow.su/portfolio/stavropol-3d-mapping"
      />
      <Header />

      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950/90 px-4 sm:px-8 py-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 opacity-70"><DarkVeil speed={0.3} scanlineIntensity={0.08} scanlineFrequency={0.03} noiseIntensity={0.02} /></div>
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[10px]">🎆</span>
                Проект 2019
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                3D Mapping шоу
                <br />
                <span className="text-blue-400">на открытии новогодних мероприятий</span>
              </h1>
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Calendar className="w-4 h-4" /> 13 декабря 2019
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <MapPin className="w-4 h-4" /> г. Ставрополь, площадь Ленина
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Users className="w-4 h-4" /> 25,000+ человек
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
                <Highlighter action="highlight" color="#bfdbfe" strokeWidth={2}>Организовать масштабное 3D mapping show</Highlighter> на открытии новогодних мероприятий в городе Ставрополь, которое бы обеспечило комфортное пребывание зрителей при огромном скоплении публики и создало максимальный <Highlighter action="underline" color="#3b82f6" strokeWidth={2}>WOW-эффект</Highlighter>.
              </p>
              <p className="text-slate-700 mb-0">
                Главный вопрос, вставший перед нами, заключался в том, как создать шоу, на котором зрителям было бы комфортно находиться, обеспечить максимальный впечатляющий эффект, ведь ожидалось более <Highlighter action="highlight" color="#fde68a" strokeWidth={2}>25,000 человек</Highlighter> на центральной площади города.
              </p>
            </CardContent>
          </Card>

          {/* Клиент и базовая информация */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Клиент</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">Администрация города Ставрополь</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Локация</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700">г. Ставрополь, площадь Ленина, здание Парламента Ставропольского края</p>
              </CardContent>
            </Card>
          </div>

          {/* Главный плейсхолдер видео */}
          <Card className="shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video">
                <HeroVideoDialog
                  animationStyle="from-center"
                  thumbnailSrc="/portfolio/Stavropol-3d/video-previews/Cadr_Stavropol.jpg"
                  thumbnailAlt="3D Mapping шоу Ставрополь — видео"
                  videoSrc="https://www.dropbox.com/scl/fi/p0f7o4exzzjhscyjhg7ae/Stavropol-3DMapping.mp4?rlkey=1jpuusb2g0nvcwrlnywirnyvv&st=egodiqwb&raw=1"
                  useVideoTag
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Вызовы проекта */}
      <section className="py-14 bg-slate-50">
        <div className="container mx-auto px-4 text-center text-gray-600 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl mb-6">Вызовы проекта</h2>
            <p className="mt-3 mb-8">
              Масштаб и сложность реализации требовали особого подхода к размещению оборудования и обеспечению комфорта зрителей.
            </p>
          </div>
          <div className="mt-12">
            <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                  ),
                  title: "Огромное скопление зрителей",
                  desc: "Необходимо было разместить оборудование так, чтобы не перекрывать обзор аудитории",
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  ),
                  title: "Открытая площадь",
                  desc: "Центральная площадь Ленина требовала специального размещения техники",
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M9.75 12a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" />
                    </svg>
                  ),
                  title: "Погодные условия",
                  desc: "Густой туман перед началом шоу создал угрозу срыва мероприятия",
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  ),
                  title: "Большое расстояние до объекта",
                  desc: "Здание Парламента находилось на значительном расстоянии, требуя мощного проекционного оборудования",
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                  ),
                  title: "Ночное мероприятие",
                  desc: "Необходимо было обеспечить яркую, четкую проекцию в условиях естественного освещения",
                },
              ].map((item, idx) => (
                <li key={idx} className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-lg text-gray-800 font-semibold">{item.title}</h3>
                  <p className="mb-0">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Решение: Технический подход */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Решение: Технический подход</h2>
          
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle>Проекционное оборудование</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4">
                Для реализации проекта было использовано <strong>27 инсталляционных лазерных проекторов Epson EB-L1755U</strong>, размещенных в специальных башнях на расстоянии <strong>97 метров</strong> от здания Парламента.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Характеристики оборудования:</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• <strong>Модель:</strong> Epson EB-L1755U</li>
                    <li>• <strong>Количество:</strong> 27 штук</li>
                    <li>• <strong>Суммарная яркость:</strong> 410,000+ люмен ANSI</li>
                    <li>• <strong>Яркость одного проектора:</strong> 15,000 люмен</li>
                    <li>• <strong>Разрешение:</strong> WUXGA (1920×1200)</li>
                    <li>• <strong>Вес:</strong> 24 кг</li>
                    <li>• <strong>Объективы:</strong> ELPLM10 (среднефокусные)</li>
                    <li>• <strong>Технология:</strong> 3LCD с лазерным источником света</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Размещение:</h3>
                  <ul className="space-y-2 text-slate-700">
                    <li>• <strong>Расстояние до фасада:</strong> 97 метров</li>
                    <li>• <strong>Расположение:</strong> Специальные проекционные башни</li>
                    <li>• <strong>Высота лазерных лучей:</strong> до 4 км в небо</li>
                    <li>• <strong>Световой поток на фасаде:</strong> 150 люкс/м²</li>
                    <li>• <strong>Контрастность:</strong> 2,500,000:1</li>
                    <li>• <strong>Источник света:</strong> Лазерный диод (760 Вт)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle>Интерактивный компонент</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 mb-4">
                Для вовлечения зрителей и создания дополнительного уровня взаимодействия было разработано специальное <strong>мобильное приложение StavAR</strong> с элементами дополненной реальности (AR).
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>• Поиск виртуальных сказочных персонажей на площади</li>
                <li>• Создание интерактивных селфи с виртуальными героями</li>
                <li>• Интеграция с основным шоу для полного погружения в атмосферу</li>
              </ul>
            </CardContent>
          </Card>

          {/* Фото проекционного оборудования */}
          <Card className="shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video">
                <img 
                  src="/portfolio/Stavropol-3d/gallery/Stavropol_3dmapping7.jpg" 
                  alt="Проекционное оборудование" 
                  className="w-full h-full object-cover"
                  onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Результаты и эффекты */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Результаты и эффекты</h2>
          
          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Основное 3D Mapping шоу</CardTitle>
              <CardDescription>Продолжительность: 8 минут непрерывного 3D маппинга</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">1. Трансформация архитектуры</h3>
                  <p className="text-slate-700">Здание Парламента преобразилось в мультимедийный экран, демонстрирующий величественные образы Ставропольского края</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">2. Виртуальные символы</h3>
                  <p className="text-slate-700">На крыше здания появились виртуальные слоны, символизирующие край Ставропольский</p>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">3. Финальный эффект</h3>
                  <p className="text-slate-700">Мощные лазерные лучи концентрировались в четырех точках здания и выстреливали в огромную мультимедийную Новогоднюю Ель, пронизывая небо на высоту до 4 км</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle>Погодные условия и воздействие</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">
                Подняло низкий туман на уровень высоты здания, тем самым обеспечив допустимую прозрачность среды для высокого качества проекции. Туман добавил объёма и дополнительного эффекта к проекции, создав естественный 3D-эффект.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg mb-6">
            <CardHeader>
              <CardTitle>После шоу: Дискотека и световое представление</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-slate-700">
                <li>• <strong>Трансформация в экран</strong> — здание Парламента превратилось в огромный мультимедийный экран, управляемый DJ'еем</li>
                <li>• <strong>Лазерные эффекты</strong> — лазеры задавали пульсацию энергетических протуберанцев над головами зрителей</li>
                <li>• <strong>Световые лучи</strong> — зенитные прожекторы рисовали в небе световыми лучами многокилометровые фигуры</li>
                <li>• <strong>Музыкальное сопровождение</strong> — 100 кВт звука поддерживали праздничную атмосферу</li>
                <li>• <strong>Полная интеграция</strong> — все присутствующие на площадке приборы участвовали в создании единого светомузыкального пространства</li>
              </ul>
            </CardContent>
          </Card>

          {/* Фото основного шоу */}
          <Card className="shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video">
                <img 
                  src="/portfolio/Stavropol-3d/gallery/Stavropol_3dmapping4.jpg" 
                  alt="3D Mapping шоу" 
                  className="w-full h-full object-cover"
                  onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ключевые достижения */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ключевые достижения проекта</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Успешное преодоление погодных условий",
                desc: "Туман был превращен в дополнительный эффект, усилив впечатление от проекции"
              },
              {
                title: "Огромная аудитория",
                desc: "Комфортное размещение оборудования позволило обеспечить обзор для 25,000+ зрителей"
              },
              {
                title: "Максимальный WOW-коэффициент",
                desc: "Комбинация 3D маппинга, лазеров, AR приложения и светомузыки создала неповторимое впечатление"
              },
              {
                title: "Техническое совершенство",
                desc: "Использование профессионального оборудования класса установки обеспечило стабильную работу"
              },
              {
                title: "Инновационный подход",
                desc: "Интеграция дополненной реальности в формате мобильного приложения добавила интерактивный элемент"
              },
              {
                title: "Масштабное воздействие",
                desc: "Проект охватил всю центральную область города благодаря мощности оборудования и высоте лазерных лучей (4 км)"
              }
            ].map((achievement, idx) => (
              <Card key={idx} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">{achievement.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Техническое решение: Детальная спецификация */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Техническое решение: Детальная спецификация</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Проекционная система</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Основной проектор:</span>
                    <span className="font-semibold text-slate-900">Epson EB-L1755U</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Количество проекторов:</span>
                    <span className="font-semibold text-slate-900">27 шт (конфигурация стека)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Технология:</span>
                    <span className="font-semibold text-slate-900">3LCD с лазерным источником</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Разрешение:</span>
                    <span className="font-semibold text-slate-900">WUXGA (1920×1200)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Яркость одного проектора:</span>
                    <span className="font-semibold text-slate-900">15,000 ANSI люмен</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Суммарная яркость:</span>
                    <span className="font-semibold text-blue-600">410,000+ люмен</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Лазерный диод:</span>
                    <span className="font-semibold text-slate-900">760 Вт</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Контрастность:</span>
                    <span className="font-semibold text-slate-900">2,500,000:1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Объективы:</span>
                    <span className="font-semibold text-slate-900">ELPLM10 (среднефокусные сменяемые)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Вес одного проектора:</span>
                    <span className="font-semibold text-slate-900">24 кг</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Размеры:</span>
                    <span className="font-semibold text-slate-900">586×211×492 мм</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Установка и размещение</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Расстояние до фасада:</span>
                    <span className="font-semibold text-slate-900">97 метров</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Расположение оборудования:</span>
                    <span className="font-semibold text-slate-900">Специальные проекционные башни</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Высота лазерных лучей:</span>
                    <span className="font-semibold text-slate-900">4+ км</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Световой поток на фасаде:</span>
                    <span className="font-semibold text-slate-900">150 люкс/м²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Площадь покрытия проекции:</span>
                    <span className="font-semibold text-slate-900">Весь фасад здания Парламента</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Дополнительное оборудование</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-700">
                  <li>• <strong>Лазерное оборудование</strong> — несколько мощных лазеров для создания световых лучей в небе</li>
                  <li>• <strong>Зенитные прожекторы</strong> — для проецирования светом многокилометровых фигур</li>
                  <li>• <strong>Звуковая система</strong> — 100 кВт мощности для поддержки музыкального сопровождения</li>
                  <li>• <strong>Система управления</strong> — центральное управление всем оборудованием для синхронизации эффектов</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Галерея (плейсхолдер) */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Фотографии и визуальные материалы</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "/portfolio/Stavropol-3d/gallery/Stavropol_3dmapping1.jpg",
              "/portfolio/Stavropol-3d/gallery/Stavropol_3dmapping2.jpg",
              "/portfolio/Stavropol-3d/gallery/Stavropol_3dmapping3.jpg",
              "/portfolio/Stavropol-3d/gallery/Stavropol_3dmapping5.jpg",
              "/portfolio/Stavropol-3d/gallery/Stavropol_3dmapping6.jpg",
              "/portfolio/Stavropol-3d/gallery/Stavropol_3dmapping8.jpg"
            ].map((src, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <img src={src} alt={`Галерея Ставрополь 3D Mapping ${i + 1}`} className="w-full h-full object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}} />
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
                Проект 3D Mapping шоу в Ставрополе продемонстрировал возможность создания грандиозного праздничного спектакля, охватившего более <strong>25,000 человек</strong>. Несмотря на неблагоприятные погодные условия (туман), команда использовала передовые технологии и творческий подход для создания незабываемого впечатления.
              </p>
              <p className="text-slate-700 mb-0">
                Интеграция традиционного 3D маппинга, лазерных эффектов, звуковой системы и мобильного AR приложения создала полноценный мультимедийный опыт, который превратил обычный праздничный концерт в грандиозное светомузыкальное представление, достойное памяти жителей города Ставрополя на долгие годы.
              </p>
              <p className="text-slate-900 font-semibold mt-4">
                Проект успешно реализован и получил признание как одно из первых масштабных 3D mapping шоу в России на открытых праздничных мероприятиях.
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

export default CaseStavropol3DMapping;

