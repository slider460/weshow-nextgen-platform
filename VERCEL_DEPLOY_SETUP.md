# Настройка деплоя Vercel с нуля

## Текущее состояние
- Проект: `weshow-nextgen-platform`
- Production URL: `https://www.weshow.su`
- GitHub репозиторий: `https://github.com/slider460/weshow-nextgen-platform.git`
- Последний успешный деплой: 13 часов назад

## Шаги для настройки автодеплоя

### 1. Проверка GitHub интеграции в Vercel

1. Откройте https://vercel.com/dashboard
2. Выберите проект `weshow-nextgen-platform`
3. Перейдите в **Settings** → **Git**
4. Проверьте, что:
   - **Production Branch** установлен на `main`
   - **Auto-deploy** включен (галочка должна быть установлена)
   - Репозиторий подключен: `slider460/weshow-nextgen-platform`

### 2. Если репозиторий не подключен или нужно переподключить

1. В **Settings** → **Git** нажмите **Disconnect**
2. Затем нажмите **Connect Git Repository**
3. Выберите `slider460/weshow-nextgen-platform`
4. Убедитесь, что:
   - **Production Branch**: `main`
   - **Auto-deploy** включен
5. Сохраните изменения

### 3. Проверка настроек проекта

В **Settings** → **General** проверьте:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: 22.x (или 20.x)

### 4. Проверка переменных окружения

В **Settings** → **Environment Variables** убедитесь, что все необходимые переменные настроены для:
- Production
- Preview
- Development

### 5. Ручной деплой для проверки

После настройки:
1. Перейдите в **Deployments**
2. Нажмите **Redeploy** на последнем деплое
3. Или создайте новый коммит в `main` ветке - должен запуститься автоматический деплой

### 6. Проверка логов

Если деплой не работает:
1. Откройте последний деплой в **Deployments**
2. Проверьте **Build Logs** на наличие ошибок
3. Проверьте **Function Logs** если есть проблемы с runtime

## Альтернатива: Деплой через CLI

Если веб-интерфейс не работает, можно использовать CLI:

```bash
# Привязать проект (если еще не привязан)
vercel link

# Деплой в production
vercel --prod
```

## Решение проблем

### Проблема: Автодеплой не запускается
- Проверьте, что GitHub App установлен в репозитории
- Проверьте настройки в GitHub: Settings → Integrations → Vercel
- Убедитесь, что webhook активен

### Проблема: Деплой падает с ошибкой
- Проверьте Build Logs
- Убедитесь, что все зависимости установлены
- Проверьте Node.js версию

### Проблема: Изменения не появляются на сайте
- Очистите кеш браузера (Ctrl+Shift+R или Cmd+Shift+R)
- Проверьте, что деплой завершился успешно
- Убедитесь, что Production Branch настроен правильно

