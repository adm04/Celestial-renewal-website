import React, { useState, useEffect } from 'react';
import Button from './Button';

interface NavbarProps {
  onBookClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Journal', href: '#journal' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 px-6 md:px-12 py-5 flex items-center justify-between ${
          isScrolled ? 'bg-[#0a0608]/75 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        {/* Left: Brand name */}
        <a
          href="#"
          className="font-dancing text-white text-2xl md:text-3xl font-semibold tracking-wider select-none hover:opacity-90 transition-opacity"
        >
          Serene
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-12" aria-label="Desktop Navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Desktop CTA Button */}
        <div className="hidden md:block">
          <Button onClick={onBookClick}>
            Book a consultation
          </Button>
        </div>

        {/* Right: Mobile Hamburger Icon */}
        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-10 h-10 flex flex-col justify-center items-center gap-[7px] relative z-50 focus:outline-none cursor-pointer"
        >
          {/* Top Line */}
          <span
            className="w-6 h-[2px] bg-white rounded-full transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center"
            style={{
              transform: isMobileMenuOpen
                ? 'translateY(9px) rotate(45deg)'
                : 'translateY(0) rotate(0)',
            }}
          />
          {/* Middle Line */}
          <span
            className="w-6 h-[2px] bg-white rounded-full transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center"
            style={{
              opacity: isMobileMenuOpen ? 0 : 1,
              transform: isMobileMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
            }}
          />
          {/* Bottom Line */}
          <span
            className="w-6 h-[2px] bg-white rounded-full transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] origin-center"
            style={{
              transform: isMobileMenuOpen
                ? 'translateY(-9px) rotate(-45deg)'
                : 'translateY(0) rotate(0)',
            }}
          />
        </button>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-400 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Slide-in Panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-40 w-[85%] max-w-[340px] bg-[#0a0608]/95 backdrop-blur-xl border-l border-white/10 p-8 pt-28 flex flex-col justify-between md:hidden transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile Navigation"
      >
        <div className="flex flex-col gap-7">
          <p className="text-white/40 text-xs uppercase tracking-widest font-mono">Navigation</p>
          <nav className="flex flex-col gap-6">
            {navLinks.map((link, index) => {
              const delay = 150 + index * 75;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${delay}ms` : '0ms',
                  }}
                  className={`text-2xl font-instrument text-white hover:text-white/70 tracking-wide transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isMobileMenuOpen
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-6'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Mobile Menu Bottom Section */}
        <div
          style={{
            transitionDelay: isMobileMenuOpen ? '450ms' : '0ms',
          }}
          className={`pt-8 border-t border-white/10 flex flex-col gap-5 transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isMobileMenuOpen
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-6'
          }`}
        >
          <Button
            className="w-full text-center justify-center py-4 text-base"
            onClick={() => {
              setIsMobileMenuOpen(false);
              if (onBookClick) onBookClick();
            }}
          >
            Book a consultation
          </Button>

          <div className="text-center">
            <span className="font-dancing text-white/50 text-xl">Serene Beauty & Wellness</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
