# 🎨 Полная интеграция с Figma

## Описание
Система для автоматического извлечения дизайна из Figma и создания React компонентов 1 в 1.

## 🚀 Быстрый старт

### 1. Автоматическая настройка (рекомендуется)
```bash
node figma-master.js
```

### 2. Ручная настройка
```bash
# Шаг 1: Настройка токена
node setup-figma-token.js

# Шаг 2: Подключение к Figma
node figma-direct-connect.js

# Шаг 3: Генерация React компонента
node figma-to-react.js
```

## 📋 Требования

### 1. Figma API токен
1. Откройте Figma в браузере
2. Перейдите в Settings (шестеренка)
3. Выберите "Developer"
4. Нажмите "Create new token"
5. Введите название и скопируйте токен

### 2. Node.js
- Версия 16+ (для ES модулей)
- npm или yarn

## 🔧 Настройка

### Переменные окружения
Создайте файл `.env.local`:
```env
FIGMA_ACCESS_TOKEN=your_token_here
FIGMA_DOCUMENT_ID=if9cW5Ga1xyeUTGYc2ea9K
FIGMA_NODE_ID=998-2
```

### Или установите через терминал:
```bash
export FIGMA_ACCESS_TOKEN=your_token_here
```

## 📁 Структура файлов

```
├── figma-master.js          # Главный скрипт
├── setup-figma-token.js     # Настройка токена
├── figma-direct-connect.js  # Подключение к Figma
├── figma-to-react.js        # Генерация React компонента
├── figma-data.json          # Данные из Figma (создается автоматически)
└── src/
    ├── components/
    │   ├── FigmaGeneratedComponent.tsx
    │   └── FigmaGeneratedComponent.css
    └── pages/
        └── FigmaDemoPage.tsx
```

## 🎯 Использование

### 1. Получение дизайна
```bash
node figma-direct-connect.js
```
- Подключается к Figma API
- Получает данные документа
- Извлекает стили и изображения
- Сохраняет в `figma-data.json`

### 2. Генерация компонента
```bash
node figma-to-react.js
```
- Анализирует данные Figma
- Создает React компонент
- Генерирует CSS стили
- Создает демо страницу

### 3. Просмотр результата
Откройте: `http://localhost:8083/figma-demo`

## 🔍 Анализ данных

### Структура figma-data.json
```json
{
  "document": {
    "name": "Название документа",
    "lastModified": "2024-01-01T00:00:00.000Z"
  },
  "node": {
    "nodes": {
      "node-id": {
        "document": {
          "type": "FRAME",
          "name": "Название узла",
          "children": [...]
        }
      }
    }
  },
  "styles": {
    "meta": {...}
  },
  "images": {
    "images": {...}
  }
}
```

## 🎨 Поддерживаемые элементы

### Текст
- Автоматическое определение размера шрифта
- Извлечение цвета и веса шрифта
- Создание заголовков (h1-h6)

### Прямоугольники
- Извлечение размеров
- Определение цвета заливки
- Создание div элементов

### Эллипсы
- Круглые элементы
- Автоматическое добавление border-radius

### Фреймы и группы
- Рекурсивная обработка дочерних элементов
- Сохранение иерархии

## 🚨 Устранение неполадок

### Ошибка 401 (Unauthorized)
```bash
# Проверьте токен
echo $FIGMA_ACCESS_TOKEN

# Переустановите токен
node setup-figma-token.js
```

### Ошибка таймаута
```bash
# Проверьте интернет соединение
ping api.figma.com

# Попробуйте снова
node figma-direct-connect.js
```

### Ошибка парсинга JSON
```bash
# Удалите старые данные
rm figma-data.json

# Получите данные заново
node figma-direct-connect.js
```

## 🔄 Обновление дизайна

### Автоматическое обновление
```bash
# Запустите мастер-скрипт
node figma-master.js
```

### Ручное обновление
```bash
# Получите новые данные
node figma-direct-connect.js

# Перегенерируйте компонент
node figma-to-react.js
```

## 📱 Адаптивность

### Автоматическая адаптация
- Размеры конвертируются в CSS
- Создаются responsive классы
- Добавляются медиа-запросы

### Ручная настройка
Отредактируйте `FigmaGeneratedComponent.css`:
```css
@media (max-width: 768px) {
  .figma-container {
    /* Мобильные стили */
  }
}
```

## 🎯 Расширение функциональности

### Добавление новых типов элементов
Отредактируйте `figma-to-react.js`:
```javascript
} else if (node.type === 'YOUR_TYPE') {
  // Ваша логика обработки
}
```

### Кастомные стили
Добавьте в `FigmaGeneratedComponent.css`:
```css
.figma-custom-element {
  /* Ваши стили */
}
```

## 📊 Мониторинг

### Логи
Все операции логируются в консоль:
- ✅ Успешные операции
- ❌ Ошибки
- 🔄 Процессы

### Отладка
```bash
# Включите подробные логи
DEBUG=figma* node figma-direct-connect.js
```

## 🚀 Производство

### Оптимизация
1. Минифицируйте CSS
2. Оптимизируйте изображения
3. Добавьте lazy loading

### Деплой
1. Соберите проект: `npm run build`
2. Загрузите на сервер
3. Настройте CDN для изображений

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи в консоли
2. Убедитесь в правильности токена
3. Проверьте доступность Figma API
4. Создайте issue с описанием проблемы





















