import React, { useMemo, useCallback, useState, useRef } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Eye, 
  EyeOff, 
  GripVertical,
  Globe,
  FileText,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { useLogos } from '../contexts/LogosContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const LogosManager = React.memo(() => {
  const { 
    state, 
    addLogo, 
    updateLogo, 
    deleteLogo, 
    selectLogo, 
    reorderLogos, 
    toggleLogoActive,
    uploadLogo,
    getActiveLogos, 
    clearError,
    exportLogos,
    importLogos,
    resetToDefaults
  } = useLogos();
  
  const [isAddingLogo, setIsAddingLogo] = useState(false);
  const [editingLogo, setEditingLogo] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newLogoData, setNewLogoData] = useState({
    name: '',
    category: 'other' as const,
    website: '',
    description: ''
  });

  const categories = useMemo(() => [
    { value: 'banking', label: 'Банкинг' },
    { value: 'energy', label: 'Энергетика' },
    { value: 'telecom', label: 'Телеком' },
    { value: 'tech', label: 'Технологии' },
    { value: 'aviation', label: 'Авиация' },
    { value: 'other', label: 'Другое' }
  ], []);

  const activeLogos = useMemo(() => getActiveLogos(), [getActiveLogos]);

  const handleAddLogo = useCallback(() => {
    setIsAddingLogo(true);
    setNewLogoData({
      name: '',
      category: 'other',
      website: '',
      description: ''
    });
    // ✅ Context7 оптимизация: очищаем ошибки при открытии формы
    clearError();
  }, [clearError]);

  const handleCancelAdd = useCallback(() => {
    setIsAddingLogo(false);
    setNewLogoData({
      name: '',
      category: 'other',
      website: '',
      description: ''
    });
  }, []);

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    // ✅ Context7 оптимизация: валидация перед загрузкой
    if (!file) {
      console.error('Файл не выбран');
      return;
    }

    if (!newLogoData.name.trim()) {
      alert('Пожалуйста, введите название компании перед загрузкой файла');
      return;
    }

    try {
      await uploadLogo(file, {
        ...newLogoData,
        isActive: true
      });
      
      // ✅ Context7 оптимизация: сброс формы после успешной загрузки
      setIsAddingLogo(false);
      setNewLogoData({
        name: '',
        category: 'other',
        website: '',
        description: ''
      });
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Ошибка при загрузке логотипа. Попробуйте еще раз.');
    }
  }, [newLogoData, uploadLogo]);

  const handleEditLogo = useCallback((logoId: string) => {
    setEditingLogo(logoId);
  }, []);

  const handleSaveEdit = useCallback((logoId: string, updates: any) => {
    updateLogo(logoId, updates);
    setEditingLogo(null);
  }, [updateLogo]);

  const handleCancelEdit = useCallback(() => {
    setEditingLogo(null);
  }, []);

  const handleDeleteLogo = useCallback((logoId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот логотип?')) {
      deleteLogo(logoId);
    }
  }, [deleteLogo]);

  const handleDragStart = useCallback((index: number) => {
    setDragIndex(index);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (dragIndex !== null && dragIndex !== dropIndex) {
      reorderLogos(dragIndex, dropIndex);
    }
    setDragIndex(null);
    setDragOverIndex(null);
  }, [dragIndex, reorderLogos]);

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setDragOverIndex(null);
  }, []);

  const renderLogoItem = useCallback((logo: any, index: number) => {
    const isEditing = editingLogo === logo.id;
    const isDragging = dragIndex === index;
    const isDragOver = dragOverIndex === index;

    return (
      <div
        key={logo.id}
        draggable
        onDragStart={() => handleDragStart(index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDrop={(e) => handleDrop(e, index)}
        onDragEnd={handleDragEnd}
        className={`
          relative bg-white border-2 rounded-2xl p-4 transition-all duration-300
          ${isDragging ? 'opacity-50 scale-95' : ''}
          ${isDragOver ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:border-slate-300'}
          ${!logo.isActive ? 'opacity-60' : ''}
        `}
      >
        {/* Drag Handle */}
        <div className="absolute top-2 right-2 cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4 text-slate-400" />
        </div>

        {/* Logo Image */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
            {logo.logoUrl && logo.logoUrl !== '/placeholder.svg' ? (
              <img 
                src={logo.logoUrl} 
                alt={logo.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-xs font-medium text-slate-600">LOGO</span>
            )}
          </div>
        </div>

        {/* Logo Info */}
        {isEditing ? (
          <div className="space-y-3">
            <div>
              <Label htmlFor={`name-${logo.id}`}>Название</Label>
              <Input
                id={`name-${logo.id}`}
                value={logo.name}
                onChange={(e) => updateLogo(logo.id, { name: e.target.value })}
                className="text-sm"
              />
            </div>
            <div>
              <Label htmlFor={`category-${logo.id}`}>Категория</Label>
              <Select
                value={logo.category}
                onValueChange={(value) => updateLogo(logo.id, { category: value as any })}
              >
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={() => handleSaveEdit(logo.id, {})}
                className="flex-1"
              >
                <Check className="w-4 h-4 mr-1" />
                Сохранить
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancelEdit}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-1" />
                Отмена
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h4 className="font-semibold text-slate-800 mb-2">{logo.name}</h4>
            <div className="text-xs text-slate-500 mb-3">
              {categories.find(cat => cat.value === logo.category)?.label}
            </div>
            
            {/* Actions */}
            <div className="flex justify-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEditLogo(logo.id)}
                className="h-8 w-8 p-0"
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toggleLogoActive(logo.id)}
                className={`h-8 w-8 p-0 ${logo.isActive ? 'text-green-600' : 'text-slate-400'}`}
              >
                {logo.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDeleteLogo(logo.id)}
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }, [editingLogo, dragIndex, dragOverIndex, categories, updateLogo, toggleLogoActive, handleEditLogo, handleSaveEdit, handleCancelEdit, handleDeleteLogo, handleDragStart, handleDragOver, handleDrop, handleDragEnd]);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Управление логотипами</h3>
          <p className="text-slate-600">Добавляйте, редактируйте и упорядочивайте логотипы партнеров</p>
          <div className="text-sm text-green-600 mt-1 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Автосохранение включено - все изменения сохраняются автоматически
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={exportLogos} variant="outline" size="sm">
            📤 Экспорт
          </Button>
          <Button onClick={() => document.getElementById('import-input')?.click()} variant="outline" size="sm">
            📥 Импорт
          </Button>
          <Button onClick={resetToDefaults} variant="outline" size="sm" className="text-orange-600 hover:text-orange-700">
            🔄 Сброс
          </Button>
          <Button onClick={handleAddLogo} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />Добавить логотип
          </Button>
        </div>
      </div>
      
      {/* Скрытый input для импорта */}
      <input 
        id="import-input"
        type="file" 
        accept=".json" 
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            importLogos(file);
            e.target.value = '';
          }
        }} 
        className="hidden" 
      />

      {/* Add Logo Form */}
      {isAddingLogo && (
        <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-200">
          <h4 className="font-semibold text-slate-800 mb-4">Новый логотип</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="logo-name">Название компании *</Label>
              <Input
                id="logo-name"
                value={newLogoData.name}
                onChange={(e) => setNewLogoData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Введите название компании"
              />
            </div>
            
            <div>
              <Label htmlFor="logo-category">Категория</Label>
              <Select
                value={newLogoData.category}
                onValueChange={(value) => setNewLogoData(prev => ({ ...prev, category: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="logo-website">Веб-сайт</Label>
              <Input
                id="logo-website"
                value={newLogoData.website}
                onChange={(e) => setNewLogoData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="logo-description">Описание</Label>
              <Input
                id="logo-description"
                value={newLogoData.description}
                onChange={(e) => setNewLogoData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Краткое описание"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <input 
              ref={fileInputRef} 
              type="file" 
              accept="image/*,.svg" 
              onChange={handleFileSelect} 
              className="hidden" 
            />
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              variant="outline" 
              disabled={!newLogoData.name.trim()}
              className="flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Выбрать файл</span>
            </Button>
            <div className="text-sm text-slate-500">
              <div>Поддерживаемые форматы: PNG, JPG, SVG</div>
              <div>Максимальный размер: 5MB</div>
              {!newLogoData.name.trim() && (
                <div className="text-orange-600 font-medium">
                  ⚠️ Сначала введите название компании
                </div>
              )}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={handleCancelAdd}
              variant="outline"
            >
              Отмена
            </Button>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {state.isUploading && (
        <div className="bg-blue-50 rounded-2xl p-4 mb-8 border border-blue-200">
          <div className="flex items-center space-x-3 mb-2">
            <Upload className="w-5 h-5 text-blue-600 animate-pulse" />
            <span className="text-blue-800 font-medium">Загрузка логотипа...</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${state.uploadProgress}%` }}
            ></div>
          </div>
          <div className="text-sm text-blue-600 mt-1">
            {state.uploadProgress}% завершено
          </div>
        </div>
      )}

      {/* Error Display */}
      {state.error && (
        <div className="bg-red-50 rounded-2xl p-4 mb-8 border border-red-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800 font-medium">{state.error}</span>
            </div>
            <Button 
              onClick={() => clearError()} 
              variant="ghost" 
              size="sm"
              className="text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-2 text-sm text-red-600">
            Попробуйте выбрать другой файл или обратитесь к администратору
          </div>
        </div>
      )}

      {/* Logos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeLogos.map((logo, index) => renderLogoItem(logo, index))}
      </div>

      {/* Empty State */}
      {activeLogos.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-400" />
          </div>
          <h4 className="text-lg font-medium text-slate-600 mb-2">
            Логотипы не найдены
          </h4>
          <p className="text-slate-500">
            Добавьте первый логотип партнера, чтобы начать
          </p>
        </div>
      )}
    </div>
  );
});

export default LogosManager;
