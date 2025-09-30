-- Упрощенная настройка Supabase Storage для изображений
-- Этот скрипт должен работать с обычными правами пользователя

-- Создание bucket для изображений (если еще не существует)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  5242880, -- 5MB в байтах
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- Проверка, что bucket создан
SELECT * FROM storage.buckets WHERE id = 'images';
