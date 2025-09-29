import https from 'https';
import fs from 'fs';

// Конфигурация Figma
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN || 'your_token_here';
const FIGMA_DOCUMENT_ID = 'if9cW5Ga1xyeUTGYc2ea9K';
const FIGMA_NODE_ID = '998-2'; // Новый node ID из вашей ссылки

// Функция для запроса к Figma API
function makeFigmaRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      port: 443,
      path: endpoint,
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_ACCESS_TOKEN,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(new Error(`Ошибка парсинга JSON: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Ошибка запроса: ${error.message}`));
    });

    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Таймаут запроса'));
    });

    req.end();
  });
}

// Основная функция
async function connectToFigma() {
  console.log('🎨 Подключение к Figma...');
  console.log(`📄 Документ ID: ${FIGMA_DOCUMENT_ID}`);
  console.log(`🎯 Node ID: ${FIGMA_NODE_ID}`);
  
  try {
    // 1. Получаем информацию о документе
    console.log('\n1️⃣ Получение информации о документе...');
    const documentInfo = await makeFigmaRequest(`/v1/files/${FIGMA_DOCUMENT_ID}`);
    console.log('✅ Документ получен:', documentInfo.name);
    
    // 2. Получаем информацию о конкретном узле
    console.log('\n2️⃣ Получение информации о узле...');
    const nodeInfo = await makeFigmaRequest(`/v1/files/${FIGMA_DOCUMENT_ID}/nodes?ids=${FIGMA_NODE_ID}`);
    console.log('✅ Узел получен');
    
    // 3. Получаем стили документа
    console.log('\n3️⃣ Получение стилей...');
    const styles = await makeFigmaRequest(`/v1/files/${FIGMA_DOCUMENT_ID}/styles`);
    console.log('✅ Стили получены');
    
    // 4. Получаем изображения
    console.log('\n4️⃣ Получение изображений...');
    const images = await makeFigmaRequest(`/v1/files/${FIGMA_DOCUMENT_ID}/images?ids=${FIGMA_NODE_ID}`);
    console.log('✅ Изображения получены');
    
    // Сохраняем данные
    const figmaData = {
      document: documentInfo,
      node: nodeInfo,
      styles: styles,
      images: images,
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync('figma-data.json', JSON.stringify(figmaData, null, 2));
    console.log('\n💾 Данные сохранены в figma-data.json');
    
    // Анализируем структуру
    console.log('\n📊 Анализ структуры:');
    if (nodeInfo.nodes && nodeInfo.nodes[FIGMA_NODE_ID]) {
      const node = nodeInfo.nodes[FIGMA_NODE_ID].document;
      console.log(`- Тип узла: ${node.type}`);
      console.log(`- Имя: ${node.name}`);
      console.log(`- Дочерние элементы: ${node.children ? node.children.length : 0}`);
      
      if (node.children) {
        console.log('\n🔍 Дочерние элементы:');
        node.children.forEach((child, index) => {
          console.log(`  ${index + 1}. ${child.name} (${child.type})`);
        });
      }
    }
    
    console.log('\n🎉 Успешное подключение к Figma!');
    return figmaData;
    
  } catch (error) {
    console.error('❌ Ошибка подключения к Figma:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n🔑 Проблема с токеном доступа:');
      console.log('1. Получите токен в Figma: Settings > Developer > Personal Access Tokens');
      console.log('2. Установите переменную окружения: export FIGMA_ACCESS_TOKEN=your_token');
      console.log('3. Или создайте файл .env.local с FIGMA_ACCESS_TOKEN=your_token');
    }
    
    return null;
  }
}

// Запуск
if (FIGMA_ACCESS_TOKEN === 'your_token_here') {
  console.log('⚠️  Токен Figma не настроен!');
  console.log('📝 Инструкции:');
  console.log('1. Откройте Figma');
  console.log('2. Перейдите в Settings > Developer > Personal Access Tokens');
  console.log('3. Создайте новый токен');
  console.log('4. Установите переменную окружения:');
  console.log('   export FIGMA_ACCESS_TOKEN=your_token_here');
  console.log('5. Запустите скрипт снова: node figma-direct-connect.js');
} else {
  connectToFigma();
}



