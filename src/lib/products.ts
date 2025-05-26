
import { toast } from "sonner";

export type ProductCategory = 'portrait' | 'handicraft';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  featured?: boolean;
  stockQuantity: number;
  artistName: string;
  tags: string[];
}

// Conversion rate from USD to INR (approximate)
const INR_CONVERSION_RATE = 75;

export const products: Product[] = [
  {
    id: "portrait-1",
    name: "Custom Oil Portrait",
    description: "Hand-painted custom oil portrait created from your favorite photo. Each portrait captures the essence and personality of the subject with exquisite detail and vibrant colors.",
    price: 299.99 * INR_CONVERSION_RATE,
    imageUrl: "/placeholder.svg",
    category: "portrait",
    featured: true,
    stockQuantity: 5,
    artistName: "Elena Rodríguez",
    tags: ["oil", "custom", "portrait", "painting"]
  },
  {
    id: "portrait-2",
    name: "Charcoal Sketch Portrait",
    description: "Elegant charcoal sketch portrait that brings depth and emotion to your memories. These timeless black and white portraits make wonderful gifts and keepsakes.",
    price: 149.99 * INR_CONVERSION_RATE,
    imageUrl: "/placeholder.svg",
    category: "portrait",
    featured: false,
    stockQuantity: 10,
    artistName: "Marcus Chen",
    tags: ["charcoal", "sketch", "portrait", "black and white"]
  },
  {
    id: "portrait-3",
    name: "Watercolor Family Portrait",
    description: "Beautiful watercolor family portrait with soft, flowing colors that capture the warmth of your family moments. Perfect for displaying in living rooms or giving as meaningful gifts.",
    price: 199.99 * INR_CONVERSION_RATE,
    imageUrl: "/placeholder.svg",
    category: "portrait",
    featured: true,
    stockQuantity: 3,
    artistName: "Sophie Martin",
    tags: ["watercolor", "family", "portrait", "colorful"]
  },
  {
    id: "portrait-4",
    name: "Digital Pet Portrait",
    description: "Vibrant digital portrait of your beloved pet rendered with the latest digital painting techniques. Captures your pet's unique personality and charm.",
    price: 89.99 * INR_CONVERSION_RATE,
    imageUrl: "/placeholder.svg",
    category: "portrait",
    featured: false,
    stockQuantity: 15,
    artistName: "Alex Johnson",
    tags: ["digital", "pet", "portrait", "modern"]
  },
  {
    id: "handicraft-1",
    name: "Hand-woven Wool Basket",
    description: "Beautifully crafted hand-woven wool basket perfect for storage or as a decorative piece. Each basket features traditional patterns with a modern twist.",
    price: 79.99 * INR_CONVERSION_RATE,
    imageUrl: "/placeholder.svg",
    category: "handicraft",
    featured: true,
    stockQuantity: 7,
    artistName: "Nadia Patel",
    tags: ["basket", "wool", "woven", "storage", "decor"]
  },
  {
    id: "handicraft-2",
    name: "Ceramic Flower Vase",
    description: "Handcrafted ceramic vase with a unique glaze that changes appearance depending on lighting. Perfect for displaying fresh or dried flower arrangements.",
    price: 59.99 * INR_CONVERSION_RATE,
    imageUrl: "/placeholder.svg",
    category: "handicraft",
    featured: true,
    stockQuantity: 12,
    artistName: "Thomas Wright",
    tags: ["ceramic", "vase", "pottery", "home decor"]
  },
  {
    id: "handicraft-3",
    name: "Macramé Wall Hanging",
    description: "Intricately designed macramé wall hanging made from natural cotton rope. Adds texture and artistic flair to any room in your home.",
    price: 45.99 * INR_CONVERSION_RATE,
    imageUrl: "/placeholder.svg",
    category: "handicraft",
    featured: false,
    stockQuantity: 8,
    artistName: "Leila Sánchez",
    tags: ["macrame", "wall hanging", "cotton", "boho", "decor"]
  },
  {
    id: "handicraft-4",
    name: "Handmade Wooden Jewelry Box",
    description: "Elegantly crafted wooden jewelry box with intricate inlay work and multiple compartments for all your treasures. Made from sustainable hardwoods.",
    price: 129.99 * INR_CONVERSION_RATE,
    imageUrl: "/placeholder.svg",
    category: "handicraft",
    featured: false,
    stockQuantity: 4,
    artistName: "Henry Kim",
    tags: ["wooden", "jewelry box", "handmade", "storage"]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return products.filter(product => product.category === category);
};

export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
}

export const filterProducts = (filters: ProductFilters): Product[] => {
  return products.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    
    // Price range filter
    if (filters.minPrice !== undefined && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && product.price > filters.maxPrice) {
      return false;
    }
    
    // Search query filter
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      const matchesQuery = 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.artistName.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query));
        
      if (!matchesQuery) {
        return false;
      }
    }
    
    return true;
  });
};
