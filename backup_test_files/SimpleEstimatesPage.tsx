import React, { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Alert, AlertDescription } from '../components/ui/alert'
import BackToAdminButton from '../components/admin/BackToAdminButton'
import { RefreshCw, Eye, Edit, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Estimate {
  id: string
  user_id: string
  status: string
  event_date: string
  client_notes: string
  created_at: string
  updated_at: string
}

const SimpleEstimatesPage: React.FC = () => {
  const [estimates, setEstimates] = useState<Estimate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchEstimates()
  }, [statusFilter])

  const fetchEstimates = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('estimates')
        .select('*')
        .order('created_at', { ascending: false })

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }

      const { data, error: fetchError } = await query

      if (fetchError) {
        setError(fetchError.message)
      } else {
        setEstimates(data || [])
      }
    } catch (err) {
      setError('Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('estimates')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) {
        setError(error.message)
      } else {
        fetchEstimates()
      }
    } catch (err) {
      setError('Ошибка обновления статуса')
    }
  }

  const deleteEstimate = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту заявку?')) return

    try {
      const { error } = await supabase
        .from('estimates')
        .delete()
        .eq('id', id)

      if (error) {
        setError(error.message)
      } else {
        fetchEstimates()
      }
    } catch (err) {
      setError('Ошибка удаления')
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Управление заявками</h1>
              <p className="mt-2 text-gray-600">
                Просмотр и управление заявками на оборудование
              </p>
            </div>
            <BackToAdminButton />
          </div>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('all')}
            >
              Все
            </Button>
            <Button
              variant={statusFilter === 'pending_review' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('pending_review')}
            >
              На рассмотрении
            </Button>
            <Button
              variant={statusFilter === 'confirmed' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('confirmed')}
            >
              Подтвержденные
            </Button>
            <Button
              variant={statusFilter === 'canceled' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('canceled')}
            >
              Отмененные
            </Button>
          </div>
          
          <Button onClick={fetchEstimates} variant="outline" className="ml-auto">
            <RefreshCw className="h-4 w-4 mr-2" />
            Обновить
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <XCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Загрузка...</p>
          </div>
        )}

        {/* Estimates List */}
        {!loading && (
          <div className="space-y-4">
            {estimates.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-gray-500">Заявки не найдены</p>
                </CardContent>
              </Card>
            ) : (
              estimates.map((estimate) => (
                <Card key={estimate.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Заявка #{estimate.id.slice(-8)}
                          </h3>
                          <Badge className={getStatusColor(estimate.status)}>
                            {getStatusIcon(estimate.status)}
                            <span className="ml-1">{getStatusLabel(estimate.status)}</span>
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <strong>Дата события:</strong> {estimate.event_date}
                          </div>
                          <div>
                            <strong>Создана:</strong> {new Date(estimate.created_at).toLocaleString()}
                          </div>
                        </div>
                        
                        {estimate.client_notes && (
                          <div className="mt-3">
                            <strong className="text-sm text-gray-700">Заметки клиента:</strong>
                            <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-3 rounded">
                              {estimate.client_notes}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        {estimate.status === 'pending_review' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => updateStatus(estimate.id, 'confirmed')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Подтвердить
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateStatus(estimate.id, 'canceled')}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Отменить
                            </Button>
                          </>
                        )}
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteEstimate(estimate.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Stats */}
        {!loading && estimates.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{estimates.length}</div>
                <div className="text-sm text-gray-600">Всего заявок</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {estimates.filter(e => e.status === 'pending_review').length}
                </div>
                <div className="text-sm text-gray-600">На рассмотрении</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {estimates.filter(e => e.status === 'confirmed').length}
                </div>
                <div className="text-sm text-gray-600">Подтверждено</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {estimates.filter(e => e.status === 'canceled').length}
                </div>
                <div className="text-sm text-gray-600">Отменено</div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default SimpleEstimatesPage
