
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-netflix-black flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-6 text-netflix-red">404</h1>
      <p className="text-xl mb-10 text-center">Oops! The page you're looking for isn't available.</p>
      
      <Button asChild className="bg-netflix-red hover:bg-netflix-red/90">
        <Link to="/">
          <Home className="mr-2 h-5 w-5" />
          Back to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
