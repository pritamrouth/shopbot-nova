
import { Menu, X, ChevronRight, Search, User, ShoppingCart, LogIn, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const handleLogout = () => {
    logout();
    toggleMenu();
  };

  return (
    <>
      <button onClick={toggleMenu} aria-label="Toggle menu">
        <Menu size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b">
            <Link to="/" onClick={toggleMenu} className="text-2xl font-bold">
              SHOP.CO
            </Link>
            <button onClick={toggleMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          <div className="p-4">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full"
              />
            </div>

            <nav>
              <ul className="space-y-4">
                <li className="py-3 border-b">
                  <Link
                    to="/products"
                    onClick={toggleMenu}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium">Shop</span>
                    <ChevronRight size={20} />
                  </Link>
                </li>
                <li className="py-3 border-b">
                  <Link
                    to="/products/on-sale"
                    onClick={toggleMenu}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium">On Sale</span>
                    <ChevronRight size={20} />
                  </Link>
                </li>
                <li className="py-3 border-b">
                  <Link
                    to="/products/new-arrivals"
                    onClick={toggleMenu}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium">New Arrivals</span>
                    <ChevronRight size={20} />
                  </Link>
                </li>
                <li className="py-3 border-b">
                  <Link
                    to="/brands"
                    onClick={toggleMenu}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium">Brands</span>
                    <ChevronRight size={20} />
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-8 space-y-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    onClick={toggleMenu}
                    className="flex items-center gap-3 py-3"
                  >
                    <User size={20} />
                    <span className="font-medium">Account</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 py-3 w-full text-left"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Log Out</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/signin"
                  onClick={toggleMenu}
                  className="flex items-center gap-3 py-3"
                >
                  <LogIn size={20} />
                  <span className="font-medium">Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
