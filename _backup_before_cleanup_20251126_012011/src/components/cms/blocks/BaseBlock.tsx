/**
 * Базовый компонент блока для CMS системы WESHOW
 * Предоставляет общую функциональность для всех типов блоков
 */

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../../lib/utils';
import {
  ContentBlock,
  BlockSettings,
  PreviewMode,
  DisplayCondition
} from '../../../types/cms';

// =============================================================================
// ТИПЫ И ИНТЕРФЕЙСЫ
// =============================================================================

interface BaseBlockProps {
  /** Данные блока */
  block: ContentBlock;
  
  /** Режим отображения */
  mode: 'edit' | 'preview' | 'live';
  
  /** Размер экрана для превью */
  screenSize?: 'mobile' | 'tablet' | 'desktop';
  
  /** Выбран ли блок */
  isSelected?: boolean;
  
  /** Находится ли блок в режиме редактирования */
  isEditing?: boolean;
  
  /** Дочерние элементы (контент блока) */
  children: React.ReactNode;
  
  /** Обработчики событий */
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onMove?: (direction: 'up' | 'down') => void;
  onDuplicate?: () => void;
  onUpdate?: (updates: Partial<ContentBlock>) => void;
  
  /** Панель свойств для редактирования */
  propertiesPanel?: React.ReactNode;
  
  /** Дополнительные CSS классы */
  className?: string;
  
  /** Отображать ли панель инструментов */
  showToolbar?: boolean;
  
  /** Анимации включены */
  enableAnimations?: boolean;
}

interface BlockToolbarProps {
  block: ContentBlock;
  isSelected: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (direction: 'up' | 'down') => void;
  onDuplicate: () => void;
  onToggleVisibility: () => void;
}

// =============================================================================
// ПАНЕЛЬ ИНСТРУМЕНТОВ БЛОКА
// =============================================================================

const BlockToolbar: React.FC<BlockToolbarProps> = ({
  block,
  isSelected,
  onEdit,
  onDelete,
  onMove,
  onDuplicate,
  onToggleVisibility
}) => {
  if (!isSelected) return null;

  return (
    <div className="absolute top-0 right-0 z-50 flex items-center space-x-1 bg-white border border-gray-200 rounded-bl-lg shadow-lg p-1">
      {/* Редактировать */}
      <button
        onClick={onEdit}
        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
        title="Редактировать блок"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>

      {/* Переместить вверх */}
      <button
        onClick={() => onMove('up')}
        className="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors"
        title="Переместить вверх"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Переместить вниз */}
      <button
        onClick={() => onMove('down')}
        className="p-2 text-gray-600 hover:bg-gray-50 rounded transition-colors"
        title="Переместить вниз"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Дублировать */}
      <button
        onClick={onDuplicate}
        className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
        title="Дублировать блок"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>

      {/* Видимость */}
      <button
        onClick={onToggleVisibility}
        className={cn(
          "p-2 rounded transition-colors",
          block.isVisible 
            ? "text-gray-600 hover:bg-gray-50" 
            : "text-yellow-600 hover:bg-yellow-50"
        )}
        title={block.isVisible ? "Скрыть блок" : "Показать блок"}
      >
        {block.isVisible ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
          </svg>
        )}
      </button>

      {/* Удалить */}
      <button
        onClick={onDelete}
        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
        title="Удалить блок"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

// =============================================================================
// БАЗОВЫЙ КОМПОНЕНТ БЛОКА
// =============================================================================

export const BaseBlock: React.FC<BaseBlockProps> = ({
  block,
  mode = 'edit',
  screenSize = 'desktop',
  isSelected = false,
  isEditing = false,
  children,
  onSelect,
  onEdit,
  onDelete,
  onMove,
  onDuplicate,
  onUpdate,
  className,
  showToolbar = true,
  enableAnimations = true,
  propertiesPanel
}) => {
  const [isVisible, setIsVisible] = useState(block.isVisible);
  const [isHovered, setIsHovered] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  // =============================================================================
  // ПРОВЕРКА УСЛОВИЙ ОТОБРАЖЕНИЯ
  // =============================================================================

  const checkDisplayConditions = (conditions: DisplayCondition[]): boolean => {
    if (!conditions || conditions.length === 0) return true;

    return conditions.every(condition => {
      switch (condition.type) {
        case 'device':
          if (condition.operator === 'equals') {
            return screenSize === condition.value;
          }
          return screenSize !== condition.value;

        case 'date':
          const now = new Date();
          const conditionDate = new Date(condition.value);
          
          if (condition.operator === 'greater') {
            return now > conditionDate;
          } else if (condition.operator === 'less') {
            return now < conditionDate;
          }
          return now.getTime() === conditionDate.getTime();

        default:
          return true;
      }
    });
  };

  const shouldShow = isVisible && checkDisplayConditions(block.conditions || []);

  // =============================================================================
  // СТИЛИ БЛОКА
  // =============================================================================

  const getBlockStyles = (): React.CSSProperties => {
    const settings = block.settings;
    const responsiveSettings = settings.responsive?.[screenSize] || {};
    const finalSettings = { ...settings, ...responsiveSettings };

    const styles: React.CSSProperties = {};

    // Цвета
    if (finalSettings.backgroundColor) {
      styles.backgroundColor = finalSettings.backgroundColor;
    }
    if (finalSettings.textColor) {
      styles.color = finalSettings.textColor;
    }

    // Отступы
    if (finalSettings.padding) {
      const p = finalSettings.padding;
      styles.padding = `${p.top || 0}px ${p.right || 0}px ${p.bottom || 0}px ${p.left || 0}px`;
    }
    if (finalSettings.margin) {
      const m = finalSettings.margin;
      styles.margin = `${m.top || 0}px ${m.right || 0}px ${m.bottom || 0}px ${m.left || 0}px`;
    }

    // Скругление углов
    if (finalSettings.borderRadius) {
      styles.borderRadius = `${finalSettings.borderRadius}px`;
    }

    // Тень
    if (finalSettings.shadow?.enabled) {
      const s = finalSettings.shadow;
      styles.boxShadow = `${s.x || 0}px ${s.y || 0}px ${s.blur || 0}px ${s.spread || 0}px ${s.color || 'rgba(0,0,0,0.1)'}`;
    }

    return styles;
  };

  const getContainerClasses = (): string => {
    const settings = block.settings;
    const responsiveSettings = settings.responsive?.[screenSize] || {};
    const finalSettings = { ...settings, ...responsiveSettings };

    const classes = [];

    // Ширина контейнера
    switch (finalSettings.width) {
      case 'full':
        classes.push('w-full');
        break;
      case 'container':
        classes.push('container mx-auto');
        break;
      case 'narrow':
        classes.push('max-w-4xl mx-auto');
        break;
      default:
        classes.push('w-full');
    }

    // Выравнивание
    switch (finalSettings.alignment) {
      case 'center':
        classes.push('text-center');
        break;
      case 'right':
        classes.push('text-right');
        break;
      default:
        classes.push('text-left');
    }

    // Кастомные классы
    if (finalSettings.customClasses) {
      classes.push(...finalSettings.customClasses);
    }

    return classes.join(' ');
  };

  // =============================================================================
  // ОБРАБОТЧИКИ СОБЫТИЙ
  // =============================================================================

  const handleClick = (e: React.MouseEvent) => {
    if (mode === 'edit') {
      e.stopPropagation();
      onSelect?.();
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (mode === 'edit') {
      e.stopPropagation();
      onEdit?.();
    }
  };

  const handleToolbarAction = {
    edit: () => onEdit?.(),
    delete: () => onDelete?.(),
    move: (direction: 'up' | 'down') => onMove?.(direction),
    duplicate: () => onDuplicate?.(),
    toggleVisibility: () => {
      const newVisibility = !block.isVisible;
      setIsVisible(newVisibility);
      onUpdate?.({ isVisible: newVisibility });
    }
  };

  // =============================================================================
  // АНИМАЦИИ
  // =============================================================================

  const getAnimationClasses = (): string => {
    if (!enableAnimations || mode === 'edit') return '';

    const animation = block.settings.animation;
    if (!animation) return '';

    const classes = [];

    switch (animation.type) {
      case 'fade':
        classes.push('animate-fade-in');
        break;
      case 'slide':
        classes.push('animate-slide-up');
        break;
      case 'zoom':
        classes.push('animate-zoom-in');
        break;
      case 'bounce':
        classes.push('animate-bounce-in');
        break;
    }

    return classes.join(' ');
  };

  // =============================================================================
  // РЕНДЕР
  // =============================================================================

  if (!shouldShow && mode === 'live') {
    return null;
  }

  return (
    <div
      ref={blockRef}
      className={cn(
        'relative group transition-all duration-200',
        getContainerClasses(),
        getAnimationClasses(),
        {
          // Стили для режима редактирования
          'ring-2 ring-blue-500 ring-opacity-50': mode === 'edit' && isSelected,
          'ring-1 ring-gray-300 ring-opacity-50': mode === 'edit' && isHovered && !isSelected,
          'opacity-50': mode === 'edit' && !block.isVisible,
          'cursor-pointer': mode === 'edit',
          
          // Стили для превью
          'border border-dashed border-gray-300': mode === 'preview' && !block.isVisible,
        },
        className
      )}
      style={getBlockStyles()}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-block-id={block.id}
      data-block-type={block.type}
    >
      {/* Панель инструментов */}
      {mode === 'edit' && showToolbar && (
        <BlockToolbar
          block={block}
          isSelected={isSelected}
          onEdit={handleToolbarAction.edit}
          onDelete={handleToolbarAction.delete}
          onMove={handleToolbarAction.move}
          onDuplicate={handleToolbarAction.duplicate}
          onToggleVisibility={handleToolbarAction.toggleVisibility}
        />
      )}

      {/* Метка типа блока для режима редактирования */}
      {mode === 'edit' && (isSelected || isHovered) && (
        <div className="absolute top-0 left-0 z-40 bg-blue-600 text-white text-xs px-2 py-1 rounded-br">
          {block.type}
        </div>
      )}

      {/* Индикатор скрытого блока */}
      {!block.isVisible && (mode === 'edit' || mode === 'preview') && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90 z-30">
          <div className="text-gray-500 text-center">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
            </svg>
            <p className="text-sm">Блок скрыт</p>
          </div>
        </div>
      )}

      {/* Контент блока */}
      <div className={cn(
        'relative z-10',
        !block.isVisible && 'opacity-50'
      )}>
        {children}
      </div>
    </div>
  );
};

export default BaseBlock;