
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";
import { getMovie, getMoviesByGenre, type Movie } from "@/lib/api";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    if (id) {
      const movieData = getMovie(id);
      if (movieData) {
        setMovie(movieData);
        
        // Get similar movies based on first genre
        if (movieData.genre.length > 0) {
          const similar = getMoviesByGenre(movieData.genre[0]).filter(m => m.id !== id);
          setSimilarMovies(similar);
        }
      }
    }
  }, [id]);
  
  if (!movie) {
    return <div className="h-screen bg-netflix-black flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <div className="relative w-full h-[70vh] overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.thumbnailUrl})` }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          
          {/* Content */}
          <div className="relative h-full content-container flex flex-col justify-end pb-24 pt-36">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
              <div className="flex items-center space-x-4 text-sm mb-4">
                <span className="text-green-500 font-medium">{movie.rating}</span>
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <span className="px-2 py-1 bg-netflix-darkgray rounded text-xs">
                  {movie.genre.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(", ")}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Movie Info */}
        <div className="content-container -mt-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-lg mb-6">{movie.description}</p>
              
              <Button asChild size="lg" className="bg-netflix-red hover:bg-netflix-red/90 w-full sm:w-auto">
                <Link to={`/watch/${movie.id}`}>
                  <Play className="mr-2 h-5 w-5" />
                  Play
                </Link>
              </Button>
            </div>
            
            <div className="bg-netflix-darkgray rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Movie Info</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">Rating</p>
                  <p>{movie.rating}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Release year</p>
                  <p>{movie.year}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p>{movie.duration}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Genres</p>
                  <p>{movie.genre.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(", ")}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Similar Movies */}
          {similarMovies.length > 0 && (
            <div className="mt-12">
              <MovieRow title="More Like This" movies={similarMovies} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MovieDetailPage;
