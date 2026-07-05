import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard, ShieldCheck } from 'lucide-react';

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal, cartCount } = useCart();

  const shippingThreshold = 999;
  const shippingFee = cartSubtotal >= shippingThreshold || cartCount === 0 ? 0 : 99;
  const grandTotal = cartSubtotal + shippingFee;

  const freeShippingProgress = Math.min((cartSubtotal / shippingThreshold) * 100, 100);
  const amountToFreeShipping = shippingThreshold - cartSubtotal;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center bg-brand-neutral-50 min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingBag className="h-16 w-16 text-brand-neutral-300 mb-4 animate-pulse" />
        <h2 className="text-2xl font-black text-brand-neutral-900 mb-2 uppercase tracking-tight">Your Cart is Empty</h2>
        <p className="text-sm text-brand-neutral-500 mb-8 max-w-sm font-medium">
          Looks like you haven't added any menswear items to your shopping cart yet. Start exploring our latest trends!
        </p>
        <Link
          to="/shop"
          className="bg-brand-neutral-950 text-white font-bold px-8 py-3 rounded-sm hover:bg-brand-accent transition-colors duration-300 text-sm tracking-wider uppercase shadow-md"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8 border-b border-brand-neutral-200 pb-5">
          <span className="text-brand-accent text-xs font-bold tracking-widest uppercase block mb-1">
            YOUR SELECTIONS
          </span>
          <h1 className="text-3xl font-black text-brand-neutral-900 tracking-tight uppercase">
            Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Cart Items List (2 columns on large screen) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Free Shipping Alert Banner */}
            <div className="bg-white border border-brand-neutral-200 p-4 rounded-sm shadow-sm space-y-2">
              <div className="flex justify-between text-xs font-bold text-brand-neutral-700 uppercase tracking-wider">
                {cartSubtotal >= shippingThreshold ? (
                  <span className="text-emerald-700">🎉 Congratulations! You qualify for Free Shipping.</span>
                ) : (
                  <span>
                    Add <span className="text-brand-accent">₹{amountToFreeShipping.toLocaleString('en-IN')}</span> more to get <span className="text-brand-accent">Free Shipping</span>!
                  </span>
                )}
                <span>₹{cartSubtotal} / ₹{shippingThreshold}</span>
              </div>
              <div className="w-full bg-brand-neutral-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-brand-accent h-full transition-all duration-500 ease-out"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* List */}
            <div className="bg-white border border-brand-neutral-200 rounded-sm divide-y divide-brand-neutral-200 shadow-sm">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="w-20 h-24 bg-brand-neutral-100 flex-shrink-0 border border-brand-neutral-200 rounded-sm overflow-hidden aspect-[3/4]">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </Link>

                  {/* Info details */}
                  <div className="flex-grow space-y-1">
                    <span className="text-[10px] uppercase font-bold text-brand-neutral-400 tracking-wider">
                      {item.category}
                    </span>
                    <Link to={`/product/${item.id}`} className="hover:text-brand-accent transition-colors">
                      <h3 className="font-bold text-brand-neutral-900 text-sm sm:text-base line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-brand-neutral-500 font-semibold">
                      Size: <span className="text-brand-neutral-900 font-bold">{item.size}</span>
                    </p>
                    <p className="text-sm font-bold text-brand-neutral-900 sm:hidden">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex items-center border border-brand-neutral-300 rounded-sm bg-white overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="px-2.5 py-1.5 hover:bg-brand-neutral-100 transition-colors text-brand-neutral-600"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="px-4 text-xs font-black text-brand-neutral-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="px-2.5 py-1.5 hover:bg-brand-neutral-100 transition-colors text-brand-neutral-600"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Price calculations */}
                  <div className="hidden sm:block text-right min-w-[80px]">
                    <p className="text-sm font-bold text-brand-neutral-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                    <p className="text-[10px] text-brand-neutral-400 font-semibold">
                      (₹{item.price} each)
                    </p>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-brand-neutral-400 hover:text-red-600 p-2 transition-colors sm:ml-4 self-end sm:self-center"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>

                </div>
              ))}
            </div>

            {/* Back Button */}
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-neutral-700 hover:text-brand-accent uppercase tracking-wider"
            >
              <ArrowLeft className="h-4 w-4" /> Continue Shopping
            </Link>

          </div>

          {/* Checkout Order Summary Card (1 column) */}
          <div className="bg-white border border-brand-neutral-200 rounded-sm p-6 space-y-6 shadow-sm">
            <h2 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider border-b border-brand-neutral-100 pb-4">
              Order Summary
            </h2>
            
            <div className="space-y-4 text-sm font-medium text-brand-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'})</span>
                <span className="text-brand-neutral-900 font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery Fee</span>
                <span className="text-brand-neutral-900 font-bold">
                  {shippingFee === 0 ? (
                    <span className="text-emerald-700 uppercase text-xs font-extrabold">Free</span>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>

              {shippingFee > 0 && (
                <p className="text-[10px] text-brand-neutral-400 font-semibold leading-normal">
                  Add items worth ₹{amountToFreeShipping} or more to get free shipping. Standard shipping is ₹99.
                </p>
              )}

              <div className="border-t border-brand-neutral-100 pt-4 flex justify-between text-base font-black text-brand-neutral-900 uppercase">
                <span>Total Amount</span>
                <span className="text-lg">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-brand-neutral-950 text-white font-bold py-4 rounded-sm hover:bg-brand-accent transition-colors duration-300 text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md"
            >
              <CreditCard className="h-5 w-5" /> Proceed To Checkout
            </Link>

            <div className="border-t border-brand-neutral-100 pt-4 text-center">
              <p className="text-[10px] font-bold text-brand-neutral-400 uppercase tracking-widest flex items-center justify-center gap-1">
                <ShieldCheck className="h-4 w-4 text-brand-accent" /> Secure Checkout Assurance
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
