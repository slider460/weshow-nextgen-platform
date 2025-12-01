# Проверка секретов GitHub Actions для Vercel

## Текущие значения (из .vercel/project.json)

- **VERCEL_ORG_ID**: `team_uPkbNyzAyFVsnn6jbifmbeq6`
- **VERCEL_PROJECT_ID**: `prj_zis18LAhgsi289OeN8IErlN5LRSm`

## Шаг 1: Проверка VERCEL_ORG_ID

### В GitHub:
1. Откройте: https://github.com/slider460/weshow-nextgen-platform/settings/secrets/actions
2. Найдите секрет `VERCEL_ORG_ID`
3. Нажмите на него (или "Update")
4. Проверьте значение:
   - ✅ Должно быть: `team_uPkbNyzAyFVsnn6jbifmbeq6`
   - ❌ Если другое - обновите на правильное значение

### Проверка через CLI:
```bash
# Значение из локального проекта
cat .vercel/project.json | grep orgId
```

## Шаг 2: Проверка VERCEL_PROJECT_ID

### В GitHub:
1. Откройте: https://github.com/slider460/weshow-nextgen-platform/settings/secrets/actions
2. Найдите секрет `VERCEL_PROJECT_ID`
3. Нажмите на него (или "Update")
4. Проверьте значение:
   - ✅ Должно быть: `prj_zis18LAhgsi289OeN8IErlN5LRSm`
   - ❌ Если другое - обновите на правильное значение

### Проверка через CLI:
```bash
# Значение из локального проекта
cat .vercel/project.json | grep projectId
```

## Шаг 3: Проверка VERCEL_TOKEN

### Проверка в Vercel Dashboard:

1. **Откройте Vercel Dashboard:**
   - https://vercel.com/account/tokens

2. **Проверьте существующие токены:**
   - Найдите токен, который используется в GitHub Actions
   - Проверьте его статус (Active/Expired)
   - Проверьте дату создания и срок действия

3. **Если токен истек или не найден:**
   - Нажмите "Create Token"
   - Название: `GitHub Actions Deploy`
   - Scope: Full Account (или нужные права)
   - Expiration: No expiration (или выберите срок)
   - Нажмите "Create"
   - **Скопируйте токен** (показывается только один раз!)

4. **Обновите секрет в GitHub:**
   - Откройте: https://github.com/slider460/weshow-nextgen-platform/settings/secrets/actions
   - Найдите `VERCEL_TOKEN`
   - Нажмите "Update"
   - Вставьте новый токен
   - Нажмите "Update secret"

### Проверка токена через CLI:

```bash
# Попробуйте выполнить команду с токеном
# (замените YOUR_TOKEN на ваш токен)
vercel whoami --token=YOUR_TOKEN

# Если команда успешна - токен валидный
# Если ошибка - токен неверный или истек
```

## Шаг 4: Проверка всех секретов через тестовый workflow

Создайте тестовый workflow для проверки секретов:

```yaml
name: Check Secrets

on:
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - name: Check VERCEL_TOKEN
        run: |
          if [ -z "${{ secrets.VERCEL_TOKEN }}" ]; then
            echo "❌ VERCEL_TOKEN не установлен"
            exit 1
          else
            echo "✅ VERCEL_TOKEN установлен"
          fi

      - name: Check VERCEL_ORG_ID
        run: |
          if [ -z "${{ secrets.VERCEL_ORG_ID }}" ]; then
            echo "❌ VERCEL_ORG_ID не установлен"
            exit 1
          else
            echo "✅ VERCEL_ORG_ID установлен: ${{ secrets.VERCEL_ORG_ID }}"
          fi

      - name: Check VERCEL_PROJECT_ID
        run: |
          if [ -z "${{ secrets.VERCEL_PROJECT_ID }}" ]; then
            echo "❌ VERCEL_PROJECT_ID не установлен"
            exit 1
          else
            echo "✅ VERCEL_PROJECT_ID установлен: ${{ secrets.VERCEL_PROJECT_ID }}"
          fi

      - name: Test Vercel Token
        run: |
          npm install -g vercel@latest
          vercel whoami --token=${{ secrets.VERCEL_TOKEN }}
```

## Быстрая проверка через команды

### Проверка локальных значений:
```bash
# Проверка orgId и projectId
cat .vercel/project.json

# Должно показать:
# {
#   "projectId": "prj_zis18LAhgsi289OeN8IErlN5LRSm",
#   "orgId": "team_uPkbNyzAyFVsnn6jbifmbeq6",
#   "projectName": "weshow-nextgen-platform"
# }
```

### Проверка токена (если он сохранен локально):
```bash
# Проверка текущего пользователя Vercel
vercel whoami

# Если нужно проверить конкретный токен:
vercel whoami --token=YOUR_TOKEN
```

## Частые проблемы и решения

### Проблема 1: Токен истек
**Решение:** Создайте новый токен в Vercel Dashboard и обновите секрет в GitHub

### Проблема 2: Неправильный ORG_ID или PROJECT_ID
**Решение:** 
1. Проверьте значения в `.vercel/project.json`
2. Обновите секреты в GitHub на правильные значения

### Проблема 3: Токен не имеет нужных прав
**Решение:** 
1. Создайте новый токен с полными правами (Full Account)
2. Обновите секрет в GitHub

### Проблема 4: Секреты не видны в GitHub Actions
**Решение:**
1. Убедитесь, что секреты добавлены в правильный репозиторий
2. Проверьте, что workflow использует правильные имена секретов

## Проверка через Vercel CLI локально

Если у вас есть доступ к Vercel CLI локально:

```bash
# Проверка текущей конфигурации
vercel project ls

# Должен показать проект:
# weshow-nextgen-platform

# Проверка информации о проекте
cat .vercel/project.json
```

## Следующие шаги

После проверки всех секретов:

1. Убедитесь, что все значения правильные
2. Если нужно - обновите секреты в GitHub
3. Запустите workflow снова
4. Проверьте логи, если ошибка сохраняется



