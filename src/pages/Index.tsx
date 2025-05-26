
import { MainNavigation } from "@/components/ui/navigation";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { CartDrawer } from "@/components/cart/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      <CartDrawer />
      
      <main className="flex-grow">
        <Hero />
        <FeaturedProducts />
        <CategoryShowcase />
        
        {/* Newsletter Section */}
        <section className="bg-artful-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Creative Community</h2>
            <p className="max-w-xl mx-auto mb-8">
              Subscribe to our newsletter for exclusive offers, artist features, and early access to new releases
            </p>
            
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-artful-secondary"
                required
              />
              <button 
                type="submit"
                className="bg-white text-artful-primary font-medium px-6 py-3 rounded-md hover:bg-artful-light transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      
      <footer className="bg-artful-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Indiancient Arts & Craft</h3>
              <p className="text-gray-300 mb-4">
                Bringing traditional Indian artistry and craftsmanship to your doorstep since 2025
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><a href="/products?category=portrait" className="text-gray-300 hover:text-white">Portraits</a></li>
                <li><a href="/products?category=handicraft" className="text-gray-300 hover:text-white">Handicrafts</a></li>
                <li><a href="/products" className="text-gray-300 hover:text-white">All Products</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Information</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
                <li><a href="/faq" className="text-gray-300 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact Us</h4>
              <address className="not-italic text-gray-300">
                <p>123 Craft Street</p>
                <p>Delhi, India 110001</p>
                <p className="mt-2">Email: info@indiancient.com</p>
                <p>Phone: +91 98765 43210</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">&copy; 2025 Indiancient Arts & Craft. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
