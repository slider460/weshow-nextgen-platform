/**
 * Базовый API клиент для CMS системы WESHOW
 * Централизованное управление HTTP запросами
 */

import {
  APIResponse,
  APIError,
  RequestParams,
  APIClientConfig,
  CMSAPIClient
} from '../types/cms';

// =============================================================================
// БАЗОВЫЙ HTTP КЛИЕНТ
// =============================================================================

class HTTPClient {
  private baseURL: string;
  private timeout: number;
  private retries: number;
  private retryDelay: number;
  private defaultHeaders: Record<string, string>;

  constructor(config: APIClientConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout || 10000;
    this.retries = config.retries || 3;
    this.retryDelay = config.retryDelay || 1000;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  /**
   * Установка токена авторизации
   */
  setAuthToken(token: string | null) {
    if (token) {
      this.defaultHeaders['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.defaultHeaders['Authorization'];
    }
  }

  /**
   * Получение токена из localStorage
   */
  private getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cms_token');
    }
    return null;
  }

  /**
   * Сохранение токена в localStorage
   */
  private storeToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cms_token', token);
    }
  }

  /**
   * Удаление токена из localStorage
   */
  private removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cms_token');
    }
  }

  /**
   * Подготовка заголовков запроса
   */
  private prepareHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const token = this.getStoredToken();
    const headers = { ...this.defaultHeaders };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (customHeaders) {
      Object.assign(headers, customHeaders);
    }
    
    return headers;
  }

  /**
   * Построение URL с параметрами
   */
  private buildURL(endpoint: string, params?: RequestParams): string {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    if (params) {
      if (params.page) url.searchParams.set('page', params.page.toString());
      if (params.limit) url.searchParams.set('limit', params.limit.toString());
      if (params.sort) url.searchParams.set('sort', params.sort);
      if (params.order) url.searchParams.set('order', params.order);
      if (params.search) url.searchParams.set('search', params.search);
      if (params.lang) url.searchParams.set('lang', params.lang);
      
      if (params.filters) {
        Object.entries(params.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            url.searchParams.set(`filter[${key}]`, value.toString());
          }
        });
      }
      
      if (params.include) {
        url.searchParams.set('include', params.include.join(','));
      }
    }
    
    return url.toString();
  }

  /**
   * Выполнение HTTP запроса с повторными попытками
   */
  private async fetchWithRetry(
    url: string, 
    options: RequestInit, 
    attempt: number = 1
  ): Promise<Response> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Токен недействителен, удаляем его
          this.removeToken();
          throw new Error('Authentication required');
        }
        
        if (response.status >= 500 && attempt < this.retries) {
          // Серверная ошибка, повторяем запрос
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
          return this.fetchWithRetry(url, options, attempt + 1);
        }
        
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      if (attempt < this.retries && !error.message.includes('Authentication')) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
        return this.fetchWithRetry(url, options, attempt + 1);
      }
      
      throw error;
    }
  }

  /**
   * Обработка ответа API
   */
  private async handleResponse<T>(response: Response): Promise<APIResponse<T>> {
    try {
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to parse response JSON');
    }
  }

  /**
   * GET запрос
   */
  async get<T>(endpoint: string, params?: RequestParams): Promise<APIResponse<T>> {
    const url = this.buildURL(endpoint, params);
    const headers = this.prepareHeaders();
    
    const response = await this.fetchWithRetry(url, {
      method: 'GET',
      headers
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * POST запрос
   */
  async post<T>(endpoint: string, data?: any, customHeaders?: Record<string, string>): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.prepareHeaders(customHeaders);
    
    const response = await this.fetchWithRetry(url, {
      method: 'POST',
      headers,
      body: data instanceof FormData ? data : JSON.stringify(data)
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * PUT запрос
   */
  async put<T>(endpoint: string, data?: any, customHeaders?: Record<string, string>): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.prepareHeaders(customHeaders);
    
    const response = await this.fetchWithRetry(url, {
      method: 'PUT',
      headers,
      body: data instanceof FormData ? data : JSON.stringify(data)
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * PATCH запрос
   */
  async patch<T>(endpoint: string, data?: any, customHeaders?: Record<string, string>): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.prepareHeaders(customHeaders);
    
    const response = await this.fetchWithRetry(url, {
      method: 'PATCH',
      headers,
      body: data instanceof FormData ? data : JSON.stringify(data)
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * DELETE запрос
   */
  async delete<T>(endpoint: string): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = this.prepareHeaders();
    
    const response = await this.fetchWithRetry(url, {
      method: 'DELETE',
      headers
    });
    
    return this.handleResponse<T>(response);
  }

  /**
   * Загрузка файлов
   */
  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<APIResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const formData = new FormData();
    
    formData.append('file', file);
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
    }
    
    // Не устанавливаем Content-Type для FormData - браузер сделает это автоматически
    const headers = this.prepareHeaders();
    delete headers['Content-Type'];
    
    const response = await this.fetchWithRetry(url, {
      method: 'POST',
      headers,
      body: formData
    });
    
    return this.handleResponse<T>(response);
  }
}

// =============================================================================
// ОБРАБОТКА ОШИБОК
// =============================================================================

export class APIClient {
  private http: HTTPClient;

  constructor(config: APIClientConfig) {
    this.http = new HTTPClient(config);
    
    // Инициализация токена при создании клиента
    this.initializeAuth();
  }

  /**
   * Инициализация авторизации
   */
  private initializeAuth() {
    const token = this.getStoredToken();
    if (token) {
      this.http.setAuthToken(token);
    }
  }

  /**
   * Получение сохраненного токена
   */
  private getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cms_token');
    }
    return null;
  }

  /**
   * Сохранение токена
   */
  setAuthToken(token: string) {
    this.http.setAuthToken(token);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cms_token', token);
    }
  }

  /**
   * Удаление токена
   */
  clearAuthToken() {
    this.http.setAuthToken(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cms_token');
    }
  }

  /**
   * Проверка авторизации
   */
  isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }

  /**
   * Выполнение запроса с обработкой ошибок
   */
  async execute<T>(
    operation: () => Promise<APIResponse<T>>,
    errorContext?: string
  ): Promise<APIResponse<T>> {
    try {
      const result = await operation();
      
      if (!result.success && result.error) {
        console.error(`API Error${errorContext ? ` (${errorContext})` : ''}:`, result.error);
      }
      
      return result;
    } catch (error) {
      console.error(`Network Error${errorContext ? ` (${errorContext})` : ''}:`, error);
      
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error.message || 'Network request failed',
          details: error
        }
      };
    }
  }

  // =============================================================================
  // МЕТОДЫ HTTP КЛИЕНТА
  // =============================================================================

  get<T>(endpoint: string, params?: RequestParams): Promise<APIResponse<T>> {
    return this.execute(() => this.http.get<T>(endpoint, params), `GET ${endpoint}`);
  }

  post<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<APIResponse<T>> {
    return this.execute(() => this.http.post<T>(endpoint, data, headers), `POST ${endpoint}`);
  }

  put<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<APIResponse<T>> {
    return this.execute(() => this.http.put<T>(endpoint, data, headers), `PUT ${endpoint}`);
  }

  patch<T>(endpoint: string, data?: any, headers?: Record<string, string>): Promise<APIResponse<T>> {
    return this.execute(() => this.http.patch<T>(endpoint, data, headers), `PATCH ${endpoint}`);
  }

  delete<T>(endpoint: string): Promise<APIResponse<T>> {
    return this.execute(() => this.http.delete<T>(endpoint), `DELETE ${endpoint}`);
  }

  upload<T>(endpoint: string, file: File, data?: Record<string, any>): Promise<APIResponse<T>> {
    return this.execute(() => this.http.upload<T>(endpoint, file, data), `UPLOAD ${endpoint}`);
  }
}

// =============================================================================
// ФАБРИКА API КЛИЕНТА
// =============================================================================

/**
 * Создание экземпляра API клиента
 */
export function createAPIClient(config: APIClientConfig): APIClient {
  return new APIClient(config);
}

/**
 * Глобальный экземпляр API клиента (singleton)
 */
let globalAPIClient: APIClient | null = null;

/**
 * Получение глобального API клиента
 */
export function getAPIClient(): APIClient {
  if (!globalAPIClient) {
    throw new Error('API client not initialized. Call initializeAPIClient() first.');
  }
  return globalAPIClient;
}

/**
 * Инициализация глобального API клиента
 */
export function initializeAPIClient(config: APIClientConfig): APIClient {
  globalAPIClient = new APIClient(config);
  return globalAPIClient;
}

/**
 * Проверка инициализации API клиента
 */
export function isAPIClientInitialized(): boolean {
  return globalAPIClient !== null;
}

// =============================================================================
// УТИЛИТЫ ДЛЯ РАБОТЫ С API
// =============================================================================

/**
 * Обработка ошибок API с пользовательскими сообщениями
 */
export function handleAPIError(error: APIError, context?: string): string {
  const errorMessages: Record<string, string> = {
    'NETWORK_ERROR': 'Ошибка сети. Проверьте подключение к интернету.',
    'AUTHENTICATION_REQUIRED': 'Требуется авторизация. Войдите в систему.',
    'PERMISSION_DENIED': 'Недостаточно прав для выполнения операции.',
    'NOT_FOUND': 'Запрашиваемый ресурс не найден.',
    'VALIDATION_ERROR': 'Ошибка валидации данных.',
    'SERVER_ERROR': 'Внутренняя ошибка сервера. Попробуйте позже.',
    'RATE_LIMIT_EXCEEDED': 'Превышен лимит запросов. Попробуйте позже.'
  };

  const userMessage = errorMessages[error.code] || error.message || 'Произошла неизвестная ошибка';
  
  if (context) {
    return `${context}: ${userMessage}`;
  }
  
  return userMessage;
}

/**
 * Создание параметров запроса из объекта фильтров
 */
export function createRequestParams(options: {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  filters?: Record<string, any>;
  include?: string[];
  lang?: string;
}): RequestParams {
  return {
    page: options.page,
    limit: options.limit,
    search: options.search,
    sort: options.sort,
    order: options.order,
    filters: options.filters,
    include: options.include,
    lang: options.lang
  };
}

/**
 * Валидация успешности ответа API
 */
export function validateAPIResponse<T>(response: APIResponse<T>): T {
  if (!response.success) {
    throw new Error(handleAPIError(response.error!));
  }
  
  if (!response.data) {
    throw new Error('Нет данных в ответе сервера');
  }
  
  return response.data;
}

/**
 * Создание мок-ответа API для разработки
 */
export function createMockResponse<T>(data: T, delay: number = 500): Promise<APIResponse<T>> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        data,
        meta: {
          timestamp: new Date(),
          requestId: Math.random().toString(36).substr(2, 9)
        }
      });
    }, delay);
  });
}