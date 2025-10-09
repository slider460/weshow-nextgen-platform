import React from 'react';
import RotatingTextAdvanced from '../components/RotatingTextAdvanced';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const RotatingTextDemo = () => {
  const demoVariants = [
    {
      title: "Rotate Effect",
      variant: "rotate" as const,
      texts: ['мультимедийные', 'интерактивные', 'цифровые', 'инновационные'],
      description: "3D вращение с градиентом"
    },
    {
      title: "Fade Effect", 
      variant: "fade" as const,
      texts: ['современные', 'профессиональные', 'качественные', 'надежные'],
      description: "Плавное появление и исчезновение"
    },
    {
      title: "Slide Up",
      variant: "slide" as const,
      direction: "up" as const,
      texts: ['технологии', 'решения', 'инновации', 'идеи'],
      description: "Скольжение снизу вверх"
    },
    {
      title: "Flip Effect",
      variant: "flip" as const,
      texts: ['креативные', 'уникальные', 'эффективные', 'результативные'],
      description: "Переворот по оси Y"
    },
    {
      title: "Scale Effect",
      variant: "scale" as const,
      texts: ['большие', 'масштабные', 'глобальные', 'комплексные'],
      description: "Масштабирование"
    },
    {
      title: "Typewriter",
      variant: "typewriter" as const,
      texts: ['прогрессивные', 'развивающиеся', 'растущие', 'успешные'],
      description: "Эффект печатной машинки"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Rotating Text
            <br />
            <RotatingTextAdvanced
              texts={['Эффекты', 'Анимации', 'Стили', 'Варианты']}
              duration={2000}
              variant="rotate"
              gradient={true}
              glow={true}
              className="text-5xl"
              textClassName="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            />
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Демонстрация различных эффектов анимации текста, вдохновленных 
            <a 
              href="https://www.reactbits.dev/text-animations/rotating-text" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline ml-1"
            >
              ReactBits
            </a>
          </p>
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoVariants.map((demo, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  {demo.title}
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                    {demo.variant}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Комплексные
                    <br />
                    <RotatingTextAdvanced
                      texts={demo.texts}
                      duration={2500}
                      variant={demo.variant}
                      direction={demo.direction}
                      gradient={true}
                      glow={true}
                      delay={index * 200}
                      className="block"
                      textClassName="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    />
                    <br />
                    решения
                  </h3>
                </div>
                <p className="text-gray-400 text-sm text-center">
                  {demo.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Hero Example */}
        <div className="mt-20">
          <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-center text-2xl">
                Пример для главной страницы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-8">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                  Комплексные
                  <br />
                  <RotatingTextAdvanced
                    texts={[
                      'мультимедийные',
                      'интерактивные', 
                      'цифровые',
                      'инновационные',
                      'современные'
                    ]}
                    duration={2500}
                    variant="rotate"
                    gradient={true}
                    glow={true}
                    delay={500}
                    className="block sm:inline"
                    textClassName="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  />
                  <br />
                  решения
                </h1>
                
                <div className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
                  <RotatingTextAdvanced
                    texts={[
                      'Аренда на мероприятия, продажа, разработка и интеграция интерактивного оборудования',
                      'Создаем незабываемые впечатления с помощью современных технологий',
                      'Полный цикл: от концепции до реализации мультимедийных проектов',
                      'Профессиональное оборудование для любых мероприятий и пространств'
                    ]}
                    duration={4000}
                    variant="fade"
                    delay={1000}
                    className="block"
                    textClassName="transition-all duration-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Все эффекты оптимизированы для производительности и доступности
          </p>
        </div>
      </div>
    </div>
  );
};

export default RotatingTextDemo;
