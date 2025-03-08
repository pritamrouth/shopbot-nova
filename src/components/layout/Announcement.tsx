
import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Announcement = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="w-full bg-shop-black text-white py-2 text-center text-sm relative">
      Sign up and get 20% off to your first order. 
      <Link to="/signup" className="underline ml-1 font-medium">
        Sign Up Now
      </Link>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2"
        aria-label="Close announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Announcement;
