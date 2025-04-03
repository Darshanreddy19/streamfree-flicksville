
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FeaturedMovie from "@/components/FeaturedMovie";
import MovieRow from "@/components/MovieRow";
import Footer from "@/components/Footer";
import { getMovies, getMoviesByGenre, getFeaturedMovie, type Movie } from "@/lib/api";

const HomePage = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [dramaMovies, setDramaMovies] = useState<Movie[]>([]);
  
  useEffect(() => {
    // Get featured movie
    const featured = getFeaturedMovie();
    setFeaturedMovie(featured);
    
    // Get trending movies (using all movies for demo)
    const allMovies = getMovies();
    setTrendingMovies(allMovies);
    
    // Get movies by genres
    const action = getMoviesByGenre("action");
    setActionMovies(action);
    
    const drama = getMoviesByGenre("drama");
    setDramaMovies(drama);
  }, []);
  
  if (!featuredMovie) {
    return <div className="h-screen bg-netflix-black flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <main>
        <FeaturedMovie movie={featuredMovie} />
        
        <div className="content-container -mt-12 relative z-20">
          <MovieRow title="Trending Now" movies={trendingMovies} />
          <MovieRow title="Action Movies" movies={actionMovies} />
          <MovieRow title="Drama Movies" movies={dramaMovies} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
