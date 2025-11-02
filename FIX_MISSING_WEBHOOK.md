# 🔧 Решение: Webhook не создался при переподключении

## Проблема найдена ✅
- ❌ В GitHub → Settings → Webhooks **нет ни одного webhook'а**
- Это объясняет, почему Vercel не видит новые коммиты

## Решение: Правильное переподключение интеграции

### Вариант 1: Переподключить через Vercel (рекомендуется)

1. **В Vercel Dashboard:**
   - Settings → Git
   - Нажмите **"Disconnect"**
   - Подождите 10 секунд

2. **Подключите заново:**
   - Нажмите **"Connect Git Repository"**
   - Выберите **GitHub**
   - **ВАЖНО:** Выберите метод подключения:
     - Если есть выбор между **"OAuth App"** и **"GitHub App"** — выберите **"GitHub App"**
     - GitHub App имеет больше разрешений и лучше создает webhooks
   - Авторизуйтесь через GitHub
   - Выберите репозиторий: `slider460/weshow-nextgen-platform`
   - Production Branch: `main`
   - Подтвердите

3. **Проверьте webhook:**
   - Откройте: https://github.com/slider460/weshow-nextgen-platform/settings/hooks
   - Должен появиться webhook с URL: `https://api.vercel.com/v1/integrations/github-webhook`
   - Статус должен быть зеленым (активен)

### Вариант 2: Если GitHub App недоступен

Если доступен только OAuth App:

1. Проверьте GitHub permissions:
   - https://github.com/settings/applications
   - Найдите "Vercel" в OAuth Apps
   - Убедитесь, что есть доступ к репозиторию
   - Если нет — нажмите "Grant" или "Configure"

2. После переподключения проверьте webhook снова

### Проверка после переподключения

1. **Создайте тестовый коммит:**
   ```bash
   git commit --allow-empty -m "test: verify webhook creation"
   git push origin main
   ```

2. **Проверьте:**
   - GitHub → Settings → Webhooks → должен быть webhook для Vercel
   - Vercel Dashboard → Deployments → должен появиться новый деплой через 10-30 секунд

## Если webhook все еще не создается

Возможные причины:
1. **GitHub App не установлен** — нужно установить Vercel GitHub App
2. **Недостаточно permissions** — проверьте права доступа
3. **Кэш** — подождите 1-2 минуты после переподключения

## Альтернатива: Проверьте GitHub App установку

1. Откройте: https://github.com/settings/installations
2. Найдите "Vercel" в списке GitHub Apps
3. Если его нет — нужно установить через Vercel при подключении репозитория

