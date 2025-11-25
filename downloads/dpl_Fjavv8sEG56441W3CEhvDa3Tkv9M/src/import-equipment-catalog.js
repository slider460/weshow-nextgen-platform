#!/usr/bin/env node

/**
 * Скрипт для импорта изменений каталога оборудования в Supabase
 * Загружает отредактированные JSON файлы обратно в базу данных
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Конфигурация Supabase
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const exportDir = './equipment-catalog-export';

console.log('🚀 Начинаем импорт каталога оборудования...');

async function importEquipmentCatalog() {
  try {
    // Проверяем существование папки экспорта
    if (!fs.existsSync(exportDir)) {
      console.error('❌ Папка экспорта не найдена. Сначала запустите export-equipment-catalog.js');
      process.exit(1);
    }

    // 1. Импорт категорий оборудования
    console.log('📁 Импортируем категории оборудования...');
    const categoriesPath = path.join(exportDir, 'equipment_categories.json');
    if (fs.existsSync(categoriesPath)) {
      const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
      
      for (const category of categories) {
        const { error } = await supabase
          .from('equipment_categories')
          .upsert({
            id: category.id,
            name: category.name,
            description: category.description,
            icon: category.icon,
            color: category.color,
            created_at: category.created_at,
            updated_at: new Date().toISOString()
          });
        
        if (error) {
          console.error(`❌ Ошибка при обновлении категории ${category.name}:`, error);
        } else {
          console.log(`✅ Категория обновлена: ${category.name}`);
        }
      }
    }

    // 2. Импорт оборудования
    console.log('🔧 Импортируем оборудование...');
    const equipmentPath = path.join(exportDir, 'equipment_catalog.json');
    if (fs.existsSync(equipmentPath)) {
      const equipment = JSON.parse(fs.readFileSync(equipmentPath, 'utf8'));
      
      for (const item of equipment) {
        const { error } = await supabase
          .from('equipment_catalog')
          .upsert({
            id: item.id,
            name: item.name,
            category: item.category,
            brand: item.brand,
            model: item.model,
            description: item.description,
            specifications: item.specifications,
            pricing: item.pricing,
            availability: item.availability,
            media: item.media,
            requirements: item.requirements,
            tags: item.tags,
            rating: item.rating,
            is_active: item.is_active,
            featured: item.featured,
            created_at: item.created_at,
            updated_at: new Date().toISOString()
          });
        
        if (error) {
          console.error(`❌ Ошибка при обновлении оборудования ${item.name}:`, error);
        } else {
          console.log(`✅ Оборудование обновлено: ${item.name}`);
        }
      }
    }

    // 3. Импорт оборудования для главной страницы
    console.log('🏠 Импортируем оборудование для главной страницы...');
    const homepagePath = path.join(exportDir, 'homepage_equipment.json');
    if (fs.existsSync(homepagePath)) {
      const homepageEquipment = JSON.parse(fs.readFileSync(homepagePath, 'utf8'));
      
      for (const item of homepageEquipment) {
        const { error } = await supabase
          .from('homepage_equipment')
          .upsert({
            id: item.id,
            equipment_id: item.equipment_id,
            sort_order: item.sort_order,
            is_visible: item.is_visible,
            created_at: item.created_at,
            updated_at: new Date().toISOString()
          });
        
        if (error) {
          console.error(`❌ Ошибка при обновлении оборудования главной страницы ${item.id}:`, error);
        } else {
          console.log(`✅ Оборудование главной страницы обновлено: ${item.id}`);
        }
      }
    }

    console.log('\\n🎉 Импорт завершен успешно!');
    console.log('💡 Изменения загружены в базу данных Supabase.');

  } catch (error) {
    console.error('❌ Критическая ошибка при импорте:', error);
    process.exit(1);
  }
}

// Запускаем импорт
importEquipmentCatalog();

















