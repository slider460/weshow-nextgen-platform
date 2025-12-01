# 🔍 Диагностика: GitHub Actions падает при деплое

## Проблема
GitHub Actions workflow "🚀 Deploy to Vercel #161" запускается, но падает с ошибкой.

## Возможные причины:

### 1. Отсутствуют GitHub Secrets
Проверьте в GitHub:
- Settings → Secrets and variables → Actions
- Должны быть:
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID` 
  - `VERCEL_PROJECT_ID`

### 2. Неверные значения Secrets
Если secrets есть, проверьте их значения:
- `VERCEL_ORG_ID`: должен быть `team_uPkbNyzAyFVsnn6jbifmbeq6`
- `VERCEL_PROJECT_ID`: должен быть `prj_JlcovjVv0jyaEGq8uCpAWjBdlD1n`
- `VERCEL_TOKEN`: нужно получить в Vercel Dashboard

### 3. Ошибка в workflow
Может быть проблема в самом workflow файле.

## Как проверить ошибку:

1. Откройте: https://github.com/slider460/weshow-nextgen-platform/actions
2. Кликните на failed workflow "🚀 Deploy to Vercel #161"
3. Разверните шаг с ошибкой (обычно красный)
4. Посмотрите лог - там будет детальная информация об ошибке

## Что нужно сделать:

1. **Проверить логи ошибки** в GitHub Actions
2. **Добавить/проверить secrets** если их нет
3. **Получить VERCEL_TOKEN:**
   - Vercel Dashboard → Settings → Tokens
   - Создайте новый токен
   - Добавьте его в GitHub Secrets

