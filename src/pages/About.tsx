import Header from "../components/Header";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { Sparkles, Users, TrendingUp } from "lucide-react";
import teamImage from "../content/services/multimedia-content/2025-11-11 23.35.32.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/30">
      <SEOHead
        title="О компании — WESHOW"
        description="Креативное агентство мультимедийных решений. Интерактивные инсталляции, 3D-маппинг, техническое оснащение мероприятий и иммерсивный опыт для брендов."
        url="https://weshow.su/about"
        breadcrumbs={[
          { name: 'Главная', url: 'https://weshow.su/' },
          { name: 'О компании', url: 'https://weshow.su/about' }
        ]}
      />
      <Header />
      
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 h-full w-full overflow-hidden z-0">
          <div className="absolute -top-1/4 -left-1/4 h-1/2 w-1/2 rounded-full bg-[#ee2bee]/10 blur-3xl"></div>
          <div className="absolute bottom-0 -right-1/4 h-1/2 w-1/2 rounded-full bg-[#5f2bee]/10 blur-3xl"></div>
        </div>

        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl grow flex-col px-4 sm:px-6 lg:px-8 pt-24">
          <div className="flex flex-1 flex-col items-center py-8 sm:py-12">
            <div className="flex w-full flex-col items-center gap-12 lg:gap-16">
              {/* Header Section */}
              <div className="flex flex-col items-center gap-4 text-center">
                <h1 className="font-display text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-gradient">
                  Наша история
                </h1>
                <p className="font-display max-w-2xl text-base text-slate-700 sm:text-lg">
                  Мы — креативное агентство, увлеченное созданием иммерсивных и интерактивных мультимедийных решений, помогая брендам устанавливать значимые связи со своей аудиторией.
                </p>
              </div>

              {/* Main Content Grid */}
              <div className="flex flex-col gap-8 w-full">
                {/* First Row: First Image and First Text Block */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-stretch">
                  {/* First Image */}
                  <div className="lg:col-span-5 flex">
                    <div className="w-full h-full overflow-hidden rounded-xl border border-slate-200 shadow-2xl shadow-[#ee2bee]/10 bg-white">
                      <img 
                        src="/images/team/awards-ceremony.jpg"
                        alt="Команда WESHOW с наградами премии событийной индустрии «Многогранность»"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* First Text Block */}
                  <div className="lg:col-span-7 flex">
                    <div className="space-y-6 rounded-xl border border-slate-200 p-6 sm:p-8 bg-white/80 backdrop-blur-sm shadow-sm w-full flex flex-col">
                      <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-slate-900">
                        Путь инноваций
                      </h2>
                      <p className="font-display text-base font-normal leading-relaxed text-slate-700">
                        Наша философия построена на инновациях, художественном видении и глубоком понимании цифрового взаимодействия. Мы верим в преодоление творческих границ для создания беспрецедентных впечатлений, которые находят отклик. Наш путь начался с простой идеи: объединить технологии и искусство способами, которые бросают вызов восприятию и вдохновляют на действие.
                      </p>
                      <p className="font-display text-base font-normal leading-relaxed text-slate-700">
                        От скромных начинаний до всемирно признанного агентства, наша приверженность совершенству была движущей силой. Мы процветаем на сложных задачах и посвящены воплощению самых амбициозных видений в жизнь.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Second Row: Second Image and Second Text Block */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-stretch">
                  {/* Second Image */}
                  <div className="lg:col-span-5 flex">
                    <div className="w-full h-full overflow-hidden rounded-xl border border-slate-200 shadow-2xl shadow-[#ee2bee]/10 bg-white">
                      <img 
                        src={teamImage}
                        alt="Команда WESHOW"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Second Text Block */}
                  <div className="lg:col-span-7 flex">
                    {/* Feature Section */}
                    <div className="flex flex-col gap-6 rounded-xl border border-slate-200 p-6 sm:p-8 bg-white/80 backdrop-blur-sm shadow-sm w-full h-full">
                    <div className="flex flex-col gap-2">
                      <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">Что нас движет</h2>
                      <p className="font-display text-base font-normal leading-normal text-slate-700">
                        Наш успех определяется приверженностью нашим основным ценностям.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="flex flex-1 flex-col gap-3 rounded-lg border border-[#ee2bee]/30 bg-[#ee2bee]/5 p-4 hover:bg-[#ee2bee]/10 transition-colors">
                        <Sparkles className="text-[#ee2bee] h-6 w-6" />
                        <div className="flex flex-col gap-1">
                          <h3 className="text-slate-900 text-base font-bold leading-tight">Инновации</h3>
                          <p className="text-slate-600 text-sm font-normal leading-normal">
                            Мы исследуем новые технологии для создания передовых цифровых впечатлений.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col gap-3 rounded-lg border border-[#ee2bee]/30 bg-[#ee2bee]/5 p-4 hover:bg-[#ee2bee]/10 transition-colors">
                        <Users className="text-[#ee2bee] h-6 w-6" />
                        <div className="flex flex-col gap-1">
                          <h3 className="text-slate-900 text-base font-bold leading-tight">Сотрудничество</h3>
                          <p className="text-slate-600 text-sm font-normal leading-normal">
                            Мы тесно работаем с клиентами, чтобы воплотить их уникальные видения в жизнь.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col gap-3 rounded-lg border border-[#ee2bee]/30 bg-[#ee2bee]/5 p-4 hover:bg-[#ee2bee]/10 transition-colors">
                        <TrendingUp className="text-[#ee2bee] h-6 w-6" />
                        <div className="flex flex-col gap-1">
                          <h3 className="text-slate-900 text-base font-bold leading-tight">Результат</h3>
                          <p className="text-slate-600 text-sm font-normal leading-normal">
                            Мы фокусируемся на решениях, которые выглядят красиво и дают измеримые результаты.
                          </p>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        .text-gradient {
          background-image: linear-gradient(to right, #7c3aed, #ee2bee);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  );
};

export default About;
