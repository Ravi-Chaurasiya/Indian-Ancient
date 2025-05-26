
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CategoryShowcase() {
  return (
    <section className="section-padding bg-artful-soft-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each piece in our collection is carefully selected for its artistic value and craftsmanship
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Portraits Category */}
          <div className="group relative overflow-hidden rounded-lg shadow-lg hover-shadow h-80">
            <img 
              src="/placeholder.svg" 
              alt="Portrait Collection" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Portraits</h3>
              <p className="text-sm mb-4 opacity-90 text-center">
                Custom artwork that captures the essence of your loved ones
              </p>
              <Button asChild className="bg-white text-artful-dark hover:bg-artful-light">
                <Link to="/products?category=portrait">Explore Portraits</Link>
              </Button>
            </div>
          </div>
          
          {/* Handicrafts Category */}
          <div className="group relative overflow-hidden rounded-lg shadow-lg hover-shadow h-80">
            <img 
              src="/placeholder.svg" 
              alt="Handicraft Collection" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end p-8 text-white">
              <h3 className="text-2xl font-bold mb-2">Handicrafts</h3>
              <p className="text-sm mb-4 opacity-90 text-center">
                Handmade treasures crafted with passion and attention to detail
              </p>
              <Button asChild className="bg-white text-artful-dark hover:bg-artful-light">
                <Link to="/products?category=handicraft">Discover Handicrafts</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-artful-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-artful-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Artisan Crafted</h3>
            <p className="text-gray-600">
              Each piece is handmade by skilled artisans using traditional techniques
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-artful-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-artful-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Made with Love</h3>
            <p className="text-gray-600">
              Our artists pour their hearts into every creation, ensuring a unique final piece
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-artful-light rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-artful-primary">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Shipping</h3>
            <p className="text-gray-600">
              Carefully packaged and insured to ensure your artwork arrives safely
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
