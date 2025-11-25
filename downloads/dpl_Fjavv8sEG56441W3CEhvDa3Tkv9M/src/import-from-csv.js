#!/usr/bin/env node

/**
 * Скрипт для импорта изменений из CSV файла обратно в Supabase
 * Читает отредактированный equipment_catalog.csv и обновляет базу данных
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Конфигурация Supabase
const supabaseUrl = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMzkzMjMsImV4cCI6MjA3NDcxNTMyM30.L9M4qQ_gkoyLj7oOwKZgyOVHoGv4JMJw-8m91IJAZjE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const exportDir = './equipment-catalog-export';

console.log('📥 Начинаем импорт изменений из CSV файла...');

function parseCSV(csvContent) {
  const lines = csvContent.split('\\n');
  const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const values = lines[i].split(',').map(v => v.replace(/"/g, ''));
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });
      data.push(row);
    }
  }

  return data;
}

async function importFromCSV() {
  try {
    const csvPath = path.join(exportDir, 'equipment_catalog.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.error('❌ CSV файл не найден. Сначала отредактируйте equipment_catalog.csv');
      process.exit(1);
    }

    // Читаем CSV файл
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const equipmentData = parseCSV(csvContent);

    console.log(`📊 Найдено ${equipmentData.length} позиций оборудования для обновления`);

    // Загружаем категории для сопоставления
    const { data: categories } = await supabase
      .from('equipment_categories')
      .select('id, name');

    const categoryMap = {};
    categories.forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });

    let successCount = 0;
    let errorCount = 0;

    // Обновляем каждую позицию оборудования
    for (const item of equipmentData) {
      try {
        // Находим ID категории по названию
        const categoryId = categoryMap[item['Категория']] || null;

        // Преобразуем булевы значения
        const isActive = item['Активно'] === 'Да';
        const featured = item['Рекомендуемое'] === 'Да';

        // Преобразуем числовые значения
        const pricePerDay = item['Цена за день'] ? parseFloat(item['Цена за день']) : null;
        const stockQuantity = item['Количество на складе'] ? parseInt(item['Количество на складе']) : 0;

        const { error } = await supabase
          .from('equipment_catalog')
          .update({
            name: item['Название'],
            description: item['Описание'],
            category_id: categoryId,
            price_per_day: pricePerDay,
            stock_quantity: stockQuantity,
            is_active: isActive,
            featured: featured,
            updated_at: new Date().toISOString()
          })
          .eq('id', item['ID']);

        if (error) {
          console.error(`❌ Ошибка при обновлении ${item['Название']}:`, error.message);
          errorCount++;
        } else {
          console.log(`✅ Обновлено: ${item['Название']}`);
          successCount++;
        }

      } catch (error) {
        console.error(`❌ Ошибка при обработке ${item['Название']}:`, error.message);
        errorCount++;
      }
    }

    console.log('\\n🎉 Импорт завершен!');
    console.log(`✅ Успешно обновлено: ${successCount} позиций`);
    console.log(`❌ Ошибок: ${errorCount} позиций`);

    if (errorCount > 0) {
      console.log('\\n💡 Проверьте ошибки выше и исправьте данные в CSV файле.');
    }

  } catch (error) {
    console.error('❌ Критическая ошибка при импорте:', error);
    process.exit(1);
  }
}

// Запускаем импорт
importFromCSV();

















