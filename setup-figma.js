#!/usr/bin/env node

// Автоматическая настройка Figma
import { writeFileSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🎨 Настройка подключения к Figma\n');

// Создаем файл конфигурации
const configContent = `# Figma Configuration
# Получите токен в Figma: Settings > Developer > Personal Access Tokens
FIGMA_ACCESS_TOKEN=your_token_here

# ID документа из вашей ссылки
FIGMA_DOCUMENT_ID=if9cW5Ga1xyeUTGYc2ea9K

# Node ID для конкретного элемента
FIGMA_NODE_ID=287-2
`;

const envPath = join(process.cwd(), '.env.local');

if (existsSync(envPath)) {
  console.log('⚠️  Файл .env.local уже существует');
  console.log('📝 Добавьте следующие переменные в ваш .env.local:');
  console.log(configContent);
} else {
  try {
    writeFileSync(envPath, configContent);
    console.log('✅ Создан файл .env.local');
    console.log('📝 Отредактируйте файл и добавьте ваш Figma токен');
  } catch (error) {
    console.log('❌ Ошибка создания файла:', error.message);
  }
}

console.log('\n🔧 Следующие шаги:');
console.log('1. Получите токен в Figma: https://www.figma.com/settings');
console.log('2. Отредактируйте .env.local и добавьте токен');
console.log('3. Перезапустите сервер разработки');
console.log('4. Проверьте статус подключения в правом верхнем углу сайта');

console.log('\n📚 Дополнительная информация:');
console.log('- Руководство: FIGMA_SETUP_GUIDE.md');
console.log('- Тест API: node figma-api-test.js --token=your_token');
console.log('- Тест подключения: node figma-connection-test.js');
