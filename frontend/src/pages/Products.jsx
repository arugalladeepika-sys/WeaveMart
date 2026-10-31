import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Layers, Loader2 } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';
import axios from 'axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      const params = {};
      if (search) params.search = search;
      if (selectedMaterial) params.material = selectedMaterial;
      if (selectedRegion) params.region = selectedRegion;

      const res = await axios.get('/api/products', { params });
      const data = res.data;

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data?.products)) {
        setProducts(data.products);
      } else if (Array.isArray(data?.content)) {
        setProducts(data.content);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Unable to load products. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, selectedMaterial, selectedRegion]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-amber-50 p-8 rounded-3xl shadow-lg space-y-2 border border-amber-800">
        <h1 className="font-serif font-bold text-3xl">Handloom Fabric Catalog</h1>
        <p className="text-xs sm:text-sm text-amber-200">
          Directly explore sarees, dupattas, and unstitched fabric rolls uploaded by verified Indian weaver families.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search by cloth, pattern, region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-700"
          />
        </div>

        {/* Fabric Material */}
        <div className="relative">
          <Layers className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-700 bg-white cursor-pointer"
          >
            <option value="">All Fabric Materials</option>
            <option value="Pure Mulberry Silk">Pure Mulberry Silk</option>
            <option value="100% Organic Cotton">100% Organic Cotton</option>
            <option value="Pure Silk">Pure Silk</option>
            <option value="Chanderi Silk-Cotton">Chanderi Silk-Cotton</option>
          </select>
        </div>

        {/* Craft Region */}
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-700 bg-white cursor-pointer"
          >
            <option value="">All Craft Regions</option>
            <option value="Pochampally (Telangana)">Pochampally (Telangana)</option>
            <option value="Kanchipuram (Tamil Nadu)">Kanchipuram (Tamil Nadu)</option>
            <option value="Varanasi (UP)">Varanasi (UP)</option>
            <option value="Fulia (West Bengal)">Fulia (West Bengal)</option>
            <option value="Chanderi (MP)">Chanderi (MP)</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-sm gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-amber-700" />
          <span>Loading authentic handlooms...</span>
        </div>
      ) : error ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-red-200 text-red-600 space-y-3">
          <p>{error}</p>
          <button
            onClick={fetchProducts}
            className="text-xs bg-amber-800 text-white font-semibold px-4 py-2 rounded-xl"
          >
            Try Again
          </button>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-amber-200 text-slate-600 space-y-3">
          <p className="font-serif text-lg font-bold">No handloom products found matching your filter.</p>
          <button
            onClick={() => { setSearch(''); setSelectedMaterial(''); setSelectedRegion(''); }}
            className="text-xs bg-amber-800 text-white font-semibold px-4 py-2 rounded-xl"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-amber-200/80 overflow-hidden shadow-sm hover:shadow-xl transition group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={getImageUrl(product.imageUrl)}
                    alt={product.title || 'Handloom product'}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-amber-900/90 text-amber-100 text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {product.craftRegion}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                    Loom: {product.loomType}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      {product.fabricMaterial}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Thread Count: {product.threadCount || '100s'}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-slate-900 text-base leading-snug line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="pt-2 text-xs text-slate-700 font-medium flex items-center justify-between border-t border-slate-100">
                    <span>
                      Master Weaver: <strong className="text-amber-900">{product.weaverName}</strong>
                    </span>
                    <span className="text-emerald-700 font-semibold">
                      {product.stockQuantity} in stock
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-amber-50/50 border-t border-amber-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Direct Price</span>
                  <span className="font-serif font-bold text-amber-900 text-xl">
                    ₹{Number(product.price || 0).toLocaleString('en-IN')}
                  </span>
                </div>

                <Link
                  to={`/products/${product.id}`}
                  className="bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
