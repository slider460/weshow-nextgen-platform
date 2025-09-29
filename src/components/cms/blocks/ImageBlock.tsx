import React, { useState } from 'react';
import { BaseBlock } from './BaseBlock';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { ImageIcon, Settings, ExternalLink } from 'lucide-react';
import { ContentBlock, MediaFile, EditorImageBlockContent } from '../../../types/cms/content';
import MediaLibrary from '../editor/MediaLibrary';

interface ImageBlockProps {
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

interface ImageBlockContent {
  src: string;
  alt: string;
  caption?: string;
  link?: {
    url: string;
    target: '_blank' | '_self';
  };
  alignment: 'left' | 'center' | 'right' | 'full';
  size: 'small' | 'medium' | 'large' | 'full';
  aspectRatio: 'auto' | '16:9' | '4:3' | '1:1' | '3:2';
}

const ImageBlock: React.FC<ImageBlockProps> = ({
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
  const [showSettings, setShowSettings] = useState(false);

  const content = block.content as ImageBlockContent;

  const handleImageSelect = (file: MediaFile) => {
    onUpdate({
      content: {
        ...content,
        src: file.url,
        alt: typeof file.alt === 'string' ? file.alt : file.alt?.ru || file.alt?.en || file.name
      }
    });
    setIsMediaLibraryOpen(false);
  };

  const handleContentUpdate = (updates: Partial<ImageBlockContent>) => {
    onUpdate({
      content: {
        ...content,
        ...updates
      }
    });
  };

  const getImageClasses = () => {
    const baseClasses = "transition-all duration-200";
    
    // Size classes
    const sizeClasses = {
      small: "max-w-xs",
      medium: "max-w-md",
      large: "max-w-2xl",
      full: "w-full"
    };

    // Alignment classes
    const alignmentClasses = {
      left: "mr-auto",
      center: "mx-auto",
      right: "ml-auto",
      full: "w-full"
    };

    // Aspect ratio classes
    const aspectRatioClasses = {
      auto: "",
      "16:9": "aspect-video",
      "4:3": "aspect-[4/3]",
      "1:1": "aspect-square",
      "3:2": "aspect-[3/2]"
    };

    return [
      baseClasses,
      sizeClasses[content.size],
      alignmentClasses[content.alignment],
      aspectRatioClasses[content.aspectRatio]
    ].filter(Boolean).join(" ");
  };

  const renderImageContent = () => {
    if (!content.src) {
      return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">No image selected</p>
          <Button
            onClick={() => setIsMediaLibraryOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Select Image
          </Button>
        </div>
      );
    }

    const imageElement = (
      <div className={getImageClasses()}>
        <img
          src={content.src}
          alt={content.alt}
          className={`
            rounded-lg shadow-sm
            ${content.aspectRatio !== 'auto' ? 'object-cover w-full h-full' : ''}
            ${isEditing ? 'cursor-pointer hover:opacity-80' : ''}
          `}
          onClick={isEditing ? () => setIsMediaLibraryOpen(true) : undefined}
        />
        {content.caption && (
          <p className="text-sm text-gray-600 mt-2 text-center">{content.caption}</p>
        )}
      </div>
    );

    if (content.link && !isEditing) {
      return (
        <a
          href={content.link.url}
          target={content.link.target}
          rel={content.link.target === '_blank' ? 'noopener noreferrer' : undefined}
          className="block"
        >
          {imageElement}
        </a>
      );
    }

    return imageElement;
  };

  const renderPropertiesPanel = () => (
    <div className="space-y-6">
      {/* Image Selection */}
      <div>
        <Label className="text-sm font-medium">Image</Label>
        <div className="mt-2">
          {content.src ? (
            <div className="flex items-center space-x-3">
              <img
                src={content.src}
                alt={content.alt}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="text-sm font-medium truncate">{content.alt || 'Image'}</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsMediaLibraryOpen(true)}
                  className="mt-1"
                >
                  Change Image
                </Button>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setIsMediaLibraryOpen(true)}
              className="w-full"
              variant="outline"
            >
              <ImageIcon className="h-4 w-4 mr-2" />
              Select Image
            </Button>
          )}
        </div>
      </div>

      {/* Alt Text */}
      <div>
        <Label htmlFor="alt-text" className="text-sm font-medium">
          Alt Text
        </Label>
        <Input
          id="alt-text"
          value={content.alt}
          onChange={(e) => handleContentUpdate({ alt: e.target.value })}
          placeholder="Describe the image..."
          className="mt-1"
        />
      </div>

      {/* Caption */}
      <div>
        <Label htmlFor="caption" className="text-sm font-medium">
          Caption
        </Label>
        <Input
          id="caption"
          value={content.caption || ''}
          onChange={(e) => handleContentUpdate({ caption: e.target.value })}
          placeholder="Optional caption..."
          className="mt-1"
        />
      </div>

      {/* Size */}
      <div>
        <Label className="text-sm font-medium">Size</Label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(['small', 'medium', 'large', 'full'] as const).map((size) => (
            <Button
              key={size}
              variant={content.size === size ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleContentUpdate({ size })}
              className="capitalize"
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      {/* Alignment */}
      <div>
        <Label className="text-sm font-medium">Alignment</Label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(['left', 'center', 'right', 'full'] as const).map((alignment) => (
            <Button
              key={alignment}
              variant={content.alignment === alignment ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleContentUpdate({ alignment })}
              className="capitalize"
            >
              {alignment}
            </Button>
          ))}
        </div>
      </div>

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

      {/* Link */}
      <div>
        <Label className="text-sm font-medium">Link</Label>
        <div className="mt-2 space-y-2">
          <Input
            value={content.link?.url || ''}
            onChange={(e) => handleContentUpdate({ 
              link: e.target.value ? {
                url: e.target.value,
                target: content.link?.target || '_self'
              } : undefined
            })}
            placeholder="https://example.com"
          />
          {content.link?.url && (
            <div className="flex items-center space-x-2">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={content.link.target === '_blank'}
                  onChange={(e) => handleContentUpdate({
                    link: {
                      ...content.link!,
                      target: e.target.checked ? '_blank' : '_self'
                    }
                  })}
                />
                <span>Open in new tab</span>
              </label>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
          )}
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
          {renderImageContent()}
        </div>
      </BaseBlock>

      <MediaLibrary
        isOpen={isMediaLibraryOpen}
        onClose={() => setIsMediaLibraryOpen(false)}
        onSelect={handleImageSelect}
        fileTypes={['image']}
      />
    </>
  );
};

// Default content for new image blocks
export const createImageBlock = (): ContentBlock => ({
  id: Date.now().toString(),
  type: 'image',
  content: {
    src: '',
    alt: '',
    caption: '',
    alignment: 'center',
    size: 'medium',
    aspectRatio: 'auto'
  } as ImageBlockContent,
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

export default ImageBlock;