import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, User } from 'lucide-react';
import SideDrawer from './SideDrawer';
import AuthModal from './AuthModal';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-panel border-b border-white/60 py-3 md:py-4 shadow-sm'
            : 'bg-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Left: Hamburger & Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="p-2.5 sm:p-2 rounded-xl glass-panel text-charcoal hover:bg-white active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-charcoal"
              aria-label="Open menu navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Logo size="small" className="sm:hidden" />
            <Logo size="medium" className="hidden sm:inline-flex" />
          </div>

          {/* Right: Login / Dashboard Button */}
          <div>
            {user ? (
              <Link
                to="/dashboard"
                className="glass-panel text-charcoal hover:bg-white/80 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border border-white/70 shadow-sm hover:shadow flex items-center gap-1.5 sm:gap-2"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-charcoal" />
                <span>Client Portal</span>
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="glass-panel text-charcoal hover:bg-white/80 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border border-white/70 shadow-sm hover:shadow active:scale-95 flex items-center gap-1.5 sm:gap-2 focus:outline-none focus:ring-2 focus:ring-charcoal"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-mid" />
                <span className="hidden sm:inline">Login / Sign Up</span>
                <span className="sm:hidden text-xs">Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Side Drawer Component */}
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Auth Modal Component */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
