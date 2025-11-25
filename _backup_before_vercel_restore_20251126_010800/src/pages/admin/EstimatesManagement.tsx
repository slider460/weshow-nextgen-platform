import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabase'
import { Estimate } from '../../types/database'
import BackToAdminButton from '../../components/admin/BackToAdminButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Clock,
  Calendar,
  User,
  Building,
  DollarSign
} from 'lucide-react'

interface EstimateWithUser extends Estimate {
  users?: {
    id: string
    name: string
    company_name: string
    email: string
  }
  estimate_items?: Array<{
    id: string
    quantity: number
    price_at_creation: number
    equipment_catalog?: {
      name: string
    }
  }>
}

const EstimatesManagement: React.FC = () => {
  const navigate = useNavigate()
  const [estimates, setEstimates] = useState<EstimateWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedEstimates, setSelectedEstimates] = useState<string[]>([])

  useEffect(() => {
    fetchEstimates()
  }, [])

  const fetchEstimates = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('estimates')
        .select(`
          *,
          users (
            id,
            name,
            company_name,
            email
          ),
          estimate_items (
            id,
            quantity,
            price_at_creation,
            equipment_catalog (
              name
            )
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching estimates:', error)
        return
      }

      setEstimates(data || [])
    } catch (error) {
      console.error('Error fetching estimates:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEstimates = estimates.filter(estimate => {
    const matchesSearch = 
      estimate.users?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.users?.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.users?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.id.toString().includes(searchTerm)

    const matchesStatus = statusFilter === 'all' || estimate.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending_review':
        return <Clock className="h-4 w-4" />
      case 'confirmed':
        return <CheckCircle className="h-4 w-4" />
      case 'canceled':
        return <XCircle className="h-4 w-4" />
      case 'draft':
        return <Edit className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const calculateTotal = (estimate: EstimateWithUser) => {
    if (!estimate.estimate_items) return 0
    return estimate.estimate_items.reduce((sum, item) => 
      sum + (item.quantity * item.price_at_creation), 0
    )
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleStatusChange = async (estimateId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('estimates')
        .update({ status: newStatus })
        .eq('id', estimateId)

      if (error) {
        console.error('Error updating status:', error)
        return
      }

      // Обновляем локальное состояние
      setEstimates(prev => 
        prev.map(estimate => 
          estimate.id === estimateId 
            ? { ...estimate, status: newStatus as any }
            : estimate
        )
      )
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleDelete = async (estimateId: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту заявку?')) return

    try {
      const { error } = await supabase
        .from('estimates')
        .delete()
        .eq('id', estimateId)

      if (error) {
        console.error('Error deleting estimate:', error)
        return
      }

      // Удаляем из локального состояния
      setEstimates(prev => prev.filter(estimate => estimate.id !== estimateId))
    } catch (error) {
      console.error('Error deleting estimate:', error)
    }
  }

  const handleBulkAction = async (action: string) => {
    if (selectedEstimates.length === 0) return

    try {
      switch (action) {
        case 'confirm':
          await supabase
            .from('estimates')
            .update({ status: 'confirmed' })
            .in('id', selectedEstimates)
          break
        case 'cancel':
          await supabase
            .from('estimates')
            .update({ status: 'canceled' })
            .in('id', selectedEstimates)
          break
        case 'delete':
          if (!confirm(`Вы уверены, что хотите удалить ${selectedEstimates.length} заявок?`)) return
          await supabase
            .from('estimates')
            .delete()
            .in('id', selectedEstimates)
          break
      }

      // Обновляем данные
      await fetchEstimates()
      setSelectedEstimates([])
    } catch (error) {
      console.error('Error performing bulk action:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Загрузка заявок...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Управление заявками</h1>
          <p className="text-gray-600 mt-2">Всего заявок: {estimates.length}</p>
        </div>
        <BackToAdminButton />
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Фильтры и поиск</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск по клиенту, компании или ID заявки..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Все статусы</option>
                <option value="draft">Черновик</option>
                <option value="pending_review">На рассмотрении</option>
                <option value="confirmed">Подтверждена</option>
                <option value="canceled">Отменена</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedEstimates.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Выбрано: {selectedEstimates.length} заявок
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('confirm')}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Подтвердить
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('cancel')}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Отменить
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('delete')}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Удалить
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estimates Table */}
      <Card>
        <CardHeader>
          <CardTitle>Заявки ({filteredEstimates.length})</CardTitle>
          <CardDescription>
            Список всех заявок с возможностью управления
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredEstimates.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-lg text-gray-600">Заявки не найдены</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedEstimates.length === filteredEstimates.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEstimates(filteredEstimates.map(e => e.id))
                        } else {
                          setSelectedEstimates([])
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Компания</TableHead>
                  <TableHead>Дата события</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Сумма</TableHead>
                  <TableHead>Создана</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEstimates.map((estimate) => (
                  <TableRow key={estimate.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedEstimates.includes(estimate.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEstimates(prev => [...prev, estimate.id])
                          } else {
                            setSelectedEstimates(prev => prev.filter(id => id !== estimate.id))
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      #{estimate.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        {estimate.users?.name || 'Неизвестный клиент'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        {estimate.users?.company_name || '-'}
                      </div>
                    </TableCell>
                    <TableCell>
                      {estimate.event_date ? (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(estimate.event_date).toLocaleDateString('ru-RU')}
                        </div>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(estimate.status)} flex items-center gap-1 w-fit`}>
                        {getStatusIcon(estimate.status)}
                        {getStatusLabel(estimate.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <div className="flex items-center justify-end gap-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        {formatCurrency(calculateTotal(estimate))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(estimate.created_at)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            console.log('Просмотр заявки:', estimate.id);
                            alert(`Заявка #${estimate.id}\nКлиент: ${estimate.users?.name}\nКомпания: ${estimate.users?.company_name}\nСумма: ${formatCurrency(calculateTotal(estimate))}`);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <select
                          value={estimate.status}
                          onChange={(e) => handleStatusChange(estimate.id, e.target.value)}
                          className="text-xs px-2 py-1 border border-gray-300 rounded"
                        >
                          <option value="draft">Черновик</option>
                          <option value="pending_review">На рассмотрении</option>
                          <option value="confirmed">Подтверждена</option>
                          <option value="canceled">Отменена</option>
                        </select>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(estimate.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default EstimatesManagement