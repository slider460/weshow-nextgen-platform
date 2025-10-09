# Инструкция по созданию таблицы reservations в Supabase

## Шаг 1: Откройте Supabase Dashboard

1. Перейдите на https://supabase.com/dashboard
2. Войдите в свой аккаунт
3. Выберите проект `weshow-nextgen-platform`

## Шаг 2: Откройте SQL Editor

1. В левом меню нажмите на "SQL Editor"
2. Нажмите "New query"

## Шаг 3: Выполните SQL скрипт

Скопируйте и вставьте следующий SQL код в редактор:

```sql
-- Создание таблицы reservations для системы бронирования
CREATE TABLE IF NOT EXISTS public.reservations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    comment TEXT,
    booking_date TIMESTAMPTZ,
    cart_snapshot JSONB NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Создание индексов для оптимизации запросов
CREATE INDEX IF NOT EXISTS idx_reservations_email ON public.reservations(email);
CREATE INDEX IF NOT EXISTS idx_reservations_booking_date ON public.reservations(booking_date);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON public.reservations(status);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON public.reservations(created_at);

-- Включение Row Level Security (RLS)
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Создание политик RLS
-- Политика для вставки (любой может создавать бронирования)
DROP POLICY IF EXISTS "Anyone can insert reservations" ON public.reservations;
CREATE POLICY "Anyone can insert reservations" ON public.reservations
    FOR INSERT WITH CHECK (true);

-- Политика для просмотра (только аутентифицированные пользователи)
DROP POLICY IF EXISTS "Authenticated users can view reservations" ON public.reservations;
CREATE POLICY "Authenticated users can view reservations" ON public.reservations
    FOR SELECT USING (auth.role() = 'authenticated');

-- Политика для обновления (только аутентифицированные пользователи)
DROP POLICY IF EXISTS "Authenticated users can update reservations" ON public.reservations;
CREATE POLICY "Authenticated users can update reservations" ON public.reservations
    FOR UPDATE USING (auth.role() = 'authenticated');
```

## Шаг 4: Выполните запрос

1. Нажмите кнопку "Run" или используйте сочетание клавиш Ctrl+Enter
2. Убедитесь, что запрос выполнился без ошибок

## Шаг 5: Проверьте создание таблицы

1. В левом меню нажмите на "Table Editor"
2. Найдите таблицу "reservations" в списке
3. Убедитесь, что все колонки созданы правильно

## Описание таблицы

Таблица `reservations` содержит следующие поля:

- `id` - Уникальный идентификатор (UUID)
- `full_name` - Полное имя клиента (обязательное)
- `email` - Email клиента (обязательное)
- `phone` - Телефон клиента (обязательное)
- `comment` - Комментарий клиента (необязательное)
- `booking_date` - Дата бронирования
- `cart_snapshot` - JSON с данными корзины на момент бронирования
- `status` - Статус бронирования (pending, confirmed, cancelled, completed)
- `created_at` - Дата создания записи
- `updated_at` - Дата последнего обновления

## Безопасность

- Включен Row Level Security (RLS)
- Любой может создавать бронирования (не требуется регистрация)
- Только аутентифицированные пользователи могут просматривать и редактировать бронирования

После создания таблицы система бронирования будет полностью функциональна!




