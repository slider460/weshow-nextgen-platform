import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import AnimatedContent from "../../components/AnimatedContent";
import SpotlightCard from "../../components/SpotlightCard";
import GradientText from "../../components/GradientText";
import LiquidEther from "../../components/LiquidEther";
import { 
  Monitor, 
  Video, 
  Speaker, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Zap,
  Clock,
  Phone,
  Mail,
  Users,
  Globe,
  Settings,
  Truck,
  Calculator,
  Shield,
  Award,
  Headphones,
  Camera,
  Mic,
  Lightbulb,
  Projector,
  Smartphone,
  Wifi,
  Play,
  Pause,
  Volume2,
  Eye,
  Download,
  Calendar,
  MapPin,
  ChevronRight,
  Sparkles,
  Target,
  TrendingUp,
  Heart,
  ThumbsUp
} from "lucide-react";
import { Link } from "react-router-dom";

const EquipmentRental = () => {
  const equipment = [
    {
      icon: Monitor,
      title: "Видеооборудование",
      description: "Проекторы, экраны, LED-панели",
      features: ["4K проекторы", "LED-видеостены", "Интерактивные экраны"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Speaker,
      title: "Аудиооборудование", 
      description: "Микрофоны, колонки, микшеры",
      features: ["Беспроводные микрофоны", "Профессиональные колонки", "Цифровые микшеры"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Video,
      title: "Световое оборудование",
      description: "Прожекторы, стробоскопы, лазеры", 
      features: ["RGB прожекторы", "Светодиодные панели", "Лазерные установки"],
      color: "from-orange-500 to-red-500"
    }
  ];

  const rentalTypes = [
    {
      title: "Краткосрочная аренда",
      period: "1-7 дней",
      description: "Идеально для мероприятий и презентаций",
      icon: Calendar,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Среднесрочная аренда", 
      period: "1-4 недели",
      description: "Для длительных проектов и кампаний",
      icon: Clock,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Долгосрочная аренда",
      period: "от 1 месяца", 
      description: "Постоянные инсталляции и офисы",
      icon: Award,
      color: "from-purple-500 to-violet-500"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Гарантия качества",
      description: "Все оборудование проходит тщательную проверку"
    },
    {
      icon: Truck,
      title: "Быстрая доставка",
      description: "Доставка по Москве в течение 24 часов"
    },
    {
      icon: Settings,
      title: "Техническая поддержка",
      description: "Круглосуточная поддержка наших специалистов"
    },
    {
      icon: Calculator,
      title: "Гибкие цены",
      description: "Индивидуальные условия для каждого клиента"
    },
    {
      icon: Users,
      title: "Профессиональная команда",
      description: "Опытные специалисты с многолетним стажем"
    },
    {
      icon: Globe,
      title: "Широкая география",
      description: "Работаем по всей России и СНГ"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-100 to-indigo-100 rounded-full blur-3xl opacity-60"></div>
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <AnimatedContent distance={60} delay={0.2}>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 backdrop-blur-sm border border-indigo-200 text-sm font-medium text-indigo-700 mb-6">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Аренда оборудования
                </div>
              </AnimatedContent>
              
              <AnimatedContent distance={80} delay={0.4}>
                <h1 className="text-4xl lg:text-6xl font-bold leading-normal mb-6 pb-6">
                  <GradientText
                    colors={['#1e293b', '#334155', '#475569', '#1e293b']}
                    animationSpeed={8}
                    className="text-4xl lg:text-6xl font-bold"
                  >
                    Аренда профессионального оборудования
                  </GradientText>
                </h1>
              </AnimatedContent>
              
              <AnimatedContent distance={60} delay={0.6}>
                <p className="text-xl text-slate-700 leading-relaxed mb-10 max-w-3xl mx-auto">
                  Современное мультимедийное оборудование для любых мероприятий. 
                  От презентаций до масштабных конференций.
                </p>
              </AnimatedContent>
              
              <AnimatedContent distance={40} delay={0.8}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90">
                    <Calculator className="w-5 h-5 mr-2" />
                    Рассчитать стоимость
                  </Button>
                  <Button size="lg" variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                    <Phone className="w-5 h-5 mr-2" />
                    Связаться с нами
                  </Button>
                </div>
              </AnimatedContent>
            </div>
          </div>
        </section>

        {/* Equipment Types Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  <GradientText
                    colors={['#6366f1', '#8b5cf6', '#06b6d4']}
                    animationSpeed={6}
                    className="text-3xl lg:text-4xl font-bold"
                  >
                    Типы оборудования
                  </GradientText>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Широкий выбор современного оборудования для любых задач
                </p>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {equipment.map((item, index) => (
                <AnimatedContent key={item.title} distance={80} delay={index * 0.2}>
                  <Card className="group h-full bg-white shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl`}>
                          <item.icon className="h-10 w-10 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4 drop-shadow-sm">{item.title}</h3>
                        <p className="text-slate-700 mb-6 leading-relaxed">{item.description}</p>
                        <ul className="space-y-2 text-sm text-slate-600">
                          {item.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* Rental Types Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  <GradientText
                    colors={['#8b5cf6', '#ec4899', '#f59e0b']}
                    animationSpeed={7}
                    className="text-3xl lg:text-4xl font-bold"
                  >
                    Условия аренды
                  </GradientText>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Гибкие условия аренды под любые потребности
                </p>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {rentalTypes.map((type, index) => (
                <AnimatedContent key={type.title} distance={80} delay={index * 0.2}>
                  <Card className="h-full bg-white hover:shadow-xl transition-all duration-500 group border border-slate-200">
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500`}>
                        <type.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-900">{type.title}</CardTitle>
                      <Badge className={`bg-gradient-to-r ${type.color} text-white border-0 w-fit mx-auto`}>
                        {type.period}
                      </Badge>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-slate-700 leading-relaxed">{type.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  <GradientText
                    colors={['#06b6d4', '#3b82f6', '#6366f1']}
                    animationSpeed={5}
                    className="text-3xl lg:text-4xl font-bold"
                  >
                    Наши преимущества
                  </GradientText>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Почему клиенты выбирают именно нас
                </p>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {benefits.map((benefit, index) => (
                <AnimatedContent key={benefit.title} distance={80} delay={index * 0.1}>
                  <Card className="group bg-white shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                          <benefit.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                          <p className="text-slate-700 text-sm leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-50">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimatedContent distance={60}>
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                  <GradientText
                    colors={['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981']}
                    animationSpeed={8}
                    className="text-3xl lg:text-4xl font-bold"
                  >
                    Как мы работаем
                  </GradientText>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Простой процесс аренды оборудования
                </p>
              </div>
            </AnimatedContent>

            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { step: "01", title: "Консультация", description: "Обсуждаем ваши потребности", icon: Phone },
                { step: "02", title: "Подбор оборудования", description: "Выбираем подходящее оборудование", icon: Target },
                { step: "03", title: "Доставка и установка", description: "Привозим и настраиваем", icon: Truck },
                { step: "04", title: "Техподдержка", description: "Сопровождаем мероприятие", icon: Settings }
              ].map((item, index) => (
                <AnimatedContent key={item.step} distance={80} delay={index * 0.2}>
                  <div className="text-center group">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg">
                        <item.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-700 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden bg-gradient-to-r from-indigo-600 to-blue-600">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 lg:px-8 text-center relative z-10">
            <AnimatedContent distance={60}>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                <GradientText
                  colors={['#ffffff', '#e0e7ff', '#c7d2fe', '#ffffff']}
                  animationSpeed={6}
                  className="text-3xl lg:text-4xl font-bold"
                >
                  Нужно оборудование в аренду?
                </GradientText>
              </h2>
            </AnimatedContent>
            
            <AnimatedContent distance={40} delay={0.2}>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Свяжитесь с нами для обсуждения ваших потребностей и получения 
                коммерческого предложения по аренде оборудования
              </p>
            </AnimatedContent>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90">
                <Phone className="w-5 h-5 mr-2" />
                +7 (495) 580-75-37
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-600 transition-all duration-300 bg-white/10 backdrop-blur-sm">
                <Mail className="w-5 h-5 mr-2" />
                info@weshow.ru
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EquipmentRental;