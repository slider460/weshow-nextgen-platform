# 🔍 Диагностика: Webhook все еще не работает

## Проблема
После переподключения интеграции webhook все еще не работает:
- ✅ Коммит `7073c908` отправлен в GitHub
- ❌ Новый деплой не появился в Vercel

## Шаг 1: Проверить webhook в GitHub

1. Откройте: https://github.com/slider460/weshow-nextgen-platform/settings/hooks
2. Найдите webhook для Vercel (URL: `https://api.vercel.com/v1/integrations/github-webhook`)
3. **Что проверить:**
   - ✅ Есть ли webhook вообще?
   - ✅ Активен ли он (зеленая галочка)?
   - ✅ Нажав на webhook, проверьте "Recent Deliveries"
   - ❌ Есть ли delivery для коммита `7073c908`?
   - ❌ Какой статус у delivery (200 OK или ошибка)?

## Шаг 2: Проверить GitHub Permissions

1. Откройте: https://github.com/settings/applications
2. Найдите "Vercel" в списке "Authorized OAuth Apps"
3. **Что проверить:**
   - ✅ Есть ли Vercel в списке?
   - ✅ Какие permissions (должен быть доступ к репозиторию)?
   - ✅ Можно ли нажать "Revoke" и переавторизоваться?

## Шаг 3: Проверить Vercel Integration

1. В Vercel Dashboard → Settings → Git
2. **Что проверить:**
   - ✅ Status: "Connected" (недавно, после переподключения)
   - ✅ Repository: `slider460/weshow-nextgen-platform`
   - ✅ Production Branch: `main`
   - ✅ Auto Deploy: включен

## Шаг 4: Альтернативное решение - Deploy Hook

Если webhook не работает, можно использовать Deploy Hook:

1. В Vercel Dashboard → Settings → Git → Deploy Hooks
2. Создайте новый Deploy Hook:
   - Name: "Manual Deploy"
   - Branch: `main`
3. Используйте webhook URL для ручного триггера через curl:
   ```bash
   curl -X POST YOUR_DEPLOY_HOOK_URL
   ```

## Шаг 5: Полное переподключение через GitHub Apps

Если OAuth не работает, попробуйте GitHub App:

1. В Vercel Dashboard → Settings → Git → Disconnect
2. Нажмите "Connect Git Repository"
3. Вместо OAuth выберите "GitHub App" (если доступно)
4. Установите GitHub App для вашего репозитория

## Возможные причины

1. **Webhook не создался** - переподключение не завершилось полностью
2. **GitHub Permissions** - Vercel не имеет доступа к репозиторию
3. **Ошибки в webhook delivery** - проверьте Recent Deliveries
4. **Кэш Vercel** - иногда нужно подождать несколько минут

## Быстрая проверка

Выполните в терминале для проверки последнего коммита:
```bash
git log origin/main --oneline -1
# Должен показать: 7073c908 test: verify webhook after reconnection
```

Если коммит есть на GitHub, но webhook не сработал - проблема точно в webhook'е.

