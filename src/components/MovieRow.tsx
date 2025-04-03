
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieCard from "@/components/MovieCard";
import { type Movie } from "@/lib/api";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

const MovieRow = ({ title, movies }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth / 1.5
        : scrollLeft + clientWidth / 1.5;
      
      rowRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth"
      });
    }
  };

  if (movies.length === 0) {
    return null;
  }

  return (
    <div className="py-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      
      <div className="relative group">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <div 
          ref={rowRef}
          className="flex space-x-4 overflow-x-scroll scrollbar-hide py-4 pl-2 pr-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div 
              key={movie.id} 
              className="flex-none w-[180px] md:w-[240px] h-[120px] md:h-[140px]"
            >
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default MovieRow;
