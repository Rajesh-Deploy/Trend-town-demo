import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle, ArrowRight, ShieldCheck, MapPin, Truck, ShoppingBag } from 'lucide-react';

export const Checkout = () => {
  const { cartItems, cartSubtotal, cartCount, clearCart } = useCart();

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod' // default COD
  });

  // Validation errors
  const [errors, setErrors] = useState({});
  // Form submission success state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mockOrderId, setMockOrderId] = useState('');
  const [submittedOrderSummary, setSubmittedOrderSummary] = useState({
    items: [],
    subtotal: 0,
    total: 0
  });

  // Shipping
  const shippingThreshold = 999;
  const shippingFee = cartSubtotal >= shippingThreshold || cartCount === 0 ? 0 : 99;
  const grandTotal = cartSubtotal + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    
    // Email Check
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Indian Phone Check: 10 digits
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-+]/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian phone number';
    }

    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';

    // 6-digit Indian Pincode Check
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be exactly 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cartCount === 0 && !isSubmitted) {
      alert('Your cart is empty!');
      return;
    }

    if (validateForm()) {
      // Create order summary snapshot before clearing cart
      setSubmittedOrderSummary({
        items: [...cartItems],
        subtotal: cartSubtotal,
        total: grandTotal
      });

      // Generate a mock Order ID: TT + YYYYMMDD + Random 4 digits
      const today = new Date();
      const dateStr = today.getFullYear().toString() +
                      (today.getMonth() + 1).toString().padStart(2, '0') +
                      today.getDate().toString().padStart(2, '0');
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const generatedId = `TT-${dateStr}-${randomDigits}`;

      setMockOrderId(generatedId);
      setIsSubmitted(true);
      clearCart();
    }
  };

  // 1. Render Order Confirmed Screen
  if (isSubmitted) {
    return (
      <div className="bg-brand-neutral-50 min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-brand-neutral-200 shadow-premium rounded-sm p-6 sm:p-10 space-y-8">
            
            {/* Header Success State */}
            <div className="text-center pb-6 border-b border-brand-neutral-100">
              <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
              <h1 className="text-2xl sm:text-3xl font-black text-brand-neutral-900 tracking-tight uppercase">
                Order Confirmed!
              </h1>
              <p className="text-sm text-brand-neutral-500 font-semibold mt-2">
                Thank you for shopping at Trend Town, {formData.name}.
              </p>
              <div className="mt-4 inline-block bg-brand-neutral-900 border border-brand-neutral-800 text-brand-accent px-4 py-2 text-xs font-black tracking-widest uppercase rounded-sm">
                Order ID: {mockOrderId}
              </div>
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-brand-neutral-50 border border-brand-neutral-200 p-6 rounded-sm">
              <div className="space-y-2">
                <h3 className="font-bold text-xs uppercase text-brand-neutral-400 tracking-wider flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand-accent" /> Shipping Address
                </h3>
                <p className="text-sm font-bold text-brand-neutral-950">{formData.name}</p>
                <p className="text-xs text-brand-neutral-600 font-medium leading-relaxed">
                  {formData.address}, <br />
                  {formData.city}, {formData.state} - {formData.pincode}
                </p>
                <p className="text-xs text-brand-neutral-600 font-semibold">Phone: +91 {formData.phone}</p>
                <p className="text-xs text-brand-neutral-600 font-semibold">Email: {formData.email}</p>
              </div>

              <div className="space-y-2 border-t md:border-t-0 md:border-l border-brand-neutral-200 pt-4 md:pt-0 md:pl-6">
                <h3 className="font-bold text-xs uppercase text-brand-neutral-400 tracking-wider flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-brand-accent" /> Estimated Delivery
                </h3>
                <p className="text-sm font-bold text-brand-neutral-950">In 3 to 5 Business Days</p>
                <p className="text-xs text-brand-neutral-500 font-medium">
                  We will send shipping updates and tracking details to <span className="text-brand-neutral-800 font-bold">{formData.email}</span>.
                </p>
                <p className="text-xs text-brand-neutral-600 font-bold mt-2">
                  Payment Mode: <span className="text-brand-accent uppercase">Cash on Delivery (COD)</span>
                </p>
              </div>
            </div>

            {/* Summary Details */}
            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase text-brand-neutral-400 tracking-wider">
                Items Ordered Summary
              </h3>
              <div className="border border-brand-neutral-200 rounded-sm divide-y divide-brand-neutral-200">
                {submittedOrderSummary.items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="p-4 flex justify-between items-center text-sm font-medium">
                    <div>
                      <p className="text-brand-neutral-900 font-bold">{item.name}</p>
                      <p className="text-[10px] text-brand-neutral-400 uppercase font-bold mt-0.5">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-brand-neutral-900 font-bold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="text-right space-y-1 text-sm font-semibold text-brand-neutral-600">
                <p>Subtotal: <span className="text-brand-neutral-900 font-bold">₹{submittedOrderSummary.subtotal.toLocaleString('en-IN')}</span></p>
                <p>Delivery: <span className="text-emerald-700 font-bold">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span></p>
                <p className="text-base font-black text-brand-neutral-900 uppercase pt-2 border-t border-brand-neutral-100 mt-2">
                  Total Paid (COD): <span className="text-brand-accent text-lg">₹{submittedOrderSummary.total.toLocaleString('en-IN')}</span>
                </p>
              </div>
            </div>

            {/* Continue CTA */}
            <div className="pt-6 text-center">
              <Link
                to="/shop"
                className="bg-brand-neutral-950 text-white font-bold px-8 py-3 rounded-sm hover:bg-brand-accent transition-colors duration-300 text-sm tracking-wider uppercase inline-flex items-center gap-2"
              >
                Continue Shopping <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // 2. Render Checkout Form
  return (
    <div className="bg-brand-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8 border-b border-brand-neutral-200 pb-5">
          <span className="text-brand-accent text-xs font-bold tracking-widest uppercase block mb-1">
            SECURE CHECKOUT
          </span>
          <h1 className="text-3xl font-black text-brand-neutral-900 tracking-tight uppercase">
            Billing & Shipping Details
          </h1>
        </div>

        {cartCount === 0 ? (
          <div className="bg-white border border-brand-neutral-200 p-8 text-center rounded-sm max-w-md mx-auto">
            <ShoppingBag className="h-12 w-12 text-brand-neutral-300 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-brand-neutral-900 uppercase mb-2">Cart is empty</h2>
            <p className="text-xs text-brand-neutral-500 mb-6 font-medium">Please add items to your cart before proceeding to checkout.</p>
            <Link
              to="/shop"
              className="bg-brand-neutral-950 text-white font-bold px-6 py-2.5 rounded-sm hover:bg-brand-accent transition-colors uppercase text-xs tracking-wider"
            >
              Shop Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Checkout Form (7 columns) */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white border border-brand-neutral-200 rounded-sm p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider border-b border-brand-neutral-100 pb-3 mb-4">
                Delivery Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full name */}
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-brand-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-brand-neutral-50 border rounded-sm text-sm px-3 py-2.5 focus:outline-none focus:bg-white font-semibold ${
                      errors.name ? 'border-red-500 focus:border-red-500' : 'border-brand-neutral-200 focus:border-brand-accent'
                    }`}
                    placeholder="Enter your first and last name"
                  />
                  {errors.name && <p className="text-red-600 text-xs font-semibold mt-1">{errors.name}</p>}
                </div>

                {/* Email address */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-brand-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-brand-neutral-50 border rounded-sm text-sm px-3 py-2.5 focus:outline-none focus:bg-white font-semibold ${
                      errors.email ? 'border-red-500 focus:border-red-500' : 'border-brand-neutral-200 focus:border-brand-accent'
                    }`}
                    placeholder="example@mail.com"
                  />
                  {errors.email && <p className="text-red-600 text-xs font-semibold mt-1">{errors.email}</p>}
                </div>

                {/* Phone number */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-brand-neutral-700 mb-2">
                    Phone Number (10-digit Indian) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-sm font-bold text-brand-neutral-400">+91</span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full bg-brand-neutral-50 border rounded-sm text-sm pl-11 pr-3 py-2.5 focus:outline-none focus:bg-white font-semibold ${
                        errors.phone ? 'border-red-500 focus:border-red-500' : 'border-brand-neutral-200 focus:border-brand-accent'
                      }`}
                      placeholder="9876543210"
                    />
                  </div>
                  {errors.phone && <p className="text-red-600 text-xs font-semibold mt-1">{errors.phone}</p>}
                </div>

                {/* Street address */}
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-xs font-bold uppercase tracking-wider text-brand-neutral-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full bg-brand-neutral-50 border rounded-sm text-sm px-3 py-2.5 focus:outline-none focus:bg-white font-semibold ${
                      errors.address ? 'border-red-500 focus:border-red-500' : 'border-brand-neutral-200 focus:border-brand-accent'
                    }`}
                    placeholder="Flat, House no., Apartment, Street"
                  />
                  {errors.address && <p className="text-red-600 text-xs font-semibold mt-1">{errors.address}</p>}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-xs font-bold uppercase tracking-wider text-brand-neutral-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full bg-brand-neutral-50 border rounded-sm text-sm px-3 py-2.5 focus:outline-none focus:bg-white font-semibold ${
                      errors.city ? 'border-red-500 focus:border-red-500' : 'border-brand-neutral-200 focus:border-brand-accent'
                    }`}
                    placeholder="e.g. Mumbai"
                  />
                  {errors.city && <p className="text-red-600 text-xs font-semibold mt-1">{errors.city}</p>}
                </div>

                {/* State */}
                <div>
                  <label htmlFor="state" className="block text-xs font-bold uppercase tracking-wider text-brand-neutral-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full bg-brand-neutral-50 border rounded-sm text-sm px-3 py-2.5 focus:outline-none focus:bg-white font-semibold ${
                      errors.state ? 'border-red-500 focus:border-red-500' : 'border-brand-neutral-200 focus:border-brand-accent'
                    }`}
                    placeholder="e.g. Maharashtra"
                  />
                  {errors.state && <p className="text-red-600 text-xs font-semibold mt-1">{errors.state}</p>}
                </div>

                {/* Pincode */}
                <div>
                  <label htmlFor="pincode" className="block text-xs font-bold uppercase tracking-wider text-brand-neutral-700 mb-2">
                    Pincode (6-digit) *
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={`w-full bg-brand-neutral-50 border rounded-sm text-sm px-3 py-2.5 focus:outline-none focus:bg-white font-semibold ${
                      errors.pincode ? 'border-red-500 focus:border-red-500' : 'border-brand-neutral-200 focus:border-brand-accent'
                    }`}
                    placeholder="e.g. 400050"
                  />
                  {errors.pincode && <p className="text-red-600 text-xs font-semibold mt-1">{errors.pincode}</p>}
                </div>
              </div>

              {/* Payment selection */}
              <div className="pt-4 border-t border-brand-neutral-100">
                <h3 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider mb-4">
                  Payment Method
                </h3>
                
                <div className="space-y-2">
                  {/* COD */}
                  <label className="flex items-center p-4 border border-brand-neutral-200 rounded-sm bg-brand-neutral-50 cursor-pointer hover:bg-brand-neutral-100 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-brand-accent border-brand-neutral-300 focus:ring-brand-accent"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-bold text-brand-neutral-900 uppercase">Cash on Delivery / Pay on Delivery</p>
                      <p className="text-xs text-brand-neutral-500 font-semibold">Pay in cash or digital UPI upon receiving the package.</p>
                    </div>
                  </label>
                  
                  {/* Mock UPI (visual only) */}
                  <label className="flex items-center p-4 border border-brand-neutral-200 rounded-sm opacity-60 cursor-not-allowed">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      disabled
                      className="h-4 w-4 text-brand-neutral-300"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-bold text-brand-neutral-900 uppercase">Online Payment (UPI/Cards/Netbanking)</p>
                      <p className="text-xs text-brand-neutral-400 font-semibold">Unavailable for client demo. Please use COD.</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                className="w-full bg-brand-neutral-950 text-white font-bold py-4 rounded-sm hover:bg-brand-accent transition-colors duration-300 text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md mt-6"
              >
                Place order (Pay on Delivery)
              </button>

            </form>

            {/* Cart summary preview column (5 columns) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Box */}
              <div className="bg-white border border-brand-neutral-200 rounded-sm p-6 shadow-sm">
                <h2 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider border-b border-brand-neutral-100 pb-4 mb-4">
                  Your Order
                </h2>
                
                {/* List items */}
                <div className="divide-y divide-brand-neutral-100 max-h-60 overflow-y-auto mb-4 pr-1">
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="py-3 flex justify-between items-center text-xs font-semibold">
                      <div className="max-w-[70%]">
                        <p className="text-brand-neutral-900 line-clamp-1">{item.name}</p>
                        <p className="text-brand-neutral-400 font-bold mt-0.5">
                          Size: {item.size} | Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="text-brand-neutral-900 font-bold">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div className="border-t border-brand-neutral-100 pt-4 space-y-2 text-xs font-medium text-brand-neutral-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-brand-neutral-900 font-bold">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-brand-neutral-900 font-bold">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-700 font-extrabold uppercase text-[10px]">Free</span>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>
                  <div className="border-t border-brand-neutral-100 pt-3 flex justify-between text-sm font-black text-brand-neutral-900 uppercase">
                    <span>Total Amount</span>
                    <span className="text-brand-accent text-base">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Secure seal */}
              <div className="bg-brand-neutral-900 border border-brand-neutral-800 p-4 rounded-sm text-white flex items-start gap-3">
                <ShieldCheck className="h-8 w-8 text-brand-accent flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                    Trend Town Guarantee
                  </h4>
                  <p className="text-[10px] text-brand-neutral-400 font-medium leading-relaxed">
                    We inspect every single clothing article before packaging to ensure premium fits and flawless fabrics. Shop local, shop safe.
                  </p>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
