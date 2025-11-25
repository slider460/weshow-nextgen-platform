-- Проверяем пользователей в базе данных
SELECT id, name, email, role, company_name, created_at 
FROM users 
ORDER BY created_at;
