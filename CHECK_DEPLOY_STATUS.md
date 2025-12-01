# 🔍 Проверка статуса деплоя

## ✅ Что уже сделано:

1. ✅ Секреты настроены в GitHub (вчера)
2. ✅ GitHub Actions workflow создан (`.github/workflows/deploy.yml`)
3. ✅ Workflow настроен на автоматический запуск при push в `main`
4. ✅ Последний коммит запушен: `c6157632`

## 🔍 Как проверить, запустился ли workflow:

1. **Откройте GitHub Actions:**
   - https://github.com/slider460/weshow-nextgen-platform/actions

2. **Проверьте последний запуск:**
   - Должен быть workflow **"🚀 Deploy to Vercel"**
   - Статус должен быть: ✅ Success или ⏳ In progress

3. **Если workflow не запустился:**
   - Нажмите на **"🚀 Deploy to Vercel"**
   - Нажмите **"Run workflow"** → **"Run workflow"** (ручной запуск)

## 🚀 Ручной запуск workflow:

1. Перейдите: https://github.com/slider460/weshow-nextgen-platform/actions/workflows/deploy.yml
2. Нажмите **"Run workflow"**
3. Выберите ветку: `main`
4. Нажмите **"Run workflow"**

## 📊 Проверка результата:

После успешного деплоя:
- ✅ Workflow покажет статус "Success"
- ✅ В Vercel Dashboard появится новый деплой
- ✅ Сайт обновится на https://www.weshow.su

## ❌ Если workflow падает с ошибкой:

1. **Проверьте логи:**
   - Откройте упавший workflow
   - Проверьте, на каком шаге ошибка

2. **Проверьте секреты:**
   - Settings → Secrets and variables → Actions
   - Убедитесь, что все 3 секрета на месте:
     - `VERCEL_TOKEN`
     - `VERCEL_ORG_ID`
     - `VERCEL_PROJECT_ID`

3. **Проверьте токен:**
   - Убедитесь, что токен не истек
   - Если истек - создайте новый на https://vercel.com/account/tokens

