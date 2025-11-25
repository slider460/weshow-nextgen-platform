import React, { useEffect, useRef, useState } from 'react';
import { MediaFile } from '../../types/admin/portfolio';
import { PORTFOLIO_LIMITS } from '../../types/admin/portfolio';
import Sortable from 'sortablejs';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Upload, 
  X, 
  GripVertical,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface SortableMediaGalleryProps {
  type: 'photos' | 'videos';
  files: MediaFile[];
  onFilesChange: (files: MediaFile[]) => void;
  onFileRemove: (fileId: string) => void;
  onFileAdd: (files: FileList) => void;
  maxFiles: number;
  className?: string;
}

const SortableMediaGallery: React.FC<SortableMediaGalleryProps> = ({
  type,
  files,
  onFilesChange,
  onFileRemove,
  onFileAdd,
  maxFiles,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sortableRef = useRef<Sortable | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (containerRef.current && !sortableRef.current) {
      sortableRef.current = Sortable.create(containerRef.current, {
        animation: 150,
        handle: '.drag-handle',
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        onEnd: (evt) => {
          const newFiles = [...files];
          const [removed] = newFiles.splice(evt.oldIndex!, 1);
          newFiles.splice(evt.newIndex!, 0, removed);
          
          // Обновляем порядок
          const updatedFiles = newFiles.map((file, index) => ({
            ...file,
            order: index,
          }));
          
          onFilesChange(updatedFiles);
        },
      });
    }

    return () => {
      if (sortableRef.current) {
        sortableRef.current.destroy();
        sortableRef.current = null;
      }
    };
  }, [files, onFilesChange]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileValidation(droppedFiles);
    }
  };

  const handleFileValidation = (newFiles: FileList) => {
    const errors: string[] = [];
    
    if (files.length + newFiles.length > maxFiles) {
      errors.push(`Максимальное количество ${type === 'photos' ? 'фото' : 'видео'}: ${maxFiles}`);
    }

    // Проверяем типы файлов
    Array.from(newFiles).forEach((file) => {
      if (type === 'photos' && !file.type.startsWith('image/')) {
        errors.push(`${file.name} не является изображением`);
      }
      if (type === 'videos' && !file.type.startsWith('video/')) {
        errors.push(`${file.name} не является видео`);
      }
      
      // Проверяем размер файла (максимум 50MB)
      if (file.size > 50 * 1024 * 1024) {
        errors.push(`${file.name} слишком большой (максимум 50MB)`);
      }
    });

    if (errors.length > 0) {
      setErrors(errors);
      setTimeout(() => setErrors([]), 5000);
      return;
    }

    onFileAdd(newFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      handleFileValidation(selectedFiles);
    }
  };

  const getFileIcon = (file: MediaFile) => {
    switch (file.type) {
      case 'image':
        return <ImageIcon className="h-8 w-8 text-blue-500" />;
      case 'video':
        return <Video className="h-8 w-8 text-green-500" />;
      default:
        return <FileText className="h-8 w-8 text-purple-500" />;
    }
  };

  const getTypeColor = (file: MediaFile) => {
    switch (file.type) {
      case 'image':
        return 'bg-blue-100 text-blue-800';
      case 'video':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-purple-100 text-purple-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isAtLimit = files.length >= maxFiles;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Заголовок и счетчик */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            {type === 'photos' ? 'Фотографии' : 'Видео'}
          </h3>
          <p className="text-sm text-gray-500">
            {files.length} из {maxFiles} файлов
          </p>
        </div>
        
        {!isAtLimit && (
          <Button
            variant="outline"
            onClick={() => document.getElementById(`${type}-upload`)?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Добавить {type === 'photos' ? 'фото' : 'видео'}
          </Button>
        )}
      </div>

      {/* Ошибки */}
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Drag & Drop зона */}
      {!isAtLimit && (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Перетащите файлы сюда
          </h4>
          <p className="text-gray-500 mb-4">
            или нажмите кнопку для выбора файлов
          </p>
          <Button
            variant="outline"
            onClick={() => document.getElementById(`${type}-upload`)?.click()}
          >
            Выбрать файлы
          </Button>
        </div>
      )}

      {/* Скрытый input для выбора файлов */}
      <input
        id={`${type}-upload`}
        type="file"
        multiple
        accept={type === 'photos' ? 'image/*' : 'video/*'}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Список файлов */}
      {files.length > 0 && (
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {files.map((file, index) => (
            <Card key={file.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={getTypeColor(file)}>
                    {file.type === 'image' ? 'Изображение' : 'Видео'}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <div className="drag-handle cursor-move p-1 hover:bg-gray-100 rounded">
                      <GripVertical className="h-4 w-4 text-gray-400" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onFileRemove(file.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>

                <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                  {file.type === 'image' ? (
                    <img
                      src={file.thumbnail}
                      alt={file.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    getFileIcon(file)
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm truncate" title={file.name}>
                    {file.name}
                  </h4>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>{formatFileSize(file.size)}</div>
                    {file.dimensions && (
                      <div>{file.dimensions.width} × {file.dimensions.height}</div>
                    )}
                    <div>Порядок: {file.order + 1}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Предупреждение о лимите */}
      {isAtLimit && (
        <Alert>
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-700">
            Достигнут лимит файлов. Удалите некоторые файлы, чтобы добавить новые.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SortableMediaGallery;
