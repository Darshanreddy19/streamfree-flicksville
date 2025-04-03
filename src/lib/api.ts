
// Mock data for our streaming service
// In a real app, this would come from an API

export interface Movie {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  genre: string[];
  year: number;
  duration: string;
  rating: string;
  videoUrl: string; // In a real app, this would be a URL to the actual video
}

export interface Genre {
  id: string;
  name: string;
}

// Mock genres
export const genres: Genre[] = [
  { id: "action", name: "Action" },
  { id: "comedy", name: "Comedy" },
  { id: "drama", name: "Drama" },
  { id: "fantasy", name: "Fantasy" },
  { id: "horror", name: "Horror" },
  { id: "romance", name: "Romance" },
  { id: "thriller", name: "Thriller" },
  { id: "sci-fi", name: "Sci-Fi" }
];

// Mock movie data
export const movies: Movie[] = [
  {
    id: "1",
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    genre: ["action", "sci-fi"],
    year: 1999,
    duration: "2h 16m",
    rating: "R",
    videoUrl: "https://example.com/videos/matrix"
  },
  {
    id: "2",
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    thumbnailUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    genre: ["action", "sci-fi", "thriller"],
    year: 2010,
    duration: "2h 28m",
    rating: "PG-13",
    videoUrl: "https://example.com/videos/inception"
  },
  {
    id: "3",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    thumbnailUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    genre: ["adventure", "drama", "sci-fi"],
    year: 2014,
    duration: "2h 49m",
    rating: "PG-13",
    videoUrl: "https://example.com/videos/interstellar"
  },
  {
    id: "4",
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    thumbnailUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    genre: ["drama"],
    year: 1994,
    duration: "2h 22m",
    rating: "R",
    videoUrl: "https://example.com/videos/shawshank"
  },
  {
    id: "5",
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    genre: ["action", "crime", "drama"],
    year: 2008,
    duration: "2h 32m",
    rating: "PG-13",
    videoUrl: "https://example.com/videos/dark-knight"
  },
  {
    id: "6",
    title: "Fight Club",
    description: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    thumbnailUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    genre: ["drama"],
    year: 1999,
    duration: "2h 19m",
    rating: "R",
    videoUrl: "https://example.com/videos/fight-club"
  },
  {
    id: "7",
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    thumbnailUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    genre: ["crime", "drama"],
    year: 1994,
    duration: "2h 34m",
    rating: "R",
    videoUrl: "https://example.com/videos/pulp-fiction"
  },
  {
    id: "8",
    title: "The Lord of the Rings: The Fellowship of the Ring",
    description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    genre: ["adventure", "fantasy"],
    year: 2001,
    duration: "2h 58m",
    rating: "PG-13",
    videoUrl: "https://example.com/videos/lotr-1"
  },
  {
    id: "9",
    title: "The Good, the Bad and the Ugly",
    description: "A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.",
    thumbnailUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    genre: ["western"],
    year: 1966,
    duration: "2h 58m",
    rating: "R",
    videoUrl: "https://example.com/videos/good-bad-ugly"
  },
  {
    id: "10",
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    thumbnailUrl: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    genre: ["drama", "romance"],
    year: 1994,
    duration: "2h 22m",
    rating: "PG-13",
    videoUrl: "https://example.com/videos/forrest-gump"
  },
  {
    id: "11",
    title: "Star Wars: Episode V - The Empire Strikes Back",
    description: "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett all over the galaxy.",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    genre: ["action", "adventure", "fantasy"],
    year: 1980,
    duration: "2h 4m",
    rating: "PG",
    videoUrl: "https://example.com/videos/star-wars-5"
  },
  {
    id: "12",
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    thumbnailUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    genre: ["crime", "drama"],
    year: 1972,
    duration: "2h 55m",
    rating: "R",
    videoUrl: "https://example.com/videos/godfather"
  }
];

// API Functions
export function getMovies(): Movie[] {
  return movies;
}

export function getMovie(id: string): Movie | undefined {
  return movies.find(movie => movie.id === id);
}

export function getMoviesByGenre(genreId: string): Movie[] {
  return movies.filter(movie => movie.genre.includes(genreId));
}

export function getFeaturedMovie(): Movie {
  // Return a random movie as featured
  return movies[Math.floor(Math.random() * movies.length)];
}

export function getGenres(): Genre[] {
  return genres;
}

export function searchMovies(query: string): Movie[] {
  query = query.toLowerCase();
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(query) || 
    movie.description.toLowerCase().includes(query)
  );
}
