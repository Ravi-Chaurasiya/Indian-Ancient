
import { Button } from "@/components/ui/button";
import { CartItem as ICartItem, useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: ICartItem;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  
  const incrementQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeItem(item.id);
    }
  };
  
  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-200">
      <Link 
        to={`/product/${item.id}`} 
        className="shrink-0 w-20 h-20 bg-gray-100 rounded overflow-hidden"
      >
        <img 
          src={item.imageUrl} 
          alt={item.name} 
          className="w-full h-full object-cover" 
        />
      </Link>
      
      <div className="flex-1 min-w-0">
        <Link 
          to={`/product/${item.id}`}
          className="font-medium text-gray-900 hover:text-artful-primary line-clamp-1"
        >
          {item.name}
        </Link>
        
        <div className="text-sm text-gray-500 mt-1">
          ₹{(item.price * 85).toFixed(2)} each
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-1 border rounded-md">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={decrementQuantity}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease</span>
            </Button>
            
            <span className="w-8 text-center text-sm">
              {item.quantity}
            </span>
            
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={incrementQuantity}
              disabled={item.quantity >= item.stockQuantity}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove</span>
          </Button>
        </div>
      </div>
      
      <div className="text-right">
        <div className="font-medium">
          ₹{(item.price * item.quantity * 85).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
