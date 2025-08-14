# 🚀 WeShow NextGen Platform - Развертывание в Lovable.dev

## 📋 Описание проекта
WeShow NextGen Platform - это современная веб-платформа мультимедийных решений, построенная на React 18 + TypeScript + Vite.

## 🛠️ Технологический стек
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM
- **Maps**: Leaflet.js + OpenStreetMap
- **Icons**: Lucide React

## ⚡ Быстрый старт в Lovable.dev

### 1. Подключение репозитория
1. Перейдите на [lovable.dev](https://lovable.dev)
2. Создайте новый проект
3. Подключите GitHub репозиторий: `https://github.com/slider460/weshow-nextgen-platform.git`

### 2. Настройки сборки
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node Version: 18.x
```

### 3. Переменные окружения
```
NODE_ENV=production
VITE_APP_TITLE=WeShow NextGen Platform
VITE_APP_DESCRIPTION=Современная платформа мультимедийных решений
```

### 4. Автоматическое развертывание
- ✅ Включено для ветки `main`
- 🔄 Автоматический деплой при каждом push
- 🧪 Preview для pull requests

## 🎯 Ключевые особенности

### 🌐 Основные страницы
- **Главная** (`/`) - Hero секция и основные услуги
- **Услуги** (`/services`) - Каталог всех 45+ услуг
- **Портфолио** (`/portfolio`) - Примеры работ и кейсы
- **Контакты** (`/contact`) - Формы связи + интерактивная карта
- **О компании** (`/about`) - Информация о WESHOW

### 🗺️ Интерактивная карта
- **OpenStreetMap** с Leaflet.js
- **Адрес**: Москва, ул. Рочдельская, 14А
- **Координаты**: 55.7796, 37.6156
- **Функции**: масштабирование, маршруты, информация

### 📱 Адаптивность
- **Mobile-first** дизайн
- **Responsive** для всех устройств
- **Touch-friendly** интерфейс

## 🔧 Настройки для продакшена

### Оптимизация сборки
```bash
# Сборка для продакшена
npm run build

# Проверка размера бандла
npm run build:analyze
```

### Производительность
- **Code splitting** автоматически
- **Tree shaking** для неиспользуемого кода
- **Minification** CSS и JavaScript
- **Gzip compression** на сервере

## 📊 Мониторинг и аналитика

### GitHub Actions
- ✅ Автоматическая сборка при push
- ✅ Тестирование build output
- ✅ Уведомления о статусе деплоя

### Lovable.dev Features
- 📈 Аналитика производительности
- 🔍 Логи ошибок и сборки
- 🚀 Автоматическое масштабирование
- 🔒 SSL сертификаты

## 🚨 Troubleshooting

### Частые проблемы
1. **Build fails** - проверьте Node.js версию (18+)
2. **Dependencies** - выполните `npm ci` в clean environment
3. **Port conflicts** - Vite автоматически выбирает свободный порт

### Логи и отладка
```bash
# Локальная разработка
npm run dev

# Продакшн сборка
npm run build

# Preview сборки
npm run preview
```

## 🔄 Обновления

### Автоматические
- При push в `main` ветку
- GitHub Actions собирает проект
- Lovable.dev автоматически деплоит

### Ручные
- Изменения в lovable.dev dashboard
- Пересборка через интерфейс
- Rollback к предыдущей версии

## 📞 Поддержка

### Команда разработки
- **GitHub Issues**: [Repository Issues](https://github.com/slider460/weshow-nextgen-platform/issues)
- **Documentation**: [Project Wiki](https://github.com/slider460/weshow-nextgen-platform/wiki)

### Lovable.dev Support
- **Documentation**: [Lovable.dev Docs](https://docs.lovable.dev)
- **Community**: [Discord Community](https://discord.gg/lovable)

---

## 🎉 Готово к развертыванию!

Ваш проект полностью настроен для автоматического развертывания в Lovable.dev. Просто подключите репозиторий и наслаждайтесь автоматическими деплоями! 🚀✨
