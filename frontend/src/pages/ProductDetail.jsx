import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShieldCheck, Truck, Sparkles, MapPin, Award, CheckCircle, ArrowLeft } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';
import axios from 'axios';

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-20 text-slate-500">Loading fabric details...</div>;
  if (!product) return <div className="text-center py-20 text-slate-500">Product not found.</div>;

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </button>

      <div className="bg-white rounded-3xl border border-amber-200/80 overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
        
        {/* Left Column: Product Image */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
            <img 
              src={getImageUrl(product.imageUrl)} 
              alt={product.title}
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/60 flex items-center gap-3">
            <Award className="w-6 h-6 text-amber-700 shrink-0" />
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              Authentic Weaver Certification: Handcrafted in {product.craftRegion} on traditional {product.loomType}.
            </p>
          </div>
        </div>

        {/* Right Column: Specifications & Pricing */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-md">
                {product.craftRegion}
              </span>
              <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Direct Weaver Stock
              </span>
            </div>

            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 leading-snug">
              {product.title}
            </h1>

            {/* Price Box */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 font-bold uppercase block">Direct Weaver Price</span>
                <span className="font-serif font-extrabold text-amber-900 text-3xl">
                  ₹{product.price?.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">0% Middleman Commission</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            {/* Fabric Specification Grid */}
            <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Fabric Material</span>
                <strong className="text-slate-800 font-semibold">{product.fabricMaterial}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Weave Pattern</span>
                <strong className="text-slate-800 font-semibold">{product.weavePattern || 'Traditional Handloom'}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Loom Type</span>
                <strong className="text-slate-800 font-semibold">{product.loomType}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Thread Count</span>
                <strong className="text-slate-800 font-semibold">{product.threadCount || '100s'}</strong>
              </div>
            </div>

            {/* Care Instructions */}
            {product.careInstructions && (
              <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-800 block mb-0.5">Fabric Care Instructions:</span>
                {product.careInstructions}
              </div>
            )}

            {/* Weaver Info Card */}
            <div className="border border-amber-200 bg-white p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Artisan Weaver</span>
                <h4 className="font-serif font-bold text-slate-900 text-sm">{product.weaverName}</h4>
                <p className="text-xs text-slate-500">{product.weaverLocation}</p>
              </div>
              <ShieldCheck className="w-8 h-8 text-amber-700" />
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-100 flex gap-4">
            <button
              onClick={handleAdd}
              className={`flex-1 font-bold py-3.5 px-6 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm ${
                added 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white'
              }`}
            >
              {added ? (
                <>
                  <CheckCircle className="w-5 h-5" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" /> Add Cloth to Cart
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
