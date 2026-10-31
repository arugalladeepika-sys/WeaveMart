import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award, ChevronRight, Video } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';
import axios from 'axios';

export default function Home({ onOpenGuidance }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data?.content || []);
        setFeaturedProducts(data.slice(0, 3));
      })
      .catch(() => setFeaturedProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12">

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-amber-900 via-amber-950 to-slate-950 text-white rounded-3xl p-10 sm:p-16 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMjBMMjAgMEw0MCAyMEwyMCA0MFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')]" />
        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              India's Handloom Marketplace — Zero Middlemen
            </span>
          </div>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl leading-tight">
            Buy Authentic Handloom <br />
            <span className="text-amber-400">Directly from Weavers</span>
          </h1>
          <p className="text-amber-200 text-sm leading-relaxed max-w-lg">
            WeaveMart connects rural artisan families in Pochampally, Kanchipuram, Varanasi,
            and across India directly with cloth buyers — no middlemen, fair prices, preserved heritage.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              to="/products"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm px-6 py-3 rounded-2xl shadow-lg transition flex items-center gap-2"
            >
              Browse Handloom Fabrics <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="border border-amber-500/50 hover:bg-amber-900/50 text-amber-200 font-bold text-sm px-6 py-3 rounded-2xl transition"
            >
              Register as Weaver / Buyer
            </Link>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { icon: <ShieldCheck className="w-6 h-6" />, title: 'Verified Artisans', desc: 'Every weaver is identity-verified with government-issued ID proof before listing products.' },
          { icon: <Heart className="w-6 h-6" />, title: '0% Middleman Fee', desc: '100% of the sale price goes directly to the weaver family — no commissions, no hidden charges.' },
          { icon: <Award className="w-6 h-6" />, title: 'Authentic Handloom', desc: 'Each fabric is handcrafted on traditional looms — Pit Loom, Jacquard, Frame Loom — preserving centuries of craft.' },
        ].map((badge, i) => (
          <div key={i} className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-sm text-center space-y-2">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
              {badge.icon}
            </div>
            <h3 className="font-serif font-bold text-slate-900">{badge.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{badge.desc}</p>
          </div>
        ))}
      </div>

      {/* Featured Products (only shown if API is available) */}
      {!loading && featuredProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-2xl text-slate-900">Featured Handlooms</h2>
            <Link to="/products" className="text-xs text-amber-800 font-bold flex items-center gap-1 hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="bg-white rounded-2xl border border-amber-200/80 overflow-hidden shadow-sm hover:shadow-xl transition group"
              >
                <div className="aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={getImageUrl(product.imageUrl)}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="p-5 space-y-1">
                  <h3 className="font-serif font-bold text-slate-900 text-sm line-clamp-1">{product.title}</h3>
                  <p className="text-xs text-slate-500">{product.craftRegion} • {product.fabricMaterial}</p>
                  <p className="font-serif font-bold text-amber-900 text-lg">
                    ₹{Number(product.price || 0).toLocaleString('en-IN')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 sm:p-12 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-amber-900">Are You a Handloom Weaver?</h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Join WeaveMart to sell your handcrafted fabrics directly to buyers across India.
          No middlemen, no commissions — 100% of the price reaches you.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/login"
            className="bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow transition flex items-center gap-2"
          >
            Register as Weaver <ArrowRight className="w-4 h-4" />
          </Link>
          {onOpenGuidance && (
            <button
              onClick={onOpenGuidance}
              className="border border-amber-300 hover:bg-amber-100 text-amber-900 font-bold text-sm px-6 py-3 rounded-2xl transition flex items-center gap-2"
            >
              <Video className="w-4 h-4" /> Watch Registration Guide
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
