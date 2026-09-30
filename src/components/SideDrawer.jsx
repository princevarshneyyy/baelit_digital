import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { BRAND_NAME } from '../data/mockData';

export default function SideDrawer({ isOpen, onClose }) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/30 backdrop-blur-sm z-50 cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 bottom-0 w-[85vw] max-w-sm glass-drawer z-50 p-6 sm:p-8 flex flex-col justify-between shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-8 border-b border-charcoal/10">
                <Logo size="medium" />
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-neutral-light/50 transition-colors focus:outline-none focus:ring-2 focus:ring-charcoal"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-charcoal" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-12 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center justify-between text-2xl font-light tracking-wide transition-all duration-200 py-2 ${
                        isActive
                          ? 'text-charcoal font-semibold border-b border-charcoal/20 pl-2'
                          : 'text-neutral-mid hover:text-charcoal hover:pl-2'
                      }`
                    }
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Footer inside drawer */}
            <div className="pt-8 border-t border-charcoal/10 text-xs text-neutral-mid">
              <p>© {new Date().getFullYear()} {BRAND_NAME} Advisory Inc.</p>
              <p className="mt-1">All rights reserved.</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
