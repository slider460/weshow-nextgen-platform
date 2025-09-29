-- Очистка всех логотипов из базы данных
-- ВНИМАНИЕ: Этот скрипт удалит ВСЕ логотипы без возможности восстановления!

-- Проверяем количество логотипов перед удалением
SELECT 
  COUNT(*) as total_logos,
  COUNT(CASE WHEN is_active = true THEN 1 END) as active_logos,
  COUNT(CASE WHEN is_active = false THEN 1 END) as inactive_logos
FROM logos;

-- Удаляем все логотипы
DELETE FROM logos;

-- Проверяем результат
SELECT 
  COUNT(*) as remaining_logos
FROM logos;

-- Сбрасываем счетчик автоинкремента (если используется)
-- ALTER SEQUENCE logos_id_seq RESTART WITH 1;

-- Показываем статистику
SELECT 
  'Очистка завершена' as status,
  'Все логотипы удалены из базы данных' as message;
