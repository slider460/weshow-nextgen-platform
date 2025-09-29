import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
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

interface CaseData {
  id: string;
  title: string;
  client: string;
  year: number;
  description: string;
  detailed_description?: string;
  image_url?: string;
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

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;

      // Обрабатываем results
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

        return {
          ...caseItem,
          results
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
      sort_order: cases.length + 1
    };
    setEditingCase(newCase);
    setIsCreating(true);
  };

  const handleEditCase = (caseItem: CaseData) => {
    setEditingCase({ ...caseItem });
    setIsCreating(false);
  };

  const handleSaveCase = async () => {
    if (!editingCase) return;

    try {
      setUploading(true);

      const caseData = {
        ...editingCase,
        results: JSON.stringify(editingCase.results),
        technologies_used: editingCase.technologies_used || [],
        awards: editingCase.awards || []
      };

      if (isCreating) {
        const { error } = await supabase
          .from('cases')
          .insert([caseData]);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cases')
          .update(caseData)
          .eq('id', editingCase.id);

        if (error) throw error;
      }

      await fetchCases();
      setEditingCase(null);
      setIsCreating(false);
    } catch (err) {
      console.error('Ошибка сохранения кейса:', err);
      setError('Ошибка сохранения кейса');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteCase = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот кейс?')) return;

    try {
      const { error } = await supabase
        .from('cases')
        .delete()
        .eq('id', id);

      if (error) throw error;

      await fetchCases();
    } catch (err) {
      console.error('Ошибка удаления кейса:', err);
      setError('Ошибка удаления кейса');
    }
  };

  const toggleVisibility = async (id: string, isVisible: boolean) => {
    try {
      const { error } = await supabase
        .from('cases')
        .update({ is_visible: !isVisible })
        .eq('id', id);

      if (error) throw error;

      await fetchCases();
    } catch (err) {
      console.error('Ошибка изменения видимости:', err);
      setError('Ошибка изменения видимости');
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('cases')
        .update({ featured: !featured })
        .eq('id', id);

      if (error) throw error;

      await fetchCases();
    } catch (err) {
      console.error('Ошибка изменения статуса:', err);
      setError('Ошибка изменения статуса');
    }
  };

  const handleImageUpload = async (file: File, type: 'main' | 'gallery') => {
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `cases/images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);

      if (editingCase) {
        if (type === 'main') {
          setEditingCase({ ...editingCase, image_url: data.publicUrl });
        } else {
          const newGallery = [...(editingCase.gallery_images || []), data.publicUrl];
          setEditingCase({ ...editingCase, gallery_images: newGallery });
        }
      }
    } catch (err) {
      console.error('Ошибка загрузки изображения:', err);
      setError('Ошибка загрузки изображения');
    } finally {
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
          <Button onClick={handleCreateCase} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Создать кейс
          </Button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <Tabs defaultValue="list" className="space-y-6">
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
                    <img
                      src={caseItem.image_url || '/placeholder.svg'}
                      alt={caseItem.title}
                      className="w-full h-48 object-cover"
                    />
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
                      value={editingCase.results.join('\n')}
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
                        {editingCase.image_url && (
                          <img 
                            src={editingCase.image_url} 
                            alt="Preview" 
                            className="w-20 h-20 object-cover rounded"
                          />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, 'main');
                          }}
                          className="hidden"
                          id="main-image"
                        />
                        <label 
                          htmlFor="main-image"
                          className="cursor-pointer"
                        >
                          <Button type="button" variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Загрузить
                          </Button>
                        </label>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Галерея изображений</label>
                      <div className="space-y-2">
                        {editingCase.gallery_images?.map((image, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <img src={image} alt={`Gallery ${index + 1}`} className="w-12 h-12 object-cover rounded" />
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
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, 'gallery');
                          }}
                          className="hidden"
                          id="gallery-image"
                        />
                        <label htmlFor="gallery-image">
                          <Button type="button" variant="outline" size="sm">
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Добавить в галерею
                          </Button>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      onClick={handleSaveCase} 
                      disabled={uploading}
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
