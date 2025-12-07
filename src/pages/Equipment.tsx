import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import AnimatedContent from '../components/AnimatedContent';
import GradientText from '../components/GradientText';
import { 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Phone,
  Mail,
  Palette,
  Layers,
  Zap,
  Theater,
  Bot,
  Monitor,
  Shirt,
  Tv,
  Projector,
  Server,
  Glasses,
  Scan,
  LayoutGrid,
  ClipboardList,
  Lightbulb,
  Package,
  Settings,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Услуги
const services = [
  {
    number: "01",
    icon: Palette,
    title: "Разработка Key Visual и контента",
    description: "Создаем единый визуальный код события. Разрабатываем Key Visual, который связывает смыслы и пространство в одну систему.",
    features: [
      "Презентации и рекламные ролики",
      "Видео-арт под реальные масштабы площадки",
      "Единая визуальная экосистема события"
    ],
    color: "from-violet-500 to-purple-600"
  },
  {
    number: "02",
    icon: Layers,
    title: "Контент под сложную геометрию",
    description: "Мы знаем физику оборудования и создаем графику специально под носитель. Каждый формат требует уникального подхода.",
    features: [
      "LED-кубы: Naked Eye 3D, анаморфные иллюзии",
      "Прозрачные экраны: эффект парящей голограммы",
      "LED-сферы: бесшовное изображение 360°",
      "Кинетика: синхронизация видео с движением"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: "03",
    icon: Zap,
    title: "Инновационный сетап и интеграция",
    description: "Подбираем оборудование, которое производит впечатление. Грамотно интегрируем решения в существующий сетап площадки.",
    features: [
      "Гибкие и прозрачные LED-экраны",
      "Кинетические системы Scalelike Matrix",
      "Транспарентная LED-ткань"
    ],
    color: "from-amber-500 to-orange-500"
  },
  {
    number: "04",
    icon: Theater,
    title: "Синхронизированное WOW-шоу",
    description: "Заставляем технологии работать как единый организм. Экраны становятся частью масштабного цифрового перформанса.",
    features: [
      "Синхронизация всех поверхностей по тайм-коду",
      "Связка мультимедиа, света и звука",
      "Медиа-серверы Watchout и Resolume"
    ],
    color: "from-pink-500 to-rose-500"
  },
  {
    number: "05",
    icon: Bot,
    title: "Цифровые маскоты и аватары",
    description: "Разрабатываем персонажей, которые живут в цифровой среде ивента. Маскот может вести диалог в реальном времени.",
    features: [
      "Навигация и мобильные приложения",
      "Интерактивное взаимодействие с аудиторией",
      "Активное участие в шоу-программе"
    ],
    color: "from-emerald-500 to-teal-500"
  }
];

// Технологии
const technologies = [
  { icon: Sparkles, name: "Кинетические экраны", desc: "Scalelike Matrix с движущимися пикселями", color: "from-violet-500 to-purple-600" },
  { icon: Shirt, name: "LED-ткань", desc: "Транспарентная, работает от пауэрбанка", color: "from-pink-500 to-rose-500" },
  { icon: Tv, name: "Прозрачные OLED", desc: "55\" сенсорные дисплеи Lumien", color: "from-cyan-500 to-blue-500" },
  { icon: Projector, name: "Лазерные проекторы", desc: "Epson до 20 000 люмен", color: "from-amber-500 to-orange-500" },
  { icon: Server, name: "Медиа-серверы", desc: "Watchout и Resolume 4×4K", color: "from-slate-600 to-slate-800" },
  { icon: Glasses, name: "VR/AR", desc: "Quest 2, Xreal, Nreal Air", color: "from-indigo-500 to-violet-500" },
  { icon: Scan, name: "Kinect & Лидары", desc: "Интерактивные инсталляции", color: "from-emerald-500 to-teal-500" },
  { icon: LayoutGrid, name: "LED-сетки", desc: "Прозрачные, до 100×15 м", color: "from-blue-500 to-indigo-500" }
];

// Процесс
const processSteps = [
  { step: "01", title: "Брифинг", desc: "Изучаем задачу и площадку", icon: ClipboardList },
  { step: "02", title: "Концепция", desc: "Разрабатываем Key Visual", icon: Lightbulb },
  { step: "03", title: "Продакшн", desc: "Создаём контент", icon: Package },
  { step: "04", title: "Интеграция", desc: "Монтаж и настройка", icon: Settings },
  { step: "05", title: "Запуск", desc: "Сопровождение на площадке", icon: Rocket }
];

const Equipment = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-24">
        {/* HERO SECTION */}
        <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-violet-50/30 to-blue-50/20">
          {/* Background effects */}
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-violet-200/40 to-purple-200/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <AnimatedContent distance={60} delay={0.2}>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-violet-200 rounded-full text-sm font-medium text-violet-700 mb-6 shadow-sm">
                  <Sparkles className="w-4 h-4 text-violet-500" />
                  Комплексные решения под ключ
                </div>
              </AnimatedContent>
              
              <AnimatedContent distance={80} delay={0.4}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                  <span className="text-slate-900">Мультимедийные и</span>
                  <br />
                  <GradientText
                    colors={['#8b5cf6', '#ec4899', '#8b5cf6']}
                    animationSpeed={6}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold"
                  >
                    интерактивные решения
                  </GradientText>
                </h1>
              </AnimatedContent>
              
              <AnimatedContent distance={60} delay={0.6}>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                  Разработаем визуальную концепцию и адаптируем ПО под ваши задачи. Подберем инновационное оборудование, произведем монтаж и запуск, а также обеспечим полное техническое сопровождение на площадке.
                </p>
              </AnimatedContent>
              
              <AnimatedContent distance={40} delay={0.8}>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-6 py-5 text-base shadow-lg hover:shadow-xl transition-all">
                    Обсудить проект
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-5 text-base">
                    Подробнее об услугах
                  </Button>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs text-blue-600 uppercase tracking-wider font-medium mb-4">
                  Наши компетенции
                </div>
                <h2 className="text-2xl lg:text-4xl font-bold tracking-tight mb-4 text-slate-900">
                  Полный цикл производства
                </h2>
                <p className="text-lg text-slate-600 max-w-[600px] mx-auto">
                  От идеи до реализации — создаём цифровые впечатления, которые запоминаются
                </p>
              </div>
            </AnimatedContent>

            <div className="flex flex-col gap-8">
              {services.map((service, index) => (
                <AnimatedContent key={service.number} distance={60} delay={index * 0.1}>
                  <Card className="bg-white border-slate-200 hover:border-violet-300 hover:shadow-xl transition-all duration-500 overflow-hidden group">
                    <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                      <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                        <div className={`text-6xl font-extrabold bg-gradient-to-r ${service.color} bg-clip-text text-transparent opacity-40 leading-none mb-4`}>
                          {service.number}
                        </div>
                        <h3 className="text-2xl font-bold mb-4 tracking-tight text-slate-900">{service.title}</h3>
                        <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
                        <div className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                              <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                <CheckCircle className="w-3 h-3 text-white" />
                              </div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={`bg-gradient-to-br from-slate-50 to-slate-100 min-h-[300px] lg:min-h-[400px] flex items-center justify-center relative overflow-hidden ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-gradient-to-r ${service.color} opacity-10 rounded-full blur-3xl`}></div>
                        <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                          <service.icon className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* TECH SECTION */}
        <section className="py-24 bg-gradient-to-br from-slate-50 to-violet-50/30">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-50 border border-violet-200 rounded-full text-xs text-violet-600 uppercase tracking-wider font-medium mb-4">
                  Технологии
                </div>
                <h2 className="text-2xl lg:text-4xl font-bold tracking-tight mb-4 text-slate-900">
                  Оборудование в арсенале
                </h2>
                <p className="text-lg text-slate-600 max-w-[600px] mx-auto">
                  Используем передовое оборудование для создания незабываемых впечатлений
                </p>
              </div>
            </AnimatedContent>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {technologies.map((tech, index) => (
                <AnimatedContent key={tech.name} distance={50} delay={index * 0.05}>
                  <Card className="bg-white border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all duration-300 text-center group hover:-translate-y-1">
                    <CardContent className="p-5">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <tech.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-sm font-semibold mb-1 text-slate-900">{tech.name}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{tech.desc}</p>
                    </CardContent>
                  </Card>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-xs text-emerald-600 uppercase tracking-wider font-medium mb-4">
                  Как мы работаем
                </div>
                <h2 className="text-2xl lg:text-4xl font-bold tracking-tight text-slate-900">
                  Путь к результату
                </h2>
              </div>
            </AnimatedContent>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
              {processSteps.map((step, index) => (
                <AnimatedContent key={step.step} distance={50} delay={index * 0.08}>
                  <div className="text-center relative group">
                    {/* Connecting line */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 right-[-12px] w-[calc(100%-64px)] h-0.5 bg-gradient-to-r from-violet-200 to-purple-200"></div>
                    )}
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-lg font-bold text-white">{step.step}</span>
                    </div>
                    <h3 className="text-sm font-semibold mb-1 text-slate-900">{step.title}</h3>
                    <p className="text-xs text-slate-500">{step.desc}</p>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
            <AnimatedContent distance={60}>
              <h2 className="text-2xl lg:text-4xl font-bold mb-6 text-white">
                Готовы создать WOW-эффект?
              </h2>
            </AnimatedContent>
            
            <AnimatedContent distance={40} delay={0.2}>
              <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
                Расскажите о вашем проекте — предложим решение, которое произведёт впечатление
              </p>
            </AnimatedContent>
            
            <AnimatedContent distance={30} delay={0.4}>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button size="lg" className="bg-white text-violet-600 hover:bg-white/90 px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all">
                  Написать нам
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-lg bg-white/5 backdrop-blur-sm">
                  <Phone className="w-5 h-5 mr-2" />
                  +7 (495) 580-75-37
                </Button>
              </div>
            </AnimatedContent>
            
            <AnimatedContent distance={20} delay={0.6}>
              <div className="text-white/70 text-sm">
                <a href="mailto:info@weshow.su" className="text-white/90 hover:text-white transition-colors">info@weshow.su</a>
                {" · "}
                <a href="https://weshow.su" className="text-white/90 hover:text-white transition-colors">weshow.su</a>
              </div>
            </AnimatedContent>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Equipment;
