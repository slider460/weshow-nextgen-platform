# Обновление секретов в GitHub

## Текущий статус

✅ **Токен в Vercel:**
- Название: `GitHub Actions Deploy`
- Создан: 13 минут назад
- Срок действия: Never expires
- Статус: Active

## Шаг 1: Получение токена из Vercel

1. Откройте: https://vercel.com/account/tokens
2. Найдите токен "GitHub Actions Deploy"
3. Нажмите на "..." (три точки) справа от токена
4. Выберите "View" или "Copy Token"
5. **Скопируйте токен** (если он показывается)

⚠️ **Важно:** Если токен не показывается (так как он был создан ранее), нужно создать новый токен.

## Шаг 2: Создание нового токена (если старый не виден)

1. В Vercel Dashboard → Tokens
2. Нажмите "Create Token"
3. Название: `GitHub Actions Deploy v2`
4. Scope: Full Account
5. Expiration: No expiration
6. Нажмите "Create"
7. **Скопируйте токен** (показывается только один раз!)

## Шаг 3: Обновление секретов в GitHub

### Обновление VERCEL_TOKEN:

1. Откройте: https://github.com/slider460/weshow-nextgen-platform/settings/secrets/actions
2. Найдите секрет `VERCEL_TOKEN`
3. Нажмите "Update" (или на сам секрет)
4. Вставьте новый токен из Vercel
5. Нажмите "Update secret"

### Проверка VERCEL_ORG_ID:

1. В том же разделе найдите `VERCEL_ORG_ID`
2. Проверьте значение:
   - ✅ Должно быть: `team_uPkbNyzAyFVsnn6jbifmbeq6`
   - ❌ Если другое - обновите

### Проверка VERCEL_PROJECT_ID:

1. В том же разделе найдите `VERCEL_PROJECT_ID`
2. Проверьте значение:
   - ✅ Должно быть: `prj_zis18LAhgsi289OeN8IErlN5LRSm`
   - ❌ Если другое - обновите

## Шаг 4: Проверка через тестовый workflow

После обновления секретов можно создать тестовый workflow для проверки:

```yaml
name: Test Secrets

on:
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Test Vercel Token
        run: |
          npm install -g vercel@latest
          vercel whoami --token=${{ secrets.VERCEL_TOKEN }}
          echo "✅ Token is valid!"
```

## Быстрая проверка значений

### Правильные значения (из .vercel/project.json):

- **VERCEL_ORG_ID**: `team_uPkbNyzAyFVsnn6jbifmbeq6`
- **VERCEL_PROJECT_ID**: `prj_zis18LAhgsi289OeN8IErlN5LRSm`
- **VERCEL_TOKEN**: токен "GitHub Actions Deploy" из Vercel Dashboard

## После обновления

1. Убедитесь, что все секреты обновлены
2. Запустите workflow снова (или сделайте новый push)
3. Проверьте логи GitHub Actions на наличие ошибок



