# 🎨 Инструкция по извлечению дизайна из Figma

## 📋 Что у вас есть

### ✅ Готовые инструменты:
- **Автоматический экспорт изображений** - `figma-export-images.js`
- **Экспорт стилей и цветов** - `figma-export-styles.js`
- **Полный экспорт** - `figma-export-all.js`
- **Подробное руководство** - `FIGMA_DESIGN_EXPORT_GUIDE.md`
- **Быстрый старт** - `QUICK_FIGMA_EXPORT.md`

### ✅ Настроенная интеграция:
- Компонент статуса подключения к Figma
- Автоматическая проверка API ключа
- Готовые папки для экспорта

---

## 🚀 Как извлечь дизайн (3 простых шага)

### Шаг 1: Получите API ключ Figma
1. **Откройте** [https://www.figma.com/settings](https://www.figma.com/settings)
2. **Перейдите** в раздел "Developer"
3. **Нажмите** "Personal Access Tokens"
4. **Создайте** новый токен
5. **Скопируйте** токен (начинается с `figd_`)

### Шаг 2: Добавьте токен в проект
```bash
# Отредактируйте .env.local файл
nano .env.local

# Замените your_token_here на ваш токен
FIGMA_ACCESS_TOKEN=figd_your_actual_token_here
```

### Шаг 3: Запустите экспорт
```bash
# Полный экспорт всего из Figma
node figma-export-all.js
```

---

## 📁 Что получите после экспорта

### Изображения:
```
public/figma-exports/images/
├── node-287-2.png          # Конкретный элемент из вашей ссылки
├── image-123.png           # Все изображения из документа
└── image-456.png
```

### Иконки:
```
public/figma-exports/icons/
├── icon-789.svg            # Иконки в векторном формате
└── icon-101.svg
```

### Стили и цвета:
```
public/figma-exports/styles/
├── figma-colors.css        # CSS переменные с цветами
├── figma-typography.css    # Стили текста
├── figma-gradients.css     # Градиенты
├── figma-colors.json       # JSON с цветовой палитрой
└── tailwind-colors.js      # Конфигурация для Tailwind
```

---

## 🎯 Использование в проекте

### 1. Импорт стилей
```css
/* В src/index.css */
@import '../public/figma-exports/styles/figma-colors.css';
@import '../public/figma-exports/styles/figma-typography.css';
@import '../public/figma-exports/styles/figma-gradients.css';
```

### 2. Использование цветов
```css
.my-element {
  background: var(--figma-color-1);
  color: var(--figma-color-2);
  border: 1px solid var(--figma-color-3);
}
```

### 3. Использование изображений
```tsx
// В React компонентах
<img src="/figma-exports/images/node-287-2.png" alt="Hero Background" />
<img src="/figma-exports/icons/icon-789.svg" alt="Icon" />
```

### 4. Использование типографики
```css
.title {
  font-family: var(--figma-font-family);
  font-size: var(--figma-font-size);
  font-weight: var(--figma-font-weight);
}
```

---

## 🔧 Дополнительные возможности

### Экспорт по частям:
```bash
# Только изображения
node figma-export-images.js

# Только стили и цвета
node figma-export-styles.js
```

### Тестирование подключения:
```bash
# Проверка API
node figma-api-test.js --token=your_token

# Проверка подключения
node figma-connection-test.js
```

### Автоматическая настройка:
```bash
# Создание конфигурации
node setup-figma.js
```

---

## 📊 Мониторинг статуса

### В браузере:
- Откройте сайт: `http://localhost:8083/`
- В правом верхнем углу увидите индикатор статуса Figma
- 🟢 Зеленый = подключено
- 🔴 Красный = ошибка
- 🟡 Желтый = нужен API ключ

### В консоли:
```bash
# Проверка статуса
./check-status.sh
```

---

## 🚨 Решение проблем

### Проблема: "Не установлен Figma API токен"
**Решение**: Добавьте токен в `.env.local` файл

### Проблема: "Ошибка 403 Forbidden"
**Решение**: Проверьте правильность API ключа

### Проблема: "Ошибка 404 Not Found"
**Решение**: Проверьте ID документа в `.env.local`

### Проблема: Изображения не экспортируются
**Решение**: Убедитесь, что у вас есть права на просмотр документа

---

## 🎉 Готово!

Теперь вы можете:
- ✅ Автоматически извлекать любой дизайн из Figma
- ✅ Получать все изображения, иконки и стили
- ✅ Использовать цвета и типографику в проекте
- ✅ Синхронизировать изменения в реальном времени
- ✅ Отслеживать статус подключения

**Ваш дизайн из Figma готов к использованию!** 🚀




























