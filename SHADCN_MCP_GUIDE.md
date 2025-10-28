# 🎨 Руководство по shadcn MCP

## ✅ Статус: Инициализирован

### 🚀 Что было настроено:

1. **MCP сервер** - подключен к Cursor
2. **Конфигурация** - сохранена в `.cursor/mcp.json`
3. **Зависимости** - установлены автоматически
4. **Доступ к компонентам** - через MCP интерфейс

## 📋 Доступные компоненты

### 🎯 Основные UI компоненты:
- **button** - кнопки различных вариантов
- **card** - карточки с заголовком, контентом, футером
- **input** - поля ввода
- **label** - подписи к полям
- **badge** - значки и метки
- **avatar** - аватары пользователей
- **dialog** - модальные окна
- **dropdown-menu** - выпадающие меню
- **accordion** - аккордеоны
- **alert** - уведомления
- **calendar** - календарь
- **carousel** - карусели
- **chart** - графики
- **checkbox** - чекбоксы
- **collapsible** - сворачиваемые блоки
- **command** - командная палитра
- **context-menu** - контекстные меню

### 📊 Всего доступно: 423 компонента!

## 🛠 Как использовать

### 1. Просмотр доступных компонентов:
```bash
# Через MCP (в Cursor)
# Используйте функции mcp_shadcn_* для доступа к компонентам
```

### 2. Поиск компонентов:
```typescript
// Поиск по названию
mcp_shadcn_search_items_in_registries(['@shadcn'], 'button')

// Просмотр примеров
mcp_shadcn_get_item_examples_from_registries(['@shadcn'], 'button-demo')
```

### 3. Получение кода компонента:
```typescript
// Просмотр деталей компонента
mcp_shadcn_view_items_in_registries(['@shadcn/button'])

// Получение команды установки
mcp_shadcn_get_add_command_for_items(['@shadcn/button'])
```

## 🎨 Примеры использования

### Кнопки:
```tsx
import { Button } from "@/components/ui/button"

// Различные варианты кнопок
<Button variant="outline">Button</Button>
<Button variant="outline" size="icon" aria-label="Submit">
  <ArrowUpIcon />
</Button>
<Button variant="destructive">Delete</Button>
<Button variant="ghost">Cancel</Button>
```

### Карточки:
```tsx
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"

<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Login to your account</CardTitle>
    <CardDescription>
      Enter your email below to login to your account
    </CardDescription>
  </CardHeader>
  <CardContent>
    <form>
      {/* Форма */}
    </form>
  </CardContent>
  <CardFooter>
    <Button type="submit" className="w-full">
      Login
    </Button>
  </CardFooter>
</Card>
```

### Hover карточки:
```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@username</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex justify-between gap-4">
      <Avatar>
        <AvatarImage src="/avatar.jpg" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@username</h4>
        <p className="text-sm">
          Описание пользователя
        </p>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

## 🔧 MCP Функции

### Доступные команды:
- `mcp_shadcn_get_project_registries()` - получить реестры проекта
- `mcp_shadcn_list_items_in_registries()` - список компонентов
- `mcp_shadcn_search_items_in_registries()` - поиск компонентов
- `mcp_shadcn_view_items_in_registries()` - просмотр деталей
- `mcp_shadcn_get_item_examples_from_registries()` - примеры использования
- `mcp_shadcn_get_add_command_for_items()` - команды установки
- `mcp_shadcn_get_audit_checklist()` - проверка после установки

## 🎯 Интеграция с WeShow Platform

### Уже используемые компоненты:
- ✅ **Button** - кнопки в различных секциях
- ✅ **Card** - карточки команды, услуг, портфолио
- ✅ **Badge** - метки и статусы
- ✅ **Dialog** - модальные окна
- ✅ **Input** - поля форм
- ✅ **Label** - подписи полей

### Потенциальные улучшения:
- 🔄 **HoverCard** - для карточек команды
- 🔄 **Tooltip** - для подсказок
- 🔄 **Progress** - для индикаторов загрузки
- 🔄 **Tabs** - для навигации
- 🔄 **Sheet** - для боковых панелей
- 🔄 **Popover** - для выпадающих элементов

## 🚀 Следующие шаги

### 1. Улучшение существующих компонентов:
- Добавить HoverCard для карточек команды
- Использовать Tooltip для подсказок
- Добавить Progress для индикаторов

### 2. Новые компоненты:
- Tabs для навигации по разделам
- Sheet для мобильного меню
- Popover для дополнительной информации

### 3. Оптимизация:
- Использовать shadcn компоненты везде
- Унифицировать дизайн
- Улучшить доступность

## 📊 Преимущества shadcn MCP

### ✅ Что дает MCP:
- **Быстрый доступ** к компонентам прямо в Cursor
- **Примеры кода** для каждого компонента
- **Автоматическая установка** команд
- **Поиск по названию** и описанию
- **Интеграция с AI** для генерации кода

### 🎨 Качество компонентов:
- **Современный дизайн** - следуют трендам
- **Доступность** - ARIA атрибуты
- **Адаптивность** - работают на всех устройствах
- **Кастомизация** - легко настраиваются
- **TypeScript** - полная типизация

## 🏆 Заключение

**shadcn MCP успешно интегрирован в WeShow Platform!**

Теперь у вас есть:
- 🎨 **423 компонента** для использования
- 🚀 **Быстрый доступ** через MCP
- 📖 **Примеры кода** для каждого компонента
- 🔧 **Автоматическая установка** команд
- 🎯 **Интеграция с AI** для разработки

**Используйте shadcn компоненты для создания современного и красивого UI!** ✨

---

*Настройка завершена: $(date)*  
*Статус: ✅ ГОТОВ К ИСПОЛЬЗОВАНИЮ*  
*Компонентов доступно: 🎨 423*






