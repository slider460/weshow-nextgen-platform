import { ElectricBorder } from "../components/ElectricBorder";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";

const ElectricDemoSimple = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
            Электрические
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              границы
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Интерактивные карточки с анимированными электрическими границами
          </p>
        </div>

        {/* Simple Demo Card */}
        <div className="max-w-md mx-auto">
          <ElectricBorder
            color="blue"
            intensity="medium"
            animated={true}
            className="h-full"
          >
            <Card className="h-full bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-xl">
              <CardHeader className="text-center">
                <div className="w-20 h-20 mx-auto rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center mb-4">
                  <div className="text-2xl">⚡</div>
                </div>
                
                <CardTitle className="text-xl font-bold text-slate-900 mb-2">
                  Электрическая карточка
                </CardTitle>
                
                <Badge variant="secondary" className="w-fit mx-auto bg-blue-100 text-blue-700">
                  Medium Intensity
                </Badge>
              </CardHeader>
              
              <CardContent className="text-center">
                <p className="text-slate-600 mb-6">
                  Эта карточка демонстрирует электрические эффекты: 
                  анимированные границы и искры.
                </p>
                
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                  Нажми меня
                </Button>
              </CardContent>
            </Card>
          </ElectricBorder>
        </div>

        {/* Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {['blue', 'purple', 'cyan', 'green'].map((color, index) => (
            <ElectricBorder
              key={color}
              color={color as any}
              intensity="low"
              animated={false}
              className="h-full"
            >
              <Card className="h-full bg-white/95 backdrop-blur-sm border border-slate-200/50 shadow-lg">
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
                    Static
                  </Badge>
                </CardHeader>
                
                <CardContent className="text-center">
                  <p className="text-sm text-slate-600">
                    Статическая карточка с цветом {color}
                  </p>
                </CardContent>
              </Card>
            </ElectricBorder>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectricDemoSimple;




