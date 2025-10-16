# 🔧 Руководство по настройке переменных окружения в Vercel

## 🚨 Проблема

Несмотря на исправления в коде, ошибка "supabaseKey is required" все еще возникает на production. Это указывает на то, что переменные окружения не настроены правильно в Vercel.

## 📋 Диагностика показала

### ✅ Локальный build работает:
```
🔧 Vite Config - Mode: production
🔧 Vite Config - VITE_SUPABASE_URL: ***defined***
🔧 Vite Config - VITE_SUPABASE_ANON_KEY: ***defined***
```

### ❌ Production build не работает:
- Ошибка "supabaseKey is required"
- Переменные окружения не загружаются в Vercel

## 🛠️ Решение: Настройка переменных в Vercel

### Шаг 1: Перейти в настройки проекта Vercel
1. Откройте [Vercel Dashboard](https://vercel.com/dashboard)
2. Найдите проект `weshow-nextgen-platform`
3. Нажмите на проект для входа в настройки

### Шаг 2: Открыть настройки Environment Variables
1. В боковом меню выберите **"Settings"**
2. Выберите **"Environment Variables"**
3. Нажмите **"Add New"**

### Шаг 3: Добавить переменные окружения

#### Переменная 1: VITE_SUPABASE_URL
- **Name**: `VITE_SUPABASE_URL`
- **Value**: `https://zbykhdjqrtqftfitbvbt.supabase.co`
- **Environment**: Выберите все (Production, Preview, Development)

#### Переменная 2: VITE_SUPABASE_ANON_KEY
- **Name**: `VITE_SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE`
- **Environment**: Выберите все (Production, Preview, Development)

### Шаг 4: Сохранить и переразвернуть
1. Нажмите **"Save"** для каждой переменной
2. Перейдите в **"Deployments"**
3. Найдите последний деплой и нажмите **"Redeploy"**

## 🔍 Проверка результата

### После настройки переменных:
1. Подождите завершения переразвертывания
2. Откройте [https://www.weshow.su/admin](https://www.weshow.su/admin)
3. Откройте консоль браузера (F12)
4. Должны появиться сообщения:
   ```
   ✅ Supabase credentials найдены
   Supabase URL: https://zbykhdjqrtqftfitbvbt.supabase.co
   Supabase Key defined: true
   ```

### Если ошибка все еще есть:
1. Проверьте, что переменные добавлены правильно
2. Убедитесь, что выбраны все окружения (Production, Preview, Development)
3. Проверьте, что нет лишних пробелов в значениях
4. Переразверните проект заново

## 📊 Техническая информация

### Переменные окружения Vite:
- `VITE_SUPABASE_URL` - URL Supabase проекта
- `VITE_SUPABASE_ANON_KEY` - Публичный ключ Supabase

### Важные моменты:
- Переменные должны начинаться с `VITE_` для работы с Vite
- Публичный ключ безопасен для использования в браузере
- После добавления переменных необходимо переразвернуть проект

## 🚀 Альтернативное решение

Если настройка переменных в Vercel не работает, можно использовать статические значения в коде (уже реализовано как fallback):

```typescript
const SUPABASE_CONFIG = {
  url: 'https://zbykhdjqrtqftfitbvbt.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};
```

Но рекомендуется использовать переменные окружения для безопасности и гибкости.

---

**Дата создания**: 2024-01-20  
**Статус**: 🔧 Требуется настройка в Vercel  
**Приоритет**: Высокий
