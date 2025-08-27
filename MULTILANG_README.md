# Многоязычность и система подписки WESHOW

## Обзор

Проект WESHOW теперь поддерживает многоязычность (русский и английский) и включает интегрированную систему подписки на новости с CRM-интеграцией.

## 🚀 Возможности

### Многоязычность
- **Поддерживаемые языки**: Русский (ru) и Английский (en)
- **Автоматическое переключение** с сохранением выбора в localStorage
- **Переводы для всех основных элементов** интерфейса
- **Компонент переключения языков** с флагами и анимацией

### Система подписки
- **Интеграция с CRM** (готово для подключения реальных систем)
- **Сегментация аудитории** по языкам и категориям
- **Управление кампаниями** рассылок
- **Статистика и аналитика** подписчиков
- **API для внешних интеграций**

### Расширенный блог
- **Новые категории**: AI, XR, Устойчивость, Дизайн
- **15+ экспертных статей** с современным дизайном
- **Система тегов и фильтрации**
- **Интеграция с системой подписки**

## 📁 Структура файлов

```
src/
├── contexts/
│   └── LanguageContext.tsx          # Контекст для управления языком
├── components/
│   ├── LanguageSwitcher.tsx         # Переключатель языков
│   ├── NewsletterSubscription.tsx   # Компонент подписки
│   └── NewsletterStats.tsx          # Статистика подписчиков
├── api/
│   └── newsletter.ts                 # API для работы с подписками
└── pages/
    └── Blog.tsx                     # Обновленная страница блога
```

## 🔧 Установка и настройка

### 1. Зависимости

Все необходимые зависимости уже включены в проект:
- React Context API для управления состоянием
- Lucide React для иконок
- shadcn/ui компоненты

### 2. Интеграция в App.tsx

```tsx
import { LanguageProvider } from "./contexts/LanguageContext";

const App = () => (
  <LanguageProvider>
    <BrowserRouter>
      {/* Ваши роуты */}
    </BrowserRouter>
  </LanguageProvider>
);
```

### 3. Использование в компонентах

```tsx
import { useLanguage } from "@/contexts/LanguageContext";

const MyComponent = () => {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <LanguageSwitcher 
        currentLanguage={language}
        onLanguageChange={setLanguage}
      />
    </div>
  );
};
```

## 🌐 Добавление новых переводов

### 1. Обновление LanguageContext.tsx

```tsx
const translations = {
  ru: {
    'new.key': 'Новый перевод на русском',
    // ... другие переводы
  },
  en: {
    'new.key': 'New translation in English',
    // ... другие переводы
  }
};
```

### 2. Использование в компонентах

```tsx
{t('new.key')}
```

## 📧 Система подписки

### 1. Основные функции API

```tsx
import { useNewsletterAPI } from '@/api/newsletter';

const { 
  subscribe,           // Подписка на новости
  unsubscribe,         // Отписка
  updatePreferences,   // Обновление предпочтений
  getSubscriberStats,  // Получение статистики
  createCampaign,      // Создание кампании
  sendCampaign,        // Отправка кампании
  segmentAudience      // Сегментация аудитории
} = useNewsletterAPI();
```

### 2. Подписка пользователя

```tsx
const result = await subscribe({
  email: 'user@example.com',
  language: 'ru',
  categories: ['ai', 'xr', 'design']
});
```

### 3. Создание кампании

```tsx
const campaign = await createCampaign({
  title: 'Новые технологии AI',
  content: 'Содержание письма...',
  subject: 'Тема письма',
  targetAudience: {
    categories: ['ai'],
    languages: ['ru'],
    segments: ['active']
  }
});
```

## 🎨 Компоненты

### LanguageSwitcher

Переключатель языков с флагами и анимацией:

```tsx
<LanguageSwitcher 
  currentLanguage={language}
  onLanguageChange={setLanguage}
/>
```

### NewsletterSubscription

Компонент подписки с тремя вариантами:

```tsx
// Компактный вариант
<NewsletterSubscription variant="compact" />

// Герой-вариант
<NewsletterSubscription variant="hero" />

// По умолчанию
<NewsletterSubscription />
```

### NewsletterStats

Отображение статистики подписчиков:

```tsx
<NewsletterStats />
```

## 🔌 CRM интеграция

### 1. Подключение реальной CRM

В файле `src/api/newsletter.ts` раскомментируйте и настройте:

```tsx
// Интеграция с реальной CRM системой
await this.integrateWithCRM(subscriber);
await this.updateCRMStatus(subscriberId, isActive);
await this.createCRMCampaign(campaign);
```

### 2. Поддерживаемые CRM системы

- **HubSpot**: REST API интеграция
- **Salesforce**: SOAP/REST API
- **Pipedrive**: REST API
- **AmoCRM**: REST API
- **Bitrix24**: REST API

### 3. Настройка webhook'ов

```tsx
// Пример webhook для обновлений
const webhookUrl = 'https://your-crm.com/webhook/newsletter';
await fetch(webhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(subscriberData)
});
```

## 📊 Статистика и аналитика

### 1. Метрики подписчиков

- Общее количество подписчиков
- Активные подписчики
- Распределение по языкам
- Популярные категории

### 2. Метрики кампаний

- Количество отправленных писем
- Доставка
- Открытия
- Клики
- Отписки

### 3. Сегментация аудитории

```tsx
const segments = await segmentAudience({
  categories: ['ai'],
  languages: ['ru'],
  activity: 'active'
});
```

## 🚀 Развертывание

### 1. Сборка проекта

```bash
npm run build
```

### 2. Переменные окружения

Создайте `.env.local`:

```env
# CRM интеграция
CRM_API_URL=https://your-crm.com/api
CRM_API_KEY=your_api_key
CRM_WEBHOOK_SECRET=your_webhook_secret

# Email сервис
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your_sendgrid_key
```

### 3. Настройка lovable.dev

1. Подключите GitHub репозиторий
2. Настройте автоматическую сборку
3. Укажите переменные окружения

## 🧪 Тестирование

### 1. Тестирование переводов

```tsx
// Проверка переключения языков
const { language, setLanguage } = useLanguage();
setLanguage('en');
// Проверить, что интерфейс переключился на английский
```

### 2. Тестирование подписки

```tsx
// Тест подписки
const result = await subscribe({
  email: 'test@example.com',
  language: 'ru',
  categories: ['ai']
});
console.log(result.success); // true
```

### 3. Тестирование API

```tsx
// Тест статистики
const stats = await getSubscriberStats();
console.log(stats.total); // количество подписчиков
```

## 🔧 Устранение неполадок

### 1. Переводы не работают

- Проверьте, что `LanguageProvider` обертывает приложение
- Убедитесь, что `useLanguage` используется в компоненте
- Проверьте консоль на ошибки

### 2. Подписка не работает

- Проверьте консоль на ошибки API
- Убедитесь, что email валиден
- Проверьте подключение к CRM (если настроено)

### 3. Статистика не загружается

- Проверьте, что API функции работают
- Убедитесь, что есть подписчики для отображения
- Проверьте консоль на ошибки

## 📈 Планы развития

### Краткосрочные (1-2 месяца)
- [ ] Добавление французского языка
- [ ] Интеграция с Mailchimp
- [ ] A/B тестирование кампаний

### Среднесрочные (3-6 месяцев)
- [ ] Автоматические email последовательности
- [ ] Аналитика поведения пользователей
- [ ] Интеграция с Google Analytics

### Долгосрочные (6+ месяцев)
- [ ] AI-рекомендации контента
- [ ] Персонализация на основе поведения
- [ ] Мультиканальные кампании

## 🤝 Поддержка

Для вопросов и поддержки:
- Создайте issue в GitHub репозитории
- Обратитесь к команде разработки
- Проверьте документацию API

## 📄 Лицензия

Проект использует MIT лицензию. См. файл LICENSE для деталей.
