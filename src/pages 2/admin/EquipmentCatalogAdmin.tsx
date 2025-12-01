import React, { useState, useEffect } from 'react'
import { supabase } from '../../config/supabase'
import { getEquipment, getCategories } from '../../api/equipment'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Plus, Edit, Trash2, Save, X, RefreshCw } from 'lucide-react'

interface EquipmentItem {
  id?: string
  name: string
  description: string
  price_per_day: number
  stock_quantity: number
  category_id: string
  created_at?: string
  updated_at?: string
  equipment_categories?: {
    name: string
    slug: string
  }
}

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
}

const EquipmentCatalogAdmin = () => {
  const [equipment, setEquipment] = useState<EquipmentItem[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<EquipmentItem | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Форма для нового/редактируемого товара
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price_per_day: 0,
    stock_quantity: 0,
    category_id: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [equipmentData, categoriesData] = await Promise.all([
        getEquipment(),
        getCategories()
      ])
      
      setEquipment(equipmentData)
      setCategories(categoriesData)
      setError(null)
    } catch (err) {
      console.error('Ошибка загрузки данных:', err)
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    setFormData({
      name: '',
      description: '',
      price_per_day: 0,
      stock_quantity: 0,
      category_id: categories[0]?.id || ''
    })
    setIsAddingNew(true)
    setEditingItem(null)
  }

  const handleEdit = (item: EquipmentItem) => {
    setFormData({
      name: item.name,
      description: item.description || '',
      price_per_day: item.price_per_day,
      stock_quantity: item.stock_quantity,
      category_id: item.category_id
    })
    setEditingItem(item)
    setIsAddingNew(false)
  }

  const handleSave = async () => {
    try {
      setError(null)
      setSuccess(null)

      if (isAddingNew) {
        // Добавляем новый товар
        const { error } = await supabase
          .from('equipment_catalog')
          .insert([formData])

        if (error) throw error
        setSuccess('Товар успешно добавлен!')
      } else if (editingItem?.id) {
        // Обновляем существующий товар
        const { error } = await supabase
          .from('equipment_catalog')
          .update(formData)
          .eq('id', editingItem.id)

        if (error) throw error
        setSuccess('Товар успешно обновлен!')
      }

      // Перезагружаем данные
      await loadData()
      
      // Сбрасываем форму
      setEditingItem(null)
      setIsAddingNew(false)
      setFormData({
        name: '',
        description: '',
        price_per_day: 0,
        stock_quantity: 0,
        category_id: ''
      })

    } catch (err) {
      console.error('Ошибка сохранения:', err)
      setError(err instanceof Error ? err.message : 'Ошибка сохранения')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот товар?')) return

    try {
      setError(null)
      const { error } = await supabase
        .from('equipment_catalog')
        .delete()
        .eq('id', id)

      if (error) throw error
      setSuccess('Товар успешно удален!')
      await loadData()
    } catch (err) {
      console.error('Ошибка удаления:', err)
      setError(err instanceof Error ? err.message : 'Ошибка удаления')
    }
  }

  const handleCancel = () => {
    setEditingItem(null)
    setIsAddingNew(false)
    setFormData({
      name: '',
      description: '',
      price_per_day: 0,
      stock_quantity: 0,
      category_id: ''
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Загрузка каталога...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Управление каталогом оборудования
          </h1>
          <p className="text-gray-600">
            Добавляйте, редактируйте и удаляйте товары в каталоге
          </p>
        </div>

        {/* Уведомления */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            ❌ {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            ✅ {success}
          </div>
        )}

        {/* Кнопки управления */}
        <div className="mb-6 flex gap-4">
          <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Добавить товар
          </Button>
          <Button onClick={loadData} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Обновить
          </Button>
        </div>

        {/* Форма добавления/редактирования */}
        {(isAddingNew || editingItem) && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>
                {isAddingNew ? 'Добавить новый товар' : 'Редактировать товар'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название товара
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Введите название товара"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Категория
                  </label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Цена за день (₽)
                  </label>
                  <Input
                    type="number"
                    value={formData.price_per_day}
                    onChange={(e) => setFormData({ ...formData, price_per_day: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Количество в наличии
                  </label>
                  <Input
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Введите описание товара"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Список товаров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(item.id!)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <Badge variant="secondary">
                  {item.equipment_categories?.name || 'Без категории'}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description || 'Описание отсутствует'}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Цена за день:</span>
                    <span className="font-semibold">{item.price_per_day}₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">В наличии:</span>
                    <span className="font-semibold">{item.stock_quantity} шт.</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {equipment.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Товары не найдены</p>
            <p className="text-gray-400">Добавьте первый товар в каталог</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EquipmentCatalogAdmin
