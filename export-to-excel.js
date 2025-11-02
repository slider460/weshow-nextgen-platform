#!/usr/bin/env node

/**
 * Скрипт для создания Excel файла с каталогом оборудования
 * Создает удобную таблицу для редактирования
 */

import fs from 'fs';
import path from 'path';

const exportDir = './equipment-catalog-export';

console.log('📊 Создаем Excel файл с каталогом оборудования...');

function createExcelFile() {
  try {
    // Читаем данные из JSON файлов
    const categories = JSON.parse(fs.readFileSync(path.join(exportDir, 'equipment_categories.json'), 'utf8'));
    const equipment = JSON.parse(fs.readFileSync(path.join(exportDir, 'equipment_catalog.json'), 'utf8'));

    // Создаем CSV файл (проще для редактирования)
    let csvContent = 'ID,Название,Описание,Категория,Цена за день,Количество на складе,Активно,Рекомендуемое,Дата создания,Дата обновления\n';

    equipment.forEach(item => {
      const category = categories.find(cat => cat.id === item.category_id);
      const categoryName = category ? category.name : 'Не указана';
      
      csvContent += `"${item.id}","${item.name || ''}","${item.description || ''}","${categoryName}","${item.price_per_day || ''}","${item.stock_quantity || 0}","${item.is_active ? 'Да' : 'Нет'}","${item.featured ? 'Да' : 'Нет'}","${item.created_at || ''}","${item.updated_at || ''}"\n`;
    });

    // Сохраняем CSV файл
    fs.writeFileSync(path.join(exportDir, 'equipment_catalog.csv'), csvContent, 'utf8');

    // Создаем HTML таблицу для удобного просмотра
    let htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Каталог оборудования WESHOW</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; font-weight: bold; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .category { background-color: #e3f2fd; }
        .inactive { background-color: #ffebee; }
        .featured { background-color: #e8f5e8; }
        h1 { color: #1976d2; }
        .stats { background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1>🔧 Каталог оборудования WESHOW</h1>
    
    <div class="stats">
        <h3>📊 Статистика</h3>
        <p><strong>Всего позиций:</strong> ${equipment.length}</p>
        <p><strong>Категорий:</strong> ${categories.length}</p>
        <p><strong>Активных позиций:</strong> ${equipment.filter(item => item.is_active).length}</p>
        <p><strong>Рекомендуемых:</strong> ${equipment.filter(item => item.featured).length}</p>
        <p><strong>Дата экспорта:</strong> ${new Date().toLocaleString('ru-RU')}</p>
    </div>

    <h3>📁 Категории оборудования</h3>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Описание</th>
                <th>Дата создания</th>
            </tr>
        </thead>
        <tbody>`;

    categories.forEach(category => {
      htmlContent += `
            <tr class="category">
                <td>${category.id}</td>
                <td><strong>${category.name}</strong></td>
                <td>${category.description || ''}</td>
                <td>${new Date(category.created_at).toLocaleDateString('ru-RU')}</td>
            </tr>`;
    });

    htmlContent += `
        </tbody>
    </table>

    <h3>🔧 Оборудование</h3>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Название</th>
                <th>Описание</th>
                <th>Категория</th>
                <th>Цена за день</th>
                <th>Количество</th>
                <th>Статус</th>
                <th>Рекомендуемое</th>
                <th>Обновлено</th>
            </tr>
        </thead>
        <tbody>`;

    equipment.forEach(item => {
      const category = categories.find(cat => cat.id === item.category_id);
      const categoryName = category ? category.name : 'Не указана';
      const rowClass = [];
      if (!item.is_active) rowClass.push('inactive');
      if (item.featured) rowClass.push('featured');
      
      htmlContent += `
            <tr class="${rowClass.join(' ')}">
                <td>${item.id}</td>
                <td><strong>${item.name || 'Без названия'}</strong></td>
                <td>${item.description || ''}</td>
                <td>${categoryName}</td>
                <td>${item.price_per_day ? item.price_per_day + ' ₽' : 'Не указана'}</td>
                <td>${item.stock_quantity || 0}</td>
                <td>${item.is_active ? '✅ Активно' : '❌ Неактивно'}</td>
                <td>${item.featured ? '⭐ Да' : 'Нет'}</td>
                <td>${item.updated_at ? new Date(item.updated_at).toLocaleDateString('ru-RU') : ''}</td>
            </tr>`;
    });

    htmlContent += `
        </tbody>
    </table>

    <div style="margin-top: 30px; padding: 20px; background-color: #e3f2fd; border-radius: 5px;">
        <h3>💡 Инструкции по редактированию</h3>
        <ol>
            <li><strong>CSV файл:</strong> Откройте equipment_catalog.csv в Excel или Google Sheets</li>
            <li><strong>Редактирование:</strong> Измените нужные поля (название, описание, цену, количество)</li>
            <li><strong>Сохранение:</strong> Сохраните как CSV файл с тем же именем</li>
            <li><strong>Импорт:</strong> Используйте import-equipment-catalog.js для загрузки изменений</li>
        </ol>
        
        <h4>⚠️ Важные замечания:</h4>
        <ul>
            <li>Не изменяйте ID записей</li>
            <li>Для активации/деактивации используйте "Да"/"Нет"</li>
            <li>Цены указывайте в рублях (только числа)</li>
            <li>Количество указывайте целыми числами</li>
        </ul>
    </div>
</body>
</html>`;

    // Сохраняем HTML файл
    fs.writeFileSync(path.join(exportDir, 'equipment_catalog.html'), htmlContent, 'utf8');

    console.log('✅ Excel файлы созданы успешно!');
    console.log('📁 Созданные файлы:');
    console.log('  - equipment_catalog.csv (для редактирования в Excel)');
    console.log('  - equipment_catalog.html (для просмотра в браузере)');
    console.log('\\n💡 Откройте equipment_catalog.csv в Excel для редактирования каталога.');

  } catch (error) {
    console.error('❌ Ошибка при создании Excel файла:', error);
  }
}

createExcelFile();










