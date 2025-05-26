
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MainNavigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CartDrawer } from "@/components/cart/CartDrawer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      <CartDrawer />
      
      <main className="flex-grow flex items-center justify-center bg-artful-soft-bg">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-artful-primary mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oops! We couldn't find the page you're looking for.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-artful-primary hover:bg-artful-secondary">
              <Link to="/">Return to Home</Link>
            </Button>
            <Button asChild variant="outline" className="border-artful-primary text-artful-primary hover:bg-artful-primary hover:text-white">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="bg-artful-dark text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 ArtfulHaven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
