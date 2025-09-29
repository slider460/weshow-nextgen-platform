import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { 
  Upload, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Image as ImageIcon, 
  Video, 
  File,
  Trash2,
  Download,
  Eye,
  X
} from 'lucide-react';
import { MediaFile } from '../../../types/cms/content';

interface MediaLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (file: MediaFile) => void;
  allowMultiple?: boolean;
  fileTypes?: ('image' | 'video' | 'document')[];
}

const MediaLibrary: React.FC<MediaLibraryProps> = ({
  isOpen,
  onClose,
  onSelect,
  allowMultiple = false,
  fileTypes = ['image', 'video', 'document']
}) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<MediaFile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock data - in real app this would come from API
  useEffect(() => {
    if (isOpen) {
      // Simulate API call
      setFiles([
        {
          id: '1',
          name: 'hero-image.jpg',
          url: '/api/media/hero-image.jpg',
          thumbnail: '/api/media/thumbnails/hero-image.jpg',
          type: 'image',
          size: 2048576,
          dimensions: { width: 1920, height: 1080 },
          uploadedAt: new Date('2024-01-01'),
          uploadedBy: 'admin',
          alt: { ru: 'Фон героя', en: 'Hero section background' }
        },
        {
          id: '2',
          name: 'promo-video.mp4',
          url: '/api/media/promo-video.mp4',
          thumbnail: '/api/media/thumbnails/promo-video.jpg',
          type: 'video',
          size: 15728640,
          dimensions: { width: 1920, height: 1080 },
          uploadedAt: new Date('2024-01-02'),
          uploadedBy: 'admin',
          alt: { ru: 'Промо видео компании', en: 'Company promotional video' }
        },
        {
          id: '3',
          name: 'company-profile.pdf',
          url: '/api/media/company-profile.pdf',
          thumbnail: '/api/media/thumbnails/pdf-icon.png',
          type: 'document',
          size: 5242880,
          uploadedAt: new Date('2024-01-03'),
          uploadedBy: 'admin',
          alt: { ru: 'Профиль компании', en: 'Company profile document' }
        }
      ]);
    }
  }, [isOpen]);

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (file.alt && (typeof file.alt === 'string' ? file.alt : file.alt.ru || file.alt.en || '').toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || file.type === filterType;
    const isAllowedType = fileTypes.includes(file.type);
    
    return matchesSearch && matchesType && isAllowedType;
  });

  const handleFileSelect = (file: MediaFile) => {
    if (allowMultiple) {
      setSelectedFiles(prev => {
        const isSelected = prev.some(f => f.id === file.id);
        if (isSelected) {
          return prev.filter(f => f.id !== file.id);
        } else {
          return [...prev, file];
        }
      });
    } else {
      onSelect(file);
      onClose();
    }
  };

  const handleConfirmSelection = () => {
    if (allowMultiple && selectedFiles.length > 0) {
      selectedFiles.forEach(file => onSelect(file));
      onClose();
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    if (uploadedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload process
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Create MediaFile object
      const mediaFile: MediaFile = {
        id: Date.now().toString() + i,
        name: file.name,
        url: URL.createObjectURL(file),
        thumbnail: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.startsWith('video/') ? 'video' : 'document',
        size: file.size,
        dimensions: file.type.startsWith('image/') ? { width: 1920, height: 1080 } : undefined,
        uploadedAt: new Date(),
        uploadedBy: 'current-user',
        alt: { ru: '', en: '' }
      };

      setFiles(prev => [mediaFile, ...prev]);
    }

    setIsUploading(false);
    setUploadProgress(0);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: MediaFile['type']) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-6 w-6" />;
      case 'video':
        return <Video className="h-6 w-6" />;
      case 'document':
        return <File className="h-6 w-6" />;
      default:
        return <File className="h-6 w-6" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Media Library</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-[80vh]">
          {/* Toolbar */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="document">Documents</option>
              </select>

              <div className="flex items-center space-x-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleUpload}
                  className="hidden"
                />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Files
                </Button>
              </label>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="p-4 border-b bg-blue-50">
              <div className="flex items-center justify-between text-sm text-blue-700 mb-2">
                <span>Uploading files...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* File Grid/List */}
          <div className="flex-1 overflow-auto p-4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => handleFileSelect(file)}
                    className={`
                      relative group cursor-pointer rounded-lg border-2 p-2 transition-all
                      ${selectedFiles.some(f => f.id === file.id) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    <div className="aspect-square bg-gray-100 rounded-md mb-2 overflow-hidden">
                      {file.type === 'image' ? (
                        <img
                          src={file.thumbnail}
                          alt={typeof file.alt === 'string' ? file.alt : file.alt?.ru || file.alt?.en || file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                    </div>
                    <div className="text-xs">
                      <div className="font-medium truncate" title={file.name}>
                        {file.name}
                      </div>
                      <div className="text-gray-500">
                        {formatFileSize(file.size)}
                      </div>
                    </div>
                    
                    {/* Selection indicator */}
                    {selectedFiles.some(f => f.id === file.id) && (
                      <div className="absolute top-1 right-1 bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => handleFileSelect(file)}
                    className={`
                      flex items-center p-3 rounded-lg border cursor-pointer transition-all
                      ${selectedFiles.some(f => f.id === file.id) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'}
                    `}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-md mr-3 overflow-hidden">
                      {file.type === 'image' ? (
                        <img
                          src={file.thumbnail}
                          alt={typeof file.alt === 'string' ? file.alt : file.alt?.ru || file.alt?.en || file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          {getFileIcon(file.type)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{file.name}</div>
                      <div className="text-sm text-gray-500">
                        {formatFileSize(file.size)} • {file.type} • {file.meta?.createdAt ? new Date(file.meta.createdAt).toLocaleDateString() : 'Unknown date'}
                      </div>
                    </div>
                    {selectedFiles.some(f => f.id === file.id) && (
                      <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        ✓
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-gray-500">
              {filteredFiles.length} files • {selectedFiles.length} selected
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {allowMultiple && selectedFiles.length > 0 && (
                <Button onClick={handleConfirmSelection} className="bg-blue-600 hover:bg-blue-700">
                  Select {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaLibrary;