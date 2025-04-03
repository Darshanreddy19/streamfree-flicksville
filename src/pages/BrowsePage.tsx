
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import GenreFilter from "@/components/GenreFilter";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getMovies, getGenres, getMoviesByGenre, searchMovies, type Movie, type Genre } from "@/lib/api";

const BrowsePage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    // Load genres
    const allGenres = getGenres();
    setGenres(allGenres);
    
    // Load movies
    handleFilterChange(selectedGenre);
  }, [selectedGenre]);
  
  const handleFilterChange = (genreId: string | null) => {
    let filteredMovies: Movie[];
    
    if (genreId) {
      filteredMovies = getMoviesByGenre(genreId);
    } else {
      filteredMovies = getMovies();
    }
    
    // Apply search if there's a query
    if (searchQuery) {
      filteredMovies = searchMovies(searchQuery).filter(movie => 
        genreId ? movie.genre.includes(genreId) : true
      );
    }
    
    setMovies(filteredMovies);
  };
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query) {
      const results = searchMovies(query);
      setMovies(selectedGenre 
        ? results.filter(movie => movie.genre.includes(selectedGenre)) 
        : results
      );
    } else {
      handleFilterChange(selectedGenre);
    }
  };
  
  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <main className="content-container py-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">
            {selectedGenre 
              ? `${genres.find(g => g.id === selectedGenre)?.name} Movies` 
              : searchQuery 
                ? "Search Results" 
                : "Browse All"
            }
          </h1>
          
          <div className="relative">
            <Input
              type="text"
              placeholder="Search titles..."
              className="bg-netflix-darkgray border-netflix-gray text-white pr-10 w-full md:w-[300px]"
              value={searchQuery}
              onChange={handleSearch}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <GenreFilter 
          genres={genres} 
          selectedGenre={selectedGenre} 
          onSelectGenre={setSelectedGenre} 
        />
        
        {movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8">
            {movies.map((movie) => (
              <div key={movie.id} className="h-[200px] sm:h-[220px]">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-gray-400 text-lg mb-2">No movies found</p>
            <p className="text-gray-500">Try adjusting your filter or search</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BrowsePage;
