# 🔧 Решение: Webhook не создался автоматически

## Проблема
После переподключения интеграции webhook все еще не появился в GitHub.

## Возможные причины:
1. Использовался **OAuth App** вместо **GitHub App**
2. **GitHub App** не установлен для этого репозитория
3. Недостаточно permissions

## Решение 1: Проверить GitHub App установку

1. Откройте: https://github.com/settings/installations
2. Найдите **"Vercel"** в списке установленных GitHub Apps
3. **Если его нет:**
   - При переподключении должен быть выбор между OAuth и GitHub App
   - Выберите **"GitHub App"** (не OAuth)
   - Установите его для репозитория

## Решение 2: Создать webhook вручную (временное решение)

Если GitHub App недоступен, можно создать webhook вручную:

1. Откройте: https://github.com/slider460/weshow-nextgen-platform/settings/hooks
2. Нажмите **"Add webhook"**
3. Заполните:
   - **Payload URL:** `https://api.vercel.com/v1/integrations/github-webhook`
   - **Content type:** `application/json`
   - **Secret:** (оставьте пустым или используйте секрет из Vercel, если есть)
   - **Events:** Выберите:
     - ✅ Push
     - ✅ Pull request
   - **Active:** ✅ включен
4. Нажмите **"Add webhook"**

⚠️ **Внимание:** Ручное создание webhook может конфликтовать с Vercel управлением. Лучше использовать GitHub App.

## Решение 3: Проверить Vercel Integration метод

В Vercel Dashboard → Settings → Git:
- Проверьте, какой метод подключения использовался
- Если OAuth - попробуйте переключиться на GitHub App

## Проверка после исправления

1. Создайте тестовый коммит:
   ```bash
   git commit --allow-empty -m "test: verify webhook"
   git push origin main
   ```

2. Проверьте:
   - GitHub → Settings → Webhooks → Recent Deliveries (должны быть успешные запросы)
   - Vercel → Deployments (должен появиться новый деплой)

