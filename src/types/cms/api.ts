/**
 * API интерфейсы для CMS системы WESHOW
 * Определения для взаимодействия с бэкендом
 */

import { 
  CMSPage, 
  ContentBlock, 
  MediaFile, 
  MultiLanguageContent,
  SEOData,
  ServiceItem,
  PortfolioItem 
} from './content';

import {
  CMSUser,
  SiteConfiguration,
  AnalyticsData,
  BlockTemplate,
  ExportConfiguration,
  ImportConfiguration,
  ImportResult
} from './management';

// =============================================================================
// БАЗОВЫЕ API ТИПЫ
// =============================================================================

/** Стандартный ответ API */
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: APIError;
  meta?: ResponseMeta;
}

/** Ошибка API */
export interface APIError {
  code: string;
  message: string;
  details?: any;
  field?: string;
}

/** Метаданные ответа */
export interface ResponseMeta {
  pagination?: PaginationMeta;
  total?: number;
  timestamp: Date;
  requestId: string;
}

/** Пагинация */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/** Параметры запроса */
export interface RequestParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
  include?: string[];
  lang?: string;
}

// =============================================================================
// API СТРАНИЦ
// =============================================================================

/** Запросы для страниц */
export interface PagesAPI {
  // Получение страниц
  getPages(params?: RequestParams): Promise<APIResponse<CMSPage[]>>;
  getPage(id: string, lang?: string): Promise<APIResponse<CMSPage>>;
  getPageBySlug(slug: string, lang?: string): Promise<APIResponse<CMSPage>>;
  
  // Создание и обновление
  createPage(data: CreatePageRequest): Promise<APIResponse<CMSPage>>;
  updatePage(id: string, data: UpdatePageRequest): Promise<APIResponse<CMSPage>>;
  deletePage(id: string): Promise<APIResponse<void>>;
  
  // Публикация
  publishPage(id: string): Promise<APIResponse<CMSPage>>;
  unpublishPage(id: string): Promise<APIResponse<CMSPage>>;
  schedulePage(id: string, publishAt: Date): Promise<APIResponse<CMSPage>>;
  
  // Блоки страницы
  addBlock(pageId: string, block: CreateBlockRequest): Promise<APIResponse<ContentBlock>>;
  updateBlock(pageId: string, blockId: string, data: UpdateBlockRequest): Promise<APIResponse<ContentBlock>>;
  deleteBlock(pageId: string, blockId: string): Promise<APIResponse<void>>;
  reorderBlocks(pageId: string, blockIds: string[]): Promise<APIResponse<void>>;
  
  // Дублирование и шаблоны
  duplicatePage(id: string, data?: Partial<CreatePageRequest>): Promise<APIResponse<CMSPage>>;
  createFromTemplate(templateId: string, data: CreatePageRequest): Promise<APIResponse<CMSPage>>;
  saveAsTemplate(pageId: string, templateData: CreateTemplateRequest): Promise<APIResponse<BlockTemplate>>;
}

/** Создание страницы */
export interface CreatePageRequest {
  title: MultiLanguageContent;
  slug: string;
  description?: MultiLanguageContent;
  template?: string;
  layout?: string;
  parentId?: string;
  category?: string;
  tags?: string[];
  seo?: Partial<SEOData>;
  status?: 'draft' | 'published';
  scheduledPublish?: Date;
  settings?: any;
}

/** Обновление страницы */
export interface UpdatePageRequest extends Partial<CreatePageRequest> {
  blocks?: ContentBlock[];
}

/** Создание блока */
export interface CreateBlockRequest {
  type: string;
  content: any;
  settings?: any;
  order?: number;
  isVisible?: boolean;
}

/** Обновление блока */
export interface UpdateBlockRequest extends Partial<CreateBlockRequest> {}

/** Создание шаблона */
export interface CreateTemplateRequest {
  name: MultiLanguageContent;
  description?: MultiLanguageContent;
  category: string;
  thumbnail?: string;
  tags?: string[];
}

// =============================================================================
// API МЕДИА
// =============================================================================

/** Запросы для медиа */
export interface MediaAPI {
  // Получение файлов
  getMediaFiles(params?: MediaRequestParams): Promise<APIResponse<MediaFile[]>>;
  getMediaFile(id: string): Promise<APIResponse<MediaFile>>;
  
  // Загрузка
  uploadFile(file: File, folder?: string): Promise<APIResponse<MediaFile>>;
  uploadFiles(files: File[], folder?: string): Promise<APIResponse<MediaFile[]>>;
  uploadFromUrl(url: string, folder?: string): Promise<APIResponse<MediaFile>>;
  
  // Управление
  updateMediaFile(id: string, data: UpdateMediaRequest): Promise<APIResponse<MediaFile>>;
  deleteMediaFile(id: string): Promise<APIResponse<void>>;
  moveMediaFile(id: string, folderId?: string): Promise<APIResponse<MediaFile>>;
  
  // Папки
  getFolders(): Promise<APIResponse<MediaFolder[]>>;
  createFolder(data: CreateFolderRequest): Promise<APIResponse<MediaFolder>>;
  updateFolder(id: string, data: UpdateFolderRequest): Promise<APIResponse<MediaFolder>>;
  deleteFolder(id: string): Promise<APIResponse<void>>;
  
  // Оптимизация
  optimizeImage(id: string, options: ImageOptimizationOptions): Promise<APIResponse<MediaFile>>;
  generateThumbnails(id: string, sizes: ThumbnailSize[]): Promise<APIResponse<string[]>>;
}

export interface MediaRequestParams extends RequestParams {
  type?: 'image' | 'video' | 'document';
  folder?: string;
  dateFrom?: Date;
  dateTo?: Date;
  sizeMin?: number;
  sizeMax?: number;
}

export interface UpdateMediaRequest {
  name?: string;
  alt?: MultiLanguageContent;
  folder?: string;
  tags?: string[];
}

export interface MediaFolder {
  id: string;
  name: string;
  parentId?: string;
  children: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFolderRequest {
  name: string;
  parentId?: string;
}

export interface UpdateFolderRequest {
  name?: string;
  parentId?: string;
}

export interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  width?: number;
  height?: number;
  crop?: boolean;
}

export interface ThumbnailSize {
  width: number;
  height: number;
  name: string;
}

// =============================================================================
// API КОНТЕНТА
// =============================================================================

/** Запросы для контента */
export interface ContentAPI {
  // Услуги
  getServices(params?: RequestParams): Promise<APIResponse<ServiceItem[]>>;
  getService(id: string): Promise<APIResponse<ServiceItem>>;
  createService(data: CreateServiceRequest): Promise<APIResponse<ServiceItem>>;
  updateService(id: string, data: UpdateServiceRequest): Promise<APIResponse<ServiceItem>>;
  deleteService(id: string): Promise<APIResponse<void>>;
  
  // Портфолио
  getPortfolioItems(params?: RequestParams): Promise<APIResponse<PortfolioItem[]>>;
  getPortfolioItem(id: string): Promise<APIResponse<PortfolioItem>>;
  createPortfolioItem(data: CreatePortfolioRequest): Promise<APIResponse<PortfolioItem>>;
  updatePortfolioItem(id: string, data: UpdatePortfolioRequest): Promise<APIResponse<PortfolioItem>>;
  deletePortfolioItem(id: string): Promise<APIResponse<void>>;
  
  // Категории
  getCategories(type: 'service' | 'portfolio'): Promise<APIResponse<ContentCategory[]>>;
  createCategory(data: CreateCategoryRequest): Promise<APIResponse<ContentCategory>>;
  updateCategory(id: string, data: UpdateCategoryRequest): Promise<APIResponse<ContentCategory>>;
  deleteCategory(id: string): Promise<APIResponse<void>>;
}

export interface CreateServiceRequest {
  title: MultiLanguageContent;
  description: MultiLanguageContent;
  shortDescription?: MultiLanguageContent;
  icon?: string;
  image?: string;
  category?: string;
  price?: {
    amount?: number;
    currency: string;
    period?: string;
  };
  features?: string[];
  isActive?: boolean;
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {}

export interface CreatePortfolioRequest {
  title: MultiLanguageContent;
  description: MultiLanguageContent;
  shortDescription?: MultiLanguageContent;
  category?: string;
  coverImage?: string;
  gallery?: string[];
  year?: string;
  client?: string;
  location?: string;
  technologies?: string[];
  tags?: string[];
  featured?: boolean;
  status?: 'draft' | 'published';
}

export interface UpdatePortfolioRequest extends Partial<CreatePortfolioRequest> {}

export interface ContentCategory {
  id: string;
  name: MultiLanguageContent;
  slug: string;
  description?: MultiLanguageContent;
  icon?: string;
  color?: string;
  order: number;
  count: number;
}

export interface CreateCategoryRequest {
  name: MultiLanguageContent;
  slug: string;
  description?: MultiLanguageContent;
  icon?: string;
  color?: string;
  order?: number;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {}

// =============================================================================
// API ПОЛЬЗОВАТЕЛЕЙ
// =============================================================================

/** Запросы для пользователей */
export interface UsersAPI {
  // Аутентификация
  login(credentials: LoginRequest): Promise<APIResponse<AuthResponse>>;
  logout(): Promise<APIResponse<void>>;
  refreshToken(): Promise<APIResponse<AuthResponse>>;
  forgotPassword(email: string): Promise<APIResponse<void>>;
  resetPassword(token: string, password: string): Promise<APIResponse<void>>;
  
  // Профиль
  getProfile(): Promise<APIResponse<CMSUser>>;
  updateProfile(data: UpdateProfileRequest): Promise<APIResponse<CMSUser>>;
  changePassword(data: ChangePasswordRequest): Promise<APIResponse<void>>;
  
  // Управление пользователями
  getUsers(params?: RequestParams): Promise<APIResponse<CMSUser[]>>;
  getUser(id: string): Promise<APIResponse<CMSUser>>;
  createUser(data: CreateUserRequest): Promise<APIResponse<CMSUser>>;
  updateUser(id: string, data: UpdateUserRequest): Promise<APIResponse<CMSUser>>;
  deleteUser(id: string): Promise<APIResponse<void>>;
  
  // Права доступа
  getUserPermissions(userId: string): Promise<APIResponse<string[]>>;
  updateUserPermissions(userId: string, permissions: string[]): Promise<APIResponse<void>>;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: CMSUser;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  preferences?: any;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface CreateUserRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  isActive?: boolean;
}

export interface UpdateUserRequest extends Partial<Omit<CreateUserRequest, 'password'>> {
  password?: string;
}

// =============================================================================
// API КОНФИГУРАЦИИ
// =============================================================================

/** Запросы для конфигурации */
export interface ConfigAPI {
  // Настройки сайта
  getSiteConfig(): Promise<APIResponse<SiteConfiguration>>;
  updateSiteConfig(data: Partial<SiteConfiguration>): Promise<APIResponse<SiteConfiguration>>;
  
  // Языки
  getLanguages(): Promise<APIResponse<LanguageConfig[]>>;
  addLanguage(data: CreateLanguageRequest): Promise<APIResponse<LanguageConfig>>;
  updateLanguage(code: string, data: UpdateLanguageRequest): Promise<APIResponse<LanguageConfig>>;
  deleteLanguage(code: string): Promise<APIResponse<void>>;
  
  // Переводы
  getTranslations(lang: string): Promise<APIResponse<Record<string, string>>>;
  updateTranslations(lang: string, translations: Record<string, string>): Promise<APIResponse<void>>;
  
  // Шаблоны
  getTemplates(type?: string): Promise<APIResponse<BlockTemplate[]>>;
  getTemplate(id: string): Promise<APIResponse<BlockTemplate>>;
  createTemplate(data: CreateTemplateRequest): Promise<APIResponse<BlockTemplate>>;
  updateTemplate(id: string, data: UpdateTemplateRequest): Promise<APIResponse<BlockTemplate>>;
  deleteTemplate(id: string): Promise<APIResponse<void>>;
}

export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isDefault: boolean;
  isActive: boolean;
  direction: 'ltr' | 'rtl';
}

export interface CreateLanguageRequest {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  isDefault?: boolean;
  direction?: 'ltr' | 'rtl';
}

export interface UpdateLanguageRequest extends Partial<CreateLanguageRequest> {}

export interface UpdateTemplateRequest extends Partial<CreateTemplateRequest> {
  blockType?: string;
  defaultContent?: any;
  defaultSettings?: any;
}

// =============================================================================
// API АНАЛИТИКИ
// =============================================================================

/** Запросы для аналитики */
export interface AnalyticsAPI {
  // Общая аналитика
  getOverview(params: AnalyticsParams): Promise<APIResponse<AnalyticsData>>;
  getPageAnalytics(pageId: string, params: AnalyticsParams): Promise<APIResponse<any>>;
  getBlockAnalytics(blockId: string, params: AnalyticsParams): Promise<APIResponse<any>>;
  
  // События
  trackEvent(event: TrackingEvent): Promise<APIResponse<void>>;
  getEvents(params: AnalyticsParams & RequestParams): Promise<APIResponse<TrackingEvent[]>>;
  
  // Отчеты
  generateReport(type: ReportType, params: AnalyticsParams): Promise<APIResponse<string>>; // URL файла
  getReports(): Promise<APIResponse<AnalyticsReport[]>>;
}

export interface AnalyticsParams {
  from: Date;
  to: Date;
  granularity?: 'hour' | 'day' | 'week' | 'month';
  filters?: Record<string, any>;
}

export interface TrackingEvent {
  type: string;
  pageId?: string;
  blockId?: string;
  userId?: string;
  sessionId?: string;
  properties?: Record<string, any>;
  timestamp: Date;
}

export type ReportType = 'overview' | 'pages' | 'users' | 'content' | 'performance';

export interface AnalyticsReport {
  id: string;
  type: ReportType;
  title: string;
  createdAt: Date;
  url: string;
  size: number;
}

// =============================================================================
// API СИСТЕМНЫХ ОПЕРАЦИЙ
// =============================================================================

/** Запросы системных операций */
export interface SystemAPI {
  // Здоровье системы
  getSystemHealth(): Promise<APIResponse<SystemHealth>>;
  getSystemInfo(): Promise<APIResponse<SystemInfo>>;
  
  // Кеш
  clearCache(type?: 'pages' | 'media' | 'all'): Promise<APIResponse<void>>;
  getCacheStats(): Promise<APIResponse<CacheStats>>;
  
  // Экспорт/Импорт
  exportData(config: ExportConfiguration): Promise<APIResponse<string>>; // URL файла
  importData(file: File, config: ImportConfiguration): Promise<APIResponse<ImportResult>>;
  
  // Резервные копии
  createBackup(): Promise<APIResponse<BackupInfo>>;
  getBackups(): Promise<APIResponse<BackupInfo[]>>;
  restoreBackup(backupId: string): Promise<APIResponse<void>>;
  deleteBackup(backupId: string): Promise<APIResponse<void>>;
  
  // Логи
  getLogs(params?: LogParams): Promise<APIResponse<LogEntry[]>>;
  clearLogs(before?: Date): Promise<APIResponse<void>>;
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'error';
  checks: HealthCheck[];
  uptime: number;
  lastCheck: Date;
}

export interface HealthCheck {
  name: string;
  status: 'pass' | 'fail' | 'warn';
  message?: string;
  duration: number;
}

export interface SystemInfo {
  version: string;
  environment: string;
  database: {
    type: string;
    version: string;
    size: number;
  };
  storage: {
    total: number;
    used: number;
    available: number;
  };
  memory: {
    total: number;
    used: number;
  };
}

export interface CacheStats {
  totalSize: number;
  hitRate: number;
  missRate: number;
  entries: number;
  oldestEntry: Date;
  newestEntry: Date;
}

export interface BackupInfo {
  id: string;
  name: string;
  size: number;
  createdAt: Date;
  type: 'full' | 'incremental';
  status: 'creating' | 'completed' | 'failed';
}

export interface LogParams extends RequestParams {
  level?: 'debug' | 'info' | 'warn' | 'error';
  from?: Date;
  to?: Date;
  component?: string;
}

export interface LogEntry {
  id: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  component: string;
  userId?: string;
  metadata?: any;
  timestamp: Date;
}

// =============================================================================
// ОСНОВНОЙ CMS API КЛИЕНТ
// =============================================================================

/** Главный API клиент CMS */
export interface CMSAPIClient {
  pages: PagesAPI;
  media: MediaAPI;
  content: ContentAPI;
  users: UsersAPI;
  config: ConfigAPI;
  analytics: AnalyticsAPI;
  system: SystemAPI;
}

/** Конфигурация API клиента */
export interface APIClientConfig {
  baseURL: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  interceptors?: {
    request?: RequestInterceptor[];
    response?: ResponseInterceptor[];
  };
}

export type RequestInterceptor = (config: any) => any;
export type ResponseInterceptor = (response: any) => any;