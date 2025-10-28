import readline from 'readline';
import fs from 'fs';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎨 Настройка реального подключения к Figma');
console.log('==========================================\n');

console.log('📋 Пошаговая инструкция:');
console.log('1. Откройте https://www.figma.com/design/if9cW5Ga1xyeUTGYc2ea9K/HM?node-id=998-2&t=cso5IfHpnwawJG0S-4');
console.log('2. Войдите в свой аккаунт Figma');
console.log('3. Нажмите на шестеренку (Settings) в правом верхнем углу');
console.log('4. Выберите "Developer" в левом меню');
console.log('5. Нажмите "Create new token"');
console.log('6. Введите название: "WeShow Platform"');
console.log('7. Скопируйте созданный токен\n');

rl.question('🔑 Введите ваш Figma API токен: ', async (token) => {
  if (!token || token.trim() === '') {
    console.log('❌ Токен не введен. Настройка отменена.');
    rl.close();
    return;
  }

  console.log('\n🔄 Настройка подключения...');

  // Создаем .env.local
  const envContent = `# Figma Configuration
FIGMA_ACCESS_TOKEN=${token.trim()}
FIGMA_DOCUMENT_ID=if9cW5Ga1xyeUTGYc2ea9K
FIGMA_NODE_ID=998-2
FIGMA_API_URL=https://api.figma.com/v1
FIGMA_TIMEOUT=10000
`;

  try {
    fs.writeFileSync('.env.local', envContent);
    console.log('✅ Токен сохранен в .env.local');
  } catch (error) {
    console.error('❌ Ошибка сохранения токена:', error.message);
    rl.close();
    return;
  }

  // Тестируем подключение
  console.log('\n🧪 Тестирование подключения к Figma...');
  
  try {
    const { default: https } = await import('https');
    
    const testConnection = () => {
      return new Promise((resolve, reject) => {
        const options = {
          hostname: 'api.figma.com',
          port: 443,
          path: '/v1/files/if9cW5Ga1xyeUTGYc2ea9K',
          method: 'GET',
          headers: {
            'X-Figma-Token': token.trim(),
            'Content-Type': 'application/json'
          }
        };

        const req = https.request(options, (res) => {
          let data = '';
          
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            if (res.statusCode === 200) {
              resolve(JSON.parse(data));
            } else {
              reject(new Error(`HTTP ${res.statusCode}: ${data}`));
            }
          });
        });

        req.on('error', (error) => {
          reject(error);
        });

        req.setTimeout(10000, () => {
          req.destroy();
          reject(new Error('Таймаут подключения'));
        });

        req.end();
      });
    };

    const documentData = await testConnection();
    console.log('✅ Подключение успешно!');
    console.log(`📄 Документ: ${documentData.name}`);
    console.log(`📅 Последнее изменение: ${new Date(documentData.lastModified).toLocaleString()}`);

    // Получаем данные узла
    console.log('\n🎯 Получение данных узла...');
    
    const getNodeData = () => {
      return new Promise((resolve, reject) => {
        const options = {
          hostname: 'api.figma.com',
          port: 443,
          path: '/v1/files/if9cW5Ga1xyeUTGYc2ea9K/nodes?ids=998-2',
          method: 'GET',
          headers: {
            'X-Figma-Token': token.trim(),
            'Content-Type': 'application/json'
          }
        };

        const req = https.request(options, (res) => {
          let data = '';
          
          res.on('data', (chunk) => {
            data += chunk;
          });
          
          res.on('end', () => {
            if (res.statusCode === 200) {
              resolve(JSON.parse(data));
            } else {
              reject(new Error(`HTTP ${res.statusCode}: ${data}`));
            }
          });
        });

        req.on('error', (error) => {
          reject(error);
        });

        req.setTimeout(10000, () => {
          req.destroy();
          reject(new Error('Таймаут получения узла'));
        });

        req.end();
      });
    };

    const nodeData = await getNodeData();
    console.log('✅ Данные узла получены!');
    
    if (nodeData.nodes && nodeData.nodes['998-2']) {
      const node = nodeData.nodes['998-2'].document;
      console.log(`🎨 Узел: ${node.name} (${node.type})`);
      console.log(`👥 Дочерних элементов: ${node.children ? node.children.length : 0}`);
      
      if (node.children) {
        console.log('\n📋 Структура элементов:');
        node.children.forEach((child, index) => {
          console.log(`  ${index + 1}. ${child.name} (${child.type})`);
        });
      }
    }

    // Сохраняем все данные
    const fullData = {
      document: documentData,
      node: nodeData,
      timestamp: new Date().toISOString(),
      token: token.trim()
    };

    fs.writeFileSync('figma-real-data.json', JSON.stringify(fullData, null, 2));
    console.log('\n💾 Данные сохранены в figma-real-data.json');

    console.log('\n🎉 Настройка завершена!');
    console.log('📱 Теперь можно использовать реальные данные из Figma');
    console.log('🔧 Запустите: node figma-to-react-real.js');

  } catch (error) {
    console.error('❌ Ошибка подключения:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n🔑 Проблема с токеном:');
      console.log('- Проверьте правильность токена');
      console.log('- Убедитесь, что токен активен');
      console.log('- Попробуйте создать новый токен');
    } else if (error.message.includes('403')) {
      console.log('\n🚫 Проблема с доступом:');
      console.log('- Убедитесь, что у вас есть доступ к документу');
      console.log('- Проверьте права доступа к файлу');
    }
  }

  rl.close();
});















