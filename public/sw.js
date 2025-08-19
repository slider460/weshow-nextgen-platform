// Service Worker для WESHOW - Кэширование медиа контента
const CACHE_NAME = 'weshow-media-v1';
const STATIC_CACHE = 'weshow-static-v1';
const MEDIA_CACHE = 'weshow-media-v1';

// Файлы для кэширования
const STATIC_FILES = [
  '/',
  '/index.html',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/weshow-logo-2025.svg',
  '/placeholder.svg'
];

// Стратегии кэширования
const CACHE_STRATEGIES = {
  // Кэширование статических файлов
  STATIC: 'cache-first',
  // Кэширование медиа с ограничением по размеру
  MEDIA: 'cache-first-with-size-limit',
  // API запросы
  API: 'network-first'
};

// Ограничения кэша
const CACHE_LIMITS = {
  MEDIA_MAX_SIZE: 100 * 1024 * 1024, // 100 MB
  MEDIA_MAX_AGE: 24 * 60 * 60 * 1000, // 24 часа
  STATIC_MAX_AGE: 7 * 24 * 60 * 60 * 1000 // 7 дней
};

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('🚀 WESHOW Service Worker установлен');
  
  event.waitUntil(
    Promise.all([
      // Кэшируем статические файлы
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('📁 Кэшируем статические файлы');
        return cache.addAll(STATIC_FILES);
      }),
      // Создаем кэш для медиа
      caches.open(MEDIA_CACHE).then((cache) => {
        console.log('🎬 Создан кэш для медиа контента');
        return cache;
      })
    ])
  );
  
  // Активируем Service Worker сразу
  self.skipWaiting();
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('⚡ WESHOW Service Worker активирован');
  
  event.waitUntil(
    Promise.all([
      // Очищаем старые кэши
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== MEDIA_CACHE) {
              console.log('🗑️ Удаляем старый кэш:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Очищаем устаревшие записи в медиа кэше
      cleanExpiredMediaCache(),
      // Принимаем управление над всеми страницами
      self.clients.claim()
    ])
  );
});

// Перехват fetch запросов
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Определяем стратегию кэширования
  if (isStaticFile(request)) {
    event.respondWith(handleStaticFile(request));
  } else if (isMediaFile(request)) {
    event.respondWith(handleMediaFile(request));
  } else if (isAPIRequest(request)) {
    event.respondWith(handleAPIRequest(request));
  } else {
    // Для остальных запросов используем network-first
    event.respondWith(handleNetworkFirst(request));
  }
});

// Проверка статических файлов
function isStaticFile(request) {
  const url = new URL(request.url);
  return STATIC_FILES.some(file => url.pathname === file) ||
         url.pathname.startsWith('/static/') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.svg');
}

// Проверка медиа файлов
function isMediaFile(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/media/') ||
         /\.(jpg|jpeg|png|gif|webp|avif|mp4|webm|ogg)$/i.test(url.pathname);
}

// Проверка API запросов
function isAPIRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') ||
         url.pathname.includes('vercel') ||
         url.pathname.includes('cdn');
}

// Обработка статических файлов (cache-first)
async function handleStaticFile(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('❌ Ошибка загрузки статического файла:', error);
    return new Response('Ошибка загрузки', { status: 500 });
  }
}

// Обработка медиа файлов (cache-first с ограничением размера)
async function handleMediaFile(request) {
  const cache = await caches.open(MEDIA_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Проверяем возраст кэша
    const cacheTime = new Date(cachedResponse.headers.get('sw-cache-time'));
    if (Date.now() - cacheTime.getTime() < CACHE_LIMITS.MEDIA_MAX_AGE) {
      return cachedResponse;
    }
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Проверяем размер файла
      const contentLength = networkResponse.headers.get('content-length');
      if (contentLength && parseInt(contentLength) < CACHE_LIMITS.MEDIA_MAX_SIZE) {
        // Добавляем время кэширования в заголовки
        const responseClone = networkResponse.clone();
        const headers = new Headers(responseClone.headers);
        headers.set('sw-cache-time', new Date().toISOString());
        
        const responseToCache = new Response(responseClone.body, {
          status: responseClone.status,
          statusText: responseClone.statusText,
          headers: headers
        });
        
        cache.put(request, responseToCache);
      }
    }
    return networkResponse;
  } catch (error) {
    console.error('❌ Ошибка загрузки медиа файла:', error);
    // Возвращаем кэшированную версию если есть
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Ошибка загрузки медиа', { status: 500 });
  }
}

// Обработка API запросов (network-first)
async function handleAPIRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Кэшируем успешные API ответы на короткое время
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Возвращаем кэшированную версию если есть
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Network-first стратегия
async function handleNetworkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    // Пытаемся найти в кэше
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Очистка устаревших медиа файлов
async function cleanExpiredMediaCache() {
  const cache = await caches.open(MEDIA_CACHE);
  const requests = await cache.keys();
  
  for (const request of requests) {
    const response = await cache.match(request);
    if (response) {
      const cacheTime = new Date(response.headers.get('sw-cache-time'));
      if (Date.now() - cacheTime.getTime() > CACHE_LIMITS.MEDIA_MAX_AGE) {
        console.log('🗑️ Удаляем устаревший медиа файл:', request.url);
        await cache.delete(request);
      }
    }
  }
}

// Обработка сообщений от основного потока
self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches();
      break;
      
    case 'GET_CACHE_INFO':
      getCacheInfo().then(info => {
        event.ports[0].postMessage(info);
      });
      break;
      
    case 'PRELOAD_MEDIA':
      preloadMedia(data.urls);
      break;
  }
});

// Очистка всех кэшей
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(name => caches.delete(name))
  );
  console.log('🧹 Все кэши очищены');
}

// Получение информации о кэше
async function getCacheInfo() {
  const cacheNames = await caches.keys();
  const info = {};
  
  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const requests = await cache.keys();
    info[name] = {
      count: requests.length,
      size: 0
    };
  }
  
  return info;
}

// Предзагрузка медиа файлов
async function preloadMedia(urls) {
  const cache = await caches.open(MEDIA_CACHE);
  
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        cache.put(url, response);
        console.log('📥 Предзагружен медиа файл:', url);
      }
    } catch (error) {
      console.error('❌ Ошибка предзагрузки:', url, error);
    }
  }
}

// Периодическая очистка кэша
setInterval(cleanExpiredMediaCache, 60 * 60 * 1000); // Каждый час

console.log('🎯 WESHOW Service Worker готов к работе');
