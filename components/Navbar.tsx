import React, { useState, useEffect } from 'react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'py-2' : 'py-4'
    } `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative backdrop-blur-xl bg-amber-950/20 border border-amber-400/30 rounded-2xl md:rounded-2xl shadow-2xl transition-all duration-500 ${
          scrolled ? 'shadow-xl bg-amber-950/10' : 'shadow-2xl'
        }`}>
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-2xl md:rounded-2xl bg-gradient-to-r from-amber-400/20 via-yellow-500/20 to-orange-400/20 opacity-50 blur-sm"></div>
          
          <div className="relative flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xs md:text-sm">S</span>
              </div>
              <span className="text-white font-bold text-lg md:text-xl tracking-tight">SnapRoom</span>
            </div>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-1">
              {['Home', 'Features', 'Pricing', 'For Editors'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="group relative px-4 py-2 text-white/80 hover:text-white transition-all duration-300 text-sm font-medium"
                  style={{ fontFamily: 'Satoshi, Inter, system-ui, sans-serif' }}
                >
                  <span className="relative z-10">{item}</span>
                  <div className="absolute inset-0 rounded-lg bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100"></div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-6 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300"></div>
                </a>
              ))}
            </div>

            {/* Right side - Mobile and Desktop */}
            <div className="flex items-center space-x-3">
              {/* CTA Button - Responsive sizing */}
              <button 
                className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-semibold text-xs md:text-sm transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/25 hover:scale-105 active:scale-95"
                style={{ fontFamily: 'Satoshi, Inter, system-ui, sans-serif' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-amber-300/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                <span className="relative z-10 flex items-center space-x-1 md:space-x-2">
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Access</span>
                </span>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent skew-x-12"></div>
              </button>

              {/* Mobile menu button */}
              <button 
                className="md:hidden text-white/80 hover:text-white transition-colors p-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-amber-400/20 bg-amber-950/10 backdrop-blur-xl rounded-b-xl">
              <div className="px-4 py-3 space-y-2">
                {['Home', 'Features', 'Pricing', 'For Editors'].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block px-3 py-2 text-white/80 hover:text-white hover:bg-amber-400/10 rounded-lg transition-all duration-200 text-sm font-medium"
                    style={{ fontFamily: 'Satoshi, Inter, system-ui, sans-serif' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Golden Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 rounded-2xl md:rounded-2xl opacity-15 blur-lg transition-opacity duration-500"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;