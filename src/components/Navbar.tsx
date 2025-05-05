
import { Link, useLocation } from 'react-router-dom';
import { Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
        <Link to="/" className="flex items-center gap-2 mb-4 sm:mb-0">
          <Plane className="h-6 w-6 text-sky-600" />
          <span className="font-display font-bold text-xl text-sky-600">FlyAway</span>
        </Link>
        
        <div className="flex gap-4">
          <Button 
            variant={isActive('/') ? "default" : "ghost"} 
            asChild
            className="font-medium"
          >
            <Link to="/">Home</Link>
          </Button>
          
          <Button 
            variant={isActive('/search') ? "default" : "ghost"} 
            asChild
            className="font-medium"
          >
            <Link to="/search">Search Flights</Link>
          </Button>
          
          <Button 
            variant={isActive('/bookings') ? "default" : "ghost"} 
            asChild
            className="font-medium"
          >
            <Link to="/bookings">My Bookings</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
