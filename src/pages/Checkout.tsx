
import { useState } from "react";
import { MainNavigation } from "@/components/ui/navigation";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { CheckCircle, CreditCard, ShoppingBag } from "lucide-react";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    setLoading(true);
    
    // Simulate order processing
    setTimeout(() => {
      setLoading(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };
  
  // Convert USD to INR (exchange rate approximately 1 USD = 85 INR)
  const rupeesPrice = totalPrice * 85;
  const rupeesTax = totalPrice * 0.08 * 85;
  const rupeesTotal = rupeesPrice + rupeesTax;
  
  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <MainNavigation />
        <CartDrawer />
        
        <main className="flex-grow py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold mb-4">Thank You for Your Order!</h1>
              <p className="text-gray-600 mb-8">
                Your order has been received and is being processed. 
                You will receive a confirmation email shortly.
              </p>
              <Button 
                onClick={() => navigate("/")}
                className="bg-artful-primary hover:bg-artful-secondary"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </main>
        
        <footer className="bg-artful-dark text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 ArtfulHaven. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      <CartDrawer />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Shipping Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-medium mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="state">State / Province</Label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">PIN Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Payment Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center mb-6">
                    <h2 className="text-xl font-medium">Payment Information</h2>
                    <CreditCard className="ml-2 h-5 w-5 text-artful-primary" />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="•••• •••• •••• ••••"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardExpiry">Expiration Date</Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cardCvc">CVC</Label>
                      <Input
                        id="cardCvc"
                        name="cardCvc"
                        placeholder="•••"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/cart")}
                  >
                    Return to Cart
                  </Button>
                  
                  <Button 
                    type="submit" 
                    className="bg-artful-primary hover:bg-artful-secondary"
                    disabled={loading || items.length === 0}
                  >
                    {loading ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-medium mb-6">Order Summary</h2>
                
                {items.length === 0 ? (
                  <div className="text-center py-6">
                    <p className="text-gray-500 mb-4">Your cart is empty</p>
                    <Button 
                      asChild 
                      variant="outline" 
                      className="inline-flex items-center"
                    >
                      <a href="/products">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Shop Now
                      </a>
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="max-h-60 overflow-y-auto mb-4">
                      {items.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex items-center gap-3 py-2 border-b last:border-0"
                        >
                          <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-1">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            ₹{(item.price * item.quantity * 85).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>₹{rupeesPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>₹{rupeesTax.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total</span>
                        <span>₹{rupeesTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
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

export default Checkout;
