# Руководство по развертыванию weshow.su

## Обзор

Этот документ описывает процесс развертывания и мониторинга приложения weshow.su.

## Предварительные требования

- Node.js 18+ 
- npm или yarn
- Git
- Vercel CLI (для развертывания)
- Supabase проект

## Переменные окружения

### Обязательные переменные

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Опциональные переменные

```bash
VITE_ANALYTICS_ID=your_analytics_id
VITE_SENTRY_DSN=your_sentry_dsn
```

## Процесс развертывания

### 1. Подготовка

```bash
# Клонирование репозитория
git clone https://github.com/slider460/weshow-nextgen-platform.git
cd weshow-nextgen-platform

# Установка зависимостей
npm install

# Создание файла окружения
cp .env.example .env.local
# Заполните переменные окружения
```

### 2. Локальная разработка

```bash
# Запуск dev сервера
npm run dev

# Сборка для production
npm run build

# Предварительный просмотр production сборки
npm run preview
```

### 3. Развертывание на Vercel

#### Автоматическое развертывание

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения в Vercel Dashboard
3. Включите автодеплой для ветки `main`

#### Ручное развертывание

```bash
# Установка Vercel CLI
npm i -g vercel

# Логин в Vercel
vercel login

# Развертывание
vercel --prod
```

### 4. Настройка домена

1. В Vercel Dashboard перейдите в Settings > Domains
2. Добавьте ваш домен (weshow.su)
3. Настройте DNS записи согласно инструкциям Vercel

## Мониторинг и качество

### Web Vitals

Приложение автоматически отслеживает:
- LCP (Largest Contentful Paint)
- FID (First Input Delay) 
- CLS (Cumulative Layout Shift)
- FCP (First Contentful Paint)
- TTFB (Time to First Byte)

### Error Reporting

Система автоматически отслеживает:
- JavaScript ошибки
- React ошибки
- API ошибки
- Performance ошибки

### Логирование

Все метрики и ошибки логируются в:
- Консоль браузера (development)
- Аналитический сервис (production)

## Процедуры отката

### Быстрый откат

```bash
# Откат к предыдущей версии в Vercel
vercel rollback

# Или через Vercel Dashboard
# Deployments > [deployment] > Rollback
```

### Полный откат

```bash
# Откат к конкретному коммиту
git checkout [commit-hash]
git push origin main --force
```

## Мониторинг производительности

### Ключевые метрики

- **Время загрузки**: < 3 секунд
- **LCP**: < 2.5 секунд
- **FID**: < 100ms
- **CLS**: < 0.1
- **Ошибки**: < 1% запросов

### Алерты

Настройте алерты для:
- Время загрузки > 5 секунд
- Ошибки > 5%
- Доступность < 99%

## Обслуживание

### Регулярные задачи

1. **Еженедельно**: Проверка метрик производительности
2. **Ежемесячно**: Обновление зависимостей
3. **Ежеквартально**: Аудит безопасности

### Обновления

```bash
# Обновление зависимостей
npm update

# Проверка уязвимостей
npm audit

# Исправление уязвимостей
npm audit fix
```

## Troubleshooting

### Частые проблемы

#### 1. Ошибки Supabase

```bash
# Проверка переменных окружения
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Проверка подключения
curl -H "apikey: $VITE_SUPABASE_ANON_KEY" $VITE_SUPABASE_URL/rest/v1/
```

#### 2. Проблемы с CSS

```bash
# Очистка кэша Vercel
vercel env rm VITE_CACHE_VERSION
vercel --prod
```

#### 3. Ошибки сборки

```bash
# Очистка node_modules
rm -rf node_modules package-lock.json
npm install

# Пересборка
npm run build
```

### Логи

```bash
# Просмотр логов Vercel
vercel logs [deployment-url]

# Локальные логи
npm run dev 2>&1 | tee dev.log
```

## Контакты

- **Разработчик**: Aleksandr Narodetskii
- **Репозиторий**: https://github.com/slider460/weshow-nextgen-platform
- **Домен**: https://weshow.su

## Changelog

### v1.0.0 (2025-10-15)
- ✅ Реализована система мониторинга производительности
- ✅ Добавлено отслеживание ошибок
- ✅ Оптимизирована производительность
- ✅ Исправлены проблемы с навигацией
- ✅ Добавлены E2E тесты
