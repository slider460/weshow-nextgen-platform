# ⚡ Быстрый экспорт из Figma

## 🚀 За 3 шага

### 1. Получите API ключ
```bash
# Откройте https://www.figma.com/settings
# Developer > Personal Access Tokens > Create new token
# Скопируйте токен
```

### 2. Настройте проект
```bash
# Добавьте токен в .env.local
echo "FIGMA_ACCESS_TOKEN=your_token_here" >> .env.local

# Или отредактируйте файл вручную
nano .env.local
```

### 3. Запустите экспорт
```bash
# Полный экспорт всего
node figma-export-all.js

# Или по частям
node figma-export-images.js    # Изображения
node figma-export-styles.js    # Стили и цвета
```

## 📁 Результат

После экспорта у вас будет:
```
public/figma-exports/
├── images/           # Все изображения
├── icons/           # Иконки в SVG
└── styles/          # Стили и цвета
    ├── figma-colors.css
    ├── figma-typography.css
    └── figma-gradients.css
```

## 🔧 Использование в проекте

### Импорт CSS
```css
/* В ваш main.css */
@import './public/figma-exports/styles/figma-colors.css';
@import './public/figma-exports/styles/figma-typography.css';
@import './public/figma-exports/styles/figma-gradients.css';
```

### Использование цветов
```css
.my-element {
  background: var(--figma-color-1);
  color: var(--figma-color-2);
}
```

### Использование изображений
```tsx
<img src="/figma-exports/images/image-123.png" alt="Design" />
```

## 🎯 Готово!

Теперь у вас есть все элементы дизайна из Figma, готовые для использования в проекте!







