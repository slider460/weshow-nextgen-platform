#!/usr/bin/env node

// Полный экспорт всего из Figma
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('🚀 Полный экспорт из Figma\n');

async function runScript(scriptName, description) {
  try {
    console.log(`📦 ${description}...`);
    const { stdout, stderr } = await execAsync(`node ${scriptName}`);
    
    if (stdout) {
      console.log(stdout);
    }
    
    if (stderr) {
      console.log(stderr);
    }
    
    console.log(`✅ ${description} завершен\n`);
  } catch (error) {
    console.log(`❌ Ошибка в ${description}:`, error.message);
  }
}

async function main() {
  console.log('🎨 Запуск полного экспорта из Figma\n');
  
  // Проверяем наличие токена
  const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;
  if (!FIGMA_TOKEN || FIGMA_TOKEN === 'your_token_here') {
    console.log('❌ Ошибка: Не установлен Figma API токен');
    console.log('💡 Добавьте токен в .env.local файл');
    console.log('   FIGMA_ACCESS_TOKEN=your_actual_token_here');
    console.log('\n📚 Инструкция:');
    console.log('1. Откройте https://www.figma.com/settings');
    console.log('2. Перейдите в Developer > Personal Access Tokens');
    console.log('3. Создайте новый токен');
    console.log('4. Добавьте токен в .env.local файл');
    console.log('5. Перезапустите этот скрипт');
    process.exit(1);
  }

  // Запускаем все скрипты экспорта
  await runScript('figma-export-images.js', 'Экспорт изображений');
  await runScript('figma-export-styles.js', 'Экспорт стилей и цветов');
  
  console.log('🎉 Полный экспорт завершен!');
  console.log('\n📁 Результаты:');
  console.log('├── public/figma-exports/');
  console.log('│   ├── images/ - Изображения');
  console.log('│   ├── icons/ - Иконки');
  console.log('│   └── styles/ - Стили и цвета');
  console.log('│       ├── figma-colors.css');
  console.log('│       ├── figma-typography.css');
  console.log('│       └── figma-gradients.css');
  console.log('\n🔧 Следующие шаги:');
  console.log('1. Проверьте экспортированные файлы');
  console.log('2. Импортируйте CSS файлы в ваш проект');
  console.log('3. Используйте изображения в компонентах');
  console.log('4. Настройте Tailwind с экспортированными цветами');
}

// Запуск
main().catch(console.error);



