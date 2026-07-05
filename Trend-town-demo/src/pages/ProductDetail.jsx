import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { ShoppingBag, ArrowLeft, Shield, Sparkles, RefreshCw, Truck } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToast } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('');

  // Find the current product
  const product = useMemo(() => {
    return products.find((p) => p.id === parseInt(id, 10));
  }, [id]);

  // Find related products (same category, excluding current product)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-black text-brand-neutral-900 mb-4">Product Not Found</h2>
        <p className="text-brand-neutral-500 mb-8 font-medium">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/shop"
          className="bg-brand-neutral-950 text-white font-bold px-6 py-3 rounded-sm hover:bg-brand-accent transition-colors tracking-wide uppercase text-sm"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      addToast('Please select a size (S/M/L/XL/XXL) before adding to cart!', 'error');
      return;
    }
    addToCart(product, selectedSize);
  };

  const checkDelivery = (e) => {
    e.preventDefault();
    if (!pincode.trim() || pincode.length !== 6 || isNaN(pincode)) {
      setDeliveryStatus('Invalid Pincode. Please enter a valid 6-digit code.');
      return;
    }
    // Mocking delivery check based on ending digit
    const endingDigit = parseInt(pincode.slice(-1), 10);
    if (endingDigit % 2 === 0) {
      setDeliveryStatus('🚀 Available: Fast Delivery within 2-3 Days.');
    } else {
      setDeliveryStatus('🚚 Available: Standard Delivery within 4-5 Days (Cash on Delivery Available).');
    }
  };

  return (
    <div className="bg-brand-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-bold text-brand-neutral-700 hover:text-brand-accent transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="h-4 w-4" /> Go Back
        </button>

        {/* Product Details Section */}
        <div className="bg-white border border-brand-neutral-200 shadow-sm rounded-sm p-6 sm:p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-16">
          
          {/* Product Image Column */}
          <div className="bg-brand-neutral-100 flex items-center justify-center border border-brand-neutral-200 rounded-sm overflow-hidden aspect-[3/4]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover shadow-sm hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>

          {/* Details & Action Column */}
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Category & Badge */}
              <div className="flex items-center gap-3">
                <span className="bg-brand-neutral-100 text-brand-neutral-700 text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase rounded-sm border border-brand-neutral-200">
                  {product.category}
                </span>
                {product.trending && (
                  <span className="bg-brand-accent/20 text-brand-accent text-[10px] font-bold px-2.5 py-1 tracking-widest uppercase rounded-sm border border-brand-accent/20">
                    Trending Collection
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-brand-neutral-900 tracking-tight leading-tight uppercase mb-2">
                  {product.name}
                </h1>
                <p className="text-2xl font-black text-brand-neutral-950">
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
                <p className="text-[10px] font-bold text-brand-neutral-400 mt-1">
                  Inclusive of all taxes
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-brand-neutral-600 leading-relaxed font-medium">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="border-y border-brand-neutral-200 py-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-neutral-700">
                    Select Size
                  </h3>
                  <span className="text-xs text-brand-neutral-400 font-semibold underline cursor-pointer hover:text-brand-accent">
                    Size Guide
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 w-14 font-black text-sm border-2 rounded-sm transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-brand-neutral-950 bg-brand-neutral-950 text-white shadow-sm'
                          : 'border-brand-neutral-200 text-brand-neutral-700 hover:border-brand-neutral-900 hover:bg-brand-neutral-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-brand-neutral-950 text-white font-bold py-4 rounded-sm hover:bg-brand-accent transition-colors duration-300 text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingBag className="h-5 w-5" /> Add to Shopping Cart
              </button>

              {/* Pincode Check */}
              <div className="bg-brand-neutral-50 border border-brand-neutral-200 p-4 rounded-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-neutral-700 flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-brand-accent" /> Check Delivery Pin
                </h4>
                <form onSubmit={checkDelivery} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit pincode (e.g. 400050)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="flex-grow bg-white border border-brand-neutral-200 rounded-sm text-xs px-3 py-2 focus:outline-none focus:border-brand-accent font-semibold"
                  />
                  <button
                    type="submit"
                    className="bg-brand-neutral-900 text-white font-bold text-[10px] px-4 py-2 rounded-sm hover:bg-brand-accent transition-colors uppercase tracking-wider"
                  >
                    Check
                  </button>
                </form>
                {deliveryStatus && (
                  <p className={`text-xs font-bold ${deliveryStatus.startsWith('❌') || deliveryStatus.includes('Invalid') ? 'text-red-600' : 'text-emerald-700'}`}>
                    {deliveryStatus}
                  </p>
                )}
              </div>

            </div>

            {/* Quality Seals */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-neutral-100 text-center text-[10px] font-bold text-brand-neutral-500 uppercase tracking-wider mt-6">
              <div className="flex flex-col items-center gap-1">
                <Shield className="h-4 w-4 text-brand-accent" />
                <span>100% Cotton/Linen</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="h-4 w-4 text-brand-accent" />
                <span>Easy Exchanges</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Sparkles className="h-4 w-4 text-brand-accent" />
                <span>Local Indian Store</span>
              </div>
            </div>

          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="border-b border-brand-neutral-200 pb-4 mb-8">
              <span className="text-brand-accent text-xs font-bold tracking-widest uppercase block mb-1">
                COMPLETE YOUR LOOK
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-brand-neutral-900 tracking-tight uppercase">
                You May Also Like
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
