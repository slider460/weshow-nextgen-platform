# Настройка Production Branch в Vercel

## 📍 Где найти настройки Production Branch

В новых версиях Vercel настройки Production Branch находятся в разделе **Environments**, а не в Git.

### Пошаговая инструкция:

1. **Откройте Vercel Dashboard**: https://vercel.com/dashboard
2. **Выберите проект**: `weshow-nextgen-platform`
3. **Перейдите в Settings** (в левом меню)
4. **Выберите "Environments"** (Окружения)
5. **Нажмите на "Production"** (Продакшн)

В этом разделе вы найдете:

### Настройки Production:

- **Branch Tracking**: 
  - Здесь указывается, какая ветка Git используется для продакшн-деплоев
  - По умолчанию: `main`
  - Убедитесь, что выбрана ветка `main`

- **Auto-assign Custom Production Domains**: 
  - Автоматическое назначение пользовательских доменов после деплоя
  - Рекомендуется включить

## 🔄 Автоматический деплой

Если Git репозиторий подключен (что у вас уже сделано), то:

- ✅ **Push в `main`** → автоматически создается Production деплой
- ✅ **Pull Request** → автоматически создается Preview деплой
- ✅ **Merge в `main`** → автоматически создается Production деплой

## ✅ Текущий статус

- ✅ Git Repository подключен: `slider460/weshow-nextgen-platform`
- ✅ Production URL: `https://www.weshow.su`
- ⚠️ Нужно проверить: Settings → Environments → Production → Branch Tracking = `main`

## 🧪 Проверка работы

После настройки сделайте тестовый коммит:

```bash
git add .
git commit -m "test: проверка автодеплоя"
git push origin main
```

Через 1-2 минуты проверьте:
- Vercel Dashboard → Deployments (должен появиться новый деплой)
- Production URL (изменения должны отобразиться)

## 📝 Альтернативный способ через CLI

Если настройки не видны в Dashboard, можно проверить через CLI:

```bash
# Проверить текущие деплои
vercel ls

# Проверить настройки проекта
vercel project ls
```

Однако настройка Production Branch обычно доступна только через Dashboard.



