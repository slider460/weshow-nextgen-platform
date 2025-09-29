#!/usr/bin/env node

// Автоматический экспорт стилей и цветов из Figma
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🎨 Автоматический экспорт стилей из Figma\n');

// Конфигурация
const FIGMA_API_BASE = 'https://api.figma.com/v1';
const FIGMA_DOCUMENT_ID = process.env.FIGMA_DOCUMENT_ID || 'if9cW5Ga1xyeUTGYc2ea9K';
const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

if (!FIGMA_TOKEN || FIGMA_TOKEN === 'your_token_here') {
  console.log('❌ Ошибка: Не установлен Figma API токен');
  console.log('💡 Добавьте токен в .env.local файл');
  process.exit(1);
}

// Создаем папку для стилей
const stylesDir = join(process.cwd(), 'public', 'figma-exports', 'styles');
if (!existsSync(stylesDir)) {
  mkdirSync(stylesDir, { recursive: true });
  console.log(`📁 Создана папка: ${stylesDir}`);
}

// Функция для конвертации цвета
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Функция для конвертации цвета в HSL
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Функция для экспорта цветов
async function exportColors() {
  try {
    console.log('🎨 Экспорт цветовой палитры...');
    
    // Получаем информацию о документе
    const docResponse = await fetch(`${FIGMA_API_BASE}/files/${FIGMA_DOCUMENT_ID}`, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    });

    if (!docResponse.ok) {
      throw new Error(`Ошибка получения документа: ${docResponse.status}`);
    }

    const docData = await docResponse.json();
    
    // Собираем все уникальные цвета
    const colors = new Map();
    
    function extractColors(node) {
      if (node.fills) {
        node.fills.forEach(fill => {
          if (fill.type === 'SOLID' && fill.color) {
            const { r, g, b } = fill.color;
            const hex = rgbToHex(
              Math.round(r * 255),
              Math.round(g * 255),
              Math.round(b * 255)
            );
            
            if (!colors.has(hex)) {
              const hsl = rgbToHsl(r * 255, g * 255, b * 255);
              colors.set(hex, {
                hex,
                rgb: `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`,
                hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
                r: Math.round(r * 255),
                g: Math.round(g * 255),
                b: Math.round(b * 255),
                h: hsl.h,
                s: hsl.s,
                l: hsl.l
              });
            }
          }
        });
      }
      
      if (node.children) {
        node.children.forEach(child => extractColors(child));
      }
    }

    extractColors(docData.document);
    
    console.log(`📊 Найдено ${colors.size} уникальных цветов`);

    // Генерируем CSS файл с цветами
    let cssContent = `/* Figma Color Palette - Автоматически экспортировано */\n:root {\n`;
    
    const colorArray = Array.from(colors.values());
    colorArray.forEach((color, index) => {
      const colorName = `color-${index + 1}`;
      cssContent += `  --figma-${colorName}: ${color.hex};\n`;
      cssContent += `  --figma-${colorName}-rgb: ${color.r}, ${color.g}, ${color.b};\n`;
      cssContent += `  --figma-${colorName}-hsl: ${color.h}, ${color.s}%, ${color.l}%;\n`;
    });
    
    cssContent += `}\n\n/* Цвета по типу */\n`;
    
    // Группируем цвета по типам
    const primaryColors = colorArray.filter(c => c.l > 50 && c.s > 50);
    const secondaryColors = colorArray.filter(c => c.l > 30 && c.l < 70);
    const accentColors = colorArray.filter(c => c.s > 70);
    const neutralColors = colorArray.filter(c => c.s < 30);
    
    if (primaryColors.length > 0) {
      cssContent += `/* Основные цвета */\n`;
      primaryColors.forEach((color, index) => {
        cssContent += `.primary-${index + 1} { color: ${color.hex}; }\n`;
      });
      cssContent += `\n`;
    }
    
    if (secondaryColors.length > 0) {
      cssContent += `/* Вторичные цвета */\n`;
      secondaryColors.forEach((color, index) => {
        cssContent += `.secondary-${index + 1} { color: ${color.hex}; }\n`;
      });
      cssContent += `\n`;
    }
    
    if (accentColors.length > 0) {
      cssContent += `/* Акцентные цвета */\n`;
      accentColors.forEach((color, index) => {
        cssContent += `.accent-${index + 1} { color: ${color.hex}; }\n`;
      });
      cssContent += `\n`;
    }
    
    if (neutralColors.length > 0) {
      cssContent += `/* Нейтральные цвета */\n`;
      neutralColors.forEach((color, index) => {
        cssContent += `.neutral-${index + 1} { color: ${color.hex}; }\n`;
      });
      cssContent += `\n`;
    }

    // Сохраняем CSS файл
    const cssPath = join(stylesDir, 'figma-colors.css');
    writeFileSync(cssPath, cssContent);
    console.log(`✅ CSS файл сохранен: ${cssPath}`);

    // Генерируем JSON файл с цветами
    const jsonContent = {
      palette: colorArray,
      categories: {
        primary: primaryColors,
        secondary: secondaryColors,
        accent: accentColors,
        neutral: neutralColors
      },
      generated: new Date().toISOString()
    };

    const jsonPath = join(stylesDir, 'figma-colors.json');
    writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2));
    console.log(`✅ JSON файл сохранен: ${jsonPath}`);

    // Генерируем Tailwind конфигурацию
    const tailwindConfig = {
      colors: {}
    };

    colorArray.forEach((color, index) => {
      const colorName = `figma-${index + 1}`;
      tailwindConfig.colors[colorName] = color.hex;
    });

    const tailwindPath = join(stylesDir, 'tailwind-colors.js');
    writeFileSync(tailwindPath, `module.exports = ${JSON.stringify(tailwindConfig, null, 2)};`);
    console.log(`✅ Tailwind конфигурация сохранена: ${tailwindPath}`);

  } catch (error) {
    console.log('❌ Ошибка экспорта цветов:', error.message);
  }
}

// Функция для экспорта типографики
async function exportTypography() {
  try {
    console.log('📝 Экспорт типографики...');
    
    const docResponse = await fetch(`${FIGMA_API_BASE}/files/${FIGMA_DOCUMENT_ID}`, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    });

    if (!docResponse.ok) {
      throw new Error(`Ошибка получения документа: ${docResponse.status}`);
    }

    const docData = await docResponse.json();
    
    // Собираем все стили текста
    const textStyles = new Map();
    
    function extractTextStyles(node) {
      if (node.type === 'TEXT' && node.style) {
        const style = node.style;
        const key = `${style.fontFamily}-${style.fontSize}-${style.fontWeight}`;
        
        if (!textStyles.has(key)) {
          textStyles.set(key, {
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            lineHeight: style.lineHeightPx,
            letterSpacing: style.letterSpacing,
            textAlign: style.textAlignHorizontal,
            textDecoration: style.textDecoration
          });
        }
      }
      
      if (node.children) {
        node.children.forEach(child => extractTextStyles(child));
      }
    }

    extractTextStyles(docData.document);
    
    console.log(`📊 Найдено ${textStyles.size} стилей текста`);

    // Генерируем CSS файл с типографикой
    let cssContent = `/* Figma Typography - Автоматически экспортировано */\n\n`;
    
    const styleArray = Array.from(textStyles.values());
    styleArray.forEach((style, index) => {
      const className = `text-style-${index + 1}`;
      cssContent += `.${className} {\n`;
      cssContent += `  font-family: "${style.fontFamily}", sans-serif;\n`;
      cssContent += `  font-size: ${style.fontSize}px;\n`;
      cssContent += `  font-weight: ${style.fontWeight};\n`;
      if (style.lineHeight) {
        cssContent += `  line-height: ${style.lineHeight}px;\n`;
      }
      if (style.letterSpacing) {
        cssContent += `  letter-spacing: ${style.letterSpacing}px;\n`;
      }
      if (style.textAlign) {
        cssContent += `  text-align: ${style.textAlign};\n`;
      }
      if (style.textDecoration) {
        cssContent += `  text-decoration: ${style.textDecoration};\n`;
      }
      cssContent += `}\n\n`;
    });

    // Сохраняем CSS файл
    const cssPath = join(stylesDir, 'figma-typography.css');
    writeFileSync(cssPath, cssContent);
    console.log(`✅ CSS файл сохранен: ${cssPath}`);

    // Генерируем JSON файл
    const jsonContent = {
      typography: styleArray,
      generated: new Date().toISOString()
    };

    const jsonPath = join(stylesDir, 'figma-typography.json');
    writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2));
    console.log(`✅ JSON файл сохранен: ${jsonPath}`);

  } catch (error) {
    console.log('❌ Ошибка экспорта типографики:', error.message);
  }
}

// Функция для экспорта градиентов
async function exportGradients() {
  try {
    console.log('🌈 Экспорт градиентов...');
    
    const docResponse = await fetch(`${FIGMA_API_BASE}/files/${FIGMA_DOCUMENT_ID}`, {
      headers: {
        'X-Figma-Token': FIGMA_TOKEN
      }
    });

    if (!docResponse.ok) {
      throw new Error(`Ошибка получения документа: ${docResponse.status}`);
    }

    const docData = await docResponse.json();
    
    // Собираем все градиенты
    const gradients = new Map();
    
    function extractGradients(node) {
      if (node.fills) {
        node.fills.forEach(fill => {
          if (fill.type === 'GRADIENT_LINEAR' || fill.type === 'GRADIENT_RADIAL') {
            const gradientKey = JSON.stringify(fill.gradientStops);
            
            if (!gradients.has(gradientKey)) {
              const stops = fill.gradientStops.map(stop => {
                const { r, g, b } = stop.color;
                return {
                  color: rgbToHex(
                    Math.round(r * 255),
                    Math.round(g * 255),
                    Math.round(b * 255)
                  ),
                  position: stop.position
                };
              });
              
              gradients.set(gradientKey, {
                type: fill.type,
                stops,
                angle: fill.gradientTransform ? Math.atan2(fill.gradientTransform[1][0], fill.gradientTransform[0][0]) * 180 / Math.PI : 0
              });
            }
          }
        });
      }
      
      if (node.children) {
        node.children.forEach(child => extractGradients(child));
      }
    }

    extractGradients(docData.document);
    
    console.log(`📊 Найдено ${gradients.size} градиентов`);

    // Генерируем CSS файл с градиентами
    let cssContent = `/* Figma Gradients - Автоматически экспортировано */\n\n`;
    
    const gradientArray = Array.from(gradients.values());
    gradientArray.forEach((gradient, index) => {
      const className = `gradient-${index + 1}`;
      
      const stops = gradient.stops.map(stop => 
        `${stop.color} ${Math.round(stop.position * 100)}%`
      ).join(', ');
      
      if (gradient.type === 'GRADIENT_LINEAR') {
        cssContent += `.${className} {\n`;
        cssContent += `  background: linear-gradient(${gradient.angle}deg, ${stops});\n`;
        cssContent += `}\n\n`;
      } else if (gradient.type === 'GRADIENT_RADIAL') {
        cssContent += `.${className} {\n`;
        cssContent += `  background: radial-gradient(circle, ${stops});\n`;
        cssContent += `}\n\n`;
      }
    });

    // Сохраняем CSS файл
    const cssPath = join(stylesDir, 'figma-gradients.css');
    writeFileSync(cssPath, cssContent);
    console.log(`✅ CSS файл сохранен: ${cssPath}`);

  } catch (error) {
    console.log('❌ Ошибка экспорта градиентов:', error.message);
  }
}

// Основная функция
async function main() {
  console.log('🚀 Запуск экспорта стилей...\n');
  
  await exportColors();
  console.log('');
  await exportTypography();
  console.log('');
  await exportGradients();
  
  console.log('\n✅ Экспорт стилей завершен!');
  console.log(`📁 Файлы сохранены в: ${stylesDir}`);
  console.log('🎨 Цвета: figma-colors.css');
  console.log('📝 Типографика: figma-typography.css');
  console.log('🌈 Градиенты: figma-gradients.css');
}

// Запуск
main().catch(console.error);



