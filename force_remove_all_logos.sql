-- ПРИНУДИТЕЛЬНОЕ УДАЛЕНИЕ ВСЕХ ЛОГОТИПОВ
-- ВНИМАНИЕ: Этот скрипт удалит ВСЕ логотипы из базы данных навсегда!

-- 1. Показываем все логотипы перед удалением
SELECT 
  'ЛОГОТИПЫ ДО УДАЛЕНИЯ' as status,
  COUNT(*) as total_count,
  COUNT(CASE WHEN is_active = true THEN 1 END) as active_count,
  COUNT(CASE WHEN is_active = false THEN 1 END) as inactive_count
FROM logos;

-- 2. Показываем детальную информацию о логотипах
SELECT 
  id,
  name,
  category,
  is_active,
  created_at,
  updated_at
FROM logos
ORDER BY created_at DESC;

-- 3. ПРИНУДИТЕЛЬНО УДАЛЯЕМ ВСЕ ЛОГОТИПЫ
DELETE FROM logos;

-- 4. Проверяем результат удаления
SELECT 
  'ЛОГОТИПЫ ПОСЛЕ УДАЛЕНИЯ' as status,
  COUNT(*) as remaining_count
FROM logos;

-- 5. Сбрасываем счетчик автоинкремента (если используется)
-- ALTER SEQUENCE logos_id_seq RESTART WITH 1;

-- 6. Финальная проверка
SELECT 
  'УДАЛЕНИЕ ЗАВЕРШЕНО' as status,
  'Все логотипы удалены из базы данных' as message,
  'Админ-панель теперь пуста' as result,
  'Можно добавлять новые логотипы' as next_step;
