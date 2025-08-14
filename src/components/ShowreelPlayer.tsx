import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from "lucide-react";

interface ShowreelPlayerProps {
  videoSrc: string;
  title?: string;
  description?: string;
  className?: string;
}

const ShowreelPlayer = ({ 
  videoSrc, 
  title = "WESHOW Showreel", 
  description = "Наши лучшие проекты и достижения",
  className = "" 
}: ShowreelPlayerProps) => {
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
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

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

  return (
    <div 
      ref={containerRef}
      className={`relative group bg-black rounded-3xl overflow-hidden shadow-2xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-full h-full object-cover"
        playsInline
        preload="metadata"
      />

      {/* Overlay with Title and Description */}
      <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/60 via-black/30 to-transparent">
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-white/80 text-sm lg:text-base">{description}</p>
      </div>

      {/* Center Play Button (when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            onClick={togglePlay}
            size="lg"
            className="w-20 h-20 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all duration-300 rounded-full"
          >
            <Play className="w-8 h-8 ml-1" />
          </Button>
        </div>
      )}

      {/* Video Controls */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 transition-all duration-300 ${
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
            className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%)`
            }}
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              onClick={togglePlay}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-full p-2"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>

            <Button
              onClick={restart}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-full p-2"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>

            <Button
              onClick={toggleMute}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 rounded-full p-2"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>

            <span className="text-white/80 text-sm font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <Button
            onClick={toggleFullscreen}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 rounded-full p-2"
          >
            <Maximize2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {duration === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default ShowreelPlayer;
