
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '@/lib/products';
import { toast } from 'sonner';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Calculate totals
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('artful-cart');
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);
  
  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('artful-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Check stock quantity
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stockQuantity) {
          toast.error(`Sorry, only ${product.stockQuantity} items available`);
          return prevItems;
        }
        
        // Update quantity of existing item
        const updatedItems = prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: newQuantity } 
            : item
        );
        
        toast.success(`Updated ${product.name} quantity in cart`);
        return updatedItems;
      } else {
        // Check stock quantity for new item
        if (quantity > product.stockQuantity) {
          toast.error(`Sorry, only ${product.stockQuantity} items available`);
          return prevItems;
        }
        
        // Add new item
        toast.success(`Added ${product.name} to cart`);
        return [...prevItems, { ...product, quantity }];
      }
    });
    
    setIsCartOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        toast.info(`Removed ${itemToRemove.name} from cart`);
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === productId) {
          // Check stock quantity
          if (quantity > item.stockQuantity) {
            toast.error(`Sorry, only ${item.stockQuantity} items available`);
            return item;
          }
          
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setItems([]);
    toast.info('Cart has been cleared');
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
