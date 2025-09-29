/**
 * Hero блок для CMS системы WESHOW
 * Основной блок для героических секций с фоном, заголовком и CTA кнопками
 */

import React from 'react';
import { BaseBlock } from './BaseBlock';
import { Button } from '../../ui/button';
import { cn } from '../../../lib/utils';
import {
  ContentBlock,
  HeroBlockContent,
  CtaButton,
  MediaFile,
  MultiLanguageContent
} from '../../../types/cms';

// =============================================================================
// ТИПЫ И ИНТЕРФЕЙСЫ
// =============================================================================

interface HeroBlockProps {
  /** Данные блока */
  block: ContentBlock & { content: HeroBlockContent };
  
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
  
  /** Обработчик клика по CTA */
  onCtaClick?: (button: CtaButton) => void;
}

// =============================================================================
// ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ
// =============================================================================

interface HeroBackgroundProps {
  backgroundImage?: MediaFile;
  backgroundVideo?: MediaFile;
  overlay?: {
    enabled: boolean;
    color?: string;
    opacity?: number;
  };
  className?: string;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({
  backgroundImage,
  backgroundVideo,
  overlay,
  className
}) => {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Фоновое видео */}
      {backgroundVideo && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={backgroundVideo.url} type="video/mp4" />
        </video>
      )}
      
      {/* Фоновое изображение */}
      {backgroundImage && !backgroundVideo && (
        <img
          src={backgroundImage.url}
          alt={backgroundImage.alt?.ru || ''}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      {/* Градиентное наложение */}
      {overlay?.enabled && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: overlay.color || 'rgba(0, 0, 0, 0.4)',
            opacity: overlay.opacity || 0.4
          }}
        />
      )}
    </div>
  );
};

interface HeroContentProps {
  content: HeroBlockContent;
  language: 'ru' | 'en';
  onCtaClick?: (button: CtaButton) => void;
  mode: 'edit' | 'preview' | 'live';
}

const HeroContent: React.FC<HeroContentProps> = ({
  content,
  language,
  onCtaClick,
  mode
}) => {
  const getLocalizedText = (text: MultiLanguageContent): string => {
    return text[language] || text.ru || '';
  };

  const handleCtaClick = (button: CtaButton, e: React.MouseEvent) => {
    e.preventDefault();
    
    if (mode === 'edit') {
      return; // В режиме редактирования не переходим по ссылкам
    }
    
    if (onCtaClick) {
      onCtaClick(button);
    } else {
      // Стандартное поведение
      if (button.openInNewTab) {
        window.open(button.link, '_blank');
      } else {
        window.location.href = button.link;
      }
    }
  };

  return (
    <div className="relative z-10 text-center">
      {/* Заголовок */}
      {content.title && (
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {getLocalizedText(content.title)}
        </h1>
      )}
      
      {/* Подзаголовок */}
      {content.subtitle && (
        <h2 className="text-xl md:text-2xl lg:text-3xl text-white text-opacity-90 mb-6 font-medium">
          {getLocalizedText(content.subtitle)}
        </h2>
      )}
      
      {/* Описание */}
      {content.description && (
        <p className="text-lg md:text-xl text-white text-opacity-80 mb-8 max-w-3xl mx-auto leading-relaxed">
          {getLocalizedText(content.description)}
        </p>
      )}
      
      {/* CTA кнопки */}
      {content.ctaButtons && content.ctaButtons.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {content.ctaButtons.map((button, index) => (
            <Button
              key={index}
              variant={button.style === 'primary' ? 'default' : 
                     button.style === 'secondary' ? 'secondary' :
                     button.style === 'outline' ? 'outline' : 'ghost'}
              size="lg"
              className={cn(
                'px-8 py-4 text-lg font-semibold transition-all duration-300',
                {
                  'bg-white text-gray-900 hover:bg-gray-100': button.style === 'primary',
                  'bg-white bg-opacity-20 text-white hover:bg-opacity-30 backdrop-blur-sm': button.style === 'secondary',
                  'border-white text-white hover:bg-white hover:text-gray-900': button.style === 'outline',
                  'text-white hover:bg-white hover:bg-opacity-20': button.style === 'ghost',
                }
              )}
              onClick={(e) => handleCtaClick(button, e)}
            >
              {button.icon && (
                <span className="mr-2" dangerouslySetInnerHTML={{ __html: button.icon }} />
              )}
              {getLocalizedText(button.text)}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

// =============================================================================
// ОСНОВНОЙ КОМПОНЕНТ HERO БЛОКА
// =============================================================================

export const HeroBlock: React.FC<HeroBlockProps> = ({
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
  onUpdate,
  onCtaClick
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
      className="min-h-[500px] lg:min-h-[600px] flex items-center justify-center"
    >
      {/* Фоновое содержимое */}
      <HeroBackground
        backgroundImage={content.backgroundImage}
        backgroundVideo={content.backgroundVideo}
        overlay={content.overlay}
      />
      
      {/* Основное содержимое */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <HeroContent
          content={content}
          language={language}
          onCtaClick={onCtaClick}
          mode={mode}
        />
      </div>
      
      {/* Анимированные элементы (только в live режиме) */}
      {mode === 'live' && (
        <>
          {/* Частицы или другие анимированные элементы */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Здесь можно добавить частицы, геометрические фигуры и т.д. */}
          </div>
          
          {/* Индикатор прокрутки */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-white opacity-60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </>
      )}
    </BaseBlock>
  );
};

// =============================================================================
// КОНФИГУРАЦИЯ БЛОКА
// =============================================================================

export const heroBlockConfig = {
  type: 'hero',
  name: {
    ru: 'Hero секция',
    en: 'Hero Section'
  },
  description: {
    ru: 'Основная секция с заголовком, описанием и кнопками действий',
    en: 'Main section with title, description and call-to-action buttons'
  },
  icon: '🎯',
  category: 'layout',
  
  // Настройки по умолчанию
  defaultContent: {
    title: {
      ru: 'Добро пожаловать в WESHOW',
      en: 'Welcome to WESHOW'
    },
    subtitle: {
      ru: 'Современные мультимедийные решения',
      en: 'Modern Multimedia Solutions'
    },
    description: {
      ru: 'Создаем впечатляющие интерактивные проекты с использованием передовых технологий',
      en: 'Creating impressive interactive projects using cutting-edge technologies'
    },
    ctaButtons: [
      {
        text: {
          ru: 'Узнать больше',
          en: 'Learn More'
        },
        link: '#services',
        style: 'primary',
        openInNewTab: false
      },
      {
        text: {
          ru: 'Связаться с нами',
          en: 'Contact Us'
        },
        link: '#contact',
        style: 'outline',
        openInNewTab: false
      }
    ]
  } as HeroBlockContent,
  
  defaultSettings: {
    backgroundColor: 'transparent',
    textColor: '#ffffff',
    padding: { top: 80, right: 0, bottom: 80, left: 0 },
    width: 'full',
    alignment: 'center',
    animation: {
      type: 'fade',
      duration: 1000,
      trigger: 'viewport'
    },
    responsive: {
      mobile: {
        padding: { top: 60, right: 16, bottom: 60, left: 16 }
      },
      tablet: {
        padding: { top: 70, right: 32, bottom: 70, left: 32 }
      }
    }
  },
  
  // Поля для редактирования
  editableFields: [
    {
      name: 'title',
      type: 'multilang-text',
      label: { ru: 'Заголовок', en: 'Title' },
      required: true
    },
    {
      name: 'subtitle',
      type: 'multilang-text',
      label: { ru: 'Подзаголовок', en: 'Subtitle' }
    },
    {
      name: 'description',
      type: 'multilang-textarea',
      label: { ru: 'Описание', en: 'Description' }
    },
    {
      name: 'backgroundImage',
      type: 'media',
      label: { ru: 'Фоновое изображение', en: 'Background Image' },
      accept: 'image/*'
    },
    {
      name: 'backgroundVideo',
      type: 'media',
      label: { ru: 'Фоновое видео', en: 'Background Video' },
      accept: 'video/*'
    },
    {
      name: 'ctaButtons',
      type: 'cta-list',
      label: { ru: 'Кнопки действий', en: 'CTA Buttons' },
      maxItems: 3
    },
    {
      name: 'overlay',
      type: 'overlay-settings',
      label: { ru: 'Настройки наложения', en: 'Overlay Settings' }
    }
  ]
};

// Default content for new hero blocks
export const createHeroBlock = (): ContentBlock => ({
  id: Date.now().toString(),
  type: 'hero',
  content: {
    title: { ru: 'Добро пожаловать', en: 'Welcome' },
    subtitle: { ru: 'Профессиональные мультимедийные решения', en: 'Professional multimedia solutions' },
    description: { ru: 'Мы предоставляем современные технологии для успешных мероприятий любого масштаба', en: 'We provide modern technologies for successful events of any scale' },
    ctaButtons: [
      {
        text: { ru: 'Узнать больше', en: 'Learn More' },
        link: '/about',
        style: 'primary',
        icon: '',
        openInNewTab: false
      }
    ],
    backgroundImage: undefined,
    backgroundVideo: undefined,
    overlay: {
      enabled: true,
      color: 'rgba(0, 0, 0, 0.4)',
      opacity: 0.4
    }
  } as HeroBlockContent,
  settings: {
    responsive: {
      desktop: { visible: true },
      tablet: { visible: true },
      mobile: { visible: true }
    },
    spacing: {
      marginTop: 'none',
      marginBottom: 'lg'
    },
    padding: { top: 70, right: 32, bottom: 70, left: 32 }
  }
});

export default HeroBlock;