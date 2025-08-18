import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import ConsultationModal from "@/components/ConsultationModal";
import ProjectOrderModal from "@/components/ProjectOrderModal";
import ClickableKeyword from "@/components/ClickableKeyword";

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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <header className="pt-28 sm:pt-32 pb-8">
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
      </header>

      <main className="pb-20">
        <section className="py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <article className="lg:col-span-8 max-w-3xl text-slate-700">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-slate-900">
                Стенд Самарской области на выставке‑форуме «Россия» 2023–2024
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Интерактивный просветительский стенд на ВДНХ: двусторонний экран‑парус с эффектом Naked Eye, Kinect‑игры, VR/AR, кинетический экран, LED‑шары и мультимедийные панели.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">ВДНХ, Москва</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">04.11.2023 — 08.07.2024</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">Просветительский стенд</span>
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs">Награда: Лучший просветительский стенд</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" onClick={() => setOrderOpen(true)}>Обсудить проект</Button>
                <Button variant="outline" size="lg" onClick={() => setConsultOpen(true)}>Получить консультацию</Button>
              </div>
            </article>

            <aside className="lg:col-span-4 lg:pl-6">
              <nav className="top-24 lg:sticky">
                <ul className="space-y-2">
                  {anchors.map((a) => (
                    <li key={a.id}>
                      <a className="story-link text-sm text-slate-600 hover:text-slate-900" href={`#${a.id}`}>{a.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </div>
        </section>

        <section id="tasks" className="py-12 border-t scroll-mt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-slate-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Задачи</h2>
            <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed text-slate-700">
              <li>Разработать концепцию представления стенда Самарской области на выставке‑форуме.</li>
              <li>Создать мультимедийное решение, демонстрирующее инновационность и технологичность региона.</li>
              <li>Подготовить контент для отображения на стенде.</li>
              <li>Разработать техническое решение для управления стендом.</li>
              <li>Обеспечить техническое сопровождение в период работы выставки.</li>
            </ul>
          </div>
        </section>

        <section id="implementation" className="py-12 border-t scroll-mt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl space-y-8 text-slate-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Реализация</h2>

            <div>
              <h3 className="text-2xl font-semibold mb-3">Концепция стенда</h3>
              <p className="text-lg text-slate-700 leading-relaxed">Стенд выполнен в виде ладьи, символизирующей историческое наследие Самарской области.</p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Инновационные мультимедийные системы</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <article className="clean-card">
                  <h4 className="font-semibold mb-2">Двусторонний экран‑парус</h4>
                  <ul className="list-disc pl-5 text-base leading-relaxed text-slate-700 space-y-1">
                    <li>Изогнутая часть — обложка стенда с контентом формата Naked Eye (стереоэффект без очков).</li>
                    <li>Обратная сторона — презентации, мастер‑классы, трансляции и телемосты.</li>
                  </ul>
                </article>
                <article className="clean-card">
                  <h4 className="font-semibold mb-2">Шесть вертикальных тач‑панелей (32″)</h4>
                  <ul className="list-disc pl-5 text-base leading-relaxed text-slate-700 space-y-1">
                    <li>Размещены по бокам кормы стенда.</li>
                    <li>ПО с информацией по департаментам и интерактивные игры: крестики‑нолики с «Союзом»/«Ладой», пазлы, профориентационные игры.</li>
                  </ul>
                </article>
                <article className="clean-card">
                  <h4 className="font-semibold mb-2">Две горизонтальных тач‑панели (86″) с Kinect</h4>
                  <ul className="list-disc pl-5 text-base leading-relaxed text-slate-700 space-y-1">
                    <li>Жестовое управление спортивными играми:</li>
                    <li className="ml-4">— Отбить шайбу хоккеиста ХК «Лада».</li>
                    <li className="ml-4">— Отбить мяч футболиста ФК «Крылья Советов».</li>
                    <li className="ml-4">— Забросить мяч в корзину БК «Самара».</li>
                  </ul>
                </article>
                <article className="clean-card">
                  <h4 className="font-semibold mb-2">Три LED‑шара (1,5 м)</h4>
                  <p className="text-base text-slate-700 leading-relaxed">Расположены сверху для быстрой идентификации стенда и поддержки контента.</p>
                </article>
                <article className="clean-card">
                  <h4 className="font-semibold mb-2">Кинетический экран (5×3 м)</h4>
                  <p className="text-base text-slate-700 leading-relaxed">Пиксели выдвигаются до 20 см с программируемой скоростью для видео и кинетического контента.</p>
                </article>
                <article className="clean-card">
                  <h4 className="font-semibold mb-2">Прозрачный экран</h4>
                  <p className="text-base text-slate-700 leading-relaxed">Две вертикальные панели по 55″ каждая.</p>
                </article>
                <article className="clean-card">
                  <h4 className="font-semibold mb-2">VR‑очки и AR‑очки</h4>
                  <p className="text-base text-slate-700 leading-relaxed">Для иммерсивных демонстраций и интерактивных сценариев.</p>
                </article>
                <article className="clean-card">
                  <h4 className="font-semibold mb-2">Звуковой душ</h4>
                  <p className="text-base text-slate-700 leading-relaxed">Локальное звукоусиление без избыточного шума на площадке.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="content" className="py-12 border-t scroll-mt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-slate-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Контент стенда</h2>
            <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed text-slate-700">
              <li>3D‑контент: природа, водная гладь, ладья, мост, автомобиль «Лада», памятник «Слава».</li>
              <li>3D‑герб Самарской области на парусе ладьи.</li>
              <li>Цифровые достижения региона.</li>
              <li>Проект «Самара в лицах»: арт‑проект с нейросетями о выдающихся деятелях области.</li>
              <li>Проект «Спорт в лицах»: известные спортсмены региона.</li>
              <li>Проект «Было/стало»: ключевые проекты и их результаты.</li>
              <li>Проект «Лица армии»: участники СВО.</li>
              <li>Проект «Жены героев»: истории жен и матерей участников СВО.</li>
              <li>Интерактивное AR‑приложение: сборка ракеты «Союз» и запуск.</li>
              <li>VR‑кинотеатр: ключевые фильмы о Самарской области.</li>
            </ul>
          </div>
        </section>

        <section id="management" className="py-12 border-t scroll-mt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-slate-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Управление стендом</h2>
            <ul className="list-disc pl-6 space-y-2 text-lg leading-relaxed text-slate-700">
              <li>Ежедневные мероприятия по индивидуальным сценариям.</li>
              <li>Техническое сопровождение командой специалистов.</li>
            </ul>
          </div>
        </section>

        <section id="awards" className="py-12 border-t scroll-mt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-slate-700">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Премии</h2>
            <p className="text-slate-700">Стенд получил главную премию в номинации «Лучший просветительский стенд» и был высоко оценен посетителями и первыми лицами РФ.</p>
          </div>
        </section>

        <section id="gallery" className="py-12 border-t scroll-mt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Медиа</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map((n) => (
                <div key={n} className="aspect-video rounded-xl overflow-hidden border bg-muted">
                  <img
                    src="/placeholder.svg"
                    loading="lazy"
                    alt="Стенд Самарской области — иллюстрация"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 border-t">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Обсудим похожий проект?</h2>
            <p className="text-slate-600 mb-6">Расскажите о задаче — предложим лучшее мультимедийное решение под ваши цели.</p>
            <div className="flex items-center justify-center gap-3">
              <Button size="lg" onClick={() => setOrderOpen(true)}>Обсудить проект</Button>
              <Button variant="outline" size="lg" onClick={() => setConsultOpen(true)}>Получить консультацию</Button>
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
