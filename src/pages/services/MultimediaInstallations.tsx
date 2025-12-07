import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import AnimatedContent from '../../components/AnimatedContent';
import { 
  Hand, 
  Lightbulb, 
  Projector, 
  Cog, 
  Box, 
  Sparkles, 
  Volume2, 
  Leaf,
  PenTool,
  CheckCircle,
  ArrowRight,
  Building2,
  ShoppingBag,
  Hotel,
  GraduationCap,
  Landmark,
  PartyPopper,
  TreePine,
  Users,
  Shield,
  Wrench,
  Clock,
  Palette,
  Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Типы инсталляций
const installationTypes = [
  {
    icon: Hand,
    title: "Интерактивные инсталляции",
    description: "Объекты, реагирующие на действия посетителей: движение, прикосновение, голос или присутствие.",
    technologies: ["Kinect и LiDAR", "Тач-поверхности", "Motion tracking", "Gesture recognition", "Proximity sensors"],
    applications: "Музеи, выставки, ритейл, общественные пространства",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Lightbulb,
    title: "Световые инсталляции",
    description: "Художественные композиции из света, создающие атмосферу и эмоциональное воздействие.",
    technologies: ["LED-системы (RGB, RGBW)", "DMX-управление", "Лазерные установки", "Неон и fiber-optic", "Интеллектуальный свет"],
    applications: "Фасады зданий, интерьеры, фестивали, корпоративные пространства",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    icon: Projector,
    title: "Проекционные инсталляции",
    description: "3D-маппинг и проекции на любые поверхности — от архитектуры до интерактивных полов.",
    technologies: ["Лазерные проекторы", "Disguise, Resolume", "Warping и blending", "Projection mapping", "Генеративный контент"],
    applications: "Архитектурный маппинг, музеи, театры, презентации",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Cog,
    title: "Кинетические инсталляции",
    description: "Движущиеся элементы, управляемые программно: кинетические скульптуры, роботизированные конструкции.",
    technologies: ["Servo и stepper-моторы", "Программируемые контроллеры", "Кинетические LED-модули", "DMX/Art-Net", "Механические приводы"],
    applications: "Выставочные стенды, арт-пространства, премиальный ритейл",
    gradient: "from-slate-500 to-zinc-600"
  },
  {
    icon: Box,
    title: "Иммерсивные пространства",
    description: "Полностью погружающие среды, где зритель становится частью произведения.",
    technologies: ["Multi-channel projection", "Spatial audio", "LED-видеостены", "Трекинг посетителей", "VR/AR интеграция"],
    applications: "Музеи нового типа, experience-центры, бренд-пространства",
    gradient: "from-violet-500 to-purple-600"
  },
  {
    icon: Sparkles,
    title: "Голографические инсталляции",
    description: "Создание объёмных изображений без специальных очков: витрины, пирамиды, вентиляторные дисплеи.",
    technologies: ["LED fan displays", "Pepper's Ghost", "Голографические сетки", "Прозрачные LED", "3D-контент"],
    applications: "Ритейл, выставки, презентации продуктов, мероприятия",
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    icon: Volume2,
    title: "Звуковые инсталляции",
    description: "Аудио-арт и пространственный звук как самостоятельное произведение или часть композиции.",
    technologies: ["Многоканальное аудио", "Directional speakers", "Spatial Audio", "Звуковые датчики", "Генеративное аудио"],
    applications: "Музеи, public art, медитативные пространства",
    gradient: "from-emerald-500 to-green-600"
  },
  {
    icon: Leaf,
    title: "Природные инсталляции",
    description: "Интеграция живых элементов с технологиями: вертикальные сады, водные стены с проекциями.",
    technologies: ["Фитодизайн с LED", "Гидропонные системы", "Датчики среды", "Водные элементы", "Динамическое освещение"],
    applications: "Офисы, отели, торговые центры, wellness-пространства",
    gradient: "from-lime-500 to-emerald-500"
  }
];

// Этапы работы
const processSteps = [
  { 
    step: "01", 
    title: "Концепция", 
    description: "Анализируем задачу, пространство и аудиторию. Разрабатываем креативную концепцию и техническое решение.",
    icon: Lightbulb 
  },
  { 
    step: "02", 
    title: "Проектирование", 
    description: "Создаём 3D-визуализации, технические чертежи и спецификации оборудования. Согласовываем все детали.",
    icon: PenTool 
  },
  { 
    step: "03", 
    title: "Производство", 
    description: "Изготавливаем конструкции, разрабатываем контент, программируем интерактивные сценарии.",
    icon: Cog 
  },
  { 
    step: "04", 
    title: "Монтаж и запуск", 
    description: "Профессиональный монтаж, калибровка систем, тестирование и сдача проекта с обучением персонала.",
    icon: CheckCircle 
  }
];

// Преимущества
const advantages = [
  { icon: Wrench, title: "Полный цикл", description: "От идеи до техподдержки" },
  { icon: Building2, title: "Собственное производство", description: "Контроль качества на каждом этапе" },
  { icon: Palette, title: "Уникальный контент", description: "Создаём под ваш проект" },
  { icon: Users, title: "Опытная команда", description: "Инженеры, дизайнеры, программисты" },
  { icon: Shield, title: "Гарантия качества", description: "Сервисное обслуживание 24/7" },
  { icon: Clock, title: "Гибкость", description: "Временные и постоянные решения" }
];

// Сферы применения
const applications = [
  { icon: Landmark, title: "Музеи и выставочные центры" },
  { icon: Building2, title: "Корпоративные офисы и шоурумы" },
  { icon: ShoppingBag, title: "Ритейл и торговые центры" },
  { icon: Hotel, title: "Отели и HoReCa" },
  { icon: PartyPopper, title: "Развлекательные центры" },
  { icon: TreePine, title: "Городские пространства и public art" },
  { icon: Users, title: "Мероприятия и фестивали" },
  { icon: GraduationCap, title: "Образовательные учреждения" }
];

const MultimediaInstallations: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white pt-32 pb-20 overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedContent>
            <div className="max-w-4xl mx-auto text-center">
              {/* Бейдж */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium text-violet-200 mb-6 border border-white/10">
                🎨 Мультимедийные инсталляции
              </div>
              
              {/* Заголовок */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Создаём
                <span className="block bg-gradient-to-r from-violet-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  пространства, которые удивляют
                </span>
              </h1>
              
              {/* Подзаголовок */}
              <p className="text-lg md:text-xl text-violet-100/90 max-w-2xl mx-auto mb-10">
                Проектируем и реализуем мультимедийные инсталляции любой сложности — от интерактивных арт-объектов до масштабных иммерсивных пространств для музеев, выставок и коммерческих объектов.
              </p>
              
              {/* CTA кнопки */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-violet-900 hover:bg-violet-50 px-8"
                  onClick={() => navigate('/contact')}
                >
                  Обсудить проект
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 px-8"
                  onClick={() => navigate('/portfolio')}
                >
                  Смотреть портфолио
                </Button>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* Виды инсталляций */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <AnimatedContent>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-violet-600 border-violet-200 bg-violet-50">
                Наши решения
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Виды инсталляций
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Создаём инсталляции любого типа и масштаба — от компактных интерактивных объектов до масштабных иммерсивных пространств
              </p>
            </div>
          </AnimatedContent>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {installationTypes.map((type, index) => (
              <AnimatedContent key={index} delay={index * 0.1}>
                <Card className="group h-full hover:shadow-xl transition-all duration-300 border-0 overflow-hidden bg-white">
                  <div className={`h-1.5 bg-gradient-to-r ${type.gradient}`}></div>
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{type.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {type.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      <span className="font-medium">Применение:</span> {type.applications}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Процесс работы */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedContent>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-violet-600 border-violet-200 bg-violet-50">
                Как мы работаем
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Процесс создания инсталляции
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                От идеи до реализации — прозрачный и понятный процесс
              </p>
            </div>
          </AnimatedContent>

          <div className="relative">
            {/* Линия связи */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-200 via-purple-300 to-violet-200"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <AnimatedContent key={index} delay={index * 0.15}>
                  <div className="relative text-center">
                    {/* Номер шага */}
                    <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-200">
                      <span className="text-xl font-bold text-white">{step.step}</span>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                      <div className="w-10 h-10 mx-auto mb-4 rounded-lg bg-violet-50 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-violet-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <AnimatedContent>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-violet-200 border-violet-400/30 bg-white/5">
                Почему мы
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Наши преимущества
              </h2>
              <p className="text-lg text-violet-200 max-w-2xl mx-auto">
                Комплексный подход к созданию мультимедийных инсталляций
              </p>
            </div>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, index) => (
              <AnimatedContent key={index} delay={index * 0.1}>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center mb-4">
                    <adv.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{adv.title}</h3>
                  <p className="text-violet-200 text-sm">{adv.description}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* Сферы применения */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedContent>
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 text-violet-600 border-violet-200 bg-violet-50">
                Где применяем
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Сферы применения
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Создаём инсталляции для различных отраслей и пространств
              </p>
            </div>
          </AnimatedContent>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {applications.map((app, index) => (
              <AnimatedContent key={index} delay={index * 0.05}>
                <div className="bg-slate-50 rounded-xl p-5 text-center hover:bg-violet-50 hover:shadow-md transition-all group">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white shadow-sm flex items-center justify-center group-hover:bg-violet-100 transition-colors">
                    <app.icon className="w-6 h-6 text-violet-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">{app.title}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <AnimatedContent>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Готовы создать уникальную инсталляцию?
              </h2>
              <p className="text-lg text-slate-300 mb-8">
                Расскажите о вашем проекте — мы предложим оптимальное решение
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-violet-600 hover:bg-violet-700 text-white px-8"
                  onClick={() => navigate('/contact')}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Обсудить проект
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-slate-600 text-white hover:bg-slate-700 px-8"
                  onClick={() => navigate('/portfolio')}
                >
                  Смотреть работы
                </Button>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MultimediaInstallations;

