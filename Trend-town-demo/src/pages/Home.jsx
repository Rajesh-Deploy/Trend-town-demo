import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

export const Home = () => {
  // Get trending products for featured section
  const featuredProducts = products.filter(p => p.trending).slice(0, 4);

  return (
    <div className="bg-brand-neutral-50 min-h-screen">
      
      {/* Hero Banner */}
      <section className="relative bg-brand-neutral-950 text-white overflow-hidden py-24 sm:py-32 lg:py-40">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=1600&auto=format&fit=crop"
            alt="Trend Town Menswear Banner"
            className="w-full h-full object-cover object-center opacity-30 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-neutral-950 via-brand-neutral-950/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-brand-accent text-xs sm:text-sm font-bold tracking-widest uppercase block mb-3">
              PREMIUM INDIAN MENSWEAR
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-6">
              Best Styles, <br />
              Best Prices — <br />
              <span className="text-brand-accent">Only for Him.</span>
            </h1>
            <p className="text-base sm:text-lg text-brand-neutral-300 mb-8 max-w-lg font-medium leading-relaxed">
              Discover Trend Town's latest arrival of premium ethnic wear, comfortable kurtas, sharp casual shirts, denim, and jackets. Quality fashion tailored for the modern Indian man, starting at just ₹399.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="bg-brand-accent text-brand-neutral-950 font-bold px-8 py-3.5 rounded-sm hover:bg-brand-accent-hover transition-colors duration-300 text-sm tracking-wider uppercase shadow-lg"
              >
                Shop Collection
              </Link>
              <Link
                to="/about"
                className="bg-transparent border-2 border-white text-white font-bold px-8 py-3.5 rounded-sm hover:bg-white hover:text-brand-neutral-950 transition-all duration-300 text-sm tracking-wider uppercase"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-brand-accent text-xs font-bold tracking-widest uppercase block mb-1">
              CURATED COLLECTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-neutral-900 tracking-tight uppercase">
              Trending Now
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-bold text-brand-neutral-900 hover:text-brand-accent transition-colors flex items-center gap-1 group"
          >
            View All Products
            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Value Propositions / Store Highlights */}
      <section className="bg-white py-16 border-y border-brand-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-accent/10 text-brand-accent rounded-sm flex-shrink-0">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider mb-1">
                  Pan-India Shipping
                </h3>
                <p className="text-xs text-brand-neutral-500 font-medium">
                  Free home delivery on all purchases above ₹999. Fast delivery across major cities.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-accent/10 text-brand-accent rounded-sm flex-shrink-0">
                <RotateCcw className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider mb-1">
                  Easy Returns
                </h3>
                <p className="text-xs text-brand-neutral-500 font-medium">
                  Hassle-free 7-day return and exchange policy. Try it at home without any worries.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-accent/10 text-brand-accent rounded-sm flex-shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider mb-1">
                  Secure Payments
                </h3>
                <p className="text-xs text-brand-neutral-500 font-medium">
                  100% secure online checkouts. Supporting UPI, NetBanking, and cash-on-delivery.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-brand-accent/10 text-brand-accent rounded-sm flex-shrink-0">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider mb-1">
                  Trusted Quality
                </h3>
                <p className="text-xs text-brand-neutral-500 font-medium">
                  Locally sourced high-grade fabrics tailored to offer comfortable Indian fits.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Hero Call To Action Banner */}
      <section className="py-20 bg-brand-neutral-900 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=1200&auto=format&fit=crop"
            alt="Mens apparel catalog"
            className="w-full h-full object-cover object-center opacity-10 select-none pointer-events-none"
          />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-brand-accent text-xs font-bold tracking-widest uppercase block mb-2">
            LIMITED TIME OFFER
          </span>
          <h2 className="text-3xl sm:text-4xl font-black mb-4 uppercase tracking-tight">
            Festive Wardrobe Makeover
          </h2>
          <p className="text-sm sm:text-base text-brand-neutral-300 mb-8 max-w-lg mx-auto font-medium">
            Step up your style game. Enjoy up to 40% discount on ethnic wear jackets and premium cotton shirts. Find your perfect look today.
          </p>
          <Link
            to="/shop"
            className="bg-brand-accent text-brand-neutral-950 font-bold px-8 py-3 rounded-sm hover:bg-brand-accent-hover transition-colors text-sm tracking-wider uppercase shadow-md"
          >
            Explore Shop
          </Link>
        </div>
      </section>
      
    </div>
  );
};
