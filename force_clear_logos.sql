-- ПРИНУДИТЕЛЬНАЯ ОЧИСТКА ВСЕХ ЛОГОТИПОВ
-- ВНИМАНИЕ: Этот скрипт удалит ВСЕ логотипы без возможности восстановления!

-- 1. Проверяем текущее состояние
SELECT 
  'ДО ОЧИСТКИ' as status,
  COUNT(*) as total_logos,
  COUNT(CASE WHEN is_active = true THEN 1 END) as active_logos,
  COUNT(CASE WHEN is_active = false THEN 1 END) as inactive_logos
FROM logos;

-- 2. Показываем все логотипы перед удалением
SELECT 
  id,
  name,
  category,
  is_active,
  created_at
FROM logos
ORDER BY created_at DESC;

-- 3. УДАЛЯЕМ ВСЕ ЛОГОТИПЫ
DELETE FROM logos;

-- 4. Проверяем результат удаления
SELECT 
  'ПОСЛЕ ОЧИСТКИ' as status,
  COUNT(*) as remaining_logos
FROM logos;

-- 5. Сбрасываем счетчик автоинкремента (если используется)
-- ALTER SEQUENCE logos_id_seq RESTART WITH 1;

-- 6. Финальная проверка
SELECT 
  'ОЧИСТКА ЗАВЕРШЕНА' as status,
  'Все логотипы удалены из базы данных' as message,
  'Теперь можно добавлять новые логотипы' as next_step;
