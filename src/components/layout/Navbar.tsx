
import { Link } from "react-router-dom";
import { Search, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            SHOP.CO
          </Link>

          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link to="/products" className="text-sm font-medium hover:text-gray-500">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/products/on-sale" className="text-sm font-medium hover:text-gray-500">
                  On Sale
                </Link>
              </li>
              <li>
                <Link to="/products/new-arrivals" className="text-sm font-medium hover:text-gray-500">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/brands" className="text-sm font-medium hover:text-gray-500">
                  Brands
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            {isSearchActive ? (
              <input
                type="text"
                placeholder="Search for products..."
                className="pl-9 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
                autoFocus
                onBlur={() => setIsSearchActive(false)}
              />
            ) : (
              <div className="flex items-center bg-shop-gray rounded-full pl-3 pr-4 py-2">
                <Search size={18} className="text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search for products..." 
                  className="bg-transparent border-none focus:outline-none ml-2 w-40 placeholder:text-gray-500 text-sm"
                  onFocus={() => setIsSearchActive(true)}
                />
              </div>
            )}
          </div>
          
          <Link to="/account" className="hover:text-gray-500">
            <User size={20} />
          </Link>
          
          <Link to="/cart" className="hover:text-gray-500 relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-shop-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </Link>
        </div>

        <div className="flex items-center md:hidden">
          <Link to="/cart" className="mr-4 relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-shop-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </Link>
          
          <MobileMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
