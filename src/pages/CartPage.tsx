import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Separator } from '../components/ui/separator'
import { Checkbox } from '../components/ui/checkbox'
import { useCartStore } from '../store/useCartStore'
import { BookingDialog } from '../components/BookingDialog'
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft,
  Truck,
  Wrench,
  Settings,
  FileText
} from 'lucide-react'

const SERVICES = [
  {
    id: 'delivery' as const,
    name: 'Доставка',
    description: 'Доставка оборудования на объект',
    price: 3000,
    icon: Truck
  },
  {
    id: 'installation' as const,
    name: 'Монтаж/демонтаж',
    description: 'Установка и настройка оборудования',
    price: 4000,
    icon: Settings
  },
  {
    id: 'support' as const,
    name: 'Техническое сопровождение',
    description: 'Поддержка во время мероприятия',
    price: 5000,
    icon: Wrench
  },
  {
    id: 'content' as const,
    name: 'Контент',
    description: 'Создание и адаптация контента',
    price: 8000,
    icon: FileText
  }
]

export const CartPage: React.FC = () => {
  const navigate = useNavigate()
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false)
  const { 
    items, 
    services, 
    totalItems, 
    totalPrice, 
    removeItem, 
    updateQuantity, 
    toggleService, 
    clearCart 
  } = useCartStore()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleServiceToggle = (service: keyof typeof services) => {
    toggleService(service)
  }

  const calculateServicesTotal = () => {
    return SERVICES.reduce((total, service) => {
      return services[service.id] ? total + service.price : total
    }, 0)
  }

  const calculateItemsTotal = () => {
    return items.reduce((total, item) => {
      return total + ((item.price || 0) * item.quantity)
    }, 0)
  }

  const calculateGrandTotal = () => {
    return calculateItemsTotal() + calculateServicesTotal()
  }

  // Автоматическое перенаправление на главную страницу, если корзина пуста
  useEffect(() => {
    if (items.length === 0) {
      navigate('/')
    }
  }, [items.length, navigate])

  // Если корзина пуста, показываем загрузку во время перенаправления
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Перенаправление...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Назад</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
              <p className="text-gray-600">
                {totalItems} {totalItems === 1 ? 'товар' : 'товаров'} в корзине
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Товары в корзине */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Оборудование</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ShoppingCart className="h-8 w-8 text-gray-400" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {item.category}
                      </p>
                      <p className="text-sm font-medium text-blue-600">
                        {(item.price || 0).toLocaleString()} ₽/день
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {((item.price || 0) * item.quantity).toLocaleString()} ₽
                      </p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Дополнительные услуги */}
            <Card>
              <CardHeader>
                <CardTitle>Дополнительные услуги</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {SERVICES.map((service) => {
                  const Icon = service.icon
                  const isSelected = services[service.id]
                  
                  return (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => handleServiceToggle(service.id)}
                        />
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {service.price.toLocaleString()} ₽
                        </p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Сводка заказа */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Сводка заказа</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Оборудование</span>
                    <span>{calculateItemsTotal().toLocaleString()} ₽</span>
                  </div>
                  
                  {SERVICES.map((service) => {
                    if (services[service.id]) {
                      return (
                        <div key={service.id} className="flex justify-between">
                          <span>{service.name}</span>
                          <span>{service.price.toLocaleString()} ₽</span>
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Итого:</span>
                  <span className="text-blue-600">
                    {calculateGrandTotal().toLocaleString()} ₽
                  </span>
                </div>

                <Button
                  onClick={() => setIsBookingDialogOpen(true)}
                  className="w-full mt-6"
                  size="lg"
                >
                  Забронировать
                </Button>

                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full"
                >
                  Очистить корзину
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BookingDialog
        isOpen={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
      />
    </div>
  )
}

export default CartPage
