import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { BRAND_NAME, BRAND_SLOGAN } from '../data/mockData';

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-warm border-t border-charcoal/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <Logo size="large" />
            <p className="text-xs text-neutral-mid mt-3 max-w-sm leading-relaxed">
              {BRAND_SLOGAN}. Providing tailored guidance across astrology, legal strategy, capital allocation, and executive pathing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-neutral-mid">
              <li>
                <Link to="/" className="hover:text-charcoal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-charcoal transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-charcoal transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-charcoal transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-xs font-semibold text-charcoal uppercase tracking-wider mb-4">
              Practices
            </h4>
            <ul className="space-y-2 text-xs text-neutral-mid">
              <li>Kundali Advisory</li>
              <li>Legal & Governance</li>
              <li>Strategic Wealth</li>
              <li>Executive Career</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-charcoal/10 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-mid gap-4">
          <p>© {new Date().getFullYear()} {BRAND_NAME} Group. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-charcoal cursor-pointer">Privacy Policy</span>
            <span className="hover:text-charcoal cursor-pointer">Terms of Engagement</span>
            <span className="hover:text-charcoal cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
