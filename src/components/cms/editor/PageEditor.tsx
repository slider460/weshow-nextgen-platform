/**
 * Визуальный редактор страниц для CMS системы WESHOW
 * Основной компонент для редактирования страниц с drag & drop функциональностью
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Separator } from '../../ui/separator';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';
import { Eye, Save, Monitor, Tablet, Smartphone } from 'lucide-react';
import { getBlockComponent, createNewBlock } from '../blocks/BlockRegistry';
import {
  CMSPage,
  ContentBlock,
  BlockType,
  PreviewMode
} from '../../../types/cms';

// =============================================================================
// ТИПЫ И ИНТЕРФЕЙСЫ
// =============================================================================

interface PageEditorProps {
  /** Редактируемая страница */
  page: CMSPage;
  
  /** Режим редактора */
  mode: 'edit' | 'preview';
  
  /** Размер экрана для превью */
  screenSize: 'mobile' | 'tablet' | 'desktop';
  
  /** Текущий язык */
  language: 'ru' | 'en';
  
  /** Обработчики событий */
  onPageUpdate: (updates: Partial<CMSPage>) => void;
  onBlockAdd: (block: ContentBlock, index?: number) => void;
  onBlockUpdate: (blockId: string, updates: Partial<ContentBlock>) => void;
  onBlockDelete: (blockId: string) => void;
  onBlockMove: (blockId: string, newIndex: number) => void;
  onSave: () => void;
  onPreview: () => void;
  onPublish: () => void;
}

interface BlockPaletteProps {
  onBlockSelect: (blockType: BlockType) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  language: 'ru' | 'en';
}

interface DroppableAreaProps {
  blocks: ContentBlock[];
  selectedBlockId?: string;
  mode: 'edit' | 'preview';
  screenSize: 'mobile' | 'tablet' | 'desktop';
  language: 'ru' | 'en';
  onBlockSelect: (blockId: string) => void;
  onBlockUpdate: (blockId: string, updates: Partial<ContentBlock>) => void;
  onBlockDelete: (blockId: string) => void;
  onBlockMove: (blockId: string, newIndex: number) => void;
  onBlockDrop: (blockType: BlockType, index: number) => void;
}

// =============================================================================
// КОНСТАНТЫ
// =============================================================================

const BLOCK_TYPES = [
  {
    type: 'hero' as BlockType,
    name: { ru: 'Hero секция', en: 'Hero Section' },
    icon: '🎯',
    category: 'layout'
  },
  {
    type: 'text' as BlockType,
    name: { ru: 'Текстовый блок', en: 'Text Block' },
    icon: '📝',
    category: 'content'
  },
  {
    type: 'image' as BlockType,
    name: { ru: 'Изображение', en: 'Image' },
    icon: '🖼️',
    category: 'media'
  },
  {
    type: 'gallery' as BlockType,
    name: { ru: 'Галерея', en: 'Gallery' },
    icon: '🖼️',
    category: 'media'
  },
  {
    type: 'video' as BlockType,
    name: { ru: 'Видео', en: 'Video' },
    icon: '🎥',
    category: 'media'
  },
  {
    type: 'services-grid' as BlockType,
    name: { ru: 'Сетка услуг', en: 'Services Grid' },
    icon: '🔧',
    category: 'content'
  },
  {
    type: 'contact-form' as BlockType,
    name: { ru: 'Форма контактов', en: 'Contact Form' },
    icon: '📮',
    category: 'forms'
  },
  {
    type: 'cta-banner' as BlockType,
    name: { ru: 'CTA баннер', en: 'CTA Banner' },
    icon: '🎯',
    category: 'interactive'
  }
];

// =============================================================================
// КОМПОНЕНТ ПАЛИТРЫ БЛОКОВ
// =============================================================================

const BlockPalette: React.FC<BlockPaletteProps> = ({
  onBlockSelect,
  isCollapsed,
  onToggleCollapse,
  language
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: { ru: 'Все', en: 'All' }, icon: '📦' },
    { id: 'layout', name: { ru: 'Макет', en: 'Layout' }, icon: '🏗️' },
    { id: 'content', name: { ru: 'Контент', en: 'Content' }, icon: '📝' },
    { id: 'media', name: { ru: 'Медиа', en: 'Media' }, icon: '🎬' },
    { id: 'forms', name: { ru: 'Формы', en: 'Forms' }, icon: '📋' },
    { id: 'interactive', name: { ru: 'Интерактив', en: 'Interactive' }, icon: '⚡' }
  ];

  const filteredBlocks = selectedCategory === 'all' 
    ? BLOCK_TYPES 
    : BLOCK_TYPES.filter(block => block.category === selectedCategory);

  const DraggableBlock: React.FC<{ blockType: BlockType; name: string; icon: string }> = ({
    blockType,
    name,
    icon
  }) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'BLOCK_TYPE',
      item: { blockType },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    });

    return (
      <div
        ref={drag}
        className={cn(
          'p-3 rounded-lg border-2 border-dashed border-gray-300 cursor-grab active:cursor-grabbing transition-all duration-200 hover:border-blue-400 hover:bg-blue-50',
          isDragging && 'opacity-50'
        )}
        onClick={() => onBlockSelect(blockType)}
      >
        <div className="text-center">
          <div className="text-2xl mb-2">{icon}</div>
          <div className="text-sm font-medium text-gray-700">{name}</div>
        </div>
      </div>
    );
  };

  if (isCollapsed) {
    return (
      <Card className="w-16 h-full">
        <CardContent className="p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="w-full"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-80 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Блоки</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
        </div>
        
        {/* Категории */}
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map(category => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name[language]}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {filteredBlocks.map(block => (
            <DraggableBlock
              key={block.type}
              blockType={block.type}
              name={block.name[language]}
              icon={block.icon}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// =============================================================================
// КОМПОНЕНТ ОБЛАСТИ СБРОСА
// =============================================================================

const DroppableArea: React.FC<DroppableAreaProps> = ({
  blocks,
  selectedBlockId,
  mode,
  screenSize,
  language,
  onBlockSelect,
  onBlockUpdate,
  onBlockDelete,
  onBlockMove,
  onBlockDrop
}) => {
  const DropZone: React.FC<{ index: number }> = ({ index }) => {
    const [{ isOver }, drop] = useDrop({
      accept: 'BLOCK_TYPE',
      drop: (item: { blockType: BlockType }) => {
        onBlockDrop(item.blockType, index);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver()
      })
    });

    return (
      <div
        ref={drop}
        className={cn(
          'h-12 flex items-center justify-center border-2 border-dashed border-transparent transition-all duration-200',
          isOver && 'border-blue-400 bg-blue-50'
        )}
      >
        {isOver && (
          <div className="text-blue-600 text-sm font-medium">
            Отпустите для добавления блока
          </div>
        )}
      </div>
    );
  };

  const handleBlockMove = (blockId: string, direction: 'up' | 'down') => {
    const currentIndex = blocks.findIndex(block => block.id === blockId);
    if (currentIndex === -1) return;

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;

    onBlockMove(blockId, newIndex);
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50">
      {/* Начальная зона сброса */}
      <DropZone index={0} />
      
      {/* Блоки с зонами сброса между ними */}
      {blocks.map((block, index) => (
        <React.Fragment key={block.id}>
          <div className="relative">
            {/* Render block based on its type */}
            {(() => {
              const BlockComponent = getBlockComponent(block.type);
              if (!BlockComponent) {
                return (
                  <div className="p-4 border border-red-300 bg-red-50 rounded">
                    <p className="text-red-700">Unknown block type: {block.type}</p>
                  </div>
                );
              }
              return (
                <BlockComponent
                  block={block}
                  isEditing={mode === 'edit'}
                  isSelected={selectedBlockId === block.id}
                  onUpdate={(updates: Partial<ContentBlock>) => onBlockUpdate(block.id, updates)}
                  onSelect={() => onBlockSelect(block.id)}
                  onDelete={() => onBlockDelete(block.id)}
                  onDuplicate={() => {
                    const newBlock = createNewBlock(block.type);
                    if (newBlock) {
                      // Find current index and add after
                      const currentIndex = blocks.findIndex(b => b.id === block.id);
                      onBlockDrop(block.type, currentIndex + 1);
                    }
                  }}
                  onMoveUp={() => handleBlockMove(block.id, 'up')}
                  onMoveDown={() => handleBlockMove(block.id, 'down')}
                />
              );
            })()}
          </div>
          
          {/* Зона сброса после блока */}
          <DropZone index={index + 1} />
        </React.Fragment>
      ))}
      
      {/* Если нет блоков, показываем большую зону сброса */}
      {blocks.length === 0 && (
        <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-300 rounded-lg m-8">
          <div className="text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Начните создание страницы
            </h3>
            <p className="text-gray-500">
              Перетащите блок из палитры или нажмите на него
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// ОСНОВНОЙ КОМПОНЕНТ РЕДАКТОРА
// =============================================================================

export const PageEditor: React.FC<PageEditorProps> = ({
  page,
  mode,
  screenSize,
  language,
  onPageUpdate,
  onBlockAdd,
  onBlockUpdate,
  onBlockDelete,
  onBlockMove,
  onSave,
  onPreview,
  onPublish
}) => {
  const [isPaletteCollapsed, setIsPaletteCollapsed] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string>();
  const [isPropertiesPanelOpen, setIsPropertiesPanelOpen] = useState(false);
  const [currentScreenSize, setCurrentScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>(screenSize);

  // Обработчики событий
  const handleBlockSelect = useCallback((blockType: BlockType) => {
    const newBlock = createNewBlock(blockType);
    if (newBlock) {
      onBlockAdd(newBlock);
    }
  }, [onBlockAdd]);

  const handleBlockDrop = useCallback((blockType: BlockType, index: number) => {
    const newBlock = createNewBlock(blockType);
    if (newBlock) {
      onBlockAdd(newBlock, index);
    }
  }, [onBlockAdd]);

  const handleBlockSelection = useCallback((blockId: string) => {
    setSelectedBlockId(blockId);
    setIsPropertiesPanelOpen(true);
  }, []);

  const selectedBlock = selectedBlockId ? page.blocks.find(b => b.id === selectedBlockId) : null;

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Панель инструментов */}
      <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">
            {page.title?.[language] || page.title?.ru || 'Untitled Page'}
          </h1>
          <Badge variant={page.meta.status === 'published' ? 'default' : 'secondary'}>
            {page.meta.status === 'published' ? 
              (language === 'en' ? 'Published' : 'Опубликовано') :
              (language === 'en' ? 'Draft' : 'Черновик')
            }
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Переключатель размера экрана */}
          <div className="flex items-center border rounded-lg p-1">
            {[
              { size: 'mobile' as const, icon: Smartphone, label: { ru: 'Мобильный', en: 'Mobile' } },
              { size: 'tablet' as const, icon: Tablet, label: { ru: 'Планшет', en: 'Tablet' } },
              { size: 'desktop' as const, icon: Monitor, label: { ru: 'Десктоп', en: 'Desktop' } }
            ].map(({ size, icon: IconComponent, label }) => (
              <Button
                key={size}
                variant={currentScreenSize === size ? 'default' : 'ghost'}
                size="sm"
                className="px-3"
                onClick={() => setCurrentScreenSize(size)}
                title={label[language]}
              >
                <IconComponent className="h-4 w-4" />
              </Button>
            ))}
          </div>
          
          <Separator orientation="vertical" className="h-6" />
          
          {/* Кнопки действий */}
          <Button variant="outline" onClick={onPreview}>
            <Eye className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Preview' : 'Превью'}
          </Button>
          <Button variant="outline" onClick={onSave}>
            <Save className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Save' : 'Сохранить'}
          </Button>
          <Button onClick={onPublish}>
            {language === 'en' ? 'Publish' : 'Опубликовать'}
          </Button>
        </div>
      </div>

      {/* Основная область */}
      <div className="flex flex-1 overflow-hidden">
        {/* Палитра блоков */}
        <BlockPalette
          onBlockSelect={handleBlockSelect}
          isCollapsed={isPaletteCollapsed}
          onToggleCollapse={() => setIsPaletteCollapsed(!isPaletteCollapsed)}
          language={language}
        />

        {/* Область редактирования */}
        <DroppableArea
          blocks={page.blocks}
          selectedBlockId={selectedBlockId}
          mode={mode}
          screenSize={currentScreenSize}
          language={language}
          onBlockSelect={handleBlockSelection}
          onBlockUpdate={onBlockUpdate}
          onBlockDelete={onBlockDelete}
          onBlockMove={onBlockMove}
          onBlockDrop={handleBlockDrop}
        />

        {/* Панель свойств */}
        {isPropertiesPanelOpen && selectedBlock && (
          <div className="w-80 border-l bg-white p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Block Properties</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPropertiesPanelOpen(false)}
              >
                ×
              </Button>
            </div>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Properties panel for {selectedBlock.type} block
              </p>
              {/* TODO: Add actual properties panel content */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageEditor;