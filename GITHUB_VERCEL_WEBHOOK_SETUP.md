# 🔧 НАСТРОЙКА WEBHOOK GITHUB → VERCEL

## 🚨 **ПРОБЛЕМА НАЙДЕНА**
Webhook между GitHub и Vercel НЕ НАСТРОЕН! Поэтому новые коммиты не запускают автодеплой.

## ✅ **РЕШЕНИЕ: Настройка Webhook**

### **ШАГ 1: Зайти в настройки GitHub**
1. Открыть https://github.com/slider460/weshow-nextgen-platform
2. Перейти в **Settings** (вкладка справа)
3. В левом меню выбрать **Webhooks**
4. Нажать **"Add webhook"**

### **ШАГ 2: Настроить Webhook**
Заполнить поля:
- **Payload URL:** `https://vercel.com/webhooks/github`
- **Content type:** `application/json`
- **Secret:** (оставить пустым)
- **Events:** Выбрать "Let me select individual events"
  - ✅ Push
  - ✅ Pull requests
- **Active:** ✅ (галочка должна стоять)

### **ШАГ 3: Сохранить**
Нажать **"Add webhook"**

### **ШАГ 4: Проверить работу**
1. Создать тестовый коммит:
```bash
echo "<!-- WEBHOOK TEST $(date) -->" >> public/index.html
git add . && git commit -m "🔧 Test webhook"
git push origin main
```

2. Проверить в Vercel Dashboard, появился ли новый деплой

## 🔍 **Альтернативное решение: Переподключение проекта**

Если webhook не помогает, можно переподключить проект:

### **В Vercel Dashboard:**
1. Зайти в настройки проекта `weshow-nextgen-platform`
2. В разделе **"Git"** нажать **"Disconnect"**
3. Нажать **"Connect Git Repository"**
4. Выбрать `slider460/weshow-nextgen-platform`
5. Настроить автодеплой для ветки `main`

## 📊 **Текущий статус**

- **Проблема:** ❌ Webhook не настроен
- **Решение:** ✅ Настройка webhook GitHub → Vercel
- **Время:** 5 минут
- **Приоритет:** 🚨 КРИТИЧЕСКИЙ

## 🎯 **После настройки webhook**

1. ✅ Автодеплой будет работать
2. ✅ Новые коммиты будут автоматически деплоиться
3. ✅ Не нужно будет деплоить вручную

---

**Дата:** 15 января 2025  
**Статус:** 🚨 ТРЕБУЕТСЯ НАСТРОЙКА WEBHOOK
