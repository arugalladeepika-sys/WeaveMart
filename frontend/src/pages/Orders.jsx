import React, { useState, useEffect } from 'react';
import { Package, Clock, ShieldCheck, RefreshCw } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';
import OrderTracker from '../components/OrderTracker';
import axios from 'axios';

export default function Orders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const customerId = user?.id || 1;

  const fetchOrders = () => {
    setLoading(true);
    axios.get(`/api/orders/customer/${customerId}`)
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
    fetchOrders();
  }, [customerId]);

  if (loading) return <div className="text-center py-20 text-slate-500">Loading your orders...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif font-bold text-3xl text-slate-900">My Handloom Orders</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track real-time handcrafting and courier dispatch of your artisan fabrics.
          </p>
        </div>
        <button 
          onClick={fetchOrders}
          className="flex items-center gap-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold px-3 py-2 rounded-xl transition"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh Status
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-amber-200 text-slate-500">
          <Package className="w-12 h-12 text-amber-700 mx-auto mb-3" />
          <h3 className="font-serif font-bold text-lg text-slate-800">No Orders Placed Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Purchase direct from weavers to view real-time handloom production status.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="space-y-4">
              
              {/* Items Card Summary */}
              <div className="bg-amber-900/90 text-amber-100 p-4 rounded-2xl flex justify-between items-center text-xs">
                <div>
                  <span className="text-amber-300 font-mono">Order #{order.id}</span>
                  <span className="mx-2">•</span>
                  <span>Placing Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="font-bold font-serif text-sm text-white">
                  Total Paid: ₹{order.totalAmount?.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Order Tracker Timeline Component */}
              <OrderTracker order={order} />

              {/* Items Detail Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 divide-y divide-slate-100">
                {order.items?.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={getImageUrl(item.imageUrl)} alt={item.productTitle} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-serif font-bold text-slate-900">{item.productTitle}</h4>
                        <p className="text-slate-500">Fabric: {item.fabricMaterial} • Artisan: {item.weaverName}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-800 font-serif">
                      ₹{item.price?.toLocaleString('en-IN')} x {item.quantity}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
