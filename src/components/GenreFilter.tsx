
import { Button } from "@/components/ui/button";
import { type Genre } from "@/lib/api";

interface GenreFilterProps {
  genres: Genre[];
  selectedGenre: string | null;
  onSelectGenre: (genreId: string | null) => void;
}

const GenreFilter = ({ genres, selectedGenre, onSelectGenre }: GenreFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 py-4">
      <Button
        variant={selectedGenre === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSelectGenre(null)}
        className={selectedGenre === null ? "bg-netflix-red hover:bg-netflix-red/90" : ""}
      >
        All
      </Button>
      
      {genres.map((genre) => (
        <Button
          key={genre.id}
          variant={selectedGenre === genre.id ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectGenre(genre.id)}
          className={selectedGenre === genre.id ? "bg-netflix-red hover:bg-netflix-red/90" : ""}
        >
          {genre.name}
        </Button>
      ))}
    </div>
  );
};

export default GenreFilter;
