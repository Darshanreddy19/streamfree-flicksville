
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { type Movie } from "@/lib/api";

interface FeaturedMovieProps {
  movie: Movie;
}

const FeaturedMovie = ({ movie }: FeaturedMovieProps) => {
  return (
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
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
          <div className="flex items-center space-x-4 text-sm mb-4">
            <span className="text-green-500 font-medium">{movie.rating}</span>
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
          </div>
          <p className="text-lg text-gray-300 mb-8 line-clamp-3">{movie.description}</p>
          <div className="flex space-x-4">
            <Button asChild size="lg" className="bg-netflix-red hover:bg-netflix-red/90">
              <Link to={`/watch/${movie.id}`}>
                <Play className="mr-2 h-5 w-5" />
                Play
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to={`/movie/${movie.id}`}>
                More Info
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMovie;
