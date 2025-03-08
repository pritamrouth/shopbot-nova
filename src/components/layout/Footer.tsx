
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import Newsletter from "../common/Newsletter";

const Footer = () => {
  return (
    <footer className="bg-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <Newsletter />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tighter mb-4 inline-block">
              SHOP.CO
            </Link>
            <p className="text-sm text-gray-600 mt-4 mb-6">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                <Youtube size={16} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm">COMPANY</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-black">About</Link></li>
              <li><Link to="/features" className="text-sm text-gray-600 hover:text-black">Features</Link></li>
              <li><Link to="/works" className="text-sm text-gray-600 hover:text-black">Works</Link></li>
              <li><Link to="/career" className="text-sm text-gray-600 hover:text-black">Career</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm">HELP</h4>
            <ul className="space-y-3">
              <li><Link to="/support" className="text-sm text-gray-600 hover:text-black">Customer Support</Link></li>
              <li><Link to="/delivery" className="text-sm text-gray-600 hover:text-black">Delivery Details</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-black">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-black">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm">FAQ</h4>
            <ul className="space-y-3">
              <li><Link to="/account" className="text-sm text-gray-600 hover:text-black">Account</Link></li>
              <li><Link to="/deliveries" className="text-sm text-gray-600 hover:text-black">Manage Deliveries</Link></li>
              <li><Link to="/orders" className="text-sm text-gray-600 hover:text-black">Orders</Link></li>
              <li><Link to="/payments" className="text-sm text-gray-600 hover:text-black">Payments</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm">RESOURCES</h4>
            <ul className="space-y-3">
              <li><Link to="/ebooks" className="text-sm text-gray-600 hover:text-black">Free eBooks</Link></li>
              <li><Link to="/tutorials" className="text-sm text-gray-600 hover:text-black">Development Tutorial</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-600 hover:text-black">How to - Blog</Link></li>
              <li><Link to="/playlist" className="text-sm text-gray-600 hover:text-black">Youtube Playlist</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">
              Shop.co © 2000-2023, All Rights Reserved
            </p>
            <div className="flex space-x-3">
              <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-6" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-6" />
              <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-6" />
              <img src="https://cdn-icons-png.flaticon.com/512/179/179457.png" alt="Apple Pay" className="h-6" />
              <img src="https://cdn-icons-png.flaticon.com/512/5968/5968220.png" alt="Google Pay" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
