import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎨 Настройка Figma API токена');
console.log('================================\n');

console.log('📝 Инструкции:');
console.log('1. Откройте Figma в браузере');
console.log('2. Перейдите в Settings (шестеренка в правом верхнем углу)');
console.log('3. Выберите "Developer" в левом меню');
console.log('4. Нажмите "Create new token"');
console.log('5. Введите название токена (например: "WeShow Platform")');
console.log('6. Скопируйте созданный токен\n');

rl.question('🔑 Введите ваш Figma API токен: ', (token) => {
  if (!token || token.trim() === '') {
    console.log('❌ Токен не введен. Настройка отменена.');
    rl.close();
    return;
  }

  // Создаем .env.local файл
  const envContent = `# Figma Configuration
# Получите токен в Figma: Settings > Developer > Personal Access Tokens
FIGMA_ACCESS_TOKEN=${token.trim()}

# ID документа из вашей ссылки
FIGMA_DOCUMENT_ID=if9cW5Ga1xyeUTGYc2ea9K

# Node ID для конкретного элемента
FIGMA_NODE_ID=998-2

# Дополнительные настройки
FIGMA_API_URL=https://api.figma.com/v1
FIGMA_TIMEOUT=10000
`;

  try {
    fs.writeFileSync('.env.local', envContent);
    console.log('\n✅ Токен сохранен в .env.local');
    console.log('🚀 Теперь можно запустить: node figma-direct-connect.js');
    
    // Загружаем переменные окружения
    process.env.FIGMA_ACCESS_TOKEN = token.trim();
    
    console.log('\n🔄 Запускаем подключение к Figma...');
    setTimeout(() => {
      import('./figma-direct-connect.js');
    }, 1000);
    
  } catch (error) {
    console.error('❌ Ошибка сохранения токена:', error.message);
  }
  
  rl.close();
});





