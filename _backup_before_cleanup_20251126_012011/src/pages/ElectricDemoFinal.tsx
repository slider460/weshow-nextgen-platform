import { ElectricBorderFixed as ElectricBorder } from "../components/ElectricBorderFixed";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

const ElectricDemoFinal = () => {
  const demoItems = [
    {
      title: "Синий эффект",
      description: "Классический электрический эффект в синих тонах",
      color: "blue" as const,
      intensity: "medium" as const
    },
    {
      title: "Фиолетовый эффект",
      description: "Элегантный электрический эффект в фиолетовых тонах",
      color: "purple" as const,
      intensity: "high" as const
    },
    {
      title: "Голубой эффект",
      description: "Свежий электрический эффект в голубых тонах",
      color: "cyan" as const,
      intensity: "low" as const
    },
    {
      title: "Зеленый эффект",
      description: "Природный электрический эффект в зеленых тонах",
      color: "green" as const,
      intensity: "medium" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              Электрические
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                границы
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Интерактивные карточки с анимированными электрическими границами, 
              вдохновленные современными UI-трендами
            </p>
          </motion.div>
        </div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {demoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ElectricBorder
                color={item.color}
                intensity={item.intensity}
                animated={true}
                className="h-full"
              >
                <Card className="h-full bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center pb-3">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mb-4">
                      <div className="text-2xl">⚡</div>
                    </div>
                    
                    <CardTitle className="text-lg font-bold text-slate-900 mb-2">
                      {item.title}
                    </CardTitle>
                    
                    <Badge 
                      variant="secondary" 
                      className="w-fit mx-auto bg-slate-100 text-slate-700"
                    >
                      {item.intensity} intensity
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="pt-0 pb-6">
                    <p className="text-sm text-slate-600 leading-relaxed text-center">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </ElectricBorder>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Интерактивная демонстрация
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Наведите курсор на карточку ниже, чтобы увидеть электрический эффект в действии
            </p>
            
            <ElectricBorder
              color="blue"
              intensity="high"
              animated={true}
              className="max-w-md mx-auto"
            >
              <Card className="bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-xl">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                    <div className="text-2xl">⚡</div>
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-slate-900 mb-2">
                    Электрическая карточка
                  </CardTitle>
                  
                  <Badge variant="secondary" className="w-fit mx-auto bg-blue-100 text-blue-700">
                    High Intensity
                  </Badge>
                </CardHeader>
                
                <CardContent className="text-center">
                  <p className="text-slate-600 mb-6">
                    Эта карточка демонстрирует полный набор электрических эффектов: 
                    анимированные границы и отслеживание мыши.
                  </p>
                  
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Нажми меня
                  </Button>
                </CardContent>
              </Card>
            </ElectricBorder>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mb-4">
              <div className="text-2xl">🎨</div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Настраиваемые цвета</h3>
            <p className="text-slate-600">
              Выберите из 4 цветовых схем: синий, фиолетовый, голубой или зеленый
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-4">
              <div className="text-2xl">⚡</div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Анимированные границы</h3>
            <p className="text-slate-600">
              Пульсирующие электрические линии с glow-эффектом
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-200 flex items-center justify-center mb-4">
              <div className="text-2xl">🎯</div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Отслеживание мыши</h3>
            <p className="text-slate-600">
              Эффекты следуют за курсором мыши для максимальной интерактивности
            </p>
          </motion.div>
        </div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-slate-900 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Пример использования</h3>
          <pre className="bg-slate-800 rounded-xl p-6 overflow-x-auto">
            <code className="text-sm text-green-400">
{`import { ElectricBorderFixed } from "./components/ElectricBorderFixed";

<ElectricBorderFixed 
  color="blue" 
  intensity="high" 
  animated={true}
  className="h-full"
>
  <Card className="h-full">
    <CardHeader>
      <CardTitle>Моя карточка</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Содержимое карточки</p>
    </CardContent>
  </Card>
</ElectricBorderFixed>`}
            </code>
          </pre>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">✅ Электрические границы работают!</h3>
            <p className="text-green-100 mb-4">
              Все эффекты успешно интегрированы в WeShow Platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/20 bg-white/10"
                onClick={() => window.location.href = '/'}
              >
                Вернуться на главную
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/30 text-white hover:bg-white/20 bg-white/10"
                onClick={() => window.location.href = '/team'}
              >
                Посмотреть команду
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ElectricDemoFinal;



















