import { Link } from "react-router-dom";
import { Phone, MapPin, Mail, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import logo from "@/assets/logo-transparent.png";

const Footer = () => {
  return (
  <footer className="relative bg-[#f9f9fb] border-t border-gray-200 py-8 text-gray-800">


      <div className="container mx-auto px-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          
          {/* Brand */}
          <div className="flex flex-col justify-start">
            <img
              src={logo}
              alt="Sira Studios"
              className="w-32 h-auto mb-4 hover:scale-150 transition-transform duration-300 object-contain"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sira Studios is a premier creative production house specializing in content creation, brand storytelling, and digital media. We bring innovative ideas to life through compelling visual narratives.
            </p>
          </div>

          {/* Quick Links */}
          <div className="pt-[2.8rem]"> {/* aligns “Home” with brand paragraph */}
            <h3 className="font-bold text-sm mb-3 uppercase tracking-wider">Quick Link</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/who-are-we" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Who Are we?
                </Link>
              </li>
              <li>
                <Link to="/what-we-do" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  What we do?
                </Link>
              </li>
              <li>
                <Link to="/investor-relations" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Investor Relations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Other */}
          <div className="pt-[2.8rem]">
            <h3 className="font-bold text-sm mb-3 uppercase tracking-wider">Other</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  In The News
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="pt-[2.8rem]">
            <h3 className="font-bold text-sm mb-3 uppercase tracking-wider">Reach Us</h3>
            <div className="space-y-2">
              <p className="text-sm font-semibold">Sira Studios</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+919182832990" className="hover:text-primary transition-colors">
                  +91 - 9182832990
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@sirastudios.com" className="hover:text-primary transition-colors">
                  info@sirastudios.com
                </a>
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-1 text-primary" />
                <span>Row house 193, Manya house, second cross, Chitrapuri Colony, Chitrapuri hills, Khajaguda, 500104</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <h3 className="font-bold text-sm mb-4 uppercase tracking-wider">
            Active <span className="text-foreground font-semibold">With Us &gt;&gt;</span>
          </h3>
          <div className="flex gap-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Twitter page" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our Instagram page" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn page" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://www.youtube.com/@SiraStudios01/videos" target="_blank" rel="noopener noreferrer" aria-label="Visit our YouTube channel" className="text-muted-foreground hover:text-primary transition-colors">
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            Copyright © 2025 - All Rights Reserved By{" "}
            <span className="text-foreground font-semibold">SIRA STUDIOS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
