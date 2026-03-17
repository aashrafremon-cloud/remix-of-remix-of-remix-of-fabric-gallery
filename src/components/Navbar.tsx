import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import logo from "@/assets/adam-logo.svg";

const navItems = [
  { label: "الرئيسية", path: "/" },
  { label: "المعرض", path: "/gallery" },
  { label: "أقمشة محلية", path: "/gallery?category=local" },
  { label: "أقمشة مستوردة", path: "/gallery?category=imported" },
  { label: "تسجيل بياناتك", path: "/register" },
  { label: "تواصل معنا", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Nav links - desktop */}
          <div className="hidden md:flex items-center gap-8 font-body text-sm">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors duration-200 hover:text-primary ${
                  location.pathname === item.path ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Logo center */}
          <Link to="/" className="flex items-center">
            <img src={logo} alt="ADAM Fabrics" className="w-12 h-12 md:w-14 md:h-14" />
          </Link>

          {/* Search icon */}
          <Link to="/gallery" className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <Search size={20} />
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm py-2 ${
                    location.pathname === item.path ? "text-primary font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
