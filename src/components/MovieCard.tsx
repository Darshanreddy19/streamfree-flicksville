
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import { type Movie } from "@/lib/api";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="movie-card group">
      <Link to={`/movie/${movie.id}`} className="block w-full h-full">
        <img 
          src={movie.thumbnailUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover rounded-md"
          loading="lazy"
        />
        <div className="movie-card-overlay"></div>
        <div className="movie-info">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-medium text-sm md:text-base line-clamp-1">{movie.title}</h3>
            <Link 
              to={`/watch/${movie.id}`} 
              className="bg-white rounded-full p-1 text-black opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label={`Play ${movie.title}`}
            >
              <Play className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex items-center text-xs text-gray-400 space-x-2">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.duration}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
