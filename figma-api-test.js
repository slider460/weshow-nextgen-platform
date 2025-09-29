// Тест Figma API с реальным ключом
import https from 'https';

// Конфигурация
const FIGMA_API_BASE = 'https://api.figma.com/v1';
const FIGMA_DOCUMENT_ID = 'if9cW5Ga1xyeUTGYc2ea9K'; // ID из вашей ссылки

// Функция для тестирования API с токеном
async function testFigmaAPIWithToken(token) {
  console.log('🔑 Тестирование Figma API с токеном...');
  
  try {
    // Тест 1: Получение информации о пользователе
    console.log('📊 Тест 1: Получение информации о пользователе');
    const userResponse = await fetch(`${FIGMA_API_BASE}/me`, {
      method: 'GET',
      headers: {
        'X-Figma-Token': token
      }
    });
    
    if (userResponse.ok) {
      const userData = await userResponse.json();
      console.log('✅ Пользователь:', userData.email);
    } else {
      console.log('❌ Ошибка пользователя:', userResponse.status, userResponse.statusText);
    }
    
    // Тест 2: Получение информации о документе
    console.log('\n📊 Тест 2: Получение информации о документе');
    const docResponse = await fetch(`${FIGMA_API_BASE}/files/${FIGMA_DOCUMENT_ID}`, {
      method: 'GET',
      headers: {
        'X-Figma-Token': token
      }
    });
    
    if (docResponse.ok) {
      const docData = await docResponse.json();
      console.log('✅ Документ:', docData.name);
      console.log('📄 Страниц:', docData.document.children.length);
    } else {
      console.log('❌ Ошибка документа:', docResponse.status, docResponse.statusText);
    }
    
    // Тест 3: Получение изображений
    console.log('\n📊 Тест 3: Получение изображений');
    const imagesResponse = await fetch(`${FIGMA_API_BASE}/images/${FIGMA_DOCUMENT_ID}?ids=287-2&format=png`, {
      method: 'GET',
      headers: {
        'X-Figma-Token': token
      }
    });
    
    if (imagesResponse.ok) {
      const imagesData = await imagesResponse.json();
      console.log('✅ Изображения получены');
      console.log('🖼️ Количество:', Object.keys(imagesData.images).length);
    } else {
      console.log('❌ Ошибка изображений:', imagesResponse.status, imagesResponse.statusText);
    }
    
  } catch (error) {
    console.log('❌ Ошибка API:', error.message);
  }
}

// Функция для интерактивного ввода токена
function promptForToken() {
  console.log('🔑 Введите ваш Figma Personal Access Token:');
  console.log('💡 Получить токен можно в Figma: Settings > Developer > Personal Access Tokens');
  console.log('⚠️  Токен будет использован только для тестирования и не сохраняется');
  
  // В реальном приложении используйте readline или другой способ ввода
  console.log('\n📝 Для тестирования создайте файл .env.local с содержимым:');
  console.log('FIGMA_ACCESS_TOKEN=your_token_here');
  console.log('\nЗатем запустите: node figma-api-test.js --token=your_token_here');
}

// Основная функция
async function main() {
  console.log('🚀 Тест Figma API\n');
  
  // Проверяем аргументы командной строки
  const args = process.argv.slice(2);
  const tokenArg = args.find(arg => arg.startsWith('--token='));
  
  if (tokenArg) {
    const token = tokenArg.split('=')[1];
    await testFigmaAPIWithToken(token);
  } else {
    promptForToken();
  }
}

// Запуск
main().catch(console.error);