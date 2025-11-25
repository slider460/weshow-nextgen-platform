-- Добавляем тестового пользователя для заявок
INSERT INTO users (id, name, email, role, company_name, phone_number) VALUES
('00000000-0000-0000-0000-000000000001', 'Тестовый клиент', 'test@weshow.ru', 'client', 'Тестовая компания', '+7 (999) 123-45-67')
ON CONFLICT (id) DO NOTHING;

-- Сообщение об успешном добавлении
SELECT 'Тестовый пользователь успешно добавлен!' as status;
