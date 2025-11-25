# Превью-изображения для видео

В эту папку нужно загрузить превью-изображения (первый кадр или специально выбранный кадр) для каждого видео.

## Необходимые превью-изображения:

1. **hero-preview.jpg** - Главное видео о проекте
   - Путь: `/portfolio/samara-vdnh/video-previews/hero-preview.jpg`
   - Для видео: `1_.mp4` (главное видео)

2. **screen-sail-preview.jpg** - Экран парус
   - Путь: `/portfolio/samara-vdnh/video-previews/screen-sail-preview.jpg`
   - Для видео: `4_.mp4`

3. **screen-amphitheater-preview.jpg** - Экран амфитеатра
   - Путь: `/portfolio/samara-vdnh/video-previews/screen-amphitheater-preview.jpg`
   - Для видео: `6_.mp4`

4. **kinetic-screen-preview.jpg** - Кинетический экран
   - Путь: `/portfolio/samara-vdnh/video-previews/kinetic-screen-preview.jpg`
   - Для видео: `3_.mp4`

5. **touch-panels-preview.jpg** - Вертикальные тач-панели
   - Путь: `/portfolio/samara-vdnh/video-previews/touch-panels-preview.jpg`
   - Для видео: `5_.mp4`

6. **kinect-preview.jpg** - Горизонтальные тач-панели с Kinect
   - Путь: `/portfolio/samara-vdnh/video-previews/kinect-preview.jpg`
   - Для видео: `7_-_.mp4`

7. **transparent-screen-preview.jpg** - Прозрачный экран
   - Путь: `/portfolio/samara-vdnh/video-previews/transparent-screen-preview.jpg`
   - Для видео: `2_.mp4`

8. **rocket-show-preview.jpg** - Видеошоу «Запуск ракеты»
   - Путь: `/portfolio/samara-vdnh/video-previews/rocket-show-preview.jpg`
   - Для видео: `8_.mp4`

9. **reportage-preview.jpg** - Репортажная съемка
   - Путь: `/portfolio/samara-vdnh/video-previews/reportage-preview.jpg`
   - Для видео: `30_-_.mp4`

10. **history-samara-preview.jpg** - Видео "History_Samara.mp4" в карусели метрик
    - Путь: `/portfolio/samara-vdnh/video-previews/history-samara-preview.jpg`
    - Для видео: `History_Samara.mp4` (в разделе "Результаты и достижения")

## Рекомендации по созданию превью:

- Формат: JPG или PNG
- Соотношение сторон: желательно 16:9 (как у видео)
- Размер: рекомендуется 1920x1080px или больше
- Качество: изображение должно быть четким и отражать содержание видео
- Можно использовать первый кадр видео или выбрать наиболее интересный/репрезентативный кадр

## Как создать превью из видео:

1. Откройте видео в видеоплеере (VLC, QuickTime, и т.д.)
2. Найдите нужный кадр (желательно первый или наиболее интересный)
3. Сделайте скриншот этого кадра
4. Сохраните как JPG с соответствующим именем в эту папку

Или используйте инструменты командной строки:
- **ffmpeg**: `ffmpeg -i video.mp4 -ss 00:00:01 -vframes 1 preview.jpg`
- **ImageMagick**: можно для обработки скриншотов

После загрузки всех превью-изображений они будут автоматически отображаться на странице вместо черных квадратов.

