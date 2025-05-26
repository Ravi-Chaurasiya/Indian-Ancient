
import { MainNavigation } from "@/components/ui/navigation";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, ShoppingCart } from "lucide-react";
import { CartItem } from "@/components/cart/CartItem";

const Cart = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      <CartDrawer />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <ShoppingCart className="h-8 w-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                Looks like you haven't added any items to your cart yet. 
                Explore our collection to find something special!
              </p>
              <Button asChild className="bg-artful-primary hover:bg-artful-secondary">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium">
                    Items ({totalItems})
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearCart}
                    className="text-gray-500 hover:text-red-500"
                  >
                    Clear Cart
                  </Button>
                </div>
                
                <div className="divide-y">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
                
                <div className="mt-8">
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <Link to="/products">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6 h-fit sticky top-20">
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{(totalPrice * 85).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>₹{(totalPrice * 85).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  asChild 
                  className="w-full bg-artful-primary hover:bg-artful-secondary text-white"
                >
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-artful-dark text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 ArtfulHaven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
