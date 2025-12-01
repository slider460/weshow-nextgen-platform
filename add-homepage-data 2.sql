-- Добавляем данные для главной страницы
INSERT INTO homepage_equipment (title, description, icon, gradient, link, is_visible, sort_order) VALUES
('Проекционное оборудование', 'Профессиональные проекторы и экраны для мероприятий', 'Monitor', 'gradient-card-purple', '/equipment/projection', true, 1),
('Звуковое оборудование', 'Микрофоны, колонки и звуковые системы', 'Speaker', 'gradient-card-blue', '/equipment/audio', true, 2),
('Осветительное оборудование', 'Светодиодные панели, прожекторы и эффекты', 'Sun', 'gradient-card-green', '/equipment/lighting', true, 3),
('Видеооборудование', 'Камеры, мониторы и системы видеозаписи', 'Video', 'gradient-card-orange', '/equipment/video', true, 4),
('Интерактивные дисплеи', 'Сенсорные экраны и интерактивные панели', 'Monitor', 'gradient-card-cyan', '/equipment/interactive', true, 5),
('AR/VR оборудование', 'Очки виртуальной реальности и AR системы', 'Eye', 'gradient-card-purple', '/equipment/ar-vr', true, 6);
