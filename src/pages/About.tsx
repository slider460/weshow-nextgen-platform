import Header from "../components/Header";
import Footer from "../components/Footer";
import { Award, Globe, Target, Zap, Heart, Users } from "lucide-react";
import AnimatedContent from "../components/AnimatedContent";
import { Card, CardContent } from "../components/ui/card";
import GradientText from "../components/GradientText";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            
               <AnimatedContent distance={80} delay={0.4}>
                 <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                   <GradientText 
                     colors={['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899']}
                     animationSpeed={12}
                   >
                     О WESHOW
                   </GradientText>
                 </h1>
               </AnimatedContent>
            
            <AnimatedContent distance={60} delay={0.6}>
              <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl mx-auto">
                Мы создаем впечатляющие мультимедийные решения, которые превращают обычные события в незабываемые впечатления
              </p>
            </AnimatedContent>
            
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedContent distance={100} direction="horizontal" reverse={true}>
              <div>
                 <h2 className="text-3xl md:text-4xl font-bold mb-8">
                   <GradientText 
                     colors={['#3b82f6', '#8b5cf6', '#ec4899']}
                     animationSpeed={9}
                   >
                     Наша миссия
                   </GradientText>
                 </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Трансформировать способ взаимодействия людей с технологиями через инновационные мультимедийные решения
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Мы верим, что технологии должны быть незаметными, но их воздействие — незабываемым
                </p>
              </div>
            </AnimatedContent>
            
            <div className="grid grid-cols-2 gap-8">
              <AnimatedContent distance={80} delay={0.2}>
                <Card className="group hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-slate-200">
                  <CardContent className="text-center p-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                      <Users className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">500+</h3>
                    <p className="text-slate-600 font-medium">Клиентов</p>
                  </CardContent>
                </Card>
              </AnimatedContent>
              
              <AnimatedContent distance={80} delay={0.4}>
                <Card className="group hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-slate-200">
                  <CardContent className="text-center p-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
                      <Award className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-2">15+</h3>
                    <p className="text-slate-600 font-medium">Лет опыта</p>
                  </CardContent>
                </Card>
              </AnimatedContent>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100"></div>
        <div className="container mx-auto px-4 relative">
          <AnimatedContent distance={60}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">Наши ценности</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Принципы, которые лежат в основе каждого нашего проекта
              </p>
            </div>
          </AnimatedContent>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <AnimatedContent distance={80} delay={0.2}>
              <Card className="text-center hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-slate-200">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Инновации</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Мы всегда на шаг впереди, внедряя самые современные технологии и подходы
                  </p>
                </CardContent>
              </Card>
            </AnimatedContent>
            
            <AnimatedContent distance={80} delay={0.4}>
              <Card className="text-center hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-slate-200">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Качество</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Каждый проект выполняется с максимальным вниманием к деталям и качеству
                  </p>
                </CardContent>
              </Card>
            </AnimatedContent>
            
            <AnimatedContent distance={80} delay={0.6}>
              <Card className="text-center hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-slate-200">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Результат</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Мы фокусируемся на достижении конкретных целей и измеримых результатов
                  </p>
                </CardContent>
              </Card>
            </AnimatedContent>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50"></div>
        <div className="container mx-auto px-4 relative">
          <AnimatedContent distance={60}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">Команда экспертов</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Профессионалы с многолетним опытом в области мультимедийных технологий
              </p>
            </div>
          </AnimatedContent>
          
          <AnimatedContent distance={100} delay={0.3}>
            <div className="max-w-4xl mx-auto group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                <img 
                  src="/images/team/awards-ceremony.jpg" 
                  alt="Команда WESHOW с наградами премии событийной индустрии «Многогранность»" 
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Overlay с информацией о наградах */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/70 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="text-white">
                    <h4 className="text-xl font-bold mb-4 text-white drop-shadow-lg">Премия событийной индустрии «Многогранность»</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <p className="font-bold text-yellow-300 text-base mb-1 drop-shadow-md">1 место</p>
                        <p className="text-white/95 font-medium drop-shadow-sm">Поставщик технических инновационных продуктов</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <p className="font-bold text-yellow-300 text-base mb-1 drop-shadow-md">1 место</p>
                        <p className="text-white/95 font-medium drop-shadow-sm">Технический продакшн / продюсирование</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
                        <p className="font-bold text-yellow-300 text-base mb-1 drop-shadow-md">2 место</p>
                        <p className="text-white/95 font-medium drop-shadow-sm">Поставщик экранного оборудования / мультимедиа</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;