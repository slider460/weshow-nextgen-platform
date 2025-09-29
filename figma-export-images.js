#!/usr/bin/env node

// Автоматический экспорт изображений из Figma
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🖼️  Автоматический экспорт изображений из Figma\n');

// Конфигурация
const FIGMA_API_BASE = 'https://api.figma.com/v1';
const FIGMA_DOCUMENT_ID = process.env.FIGMA_DOCUMENT_ID || 'if9cW5Ga1xyeUTGYc2ea9K';
const FIGMA_NODE_ID = process.env.FIGMA_NODE_ID || '287-2';
const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

if (!FIGMA_TOKEN || FIGMA_TOKEN === 'your_token_here') {
  console.log('❌ Ошибка: Не установлен Figma API токен');
  console.log('💡 Добавьте токен в .env.local файл');
  console.log('   FIGMA_ACCESS_TOKEN=your_actual_token_here');
  process.exit(1);
}

// Создаем папки для экспорта
const exportDir = join(process.cwd(), 'public', 'figma-exports');
const imagesDir = join(exportDir, 'images');
const iconsDir = join(exportDir, 'icons');

[exportDir, imagesDir, iconsDir].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    console.log(`📁 Создана папка: ${dir}`);
  }
});

// Функция для экспорта изображений
async function exportImages() {
  try {
    console.log('🔍 Получение информации о документе...');
    
    // Получаем информацию о документе
    const docResponse = await fetch(`${FIGMA_API_BASE}/files/${FIGMA_DOCUMENT_ID}`, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    });

    if (!docResponse.ok) {
      throw new Error(`Ошибка получения документа: ${docResponse.status}`);
    }

    const docData = await docResponse.json();
    console.log(`✅ Документ: ${docData.name}`);

    // Получаем изображения для конкретного узла
    console.log('🖼️  Экспорт изображений...');
    const imagesResponse = await fetch(`${FIGMA_API_BASE}/images/${FIGMA_DOCUMENT_ID}?ids=${FIGMA_NODE_ID}&format=png&scale=2`, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    });

    if (!imagesResponse.ok) {
      throw new Error(`Ошибка экспорта изображений: ${imagesResponse.status}`);
    }

    const imagesData = await imagesResponse.json();
    
    if (imagesData.images && imagesData.images[FIGMA_NODE_ID]) {
      const imageUrl = imagesData.images[FIGMA_NODE_ID];
      console.log(`📥 Скачивание изображения: ${imageUrl}`);
      
      // Скачиваем изображение
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = await imageResponse.arrayBuffer();
      
      // Сохраняем изображение
      const imagePath = join(imagesDir, `node-${FIGMA_NODE_ID}.png`);
      writeFileSync(imagePath, Buffer.from(imageBuffer));
      
      console.log(`✅ Изображение сохранено: ${imagePath}`);
    } else {
      console.log('⚠️  Изображение не найдено для указанного узла');
    }

    // Экспортируем все изображения из документа
    console.log('🔄 Поиск всех изображений в документе...');
    await exportAllImages(docData);

  } catch (error) {
    console.log('❌ Ошибка:', error.message);
  }
}

// Функция для экспорта всех изображений
async function exportAllImages(docData) {
  const imageNodes = [];
  
  // Рекурсивно ищем все узлы с изображениями
  function findImageNodes(node) {
    if (node.type === 'RECTANGLE' && node.fills) {
      const hasImage = node.fills.some(fill => fill.type === 'IMAGE');
      if (hasImage) {
        imageNodes.push(node.id);
      }
    }
    
    if (node.children) {
      node.children.forEach(child => findImageNodes(child));
    }
  }

  findImageNodes(docData.document);
  
  if (imageNodes.length === 0) {
    console.log('ℹ️  Изображения не найдены в документе');
    return;
  }

  console.log(`📊 Найдено ${imageNodes.length} изображений`);

  // Экспортируем все найденные изображения
  const nodeIds = imageNodes.join(',');
  const imagesResponse = await fetch(`${FIGMA_API_BASE}/images/${FIGMA_DOCUMENT_ID}?ids=${nodeIds}&format=png&scale=2`, {
    headers: {
      'X-Figma-Token': FIGMA_TOKEN
    }
  });

  if (!imagesResponse.ok) {
    throw new Error(`Ошибка экспорта всех изображений: ${imagesResponse.status}`);
  }

  const imagesData = await imagesResponse.json();
  
  let exportedCount = 0;
  for (const [nodeId, imageUrl] of Object.entries(imagesData.images)) {
    if (imageUrl) {
      try {
        const imageResponse = await fetch(imageUrl);
        const imageBuffer = await imageResponse.arrayBuffer();
        
        const imagePath = join(imagesDir, `image-${nodeId}.png`);
        writeFileSync(imagePath, Buffer.from(imageBuffer));
        
        console.log(`✅ Экспортировано: image-${nodeId}.png`);
        exportedCount++;
      } catch (error) {
        console.log(`⚠️  Ошибка экспорта ${nodeId}:`, error.message);
      }
    }
  }

  console.log(`🎉 Успешно экспортировано ${exportedCount} изображений`);
}

// Функция для экспорта иконок в SVG
async function exportIcons() {
  try {
    console.log('🎯 Экспорт иконок в SVG...');
    
    // Получаем информацию о документе
    const docResponse = await fetch(`${FIGMA_API_BASE}/files/${FIGMA_DOCUMENT_ID}`, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    });

    if (!docResponse.ok) {
      throw new Error(`Ошибка получения документа: ${docResponse.status}`);
    }

    const docData = await docResponse.json();
    
    // Ищем иконки (обычно это FRAME или COMPONENT с маленькими размерами)
    const iconNodes = [];
    
    function findIconNodes(node) {
      if ((node.type === 'FRAME' || node.type === 'COMPONENT') && 
          node.absoluteBoundingBox && 
          node.absoluteBoundingBox.width < 100 && 
          node.absoluteBoundingBox.height < 100) {
        iconNodes.push(node.id);
      }
      
      if (node.children) {
        node.children.forEach(child => findIconNodes(child));
      }
    }

    findIconNodes(docData.document);
    
    if (iconNodes.length === 0) {
      console.log('ℹ️  Иконки не найдены');
      return;
    }

    console.log(`📊 Найдено ${iconNodes.length} иконок`);

    // Экспортируем иконки в SVG
    const nodeIds = iconNodes.join(',');
    const iconsResponse = await fetch(`${FIGMA_API_BASE}/images/${FIGMA_DOCUMENT_ID}?ids=${nodeIds}&format=svg`, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    });

    if (!iconsResponse.ok) {
      throw new Error(`Ошибка экспорта иконок: ${iconsResponse.status}`);
    }

    const iconsData = await iconsResponse.json();
    
    let exportedCount = 0;
    for (const [nodeId, iconUrl] of Object.entries(iconsData.images)) {
      if (iconUrl) {
        try {
          const iconResponse = await fetch(iconUrl);
          const iconSvg = await iconResponse.text();
          
          const iconPath = join(iconsDir, `icon-${nodeId}.svg`);
          writeFileSync(iconPath, iconSvg);
          
          console.log(`✅ Иконка экспортирована: icon-${nodeId}.svg`);
          exportedCount++;
        } catch (error) {
          console.log(`⚠️  Ошибка экспорта иконки ${nodeId}:`, error.message);
        }
      }
    }

    console.log(`🎉 Успешно экспортировано ${exportedCount} иконок`);

  } catch (error) {
    console.log('❌ Ошибка экспорта иконок:', error.message);
  }
}

// Основная функция
async function main() {
  console.log('🚀 Запуск автоматического экспорта...\n');
  
  await exportImages();
  console.log('');
  await exportIcons();
  
  console.log('\n✅ Экспорт завершен!');
  console.log(`📁 Файлы сохранены в: ${exportDir}`);
  console.log('🖼️  Изображения: public/figma-exports/images/');
  console.log('🎯 Иконки: public/figma-exports/icons/');
}

// Запуск
main().catch(console.error);



