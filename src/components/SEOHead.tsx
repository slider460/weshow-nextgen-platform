import { useEffect } from 'react';

const SITE_URL = 'https://weshow.su';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  canonical?: string;
  type?: string;
  siteName?: string;
  locale?: string;
  breadcrumbs?: BreadcrumbItem[];
  noIndex?: boolean;
}

const SEOHead = ({
  title = 'WESHOW — Комплексные мультимедийные решения для бизнеса',
  description = 'Профессиональное техническое оснащение, 3D-маппинг, интерактивные инсталляции и организация мероприятий для корпоративных клиентов. 500+ успешных проектов.',
  keywords = 'мультимедийные технологии, техническая интеграция, AV системы, проекционный маппинг, корпоративные мероприятия',
  image = `${SITE_URL}/images/cases/cadr_shapka_production.jpg`,
  url = SITE_URL,
  canonical,
  type = 'website',
  siteName = 'WESHOW',
  locale = 'ru_RU',
  breadcrumbs,
  noIndex = false
}: SEOHeadProps) => {
  const canonicalUrl = canonical ?? url;

  useEffect(() => {
    document.title = title;

    // Canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

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
    updateMetaTag('robots', noIndex ? 'noindex, follow' : 'index, follow');
    // viewport не перезаписываем — остаётся из index.html

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
    updateMetaTag('author', 'WESHOW');
    // theme-color не перезаписываем — оставляем из index.html

    // Структурированные данные (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteName,
      "description": description,
      "url": url,
      "logo": `${SITE_URL}/logo.svg`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+7 (495) 580-75-37",
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

    // JSON-LD Organization
    let jsonLd = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!jsonLd) {
      jsonLd = document.createElement('script');
      jsonLd.type = 'application/ld+json';
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData);

    // JSON-LD BreadcrumbList (если передан breadcrumbs)
    const breadcrumbId = 'breadcrumb-ld';
    let breadcrumbScript = document.getElementById(breadcrumbId) as HTMLScriptElement | null;
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbList = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      };
      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = breadcrumbId;
        breadcrumbScript.type = 'application/ld+json';
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.textContent = JSON.stringify(breadcrumbList);
    } else if (breadcrumbScript) {
      breadcrumbScript.remove();
    }

  }, [title, description, keywords, image, url, canonicalUrl, type, siteName, locale, breadcrumbs, noIndex]);

  return null;
};

export default SEOHead;