import React, { useState, useEffect } from 'react'
import { getHomepageEquipment, createHomepageEquipment, updateHomepageEquipment, deleteHomepageEquipment } from '../../api/adminRest'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Switch } from '../../components/ui/switch'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  RefreshCw, 
  Eye, 
  EyeOff,
  ArrowUp,
  ArrowDown,
  Monitor,
  Speaker,
  Projector,
  Zap,
  Gamepad
} from 'lucide-react'

interface HomepageEquipmentItem {
  id?: string
  title: string
  description: string
  icon: string
  gradient: string
  link: string
  is_visible: boolean
  sort_order: number
  created_at?: string
  updated_at?: string
}

const iconOptions = [
  { value: 'Monitor', label: 'Монитор', component: Monitor },
  { value: 'Speaker', label: 'Динамик', component: Speaker },
  { value: 'Projector', label: 'Проектор', component: Projector },
  { value: 'Zap', label: 'Молния', component: Zap },
  { value: 'Gamepad', label: 'Геймпад', component: Gamepad },
  { value: 'Eye', label: 'Глаз', component: Eye }
]

const gradientOptions = [
  { value: 'gradient-card-purple', label: 'Фиолетовый' },
  { value: 'gradient-card-blue', label: 'Синий' },
  { value: 'gradient-card-cyan', label: 'Голубой' },
  { value: 'gradient-card-dark', label: 'Темный' },
  { value: 'gradient-card-green', label: 'Зеленый' },
  { value: 'gradient-card-orange', label: 'Оранжевый' }
]

const HomepageEquipmentAdmin = () => {
  const [equipmentItems, setEquipmentItems] = useState<HomepageEquipmentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<HomepageEquipmentItem | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Форма для нового/редактируемого товара
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Monitor',
    gradient: 'gradient-card-purple',
    link: '',
    is_visible: true,
    sort_order: 0
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await getHomepageEquipment()
      setEquipmentItems(data || [])
      setError(null)
    } catch (err) {
      console.error('Ошибка загрузки данных:', err)
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка')
      setEquipmentItems([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddNew = () => {
    const nextOrder = Math.max(...equipmentItems.map(item => item.sort_order), 0) + 1
    setFormData({
      title: '',
      description: '',
      icon: 'Monitor',
      gradient: 'gradient-card-purple',
      link: '',
      is_visible: true,
      sort_order: nextOrder
    })
    setIsAddingNew(true)
    setEditingItem(null)
  }

  const handleEdit = (item: HomepageEquipmentItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      icon: item.icon,
      gradient: item.gradient,
      link: item.link,
      is_visible: item.is_visible,
      sort_order: item.sort_order
    })
    setEditingItem(item)
    setIsAddingNew(false)
  }

  const handleSave = async () => {
    try {
      setError(null)
      setSuccess(null)
      setLoading(true)

      // Валидация обязательных полей
      if (!formData.title.trim()) {
        setError('Название блока обязательно для заполнения')
        return
      }

      if (!formData.description.trim()) {
        setError('Описание блока обязательно для заполнения')
        return
      }

      if (!formData.link.trim()) {
        setError('Ссылка обязательна для заполнения')
        return
      }

      if (isAddingNew) {
        // Добавляем новый товар
        await createHomepageEquipment({
          title: formData.title.trim(),
          description: formData.description.trim(),
          icon: formData.icon,
          gradient: formData.gradient,
          link: formData.link.trim(),
          is_visible: formData.is_visible,
          sort_order: formData.sort_order
        })
        setSuccess('Блок оборудования успешно добавлен!')
      } else if (editingItem?.id) {
        // Обновляем существующий товар
        await updateHomepageEquipment(editingItem.id, {
          title: formData.title.trim(),
          description: formData.description.trim(),
          icon: formData.icon,
          gradient: formData.gradient,
          link: formData.link.trim(),
          is_visible: formData.is_visible,
          sort_order: formData.sort_order
        })
        setSuccess('Блок оборудования успешно обновлен!')
      }

      // Перезагружаем данные
      await loadData()
      
      // Сбрасываем форму
      setEditingItem(null)
      setIsAddingNew(false)
      setFormData({
        title: '',
        description: '',
        icon: 'Monitor',
        gradient: 'gradient-card-purple',
        link: '',
        is_visible: true,
        sort_order: 0
      })

    } catch (err) {
      console.error('Ошибка сохранения:', err)
      setError(err instanceof Error ? err.message : 'Ошибка сохранения')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот блок оборудования?')) return

    try {
      setError(null)
      await deleteHomepageEquipment(id)
      setSuccess('Блок оборудования успешно удален!')
      await loadData()
    } catch (err) {
      console.error('Ошибка удаления:', err)
      setError(err instanceof Error ? err.message : 'Ошибка удаления')
    }
  }

  const handleToggleVisibility = async (id: string, isVisible: boolean) => {
    try {
      await updateHomepageEquipment(id, { is_visible: isVisible })
      await loadData()
    } catch (err) {
      console.error('Ошибка обновления видимости:', err)
    }
  }

  const handleMoveUp = async (id: string) => {
    const item = equipmentItems.find(i => i.id === id)
    if (!item) return

    const prevItem = equipmentItems
      .filter(i => i.sort_order < item.sort_order)
      .sort((a, b) => b.sort_order - a.sort_order)[0]

    if (!prevItem) return

    try {
      await updateHomepageEquipment(id, { sort_order: prevItem.sort_order })
      await updateHomepageEquipment(prevItem.id, { sort_order: item.sort_order })
      await loadData()
    } catch (err) {
      console.error('Ошибка перемещения:', err)
    }
  }

  const handleMoveDown = async (id: string) => {
    const item = equipmentItems.find(i => i.id === id)
    if (!item) return

    const nextItem = equipmentItems
      .filter(i => i.sort_order > item.sort_order)
      .sort((a, b) => a.sort_order - b.sort_order)[0]

    if (!nextItem) return

    try {
      await updateHomepageEquipment(id, { sort_order: nextItem.sort_order })
      await updateHomepageEquipment(nextItem.id, { sort_order: item.sort_order })
      await loadData()
    } catch (err) {
      console.error('Ошибка перемещения:', err)
    }
  }

  const handleCancel = () => {
    setEditingItem(null)
    setIsAddingNew(false)
    setFormData({
      title: '',
      description: '',
      icon: 'Monitor',
      gradient: 'gradient-card-purple',
      link: '',
      is_visible: true,
      sort_order: 0
    })
  }


  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(option => option.value === iconName)
    return iconOption ? iconOption.component : Monitor
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Загрузка блоков оборудования...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Управление блоками оборудования на главной странице
          </h1>
          <p className="text-gray-600">
            Редактируйте блоки оборудования, которые отображаются на главной странице
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
            Добавить блок
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
                {isAddingNew ? 'Добавить новый блок оборудования' : 'Редактировать блок оборудования'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название блока
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Например: Кинетический экран"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ссылка
                  </label>
                  <Input
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="/services/kinetic-screen"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Иконка
                  </label>
                  <Select
                    value={formData.icon}
                    onValueChange={(value) => setFormData({ ...formData, icon: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите иконку" />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => {
                        const IconComponent = option.component
                        return (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center">
                              <IconComponent className="w-4 h-4 mr-2" />
                              {option.label}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Градиент
                  </label>
                  <Select
                    value={formData.gradient}
                    onValueChange={(value) => setFormData({ ...formData, gradient: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите градиент" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradientOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Порядок сортировки
                  </label>
                  <Input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_visible"
                    checked={formData.is_visible}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
                  />
                  <label htmlFor="is_visible" className="text-sm font-medium text-gray-700">
                    Отображать на сайте
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Краткое описание блока оборудования"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Сохранение...' : 'Сохранить'}
                </Button>
                <Button onClick={handleCancel} variant="outline" disabled={loading}>
                  <X className="w-4 h-4 mr-2" />
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Список блоков оборудования */}
        <div className="space-y-4">
          {equipmentItems.map((item, index) => {
            const IconComponent = getIconComponent(item.icon)
            return (
              <Card key={item.id} className={`${!item.is_visible ? 'opacity-50' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${item.gradient} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline">{item.gradient}</Badge>
                          <Badge variant="outline">{item.icon}</Badge>
                          <Badge variant="outline">#{item.sort_order}</Badge>
                          {item.is_visible ? (
                            <Badge className="bg-green-100 text-green-800">
                              <Eye className="w-3 h-3 mr-1" />
                              Видимый
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800">
                              <EyeOff className="w-3 h-3 mr-1" />
                              Скрытый
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMoveUp(item.id!)}
                        disabled={index === 0}
                      >
                        <ArrowUp className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleMoveDown(item.id!)}
                        disabled={index === equipmentItems.length - 1}
                      >
                        <ArrowDown className="w-3 h-3" />
                      </Button>
                      <Switch
                        checked={item.is_visible}
                        onCheckedChange={(checked) => handleToggleVisibility(item.id!, checked)}
                      />
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
                </CardContent>
              </Card>
            )
          })}
        </div>

        {equipmentItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Блоки оборудования не найдены</p>
            <p className="text-gray-400">Добавьте первый блок оборудования</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomepageEquipmentAdmin
