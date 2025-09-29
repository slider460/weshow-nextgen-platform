// Тест подключения к Figma
import https from 'https';

// Функция для тестирования подключения к Figma
async function testFigmaConnection() {
  console.log('🔍 Тестирование подключения к Figma...');
  
  try {
    // Проверяем доступность Figma API
    const response = await fetch('https://api.figma.com/v1/me', {
      method: 'GET',
      headers: {
        'X-Figma-Token': 'test-token' // Заглушка для тестирования
      }
    });
    
    console.log('✅ Figma API доступен');
    console.log('📊 Статус:', response.status);
    
  } catch (error) {
    console.log('❌ Ошибка подключения к Figma:', error.message);
    console.log('💡 Возможные причины:');
    console.log('   - Нет интернет-соединения');
    console.log('   - Figma API недоступен');
    console.log('   - Неправильный API ключ');
  }
}

// Функция для проверки доступности Figma через браузер
function checkFigmaWebAccess() {
  console.log('🌐 Проверка доступности Figma через веб...');
  
  const options = {
    hostname: 'www.figma.com',
    port: 443,
    path: '/',
    method: 'GET'
  };
  
  const req = https.request(options, (res) => {
    console.log('✅ Figma веб-сайт доступен');
    console.log('📊 Статус:', res.statusCode);
  });
  
  req.on('error', (error) => {
    console.log('❌ Ошибка доступа к Figma веб-сайту:', error.message);
  });
  
  req.end();
}

// Запуск тестов
console.log('🚀 Запуск тестов подключения к Figma...\n');

testFigmaConnection().then(() => {
  console.log('\n');
  checkFigmaWebAccess();
});
