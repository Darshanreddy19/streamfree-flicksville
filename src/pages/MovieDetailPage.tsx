
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Play, Info, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";
import { getMovie, getMoviesByGenre, type Movie } from "@/lib/api";
import { toast } from "@/lib/toast";

const MovieDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
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
          document.title = `${movieData.title} | StreamFree`;
          
          // Get similar movies based on first genre
          if (movieData.genre.length > 0) {
            const similar = getMoviesByGenre(movieData.genre[0]).filter(m => m.id !== id);
            setSimilarMovies(similar);
          }
        } else {
          toast.error("Movie not found");
          navigate("/browse");
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
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="h-[80vh] flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-t-2 border-netflix-red border-solid rounded-full animate-spin"></div>
            <p className="text-gray-400">Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
            <p className="text-gray-400 mb-6">The movie you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/browse">Browse Movies</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
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
              <div className="flex items-center space-x-4 text-sm mb-6">
                <span className="text-green-500 font-medium">{movie.rating}</span>
                <span>{movie.year}</span>
                <span>{movie.duration}</span>
                <span className="px-2 py-1 bg-netflix-darkgray rounded text-xs">
                  {movie.genre.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(", ")}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button asChild size="lg" className="bg-netflix-red hover:bg-netflix-red/90 group transition-all duration-300">
                  <Link to={`/watch/${movie.id}`} className="flex items-center">
                    <Play className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform" />
                    Watch Now
                  </Link>
                </Button>
                
                <Button variant="secondary" size="lg" className="group">
                  <Plus className="mr-2 h-5 w-5 group-hover:rotate-90 transition-transform" />
                  My List
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Movie Info */}
        <div className="content-container -mt-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-lg mb-6">{movie.description}</p>
              
              <div className="bg-netflix-darkgray rounded-lg p-6 mb-6">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <h3 className="text-lg font-semibold">Critics Review</h3>
                </div>
                <p className="italic text-gray-300">
                  "An excellent film that captivates the audience from start to finish with its compelling narrative and stunning visuals."
                </p>
              </div>
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
