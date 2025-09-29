import React, { useState, useEffect } from 'react';
import { supabase } from '../../config/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import BackToAdminButton from '../../components/admin/BackToAdminButton';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown,
  Upload,
  Image as ImageIcon,
  Video,
  ExternalLink
} from 'lucide-react';

interface Case {
  id: string;
  title: string;
  description: string;
  client: string;
  year: number;
  image_url: string | null;
  video_url: string | null;
  results: string | null;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const CasesManagement: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingCase, setEditingCase] = useState<Case | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('cases')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCases(data || []);
    } catch (err: any) {
      setError(`Ошибка загрузки кейсов: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCase({
      id: '',
      title: '',
      description: '',
      client: '',
      year: new Date().getFullYear(),
      image_url: null,
      video_url: null,
      results: '',
      is_visible: true,
      sort_order: cases.length + 1,
      created_at: '',
      updated_at: ''
    });
    setIsCreating(true);
  };

  const handleEdit = (caseItem: Case) => {
    setEditingCase(caseItem);
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!editingCase) return;

    try {
      setError(null);
      setSuccess(null);

      if (isCreating) {
        const { error } = await supabase
          .from('cases')
          .insert([{
            title: editingCase.title,
            description: editingCase.description,
            client: editingCase.client,
            year: editingCase.year,
            image_url: editingCase.image_url,
            video_url: editingCase.video_url,
            results: editingCase.results,
            is_visible: editingCase.is_visible,
            sort_order: editingCase.sort_order
          }]);

        if (error) throw error;
        setSuccess('Кейс успешно создан!');
      } else {
        const { error } = await supabase
          .from('cases')
          .update({
            title: editingCase.title,
            description: editingCase.description,
            client: editingCase.client,
            year: editingCase.year,
            image_url: editingCase.image_url,
            video_url: editingCase.video_url,
            results: editingCase.results,
            is_visible: editingCase.is_visible,
            sort_order: editingCase.sort_order
          })
          .eq('id', editingCase.id);

        if (error) throw error;
        setSuccess('Кейс успешно обновлен!');
      }

      setEditingCase(null);
      setIsCreating(false);
      await loadCases();
    } catch (err: any) {
      setError(`Ошибка сохранения: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот кейс?')) return;

    try {
      setError(null);
      setSuccess(null);

      const { error } = await supabase
        .from('cases')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('Кейс успешно удален!');
      await loadCases();
    } catch (err: any) {
      setError(`Ошибка удаления: ${err.message}`);
    }
  };

  const handleToggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      setError(null);
      setSuccess(null);

      const { error } = await supabase
        .from('cases')
        .update({ is_visible: !currentVisibility })
        .eq('id', id);

      if (error) throw error;
      setSuccess(`Кейс ${!currentVisibility ? 'показан' : 'скрыт'}!`);
      await loadCases();
    } catch (err: any) {
      setError(`Ошибка изменения видимости: ${err.message}`);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;

    const newCases = [...cases];
    [newCases[index], newCases[index - 1]] = [newCases[index - 1], newCases[index]];
    
    // Обновляем sort_order
    newCases.forEach((caseItem, i) => {
      caseItem.sort_order = i + 1;
    });

    try {
      setError(null);
      setSuccess(null);

      // Обновляем все кейсы с новыми sort_order
      for (const caseItem of newCases) {
        const { error } = await supabase
          .from('cases')
          .update({ sort_order: caseItem.sort_order })
          .eq('id', caseItem.id);

        if (error) throw error;
      }

      setSuccess('Порядок кейсов обновлен!');
      await loadCases();
    } catch (err: any) {
      setError(`Ошибка изменения порядка: ${err.message}`);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === cases.length - 1) return;

    const newCases = [...cases];
    [newCases[index], newCases[index + 1]] = [newCases[index + 1], newCases[index]];
    
    // Обновляем sort_order
    newCases.forEach((caseItem, i) => {
      caseItem.sort_order = i + 1;
    });

    try {
      setError(null);
      setSuccess(null);

      // Обновляем все кейсы с новыми sort_order
      for (const caseItem of newCases) {
        const { error } = await supabase
          .from('cases')
          .update({ sort_order: caseItem.sort_order })
          .eq('id', caseItem.id);

        if (error) throw error;
      }

      setSuccess('Порядок кейсов обновлен!');
      await loadCases();
    } catch (err: any) {
      setError(`Ошибка изменения порядка: ${err.message}`);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      setError(null);

      // Создаем уникальное имя файла
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `cases/images/${fileName}`;

      // Загружаем файл в Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Получаем публичный URL
      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);

      if (editingCase) {
        setEditingCase({
          ...editingCase,
          image_url: publicUrl
        });
      }

      setSuccess('Изображение успешно загружено!');
    } catch (err: any) {
      setError(`Ошибка загрузки изображения: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleVideoUpload = async (file: File) => {
    try {
      setUploadingVideo(true);
      setError(null);

      // Создаем уникальное имя файла
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `cases/videos/${fileName}`;

      // Загружаем файл в Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('public')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Получаем публичный URL
      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);

      if (editingCase) {
        setEditingCase({
          ...editingCase,
          video_url: publicUrl
        });
      }

      setSuccess('Видео успешно загружено!');
    } catch (err: any) {
      setError(`Ошибка загрузки видео: ${err.message}`);
    } finally {
      setUploadingVideo(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Управление кейсами</h1>
          <p className="text-gray-600 mt-2">
            Редактируйте кейсы, отображаемые в разделе "Наши проекты"
          </p>
        </div>
        <div className="flex items-center gap-3">
          <BackToAdminButton />
          <Button asChild variant="outline" size="sm" className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
            <a href="/test-cases-display" target="_blank">
              👁️ Тест отображения
            </a>
          </Button>
          <Button onClick={handleCreate} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Добавить кейс
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>
            {error}
            {error.includes('Could not find the table') && (
              <div className="mt-4">
                <p className="text-sm mb-2">Для исправления этой ошибки:</p>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <a href="/copy-cases-sql" target="_blank">
                      Скопировать SQL скрипт
                    </a>
                  </Button>
                </div>
              </div>
            )}
            {error.includes('Bucket not found') && (
              <div className="mt-4">
                <p className="text-sm mb-2">Для исправления ошибки загрузки файлов:</p>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <a href="/setup-supabase-storage" target="_blank">
                      Настроить Storage
                    </a>
                  </Button>
                </div>
              </div>
            )}
            {error.includes('row-level security policy') && (
              <div className="mt-4">
                <p className="text-sm mb-2">Для исправления ошибки RLS политик:</p>
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <a href="/copy-cases-sql" target="_blank">
                      Исправить RLS для кейсов
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <a href="/setup-supabase-storage" target="_blank">
                      Настроить Storage политики
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-800">{success}</AlertDescription>
        </Alert>
      )}

      {/* Форма редактирования */}
      {editingCase && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isCreating ? 'Создание нового кейса' : 'Редактирование кейса'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Заголовок
                </label>
                <input
                  type="text"
                  value={editingCase.title}
                  onChange={(e) => setEditingCase({...editingCase, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Клиент
                </label>
                <input
                  type="text"
                  value={editingCase.client}
                  onChange={(e) => setEditingCase({...editingCase, client: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Год
                </label>
                <input
                  type="number"
                  value={editingCase.year}
                  onChange={(e) => setEditingCase({...editingCase, year: parseInt(e.target.value) || new Date().getFullYear()})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Порядок сортировки
                </label>
                <input
                  type="number"
                  value={editingCase.sort_order}
                  onChange={(e) => setEditingCase({...editingCase, sort_order: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание
              </label>
              <textarea
                value={editingCase.description}
                onChange={(e) => setEditingCase({...editingCase, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Результаты
              </label>
              <textarea
                value={editingCase.results || ''}
                onChange={(e) => setEditingCase({...editingCase, results: e.target.value})}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Опишите результаты проекта"
              />
            </div>

            {/* Загрузка изображения */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Изображение
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4" />
                  {uploadingImage ? 'Загрузка...' : 'Загрузить изображение'}
                </label>
                {editingCase.image_url && (
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Изображение загружено</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(editingCase.image_url!, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Загрузка видео */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Видео
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleVideoUpload(file);
                  }}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4" />
                  {uploadingVideo ? 'Загрузка...' : 'Загрузить видео'}
                </label>
                {editingCase.video_url && (
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Видео загружено</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(editingCase.video_url!, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingCase.is_visible}
                  onChange={(e) => setEditingCase({...editingCase, is_visible: e.target.checked})}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Видимый</span>
              </label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                {isCreating ? 'Создать' : 'Сохранить'}
              </Button>
              <Button variant="outline" onClick={() => setEditingCase(null)}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Список кейсов */}
      <div className="space-y-4">
        {cases.map((caseItem, index) => (
          <Card key={caseItem.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center">
                {/* Превью кейса */}
                <div className="w-48 h-32 bg-gray-200 flex items-center justify-center">
                  {caseItem.image_url ? (
                    <img
                      src={caseItem.image_url}
                      alt={caseItem.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                      <span className="text-sm">Нет изображения</span>
                    </div>
                  )}
                </div>
                
                {/* Информация о кейсе */}
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{caseItem.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{caseItem.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>Клиент: {caseItem.client}</span>
                        <span>Год: {caseItem.year}</span>
                        <span>Порядок: {caseItem.sort_order}</span>
                        <Badge variant={caseItem.is_visible ? "default" : "secondary"}>
                          {caseItem.is_visible ? "Видимый" : "Скрытый"}
                        </Badge>
                      </div>
                      {caseItem.results && (
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Результаты:</p>
                          <p className="text-sm text-gray-700">{caseItem.results}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        {caseItem.image_url && (
                          <div className="flex items-center gap-1 text-xs text-green-600">
                            <ImageIcon className="h-3 w-3" />
                            Изображение
                          </div>
                        )}
                        {caseItem.video_url && (
                          <div className="flex items-center gap-1 text-xs text-blue-600">
                            <Video className="h-3 w-3" />
                            Видео
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Действия */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveUp(index)}
                        disabled={index === 0}
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveDown(index)}
                        disabled={index === cases.length - 1}
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleVisibility(caseItem.id, caseItem.is_visible)}
                      >
                        {caseItem.is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(caseItem)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(caseItem.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {cases.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">Кейсы не найдены</p>
            <Button onClick={handleCreate} className="mt-4">
              Создать первый кейс
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CasesManagement;
