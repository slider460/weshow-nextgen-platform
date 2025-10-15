# 🚀 GitHub Spec Kit - Руководство по использованию

## 📋 Доступные команды

### Основной workflow

1. **`/speckit.constitution`** ✅ - Установить принципы проекта (ВЫПОЛНЕНО)
2. **`/speckit.specify [описание функции]`** - Создать спецификацию функции
3. **`/speckit.plan`** - Создать план реализации
4. **`/speckit.tasks`** - Сгенерировать задачи
5. **`/speckit.implement`** - Выполнить реализацию

### Дополнительные команды

- **`/speckit.clarify`** - Задать структурированные вопросы
- **`/speckit.analyze`** - Анализ согласованности
- **`/speckit.checklist`** - Создать чек-листы качества

## 🎯 Принципы проекта (WeShow NextGen Platform)

### I. User Experience First
- UX и доступность приоритетны
- Mobile-first дизайн
- WCAG 2.1 AA стандарты
- Многоязычность

### II. Modern Technology Stack
- React 18+ с TypeScript
- Vite для быстрой разработки
- Radix UI, Framer Motion, Three.js
- Современные веб-стандарты

### III. Performance & Optimization
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Code splitting и lazy loading
- Оптимизация изображений
- GPU-ускоренные анимации

### IV. Security & Privacy
- Шифрование данных
- OWASP guidelines
- HTTPS везде
- Privacy by design

### V. Scalability & Reliability
- Обработка concurrent users
- Supabase с RLS
- Graceful error handling
- Мониторинг и логирование

## 🛠 Технологический стек

### Frontend
- React 18+ + TypeScript
- Tailwind CSS
- Vite
- React Router

### Backend
- Supabase (auth, database, real-time)
- PostgreSQL с RLS
- RESTful APIs

### Tools
- ESLint + Prettier
- Playwright (E2E тесты)
- GitHub Actions (CI/CD)
- Vercel (деплой)

## 📝 Примеры использования

### Создание новой функции
```bash
# 1. Создать спецификацию
/speckit.specify Добавить систему уведомлений для пользователей

# 2. Создать план
/speckit.plan

# 3. Сгенерировать задачи
/speckit.tasks

# 4. Реализовать
/speckit.implement
```

### Уточнение требований
```bash
# Задать структурированные вопросы
/speckit.clarify
```

### Анализ качества
```bash
# Проверить согласованность
/speckit.analyze

# Создать чек-лист
/speckit.checklist
```

## 🎉 Готово к работе!

Все команды настроены и готовы к использованию. Начните с `/speckit.specify [описание вашей функции]` для создания первой спецификации!
