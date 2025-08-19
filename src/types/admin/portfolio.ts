export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  content: string;
  image: string;
  thumbnail: string;
  gallery: string[];
  video?: string;
  poster?: string;
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
  slug: string;
  category: string;
  description: string;
  shortDescription: string;
  content: string;
  image: string;
  thumbnail: string;
  gallery: string[];
  video?: string;
  poster?: string;
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
