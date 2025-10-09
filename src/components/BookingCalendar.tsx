import React, { useState, useEffect } from 'react';
import { Calendar } from './ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '../lib/utils';
import { format, isAfter, isBefore, isSameDay, startOfDay, endOfDay, addDays } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Calendar as CalendarIcon, MapPin, Package, X, CalendarDays } from 'lucide-react';
import { useNotifications } from './NotificationSystem';

interface BookingDay {
  id: string;
  date: Date;
  equipment: string;
  price: number; // цена за день
  isAvailable: boolean;
}

interface BookingCalendarProps {
  equipmentId?: string;
  equipmentName?: string;
  onBookingSelect?: (booking: BookingDay) => void;
  className?: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  equipmentId,
  equipmentName,
  onBookingSelect,
  className
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedBooking, setSelectedBooking] = useState<BookingDay | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const notifications = useNotifications();

  // Забронированные даты (в реальном приложении это будет API)
  const [bookedDates, setBookedDates] = useState<Date[]>([
    new Date(2024, 0, 15), // 15 января
    new Date(2024, 0, 16), // 16 января
    new Date(2024, 0, 22), // 22 января
    new Date(2024, 0, 23), // 23 января
  ]);

  // Создаем бронирование для выбранной даты
  useEffect(() => {
    if (selectedDate && !bookedDates.some(date => isSameDay(date, selectedDate))) {
      createBookingForDate(selectedDate);
    } else {
      setSelectedBooking(null);
    }
  }, [selectedDate, bookedDates]);

  const createBookingForDate = (date: Date) => {
    const booking: BookingDay = {
      id: `booking-${date.getTime()}`,
      date: startOfDay(date),
      equipment: equipmentName || 'LED экран 4K',
      price: 50000, // фиксированная цена за день
      isAvailable: true
    };
    
    setSelectedBooking(booking);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedBooking(null);
  };

  const handleBookingConfirm = async (booking: BookingDay) => {
    try {
      setIsLoading(true);
      
      // Симуляция бронирования
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Добавляем дату в забронированные
      setBookedDates(prev => [...prev, booking.date]);
      
      notifications.success('Бронирование подтверждено!', {
        description: `Оборудование забронировано на ${format(booking.date, 'dd MMMM yyyy', { locale: ru })}`,
        action: {
          label: 'Посмотреть детали',
          onClick: () => {
            console.log('Переход к деталям бронирования', booking);
          }
        }
      });
      
      // Очищаем выбор
      setSelectedBooking(null);
      setSelectedDate(undefined);
      
    } catch (error) {
      notifications.error('Ошибка бронирования', {
        description: 'Не удалось забронировать оборудование'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isDateBooked = (date: Date) => {
    return bookedDates.some(bookedDate => isSameDay(bookedDate, date));
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return isBefore(date, today) || isDateBooked(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Календарь бронирования
          </CardTitle>
          <CardDescription>
            Выберите дату для бронирования {equipmentName && `оборудования "${equipmentName}"`} на полный день
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Календарь */}
            <div className="space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={isDateDisabled}
                locale={ru}
                className="rounded-md border"
                modifiers={{
                  booked: bookedDates
                }}
                modifiersStyles={{
                  booked: {
                    backgroundColor: '#fecaca',
                    color: '#dc2626',
                    fontWeight: 'bold'
                  }
                }}
              />
              
              {/* Легенда */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-100 border border-red-300 rounded"></div>
                  <span>Забронировано</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded"></div>
                  <span>Недоступно</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
                  <span>Доступно</span>
                </div>
              </div>
            </div>

            {/* Информация о бронировании */}
            {selectedDate && !isDateBooked(selectedDate) && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <CalendarDays className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-blue-900">
                    Бронирование на {format(selectedDate, 'dd MMMM yyyy', { locale: ru })}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-blue-600" />
                    <span>{equipmentName || 'LED экран 4K'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-blue-600" />
                    <span>Полный день (24 часа)</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <p className="text-sm text-blue-700">Стоимость:</p>
                    <p className="text-xl font-bold text-blue-900">
                      {formatCurrency(50000)}
                    </p>
                    <p className="text-xs text-blue-600">за полный день</p>
                  </div>
                  <Button 
                    onClick={() => selectedBooking && handleBookingConfirm(selectedBooking)}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isLoading ? 'Бронируем...' : 'Забронировать день'}
                  </Button>
                </div>
              </div>
            )}

            {selectedDate && isDateBooked(selectedDate) && (
              <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
                <Package className="h-12 w-12 mx-auto mb-3 text-red-500 opacity-50" />
                <p className="text-red-700 font-medium">Выбранная дата уже забронирована</p>
                <p className="text-red-600 text-sm mt-1">Пожалуйста, выберите другую дату</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCalendar;
