import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CMSPage, ContentBlock } from '../types/cms/content';

interface CMSContextType {
  // Страницы
  pages: CMSPage[];
  currentPage: CMSPage | null;
  isLoading: boolean;
  error: string | null;

  // Действия с страницами
  createPage: (page: Partial<CMSPage>) => Promise<CMSPage>;
  updatePage: (pageId: string, updates: Partial<CMSPage>) => Promise<void>;
  deletePage: (pageId: string) => Promise<void>;
  loadPages: () => Promise<void>;
  setCurrentPage: (page: CMSPage | null) => void;

  // Действия с блоками
  addBlock: (pageId: string, block: ContentBlock, index?: number) => Promise<void>;
  updateBlock: (pageId: string, blockId: string, updates: Partial<ContentBlock>) => Promise<void>;
  deleteBlock: (pageId: string, blockId: string) => Promise<void>;
  moveBlock: (pageId: string, blockId: string, newIndex: number) => Promise<void>;

  // Настройки
  language: 'ru' | 'en';
  setLanguage: (language: 'ru' | 'en') => void;
  previewMode: 'edit' | 'preview';
  setPreviewMode: (mode: 'edit' | 'preview') => void;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  setDeviceType: (device: 'mobile' | 'tablet' | 'desktop') => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

interface CMSProviderProps {
  children: ReactNode;
}

export const CMSProvider: React.FC<CMSProviderProps> = ({ children }) => {
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [currentPage, setCurrentPage] = useState<CMSPage | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const [previewMode, setPreviewMode] = useState<'edit' | 'preview'>('edit');
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  // Загрузка страниц при инициализации
  useEffect(() => {
    loadPages();
  }, []);

  // Сохранение языка в localStorage
  useEffect(() => {
    localStorage.setItem('cms-language', language);
  }, [language]);

  // Загрузка языка из localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('cms-language') as 'ru' | 'en';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const loadPages = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // В реальном приложении здесь будет API вызов
      // const response = await api.pages.getAll();
      // setPages(response.data);
      
      // Пока используем mock данные
      const mockPages: CMSPage[] = [
        {
          id: 'main-page',
          title: { ru: 'Главная страница', en: 'Home Page' },
          slug: { ru: 'glavnaya', en: 'home' },
          description: { ru: 'Главная страница сайта', en: 'Main website page' },
          blocks: [],
          settings: {
            responsive: {
              desktop: { visible: true },
              tablet: { visible: true },
              mobile: { visible: true }
            },
            seo: {
              metaTitle: { ru: 'WESHOW - Современные мультимедийные решения', en: 'WESHOW - Modern Multimedia Solutions' },
              metaDescription: { ru: 'Профессиональные мультимедийные решения для мероприятий любого масштаба', en: 'Professional multimedia solutions for events of any scale' },
              keywords: { ru: ['мультимедиа', 'события', 'оборудование'], en: ['multimedia', 'events', 'equipment'] }
            }
          },
          status: 'published',
          language: 'ru',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date(),
          publishedAt: new Date('2024-01-01'),
          author: 'admin',
          version: 1
        },
        {
          id: 'about-page',
          title: { ru: 'О компании', en: 'About Us' },
          slug: { ru: 'o-kompanii', en: 'about' },
          description: { ru: 'Информация о компании WESHOW', en: 'Information about WESHOW company' },
          blocks: [],
          settings: {
            responsive: {
              desktop: { visible: true },
              tablet: { visible: true },
              mobile: { visible: true }
            },
            seo: {
              metaTitle: { ru: 'О компании WESHOW', en: 'About WESHOW' },
              metaDescription: { ru: 'Узнайте больше о команде и миссии WESHOW', en: 'Learn more about WESHOW team and mission' },
              keywords: { ru: ['о нас', 'команда', 'миссия'], en: ['about', 'team', 'mission'] }
            }
          },
          status: 'draft',
          language: 'ru',
          createdAt: new Date('2024-01-02'),
          updatedAt: new Date(),
          author: 'admin',
          version: 1
        }
      ];
      
      setPages(mockPages);
    } catch (err) {
      setError('Ошибка загрузки страниц');
      console.error('Error loading pages:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createPage = async (pageData: Partial<CMSPage>): Promise<CMSPage> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newPage: CMSPage = {
        id: `page_${Date.now()}`,
        title: pageData.title || { ru: 'Новая страница', en: 'New Page' },
        slug: pageData.slug || { ru: 'novaya-stranitsa', en: 'new-page' },
        description: pageData.description || { ru: '', en: '' },
        blocks: pageData.blocks || [],
        settings: pageData.settings || {
          responsive: {
            desktop: { visible: true },
            tablet: { visible: true },
            mobile: { visible: true }
          },
          seo: {
            metaTitle: { ru: '', en: '' },
            metaDescription: { ru: '', en: '' },
            keywords: { ru: [], en: [] }
          }
        },
        status: pageData.status || 'draft',
        language: pageData.language || 'ru',
        createdAt: new Date(),
        updatedAt: new Date(),
        author: 'current-user',
        version: 1,
        ...pageData
      };

      // В реальном приложении здесь будет API вызов
      // const response = await api.pages.create(newPage);
      
      setPages(prev => [newPage, ...prev]);
      return newPage;
    } catch (err) {
      setError('Ошибка создания страницы');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePage = async (pageId: string, updates: Partial<CMSPage>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // В реальном приложении здесь будет API вызов
      // await api.pages.update(pageId, updates);
      
      setPages(prev => prev.map(page => 
        page.id === pageId 
          ? { ...page, ...updates, updatedAt: new Date() }
          : page
      ));

      if (currentPage?.id === pageId) {
        setCurrentPage(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
      }
    } catch (err) {
      setError('Ошибка обновления страницы');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePage = async (pageId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // В реальном приложении здесь будет API вызов
      // await api.pages.delete(pageId);
      
      setPages(prev => prev.filter(page => page.id !== pageId));
      
      if (currentPage?.id === pageId) {
        setCurrentPage(null);
      }
    } catch (err) {
      setError('Ошибка удаления страницы');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addBlock = async (pageId: string, block: ContentBlock, index?: number): Promise<void> => {
    try {
      await updatePage(pageId, {
        blocks: (() => {
          const page = pages.find(p => p.id === pageId);
          if (!page) return [];
          
          const updatedBlocks = [...page.blocks];
          if (index !== undefined) {
            updatedBlocks.splice(index, 0, block);
          } else {
            updatedBlocks.push(block);
          }
          return updatedBlocks;
        })()
      });
    } catch (err) {
      setError('Ошибка добавления блока');
      throw err;
    }
  };

  const updateBlock = async (pageId: string, blockId: string, updates: Partial<ContentBlock>): Promise<void> => {
    try {
      const page = pages.find(p => p.id === pageId);
      if (!page) return;

      const updatedBlocks = page.blocks.map(block => 
        block.id === blockId ? { ...block, ...updates } : block
      );

      await updatePage(pageId, { blocks: updatedBlocks });
    } catch (err) {
      setError('Ошибка обновления блока');
      throw err;
    }
  };

  const deleteBlock = async (pageId: string, blockId: string): Promise<void> => {
    try {
      const page = pages.find(p => p.id === pageId);
      if (!page) return;

      const updatedBlocks = page.blocks.filter(block => block.id !== blockId);
      await updatePage(pageId, { blocks: updatedBlocks });
    } catch (err) {
      setError('Ошибка удаления блока');
      throw err;
    }
  };

  const moveBlock = async (pageId: string, blockId: string, newIndex: number): Promise<void> => {
    try {
      const page = pages.find(p => p.id === pageId);
      if (!page) return;

      const blocks = [...page.blocks];
      const currentIndex = blocks.findIndex(block => block.id === blockId);
      
      if (currentIndex === -1) return;

      const [movedBlock] = blocks.splice(currentIndex, 1);
      blocks.splice(newIndex, 0, movedBlock);

      await updatePage(pageId, { blocks });
    } catch (err) {
      setError('Ошибка перемещения блока');
      throw err;
    }
  };

  const contextValue: CMSContextType = {
    // Состояние
    pages,
    currentPage,
    isLoading,
    error,

    // Действия с страницами
    createPage,
    updatePage,
    deletePage,
    loadPages,
    setCurrentPage,

    // Действия с блоками
    addBlock,
    updateBlock,
    deleteBlock,
    moveBlock,

    // Настройки
    language,
    setLanguage,
    previewMode,
    setPreviewMode,
    deviceType,
    setDeviceType
  };

  return (
    <CMSContext.Provider value={contextValue}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

export default CMSProvider;