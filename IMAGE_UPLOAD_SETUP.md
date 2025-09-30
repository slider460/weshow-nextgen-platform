# 📸 Настройка загрузки изображений

## ✅ Что уже сделано

### 1. **Компонент загрузки изображений**
- Создан `src/components/ImageUpload.tsx`
- Поддержка drag & drop
- Предварительный просмотр изображений
- Валидация типа и размера файлов
- Возможность ввода URL изображения

### 2. **Интеграция в админ-панели**
- ✅ NewsManagement - загрузка изображений для новостей
- ✅ BlogManagement - загрузка изображений для статей блога
- ✅ Замена простых полей URL на компонент загрузки

### 3. **Исправлена проблема с исчезновением новостей**
- ✅ Добавлено логирование для отладки
- ✅ Принудительное обновление списка после создания
- ✅ Улучшена обработка ошибок

## 🔧 Текущий статус

**Загрузка изображений работает в режиме предварительного просмотра:**
- Можно выбирать файлы с компьютера
- Показывается предварительный просмотр
- Поддерживается ввод URL изображений
- **НО:** файлы не загружаются на сервер (только локальный предварительный просмотр)

## 🚀 Для полной функциональности нужно:

### 1. **Настроить Supabase Storage**
Выполните в Supabase SQL Editor:

```sql
-- Создаем bucket для изображений
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  5242880, -- 5MB в байтах
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Создаем политики RLS для storage
CREATE POLICY "Images are publicly accessible" ON storage.objects
FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Anyone can upload images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'images');

CREATE POLICY "Anyone can update images" ON storage.objects
FOR UPDATE USING (bucket_id = 'images');

CREATE POLICY "Anyone can delete images" ON storage.objects
FOR DELETE USING (bucket_id = 'images');
```

### 2. **Включить загрузку на сервер**
В файле `src/components/ImageUpload.tsx` замените функцию `handleFileUpload`:

```typescript
// Замените текущую реализацию на:
const handleFileUpload = async (file: File) => {
  // ... валидация ...
  
  try {
    const { uploadImage } = await import('../../api/upload');
    const result = await uploadImage(file, 'news');
    
    setPreview(result.url);
    onChange(result.url);
    
    console.log('✅ Изображение загружено на сервер:', result.url);
  } catch (error) {
    console.error('❌ Ошибка загрузки:', error);
    alert('Ошибка загрузки изображения');
  }
};
```

## 🎯 Как использовать

### **В админ-панели новостей:**
1. Откройте http://localhost:8082/admin/news
2. Нажмите "Добавить новость"
3. В поле "Изображение":
   - **Перетащите файл** в область загрузки
   - **Или нажмите "Выберите файл"**
   - **Или введите URL** в поле ниже

### **В админ-панели блога:**
1. Откройте http://localhost:8082/admin/blog
2. Нажмите "Добавить статью"
3. Используйте тот же компонент загрузки

## 🔍 Отладка

### **Проверьте консоль браузера:**
- `📝 Создаем/обновляем новость:` - данные новости
- `✅ Новость создана` - успешное создание
- `🔄 Обновляем список новостей...` - обновление списка
- `✅ Список обновлен` - список обновлен

### **Если новости исчезают:**
1. Проверьте консоль на ошибки
2. Убедитесь, что RLS политики настроены
3. Проверьте, что таблицы `news` и `blog_posts` существуют

## 📋 Файлы для настройки

- `src/components/ImageUpload.tsx` - компонент загрузки
- `src/api/upload.ts` - API для загрузки
- `setup_supabase_storage.sql` - настройка Supabase Storage
- `src/pages/admin/NewsManagement.tsx` - интеграция в новости
- `src/pages/admin/BlogManagement.tsx` - интеграция в блог

---
**Время настройки: 5-10 минут** ⏱️
