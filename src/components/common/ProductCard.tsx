
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  return (
    <Link 
      to={`/product/${product.id}`} 
      className={cn("group block", className)}
    >
      <div className="bg-shop-gray rounded-lg overflow-hidden aspect-square relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.discount && (
          <span className="absolute top-3 right-3 bg-shop-red text-white text-xs font-medium px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}
      </div>
      
      <div className="mt-3">
        <h3 className="font-medium text-lg truncate">{product.name}</h3>
        
        <div className="flex items-center mt-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-semibold">${product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
          )}
          {product.discount && (
            <span className="text-shop-red text-sm">-{product.discount}%</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
