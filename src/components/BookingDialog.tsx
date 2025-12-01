import React, { useState } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { useCartStore } from '../store/useCartStore'
import { supabase } from '../utils/supabase-client'
import { toast } from 'sonner'
import { cn } from '../lib/utils'

interface BookingDialogProps {
  isOpen: boolean
  onClose: () => void
}

interface BookingFormData {
  fullName: string
  email: string
  phone: string
  comment: string
  bookingDate: Date | undefined
}

export const BookingDialog: React.FC<BookingDialogProps> = ({
  isOpen,
  onClose
}) => {
  const { items, services, totalPrice, clearCart } = useCartStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    comment: '',
    bookingDate: undefined
  })

  const handleInputChange = (field: keyof BookingFormData, value: string | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Максимально простой календарь
  const SimpleCalendar = () => {
    const today = new Date()
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Добавляем пустые ячейки для начала месяца
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Добавляем дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    const handleDateSelect = (day: number) => {
      console.log('Date selected:', day)
      const selectedDate = new Date(year, month, day)
      console.log('Selected date:', selectedDate)
      handleInputChange('bookingDate', selectedDate)
      setIsCalendarOpen(false)
    }
    
    const goToPreviousMonth = () => {
      console.log('Previous month clicked')
      setCurrentMonth(new Date(year, month - 1, 1))
    }
    
    const goToNextMonth = () => {
      console.log('Next month clicked')
      setCurrentMonth(new Date(year, month + 1, 1))
    }
    
    return (
      <div className="w-full max-w-sm mx-auto">
        {/* Заголовок календаря */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={goToPreviousMonth}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm"
          >
            ←
          </button>
          <h3 className="font-semibold text-lg">
            {currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
          </h3>
          <button
            type="button"
            onClick={goToNextMonth}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm"
          >
            →
          </button>
        </div>
        
        {/* Дни недели */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Дни месяца */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={index} className="p-2" />
            }
            
            const isSelected = formData.bookingDate && 
              formData.bookingDate.getDate() === day &&
              formData.bookingDate.getMonth() === month &&
              formData.bookingDate.getFullYear() === year
            
            const isToday = today.getDate() === day &&
              today.getMonth() === month &&
              today.getFullYear() === year
            
            return (
              <button
                key={day}
                type="button"
                className={`w-10 h-10 border border-gray-300 rounded text-sm font-medium ${
                  isSelected 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : isToday 
                      ? 'bg-blue-100 text-blue-600 border-blue-300' 
                      : 'hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => handleDateSelect(day)}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      toast.error('Введите ФИО')
      return false
    }
    if (!formData.email.trim()) {
      toast.error('Введите email')
      return false
    }
    if (!formData.phone.trim()) {
      toast.error('Введите телефон')
      return false
    }
    if (!formData.bookingDate) {
      toast.error('Выберите дату бронирования')
      return false
    }
    return true
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Подготавливаем данные для отправки в Supabase
      const reservationData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        comment: formData.comment,
        booking_date: formData.bookingDate?.toISOString(),
        cart_snapshot: JSON.stringify({
          items,
          services,
          totalPrice: safeTotalPrice
        }),
        created_at: new Date().toISOString()
      }

      // Отправляем данные в Supabase
      const { error } = await supabase
        .from('reservations')
        .insert([reservationData])

      if (error) {
        throw error
      }

      // Очищаем корзину
      clearCart()

      // Показываем сообщение об успехе
      toast.success('Спасибо, мы свяжемся с вами в ближайшее время!', {
        description: 'Ваша заявка успешно отправлена',
        duration: 5000
      })

      // Закрываем диалог
      onClose()

      // Сбрасываем форму
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        comment: '',
        bookingDate: undefined
      })

    } catch (error) {
      console.error('Ошибка при отправке заявки:', error)
      toast.error('Произошла ошибка при отправке заявки. Попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateServicesTotal = () => {
    const servicePrices = {
      delivery: 3000,
      installation: 4000,
      support: 5000,
      content: 8000
    }

    return Object.entries(services).reduce((total, [key, enabled]) => {
      return enabled ? total + (servicePrices[key as keyof typeof servicePrices] || 0) : total
    }, 0)
  }

  const safeTotalPrice = totalPrice || 0
  const grandTotal = safeTotalPrice + calculateServicesTotal()

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Оформление бронирования</DialogTitle>
          <DialogDescription>
            Заполните форму для оформления бронирования оборудования
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* ФИО */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fullName" className="text-right">
              ФИО *
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="col-span-3"
              placeholder="Иванов Иван Иванович"
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="col-span-3"
              placeholder="example@email.com"
            />
          </div>

          {/* Телефон */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Телефон *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="col-span-3"
              placeholder="+7 (999) 123-45-67"
            />
          </div>

          {/* Дата бронирования */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Дата бронирования *
            </Label>
            <Button
              variant="outline"
              className={cn(
                "col-span-3 justify-start text-left font-normal",
                !formData.bookingDate && "text-muted-foreground"
              )}
              onClick={() => setIsCalendarOpen(true)}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.bookingDate ? (
                format(formData.bookingDate, "PPP")
              ) : (
                <span>Выберите дату</span>
              )}
            </Button>
          </div>

          {/* Комментарий */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="comment" className="text-right">
              Комментарий
            </Label>
            <Textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
              className="col-span-3"
              placeholder="Дополнительные пожелания или требования..."
              rows={3}
            />
          </div>

          {/* Сводка заказа */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">Сводка заказа:</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Оборудование:</span>
                <span>{safeTotalPrice.toLocaleString()} ₽</span>
              </div>
              {Object.entries(services).map(([key, enabled]) => {
                if (!enabled) return null
                const serviceNames = {
                  delivery: 'Доставка',
                  installation: 'Монтаж/демонтаж',
                  support: 'Техническое сопровождение',
                  content: 'Контент'
                }
                const servicePrices = {
                  delivery: 3000,
                  installation: 4000,
                  support: 5000,
                  content: 8000
                }
                return (
                  <div key={key} className="flex justify-between">
                    <span>{serviceNames[key as keyof typeof serviceNames]}:</span>
                    <span>{servicePrices[key as keyof typeof servicePrices].toLocaleString()} ₽</span>
                  </div>
                )
              })}
              <div className="flex justify-between font-semibold border-t pt-1">
                <span>Итого:</span>
                <span>{grandTotal.toLocaleString()} ₽</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Отмена
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Отправляем...' : 'Забронировать'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Отдельное модальное окно для календаря */}
    <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Выберите дату бронирования</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <SimpleCalendar />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsCalendarOpen(false)}>
            Отмена
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}
