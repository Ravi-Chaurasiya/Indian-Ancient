
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainNavigation } from "@/components/ui/navigation";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { getProductById } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, ChevronLeft, IndianRupee } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  const product = id ? getProductById(id) : undefined;
  
  // Redirect if product not found
  useEffect(() => {
    if (!product && id) {
      toast.error("Product not found");
      navigate("/products");
    }
  }, [product, id, navigate]);
  
  if (!product) {
    return null; // Will redirect in useEffect
  }
  
  const incrementQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(quantity + 1);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Simulate a slight delay for better UX
    setTimeout(() => {
      addItem(product, quantity);
      setIsAddingToCart(false);
    }, 300);
  };
  
  const handleAddToWishlist = () => {
    toast.success(`${product.name} added to your wishlist`);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      <CartDrawer />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb and Back Button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-artful-primary"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            
            {/* Product Information */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-lg text-gray-600 mt-2">By {product.artistName}</p>
              </div>
              
              <div className="text-2xl font-bold text-artful-primary flex items-center">
                <IndianRupee className="h-5 w-5 mr-1" />
                {Math.round(product.price)}
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-600">
                  {product.description}
                </p>
              </div>
              
              {/* Quantity Selector */}
              <div>
                <h3 className="text-lg font-medium mb-2">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button 
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="w-10 text-center">{quantity}</span>
                    <button 
                      onClick={incrementQuantity}
                      disabled={quantity >= product.stockQuantity}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stockQuantity} available
                  </span>
                </div>
              </div>
              
              {/* Tags */}
              <div>
                <h3 className="text-lg font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 bg-artful-primary hover:bg-artful-secondary text-white py-6"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleAddToWishlist}
                  className="flex-1 border-artful-primary text-artful-primary hover:bg-artful-primary hover:text-white py-6"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-artful-dark text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 Indiancient Arts & Craft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
