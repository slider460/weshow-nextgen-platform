import { Link } from "react-router-dom";
import {
  Film,
  Video,
  Gamepad2,
  Landmark,
  MonitorSmartphone,
  Waves,
} from "lucide-react";
import type { SVGProps } from "react";

type ServiceItem = {
  title: string;
  description: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  gradient: string;
  buttonGradient: string;
  iconGradient: string;
  iconColor: string;
  link?: string;
};

const services: ServiceItem[] = [
  {
    title: "Мультимедийный контент",
    description:
      "Создание уникального визуального и интерактивного наполнения: 2D/3D анимация, видеоролики, motion-дизайн.",
    icon: Film,
    gradient: "from-[#ede9fe] to-[#f4f1ff]",
    buttonGradient: "from-[#4725f4] via-[#8b5cf6] to-[#ec4899]",
    iconGradient: "from-[#ede9fe] to-[#f4f1ff]",
    iconColor: "#4725f4",
    link: "/services/multimedia-content",
  },
  {
    title: "Видеопродакшн",
    description:
      "Полный цикл производства: сценарий, съёмка, режиссура, монтаж и постпродакшн для любых площадок.",
    icon: Video,
    gradient: "from-[#e0f2ff] to-[#f0f9ff]",
    buttonGradient: "from-[#4725f4] via-[#3b82f6] to-[#38bdf8]",
    iconGradient: "from-[#e0f2ff] to-[#f0f9ff]",
    iconColor: "#4725f4",
    link: "/services/video-production",
  },
  {
    title: "ПО и игры для мероприятий",
    description:
      "Разработка интерактивных приложений, брендированных игр и UX-решений, усиливающих вовлечённость гостей.",
    icon: Gamepad2,
    gradient: "from-[#fdeff9] to-[#fff1f2]",
    buttonGradient: "from-[#4725f4] via-[#ec4899] to-[#f97316]",
    iconGradient: "from-[#fdeff9] to-[#fff1f2]",
    iconColor: "#4725f4",
    link: "/services/software-and-games",
  },
  {
    title: "Технологичные выставочные стенды",
    description:
      "Проектируем и реализуем стенды, комбинируя архитектуру, мультимедиа и интерактивные сценарии.",
    icon: Landmark,
    gradient: "from-[#e0f2fe] to-[#ecfdf5]",
    buttonGradient: "from-[#4725f4] via-[#22d3ee] to-[#14b8a6]",
    iconGradient: "from-[#e0f2fe] to-[#ecfdf5]",
    iconColor: "#4725f4",
    link: "/services/technological-exhibition-stands",
  },
  {
    title: "Аренда мультимедийного оборудования",
    description:
      "LED-экраны, проекторы, звук и контроль — с доставкой, монтажом и круглосуточной технической поддержкой.",
    icon: MonitorSmartphone,
    gradient: "from-[#ecfdf3] to-[#f1f5f9]",
    buttonGradient: "from-[#4725f4] via-[#22c55e] to-[#15803d]",
    iconGradient: "from-[#ecfdf3] to-[#f1f5f9]",
    iconColor: "#22c55e",
    link: "/services/rental-multimedia-equipment",
  },
  {
    title: "Мультимедийные инсталляции",
    description:
      "Создаём световые, аудио- и кинетические инсталляции, трансформирующие пространство вашего события.",
    icon: Waves,
    gradient: "from-[#fff7ed] to-[#fef3c7]",
    buttonGradient: "from-[#4725f4] via-[#f97316] to-[#facc15]",
    iconGradient: "from-[#fff7ed] to-[#fef3c7]",
    iconColor: "#f97316",
    link: "/services/multimedia-installations",
  },
];

const InteractiveSolutionsSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#f6f5f8] py-16 sm:py-24">
      <div className="relative container mx-auto flex w-full flex-col items-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
            Наши услуги
          </h2>
          <p className="mt-4 max-w-2xl text-center text-base text-zinc-600">
            Мы создаём инновационные интерактивные решения, которые привлекают внимание и оставляют яркие впечатления.
          </p>
        </div>

        <div className="mt-10 w-full lg:hidden">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 pl-1 pr-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {services.map(({ title, description, icon: Icon, gradient, buttonGradient, iconGradient, iconColor, link }) => (
              <Link
                key={title}
                to={link ?? "/services"}
                className="group relative flex h-full min-w-[calc(100vw-4.5rem)] flex-1 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4725f4] focus-visible:ring-offset-2 focus-visible:ring-offset-white snap-center first:ml-3 last:mr-3 sm:min-w-[320px]"
                aria-label={`${title} — узнать подробнее`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 z-0 bg-gradient-to-tr ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-white/85 via-white/50 to-transparent" />

                <div className="relative z-20 flex h-full flex-col p-6">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-white to-transparent shadow-inner">
                    <div
                      className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-br ${iconGradient} opacity-0 blur transition-opacity duration-300 group-hover:opacity-40`}
                    />
                    <Icon className="h-8 w-8" color={iconColor} />
                  </div>

                  <div className="mt-4 flex min-h-[110px] flex-1 flex-col">
                    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{description}</p>
                  </div>

                  <span
                    className={`mt-auto inline-flex w-full items-center justify-center rounded-lg bg-[length:200%_200%] bg-[position:0%_50%] bg-gradient-to-r ${buttonGradient} px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-500 group-hover:bg-[position:100%_50%] group-hover:shadow-lg group-hover:shadow-purple-500/20 group-hover:brightness-110`}
                  >
                    Узнать подробнее
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 hidden w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid">
          {services.map(({ title, description, icon: Icon, gradient, buttonGradient, iconGradient, iconColor, link }) => (
            <Link
              key={title}
              to={link ?? "/services"}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4725f4] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label={`${title} — узнать подробнее`}
            >
              <div
                aria-hidden="true"
                className={`absolute inset-0 z-0 bg-gradient-to-tr ${gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-white/85 via-white/50 to-transparent" />

              <div className="relative z-20 flex h-full flex-col p-6">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-white to-transparent shadow-inner">
                  <div
                    className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-br ${iconGradient} opacity-0 blur transition-opacity duration-300 group-hover:opacity-40`}
                  />
                  <Icon className="h-8 w-8" color={iconColor} />
                </div>

                <div className="mt-4 flex min-h-[110px] flex-1 flex-col">
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{description}</p>
                </div>

                <span
                  className={`mt-auto inline-flex w-full items-center justify-center rounded-lg bg-[length:200%_200%] bg-[position:0%_50%] bg-gradient-to-r ${buttonGradient} px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-500 group-hover:bg-[position:100%_50%] group-hover:shadow-lg group-hover:shadow-purple-500/20 group-hover:brightness-110`}
                >
                  Узнать подробнее
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Кнопка игры */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              const event = new CustomEvent('openTetrisGame');
              window.dispatchEvent(event);
            }}
            className="group relative inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
          >
            <span className="text-2xl">🎮</span>
            <span>Играть в Тетрис</span>
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default InteractiveSolutionsSection;

