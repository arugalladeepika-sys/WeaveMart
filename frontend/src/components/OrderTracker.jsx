import React from 'react';
import { CheckCircle2, Clock, Truck, PackageCheck, Sparkles, MapPin, Banknote, QrCode } from 'lucide-react';

export default function OrderTracker({ order }) {
  if (!order) return null;

  const isCod = order.paymentMethod === 'COD';

  const steps = [
    {
      key: 'PLACED',
      title: 'Order Confirmed',
      desc: isCod ? 'Order confirmed via Cash on Delivery.' : 'Payment received via UPI. Order dispatched to Weaver.',
      icon: CheckCircle2,
    },
    {
      key: 'IN_PRODUCTION',
      title: 'Weaving in Progress',
      desc: 'Artisan is weaving your custom fabric on the handloom.',
      icon: Sparkles,
    },
    {
      key: 'SHIPPED',
      title: 'Dispatched via Courier',
      desc: order.trackingId ? `Tracking ID: ${order.trackingId} (${order.courierName || 'SpeedPost'})` : 'Handcrafted item packed & shipped.',
      icon: Truck,
    },
    {
      key: 'DELIVERED',
      title: 'Delivered to Customer',
      desc: isCod ? `Handwoven cloth delivered. Pay ₹${order.totalAmount?.toLocaleString('en-IN')} cash.` : 'Handwoven cloth safely received.',
      icon: PackageCheck,
    }
  ];

  const getStepStatus = (stepKey) => {
    const statusOrder = ['PLACED', 'IN_PRODUCTION', 'SHIPPED', 'DELIVERED'];
    const currentIndex = statusOrder.indexOf(order.orderStatus);
    const stepIndex = statusOrder.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'upcoming';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-amber-200/80 shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-amber-100 pb-4 mb-6 gap-2">
        <div>
          <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
            Order #{order.id}
          </span>
          <h3 className="font-serif font-bold text-slate-900 text-lg mt-1">
            Status: <span className="text-amber-800">{order.orderStatus?.replace('_', ' ')}</span>
          </h3>
        </div>
        <div className="text-left sm:text-right text-xs text-slate-500">
          <p className="font-mono flex items-center sm:justify-end gap-1 font-bold text-slate-800">
            {isCod ? (
              <>
                <Banknote className="w-4 h-4 text-emerald-600" /> Cash on Delivery (COD)
              </>
            ) : (
              <>
                <QrCode className="w-4 h-4 text-amber-600" /> UPI Txn ID: {order.upiTransactionId || 'UPI-VERIFIED'}
              </>
            )}
          </p>
          <p>Est. Delivery: <span className="font-bold text-slate-700">{order.estimatedDeliveryDays || '4-6 Days'}</span></p>
        </div>
      </div>

      {/* Timeline Tracker UI */}
      <div className="relative my-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step) => {
            const status = getStepStatus(step.key);
            const Icon = step.icon;

            return (
              <div key={step.key} className="flex md:flex-col items-start gap-4 md:gap-2">
                {/* Status Badge */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 shadow-md transition-all ${
                  status === 'completed' 
                    ? 'bg-emerald-600 ring-4 ring-emerald-100' 
                    : status === 'active' 
                    ? 'bg-amber-600 ring-4 ring-amber-100 animate-pulse' 
                    : 'bg-slate-200 text-slate-400'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div>
                  <h4 className={`text-sm font-bold ${status === 'upcoming' ? 'text-slate-400' : 'text-slate-800'}`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shipping Address Detail */}
      <div className="mt-6 pt-4 border-t border-slate-100 bg-amber-50/50 p-4 rounded-xl flex items-start gap-3 text-xs text-slate-700">
        <MapPin className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">Delivery Address:</span>
          <p className="mt-0.5 leading-relaxed">{order.shippingAddress}</p>
        </div>
      </div>
    </div>
  );
}
