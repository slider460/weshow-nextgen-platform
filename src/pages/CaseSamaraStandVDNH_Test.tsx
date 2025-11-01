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
import MagicBento from "../components/MagicBento";
import SpotlightCard from "../components/SpotlightCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";

const CaseSamaraStandVDNH_Test: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950/90 px-4 sm:px-8 py-10 sm:py-14">
            <div className="pointer-events-none absolute inset-0 opacity-70"><DarkVeil speed={0.3} scanlineIntensity={0.08} scanlineFrequency={0.03} noiseIntensity={0.02} /></div>
            <div className="relative text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-4">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[10px]">👥</span>
                Проект 2024
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Стенд Самарской области
                <br />
                <span className="text-blue-400">на выставке‑форуме «Россия»</span>
              </h1>
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Calendar className="w-4 h-4" /> 4 ноября 2023 — 8 июля 2024
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <MapPin className="w-4 h-4" /> Москва, ВДНХ
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-white/40 text-slate-700 text-sm">
                  <Users className="w-4 h-4" /> 18+ млн посетителей
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
                <Highlighter action="highlight" color="#bfdbfe" strokeWidth={2}>Стенд Самарской области</Highlighter> был представлен на международной <Highlighter action="underline" color="#3b82f6" strokeWidth={2}>выставке‑форуме «Россия»</Highlighter> в Москве (ВДНХ), проходившей <Highlighter action="underline" color="#3b82f6" strokeWidth={2}>с 4 ноября 2023 по 8 июля 2024 года</Highlighter>, привлекшей более <Highlighter action="highlight" color="#fde68a" strokeWidth={2}>18 миллионов посетителей</Highlighter>. Цель — показать культурные, экономические и инновационные достижения региона через современную экспозицию в виде ладьи, символизирующей историческое наследие. Проект реализован <Highlighter action="box" color="#a7f3d0" strokeWidth={2}>совместно с правительством Самарской области</Highlighter>.
              </p>
            </CardContent>
          </Card>

          {/* Главный плейсхолдер видео */}
          <Card className="shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video">
                <HeroVideoDialog
                  animationStyle="from-center"
                  thumbnailSrc="/portfolio/samara-vdnh/video-previews/hero-preview.jpg"
                  thumbnailAlt="Самарский стенд — видео"
                  videoSrc="https://www.dropbox.com/scl/fi/drwpmae1kg322wk1pk8er/1_.mp4?rlkey=iaqb0rd7trfgbgw9i3drnjiv7&raw=1"
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
            <h2 className="text-gray-800 text-3xl font-semibold sm:text-4xl">Концепция</h2>
            <p className="mt-3">
              Стенд выполнен в виде древнерусской ладьи, символизирующей культурное наследие и динамичное развитие региона. Парус олицетворяет движение, порыв, динамику и жажду открытий — всё то, с чем ассоциируется современная Самарская область.
            </p>
          </div>
          <div className="mt-12">
            <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-2">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-7 9 7-9 7-9-7z" />
                    </svg>
                  ),
                  title: "Ладья — образ экспозиции",
                  desc: "Форма древнерусской ладьи как символ культурного наследия и динамичного развития.",
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m-10.5 0L21 11.5M3 13l8 8" />
                    </svg>
                  ),
                  title: "Парус — метафора движения",
                  desc: "Порыв, динамика и жажда открытий — ключевая идея современной Самарской области.",
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

      {/* Инновационные мультимедийные системы (Детали проекта) */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Инновационные мультимедийные системы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>Двусторонний экран‑парус</CardTitle></CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">Изогнутая часть экрана служит «обложкой» стенда с контентом по технологии <strong>Naked Eye</strong>, создающей стереоскопические 3D‑эффекты без доп. устройств. Обратная сторона используется для презентаций, мастер‑классов, трансляций и телемостов.</p>
                <div className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <HeroVideoDialog
                      animationStyle="from-center"
                      thumbnailSrc="/portfolio/samara-vdnh/video-previews/screen-sail-preview.jpg"
                      thumbnailAlt="Экран‑парус — превью"
                      videoSrc="https://www.dropbox.com/scl/fi/rwvj445tlkx57x2ljpwy7/4_.mp4?rlkey=g3033ruah2sd84m4hftnd9qzw&raw=1"
                      useVideoTag
                    />
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <HeroVideoDialog
                      animationStyle="from-center"
                      thumbnailSrc="/portfolio/samara-vdnh/video-previews/screen-amphitheater-preview.jpg"
                      thumbnailAlt="Экран амфитеатра — превью"
                      videoSrc="https://www.dropbox.com/scl/fi/73qmsng5ec25nz0i4sw3d/6_.mp4?rlkey=q4z8u051rfj11qiqlojk998ra&raw=1"
                      useVideoTag
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Шесть вертикальных тач‑панелей (32")</CardTitle></CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">Размещены по бокам кормы стенда. ПО включает информацию о регионе по департаментам, а также интерактивные игры: «крестики‑нолики» с «Союз»/«Лада», пазлы, профориентационные задания. Виртуальный ассистент <strong>Ладушка</strong> сопровождает действия пользователя.</p>
                <div className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                    <img src="/portfolio/samara-vdnh/touch-panels.jpg" alt="Вертикальные тач‑панели 32 дюйма" className="w-full h-full object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}} />
                  </div>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <HeroVideoDialog
                      animationStyle="from-center"
                      thumbnailSrc="/portfolio/samara-vdnh/video-previews/touch-panels-preview.jpg"
                      thumbnailAlt="Вертикальные тач‑панели — превью"
                      videoSrc="https://www.dropbox.com/scl/fi/d9jnc8iox0628vrfodcav/5_.mp4?rlkey=jua2l5gl13zlpcl8xfm83qtxy&raw=1"
                      useVideoTag
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Горизонтальные панели с камерой Kinect</CardTitle></CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">Позволяли играть в спортивные игры с управлением через жесты — отбить шайбу хоккеиста ХК «Лада», отбить мяч футболиста ФК «Крылья Советов», забросить мяч в корзину БК «Самара».</p>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <HeroVideoDialog
                    animationStyle="from-center"
                    thumbnailSrc="/portfolio/samara-vdnh/video-previews/kinect-preview.jpg"
                    thumbnailAlt="Kinect — превью"
                    videoSrc="https://www.dropbox.com/scl/fi/alb7sei5u0ls72x9e1btf/7_-_.mp4?rlkey=0k23wlln1shion9483hejtua7&raw=1"
                    useVideoTag
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Три LED‑шара</CardTitle></CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">Распологались сверху стенда для быстрой идентификации и дополнительной поддержки контента. Основное оформление было в виде планет: Земля, Луна и Марс.</p>
                <div className="aspect-video rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img src="/portfolio/samara-vdnh/Ball-samara.jpg" alt="LED‑сфера на стенде" className="w-full h-full object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Кинетический экран</CardTitle></CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">Экран, способный выдвигать каждый пиксель на 20 см с программируемой скоростью, использовался для демонстрации кинетического видеоконтента.</p>
                <div className="w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] rounded-lg overflow-hidden">
                  <HeroVideoDialog
                    animationStyle="from-center"
                    thumbnailSrc="/portfolio/samara-vdnh/video-previews/kinetic-screen-preview.jpg"
                    thumbnailAlt="Кинетический экран — превью"
                    videoSrc="https://www.dropbox.com/scl/fi/ujm4v27s5g8n0j0rp8nmt/3_.mp4?rlkey=bfjbizphbofe4oiyt5taf8ynn&raw=1"
                    useVideoTag
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Прозрачный экран</CardTitle></CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">Состояла из двух вертикальных прозрачных панелей и отображала истории Самарской губернии и интерактивных фактов. За экраном распологалась витрина с айдентикой Самарской области.</p>
                <div className="w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] rounded-lg overflow-hidden">
                  <HeroVideoDialog
                    animationStyle="from-center"
                    thumbnailSrc="/portfolio/samara-vdnh/video-previews/transparent-screen-preview.jpg"
                    thumbnailAlt="Прозрачный экран — превью"
                    videoSrc="https://www.dropbox.com/scl/fi/2hiqhmw7bwaz2f431p66o/2_.mp4?rlkey=5hxdbifaunnlcpzvma1vbrz1c&raw=1"
                    useVideoTag
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>VR‑очки и AR</CardTitle></CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">Очки смешанной реальности использовало интерактивное приложение для сборки виртуальной ракеты «Союз», а VR очки позволяли совершать виртуальный поход в кинотеатр с фильмами о регионе.</p>
                <div className="w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img src="/portfolio/samara-vdnh/vr-ar.jpg" alt="VR и AR в зоне стенда" className="w-full h-full object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Звуковой душ и ИК‑наушники</CardTitle></CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">Локализация звука в зоне демонстрации и индивидуальные ИК‑наушники с беспроводной передачей — позволяли участникам комфортно слушают контент по всей площади стенда без звуковых конфликтов.</p>
                <div className="w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img src="/portfolio/samara-vdnh/audio-systems.jpg" alt="Звуковой душ и ИК‑наушники" className="w-full h-full object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Контент стенда */}
      <section className="py-10 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Контент стенда</h2>
          <ul className="list-disc pl-5 text-slate-700 space-y-2 mb-6">
            <li>3D‑контент с визуальными маркерами Самарской области: природа, водная гладь, ладья, транспортный мост, автомобиль «Лада», памятник «Слава».</li>
            <li>3D‑изображение герба Самарской области на парусе ладьи.</li>
            <li>Цифровые достижения региона.</li>
            <li>Проект «Самара в лицах»: арт‑проект с нейросетями, демонстрирующий выдающихся деятелей области.</li>
            <li>Проект «Спорт в лицах»: известные спортсмены региона.</li>
            <li>Проект «Было/стало»: демонстрация ключевых проектов и их результатов.</li>
            <li>Проект «Лица армии»: участники СВО, отмеченные правительством области.</li>
            <li>Проект «Жены героев»: истории жен и матерей участников СВО.</li>
            <li>Видеошоу «Запуск ракеты в космос».</li>
          </ul>
          <Card>
            <CardHeader>
              <CardTitle>Видеошоу «Запуск ракеты в космос»</CardTitle>
              <CardDescription>Для создания WOW-эффекта было разработано масштабное шоу, где полет ракетоносителя «Союз» смоделирован с учётом реального запуска, включая отделение всех ступеней и вывод корабля на орбиту Земли. В финале зрители видели Землю, на которой Самарская область была подсвечена в виде сердца. Шоу запускалось синхронно на всех мультимедийных поверхностях стенда.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden">
                <HeroVideoDialog
                  animationStyle="from-center"
                  thumbnailSrc="/portfolio/samara-vdnh/video-previews/rocket-show-preview.jpg"
                  thumbnailAlt="Видеошоу Запуск ракеты — превью"
                  videoSrc="https://www.dropbox.com/scl/fi/c8ziw1gvfhg3xw5alz2sr/8_.mp4?rlkey=ydxxjar4n2jrf7wguw0uap7oa&raw=1"
                  useVideoTag
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Результаты и достижения */}
      <section className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Результаты и достижения</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>Награды и признание</CardTitle></CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-4">
                  18 января 2024 года стенд Самарской области получил специальный приз оргкомитета «За лучшую просветительскую деятельность». Награду губернатору Дмитрию Азарову вручил первый заместитель руководителя Администрации Президента, председатель оргкомитета Сергей Кириенко.
                </p>
                <div className="w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                  <img src="/portfolio/samara-vdnh/Benefit_samara.jpg" alt="Фото с церемонии награждения" className="w-full h-full object-cover" onError={(e)=>{(e.currentTarget as HTMLImageElement).style.display='none';}} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Общественный резонанс</CardTitle></CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-slate-700 space-y-2 mb-4">
                  <li>Стенд привлёк огромное внимание с первых дней работы выставки, став одним из самых посещаемых на форуме.</li>
                  <li>Посетители отмечали высокий уровень интерактивности, образовательную ценность и запоминающиеся визуальные эффекты.</li>
                  <li>Стенд был признан одним из самых технологичных на выставке «Россия».</li>
                  <li>За время работы выставки (247 дней) её посетили более 18 миллионов человек, что превзошло по посещаемости всемирные выставки в Дубае, Милане и Шанхае.</li>
                </ul>
                <blockquote className="border-l-4 border-blue-200 pl-4 italic text-slate-700 mb-4">
                  Сергей Кириенко отметил, что стенд вдохновляет посетителей: «Если их предшественники, их современники создают такие предметы и поводы для гордости, то это заставляет их самих смелее мечтать, ставить себе цели. И это, наверное, самое главное. Это важнее количественных показателей, потому что эти изменения – в душах и в сердцах людей».
                </blockquote>
                <blockquote className="border-l-4 border-blue-200 pl-4 italic text-slate-700">
                  Губернатор Дмитрий Азаров подчеркнул: «Считаю, что номинация, в которой наш регион одержал победу, – одна из лучших. Она говорит о качественно подготовленном образовательном наполнении площадки, об активном взаимодействии с посетителями выставки».
                </blockquote>
              </CardContent>
            </Card>
          </div>

          {/* Карусель: принтскрин + видео и метрики */}
          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle>Видео о проекте</CardTitle>
              <CardDescription>Демонстрация и ключевые показатели</CardDescription>
            </CardHeader>
            <CardContent>
              <Carousel className="w-full" opts={{ align: "start", loop: true }}>
                <CarouselContent>
                  {/* Слайд 1: видео + ключевые результаты */}
                  <CarouselItem>
                    {/* Десктопная версия */}
                    <div className="hidden md:grid md:grid-cols-2 gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { n: "16 000 000+", d: "Общее количество посетителей" },
                          { n: "1000+", d: "Проведено мастер-классов" },
                          { n: "3200+", d: "Часов работы" },
                          { n: "2400+", d: "Запусков ракетоносителя \"Союз\"" }
                        ].map((m, i) => (
                          <SpotlightCard
                            key={i}
                            className="rounded-xl border border-slate-200 bg-white p-6 h-full"
                            spotlightColor="rgba(59, 130, 246, 0.2)"
                          >
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                              {m.n}
                            </div>
                            <div className="text-sm text-slate-600 mt-1">{m.d}</div>
                          </SpotlightCard>
                        ))}
                      </div>
                      <div className="w-full h-[360px] lg:h-[420px] overflow-hidden rounded-xl">
                        <HeroVideoDialog
                          animationStyle="from-center"
                          thumbnailSrc="/portfolio/samara-vdnh/video-previews/history-samara-preview.jpg"
                          thumbnailAlt="Видео о проекте – превью"
                          videoSrc="https://www.dropbox.com/scl/fi/75fboz3vw5l2na679mdpp/History_Samara.mp4?rlkey=fkznf3px1a3u7zqfu89bho2db&raw=1"
                          useVideoTag
                        />
                      </div>
                    </div>

                    {/* Мобильная версия - оптимизированная */}
                    <div className="md:hidden space-y-4">
                      {/* Видео сверху */}
                      <div className="w-full aspect-video overflow-hidden rounded-xl">
                        <HeroVideoDialog
                          animationStyle="from-center"
                          thumbnailSrc="/portfolio/samara-vdnh/video-previews/history-samara-preview.jpg"
                          thumbnailAlt="Видео о проекте – превью"
                          videoSrc="https://www.dropbox.com/scl/fi/75fboz3vw5l2na679mdpp/History_Samara.mp4?rlkey=fkznf3px1a3u7zqfu89bho2db&raw=1"
                          useVideoTag
                        />
                      </div>
                      
                      {/* Карточки метрик в компактном виде 2x2 */}
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { n: "16 000 000+", d: "Посетителей" },
                          { n: "1000+", d: "Мастер-классов" },
                          { n: "3200+", d: "Часов работы" },
                          { n: "2400+", d: "Запусков \"Союз\"" }
                        ].map((m, i) => (
                          <SpotlightCard
                            key={i}
                            className="rounded-lg border border-slate-200 bg-white p-4"
                            spotlightColor="rgba(59, 130, 246, 0.2)"
                          >
                            <div className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                              {m.n}
                            </div>
                            <div className="text-xs text-slate-600 mt-1 leading-tight">{m.d}</div>
                          </SpotlightCard>
                        ))}
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Слайд 2: структурированные метрики (без ключевых 4 показателей) */}
                  <CarouselItem>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { n: "240+ дней", d: "Дней работы стенда" },
                        { n: "700+", d: "Проведённых лекций" },
                        { n: "700+", d: "Проведённых викторин" },
                        { n: "500+", d: "Проведённых презентаций" },
                        { n: "100+", d: "Проведённых трансляций" },
                        { n: "600+", d: "Посетителей мастер-классов" },
                        { n: "200+", d: "Представленных проектов и инноваций" },
                        { n: "20+", d: "Мультимедийных устройств" },
                        { n: "600+", d: "Проведённых экскурсий" },
                        { n: "200+", d: "Сотрудников проекта" },
                        { n: "100+", d: "Приглашённых специалистов" },
                        { n: "500+", d: "Видеороликов и презентаций" }
                      ].map((m, i) => (
                        <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white">
                          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            {m.n}
                          </div>
                          <div className="text-sm text-slate-600 mt-1">{m.d}</div>
                        </div>
                      ))}
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Галерея (плейсхолдер) */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Галерея</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "/portfolio/samara-vdnh/gallery-1.jpg",
              "/portfolio/samara-vdnh/gallery-2.jpg",
              "/portfolio/samara-vdnh/gallery-3.jpg",
              "/portfolio/samara-vdnh/gallery-4.jpg",
              "/portfolio/samara-vdnh/gallery-5.jpg",
              "/portfolio/samara-vdnh/gallery-6.jpg"
            ].map((src, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                <img src={src} alt={`Галерея Самара ВДНХ ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Репортажная съемка */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Репортажная съемка</h2>
            <p className="text-lg text-slate-600 mb-6">День Самарской области на выставке‑форуме «Россия»</p>
            <Card className="shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video bg-slate-900 relative">
                  <HeroVideoDialog
                    animationStyle="from-center"
                    thumbnailSrc="/portfolio/samara-vdnh/video-previews/reportage-preview.jpg"
                    thumbnailAlt="Репортаж — превью"
                    videoSrc="https://www.dropbox.com/scl/fi/0u4diw8kbjn41lye9ld9y/30_-_.mp4?rlkey=vzu7j58zq7pkqu413lk4d6uw4&raw=1"
                    useVideoTag
                  />
                </div>
              </CardContent>
            </Card>
          </div>
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

export default CaseSamaraStandVDNH_Test;
