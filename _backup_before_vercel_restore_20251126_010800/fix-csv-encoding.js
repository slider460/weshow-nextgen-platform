#!/usr/bin/env node

/**
 * Скрипт для исправления кодировки CSV файла
 * Создает новый CSV файл с правильной кодировкой для Excel
 */

import fs from 'fs';
import path from 'path';

const exportDir = './equipment-catalog-export';

console.log('🔧 Исправляем кодировку CSV файла...');

function fixCSVEncoding() {
  try {
    // Читаем исходный CSV файл
    const csvPath = path.join(exportDir, 'equipment_catalog.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    
    // Разбираем CSV
    const lines = csvContent.split('\\n');
    const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
    
    console.log('📋 Заголовки:', headers);
    
    // Создаем новый CSV с правильной кодировкой
    let newCsvContent = '';
    
    // Добавляем BOM для корректного отображения в Excel
    newCsvContent += '\\uFEFF';
    
    // Добавляем заголовки
    newCsvContent += headers.map(h => `"${h}"`).join(',') + '\\n';
    
    // Добавляем данные
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.replace(/"/g, ''));
        newCsvContent += values.map(v => `"${v}"`).join(',') + '\\n';
      }
    }
    
    // Сохраняем новый файл
    const newCsvPath = path.join(exportDir, 'equipment_catalog_fixed.csv');
    fs.writeFileSync(newCsvPath, newCsvContent, 'utf8');
    
    console.log('✅ Новый CSV файл создан: equipment_catalog_fixed.csv');
    console.log('💡 Теперь откройте этот файл в Excel - кодировка будет правильной!');
    
  } catch (error) {
    console.error('❌ Ошибка при исправлении кодировки:', error);
  }
}

fixCSVEncoding();










