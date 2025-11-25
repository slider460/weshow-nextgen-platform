import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import AnimatedButton from './AnimatedButton';
import { useScrollAnimation, useScrollAnimationDirection } from '../hooks/useScrollAnimation';
import { 
  Zap, 
  Sparkles, 
  Star, 
  Heart, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin,
  Users,
  TrendingUp,
  Lightbulb
} from 'lucide-react';

const AnimationShowcase = () => {
  // Анимации для разных секций
  const titleAnimation = useScrollAnimation({ delay: 200 });
  const cardsAnimation = useScrollAnimation({ delay: 400 });
  const buttonsAnimation = useScrollAnimation({ delay: 600 });
  const iconsAnimation = useScrollAnimation({ delay: 800 });

  // Анимации с разными направлениями
  const leftAnimation = useScrollAnimationDirection('left', { delay: 300 });
  const rightAnimation = useScrollAnimationDirection('right', { delay: 500 });
  const upAnimation = useScrollAnimationDirection('up', { delay: 700 });

  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Заголовок с анимацией */}
        <div 
          ref={titleAnimation.elementRef}
          style={titleAnimation.animationStyle}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            ✨ Анимации и микро-взаимодействия
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Плавные переходы и
            <span className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              интерактивные эффекты
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Исследуйте различные типы анимаций, микро-взаимодействий и эффектов, 
            которые делают интерфейс более живым и отзывчивым
          </p>
        </div>

        {/* Карточки с анимациями */}
        <div 
          ref={cardsAnimation.elementRef}
          style={cardsAnimation.animationStyle}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {/* Карточка с эффектом подъема */}
          <Card className="card-hover-lift group cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Эффект подъема</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Карточка плавно поднимается при наведении с увеличением тени
              </p>
              <Badge variant="outline" className="group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                Hover для демонстрации
              </Badge>
            </CardContent>
          </Card>

          {/* Карточка с эффектом масштабирования */}
          <Card className="card-hover-scale group cursor-pointer">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Эффект масштабирования</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Карточка плавно увеличивается при наведении
              </p>
              <Badge variant="outline" className="group-hover:bg-green-50 group-hover:border-green-200 transition-colors">
                Hover для демонстрации
              </Badge>
            </CardContent>
          </Card>

          {/* Карточка с эффектом свечения */}
          <Card className="card-hover-lift group cursor-pointer border-2 border-transparent hover:border-blue-200 transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-xl">Эффект свечения</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Карточка получает свечение и подъем при наведении
              </p>
              <Badge variant="outline" className="group-hover:bg-purple-50 group-hover:border-purple-200 transition-colors">
                Hover для демонстрации
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Кнопки с анимациями */}
        <div 
          ref={buttonsAnimation.elementRef}
          style={buttonsAnimation.animationStyle}
          className="text-center mb-16"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Анимированные кнопки</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <AnimatedButton 
              variant="gradient" 
              hoverEffect="scale" 
              glow={true}
              icon={<Zap className="w-4 h-4" />}
            >
              Эффект масштабирования
            </AnimatedButton>

            <AnimatedButton 
              variant="outline" 
              hoverEffect="lift" 
              glow={true}
              icon={<Star className="w-4 h-4" />}
            >
              Эффект подъема
            </AnimatedButton>

            <AnimatedButton 
              variant="default" 
              hoverEffect="slide" 
              glow={true}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Эффект скольжения
            </AnimatedButton>

            <AnimatedButton 
              variant="ghost" 
              hoverEffect="rotate" 
              glow={true}
              icon={<Heart className="w-4 h-4" />}
            >
              Эффект поворота
            </AnimatedButton>
          </div>
        </div>

        {/* Иконки с анимациями */}
        <div 
          ref={iconsAnimation.elementRef}
          style={iconsAnimation.animationStyle}
          className="text-center mb-16"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Анимированные иконки</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 icon-hover-bounce group-hover:shadow-lg transition-all duration-300">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-slate-600">Отскок</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4 icon-hover-float group-hover:shadow-lg transition-all duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-slate-600">Плавание</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 icon-hover-bounce group-hover:shadow-lg transition-all duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-slate-600">Отскок</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-4 icon-hover-float group-hover:shadow-lg transition-all duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-slate-600">Плавание</p>
            </div>
          </div>
        </div>

        {/* Анимации с разными направлениями */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Левая анимация */}
          <div 
            ref={leftAnimation.elementRef}
            style={leftAnimation.animationStyle}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 text-white rotate-180" />
                </div>
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Слева направо</h4>
                <p className="text-blue-700">Элемент появляется слева</p>
              </CardContent>
            </Card>
          </div>

          {/* Правая анимация */}
          <div 
            ref={rightAnimation.elementRef}
            style={rightAnimation.animationStyle}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-purple-900 mb-2">Справа налево</h4>
                <p className="text-purple-700">Элемент появляется справа</p>
              </CardContent>
            </Card>
          </div>

          {/* Верхняя анимация */}
          <div 
            ref={upAnimation.elementRef}
            style={upAnimation.animationStyle}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-green-900 mb-2">Снизу вверх</h4>
                <p className="text-green-700">Элемент появляется снизу</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Информация о производительности */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Оптимизированная производительность
              </h3>
              <p className="text-slate-600 mb-6">
                Все анимации используют CSS transforms и opacity для плавности. 
                Intersection Observer API обеспечивает эффективное срабатывание анимаций 
                только при появлении элементов в области видимости.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  CSS Transforms
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  Intersection Observer
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  60 FPS
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                  Оптимизировано
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnimationShowcase;
