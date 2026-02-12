import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { useCMS } from '../../../contexts/CMSContext';
import { Badge } from '../../ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Copy,
  Settings,
  Globe,
  Calendar,
  User,
  MoreVertical
} from 'lucide-react';
import { CMSPage, DeviceType } from '../../../types/cms/content';
import PageEditor from './PageEditor';

interface PageManagerProps {
  language: 'ru' | 'en';
  onLanguageChange: (language: 'ru' | 'en') => void;
}

const PageManager: React.FC<PageManagerProps> = ({ language, onLanguageChange }) => {
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPage, setSelectedPage] = useState<CMSPage | null>(null);
  const [editorMode, setEditorMode] = useState<'edit' | 'preview'>('edit');
  const [currentDevice, setCurrentDevice] = useState<DeviceType>('desktop');
  const [isCreating, setIsCreating] = useState(false);

  // Mock data - in real app this would come from API
  useEffect(() => {
    const mockPages: CMSPage[] = [
      {
        id: 'page_1',
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
            metaTitle: { ru: 'Главная', en: 'Home' },
            metaDescription: { ru: 'Описание главной страницы', en: 'Home page description' },
            keywords: { ru: ['главная'], en: ['home'] }
          }
        },
        status: 'published',
        language: 'ru',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-15'),
        publishedAt: new Date('2024-01-10'),
        author: 'admin',
        version: 1
      },
      {
        id: 'page_2',
        title: { ru: 'О нас', en: 'About Us' },
        slug: { ru: 'o-nas', en: 'about' },
        description: { ru: 'Страница о компании', en: 'About company page' },
        blocks: [],
        settings: {
          responsive: {
            desktop: { visible: true },
            tablet: { visible: true },
            mobile: { visible: true }
          },
          seo: {
            metaTitle: { ru: 'О нас', en: 'About Us' },
            metaDescription: { ru: 'О нашей компании', en: 'About our company' },
            keywords: { ru: ['о нас'], en: ['about'] }
          }
        },
        status: 'draft',
        language: 'ru',
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-16'),
        author: 'editor',
        version: 1
      }
    ];
    setPages(mockPages);
  }, []);

  const filteredPages = pages.filter(page => {
    const matchesSearch = 
      page.title[language]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.slug[language]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description[language]?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleCreatePage = () => {
    const newPage: CMSPage = {
      id: `page_${Date.now()}`,
      title: { ru: 'Новая страница', en: 'New Page' },
      slug: { ru: 'novaya-stranitsa', en: 'new-page' },
      description: { ru: '', en: '' },
      blocks: [],
      settings: {
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
      status: 'draft',
      language: 'ru',
      createdAt: new Date(),
      updatedAt: new Date(),
      author: 'current-user',
      version: 1
    };

    setPages(prev => [newPage, ...prev]);
    setSelectedPage(newPage);
    setIsCreating(true);
  };

  const handleEditPage = (page: CMSPage) => {
    setSelectedPage(page);
    setIsCreating(false);
    setEditorMode('edit');
  };

  const handleDeletePage = (pageId: string) => {
    if (confirm(language === 'en' ? 'Are you sure you want to delete this page?' : 'Вы уверены, что хотите удалить эту страницу?')) {
      setPages(prev => prev.filter(p => p.id !== pageId));
      if (selectedPage?.id === pageId) {
        setSelectedPage(null);
      }
    }
  };

  const handlePageUpdate = (updates: Partial<CMSPage>) => {
    if (!selectedPage) return;

    const updatedPage = { ...selectedPage, ...updates, updatedAt: new Date() };
    setPages(prev => prev.map(p => p.id === selectedPage.id ? updatedPage : p));
    setSelectedPage(updatedPage);
  };

  const handleBlockAdd = (block: any, index?: number) => {
    if (!selectedPage) return;

    const updatedBlocks = [...selectedPage.blocks];
    if (index !== undefined) {
      updatedBlocks.splice(index, 0, block);
    } else {
      updatedBlocks.push(block);
    }

    handlePageUpdate({ blocks: updatedBlocks });
  };

  const handleBlockUpdate = (blockId: string, updates: any) => {
    if (!selectedPage) return;

    const updatedBlocks = selectedPage.blocks.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    );

    handlePageUpdate({ blocks: updatedBlocks });
  };

  const handleBlockDelete = (blockId: string) => {
    if (!selectedPage) return;

    const updatedBlocks = selectedPage.blocks.filter(block => block.id !== blockId);
    handlePageUpdate({ blocks: updatedBlocks });
  };

  const handleBlockMove = (blockId: string, newIndex: number) => {
    if (!selectedPage) return;

    const blocks = [...selectedPage.blocks];
    const currentIndex = blocks.findIndex(block => block.id === blockId);
    
    if (currentIndex === -1) return;

    const [movedBlock] = blocks.splice(currentIndex, 1);
    blocks.splice(newIndex, 0, movedBlock);

    handlePageUpdate({ blocks });
  };

  const handleSave = () => {
    // Implement save logic
    console.log('Saving page:', selectedPage);
  };

  const handlePreview = () => {
    setEditorMode('preview');
  };

  const handlePublish = () => {
    if (!selectedPage) return;

    handlePageUpdate({ 
      status: 'published',
      publishedAt: new Date()
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    const statusTexts = {
      published: { ru: 'Опубликовано', en: 'Published' },
      draft: { ru: 'Черновик', en: 'Draft' },
      archived: { ru: 'Архив', en: 'Archived' }
    };
    return statusTexts[status as keyof typeof statusTexts]?.[language] || status;
  };

  if (selectedPage) {
    return (
      <PageEditor
        page={selectedPage}
        mode={editorMode}
        screenSize={currentDevice}
        language={language}
        onPageUpdate={handlePageUpdate}
        onBlockAdd={handleBlockAdd}
        onBlockUpdate={handleBlockUpdate}
        onBlockDelete={handleBlockDelete}
        onBlockMove={handleBlockMove}
        onSave={handleSave}
        onPreview={handlePreview}
        onPublish={handlePublish}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {language === 'en' ? 'Page Manager' : 'Управление страницами'}
              </h1>
              <Badge variant="outline" className="capitalize">
                CMS
              </Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Language Switcher */}
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={language === 'ru' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onLanguageChange('ru')}
                  className="rounded-r-none"
                >
                  RU
                </Button>
                <Button
                  variant={language === 'en' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onLanguageChange('en')}
                  className="rounded-l-none"
                >
                  EN
                </Button>
              </div>
              
              <Button onClick={handleCreatePage} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                {language === 'en' ? 'New Page' : 'Новая страница'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder={language === 'en' ? 'Search pages...' : 'Поиск страниц...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-80"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">{language === 'en' ? 'All Statuses' : 'Все статусы'}</option>
              <option value="published">{language === 'en' ? 'Published' : 'Опубликованные'}</option>
              <option value="draft">{language === 'en' ? 'Drafts' : 'Черновики'}</option>
              <option value="archived">{language === 'en' ? 'Archived' : 'Архивные'}</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-500">
            {filteredPages.length} {language === 'en' ? 'pages' : 'страниц'}
          </div>
        </div>

        {/* Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPages.map((page) => (
            <Card key={page.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">
                      {page.title[language] || page.title.ru}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      /{page.slug[language] || page.slug.ru}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(page.status)}>
                      {getStatusText(page.status)}
                    </Badge>
                    
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {page.description[language] || page.description.ru || 
                   (language === 'en' ? 'No description' : 'Без описания')}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {page.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {page.updatedAt.toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Globe className="h-3 w-3 mr-1" />
                    {page.language.toUpperCase()}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPage(page)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    {language === 'en' ? 'Edit' : 'Редактировать'}
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Eye className="h-3 w-3" />
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Copy className="h-3 w-3" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeletePage(page.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">
              {language === 'en' ? 'No pages found' : 'Страницы не найдены'}
            </div>
            <p className="text-gray-500 text-sm">
              {language === 'en' 
                ? 'Create your first page to get started'
                : 'Создайте первую страницу для начала работы'
              }
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PageManager;