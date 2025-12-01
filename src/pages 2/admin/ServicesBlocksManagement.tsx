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
  Monitor,
  Smartphone,
  Users,
  Settings,
  Palette,
  Zap
} from 'lucide-react';

interface ServicesBlock {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
  features: string[];
  is_visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const ServicesBlocksManagement: React.FC = () => {
  const [blocks, setBlocks] = useState<ServicesBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingBlock, setEditingBlock] = useState<ServicesBlock | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Иконки для маппинга
  const iconMap = {
    Monitor: Monitor,
    Smartphone: Smartphone,
    Users: Users,
    Settings: Settings,
    Palette: Palette,
    Zap: Zap
  };

  // Цвета для маппинга
  const colorMap = {
    'from-blue-500 to-cyan-500': 'Синий-Голубой',
    'from-purple-500 to-pink-500': 'Фиолетовый-Розовый',
    'from-green-500 to-emerald-500': 'Зеленый-Изумрудный',
    'from-orange-500 to-red-500': 'Оранжевый-Красный',
    'from-indigo-500 to-purple-500': 'Индиго-Фиолетовый',
    'from-yellow-500 to-orange-500': 'Желтый-Оранжевый'
  };

  useEffect(() => {
    loadBlocks();
  }, []);

  const loadBlocks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('services_blocks')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setBlocks(data || []);
    } catch (err: any) {
      setError(`Ошибка загрузки блоков: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingBlock({
      id: '',
      title: '',
      description: '',
      icon: 'Monitor',
      color: 'from-blue-500 to-cyan-500',
      link: '',
      features: [],
      is_visible: true,
      sort_order: blocks.length + 1,
      created_at: '',
      updated_at: ''
    });
    setIsCreating(true);
  };

  const handleEdit = (block: ServicesBlock) => {
    setEditingBlock(block);
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!editingBlock) return;

    try {
      setError(null);
      setSuccess(null);

      if (isCreating) {
        const { error } = await supabase
          .from('services_blocks')
          .insert([{
            title: editingBlock.title,
            description: editingBlock.description,
            icon: editingBlock.icon,
            color: editingBlock.color,
            link: editingBlock.link,
            features: editingBlock.features,
            is_visible: editingBlock.is_visible,
            sort_order: editingBlock.sort_order
          }]);

        if (error) throw error;
        setSuccess('Блок успешно создан!');
      } else {
        const { error } = await supabase
          .from('services_blocks')
          .update({
            title: editingBlock.title,
            description: editingBlock.description,
            icon: editingBlock.icon,
            color: editingBlock.color,
            link: editingBlock.link,
            features: editingBlock.features,
            is_visible: editingBlock.is_visible,
            sort_order: editingBlock.sort_order
          })
          .eq('id', editingBlock.id);

        if (error) throw error;
        setSuccess('Блок успешно обновлен!');
      }

      setEditingBlock(null);
      setIsCreating(false);
      await loadBlocks();
    } catch (err: any) {
      setError(`Ошибка сохранения: ${err.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот блок?')) return;

    try {
      setError(null);
      setSuccess(null);

      const { error } = await supabase
        .from('services_blocks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setSuccess('Блок успешно удален!');
      await loadBlocks();
    } catch (err: any) {
      setError(`Ошибка удаления: ${err.message}`);
    }
  };

  const handleToggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      setError(null);
      setSuccess(null);

      const { error } = await supabase
        .from('services_blocks')
        .update({ is_visible: !currentVisibility })
        .eq('id', id);

      if (error) throw error;
      setSuccess(`Блок ${!currentVisibility ? 'показан' : 'скрыт'}!`);
      await loadBlocks();
    } catch (err: any) {
      setError(`Ошибка изменения видимости: ${err.message}`);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;

    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index - 1]] = [newBlocks[index - 1], newBlocks[index]];
    
    // Обновляем sort_order
    newBlocks.forEach((block, i) => {
      block.sort_order = i + 1;
    });

    try {
      setError(null);
      setSuccess(null);

      // Обновляем все блоки с новыми sort_order
      for (const block of newBlocks) {
        const { error } = await supabase
          .from('services_blocks')
          .update({ sort_order: block.sort_order })
          .eq('id', block.id);

        if (error) throw error;
      }

      setSuccess('Порядок блоков обновлен!');
      await loadBlocks();
    } catch (err: any) {
      setError(`Ошибка изменения порядка: ${err.message}`);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === blocks.length - 1) return;

    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
    
    // Обновляем sort_order
    newBlocks.forEach((block, i) => {
      block.sort_order = i + 1;
    });

    try {
      setError(null);
      setSuccess(null);

      // Обновляем все блоки с новыми sort_order
      for (const block of newBlocks) {
        const { error } = await supabase
          .from('services_blocks')
          .update({ sort_order: block.sort_order })
          .eq('id', block.id);

        if (error) throw error;
      }

      setSuccess('Порядок блоков обновлен!');
      await loadBlocks();
    } catch (err: any) {
      setError(`Ошибка изменения порядка: ${err.message}`);
    }
  };

  const addFeature = () => {
    if (!editingBlock) return;
    setEditingBlock({
      ...editingBlock,
      features: [...editingBlock.features, '']
    });
  };

  const updateFeature = (index: number, value: string) => {
    if (!editingBlock) return;
    const newFeatures = [...editingBlock.features];
    newFeatures[index] = value;
    setEditingBlock({
      ...editingBlock,
      features: newFeatures
    });
  };

  const removeFeature = (index: number) => {
    if (!editingBlock) return;
    const newFeatures = editingBlock.features.filter((_, i) => i !== index);
    setEditingBlock({
      ...editingBlock,
      features: newFeatures
    });
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
          <h1 className="text-3xl font-bold text-gray-900">Управление блоками услуг</h1>
          <p className="text-gray-600 mt-2">
            Редактируйте блоки услуг, отображаемые в разделе "Комплексные мультимедийные решения"
          </p>
        </div>
        <div className="flex items-center gap-3">
          <BackToAdminButton />
          <Button onClick={handleCreate} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Добавить блок
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
                    <a href="/copy-services-blocks-sql" target="_blank">
                      Скопировать SQL скрипт
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <a href="/create-services-blocks-table" target="_blank">
                      Автоматическое исправление
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
      {editingBlock && (
        <Card>
          <CardHeader>
            <CardTitle>
              {isCreating ? 'Создание нового блока' : 'Редактирование блока'}
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
                  value={editingBlock.title}
                  onChange={(e) => setEditingBlock({...editingBlock, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ссылка
                </label>
                <input
                  type="text"
                  value={editingBlock.link}
                  onChange={(e) => setEditingBlock({...editingBlock, link: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Описание
              </label>
              <textarea
                value={editingBlock.description}
                onChange={(e) => setEditingBlock({...editingBlock, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Иконка
                </label>
                <select
                  value={editingBlock.icon}
                  onChange={(e) => setEditingBlock({...editingBlock, icon: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Monitor">Monitor</option>
                  <option value="Smartphone">Smartphone</option>
                  <option value="Users">Users</option>
                  <option value="Settings">Settings</option>
                  <option value="Palette">Palette</option>
                  <option value="Zap">Zap</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Цвет
                </label>
                <select
                  value={editingBlock.color}
                  onChange={(e) => setEditingBlock({...editingBlock, color: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="from-blue-500 to-cyan-500">Синий-Голубой</option>
                  <option value="from-purple-500 to-pink-500">Фиолетовый-Розовый</option>
                  <option value="from-green-500 to-emerald-500">Зеленый-Изумрудный</option>
                  <option value="from-orange-500 to-red-500">Оранжевый-Красный</option>
                  <option value="from-indigo-500 to-purple-500">Индиго-Фиолетовый</option>
                  <option value="from-yellow-500 to-orange-500">Желтый-Оранжевый</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Порядок сортировки
                </label>
                <input
                  type="number"
                  value={editingBlock.sort_order}
                  onChange={(e) => setEditingBlock({...editingBlock, sort_order: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Особенности */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Особенности
              </label>
              <div className="space-y-2">
                {editingBlock.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Введите особенность"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addFeature}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить особенность
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingBlock.is_visible}
                  onChange={(e) => setEditingBlock({...editingBlock, is_visible: e.target.checked})}
                  className="rounded border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700">Видимый</span>
              </label>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                {isCreating ? 'Создать' : 'Сохранить'}
              </Button>
              <Button variant="outline" onClick={() => setEditingBlock(null)}>
                Отмена
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Список блоков */}
      <div className="space-y-4">
        {blocks.map((block, index) => {
          const IconComponent = iconMap[block.icon as keyof typeof iconMap] || Monitor;
          const colorClass = colorMap[block.color as keyof typeof colorMap] || 'Синий-Голубой';
          
          return (
            <Card key={block.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center">
                  {/* Превью блока */}
                  <div className={`w-32 h-24 bg-gradient-to-br ${block.color} flex items-center justify-center text-white`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  
                  {/* Информация о блоке */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{block.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{block.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>Ссылка: {block.link}</span>
                          <span>Порядок: {block.sort_order}</span>
                          <span>Цвет: {colorClass}</span>
                          <Badge variant={block.is_visible ? "default" : "secondary"}>
                            {block.is_visible ? "Видимый" : "Скрытый"}
                          </Badge>
                        </div>
                        <div className="mt-2">
                          <p className="text-xs text-gray-500 mb-1">Особенности:</p>
                          <div className="flex flex-wrap gap-1">
                            {block.features.map((feature, featureIndex) => (
                              <Badge key={featureIndex} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
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
                          disabled={index === blocks.length - 1}
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleVisibility(block.id, block.is_visible)}
                        >
                          {block.is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(block)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(block.id)}
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
          );
        })}
      </div>

      {blocks.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">Блоки услуг не найдены</p>
            <Button onClick={handleCreate} className="mt-4">
              Создать первый блок
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ServicesBlocksManagement;
