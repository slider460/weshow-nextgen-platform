# 📦 Компоненты из @react-bits

Все анимационные компоненты на сайте установлены из официального реестра **@react-bits** через **shadcn MCP**.

## ✅ Установленные компоненты

### 1. **AnimatedContent** (`AnimatedContent-TS-TW`)
**Источник:** `@react-bits/AnimatedContent-TS-TW`  
**Файл:** `src/components/AnimatedContent.tsx`

Обертка, которая анимирует любые дочерние элементы при скролле или монтировании с настраиваемым направлением, расстоянием, длительностью и easing.

**Использование:**
```tsx
import AnimatedContent from "../components/AnimatedContent";

<AnimatedContent distance={80} delay={0.4}>
  <h1>Заголовок</h1>
</AnimatedContent>
```

**Пропсы:**
- `distance` - расстояние анимации (по умолчанию: 100)
- `direction` - направление: 'vertical' | 'horizontal' (по умолчанию: 'vertical')
- `reverse` - обратное направление (по умолчанию: false)
- `duration` - длительность анимации (по умолчанию: 0.8)
- `ease` - функция easing (по умолчанию: 'power3.out')
- `delay` - задержка перед началом (по умолчанию: 0)
- `threshold` - порог срабатывания (по умолчанию: 0.1)

**Зависимости:** `gsap`, `gsap/ScrollTrigger`

---

### 2. **Card** (shadcn/ui)
**Источник:** `shadcn/ui`  
**Файл:** `src/components/ui/card.tsx`

Стандартные карточки из shadcn/ui с поддержкой различных вариантов.

**Использование:**
```tsx
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

<Card className="hover:shadow-xl transition-all duration-500">
  <CardHeader>
    <CardTitle>Заголовок карточки</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Содержимое карточки</p>
  </CardContent>
</Card>
```

**Компоненты:**
- `Card` - основная карточка
- `CardHeader` - заголовок карточки
- `CardTitle` - заголовок
- `CardDescription` - описание
- `CardContent` - содержимое
- `CardFooter` - подвал

**Зависимости:** нет

---

### 3. **GradientText** (`GradientText-TS-TW`)
**Источник:** `@react-bits/GradientText-TS-TW`  
**Файл:** `src/components/GradientText.tsx`

Анимированный градиентный текст с настраиваемыми цветами и скоростью анимации.

**Использование:**
```tsx
import GradientText from "../components/GradientText";

<GradientText 
  colors={['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899']}
  animationSpeed={12}
>
  О WESHOW
</GradientText>
```

**Пропсы:**
- `children` - текст для отображения
- `colors` - массив цветов для градиента (по умолчанию: ['#ffaa40', '#9c40ff', '#ffaa40'])
- `animationSpeed` - скорость анимации в секундах (по умолчанию: 8)
- `showBorder` - показать анимированную границу (по умолчанию: false)
- `className` - дополнительные CSS классы

**Зависимости:** нет (использует CSS анимации)

**Требования к Tailwind:**
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 8s linear infinite'
      },
    },
  },
};
```

---

## 📝 Примеры использования

### Страница "О нас" (`/about`)
```tsx
// Hero Section
<AnimatedContent distance={80} delay={0.4}>
  <h1 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
    <GradientText 
      colors={['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899']}
      animationSpeed={12}
    >
      О WESHOW
    </GradientText>
  </h1>
</AnimatedContent>

// Mission Section
<AnimatedContent distance={80} delay={0.2}>
  <Card className="group hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-slate-200">
    <CardContent className="text-center p-6">
      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl">
        <Users className="h-10 w-10 text-white" />
      </div>
      <h3 className="text-3xl font-bold text-slate-900 mb-2">500+</h3>
      <p className="text-slate-600 font-medium">Клиентов</p>
    </CardContent>
  </Card>
</AnimatedContent>
```

### Страница "Аренда оборудования" (`/services/equipment-rental`)
```tsx
<GradientText 
  colors={['#1e293b', '#475569', '#64748b']}
  animationSpeed={8}
>
  Аренда профессионального оборудования
</GradientText>
```

---

## 🔧 Установка новых компонентов

Для установки новых компонентов из @react-bits используйте:

```bash
bunx shadcn@latest add @react-bits/ComponentName-TS-TW --yes
```

Примеры:
```bash
# Установить AnimatedContent
bunx shadcn@latest add @react-bits/AnimatedContent-TS-TW --yes

# Установить SpotlightCard
bunx shadcn@latest add @react-bits/SpotlightCard-TS-TW --yes

# Установить GradientText
bunx shadcn@latest add @react-bits/GradientText-TS-TW --yes
```

---

## 📚 Дополнительные ресурсы

- **Официальный сайт:** https://reactbits.dev
- **Реестр компонентов:** https://reactbits.dev/r/
- **Документация shadcn:** https://ui.shadcn.com

---

## ⚠️ Важно

**Все компоненты должны быть установлены только через MCP из @react-bits!**

❌ **НЕ создавайте компоненты вручную**  
✅ **Используйте только `bunx shadcn@latest add @react-bits/...`**

Это гарантирует:
- Актуальность кода
- Правильные зависимости
- Официальную поддержку
- Единообразие кодовой базы

