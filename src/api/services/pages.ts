/**
 * API сервис для управления страницами CMS
 * Реализация PagesAPI интерфейса
 */

import { APIClient } from '../client';
import {
  PagesAPI,
  CMSPage,
  ContentBlock,
  CreatePageRequest,
  UpdatePageRequest,
  CreateBlockRequest,
  UpdateBlockRequest,
  CreateTemplateRequest,
  BlockTemplate,
  RequestParams,
  APIResponse
} from '../../types/cms';

export class PagesService implements PagesAPI {
  private api: APIClient;

  constructor(apiClient: APIClient) {
    this.api = apiClient;
  }

  // =============================================================================
  // ПОЛУЧЕНИЕ СТРАНИЦ
  // =============================================================================

  /**
   * Получение списка страниц
   */
  async getPages(params?: RequestParams): Promise<APIResponse<CMSPage[]>> {
    return this.api.get<CMSPage[]>('/pages', params);
  }

  /**
   * Получение страницы по ID
   */
  async getPage(id: string, lang?: string): Promise<APIResponse<CMSPage>> {
    const params = lang ? { lang } : undefined;
    return this.api.get<CMSPage>(`/pages/${id}`, params);
  }

  /**
   * Получение страницы по slug
   */
  async getPageBySlug(slug: string, lang?: string): Promise<APIResponse<CMSPage>> {
    const params = { 
      filters: { slug },
      ...(lang && { lang })
    };
    return this.api.get<CMSPage>('/pages/by-slug', params);
  }

  // =============================================================================
  // СОЗДАНИЕ И ОБНОВЛЕНИЕ СТРАНИЦ
  // =============================================================================

  /**
   * Создание новой страницы
   */
  async createPage(data: CreatePageRequest): Promise<APIResponse<CMSPage>> {
    // Валидация данных
    this.validatePageData(data);
    
    return this.api.post<CMSPage>('/pages', data);
  }

  /**
   * Обновление существующей страницы
   */
  async updatePage(id: string, data: UpdatePageRequest): Promise<APIResponse<CMSPage>> {
    // Валидация данных
    if (data.title || data.slug) {
      this.validatePageData(data as CreatePageRequest);
    }
    
    return this.api.put<CMSPage>(`/pages/${id}`, data);
  }

  /**
   * Удаление страницы
   */
  async deletePage(id: string): Promise<APIResponse<void>> {
    return this.api.delete<void>(`/pages/${id}`);
  }

  // =============================================================================
  // ПУБЛИКАЦИЯ СТРАНИЦ
  // =============================================================================

  /**
   * Публикация страницы
   */
  async publishPage(id: string): Promise<APIResponse<CMSPage>> {
    return this.api.patch<CMSPage>(`/pages/${id}/publish`);
  }

  /**
   * Снятие с публикации
   */
  async unpublishPage(id: string): Promise<APIResponse<CMSPage>> {
    return this.api.patch<CMSPage>(`/pages/${id}/unpublish`);
  }

  /**
   * Планирование публикации
   */
  async schedulePage(id: string, publishAt: Date): Promise<APIResponse<CMSPage>> {
    return this.api.patch<CMSPage>(`/pages/${id}/schedule`, { publishAt });
  }

  // =============================================================================
  // УПРАВЛЕНИЕ БЛОКАМИ
  // =============================================================================

  /**
   * Добавление блока к странице
   */
  async addBlock(pageId: string, block: CreateBlockRequest): Promise<APIResponse<ContentBlock>> {
    // Валидация блока
    this.validateBlockData(block);
    
    return this.api.post<ContentBlock>(`/pages/${pageId}/blocks`, block);
  }

  /**
   * Обновление блока страницы
   */
  async updateBlock(
    pageId: string, 
    blockId: string, 
    data: UpdateBlockRequest
  ): Promise<APIResponse<ContentBlock>> {
    return this.api.put<ContentBlock>(`/pages/${pageId}/blocks/${blockId}`, data);
  }

  /**
   * Удаление блока из страницы
   */
  async deleteBlock(pageId: string, blockId: string): Promise<APIResponse<void>> {
    return this.api.delete<void>(`/pages/${pageId}/blocks/${blockId}`);
  }

  /**
   * Изменение порядка блоков
   */
  async reorderBlocks(pageId: string, blockIds: string[]): Promise<APIResponse<void>> {
    return this.api.patch<void>(`/pages/${pageId}/blocks/reorder`, { blockIds });
  }

  // =============================================================================
  // ШАБЛОНЫ И ДУБЛИРОВАНИЕ
  // =============================================================================

  /**
   * Дублирование страницы
   */
  async duplicatePage(
    id: string, 
    data?: Partial<CreatePageRequest>
  ): Promise<APIResponse<CMSPage>> {
    return this.api.post<CMSPage>(`/pages/${id}/duplicate`, data);
  }

  /**
   * Создание страницы из шаблона
   */
  async createFromTemplate(
    templateId: string, 
    data: CreatePageRequest
  ): Promise<APIResponse<CMSPage>> {
    this.validatePageData(data);
    
    return this.api.post<CMSPage>(`/templates/${templateId}/create-page`, data);
  }

  /**
   * Сохранение страницы как шаблон
   */
  async saveAsTemplate(
    pageId: string, 
    templateData: CreateTemplateRequest
  ): Promise<APIResponse<BlockTemplate>> {
    this.validateTemplateData(templateData);
    
    return this.api.post<BlockTemplate>(`/pages/${pageId}/save-as-template`, templateData);
  }

  // =============================================================================
  // ВАЛИДАЦИЯ ДАННЫХ
  // =============================================================================

  /**
   * Валидация данных страницы
   */
  private validatePageData(data: CreatePageRequest): void {
    if (!data.title) {
      throw new Error('Заголовок страницы обязателен');
    }

    if (!data.title.ru || !data.title.en) {
      throw new Error('Заголовок должен быть указан на всех языках');
    }

    if (!data.slug) {
      throw new Error('URL адрес (slug) страницы обязателен');
    }

    // Проверка формата slug
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(data.slug)) {
      throw new Error('URL адрес может содержать только буквы, цифры и дефисы');
    }

    // Проверка длины заголовка
    if (data.title.ru.length > 200 || data.title.en.length > 200) {
      throw new Error('Заголовок не может превышать 200 символов');
    }

    // Проверка описания
    if (data.description) {
      if (data.description.ru && data.description.ru.length > 500) {
        throw new Error('Описание не может превышать 500 символов');
      }
      if (data.description.en && data.description.en.length > 500) {
        throw new Error('Описание не может превышать 500 символов');
      }
    }
  }

  /**
   * Валидация данных блока
   */
  private validateBlockData(data: CreateBlockRequest): void {
    if (!data.type) {
      throw new Error('Тип блока обязателен');
    }

    if (!data.content) {
      throw new Error('Содержимое блока обязательно');
    }

    // Проверка specific для каждого типа блока
    this.validateBlockContentByType(data.type, data.content);
  }

  /**
   * Валидация содержимого блока по типу
   */
  private validateBlockContentByType(type: string, content: any): void {
    switch (type) {
      case 'hero':
        if (!content.title || !content.title.ru || !content.title.en) {
          throw new Error('Заголовок Hero блока обязателен на всех языках');
        }
        break;

      case 'text':
        if (!content.content || !content.content.ru || !content.content.en) {
          throw new Error('Текстовое содержимое обязательно на всех языках');
        }
        break;

      case 'image':
        if (!content.image || !content.image.url) {
          throw new Error('Изображение обязательно для блока изображения');
        }
        if (!content.alt || !content.alt.ru || !content.alt.en) {
          throw new Error('Alt текст обязателен для изображения на всех языках');
        }
        break;

      case 'gallery':
        if (!content.images || !Array.isArray(content.images) || content.images.length === 0) {
          throw new Error('Галерея должна содержать хотя бы одно изображение');
        }
        break;

      case 'contact-form':
        if (!content.fields || !Array.isArray(content.fields) || content.fields.length === 0) {
          throw new Error('Форма должна содержать хотя бы одно поле');
        }
        break;

      default:
        // Для остальных типов базовая валидация
        if (typeof content !== 'object') {
          throw new Error('Содержимое блока должно быть объектом');
        }
    }
  }

  /**
   * Валидация данных шаблона
   */
  private validateTemplateData(data: CreateTemplateRequest): void {
    if (!data.name) {
      throw new Error('Название шаблона обязательно');
    }

    if (!data.name.ru || !data.name.en) {
      throw new Error('Название шаблона должно быть указано на всех языках');
    }

    if (!data.category) {
      throw new Error('Категория шаблона обязательна');
    }

    // Проверка длины названия
    if (data.name.ru.length > 100 || data.name.en.length > 100) {
      throw new Error('Название шаблона не может превышать 100 символов');
    }
  }

  // =============================================================================
  // ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
  // =============================================================================

  /**
   * Получение статистики страниц
   */
  async getPagesStats(): Promise<APIResponse<{
    total: number;
    published: number;
    draft: number;
    archived: number;
  }>> {
    return this.api.get('/pages/stats');
  }

  /**
   * Поиск страниц
   */
  async searchPages(query: string, params?: RequestParams): Promise<APIResponse<CMSPage[]>> {
    return this.api.get<CMSPage[]>('/pages/search', {
      ...params,
      search: query
    });
  }

  /**
   * Получение истории изменений страницы
   */
  async getPageHistory(pageId: string): Promise<APIResponse<any[]>> {
    return this.api.get(`/pages/${pageId}/history`);
  }

  /**
   * Восстановление версии страницы
   */
  async restorePageVersion(pageId: string, versionId: string): Promise<APIResponse<CMSPage>> {
    return this.api.post<CMSPage>(`/pages/${pageId}/restore/${versionId}`);
  }

  /**
   * Предварительный просмотр страницы
   */
  async previewPage(pageId: string, lang?: string): Promise<APIResponse<string>> {
    const params = lang ? { lang } : undefined;
    return this.api.get<string>(`/pages/${pageId}/preview`, params);
  }

  /**
   * Проверка уникальности slug
   */
  async checkSlugUnique(slug: string, excludeId?: string): Promise<APIResponse<boolean>> {
    const params = {
      filters: { 
        slug,
        ...(excludeId && { exclude: excludeId })
      }
    };
    return this.api.get<boolean>('/pages/check-slug', params);
  }

  /**
   * Получение SEO данных страницы
   */
  async getPageSEO(pageId: string): Promise<APIResponse<any>> {
    return this.api.get(`/pages/${pageId}/seo`);
  }

  /**
   * Обновление SEO данных страницы
   */
  async updatePageSEO(pageId: string, seoData: any): Promise<APIResponse<any>> {
    return this.api.put(`/pages/${pageId}/seo`, seoData);
  }
}