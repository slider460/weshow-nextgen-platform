# Система бронирования - Руководство

## Обзор
Создана новая система бронирования оборудования без регистрации, интегрированная с Supabase и использующая современный стек технологий.

## Технологии
- **Next.js 14+** (App Router) - React Router в данном проекте
- **TypeScript** - типизация
- **shadcn/ui** - UI компоненты
- **Tailwind CSS** - стилизация
- **Zustand** - управление состоянием корзины
- **Supabase** - база данных
- **Sonner** - уведомления

## Структура файлов

### Store (Zustand)
- `src/store/useCartStore.ts` - управление состоянием корзины

### Компоненты
- `src/components/AddToCartButton.tsx` - кнопка добавления в корзину
- `src/components/HeaderCart.tsx` - иконка корзины в шапке
- `src/components/BookingDialog.tsx` - модальное окно бронирования

### Страницы
- `src/pages/CartPage.tsx` - страница корзины

### Утилиты
- `src/utils/supabase-client.ts` - клиент Supabase

### База данных
- `create_reservations_table.sql` - SQL скрипт для создания таблицы

## Функциональность

### Корзина
- ✅ Добавление товаров в корзину
- ✅ Управление количеством товаров
- ✅ Удаление товаров
- ✅ Выбор дополнительных услуг
- ✅ Автоматический расчет стоимости
- ✅ Сохранение в localStorage

### Бронирование
- ✅ Форма с валидацией
- ✅ Выбор даты бронирования
- ✅ Отправка данных в Supabase
- ✅ Уведомления об успехе/ошибке
- ✅ Автоматическая очистка корзины

### UI/UX
- ✅ Иконка корзины в шапке с счетчиком
- ✅ Скрытие иконки при пустой корзине
- ✅ Toast уведомления
- ✅ Адаптивный дизайн

## Использование

### Добавление товара в корзину
```tsx
import { AddToCartButton } from '@/components/AddToCartButton'

<AddToCartButton
  equipmentId="equipment-1"
  name="Проектор"
  category="Мультимедиа"
  price={5000}
  image="/images/projector.jpg"
/>
```

### Работа с корзиной
```tsx
import { useCartStore } from '@/store/useCartStore'

const { items, totalItems, addItem, removeItem, clearCart } = useCartStore()
```

### Открытие диалога бронирования
```tsx
import { BookingDialog } from '@/components/BookingDialog'

<BookingDialog
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
/>
```

## Настройка базы данных

1. Выполните SQL скрипт `create_reservations_table.sql` в Supabase
2. Убедитесь, что RLS политики настроены корректно
3. Проверьте подключение к Supabase в `src/utils/supabase-client.ts`

## Структура данных

### CartItem
```typescript
interface CartItem {
  id: string
  equipmentId: string
  name: string
  category: string
  price: number
  quantity: number
  image?: string
}
```

### ServiceOptions
```typescript
interface ServiceOptions {
  delivery: boolean
  installation: boolean
  support: boolean
  content: boolean
}
```

### Reservation (Supabase)
```sql
CREATE TABLE reservations (
    id UUID PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    comment TEXT,
    booking_date TIMESTAMPTZ,
    cart_snapshot JSONB NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Особенности

1. **Без регистрации** - система работает без обязательной регистрации пользователей
2. **Персистентность** - корзина сохраняется в localStorage
3. **Валидация** - все формы имеют валидацию
4. **Уведомления** - пользователь получает обратную связь через Toast
5. **Адаптивность** - интерфейс адаптируется под разные устройства

## Следующие шаги

1. Выполните SQL скрипт в Supabase
2. Протестируйте функциональность
3. Добавьте кнопки "Добавить в корзину" на страницы оборудования
4. Настройте email уведомления (опционально)
5. Добавьте админ-панель для управления заявками (опционально)




