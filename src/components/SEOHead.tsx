import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  locale?: string;
}

const SEOHead = ({
  title = 'WeShow NextGen Platform - Комплексные мультимедийные решения',
  description = 'Современная веб-платформа мультимедийных решений. Аренда интерактивного оборудования, разработка AR/VR решений, дизайн и техническая поддержка.',
  keywords = 'мультимедиа, интерактивное оборудование, AR VR, веб-разработка, дизайн, техническая поддержка, аренда оборудования, кинетические экраны, LED панели',
  image = '/og-image.jpg',
  url = 'https://weshow-nextgen-platform.vercel.app',
  type = 'website',
  siteName = 'WeShow NextGen Platform',
  locale = 'ru_RU'
}: SEOHeadProps) => {
  useEffect(() => {
    // Обновляем title
    document.title = title;

    // Функция для обновления мета-тега
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Основные мета-теги
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph теги
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:site_name', siteName, true);
    updateMetaTag('og:locale', locale, true);

    // Twitter Card теги
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Дополнительные теги для поисковиков
    updateMetaTag('author', 'WeShow NextGen Platform');
    updateMetaTag('theme-color', '#3b82f6');
    
    // Структурированные данные (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "WeShow NextGen Platform",
      "description": description,
      "url": url,
      "logo": `${url}/logo.svg`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+7 (495) 123-45-67",
        "contactType": "customer service",
        "availableLanguage": "Russian"
      },
      "sameAs": [
        "https://instagram.com/weshow_platform",
        "https://t.me/weshow_platform"
      ],
      "services": [
        "Аренда интерактивного оборудования",
        "AR/VR разработка",
        "Веб-разработка",
        "Мультимедиа дизайн",
        "Техническая поддержка"
      ]
    };

    // Добавляем или обновляем JSON-LD
    let jsonLd = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.type = 'application/ld+json';
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url, type, siteName, locale]);

  return null;
};

export default SEOHead;