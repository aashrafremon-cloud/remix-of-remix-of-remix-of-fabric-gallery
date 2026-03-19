import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import logo from "@/assets/adam-logo.svg";

const navItems = [
  { label: "الرئيسية", path: "/" },
  { label: "عن آدم", path: "/about" },
  { label: "المعرض", path: "/gallery" },
  { label: "أقمشة محلية", path: "/gallery?category=local" },
  { label: "أقمشة تنجيد", path: "/gallery?category=imported" },
  { label: "تسجيل بياناتك", path: "/register" },
  { label: "تواصل معنا", path: "/contact" },
];

const isActivePath = (pathname: string, path: string) => pathname === path;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-foreground md:hidden" aria-label="القائمة">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden items-center gap-8 font-body text-sm md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors duration-200 hover:text-primary ${
                  isActivePath(location.pathname, item.path) ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link to="/" className="flex items-center">
            <img src={logo} alt="ADAM Fabrics" className="h-12 w-12 md:h-14 md:w-14" />
          </Link>

          <Link to="/gallery" className="p-2 text-muted-foreground transition-colors hover:text-primary" aria-label="ابحث في المعرض">
            <Search size={20} />
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-border bg-background md:hidden"
          >
            <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 text-sm ${
                    isActivePath(location.pathname, item.path) ? "text-primary font-semibold" : "text-muted-foreground"
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
