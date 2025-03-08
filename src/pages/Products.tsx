
import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilteredProducts } from "@/data/products";
import { Product } from "@/components/common/ProductCard";
import ProductCard from "@/components/common/ProductCard";
import { Filter, ChevronDown, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Newsletter from "@/components/common/Newsletter";

const ProductsPage = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      // In a real app, this would be an API call with filters
      const filteredProducts = getFilteredProducts({
        category: category || searchParams.get("category") || undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      });
      
      setProducts(filteredProducts);
    };
    
    fetchProducts();
  }, [category, searchParams, priceRange]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) 
    : "All Products";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <a href="/" className="hover:text-black">Home</a>
        <span>/</span>
        {category && (
          <>
            <a href="/products" className="hover:text-black">Shop</a>
            <span>/</span>
          </>
        )}
        <span className="font-medium text-black">{categoryTitle}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-medium text-lg">Filters</h2>
            <Sliders size={20} />
          </div>

          {/* Categories Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Categories</h3>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <a href="/products/t-shirts" className="text-sm hover:text-black">T-shirts</a>
                <ChevronDown size={16} className="text-gray-400" />
              </li>
              <li className="flex justify-between items-center">
                <a href="/products/shirts" className="text-sm hover:text-black">Shirts</a>
                <ChevronDown size={16} className="text-gray-400" />
              </li>
              <li className="flex justify-between items-center">
                <a href="/products/jeans" className="text-sm hover:text-black">Jeans</a>
                <ChevronDown size={16} className="text-gray-400" />
              </li>
              <li className="flex justify-between items-center">
                <a href="/products/shorts" className="text-sm hover:text-black">Shorts</a>
                <ChevronDown size={16} className="text-gray-400" />
              </li>
              <li className="flex justify-between items-center">
                <a href="/products/hoodie" className="text-sm hover:text-black">Hoodie</a>
                <ChevronDown size={16} className="text-gray-400" />
              </li>
            </ul>
          </div>

          {/* Price Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Price</h3>
            <div className="px-1">
              <Slider
                defaultValue={[0, 300]}
                max={300}
                step={10}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="mb-4"
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Colors Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Colors</h3>
            <div className="flex flex-wrap gap-2">
              {["green", "red", "yellow", "orange", "blue", "purple", "pink", "white", "black"].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full border border-gray-200`}
                  style={{ backgroundColor: color }}
                  aria-label={`Filter by ${color}`}
                />
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
                <button
                  key={size}
                  className="py-1 px-3 border border-gray-200 rounded text-sm hover:border-black"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Dress Style Filter */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Dress Style</h3>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <a href="/products?style=casual" className="text-sm hover:text-black">Casual</a>
                <ChevronDown size={16} className="text-gray-400" />
              </li>
              <li className="flex justify-between items-center">
                <a href="/products?style=formal" className="text-sm hover:text-black">Formal</a>
                <ChevronDown size={16} className="text-gray-400" />
              </li>
              <li className="flex justify-between items-center">
                <a href="/products?style=party" className="text-sm hover:text-black">Party</a>
                <ChevronDown size={16} className="text-gray-400" />
              </li>
              <li className="flex justify-between items-center">
                <a href="/products?style=gym" className="text-sm hover:text-black">Gym</a>
                <ChevronDown size={16} className="text-gray-400" />
              </li>
            </ul>
          </div>

          <Button variant="outline" className="w-full rounded-full">
            Apply Filter
          </Button>
        </div>

        {/* Mobile Filters Button */}
        <div className="md:hidden mb-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={toggleFilters}
          >
            <Filter size={18} />
            <span>Filters</span>
          </Button>
          
          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="fixed inset-0 bg-white z-50 p-4 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-medium text-lg">Filters</h2>
                <button onClick={toggleFilters}>
                  <X size={24} />
                </button>
              </div>
              
              {/* Categories Filter - Mobile */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="/products/t-shirts" className="block py-2 border-b">T-shirts</a>
                  </li>
                  <li>
                    <a href="/products/shirts" className="block py-2 border-b">Shirts</a>
                  </li>
                  <li>
                    <a href="/products/jeans" className="block py-2 border-b">Jeans</a>
                  </li>
                  <li>
                    <a href="/products/shorts" className="block py-2 border-b">Shorts</a>
                  </li>
                  <li>
                    <a href="/products/hoodie" className="block py-2 border-b">Hoodie</a>
                  </li>
                </ul>
              </div>
              
              {/* Price Filter - Mobile */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price</h3>
                <div className="px-1">
                  <Slider
                    defaultValue={[0, 300]}
                    max={300}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
                <Button className="w-full rounded-full" onClick={toggleFilters}>
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm">Showing 1-12 of 36 Products</p>
            <div className="flex items-center gap-2">
              <span className="text-sm">Sort by:</span>
              <select className="text-sm border-none bg-transparent font-medium">
                <option>Most Popular</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-12">
            <button className="px-4 py-2 border rounded-l-md flex items-center gap-1 hover:bg-gray-50">
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>
            
            <div className="flex">
              {[1, 2, 3, "...", 9, 10].map((page, i) => (
                <button
                  key={i}
                  className={`w-10 h-10 flex items-center justify-center ${
                    page === 1 ? "bg-black text-white" : "hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button className="px-4 py-2 border rounded-r-md flex items-center gap-1 hover:bg-gray-50">
              <span>Next</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Newsletter />
      </div>
    </div>
  );
};

export default ProductsPage;
