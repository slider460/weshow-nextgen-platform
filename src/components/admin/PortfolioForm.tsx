import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/contexts/admin/AdminContext';
import { PortfolioFormData, PortfolioItem, PORTFOLIO_LIMITS } from '@/types/admin/portfolio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import WYSIWYGEditor from './WYSIWYGEditor';
import SortableMediaGallery from './SortableMediaGallery';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Save, 
  Eye, 
  Plus, 
  X, 
  Image as ImageIcon,
  Video,
  FileText,
  Settings,
  Globe,
  Calendar,
  User,
  MapPin,
  Clock,
  DollarSign,
  Target,
  Code,
  Tag,
  Star
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const PortfolioForm: React.FC = () => {
  const { state, updatePortfolioItem, addPortfolioItem, setEditing } = useAdmin();
  const [formData, setFormData] = useState<PortfolioFormData>({
    title: '',
    subtitle: '',
    slug: '',
    category: '',
    description: '',
    shortDescription: '',
    content: '',
    coverImage: '',
    photos: [],
    videos: [],
    year: new Date().getFullYear().toString(),
    client: '',
    location: '',
    duration: '',
    budget: '',
    results: [''],
    technologies: [''],
    tags: [''],
    featured: false,
    status: 'draft',
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: [''],
    },
  });
  const [isPreview, setIsPreview] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (state.selectedItem) {
      setFormData({
        title: state.selectedItem.title,
        subtitle: state.selectedItem.subtitle,
        slug: state.selectedItem.slug,
        category: state.selectedItem.category,
        description: state.selectedItem.description,
        shortDescription: state.selectedItem.shortDescription,
        content: state.selectedItem.content,
        coverImage: state.selectedItem.coverImage,
        photos: state.selectedItem.photos,
        videos: state.selectedItem.videos,
        year: state.selectedItem.year,
        client: state.selectedItem.client || '',
        location: state.selectedItem.location || '',
        duration: state.selectedItem.duration || '',
        budget: state.selectedItem.budget || '',
        results: state.selectedItem.results,
        technologies: state.selectedItem.technologies,
        tags: state.selectedItem.tags,
        featured: state.selectedItem.featured,
        status: state.selectedItem.status,
        seo: state.selectedItem.seo,
      });
    }
  }, [state.selectedItem]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayFieldChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof PortfolioFormData].map((item: any, i: number) => 
        i === index ? value : item
      )
    }));
  };

  const addArrayFieldItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field as keyof PortfolioFormData], '']
    }));
  };

  const removeArrayFieldItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof PortfolioFormData].filter((_: any, i: number) => i !== index)
    }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const portfolioItem: PortfolioItem = {
      id: state.selectedItem?.id || Date.now().toString(),
      ...formData,
      thumbnail: formData.coverImage, // Используем coverImage как thumbnail
      gallery: [...formData.photos, ...formData.videos], // Объединяем фото и видео в галерею
      createdAt: state.selectedItem?.createdAt || new Date(),
      updatedAt: new Date(),
      publishedAt: formData.status === 'published' ? new Date() : undefined,
      author: state.currentUser?.username || 'admin',
      views: state.selectedItem?.views || 0,
      likes: state.selectedItem?.likes || 0,
      version: (state.selectedItem?.version || 0) + 1,
      previousVersions: state.selectedItem ? [
        ...(state.selectedItem.previousVersions || []),
        {
          id: Date.now().toString(),
          version: state.selectedItem.version || 0,
          data: { ...state.selectedItem },
          createdAt: new Date(),
          createdBy: state.currentUser?.username || 'admin',
        }
      ] : [],
    };

    if (state.selectedItem) {
      updatePortfolioItem(portfolioItem);
    } else {
      addPortfolioItem(portfolioItem);
    }
    
    setEditing(false);
  };

  const handleSaveDraft = () => {
    setFormData(prev => ({ ...prev, status: 'draft' }));
  };

  const handlePublish = () => {
    setFormData(prev => ({ ...prev, status: 'published' }));
  };

  if (isPreview) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Предпросмотр проекта</h3>
          <Button variant="outline" onClick={() => setIsPreview(false)}>
            <X className="h-4 w-4 mr-2" />
            Закрыть предпросмотр
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              {formData.coverImage ? (
                <img src={formData.coverImage} alt={formData.title} className="w-full h-full object-cover rounded-lg" />
              ) : (
                <ImageIcon className="h-12 w-12 text-gray-400" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{formData.title}</h2>
            <p className="text-gray-600 mb-4">{formData.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
              <div>Год: {formData.year}</div>
              <div>Клиент: {formData.client || 'Не указан'}</div>
              <div>Локация: {formData.location || 'Не указана'}</div>
              <div>Длительность: {formData.duration || 'Не указана'}</div>
            </div>
            
            {formData.technologies.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Технологии:</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech, index) => (
                    <Badge key={index} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {formData.results.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Результаты:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {formData.results.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Основное</TabsTrigger>
          <TabsTrigger value="content">Контент</TabsTrigger>
          <TabsTrigger value="media">Медиа</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Основная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Название проекта *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Введите название проекта"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL slug *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange('slug', e.target.value)}
                      placeholder="url-slug"
                      required
                    />
                    <Button type="button" variant="outline" onClick={generateSlug}>
                      Генерировать
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Категория *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  >
                    <option value="">Выберите категорию</option>
                    {state.categories.map(category => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="year">Год *</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    min="2000"
                    max={new Date().getFullYear() + 1}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="shortDescription">Краткое описание *</Label>
                <Textarea
                  id="shortDescription"
                  value={formData.shortDescription}
                  onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                  placeholder="Краткое описание для карточки проекта"
                  rows={2}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Полное описание *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Подробное описание проекта"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="client">Клиент</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => handleInputChange('client', e.target.value)}
                    placeholder="Название клиента"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Локация</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Место проведения"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Длительность</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="Например: 3 месяца"
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Бюджет</Label>
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    placeholder="Например: 2.5M ₽"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Детальный контент
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="content">Основной контент</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Подробное описание проекта, результаты, особенности..."
                  rows={8}
                />
              </div>

              <div>
                <Label>Результаты проекта</Label>
                <div className="space-y-2">
                  {formData.results.map((result, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={result}
                        onChange={(e) => handleArrayFieldChange('results', index, e.target.value)}
                        placeholder={`Результат ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayFieldItem('results', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayFieldItem('results')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить результат
                  </Button>
                </div>
              </div>

              <div>
                <Label>Технологии</Label>
                <div className="space-y-2">
                  {formData.technologies.map((tech, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={tech}
                        onChange={(e) => handleArrayFieldChange('technologies', index, e.target.value)}
                        placeholder={`Технология ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayFieldItem('technologies', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayFieldItem('technologies')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить технологию
                  </Button>
                </div>
              </div>

              <div>
                <Label>Теги</Label>
                <div className="space-y-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={tag}
                        onChange={(e) => handleArrayFieldChange('tags', index, e.target.value)}
                        placeholder={`Тег ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayFieldItem('tags', index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addArrayFieldItem('tags')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить тег
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ImageIcon className="h-5 w-5 mr-2" />
                Медиафайлы
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="coverImage">Обложка проекта *</Label>
                <Input
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={(e) => handleInputChange('coverImage', e.target.value)}
                  placeholder="URL обложки проекта"
                  required
                />
              </div>

              <SortableMediaGallery
                type="photos"
                files={formData.photos.map((url, index) => ({
                  id: `photo-${index}`,
                  name: `Фото ${index + 1}`,
                  url,
                  thumbnail: url,
                  type: 'image' as const,
                  size: 0,
                  uploadedAt: new Date(),
                  uploadedBy: 'admin',
                  order: index,
                }))}
                onFilesChange={(files) => handleInputChange('photos', files.map(f => f.url))}
                onFileRemove={(fileId) => {
                  const index = parseInt(fileId.split('-')[1]);
                  const newPhotos = formData.photos.filter((_, i) => i !== index);
                  handleInputChange('photos', newPhotos);
                }}
                onFileAdd={(files) => {
                  // Здесь должна быть логика загрузки файлов
                  console.log('Добавление фото:', files);
                }}
                maxFiles={PORTFOLIO_LIMITS.MAX_PHOTOS}
              />

              <SortableMediaGallery
                type="videos"
                files={formData.videos.map((url, index) => ({
                  id: `video-${index}`,
                  name: `Видео ${index + 1}`,
                  url,
                  thumbnail: url,
                  type: 'video' as const,
                  size: 0,
                  uploadedAt: new Date(),
                  uploadedBy: 'admin',
                  order: index,
                }))}
                onFilesChange={(files) => handleInputChange('videos', files.map(f => f.url))}
                onFileRemove={(fileId) => {
                  const index = parseInt(fileId.split('-')[1]);
                  const newVideos = formData.videos.filter((_, i) => i !== index);
                  handleInputChange('videos', newVideos);
                }}
                onFileAdd={(files) => {
                  // Здесь должна быть логика загрузки файлов
                  console.log('Добавление видео:', files);
                }}
                maxFiles={PORTFOLIO_LIMITS.MAX_VIDEOS}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                SEO настройки
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={formData.seo.metaTitle}
                  onChange={(e) => handleInputChange('seo', { ...formData.seo, metaTitle: e.target.value })}
                  placeholder="SEO заголовок страницы"
                />
              </div>

              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={formData.seo.metaDescription}
                  onChange={(e) => handleInputChange('seo', { ...formData.seo, metaDescription: e.target.value })}
                  placeholder="SEO описание страницы"
                  rows={3}
                />
              </div>

              <div>
                <Label>Ключевые слова</Label>
                <div className="space-y-2">
                  {formData.seo.keywords.map((keyword, index) => (
                    <div key={index} className="flex space-x-2">
                      <Input
                        value={keyword}
                        onChange={(e) => {
                          const newKeywords = [...formData.seo.keywords];
                          newKeywords[index] = e.target.value;
                          handleInputChange('seo', { ...formData.seo, keywords: newKeywords });
                        }}
                        placeholder={`Ключевое слово ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newKeywords = formData.seo.keywords.filter((_, i) => i !== index);
                          handleInputChange('seo', { ...formData.seo, keywords: newKeywords });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      const newKeywords = [...formData.seo.keywords, ''];
                      handleInputChange('seo', { ...formData.seo, keywords: newKeywords });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Добавить ключевое слово
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Настройки публикации
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="status">Статус публикации</Label>
                  <p className="text-sm text-gray-500">Выберите статус для проекта</p>
                </div>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="draft">Черновик</option>
                  <option value="published">Опубликован</option>
                  <option value="archived">Архив</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleInputChange('featured', checked)}
                />
                <Label htmlFor="featured">Избранный проект</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between items-center pt-6 border-t">
        <div className="flex space-x-3">
          <Button type="button" variant="outline" onClick={() => setIsPreview(true)}>
            <Eye className="h-4 w-4 mr-2" />
            Предпросмотр
          </Button>
          <Button type="button" variant="outline" onClick={handleSaveDraft}>
            <Save className="h-4 w-4 mr-2" />
            Сохранить черновик
          </Button>
          <Button type="button" variant="outline" onClick={handlePublish}>
            <Globe className="h-4 w-4 mr-2" />
            Опубликовать
          </Button>
        </div>
        
        <div className="flex space-x-3">
          <Button type="button" variant="outline" onClick={() => setEditing(false)}>
            Отмена
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Сохранить проект
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PortfolioForm;
