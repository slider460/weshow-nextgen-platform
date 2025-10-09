import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const ElectricDemoMinimal = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
            Электрические границы
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              (Минимальная версия)
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Простая версия для диагностики проблем
          </p>
        </div>

        {/* Simple Card */}
        <div className="max-w-md mx-auto">
          <div className="relative group">
            {/* Простая электрическая граница */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-50 to-purple-50"></div>
              
              {/* Простые линии */}
              <div className="absolute inset-0 rounded-xl">
                <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full"></div>
                <div className="absolute top-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-full"></div>
                <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full"></div>
                <div className="absolute top-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-full"></div>
              </div>
            </div>
            
            {/* Контент */}
            <Card className="relative z-10 h-full bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-xl">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                  <div className="text-2xl">⚡</div>
                </div>
                
                <CardTitle className="text-xl font-bold text-slate-900 mb-2">
                  Электрическая карточка
                </CardTitle>
                
                <Badge variant="secondary" className="w-fit mx-auto bg-blue-100 text-blue-700">
                  Minimal Version
                </Badge>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="text-slate-600 mb-6">
                  Простая версия электрических эффектов без сложных анимаций.
                  Наведите курсор для активации.
                </p>
                
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Тестовая кнопка
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {['blue', 'purple', 'cyan', 'green'].map((color, index) => (
            <div key={color} className="relative group">
              {/* Простая граница */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-slate-50 to-slate-100"></div>
                
                <div className="absolute inset-0 rounded-xl">
                  <div className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-${color}-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full`}></div>
                  <div className={`absolute top-0 right-0 w-[2px] bg-gradient-to-b from-transparent via-${color}-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-full`}></div>
                  <div className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-${color}-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full`}></div>
                  <div className={`absolute top-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-${color}-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-full`}></div>
                </div>
              </div>
              
              <Card className="relative z-10 h-full bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-lg">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-${color}-100 to-${color}-200 flex items-center justify-center mb-4`}>
                    <div className={`w-8 h-8 rounded-full bg-${color}-500`}></div>
                  </div>
                  
                  <CardTitle className="text-lg font-bold text-slate-900 mb-2">
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </CardTitle>
                  
                  <Badge 
                    variant="secondary" 
                    className={`w-fit mx-auto bg-${color}-100 text-${color}-700`}
                  >
                    Simple
                  </Badge>
                </CardHeader>
                
                <CardContent className="text-center">
                  <p className="text-sm text-slate-600">
                    Простая карточка с цветом {color}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Debug Info */}
        <div className="mt-16 text-center">
          <div className="bg-slate-900 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Отладочная информация</h3>
            <p className="text-green-400 mb-4">✅ Страница загружается успешно</p>
            <p className="text-green-400 mb-4">✅ React компоненты работают</p>
            <p className="text-green-400 mb-4">✅ CSS классы применяются</p>
            <p className="text-yellow-400">⚠️ Если эффекты не работают, проблема в анимациях</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElectricDemoMinimal;




