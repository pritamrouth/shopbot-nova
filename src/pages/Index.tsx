
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import SectionHeading from "@/components/common/SectionHeading";
import ViewAllButton from "@/components/common/ViewAllButton";
import { getNewArrivals, getTopSelling } from "@/data/products";

const DRESS_STYLES = [
  {
    name: "Casual",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzdWFsJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Formal",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9ybWFsJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Party",
    image: "https://images.unsplash.com/photo-1604904612715-47bf9d9bc670?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFydHklMjBmYXNoaW9ufGVufDB8fDB8fHww",
  },
  {
    name: "Gym",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z3ltJTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    text: "I absolutely love SHOP.CO! The quality exceeds my expectations, and the prices are reasonable. The clothes fit perfectly, and they arrived earlier than expected.",
    verified: true,
    date: "August 14, 2023",
  },
  {
    id: 2,
    name: "Alex K.",
    rating: 4,
    text: "I'm really impressed by the range of clothes they offer. Shop.co has become my go-to for all my fashion needs. Their customer service is exceptional.",
    verified: true,
    date: "August 15, 2023",
  },
  {
    id: 3,
    name: "James L.",
    rating: 5,
    text: "The website is so easy to navigate, and checkout is smooth. I received my items quickly and was delighted with the quality. Will definitely be shopping here again!",
    verified: true,
    date: "August 15, 2023",
  },
];

const STATISTICS = [
  { value: "200+", label: "International Brands" },
  { value: "2,000+", label: "High-Quality Products" },
  { value: "30,000+", label: "Happy Customers" },
];

const Index = () => {
  const newArrivals = getNewArrivals();
  const topSelling = getTopSelling();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-shop-gray py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </h1>
              <p className="text-gray-600 mb-8 max-w-md mx-auto md:mx-0">
                Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
              </p>
              <Button className="bg-shop-black hover:bg-gray-800 text-white rounded-full px-8 py-6 font-medium text-base">
                Shop Now
              </Button>
              
              <div className="mt-12 grid grid-cols-3 gap-4">
                {STATISTICS.map((stat, index) => (
                  <div key={index} className="text-center md:text-left">
                    <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img
                src="assets/download.jpg"
                alt="Fashion models"
                className="w-full rounded-lg"
              />
              <div className="absolute -left-4 top-1/4">
                <span className="text-4xl">✦</span>
              </div>
              <div className="absolute -right-4 bottom-1/3">
                <span className="text-4xl">✦</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Brand Logos */}
        <div className="mt-16 py-6 bg-shop-black">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-8">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Gucci_Logo.svg/2560px-Gucci_Logo.svg.png" alt="Gucci" className="h-6 md:h-8 brightness-0 invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/2560px-Zara_Logo.svg.png" alt="Zara" className="h-6 md:h-8 brightness-0 invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Versace_logo.svg" alt="Versace" className="h-6 md:h-8 brightness-0 invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Prada_logo.svg/1200px-Prada_logo.svg.png" alt="Prada" className="h-5 md:h-7 brightness-0 invert" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Calvin_Klein_logo.svg/1200px-Calvin_Klein_logo.svg.png" alt="Calvin Klein" className="h-5 md:h-7 brightness-0 invert" />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="NEW ARRIVALS" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <ViewAllButton to="/products/new-arrivals" />
        </div>
      </section>

      {/* Top Selling Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="TOP SELLING" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {topSelling.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <ViewAllButton to="/products/top-selling" />
        </div>
      </section>

      {/* Browse by Style Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="BROWSE BY DRESS STYLE" />
          
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DRESS_STYLES.map((style, index) => (
                <Link 
                  key={index} 
                  to={`/products/${style.name.toLowerCase()}`}
                  className="relative overflow-hidden rounded-lg aspect-[2/1] group"
                >
                  <img 
                    src={style.image} 
                    alt={style.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">{style.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <SectionHeading title="OUR HAPPY CUSTOMERS" className="mb-0" centered={false} />
            
            <div className="flex space-x-2">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                <ChevronLeft size={18} />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <div className="flex items-center mb-4">
                  <h4 className="font-medium text-lg">{testimonial.name}</h4>
                  {testimonial.verified && (
                    <span className="ml-2 bg-green-50 text-green-600 text-xs px-2 py-1 rounded-full">Verified</span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                
                <p className="text-sm text-gray-500">
                  Posted on {testimonial.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
