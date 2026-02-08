import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { Play, ArrowRight } from "lucide-react";
import { Dialog, DialogContent } from "../../components/ui/dialog";
import grafFrame from "../../content/services/multimedia-content/Graf_oformlenie.jpg";
import mappingArchitecturePoster from "../../content/services/multimedia-content/cadr_3dmapping.jpg";
import mappingCurvedPoster from "../../content/services/multimedia-content/cadr_ecran.jpg";
import nakedEyePoster from "../../content/services/multimedia-content/cadr_niked_eye.jpg";
import brandingImage from "../../content/services/multimedia-content/Macket_brending.png";
import adaptationImage from "../../content/services/multimedia-content/Adaptacia_content.jpg";
import infoPanelsPoster from "../../content/services/multimedia-content/cadr_panel.jpg";

const IMAGES = {
  broadcast: grafFrame,
  mappingArchitecture: mappingArchitecturePoster,
  mappingCurved: mappingCurvedPoster,
  nakedEye: nakedEyePoster,
  branding: brandingImage,
  vr: "/portfolio/samara-exhibition/photos/VR_Samara.jpg",
  infoPanels: infoPanelsPoster,
  adaptation: adaptationImage,
};

const VIDEO_LINKS = {
  graphics: "https://www.dropbox.com/scl/fi/r3g0hhh54e3jp979qf3rh/Graficheskie_zastavki.mp4?rlkey=2ipcvgy57pumxxwfxe5u5hda2&raw=1",
  mappingArchitecture: "https://www.dropbox.com/scl/fi/upls6horisev58zhhwno9/arhitecturnii_3dmapping.mp4?rlkey=quyv58na6o5k42qycpq97ilyy&raw=1",
  mappingCurved: "https://www.dropbox.com/scl/fi/rwvj445tlkx57x2ljpwy7/4_.mp4?rlkey=g3033ruah2sd84m4hftnd9qzw&raw=1",
  nakedEye: "https://www.dropbox.com/scl/fi/15jhyf8zht2jloiug82n1/Niked-Eye_weshow.mp4?rlkey=ugalj75kk0uigmd85jbdzkuph&raw=1",
  infoPanels: "https://www.dropbox.com/scl/fi/d9jnc8iox0628vrfodcav/5_.mp4?rlkey=jua2l5gl13zlpcl8xfm83qtxy&raw=1",
};

const heroBackground = (
  <div className="absolute top-0 left-0 h-full w-full -z-10 overflow-hidden">
    <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl" />
    <div className="absolute top-20 -right-40 h-[640px] w-[640px] rounded-full bg-purple-500/20 blur-3xl" />
    <div className="absolute top-1/2 left-[20%] h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-teal-400/10 blur-[160px]" />
  </div>
);

const PlayOverlay = () => (
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
      <Play className="h-6 w-6 text-white" />
    </div>
  </div>
);

const MultimediaContent = () => {
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null);

  return (
    <div className="min-h-screen bg-[#0c1024] text-white">
      {heroBackground}
      <Header />

      <main className="relative z-10">
        {/* HERO */}
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-28 text-center sm:pt-32">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Мультимедийный контент: <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">от идеи до воплощения</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-200/85">
            Мы создаем высококачественный мультимедийный контент, который оживляет ваши идеи и эффективно доносит их до аудитории, используя передовые технологии и креативные подходы.
          </p>
        </section>

        <div className="mx-auto max-w-6xl space-y-20 px-4 pb-12">
          {/* 1. Графическое оформление */}
          <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">Графическое оформление и заставки для мероприятий</h2>
              <p className="text-slate-200">
                Создаем яркие и динамичные заставки, титры и графическое оформление для экранов любых размеров, которые задают тон вашему мероприятию и подчеркивают его статус.
              </p>
            </div>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setActiveVideo({ src: VIDEO_LINKS.graphics, title: "Графическое оформление и заставки" })}
                className="relative block overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(79,70,229,0.55)] transition duration-300 hover:scale-[1.01]"
              >
                <img src={IMAGES.broadcast} alt="Графическое оформление" className="h-full w-full object-cover" />
                <PlayOverlay />
              </button>
              <p className="text-sm text-slate-200/80">Пример заставок и графики для мероприятий</p>
            </div>
          </section>

          {/* 2. 3D-контент и мэппинг - ДВА РОЛИКА */}
          <section className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="grid gap-6 sm:grid-cols-2 order-2 lg:order-1">
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setActiveVideo({ src: VIDEO_LINKS.mappingArchitecture, title: "Пример мэппинга на архитектуре" })}
                  className="relative block w-full aspect-video overflow-hidden rounded-2xl shadow-[0_24px_60px_-25px_rgba(79,70,229,0.55)] transition duration-300 hover:scale-[1.01]"
                >
                  <img src={IMAGES.mappingArchitecture} alt="Пример мэппинга на архитектуре" className="h-full w-full object-cover" />
                  <PlayOverlay />
                </button>
                <p className="text-sm text-slate-200/80">Пример мэппинга на архитектуре</p>
              </div>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setActiveVideo({ src: VIDEO_LINKS.mappingCurved, title: "3D-контент для изогнутого экрана" })}
                  className="relative block w-full aspect-video overflow-hidden rounded-2xl shadow-[0_24px_60px_-25px_rgba(79,70,229,0.55)] transition duration-300 hover:scale-[1.01]"
                >
                  <img src={IMAGES.mappingCurved} alt="3D-контент для изогнутого экрана" className="h-full w-full object-cover" />
                  <PlayOverlay />
                </button>
                <p className="text-sm text-slate-200/80">3D-контент для изогнутого экрана</p>
              </div>
            </div>
            <div className="space-y-4 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">3D-контент и мэппинг для сложных поверхностей</h2>
              <p className="text-slate-200">
                Создание 3D-контент для изогнутых экранов, нестандартных конструкций и архитектурных поверхностей с расчетом "пиксель в пиксель".
              </p>
            </div>
          </section>

          {/* 3. Naked Eye 3D */}
          <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">3D-контент с технологией "Naked Eye"</h2>
              <p className="text-slate-200">
                Создаем впечатляющий 3D-контент для экранов с технологией "Naked Eye", который позволяет зрителям видеть объемное изображение без использования специальных очков.
              </p>
            </div>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setActiveVideo({ src: VIDEO_LINKS.nakedEye, title: "3D-контент с технологией 'Naked Eye'" })}
                className="relative block w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(79,70,229,0.55)] transition duration-300 hover:scale-[1.01]"
              >
                <img src={IMAGES.nakedEye} alt="Naked Eye контент" className="h-full w-full object-cover" />
                <PlayOverlay />
              </button>
              <p className="text-sm text-slate-200/80">Пример 3D-контент с технологией "Naked Eye"</p>
            </div>
          </section>

          {/* 4. Комплексный брендинг */}
          <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(79,70,229,0.55)] lg:order-1">
              <img src={IMAGES.branding} alt="Комплексный брендинг" className="h-full w-full object-cover" />
            </div>
            <div className="order-1 space-y-4 lg:order-2">
              <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">Комплексный брендинг мероприятий</h2>
              <p className="text-slate-200">
                Разрабатываем единый визуальный стиль: Key Vision, контент для всех мультимедиа и брендирование физических поверхностей.
              </p>
            </div>
          </section>

          {/* 5. VR-контент */}
          <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">VR-контент и иммерсивные среды</h2>
              <p className="text-slate-200">
                Погружаем пользователей в виртуальную реальность с помощью интерактивных VR-проектов, создавая уникальный опыт и новые возможности для взаимодействия с вашим брендом.
              </p>
              <ul className="space-y-3 text-slate-200/90">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-400" />
                  Персонализированные VR-среды: интерактивные миры и симуляции.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-400" />
                  Производство 360° видео: съемка, постпродакшн и подбор оборудования.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-400" />
                  VR-кинотеатры: уникальный формат демонстрации вашего контента.
                </li>
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(79,70,229,0.55)]">
              <img src={IMAGES.vr} alt="VR контент" className="h-full w-full object-cover" />
            </div>
          </section>

          {/* 6. Контент для информационных панелей */}
          <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 space-y-3 lg:order-1">
              <button
                type="button"
                onClick={() => setActiveVideo({ src: VIDEO_LINKS.infoPanels, title: "Контент для информационных панелей" })}
                className="relative block w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(79,70,229,0.55)] transition duration-300 hover:scale-[1.01]"
              >
                <img src={IMAGES.infoPanels} alt="Контент для инфо-панелей" className="h-full w-full object-cover" />
                <PlayOverlay />
              </button>
              <p className="text-sm text-slate-200/80">Пример контента для информационных панелей</p>
            </div>
            <div className="order-1 space-y-4 lg:order-2">
              <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">Контент для информационных панелей</h2>
              <p className="text-slate-200">
                Разрабатываем информативный и привлекательный контент для тач-панелей, интерактивных столов и киосков, делая навигацию и получение информации удобными и интуитивно понятными.
              </p>
            </div>
          </section>

          {/* 7. Адаптация контента */}
          <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">Адаптация контента под любые поверхности</h2>
              <p className="text-slate-200">
                Профессионально адаптируем существующий контент под любые форматы: архитектурные фасады, сложные LED-инсталляции, изогнутые экраны и интерактивные поверхности.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(79,70,229,0.55)]">
              <img src={IMAGES.adaptation} alt="Адаптация контента" className="h-full w-full object-cover" />
            </div>
          </section>
        </div>

        {/* CTA */}
        <section className="mx-auto max-w-5xl px-4 pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 px-6 py-10 text-center shadow-[0_35px_120px_-30px_rgba(79,70,229,0.55)] sm:px-12 sm:py-16">
            <div className="absolute inset-0 bg-black/35" />
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Готовы воплотить вашу идею в жизнь?</h2>
              <p className="mx-auto max-w-2xl text-base text-slate-200/80 sm:text-lg">
                Свяжитесь с нами, чтобы обсудить ваш проект. Мы поможем создать незабываемый интерактивный опыт для вашей аудитории.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-[#6366f1] px-8 py-3 text-base font-semibold text-white shadow-[0_18px_45px_rgba(79,70,229,0.45)] transition duration-300 hover:scale-105 hover:bg-[#4f46e5]"
              >
                Запросить консультацию
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Модальное окно для видео */}
      <Dialog open={Boolean(activeVideo)} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="max-w-4xl w-full overflow-hidden border border-white/15 bg-slate-950/90 p-0 shadow-2xl">
          {activeVideo ? (
            <video
              key={activeVideo.src}
              controls
              autoPlay
              className="h-full w-full object-contain"
              src={activeVideo.src}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default MultimediaContent;
