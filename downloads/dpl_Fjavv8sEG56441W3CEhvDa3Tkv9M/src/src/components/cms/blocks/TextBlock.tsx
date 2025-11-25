/**
 * Текстовый блок для CMS системы WESHOW
 * Универсальный блок для отображения текстового контента
 */

import React, { useState } from 'react';
import { BaseBlock } from './BaseBlock';
import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';
import {
  ContentBlock,
  TextBlockContent,
  MultiLanguageContent
} from '../../../types/cms';

// =============================================================================
// ТИПЫ И ИНТЕРФЕЙСЫ
// =============================================================================

interface TextBlockProps {
  /** Данные блока */
  block: ContentBlock & { content: TextBlockContent };
  
  /** Режим отображения */
  mode: 'edit' | 'preview' | 'live';
  
  /** Размер экрана */
  screenSize?: 'mobile' | 'tablet' | 'desktop';
  
  /** Текущий язык */
  language?: 'ru' | 'en';
  
  /** Выбран ли блок */
  isSelected?: boolean;
  
  /** Обработчики событий */
  onSelect?: (blockId: string) => void;
  onEdit?: (blockId: string) => void;
  onDelete?: (blockId: string) => void;
  onMove?: (blockId: string, direction: 'up' | 'down') => void;
  onDuplicate?: (blockId: string) => void;
  onUpdate?: (blockId: string, updates: Partial<ContentBlock>) => void;
}

// =============================================================================
// ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ
// =============================================================================

interface TextContentProps {
  content: TextBlockContent;
  language: 'ru' | 'en';
  mode: 'edit' | 'preview' | 'live';
}

const TextContent: React.FC<TextContentProps> = ({
  content,
  language,
  mode
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getLocalizedText = (text: MultiLanguageContent): string => {
    return text[language] || text.ru || '';
  };

  const shouldShowReadMore = content.showReadMore && content.readMoreLimit && content.readMoreLimit > 0;
  const textContent = getLocalizedText(content.content);
  const isContentLong = textContent.length > (content.readMoreLimit || 0);
  const displayText = shouldShowReadMore && !isExpanded && isContentLong
    ? textContent.substring(0, content.readMoreLimit) + '...'
    : textContent;

  const renderContent = () => {
    switch (content.format) {
      case 'html':
        return (
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: displayText }}
          />
        );
      
      case 'markdown':
        // Здесь будет парсер Markdown, пока используем простой текст
        return (
          <div className="prose prose-lg max-w-none whitespace-pre-wrap">
            {displayText}
          </div>
        );
      
      case 'plain':
      default:
        return (
          <div className="whitespace-pre-wrap leading-relaxed">
            {displayText}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      {content.title && (
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
          {getLocalizedText(content.title)}
        </h2>
      )}
      
      {/* Основной контент */}
      <div className="text-gray-700 leading-relaxed">
        {renderContent()}
      </div>
      
      {/* Кнопка "Читать далее" */}
      {shouldShowReadMore && isContentLong && mode === 'live' && (
        <div className="mt-4">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded 
              ? (language === 'ru' ? 'Свернуть' : 'Collapse')
              : (language === 'ru' ? 'Читать далее' : 'Read more')
            }
          </Button>
        </div>
      )}
    </div>
  );
};

// =============================================================================
// ОСНОВНОЙ КОМПОНЕНТ ТЕКСТОВОГО БЛОКА
// =============================================================================

export const TextBlock: React.FC<TextBlockProps> = ({
  block,
  mode,
  screenSize = 'desktop',
  language = 'ru',
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onMove,
  onDuplicate,
  onUpdate
}) => {
  const content = block.content;

  return (
    <BaseBlock
      block={block}
      mode={mode}
      screenSize={screenSize}
      isSelected={isSelected}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      onMove={onMove}
      onDuplicate={onDuplicate}
      onUpdate={onUpdate}
      className="py-8"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <TextContent
          content={content}
          language={language}
          mode={mode}
        />
      </div>
    </BaseBlock>
  );
};

// =============================================================================
// КОНФИГУРАЦИЯ БЛОКА
// =============================================================================

export const textBlockConfig = {
  type: 'text',
  name: {
    ru: 'Текстовый блок',
    en: 'Text Block'
  },
  description: {
    ru: 'Блок для отображения текстового контента с поддержкой разных форматов',
    en: 'Block for displaying text content with support for different formats'
  },
  icon: '📝',
  category: 'content',
  
  // Настройки по умолчанию
  defaultContent: {
    title: {
      ru: 'Заголовок секции',
      en: 'Section Title'
    },
    content: {
      ru: 'Здесь размещается основной текстовый контент. Вы можете использовать различные форматы: обычный текст, HTML или Markdown.',
      en: 'Here is the main text content. You can use different formats: plain text, HTML or Markdown.'
    },
    format: 'plain',
    showReadMore: false,
    readMoreLimit: 300
  } as TextBlockContent,
  
  defaultSettings: {
    backgroundColor: 'transparent',
    textColor: '#374151',
    padding: { top: 32, right: 0, bottom: 32, left: 0 },
    width: 'container',
    alignment: 'left',
    responsive: {
      mobile: {
        padding: { top: 24, right: 16, bottom: 24, left: 16 }
      },
      tablet: {
        padding: { top: 28, right: 24, bottom: 28, left: 24 }
      }
    }
  },
  
  // Поля для редактирования
  editableFields: [
    {
      name: 'title',
      type: 'multilang-text',
      label: { ru: 'Заголовок', en: 'Title' }
    },
    {
      name: 'content',
      type: 'multilang-textarea',
      label: { ru: 'Содержимое', en: 'Content' },
      required: true,
      rows: 10
    },
    {
      name: 'format',
      type: 'select',
      label: { ru: 'Формат', en: 'Format' },
      options: [
        { value: 'plain', label: { ru: 'Обычный текст', en: 'Plain text' } },
        { value: 'html', label: { ru: 'HTML', en: 'HTML' } },
        { value: 'markdown', label: { ru: 'Markdown', en: 'Markdown' } }
      ],
      defaultValue: 'plain'
    },
    {
      name: 'showReadMore',
      type: 'checkbox',
      label: { ru: 'Показать "Читать далее"', en: 'Show "Read more"' }
    },
    {
      name: 'readMoreLimit',
      type: 'number',
      label: { ru: 'Лимит символов для "Читать далее"', en: 'Character limit for "Read more"' },
      min: 100,
      max: 1000,
      step: 50,
      dependsOn: { field: 'showReadMore', value: true }
    }
  ]
};

export default TextBlock;