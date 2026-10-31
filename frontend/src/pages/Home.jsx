import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Award, ChevronRight, Video } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getImageUrl } from '../utils/imageUtils';
import axios from 'axios';

export default function Home({ onOpenGuidance }) {
  const { t } = useTranslation();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(res => setFeaturedProducts(res.data.slice(0, 4)))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-16">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-950 to-slate-950 text-white py-20 px-4 sm:px-8 rounded-3xl shadow-2xl border border-amber-800/40">
        <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-800/60 border border-amber-600/40 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-300 shadow">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Direct Artisan Marketplace • 0% Commission</span>
          </div>

          <h1 className="font-serif font-extrabold text-3xl sm:text-5xl lg:text-6xl text-amber-100 leading-tight tracking-tight">
            {t('hero.title')}
          </h1>

          <p className="text-sm sm:text-base text-amber-200/90 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/products"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-8 py-3.5 rounded-2xl shadow-xl hover:shadow-2xl transition flex items-center justify-center gap-2 text-sm"
            >
              {t('hero.exploreBtn')} <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/login"
              className="w-full sm:w-auto bg-amber-900/80 hover:bg-amber-800 text-amber-100 font-bold px-8 py-3.5 rounded-2xl border border-amber-600/60 transition flex items-center justify-center gap-2 text-sm"
            >
              {t('hero.weaverBtn')}
            </Link>

            <button
              onClick={onOpenGuidance}
              className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-amber-300 font-bold px-6 py-3.5 rounded-2xl border border-amber-500/40 transition flex items-center justify-center gap-2 text-sm"
            >
              <Video className="w-4 h-4 text-amber-400" /> Video Guide
            </button>
          </div>
        </div>
      </section>

      {/* Direct Weaver Impact Badges */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-2xl border border-amber-200/80 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-xl shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-slate-900 text-base">Direct UPI Payout</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              100% of your payment is credited directly into the rural weaver's bank account via instant UPI.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-200/80 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-xl shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-slate-900 text-base">Verified Artisan Cards</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Every seller is a government-verified weaver. No middlemen, no commercial factories.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-amber-200/80 shadow-sm flex items-start gap-4">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-xl shrink-0">
            <Heart className="w-6 h-6 text-rose-600" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-slate-900 text-base">Pure Heritage Fabrics</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Handwoven mulberry silk, organic cotton, Ikat, Kanjeevaram, Jamdani and Banarasi weaves.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Handloom Collections */}
      <section className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">Handcrafted Excellence</span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 mt-1">
              Featured Weaver Products
            </h2>
          </div>
          <Link to="/products" className="text-amber-800 hover:text-amber-900 text-xs font-bold flex items-center gap-1">
            View All Handlooms <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-amber-200/80 overflow-hidden shadow-sm hover:shadow-xl transition group flex flex-col justify-between">
              <div>
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <img
                    src={getImageUrl(product.imageUrl)}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-amber-900/80 text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-md">
                    {product.craftRegion}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                    {product.fabricMaterial}
                  </span>
                  <h3 className="font-serif font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Woven by <span className="font-semibold text-slate-700">{product.weaverName}</span> ({product.loomType})
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                <span className="font-serif font-bold text-slate-900 text-base">
                  ₹{product.price?.toLocaleString('en-IN')}
                </span>
                <Link
                  to={`/products/${product.id}`}
                  className="bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
                >
                  View Cloth
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
