import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Compass, Heart, Users } from 'lucide-react';

export const About = () => {
  return (
    <div className="bg-brand-neutral-50 min-h-screen">
      
      {/* Hero Header */}
      <section className="relative bg-brand-neutral-950 text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop"
            alt="Tailoring workshop"
            className="w-full h-full object-cover opacity-20 select-none pointer-events-none"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <span className="text-brand-accent text-xs font-bold tracking-widest uppercase block mb-2">
            OUR STORY
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight mb-4">
            Trend Town Menswear
          </h1>
          <p className="text-sm sm:text-base text-brand-neutral-300 max-w-xl mx-auto leading-relaxed font-medium">
            Bridging the gap between world-class global designs and local Indian affordability. A story of fabrics, style, and trust since 2018.
          </p>
        </div>
      </section>

      {/* Brand Story Details */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Split Section 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-brand-neutral-900 uppercase tracking-tight">
              Rooted in Indian Craftsmanship
            </h2>
            <p className="text-sm text-brand-neutral-600 leading-relaxed font-medium">
              Founded in the vibrant streets of Mumbai, **Trend Town** began with a simple vision: to make contemporary men's fashion accessible to every Indian man without compromising on fabric quality or fit. 
            </p>
            <p className="text-sm text-brand-neutral-600 leading-relaxed font-medium">
              We understood that Indian men need styles that suit our climate, our festivals, and our daily hustle. We work directly with local weavers, designers, and printing experts across Rajasthan, Maharashtra, and Uttar Pradesh to bring hand-crafted indigo block prints, breathable Lucknowi cottons, and rich Banarasi silks directly to you.
            </p>
          </div>
          <div className="border border-brand-neutral-200 rounded-sm overflow-hidden aspect-[4/3] bg-brand-neutral-100 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop"
              alt="Tailoring details fabric"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Split Section 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center md:flex-row-reverse">
          <div className="border border-brand-neutral-200 rounded-sm overflow-hidden aspect-[4/3] bg-brand-neutral-100 shadow-sm md:order-last">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
              alt="Man in formal blazer shirt"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-brand-neutral-900 uppercase tracking-tight">
              Uncompromising Quality, Unbeatable Prices
            </h2>
            <p className="text-sm text-brand-neutral-600 leading-relaxed font-medium">
              Why pay premium prices for imported branding? At Trend Town, we cut out the middlemen and distributor networks. By doing everything in-house—from design and material sourcing to manufacturing and direct sales—we deliver high-grade clothing starting at just ₹399.
            </p>
            <p className="text-sm text-brand-neutral-600 leading-relaxed font-medium">
              Whether you need a classic white linen formal shirt for a board meeting, a comfortable graphic printed tee for lounging, or a premium raw silk Nehru jacket for wedding season, we ensure every piece fits like it was made just for you.
            </p>
          </div>
        </div>

      </section>

      {/* Core Values Section */}
      <section className="bg-white py-16 border-y border-brand-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-accent text-xs font-bold tracking-widest uppercase block mb-1">
              OUR FOUNDATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-neutral-900 uppercase tracking-tight">
              What We Stand For
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Value 1 */}
            <div className="text-center space-y-3">
              <div className="inline-block p-4 bg-brand-neutral-100 text-brand-accent rounded-sm border border-brand-neutral-200">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider">
                Trendsetting Designs
              </h3>
              <p className="text-xs text-brand-neutral-500 font-medium leading-relaxed max-w-xs mx-auto">
                Always ahead of the curve, we refresh our styles weekly to keep your wardrobe modern, sharp, and confident.
              </p>
            </div>

            {/* Value 2 */}
            <div className="text-center space-y-3">
              <div className="inline-block p-4 bg-brand-neutral-100 text-brand-accent rounded-sm border border-brand-neutral-200">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider">
                Indian Heritage
              </h3>
              <p className="text-xs text-brand-neutral-500 font-medium leading-relaxed max-w-xs mx-auto">
                Supporting local textile crafts and weavers. We blend traditional motifs with clean western silhouettes.
              </p>
            </div>

            {/* Value 3 */}
            <div className="text-center space-y-3">
              <div className="inline-block p-4 bg-brand-neutral-100 text-brand-accent rounded-sm border border-brand-neutral-200">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider">
                Honest Pricing
              </h3>
              <p className="text-xs text-brand-neutral-500 font-medium leading-relaxed max-w-xs mx-auto">
                No hidden costs or bloated fashion markups. We share our cost savings directly with our customers.
              </p>
            </div>

            {/* Value 4 */}
            <div className="text-center space-y-3">
              <div className="inline-block p-4 bg-brand-neutral-100 text-brand-accent rounded-sm border border-brand-neutral-200">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-brand-neutral-900 text-sm uppercase tracking-wider">
                Customer Priority
              </h3>
              <p className="text-xs text-brand-neutral-500 font-medium leading-relaxed max-w-xs mx-auto">
                Over 50,000+ satisfied Indian customers. We pride ourselves on friendly support and easy return policies.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="py-20 text-center max-w-3xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-black text-brand-neutral-900 uppercase mb-4">
          Experience Trend Town Style
        </h2>
        <p className="text-sm text-brand-neutral-500 max-w-md mx-auto mb-8 font-medium">
          Step up your wardrobe game with clothing engineered to offer comfort, styling, and premium vibes.
        </p>
        <Link
          to="/shop"
          className="bg-brand-neutral-950 text-white font-bold px-8 py-3 rounded-sm hover:bg-brand-accent transition-colors duration-300 text-sm tracking-wider uppercase shadow-md"
        >
          Explore Shop
        </Link>
      </section>

    </div>
  );
};
