import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { auth, User } from "@/lib/api";
import logo from "@/assets/logo-header.png";
import logoWhite from "@/assets/logo-transparent.png";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const isHomePage = location.pathname === "/";
  const isTransparent = isHomePage && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial scroll position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const currentUser = await auth.getUser();
      setUser(currentUser);
    };
    checkAuth();

    // Listen for storage changes (logout from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token') {
        checkAuth();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location.pathname]); // Re-check on route change

  const handleSignOut = async () => {
    await auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/what-we-do", label: "What We Do?" },
    { path: "/who-are-we", label: "Who Are We?" },
    { path: "/investor-relations", label: "Investor Relations" },
    { path: "/for-brands", label: "For Brands" },
    { path: "/careers", label: "Careers" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isTransparent 
        ? "bg-transparent border-transparent" 
        : "bg-background backdrop-blur-lg border-b border-border shadow-sm"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 -my-4">
            <img 
              src={isTransparent ? logoWhite : logo} 
              alt="Sira Studios" 
              className={`h-32 w-auto transition-all duration-300 ${isTransparent ? "brightness-0 invert" : ""}`} 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium smooth-transition hover:text-primary ${
                  location.pathname === link.path 
                    ? "text-gradient" 
                    : isTransparent ? "text-white" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons - Top Right */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <Button 
                onClick={handleSignOut} 
                size="sm" 
                className={`transition-all duration-300 ${
                  isTransparent 
                    ? "bg-transparent border border-white/50 text-white hover:bg-white/10 hover:border-white" 
                    : "gradient-primary"
                }`}
              >
                Sign Out
              </Button>
            ) : (
              <Button asChild className="gradient-primary">
                <Link to="/auth">Get Started</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${isTransparent ? "text-white" : "text-foreground"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`lg:hidden py-4 space-y-4 rounded-lg ${
            isTransparent ? "bg-black/80 backdrop-blur-md px-4 -mx-4" : "bg-background"
          }`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-2 text-sm font-medium smooth-transition ${
                  location.pathname === link.path 
                    ? "text-gradient" 
                    : isTransparent ? "text-white hover:text-primary" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <Button 
                onClick={handleSignOut} 
                className={`w-full transition-all duration-300 ${
                  isTransparent 
                    ? "bg-transparent border border-white/50 text-white hover:bg-white/10 hover:border-white" 
                    : "gradient-primary"
                }`}
              >
                Sign Out
              </Button>
            ) : (
              <Button asChild className="gradient-primary w-full">
                <Link to="/auth">Get Started</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
