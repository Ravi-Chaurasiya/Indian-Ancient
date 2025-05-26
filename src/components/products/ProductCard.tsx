
import { Link } from "react-router-dom";
import { Product } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, IndianRupee } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    addItem(product, 1);
  };
  
  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          <span className="font-semibold text-artful-primary flex items-center">
            <IndianRupee className="h-3 w-3 mr-1" />
            {Math.round(product.price)}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-end mt-4">
          <Button 
            size="sm"
            onClick={handleAddToCart}
            className="bg-artful-primary hover:bg-artful-secondary"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
        
        {product.stockQuantity <= 5 && (
          <p className="text-xs text-red-500 mt-2">
            Only {product.stockQuantity} left in stock
          </p>
        )}
      </div>
    </Link>
  );
}
