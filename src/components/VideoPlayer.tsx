
import { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, ArrowLeft, Rewind, FastForward } from "lucide-react";
import { Link } from "react-router-dom";
import { type Movie } from "@/lib/api";
import { toast } from "@/lib/toast";

interface VideoPlayerProps {
  movie: Movie;
}

const VideoPlayer = ({ movie }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [controlsVisible, setControlsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Show a toast notification when the video starts playing
    toast("Now playing: " + movie.title, {
      description: `${movie.year} • ${movie.duration} • ${movie.rating}`,
      duration: 3000,
    });
    
    // Auto-hide controls after a delay
    const hideControlsTimeout = setTimeout(() => {
      if (isPlaying) {
        setControlsVisible(false);
      }
    }, 3000);
    
    return () => clearTimeout(hideControlsTimeout);
  }, [movie, isPlaying]);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (!videoElement) return;
    
    // Apply playback state to video element
    if (isPlaying) {
      // We use a Promise because play() returns a promise
      videoElement.play().catch(error => {
        console.error("Error playing video:", error);
        setIsPlaying(false);
      });
    } else {
      videoElement.pause();
    }
    
    // Apply mute state to video element
    videoElement.muted = isMuted;
    
    // Apply volume level
    videoElement.volume = volume;
    
    // Setup progress tracking
    const updateProgress = () => {
      if (videoElement.duration) {
        setProgress((videoElement.currentTime / videoElement.duration) * 100);
        setCurrentTime(videoElement.currentTime);
        setDuration(videoElement.duration);
      }
    };
    
    // Event listeners for video playback
    videoElement.addEventListener("timeupdate", updateProgress);
    videoElement.addEventListener("durationchange", updateProgress);
    videoElement.addEventListener("ended", () => setIsPlaying(false));
    
    return () => {
      videoElement.removeEventListener("timeupdate", updateProgress);
      videoElement.removeEventListener("durationchange", updateProgress);
      videoElement.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, [isPlaying, isMuted, volume]);
  
  useEffect(() => {
    // Hide controls after inactivity
    const showControls = () => {
      setControlsVisible(true);
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      if (isPlaying) {
        controlsTimeoutRef.current = window.setTimeout(() => {
          setControlsVisible(false);
        }, 3000);
      }
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
  
  const handleProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };
  
  const jumpForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 10);
    }
  };
  
  const jumpBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };
  
  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="h-full w-full object-contain bg-black"
        poster={movie.thumbnailUrl}
        autoPlay
        onClick={togglePlay}
      >
        <source src={movie.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Video Overlay for clicks */}
      <div 
        className="absolute inset-0 cursor-pointer z-10"
        onClick={togglePlay}
      />
      
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
          <div 
            className="relative w-full h-2 bg-gray-600 rounded-full overflow-hidden cursor-pointer"
            onClick={handleProgress}
          >
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
                onClick={jumpBackward}
                className="p-2 rounded-full hover:bg-white/10 transition-colors hidden sm:flex"
                aria-label="Rewind 10 seconds"
              >
                <Rewind className="h-5 w-5" />
              </button>
              
              <button 
                onClick={jumpForward}
                className="p-2 rounded-full hover:bg-white/10 transition-colors hidden sm:flex"
                aria-label="Forward 10 seconds"
              >
                <FastForward className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={toggleMute}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                
                <div className="hidden sm:block w-24">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-netflix-red"
                  />
                </div>
              </div>
              
              <div className="text-sm text-gray-300 hidden md:block">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleFullscreen}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Fullscreen"
              >
                <Maximize className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
