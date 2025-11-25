import React, { useState, useRef } from 'react';
import { useLogos } from '../../contexts/LogosContextDB';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
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
  AlertCircle,
  Download,
  Upload as UploadIcon,
  RotateCcw
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

const LogosManagement = () => {
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
  const importInputRef = useRef<HTMLInputElement>(null);
  
  const [newLogoData, setNewLogoData] = useState({
    name: '',
    category: 'other' as const,
    website: '',
    description: ''
  });

  const [editingData, setEditingData] = useState({
    name: '',
    category: 'other' as const,
    website: '',
    description: ''
  });

  const categories = [
    { value: 'banking', label: 'Банки' },
    { value: 'energy', label: 'Энергетика' },
    { value: 'telecom', label: 'Телеком' },
    { value: 'tech', label: 'Технологии' },
    { value: 'aviation', label: 'Авиация' },
    { value: 'other', label: 'Другое' }
  ];

  const handleAddLogo = () => {
    if (!newLogoData.name.trim()) {
      return;
    }
    
    addLogo({
      ...newLogoData,
      logoUrl: '/placeholder.svg',
      isActive: true
    });
    
    setNewLogoData({
      name: '',
      category: 'other',
      website: '',
      description: ''
    });
    setIsAddingLogo(false);
  };

  const handleEditLogo = (logoId: string) => {
    const logo = state.logos.find(l => l.id === logoId);
    if (logo) {
      setEditingData({
        name: logo.name,
        category: logo.category,
        website: logo.website || '',
        description: logo.description || ''
      });
      setEditingLogo(logoId);
    }
  };

  const handleSaveEdit = () => {
    if (editingLogo && editingData.name.trim()) {
      updateLogo(editingLogo, editingData);
      setEditingLogo(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingLogo(null);
    setEditingData({
      name: '',
      category: 'other',
      website: '',
      description: ''
    });
  };

  const handleDeleteLogo = (logoId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот логотип?')) {
      deleteLogo(logoId);
    }
  };

  const handleFileUpload = (file: File) => {
    if (newLogoData.name.trim()) {
      uploadLogo(file, newLogoData);
      setNewLogoData({
        name: '',
        category: 'other',
        website: '',
        description: ''
      });
      setIsAddingLogo(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
      reorderLogos(dragIndex, dragOverIndex);
    }
    setDragIndex(null);
    setDragOverIndex(null);
  };

  const handleImport = (file: File) => {
    importLogos(file);
  };

  const activeLogos = getActiveLogos();
  const inactiveLogos = state.logos.filter(logo => !logo.isActive);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Управление логотипами</h1>
            <p className="text-slate-600 mt-2">Управляйте логотипами компаний в блоке "Нам доверяют"</p>
          </div>
          <div className="flex gap-4">
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
            >
              <UploadIcon className="w-4 h-4 mr-2" />
              Загрузить логотип
            </Button>
            <Button 
              onClick={() => setIsAddingLogo(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить логотип
            </Button>
          </div>
        </div>

        {state.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <p className="text-red-600">{state.error}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearError}
              className="ml-auto"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">
              Активные логотипы ({activeLogos.length})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Неактивные логотипы ({inactiveLogos.length})
            </TabsTrigger>
            <TabsTrigger value="settings">
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeLogos.map((logo, index) => (
                <Card key={logo.id} className="overflow-hidden">
                  <div className="relative">
                    <div className="aspect-square bg-slate-100 flex items-center justify-center p-4">
                      {logo.logoUrl && logo.logoUrl !== '/placeholder.svg' ? (
                        <img 
                          src={logo.logoUrl} 
                          alt={logo.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <span className="text-slate-400 text-sm">LOGO</span>
                      )}
                    </div>
                    
                    {/* Drag Handle */}
                    <div 
                      className="absolute top-2 left-2 cursor-move opacity-0 hover:opacity-100 transition-opacity"
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                    >
                      <GripVertical className="w-4 h-4 text-slate-500" />
                    </div>

                    {/* Actions */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditLogo(logo.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleLogoActive(logo.id)}
                        className="h-8 w-8 p-0"
                      >
                        <EyeOff className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteLogo(logo.id)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{logo.name}</h3>
                    <div className="space-y-2">
                      <Badge variant="secondary" className="text-xs">
                        {categories.find(c => c.value === logo.category)?.label}
                      </Badge>
                      {logo.website && (
                        <div className="flex items-center text-xs text-slate-600">
                          <Globe className="w-3 h-3 mr-1" />
                          <a 
                            href={logo.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            Сайт
                          </a>
                        </div>
                      )}
                      {logo.description && (
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {logo.description}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inactive">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {inactiveLogos.map((logo) => (
                <Card key={logo.id} className="overflow-hidden opacity-60">
                  <div className="aspect-square bg-slate-100 flex items-center justify-center p-4">
                    {logo.logoUrl && logo.logoUrl !== '/placeholder.svg' ? (
                      <img 
                        src={logo.logoUrl} 
                        alt={logo.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <span className="text-slate-400 text-sm">LOGO</span>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{logo.name}</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleLogoActive(logo.id)}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Активировать
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteLogo(logo.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Экспорт и импорт</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Button onClick={exportLogos} variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Экспортировать данные
                    </Button>
                    <Button 
                      onClick={() => importInputRef.current?.click()}
                      variant="outline"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Импортировать данные
                    </Button>
                  </div>
                  <p className="text-sm text-slate-600">
                    Экспортируйте данные для резервного копирования или импортируйте ранее сохраненные данные.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Сброс к значениям по умолчанию</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={resetToDefaults}
                    variant="destructive"
                    className="w-full"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Сбросить все логотипы
                  </Button>
                  <p className="text-sm text-slate-600 mt-2">
                    Внимание: это действие нельзя отменить. Все текущие логотипы будут заменены на значения по умолчанию.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add Logo Modal */}
        {isAddingLogo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Добавить логотип</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Название компании</Label>
                  <Input
                    id="name"
                    value={newLogoData.name}
                    onChange={(e) => setNewLogoData({ ...newLogoData, name: e.target.value })}
                    placeholder="Введите название компании"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Категория</Label>
                  <Select
                    value={newLogoData.category}
                    onValueChange={(value: any) => setNewLogoData({ ...newLogoData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="website">Сайт компании</Label>
                  <Input
                    id="website"
                    value={newLogoData.website}
                    onChange={(e) => setNewLogoData({ ...newLogoData, website: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={newLogoData.description}
                    onChange={(e) => setNewLogoData({ ...newLogoData, description: e.target.value })}
                    placeholder="Краткое описание компании"
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1"
                    disabled={!newLogoData.name.trim()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Загрузить изображение
                  </Button>
                  <Button 
                    onClick={handleAddLogo}
                    variant="outline"
                    disabled={!newLogoData.name.trim()}
                  >
                    Без изображения
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => setIsAddingLogo(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Logo Modal */}
        {editingLogo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Редактировать логотип</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="edit-name">Название компании</Label>
                  <Input
                    id="edit-name"
                    value={editingData.name}
                    onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
                    placeholder="Введите название компании"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-category">Категория</Label>
                  <Select
                    value={editingData.category}
                    onValueChange={(value: any) => setEditingData({ ...editingData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="edit-website">Сайт компании</Label>
                  <Input
                    id="edit-website"
                    value={editingData.website}
                    onChange={(e) => setEditingData({ ...editingData, website: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-description">Описание</Label>
                  <Textarea
                    id="edit-description"
                    value={editingData.description}
                    onChange={(e) => setEditingData({ ...editingData, description: e.target.value })}
                    placeholder="Краткое описание компании"
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSaveEdit}
                    className="flex-1"
                    disabled={!editingData.name.trim()}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Сохранить
                  </Button>
                  <Button 
                    onClick={handleCancelEdit}
                    variant="outline"
                    className="flex-1"
                  >
                    Отмена
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFileUpload(file);
          }}
          className="hidden"
        />
        
        <input
          ref={importInputRef}
          type="file"
          accept=".json"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImport(file);
          }}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default LogosManagement;
