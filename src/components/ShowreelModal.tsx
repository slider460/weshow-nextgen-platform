import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from "lucide-react";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShowreelModal = ({ isOpen, onClose }: ShowreelModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      console.error('Video error occurred');
    };
    const handleLoadStart = () => {
      console.log('Video loading started');
    };
    const handleLoadedData = () => {
      console.log('Video data loaded');
      // Автоматически начинаем воспроизведение после загрузки
      if (isOpen) {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Auto-play failed:', error);
          // Если автовоспроизведение не удалось, показываем кнопку Play
        });
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [isOpen]);

  useEffect(() => {
    if (showControls) {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [showControls]);

  // Автоматическое воспроизведение при открытии модального окна
  useEffect(() => {
    if (isOpen && videoRef.current) {
      const video = videoRef.current;
      
      // Небольшая задержка для корректной инициализации
      const timer = setTimeout(() => {
        video.play().then(() => {
          setIsPlaying(true);
        }).catch((error) => {
          console.log('Auto-play failed:', error);
          // Если автовоспроизведение не удалось, показываем кнопку Play
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const togglePlay = () => {
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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Сбрасываем время к началу
      setIsPlaying(false);
      setCurrentTime(0);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-7xl w-[95vw] h-[90vh] p-0 bg-black border-0">
        <div 
          ref={containerRef}
          className="relative w-full h-full bg-black rounded-lg overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Video Element */}
          <video
            ref={videoRef}
            src="/showreel.mp4"
            className="w-full h-full object-contain"
            playsInline
            preload="auto"
            autoPlay
            muted
            crossOrigin="anonymous"
            onError={(e) => {
              console.error('Video error:', e);
            }}
            onLoadStart={() => {
              console.log('Video loading started');
            }}
            onLoadedData={() => {
              console.log('Video data loaded');
            }}
          />

          {/* Center Play Button (when paused) - скрыта, так как видео воспроизводится автоматически */}
          {/* {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Button
                  onClick={togglePlay}
                  size="lg"
                  className="w-24 h-24 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/40 hover:scale-110 transition-all duration-300 rounded-full"
                >
                  <Play className="w-12 h-12 ml-1" />
                </Button>
                <p className="text-white/80 text-sm mt-4">Нажмите для воспроизведения</p>
              </div>
            </div>
          )} */}

          {/* Video Controls */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 transition-all duration-300 ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%)`
                }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={togglePlay}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 rounded-full p-3"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>

                <Button
                  onClick={restart}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 rounded-full p-3"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>

                <Button
                  onClick={toggleMute}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 rounded-full p-3"
                >
                  {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </Button>

                <span className="text-white/80 text-base font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <Button
                onClick={toggleFullscreen}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-full p-3"
              >
                <Maximize2 className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 via-black/30 to-transparent">
            <h2 className="text-2xl lg:text-3xl font-bold text-white">WESHOW Showreel</h2>
            <p className="text-white/80 text-sm lg:text-base">Наши лучшие проекты и инновационные решения</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowreelModal;
