import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { 
  CheckCircle, 
  XCircle, 
  Globe, 
  Lock, 
  BarChart3,
  ExternalLink,
  User,
  Key
} from 'lucide-react'

const AdminTest: React.FC = () => {
  const [testResults, setTestResults] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const runTest = async (testName: string, testFunction: () => Promise<any>) => {
    setLoading(prev => ({ ...prev, [testName]: true }))
    try {
      const result = await testFunction()
      setTestResults(prev => ({ ...prev, [testName]: result }))
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        } 
      }))
    } finally {
      setLoading(prev => ({ ...prev, [testName]: false }))
    }
  }

  const testAdminAccess = async () => {
    const response = await fetch('/admin')
    return {
      success: response.ok,
      status: response.status,
      url: '/admin'
    }
  }

  const testAuth = async () => {
    const response = await fetch('/admin/login')
    return {
      success: response.ok,
      status: response.status,
      url: '/admin/login'
    }
  }

  const testDashboard = async () => {
    const response = await fetch('/admin/dashboard')
    return {
      success: response.ok,
      status: response.status,
      url: '/admin/dashboard'
    }
  }

  const getResultIcon = (result: any) => {
    if (!result) return null
    return result.success ? 
      <CheckCircle className="h-5 w-5 text-green-600" /> : 
      <XCircle className="h-5 w-5 text-red-600" />
  }

  const getResultColor = (result: any) => {
    if (!result) return 'bg-gray-100 text-gray-800'
    return result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🔧 Тест админ панели WeShow
          </h1>
          <p className="text-xl text-gray-600">
            Проверка функциональности админ панели
          </p>
        </div>

        {/* Test Credentials */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Тестовые учетные данные
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
                <div>
                  <div className="font-semibold text-blue-900">Администратор</div>
                  <div className="text-sm text-blue-700">admin@weshow.ru / password</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <User className="h-5 w-5 text-green-600" />
                <div>
                  <div className="font-semibold text-green-900">Менеджер</div>
                  <div className="text-sm text-green-700">manager@weshow.ru / password</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Доступность админ панели
              </CardTitle>
              <CardDescription>
                Проверка доступности основной страницы
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  onClick={() => runTest('adminAccess', testAdminAccess)}
                  disabled={loading.adminAccess}
                  className="w-full"
                >
                  {loading.adminAccess ? 'Проверяем...' : 'Проверить доступность'}
                </Button>
                
                {testResults.adminAccess && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getResultIcon(testResults.adminAccess)}
                      <Badge className={getResultColor(testResults.adminAccess)}>
                        {testResults.adminAccess.success ? 'Доступно' : 'Ошибка'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Статус: {testResults.adminAccess.status}
                    </div>
                    <div className="text-sm text-gray-600">
                      URL: {testResults.adminAccess.url}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Аутентификация
              </CardTitle>
              <CardDescription>
                Проверка страницы входа
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  onClick={() => runTest('auth', testAuth)}
                  disabled={loading.auth}
                  className="w-full"
                >
                  {loading.auth ? 'Проверяем...' : 'Тест входа'}
                </Button>
                
                {testResults.auth && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getResultIcon(testResults.auth)}
                      <Badge className={getResultColor(testResults.auth)}>
                        {testResults.auth.success ? 'Доступно' : 'Ошибка'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Статус: {testResults.auth.status}
                    </div>
                    <div className="text-sm text-gray-600">
                      URL: {testResults.auth.url}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Дашборд
              </CardTitle>
              <CardDescription>
                Проверка дашборда админ панели
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  onClick={() => runTest('dashboard', testDashboard)}
                  disabled={loading.dashboard}
                  className="w-full"
                >
                  {loading.dashboard ? 'Проверяем...' : 'Проверить дашборд'}
                </Button>
                
                {testResults.dashboard && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getResultIcon(testResults.dashboard)}
                      <Badge className={getResultColor(testResults.dashboard)}>
                        {testResults.dashboard.success ? 'Доступно' : 'Ошибка'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      Статус: {testResults.dashboard.status}
                    </div>
                    <div className="text-sm text-gray-600">
                      URL: {testResults.dashboard.url}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
            <CardDescription>
              Переходы к основным разделам админ панели
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center space-y-2"
                onClick={() => window.open('/admin', '_blank')}
              >
                <Globe className="h-6 w-6" />
                <span>Открыть админ панель</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center space-y-2"
                onClick={() => window.open('/admin/login', '_blank')}
              >
                <Lock className="h-6 w-6" />
                <span>Страница входа</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary */}
        {Object.keys(testResults).length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Сводка тестов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(testResults).map(([testName, result]) => (
                  <div key={testName} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium capitalize">
                      {testName.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <div className="flex items-center gap-2">
                      {getResultIcon(result)}
                      <Badge className={getResultColor(result)}>
                        {result.success ? 'Успешно' : 'Ошибка'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default AdminTest
