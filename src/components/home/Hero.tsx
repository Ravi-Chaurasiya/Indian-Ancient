
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="relative bg-artful-soft-bg py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left space-y-6 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-artful-dark leading-tight">
              Discover Unique <span className="text-artful-primary">Artistic</span> Treasures
            </h1>
            <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
              Handcrafted portraits and artisanal creations that bring warmth and character to your space.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button asChild className="bg-artful-primary hover:bg-artful-secondary text-white px-8 py-6">
                <Link to="/products?category=portrait">Explore Portraits</Link>
              </Button>
              <Button asChild variant="outline" className="border-artful-primary text-artful-primary hover:bg-artful-primary hover:text-white px-8 py-6">
                <Link to="/products?category=handicraft">Discover Handicrafts</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-xl rotate-3 hover-shadow">
              <img 
                src="/placeholder.svg" 
                alt="Artistic Portrait" 
                className="rounded w-full h-auto object-cover aspect-[4/3]" 
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white p-3 md:p-5 rounded-lg shadow-lg -rotate-6 hover-shadow hidden md:block">
              <img 
                src="/placeholder.svg" 
                alt="Handcrafted Item" 
                className="rounded w-32 h-32 object-cover" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-12 left-12 w-24 h-24 bg-artful-light opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-12 right-12 w-32 h-32 bg-artful-tertiary opacity-10 rounded-full blur-3xl"></div>
    </section>
  );
}
