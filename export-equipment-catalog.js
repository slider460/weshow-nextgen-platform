#!/usr/bin/env node

/**
 * Скрипт для экспорта каталога оборудования из Supabase
 * Создает JSON файлы с данными для редактирования
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Конфигурация Supabase
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Создаем папку для экспорта
const exportDir = './equipment-catalog-export';
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

console.log('🚀 Начинаем экспорт каталога оборудования...');

async function exportEquipmentCatalog() {
  try {
    // 1. Экспорт категорий оборудования
    console.log('📁 Экспортируем категории оборудования...');
    const { data: categories, error: categoriesError } = await supabase
      .from('equipment_categories')
      .select('*')
      .order('name');

    if (categoriesError) {
      console.error('❌ Ошибка при загрузке категорий:', categoriesError);
    } else {
      fs.writeFileSync(
        path.join(exportDir, 'equipment_categories.json'),
        JSON.stringify(categories, null, 2),
        'utf8'
      );
      console.log(`✅ Категории экспортированы: ${categories?.length || 0} записей`);
    }

    // 2. Экспорт оборудования
    console.log('🔧 Экспортируем оборудование...');
    const { data: equipment, error: equipmentError } = await supabase
      .from('equipment_catalog')
      .select(`
        *,
        equipment_categories(name)
      `)
      .order('name');

    if (equipmentError) {
      console.error('❌ Ошибка при загрузке оборудования:', equipmentError);
    } else {
      fs.writeFileSync(
        path.join(exportDir, 'equipment_catalog.json'),
        JSON.stringify(equipment, null, 2),
        'utf8'
      );
      console.log(`✅ Оборудование экспортировано: ${equipment?.length || 0} записей`);
    }

    // 3. Экспорт оборудования для главной страницы
    console.log('🏠 Экспортируем оборудование для главной страницы...');
    const { data: homepageEquipment, error: homepageError } = await supabase
      .from('homepage_equipment')
      .select(`
        *,
        equipment_catalog(*)
      `)
      .order('sort_order');

    if (homepageError) {
      console.error('❌ Ошибка при загрузке оборудования главной страницы:', homepageError);
    } else {
      fs.writeFileSync(
        path.join(exportDir, 'homepage_equipment.json'),
        JSON.stringify(homepageEquipment, null, 2),
        'utf8'
      );
      console.log(`✅ Оборудование главной страницы экспортировано: ${homepageEquipment?.length || 0} записей`);
    }

    // 4. Создаем сводный файл
    console.log('📊 Создаем сводный файл...');
    const summary = {
      exportDate: new Date().toISOString(),
      totalCategories: categories?.length || 0,
      totalEquipment: equipment?.length || 0,
      totalHomepageEquipment: homepageEquipment?.length || 0,
      categories: categories?.map(cat => ({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        color: cat.color
      })) || [],
      equipment: equipment?.map(eq => ({
        id: eq.id,
        name: eq.name,
        category: eq.category,
        brand: eq.brand,
        model: eq.model,
        description: eq.description,
        specifications: eq.specifications,
        pricing: eq.pricing,
        availability: eq.availability,
        media: eq.media,
        requirements: eq.requirements,
        tags: eq.tags,
        rating: eq.rating,
        isActive: eq.is_active,
        featured: eq.featured
      })) || [],
      homepageEquipment: homepageEquipment?.map(he => ({
        id: he.id,
        equipmentId: he.equipment_id,
        sortOrder: he.sort_order,
        isVisible: he.is_visible,
        equipment: he.equipment_catalog
      })) || []
    };

    fs.writeFileSync(
      path.join(exportDir, 'equipment_catalog_summary.json'),
      JSON.stringify(summary, null, 2),
      'utf8'
    );

    // 5. Создаем README с инструкциями
    const readme = `# Экспорт каталога оборудования WESHOW

## 📅 Дата экспорта
${new Date().toLocaleString('ru-RU')}

## 📁 Структура файлов

### equipment_categories.json
Содержит все категории оборудования:
- id - уникальный идентификатор
- name - название категории
- description - описание категории
- icon - иконка категории
- color - цвет категории
- created_at - дата создания
- updated_at - дата обновления

### equipment_catalog.json
Содержит все позиции оборудования:
- id - уникальный идентификатор
- name - название оборудования
- category - категория (ссылка на equipment_categories)
- brand - бренд
- model - модель
- description - описание
- specifications - технические характеристики (JSON)
- pricing - ценообразование (JSON)
- availability - доступность (JSON)
- media - медиа-контент (JSON)
- requirements - требования к эксплуатации (JSON)
- tags - теги для поиска (массив)
- rating - рейтинг и отзывы (JSON)
- is_active - активно ли оборудование
- featured - рекомендуемое ли оборудование
- created_at - дата создания
- updated_at - дата обновления

### homepage_equipment.json
Содержит оборудование, отображаемое на главной странице:
- id - уникальный идентификатор
- equipment_id - ссылка на оборудование
- sort_order - порядок сортировки
- is_visible - видимо ли на главной странице
- equipment_catalog - полные данные оборудования

### equipment_catalog_summary.json
Сводный файл со всей информацией в удобном формате.

## 🔧 Как редактировать

1. Откройте нужный JSON файл в текстовом редакторе
2. Внесите изменения
3. Сохраните файл
4. Используйте скрипт import-equipment-catalog.js для загрузки изменений обратно в базу данных

## ⚠️ Важные замечания

- Не изменяйте ID записей
- Сохраняйте структуру JSON
- Для дат используйте формат ISO 8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
- Для JSON полей (specifications, pricing, etc.) сохраняйте корректный JSON синтаксис
- Перед загрузкой изменений сделайте резервную копию базы данных

## 📊 Статистика экспорта

- Категорий оборудования: ${summary.totalCategories}
- Позиций оборудования: ${summary.totalEquipment}
- Позиций на главной странице: ${summary.totalHomepageEquipment}
`;

    fs.writeFileSync(
      path.join(exportDir, 'README.md'),
      readme,
      'utf8'
    );

    console.log('\\n🎉 Экспорт завершен успешно!');
    console.log(`📁 Файлы сохранены в папку: ${exportDir}`);
    console.log('\\n📋 Созданные файлы:');
    console.log('  - equipment_categories.json');
    console.log('  - equipment_catalog.json');
    console.log('  - homepage_equipment.json');
    console.log('  - equipment_catalog_summary.json');
    console.log('  - README.md');
    console.log('\\n💡 Теперь вы можете редактировать файлы и использовать import-equipment-catalog.js для загрузки изменений.');

  } catch (error) {
    console.error('❌ Критическая ошибка при экспорте:', error);
    process.exit(1);
  }
}

// Запускаем экспорт
exportEquipmentCatalog();



