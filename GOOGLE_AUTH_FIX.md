# 🔧 Исправление Google авторизации - "Доступ запрещен"

## ❌ **Проблема:**
После подтверждения регистрации через Google показывается страница "Доступ запрещен" с текстом "Необходимо войти в систему".

## 🔍 **Причина:**
При Google авторизации пользователь создается в Supabase Auth, но не создается профиль в таблице `user_profiles`, поэтому система считает пользователя неавторизованным.

## ✅ **Решение:**

### 1. **Автоматическое создание профиля для Google пользователей:**
```typescript
// Если профиль не найден (например, при Google авторизации), создаем его
if (!userProfile) {
  console.log('Profile not found, creating new profile for Google user');
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        id: session.user.id,
        full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'Пользователь',
        company_name: session.user.user_metadata?.company_name || 'Не указано',
        phone_number: session.user.user_metadata?.phone_number || null,
        role: 'client'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error);
    } else {
      userProfile = data as UserProfile;
      console.log('Profile created successfully:', userProfile);
    }
  } catch (error) {
    console.error('Error creating profile:', error);
  }
}
```

### 2. **Создана страница AccessDenied:**
- ✅ Красивая страница с иконкой ошибки
- ✅ Кнопки "На главную" и "Войти в систему"
- ✅ Информативное сообщение об ошибке

### 3. **Обновлена страница Profile:**
- ✅ Проверка состояния загрузки
- ✅ Проверка авторизации пользователя
- ✅ Показ AccessDenied если пользователь не авторизован

### 4. **Добавлен маршрут /access-denied:**
- ✅ Доступен по адресу http://localhost:8087/access-denied
- ✅ Интегрирован в роутинг приложения

## 🎯 **Логика работы:**

### **При Google авторизации:**
1. **Пользователь авторизуется через Google** → создается в Supabase Auth
2. **Система проверяет профиль** → не находит в `user_profiles`
3. **Автоматически создается профиль** → с данными из Google
4. **Пользователь получает доступ** → к личному кабинету

### **Данные профиля из Google:**
- **full_name** → из `user_metadata.full_name` или email
- **company_name** → из `user_metadata.company_name` или "Не указано"
- **phone_number** → из `user_metadata.phone_number` или null
- **role** → всегда "client"

## 🚀 **Результат:**

**Google авторизация теперь работает корректно!**

- ✅ **Автоматическое создание профиля** - для Google пользователей
- ✅ **Корректная обработка ошибок** - красивая страница AccessDenied
- ✅ **Плавная авторизация** - без "Доступ запрещен"
- ✅ **Полный доступ к личному кабинету** - после Google входа

## 📱 **Тестирование:**

1. **Откройте http://localhost:8087/**
2. **Нажмите "Войти" → "Войти через Google"**
3. **Авторизуйтесь через Google**
4. **Должен открыться личный кабинет** без ошибок

---

**🎉 Google авторизация исправлена!**

**Пользователи теперь могут входить через Google без проблем!** ✅
