
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import VideoPlayer from "@/components/VideoPlayer";
import { getMovie, type Movie } from "@/lib/api";
import { toast } from "@/lib/toast";

const WatchPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadMovie = () => {
      setIsLoading(true);
      
      if (id) {
        const movieData = getMovie(id);
        if (movieData) {
          setMovie(movieData);
          
          // Update page title with movie name
          document.title = `${movieData.title} - Streaming Now`;
        } else {
          toast.error("Movie not found", {
            description: "We couldn't find the movie you're looking for.",
          });
          navigate("/");
        }
      }
      
      setIsLoading(false);
    };
    
    loadMovie();
    
    // Cleanup function
    return () => {
      document.title = "StreamFree - FlicksVille";
    };
  }, [id, navigate]);
  
  if (isLoading) {
    return (
      <div className="h-screen bg-netflix-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-t-2 border-netflix-red border-solid rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading your video...</p>
        </div>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Video Not Found</h2>
          <p className="text-gray-400 mb-6">The video you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate(-1)} 
            className="px-4 py-2 bg-netflix-red hover:bg-netflix-red/90 rounded-md transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-screen bg-netflix-black overflow-hidden">
      <VideoPlayer movie={movie} />
    </div>
  );
};

export default WatchPage;
