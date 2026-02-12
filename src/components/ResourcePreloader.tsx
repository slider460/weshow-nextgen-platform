import { useEffect } from 'react';

interface ResourcePreloaderProps {
  preloadImages?: string[];
  preloadFonts?: string[];
  preloadScripts?: string[];
  preloadStyles?: string[];
  criticalResources?: string[];
}

const ResourcePreloader = ({
  preloadImages = [
    '/weshow-logo-2025.svg',
    '/og-image.jpg',
    '/hero-background.webp'
  ],
  preloadFonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
  ],
  preloadScripts = [],
  preloadStyles = [],
  criticalResources = []
}: ResourcePreloaderProps) => {
  
  useEffect(() => {
    const preloadResource = (href: string, as: string, type?: string, crossorigin?: boolean) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      
      if (type) link.type = type;
      if (crossorigin) link.crossOrigin = 'anonymous';
      
      // Добавляем обработчики загрузки
      link.onload = () => {
        console.log(`✅ Предзагружен ресурс: ${href}`);
      };
      
      link.onerror = () => {
        console.error(`❌ Ошибка предзагрузки: ${href}`);
      };
      
      document.head.appendChild(link);
      return link;
    };

    const preloadedLinks: HTMLLinkElement[] = [];

    // Предзагрузка изображений
    preloadImages.forEach(src => {
      const link = preloadResource(src, 'image');
      preloadedLinks.push(link);
    });

    // Предзагрузка шрифтов
    preloadFonts.forEach(href => {
      const link = preloadResource(href, 'style', 'text/css', true);
      preloadedLinks.push(link);
    });

    // Предзагрузка скриптов
    preloadScripts.forEach(src => {
      const link = preloadResource(src, 'script', 'text/javascript');
      preloadedLinks.push(link);
    });

    // Предзагрузка стилей
    preloadStyles.forEach(href => {
      const link = preloadResource(href, 'style', 'text/css');
      preloadedLinks.push(link);
    });

    // Критические ресурсы с высоким приоритетом
    criticalResources.forEach(href => {
      const link = preloadResource(href, 'fetch', undefined, true);
      link.setAttribute('fetchpriority', 'high');
      preloadedLinks.push(link);
    });

    // DNS предварительное подключение
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      preloadedLinks.push(link);
    });

    // Префетч для следующих страниц (предсказательная загрузка)
    const prefetchPages = [
      '/services',
      '/portfolio',
      '/contact',
      '/about'
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Пользователь прокрутил страницу, можно префетчить следующие страницы
          prefetchPages.forEach(page => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
            preloadedLinks.push(link);
          });
          observer.disconnect();
        }
      });
    });

    // Наблюдаем за footer'ом для начала префетча
    const footer = document.querySelector('footer');
    if (footer) {
      observer.observe(footer);
    }

    // Предзагрузка по событиям взаимодействия
    const handleFirstInteraction = () => {
      // При первом взаимодействии пользователя начинаем агрессивную предзагрузку
      const interactiveResources = [
        '/game',
        '/equipment',
        '/services/multimedia'
      ];

      interactiveResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
        preloadedLinks.push(link);
      });

      // Удаляем обработчики после первого взаимодействия
      document.removeEventListener('mousemove', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('mousemove', handleFirstInteraction, { once: true });
    document.addEventListener('scroll', handleFirstInteraction, { once: true });
    document.addEventListener('click', handleFirstInteraction, { once: true });

    // Resource Hints для улучшения производительности
    const addResourceHints = () => {
      // Prefetch для вероятных следующих ресурсов (API отключен, убираем запросы)
      const veryLikelyResources: string[] = [
        // API запросы удалены, используем только статические данные
      ];

      veryLikelyResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
        preloadedLinks.push(link);
      });
    };

    // Добавляем resource hints после загрузки страницы
    if (document.readyState === 'complete') {
      addResourceHints();
    } else {
      window.addEventListener('load', addResourceHints);
    }

    // Мониторинг производительности предзагрузки
    console.log('🚀 ResourcePreloader: Начата предзагрузка ресурсов', {
      images: preloadImages.length,
      fonts: preloadFonts.length,
      scripts: preloadScripts.length,
      styles: preloadStyles.length,
      critical: criticalResources.length
    });

    return () => {
      // Очистка при размонтировании (хотя обычно это не нужно)
      observer.disconnect();
      document.removeEventListener('mousemove', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('load', addResourceHints);
    };
  }, [preloadImages, preloadFonts, preloadScripts, preloadStyles, criticalResources]);

  return null; // Этот компонент ничего не рендерит
};

export default ResourcePreloader;