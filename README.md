# 🚀 WeShow NextGen Platform

Современная веб-платформа мультимедийных решений и интерактивных технологий.

## ✨ Особенности

- 🌐 **45+ страниц** услуг и решений
- 🗺️ **Интерактивная карта** с OpenStreetMap
- 📱 **Адаптивный дизайн** для всех устройств
- 🎨 **Современный UI/UX** с shadcn/ui
- 📝 **Функциональные формы** консультаций и заказов
- 🚀 **Быстрая загрузка** с Vite
- 🔄 **Автоматическое развертывание** в Lovable.dev

## 🛠️ Технологии

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Routing**: React Router DOM
- **Maps**: Leaflet.js + OpenStreetMap
- **Icons**: Lucide React

## 🚀 Быстрый старт

### Локальная разработка
```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Preview сборки
npm run preview
```

### Развертывание в Lovable.dev
```bash
# 1. Push в main ветку
git push origin main

# 2. GitHub Actions автоматически собирает проект
# 3. Lovable.dev автоматически деплоит
```

## 🌐 Основные страницы

- **Главная** (`/`) - Hero секция и основные услуги
- **Услуги** (`/services`) - Каталог всех услуг
- **Портфолио** (`/portfolio`) - Примеры работ
- **Контакты** (`/contact`) - Формы связи + карта
- **О компании** (`/about`) - Информация о WESHOW

## 🗺️ Интерактивная карта

- **Адрес**: Москва, ул. Рочдельская, 14А
- **Координаты**: 55.7796, 37.6156
- **Функции**: масштабирование, маршруты, информация
- **Технология**: Leaflet.js + OpenStreetMap

## 📱 Адаптивность

- **Mobile-first** дизайн
- **Responsive** для всех устройств
- **Touch-friendly** интерфейс
- **Оптимизированная** производительность

## 🔧 Настройки для продакшена

### Переменные окружения
```env
NODE_ENV=production
VITE_APP_TITLE=WeShow NextGen Platform
VITE_APP_DESCRIPTION=Современная платформа мультимедийных решений
```

### Оптимизация
- **Code splitting** автоматически
- **Tree shaking** для неиспользуемого кода
- **Minification** CSS и JavaScript
- **Gzip compression** на сервере

## 🚀 Развертывание

### Lovable.dev (Рекомендуется)
- ✅ **Автоматический деплой** при push в main
- ✅ **GitHub Actions** для сборки
- ✅ **SSL сертификаты** автоматически
- ✅ **CDN** для статических файлов

### Настройки в Lovable.dev
```
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Node Version: 18.x
```

### GitHub Actions
- 🔄 Автоматическая сборка при push
- 🧪 Тестирование build output
- 📊 Уведомления о статусе деплоя

## 📊 Мониторинг

- **GitHub Actions** - статус сборки
- **Lovable.dev** - производительность и логи
- **Автоматические** уведомления об ошибках

## 🔄 Обновления

### Автоматические
- При push в `main` ветку
- GitHub Actions собирает проект
- Lovable.dev автоматически деплоит

### Ручные
- Изменения в lovable.dev dashboard
- Пересборка через интерфейс
- Rollback к предыдущей версии

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

## 📞 Поддержка

### Команда разработки
- **GitHub Issues**: [Repository Issues](https://github.com/slider460/weshow-nextgen-platform/issues)
- **Documentation**: [Project Wiki](https://github.com/slider460/weshow-nextgen-platform/wiki)

### Lovable.dev Support
- **Documentation**: [Lovable.dev Docs](https://docs.lovable.dev)
- **Community**: [Discord Community](https://discord.gg/lovable)

## 📚 Документация

- [LOVABLE_DEPLOYMENT.md](./LOVABLE_DEPLOYMENT.md) - Подробная инструкция по развертыванию
- [LOVABLE_README.md](./LOVABLE_README.md) - README для lovable.dev

---

## 🎉 Готово к использованию!

Ваш проект полностью настроен для разработки и автоматического развертывания в Lovable.dev. Просто push'ите в main ветку и наслаждайтесь автоматическими деплоями! 🚀✨

## 📄 Лицензия

MIT License - см. [LICENSE](LICENSE) файл для деталей.
