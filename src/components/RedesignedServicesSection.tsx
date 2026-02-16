import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const RedesignedServicesSection = () => {
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const cards = document.querySelectorAll('.service-card-3d');
            cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const rotateX = (y / rect.height) * 5;
                const rotateY = (x / rect.width) * -5;

                (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section className="py-20 bg-background text-foreground relative overflow-hidden" id="services">
            {/* Grid Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                    animation: 'gridMove 20s linear infinite'
                }}>
            </div>

            {/* Global Style Injection for animations */}
            <style>{`
        @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(20px, 20px); }
        }
      `}</style>

            <div className="container mx-auto px-4 md:px-10 relative z-10 max-w-[1400px]">
                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8">

                    <ServiceCard
                        number="01"
                        icon={<RectIcon />}
                        title="Мультимедийный контент"
                        description="Создание уникального визуального и интерактивного наполнения: 2D/3D анимация, видеоролики, motion-дизайн."
                        colSpan="lg:col-span-5"
                        link="/services/multimedia-content"
                    />

                    <ServiceCard
                        number="02"
                        icon={<CircleIcon />}
                        title="Видеопродакшн"
                        description="Полный цикл производства: сценарий, съёмка, режиссура, монтаж и постпродакшн для любых площадок."
                        colSpan="lg:col-span-7"
                        link="/services/video-production"
                    />

                    <ServiceCard
                        number="03"
                        icon={<TriangleIcon />}
                        title="ПО и игры для мероприятий"
                        description="Разработка интерактивных приложений, брендированных игр и UX-решений, усиливающих вовлечённость гостей."
                        colSpan="lg:col-span-6"
                        link="/services/software-and-games"
                    />

                    <ServiceCard
                        number="04"
                        icon={<LinesIcon />}
                        title="Технологичные выставочные стенды"
                        description="Проектируем и реализуем стенды, комбинируя архитектуру, мультимедиа и интерактивные сценарии."
                        colSpan="lg:col-span-6"
                        link="/services/technological-exhibition-stands"
                    />

                    <ServiceCard
                        number="05"
                        icon={<GridIcon />}
                        title="Аренда мультимедийного оборудования"
                        description="LED-экраны, проекторы, звук и контроль — с доставкой, монтажом и круглосуточной технической поддержкой."
                        colSpan="lg:col-span-7"
                        link="/services/rental-multimedia-equipment"
                    />

                    <ServiceCard
                        number="06"
                        icon={<ArrowIcon />}
                        title="Мультимедийные инсталляции"
                        description="Создаём световые, аудио- и кинетические инсталляции, трансформирующие пространство вашего события."
                        colSpan="lg:col-span-5"
                        link="/services/multimedia-installations"
                    />

                </div>

                {/* Tetris Game Button */}
                <div className="mt-16 flex justify-center relative z-10">
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

const ServiceCard = ({ number, icon, title, description, colSpan, link = "#" }: {
    number: string, icon: React.ReactNode, title: string, description: string, colSpan: string, link?: string
}) => (
    <Link
        to={link}
        className={`
      ${colSpan} service-card-3d group relative p-10 
      bg-card/40 backdrop-blur-md 
      border border-primary/20
      hover:-translate-y-2 hover:border-primary hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)]
      transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden rounded-3xl
    `}
        onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }}
    >
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Number */}
        <div className="absolute top-5 right-5 text-8xl font-black font-display text-transparent bg-clip-text bg-gradient-to-br from-primary/20 to-purple-500/20 opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500 select-none pointer-events-none">
            {number}
        </div>

        {/* Icon */}
        <div className="w-16 h-16 mb-8 relative text-primary group-hover:text-purple-500 transition-all duration-500">
            {icon}
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold font-display text-foreground uppercase mb-4 tracking-tight relative z-10">
            {title}
        </h3>
        <p className="text-sm font-sans leading-relaxed text-muted-foreground mb-8 relative z-10">
            {description}
        </p>

        {/* Button-like Link */}
        <span className="
      relative inline-block px-8 py-3 
      border border-primary text-primary 
      text-xs uppercase tracking-[2px] font-sans font-semibold
      overflow-hidden group/btn transition-all duration-300 rounded-full
      hover:text-white
    ">
            <span className="relative z-20 group-hover/btn:text-white transition-colors duration-300">Узнать подробнее</span>
            <span className="absolute inset-0 bg-primary -translate-x-[105%] group-hover/btn:translate-x-0 transition-transform duration-300 ease-out z-10" />
        </span>
    </Link>
);

// SVGs using currentColor to inherit text-primary/purple
const RectIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full stroke-current stroke-2 fill-none">
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path d="M8 8l8 8M16 8l-8 8" />
    </svg>
);

const CircleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full stroke-current stroke-2 fill-none">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
);

const TriangleIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full stroke-current stroke-2 fill-none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
);

const LinesIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full stroke-current stroke-2 fill-none">
        <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const GridIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full stroke-current stroke-2 fill-none">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 3v18M3 9h18" />
    </svg>
);

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full stroke-current stroke-2 fill-none">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
);

export default RedesignedServicesSection;
