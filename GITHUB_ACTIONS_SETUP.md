# Настройка GitHub Actions для автодеплоя в Vercel

## Проблема
Автодеплой через GitHub App интеграцию не работает. Настроим альтернативное решение через GitHub Actions.

## Шаг 1: Получение Vercel Token

1. Откройте Vercel Dashboard: https://vercel.com/dashboard
2. Перейдите в **Settings** → **Tokens**
3. Нажмите **"Create Token"**
4. Введите название: `GitHub Actions Deploy`
5. Выберите срок действия (рекомендуется: "No expiration" или "90 days")
6. Нажмите **"Create"**
7. **Скопируйте токен** (он показывается только один раз!)

## Шаг 2: Добавление секретов в GitHub

1. Откройте репозиторий: https://github.com/slider460/weshow-nextgen-platform
2. Перейдите в **Settings** → **Secrets and variables** → **Actions**
3. Нажмите **"New repository secret"**
4. Добавьте три секрета:

### Секрет 1: VERCEL_TOKEN
- **Name**: `VERCEL_TOKEN`
- **Value**: токен, полученный в Шаге 1
- Нажмите **"Add secret"**

### Секрет 2: VERCEL_ORG_ID
- **Name**: `VERCEL_ORG_ID`
- **Value**: `team_uPkbNyzAyFVsnn6jbifmbeq6`
- Нажмите **"Add secret"**

### Секрет 3: VERCEL_PROJECT_ID
- **Name**: `VERCEL_PROJECT_ID`
- **Value**: `prj_zis18LAhgsi289OeN8IErlN5LRSm`
- Нажмите **"Add secret"**

## Шаг 3: Коммит и push файла GitHub Actions

Файл `.github/workflows/deploy.yml` уже создан. Нужно добавить его в git:

```bash
git add .github/workflows/deploy.yml
git commit -m "feat: добавлен GitHub Actions для автодеплоя"
git push origin main
```

## Шаг 4: Проверка работы

После push в `main`:
1. Перейдите в GitHub → **Actions**
2. Должен появиться workflow "Deploy to Vercel"
3. Через 1-2 минуты проверьте Vercel Dashboard → Deployments
4. Должен появиться новый Production деплой

## Как это работает

- При каждом push в ветку `main` GitHub Actions автоматически запускается
- Workflow деплоит проект в Vercel Production
- Все происходит автоматически, без ручного вмешательства

## Текущий статус

- ✅ Файл `.github/workflows/deploy.yml` создан
- ⚠️ Нужно добавить секреты в GitHub
- ⚠️ Нужно закоммитить и запушить файл workflow

## Альтернатива: Ручной деплой

Если не хотите настраивать GitHub Actions, можно деплоить вручную:

1. В Vercel Dashboard → Deployments → "Deploy"
2. Выберите коммит и нажмите "Deploy"

Но GitHub Actions обеспечит автоматический деплой при каждом push.

