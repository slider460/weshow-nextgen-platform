# 🔧 Решение: Переподключение интеграции GitHub ↔ Vercel

## Проблема подтверждена ❌
- ✅ Коммит `b1362209` отправлен в GitHub
- ❌ Новый деплой не появился в Vercel (последние деплои от 2 дней назад)
- ❌ Webhook между GitHub и Vercel не работает

## Решение: Полное переподключение

### Шаг 1: Отключить интеграцию в Vercel
1. Откройте Vercel Dashboard
2. Перейдите в **Settings** → **Git**
3. Нажмите кнопку **"Disconnect"**
4. Подтвердите отключение

### Шаг 2: Удалить старый webhook в GitHub (опционально, но рекомендуется)
1. Откройте: https://github.com/slider460/weshow-nextgen-platform/settings/hooks
2. Найдите webhook для Vercel (URL: `https://api.vercel.com/...`)
3. Удалите его, если он есть

### Шаг 3: Подключить заново в Vercel
1. В Vercel Dashboard → **Settings** → **Git**
2. Нажмите **"Connect Git Repository"**
3. Выберите **GitHub**
4. Авторизуйтесь через GitHub (если потребуется)
5. Выберите репозиторий: `slider460/weshow-nextgen-platform`
6. Настройте:
   - **Production Branch**: `main`
   - **Auto Deploy**: включен
7. Подтвердите подключение

### Шаг 4: Проверка работы webhook
После подключения создайте тестовый коммит:
```bash
git commit --allow-empty -m "test: verify webhook after reconnection"
git push origin main
```

**Ожидаемый результат:**
- Через 10-30 секунд в Vercel Deployments появится новый деплой
- Статус будет "Building..." затем "Ready"

## Если webhook все еще не работает

1. Проверьте GitHub webhooks:
   - https://github.com/slider460/weshow-nextgen-platform/settings/hooks
   - Должен быть webhook с URL `https://api.vercel.com/v1/integrations/github-webhook`
   - Проверьте Recent Deliveries - не должно быть ошибок

2. Проверьте GitHub permissions:
   - https://github.com/settings/applications
   - Найдите "Vercel" в Authorized OAuth Apps
   - Убедитесь, что есть доступ к репозиторию

3. Проверьте Vercel Integration:
   - В Vercel Dashboard → Settings → Git
   - Status должен быть "Connected"
   - Repository должен быть `slider460/weshow-nextgen-platform`

