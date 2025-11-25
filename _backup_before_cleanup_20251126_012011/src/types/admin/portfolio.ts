export interface PortfolioItem {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  content: string;
  coverImage: string; // Одна обложка
  photos: string[]; // До 10 фото
  videos: string[]; // До 4 видео
  thumbnail: string;
  gallery: string[];
  year: string;
  client?: string;
  location?: string;
  duration?: string;
  budget?: string;
  results: string[];
  technologies: string[];
  tags: string[];
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  author: string;
  views: number;
  likes: number;
  version: number; // Версионность для отката изменений
  previousVersions: PortfolioVersion[]; // История версий
}

export interface PortfolioVersion {
  id: string;
  version: number;
  data: Partial<PortfolioItem>;
  createdAt: Date;
  createdBy: string;
  comment?: string;
}

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  order: number;
  count: number;
}

export interface PortfolioFormData {
  title: string;
  subtitle: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  content: string;
  coverImage: string;
  photos: string[];
  videos: string[];
  year: string;
  client?: string;
  location?: string;
  duration?: string;
  budget?: string;
  results: string[];
  technologies: string[];
  tags: string[];
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  type: 'image' | 'video' | 'document';
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  uploadedAt: Date;
  uploadedBy: string;
  order: number; // Для сортировки
}

export interface ProjectBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'gallery' | 'stats' | 'cta';
  content: any;
  order: number;
  isVisible: boolean;
  settings?: Record<string, any>;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  permissions: string[];
  lastLogin: Date;
  isActive: boolean;
}

export interface PortfolioStats {
  totalItems: number;
  publishedItems: number;
  draftItems: number;
  archivedItems: number;
  totalViews: number;
  totalLikes: number;
  topCategories: Array<{
    name: string;
    count: number;
  }>;
  recentActivity: Array<{
    action: string;
    item: string;
    user: string;
    timestamp: Date;
  }>;
}

// Константы ограничений
export const PORTFOLIO_LIMITS = {
  MAX_PHOTOS: 10,
  MAX_VIDEOS: 4,
  MAX_DESCRIPTION_LENGTH: 10000,
  MAX_TITLE_LENGTH: 200,
  MAX_SUBTITLE_LENGTH: 500,
} as const;

// Валидация
export const validatePortfolioData = (data: PortfolioFormData): string[] => {
  const errors: string[] = [];
  
  if (data.title.length > PORTFOLIO_LIMITS.MAX_TITLE_LENGTH) {
    errors.push(`Заголовок не может превышать ${PORTFOLIO_LIMITS.MAX_TITLE_LENGTH} символов`);
  }
  
  if (data.subtitle.length > PORTFOLIO_LIMITS.MAX_SUBTITLE_LENGTH) {
    errors.push(`Подзаголовок не может превышать ${PORTFOLIO_LIMITS.MAX_SUBTITLE_LENGTH} символов`);
  }
  
  if (data.description.length > PORTFOLIO_LIMITS.MAX_DESCRIPTION_LENGTH) {
    errors.push(`Описание не может превышать ${PORTFOLIO_LIMITS.MAX_DESCRIPTION_LENGTH} символов`);
  }
  
  if (data.photos.length > PORTFOLIO_LIMITS.MAX_PHOTOS) {
    errors.push(`Количество фото не может превышать ${PORTFOLIO_LIMITS.MAX_PHOTOS}`);
  }
  
  if (data.videos.length > PORTFOLIO_LIMITS.MAX_VIDEOS) {
    errors.push(`Количество видео не может превышать ${PORTFOLIO_LIMITS.MAX_VIDEOS}`);
  }
  
  return errors;
};
