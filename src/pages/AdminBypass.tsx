import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Shield, ArrowRight, Users, Settings } from 'lucide-react'

export default function AdminBypass() {
  const navigate = useNavigate()

  const handleBypass = () => {
    // Переходим напрямую в админ-панель без проверки аутентификации
    navigate('/admin/')
  }

  const handleGoToEstimates = () => {
    // Переходим напрямую к estimates
    navigate('/admin/estimates')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Обход админ-панели
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Временный доступ к админ-панели для тестирования
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Alert>
              <Settings className="h-4 w-4" />
              <AlertDescription>
                <strong>Внимание:</strong> Это временный обход для тестирования. 
                Проверка аутентификации отключена.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <Button 
                onClick={handleBypass}
                className="w-full"
                size="lg"
              >
                <Users className="h-4 w-4 mr-2" />
                Перейти в админ-панель
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <Button 
                onClick={handleGoToEstimates}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Settings className="h-4 w-4 mr-2" />
                Перейти к estimates
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500 mt-6">
              <p>После тестирования не забудьте включить проверку аутентификации обратно</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
