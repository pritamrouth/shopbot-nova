
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getRelatedProducts } from "@/data/products";
import { Minus, Plus, Star, Truck, RotateCw, Shield, Heart, ChevronRight, ChevronLeft, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/common/ProductCard";
import SectionHeading from "@/components/common/SectionHeading";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";
import Newsletter from "@/components/common/Newsletter";

const COLORS = [
  { name: "Green", value: "#00A046" },
  { name: "Black", value: "#000000" },
  { name: "Navy", value: "#0A142F" },
];

const SIZES = ["Small", "Medium", "Large", "X-Large"];

const REVIEWS = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 5,
    text: "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. I'm definitely my favorite go-to shirt!",
    verified: true,
    date: "August 14, 2023",
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 4,
    text: "This t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UX/UI designer myself, I'm picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    verified: true,
    date: "August 15, 2023",
  },
  {
    id: 3,
    name: "Ethan R.",
    rating: 3,
    text: "Good t-shirt for the price. I usually wear a medium but appreciated good design. The minimalistic yet expressive design captures the essence of modern fashion perfectly. I can see the designer's touch in every aspect of this shirt.",
    verified: false,
    date: "August 16, 2023",
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [relatedProducts, setRelatedProducts] = useState(id ? getRelatedProducts(id) : []);
  const { toast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      if (foundProduct) {
        setMainImage(foundProduct.image);
        setRelatedProducts(getRelatedProducts(id));
      }
    }
  }, [id]);

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedColor.name, selectedSize);
      toast({
        title: "Added to cart!",
        description: `${quantity} × ${product.name} has been added to your cart.`,
      });
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="inline-block bg-shop-black text-white px-6 py-3 rounded-full font-medium">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-black">Shop</Link>
        <span>/</span>
        <Link to={`/products/${product.category}`} className="hover:text-black capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="font-medium text-black truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1 space-y-4">
              <button 
                className="w-full aspect-square border rounded bg-shop-gray hover:border-black"
                onClick={() => setMainImage(product.image)}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded" 
                />
              </button>
              <button 
                className="w-full aspect-square border rounded bg-shop-gray hover:border-black"
                onClick={() => setMainImage(product.image)}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded" 
                />
              </button>
              <button 
                className="w-full aspect-square border rounded bg-shop-gray hover:border-black"
                onClick={() => setMainImage(product.image)}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded" 
                />
              </button>
            </div>
            
            <div className="col-span-4">
              <div className="bg-shop-gray rounded-lg overflow-hidden aspect-square">
                <img 
                  src={mainImage || product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name.toUpperCase()}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={18} 
                  className={i < Math.floor(product.rating) ? "fill-yellow-400" : "fill-gray-200 text-gray-200"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviewCount})</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-lg">${product.originalPrice}</span>
            )}
            {product.discount && (
              <span className="text-shop-red text-lg">-{product.discount}%</span>
            )}
          </div>
          
          <p className="text-gray-600 mb-8">
            This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
          </p>
          
          {/* Color selection */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Select Colors</h3>
            <div className="flex gap-3">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedColor.name === color.name ? "ring-2 ring-offset-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>
          
          {/* Size selection */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Choose Size</h3>
            <div className="flex flex-wrap gap-3">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-gray-200 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity and Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-full h-12">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-black"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-black"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <Button 
              onClick={handleAddToCart}
              className="flex-1 h-12 bg-shop-black hover:bg-gray-800 text-white rounded-full font-medium"
            >
              Add to Cart
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full border-gray-300"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Product info boxes */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg">
              <Truck size={24} className="text-gray-700" />
              <div>
                <h4 className="font-medium">Free Shipping</h4>
                <p className="text-sm text-gray-500">Free standard shipping on orders over $99</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg">
              <RotateCw size={24} className="text-gray-700" />
              <div>
                <h4 className="font-medium">Free Returns</h4>
                <p className="text-sm text-gray-500">Return products within 30 days for a full refund</p>
              </div>
            </div>
            
            <div className="flex gap-4 p-4 border border-gray-200 rounded-lg">
              <Shield size={24} className="text-gray-700" />
              <div>
                <h4 className="font-medium">100% Secure Checkout</h4>
                <p className="text-sm text-gray-500">PayPal / MasterCard / Visa</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mb-16">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto border-b rounded-none">
            <TabsTrigger value="details" className="py-4 text-base rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black">
              Product Details
            </TabsTrigger>
            <TabsTrigger value="reviews" className="py-4 text-base rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black">
              Rating & Reviews
            </TabsTrigger>
            <TabsTrigger value="faqs" className="py-4 text-base rounded-none data-[state=active]:border-b-2 data-[state=active]:border-black">
              FAQs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="py-6">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-bold mb-4">Product Description</h3>
              <p className="text-gray-600 mb-6">
                This graphic t-shirt is a versatile addition to any wardrobe. Made from high-quality, breathable fabric, it ensures comfort throughout the day. The modern fit makes it suitable for various body types, while the reinforced stitching adds durability.
              </p>
              <p className="text-gray-600 mb-6">
                The vibrant graphic design, printed with eco-friendly inks, maintains its quality even after multiple washes. This t-shirt is perfect for casual outings, lounging at home, or even as a thoughtful gift for loved ones.
              </p>
              
              <h3 className="text-xl font-bold mb-4">Material & Care</h3>
              <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
                <li>100% premium cotton</li>
                <li>Machine wash cold with like colors</li>
                <li>Tumble dry low</li>
                <li>Do not bleach</li>
                <li>Cool iron if needed</li>
              </ul>
              
              <h3 className="text-xl font-bold mb-4">Size & Fit</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Regular fit</li>
                <li>True to size</li>
                <li>Model is 6'1" and wears size M</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="py-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h3 className="text-xl font-bold">All Reviews ({REVIEWS.length})</h3>
                <div className="flex gap-4">
                  <select className="border rounded-md px-3 py-2 text-sm bg-white">
                    <option>Latest</option>
                    <option>Highest Rating</option>
                    <option>Lowest Rating</option>
                  </select>
                  <Button variant="outline" className="rounded-md">
                    Write a Review
                  </Button>
                </div>
              </div>
              
              <div className="space-y-8">
                {REVIEWS.map((review) => (
                  <div key={review.id} className="border-b pb-8">
                    <div className="flex justify-between mb-3">
                      <div>
                        <div className="flex items-center">
                          <h4 className="font-medium mr-2">{review.name}</h4>
                          {review.verified && (
                            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                            />
                          ))}
                        </div>
                      </div>
                      <button>
                        <MoreHorizontal size={20} className="text-gray-500" />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-2">{review.text}</p>
                    <p className="text-sm text-gray-500">
                      Posted on {review.date}
                    </p>
                  </div>
                ))}
              </div>
              
              <button className="block mx-auto mt-8 text-gray-600 hover:text-black font-medium">
                Load More Reviews
              </button>
            </div>
          </TabsContent>
          
          <TabsContent value="faqs" className="py-6">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">What materials is the product made of?</h3>
                  <p className="text-gray-600">
                    Our t-shirts are made from 100% premium cotton, ensuring breathability and comfort for all-day wear.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">How do I find my size?</h3>
                  <p className="text-gray-600">
                    Please refer to our sizing chart available on each product page. If you're between sizes, we recommend sizing up for a more comfortable fit.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">How should I care for this product?</h3>
                  <p className="text-gray-600">
                    Machine wash cold with like colors, tumble dry low. Do not bleach. Cool iron if needed. For best results, wash inside out to preserve the design.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">What is your return policy?</h3>
                  <p className="text-gray-600">
                    We offer a 30-day return policy for all unworn, unwashed items with original tags attached. Please see our Returns & Exchanges page for more details.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">How long will shipping take?</h3>
                  <p className="text-gray-600">
                    Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout for faster delivery.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* You might also like */}
      <div className="mb-16">
        <SectionHeading title="YOU MIGHT ALSO LIKE" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      <Newsletter />
    </div>
  );
};

export default ProductDetail;
