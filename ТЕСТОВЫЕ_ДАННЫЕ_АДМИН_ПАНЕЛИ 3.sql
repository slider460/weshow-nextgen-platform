-- ===============================================
-- ТЕСТОВЫЕ ДАННЫЕ ДЛЯ АДМИН ПАНЕЛИ
-- Основано на данных из AdminContext и AdminDashboard
-- ===============================================

-- 1. ОЧИЩАЕМ СУЩЕСТВУЮЩИЕ ТЕСТОВЫЕ ДАННЫЕ
-- ===============================================

-- Удаляем тестовые данные (осторожно!)
DELETE FROM estimate_items WHERE estimate_id IN (
    SELECT id FROM estimates WHERE title LIKE 'Тестовая заявка%'
);
DELETE FROM estimate_equipment WHERE estimate_id IN (
    SELECT id FROM estimates WHERE title LIKE 'Тестовая заявка%'
);
DELETE FROM estimates WHERE title LIKE 'Тестовая заявка%';
DELETE FROM equipment_catalog WHERE name LIKE 'Тестовое оборудование%';
DELETE FROM portfolio_items WHERE title LIKE 'Тестовый проект%';

-- 2. СОЗДАЕМ ТЕСТОВЫХ ПОЛЬЗОВАТЕЛЕЙ
-- ===============================================

INSERT INTO users (name, email, phone, company_name, role, is_active, email_verified)
VALUES 
    (
        'Иван Петров',
        'ivan.petrov@example.com',
        '+7 (999) 123-45-67',
        'ООО "ТехноМир"',
        'client',
        true,
        true
    ),
    (
        'Мария Сидорова',
        'maria.sidorova@example.com',
        '+7 (999) 234-56-78',
        'ИП "Сидорова М.А."',
        'client',
        true,
        true
    ),
    (
        'Александр Козлов',
        'alex.kozlov@example.com',
        '+7 (999) 345-67-89',
        'ООО "Козлов и Партнеры"',
        'client',
        true,
        true
    ),
    (
        'Елена Волкова',
        'elena.volkova@example.com',
        '+7 (999) 456-78-90',
        'АО "Волкова Групп"',
        'client',
        true,
        true
    ),
    (
        'Дмитрий Соколов',
        'dmitry.sokolov@example.com',
        '+7 (999) 567-89-01',
        'ООО "Соколов Проекты"',
        'client',
        true,
        true
    )
ON CONFLICT (email) DO UPDATE SET
    name = EXCLUDED.name,
    phone = EXCLUDED.phone,
    company_name = EXCLUDED.company_name,
    updated_at = NOW();

-- 3. СОЗДАЕМ ТЕСТОВЫХ АДМИНОВ
-- ===============================================

INSERT INTO admin_users (user_id, username, email, role, permissions, is_active)
VALUES 
    (
        (SELECT id FROM users WHERE email = 'admin@weshow.su' LIMIT 1),
        'admin',
        'admin@weshow.su',
        'super_admin',
        ARRAY['read', 'write', 'delete', 'manage_users'],
        true
    ),
    (
        (SELECT id FROM users WHERE email = 'ivan.petrov@example.com' LIMIT 1),
        'moderator1',
        'moderator1@weshow.su',
        'moderator',
        ARRAY['read', 'write'],
        true
    )
ON CONFLICT (email) DO UPDATE SET
    username = EXCLUDED.username,
    role = EXCLUDED.role,
    permissions = EXCLUDED.permissions,
    updated_at = NOW();

-- 4. СОЗДАЕМ ТЕСТОВОЕ ОБОРУДОВАНИЕ
-- ===============================================

INSERT INTO equipment_catalog (name, category, brand, model, description, specifications, pricing, availability, media, requirements, tags, rating, is_active, featured)
VALUES 
    (
        'LED-экран P3 Indoor',
        'led-displays',
        'Absen',
        'A3 Pro',
        'Высококачественный LED-экран для внутренних мероприятий с пиксельным шагом 3мм',
        '{"pixel_pitch": "3mm", "brightness": "1200 nits", "viewing_angle": "160°", "refresh_rate": "3840Hz", "module_size": "576x576mm"}',
        '{"daily_rate": 3500, "weekly_rate": 20000, "monthly_rate": 70000, "setup_fee": 15000, "delivery_fee": 5000}',
        '{"total": 50, "available": 42, "reserved": 8, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400", "/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200", "videos": []}',
        '{"power": "220В, 300Вт на модуль", "space": "0.33м² на модуль", "setup": "Требуется ровная поверхность"}',
        ARRAY['led', 'экран', 'indoor', 'высокое разрешение'],
        '{"average": 4.8, "count": 124}',
        true,
        true
    ),
    (
        'LED-экран P6 Outdoor',
        'led-displays',
        'Absen',
        'A6 Pro',
        'LED-экран для наружного использования с высокой яркостью',
        '{"pixel_pitch": "6mm", "brightness": "8000 nits", "viewing_angle": "120°", "refresh_rate": "1920Hz", "module_size": "960x960mm"}',
        '{"daily_rate": 2800, "weekly_rate": 16000, "monthly_rate": 55000, "setup_fee": 12000, "delivery_fee": 4000}',
        '{"total": 30, "available": 25, "reserved": 5, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400", "/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200", "videos": []}',
        '{"power": "220В, 500Вт на модуль", "space": "0.92м² на модуль", "setup": "Водонепроницаемая конструкция"}',
        ARRAY['led', 'экран', 'outdoor', 'высокая яркость'],
        '{"average": 4.6, "count": 89}',
        true,
        true
    ),
    (
        'Проектор 4K UHD',
        'projectors',
        'Sony',
        'VPL-FHZ75',
        'Профессиональный 4K лазерный проектор для мероприятий',
        '{"resolution": "4096x2160", "brightness": "7000 lumens", "contrast": "2000000:1", "lens": "Zoom 1.6x"}',
        '{"daily_rate": 8000, "weekly_rate": 45000, "monthly_rate": 150000, "setup_fee": 8000, "delivery_fee": 3000}',
        '{"total": 15, "available": 12, "reserved": 3, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200", "videos": []}',
        '{"power": "220В, 550Вт", "space": "Требуется 2м расстояние", "setup": "Потолочное крепление"}',
        ARRAY['проектор', '4k', 'лазерный', 'профессиональный'],
        '{"average": 4.9, "count": 67}',
        true,
        false
    ),
    (
        'Звуковая система Line Array',
        'audio',
        'JBL',
        'VTX A12',
        'Профессиональная линейная акустическая система',
        '{"frequency_response": "45Hz-20kHz", "max_spl": "141dB", "coverage": "120°x15°", "power": "2000W RMS"}',
        '{"daily_rate": 12000, "weekly_rate": 70000, "monthly_rate": 250000, "setup_fee": 10000, "delivery_fee": 5000}',
        '{"total": 8, "available": 6, "reserved": 2, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200", "videos": []}',
        '{"power": "220В, 2000Вт", "space": "Требуется 4м высота", "setup": "Триподы или подвес"}',
        ARRAY['звук', 'line array', 'профессиональный', 'jbl'],
        '{"average": 4.7, "count": 45}',
        true,
        false
    )
ON CONFLICT (name) DO UPDATE SET
    category = EXCLUDED.category,
    brand = EXCLUDED.brand,
    model = EXCLUDED.model,
    description = EXCLUDED.description,
    specifications = EXCLUDED.specifications,
    pricing = EXCLUDED.pricing,
    availability = EXCLUDED.availability,
    updated_at = NOW();

-- 5. СОЗДАЕМ ТЕСТОВЫЕ ЗАЯВКИ
-- ===============================================

INSERT INTO estimates (user_id, title, description, event_date, event_location, status, total_amount, notes)
VALUES 
    (
        (SELECT id FROM users WHERE email = 'ivan.petrov@example.com' LIMIT 1),
        'Корпоративное мероприятие "ТехноМир 2024"',
        'Требуется полное техническое оснащение для корпоративного мероприятия на 200 человек',
        '2024-12-25',
        'Москва, Крокус Экспо',
        'pending_review',
        450000.00,
        'Клиент просит срочно рассмотреть заявку. Возможны дополнительные услуги.'
    ),
    (
        (SELECT id FROM users WHERE email = 'maria.sidorova@example.com' LIMIT 1),
        'Выставка "Инновации 2024"',
        'LED-экраны и звуковое оборудование для выставочного стенда',
        '2024-12-26',
        'Санкт-Петербург, Ленэкспо',
        'confirmed',
        280000.00,
        'Заявка подтверждена, требуется подготовка оборудования.'
    ),
    (
        (SELECT id FROM users WHERE email = 'alex.kozlov@example.com' LIMIT 1),
        'Конференция IT-специалистов',
        'Оборудование для конференц-зала: проекторы, звук, LED-экраны',
        '2024-12-27',
        'Москва, ЦМТ',
        'draft',
        320000.00,
        'Черновик заявки, ожидает доработки от клиента.'
    ),
    (
        (SELECT id FROM users WHERE email = 'elena.volkova@example.com' LIMIT 1),
        'Презентация нового продукта',
        'LED-видеостена 4x3 метра + звуковая система',
        '2024-12-28',
        'Москва, отель Метрополь',
        'pending_review',
        180000.00,
        'Клиент рассматривает несколько вариантов.'
    ),
    (
        (SELECT id FROM users WHERE email = 'dmitry.sokolov@example.com' LIMIT 1),
        'Свадебное торжество',
        'Световое и звуковое оформление свадьбы',
        '2024-12-29',
        'Московская область, загородный клуб',
        'confirmed',
        95000.00,
        'Заявка подтверждена, дата фиксированная.'
    )
ON CONFLICT DO NOTHING;

-- 6. СОЗДАЕМ ПОЗИЦИИ В ЗАЯВКАХ
-- ===============================================

-- Позиции для первой заявки
INSERT INTO estimate_items (estimate_id, equipment_id, quantity, price_at_creation)
SELECT 
    e.id,
    eq.id,
    2,
    (eq.pricing->>'daily_rate')::decimal
FROM estimates e
CROSS JOIN equipment_catalog eq
WHERE e.title = 'Корпоративное мероприятие "ТехноМир 2024"'
    AND eq.name = 'LED-экран P3 Indoor'
UNION ALL
SELECT 
    e.id,
    eq.id,
    1,
    (eq.pricing->>'daily_rate')::decimal
FROM estimates e
CROSS JOIN equipment_catalog eq
WHERE e.title = 'Корпоративное мероприятие "ТехноМир 2024"'
    AND eq.name = 'Проектор 4K UHD'
UNION ALL
SELECT 
    e.id,
    eq.id,
    1,
    (eq.pricing->>'daily_rate')::decimal
FROM estimates e
CROSS JOIN equipment_catalog eq
WHERE e.title = 'Корпоративное мероприятие "ТехноМир 2024"'
    AND eq.name = 'Звуковая система Line Array';

-- Позиции для второй заявки
INSERT INTO estimate_items (estimate_id, equipment_id, quantity, price_at_creation)
SELECT 
    e.id,
    eq.id,
    1,
    (eq.pricing->>'daily_rate')::decimal
FROM estimates e
CROSS JOIN equipment_catalog eq
WHERE e.title = 'Выставка "Инновации 2024"'
    AND eq.name = 'LED-экран P6 Outdoor'
UNION ALL
SELECT 
    e.id,
    eq.id,
    1,
    (eq.pricing->>'daily_rate')::decimal
FROM estimates e
CROSS JOIN equipment_catalog eq
WHERE e.title = 'Выставка "Инновации 2024"'
    AND eq.name = 'Звуковая система Line Array';

-- 7. СОЗДАЕМ ТЕСТОВЫЕ ПРОЕКТЫ ПОРТФОЛИО
-- ===============================================

INSERT INTO portfolio_items (title, subtitle, slug, category, description, short_description, content, cover_image, thumbnail, photos, gallery, year, client, location, duration, budget, results, technologies, tags, featured, status, seo, author, views, likes)
VALUES 
    (
        'Интерактивная выставка "Цифровое будущее"',
        'Иммерсивное пространство с 3D-проекциями и VR',
        'digital-future-exhibition',
        '3D Mapping / Interactive',
        'Создание иммерсивного пространства с использованием 3D-проекций, интерактивных стен и VR-зоны для выставки технологий будущего',
        'Иммерсивная выставка с 3D-проекциями и VR',
        'Полное описание проекта с деталями реализации, техническими решениями и результатами.',
        '/api/placeholder/800/600',
        '/api/placeholder/400/300',
        ARRAY['/api/placeholder/800/600', '/api/placeholder/800/600', '/api/placeholder/800/600'],
        ARRAY['/api/placeholder/800/600', '/api/placeholder/800/600'],
        '2024',
        'Технологический музей',
        'Москва',
        '3 месяца',
        '2.5M ₽',
        ARRAY['15,000+ посетителей', '95% положительных отзывов', 'Увеличение времени пребывания на 40%'],
        ARRAY['3D-маппинг', 'Интерактивные стены', 'VR-гарнитуры', 'Проекционные экраны'],
        ARRAY['exhibition', '3d-mapping', 'vr', 'interactive'],
        true,
        'published',
        '{"metaTitle": "Интерактивная выставка Цифровое будущее - WESHOW", "metaDescription": "Создание иммерсивного пространства с 3D-проекциями и VR-зонами", "keywords": ["выставка", "3d-маппинг", "vr", "интерактив"]}',
        'admin',
        1250,
        89
    ),
    (
        'Корпоративное мероприятие Samsung',
        'LED-инсталляция для презентации новых продуктов',
        'samsung-corporate-event',
        'LED Solutions / Corporate',
        'Масштабная LED-инсталляция для презентации новых продуктов с интерактивными зонами и 3D-визуализацией',
        'LED-инсталляция для Samsung с интерактивными зонами',
        'Детальное описание проекта с техническими характеристиками и результатами.',
        '/api/placeholder/800/600',
        '/api/placeholder/400/300',
        ARRAY['/api/placeholder/800/600', '/api/placeholder/800/600'],
        ARRAY['/api/placeholder/800/600'],
        '2024',
        'Samsung',
        'Санкт-Петербург',
        '2 месяца',
        '1.8M ₽',
        ARRAY['500+ участников', '100% выполнение технических требований', 'Высокая оценка от руководства'],
        ARRAY['LED-видеостены', 'Интерактивные панели', '3D-проекции', 'Звуковые системы'],
        ARRAY['corporate', 'led', 'samsung', 'event'],
        true,
        'published',
        '{"metaTitle": "Корпоративное мероприятие Samsung - WESHOW", "metaDescription": "LED-инсталляция для презентации новых продуктов Samsung", "keywords": ["samsung", "led", "корпоратив", "мероприятие"]}',
        'admin',
        890,
        67
    ),
    (
        'Музейная инсталляция "История науки"',
        'Интерактивные экспозиции с AR-технологиями',
        'science-history-museum',
        'Interactive / Museums',
        'Создание интерактивных экспозиций с использованием AR-технологий для музея истории науки',
        'Интерактивные экспозиции с AR для музея',
        'Описание проекта с техническими решениями и инновационными подходами.',
        '/api/placeholder/800/600',
        '/api/placeholder/400/300',
        ARRAY['/api/placeholder/800/600', '/api/placeholder/800/600'],
        ARRAY['/api/placeholder/800/600', '/api/placeholder/800/600'],
        '2024',
        'Музей истории науки',
        'Москва',
        '4 месяца',
        '3.2M ₽',
        ARRAY['25,000+ посетителей', '98% положительных отзывов', 'Увеличение посещаемости на 60%'],
        ARRAY['AR-приложения', 'Интерактивные столы', 'Проекционные системы', 'Мультимедиа контент'],
        ARRAY['museum', 'ar', 'interactive', 'education'],
        false,
        'published',
        '{"metaTitle": "Музейная инсталляция История науки - WESHOW", "metaDescription": "Интерактивные экспозиции с AR-технологиями для музея", "keywords": ["музей", "ar", "интерактив", "образование"]}',
        'admin',
        756,
        54
    )
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    category = EXCLUDED.category,
    description = EXCLUDED.description,
    updated_at = NOW();

-- 8. СОЗДАЕМ КАТЕГОРИИ ПОРТФОЛИО
-- ===============================================

INSERT INTO portfolio_categories (name, slug, description, color, icon, order_index, count)
VALUES 
    (
        '3D Mapping / Interactive',
        '3d-mapping',
        '3D-маппинг и интерактивные решения',
        '#3B82F6',
        '🎯',
        1,
        1
    ),
    (
        'LED Solutions / Corporate',
        'led-solutions',
        'LED-решения для корпоративных мероприятий',
        '#10B981',
        '💡',
        2,
        1
    ),
    (
        'Interactive / Museums',
        'interactive-museums',
        'Интерактивные решения для музеев',
        '#F59E0B',
        '🏛️',
        3,
        1
    )
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    color = EXCLUDED.color,
    icon = EXCLUDED.icon,
    order_index = EXCLUDED.order_index,
    count = EXCLUDED.count;

-- 9. ПРОВЕРЯЕМ СОЗДАННЫЕ ДАННЫЕ
-- ===============================================

-- Проверяем количество записей
SELECT 
    'users' as table_name, 
    COUNT(*) as record_count 
FROM users
UNION ALL
SELECT 
    'admin_users' as table_name, 
    COUNT(*) as record_count 
FROM admin_users
UNION ALL
SELECT 
    'equipment_catalog' as table_name, 
    COUNT(*) as record_count 
FROM equipment_catalog
UNION ALL
SELECT 
    'estimates' as table_name, 
    COUNT(*) as record_count 
FROM estimates
UNION ALL
SELECT 
    'estimate_items' as table_name, 
    COUNT(*) as record_count 
FROM estimate_items
UNION ALL
SELECT 
    'portfolio_items' as table_name, 
    COUNT(*) as record_count 
FROM portfolio_items
UNION ALL
SELECT 
    'portfolio_categories' as table_name, 
    COUNT(*) as record_count 
FROM portfolio_categories;

-- Проверяем тестовые заявки
SELECT 
    e.title,
    u.name as client_name,
    u.company_name,
    e.status,
    e.total_amount,
    COUNT(ei.id) as items_count
FROM estimates e
LEFT JOIN users u ON e.user_id = u.id
LEFT JOIN estimate_items ei ON e.id = ei.estimate_id
WHERE e.title LIKE '%ТехноМир%' OR e.title LIKE '%Инновации%' OR e.title LIKE '%IT-специалистов%'
GROUP BY e.id, e.title, u.name, u.company_name, e.status, e.total_amount
ORDER BY e.created_at;

-- Финальное сообщение
SELECT '🚀 ТЕСТОВЫЕ ДАННЫЕ АДМИН ПАНЕЛИ СОЗДАНЫ! Готово для тестирования' as status;
