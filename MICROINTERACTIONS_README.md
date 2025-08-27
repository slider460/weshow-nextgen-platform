# Микро-взаимодействия и анимации WESHOW

## 🎯 Обзор

Проект WESHOW теперь включает комплексную систему микро-взаимодействий, анимаций и кастомный курсор, которые делают интерфейс более живым, отзывчивым и приятным в использовании.

## ✨ Основные возможности

### 🎨 Микро-взаимодействия
- **Плавные переходы цветов** при наведении
- **Эффекты вспышки** при нажатии (ripple эффект)
- **Анимации появления** элементов при прокрутке
- **Hover эффекты** для карточек, кнопок и ссылок

### 🚀 Анимации при прокрутке
- **Intersection Observer API** для эффективного срабатывания
- **Различные направления** появления (слева, справа, снизу, сверху)
- **Каскадные анимации** для списков элементов
- **Настраиваемые задержки** и продолжительность

## 🛠️ Компоненты



### AnimatedButton
Кнопка с множественными эффектами:

```tsx
import AnimatedButton from '@/components/AnimatedButton';

<AnimatedButton 
  variant="gradient"
  hoverEffect="lift"
  glow={true}
  icon={<Zap className="w-4 h-4" />}
  ripple={true}
>
  Нажми меня
</AnimatedButton>
```

**Варианты:**
- `variant`: `default`, `gradient`, `outline`, `ghost`
- `hoverEffect`: `scale`, `lift`, `slide`, `rotate`
- `glow`: эффект свечения при наведении
- `ripple`: эффект пульсации при нажатии

### useScrollAnimation
Хук для анимации при прокрутке:

```tsx
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const MyComponent = () => {
  const animation = useScrollAnimation({
    delay: 200,
    duration: 600,
    threshold: 0.1
  });

  return (
    <div ref={animation.elementRef} style={animation.animationStyle}>
      Анимированный контент
    </div>
  );
};
```

**Опции:**
- `delay`: задержка перед анимацией
- `duration`: продолжительность анимации
- `threshold`: порог срабатывания
- `triggerOnce`: срабатывать только один раз

## 🎭 Типы анимаций

### 1. Появление элементов
```css
/* Fade in с масштабированием */
@keyframes fade-in-scale {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fade-in-scale {
  animation: fade-in-scale 0.6s ease-out;
}
```

### 2. Hover эффекты
```css
/* Подъем карточки */
.card-hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Масштабирование */
.card-hover-scale:hover {
  transform: scale(1.02);
}
```

### 3. Эффекты для кнопок
```css
/* Подъем */
.btn-hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Свечение */
.btn-hover-glow:hover {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}
```

### 4. Эффекты для ссылок
```css
/* Подчеркивание */
.link-hover-slide::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
}

.link-hover-slide:hover::after {
  width: 100%;
}
```

## 🔧 Настройка и кастомизация

### CSS переменные
```css
:root {
  --animation-duration: 0.3s;
  --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --hover-transform: translateY(-2px);
  --hover-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
```

### Кастомные анимации
```css
@keyframes custom-bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.custom-bounce {
  animation: custom-bounce 2s ease-in-out infinite;
}
```

### Tailwind CSS утилиты
```tsx
// Плавные переходы
<div className="transition-all duration-300 ease-out hover:scale-105">
  Контент с анимацией
</div>

// Кастомные анимации
<div className="animate-float">
  Плавающий элемент
</div>
```

## 📱 Адаптивность

### Мобильные устройства
- **Упрощенные анимации** для экономии батареи
- **Touch-friendly** эффекты
- **Оптимизированная производительность**

### Планшеты
- **Средний уровень** детализации анимаций
- **Баланс** между красотой и производительностью

### Десктоп
- **Полный набор** анимаций и эффектов
- **Высокая детализация** курсора и следов
- **Продвинутые** hover эффекты

## ⚡ Производительность

### Оптимизации
1. **CSS Transforms** вместо изменения layout свойств
2. **Intersection Observer** для эффективного срабатывания
3. **RequestAnimationFrame** для плавности
4. **GPU ускорение** для сложных анимаций

### Мониторинг
```tsx
// Проверка производительности
const checkPerformance = () => {
  const start = performance.now();
  // Анимация
  const end = performance.now();
  console.log(`Анимация заняла: ${end - start}ms`);
};
```

### Fallback для слабых устройств
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Упрощенные анимации
  element.style.transition = 'none';
}
```

## 🎨 Дизайн-система

### Цветовая палитра анимаций
```css
/* Основные цвета */
--animation-blue: #3b82f6;
--animation-purple: #8b5cf6;
--animation-green: #10b981;
--animation-orange: #f59e0b;

/* Градиенты */
--gradient-primary: linear-gradient(135deg, #3b82f6, #8b5cf6);
--gradient-secondary: linear-gradient(135deg, #10b981, #3b82f6);
```

### Типографика
```css
/* Анимации для текста */
.text-hover-glow:hover {
  text-shadow: 0 0 10px currentColor;
}

.text-animate-in {
  animation: slideInUp 0.6s ease-out;
}
```

### Тени и свечения
```css
/* Динамические тени */
.shadow-hover {
  transition: box-shadow 0.3s ease;
}

.shadow-hover:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Свечения */
.glow-blue:hover {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}
```

## 🧪 Тестирование

### Браузерная поддержка
- ✅ **Chrome 60+**
- ✅ **Firefox 55+**
- ✅ **Safari 12+**
- ✅ **Edge 79+**

### Тестирование производительности
```bash
# Lighthouse тест
npm run lighthouse

# WebPageTest
npm run webpagetest

# Bundle анализатор
npm run analyze
```

### A/B тестирование
```tsx
const useABTest = (variant: 'control' | 'test') => {
  const animations = variant === 'test' ? enhancedAnimations : basicAnimations;
  return animations;
};
```

## 📚 Примеры использования

### Карточка продукта
```tsx
const ProductCard = ({ product }) => {
  const animation = useScrollAnimation({ delay: 200 });
  
  return (
    <article 
      ref={animation.elementRef}
      style={animation.animationStyle}
      className="card-hover-lift group cursor-pointer"
    >
      <div className="img-hover-zoom">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <AnimatedButton variant="outline" hoverEffect="scale">
          Подробнее
        </AnimatedButton>
      </div>
    </article>
  );
};
```

### Навигационное меню
```tsx
const NavigationMenu = () => {
  return (
    <nav className="flex space-x-6">
      {menuItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="link-hover-slide text-slate-600 hover:text-blue-600 transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
```

### Модальное окно
```tsx
const Modal = ({ isOpen, onClose, children }) => {
  const animation = useScrollAnimation({ 
    triggerOnce: false,
    duration: 300 
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div 
        ref={animation.elementRef}
        style={animation.animationStyle}
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4"
      >
        {children}
        <AnimatedButton onClick={onClose} variant="outline">
          Закрыть
        </AnimatedButton>
      </div>
    </div>
  );
};
```

## 🚀 Развертывание

### Сборка
```bash
# Продакшн сборка
npm run build

# Анализ размера бандла
npm run analyze

# Тестирование производительности
npm run lighthouse
```

### Мониторинг
```bash
# Мониторинг Core Web Vitals
npm run vitals

# Анализ производительности
npm run perf
```

## 🔮 Планы развития

### Краткосрочные (1-2 месяца)
- [ ] **Lottie анимации** для сложных эффектов
- [ ] **Spring анимации** для физически корректных движений
- [ ] **Анимации для форм** валидации и отправки

### Среднесрочные (3-6 месяцев)
- [ ] **WebGL эффекты** для фоновых анимаций
- [ ] **Параллакс эффекты** для глубины
- [ ] **Анимации для темной темы**

### Долгосрочные (6+ месяцев)
- [ ] **AI-генерируемые анимации** на основе контента
- [ ] **Персонализированные** анимации для пользователей
- [ ] **Интеграция с WebXR** для AR/VR

## 🤝 Поддержка

### Документация
- [MDN Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

### Сообщество
- GitHub Issues для багов
- GitHub Discussions для вопросов
- Discord сервер для общения

### Лицензия
MIT License - свободное использование и модификация
