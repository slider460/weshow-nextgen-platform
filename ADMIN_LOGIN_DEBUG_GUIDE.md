# 🔧 Руководство по диагностике проблем входа в админ-панель

## Проблема
После нажатия кнопки "Войти в админ-панель" кнопка показывает "Вход...", но ничего не происходит - страница зависает.

## Что было исправлено

### 1. Критическая ошибка в AuthContext
**Проблема:** Слушатель событий `onAuthStateChange` находился после оператора `return` и никогда не выполнялся.

**Исправление:** Переместили код подписки на события перед `return` в useEffect.

### 2. Несоответствие типов
**Проблема:** Типы в `auth.ts` указывали, что функции возвращают `Promise<void>`, но на самом деле они возвращали данные.

**Исправление:** Изменили типы на `Promise<any>` для гибкости.

### 3. Улучшенная обработка ошибок
Добавили подробное логирование во всех критических местах:
- 🔐 Попытка входа
- ✅ Успешный ответ от Supabase
- 👤 Загрузка профиля
- ✅ Завершение входа или ❌ ошибка

## Шаги для диагностики

### Шаг 1: Проверьте консоль браузера

1. Откройте страницу входа: http://localhost:8082/admin/login
2. Откройте консоль разработчика (F12)
3. Попробуйте войти с данными:
   - **Email:** admin@weshow.ru
   - **Пароль:** password

4. В консоли вы должны увидеть логи:
   ```
   🚀 Form submitted, attempting login...
   🔐 Login attempt for: admin@weshow.ru
   ✅ Login successful, data: {...}
   👤 User profile: {...}
   ✅ Login complete, redirecting...
   📊 Login result: true
   ✅ Login successful, navigating to /admin/
   🏁 Login process finished
   ```

### Шаг 2: Если видите ошибки

#### Ошибка: "Invalid login credentials"
Пользователь не существует или пароль неверный.

**Решение:** Запустите SQL-скрипт для проверки:
```sql
-- Откройте check_admin_login.sql в Supabase SQL Editor
```

#### Ошибка: "❌ Profile not found for user"
Пользователь существует в auth.users, но нет профиля в user_profiles.

**Решение:** Создайте профиль вручную:
```sql
INSERT INTO user_profiles (id, full_name, company_name, role)
SELECT 
  id,
  'Admin User',
  'WeShow',
  'admin'
FROM auth.users 
WHERE email = 'admin@weshow.ru'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

#### Ошибка сети или CORS
Проблема с подключением к Supabase.

**Решение:** 
1. Проверьте, что Supabase URL и ключ корректны в `src/config/supabase.ts`
2. Проверьте настройки CORS в Supabase Dashboard

### Шаг 3: Тестовая страница

Откройте файл `test-admin-login.html` в браузере:

1. Введите данные Supabase:
   - URL: `https://zbykhdjqrtqftfitbvbt.supabase.co`
   - Anon Key: (из `src/config/supabase.ts`)

2. Введите данные для входа:
   - Email: `admin@weshow.ru`
   - Пароль: `password`

3. Нажмите "Проверить вход"

4. Если вход успешен, нажмите "Проверить профиль"

Это покажет точное место, где возникает проблема.

### Шаг 4: Проверка в базе данных

Запустите в Supabase SQL Editor:

```sql
-- Проверка пользователя
SELECT 
  au.id,
  au.email,
  au.email_confirmed_at,
  up.full_name,
  up.role
FROM auth.users au
LEFT JOIN user_profiles up ON au.id = up.id
WHERE au.email = 'admin@weshow.ru';
```

**Ожидаемый результат:**
- Email должен быть подтвержден (email_confirmed_at не NULL)
- Профиль должен существовать
- Роль должна быть 'admin' или 'manager'

## Создание админа с нуля

Если пользователь не существует, создайте его:

```sql
-- 1. Создайте пользователя через Supabase Dashboard:
-- Authentication -> Users -> Add user
-- Email: admin@weshow.ru
-- Password: password
-- Auto confirm: YES

-- 2. Затем создайте профиль:
INSERT INTO user_profiles (id, full_name, company_name, role)
SELECT 
  id,
  'Администратор',
  'WeShow',
  'admin'
FROM auth.users 
WHERE email = 'admin@weshow.ru';
```

## Быстрая проверка работы

После всех изменений:

1. Перезагрузите страницу (Ctrl+Shift+R для hard reload)
2. Откройте консоль (F12)
3. Попробуйте войти
4. Следите за логами в консоли
5. Если вход успешен, вас перенаправит на `/admin/`

## Дополнительная информация

### Измененные файлы:
- ✅ `src/contexts/AuthContext.tsx` - исправлена подписка на события
- ✅ `src/types/auth.ts` - исправлены типы
- ✅ `src/pages/admin/AdminLogin.tsx` - улучшена обработка ошибок

### Созданные файлы для диагностики:
- 📄 `check_admin_login.sql` - SQL-скрипт для проверки
- 📄 `test-admin-login.html` - тестовая страница
- 📄 `ADMIN_LOGIN_DEBUG_GUIDE.md` - это руководство

## Если ничего не помогло

Напишите в консоли точный текст ошибки, который вы видите. Это поможет точно определить проблему.

