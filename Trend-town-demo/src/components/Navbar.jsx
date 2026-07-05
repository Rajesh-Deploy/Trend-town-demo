import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Search, Menu, X, PhoneCall } from 'lucide-react';

export const Navbar = () => {
  const { cartCount, searchQuery, setSearchQuery } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // If not on shop page, redirect to shop page to show results
    if (location.pathname !== '/shop' && e.target.value.trim() !== '') {
      navigate('/shop');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-brand-neutral-950 border-b border-brand-neutral-800 text-white backdrop-blur-md bg-opacity-95 shadow-md">
      {/* Top Banner (Promo & Trust details) */}
      <div className="bg-brand-accent text-brand-neutral-950 text-center py-1 text-[11px] font-bold tracking-widest uppercase px-4 flex justify-between items-center max-w-7xl mx-auto md:px-8">
        <span>Trusted Local Indian Shop</span>
        <span className="hidden sm:inline">Best Styles, Best Prices — Only for Him</span>
        <span className="flex items-center gap-1">
          <PhoneCall className="h-3 w-3" /> Support: +91 98765 43210
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex flex-col items-start leading-none">
              <span className="text-xl sm:text-2xl font-black tracking-tighter text-white">
                TREND<span className="text-brand-accent">TOWN</span>
              </span>
              <span className="text-[9px] font-semibold text-brand-neutral-400 tracking-widest uppercase">
                MENSWEAR
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-semibold text-sm tracking-wide">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `hover:text-brand-accent transition-colors duration-300 relative py-2 ${
                    isActive ? 'text-brand-accent font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-accent' : 'text-brand-neutral-200'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Search, Cart, Mobile Toggle */}
          <div className="flex items-center space-x-4">
            
            {/* Search Input Bar (Desktop) */}
            <div className="hidden sm:flex items-center relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search menswear..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="bg-brand-neutral-900 border border-brand-neutral-700 text-white pl-9 pr-8 py-1.5 rounded-sm focus:outline-none focus:border-brand-accent text-sm w-48 lg:w-64 transition-all duration-300"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-brand-neutral-400" />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-2.5 text-brand-neutral-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="sm:hidden text-brand-neutral-200 hover:text-white p-1"
              aria-label="Toggle Search"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative p-2 text-brand-neutral-200 hover:text-white transition-colors duration-300"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-brand-neutral-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-neutral-950 animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-brand-neutral-200 hover:text-white p-2"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search bar expansion */}
        {showSearch && (
          <div className="sm:hidden pb-4 px-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search menswear..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-brand-neutral-900 border border-brand-neutral-700 text-white pl-10 pr-8 py-2 rounded-sm focus:outline-none focus:border-brand-accent text-sm w-full"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-brand-neutral-400" />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-3 text-brand-neutral-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-neutral-800 bg-brand-neutral-950">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-3 rounded-md text-base font-semibold transition-colors ${
                    isActive ? 'bg-brand-neutral-800 text-brand-accent font-bold' : 'text-brand-neutral-300 hover:bg-brand-neutral-900 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
