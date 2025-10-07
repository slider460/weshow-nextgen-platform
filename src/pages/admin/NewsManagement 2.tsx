import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { 
  Plus, 
  Eye, 
  Calendar, 
  User, 
  Tag, 
  Search,
  Filter,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  Edit,
  Trash2
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { News, NewsInsert } from '../../types/database';
import { getNews, createNews, updateNews, deleteNews, getNewsStats } from '../../api/news';
import ImageUpload from '../../components/ImageUpload';
import ImageDisplay from '../../components/ImageDisplay';

const NewsManagement: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    featured: 0
  });

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    author: '',
    image_url: '',
    tags: '',
    featured: false
  });

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'Технологии', label: 'Технологии' },
    { value: 'Проекты', label: 'Проекты' },
    { value: 'Карьера', label: 'Карьера' },
    { value: 'События', label: 'События' },
    { value: 'Компания', label: 'Компания' }
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Админ: Загружаем новости...');
      
      const [newsData, statsData] = await Promise.all([
        getNews({ status: 'published' }),
        getNewsStats()
      ]);
      
      console.log('📰 Админ: Получены новости:', newsData);
      console.log('📊 Админ: Получена статистика:', statsData);
      setNews(newsData);
      setStats(statsData);
    } catch (err: any) {
      console.error('❌ Админ: Ошибка загрузки новостей:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newsData: NewsInsert = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.content.substring(0, 150) + "...",
        category: formData.category,
        author: formData.author,
        image_url: formData.image_url && !formData.image_url.startsWith('blob:') ? formData.image_url : "/placeholder.svg",
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        featured: formData.featured,
        status: 'published'
      };

      console.log('📝 Создаем/обновляем новость:', newsData);

      if (editingNews) {
        await updateNews(editingNews.id, newsData);
        console.log('✅ Новость обновлена');
      } else {
        await createNews(newsData);
        console.log('✅ Новость создана');
      }

      // Принудительно обновляем список
      console.log('🔄 Обновляем список новостей...');
      await fetchNews();
      console.log('✅ Список обновлен');
      
      resetForm();
    } catch (err: any) {
      console.error('❌ Ошибка при создании/обновлении новости:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      category: newsItem.category,
      author: newsItem.author,
      image_url: newsItem.image_url || '',
      tags: newsItem.tags.join(', '),
      featured: newsItem.featured
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту новость?')) {
      try {
        console.log('🗑️ Удаляем новость с ID:', id);
        await deleteNews(id);
        console.log('✅ Новость успешно удалена');
        await fetchNews(); // Обновляем список
      } catch (err: any) {
        console.error('❌ Ошибка удаления:', err);
        setError(`Ошибка удаления: ${err.message}`);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      category: '',
      author: '',
      image_url: '',
      tags: '',
      featured: false
    });
    setEditingNews(null);
    setShowAddForm(false);
  };

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Загрузка новостей...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Управление новостями</h1>
          <p className="mt-2 text-gray-600">
            Создавайте, редактируйте и управляйте новостями сайта
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Поиск по новостям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="lg:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Добавить новость
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {editingNews ? 'Редактировать новость' : 'Добавить новость'}
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Заголовок *</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Введите заголовок новости"
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">Содержание *</Label>
                  <Textarea
                    id="content"
                    required
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Напишите содержание новости"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Категория *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите категорию" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Технологии">Технологии</SelectItem>
                        <SelectItem value="Проекты">Проекты</SelectItem>
                        <SelectItem value="Карьера">Карьера</SelectItem>
                        <SelectItem value="События">События</SelectItem>
                        <SelectItem value="Компания">Компания</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="author">Автор *</Label>
                    <Input
                      id="author"
                      required
                      value={formData.author}
                      onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="Имя автора"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <ImageUpload
                    value={formData.image_url}
                    onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                    placeholder="Выберите изображение для новости"
                  />
                  
                  <div>
                    <Label htmlFor="tags">Теги</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="тег1, тег2, тег3"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded"
                  />
                  <Label htmlFor="featured">Главная новость</Label>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button 
                    type="submit" 
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Сохранение...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {editingNews ? 'Сохранить изменения' : 'Опубликовать'}
                      </>
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Отмена
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* News List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <ImageDisplay
                  imageId={item.image_url}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                  fallbackSrc="/placeholder.svg"
                />
                {item.featured && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600">
                    <Star className="h-3 w-3 mr-1" />
                    Главная
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline">{item.category}</Badge>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{formatDate(item.published_at)}</span>
                </div>
                <CardTitle className="text-lg leading-tight line-clamp-2">
                  {item.title}
                </CardTitle>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {item.excerpt}
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {item.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {item.views}
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(item)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Редактировать
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Удалить
                  </Button>
                </div>
                
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📰</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Новости не найдены
            </h3>
            <p className="text-gray-600 mb-6">
              Попробуйте изменить параметры поиска или добавьте новую новость
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить новость
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsManagement;
