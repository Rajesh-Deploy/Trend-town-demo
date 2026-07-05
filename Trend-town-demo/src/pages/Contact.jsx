import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MapPin, Phone, Mail, Clock, Send, ShieldAlert } from 'lucide-react';

export const Contact = () => {
  const { addToast } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addToast('Thank you! Your message has been sent successfully. We will get back to you in 24 hours.', 'success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }
  };

  return (
    <div className="bg-brand-neutral-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8 border-b border-brand-neutral-200 pb-5">
          <span className="text-brand-accent text-xs font-bold tracking-widest uppercase block mb-1">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl font-black text-brand-neutral-900 tracking-tight uppercase">
            Contact Our Team
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact details (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Store credentials */}
            <div className="bg-white border border-brand-neutral-200 p-6 rounded-sm space-y-6 shadow-sm">
              <h2 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider border-b border-brand-neutral-100 pb-3">
                Flagship Store
              </h2>

              <div className="space-y-4">
                
                {/* Map item */}
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-xs uppercase text-brand-neutral-700 tracking-wider mb-1">Store Address</h3>
                    <p className="text-sm font-semibold text-brand-neutral-600 leading-normal">
                      102, Fashion Market, Linking Road,<br />
                      Bandra West, Mumbai, Maharashtra 400050
                    </p>
                  </div>
                </div>

                {/* Phone item */}
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-xs uppercase text-brand-neutral-700 tracking-wider mb-1">Support Phone</h3>
                    <p className="text-sm font-semibold text-brand-neutral-600">+91 98765 43210</p>
                    <p className="text-[10px] text-brand-neutral-400 font-semibold">(Mon-Sat: 10:00 AM - 9:00 PM)</p>
                  </div>
                </div>

                {/* Email item */}
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-xs uppercase text-brand-neutral-700 tracking-wider mb-1">Support Email</h3>
                    <p className="text-sm font-semibold text-brand-neutral-600">support@trendtown.in</p>
                    <p className="text-[10px] text-brand-neutral-400 font-semibold">(Typically responds in 24 hours)</p>
                  </div>
                </div>

                {/* Clock hours */}
                <div className="flex gap-3">
                  <Clock className="h-5 w-5 text-brand-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-xs uppercase text-brand-neutral-700 tracking-wider mb-1">Store Hours</h3>
                    <p className="text-xs font-semibold text-brand-neutral-600">
                      Monday - Saturday: 10:00 AM - 9:00 PM<br />
                      Sunday: 11:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Note of validation */}
            <div className="bg-brand-neutral-900 border border-brand-neutral-800 p-4 rounded-sm text-white flex gap-3">
              <ShieldAlert className="h-5 w-5 text-brand-accent flex-shrink-0 mt-0.5" />
              <div className="text-[10px] leading-relaxed text-brand-neutral-400 font-semibold">
                <p className="font-bold text-white mb-1 uppercase tracking-wider">Demo Site Information</p>
                Trend Town is a demo catalog website showing our product options. Real stock inventory is not tracked. For franchise/business inquiries, please write to our support email.
              </div>
            </div>

          </div>

          {/* Contact form (7 columns) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white border border-brand-neutral-200 rounded-sm p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider border-b border-brand-neutral-100 pb-3 mb-4">
                Send Us A Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-brand-neutral-700 mb-2">
                    Your Name *
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
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-600 text-xs font-semibold mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
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

                {/* Subject */}
                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-brand-neutral-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full bg-brand-neutral-50 border rounded-sm text-sm px-3 py-2.5 focus:outline-none focus:bg-white font-semibold ${
                      errors.subject ? 'border-red-500 focus:border-red-500' : 'border-brand-neutral-200 focus:border-brand-accent'
                    }`}
                    placeholder="What is this regarding?"
                  />
                  {errors.subject && <p className="text-red-600 text-xs font-semibold mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-brand-neutral-700 mb-2">
                    Message Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full bg-brand-neutral-50 border rounded-sm text-sm px-3 py-2.5 focus:outline-none focus:bg-white font-semibold resize-none ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-brand-neutral-200 focus:border-brand-accent'
                    }`}
                    placeholder="Write your query or message here..."
                  />
                  {errors.message && <p className="text-red-600 text-xs font-semibold mt-1">{errors.message}</p>}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-brand-neutral-950 text-white font-bold py-4 rounded-sm hover:bg-brand-accent transition-colors duration-300 text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="h-4 w-4" /> Send Message
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
