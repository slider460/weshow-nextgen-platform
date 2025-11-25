#!/usr/bin/env node

/**
 * Скрипт для создания чистого CSV файла из JSON данных
 * Создает правильно отформатированный CSV для Excel
 */

import fs from 'fs';
import path from 'path';

const exportDir = './equipment-catalog-export';

console.log('🧹 Создаем чистый CSV файл...');

function createCleanCSV() {
  try {
    // Читаем JSON файл
    const jsonPath = path.join(exportDir, 'equipment_catalog.json');
    const equipment = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    // Читаем категории
    const categoriesPath = path.join(exportDir, 'equipment_categories.json');
    const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
    
    // Создаем мапу категорий
    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.id] = cat.name;
    });
    
    // Создаем CSV контент с BOM для правильной кодировки
    let csvContent = '\\uFEFF';
    
    // Заголовки
    csvContent += 'ID,Название,Описание,Категория,Цена за день,Количество на складе,Активно,Рекомендуемое,Дата создания,Дата обновления\\n';
    
    // Данные
    equipment.forEach(item => {
      const categoryName = categoryMap[item.category_id] || 'Не указана';
      const isActive = item.is_active ? 'Да' : 'Нет';
      const featured = item.featured ? 'Да' : 'Нет';
      
      csvContent += `"${item.id}","${(item.name || '').replace(/"/g, '""')}","${(item.description || '').replace(/"/g, '""')}","${categoryName}","${item.price_per_day || ''}","${item.stock_quantity || 0}","${isActive}","${featured}","${item.created_at || ''}","${item.updated_at || ''}"\\n`;
    });
    
    // Сохраняем файл
    const csvPath = path.join(exportDir, 'equipment_catalog_clean.csv');
    fs.writeFileSync(csvPath, csvContent, 'utf8');
    
    console.log('✅ Чистый CSV файл создан: equipment_catalog_clean.csv');
    console.log(`📊 Экспортировано ${equipment.length} позиций оборудования`);
    console.log('💡 Теперь откройте equipment_catalog_clean.csv в Excel!');
    
  } catch (error) {
    console.error('❌ Ошибка при создании CSV:', error);
  }
}

createCleanCSV();

















