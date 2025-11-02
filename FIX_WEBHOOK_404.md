# 🔧 Исправление: Webhook 404 Error

## Проблема
Webhook срабатывает, но Vercel отвечает **404 Not Found**. Это значит, что URL webhook неверный.

## Причина
При ручном создании был использован стандартный URL `https://api.vercel.com/v1/integrations/github-webhook`, но Vercel генерирует **уникальный URL** для каждой интеграции при автоматическом подключении.

## Решение: Правильное переподключение через Vercel

### Вариант 1: Полное переподключение (рекомендуется)

1. **В Vercel Dashboard → Settings → Git:**
   - Нажмите **"Disconnect"**
   - Подождите 10 секунд

2. **Подключите заново:**
   - Нажмите **"Connect Git Repository"**
   - Выберите **GitHub**
   - **ВАЖНО:** Если есть выбор, используйте **GitHub App** (не OAuth)
   - Авторизуйтесь
   - Выберите репозиторий `slider460/weshow-nextgen-platform`
   - Production Branch: `main`
   - Подтвердите

3. **Проверьте автоматическое создание webhook:**
   - После подключения Vercel должен **автоматически создать** webhook в GitHub
   - Проверьте: https://github.com/slider460/weshow-nextgen-platform/settings/hooks
   - Webhook должен появиться автоматически с правильным URL

4. **Удалите старый webhook:**
   - Если старый webhook (с ошибкой 404) все еще есть, удалите его
   - Оставьте только тот, который создал Vercel автоматически

### Вариант 2: Проверить правильный URL через Vercel API

Если переподключение не помогло, можно попробовать найти правильный URL через Vercel Dashboard или CLI.

## Проверка после исправления

1. **Создайте тестовый коммит:**
   ```bash
   git commit --allow-empty -m "test: verify correct webhook"
   git push origin main
   ```

2. **Проверьте:**
   - GitHub → Settings → Webhooks → Recent Deliveries → статус должен быть **200 OK**
   - Vercel → Deployments → должен появиться новый деплой

## Важно

⚠️ **Не создавайте webhook вручную!** Vercel должен создавать его автоматически при подключении репозитория. Ручное создание приводит к неверному URL.

