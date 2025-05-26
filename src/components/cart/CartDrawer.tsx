
import { Button } from "@/components/ui/button";
import { ShoppingBag, X, ShoppingCart } from "lucide-react";
import { CartItem } from "./CartItem";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, totalItems, totalPrice, clearCart } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="space-y-0 mb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Your Cart ({totalItems})
            </SheetTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsCartOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </SheetHeader>
        
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-4 h-full text-center">
              <ShoppingCart className="h-12 w-12 text-gray-300" />
              <div>
                <h3 className="font-medium text-lg">Your cart is empty</h3>
                <p className="text-gray-500 mt-1">
                  Add some beautiful items to your cart and they'll appear here
                </p>
              </div>
              <Button 
                onClick={() => setIsCartOpen(false)}
                className="bg-artful-primary hover:bg-artful-secondary mt-2"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              
              <div className="border-t border-gray-200 mt-auto pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                
                <div className="flex justify-between font-medium text-lg mb-4">
                  <span>Total</span>
                  <span>₹{(totalPrice * 85).toFixed(2)}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                  
                  <Button 
                    asChild
                    className="bg-artful-primary hover:bg-artful-secondary"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <Link to="/checkout">
                      Checkout
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
