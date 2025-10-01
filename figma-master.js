import { execSync } from 'child_process';
import fs from 'fs';

console.log('🎨 Figma Master - Полный цикл интеграции');
console.log('==========================================\n');

async function runFigmaIntegration() {
  try {
    // 1. Проверяем наличие токена
    console.log('1️⃣ Проверка токена Figma...');
    if (!process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_ACCESS_TOKEN === 'your_token_here') {
      console.log('❌ Токен не настроен');
      console.log('🔄 Запускаем настройку токена...');
      
      try {
        execSync('node setup-figma-token.js', { stdio: 'inherit' });
      } catch (error) {
        console.log('❌ Ошибка настройки токена. Запустите вручную: node setup-figma-token.js');
        return;
      }
    } else {
      console.log('✅ Токен настроен');
    }

    // 2. Подключаемся к Figma
    console.log('\n2️⃣ Подключение к Figma...');
    try {
      execSync('node figma-direct-connect.js', { stdio: 'inherit' });
    } catch (error) {
      console.log('❌ Ошибка подключения к Figma');
      return;
    }

    // 3. Проверяем наличие данных
    if (!fs.existsSync('figma-data.json')) {
      console.log('❌ Файл figma-data.json не найден');
      return;
    }

    // 4. Генерируем React компонент
    console.log('\n3️⃣ Генерация React компонента...');
    try {
      execSync('node figma-to-react.js', { stdio: 'inherit' });
    } catch (error) {
      console.log('❌ Ошибка генерации компонента');
      return;
    }

    // 5. Обновляем App.tsx
    console.log('\n4️⃣ Обновление маршрутов...');
    try {
      updateAppRoutes();
    } catch (error) {
      console.log('❌ Ошибка обновления маршрутов');
      return;
    }

    console.log('\n🎉 Интеграция завершена!');
    console.log('📱 Откройте: http://localhost:8083/figma-demo');
    console.log('🔧 Или добавьте маршрут вручную в App.tsx');

  } catch (error) {
    console.error('❌ Критическая ошибка:', error.message);
  }
}

function updateAppRoutes() {
  const appPath = 'src/App.tsx';
  
  if (!fs.existsSync(appPath)) {
    console.log('❌ Файл App.tsx не найден');
    return;
  }

  let appContent = fs.readFileSync(appPath, 'utf8');
  
  // Добавляем импорт
  if (!appContent.includes('FigmaDemoPage')) {
    const importMatch = appContent.match(/(import.*from.*;\s*)+/);
    if (importMatch) {
      const lastImport = importMatch[0].split('\n').pop();
      appContent = appContent.replace(lastImport, lastImport + '\nimport FigmaDemoPage from \'./pages/FigmaDemoPage\';');
    }
  }
  
  // Добавляем маршрут
  if (!appContent.includes('/figma-demo')) {
    const routeMatch = appContent.match(/(<Route.*\/>[\s\S]*?<\/Route>)/);
    if (routeMatch) {
      const lastRoute = routeMatch[0].split('\n').pop();
      appContent = appContent.replace(lastRoute, lastRoute + '\n        <Route path="/figma-demo" element={<FigmaDemoPage />} />');
    }
  }
  
  fs.writeFileSync(appPath, appContent);
  console.log('✅ Маршруты обновлены');
}

// Запуск
runFigmaIntegration();




