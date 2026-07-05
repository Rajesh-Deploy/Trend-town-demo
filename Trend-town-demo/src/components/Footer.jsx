import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-brand-neutral-950 border-t border-brand-neutral-800 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Summary */}
        <div className="space-y-4">
          <Link to="/" className="flex flex-col items-start leading-none">
            <span className="text-xl font-black tracking-tighter text-white">
              TREND<span className="text-brand-accent">TOWN</span>
            </span>
            <span className="text-[9px] font-semibold text-brand-neutral-400 tracking-widest uppercase">
              MENSWEAR
            </span>
          </Link>
          <p className="text-sm text-brand-neutral-400">
            Trend Town is a trusted local Indian men's clothing store. We provide trendy collections and unmatched style at affordable prices. Crafted for the modern Indian gentleman.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold tracking-widest text-brand-accent uppercase mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-brand-neutral-400">
            <li>
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-white transition-colors">Shop All Collection</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition-colors">Our Brand Story</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Store Location Info */}
        <div>
          <h4 className="text-sm font-bold tracking-widest text-brand-accent uppercase mb-4">Store Location</h4>
          <ul className="space-y-3 text-sm text-brand-neutral-400">
            <li className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-brand-accent flex-shrink-0 mt-0.5" />
              <span>
                102, Fashion Market, Linking Road,<br />
                Bandra West, Mumbai, Maharashtra 400050
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-accent flex-shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-accent flex-shrink-0" />
              <span>support@trendtown.in</span>
            </li>
          </ul>
        </div>

        {/* Store Hours / Indian Trust */}
        <div>
          <h4 className="text-sm font-bold tracking-widest text-brand-accent uppercase mb-4">Store Hours</h4>
          <p className="text-sm text-brand-neutral-400 mb-2">
            Visit us in person to try on the collections:
          </p>
          <ul className="space-y-1 text-sm text-brand-neutral-400">
            <li className="flex justify-between">
              <span>Monday - Saturday:</span>
              <span className="font-semibold text-white">10:00 AM - 9:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday:</span>
              <span className="font-semibold text-white">11:00 AM - 6:00 PM</span>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-brand-neutral-800 text-[11px] text-brand-neutral-500 font-semibold tracking-wide">
            🇮🇳 Made with pride for India's trendsetters.
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-brand-neutral-900 text-center text-xs text-brand-neutral-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} Trend Town Menswear. All rights reserved.</p>
        <div className="flex gap-4">
          <span className="hover:text-brand-neutral-400 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-brand-neutral-400 cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-brand-neutral-400 cursor-pointer transition-colors">Shipping & Returns</span>
        </div>
      </div>
    </footer>
  );
};
