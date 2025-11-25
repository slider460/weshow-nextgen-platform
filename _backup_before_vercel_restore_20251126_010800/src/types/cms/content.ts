/**
 * Базовые типы данных для CMS системы WESHOW
 * Расширенная система управления контентом
 */

// =============================================================================
// БАЗОВЫЕ ИНТЕРФЕЙСЫ
// =============================================================================

/** Мультиязычный контент */
export interface MultiLanguageContent {
  ru: string;
  en: string;
}

/** Метаданные содержимого */
export interface ContentMetadata {
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  author: string;
  lastEditor?: string;
  version: number;
  status: ContentStatus;
}

/** Статусы контента */
export type ContentStatus = 'draft' | 'review' | 'published' | 'archived' | 'scheduled';

/** SEO данные */
export interface SEOData {
  metaTitle: MultiLanguageContent;
  metaDescription: MultiLanguageContent;
  keywords: string[];
  ogImage?: string;
  ogTitle?: MultiLanguageContent;
  ogDescription?: MultiLanguageContent;
  canonicalUrl?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

// =============================================================================
// БЛОЧНАЯ СИСТЕМА КОНТЕНТА
// =============================================================================

/** Базовый блок контента */
export interface ContentBlock {
  id: string;
  type: BlockType;
  order: number;
  isVisible: boolean;
  settings: BlockSettings;
  content: BlockContent;
  conditions?: DisplayCondition[];
  analytics?: BlockAnalytics;
}

/** Типы блоков */
export type BlockType = 
  // Основные блоки
  | 'hero'
  | 'text'
  | 'image'
  | 'gallery'
  | 'video'
  // Интерактивные блоки
  | 'services-grid'
  | 'portfolio-showcase'
  | 'testimonials'
  | 'team-members'
  | 'pricing-table'
  // Формы и CTA
  | 'contact-form'
  | 'newsletter-signup'
  | 'cta-banner'
  | 'consultation-modal'
  // Навигация и структура
  | 'breadcrumbs'
  | 'pagination'
  | 'related-content'
  // Специальные блоки
  | 'map'
  | 'social-proof'
  | 'faq'
  | 'stats-counter'
  | 'timeline'
  | 'custom-html';

/** Настройки блока */
export interface BlockSettings {
  // Стилизация
  backgroundColor?: string;
  textColor?: string;
  padding?: SpacingSettings;
  margin?: SpacingSettings;
  borderRadius?: number;
  shadow?: ShadowSettings;
  
  // Макет
  width?: 'full' | 'container' | 'narrow';
  alignment?: 'left' | 'center' | 'right';
  columns?: number;
  gap?: number;
  
  // Адаптивность
  responsive?: ResponsiveSettings;
  
  // Анимации
  animation?: AnimationSettings;
  
  // Кастомные CSS классы
  customClasses?: string[];
  customStyles?: Record<string, any>;
}

/** Контент блока */
export type BlockContent = 
  | HeroBlockContent
  | TextBlockContent
  | ImageBlockContent
  | GalleryBlockContent
  | VideoBlockContent
  | ServicesGridContent
  | PortfolioShowcaseContent
  | ContactFormContent
  | CustomBlockContent;

// =============================================================================
// СПЕЦИФИЧНЫЕ ТИПЫ БЛОКОВ
// =============================================================================

/** Герой секция */
export interface HeroBlockContent {
  title: MultiLanguageContent;
  subtitle?: MultiLanguageContent;
  description?: MultiLanguageContent;
  backgroundImage?: MediaFile;
  backgroundVideo?: MediaFile;
  ctaButtons?: CtaButton[];
  overlay?: OverlaySettings;
}

/** Текстовый блок */
export interface TextBlockContent {
  title?: MultiLanguageContent;
  content: MultiLanguageContent;
  format: 'html' | 'markdown' | 'plain';
  showReadMore?: boolean;
  readMoreLimit?: number;
}

/** Блок изображения */
export interface ImageBlockContent {
  image: MediaFile;
  caption?: MultiLanguageContent;
  alt: MultiLanguageContent;
  link?: string;
  lightbox?: boolean;
}

/** Галерея */
export interface GalleryBlockContent {
  images: MediaFile[];
  layout: 'grid' | 'masonry' | 'carousel' | 'slider';
  columns?: number;
  spacing?: number;
  lightbox?: boolean;
  captions?: boolean;
}

/** Видео блок */
export interface VideoBlockContent {
  video: MediaFile;
  poster?: MediaFile;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  title?: MultiLanguageContent;
  description?: MultiLanguageContent;
}

/** Сетка услуг */
export interface ServicesGridContent {
  title?: MultiLanguageContent;
  services: ServiceItem[];
  layout: 'grid' | 'list' | 'carousel';
  showPrices?: boolean;
  showDescriptions?: boolean;
}

/** Портфолио */
export interface PortfolioShowcaseContent {
  title?: MultiLanguageContent;
  projects: PortfolioItem[];
  layout: 'grid' | 'masonry' | 'carousel';
  filters?: string[];
  showCategories?: boolean;
}

/** Форма контактов */
export interface ContactFormContent {
  title?: MultiLanguageContent;
  description?: MultiLanguageContent;
  fields: FormField[];
  submitText: MultiLanguageContent;
  successMessage: MultiLanguageContent;
  endpoint?: string;
}

/** Кастомный блок */
export interface CustomBlockContent {
  html: string;
  css?: string;
  javascript?: string;
  isEditable: boolean;
}

// =============================================================================
// КАСТОМНЫЕ ТИПЫ БЛОКОВ ДЛЯ РЕДАКТОРА
// =============================================================================

/** Кастомный блок изображения для редактора */
export interface EditorImageBlockContent {
  src: string;
  alt: string;
  caption?: string;
  link?: {
    url: string;
    target: '_blank' | '_self';
  };
  alignment: 'left' | 'center' | 'right' | 'full';
  size: 'small' | 'medium' | 'large' | 'full';
  aspectRatio: 'auto' | '16:9' | '4:3' | '1:1' | '3:2';
}

/** Кастомный блок галереи для редактора */
export interface EditorGalleryBlockContent {
  images: {
    id: string;
    src: string;
    alt: string;
    caption?: string;
  }[];
  layout: 'grid' | 'masonry' | 'slider';
  columns: 2 | 3 | 4 | 5;
  aspectRatio: 'auto' | '16:9' | '4:3' | '1:1' | '3:2';
  spacing: 'none' | 'sm' | 'md' | 'lg';
  showCaptions: boolean;
  allowLightbox: boolean;
}

/** Кастомный блок видео для редактора */
export interface EditorVideoBlockContent {
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  type: 'upload' | 'youtube' | 'vimeo' | 'embed';
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  controls: boolean;
  aspectRatio: '16:9' | '4:3' | '1:1' | '21:9';
  alignment: 'left' | 'center' | 'right' | 'full';
  size: 'small' | 'medium' | 'large' | 'full';
}

// =============================================================================
// ВСПОМОГАТЕЛЬНЫЕ ТИПЫ
// =============================================================================

/** Кнопка призыва к действию */
export interface CtaButton {
  text: MultiLanguageContent;
  link: string;
  style: 'primary' | 'secondary' | 'outline' | 'ghost';
  icon?: string;
  openInNewTab?: boolean;
}

/** Медиа файл */
export interface MediaFile {
  id: string;
  url: string;
  thumbnail?: string;
  name: string;
  alt?: MultiLanguageContent;
  type: MediaType;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  meta?: MediaMetadata;
}

export type MediaType = 'image' | 'video' | 'audio' | 'document';

export interface MediaMetadata {
  format?: string;
  duration?: number; // для видео/аудио в секундах
  bitrate?: number;
  fps?: number; // для видео
  quality?: 'low' | 'medium' | 'high' | 'ultra';
}

/** Настройки отступов */
export interface SpacingSettings {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

/** Настройки тени */
export interface ShadowSettings {
  enabled: boolean;
  x?: number;
  y?: number;
  blur?: number;
  spread?: number;
  color?: string;
  opacity?: number;
}

/** Адаптивные настройки */
export interface ResponsiveSettings {
  mobile?: Partial<BlockSettings>;
  tablet?: Partial<BlockSettings>;
  desktop?: Partial<BlockSettings>;
}

/** Настройки анимации */
export interface AnimationSettings {
  type?: 'fade' | 'slide' | 'zoom' | 'bounce' | 'custom';
  duration?: number;
  delay?: number;
  easing?: string;
  trigger?: 'viewport' | 'click' | 'hover' | 'scroll';
}

/** Настройки наложения */
export interface OverlaySettings {
  enabled: boolean;
  color?: string;
  opacity?: number;
  gradient?: GradientSettings;
}

export interface GradientSettings {
  type: 'linear' | 'radial';
  direction?: string;
  stops: GradientStop[];
}

export interface GradientStop {
  color: string;
  position: number;
}

/** Условия отображения */
export interface DisplayCondition {
  type: 'device' | 'date' | 'user' | 'language' | 'custom';
  value: any;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater' | 'less';
}

/** Аналитика блока */
export interface BlockAnalytics {
  views: number;
  clicks: number;
  interactions: number;
  lastViewed?: Date;
  heatmapData?: any;
}

// =============================================================================
// СТРАНИЦЫ И СТРУКТУРА САЙТА
// =============================================================================

/** Страница */
export interface CMSPage {
  // Базовые данные
  meta: ContentMetadata;
  seo: SEOData;
  
  // Содержимое страницы
  title: MultiLanguageContent;
  description?: MultiLanguageContent;
  blocks: ContentBlock[];
  
  // Настройки страницы
  template?: string;
  layout?: PageLayout;
  settings: PageSettings;
  
  // Организация
  parentId?: string;
  children?: string[];
  category?: string;
  tags?: string[];
  
  // Публикация
  isHomepage?: boolean;
  requiresAuth?: boolean;
  accessLevel?: AccessLevel;
  scheduledPublish?: Date;
  
  // Статистика
  analytics?: PageAnalytics;
}

export type PageLayout = 'default' | 'fullwidth' | 'sidebar' | 'landing' | 'blog' | 'custom';

export type AccessLevel = 'public' | 'registered' | 'premium' | 'admin';

/** Настройки страницы */
export interface PageSettings {
  showInMenu?: boolean;
  menuOrder?: number;
  showBreadcrumbs?: boolean;
  showShareButtons?: boolean;
  allowComments?: boolean;
  enableSearch?: boolean;
  
  // Внешний вид
  headerStyle?: 'default' | 'transparent' | 'hidden';
  footerStyle?: 'default' | 'minimal' | 'hidden';
  
  // Функциональность
  enableCache?: boolean;
  cacheTimeout?: number;
  
  // Кастомизация
  customHead?: string;
  customFooter?: string;
}

/** Аналитика страницы */
export interface PageAnalytics {
  views: number;
  uniqueViews: number;
  averageTime: number;
  bounceRate: number;
  lastVisited?: Date;
  popularBlocks?: string[];
  conversionRate?: number;
}

// =============================================================================
// ЭЛЕМЕНТЫ СОДЕРЖИМОГО
// =============================================================================

/** Элемент услуги */
export interface ServiceItem {
  id: string;
  title: MultiLanguageContent;
  description: MultiLanguageContent;
  shortDescription?: MultiLanguageContent;
  icon?: string;
  image?: MediaFile;
  price?: PriceInfo;
  features?: string[];
  category?: string;
  link?: string;
  order: number;
  isActive: boolean;
}

/** Информация о цене */
export interface PriceInfo {
  amount?: number;
  currency: string;
  period?: 'hour' | 'day' | 'month' | 'project' | 'custom';
  customPeriod?: MultiLanguageContent;
  isFromPrice?: boolean;
  isNegotiable?: boolean;
}

/** Поле формы */
export interface FormField {
  id: string;
  type: FormFieldType;
  label: MultiLanguageContent;
  placeholder?: MultiLanguageContent;
  required: boolean;
  options?: FormFieldOption[];
  validation?: FieldValidation;
  order: number;
}

export type FormFieldType = 
  | 'text' 
  | 'email' 
  | 'tel' 
  | 'textarea' 
  | 'select' 
  | 'radio' 
  | 'checkbox' 
  | 'file' 
  | 'date' 
  | 'number';

export interface FormFieldOption {
  value: string;
  label: MultiLanguageContent;
}

export interface FieldValidation {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  customMessage?: MultiLanguageContent;
}

// =============================================================================
// ЭКСПОРТ ОСНОВНЫХ ТИПОВ
// =============================================================================

// Импорт базовых типов из существующей системы
import type { PortfolioItem, PortfolioCategory } from '../admin/portfolio';
export type { PortfolioItem, PortfolioCategory };