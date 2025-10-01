import fs from 'fs';

console.log('🎨 Генерация React компонента из реальных данных Figma');
console.log('======================================================\n');

function generateRealFigmaComponent() {
  try {
    // Загружаем данные
    const figmaData = JSON.parse(fs.readFileSync('figma-real-data.json', 'utf8'));
    console.log('✅ Данные Figma загружены');

    const node = figmaData.node.nodes['998-2']?.document;
    if (!node) {
      console.log('❌ Узел не найден в данных');
      return;
    }

    console.log(`📄 Обрабатываем: ${node.name} (${node.type})`);

    // Анализируем структуру и создаем компонент
    function analyzeNode(node, depth = 0) {
      const indent = '  '.repeat(depth);
      let result = '';

      // Получаем стили
      const fills = node.fills || [];
      const backgroundColor = fills.length > 0 && fills[0].color ? 
        `rgb(${Math.round(fills[0].color.r * 255)}, ${Math.round(fills[0].color.g * 255)}, ${Math.round(fills[0].color.b * 255)})` : 
        'transparent';

      const opacity = fills.length > 0 && fills[0].opacity ? fills[0].opacity : 1;

      // Получаем размеры
      const width = node.absoluteBoundingBox?.width || 'auto';
      const height = node.absoluteBoundingBox?.height || 'auto';

      // Получаем позицию
      const x = node.absoluteBoundingBox?.x || 0;
      const y = node.absoluteBoundingBox?.y || 0;

      // Обрабатываем разные типы узлов
      if (node.type === 'FRAME' || node.type === 'GROUP') {
        const className = `figma-${node.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        
        result += `${indent}<div \n`;
        result += `${indent}  className="${className}"\n`;
        result += `${indent}  style={{\n`;
        result += `${indent}    position: 'absolute',\n`;
        result += `${indent}    left: ${x}px,\n`;
        result += `${indent}    top: ${y}px,\n`;
        result += `${indent}    width: ${width}px,\n`;
        result += `${indent}    height: ${height}px,\n`;
        result += `${indent}    backgroundColor: '${backgroundColor}',\n`;
        result += `${indent}    opacity: ${opacity},\n`;
        result += `${indent}    borderRadius: ${node.cornerRadius || 0}px\n`;
        result += `${indent}  }}\n`;
        result += `${indent}>\n`;
        
        if (node.children) {
          node.children.forEach(child => {
            result += analyzeNode(child, depth + 1);
          });
        }
        
        result += `${indent}</div>\n`;
      } 
      else if (node.type === 'TEXT') {
        const textContent = node.characters || 'Текст';
        const fontSize = node.style?.fontSize || 16;
        const fontWeight = node.style?.fontWeight || 400;
        const fontFamily = node.style?.fontFamily || 'Arial';
        const textAlign = node.style?.textAlignHorizontal || 'left';
        const color = fills.length > 0 && fills[0].color ? 
          `rgb(${Math.round(fills[0].color.r * 255)}, ${Math.round(fills[0].color.g * 255)}, ${Math.round(fills[0].color.b * 255)})` : 
          '#000000';

        const tagName = fontSize >= 24 ? 'h1' : fontSize >= 20 ? 'h2' : fontSize >= 18 ? 'h3' : 'p';
        
        result += `${indent}<${tagName} \n`;
        result += `${indent}  className="figma-text"\n`;
        result += `${indent}  style={{\n`;
        result += `${indent}    position: 'absolute',\n`;
        result += `${indent}    left: ${x}px,\n`;
        result += `${indent}    top: ${y}px,\n`;
        result += `${indent}    fontSize: ${fontSize}px,\n`;
        result += `${indent}    fontWeight: ${fontWeight},\n`;
        result += `${indent}    fontFamily: '${fontFamily}',\n`;
        result += `${indent}    color: '${color}',\n`;
        result += `${indent}    textAlign: '${textAlign}',\n`;
        result += `${indent}    margin: 0,\n`;
        result += `${indent}    lineHeight: 1.2\n`;
        result += `${indent}  }}\n`;
        result += `${indent}>\n`;
        result += `${indent}  ${textContent}\n`;
        result += `${indent}</${tagName}>\n`;
      }
      else if (node.type === 'RECTANGLE') {
        const className = `figma-rectangle figma-${node.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        
        result += `${indent}<div \n`;
        result += `${indent}  className="${className}"\n`;
        result += `${indent}  style={{\n`;
        result += `${indent}    position: 'absolute',\n`;
        result += `${indent}    left: ${x}px,\n`;
        result += `${indent}    top: ${y}px,\n`;
        result += `${indent}    width: ${width}px,\n`;
        result += `${indent}    height: ${height}px,\n`;
        result += `${indent}    backgroundColor: '${backgroundColor}',\n`;
        result += `${indent}    opacity: ${opacity},\n`;
        result += `${indent}    borderRadius: ${node.cornerRadius || 0}px\n`;
        result += `${indent}  }}\n`;
        result += `${indent}></div>\n`;
      }
      else if (node.type === 'ELLIPSE') {
        const className = `figma-ellipse figma-${node.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
        
        result += `${indent}<div \n`;
        result += `${indent}  className="${className}"\n`;
        result += `${indent}  style={{\n`;
        result += `${indent}    position: 'absolute',\n`;
        result += `${indent}    left: ${x}px,\n`;
        result += `${indent}    top: ${y}px,\n`;
        result += `${indent}    width: ${width}px,\n`;
        result += `${indent}    height: ${height}px,\n`;
        result += `${indent}    backgroundColor: '${backgroundColor}',\n`;
        result += `${indent}    opacity: ${opacity},\n`;
        result += `${indent}    borderRadius: '50%'\n`;
        result += `${indent}  }}\n`;
        result += `${indent}></div>\n`;
      }

      return result;
    }

    // Генерируем React компонент
    const componentName = 'FigmaRealComponent';
    const componentContent = `import React, { useState, useEffect } from 'react';
import './FigmaRealComponent.css';

const ${componentName} = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="figma-real-container">
      <div className={\`figma-content \${isLoaded ? 'loaded' : ''}\`}>
        {/* Автоматически сгенерированный контент из Figma */}
${analyzeNode(node, 2)}
      </div>
    </div>
  );
};

export default ${componentName};`;

    // Генерируем CSS
    const cssContent = `/* Автоматически сгенерированный CSS из Figma */
.figma-real-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow: hidden;
}

.figma-content {
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease;
}

.figma-content.loaded {
  opacity: 1;
  transform: translateY(0);
}

.figma-text {
  transition: all 0.3s ease;
}

.figma-text:hover {
  transform: scale(1.05);
}

.figma-rectangle {
  transition: all 0.3s ease;
  cursor: pointer;
}

.figma-rectangle:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.figma-ellipse {
  transition: all 0.3s ease;
  cursor: pointer;
}

.figma-ellipse:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Адаптивность */
@media (max-width: 768px) {
  .figma-real-container {
    padding: 20px;
  }
  
  .figma-content {
    transform: scale(0.8);
    transform-origin: top left;
  }
}

@media (max-width: 480px) {
  .figma-content {
    transform: scale(0.6);
    transform-origin: top left;
  }
}`;

    // Создаем демо страницу
    const pageContent = `import React from 'react';
import FigmaRealComponent from '../components/FigmaRealComponent';

const FigmaRealPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Реальный дизайн из Figma
          </h1>
          <p className="text-gray-600 text-lg">
            Автоматически сгенерированный компонент на основе данных из Figma API
          </p>
        </div>
        <FigmaRealComponent />
      </div>
    </div>
  );
};

export default FigmaRealPage;`;

    // Сохраняем файлы
    fs.writeFileSync('src/components/FigmaRealComponent.tsx', componentContent);
    fs.writeFileSync('src/components/FigmaRealComponent.css', cssContent);
    fs.writeFileSync('src/pages/FigmaRealPage.tsx', pageContent);
    
    console.log('✅ React компонент создан: src/components/FigmaRealComponent.tsx');
    console.log('✅ CSS файл создан: src/components/FigmaRealComponent.css');
    console.log('✅ Демо страница создана: src/pages/FigmaRealPage.tsx');
    
    // Обновляем App.tsx
    updateAppRoutes();
    
    console.log('\n🎉 Компонент готов!');
    console.log('📱 Откройте: http://localhost:8083/figma-real');
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    console.log('💡 Сначала запустите: node setup-real-figma.js');
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
  if (!appContent.includes('FigmaRealPage')) {
    const importMatch = appContent.match(/(import.*from.*;\s*)+/);
    if (importMatch) {
      const lastImport = importMatch[0].split('\n').pop();
      appContent = appContent.replace(lastImport, lastImport + '\nimport FigmaRealPage from \'./pages/FigmaRealPage\';');
    }
  }
  
  // Добавляем маршрут
  if (!appContent.includes('/figma-real')) {
    const routeMatch = appContent.match(/(<Route.*\/>[\s\S]*?<\/Route>)/);
    if (routeMatch) {
      const lastRoute = routeMatch[0].split('\n').pop();
      appContent = appContent.replace(lastRoute, lastRoute + '\n        <Route path="/figma-real" element={<FigmaRealPage />} />');
    }
  }
  
  fs.writeFileSync(appPath, appContent);
  console.log('✅ Маршруты обновлены');
}

// Запуск
generateRealFigmaComponent();




