import React, { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import { getCategories } from '../api/equipment'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Plus, Check, X } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  description: string | null
}

const QuickAddEquipment = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price_per_day: 0,
    stock_quantity: 0,
    category_id: ''
  })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const categoriesData = await getCategories()
      setCategories(categoriesData)
      if (categoriesData.length > 0) {
        setFormData(prev => ({ ...prev, category_id: categoriesData[0].id }))
      }
    } catch (err) {
      console.error('Ошибка загрузки категорий:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.category_id) {
      setError('Заполните обязательные поля')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      const { error } = await supabase
        .from('equipment_catalog')
        .insert([formData])

      if (error) throw error

      setSuccess('Товар успешно добавлен!')
      
      // Сбрасываем форму
      setFormData({
        name: '',
        description: '',
        price_per_day: 0,
        stock_quantity: 0,
        category_id: categories[0]?.id || ''
      })

    } catch (err) {
      console.error('Ошибка добавления товара:', err)
      setError(err instanceof Error ? err.message : 'Ошибка добавления товара')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      price_per_day: 0,
      stock_quantity: 0,
      category_id: categories[0]?.id || ''
    })
    setError(null)
    setSuccess(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Быстрое добавление товара
          </h1>
          <p className="text-gray-600">
            Заполните форму для добавления нового товара в каталог
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2 text-blue-600" />
              Новый товар
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Уведомления */}
              {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
                  <X className="w-4 h-4 mr-2" />
                  {error}
                </div>
              )}
              {success && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  {success}
                </div>
              )}

              {/* Название товара */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название товара *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Например: Проектор Panasonic PT-RZ970"
                  required
                />
              </div>

              {/* Категория */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Категория *
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
                        <div className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            {category.slug}
                          </Badge>
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Цена и количество */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена за день (₽)
                  </label>
                  <Input
                    type="number"
                    value={formData.price_per_day}
                    onChange={(e) => setFormData({ ...formData, price_per_day: Number(e.target.value) })}
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Количество в наличии
                  </label>
                  <Input
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => setFormData({ ...formData, stock_quantity: Number(e.target.value) })}
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              {/* Описание */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Подробное описание товара, технические характеристики..."
                  rows={4}
                />
              </div>

              {/* Кнопки */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Добавление...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить товар
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={handleReset}
                  variant="outline"
                  className="px-6"
                >
                  <X className="w-4 h-4 mr-2" />
                  Очистить
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Ссылки на другие страницы */}
        <div className="mt-8 text-center">
          <div className="space-x-4">
            <a
              href="/admin/equipment"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Полное управление каталогом
            </a>
            <a
              href="/equipment"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Посмотреть каталог
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickAddEquipment
