import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Mail, Phone, Video, ShieldCheck, MapPin, Sparkles, ArrowRight, Eye, EyeOff, UploadCloud, CheckCircle2, Loader2, FileText, BadgeCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function LoginRegister({ onLoginSuccess, onOpenGuidance }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('CUSTOMER'); // 'CUSTOMER' | 'WEAVER'
  
  // Weaver Specific & ID Proof Validation State
  const [artisanId, setArtisanId] = useState('');
  const [idProofType, setIdProofType] = useState('Government Pehchan Card (Ministry of Textiles)');
  const [idProofDocumentUrl, setIdProofDocumentUrl] = useState('');
  const [proofPreview, setProofPreview] = useState(null);
  const [uploadingProof, setUploadingProof] = useState(false);
  const [loomType, setLoomType] = useState('Frame Loom');
  const [craftRegion, setCraftRegion] = useState('Pochampally (Telangana)');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleQuickLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  const handleProofFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setProofPreview(localUrl);

    // Upload to backend
    const data = new FormData();
    data.append('file', file);
    setUploadingProof(true);

    try {
      const res = await axios.post('/api/auth/upload-id-proof', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setIdProofDocumentUrl(res.data.documentUrl);
    } catch (err) {
      console.error(err);
      // Fallback to FileReader Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdProofDocumentUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingProof(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password.trim();

      if (isLogin) {
        const res = await axios.post('/api/auth/login', { email: cleanEmail, password: cleanPassword });
        onLoginSuccess(res.data.user, res.data.token);
        navigate(res.data.user.role === 'WEAVER' ? '/dashboard' : '/products');
      } else {
        // Validation for Weaver role
        if (role === 'WEAVER') {
          if (!artisanId.trim()) {
            setError("Please enter your Weaver ID / Pehchan Card Number for identity validation!");
            return;
          }
          if (!idProofDocumentUrl && !proofPreview) {
            setError("Please upload an image or scan of your Weaver ID Proof card to validate your artisan profile!");
            return;
          }
        }

        const payload = {
          email: cleanEmail,
          password: cleanPassword,
          fullName: fullName.trim(),
          phone: phone.trim(),
          role,
          artisanId: role === 'WEAVER' ? artisanId.trim() : null,
          idProofType: role === 'WEAVER' ? idProofType : null,
          idProofDocumentUrl: role === 'WEAVER' ? (idProofDocumentUrl || proofPreview) : null,
          loomType: role === 'WEAVER' ? loomType : null,
          craftRegion: role === 'WEAVER' ? craftRegion : null,
          address: address.trim()
        };

        const res = await axios.post('/api/auth/register', payload);
        onLoginSuccess(res.data.user, res.data.token);
        navigate(res.data.user.role === 'WEAVER' ? '/dashboard' : '/products');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Authentication failed. Please check details.");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8">
      <div className="bg-white rounded-3xl border border-amber-200/80 shadow-xl overflow-hidden">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-amber-800 to-amber-950 p-8 text-white text-center relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl">
              {isLogin ? 'Welcome Back to WeaveMart' : 'Create Your WeaveMart Account'}
            </h2>
            <p className="text-xs text-amber-200">
              Role-based platform connecting Rural Weaver Artisans directly with Cloth Buyers.
            </p>

            {/* Video Guidance Launcher Link */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenGuidance}
                className="inline-flex items-center gap-1.5 bg-amber-900/90 hover:bg-amber-800 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-500/40 transition shadow"
              >
                <Video className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Need Registration Guidance? Watch Video Tutorial</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-amber-50/50">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3.5 text-xs font-bold transition border-b-2 ${
              isLogin ? 'border-amber-800 text-amber-900 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Login to Account
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3.5 text-xs font-bold transition border-b-2 ${
              !isLogin ? 'border-amber-800 text-amber-900 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            New Registration
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          
          {error && (
            <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">

            {/* Quick Demo Credentials Box */}
            {isLogin && (
              <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3 mb-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-900 text-[11px] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Quick Demo Credentials:
                  </span>
                  <span className="text-[10px] text-slate-500">Click to autofill</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('weaver@weavemart.com', 'weaver123')}
                    className="p-2 rounded-xl bg-white border border-amber-300 hover:bg-amber-100/70 text-slate-800 text-left transition"
                  >
                    <span className="font-bold text-amber-800 block text-[11px]">Weaver (Artisan)</span>
                    <span className="text-[10px] text-slate-500 font-mono">weaver@weavemart.com</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('customer@weavemart.com', 'customer123')}
                    className="p-2 rounded-xl bg-white border border-amber-300 hover:bg-amber-100/70 text-slate-800 text-left transition"
                  >
                    <span className="font-bold text-emerald-800 block text-[11px]">Customer (Buyer)</span>
                    <span className="text-[10px] text-slate-500 font-mono">customer@weavemart.com</span>
                  </button>
                </div>
              </div>
            )}

            {/* Registration Role Selector */}
            {!isLogin && (
              <div className="space-y-2 bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 mb-4">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Select Your Account Role:
                  </label>
                  <span className="text-[10px] text-amber-800 font-semibold">
                    {role === 'WEAVER' ? 'Artisan verification active' : 'Click "Weaver" to upload ID'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('CUSTOMER')}
                    className={`p-3 rounded-xl font-bold border-2 transition text-left flex flex-col justify-between ${
                      role === 'CUSTOMER' 
                        ? 'bg-amber-800 text-white border-amber-900 shadow-md ring-2 ring-amber-400' 
                        : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <span className="text-xs font-bold block">Buyer / Customer</span>
                    <span className={`text-[10px] font-normal ${role === 'CUSTOMER' ? 'text-amber-200' : 'text-slate-400'}`}>
                      Buy authentic fabrics
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('WEAVER')}
                    className={`p-3 rounded-xl font-bold border-2 transition text-left flex flex-col justify-between ${
                      role === 'WEAVER' 
                        ? 'bg-amber-800 text-white border-amber-900 shadow-md ring-2 ring-amber-400' 
                        : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold block flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Weaver / Seller
                      </span>
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded ${role === 'WEAVER' ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-900'}`}>
                        ID Proof Req.
                      </span>
                    </div>
                    <span className={`text-[10px] font-normal ${role === 'WEAVER' ? 'text-amber-200' : 'text-slate-400'}`}>
                      Requires Artisan ID card
                    </span>
                  </button>
                </div>

                {role === 'WEAVER' ? (
                  <div className="bg-amber-100/90 text-amber-950 p-2.5 rounded-xl text-[11px] font-semibold flex items-center gap-2 border border-amber-300">
                    <BadgeCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Weaver registration active. The <strong>Weaver ID Proof & Card Upload</strong> section is displayed below!</span>
                  </div>
                ) : (
                  <div className="bg-white/80 text-slate-600 p-2 rounded-xl text-[10px] flex items-center gap-1.5 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0"></span>
                    <span>Currently registering as a Buyer. To register as an artisan weaver with ID proof, click <strong>"Weaver / Seller"</strong> above.</span>
                  </div>
                )}
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600"
                />
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600"
              />
            </div>

            {/* Password Input with Show/Hide Password Toggle Icon */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 pr-10 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-amber-800 transition p-0.5 rounded-md"
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-amber-800" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600"
                />
              </div>
            )}

            {/* Weaver Specific Registration Fields & ID Proof Validation */}
            {!isLogin && role === 'WEAVER' && (
              <div className="space-y-4 p-4 bg-amber-50/90 rounded-2xl border-2 border-amber-300">
                <div className="flex items-center justify-between border-b border-amber-200/80 pb-2">
                  <span className="font-bold text-amber-900 flex items-center gap-1.5 text-xs uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4 text-amber-700" /> Artisan Identity Proof Validation
                  </span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-md">
                    Required for Artisans
                  </span>
                </div>

                {/* ID Proof Type */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Select Weaver ID Proof Type
                  </label>
                  <select
                    value={idProofType}
                    onChange={(e) => setIdProofType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600 bg-white text-xs cursor-pointer font-medium"
                  >
                    <option value="Government Pehchan Card (Ministry of Textiles)">Government Pehchan Card (Ministry of Textiles)</option>
                    <option value="National Handloom Artisan Identity Card">National Handloom Artisan Identity Card</option>
                    <option value="State Handloom Weavers Cooperative Society ID">State Handloom Weavers Cooperative Society ID</option>
                    <option value="Aadhaar Card with Village Weaver Certification">Aadhaar Card with Village Weaver Certification</option>
                  </select>
                </div>

                {/* Weaver ID / Pehchan Card Number */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Weaver ID / Pehchan Card Number</span>
                    <span className="text-[10px] text-amber-800 font-normal">Must match your physical card</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ART-TS-10492 or PEHCHAN-782940"
                    value={artisanId}
                    onChange={(e) => setArtisanId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600 bg-white font-mono text-xs uppercase"
                  />
                </div>

                {/* File Upload for ID Proof Card */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Upload Physical Weaver ID Proof Card / Certificate
                  </label>
                  <div className="border-2 border-dashed border-amber-300 bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center hover:bg-amber-50/50 transition cursor-pointer relative group">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleProofFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />

                    {uploadingProof ? (
                      <div className="flex flex-col items-center text-amber-800 py-2">
                        <Loader2 className="w-6 h-6 animate-spin mb-1 text-amber-600" />
                        <span className="font-bold text-xs">Uploading ID proof document...</span>
                      </div>
                    ) : proofPreview || idProofDocumentUrl ? (
                      <div className="flex items-center gap-3 py-1">
                        <img
                          src={proofPreview || idProofDocumentUrl}
                          alt="Weaver ID Preview"
                          className="w-16 h-16 object-cover rounded-lg border-2 border-emerald-500 shadow-sm"
                        />
                        <div className="text-left">
                          <span className="text-emerald-700 font-bold text-xs flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> ID Document Uploaded!
                          </span>
                          <span className="text-slate-500 text-[10px] block">Click or drag to replace image.</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-1 py-1">
                        <UploadCloud className="w-6 h-6 text-amber-700 mx-auto group-hover:scale-110 transition" />
                        <span className="font-bold text-amber-900 text-xs block">Click to upload photo of Weaver ID Card</span>
                        <span className="text-slate-500 text-[10px]">Supports JPG, PNG, WEBP, PDF (Front & Back)</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Loom Type Used</label>
                    <select
                      value={loomType}
                      onChange={(e) => setLoomType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600 bg-white"
                    >
                      <option value="Frame Loom">Frame Loom</option>
                      <option value="Traditional Pit Loom">Traditional Pit Loom</option>
                      <option value="Jacquard Handloom">Jacquard Handloom</option>
                      <option value="Fly Shuttle Loom">Fly Shuttle Loom</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Village Craft Region</label>
                    <input
                      type="text"
                      placeholder="e.g. Pochampally, Kanchipuram"
                      value={craftRegion}
                      onChange={(e) => setCraftRegion(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600 bg-white"
                    />
                  </div>
                </div>

                <div className="bg-amber-100/70 p-2.5 rounded-xl border border-amber-200 text-[11px] text-amber-950 flex items-start gap-2">
                  <BadgeCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    Your uploaded ID Proof will be authenticated against Ministry of Textiles records to grant the <strong>Verified Artisan Badge</strong> on your handloom products.
                  </span>
                </div>
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block font-bold text-slate-700 mb-1">Default Shipping / Village Address</label>
                <textarea
                  rows="2"
                  placeholder="Enter full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-600"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold py-3.5 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm pt-3"
            >
              {isLogin ? 'Login to WeaveMart' : 'Register Account'} <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}
