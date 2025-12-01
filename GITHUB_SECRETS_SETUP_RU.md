# 🔐 Настройка секретов GitHub для деплоя Vercel

## 📋 Что нужно сделать

Добавить 3 секрета в GitHub репозиторий для работы GitHub Actions деплоя.

## 🚀 Пошаговая инструкция

### Шаг 1: Получение VERCEL_TOKEN

1. Откройте https://vercel.com/account/tokens
   - Если сайт не открывается - используйте VPN
2. Нажмите **"Create Token"**
3. Введите название: `GitHub Actions Deploy`
4. Выберите срок действия (рекомендуется: **90 дней** или **No expiration**)
5. Нажмите **"Create"**
6. **Скопируйте токен** (он показывается только один раз!)
   - Формат: `vercel_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Шаг 2: Получение VERCEL_ORG_ID и VERCEL_PROJECT_ID

У вас уже есть эти данные в `.vercel/project.json`:

```json
{
  "projectId": "prj_zis18LAhgsi289OeN8IErlN5LRSm",
  "orgId": "team_uPkbNyzAyFVsnn6jbifmbeq6",
  "projectName": "weshow-nextgen-platform"
}
```

- **VERCEL_ORG_ID** = `team_uPkbNyzAyFVsnn6jbifmbeq6`
- **VERCEL_PROJECT_ID** = `prj_zis18LAhgsi289OeN8IErlN5LRSm`

### Шаг 3: Добавление секретов в GitHub

1. Откройте: https://github.com/slider460/weshow-nextgen-platform/settings/secrets/actions
   - Или: Репозиторий → **Settings** → **Secrets and variables** → **Actions**

2. Нажмите **"New repository secret"**

3. Добавьте каждый секрет:

   **Секрет 1:**
   - Name: `VERCEL_TOKEN`
   - Secret: `ваш_токен_из_шага_1`
   - Нажмите **"Add secret"**

   **Секрет 2:**
   - Name: `VERCEL_ORG_ID`
   - Secret: `team_uPkbNyzAyFVsnn6jbifmbeq6`
   - Нажмите **"Add secret"**

   **Секрет 3:**
   - Name: `VERCEL_PROJECT_ID`
   - Secret: `prj_zis18LAhgsi289OeN8IErlN5LRSm`
   - Нажмите **"Add secret"**

### Шаг 4: Проверка

1. Перейдите в **Actions** вкладку репозитория
2. Должен появиться workflow **"🚀 Deploy to Vercel"**
3. После следующего `git push` в `main` ветку автоматически запустится деплой

## ✅ Готово!

После настройки:
- ✅ Каждый `git push origin main` → автоматический деплой
- ✅ Деплой происходит на серверах GitHub (вне России)
- ✅ Не зависит от вашего интернет-соединения
- ✅ Работает даже при блокировках Vercel в России

## 🔍 Проверка работы

1. Сделайте любой коммит и пуш:
   ```bash
   git add .
   git commit -m "test: проверка автодеплоя"
   git push origin main
   ```

2. Откройте: https://github.com/slider460/weshow-nextgen-platform/actions
3. Должен запуститься workflow **"🚀 Deploy to Vercel"**
4. Через 2-5 минут сайт обновится на https://www.weshow.su

## ❌ Если что-то не работает

1. **Проверьте секреты:**
   - Убедитесь, что все 3 секрета добавлены
   - Проверьте правильность значений

2. **Проверьте токен:**
   - Убедитесь, что токен не истек
   - Создайте новый токен, если нужно

3. **Проверьте логи:**
   - Откройте запущенный workflow
   - Проверьте логи на наличие ошибок

4. **Ручной запуск:**
   - В Actions нажмите **"🚀 Deploy to Vercel"**
   - Нажмите **"Run workflow"** → **"Run workflow"**

