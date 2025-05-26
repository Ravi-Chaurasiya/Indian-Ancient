
import { useState, useEffect } from "react";
import { MainNavigation } from "@/components/ui/navigation";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { filterProducts, ProductFilters, ProductCategory } from "@/lib/products";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FilterX } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<ProductFilters>({});
  const [filteredProducts, setFilteredProducts] = useState(filterProducts({}));
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  
  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get("category") as ProductCategory | null;
    const search = searchParams.get("search");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    
    const newFilters: ProductFilters = {};
    
    if (category) newFilters.category = category;
    if (search) {
      newFilters.searchQuery = search;
      setSearchQuery(search);
    }
    if (min) {
      const minValue = parseInt(min);
      newFilters.minPrice = minValue;
      setPriceRange(prev => [minValue, prev[1]]);
    }
    if (max) {
      const maxValue = parseInt(max);
      newFilters.maxPrice = maxValue;
      setPriceRange(prev => [prev[0], maxValue]);
    }
    
    setFilters(newFilters);
    
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [searchParams]);
  
  // Apply filters and update products
  useEffect(() => {
    setFilteredProducts(filterProducts(filters));
  }, [filters]);
  
  // Update URL when filters change
  useEffect(() => {
    const newParams = new URLSearchParams();
    
    if (filters.category) newParams.set("category", filters.category);
    if (filters.searchQuery) newParams.set("search", filters.searchQuery);
    if (filters.minPrice !== undefined) newParams.set("min", filters.minPrice.toString());
    if (filters.maxPrice !== undefined) newParams.set("max", filters.maxPrice.toString());
    
    setSearchParams(newParams);
  }, [filters, setSearchParams]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({
      ...filters,
      searchQuery: searchQuery
    });
  };
  
  const handleCategoryChange = (category: ProductCategory | "all") => {
    if (category === "all") {
      const { category, ...otherFilters } = filters;
      setFilters(otherFilters);
    } else {
      setFilters({
        ...filters,
        category
      });
    }
  };
  
  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
  };
  
  const applyPriceFilter = () => {
    setFilters({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    });
  };
  
  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 500]);
    setFilters({});
  };
  
  const getPageTitle = () => {
    if (filters.category === "portrait") return "Portraits";
    if (filters.category === "handicraft") return "Handicrafts";
    return "All Products";
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavigation />
      <CartDrawer />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-64">
              <div className="bg-white rounded-lg shadow-sm p-5 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="h-8 text-gray-500 hover:text-artful-primary"
                  >
                    <FilterX className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                </div>
                
                <Accordion type="single" collapsible defaultValue="category">
                  {/* Category Filter */}
                  <AccordionItem value="category">
                    <AccordionTrigger>Category</AccordionTrigger>
                    <AccordionContent>
                      <RadioGroup 
                        value={filters.category || "all"} 
                        onValueChange={(value) => handleCategoryChange(value as ProductCategory | "all")}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="all" id="all" />
                          <Label htmlFor="all">All Products</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="portrait" id="portrait" />
                          <Label htmlFor="portrait">Portraits</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="handicraft" id="handicraft" />
                          <Label htmlFor="handicraft">Handicrafts</Label>
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>
                  
                  {/* Price Filter */}
                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <Slider 
                          min={0}
                          max={500}
                          step={10}
                          value={priceRange}
                          onValueChange={handlePriceRangeChange}
                          className="mt-6"
                        />
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm">
                            ${priceRange[0]}
                          </span>
                          <span className="text-sm">
                            ${priceRange[1]}
                          </span>
                        </div>
                        
                        <Button 
                          onClick={applyPriceFilter} 
                          className="w-full bg-artful-primary hover:bg-artful-secondary"
                          size="sm"
                        >
                          Apply Filter
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </aside>
            
            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{getPageTitle()}</h1>
                  <p className="text-gray-600 mt-1">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                  </p>
                </div>
                
                <form onSubmit={handleSearch} className="relative w-full sm:w-auto">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full sm:w-64 pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    className="absolute left-2.5 top-2.5 text-gray-500"
                  >
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                  </button>
                </form>
              </div>
              
              <ProductGrid products={filteredProducts} isLoading={loading} />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-artful-dark text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 ArtfulHaven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Products;
