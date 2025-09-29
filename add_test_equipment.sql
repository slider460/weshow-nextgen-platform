-- Добавляем тестовые данные в каталог оборудования

-- Сначала добавляем категории оборудования (используем gen_random_uuid())
INSERT INTO equipment_categories (id, name, slug, description) VALUES
(gen_random_uuid(), 'Проекционное оборудование', 'projectors', 'Проекторы, экраны и аксессуары для презентаций'),
(gen_random_uuid(), 'Аудиооборудование', 'audio', 'Микрофоны, колонки, микшеры и звуковое оборудование'),
(gen_random_uuid(), 'Световое оборудование', 'lighting', 'Прожекторы, стробоскопы, лазеры и световые эффекты'),
(gen_random_uuid(), 'Видеооборудование', 'video', 'Камеры, видеомикшеры, мониторы и видеотехника')
ON CONFLICT (slug) DO NOTHING;

-- Получаем ID категорий для использования в equipment_catalog
WITH category_ids AS (
  SELECT id, name FROM equipment_categories WHERE slug IN ('projectors', 'audio', 'lighting', 'video')
)
INSERT INTO equipment_catalog (id, name, description, price_per_day, category_id, stock_quantity) 
SELECT 
  gen_random_uuid(),
  equipment_data.name,
  equipment_data.description,
  equipment_data.price_per_day,
  category_ids.id,
  equipment_data.stock_quantity
FROM category_ids
CROSS JOIN (VALUES
  -- Проекционное оборудование
  ('Проектор Panasonic PT-RZ970', '4K лазерный проектор 10,000 лм, идеален для больших залов и конференций', 15000, 3, 'projectors'),
  ('Проектор Epson EB-L1505U', 'Ультракороткофокусный проектор 4K, подходит для интерактивных досок', 12000, 2, 'projectors'),
  ('Экран Draper 300x300', 'Электрический экран 3x3 метра, белый матовый', 3000, 5, 'projectors'),
  ('Экран Elite Screens 150x150', 'Ручной экран 1.5x1.5 метра, переносной', 1500, 8, 'projectors'),
  
  -- Аудиооборудование
  ('Микрофон Shure SM58', 'Вокальный микрофон, классика для выступлений', 2000, 6, 'audio'),
  ('Микрофон Sennheiser EW 100 G4', 'Беспроводной микрофон с передатчиком', 5000, 4, 'audio'),
  ('Колонка JBL EON615', 'Активная колонка 15", 1000W, для средних помещений', 4000, 4, 'audio'),
  ('Микшер Yamaha MG12XU', '12-канальный аналоговый микшер с USB', 3500, 2, 'audio'),
  ('Колонка JBL EON712', 'Активная колонка 12", 800W, компактная', 3000, 6, 'audio'),
  
  -- Световое оборудование
  ('Прожектор Chauvet DJ Intimidator Spot 355 IRC', 'RGBW прожектор с лазером, DMX управление', 8000, 2, 'lighting'),
  ('Прожектор ADJ Mega Tripar Profile', 'RGB прожектор, 36x3W LED, компактный', 2500, 8, 'lighting'),
  ('Стробоскоп Chauvet DJ Hurricane 2000', 'Стробоскоп 2000W, диско-эффекты', 4000, 3, 'lighting'),
  ('Лазер Showtec Laser 3000', 'Зеленый лазер 3000mW, DMX управление', 12000, 1, 'lighting'),
  
  -- Видеооборудование
  ('Камера Sony HXR-NX100', '4K видеокамера с 20x зумом, профессиональная', 15000, 2, 'video'),
  ('Камера Canon XA11', 'Full HD видеокамера с 20x зумом, компактная', 8000, 3, 'video'),
  ('Видеомикшер Blackmagic ATEM Mini Pro', '4-канальный видеомикшер с USB', 12000, 1, 'video'),
  ('Монитор LG 32UN880', '32" 4K монитор для видеоконтроля', 3000, 4, 'video'),
  ('LED-панель Samsung IWA-46', '46" LED-панель для видеостен', 25000, 2, 'video')
) AS equipment_data(name, description, price_per_day, stock_quantity, category_slug)
WHERE category_ids.name = 
  CASE equipment_data.category_slug
    WHEN 'projectors' THEN 'Проекционное оборудование'
    WHEN 'audio' THEN 'Аудиооборудование'
    WHEN 'lighting' THEN 'Световое оборудование'
    WHEN 'video' THEN 'Видеооборудование'
  END;

-- Сообщение об успешном добавлении
SELECT 'Тестовое оборудование успешно добавлено в каталог!' as status;
