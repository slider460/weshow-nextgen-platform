import React, { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import { getCategories } from '../api/equipment'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Upload, Download, Check, X, AlertCircle } from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
}

interface EquipmentItem {
  name: string
  description: string
  price_per_day: number
  stock_quantity: number
  category_slug: string
}

const CSVImportEquipment = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [csvData, setCsvData] = useState<EquipmentItem[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [importResults, setImportResults] = useState<{
    success: number
    errors: string[]
  } | null>(null)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const categoriesData = await getCategories()
      setCategories(categoriesData)
    } catch (err) {
      console.error('Ошибка загрузки категорий:', err)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      parseCSV(text)
    }
    reader.readAsText(file)
  }

  const parseCSV = (csvText: string) => {
    try {
      const lines = csvText.split('\n').filter(line => line.trim())
      if (lines.length < 2) {
        setError('CSV файл должен содержать заголовки и хотя бы одну строку данных')
        return
      }

      const headers = lines[0].split(',').map(h => h.trim().toLowerCase())
      const requiredHeaders = ['name', 'description', 'price_per_day', 'stock_quantity', 'category_slug']
      
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h))
      if (missingHeaders.length > 0) {
        setError(`Отсутствуют обязательные колонки: ${missingHeaders.join(', ')}`)
        return
      }

      const data: EquipmentItem[] = []
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim())
        if (values.length !== headers.length) continue

        const item: EquipmentItem = {
          name: values[headers.indexOf('name')] || '',
          description: values[headers.indexOf('description')] || '',
          price_per_day: Number(values[headers.indexOf('price_per_day')]) || 0,
          stock_quantity: Number(values[headers.indexOf('stock_quantity')]) || 0,
          category_slug: values[headers.indexOf('category_slug')] || ''
        }

        if (item.name && item.category_slug) {
          data.push(item)
        }
      }

      setCsvData(data)
      setError(null)
      setSuccess(`Загружено ${data.length} товаров из CSV файла`)
    } catch (err) {
      setError('Ошибка парсинга CSV файла')
      console.error('CSV parse error:', err)
    }
  }

  const handleImport = async () => {
    if (csvData.length === 0) {
      setError('Нет данных для импорта')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      // Получаем ID категорий
      const categoryMap = new Map(categories.map(c => [c.slug, c.id]))
      
      const equipmentData = csvData.map(item => ({
        name: item.name,
        description: item.description,
        price_per_day: item.price_per_day,
        stock_quantity: item.stock_quantity,
        category_id: categoryMap.get(item.category_slug)
      })).filter(item => item.category_id)

      const { error } = await supabase
        .from('equipment_catalog')
        .insert(equipmentData)

      if (error) throw error

      const successCount = equipmentData.length
      const errorCount = csvData.length - successCount
      
      setImportResults({
        success: successCount,
        errors: errorCount > 0 ? [`${errorCount} товаров не удалось добавить (неверная категория)`] : []
      })

      setCsvData([])
      setSuccess(`Успешно импортировано ${successCount} товаров`)

    } catch (err) {
      console.error('Ошибка импорта:', err)
      setError(err instanceof Error ? err.message : 'Ошибка импорта')
    } finally {
      setLoading(false)
    }
  }

  const downloadTemplate = () => {
    const template = `name,description,price_per_day,stock_quantity,category_slug
Проектор Panasonic PT-RZ970,4K лазерный проектор 10000 лм,15000,3,projectors
Микрофон Shure SM58,Вокальный микрофон классика,2000,6,audio
Прожектор Chauvet DJ Intimidator Spot 355 IRC,RGBW прожектор с лазером,8000,2,lighting
Камера Sony HXR-NX100,4K видеокамера с 20x зумом,15000,2,video`

    const blob = new Blob([template], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'equipment_template.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Импорт товаров из CSV
          </h1>
          <p className="text-gray-600">
            Загрузите CSV файл для массового добавления товаров в каталог
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Загрузка файла */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2 text-purple-600" />
                Загрузка CSV файла
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Выберите CSV файл
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={downloadTemplate} variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Скачать шаблон
                </Button>
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">Формат CSV файла:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>name - название товара</li>
                  <li>description - описание</li>
                  <li>price_per_day - цена за день</li>
                  <li>stock_quantity - количество в наличии</li>
                  <li>category_slug - слаг категории</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Доступные категории */}
          <Card>
            <CardHeader>
              <CardTitle>Доступные категории</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="outline">{category.slug}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Уведомления */}
        {error && (
          <Card className="mt-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="flex items-center text-red-700">
                <X className="w-5 h-5 mr-2" />
                {error}
              </div>
            </CardContent>
          </Card>
        )}

        {success && (
          <Card className="mt-6 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center text-green-700">
                <Check className="w-5 h-5 mr-2" />
                {success}
              </div>
            </CardContent>
          </Card>
        )}

        {importResults && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Результаты импорта</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-green-700">
                  <Check className="w-4 h-4 mr-2" />
                  Успешно добавлено: {importResults.success} товаров
                </div>
                {importResults.errors.map((error, index) => (
                  <div key={index} className="flex items-center text-red-700">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Предварительный просмотр */}
        {csvData.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Предварительный просмотр ({csvData.length} товаров)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {csvData.slice(0, 10).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {item.price_per_day}₽/день
                      </span>
                    </div>
                    <Badge variant="outline">{item.category_slug}</Badge>
                  </div>
                ))}
                {csvData.length > 10 && (
                  <div className="text-center text-gray-500 text-sm">
                    ... и еще {csvData.length - 10} товаров
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button onClick={handleImport} disabled={loading} className="bg-purple-600 hover:bg-purple-700">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Импорт...
                    </>
                  ) : (
                    'Импортировать товары'
                  )}
                </Button>
                <Button onClick={() => setCsvData([])} variant="outline">
                  Очистить
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ссылки */}
        <div className="mt-8 text-center">
          <div className="space-x-4">
            <a
              href="/add-equipment"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Добавить один товар
            </a>
            <a
              href="/admin/equipment"
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Управление каталогом
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

export default CSVImportEquipment
