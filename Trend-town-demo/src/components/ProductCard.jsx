import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowRight } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { id, name, category, price, image, sizes, trending } = product;

  return (
    <div className="group relative bg-white border border-brand-neutral-200 overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300 flex flex-col h-full rounded-sm">
      {/* Trending Badge */}
      {trending && (
        <span className="absolute top-3 left-3 z-10 bg-brand-accent text-white text-xs font-semibold px-2.5 py-1 tracking-wider uppercase rounded-sm">
          Trending
        </span>
      )}

      {/* Product Image Wrapper */}
      <div className="relative overflow-hidden aspect-[3/4] bg-brand-neutral-100 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <Link
            to={`/product/${id}`}
            className="bg-brand-neutral-950 text-white p-3 rounded-full hover:bg-brand-accent transition-colors duration-300 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
            title="View Details"
          >
            <Eye className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <span className="text-xs uppercase tracking-widest text-brand-neutral-500 font-semibold mb-1">
          {category}
        </span>
        <Link to={`/product/${id}`} className="group-hover:text-brand-accent transition-colors duration-300">
          <h3 className="font-semibold text-brand-neutral-900 text-base line-clamp-1 mb-2">
            {name}
          </h3>
        </Link>
        
        {/* Sizes available */}
        <div className="flex items-center gap-1 mb-3">
          <span className="text-[10px] text-brand-neutral-400 font-semibold uppercase mr-1">Sizes:</span>
          {sizes.map((size) => (
            <span key={size} className="text-[10px] px-1.5 py-0.5 border border-brand-neutral-200 text-brand-neutral-600 bg-brand-neutral-50 rounded-sm font-semibold">
              {size}
            </span>
          ))}
        </div>

        {/* Price & Action */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-brand-neutral-100">
          <span className="text-lg font-bold text-brand-neutral-900">
            ₹{price.toLocaleString('en-IN')}
          </span>
          <Link
            to={`/product/${id}`}
            className="text-xs font-semibold text-brand-neutral-900 hover:text-brand-accent flex items-center gap-1 transition-colors group/btn"
          >
            View Details
            <ArrowRight className="h-3 w-3 transform group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
