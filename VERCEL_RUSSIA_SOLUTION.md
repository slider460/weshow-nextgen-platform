# Решение проблемы деплоя Vercel из России

## 🔍 Проблема

Частичная блокировка Vercel в России может вызывать:
- ❌ Проблемы с GitHub webhooks (Vercel → GitHub)
- ❌ Медленные или неудачные CLI деплои
- ❌ Проблемы с автодеплоем через GitHub интеграцию
- ❌ Таймауты при загрузке файлов

## ✅ Решения

### 1. GitHub Actions (Рекомендуется) ⭐

**Преимущества:**
- GitHub Actions работает на серверах GitHub (вне России)
- Не зависит от вашего интернет-соединения
- Надежный и быстрый деплой

**Настройка:**

1. **Создайте файл `.github/workflows/deploy.yml`:**

```yaml
name: 🚀 Deploy to Vercel

on:
  push:
    branches: [main]
  workflow_dispatch: # Для ручного запуска

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: 📥 Checkout code
        uses: actions/checkout@v4
        
      - name: 📦 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: 📚 Install dependencies
        run: npm ci --ignore-scripts || npm install --legacy-peer-deps --ignore-scripts
        
      - name: 🔨 Build project
        run: npm run build
        
      - name: 📦 Install Vercel CLI
        run: npm install -g vercel@latest
        
      - name: 🚀 Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: |
          vercel pull --yes --environment=production --token=$VERCEL_TOKEN
          vercel build --prod --token=$VERCEL_TOKEN
          vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
```

2. **Добавьте секреты в GitHub:**
   - Перейдите: `https://github.com/slider460/weshow-nextgen-platform/settings/secrets/actions`
   - Добавьте:
     - `VERCEL_TOKEN` - получите на https://vercel.com/account/tokens
     - `VERCEL_ORG_ID` - из `.vercel/project.json` или Vercel Dashboard
     - `VERCEL_PROJECT_ID` - из `.vercel/project.json` или Vercel Dashboard

3. **Получение токенов:**
   ```bash
   # VERCEL_TOKEN
   # 1. Откройте https://vercel.com/account/tokens
   # 2. Создайте новый токен
   # 3. Скопируйте и добавьте в GitHub Secrets
   
   # VERCEL_ORG_ID и VERCEL_PROJECT_ID
   cat .vercel/project.json
   # Или из Vercel Dashboard: Settings → General
   ```

### 2. Использование VPN для CLI деплоя

Если нужно деплоить через CLI:

1. **Включите VPN** (желательно европейский сервер)
2. **Используйте архив для деплоя:**
   ```bash
   vercel --prod --yes --archive=tgz
   ```

### 3. Настройка через веб-интерфейс Vercel

1. **Используйте VPN** для доступа к https://vercel.com
2. **Настройте GitHub интеграцию:**
   - Settings → Git → Connect Git Repository
   - Выберите `slider460/weshow-nextgen-platform`
   - Установите Production Branch: `main`
   - Включите Auto-deploy

3. **Проверьте webhook в GitHub:**
   - GitHub → Settings → Webhooks
   - Должен быть webhook от Vercel
   - Если нет - переподключите репозиторий в Vercel

### 4. Альтернатива: Netlify

Если Vercel продолжает вызывать проблемы:

1. **Netlify** обычно работает стабильнее из России
2. Настройка аналогична Vercel
3. Файл `netlify.toml` уже есть в проекте

## 🎯 Рекомендуемый план действий

1. ✅ **Создайте GitHub Actions workflow** (самое надежное решение)
2. ✅ **Добавьте секреты в GitHub**
3. ✅ **Проверьте работу автодеплоя**
4. ✅ **Если не работает - используйте VPN для настройки через веб-интерфейс**

## 📝 Текущие проблемы

- ❌ CLI деплой: слишком много файлов (37378 > 15000)
- ❌ Автодеплой через GitHub интеграцию может не работать из-за блокировок
- ✅ GitHub Actions - лучшее решение для России

## 🔧 Быстрая проверка

```bash
# Проверка доступности Vercel API
curl -I https://api.vercel.com

# Если получаете ошибки - используйте VPN или GitHub Actions
```

