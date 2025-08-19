import React, { useState, useCallback } from 'react';
import { useAdmin } from '@/contexts/admin/AdminContext';
import { MediaFile } from '@/types/admin/portfolio';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Search, 
  Filter,
  Grid,
  List,
  Download,
  Trash2,
  Eye,
  Copy,
  MoreVertical,
  FolderOpen,
  Plus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const MediaLibrary: React.FC = () => {
  const { state, dispatch } = useAdmin();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Тестовые данные для медиафайлов
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: '1',
      name: 'hero-bg.jpg',
      url: '/placeholder.svg',
      thumbnail: '/placeholder.svg',
      type: 'image' as const,
      size: 2048576,
      dimensions: { width: 1920, height: 1080 },
      uploadedAt: new Date('2024-01-15'),
      uploadedBy: 'admin',
      order: 0,
    },
    {
      id: '2',
      name: 'showreel.mp4',
      url: '/placeholder.svg',
      thumbnail: '/placeholder.svg',
      type: 'video',
      size: 52428800,
      dimensions: { width: 1920, height: 1080 },
      uploadedAt: new Date('2024-01-20'),
      uploadedBy: 'admin',
      order: 1,
    },
    {
      id: '3',
      name: 'project-presentation.pdf',
      url: '/placeholder.svg',
      thumbnail: '/placeholder.svg',
      type: 'document',
      size: 1048576,
      uploadedAt: new Date('2024-01-18'),
      uploadedBy: 'admin',
      order: 2,
    },
  ]);

  const handleFileUpload = useCallback((files: FileList) => {
    setIsUploading(true);
    setUploadProgress(0);

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const newFile: MediaFile = {
          id: Date.now().toString() + index,
          name: file.name,
          url: e.target?.result as string,
          thumbnail: e.target?.result as string,
          type: file.type.startsWith('image/') ? 'image' : 
                file.type.startsWith('video/') ? 'video' : 'document',
          size: file.size,
          dimensions: file.type.startsWith('image/') ? { width: 1920, height: 1080 } : undefined,
          uploadedAt: new Date(),
          uploadedBy: state.currentUser?.username || 'admin',
          order: mediaFiles.length,
        };

        setMediaFiles(prev => [newFile, ...prev]);
        
        if (index === files.length - 1) {
          setIsUploading(false);
          setUploadProgress(100);
        }
      };

      reader.readAsDataURL(file);
    });
  }, [state.currentUser]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  }, [handleFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileUpload(files);
    }
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const deleteSelectedFiles = () => {
    setMediaFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
  };

  const copyFileUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || file.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-8 w-8 text-blue-500" />;
      case 'video':
        return <Video className="h-8 w-8 text-green-500" />;
      case 'document':
        return <FileText className="h-8 w-8 text-purple-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'image':
        return 'bg-blue-100 text-blue-800';
      case 'video':
        return 'bg-green-100 text-green-800';
      case 'document':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок и управление */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Медиа-библиотека</h2>
          <p className="text-gray-600">Управление изображениями, видео и документами</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={() => setSelectedFiles([])}>
            Снять выделение
          </Button>
          {selectedFiles.length > 0 && (
            <Button variant="destructive" onClick={deleteSelectedFiles}>
              <Trash2 className="h-4 w-4 mr-2" />
              Удалить ({selectedFiles.length})
            </Button>
          )}
        </div>
      </div>

      {/* Drag & Drop зона */}
      <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <CardContent className="p-8">
          <div
            className="text-center"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Перетащите файлы сюда или нажмите для выбора
            </h3>
            <p className="text-gray-500 mb-4">
              Поддерживаются изображения, видео и документы до 100MB
            </p>
            <Button onClick={() => document.getElementById('file-upload')?.click()}>
              <Plus className="h-4 w-4 mr-2" />
              Выбрать файлы
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Прогресс загрузки */}
      {isUploading && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm text-gray-600">Загрузка файлов...</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{uploadProgress}%</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Фильтры и поиск */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Поиск по названию файла..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Все типы</option>
                <option value="image">Изображения</option>
                <option value="video">Видео</option>
                <option value="document">Документы</option>
              </select>
              
              <div className="flex items-center space-x-1 border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <ImageIcon className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">
                  {mediaFiles.filter(f => f.type === 'image').length}
                </div>
                <div className="text-sm text-gray-500">Изображения</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold">
                  {mediaFiles.filter(f => f.type === 'video').length}
                </div>
                <div className="text-sm text-gray-500">Видео</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-2xl font-bold">
                  {mediaFiles.filter(f => f.type === 'document').length}
                </div>
                <div className="text-sm text-gray-500">Документы</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FolderOpen className="h-5 w-5 text-orange-500" />
              <div>
                <div className="text-2xl font-bold">
                  {formatFileSize(mediaFiles.reduce((sum, f) => sum + f.size, 0))}
                </div>
                <div className="text-sm text-gray-500">Общий размер</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Список файлов */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <Card 
              key={file.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedFiles.includes(file.id) ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => toggleFileSelection(file.id)}
            >
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  {file.type === 'image' ? (
                    <img 
                      src={file.thumbnail} 
                      alt={file.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    getFileIcon(file.type)
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getTypeColor(file.type)}>
                      {file.type === 'image' ? 'Изображение' : 
                       file.type === 'video' ? 'Видео' : 'Документ'}
                    </Badge>
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => toggleFileSelection(file.id)}
                      className="rounded border-gray-300"
                    />
                  </div>
                  
                  <h4 className="font-medium text-sm truncate" title={file.name}>
                    {file.name}
                  </h4>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>{formatFileSize(file.size)}</div>
                    {file.dimensions && (
                      <div>{file.dimensions.width} × {file.dimensions.height}</div>
                    )}
                    <div>{file.uploadedAt.toLocaleDateString('ru-RU')}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Файл
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Тип
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Размер
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Загружен
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFiles.map((file) => (
                    <tr 
                      key={file.id} 
                      className={`hover:bg-gray-50 cursor-pointer ${
                        selectedFiles.includes(file.id) ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => toggleFileSelection(file.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.id)}
                            onChange={() => toggleFileSelection(file.id)}
                            className="rounded border-gray-300 mr-3"
                          />
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              {getFileIcon(file.type)}
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{file.name}</div>
                              <div className="text-sm text-gray-500">{file.uploadedBy}</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={getTypeColor(file.type)}>
                          {file.type === 'image' ? 'Изображение' : 
                           file.type === 'video' ? 'Видео' : 'Документ'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatFileSize(file.size)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {file.uploadedAt.toLocaleDateString('ru-RU')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => window.open(file.url, '_blank')}>
                              <Eye className="h-4 w-4 mr-2" />
                              Просмотреть
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => copyFileUrl(file.url)}>
                              <Copy className="h-4 w-4 mr-2" />
                              Копировать URL
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Скачать
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => setMediaFiles(prev => prev.filter(f => f.id !== file.id))}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {filteredFiles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-gray-500">
              <FolderOpen className="mx-auto h-12 w-12 mb-4" />
              <h3 className="text-lg font-medium mb-2">Файлы не найдены</h3>
              <p>Попробуйте изменить фильтры поиска или загрузить новые файлы</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MediaLibrary;
