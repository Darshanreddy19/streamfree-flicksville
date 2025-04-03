
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-netflix-black shadow-md" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="content-container py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-netflix-red font-bold text-2xl md:text-3xl">
            FLICKSVILLE
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link to="/browse" className="text-white hover:text-gray-300 transition-colors">
              Movies
            </Link>
            <Link to="/browse" className="text-white hover:text-gray-300 transition-colors">
              TV Shows
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          {isSearchVisible ? (
            <div className="relative flex items-center">
              <Input
                type="text"
                placeholder="Titles, people, genres"
                className="bg-black/80 border-netflix-gray text-white pr-10 pl-4 py-2 w-[200px] md:w-[260px] focus:ring-netflix-red"
                autoFocus
                onBlur={() => setIsSearchVisible(false)}
              />
              <Search className="absolute right-3 h-4 w-4 text-gray-400" />
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchVisible(true)}
              className="text-white hover:text-netflix-red"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
