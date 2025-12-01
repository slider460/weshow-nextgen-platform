import React, { useState, useEffect } from 'react'
import { getEstimatesStats, getEquipmentCatalog, getUsers } from '../../api/adminRest'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  Clock, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Activity,
  Database,
  Shield,
  Eye
} from 'lucide-react'

interface DashboardStats {
  totalEstimates: number
  pendingEstimates: number
  confirmedEstimates: number
  totalEquipment: number
  totalUsers: number
  recentEstimates: any[]
}

const AdminManagement: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalEstimates: 0,
    pendingEstimates: 0,
    confirmedEstimates: 0,
    totalEquipment: 0,
    totalUsers: 0,
    recentEstimates: []
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Получаем статистику по заявкам
      const [estimatesStats, equipment, users] = await Promise.all([
        getEstimatesStats(),
        getEquipmentCatalog(),
        getUsers()
      ])

      setStats({
        totalEstimates: estimatesStats.totalEstimates,
        pendingEstimates: estimatesStats.pendingEstimates,
        confirmedEstimates: estimatesStats.confirmedEstimates,
        totalEquipment: equipment.length,
        totalUsers: users.length,
        recentEstimates: estimatesStats.recentEstimates
      })

    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending_review':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'canceled':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending_review':
        return 'На рассмотрении'
      case 'confirmed':
        return 'Подтверждена'
      case 'canceled':
        return 'Отменена'
      case 'draft':
        return 'Черновик'
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'canceled':
        return 'bg-red-100 text-red-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Панель управления</h1>
          <p className="mt-2 text-gray-600">
            Обзор системы и управление контентом
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Всего заявок</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalEstimates}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">На рассмотрении</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingEstimates}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Подтверждено</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.confirmedEstimates}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Settings className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Оборудование</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalEquipment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Быстрые действия
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => window.location.href = '/simple-estimates'}
              >
                <FileText className="h-4 w-4 mr-2" />
                Управление заявками
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => window.location.href = '/admin/equipment'}
              >
                <Settings className="h-4 w-4 mr-2" />
                Каталог оборудования
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => window.location.href = '/admin/homepage-equipment'}
              >
                <Database className="h-4 w-4 mr-2" />
                Блоки на главной
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => window.location.href = '/test-estimates'}
              >
                <Shield className="h-4 w-4 mr-2" />
                Тестирование RLS
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Системная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Пользователи в системе</span>
                <Badge variant="outline">{stats.totalUsers}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Статус базы данных</span>
                <Badge className="bg-green-100 text-green-800">Подключена</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">RLS политики</span>
                <Badge className="bg-yellow-100 text-yellow-800">Настроены</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Версия системы</span>
                <Badge variant="outline">v1.0.0</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Estimates */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Последние заявки
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentEstimates.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Нет заявок для отображения
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentEstimates.map((estimate) => (
                  <div key={estimate.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(estimate.status)}
                        <span className="font-medium">#{estimate.id.slice(-8)}</span>
                      </div>
                      <Badge className={getStatusColor(estimate.status)}>
                        {getStatusLabel(estimate.status)}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {estimate.event_date}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(estimate.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminManagement
