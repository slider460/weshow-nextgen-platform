/**
 * Индексный файл для всех типов CMS системы WESHOW
 * Централизованный экспорт всех интерфейсов и типов
 */

// =============================================================================
// ЭКСПОРТ БАЗОВЫХ ТИПОВ КОНТЕНТА
// =============================================================================
export type {
  // Базовые интерфейсы
  MultiLanguageContent,
  ContentMetadata,
  ContentStatus,
  SEOData,
  
  // Блочная система
  ContentBlock,
  BlockType,
  BlockSettings,
  BlockContent,
  
  // Специфичные блоки
  HeroBlockContent,
  TextBlockContent,
  ImageBlockContent,
  GalleryBlockContent,
  VideoBlockContent,
  ServicesGridContent,
  PortfolioShowcaseContent,
  ContactFormContent,
  CustomBlockContent,
  
  // Страницы
  CMSPage,
  PageLayout,
  AccessLevel,
  PageSettings,
  PageAnalytics,
  
  // Элементы контента
  ServiceItem,
  PriceInfo,
  FormField,
  FormFieldType,
  FormFieldOption,
  FieldValidation,
  
  // Вспомогательные типы
  CtaButton,
  MediaFile,
  MediaType,
  MediaMetadata,
  SpacingSettings,
  ShadowSettings,
  ResponsiveSettings,
  AnimationSettings,
  OverlaySettings,
  GradientSettings,
  GradientStop,
  DisplayCondition,
  BlockAnalytics,
  
  // Импорт существующих типов
  PortfolioItem,
  PortfolioCategory
} from './content';

// =============================================================================
// ЭКСПОРТ ТИПОВ УПРАВЛЕНИЯ
// =============================================================================
export type {
  // Состояние CMS
  CMSState,
  CMSAction,
  PreviewMode,
  
  // Пользователи и права
  CMSUser,
  UserRole,
  Permission,
  PermissionResource,
  PermissionAction,
  PermissionCondition,
  UserPreferences,
  NotificationSettings,
  
  // Шаблоны
  BlockTemplate,
  TemplateCategory,
  TemplateCustomization,
  TemplateVariation,
  
  // Конфигурация сайта
  SiteConfiguration,
  ThemeConfiguration,
  FontConfiguration,
  FeatureFlags,
  SiteIntegrations,
  SecuritySettings,
  PerformanceSettings,
  
  // Языки
  LanguageConfig,
  
  // Ошибки и уведомления
  CMSError,
  ErrorType,
  CMSNotification,
  NotificationType,
  
  // Медиа
  MediaFolder,
  FolderPermissions,
  
  // Аналитика
  AnalyticsData,
  AnalyticsOverview,
  PageAnalyticsData,
  BlockAnalyticsData,
  MediaAnalyticsData,
  UserAnalyticsData,
  
  // Экспорт/Импорт
  ExportConfiguration,
  ImportConfiguration,
  ImportMapping,
  ImportResult,
  ImportError,
  ImportWarning
} from './management';

// =============================================================================
// ЭКСПОРТ API ТИПОВ
// =============================================================================
export type {
  // Базовые API типы
  APIResponse,
  APIError,
  ResponseMeta,
  PaginationMeta,
  RequestParams,
  
  // API интерфейсы
  PagesAPI,
  MediaAPI,
  ContentAPI,
  UsersAPI,
  ConfigAPI,
  AnalyticsAPI,
  SystemAPI,
  CMSAPIClient,
  
  // Запросы страниц
  CreatePageRequest,
  UpdatePageRequest,
  CreateBlockRequest,
  UpdateBlockRequest,
  CreateTemplateRequest,
  
  // Запросы медиа
  MediaRequestParams,
  UpdateMediaRequest,
  CreateFolderRequest,
  UpdateFolderRequest,
  ImageOptimizationOptions,
  ThumbnailSize,
  
  // Запросы контента
  CreateServiceRequest,
  UpdateServiceRequest,
  CreatePortfolioRequest,
  UpdatePortfolioRequest,
  ContentCategory,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  
  // Аутентификация
  LoginRequest,
  AuthResponse,
  UpdateProfileRequest,
  ChangePasswordRequest,
  CreateUserRequest,
  UpdateUserRequest,
  
  // Конфигурация
  CreateLanguageRequest,
  UpdateLanguageRequest,
  UpdateTemplateRequest,
  
  // Аналитика
  AnalyticsParams,
  TrackingEvent,
  ReportType,
  AnalyticsReport,
  
  // Системные операции
  SystemHealth,
  HealthCheck,
  SystemInfo,
  CacheStats,
  BackupInfo,
  LogParams,
  LogEntry,
  
  // Конфигурация клиента
  APIClientConfig,
  RequestInterceptor,
  ResponseInterceptor
} from './api';

// =============================================================================
// ДОПОЛНИТЕЛЬНЫЕ УТИЛИТАРНЫЕ ТИПЫ
// =============================================================================

/** Состояния загрузки */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/** Результат операции */
export interface OperationResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

/** Настройки валидации */
export interface ValidationSettings {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

/** Результат валидации */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings?: string[];
}

/** Конфигурация пагинации */
export interface PaginationConfig {
  page: number;
  limit: number;
  showTotal?: boolean;
  showSizeChanger?: boolean;
  pageSizeOptions?: number[];
}

/** Состояние фильтрации */
export interface FilterState {
  search?: string;
  category?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  tags?: string[];
  customFilters?: Record<string, any>;
}

/** Настройки сортировки */
export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
  type?: 'string' | 'number' | 'date';
}

/** Конфигурация таблицы */
export interface TableConfig {
  columns: TableColumn[];
  pagination?: PaginationConfig;
  sorting?: SortConfig;
  filtering?: boolean;
  selection?: 'single' | 'multiple' | 'none';
  actions?: TableAction[];
}

export interface TableColumn {
  key: string;
  title: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  renderer?: (value: any, record: any) => React.ReactNode;
}

export interface TableAction {
  key: string;
  title: string;
  icon?: string;
  color?: string;
  handler: (record: any) => void;
  visible?: (record: any) => boolean;
}

/** Конфигурация формы */
export interface FormConfig {
  fields: FormFieldConfig[];
  validation?: ValidationSettings;
  submitHandler: (data: any) => void;
  resetOnSubmit?: boolean;
  showReset?: boolean;
}

export interface FormFieldConfig {
  name: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: ValidationSettings;
  options?: { value: any; label: string }[];
  dependencies?: FormFieldDependency[];
}

export interface FormFieldDependency {
  field: string;
  condition: (value: any) => boolean;
  effect: 'show' | 'hide' | 'enable' | 'disable' | 'require';
}

/** Конфигурация уведомлений */
export interface NotificationConfig {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  duration: number;
  maxNotifications: number;
  showProgress?: boolean;
  pauseOnHover?: boolean;
}

/** Настройки темы */
export interface ThemeSettings {
  mode: 'light' | 'dark';
  primaryColor: string;
  accentColor: string;
  borderRadius: number;
  fontSize: number;
  fontFamily: string;
}

/** Конфигурация медиа загрузки */
export interface MediaUploadConfig {
  maxFileSize: number; // в байтах
  allowedTypes: string[];
  maxFiles: number;
  autoUpload: boolean;
  showProgress: boolean;
  enablePreview: boolean;
  compression?: {
    quality: number;
    maxWidth: number;
    maxHeight: number;
  };
}

/** Настройки редактора */
export interface EditorConfig {
  toolbar: EditorToolbarItem[];
  plugins: string[];
  autoSave: boolean;
  autoSaveInterval: number;
  spellCheck: boolean;
  wordWrap: boolean;
  showWordCount: boolean;
}

export interface EditorToolbarItem {
  type: 'button' | 'dropdown' | 'separator';
  name: string;
  icon?: string;
  title?: string;
  options?: { value: string; label: string }[];
}

// =============================================================================
// КОНСТАНТЫ И ПЕРЕЧИСЛЕНИЯ
// =============================================================================

/** Статусы контента */
export const CONTENT_STATUSES = {
  DRAFT: 'draft',
  REVIEW: 'review',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  SCHEDULED: 'scheduled'
} as const;

/** Типы медиа файлов */
export const MEDIA_TYPES = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENT: 'document'
} as const;

/** Роли пользователей */
export const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
  AUTHOR: 'author',
  VIEWER: 'viewer'
} as const;

/** Размеры устройств для адаптивности */
export const DEVICE_BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1440
} as const;

/** Поддерживаемые языки */
export const SUPPORTED_LANGUAGES = {
  RU: 'ru',
  EN: 'en'
} as const;

/** Типы уведомлений */
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SYSTEM: 'system'
} as const;

// =============================================================================
// УТИЛИТАРНЫЕ ФУНКЦИИ ТИПОВ
// =============================================================================

/** Проверка является ли значение мультиязычным контентом */
export function isMultiLanguageContent(value: any): value is MultiLanguageContent {
  return value && typeof value === 'object' && 'ru' in value && 'en' in value;
}

/** Получение контента для определенного языка */
export function getLocalizedContent(content: MultiLanguageContent | string, lang: string = 'ru'): string {
  if (typeof content === 'string') return content;
  return content[lang as keyof MultiLanguageContent] || content.ru || '';
}

/** Проверка прав доступа */
export function hasPermission(user: CMSUser, resource: PermissionResource, action: PermissionAction): boolean {
  return user.permissions.some(permission => 
    permission.resource === resource && 
    permission.actions.includes(action)
  );
}

/** Проверка статуса контента */
export function isPublished(status: ContentStatus): boolean {
  return status === CONTENT_STATUSES.PUBLISHED;
}

/** Получение расширения файла */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

/** Форматирование размера файла */
export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

/** Проверка типа медиа файла */
export function getMediaType(filename: string): MediaType {
  const ext = getFileExtension(filename);
  const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  const videoExts = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm'];
  const audioExts = ['mp3', 'wav', 'ogg', 'aac', 'flac'];
  
  if (imageExts.includes(ext)) return MEDIA_TYPES.IMAGE;
  if (videoExts.includes(ext)) return MEDIA_TYPES.VIDEO;
  if (audioExts.includes(ext)) return MEDIA_TYPES.AUDIO;
  return MEDIA_TYPES.DOCUMENT;
}