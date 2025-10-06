import React, { useState, useEffect } from 'react';
import { getCases, createCase, updateCase, deleteCase } from '../../api/adminRest';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Star, 
  StarOff, 
  Upload, 
  Image as ImageIcon, 
  Video,
  Save,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Создаем админ клиент для загрузки файлов
const SUPABASE_URL = 'https://zbykhdjqrtqftfitbvbt.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpieWtoZGpxcnRxZnRmaXRidmJ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTEzOTMyMywiZXhwIjoyMDc0NzE1MzIzfQ.KOCzZQGNqpGmuXxhuCjAtUPcD8qHr9Alti_uVejrRFs';

const adminSupabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

interface CaseData {
  id: string;
  title: string;
  client: string;
  year: number;
  description: string;
  detailed_description?: string;
  image_url?: string;
  video_url?: string;
  gallery_images?: string[];
  gallery_videos?: string[];
  results: string[];
  technologies_used?: string[];
  project_duration?: string;
  team_size?: number;
  budget_range?: string;
  challenges?: string;
  solutions?: string;
  project_scope?: string;
  client_feedback?: string;
  awards?: string[];
  case_study_url?: string;
  featured?: boolean;
  is_visible: boolean;
  sort_order: number;
}

const CaseManagement = () => {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCase, setEditingCase] = useState<CaseData | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('list');

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const data = await getCases();

      // Обрабатываем results и другие поля
      const processedCases = data.map(caseItem => {
        let results = [];
        if (Array.isArray(caseItem.results)) {
          results = caseItem.results;
        } else if (typeof caseItem.results === 'string' && caseItem.results.trim()) {
          try {
            const parsed = JSON.parse(caseItem.results);
            if (Array.isArray(parsed)) {
              results = parsed;
            } else {
              results = caseItem.results.split(/[\n,;]/).map(r => r.trim()).filter(r => r.length > 0);
            }
          } catch {
            results = caseItem.results.split(/[\n,;]/).map(r => r.trim()).filter(r => r.length > 0);
          }
        }

        // Обрабатываем technologies_used
        let technologies_used = [];
        if (Array.isArray(caseItem.technologies_used)) {
          technologies_used = caseItem.technologies_used;
        } else if (typeof caseItem.technologies_used === 'string' && caseItem.technologies_used.trim()) {
          try {
            const parsed = JSON.parse(caseItem.technologies_used);
            if (Array.isArray(parsed)) {
              technologies_used = parsed;
            }
          } catch {
            technologies_used = caseItem.technologies_used.split(',').map(t => t.trim()).filter(t => t.length > 0);
          }
        }

        // Обрабатываем awards
        let awards = [];
        if (Array.isArray(caseItem.awards)) {
          awards = caseItem.awards;
        } else if (typeof caseItem.awards === 'string' && caseItem.awards.trim()) {
          try {
            const parsed = JSON.parse(caseItem.awards);
            if (Array.isArray(parsed)) {
              awards = parsed;
            }
          } catch {
            awards = caseItem.awards.split(',').map(a => a.trim()).filter(a => a.length > 0);
          }
        }

        // Обрабатываем gallery_images
        let gallery_images = [];
        if (Array.isArray(caseItem.gallery_images)) {
          gallery_images = caseItem.gallery_images;
        } else if (typeof caseItem.gallery_images === 'string' && caseItem.gallery_images.trim()) {
          try {
            const parsed = JSON.parse(caseItem.gallery_images);
            if (Array.isArray(parsed)) {
              gallery_images = parsed;
            }
          } catch {
            // Если не удается распарсить, считаем пустым массивом
          }
        }

        // Обрабатываем gallery_videos
        let gallery_videos = [];
        if (Array.isArray(caseItem.gallery_videos)) {
          gallery_videos = caseItem.gallery_videos;
        } else if (typeof caseItem.gallery_videos === 'string' && caseItem.gallery_videos.trim()) {
          try {
            const parsed = JSON.parse(caseItem.gallery_videos);
            if (Array.isArray(parsed)) {
              gallery_videos = parsed;
            }
          } catch {
            // Если не удается распарсить, считаем пустым массивом
          }
        }

        return {
          ...caseItem,
          results,
          technologies_used,
          awards,
          gallery_images,
          gallery_videos
        };
      });

      setCases(processedCases);
    } catch (err) {
      console.error('Ошибка загрузки кейсов:', err);
      setError('Ошибка загрузки кейсов');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCase = () => {
    const newCase: CaseData = {
      id: '',
      title: '',
      client: '',
      year: new Date().getFullYear(),
      description: '',
      detailed_description: '',
      image_url: '',
      video_url: '',
      gallery_images: [],
      gallery_videos: [],
      results: [],
      technologies_used: [],
      project_duration: '3-6 месяцев',
      team_size: 5,
      budget_range: 'Средний',
      challenges: '',
      solutions: '',
      project_scope: '',
      client_feedback: '',
      awards: [],
      case_study_url: '',
      featured: false,
      is_visible: true,
      sort_order: (cases?.length || 0) + 1
    };
    setEditingCase(newCase);
    setIsCreating(true);
    setActiveTab('edit');
  };

  const handleEditCase = (caseItem: CaseData) => {
    setEditingCase({ ...caseItem });
    setIsCreating(false);
    setActiveTab('edit');
  };

  const handleSaveCase = async () => {
    console.log('🔄 handleSaveCase вызван');
    
    if (!editingCase) {
      console.log('❌ editingCase отсутствует');
      return;
    }

    console.log('📋 editingCase:', editingCase);

    // Валидация обязательных полей
    if (!editingCase.title?.trim()) {
      setError('Название кейса обязательно для заполнения');
      return;
    }
    
    if (!editingCase.client?.trim()) {
      setError('Клиент обязателен для заполнения');
      return;
    }
    
    if (!editingCase.description?.trim()) {
      setError('Описание обязательно для заполнения');
      return;
    }

    console.log('✅ Валидация пройдена');

    try {
      console.log('⏳ Устанавливаем uploading = true');
      setUploading(true);

      // Подготавливаем данные для сохранения
      const caseData = {
        title: editingCase.title,
        description: editingCase.description,
        detailed_description: editingCase.detailed_description || '',
        client: editingCase.client,
        year: editingCase.year,
        image_url: editingCase.image_url || null,
        video_url: editingCase.video_url || null,
        results: editingCase.results.length > 0 ? JSON.stringify(editingCase.results) : null,
        is_visible: editingCase.is_visible,
        sort_order: editingCase.sort_order,
        featured: editingCase.featured || false,
        gallery_images: editingCase.gallery_images && editingCase.gallery_images.length > 0 ? editingCase.gallery_images : null,
        gallery_videos: editingCase.gallery_videos && editingCase.gallery_videos.length > 0 ? editingCase.gallery_videos : null,
        project_duration: editingCase.project_duration || '',
        team_size: editingCase.team_size || null,
        budget_range: editingCase.budget_range || '',
        challenges: editingCase.challenges || '',
        solutions: editingCase.solutions || '',
        technologies_used: editingCase.technologies_used && editingCase.technologies_used.length > 0 ? editingCase.technologies_used : null,
        project_scope: editingCase.project_scope || '',
        client_feedback: editingCase.client_feedback || '',
        awards: editingCase.awards && editingCase.awards.length > 0 ? editingCase.awards : null,
        case_study_url: editingCase.case_study_url || null,
        updated_at: new Date().toISOString()
      };

      console.log('📤 Подготовленные данные для сохранения:', caseData);

      // Добавляем created_at только для новых кейсов
      if (isCreating) {
        caseData.created_at = new Date().toISOString();
      }

      if (isCreating) {
        console.log('🆕 Создаю новый кейс:', caseData);
        const result = await createCase(caseData);
        console.log('✅ Кейс создан:', result);
      } else {
        console.log('🔄 Обновляю кейс:', editingCase.id, caseData);
        const result = await updateCase(editingCase.id, caseData);
        console.log('✅ Кейс обновлен:', result);
      }

      // Обновляем список кейсов с таймаутом
      try {
        await Promise.race([
          fetchCases(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Таймаут обновления списка')), 5000))
        ]);
      } catch (err) {
        console.warn('Таймаут обновления списка кейсов:', err);
        // Продолжаем выполнение даже если обновление списка не удалось
      }
      
      setEditingCase(null);
      setIsCreating(false);
      setActiveTab('list');
      setError(null); // Очищаем ошибки при успешном сохранении
    } catch (err) {
      console.error('❌ Ошибка сохранения кейса:', err);
      setError(`Ошибка сохранения кейса: ${err.message || err}`);
    } finally {
      console.log('🏁 Завершение handleSaveCase, устанавливаем uploading = false');
      setUploading(false);
    }
  };

  const handleDeleteCase = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот кейс?')) return;

    try {
      await deleteCase(id);
      // Обновляем список с таймаутом
      try {
        await Promise.race([
          fetchCases(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Таймаут обновления списка')), 5000))
        ]);
      } catch (err) {
        console.warn('Таймаут обновления списка после удаления:', err);
      }
    } catch (err) {
      console.error('Ошибка удаления кейса:', err);
      setError('Ошибка удаления кейса');
    }
  };

  const toggleVisibility = async (id: string, isVisible: boolean) => {
    try {
      await updateCase(id, { is_visible: !isVisible });
      // Обновляем список с таймаутом
      try {
        await Promise.race([
          fetchCases(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Таймаут обновления списка')), 5000))
        ]);
      } catch (err) {
        console.warn('Таймаут обновления списка после изменения видимости:', err);
      }
    } catch (err) {
      console.error('Ошибка изменения видимости:', err);
      setError('Ошибка изменения видимости');
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      await updateCase(id, { featured: !featured });
      // Обновляем список с таймаутом
      try {
        await Promise.race([
          fetchCases(),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Таймаут обновления списка')), 5000))
        ]);
      } catch (err) {
        console.warn('Таймаут обновления списка после изменения статуса:', err);
      }
    } catch (err) {
      console.error('Ошибка изменения статуса:', err);
      setError('Ошибка изменения статуса');
    }
  };

  const handleImageUpload = async (file: File, type: 'main' | 'gallery') => {
    console.log('🖼️ handleImageUpload вызван:', file.name, 'тип:', type);
    
    try {
      console.log('⏳ Устанавливаем uploading = true для загрузки изображения');
      setUploading(true);
      setError(null); // Очищаем предыдущие ошибки
      
      console.log('📁 Файл для загрузки:', {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      });
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `cases/images/${fileName}`;

      console.log('📂 Путь для загрузки:', filePath);
      console.log('🔗 adminSupabase клиент:', adminSupabase ? 'существует' : 'отсутствует');

      console.log('📤 Начинаем загрузку в Supabase Storage...');
      const { data: uploadData, error: uploadError } = await adminSupabase.storage
        .from('public')
        .upload(filePath, file);

      if (uploadError) {
        console.error('❌ Ошибка загрузки файла:', uploadError);
        throw uploadError;
      }

      console.log('✅ Файл загружен:', uploadData);

      console.log('🔗 Получаем публичный URL...');
      const { data: urlData } = adminSupabase.storage
        .from('public')
        .getPublicUrl(filePath);

      console.log('🌐 Публичный URL:', urlData.publicUrl);

      if (editingCase) {
        console.log('📝 Обновляем editingCase...');
        if (type === 'main') {
          const updatedCase = { ...editingCase, image_url: urlData.publicUrl };
          setEditingCase(updatedCase);
          console.log('✅ Основное изображение установлено:', urlData.publicUrl);
        } else {
          const newGallery = [...(editingCase.gallery_images || []), urlData.publicUrl];
          const updatedCase = { ...editingCase, gallery_images: newGallery };
          setEditingCase(updatedCase);
          console.log('✅ Изображение добавлено в галерею:', urlData.publicUrl);
        }
      } else {
        console.warn('⚠️ editingCase отсутствует, не можем обновить URL изображения');
      }
    } catch (err) {
      console.error('❌ Ошибка загрузки изображения:', err);
      setError(`Ошибка загрузки изображения: ${err.message || err}`);
    } finally {
      console.log('🏁 Завершение handleImageUpload, устанавливаем uploading = false');
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Загрузка кейсов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Управление кейсами</h1>
          <div className="flex gap-4">
            <Button 
              onClick={() => {
                console.log('🔍 Диагностика состояния:');
                console.log('📋 cases:', cases?.length || 0);
                console.log('⏳ loading:', loading);
                console.log('❌ error:', error);
                console.log('📝 editingCase:', editingCase?.title || 'нет');
                console.log('⏳ uploading:', uploading);
                console.log('➕ isCreating:', isCreating);
              }}
              variant="outline"
            >
              🔍 Диагностика
            </Button>
            <Button onClick={handleCreateCase} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Создать кейс
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="list">Список кейсов</TabsTrigger>
            <TabsTrigger value="edit" disabled={!editingCase}>
              {isCreating ? 'Создание кейса' : 'Редактирование'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem) => (
                <Card key={caseItem.id} className="overflow-hidden">
                  <div className="relative">
                    {caseItem.image_url ? (
                      <img
                        src={caseItem.image_url}
                        alt={caseItem.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          console.error('Ошибка загрузки изображения:', caseItem.image_url);
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <div className="text-4xl mb-2">📷</div>
                          <div className="text-sm">Нет изображения</div>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2">
                      {caseItem.featured && (
                        <Badge className="bg-yellow-500">
                          <Star className="w-3 h-3 mr-1" />
                          Рекомендуемый
                        </Badge>
                      )}
                      <Badge variant={caseItem.is_visible ? "default" : "secondary"}>
                        {caseItem.is_visible ? 'Видимый' : 'Скрытый'}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{caseItem.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {caseItem.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                      <span>{caseItem.client}</span>
                      <span>{caseItem.year}</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditCase(caseItem)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleVisibility(caseItem.id, caseItem.is_visible)}
                      >
                        {caseItem.is_visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleFeatured(caseItem.id, caseItem.featured || false)}
                      >
                        {caseItem.featured ? <StarOff className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <Link to={`/case/${caseItem.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteCase(caseItem.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="edit">
            {editingCase && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isCreating ? 'Создание нового кейса' : 'Редактирование кейса'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Название</label>
                      <Input
                        value={editingCase.title}
                        onChange={(e) => setEditingCase({ ...editingCase, title: e.target.value })}
                        placeholder="Название проекта"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Клиент</label>
                      <Input
                        value={editingCase.client}
                        onChange={(e) => setEditingCase({ ...editingCase, client: e.target.value })}
                        placeholder="Название клиента"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Год</label>
                      <Input
                        type="number"
                        value={editingCase.year}
                        onChange={(e) => setEditingCase({ ...editingCase, year: parseInt(e.target.value) })}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Длительность проекта</label>
                      <Input
                        value={editingCase.project_duration || ''}
                        onChange={(e) => setEditingCase({ ...editingCase, project_duration: e.target.value })}
                        placeholder="3-6 месяцев"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Краткое описание</label>
                    <Textarea
                      value={editingCase.description}
                      onChange={(e) => setEditingCase({ ...editingCase, description: e.target.value })}
                      placeholder="Краткое описание проекта"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Подробное описание</label>
                    <Textarea
                      value={editingCase.detailed_description || ''}
                      onChange={(e) => setEditingCase({ ...editingCase, detailed_description: e.target.value })}
                      placeholder="Подробное описание проекта с техническими деталями"
                      rows={5}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Вызовы</label>
                      <Textarea
                        value={editingCase.challenges || ''}
                        onChange={(e) => setEditingCase({ ...editingCase, challenges: e.target.value })}
                        placeholder="Основные вызовы проекта"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Решения</label>
                      <Textarea
                        value={editingCase.solutions || ''}
                        onChange={(e) => setEditingCase({ ...editingCase, solutions: e.target.value })}
                        placeholder="Наши решения"
                        rows={3}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Результаты (по одному на строку)</label>
                    <Textarea
                      value={(editingCase.results || []).join('\n')}
                      onChange={(e) => setEditingCase({ 
                        ...editingCase, 
                        results: e.target.value.split('\n').filter(r => r.trim()) 
                      })}
                      placeholder="Результат 1&#10;Результат 2&#10;Результат 3"
                      rows={4}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Технологии (через запятую)</label>
                    <Input
                      value={(editingCase.technologies_used || []).join(', ')}
                      onChange={(e) => setEditingCase({ 
                        ...editingCase, 
                        technologies_used: e.target.value.split(',').map(t => t.trim()).filter(t => t) 
                      })}
                      placeholder="React, Node.js, Supabase"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Отзыв клиента</label>
                    <Textarea
                      value={editingCase.client_feedback || ''}
                      onChange={(e) => setEditingCase({ ...editingCase, client_feedback: e.target.value })}
                      placeholder="Отзыв клиента о проекте"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Основное изображение</label>
                      <div className="flex items-center gap-4">
                        {editingCase.image_url ? (
                          <img 
                            src={editingCase.image_url} 
                            alt="Preview" 
                            className="w-20 h-20 object-cover rounded"
                            onError={(e) => {
                              console.error('Ошибка загрузки превью:', editingCase.image_url);
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
                            <div className="text-center text-gray-500">
                              <div className="text-2xl">📷</div>
                            </div>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            console.log('📁 Файл выбран для основного изображения');
                            const file = e.target.files?.[0];
                            if (file) {
                              console.log('📄 Выбранный файл:', file.name, file.size, 'байт');
                              handleImageUpload(file, 'main');
                            } else {
                              console.log('❌ Файл не выбран');
                            }
                          }}
                          className="hidden"
                          id="main-image"
                          disabled={false}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            console.log('🖱️ Кнопка загрузки изображения нажата');
                            const input = document.getElementById('main-image') as HTMLInputElement;
                            if (input) {
                              console.log('📋 Input найден, открываем диалог выбора файла');
                              input.click();
                            } else {
                              console.log('❌ Input не найден');
                            }
                          }}
                          disabled={uploading}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {uploading ? 'Загрузка...' : 'Загрузить'}
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Галерея изображений</label>
                      <div className="space-y-2">
                        {editingCase.gallery_images?.map((image, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <img 
                              src={image} 
                              alt={`Gallery ${index + 1}`} 
                              className="w-12 h-12 object-cover rounded"
                              onError={(e) => {
                                console.error('Ошибка загрузки изображения галереи:', image);
                                (e.target as HTMLImageElement).src = '/placeholder.svg';
                              }}
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                const newGallery = editingCase.gallery_images?.filter((_, i) => i !== index) || [];
                                setEditingCase({ ...editingCase, gallery_images: newGallery });
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            console.log('📁 Файл выбран для галереи');
                            const file = e.target.files?.[0];
                            if (file) {
                              console.log('📄 Выбранный файл для галереи:', file.name, file.size, 'байт');
                              handleImageUpload(file, 'gallery');
                            } else {
                              console.log('❌ Файл для галереи не выбран');
                            }
                          }}
                          className="hidden"
                          id="gallery-image"
                          disabled={uploading}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            console.log('🖱️ Кнопка загрузки в галерею нажата');
                            const input = document.getElementById('gallery-image') as HTMLInputElement;
                            if (input) {
                              console.log('📋 Input галереи найден, открываем диалог выбора файла');
                              input.click();
                            } else {
                              console.log('❌ Input галереи не найден');
                            }
                          }}
                          disabled={uploading}
                        >
                          <ImageIcon className="w-4 h-4 mr-2" />
                          {uploading ? 'Загрузка...' : 'Добавить в галерею'}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      onClick={() => {
                        console.log('🖱️ Кнопка "Сохранить" нажата');
                        console.log('📋 editingCase:', editingCase);
                        console.log('⏳ uploading:', uploading);
                        handleSaveCase();
                      }} 
                      disabled={uploading}
                      title={uploading ? 'Идет сохранение...' : 'Сохранить изменения'}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {uploading ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setEditingCase(null);
                        setIsCreating(false);
                        setActiveTab('list');
                      }}
                    >
                      Отмена
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CaseManagement;
