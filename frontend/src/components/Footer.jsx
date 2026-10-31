import React from 'react';
import { Heart, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-amber-950 text-amber-200/90 border-t border-amber-900 mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About */}
        <div className="space-y-3">
          <h3 className="font-serif font-bold text-xl text-amber-100 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" /> WeaveMart
          </h3>
          <p className="text-xs text-amber-300/80 leading-relaxed">
            {t('tagline')}
          </p>
          <p className="text-xs text-amber-400 font-semibold pt-1">
            Empowering rural handloom weaving communities across India.
          </p>
        </div>

        {/* Handloom Craft Clusters */}
        <div>
          <h4 className="font-serif font-bold text-amber-100 text-sm mb-3">Famous Craft Clusters</h4>
          <ul className="space-y-2 text-xs text-amber-300/80">
            <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Pochampally Double Ikat (Telangana)</li>
            <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Kanchipuram Pure Silk (Tamil Nadu)</li>
            <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Banarasi Kadwa Brocade (Varanasi)</li>
            <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Bengal Organic Jamdani (Fulia)</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif font-bold text-amber-100 text-sm mb-3">Guarantees</h4>
          <ul className="space-y-2 text-xs text-amber-300/80">
            <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Direct Weaver Payout</li>
            <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Instant UPI Online Payment</li>
            <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Real-time Handloom Tracking</li>
            <li className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Multi-Lingual Weaver Support</li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div>
          <h4 className="font-serif font-bold text-amber-100 text-sm mb-3">Weaver Support Helpline</h4>
          <p className="text-xs text-amber-300/80 leading-relaxed mb-3">
            Dedicated multi-lingual helpline for rural weavers & customer inquiries.
          </p>
          <div className="bg-amber-900/60 p-3 rounded-xl border border-amber-800 text-xs">
            <p className="font-bold text-amber-100">Toll Free: 1800-WEAVE-MART</p>
            <p className="text-amber-400 text-[11px] font-mono mt-0.5">support@weavemart.org</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-amber-900/60 text-center text-xs text-amber-400/80 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p>© 2026 WeaveMart - The online market place. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Handloom Artisans
        </p>
      </div>
    </footer>
  );
}
