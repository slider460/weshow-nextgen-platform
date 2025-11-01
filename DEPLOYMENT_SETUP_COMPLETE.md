# 📚 Документация: Настройка автоматического деплоя на Vercel

## 🎯 Цель
Настроить автоматический деплой сайта `weshow.su` на Vercel при каждом push в ветку `main` на GitHub.

---

## 🔧 Решенные проблемы и исправления

### Проблема 1: Vercel не видит новые коммиты

**Симптомы:**
- Коммиты отправляются в GitHub, но новые деплои не запускаются автоматически
- В Vercel Dashboard показываются только старые деплои (от 2+ дней назад)

**Причина:**
- Webhook между GitHub и Vercel не работает или отсутствует
- Репозиторий был переподключен, но webhook не создался автоматически

**Решение:**
Используем **GitHub Actions** для автоматического деплоя вместо прямого webhook:

1. Включили GitHub Actions workflow в `.github/workflows/deploy.yml`:
   ```yaml
   on:
     push:
       branches: [ main ]
   ```

2. Workflow автоматически запускается при каждом push в `main` и деплоит на Vercel

**Файлы:**
- `.github/workflows/deploy.yml`

---

### Проблема 2: Ошибка сборки - не найден файл `CaseSamaraStandVDNH.tsx`

**Симптомы:**
```
Could not resolve "./pages/CaseSamaraStandVDNH.tsx" from "src/App.tsx"
```

**Причина:**
- Файл существовал локально, но не был добавлен в git
- В GitHub репозитории файла не было

**Решение:**
```bash
git add src/pages/CaseSamaraStandVDNH.tsx
git commit -m "fix: add missing CaseSamaraStandVDNH.tsx file"
git push origin main
```

**Важно:** Все новые файлы должны быть добавлены в git перед push!

---

### Проблема 3: Ошибка сборки - не найдены компоненты

**Симптомы:**
```
Could not resolve "../components/DarkVeil" from "src/pages/CaseSamaraStandVDNH_Test.tsx"
Could not resolve "../components/MagicBento"
Could not resolve "../components/ui/hero-video-dialog"
Could not resolve "../components/ui/highlighter"
```

**Причина:**
- Компоненты были установлены локально через shadcn, но не добавлены в git

**Решение:**
```bash
git add src/components/DarkVeil.tsx
git add src/components/MagicBento.tsx
git add src/components/ui/hero-video-dialog.tsx
git add src/components/ui/highlighter.tsx
git commit -m "fix: add missing component files"
git push origin main
```

**Проверка:** Всегда проверяйте, что новые компоненты добавлены:
```bash
git status src/components/
```

---

### Проблема 4: Ошибка сборки - отсутствует зависимость `rough-notation`

**Симптомы:**
```
Rollup failed to resolve import "rough-notation" from "src/components/ui/highlighter.tsx"
```

**Причина:**
- Пакет был добавлен в `package.json`, но не был установлен (не обновлен `package-lock.json`)

**Решение:**
```bash
npm install rough-notation
git add package.json package-lock.json
git commit -m "fix: add rough-notation to package-lock.json"
git push origin main
```

**Важно:** После добавления пакетов в `package.json` всегда нужно:
1. Установить пакет: `npm install`
2. Добавить оба файла в git: `git add package.json package-lock.json`
3. Закоммитить и запушить

---

### Проблема 5: Ошибка импорта - расширение `.tsx` в dynamic import

**Симптомы:**
```
Could not resolve "./pages/CaseSamaraStandVDNH.tsx" from "src/App.tsx"
```

**Причина:**
- В dynamic import использовалось расширение `.tsx`, что вызывает ошибку в Vite/Rollup

**Решение:**
Изменить в `src/App.tsx`:
```typescript
// ❌ Неправильно:
const CaseSamaraStandVDNH = React.lazy(() => import('./pages/CaseSamaraStandVDNH.tsx'));

// ✅ Правильно:
const CaseSamaraStandVDNH = React.lazy(() => import('./pages/CaseSamaraStandVDNH'));
```

**Правило:** В dynamic imports никогда не указывайте расширения файлов!

---

### Проблема 6: Ошибка Vercel CLI - флаг `--yes` не поддерживается

**Симптомы:**
```
Error! unknown or unexpected option: --yes
```

**Причина:**
- Vercel CLI версии 25.1.0 не поддерживает флаг `--yes`

**Решение:**
Изменить в `.github/workflows/deploy.yml`:
```yaml
# ❌ Неправильно:
vercel-args: '--prod --yes'

# ✅ Правильно:
vercel-args: '--prod'
```

---

### Проблема 7: Ошибка Vercel - множественные регионы на Hobby плане

**Симптомы:**
```
Error! Deploying Serverless Functions to multiple regions is restricted to the Pro and Enterprise plans.
```

**Причина:**
- В `vercel.json` было указано 3 региона: `["iad1", "fra1", "sin1"]`
- Hobby план поддерживает только 1 регион

**Решение:**
Изменить в `vercel.json`:
```json
{
  // ❌ Неправильно (для Hobby плана):
  "regions": ["iad1", "fra1", "sin1"],
  
  // ✅ Правильно (Hobby план):
  "regions": ["iad1"]
}
```

**Примечание:** `iad1` - это US East (Вашингтон). Если нужен другой регион, измените на:
- `fra1` - EU (Франкфурт)
- `sin1` - APAC (Сингапур)
- `sfo1` - US West (Сан-Франциско)

---

## ✅ Финальная конфигурация

### GitHub Actions Workflow

**Файл:** `.github/workflows/deploy.yml`

```yaml
name: 🚀 Deploy to Vercel

on:
  push:
    branches: [ main ]
  workflow_dispatch: # Ручной запуск при необходимости

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v4
        
      - name: 📦 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: 📚 Install dependencies
        run: npm ci
        
      - name: 🔨 Build project
        run: npm run build
        
      - name: 🚀 Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./
```

### Vercel Configuration

**Файл:** `vercel.json`

```json
{
  "regions": ["iad1"],
  "framework": "vite",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### GitHub Secrets (обязательно!)

В GitHub репозитории должны быть настроены следующие secrets:

1. **VERCEL_TOKEN**
   - Получить: Vercel Dashboard → Settings → Tokens → Create Token
   - Добавить: GitHub → Settings → Secrets → Actions → New repository secret

2. **VERCEL_ORG_ID**
   - Значение: `team_uPkbNyzAyFVsnn6jbifmbeq6`
   - Получить можно из `.vercel/project.json` или Vercel Dashboard → Settings → General

3. **VERCEL_PROJECT_ID**
   - Значение: `prj_JlcovjVv0jyaEGq8uCpAWjBdlD1n`
   - Получить можно из `.vercel/project.json` или Vercel Dashboard → Settings → General

---

## 📋 Чеклист перед каждым push

Чтобы избежать ошибок деплоя, всегда проверяйте:

### ✅ Перед коммитом:

1. **Все новые файлы добавлены в git:**
   ```bash
   git status
   # Проверьте, нет ли новых файлов (Untracked files)
   # Если есть - добавьте их:
   git add src/pages/new-file.tsx
   git add src/components/new-component.tsx
   ```

2. **Все новые зависимости установлены:**
   ```bash
   # Если добавили пакет в package.json:
   npm install
   git add package.json package-lock.json
   ```

3. **Проверена локальная сборка:**
   ```bash
   npm run build
   # Убедитесь, что сборка проходит без ошибок
   ```

4. **Проверены dynamic imports:**
   - Убедитесь, что в `React.lazy()` нет расширений `.tsx` или `.ts`
   - Правильно: `import('./pages/Page')`
   - Неправильно: `import('./pages/Page.tsx')`

### ✅ После коммита:

1. **Проверьте GitHub Actions:**
   - Откройте: https://github.com/slider460/weshow-nextgen-platform/actions
   - Убедитесь, что workflow запустился и успешно выполнился

2. **Проверьте Vercel Dashboard:**
   - Откройте: https://vercel.com/dashboard
   - Убедитесь, что появился новый деплой со статусом "Ready"

---

## 🚀 Процесс обновления сайта

### Стандартный workflow:

1. **Внесите изменения в код**

2. **Проверьте локально:**
   ```bash
   npm run build
   npm run dev  # если нужно проверить визуально
   ```

3. **Добавьте все изменения:**
   ```bash
   git add .
   git status  # Проверьте, что все нужное добавлено
   ```

4. **Закоммитьте:**
   ```bash
   git commit -m "описание изменений"
   ```

5. **Отправьте в GitHub:**
   ```bash
   git push origin main
   ```

6. **Автоматически:**
   - GitHub Actions запустит workflow
   - Workflow соберет проект
   - Workflow задеплоит на Vercel
   - Сайт обновится на `weshow.su`

**Время деплоя:** обычно 2-3 минуты

---

## 🔍 Проверка статуса деплоя

### Через GitHub Actions:
1. Откройте: https://github.com/slider460/weshow-nextgen-platform/actions
2. Найдите последний workflow run
3. Статус должен быть: ✅ **Success** (зеленый)

### Через Vercel Dashboard:
1. Откройте: https://vercel.com/dashboard
2. Выберите проект `weshow-v2`
3. Перейдите в раздел "Deployments"
4. Последний деплой должен быть: ✅ **Ready** (зеленый)

---

## 🐛 Частые ошибки и решения

### Ошибка: "Could not resolve ..."
**Решение:** Файл не добавлен в git. Проверьте `git status` и добавьте файл.

### Ошибка: "Module not found"
**Решение:** Пакет не установлен. Выполните `npm install` и обновите `package-lock.json`.

### Ошибка: "Build failed"
**Решение:** Проверьте локально: `npm run build`. Исправьте ошибки перед push.

### Ошибка: "Vercel CLI error"
**Решение:** Проверьте конфигурацию в `.github/workflows/deploy.yml` и `vercel.json`.

---

## 📞 Полезные ссылки

- **GitHub Actions:** https://github.com/slider460/weshow-nextgen-platform/actions
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Проект на Vercel:** https://vercel.com/alexs-projects-4c8cf20f/weshow-v2
- **Сайт:** https://www.weshow.su

---

## 📝 История изменений

- **2025-11-01:** Настроен автоматический деплой через GitHub Actions
- **2025-11-01:** Исправлены все ошибки сборки и деплоя
- **2025-11-01:** Добавлен SpotlightCard компонент для карточек метрик

---

**Важно:** Сохраняйте этот документ и обновляйте при появлении новых проблем или изменений в конфигурации!

