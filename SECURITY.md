# 🔒 Безопасность проекта WESHOW

## ⚠️ Критичные правила безопасности

### 1. **НИКОГДА не коммитьте файл `.env` в git!**
Файл `.env` содержит секретные ключи и должен быть в `.gitignore`.

### 2. **SERVICE_ROLE KEY - только для backend!**
- ❌ **НЕ ИСПОЛЬЗУЙТЕ** `VITE_SUPABASE_SERVICE_KEY` в клиентском коде
- ✅ Используйте его **ТОЛЬКО** в серверных функциях (Edge Functions, API Routes)
- 🔐 Service Role обходит все RLS политики и имеет полный доступ к БД

### 3. **ANON_KEY - безопасен для клиента**
- ✅ `VITE_SUPABASE_ANON_KEY` можно использовать в клиентском коде
- ⚠️ Убедитесь что RLS (Row Level Security) политики настроены правильно
- 🔒 Anon key работает только с таблицами, защищенными RLS

---

## 📋 Настройка окружения

### Для локальной разработки:

1. Скопируйте `.env.example` в `.env`:
```bash
cp .env.example .env
```

2. Заполните реальными значениями из Supabase Dashboard:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. Убедитесь что `.env` в `.gitignore`:
```bash
git check-ignore .env  # Должно вернуть .env
```

### Для production:

1. **НЕ** включайте `VITE_SUPABASE_SERVICE_KEY` в production build
2. Используйте переменные окружения на платформе хостинга (Vercel, Netlify и т.д.)
3. Настройте только:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

---

## 🛡️ Меры безопасности в проекте

### ✅ Реализовано:

1. **XSS Protection**
   - React автоматически экранирует пользовательский ввод
   - Все формы защищены от XSS атак

2. **SQL Injection Protection**
   - Используется Supabase REST API с параметризованными запросами
   - Прямого SQL не выполняется на клиенте

3. **CORS Protection**
   - Supabase настроен на разрешенные origin
   - Запросы с других доменов блокируются

4. **HTTPS Headers** (от Supabase):
   - `Strict-Transport-Security`
   - `X-Content-Type-Options: nosniff`
   - HttpOnly, Secure cookies

5. **Row Level Security (RLS)**
   - Все таблицы защищены RLS политиками
   - Доступ ограничен по ролям пользователей

---

## 🔍 Регулярный аудит безопасности

### Что проверять:

1. **Exposed Keys**
   ```bash
   # Проверка на hardcoded secrets
   grep -r "eyJ" src/ --exclude-dir=node_modules
   ```

2. **Git History**
   ```bash
   # Проверка что .env не в истории
   git log --all --full-history -- .env
   ```

3. **Dependencies**
   ```bash
   # Проверка уязвимостей в зависимостях
   npm audit
   ```

---

## 🚨 Что делать при утечке ключей

### Если service_role key скомпрометирован:

1. **НЕМЕДЛЕННО** сбросьте ключ в Supabase Dashboard:
   - Settings → API → Service role key → Reset

2. Обновите `.env` файл с новым ключом

3. Проверьте логи Supabase на подозрительную активность

4. Рассмотрите возможность ротации всех ключей

### Если anon key скомпрометирован:

1. Проверьте RLS политики на всех таблицах
2. Убедитесь что нет открытых данных
3. Рассмотрите ротацию ключа
4. Добавьте rate limiting

---

## 📞 Контакты по безопасности

При обнаружении уязвимостей:
- Email: security@weshow.ru
- Не публикуйте уязвимости публично
- Дайте нам время на исправление

---

## 📚 Дополнительные ресурсы

- [Supabase Security Best Practices](https://supabase.com/docs/guides/platform/going-into-prod#security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)

---

**Последнее обновление:** 10 октября 2025  
**Аудит проведен:** MCP Chrome DevTools Security Audit

