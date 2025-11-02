# 🔍 Диагностика: Почему Vercel не видит новые коммиты

## Проблема
После переподключения репозитория Vercel все еще не видит новые коммиты из GitHub.
- ✅ Коммиты есть на GitHub (996bd866, e5932caa, и др.)
- ✅ Репозиторий подключен в Vercel
- ❌ Новые деплои не запускаются автоматически

## 🔍 Проверка 1: GitHub Webhooks

**Проверьте настройки webhook на GitHub:**

1. Откройте: https://github.com/slider460/weshow-nextgen-platform/settings/hooks
2. Найдите webhook для Vercel (должен быть URL вида `https://api.vercel.com/v1/integrations/github-webhook`)
3. **Что проверить:**
   - ✅ Webhook существует и активен
   - ✅ URL правильный
   - ✅ Events: включены "Push" и "Pull request"
   - ✅ Последние delivery (попытки отправки) - есть ли ошибки?

## 🔍 Проверка 2: Vercel Integration

**Проверьте настройки в Vercel:**

1. Откройте Vercel Dashboard → Settings → Git
2. **Что проверить:**
   - ✅ Репозиторий: `slider460/weshow-nextgen-platform`
   - ✅ Status: "Connected" (недавно, 12 минут назад)
   - ✅ Production Branch: `main`

## 🔍 Проверка 3: Permissions в GitHub

**Проверьте разрешения Vercel в GitHub:**

1. Откройте: https://github.com/settings/applications
2. Найдите "Vercel" в списке Authorized OAuth Apps
3. **Что проверить:**
   - ✅ Vercel имеет доступ к репозиторию
   - ✅ Разрешения: Repository access (должен быть доступ к `weshow-nextgen-platform`)

## 🔍 Проверка 4: Триггер деплоя вручную

**Попробуйте создать новый коммит для теста:**

```bash
# Создайте тестовый коммит
git commit --allow-empty -m "test: trigger Vercel deployment after reconnection"
git push origin main
```

**После push:**
- Проверьте GitHub webhooks → Recent Deliveries
- Проверьте Vercel Deployments → должен появиться новый деплой

## 🛠️ Решение: Переподключить Integration

Если webhook не работает, переподключите интеграцию:

1. В Vercel Dashboard → Settings → Git
2. Нажмите "Disconnect"
3. Подождите 30 секунд
4. Нажмите "Connect Git Repository"
5. Выберите `slider460/weshow-nextgen-platform`
6. Выберите Production Branch: `main`
7. Подтвердите подключение

## 📋 Возможные причины проблемы

1. **Webhook был удален** при переподключении
2. **GitHub permissions** не обновились
3. **Vercel integration** не полностью переподключена
4. **Старые коммиты** не триггерят деплой (только новые push'и)

## ✅ Следующие шаги

1. Проверьте GitHub webhooks → найдите ошибки в Recent Deliveries
2. Если webhook работает - создайте новый тестовый коммит
3. Если webhook не работает - переподключите integration в Vercel

