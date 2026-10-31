import React, { useState } from 'react';
import { QrCode, Smartphone, CheckCircle, Loader2, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function UpiPaymentModal({ isOpen, onClose, amount, onPaymentSuccess }) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('qr'); // 'qr' or 'vpa'
  const [vpa, setVpa] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'processing' | 'success'

  if (!isOpen) return null;

  const handleSimulatePayment = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onPaymentSuccess({
          upiTransactionId: "UPI-" + Math.floor(100000000 + Math.random() * 900000000),
          paymentMethod: activeTab === 'qr' ? 'UPI_QR' : 'UPI_VPA'
        });
        setStatus('idle');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-amber-100">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-900 p-5 text-white flex justify-between items-center">
          <div>
            <span className="text-xs text-amber-200 uppercase font-bold tracking-wider">Direct Weaver Credit</span>
            <h3 className="font-serif font-bold text-xl flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              {t('upi.title')}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-amber-800 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Amount Header Banner */}
        <div className="bg-amber-50 p-4 border-b border-amber-200/60 flex justify-between items-center">
          <span className="text-sm font-semibold text-slate-700">Total Payable Amount:</span>
          <span className="text-2xl font-extrabold text-amber-900 font-serif">₹{amount?.toLocaleString('en-IN')}</span>
        </div>

        {/* Payment Processing Screens */}
        {status === 'processing' && (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
            <Loader2 className="w-12 h-12 text-amber-600 animate-spin mb-4" />
            <h4 className="text-lg font-bold text-slate-800 mb-1">{t('upi.verifying')}</h4>
            <p className="text-xs text-slate-500">Connecting securely with NPCI UPI Payment Gateway...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-emerald-700 mb-1">{t('upi.success')}</h4>
            <p className="text-xs text-slate-600">100% payout routed directly to weaver's bank account.</p>
          </div>
        )}

        {status === 'idle' && (
          <div className="p-6">
            {/* Payment Method Switcher Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
              <button 
                onClick={() => setActiveTab('qr')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'qr' ? 'bg-white text-amber-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <QrCode className="w-4 h-4" /> Scan QR Code
              </button>
              <button 
                onClick={() => setActiveTab('vpa')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  activeTab === 'vpa' ? 'bg-white text-amber-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Smartphone className="w-4 h-4" /> UPI App / VPA
              </button>
            </div>

            {activeTab === 'qr' ? (
              <div className="flex flex-col items-center text-center">
                {/* Simulated Live QR Code SVG */}
                <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-amber-400 shadow-inner mb-3">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=upi://pay?pa=weavemart@upi%26pn=WeaveMart%26am=${amount}%26cu=INR`} 
                    alt="UPI Payment QR Code"
                    className="w-40 h-40 object-contain rounded-lg"
                  />
                </div>
                <p className="text-xs text-slate-600 font-medium mb-4">
                  Scan with GPay, PhonePe, Paytm, BHIM or any banking app
                </p>

                {/* Popular App Icons */}
                <div className="flex justify-center gap-4 mb-6">
                  {['Google Pay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                    <span key={app} className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-1 rounded-md border border-amber-300/50">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Enter Virtual Payment Address (VPA)
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. mobileNumber@upi or name@okaxis"
                    value={vpa}
                    onChange={(e) => setVpa(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-600 text-sm font-mono"
                  />
                </div>
                <p className="text-xs text-slate-500">
                  A payment request of ₹{amount?.toLocaleString('en-IN')} will be sent to your UPI app.
                </p>
              </div>
            )}

            {/* Simulated Action Button */}
            <button
              onClick={handleSimulatePayment}
              className="w-full mt-2 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 text-sm"
            >
              {t('upi.payBtn')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
