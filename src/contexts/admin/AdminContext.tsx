import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { PortfolioItem, PortfolioCategory, MediaFile, AdminUser } from '@/types/admin/portfolio';

interface AdminState {
  currentUser: AdminUser | null;
  portfolioItems: PortfolioItem[];
  categories: PortfolioCategory[];
  mediaFiles: MediaFile[];
  selectedItem: PortfolioItem | null;
  isEditing: boolean;
  isLoading: boolean;
  error: string | null;
  filters: {
    status: string;
    category: string;
    search: string;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

type AdminAction =
  | { type: 'SET_CURRENT_USER'; payload: AdminUser }
  | { type: 'SET_PORTFOLIO_ITEMS'; payload: PortfolioItem[] }
  | { type: 'ADD_PORTFOLIO_ITEM'; payload: PortfolioItem }
  | { type: 'UPDATE_PORTFOLIO_ITEM'; payload: PortfolioItem }
  | { type: 'DELETE_PORTFOLIO_ITEM'; payload: string }
  | { type: 'SET_CATEGORIES'; payload: PortfolioCategory[] }
  | { type: 'SET_MEDIA_FILES'; payload: MediaFile[] }
  | { type: 'SET_SELECTED_ITEM'; payload: PortfolioItem | null }
  | { type: 'SET_EDITING'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_FILTERS'; payload: Partial<AdminState['filters']> }
  | { type: 'SET_PAGINATION'; payload: Partial<AdminState['pagination']> }
  | { type: 'RESET_STATE' };

const initialState: AdminState = {
  currentUser: {
    id: '1',
    username: 'admin',
    email: 'admin@weshow.su',
    role: 'admin',
    permissions: ['read', 'write', 'delete'],
    lastLogin: new Date(),
    isActive: true,
  },
  portfolioItems: [
    {
      id: '1',
      title: 'Интерактивная выставка "Цифровое будущее"',
      subtitle: 'Иммерсивное пространство с 3D-проекциями и VR',
      slug: 'digital-future-exhibition',
      category: '3D Mapping / Interactive',
      description: 'Создание иммерсивного пространства с использованием 3D-проекций, интерактивных стен и VR-зоны для выставки технологий будущего',
      shortDescription: 'Иммерсивная выставка с 3D-проекциями и VR',
      content: 'Полное описание проекта...',
      coverImage: '/placeholder.svg',
      thumbnail: '/placeholder.svg',
      photos: ['/placeholder.svg', '/placeholder.svg'],
      videos: [],
      gallery: ['/placeholder.svg', '/placeholder.svg'],
      year: '2024',
      client: 'Технологический музей',
      location: 'Москва',
      duration: '3 месяца',
      budget: '2.5M ₽',
      results: ['15,000+ посетителей', '95% положительных отзывов', 'Увеличение времени пребывания на 40%'],
      technologies: ['3D-маппинг', 'Интерактивные стены', 'VR-гарнитуры', 'Проекционные экраны'],
      tags: ['exhibition', '3d-mapping', 'vr', 'interactive'],
      featured: true,
      status: 'published',
      seo: {
        metaTitle: 'Интерактивная выставка Цифровое будущее - WESHOW',
        metaDescription: 'Создание иммерсивного пространства с 3D-проекциями и VR-зонами',
        keywords: ['выставка', '3d-маппинг', 'vr', 'интерактив'],
      },
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      publishedAt: new Date('2024-01-20'),
      author: 'admin',
      views: 1250,
      likes: 89,
      version: 1,
      previousVersions: [],
    },
    {
      id: '2',
      title: 'Корпоративное мероприятие Samsung',
      subtitle: 'LED-инсталляция для презентации новых продуктов',
      slug: 'samsung-corporate-event',
      category: 'LED Solutions / Corporate',
      description: 'Масштабная LED-инсталляция для презентации новых продуктов с интерактивными зонами и 3D-визуализацией',
      shortDescription: 'LED-инсталляция для Samsung с интерактивными зонами',
      content: 'Полное описание проекта...',
      coverImage: '/placeholder.svg',
      thumbnail: '/placeholder.svg',
      photos: ['/placeholder.svg'],
      videos: [],
      gallery: ['/placeholder.svg'],
      year: '2024',
      client: 'Samsung',
      location: 'Санкт-Петербург',
      duration: '2 месяца',
      budget: '1.8M ₽',
      results: ['500+ участников', '100% выполнение технических требований', 'Высокая оценка от руководства'],
      technologies: ['LED-видеостены', 'Интерактивные панели', '3D-проекции', 'Звуковые системы'],
      tags: ['corporate', 'led', 'samsung', 'event'],
      featured: true,
      status: 'published',
      seo: {
        metaTitle: 'Корпоративное мероприятие Samsung - WESHOW',
        metaDescription: 'LED-инсталляция для презентации новых продуктов Samsung',
        keywords: ['samsung', 'led', 'корпоратив', 'мероприятие'],
      },
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-15'),
      publishedAt: new Date('2024-02-15'),
      author: 'admin',
      views: 890,
      likes: 67,
      version: 1,
      previousVersions: [],
    },
  ],
  categories: [
    { id: '1', name: '3D Mapping / Interactive', slug: '3d-mapping', description: '3D-маппинг и интерактивные решения', color: '#3B82F6', icon: '🎯', order: 1, count: 5 },
    { id: '2', name: 'LED Solutions / Corporate', slug: 'led-solutions', description: 'LED-решения для корпоративных мероприятий', color: '#10B981', icon: '💡', order: 2, count: 3 },
    { id: '3', name: 'Interactive / Museums', slug: 'interactive-museums', description: 'Интерактивные решения для музеев', color: '#F59E0B', icon: '🏛️', order: 3, count: 2 },
  ],
  mediaFiles: [],
  selectedItem: null,
  isEditing: false,
  isLoading: false,
  error: null,
  filters: {
    status: '',
    category: '',
    search: '',
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 2,
  },
};

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    
    case 'SET_PORTFOLIO_ITEMS':
      return { ...state, portfolioItems: action.payload };
    
    case 'ADD_PORTFOLIO_ITEM':
      return { ...state, portfolioItems: [...state.portfolioItems, action.payload] };
    
    case 'UPDATE_PORTFOLIO_ITEM':
      return {
        ...state,
        portfolioItems: state.portfolioItems.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    
    case 'DELETE_PORTFOLIO_ITEM':
      return {
        ...state,
        portfolioItems: state.portfolioItems.filter(item => item.id !== action.payload),
      };
    
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    
    case 'SET_MEDIA_FILES':
      return { ...state, mediaFiles: action.payload };
    
    case 'SET_SELECTED_ITEM':
      return { ...state, selectedItem: action.payload };
    
    case 'SET_EDITING':
      return { ...state, isEditing: action.payload };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case 'SET_PAGINATION':
      return { ...state, pagination: { ...state.pagination, ...action.payload } };
    
    case 'RESET_STATE':
      return initialState;
    
    default:
      return state;
  }
}

interface AdminContextType {
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
  // Convenience methods
  addPortfolioItem: (item: PortfolioItem) => void;
  updatePortfolioItem: (item: PortfolioItem) => void;
  deletePortfolioItem: (id: string) => void;
  setSelectedItem: (item: PortfolioItem | null) => void;
  setEditing: (editing: boolean) => void;
  setFilters: (filters: Partial<AdminState['filters']>) => void;
  resetState: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  const addPortfolioItem = (item: PortfolioItem) => {
    dispatch({ type: 'ADD_PORTFOLIO_ITEM', payload: item });
  };

  const updatePortfolioItem = (item: PortfolioItem) => {
    dispatch({ type: 'UPDATE_PORTFOLIO_ITEM', payload: item });
  };

  const deletePortfolioItem = (id: string) => {
    dispatch({ type: 'DELETE_PORTFOLIO_ITEM', payload: id });
  };

  const setSelectedItem = (item: PortfolioItem | null) => {
    dispatch({ type: 'SET_SELECTED_ITEM', payload: item });
  };

  const setEditing = (editing: boolean) => {
    dispatch({ type: 'SET_EDITING', payload: editing });
  };

  const setFilters = (filters: Partial<AdminState['filters']>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const resetState = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  const value: AdminContextType = {
    state,
    dispatch,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    setSelectedItem,
    setEditing,
    setFilters,
    resetState,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
