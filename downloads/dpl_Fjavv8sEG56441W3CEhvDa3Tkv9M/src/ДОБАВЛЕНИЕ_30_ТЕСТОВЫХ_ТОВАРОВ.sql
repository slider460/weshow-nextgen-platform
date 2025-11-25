-- ===============================================
-- ДОБАВЛЕНИЕ 30 НОВЫХ ТЕСТОВЫХ ТОВАРОВ
-- Разные категории оборудования для тестирования
-- ===============================================

-- 1. LED-ЭКРАНЫ И ВИДЕОТЕХНИКА (8 товаров)
-- ===============================================

INSERT INTO equipment_catalog (name, brand, model, description, specifications, pricing, availability, media, requirements, tags, rating, is_active, featured)
VALUES 
    (
        'LED-экран P2.5 Indoor Premium',
        'led-displays',
        'Absen',
        'A2.5 Pro',
        'Премиальный LED-экран для закрытых помещений с ультра-высоким разрешением',
        '{"pixel_pitch": "2.5mm", "brightness": "1500 nits", "viewing_angle": "170°", "refresh_rate": "7680Hz", "module_size": "320x320mm"}',
        '{"daily_rate": 4500, "weekly_rate": 25000, "monthly_rate": 85000, "setup_fee": 18000, "delivery_fee": 6000}',
        '{"total": 25, "available": 20, "reserved": 5, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 250Вт на модуль", "space": "0.10м² на модуль", "setup": "Требуется идеально ровная поверхность"}',
        ARRAY['led', 'premium', 'indoor', 'высокое разрешение'],
        '{"average": 4.9, "count": 89}',
        true,
        true
    ),
    (
        'LED-экран P4 Outdoor',
        'led-displays',
        'Leyard',
        'L4 Outdoor',
        'Надежный LED-экран для наружного использования в любую погоду',
        '{"pixel_pitch": "4mm", "brightness": "10000 nits", "viewing_angle": "140°", "refresh_rate": "3840Hz", "module_size": "256x256mm"}',
        '{"daily_rate": 3200, "weekly_rate": 18000, "monthly_rate": 65000, "setup_fee": 14000, "delivery_fee": 4500}',
        '{"total": 40, "available": 35, "reserved": 5, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 400Вт на модуль", "space": "0.07м² на модуль", "setup": "Водонепроницаемая конструкция"}',
        ARRAY['led', 'outdoor', 'weatherproof', 'высокая яркость'],
        '{"average": 4.7, "count": 156}',
        true,
        false
    ),
    (
        'Видеостена 4x4 метров',
        'led-displays',
        'Samsung',
        'IWA-4646',
        'Масштабная видеостена для больших мероприятий и конференций',
        '{"resolution": "7680x4320", "brightness": "1200 nits", "viewing_angle": "178°", "response_time": "8ms"}',
        '{"daily_rate": 85000, "weekly_rate": 450000, "monthly_rate": 1500000, "setup_fee": 50000, "delivery_fee": 15000}',
        '{"total": 3, "available": 2, "reserved": 1, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "380В, 8000Вт", "space": "16м²", "setup": "Требуется специальная конструкция"}',
        ARRAY['видеостена', 'samsung', '4k', 'конференции'],
        '{"average": 4.8, "count": 23}',
        true,
        true
    ),
    (
        'Мобильный LED-экран 5x3м',
        'led-displays',
        'Absen',
        'Mobile P5',
        'Мобильная LED-конструкция на трейлере для выездных мероприятий',
        '{"pixel_pitch": "5mm", "brightness": "8000 nits", "viewing_angle": "160°", "size": "5x3м"}',
        '{"daily_rate": 55000, "weekly_rate": 300000, "monthly_rate": 1000000, "setup_fee": 25000, "delivery_fee": 10000}',
        '{"total": 5, "available": 4, "reserved": 1, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "380В, 6000Вт", "space": "Требуется стоянка 8x5м", "setup": "Автономная мобильная конструкция"}',
        ARRAY['мобильный', 'led', 'трейлер', 'выездные мероприятия'],
        '{"average": 4.6, "count": 67}',
        true,
        false
    ),
    (
        'Прозрачный LED-экран 3x2м',
        'led-displays',
        'Crystal LED',
        'CL-32T',
        'Прозрачный LED-дисплей для витрин и инсталляций',
        '{"pixel_pitch": "10mm", "brightness": "6000 nits", "transparency": "85%", "viewing_angle": "160°"}',
        '{"daily_rate": 25000, "weekly_rate": 140000, "monthly_rate": 450000, "setup_fee": 15000, "delivery_fee": 5000}',
        '{"total": 8, "available": 6, "reserved": 2, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 2000Вт", "space": "6м²", "setup": "Требуется прозрачная подложка"}',
        ARRAY['прозрачный', 'led', 'витрина', 'инсталляция'],
        '{"average": 4.5, "count": 34}',
        true,
        false
    ),
    (
        'Изогнутый LED-экран 180°',
        'led-displays',
        'Leyard',
        'Curved 180',
        'Изогнутый LED-экран для иммерсивных инсталляций',
        '{"pixel_pitch": "3mm", "brightness": "1200 nits", "curvature": "180°", "radius": "3м"}',
        '{"daily_rate": 65000, "weekly_rate": 350000, "monthly_rate": 1200000, "setup_fee": 30000, "delivery_fee": 12000}',
        '{"total": 2, "available": 1, "reserved": 1, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "380В, 5000Вт", "space": "Требуется радиус 3м", "setup": "Специальная изогнутая конструкция"}',
        ARRAY['изогнутый', 'led', 'иммерсивный', '180 градусов'],
        '{"average": 4.9, "count": 12}',
        true,
        true
    ),
    (
        'LED-панель для сцены 6x4м',
        'led-displays',
        'Absen',
        'Stage P6',
        'Сценический LED-экран для театров и концертных залов',
        '{"pixel_pitch": "6mm", "brightness": "1000 nits", "viewing_angle": "160°", "size": "6x4м"}',
        '{"daily_rate": 35000, "weekly_rate": 200000, "monthly_rate": 700000, "setup_fee": 20000, "delivery_fee": 8000}',
        '{"total": 6, "available": 4, "reserved": 2, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 4000Вт", "space": "24м²", "setup": "Сценическая подвесная система"}',
        ARRAY['сцена', 'led', 'театр', 'концерт'],
        '{"average": 4.7, "count": 45}',
        true,
        false
    ),
    (
        'LED-куб 2x2x2м',
        'led-displays',
        'Crystal LED',
        'Cube 222',
        'Кубический LED-дисплей для инсталляций и арт-объектов',
        '{"pixel_pitch": "8mm", "brightness": "8000 nits", "viewing_angle": "360°", "size": "2x2x2м"}',
        '{"daily_rate": 45000, "weekly_rate": 250000, "monthly_rate": 850000, "setup_fee": 25000, "delivery_fee": 10000}',
        '{"total": 3, "available": 2, "reserved": 1, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 3000Вт", "space": "8м³", "setup": "Самонесущая кубическая конструкция"}',
        ARRAY['куб', 'led', 'инсталляция', 'арт'],
        '{"average": 4.8, "count": 18}',
        true,
        true
    ),

-- 2. ПРОЕКЦИОННОЕ ОБОРУДОВАНИЕ (8 товаров)
-- ===============================================

    (
        'Лазерный проектор 4K 20000 люмен',
        'projection',
        'Sony',
        'VPL-FHZ120',
        'Профессиональный лазерный проектор для больших помещений',
        '{"resolution": "4096x2160", "brightness": "20000 lumens", "contrast": "2500000:1", "laser_life": "20000h"}',
        '{"daily_rate": 25000, "weekly_rate": 140000, "monthly_rate": 450000, "setup_fee": 12000, "delivery_fee": 4000}',
        '{"total": 4, "available": 3, "reserved": 1, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 800Вт", "space": "Требуется 3м расстояние", "setup": "Потолочное крепление или штатив"}',
        ARRAY['лазерный', 'проектор', '4k', 'высокая яркость'],
        '{"average": 4.9, "count": 56}',
        true,
        true
    ),
    (
        'Ультракороткофокусный проектор',
        'projection',
        'Epson',
        'EB-1470Ui',
        'Проектор для интерактивных досок и близкой проекции',
        '{"resolution": "1920x1080", "brightness": "4000 lumens", "throw_ratio": "0.35:1", "interactive": true}',
        '{"daily_rate": 8000, "weekly_rate": 45000, "monthly_rate": 150000, "setup_fee": 5000, "delivery_fee": 2000}',
        '{"total": 12, "available": 10, "reserved": 2, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 350Вт", "space": "Расстояние 40см", "setup": "Крепление на стене или потолке"}',
        ARRAY['ультракороткофокусный', 'интерактивный', 'доска', 'близкая проекция'],
        '{"average": 4.6, "count": 89}',
        true,
        false
    ),
    (
        'Проекционный экран 8x6м моторизованный',
        'projection',
        'Da-Lite',
        'Model B',
        'Большой моторизованный экран для конференц-залов',
        '{"size": "8x6м", "aspect_ratio": "4:3", "material": "Matte White", "motorized": true}',
        '{"daily_rate": 12000, "weekly_rate": 70000, "monthly_rate": 250000, "setup_fee": 8000, "delivery_fee": 3000}',
        '{"total": 5, "available": 4, "reserved": 1, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 200Вт", "space": "Требуется высота 7м", "setup": "Потолочное крепление"}',
        ARRAY['экран', 'моторизованный', 'большой', 'конференц-зал'],
        '{"average": 4.7, "count": 34}',
        true,
        false
    ),
    (
        '3D проектор для стереоскопии',
        'projection',
        'Barco',
        'F70-W7',
        'Профессиональный проектор для 3D-презентаций и VR',
        '{"resolution": "1920x1200", "brightness": "7000 lumens", "3d_ready": true, "frame_rate": "144Hz"}',
        '{"daily_rate": 18000, "weekly_rate": 100000, "monthly_rate": 350000, "setup_fee": 10000, "delivery_fee": 3500}',
        '{"total": 6, "available": 5, "reserved": 1, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 600Вт", "space": "Требуется 2.5м расстояние", "setup": "Синхронизация с 3D очками"}',
        ARRAY['3d', 'проектор', 'стереоскопия', 'vr'],
        '{"average": 4.8, "count": 42}',
        true,
        true
    ),
    (
        'Проектор для mapping 6000 люмен',
        'projection',
        'Panasonic',
        'PT-DZ870K',
        'Специализированный проектор для проекционного маппинга',
        '{"resolution": "1920x1200", "brightness": "6000 lumens", "lens_shift": "vertical/horizontal", "edge_blend": true}',
        '{"daily_rate": 15000, "weekly_rate": 85000, "monthly_rate": 300000, "setup_fee": 8000, "delivery_fee": 3000}',
        '{"total": 8, "available": 6, "reserved": 2, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 500Вт", "space": "Требуется 2м расстояние", "setup": "Точная калибровка для маппинга"}',
        ARRAY['mapping', 'проектор', 'маппинг', 'edge blend'],
        '{"average": 4.7, "count": 67}',
        true,
        false
    ),
    (
        'Портативный проектор 3000 люмен',
        'projection',
        'Optoma',
        'HD146X',
        'Компактный проектор для презентаций и выездных мероприятий',
        '{"resolution": "1920x1080", "brightness": "3000 lumens", "weight": "2.6кг", "portable": true}',
        '{"daily_rate": 4000, "weekly_rate": 22000, "monthly_rate": 75000, "setup_fee": 2000, "delivery_fee": 1000}',
        '{"total": 15, "available": 12, "reserved": 3, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 240Вт", "space": "Компактный", "setup": "Портативная установка"}',
        ARRAY['портативный', 'проектор', 'компактный', 'выездные мероприятия'],
        '{"average": 4.5, "count": 123}',
        true,
        false
    ),
    (
        'Проекционный купол 360°',
        'projection',
        'Fulldome',
        'FD-360',
        'Купол для иммерсивных 360-градусных проекций',
        '{"diameter": "8м", "resolution": "8K", "brightness": "5000 lumens", "projection_type": "360°"}',
        '{"daily_rate": 95000, "weekly_rate": 500000, "monthly_rate": 1700000, "setup_fee": 50000, "delivery_fee": 20000}',
        '{"total": 1, "available": 1, "reserved": 0, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "380В, 10000Вт", "space": "Требуется 10x10м", "setup": "Специальная купольная конструкция"}',
        ARRAY['купол', '360', 'иммерсивный', 'fulldome'],
        '{"average": 4.9, "count": 8}',
        true,
        true
    ),
    (
        'Проекционная сетка 10x6м',
        'projection',
        'Spandex',
        'SG-106',
        'Специальная сетка для проекционного маппинга на здания',
        '{"size": "10x6м", "material": "Spandex", "stretch": "25%", "fire_retardant": true}',
        '{"daily_rate": 8000, "weekly_rate": 45000, "monthly_rate": 150000, "setup_fee": 5000, "delivery_fee": 2000}',
        '{"total": 10, "available": 8, "reserved": 2, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "Не требуется", "space": "10x6м", "setup": "Натяжка на каркас или здание"}',
        ARRAY['сетка', 'проекция', 'маппинг', 'здание'],
        '{"average": 4.6, "count": 56}',
        true,
        false
    ),

-- 3. АУДИООБОРУДОВАНИЕ (7 товаров)
-- ===============================================

    (
        'Профессиональный микшерный пульт',
        'audio',
        'Yamaha',
        'QL5',
        'Цифровой микшерный пульт для больших мероприятий',
        '{"channels": "64", "buses": "16", "effects": "64", "automation": true, "touchscreen": "10.1 inch"}',
        '{"daily_rate": 15000, "weekly_rate": 85000, "monthly_rate": 300000, "setup_fee": 8000, "delivery_fee": 3000}',
        '{"total": 3, "available": 2, "reserved": 1, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 300Вт", "space": "Требуется стойка 19\"", "setup": "Профессиональная настройка"}',
        ARRAY['микшер', 'yamaha', 'цифровой', 'большие мероприятия'],
        '{"average": 4.8, "count": 34}',
        true,
        true
    ),
    (
        'Беспроводная система микрофонов',
        'audio',
        'Shure',
        'ULX-D4',
        'Профессиональная цифровая беспроводная система',
        '{"channels": "4", "frequency_range": "470-608 MHz", "range": "100м", "encryption": "AES-256"}',
        '{"daily_rate": 8000, "weekly_rate": 45000, "monthly_rate": 150000, "setup_fee": 4000, "delivery_fee": 1500}',
        '{"total": 8, "available": 6, "reserved": 2, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 50Вт", "space": "Компактная", "setup": "Настройка частот"}',
        ARRAY['беспроводные', 'микрофоны', 'shure', 'цифровые'],
        '{"average": 4.7, "count": 89}',
        true,
        false
    ),
    (
        'Активная акустическая система 2x15"',
        'audio',
        'JBL',
        'SRX835P',
        'Мощная активная акустическая система для больших площадей',
        '{"woofers": "2x15 inch", "tweeters": "3 inch", "power": "3200W", "frequency_range": "32Hz-20kHz"}',
        '{"daily_rate": 12000, "weekly_rate": 70000, "monthly_rate": 250000, "setup_fee": 6000, "delivery_fee": 2500}',
        '{"total": 6, "available": 4, "reserved": 2, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 3200Вт", "space": "Требуется 2м высота", "setup": "Триподы или подвес"}',
        ARRAY['активная', 'акустика', 'jbl', 'мощная'],
        '{"average": 4.6, "count": 67}',
        true,
        false
    ),
    (
        'Сабвуфер 18" для басов',
        'audio',
        'Yamaha',
        'XS18F',
        'Мощный сабвуфер для низких частот',
        '{"driver": "18 inch", "power": "2000W", "frequency_range": "30Hz-120Hz", "sensitivity": "97 dB"}',
        '{"daily_rate": 6000, "weekly_rate": 35000, "monthly_rate": 120000, "setup_fee": 3000, "delivery_fee": 1200}',
        '{"total": 12, "available": 10, "reserved": 2, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 2000Вт", "space": "Требуется 1.5м", "setup": "Установка на полу"}',
        ARRAY['сабвуфер', 'басы', 'yamaha', 'низкие частоты'],
        '{"average": 4.7, "count": 45}',
        true,
        false
    ),
    (
        'Интерактивная акустическая система',
        'audio',
        'Bose',
        'L1 Pro32',
        'Система для живых выступлений и презентаций',
        '{"array_length": "32 inch", "power": "1000W", "coverage": "180°", "wireless": true}',
        '{"daily_rate": 10000, "weekly_rate": 55000, "monthly_rate": 190000, "setup_fee": 5000, "delivery_fee": 2000}',
        '{"total": 8, "available": 6, "reserved": 2, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 1000Вт", "space": "Компактная", "setup": "Быстрая установка"}',
        ARRAY['интерактивная', 'bose', 'живые выступления', 'wireless'],
        '{"average": 4.8, "count": 78}',
        true,
        true
    ),
    (
        'Цифровая обработка сигнала',
        'audio',
        'DBX',
        'DriveRack PA2',
        'Процессор для обработки и управления звуком',
        '{"inputs": "8", "outputs": "8", "processing": "96kHz/32-bit", "effects": "26 types"}',
        '{"daily_rate": 4000, "weekly_rate": 22000, "monthly_rate": 75000, "setup_fee": 2000, "delivery_fee": 800}',
        '{"total": 10, "available": 8, "reserved": 2, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 50Вт", "space": "Стойка 19\"", "setup": "Настройка через ПО"}',
        ARRAY['dsp', 'обработка', 'dbx', 'процессор'],
        '{"average": 4.6, "count": 56}',
        true,
        false
    ),
    (
        'Радиосистема для гидов',
        'audio',
        'Sennheiser',
        'Tourguide 2020',
        'Система для экскурсий и туров',
        '{"transmitters": "1", "receivers": "50", "range": "150м", "channels": "32"}',
        '{"daily_rate": 6000, "weekly_rate": 35000, "monthly_rate": 120000, "setup_fee": 3000, "delivery_fee": 1200}',
        '{"total": 5, "available": 4, "reserved": 1, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 30Вт", "space": "Компактная", "setup": "Настройка каналов"}',
        ARRAY['радиосистема', 'гиды', 'sennheiser', 'туры'],
        '{"average": 4.7, "count": 34}',
        true,
        false
    ),

-- 4. СВЕТОВОЕ ОБОРУДОВАНИЕ (7 товаров)
-- ===============================================

    (
        'LED прожектор 1000Вт RGBW',
        'lighting',
        'Chauvet',
        'Rogue R2 Wash',
        'Мощный LED прожектор с полным спектром цветов',
        '{"power": "1000W", "colors": "RGBW", "beam_angle": "5-50°", "brightness": "50000 lumens"}',
        '{"daily_rate": 8000, "weekly_rate": 45000, "monthly_rate": 150000, "setup_fee": 4000, "delivery_fee": 1500}',
        '{"total": 12, "available": 10, "reserved": 2, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 1000Вт", "space": "Требуется 2м высота", "setup": "Триподы или подвес"}',
        ARRAY['led', 'прожектор', 'rgbw', 'мощный'],
        '{"average": 4.7, "count": 89}',
        true,
        true
    ),
    (
        'Лазерная установка 5Вт',
        'lighting',
        'KVANT',
        'Clubmax 5000',
        'Профессиональная лазерная система для шоу',
        '{"power": "5W", "wavelengths": "532nm, 638nm, 445nm", "scanners": "30kpps", "safety_class": "3B"}',
        '{"daily_rate": 15000, "weekly_rate": 85000, "monthly_rate": 300000, "setup_fee": 8000, "delivery_fee": 3000}',
        '{"total": 4, "available": 3, "reserved": 1, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 500Вт", "space": "Требуется 3м высота", "setup": "Специальная лазерная безопасность"}',
        ARRAY['лазер', 'kvant', 'шоу', '5watt'],
        '{"average": 4.9, "count": 23}',
        true,
        true
    ),
    (
        'Стробоскоп LED 1000Вт',
        'lighting',
        'Martin',
        'Atomic 3000',
        'Мощный стробоскоп для дискотек и мероприятий',
        '{"power": "1000W", "flash_rate": "1-25 Hz", "brightness": "100000 lumens", "led": true}',
        '{"daily_rate": 6000, "weekly_rate": 35000, "monthly_rate": 120000, "setup_fee": 3000, "delivery_fee": 1200}',
        '{"total": 8, "available": 6, "reserved": 2, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 1000Вт", "space": "Компактный", "setup": "Триподы или подвес"}',
        ARRAY['стробоскоп', 'martin', 'дискотека', 'мощный'],
        '{"average": 4.6, "count": 67}',
        true,
        false
    ),
    (
        'Дым-машина 2000Вт',
        'lighting',
        'Look Solutions',
        'Unique 2.1',
        'Профессиональная дым-машина для эффектов',
        '{"power": "2000W", "output": "15,000 cu ft/min", "fluid_capacity": "5L", "heating_time": "3 min"}',
        '{"daily_rate": 4000, "weekly_rate": 22000, "monthly_rate": 75000, "setup_fee": 2000, "delivery_fee": 800}',
        '{"total": 15, "available": 12, "reserved": 3, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 2000Вт", "space": "Компактная", "setup": "Заправка жидкостью"}',
        ARRAY['дым', 'машина', 'эффекты', 'look solutions'],
        '{"average": 4.5, "count": 123}',
        true,
        false
    ),
    (
        'Ультрафиолетовые лампы 365nm',
        'lighting',
        'Blacklight',
        'BL-365',
        'УФ лампы для неоновых эффектов',
        '{"wavelength": "365nm", "power": "400W", "coverage": "50м²", "led": true}',
        '{"daily_rate": 3000, "weekly_rate": 17000, "monthly_rate": 60000, "setup_fee": 1500, "delivery_fee": 600}',
        '{"total": 20, "available": 16, "reserved": 4, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 400Вт", "space": "Компактные", "setup": "Установка на триподы"}',
        ARRAY['ультрафиолет', 'неон', 'эффекты', '365nm'],
        '{"average": 4.4, "count": 89}',
        true,
        false
    ),
    (
        'Генератор молний',
        'lighting',
        'Tesla',
        'T-1000',
        'Установка для создания эффекта молний',
        '{"power": "1000W", "voltage": "100kV", "frequency": "1-100Hz", "safety": "Class 1"}',
        '{"daily_rate": 25000, "weekly_rate": 140000, "monthly_rate": 450000, "setup_fee": 15000, "delivery_fee": 5000}',
        '{"total": 2, "available": 1, "reserved": 1, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "380В, 1000Вт", "space": "Требуется 5м радиус", "setup": "Специальная безопасность"}',
        ARRAY['молнии', 'tesla', 'эффекты', 'высокое напряжение'],
        '{"average": 4.8, "count": 12}',
        true,
        true
    ),
    (
        'Голографический проектор',
        'lighting',
        'HoloLens',
        'HL-360',
        'Проектор для создания голографических эффектов',
        '{"resolution": "4K", "viewing_angle": "360°", "brightness": "8000 lumens", "holographic": true}',
        '{"daily_rate": 35000, "weekly_rate": 200000, "monthly_rate": 700000, "setup_fee": 20000, "delivery_fee": 8000}',
        '{"total": 3, "available": 2, "reserved": 1, "in_repair": 0}',
        '{"images": ["/api/placeholder/600/400"], "thumbnail": "/api/placeholder/300/200"}',
        '{"power": "220В, 1500Вт", "space": "Требуется 3м", "setup": "Специальная голографическая среда"}',
        ARRAY['голограмма', 'проектор', '360', 'эффекты'],
        '{"average": 4.7, "count": 18}',
        true,
        true
    );

-- 5. ПРОВЕРЯЕМ РЕЗУЛЬТАТ
-- ===============================================

-- Проверяем общее количество товаров
SELECT 
    'Общее количество товаров' as description,
    COUNT(*) as count
FROM equipment_catalog
WHERE is_active = true

UNION ALL

-- Проверяем по категориям
SELECT 
    CONCAT('Категория: ', category) as description,
    COUNT(*) as count
FROM equipment_catalog
WHERE is_active = true
GROUP BY category
ORDER BY count DESC;

-- Проверяем новые товары
SELECT 
    name,
    category,
    brand,
    (pricing->>'daily_rate')::integer as daily_rate,
    (availability->>'available')::integer as available
FROM equipment_catalog
WHERE is_active = true
ORDER BY created_at DESC
LIMIT 10;

-- Финальное сообщение
SELECT '🚀 30 НОВЫХ ТОВАРОВ ДОБАВЛЕНЫ! Разнообразное оборудование для тестирования' as status;
