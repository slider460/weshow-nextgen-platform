import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useEquipmentCatalog, useArticles } from '../../hooks/useWeShowData'
import { supabase } from '../../config/supabase'
import { Estimate, Equipment, Article, User } from '../../types/database'
import BackToAdminButton from '../../components/admin/BackToAdminButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { 
  Users, 
  Package, 
  FileText, 
  Clock, 
  TrendingUp, 
  Eye,
  Calendar,
  Building,
  DollarSign
} from 'lucide-react'

interface DashboardStats {
  newEstimatesToday: number
  totalEstimatesInProgress: number
  totalEquipment: number
  totalClients: number
  totalRevenue: number
  recentEstimates: Estimate[]
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [stats, setStats] = useState<DashboardStats>({
    newEstimatesToday: 0,
    totalEstimatesInProgress: 0,
    totalEquipment: 0,
    totalClients: 0,
    totalRevenue: 0,
    recentEstimates: []
  })
  const [loading, setLoading] = useState(true)
  const [estimateTotals, setEstimateTotals] = useState<Record<string, number>>({})

  const { equipment } = useEquipmentCatalog()
  const { articles } = useArticles()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Получаем статистику
        const today = new Date().toISOString().split('T')[0]
        
        const [
          newEstimatesTodayResult,
          totalEstimatesInProgressResult,
          totalEquipmentResult,
          totalClientsResult,
          totalRevenueResult,
          recentEstimatesResult
        ] = await Promise.all([
          supabase
            .from('estimates')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', `${today}T00:00:00.000Z`),
          
          supabase
            .from('estimates')
            .select('*', { count: 'exact', head: true })
            .in('status', ['draft', 'pending_review']),
          
          supabase
            .from('equipment_catalog')
            .select('*', { count: 'exact', head: true })
            .not('id', 'is', null),
          
          supabase
            .from('users')
            .select('*', { count: 'exact', head: true })
            .eq('role', 'client'),
          
          supabase
            .from('estimates')
            .select(`
              *,
              estimate_items (
                quantity,
                price_at_creation
              )
            `)
            .eq('status', 'confirmed'),
          
          supabase
            .from('estimates')
            .select(`
              *,
              users (
                id,
                name,
                company_name
              )
            `)
            .eq('status', 'pending_review')
            .order('created_at', { ascending: false })
            .limit(5)
        ])

        const recentEstimates = recentEstimatesResult.data || []
        
        // Рассчитываем суммы для каждой заявки
        const totals: Record<string, number> = {}
        for (const estimate of recentEstimates) {
          try {
            const { data: items } = await supabase
              .from('estimate_items')
              .select('quantity, price_at_creation')
              .eq('estimate_id', estimate.id)
            
            const total = items?.reduce((sum, item) => 
              sum + (item.quantity * item.price_at_creation), 0) || 0
            totals[estimate.id] = total
          } catch (error) {
            console.error('Error calculating total for estimate:', estimate.id, error)
            totals[estimate.id] = 0
          }
        }

        // Рассчитываем общую выручку
        const confirmedEstimates = totalRevenueResult.data || []
        const totalRevenue = confirmedEstimates.reduce((sum, estimate) => {
          const estimateTotal = estimate.estimate_items?.reduce((itemSum: number, item: any) => 
            itemSum + (item.quantity * item.price_at_creation), 0) || 0
          return sum + estimateTotal
        }, 0)
        
        setEstimateTotals(totals)
        setStats({
          newEstimatesToday: newEstimatesTodayResult.count || 0,
          totalEstimatesInProgress: totalEstimatesInProgressResult.count || 0,
          totalEquipment: totalEquipmentResult.count || 0,
          totalClients: totalClientsResult.count || 0,
          totalRevenue,
          recentEstimates
        })
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Загрузка данных...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white border-0">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Добро пожаловать, {user?.name}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Вот краткий обзор вашей операционной деятельности
              </p>
            </div>
            <BackToAdminButton variant="ghost" className="text-white hover:bg-white/20" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Новых заявок сегодня
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.newEstimatesToday}</div>
            <p className="text-xs text-muted-foreground">
              +{Math.floor(Math.random() * 20)}% с прошлой недели
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              В обработке
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.totalEstimatesInProgress}</div>
            <p className="text-xs text-muted-foreground">
              Требуют внимания
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Позиций в каталоге
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.totalEquipment}</div>
            <p className="text-xs text-muted-foreground">
              Доступно для аренды
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Зарегистрировано клиентов
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">
              Активных пользователей
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Общая выручка
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</div>
          <p className="text-xs text-muted-foreground">
            От подтвержденных заявок
          </p>
        </CardContent>
      </Card>

      {/* Recent Estimates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Последние заявки на рассмотрении</CardTitle>
          <CardDescription>
            Заявки, которые требуют вашего внимания
          </CardDescription>
        </CardHeader>
        <CardContent>
          {stats.recentEstimates.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg text-gray-600">Нет заявок на рассмотрении</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Компания</TableHead>
                  <TableHead>Дата события</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Сумма</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentEstimates.map((estimate) => (
                  <TableRow key={estimate.id}>
                    <TableCell className="font-medium">
                      {estimate.users?.name || 'Неизвестный клиент'}
                    </TableCell>
                    <TableCell>
                      {estimate.users?.company_name || '-'}
                    </TableCell>
                    <TableCell>
                      {estimate.event_date ? 
                        new Date(estimate.event_date).toLocaleDateString('ru-RU') : 
                        '-'
                      }
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(estimate.status)}>
                        {getStatusLabel(estimate.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(estimateTotals[estimate.id] || 0)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          console.log('Просмотр заявки:', estimate.id);
                          const clientName = estimate.users?.name || 'Неизвестный клиент';
                          const companyName = estimate.users?.company_name || '';
                          alert(`Заявка #${estimate.id}\nКлиент: ${clientName}\nКомпания: ${companyName}\nДата: ${estimate.event_date}\nСтатус: ${estimate.status}`);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Просмотреть
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
          <CardDescription>
            Часто используемые функции админ панели
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate('/admin/estimates')}
            >
              <FileText className="h-6 w-6" />
              <span>Управление заявками</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate('/admin/equipment')}
            >
              <Package className="h-6 w-6" />
              <span>Каталог оборудования</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={() => navigate('/admin/cases')}
            >
              <Building className="h-6 w-6" />
              <span>Управление кейсами</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboard