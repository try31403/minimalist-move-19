
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect to prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: "PowerTower", href: "#product" },
    { name: "Accessories", href: "#accessories" },
    { name: "Bundle", href: "#bundle" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" }
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#" 
          className="text-2xl font-bold tracking-tighter transition-all relative z-50"
        >
          <span>Fit</span>
          <span className="text-yellow">Anywhere</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium text-sm hover:text-yellow transition-colors relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-0 after:bg-yellow after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#order"
            className="bg-black text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-black/90 transition-all hover-lift"
          >
            ORDER NOW
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-black relative z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div 
          className="fixed inset-0 pt-[73px] bg-white z-40 md:hidden"
          style={{ 
            backgroundColor: "white",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            height: "100vh",
            overflowY: "auto"
          }}
        >
          <div className="flex flex-col space-y-4 px-6 py-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-lg py-3 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <a
                href="#order"
                className="block w-full bg-black text-white text-center px-6 py-3 rounded-full font-medium hover:bg-black/90 transition-all"
                onClick={() => setIsOpen(false)}
              >
                ORDER NOW
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
