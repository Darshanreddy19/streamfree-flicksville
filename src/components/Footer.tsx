
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 bg-netflix-black border-t border-netflix-gray">
      <div className="content-container">
        <div className="text-center md:text-left">
          <Link to="/" className="text-netflix-red font-bold text-2xl">
            FLICKSVILLE
          </Link>
          
          <p className="text-gray-400 mt-4 text-sm">
            A free streaming service. This is a demo project.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          <div>
            <h3 className="text-white font-medium mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/browse" className="hover:text-white transition-colors">Movies</Link></li>
              <li><Link to="/browse" className="hover:text-white transition-colors">TV Shows</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Genres</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/browse" className="hover:text-white transition-colors">Action</Link></li>
              <li><Link to="/browse" className="hover:text-white transition-colors">Comedy</Link></li>
              <li><Link to="/browse" className="hover:text-white transition-colors">Drama</Link></li>
              <li><Link to="/browse" className="hover:text-white transition-colors">Sci-Fi</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Help</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">About</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Company</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Flicksville. All rights reserved.</p>
          <p className="mt-2">This is a demo project and not a real streaming service.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
