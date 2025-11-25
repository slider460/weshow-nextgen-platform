import React from 'react';
import { 
  Type, 
  ImageIcon, 
  Images, 
  Video, 
  Star, 
  Grid, 
  Mail, 
  Quote,
  BarChart3,
  FileText,
  Layout
} from 'lucide-react';
import { ContentBlock } from '../../../types/cms/content';

// Import block components
import HeroBlock, { createHeroBlock } from '../blocks/HeroBlock';
import ImageBlock, { createImageBlock } from '../blocks/ImageBlock';
import GalleryBlock, { createGalleryBlock } from '../blocks/GalleryBlock';
import VideoBlock, { createVideoBlock } from '../blocks/VideoBlock';

// Block type definitions
export interface BlockType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'content' | 'media' | 'layout' | 'interactive' | 'data';
  component: React.ComponentType<any>;
  createBlock: () => ContentBlock;
  isAvailable: boolean;
  isPro?: boolean;
}

// Text Block (placeholder)
const TextBlock: React.FC<any> = ({ children }) => <div>{children}</div>;
const createTextBlock = (): ContentBlock => ({
  id: Date.now().toString(),
  type: 'text',
  content: {
    text: 'Enter your text here...',
    format: 'paragraph',
    alignment: 'left'
  },
  settings: {
    responsive: {
      desktop: { visible: true },
      tablet: { visible: true },
      mobile: { visible: true }
    },
    spacing: {
      marginTop: 'md',
      marginBottom: 'md'
    }
  }
});

// Services Grid Block (placeholder)
const ServicesGridBlock: React.FC<any> = ({ children }) => <div>{children}</div>;
const createServicesGridBlock = (): ContentBlock => ({
  id: Date.now().toString(),
  type: 'services_grid',
  content: {
    services: [],
    columns: 3,
    showIcons: true,
    showDescriptions: true
  },
  settings: {
    responsive: {
      desktop: { visible: true },
      tablet: { visible: true },
      mobile: { visible: true }
    },
    spacing: {
      marginTop: 'lg',
      marginBottom: 'lg'
    }
  }
});

// Contact Form Block (placeholder)
const ContactFormBlock: React.FC<any> = ({ children }) => <div>{children}</div>;
const createContactFormBlock = (): ContentBlock => ({
  id: Date.now().toString(),
  type: 'contact_form',
  content: {
    fields: [
      { type: 'text', name: 'name', label: 'Name', required: true },
      { type: 'email', name: 'email', label: 'Email', required: true },
      { type: 'textarea', name: 'message', label: 'Message', required: true }
    ],
    submitText: 'Send Message',
    successMessage: 'Thank you for your message!'
  },
  settings: {
    responsive: {
      desktop: { visible: true },
      tablet: { visible: true },
      mobile: { visible: true }
    },
    spacing: {
      marginTop: 'lg',
      marginBottom: 'lg'
    }
  }
});

// Testimonials Block (placeholder)
const TestimonialsBlock: React.FC<any> = ({ children }) => <div>{children}</div>;
const createTestimonialsBlock = (): ContentBlock => ({
  id: Date.now().toString(),
  type: 'testimonials',
  content: {
    testimonials: [],
    layout: 'carousel',
    showRatings: true,
    showAvatars: true
  },
  settings: {
    responsive: {
      desktop: { visible: true },
      tablet: { visible: true },
      mobile: { visible: true }
    },
    spacing: {
      marginTop: 'lg',
      marginBottom: 'lg'
    }
  }
});

// Statistics Block (placeholder)
const StatisticsBlock: React.FC<any> = ({ children }) => <div>{children}</div>;
const createStatisticsBlock = (): ContentBlock => ({
  id: Date.now().toString(),
  type: 'statistics',
  content: {
    stats: [],
    layout: 'horizontal',
    animateNumbers: true
  },
  settings: {
    responsive: {
      desktop: { visible: true },
      tablet: { visible: true },
      mobile: { visible: true }
    },
    spacing: {
      marginTop: 'lg',
      marginBottom: 'lg'
    }
  }
});

// Blog Posts Block (placeholder)
const BlogPostsBlock: React.FC<any> = ({ children }) => <div>{children}</div>;
const createBlogPostsBlock = (): ContentBlock => ({
  id: Date.now().toString(),
  type: 'blog_posts',
  content: {
    postsCount: 3,
    layout: 'grid',
    showExcerpts: true,
    showDates: true,
    showCategories: true
  },
  settings: {
    responsive: {
      desktop: { visible: true },
      tablet: { visible: true },
      mobile: { visible: true }
    },
    spacing: {
      marginTop: 'lg',
      marginBottom: 'lg'
    }
  }
});

// Spacer Block (placeholder)
const SpacerBlock: React.FC<any> = ({ children }) => <div>{children}</div>;
const createSpacerBlock = (): ContentBlock => ({
  id: Date.now().toString(),
  type: 'spacer',
  content: {
    height: 'md'
  },
  settings: {
    responsive: {
      desktop: { visible: true },
      tablet: { visible: true },
      mobile: { visible: true }
    },
    spacing: {
      marginTop: 'none',
      marginBottom: 'none'
    }
  }
});

// Block registry
export const blockRegistry: Record<string, BlockType> = {
  // Content Blocks
  text: {
    id: 'text',
    name: 'Text',
    description: 'Rich text content with formatting options',
    icon: Type,
    category: 'content',
    component: TextBlock,
    createBlock: createTextBlock,
    isAvailable: true
  },

  hero: {
    id: 'hero',
    name: 'Hero Section',
    description: 'Full-width hero section with background and CTA',
    icon: Star,
    category: 'layout',
    component: HeroBlock,
    createBlock: createHeroBlock,
    isAvailable: true
  },

  // Media Blocks
  image: {
    id: 'image',
    name: 'Image',
    description: 'Single image with caption and link options',
    icon: ImageIcon,
    category: 'media',
    component: ImageBlock,
    createBlock: createImageBlock,
    isAvailable: true
  },

  gallery: {
    id: 'gallery',
    name: 'Gallery',
    description: 'Image gallery with multiple layout options',
    icon: Images,
    category: 'media',
    component: GalleryBlock,
    createBlock: createGalleryBlock,
    isAvailable: true
  },

  video: {
    id: 'video',
    name: 'Video',
    description: 'Video player with YouTube, Vimeo, and upload support',
    icon: Video,
    category: 'media',
    component: VideoBlock,
    createBlock: createVideoBlock,
    isAvailable: true
  },

  // Interactive Blocks
  services_grid: {
    id: 'services_grid',
    name: 'Services Grid',
    description: 'Grid of services with icons and descriptions',
    icon: Grid,
    category: 'interactive',
    component: ServicesGridBlock,
    createBlock: createServicesGridBlock,
    isAvailable: false // Placeholder
  },

  contact_form: {
    id: 'contact_form',
    name: 'Contact Form',
    description: 'Customizable contact form with validation',
    icon: Mail,
    category: 'interactive',
    component: ContactFormBlock,
    createBlock: createContactFormBlock,
    isAvailable: false // Placeholder
  },

  testimonials: {
    id: 'testimonials',
    name: 'Testimonials',
    description: 'Customer testimonials with ratings and avatars',
    icon: Quote,
    category: 'interactive',
    component: TestimonialsBlock,
    createBlock: createTestimonialsBlock,
    isAvailable: false // Placeholder
  },

  // Data Blocks
  statistics: {
    id: 'statistics',
    name: 'Statistics',
    description: 'Animated number counters and statistics',
    icon: BarChart3,
    category: 'data',
    component: StatisticsBlock,
    createBlock: createStatisticsBlock,
    isAvailable: false // Placeholder
  },

  blog_posts: {
    id: 'blog_posts',
    name: 'Blog Posts',
    description: 'Dynamic blog posts grid from your blog',
    icon: FileText,
    category: 'data',
    component: BlogPostsBlock,
    createBlock: createBlogPostsBlock,
    isAvailable: false // Placeholder
  },

  // Layout Blocks
  spacer: {
    id: 'spacer',
    name: 'Spacer',
    description: 'Add vertical spacing between sections',
    icon: Layout,
    category: 'layout',
    component: SpacerBlock,
    createBlock: createSpacerBlock,
    isAvailable: false // Placeholder
  }
};

// Get available blocks by category
export const getBlocksByCategory = (category?: string): BlockType[] => {
  const blocks = Object.values(blockRegistry);
  if (category) {
    return blocks.filter(block => block.category === category && block.isAvailable);
  }
  return blocks.filter(block => block.isAvailable);
};

// Get all categories
export const getCategories = (): Array<{ id: string; name: string; count: number }> => {
  const categories = {
    content: { id: 'content', name: 'Content', count: 0 },
    media: { id: 'media', name: 'Media', count: 0 },
    layout: { id: 'layout', name: 'Layout', count: 0 },
    interactive: { id: 'interactive', name: 'Interactive', count: 0 },
    data: { id: 'data', name: 'Data', count: 0 }
  };

  Object.values(blockRegistry).forEach(block => {
    if (block.isAvailable) {
      categories[block.category].count++;
    }
  });

  return Object.values(categories).filter(cat => cat.count > 0);
};

// Get block component by type
export const getBlockComponent = (type: string): React.ComponentType<any> | null => {
  const blockType = blockRegistry[type];
  return blockType ? blockType.component : null;
};

// Create new block instance
export const createNewBlock = (type: string): ContentBlock | null => {
  const blockType = blockRegistry[type];
  return blockType && blockType.isAvailable ? blockType.createBlock() : null;
};

// Check if block type exists and is available
export const isBlockTypeAvailable = (type: string): boolean => {
  const blockType = blockRegistry[type];
  return blockType ? blockType.isAvailable : false;
};

// Get block type info
export const getBlockTypeInfo = (type: string): BlockType | null => {
  return blockRegistry[type] || null;
};

export default blockRegistry;