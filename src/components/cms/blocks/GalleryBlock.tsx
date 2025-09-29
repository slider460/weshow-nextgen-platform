import React, { useState } from 'react';
import { BaseBlock } from './BaseBlock';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { 
  Images, 
  Plus, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Grid3X3,
  LayoutGrid,
  Maximize2
} from 'lucide-react';
import { ContentBlock, MediaFile, EditorGalleryBlockContent } from '../../../types/cms/content';
import MediaLibrary from '../editor/MediaLibrary';

interface GalleryBlockProps {
  block: ContentBlock;
  isEditing: boolean;
  isSelected: boolean;
  onUpdate: (updates: Partial<ContentBlock>) => void;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryBlockContent {
  images: GalleryImage[];
  layout: 'grid' | 'masonry' | 'slider';
  columns: 2 | 3 | 4 | 5;
  aspectRatio: 'auto' | '16:9' | '4:3' | '1:1' | '3:2';
  spacing: 'none' | 'sm' | 'md' | 'lg';
  showCaptions: boolean;
  allowLightbox: boolean;
}

const GalleryBlock: React.FC<GalleryBlockProps> = ({
  block,
  isEditing,
  isSelected,
  onUpdate,
  onSelect,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown
}) => {
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const content = block.content as GalleryBlockContent;

  const handleImagesSelect = (files: MediaFile[]) => {
    const newImages: GalleryImage[] = files.map(file => ({
      id: file.id,
      src: file.url,
      alt: typeof file.alt === 'string' ? file.alt : file.alt?.ru || file.alt?.en || file.name,
      caption: typeof file.alt === 'string' ? file.alt : file.alt?.ru || file.alt?.en || ''
    }));

    onUpdate({
      content: {
        ...content,
        images: [...content.images, ...newImages]
      }
    });
    setIsMediaLibraryOpen(false);
  };

  const handleContentUpdate = (updates: Partial<GalleryBlockContent>) => {
    onUpdate({
      content: {
        ...content,
        ...updates
      }
    });
  };

  const removeImage = (imageId: string) => {
    handleContentUpdate({
      images: content.images.filter(img => img.id !== imageId)
    });
  };

  const updateImageCaption = (imageId: string, caption: string) => {
    handleContentUpdate({
      images: content.images.map(img => 
        img.id === imageId ? { ...img, caption } : img
      )
    });
  };

  const getGridClasses = () => {
    const spacingClasses = {
      none: 'gap-0',
      sm: 'gap-1',
      md: 'gap-2',
      lg: 'gap-4'
    };

    const columnClasses = {
      2: 'grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
    };

    return [
      'grid',
      columnClasses[content.columns],
      spacingClasses[content.spacing]
    ].join(' ');
  };

  const getImageClasses = () => {
    const aspectRatioClasses = {
      auto: '',
      '16:9': 'aspect-video',
      '4:3': 'aspect-[4/3]',
      '1:1': 'aspect-square',
      '3:2': 'aspect-[3/2]'
    };

    return [
      'w-full rounded-lg overflow-hidden',
      content.aspectRatio !== 'auto' ? aspectRatioClasses[content.aspectRatio] : '',
      content.allowLightbox && !isEditing ? 'cursor-pointer hover:opacity-80' : ''
    ].filter(Boolean).join(' ');
  };

  const openLightbox = (index: number) => {
    if (content.allowLightbox && !isEditing) {
      setLightboxIndex(index);
    }
  };

  const renderGridLayout = () => (
    <div className={getGridClasses()}>
      {content.images.map((image, index) => (
        <div key={image.id} className="relative group">
          <div 
            className={getImageClasses()}
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={`
                w-full h-full object-cover transition-transform duration-200
                ${content.allowLightbox && !isEditing ? 'group-hover:scale-105' : ''}
                ${content.aspectRatio !== 'auto' ? 'object-cover' : ''}
              `}
            />
          </div>
          
          {content.showCaptions && image.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <p className="text-sm">{image.caption}</p>
            </div>
          )}

          {isEditing && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeImage(image.id)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderSliderLayout = () => (
    <div className="relative">
      <div className="overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {content.images.map((image, index) => (
            <div key={image.id} className="w-full flex-shrink-0">
              <div className={content.aspectRatio !== 'auto' ? `aspect-video` : ''}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              {content.showCaptions && image.caption && (
                <div className="bg-gray-100 p-3 text-center">
                  <p className="text-sm text-gray-700">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {content.images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="sm"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={() => setCurrentSlide(Math.min(content.images.length - 1, currentSlide + 1))}
            disabled={currentSlide === content.images.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="flex justify-center mt-4 space-x-2">
            {content.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );

  const renderGalleryContent = () => {
    if (content.images.length === 0) {
      return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Images className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">No images in gallery</p>
          <Button
            onClick={() => setIsMediaLibraryOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Images
          </Button>
        </div>
      );
    }

    return (
      <div>
        {content.layout === 'slider' ? renderSliderLayout() : renderGridLayout()}
        
        {isEditing && (
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => setIsMediaLibraryOpen(true)}
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add More Images
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderLightbox = () => {
    if (lightboxIndex === null) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
        <div className="relative max-w-4xl max-h-full p-4">
          <img
            src={content.images[lightboxIndex].src}
            alt={content.images[lightboxIndex].alt}
            className="max-w-full max-h-full object-contain"
          />
          
          {content.showCaptions && content.images[lightboxIndex].caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 text-center">
              <p>{content.images[lightboxIndex].caption}</p>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 bg-white/20 border-white/30 text-white"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="h-4 w-4" />
          </Button>

          {content.images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white"
                onClick={() => setLightboxIndex(Math.max(0, lightboxIndex - 1))}
                disabled={lightboxIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white"
                onClick={() => setLightboxIndex(Math.min(content.images.length - 1, lightboxIndex + 1))}
                disabled={lightboxIndex === content.images.length - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderPropertiesPanel = () => (
    <div className="space-y-6">
      {/* Images Management */}
      <div>
        <Label className="text-sm font-medium">Images ({content.images.length})</Label>
        <div className="mt-2">
          <Button
            onClick={() => setIsMediaLibraryOpen(true)}
            className="w-full mb-3"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Images
          </Button>
          
          {content.images.length > 0 && (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {content.images.map((image) => (
                <div key={image.id} className="flex items-center space-x-3 p-2 border rounded">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <Input
                      value={image.caption || ''}
                      onChange={(e) => updateImageCaption(image.id, e.target.value)}
                      placeholder="Caption..."
                      className="text-xs"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeImage(image.id)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Layout */}
      <div>
        <Label className="text-sm font-medium">Layout</Label>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(['grid', 'masonry', 'slider'] as const).map((layout) => (
            <Button
              key={layout}
              variant={content.layout === layout ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleContentUpdate({ layout })}
              className="capitalize"
            >
              {layout === 'grid' && <Grid3X3 className="h-4 w-4 mr-1" />}
              {layout === 'masonry' && <LayoutGrid className="h-4 w-4 mr-1" />}
              {layout === 'slider' && <ChevronRight className="h-4 w-4 mr-1" />}
              {layout}
            </Button>
          ))}
        </div>
      </div>

      {/* Columns (for grid layout) */}
      {content.layout !== 'slider' && (
        <div>
          <Label className="text-sm font-medium">Columns</Label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {([2, 3, 4, 5] as const).map((columns) => (
              <Button
                key={columns}
                variant={content.columns === columns ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleContentUpdate({ columns })}
              >
                {columns}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Aspect Ratio */}
      <div>
        <Label className="text-sm font-medium">Aspect Ratio</Label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(['auto', '16:9', '4:3', '1:1', '3:2'] as const).map((ratio) => (
            <Button
              key={ratio}
              variant={content.aspectRatio === ratio ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleContentUpdate({ aspectRatio: ratio })}
            >
              {ratio}
            </Button>
          ))}
        </div>
      </div>

      {/* Spacing */}
      <div>
        <Label className="text-sm font-medium">Spacing</Label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(['none', 'sm', 'md', 'lg'] as const).map((spacing) => (
            <Button
              key={spacing}
              variant={content.spacing === spacing ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleContentUpdate({ spacing })}
              className="capitalize"
            >
              {spacing}
            </Button>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Show Captions</Label>
          <input
            type="checkbox"
            checked={content.showCaptions}
            onChange={(e) => handleContentUpdate({ showCaptions: e.target.checked })}
            className="rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Allow Lightbox</Label>
          <input
            type="checkbox"
            checked={content.allowLightbox}
            onChange={(e) => handleContentUpdate({ allowLightbox: e.target.checked })}
            className="rounded"
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <BaseBlock
        block={block}
        isEditing={isEditing}
        isSelected={isSelected}
        onSelect={onSelect}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        onMove={(direction) => direction === 'up' ? onMoveUp() : onMoveDown()}
        propertiesPanel={renderPropertiesPanel()}
      >
        <div className="w-full">
          {renderGalleryContent()}
        </div>
      </BaseBlock>

      <MediaLibrary
        isOpen={isMediaLibraryOpen}
        onClose={() => setIsMediaLibraryOpen(false)}
        onSelect={(file) => handleImagesSelect([file])}
        allowMultiple={true}
        fileTypes={['image']}
      />

      {renderLightbox()}
    </>
  );
};

// Default content for new gallery blocks
export const createGalleryBlock = (): ContentBlock => ({
  id: Date.now().toString(),
  type: 'gallery',
  content: {
    images: [],
    layout: 'grid',
    columns: 3,
    aspectRatio: '1:1',
    spacing: 'md',
    showCaptions: true,
    allowLightbox: true
  } as GalleryBlockContent,
  settings: {
    responsive: {
      desktop: { visible: true },
      tablet: { visible: true },
      mobile: { visible: true }
    },
    spacing: {
      marginTop: 'md',
      marginBottom: 'md'
    }
  }
});

export default GalleryBlock;