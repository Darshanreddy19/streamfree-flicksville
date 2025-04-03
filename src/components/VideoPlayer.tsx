
import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { type Movie } from "@/lib/api";

interface VideoPlayerProps {
  movie: Movie;
}

const VideoPlayer = ({ movie }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Simulate video progress with a timer
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + 0.1;
        });
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [isPlaying]);
  
  useEffect(() => {
    // Hide controls after inactivity
    const showControls = () => {
      setControlsVisible(true);
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      controlsTimeoutRef.current = window.setTimeout(() => {
        if (isPlaying) {
          setControlsVisible(false);
        }
      }, 3000);
    };
    
    const handleMouseMove = () => showControls();
    const handleMouseClick = () => showControls();
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleMouseClick);
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleMouseClick);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying]);
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };
  
  return (
    <div className="relative h-screen bg-black">
      {/* Video Element (Using image as placeholder) */}
      <div 
        ref={videoRef as React.RefObject<HTMLDivElement>}
        className="h-full w-full flex items-center justify-center"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.thumbnailUrl})` }}
        />
      </div>
      
      {/* Back Button */}
      <Link 
        to={`/movie/${movie.id}`} 
        className={`absolute top-6 left-6 z-20 p-2 rounded-full bg-black/50 transition-opacity ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
      
      {/* Video Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent transition-opacity ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col space-y-4 max-w-screen-2xl mx-auto">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-medium">{movie.title}</h2>
          </div>
          
          {/* Progress Bar */}
          <div className="relative w-full h-1 bg-gray-600 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-netflix-red"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={togglePlay}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </button>
              
              <button 
                onClick={toggleMute}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleFullscreen}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
