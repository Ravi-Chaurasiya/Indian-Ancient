
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function MainNavigation() {
  const { setIsCartOpen, totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // For demo purposes - in a real app, this would come from your auth context
  const isLoggedIn = false;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold text-artful-primary">
            Indiancient Arts & Craft
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-artful-primary transition-colors">
              Home
            </Link>
            <Link to="/products?category=portrait" className="text-gray-700 hover:text-artful-primary transition-colors">
              Portraits
            </Link>
            <Link to="/products?category=handicraft" className="text-gray-700 hover:text-artful-primary transition-colors">
              Handicrafts
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-artful-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Desktop Search and Cart */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-40 pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            </form>
            
            {isLoggedIn ? (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/profile')}
                className="relative"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-artful-primary text-white">U</AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => navigate('/login')}
                className="relative"
              >
                <User className="h-5 w-5" />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-artful-primary text-white">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {isLoggedIn ? (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/profile')}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-artful-primary text-white">U</AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/login')}
              >
                <User className="h-5 w-5" />
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-artful-primary text-white">
                  {totalItems}
                </Badge>
              )}
            </Button>
            
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            </form>
            
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-artful-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products?category=portrait" 
                className="text-gray-700 hover:text-artful-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Portraits
              </Link>
              <Link 
                to="/products?category=handicraft" 
                className="text-gray-700 hover:text-artful-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Handicrafts
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-artful-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {!isLoggedIn && (
                <>
                  <div className="border-t border-gray-100 pt-4 mt-2"></div>
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-artful-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="text-gray-700 hover:text-artful-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
