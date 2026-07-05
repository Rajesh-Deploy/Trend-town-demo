import React, { useState, useMemo } from 'react';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';

export const Shop = () => {
  const { searchQuery, setSearchQuery } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceSort, setPriceSort] = useState(''); // 'low-high' or 'high-low' or ''
  const [priceRange, setPriceRange] = useState(2000); // Max budget (max in list is 1799)

  // Filter and sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category check
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory;
        
        // Search query check
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        // Price range check
        const matchesPrice = product.price <= priceRange;

        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (priceSort === 'low-high') {
          return a.price - b.price;
        } else if (priceSort === 'high-low') {
          return b.price - a.price;
        }
        return 0; // Default sorting by order in array
      });
  }, [selectedCategory, searchQuery, priceSort, priceRange]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceSort('');
    setPriceRange(2000);
    setSearchQuery('');
  };

  return (
    <div className="bg-brand-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Breadcrumb */}
        <div className="mb-8 border-b border-brand-neutral-200 pb-5">
          <span className="text-brand-accent text-xs font-bold tracking-widest uppercase block mb-1">
            EXPLORE THE STORE
          </span>
          <h1 className="text-3xl font-black text-brand-neutral-900 tracking-tight uppercase">
            {selectedCategory === 'All' ? 'Shop All Collection' : selectedCategory}
          </h1>
          <p className="text-xs text-brand-neutral-500 font-semibold mt-1">
            Showing {filteredProducts.length} of {products.length} Products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar (Left Column - Desktop) */}
          <div className="lg:col-span-1 bg-white p-6 border border-brand-neutral-200 rounded-sm h-fit space-y-6">
            <div className="flex items-center justify-between border-b border-brand-neutral-100 pb-4">
              <h2 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider flex items-center gap-2">
                <Filter className="h-4 w-4 text-brand-accent" />
                Filters
              </h2>
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-brand-accent hover:text-brand-accent-hover flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="h-3 w-3" /> Clear All
              </button>
            </div>

            {/* Categories filter */}
            <div>
              <h3 className="font-bold text-xs uppercase text-brand-neutral-400 tracking-wider mb-3">
                Categories
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-sm px-3 py-2 rounded-sm font-semibold transition-all duration-300 w-fit lg:w-full ${
                      selectedCategory === cat
                        ? 'bg-brand-neutral-950 text-white shadow-sm'
                        : 'bg-brand-neutral-100 text-brand-neutral-700 hover:bg-brand-neutral-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Sorting */}
            <div>
              <h3 className="font-bold text-xs uppercase text-brand-neutral-400 tracking-wider mb-3">
                Sort By Price
              </h3>
              <select
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                className="w-full bg-brand-neutral-100 border border-brand-neutral-200 rounded-sm text-sm px-3 py-2 font-semibold text-brand-neutral-800 focus:outline-none focus:border-brand-accent"
              >
                <option value="">Featured (Default)</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-xs uppercase text-brand-neutral-400 tracking-wider">
                  Max Budget
                </h3>
                <span className="text-sm font-bold text-brand-neutral-800">
                  ₹{priceRange}
                </span>
              </div>
              <input
                type="range"
                min="399"
                max="2000"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-brand-neutral-200 rounded-lg appearance-none cursor-pointer accent-brand-accent"
              />
              <div className="flex justify-between text-[10px] text-brand-neutral-400 font-bold mt-1">
                <span>₹399</span>
                <span>₹2,000</span>
              </div>
            </div>
          </div>

          {/* Products Grid (Right Column - Desktop) */}
          <div className="lg:col-span-3">
            
            {/* Active search queries display */}
            {searchQuery && (
              <div className="bg-brand-neutral-100 border border-brand-neutral-200 rounded-sm px-4 py-3 mb-6 text-sm flex justify-between items-center text-brand-neutral-800 font-semibold">
                <span>
                  Search results for: <span className="text-brand-accent">"{searchQuery}"</span>
                </span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs hover:text-brand-accent font-bold"
                >
                  Clear search
                </button>
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-brand-neutral-200 rounded-sm p-12 text-center shadow-sm">
                <SlidersHorizontal className="h-12 w-12 text-brand-neutral-300 mx-auto mb-4" />
                <h3 className="font-bold text-brand-neutral-800 text-lg mb-1 uppercase tracking-tight">
                  No Products Found
                </h3>
                <p className="text-sm text-brand-neutral-500 mb-6 font-medium">
                  We couldn't find any products matching your current combination of filters. Try modifying your filters or clear them.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-brand-neutral-950 text-white font-bold px-6 py-2.5 rounded-sm hover:bg-brand-accent transition-colors text-xs tracking-wider uppercase"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
