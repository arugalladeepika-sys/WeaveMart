import React, { useState, useEffect } from 'react';
import { PlusCircle, Package, Truck, Sparkles, CheckCircle2, MapPin, AlertCircle, UploadCloud, Image as ImageIcon, Loader2, ShieldCheck } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';
import axios from 'axios';

export default function WeaverDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'orders' | 'myProducts'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const weaverId = user?.id || 1;
  const weaverName = user?.fullName || 'Rameshwar Chinta';
  const weaverLocation = user?.craftRegion || 'Pochampally (Telangana)';

  // Product Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    fabricMaterial: 'Pure Mulberry Silk',
    weavePattern: 'Double Ikat',
    loomType: user?.loomType || 'Frame Loom',
    craftRegion: weaverLocation,
    threadCount: 120,
    careInstructions: 'Dry Clean Only',
    stockQuantity: 5,
    imageUrl: ''
  });

  const [message, setMessage] = useState('');

  const fetchWeaverData = () => {
    setLoading(true);
    axios.get(`/api/products/weaver/${weaverId}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));

    axios.get(`/api/orders/weaver/${weaverId}`)
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWeaverData();
  }, [weaverId]);

  // Handle Image File Upload
  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);

    // Upload file to backend server
    const data = new FormData();
    data.append('file', file);

    setUploadingImage(true);
    try {
      const res = await axios.post('/api/products/upload-image', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, imageUrl: res.data.imageUrl }));
    } catch (err) {
      console.error(err);
      // Fallback to local Data URL if server upload fails
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert("Product Title and Price are required!");
      return;
    }

    if (!formData.imageUrl && !imagePreview) {
      alert("Please upload an image file of your cloth!");
      return;
    }

    try {
      const payload = {
        ...formData,
        imageUrl: formData.imageUrl || imagePreview,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        threadCount: parseInt(formData.threadCount),
        weaverId: weaverId,
        weaverName: weaverName,
        weaverLocation: weaverLocation
      };

      await axios.post('/api/products', payload);
      setMessage("Handloom fabric product uploaded successfully!");
      setFormData({
        title: '',
        description: '',
        price: '',
        fabricMaterial: 'Pure Mulberry Silk',
        weavePattern: 'Double Ikat',
        loomType: 'Frame Loom',
        craftRegion: weaverLocation,
        threadCount: 120,
        careInstructions: 'Dry Clean Only',
        stockQuantity: 5,
        imageUrl: ''
      });
      setImagePreview(null);
      fetchWeaverData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      alert("Error uploading product.");
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus, trackingId = 'TRK-SPEEDPOST-102') => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, {
        status: newStatus,
        trackingId: trackingId,
        courierName: 'Indian SpeedPost Artisian Express'
      });
      fetchWeaverData();
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-950 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs text-amber-300 font-bold uppercase tracking-widest">Master Artisan Portal</span>
          <h1 className="font-serif font-bold text-3xl mt-0.5">Weaver Dashboard</h1>
          <p className="text-xs text-amber-200 mt-1">
            Welcome, <strong className="text-white">{weaverName}</strong> ({weaverLocation}) • 0% Middleman Commission
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-2.5">
            <span className="text-[11px] bg-emerald-600/90 text-white font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Artisan ID
            </span>
            {user?.artisanId && (
              <span className="text-[11px] bg-amber-800/80 text-amber-200 border border-amber-600/60 font-mono px-2.5 py-1 rounded-lg">
                ID: {user.artisanId}
              </span>
            )}
            {user?.idProofType && (
              <span className="text-[11px] bg-amber-900/60 text-amber-300 border border-amber-700/50 px-2.5 py-1 rounded-lg">
                {user.idProofType}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 bg-amber-900/80 p-1.5 rounded-2xl border border-amber-700/60">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'upload' ? 'bg-amber-500 text-slate-950 shadow' : 'text-amber-200 hover:text-white'
            }`}
          >
            + Upload New Fabric
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'orders' ? 'bg-amber-500 text-slate-950 shadow' : 'text-amber-200 hover:text-white'
            }`}
          >
            Orders Received ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('myProducts')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'myProducts' ? 'bg-amber-500 text-slate-950 shadow' : 'text-amber-200 hover:text-white'
            }`}
          >
            My Listings ({products.length})
          </button>
        </div>
      </div>

      {message && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 p-4 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" /> {message}
        </div>
      )}

      {/* TAB 1: Product Upload Form */}
      {activeTab === 'upload' && (
        <div className="bg-white rounded-3xl border border-amber-200/80 p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-amber-700" /> Upload Handcrafted Fabric / Saree
            </h2>
            <p className="text-xs text-slate-500">
              Provide fabric details and upload photos directly from your device so buyers can appreciate your loom craftsmanship.
            </p>
          </div>

          <form onSubmit={handleCreateProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            
            {/* File Upload Control */}
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px] mb-2">
                Cloth Image File Upload
              </label>
              
              <div className="border-2 border-dashed border-amber-300 bg-amber-50/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-amber-50 transition cursor-pointer relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                {uploadingImage ? (
                  <div className="flex flex-col items-center text-amber-800">
                    <Loader2 className="w-8 h-8 animate-spin mb-2" />
                    <span className="font-bold">Uploading cloth image file...</span>
                  </div>
                ) : imagePreview || formData.imageUrl ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <img
                      src={imagePreview || formData.imageUrl}
                      alt="Uploaded Fabric Preview"
                      className="w-32 h-32 object-cover rounded-xl border-2 border-amber-500 shadow-md"
                    />
                    <div className="text-left space-y-1">
                      <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> File Selected & Verified!
                      </span>
                      <p className="text-slate-500 text-[11px]">Click or drag to replace image file.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-amber-200/80 text-amber-900 flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-bold text-amber-900 text-sm block">Click to Browse File or Drag & Drop</span>
                      <span className="text-slate-500 text-xs">Supports JPG, PNG, WEBP high-res photos</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Product Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Pure Mulberry Silk Pochampally Double Ikat Saree"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Cloth Description & Handloom Story</label>
              <textarea
                rows="3"
                placeholder="Describe weave pattern, dye technique, days taken on loom..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Direct Price (₹)</label>
              <input
                type="number"
                required
                placeholder="e.g. 9850"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Stock Quantity Available</label>
              <input
                type="number"
                value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Fabric Material</label>
              <select
                value={formData.fabricMaterial}
                onChange={(e) => setFormData({ ...formData, fabricMaterial: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600 bg-white"
              >
                <option value="Pure Mulberry Silk">Pure Mulberry Silk</option>
                <option value="100% Organic Cotton">100% Organic Cotton</option>
                <option value="Tussar Silk">Tussar Silk</option>
                <option value="Chanderi Silk-Cotton">Chanderi Silk-Cotton</option>
                <option value="Linen Blend">Linen Blend</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Loom Type</label>
              <select
                value={formData.loomType}
                onChange={(e) => setFormData({ ...formData, loomType: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600 bg-white"
              >
                <option value="Frame Loom">Frame Loom</option>
                <option value="Traditional Pit Loom">Traditional Pit Loom</option>
                <option value="Jacquard Handloom">Jacquard Handloom</option>
                <option value="Fly Shuttle Loom">Fly Shuttle Loom</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Weave Pattern / Technique</label>
              <input
                type="text"
                placeholder="e.g. Double Ikat, Kadwa Brocade, Korvai"
                value={formData.weavePattern}
                onChange={(e) => setFormData({ ...formData, weavePattern: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Thread Count</label>
              <input
                type="number"
                placeholder="100s, 120s"
                value={formData.threadCount}
                onChange={(e) => setFormData({ ...formData, threadCount: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold py-3.5 rounded-2xl shadow-lg transition text-sm"
              >
                Publish Product to WeaveMart Marketplace
              </button>
            </div>

          </form>
        </div>
      )}

      {/* TAB 2: Orders Received Management */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="font-serif font-bold text-xl text-slate-900">Orders Received from Buyers</h2>

          {orders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-amber-200 text-slate-500 text-xs">
              No orders received yet. Once customers order via UPI, they will appear here!
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-3xl border border-amber-200/80 p-6 shadow-sm space-y-4 text-xs">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-3 gap-2">
                    <div>
                      <span className="font-bold text-amber-900 font-mono">Order #{order.id}</span>
                      <span className="mx-2">•</span>
                      <span>Customer: <strong className="text-slate-800">{order.customerName}</strong> ({order.customerPhone})</span>
                    </div>
                    <div className="bg-amber-100 text-amber-900 px-3 py-1 rounded-lg font-bold">
                      Current Status: {order.orderStatus}
                    </div>
                  </div>

                  <p className="text-slate-600">
                    <strong className="text-slate-800">Delivery Address:</strong> {order.shippingAddress}
                  </p>

                  {/* Status Action Buttons for Weaver */}
                  <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/60 flex flex-wrap items-center gap-3">
                    <span className="font-bold text-amber-900">Update Loom & Dispatch Status:</span>

                    {order.orderStatus === 'PLACED' && (
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, 'IN_PRODUCTION')}
                        className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-3 py-1.5 rounded-lg transition"
                      >
                        Start Handcrafting / Loom Weaving
                      </button>
                    )}

                    {order.orderStatus === 'IN_PRODUCTION' && (
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, 'SHIPPED', 'TRK-SPEEDPOST-' + Math.floor(1000 + Math.random() * 9000))}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1"
                      >
                        <Truck className="w-4 h-4" /> Mark Shipped via Courier
                      </button>
                    )}

                    {order.orderStatus === 'SHIPPED' && (
                      <button
                        onClick={() => handleUpdateOrderStatus(order.id, 'DELIVERED')}
                        className="bg-slate-800 hover:bg-slate-900 text-white font-bold px-3 py-1.5 rounded-lg transition"
                      >
                        Mark Delivered
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: My Products */}
      {activeTab === 'myProducts' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-amber-200/80 p-4 space-y-3">
              <img src={getImageUrl(product.imageUrl)} alt={product.title} className="w-full h-40 object-cover rounded-xl" />
              <h4 className="font-serif font-bold text-slate-900 text-sm">{product.title}</h4>
              <div className="flex justify-between items-center text-xs font-bold text-amber-900">
                <span>₹{product.price?.toLocaleString('en-IN')}</span>
                <span className="text-slate-500 font-mono">Stock: {product.stockQuantity}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
