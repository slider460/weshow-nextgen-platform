import React, { useState, useRef } from 'react';
import { BaseBlock } from './BaseBlock';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { 
  Video as VideoIcon, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2,
  Settings,
  ExternalLink,
  Upload
} from 'lucide-react';
import { ContentBlock, MediaFile } from '../../../types/cms/content';
import MediaLibrary from '../editor/MediaLibrary';

interface VideoBlockProps {
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

interface VideoBlockContent {
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  type: 'upload' | 'youtube' | 'vimeo' | 'embed';
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  controls: boolean;
  aspectRatio: '16:9' | '4:3' | '1:1' | '21:9';
  alignment: 'left' | 'center' | 'right' | 'full';
  size: 'small' | 'medium' | 'large' | 'full';
}

const VideoBlock: React.FC<VideoBlockProps> = ({
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const content = block.content as VideoBlockContent;

  const handleVideoSelect = (file: MediaFile) => {
    onUpdate({
      content: {
        ...content,
        src: file.url,
        type: 'upload'
      }
    });
    setIsMediaLibraryOpen(false);
  };

  const handleContentUpdate = (updates: Partial<VideoBlockContent>) => {
    onUpdate({
      content: {
        ...content,
        ...updates
      }
    });
  };

  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const extractVimeoId = (url: string): string | null => {
    const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const getEmbedUrl = (url: string, type: string): string => {
    switch (type) {
      case 'youtube':
        const youtubeId = extractYouTubeId(url);
        return youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : url;
      case 'vimeo':
        const vimeoId = extractVimeoId(url);
        return vimeoId ? `https://player.vimeo.com/video/${vimeoId}` : url;
      default:
        return url;
    }
  };

  const getContainerClasses = () => {
    const baseClasses = "relative overflow-hidden rounded-lg bg-black";
    
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
      "16:9": "aspect-video",
      "4:3": "aspect-[4/3]",
      "1:1": "aspect-square",
      "21:9": "aspect-[21/9]"
    };

    return [
      baseClasses,
      sizeClasses[content.size],
      alignmentClasses[content.alignment],
      aspectRatioClasses[content.aspectRatio]
    ].filter(Boolean).join(" ");
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const renderVideoContent = () => {
    if (!content.src) {
      return (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <VideoIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">No video selected</p>
          <div className="space-y-3">
            <Button
              onClick={() => setIsMediaLibraryOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
            <div className="text-sm text-gray-500">or</div>
            <Input
              placeholder="YouTube/Vimeo URL or embed code"
              onBlur={(e) => {
                const url = e.target.value;
                if (url) {
                  if (url.includes('youtube.com') || url.includes('youtu.be')) {
                    handleContentUpdate({ src: url, type: 'youtube' });
                  } else if (url.includes('vimeo.com')) {
                    handleContentUpdate({ src: url, type: 'vimeo' });
                  } else if (url.includes('<iframe')) {
                    handleContentUpdate({ src: url, type: 'embed' });
                  } else {
                    handleContentUpdate({ src: url, type: 'upload' });
                  }
                }
              }}
            />
          </div>
        </div>
      );
    }

    const containerClasses = getContainerClasses();

    // For embed type (iframe)
    if (content.type === 'embed') {
      return (
        <div className={containerClasses}>
          <div 
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: content.src }}
          />
        </div>
      );
    }

    // For YouTube and Vimeo
    if (content.type === 'youtube' || content.type === 'vimeo') {
      const embedUrl = getEmbedUrl(content.src, content.type);
      return (
        <div className={containerClasses}>
          <iframe
            src={embedUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    }

    // For uploaded videos
    return (
      <div className={containerClasses}>
        <video
          ref={videoRef}
          src={content.src}
          poster={content.poster}
          autoPlay={content.autoplay}
          loop={content.loop}
          muted={content.muted || isMuted}
          controls={content.controls}
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Custom Controls Overlay (when controls are disabled) */}
        {!content.controls && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 rounded-full p-4 opacity-0 hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="lg"
                onClick={togglePlayPause}
                className="text-white hover:text-white hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8" />
                ) : (
                  <Play className="h-8 w-8" />
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Custom Volume Control */}
        {!content.controls && (
          <div className="absolute bottom-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="text-white hover:text-white hover:bg-white/20"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}

        {/* Title and Description Overlay */}
        {(content.title || content.description) && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            {content.title && (
              <h3 className="text-white font-semibold text-lg mb-1">{content.title}</h3>
            )}
            {content.description && (
              <p className="text-white/90 text-sm">{content.description}</p>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderPropertiesPanel = () => (
    <div className="space-y-6">
      {/* Video Source */}
      <div>
        <Label className="text-sm font-medium">Video Source</Label>
        <div className="mt-2 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={content.type === 'upload' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleContentUpdate({ type: 'upload' })}
            >
              Upload
            </Button>
            <Button
              variant={content.type === 'youtube' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleContentUpdate({ type: 'youtube' })}
            >
              YouTube
            </Button>
            <Button
              variant={content.type === 'vimeo' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleContentUpdate({ type: 'vimeo' })}
            >
              Vimeo
            </Button>
            <Button
              variant={content.type === 'embed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleContentUpdate({ type: 'embed' })}
            >
              Embed
            </Button>
          </div>

          {content.type === 'upload' ? (
            <Button
              onClick={() => setIsMediaLibraryOpen(true)}
              className="w-full"
              variant="outline"
            >
              <VideoIcon className="h-4 w-4 mr-2" />
              Select Video File
            </Button>
          ) : (
            <Input
              value={content.src}
              onChange={(e) => handleContentUpdate({ src: e.target.value })}
              placeholder={
                content.type === 'embed' 
                  ? 'Paste embed code...'
                  : `${content.type === 'youtube' ? 'YouTube' : 'Vimeo'} URL...`
              }
            />
          )}
        </div>
      </div>

      {/* Poster Image */}
      {content.type === 'upload' && (
        <div>
          <Label className="text-sm font-medium">Poster Image</Label>
          <Input
            value={content.poster || ''}
            onChange={(e) => handleContentUpdate({ poster: e.target.value })}
            placeholder="Poster image URL..."
            className="mt-1"
          />
        </div>
      )}

      {/* Title */}
      <div>
        <Label htmlFor="video-title" className="text-sm font-medium">
          Title
        </Label>
        <Input
          id="video-title"
          value={content.title || ''}
          onChange={(e) => handleContentUpdate({ title: e.target.value })}
          placeholder="Video title..."
          className="mt-1"
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="video-description" className="text-sm font-medium">
          Description
        </Label>
        <Input
          id="video-description"
          value={content.description || ''}
          onChange={(e) => handleContentUpdate({ description: e.target.value })}
          placeholder="Video description..."
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
          {(['16:9', '4:3', '1:1', '21:9'] as const).map((ratio) => (
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

      {/* Video Options */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Autoplay</Label>
          <input
            type="checkbox"
            checked={content.autoplay}
            onChange={(e) => handleContentUpdate({ autoplay: e.target.checked })}
            className="rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Loop</Label>
          <input
            type="checkbox"
            checked={content.loop}
            onChange={(e) => handleContentUpdate({ loop: e.target.checked })}
            className="rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Muted</Label>
          <input
            type="checkbox"
            checked={content.muted}
            onChange={(e) => handleContentUpdate({ muted: e.target.checked })}
            className="rounded"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Show Controls</Label>
          <input
            type="checkbox"
            checked={content.controls}
            onChange={(e) => handleContentUpdate({ controls: e.target.checked })}
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
          {renderVideoContent()}
        </div>
      </BaseBlock>

      <MediaLibrary
        isOpen={isMediaLibraryOpen}
        onClose={() => setIsMediaLibraryOpen(false)}
        onSelect={handleVideoSelect}
        fileTypes={['video']}
      />
    </>
  );
};

// Default content for new video blocks
export const createVideoBlock = (): ContentBlock => ({
  id: Date.now().toString(),
  type: 'video',
  content: {
    src: '',
    poster: '',
    title: '',
    description: '',
    type: 'upload',
    autoplay: false,
    loop: false,
    muted: false,
    controls: true,
    aspectRatio: '16:9',
    alignment: 'center',
    size: 'medium'
  } as VideoBlockContent,
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

export default VideoBlock;