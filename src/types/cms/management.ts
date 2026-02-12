/**
 * Типы для управления CMS системой WESHOW
 * Административные интерфейсы и конфигурация
 */

import { ContentBlock, CMSPage, MediaFile, MultiLanguageContent } from './content';

// =============================================================================
// УПРАВЛЕНИЕ CMS
// =============================================================================

/** Состояние CMS системы */
export interface CMSState {
  // Страницы
  pages: CMSPage[];
  currentPage?: CMSPage;
  
  // Блоки
  blocks: ContentBlock[];
  blockTemplates: BlockTemplate[];
  
  // Медиа
  mediaLibrary: MediaFile[];
  mediaFolders: MediaFolder[];
  
  // Пользователи и права
  currentUser?: CMSUser;
  users: CMSUser[];
  
  // Конфигурация
  siteConfig: SiteConfiguration;
  languages: LanguageConfig[];
  
  // Состояние интерфейса
  isLoading: boolean;
  selectedBlocks: string[];
  previewMode: PreviewMode;
  isDirty: boolean;
  
  // Ошибки и уведомления
  errors: CMSError[];
  notifications: CMSNotification[];
}

/** Действия CMS */
export type CMSAction =
  // Страницы
  | { type: 'SET_PAGES'; payload: CMSPage[] }
  | { type: 'ADD_PAGE'; payload: CMSPage }
  | { type: 'UPDATE_PAGE'; payload: { id: string; updates: Partial<CMSPage> } }
  | { type: 'DELETE_PAGE'; payload: string }
  | { type: 'SET_CURRENT_PAGE'; payload: CMSPage | undefined }
  
  // Блоки
  | { type: 'ADD_BLOCK'; payload: { pageId: string; block: ContentBlock; index?: number } }
  | { type: 'UPDATE_BLOCK'; payload: { pageId: string; blockId: string; updates: Partial<ContentBlock> } }
  | { type: 'DELETE_BLOCK'; payload: { pageId: string; blockId: string } }
  | { type: 'REORDER_BLOCKS'; payload: { pageId: string; fromIndex: number; toIndex: number } }
  | { type: 'SELECT_BLOCKS'; payload: string[] }
  
  // Медиа
  | { type: 'SET_MEDIA_LIBRARY'; payload: MediaFile[] }
  | { type: 'ADD_MEDIA_FILE'; payload: MediaFile }
  | { type: 'DELETE_MEDIA_FILE'; payload: string }
  | { type: 'UPDATE_MEDIA_FILE'; payload: { id: string; updates: Partial<MediaFile> } }
  
  // Состояние
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PREVIEW_MODE'; payload: PreviewMode }
  | { type: 'SET_DIRTY'; payload: boolean }
  | { type: 'ADD_ERROR'; payload: CMSError }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'ADD_NOTIFICATION'; payload: CMSNotification };

/** Режимы предварительного просмотра */
export type PreviewMode = 'edit' | 'preview' | 'mobile' | 'tablet' | 'desktop';

// =============================================================================
// ПОЛЬЗОВАТЕЛИ И ПРАВА ДОСТУПА
// =============================================================================

/** Пользователь CMS */
export interface CMSUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  role: UserRole;
  permissions: Permission[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  preferences: UserPreferences;
}

/** Роли пользователей */
export type UserRole = 'super_admin' | 'admin' | 'editor' | 'author' | 'viewer';

/** Права доступа */
export interface Permission {
  resource: PermissionResource;
  actions: PermissionAction[];
  conditions?: PermissionCondition[];
}

export type PermissionResource = 
  | 'pages'
  | 'blocks' 
  | 'media'
  | 'users'
  | 'settings'
  | 'analytics'
  | 'comments'
  | 'portfolio'
  | 'services';

export type PermissionAction = 
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'publish'
  | 'unpublish'
  | 'bulk_edit';

export interface PermissionCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'in' | 'not_in';
  value: any;
}

/** Настройки пользователя */
export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark' | 'auto';
  timezone: string;
  dateFormat: string;
  autoSave: boolean;
  autoSaveInterval: number; // в секундах
  showWelcomeMessage: boolean;
  notifications: NotificationSettings;
}

export interface NotificationSettings {
  email: boolean;
  browser: boolean;
  newComments: boolean;
  systemUpdates: boolean;
  weeklyReport: boolean;
}

// =============================================================================
// ШАБЛОНЫ И КОМПОНЕНТЫ
// =============================================================================

/** Шаблон блока */
export interface BlockTemplate {
  id: string;
  name: MultiLanguageContent;
  description?: MultiLanguageContent;
  category: TemplateCategory;
  thumbnail: string;
  isPremium: boolean;
  
  // Конфигурация блока
  blockType: string;
  defaultContent: any;
  defaultSettings: any;
  
  // Кастомизация
  customizable: TemplateCustomization;
  variations?: TemplateVariation[];
  
  // Метаданные
  author: string;
  version: string;
  tags: string[];
  usageCount: number;
  rating?: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export type TemplateCategory = 
  | 'hero'
  | 'content'
  | 'gallery'
  | 'forms'
  | 'navigation'
  | 'footer'
  | 'ecommerce'
  | 'social'
  | 'custom';

export interface TemplateCustomization {
  colors: boolean;
  fonts: boolean;
  spacing: boolean;
  layout: boolean;
  content: boolean;
  animations: boolean;
}

export interface TemplateVariation {
  id: string;
  name: MultiLanguageContent;
  thumbnail: string;
  settings: any;
}

// =============================================================================
// КОНФИГУРАЦИЯ САЙТА
// =============================================================================

/** Конфигурация сайта */
export interface SiteConfiguration {
  // Основные настройки
  siteName: MultiLanguageContent;
  siteDescription: MultiLanguageContent;
  logo?: MediaFile;
  favicon?: MediaFile;
  
  // Языки и локализация
  defaultLanguage: string;
  enabledLanguages: string[];
  autoDetectLanguage: boolean;
  
  // SEO настройки
  defaultSEO: {
    metaTitle: MultiLanguageContent;
    metaDescription: MultiLanguageContent;
    keywords: string[];
    ogImage?: MediaFile;
  };
  
  // Внешний вид
  theme: ThemeConfiguration;
  
  // Функциональность
  features: FeatureFlags;
  
  // Интеграции
  integrations: SiteIntegrations;
  
  // Безопасность
  security: SecuritySettings;
  
  // Производительность
  performance: PerformanceSettings;
}

/** Конфигурация темы */
export interface ThemeConfiguration {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  linkColor: string;
  
  // Шрифты
  primaryFont: FontConfiguration;
  secondaryFont: FontConfiguration;
  
  // Размеры
  containerMaxWidth: number;
  borderRadius: number;
  boxShadow: string;
  
  // Кастомный CSS
  customCSS?: string;
}

export interface FontConfiguration {
  family: string;
  weights: number[];
  googleFont?: boolean;
  customFont?: MediaFile;
}

/** Флаги функций */
export interface FeatureFlags {
  enableComments: boolean;
  enableSearch: boolean;
  enableAnalytics: boolean;
  enableCache: boolean;
  enableCompression: boolean;
  enableLazyLoading: boolean;
  enablePWA: boolean;
  enableDarkMode: boolean;
  enableMultiLanguage: boolean;
  enableUserRegistration: boolean;
}

/** Интеграции */
export interface SiteIntegrations {
  // Аналитика
  googleAnalytics?: {
    trackingId: string;
    enabled: boolean;
  };
  
  yandexMetrika?: {
    counterId: string;
    enabled: boolean;
  };
  
  // Социальные сети
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    telegram?: string;
  };
  
  // Email
  emailProvider?: {
    provider: 'smtp' | 'sendgrid' | 'mailgun' | 'ses';
    config: any;
  };
  
  // Карты
  maps?: {
    provider: 'google' | 'yandex' | 'openstreet';
    apiKey?: string;
  };
  
  // Платежи
  payments?: {
    provider: 'stripe' | 'paypal' | 'yookassa';
    config: any;
  };
}

/** Настройки безопасности */
export interface SecuritySettings {
  enableCSRF: boolean;
  enableCORS: boolean;
  allowedOrigins: string[];
  maxFileSize: number; // в байтах
  allowedFileTypes: string[];
  enableRateLimit: boolean;
  rateLimitRequests: number;
  rateLimitWindow: number; // в минутах
}

/** Настройки производительности */
export interface PerformanceSettings {
  enableCache: boolean;
  cacheTimeout: number; // в секундах
  enableCompression: boolean;
  optimizeImages: boolean;
  lazyLoadImages: boolean;
  minifyCSS: boolean;
  minifyJS: boolean;
  enableCDN: boolean;
  cdnUrl?: string;
}

// =============================================================================
// ЯЗЫКОВАЯ КОНФИГУРАЦИЯ
// =============================================================================

/** Конфигурация языка */
export interface LanguageConfig {
  code: string; // ISO 639-1
  name: string;
  nativeName: string;
  flag: string; // emoji или путь к файлу
  isDefault: boolean;
  isActive: boolean;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  numberFormat: string;
  currency: string;
}

// =============================================================================
// ОШИБКИ И УВЕДОМЛЕНИЯ
// =============================================================================

/** Ошибка CMS */
export interface CMSError {
  id: string;
  type: ErrorType;
  message: MultiLanguageContent;
  details?: any;
  timestamp: Date;
  userId?: string;
  resolved: boolean;
}

export type ErrorType = 
  | 'validation'
  | 'permission'
  | 'network'
  | 'server'
  | 'file_upload'
  | 'database'
  | 'unknown';

/** Уведомление CMS */
export interface CMSNotification {
  id: string;
  type: NotificationType;
  title: MultiLanguageContent;
  message: MultiLanguageContent;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  actionText?: MultiLanguageContent;
}

export type NotificationType = 
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'system';

// =============================================================================
// МЕДИА И ФАЙЛЫ
// =============================================================================

/** Папка медиа файлов */
export interface MediaFolder {
  id: string;
  name: string;
  parentId?: string;
  children: string[];
  createdAt: Date;
  updatedAt: Date;
  permissions?: FolderPermissions;
}

export interface FolderPermissions {
  canRead: string[]; // user IDs
  canWrite: string[];
  canDelete: string[];
}

// =============================================================================
// АНАЛИТИКА И ОТЧЕТЫ
// =============================================================================

/** Данные аналитики */
export interface AnalyticsData {
  overview: AnalyticsOverview;
  pages: PageAnalyticsData[];
  blocks: BlockAnalyticsData[];
  media: MediaAnalyticsData[];
  users: UserAnalyticsData[];
  timeRange: {
    from: Date;
    to: Date;
  };
}

export interface AnalyticsOverview {
  totalViews: number;
  uniqueVisitors: number;
  averageSessionTime: number;
  bounceRate: number;
  topPages: { path: string; views: number }[];
  topCountries: { country: string; visitors: number }[];
  deviceTypes: { type: string; percentage: number }[];
}

export interface PageAnalyticsData {
  pageId: string;
  path: string;
  title: string;
  views: number;
  uniqueViews: number;
  averageTime: number;
  bounceRate: number;
  exitRate: number;
}

export interface BlockAnalyticsData {
  blockId: string;
  type: string;
  views: number;
  clicks: number;
  interactionRate: number;
  conversionRate?: number;
}

export interface MediaAnalyticsData {
  fileId: string;
  fileName: string;
  views: number;
  downloads: number;
  usageCount: number;
  storageUsed: number;
}

export interface UserAnalyticsData {
  userId: string;
  username: string;
  loginCount: number;
  lastLogin: Date;
  pagesCreated: number;
  pagesEdited: number;
  activityScore: number;
}

// =============================================================================
// ЭКСПОРТ И ИМПОРТ
// =============================================================================

/** Конфигурация экспорта */
export interface ExportConfiguration {
  includePages: boolean;
  includeMedia: boolean;
  includeSettings: boolean;
  includeUsers: boolean;
  includeAnalytics: boolean;
  format: 'json' | 'xml' | 'csv';
  compression: boolean;
}

/** Конфигурация импорта */
export interface ImportConfiguration {
  replaceExisting: boolean;
  createBackup: boolean;
  validateData: boolean;
  skipErrors: boolean;
  mapping?: ImportMapping;
}

export interface ImportMapping {
  pages?: { [key: string]: string };
  blocks?: { [key: string]: string };
  media?: { [key: string]: string };
  users?: { [key: string]: string };
}

/** Результат импорта */
export interface ImportResult {
  success: boolean;
  importedPages: number;
  importedBlocks: number;
  importedMedia: number;
  importedUsers: number;
  errors: ImportError[];
  warnings: ImportWarning[];
}

export interface ImportError {
  type: string;
  message: string;
  item?: any;
}

export interface ImportWarning {
  type: string;
  message: string;
  item?: any;
}