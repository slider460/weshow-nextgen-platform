import { CMSPage } from '../types/cms/content';
import { createHeroBlock } from '../components/cms/blocks/HeroBlock';
import { createImageBlock } from '../components/cms/blocks/ImageBlock';
import { createGalleryBlock } from '../components/cms/blocks/GalleryBlock';
import { createVideoBlock } from '../components/cms/blocks/VideoBlock';

/**
 * Демонстрационные данные для CMS
 * Содержат примеры страниц с различными типами блоков
 */

// Создание демо страницы \"Главная\"
export const createDemoHomePage = (): CMSPage => {
  const heroBlock = createHeroBlock();
  heroBlock.content = {
    title: {
      ru: 'Современные мультимедийные решения',
      en: 'Modern Multimedia Solutions'
    },
    subtitle: {
      ru: 'Создаем впечатляющие интерактивные проекты',
      en: 'Creating impressive interactive projects'
    },
    description: {
      ru: 'Профессиональные решения для мероприятий любого масштаба с использованием передовых технологий',
      en: 'Professional solutions for events of any scale using cutting-edge technologies'
    },
    backgroundType: 'video',
    backgroundVideo: {
      url: '/videos/hero-background.mp4',
      poster: '/images/hero-poster.jpg'
    },
    ctaButtons: [
      {
        text: { ru: 'Забронировать консультацию', en: 'Get Consultation' },
        url: '/contact',
        style: 'primary',
        icon: 'phone'
      },
      {
        text: { ru: 'Наши проекты', en: 'Our Projects' },
        url: '/portfolio',
        style: 'outline',
        icon: 'arrow-right'
      }
    ],
    overlay: {
      type: 'gradient',
      opacity: 0.6,
      color: 'rgba(0,0,0,0.4)'
    },
    textAlignment: 'center',
    height: 'screen'
  };

  const imageBlock = createImageBlock();
  imageBlock.content = {
    src: '/images/about-company.jpg',
    alt: 'О компании WESHOW',
    caption: 'Наша команда профессионалов работает над созданием уникальных решений',
    alignment: 'center',
    size: 'large',
    aspectRatio: '16:9'
  };

  const galleryBlock = createGalleryBlock();
  galleryBlock.content = {
    images: [
      {
        id: '1',
        src: '/images/gallery/project-1.jpg',
        alt: 'Проект 1',
        caption: 'Корпоративное мероприятие Samsung'
      },
      {
        id: '2',
        src: '/images/gallery/project-2.jpg',
        alt: 'Проект 2',
        caption: 'Выставочный стенд на форуме в Самаре'
      },
      {
        id: '3',
        src: '/images/gallery/project-3.jpg',
        alt: 'Проект 3',
        caption: 'Интерактивная инсталляция'
      },
      {
        id: '4',
        src: '/images/gallery/project-4.jpg',
        alt: 'Проект 4',
        caption: 'LED экраны на концерте'
      }
    ],
    layout: 'grid',
    columns: 2,
    aspectRatio: '4:3',
    spacing: 'md',
    showCaptions: true,
    allowLightbox: true
  };

  const videoBlock = createVideoBlock();
  videoBlock.content = {
    src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'youtube',
    title: 'Showreel WESHOW 2024',
    description: 'Демонстрация наших лучших проектов за 2024 год',
    aspectRatio: '16:9',
    alignment: 'center',
    size: 'large',
    autoplay: false,
    loop: false,
    muted: false,
    controls: true
  };

  return {
    id: 'demo-home',
    title: {
      ru: 'Главная страница (Demo)',
      en: 'Home Page (Demo)'
    },
    slug: {
      ru: 'glavnaya-demo',
      en: 'home-demo'
    },
    description: {
      ru: 'Демонстрационная главная страница с примерами всех типов блоков',
      en: 'Demo home page with examples of all block types'
    },
    blocks: [heroBlock, imageBlock, galleryBlock, videoBlock],
    settings: {
      responsive: {
        desktop: { visible: true },
        tablet: { visible: true },
        mobile: { visible: true }
      },
      seo: {
        metaTitle: {
          ru: 'WESHOW - Современные мультимедийные решения',
          en: 'WESHOW - Modern Multimedia Solutions'
        },
        metaDescription: {
          ru: 'Профессиональные мультимедийные решения для мероприятий любого масштаба. Аренда оборудования, техническая поддержка, разработка.',
          en: 'Professional multimedia solutions for events of any scale. Equipment rental, technical support, development.'
        },
        keywords: {
          ru: ['мультимедиа', 'оборудование', 'события', 'LED экраны', 'интерактивные решения'],
          en: ['multimedia', 'equipment', 'events', 'LED screens', 'interactive solutions']
        }
      },
      layout: {
        width: 'full',
        maxWidth: '1200px',
        padding: 'lg'
      }
    },
    status: 'published',
    language: 'ru',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    publishedAt: new Date('2024-01-01'),
    author: 'demo-admin',
    version: 1
  };
};

// Создание демо страницы \"О компании\"
export const createDemoAboutPage = (): CMSPage => {
  const heroBlock = createHeroBlock();
  heroBlock.content = {
    title: {
      ru: 'О компании WESHOW',
      en: 'About WESHOW'
    },
    subtitle: {
      ru: 'Мы создаем будущее событий',
      en: 'We create the future of events'
    },
    description: {
      ru: 'Более 10 лет опыта в сфере мультимедийных технологий и организации мероприятий',
      en: 'Over 10 years of experience in multimedia technologies and event management'
    },
    backgroundType: 'image',
    backgroundImage: {
      url: '/images/about-hero.jpg',
      alt: 'Команда WESHOW'
    },
    ctaButtons: [
      {
        text: { ru: 'Наша команда', en: 'Our Team' },
        url: '/team',
        style: 'primary'
      }
    ],
    overlay: {
      type: 'color',
      opacity: 0.3,
      color: 'rgba(0,0,0,0.3)'
    },
    textAlignment: 'left',
    height: 'medium'
  };

  const imageBlock1 = createImageBlock();
  imageBlock1.content = {
    src: '/images/office.jpg',
    alt: 'Офис WESHOW',
    caption: 'Наш современный офис оснащен всем необходимым оборудованием',
    alignment: 'center',
    size: 'medium',
    aspectRatio: '16:9'
  };

  const imageBlock2 = createImageBlock();
  imageBlock2.content = {
    src: '/images/warehouse.jpg',
    alt: 'Склад оборудования',
    caption: 'Собственный склад с более чем 500 единицами профессионального оборудования',
    alignment: 'center',
    size: 'medium',
    aspectRatio: '4:3'
  };

  return {
    id: 'demo-about',
    title: {
      ru: 'О компании (Demo)',
      en: 'About Us (Demo)'
    },
    slug: {
      ru: 'o-kompanii-demo',
      en: 'about-demo'
    },
    description: {
      ru: 'Демонстрационная страница о компании',
      en: 'Demo about us page'
    },
    blocks: [heroBlock, imageBlock1, imageBlock2],
    settings: {
      responsive: {
        desktop: { visible: true },
        tablet: { visible: true },
        mobile: { visible: true }
      },
      seo: {
        metaTitle: {
          ru: 'О компании WESHOW - Команда профессионалов',
          en: 'About WESHOW - Team of Professionals'
        },
        metaDescription: {
          ru: 'Узнайте больше о команде WESHOW, нашей миссии и ценностях. Более 10 лет опыта в мультимедийных технологиях.',
          en: 'Learn more about WESHOW team, our mission and values. Over 10 years of experience in multimedia technologies.'
        },
        keywords: {
          ru: ['о нас', 'команда', 'WESHOW', 'опыт', 'профессионалы'],
          en: ['about us', 'team', 'WESHOW', 'experience', 'professionals']
        }
      },
      layout: {
        width: 'container',
        maxWidth: '1000px',
        padding: 'md'
      }
    },
    status: 'published',
    language: 'ru',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date(),
    publishedAt: new Date('2024-01-02'),
    author: 'demo-admin',
    version: 1
  };
};

// Создание демо страницы \"Портфолио\"
export const createDemoPortfolioPage = (): CMSPage => {
  const heroBlock = createHeroBlock();
  heroBlock.content = {
    title: {
      ru: 'Наши проекты',
      en: 'Our Projects'
    },
    subtitle: {
      ru: 'Реализованные работы и достижения',
      en: 'Completed works and achievements'
    },
    backgroundType: 'gradient',
    backgroundGradient: {
      type: 'linear',
      direction: '45deg',
      colors: [
        { color: '#667eea', position: 0 },
        { color: '#764ba2', position: 100 }
      ]
    },
    textAlignment: 'center',
    height: 'small'
  };

  const galleryBlock = createGalleryBlock();
  galleryBlock.content = {
    images: [
      {
        id: '1',
        src: '/images/portfolio/samsung-event.jpg',
        alt: 'Samsung Event',
        caption: 'Корпоративное мероприятие Samsung - интерактивные технологии'
      },
      {
        id: '2',
        src: '/images/portfolio/samara-stand.jpg',
        alt: 'Samara Stand',
        caption: 'Выставочный стенд на IT форуме в Самаре'
      },
      {
        id: '3',
        src: '/images/portfolio/led-installation.jpg',
        alt: 'LED Installation',
        caption: 'LED инсталляция для музыкального фестиваля'
      },
      {
        id: '4',
        src: '/images/portfolio/interactive-wall.jpg',
        alt: 'Interactive Wall',
        caption: 'Интерактивная стена в торговом центре'
      },
      {
        id: '5',
        src: '/images/portfolio/hologram-show.jpg',
        alt: 'Hologram Show',
        caption: 'Голографическое шоу на открытии бутика'
      },
      {
        id: '6',
        src: '/images/portfolio/conference-setup.jpg',
        alt: 'Conference Setup',
        caption: 'Техническое обеспечение международной конференции'
      }
    ],
    layout: 'grid',
    columns: 3,
    aspectRatio: '4:3',
    spacing: 'lg',
    showCaptions: true,
    allowLightbox: true
  };

  return {
    id: 'demo-portfolio',
    title: {
      ru: 'Портфолио (Demo)',
      en: 'Portfolio (Demo)'
    },
    slug: {
      ru: 'portfolio-demo',
      en: 'portfolio-demo'
    },
    description: {
      ru: 'Демонстрационная страница портфолио с примерами наших работ',
      en: 'Demo portfolio page with examples of our work'
    },
    blocks: [heroBlock, galleryBlock],
    settings: {
      responsive: {
        desktop: { visible: true },
        tablet: { visible: true },
        mobile: { visible: true }
      },
      seo: {
        metaTitle: {
          ru: 'Портфолио WESHOW - Наши лучшие проекты',
          en: 'WESHOW Portfolio - Our Best Projects'
        },
        metaDescription: {
          ru: 'Смотрите примеры наших лучших проектов в области мультимедийных технологий и организации мероприятий.',
          en: 'See examples of our best projects in multimedia technologies and event management.'
        },
        keywords: {
          ru: ['портфолио', 'проекты', 'мероприятия', 'мультимедиа', 'выставки'],
          en: ['portfolio', 'projects', 'events', 'multimedia', 'exhibitions']
        }
      },
      layout: {
        width: 'full',
        maxWidth: '1400px',
        padding: 'lg'
      }
    },
    status: 'published',
    language: 'ru',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date(),
    publishedAt: new Date('2024-01-03'),
    author: 'demo-admin',
    version: 1
  };
};

// Экспорт всех демо страниц
export const getDemoPages = (): CMSPage[] => [
  createDemoHomePage(),
  createDemoAboutPage(),
  createDemoPortfolioPage()
];

// Функция для загрузки демо данных в CMS
export const loadDemoData = async () => {
  const pages = getDemoPages();
  
  // В реальном приложении здесь будет загрузка через API
  console.log('Loading demo data:', pages);
  
  return pages;
};

export default {
  createDemoHomePage,
  createDemoAboutPage,
  createDemoPortfolioPage,
  getDemoPages,
  loadDemoData
};