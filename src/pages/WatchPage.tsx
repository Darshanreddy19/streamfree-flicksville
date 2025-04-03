
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "@/components/VideoPlayer";
import { getMovie, type Movie } from "@/lib/api";

const WatchPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  
  useEffect(() => {
    if (id) {
      const movieData = getMovie(id);
      if (movieData) {
        setMovie(movieData);
      }
    }
  }, [id]);
  
  if (!movie) {
    return <div className="h-screen bg-netflix-black flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="h-screen bg-netflix-black">
      <VideoPlayer movie={movie} />
    </div>
  );
};

export default WatchPage;
