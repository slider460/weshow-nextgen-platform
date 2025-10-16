import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../config/supabase'
import { Equipment } from '../../types/database'
import BackToAdminButton from '../../components/admin/BackToAdminButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Package,
  DollarSign,
  Tag,
  Calendar,
  Filter
} from 'lucide-react'

interface EquipmentWithCategory extends Equipment {
  categories?: {
    name: string
  }
}

const EquipmentManagement: React.FC = () => {
  const navigate = useNavigate()
  const [equipment, setEquipment] = useState<EquipmentWithCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchEquipment()
  }, [])

  const fetchEquipment = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('equipment_catalog')
        .select(`
          *,
          categories (
            name
          )
        `)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching equipment:', error)
        return
      }

      setEquipment(data || [])
    } catch (error) {
      console.error('Error fetching equipment:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === 'all' || item.category_id?.toString() === categoryFilter

    return matchesSearch && matchesCategory
  })

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
      year: 'numeric'
    })
  }

  const handleDelete = async (equipmentId: string) => {
    if (!confirm('Вы уверены, что хотите удалить это оборудование?')) return

    try {
      const { error } = await supabase
        .from('equipment_catalog')
        .delete()
        .eq('id', equipmentId)

      if (error) {
        console.error('Error deleting equipment:', error)
        return
      }

      // Удаляем из локального состояния
      setEquipment(prev => prev.filter(item => item.id !== equipmentId))
    } catch (error) {
      console.error('Error deleting equipment:', error)
    }
  }

  const handleBulkDelete = async () => {
    if (selectedEquipment.length === 0) return
    if (!confirm(`Вы уверены, что хотите удалить ${selectedEquipment.length} позиций оборудования?`)) return

    try {
      const { error } = await supabase
        .from('equipment_catalog')
        .delete()
        .in('id', selectedEquipment)

      if (error) {
        console.error('Error deleting equipment:', error)
        return
      }

      // Обновляем данные
      await fetchEquipment()
      setSelectedEquipment([])
    } catch (error) {
      console.error('Error deleting equipment:', error)
    }
  }

  const getAvailabilityColor = (isAvailable: boolean) => {
    return isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }

  const getAvailabilityLabel = (isAvailable: boolean) => {
    return isAvailable ? 'Доступно' : 'Недоступно'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Загрузка оборудования...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Управление оборудованием</h1>
          <p className="text-gray-600 mt-2">Всего позиций: {equipment.length}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Добавить оборудование
          </Button>
          <BackToAdminButton />
        </div>
      </div>

      {/* Add Equipment Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Добавить новое оборудование</CardTitle>
            <CardDescription>
              Заполните форму для добавления нового оборудования в каталог
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Название оборудования"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Бренд
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Бренд"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Модель
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Модель"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Цена за день
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Описание оборудования"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Отмена
              </Button>
              <Button>
                Добавить оборудование
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

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
                  placeholder="Поиск по названию, бренду, модели..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Все категории</option>
                <option value="1">Аудио</option>
                <option value="2">Видео</option>
                <option value="3">Свет</option>
                <option value="4">Сцена</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedEquipment.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Выбрано: {selectedEquipment.length} позиций
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkDelete}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Удалить выбранные
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Equipment Table */}
      <Card>
        <CardHeader>
          <CardTitle>Каталог оборудования ({filteredEquipment.length})</CardTitle>
          <CardDescription>
            Список всего оборудования с возможностью управления
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredEquipment.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔧</div>
              <p className="text-lg text-gray-600">Оборудование не найдено</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedEquipment.length === filteredEquipment.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedEquipment(filteredEquipment.map(e => e.id))
                        } else {
                          setSelectedEquipment([])
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Название</TableHead>
                  <TableHead>Бренд/Модель</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Цена/день</TableHead>
                  <TableHead>Доступность</TableHead>
                  <TableHead>Добавлено</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEquipment.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedEquipment.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedEquipment(prev => [...prev, item.id])
                          } else {
                            setSelectedEquipment(prev => prev.filter(id => id !== item.id))
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-gray-400" />
                        <div>
                          <div className="font-medium">{item.name}</div>
                          {item.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.brand}</div>
                        <div className="text-sm text-gray-500">{item.model}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <Tag className="h-3 w-3 mr-1" />
                        {item.categories?.name || 'Без категории'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        {formatCurrency(item.daily_rate || 0)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getAvailabilityColor(item.is_available || false)}>
                        {getAvailabilityLabel(item.is_available || false)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(item.created_at)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            console.log('Просмотр оборудования:', item.id);
                            alert(`Оборудование: ${item.name}\nБренд: ${item.brand}\nМодель: ${item.model}\nЦена: ${formatCurrency(item.daily_rate || 0)}`);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            console.log('Редактирование оборудования:', item.id);
                            // Здесь будет логика редактирования
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
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

export default EquipmentManagement