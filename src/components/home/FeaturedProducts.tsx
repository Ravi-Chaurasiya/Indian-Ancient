
import { getFeaturedProducts, Product } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();
  
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Creations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most loved portraits and handicrafts, each piece telling its own unique story
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="border-artful-primary text-artful-primary hover:bg-artful-primary hover:text-white">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
