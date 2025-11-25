# 🎨 Инструменты для работы с Figma

## 📁 Структура файлов

```
├── figma-connection-test.js      # Тест подключения к Figma API
├── figma-api-test.js            # Тест API с токеном
├── figma-export-images.js       # Экспорт изображений
├── figma-export-styles.js       # Экспорт стилей и цветов
├── figma-export-all.js          # Полный экспорт
├── setup-figma.js               # Автоматическая настройка
├── .env.local                   # Конфигурация (создается автоматически)
└── docs/
    ├── FIGMA_SETUP_GUIDE.md           # Подробное руководство по настройке
    ├── FIGMA_DESIGN_EXPORT_GUIDE.md   # Руководство по экспорту дизайна
    ├── FIGMA_EXPORT_INSTRUCTIONS.md   # Инструкция по извлечению дизайна
    ├── QUICK_FIGMA_EXPORT.md          # Быстрый старт
    └── FIGMA_INTEGRATION_SUMMARY.md   # Итоговый отчет
```

## 🚀 Быстрый старт

### 1. Настройка
```bash
# Автоматическая настройка
node setup-figma.js

# Добавьте токен в .env.local
nano .env.local
```

### 2. Экспорт
```bash
# Полный экспорт
node figma-export-all.js
```

### 3. Использование
```tsx
// В React компонентах
<img src="/figma-exports/images/node-287-2.png" alt="Design" />
```

## 📋 Доступные команды

| Команда | Описание |
|---------|----------|
| `node setup-figma.js` | Автоматическая настройка |
| `node figma-connection-test.js` | Тест подключения |
| `node figma-api-test.js --token=your_token` | Тест API |
| `node figma-export-images.js` | Экспорт изображений |
| `node figma-export-styles.js` | Экспорт стилей |
| `node figma-export-all.js` | Полный экспорт |

## 🔧 Конфигурация

### Переменные окружения (.env.local):
```bash
FIGMA_ACCESS_TOKEN=your_token_here
FIGMA_DOCUMENT_ID=if9cW5Ga1xyeUTGYc2ea9K
FIGMA_NODE_ID=287-2
```

## 📊 Результаты экспорта

### Изображения:
- PNG формат с высоким разрешением
- Автоматическая оптимизация
- Организация по папкам

### Стили:
- CSS переменные для цветов
- Готовые классы для типографики
- Градиенты в CSS формате
- JSON файлы для интеграции

### Иконки:
- SVG формат для масштабирования
- Оптимизированный код
- Готовые к использованию

## 🎯 Интеграция в проект

### CSS:
```css
@import './public/figma-exports/styles/figma-colors.css';
```

### React:
```tsx
import './figma-exports/styles/figma-colors.css';
```

### Tailwind:
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: require('./public/figma-exports/styles/tailwind-colors.js').colors
    }
  }
}
```

## 🚨 Решение проблем

### Нет токена:
1. Получите токен в Figma
2. Добавьте в .env.local
3. Перезапустите скрипты

### Ошибка 403:
- Проверьте правильность токена
- Убедитесь, что токен активен

### Ошибка 404:
- Проверьте ID документа
- Убедитесь в правах доступа

## 📞 Поддержка

- **Документация**: См. файлы в папке `docs/`
- **Figma API**: [www.figma.com/developers/api](https://www.figma.com/developers/api)
- **Сообщество**: [forum.figma.com](https://forum.figma.com)

---

**🎉 Готово! Теперь вы можете легко извлекать любой дизайн из Figma!**




























