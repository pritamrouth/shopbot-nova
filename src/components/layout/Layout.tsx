
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Announcement from "./Announcement";
import Footer from "./Footer";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  // Scroll to top when navigating
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Announcement />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
