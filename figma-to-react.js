import fs from 'fs';
import path from 'path';

// Функция для анализа Figma данных и создания React компонента
function generateReactComponent(figmaData) {
  if (!figmaData || !figmaData.node) {
    console.log('❌ Нет данных Figma для обработки');
    return;
  }

  const node = figmaData.node.nodes[Object.keys(figmaData.node.nodes)[0]]?.document;
  if (!node) {
    console.log('❌ Не удалось найти узел в данных Figma');
    return;
  }

  console.log('🎨 Создание React компонента на основе Figma...');
  console.log(`📄 Обрабатываем узел: ${node.name} (${node.type})`);

  // Анализируем стили
  const styles = figmaData.styles?.meta || {};
  const images = figmaData.images?.images || {};

  // Создаем CSS переменные из стилей
  let cssVariables = '';
  let componentStyles = '';

  // Анализируем узлы и создаем компоненты
  function analyzeNode(node, depth = 0) {
    const indent = '  '.repeat(depth);
    let result = '';

    if (node.type === 'FRAME' || node.type === 'GROUP') {
      result += `${indent}<div className="figma-${node.name.toLowerCase().replace(/\s+/g, '-')}">\n`;
      
      if (node.children) {
        node.children.forEach(child => {
          result += analyzeNode(child, depth + 1);
        });
      }
      
      result += `${indent}</div>\n`;
    } else if (node.type === 'TEXT') {
      const textContent = node.characters || 'Текст';
      const fontSize = node.style?.fontSize || 16;
      const fontWeight = node.style?.fontWeight || 400;
      const color = node.fills?.[0]?.color ? 
        `rgb(${Math.round(node.fills[0].color.r * 255)}, ${Math.round(node.fills[0].color.g * 255)}, ${Math.round(node.fills[0].color.b * 255)})` : 
        '#000000';
      
      result += `${indent}<h${Math.min(6, Math.max(1, Math.floor(fontSize / 12)))} className="figma-text" style={{fontSize: '${fontSize}px', fontWeight: ${fontWeight}, color: '${color}'}}>\n`;
      result += `${indent}  ${textContent}\n`;
      result += `${indent}</h${Math.min(6, Math.max(1, Math.floor(fontSize / 12)))}>\n`;
    } else if (node.type === 'RECTANGLE') {
      const width = node.absoluteBoundingBox?.width || 100;
      const height = node.absoluteBoundingBox?.height || 100;
      const backgroundColor = node.fills?.[0]?.color ? 
        `rgb(${Math.round(node.fills[0].color.r * 255)}, ${Math.round(node.fills[0].color.g * 255)}, ${Math.round(node.fills[0].color.b * 255)})` : 
        '#cccccc';
      
      result += `${indent}<div className="figma-rectangle" style={{width: '${width}px', height: '${height}px', backgroundColor: '${backgroundColor}'}}></div>\n`;
    } else if (node.type === 'ELLIPSE') {
      const width = node.absoluteBoundingBox?.width || 100;
      const height = node.absoluteBoundingBox?.height || 100;
      const backgroundColor = node.fills?.[0]?.color ? 
        `rgb(${Math.round(node.fills[0].color.r * 255)}, ${Math.round(node.fills[0].color.g * 255)}, ${Math.round(node.fills[0].color.b * 255)})` : 
        '#cccccc';
      
      result += `${indent}<div className="figma-ellipse" style={{width: '${width}px', height: '${height}px', backgroundColor: '${backgroundColor}', borderRadius: '50%'}}></div>\n`;
    }

    return result;
  }

  // Генерируем React компонент
  const componentName = 'FigmaGeneratedComponent';
  const componentContent = `import React from 'react';
import './FigmaGeneratedComponent.css';

const ${componentName} = () => {
  return (
    <div className="figma-container">
${analyzeNode(node, 1)}
    </div>
  );
};

export default ${componentName};`;

  // Генерируем CSS
  const cssContent = `/* Автоматически сгенерированный CSS на основе Figma */
.figma-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.figma-text {
  margin: 0;
  line-height: 1.2;
}

.figma-rectangle {
  border-radius: 4px;
}

.figma-ellipse {
  border-radius: 50%;
}

/* Стили для конкретных элементов */
${cssVariables}

/* Дополнительные стили */
${componentStyles}`;

  // Сохраняем файлы
  const componentPath = 'src/components/FigmaGeneratedComponent.tsx';
  const cssPath = 'src/components/FigmaGeneratedComponent.css';

  try {
    fs.writeFileSync(componentPath, componentContent);
    fs.writeFileSync(cssPath, cssContent);
    
    console.log('✅ React компонент создан:', componentPath);
    console.log('✅ CSS файл создан:', cssPath);
    
    // Создаем страницу для демонстрации
    const pageContent = `import React from 'react';
import FigmaGeneratedComponent from '../components/FigmaGeneratedComponent';

const FigmaDemoPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Демо компонента из Figma
        </h1>
        <FigmaGeneratedComponent />
      </div>
    </div>
  );
};

export default FigmaDemoPage;`;

    fs.writeFileSync('src/pages/FigmaDemoPage.tsx', pageContent);
    console.log('✅ Демо страница создана: src/pages/FigmaDemoPage.tsx');
    
    console.log('\n🎉 Компонент готов к использованию!');
    console.log('📝 Добавьте маршрут в App.tsx:');
    console.log('   <Route path="/figma-demo" element={<FigmaDemoPage />} />');
    
  } catch (error) {
    console.error('❌ Ошибка создания файлов:', error.message);
  }
}

// Запуск
try {
  const figmaData = JSON.parse(fs.readFileSync('figma-data.json', 'utf8'));
  generateReactComponent(figmaData);
} catch (error) {
  console.log('❌ Файл figma-data.json не найден');
  console.log('🔄 Сначала запустите: node figma-direct-connect.js');
}




