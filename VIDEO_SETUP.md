# 🎥 Настройка видео Showreel

## 📁 Файлы видео

Проект использует два видео файла:

1. **`showreel.mp4`** - основной showreel с лучшими проектами
2. **`samsung-event.mp4`** - видео проекта Samsung "Особенный Новый год"

## ⚠️ Важно

Видео файл **НЕ включен в git** из-за большого размера (295MB > 100MB лимит GitHub).

## 🚀 Установка видео

### **Автоматическая загрузка:**
```bash
# Загрузить основной showreel
curl -L "https://www.dropbox.com/scl/fi/ia60fgempj6mlafdvvbr4/HM_Showreel.mp4?rlkey=d802gdjo6qe28t0olm0g94oys&st=iov0931m&dl=1" -o "public/showreel.mp4"

# Загрузить видео проекта Samsung
curl -L "https://www.dropbox.com/scl/fi/rljujmu5jpotalcme31bv/Samsung-2020.mp4?rlkey=uy7uhib44p8fjc4fys1ykkipj&st=p8dfxzg5&dl=1" -o "public/samsung-event.mp4"
```

### **Ручная загрузка:**
1. Скачайте видео по ссылке: [HM_Showreel.mp4](https://www.dropbox.com/scl/fi/ia60fgempj6mlafdvvbr4/HM_Showreel.mp4?rlkey=d802gdjo6qe28t0olm0g94oys&st=iov0931m&dl=0)
2. Поместите файл в папку `public/` с именем `showreel.mp4`

## 📂 Структура файлов

```
public/
├── showreel.mp4          # Основной showreel (не в git)
├── samsung-event.mp4     # Видео проекта Samsung (не в git)
├── favicon.ico
├── placeholder.svg
└── robots.txt
```

## 🔧 Использование

После загрузки видео:
- Страница `/showreel` будет отображать видео плеер
- Кнопка "Смотреть шоурил" в портфолио будет работать
- Все ссылки на Samsung проект настроены

## 🌐 Доступ

- **Локально:** `http://localhost:8086/showreel`
- **В сети:** `http://192.168.1.54:8086/showreel`

## 📱 Функции видео плеера

- ✅ Воспроизведение/пауза
- ✅ Громкость/мут
- ✅ Прогресс бар
- ✅ Полноэкранный режим
- ✅ Перемотка
- ✅ Автоскрытие контролов
- ✅ Адаптивный дизайн

## 🚀 Готово!

После загрузки видео все функции будут работать корректно!
