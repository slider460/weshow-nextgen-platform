/**
 * API сервис для управления медиа файлами CMS
 * Реализация MediaAPI интерфейса
 */

import { APIClient } from '../client';
import {
  MediaAPI,
  MediaFile,
  MediaRequestParams,
  UpdateMediaRequest,
  MediaFolder,
  CreateFolderRequest,
  UpdateFolderRequest,
  ImageOptimizationOptions,
  ThumbnailSize,
  APIResponse
} from '../../types/cms';

export class MediaService implements MediaAPI {
  private api: APIClient;

  constructor(apiClient: APIClient) {
    this.api = apiClient;
  }

  // =============================================================================
  // ПОЛУЧЕНИЕ МЕДИА ФАЙЛОВ
  // =============================================================================

  /**
   * Получение списка медиа файлов
   */
  async getMediaFiles(params?: MediaRequestParams): Promise<APIResponse<MediaFile[]>> {
    return this.api.get<MediaFile[]>('/media', params);
  }

  /**
   * Получение медиа файла по ID
   */
  async getMediaFile(id: string): Promise<APIResponse<MediaFile>> {
    return this.api.get<MediaFile>(`/media/${id}`);
  }

  // =============================================================================
  // ЗАГРУЗКА ФАЙЛОВ
  // =============================================================================

  /**
   * Загрузка одного файла
   */
  async uploadFile(file: File, folder?: string): Promise<APIResponse<MediaFile>> {
    // Валидация файла
    this.validateFile(file);

    const additionalData: Record<string, any> = {};
    if (folder) {
      additionalData.folder = folder;
    }

    return this.api.upload<MediaFile>('/media/upload', file, additionalData);
  }

  /**
   * Загрузка нескольких файлов
   */
  async uploadFiles(files: File[], folder?: string): Promise<APIResponse<MediaFile[]>> {
    // Валидация файлов
    files.forEach(file => this.validateFile(file));

    const uploads = files.map(file => this.uploadFile(file, folder));
    const results = await Promise.allSettled(uploads);

    const successfulUploads: MediaFile[] = [];
    const errors: string[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value.success && result.value.data) {
        successfulUploads.push(result.value.data);
      } else {
        const error = result.status === 'rejected' ? result.reason : result.value.error;
        errors.push(`Ошибка загрузки файла ${files[index].name}: ${error?.message || 'Неизвестная ошибка'}`);
      }
    });

    if (errors.length > 0 && successfulUploads.length === 0) {
      return {
        success: false,
        error: {
          code: 'UPLOAD_FAILED',
          message: 'Не удалось загрузить файлы',
          details: errors
        }
      };
    }

    return {
      success: true,
      data: successfulUploads,
      ...(errors.length > 0 && {
        meta: {
          warnings: errors,
          timestamp: new Date(),
          requestId: Math.random().toString(36).substr(2, 9)
        }
      })
    };
  }

  /**
   * Загрузка файла по URL
   */
  async uploadFromUrl(url: string, folder?: string): Promise<APIResponse<MediaFile>> {
    this.validateURL(url);

    const data = {
      url,
      ...(folder && { folder })
    };

    return this.api.post<MediaFile>('/media/upload-from-url', data);
  }

  // =============================================================================
  // УПРАВЛЕНИЕ ФАЙЛАМИ
  // =============================================================================

  /**
   * Обновление метаданных медиа файла
   */
  async updateMediaFile(id: string, data: UpdateMediaRequest): Promise<APIResponse<MediaFile>> {
    this.validateUpdateData(data);
    return this.api.put<MediaFile>(`/media/${id}`, data);
  }

  /**
   * Удаление медиа файла
   */
  async deleteMediaFile(id: string): Promise<APIResponse<void>> {
    return this.api.delete<void>(`/media/${id}`);
  }

  /**
   * Перемещение файла в другую папку
   */
  async moveMediaFile(id: string, folderId?: string): Promise<APIResponse<MediaFile>> {
    return this.api.patch<MediaFile>(`/media/${id}/move`, { folderId });
  }

  // =============================================================================
  // УПРАВЛЕНИЕ ПАПКАМИ
  // =============================================================================

  /**
   * Получение списка папок
   */
  async getFolders(): Promise<APIResponse<MediaFolder[]>> {
    return this.api.get<MediaFolder[]>('/media/folders');
  }

  /**
   * Создание папки
   */
  async createFolder(data: CreateFolderRequest): Promise<APIResponse<MediaFolder>> {
    this.validateFolderData(data);
    return this.api.post<MediaFolder>('/media/folders', data);
  }

  /**
   * Обновление папки
   */
  async updateFolder(id: string, data: UpdateFolderRequest): Promise<APIResponse<MediaFolder>> {
    if (data.name) {
      this.validateFolderName(data.name);
    }
    return this.api.put<MediaFolder>(`/media/folders/${id}`, data);
  }

  /**
   * Удаление папки
   */
  async deleteFolder(id: string): Promise<APIResponse<void>> {
    return this.api.delete<void>(`/media/folders/${id}`);
  }

  // =============================================================================
  // ОПТИМИЗАЦИЯ И ОБРАБОТКА
  // =============================================================================

  /**
   * Оптимизация изображения
   */
  async optimizeImage(
    id: string, 
    options: ImageOptimizationOptions
  ): Promise<APIResponse<MediaFile>> {
    this.validateOptimizationOptions(options);
    return this.api.post<MediaFile>(`/media/${id}/optimize`, options);
  }

  /**
   * Генерация миниатюр
   */
  async generateThumbnails(
    id: string, 
    sizes: ThumbnailSize[]
  ): Promise<APIResponse<string[]>> {
    this.validateThumbnailSizes(sizes);
    return this.api.post<string[]>(`/media/${id}/thumbnails`, { sizes });
  }

  // =============================================================================
  // ВАЛИДАЦИЯ
  // =============================================================================

  /**
   * Валидация загружаемого файла
   */
  private validateFile(file: File): void {
    // Максимальный размер файла (100MB)
    const MAX_FILE_SIZE = 100 * 1024 * 1024;
    
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`Размер файла превышает максимально допустимый (${this.formatFileSize(MAX_FILE_SIZE)})`);
    }

    // Проверка типа файла
    const allowedTypes = [
      // Изображения
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      // Видео
      'video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/webm',
      // Аудио
      'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/aac',
      // Документы
      'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain', 'text/csv'
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Тип файла "${file.type}" не поддерживается`);
    }

    // Проверка имени файла
    if (file.name.length > 255) {
      throw new Error('Имя файла слишком длинное (максимум 255 символов)');
    }

    // Проверка на вредоносные расширения
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.com'];
    const fileExtension = this.getFileExtension(file.name).toLowerCase();
    
    if (dangerousExtensions.includes(fileExtension)) {
      throw new Error('Загрузка исполняемых файлов запрещена');
    }
  }

  /**
   * Валидация URL для загрузки
   */
  private validateURL(url: string): void {
    try {
      const urlObj = new URL(url);
      
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        throw new Error('Поддерживаются только HTTP и HTTPS ссылки');
      }
    } catch (error) {
      throw new Error('Некорректный URL адрес');
    }
  }

  /**
   * Валидация данных для обновления
   */
  private validateUpdateData(data: UpdateMediaRequest): void {
    if (data.name && data.name.length > 255) {
      throw new Error('Имя файла слишком длинное (максимум 255 символов)');
    }

    if (data.alt) {
      if (data.alt.ru && data.alt.ru.length > 500) {
        throw new Error('Alt текст на русском языке слишком длинный (максимум 500 символов)');
      }
      if (data.alt.en && data.alt.en.length > 500) {
        throw new Error('Alt текст на английском языке слишком длинный (максимум 500 символов)');
      }
    }

    if (data.tags) {
      if (data.tags.length > 20) {
        throw new Error('Максимальное количество тегов: 20');
      }
      
      data.tags.forEach(tag => {
        if (tag.length > 50) {
          throw new Error('Тег слишком длинный (максимум 50 символов)');
        }
      });
    }
  }

  /**
   * Валидация данных папки
   */
  private validateFolderData(data: CreateFolderRequest): void {
    this.validateFolderName(data.name);
  }

  /**
   * Валидация имени папки
   */
  private validateFolderName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Название папки обязательно');
    }

    if (name.length > 100) {
      throw new Error('Название папки слишком длинное (максимум 100 символов)');
    }

    // Проверка на недопустимые символы
    const invalidChars = /[<>:"\/\\|?*]/;
    if (invalidChars.test(name)) {
      throw new Error('Название папки содержит недопустимые символы');
    }
  }

  /**
   * Валидация параметров оптимизации
   */
  private validateOptimizationOptions(options: ImageOptimizationOptions): void {
    if (options.quality && (options.quality < 1 || options.quality > 100)) {
      throw new Error('Качество изображения должно быть от 1 до 100');
    }

    if (options.width && options.width < 1) {
      throw new Error('Ширина изображения должна быть больше 0');
    }

    if (options.height && options.height < 1) {
      throw new Error('Высота изображения должна быть больше 0');
    }

    const supportedFormats = ['webp', 'jpeg', 'png'];
    if (options.format && !supportedFormats.includes(options.format)) {
      throw new Error(`Поддерживаемые форматы: ${supportedFormats.join(', ')}`);
    }
  }

  /**
   * Валидация размеров миниатюр
   */
  private validateThumbnailSizes(sizes: ThumbnailSize[]): void {
    if (sizes.length === 0) {
      throw new Error('Необходимо указать хотя бы один размер миниатюры');
    }

    if (sizes.length > 10) {
      throw new Error('Максимальное количество размеров миниатюр: 10');
    }

    sizes.forEach((size, index) => {
      if (!size.name || size.name.trim().length === 0) {
        throw new Error(`Название миниатюры #${index + 1} обязательно`);
      }

      if (size.width < 1 || size.height < 1) {
        throw new Error(`Размеры миниатюры "${size.name}" должны быть больше 0`);
      }

      if (size.width > 5000 || size.height > 5000) {
        throw new Error(`Размеры миниатюры "${size.name}" слишком большие (максимум 5000px)`);
      }
    });

    // Проверка уникальности названий
    const names = sizes.map(size => size.name);
    const uniqueNames = new Set(names);
    if (names.length !== uniqueNames.size) {
      throw new Error('Названия миниатюр должны быть уникальными');
    }
  }

  // =============================================================================
  // ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
  // =============================================================================

  /**
   * Получение расширения файла
   */
  private getFileExtension(filename: string): string {
    return filename.substring(filename.lastIndexOf('.'));
  }

  /**
   * Форматирование размера файла
   */
  private formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Получение статистики медиа файлов
   */
  async getMediaStats(): Promise<APIResponse<{
    totalFiles: number;
    totalSize: number;
    filesByType: Record<string, number>;
    storageUsed: number;
    storageLimit: number;
  }>> {
    return this.api.get('/media/stats');
  }

  /**
   * Поиск медиа файлов
   */
  async searchMedia(query: string, params?: MediaRequestParams): Promise<APIResponse<MediaFile[]>> {
    return this.api.get<MediaFile[]>('/media/search', {
      ...params,
      search: query
    });
  }

  /**
   * Получение недавно загруженных файлов
   */
  async getRecentFiles(limit: number = 20): Promise<APIResponse<MediaFile[]>> {
    return this.api.get<MediaFile[]>('/media/recent', { limit });
  }

  /**
   * Получение неиспользуемых файлов
   */
  async getUnusedFiles(): Promise<APIResponse<MediaFile[]>> {
    return this.api.get<MediaFile[]>('/media/unused');
  }

  /**
   * Массовое удаление файлов
   */
  async deleteMultipleFiles(fileIds: string[]): Promise<APIResponse<{
    deleted: string[];
    failed: { id: string; error: string }[];
  }>> {
    return this.api.post('/media/bulk-delete', { fileIds });
  }

  /**
   * Получение информации о медиа файле
   */
  async getFileInfo(id: string): Promise<APIResponse<{
    file: MediaFile;
    usage: {
      pages: string[];
      blocks: string[];
      total: number;
    };
    metadata: any;
  }>> {
    return this.api.get(`/media/${id}/info`);
  }

  /**
   * Проверка доступности файла
   */
  async checkFileAvailability(url: string): Promise<APIResponse<boolean>> {
    return this.api.post<boolean>('/media/check-availability', { url });
  }
}