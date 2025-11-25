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
  Speaker,
  Projector,
  Gamepad,
  Zap
} from 'lucide-react';

interface EquipmentBlock {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  link: string;
  is_visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const EquipmentBlocksManagement: React.FC = () => {
  const [blocks, setBlocks] = useState<EquipmentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editingBlock, setEditingBlock] = useState<EquipmentBlock | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Иконки для маппинга
  const iconMap = {
    Monitor: Monitor,
    Speaker: Speaker,
    Eye: Eye,
    Projector: Projector,
    Gamepad: Gamepad,
    Zap: Zap
  };

  // Градиенты для маппинга
  const gradientMap = {
    'gradient-card-purple': 'from-purple-500 to-purple-700',
    'gradient-card-blue': 'from-blue-500 to-blue-700',
    'gradient-card-cyan': 'from-cyan-500 to-cyan-700',
    'gradient-card-dark': 'from-gray-800 to-gray-900',
    'gradient-card-green': 'from-green-500 to-green-700',
    'gradient-card-red': 'from-red-500 to-red-700',
    'gradient-card-yellow': 'from-yellow-500 to-yellow-700',
    'gradient-card-indigo': 'from-indigo-500 to-indigo-700'
  };

  useEffect(() => {
    loadBlocks();
  }, []);

  const loadBlocks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('homepage_equipment')
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
      gradient: 'gradient-card-purple',
      link: '',
      is_visible: true,
      sort_order: blocks.length + 1,
      created_at: '',
      updated_at: ''
    });
    setIsCreating(true);
  };

  const handleEdit = (block: EquipmentBlock) => {
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
          .from('homepage_equipment')
          .insert([{
            title: editingBlock.title,
            description: editingBlock.description,
            icon: editingBlock.icon,
            gradient: editingBlock.gradient,
            link: editingBlock.link,
            is_visible: editingBlock.is_visible,
            sort_order: editingBlock.sort_order
          }]);

        if (error) throw error;
        setSuccess('Блок успешно создан!');
      } else {
        const { error } = await supabase
          .from('homepage_equipment')
          .update({
            title: editingBlock.title,
            description: editingBlock.description,
            icon: editingBlock.icon,
            gradient: editingBlock.gradient,
            link: editingBlock.link,
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
        .from('homepage_equipment')
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
        .from('homepage_equipment')
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
          .from('homepage_equipment')
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
          .from('homepage_equipment')
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
          <h1 className="text-3xl font-bold text-gray-900">Управление блоками оборудования</h1>
          <p className="text-gray-600 mt-2">
            Редактируйте блоки оборудования, отображаемые на главной странице
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
          <AlertDescription>{error}</AlertDescription>
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
                  <option value="Speaker">Speaker</option>
                  <option value="Eye">Eye</option>
                  <option value="Projector">Projector</option>
                  <option value="Gamepad">Gamepad</option>
                  <option value="Zap">Zap</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Градиент
                </label>
                <select
                  value={editingBlock.gradient}
                  onChange={(e) => setEditingBlock({...editingBlock, gradient: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="gradient-card-purple">Фиолетовый</option>
                  <option value="gradient-card-blue">Синий</option>
                  <option value="gradient-card-cyan">Голубой</option>
                  <option value="gradient-card-dark">Темный</option>
                  <option value="gradient-card-green">Зеленый</option>
                  <option value="gradient-card-red">Красный</option>
                  <option value="gradient-card-yellow">Желтый</option>
                  <option value="gradient-card-indigo">Индиго</option>
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
          const gradientClass = gradientMap[block.gradient as keyof typeof gradientMap] || 'from-purple-500 to-purple-700';
          
          return (
            <Card key={block.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center">
                  {/* Превью блока */}
                  <div className={`w-32 h-24 ${gradientClass} flex items-center justify-center text-white`}>
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
                          <Badge variant={block.is_visible ? "default" : "secondary"}>
                            {block.is_visible ? "Видимый" : "Скрытый"}
                          </Badge>
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
            <p className="text-gray-500">Блоки оборудования не найдены</p>
            <Button onClick={handleCreate} className="mt-4">
              Создать первый блок
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EquipmentBlocksManagement;
