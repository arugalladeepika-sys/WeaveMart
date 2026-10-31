import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, ShieldCheck, ArrowRight, ShoppingBag, MapPin, Phone, User as UserIcon, QrCode, Banknote, CheckCircle } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';
import UpiPaymentModal from '../components/UpiPaymentModal';
import axios from 'axios';

export default function CartCheckout({ cart, onRemoveFromCart, onClearCart, user }) {
  const navigate = useNavigate();
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [paymentOption, setPaymentOption] = useState('UPI'); // 'UPI' | 'COD'
  const [shippingAddress, setShippingAddress] = useState(user?.address || 'Flat 402, Royal Palms, Hyderabad, Telangana');
  const [customerName, setCustomerName] = useState(user?.fullName || 'Ananya Sharma');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+91 98112 34567');
  const [placingOrder, setPlacingOrder] = useState(false);

  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckoutSubmit = () => {
    if (!shippingAddress.trim() || !customerName.trim()) {
      alert("Please provide your delivery address and name!");
      return;
    }

    if (paymentOption === 'UPI') {
      setShowUpiModal(true);
    } else {
      // Place Cash on Delivery Order directly
      handlePlaceCodOrder();
    }
  };

  const handlePlaceCodOrder = async () => {
    setPlacingOrder(true);
    try {
      const orderPayload = {
        customerId: user?.id || 1,
        customerName: customerName,
        customerEmail: user?.email || 'customer@weavemart.com',
        customerPhone: customerPhone,
        shippingAddress: shippingAddress,
        totalAmount: totalAmount,
        upiTransactionId: "COD-CASH-ON-DELIVERY",
        paymentMethod: "COD",
        items: cart.map(item => ({
          productId: item.id,
          productTitle: item.title,
          fabricMaterial: item.fabricMaterial,
          imageUrl: item.imageUrl,
          weaverId: item.weaverId,
          weaverName: item.weaverName,
          price: item.price,
          quantity: item.quantity
        }))
      };

      await axios.post('/api/orders', orderPayload);
      onClearCart();
      setPlacingOrder(false);
      navigate('/orders');
    } catch (err) {
      console.error(err);
      alert("Failed to place Cash on Delivery order. Please try again.");
      setPlacingOrder(false);
    }
  };

  const handlePaymentSuccess = async (upiResult) => {
    setShowUpiModal(false);
    setPlacingOrder(true);

    try {
      const orderPayload = {
        customerId: user?.id || 1,
        customerName: customerName,
        customerEmail: user?.email || 'customer@weavemart.com',
        customerPhone: customerPhone,
        shippingAddress: shippingAddress,
        totalAmount: totalAmount,
        upiTransactionId: upiResult.upiTransactionId,
        paymentMethod: upiResult.paymentMethod,
        items: cart.map(item => ({
          productId: item.id,
          productTitle: item.title,
          fabricMaterial: item.fabricMaterial,
          imageUrl: item.imageUrl,
          weaverId: item.weaverId,
          weaverName: item.weaverName,
          price: item.price,
          quantity: item.quantity
        }))
      };

      await axios.post('/api/orders', orderPayload);
      onClearCart();
      setPlacingOrder(false);
      navigate('/orders');
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
      setPlacingOrder(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center bg-white rounded-3xl border border-amber-200 p-8 shadow-sm space-y-4">
        <ShoppingBag className="w-16 h-16 text-amber-700 mx-auto" />
        <h2 className="font-serif font-bold text-2xl text-slate-800">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Explore handcrafted sarees, unstitched fabric rolls, and traditional weaves directly from rural artisans.
        </p>
        <Link
          to="/products"
          className="inline-block bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs px-6 py-3 rounded-xl transition"
        >
          Browse Handloom Fabrics
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <h1 className="font-serif font-bold text-3xl text-slate-900">
        Cart & Direct Weaver Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Items List, Address & Payment Options */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Cart Items List */}
          <div className="bg-white rounded-3xl border border-amber-200/80 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
              Selected Handloom Items ({cart.length})
            </h3>

            <div className="divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <img 
                      src={getImageUrl(item.imageUrl)} 
                      alt={item.title} 
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500">
                        Fabric: {item.fabricMaterial} • Woven by <span className="font-semibold">{item.weaverName}</span>
                      </p>
                      <span className="text-xs font-bold text-amber-900 font-serif">
                        ₹{item.price?.toLocaleString('en-IN')} x {item.quantity}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                    title="Remove Item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address Form */}
          <div className="bg-white rounded-3xl border border-amber-200/80 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-700" /> Delivery Address & Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Complete Shipping Address</label>
                <textarea
                  rows="3"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-600"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection (UPI vs Cash on Delivery) */}
          <div className="bg-white rounded-3xl border border-amber-200/80 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
              Select Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Option 1: UPI Gateway */}
              <div 
                onClick={() => setPaymentOption('UPI')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                  paymentOption === 'UPI' 
                    ? 'border-amber-600 bg-amber-50/60 shadow' 
                    : 'border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${paymentOption === 'UPI' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Online UPI Gateway</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Pay via GPay, PhonePe, Paytm, BHIM or QR Code.</p>
                </div>
              </div>

              {/* Option 2: Cash on Delivery (COD) */}
              <div 
                onClick={() => setPaymentOption('COD')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition flex items-start gap-3 ${
                  paymentOption === 'COD' 
                    ? 'border-emerald-600 bg-emerald-50/60 shadow' 
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div className={`p-2.5 rounded-xl ${paymentOption === 'COD' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1">
                    Cash on Delivery (COD)
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">Pay cash to delivery executive upon receiving cloth.</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Order Summary & Action Button */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-amber-200/80 p-6 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
              Payment Summary
            </h3>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Fabric Items Total</span>
                <span className="font-semibold text-slate-800">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Artisan Shipping & Handling</span>
                <span className="font-semibold text-emerald-700">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Mode</span>
                <span className="font-bold text-amber-900">
                  {paymentOption === 'UPI' ? 'Online UPI' : 'Cash on Delivery'}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
              <span className="font-serif font-bold text-slate-900 text-base">Total Payable</span>
              <span className="font-serif font-extrabold text-amber-900 text-2xl">
                ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {paymentOption === 'COD' ? (
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-[11px] text-emerald-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Cash on Delivery selected. Pay ₹{totalAmount.toLocaleString('en-IN')} cash upon delivery.</span>
              </div>
            ) : (
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>100% direct payment via UPI QR code or GPay / PhonePe / Paytm.</span>
              </div>
            )}

            <button
              onClick={handleCheckoutSubmit}
              disabled={placingOrder}
              className={`w-full font-bold py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 text-sm ${
                paymentOption === 'COD' 
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white'
                  : 'bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white'
              }`}
            >
              {paymentOption === 'COD' ? (
                <>
                  <Banknote className="w-4 h-4" /> Place Cash on Delivery Order
                </>
              ) : (
                <>
                  Pay via UPI Gateway <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* UPI Payment Modal */}
      <UpiPaymentModal
        isOpen={showUpiModal}
        onClose={() => setShowUpiModal(false)}
        amount={totalAmount}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
