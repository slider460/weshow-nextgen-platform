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

-- Включение RLS (Row Level Security)
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Политика для вставки данных (любой может создавать резервации)
CREATE POLICY "Anyone can insert reservations" ON public.reservations
    FOR INSERT WITH CHECK (true);

-- Политика для чтения данных (только аутентифицированные пользователи)
CREATE POLICY "Authenticated users can view reservations" ON public.reservations
    FOR SELECT USING (auth.role() = 'authenticated');

-- Политика для обновления данных (только аутентифицированные пользователи)
CREATE POLICY "Authenticated users can update reservations" ON public.reservations
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Триггер для автоматического обновления updated_at
CREATE TRIGGER update_reservations_updated_at 
    BEFORE UPDATE ON public.reservations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Комментарии к таблице и колонкам
COMMENT ON TABLE public.reservations IS 'Таблица для хранения заявок на бронирование оборудования';
COMMENT ON COLUMN public.reservations.full_name IS 'Полное имя клиента';
COMMENT ON COLUMN public.reservations.email IS 'Email клиента';
COMMENT ON COLUMN public.reservations.phone IS 'Телефон клиента';
COMMENT ON COLUMN public.reservations.comment IS 'Комментарий клиента';
COMMENT ON COLUMN public.reservations.booking_date IS 'Дата бронирования';
COMMENT ON COLUMN public.reservations.cart_snapshot IS 'JSON снимок корзины на момент бронирования';
COMMENT ON COLUMN public.reservations.status IS 'Статус заявки: pending, confirmed, cancelled, completed';
COMMENT ON COLUMN public.reservations.created_at IS 'Дата создания заявки';
COMMENT ON COLUMN public.reservations.updated_at IS 'Дата последнего обновления заявки';





