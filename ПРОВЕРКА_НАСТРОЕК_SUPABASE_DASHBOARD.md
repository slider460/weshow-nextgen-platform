# 🔍 ПРОВЕРКА НАСТРОЕК SUPABASE DASHBOARD

## ⚡ СРОЧНО: Проверьте эти настройки в Supabase Dashboard

### 1. **Проверьте статус проекта**
- Откройте: https://supabase.com/dashboard/project/zbykhdjqrtqftfitbvbt
- Убедитесь что проект **АКТИВЕН** (не приостановлен)
- Проверьте лимиты использования

### 2. **Проверьте API настройки**
- Перейдите в **Settings** → **API**
- Проверьте:
  - **Project URL:** `https://zbykhdjqrtqftfitbvbt.supabase.co`
  - **anon public key:** Должен совпадать с кодом
  - **service_role secret:** Убедитесь что есть

### 3. **Проверьте Database настройки**
- Перейдите в **Database** → **Tables**
- Убедитесь что таблицы `logos` и `homepage_equipment` существуют
- Проверьте что в них есть данные

### 4. **Проверьте Authentication настройки**
- Перейдите в **Authentication** → **Settings**
- Проверьте:
  - **Site URL:** `http://localhost:8085`
  - **Redirect URLs:** Добавьте `http://localhost:8085/**`
  - **Enable email confirmations:** ВРЕМЕННО ОТКЛЮЧИТЕ

### 5. **Проверьте Row Level Security**
- Перейдите в **Authentication** → **Policies**
- Посмотрите на политики для таблиц
- Если политики есть - ВРЕМЕННО ОТКЛЮЧИТЕ их все

### 6. **Проверьте лимиты проекта**
- Перейдите в **Settings** → **Usage**
- Проверьте не превышены ли лимиты:
  - API requests
  - Database size
  - Bandwidth

## 🚨 ВОЗМОЖНЫЕ ПРОБЛЕМЫ:

### 1. **Проект приостановлен**
- Если проект приостановлен - активируйте его
- Проверьте биллинг

### 2. **Неправильные API ключи**
- Обновите API ключи в коде
- Проверьте что ключи не истекли

### 3. **Неправильные URL настройки**
- Site URL должен быть `http://localhost:8085`
- Redirect URLs должны включать `http://localhost:8085/**`

### 4. **RLS блокирует доступ**
- Временно отключите все RLS политики
- Или отключите RLS для всех таблиц

### 5. **Превышены лимиты**
- Если лимиты превышены - обновите план
- Или дождитесь сброса лимитов

## 🔧 БЫСТРЫЕ ИСПРАВЛЕНИЯ:

### 1. **Отключите RLS временно:**
```sql
ALTER TABLE logos DISABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_equipment DISABLE ROW LEVEL SECURITY;
```

### 2. **Обновите Site URL:**
- Settings → Authentication → Site URL
- Установите: `http://localhost:8085`

### 3. **Добавьте Redirect URLs:**
- Settings → Authentication → Redirect URLs
- Добавьте: `http://localhost:8085/**`

### 4. **Отключите email confirmations:**
- Settings → Authentication → Enable email confirmations
- Временно отключите

## 📋 ЧЕК-ЛИСТ ПРОВЕРКИ:

- [ ] Проект активен (не приостановлен)
- [ ] API ключи правильные и не истекли
- [ ] Site URL = `http://localhost:8085`
- [ ] Redirect URLs включают `http://localhost:8085/**`
- [ ] Email confirmations отключены
- [ ] RLS политики отключены
- [ ] Лимиты не превышены
- [ ] Таблицы существуют и содержат данные

---

*Проверка настроек создана: ${new Date().toLocaleString('ru-RU')}*  
*Статус: Критично для диагностики*
