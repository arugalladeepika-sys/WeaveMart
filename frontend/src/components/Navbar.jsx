import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Globe, Video, Sparkles, LayoutDashboard } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Navbar({ user, onLogout, cartCount, onOpenGuidance }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <header className="sticky top-0 z-40 bg-amber-950/95 backdrop-blur-md text-amber-50 border-b border-amber-800/60 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Title */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-serif text-slate-950 font-bold text-xl shadow-md group-hover:scale-105 transition">
            W
          </div>
          <div>
            <h1 className="font-serif font-bold text-lg sm:text-xl tracking-tight text-amber-100 group-hover:text-amber-300 transition">
              WeaveMart
            </h1>
            <p className="text-[10px] text-amber-400 font-medium tracking-wider uppercase">
              The online market place
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <Link to="/" className="hover:text-amber-300 transition">{t('nav.home')}</Link>
          <Link to="/products" className="hover:text-amber-300 transition">{t('nav.products')}</Link>
          {user && (
            <Link to="/orders" className="hover:text-amber-300 transition flex items-center gap-1.5">
              {t('nav.orders')}
            </Link>
          )}
          {user?.role === 'WEAVER' && (
            <Link to="/dashboard" className="bg-amber-800/80 hover:bg-amber-700 text-amber-100 px-3 py-1.5 rounded-lg border border-amber-600/50 flex items-center gap-1.5 transition">
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              {t('nav.dashboard')}
            </Link>
          )}
        </nav>

        {/* Right Section Tools */}
        <div className="flex items-center gap-3">

          {/* Registration Guidance Video Button */}
          <button
            onClick={onOpenGuidance}
            className="hidden sm:flex items-center gap-1.5 text-xs bg-amber-900/80 hover:bg-amber-800 text-amber-200 px-3 py-2 rounded-xl border border-amber-700/60 transition shadow-sm"
            title="Watch Registration Guidance Video"
          >
            <Video className="w-4 h-4 text-amber-400" />
            <span className="font-semibold">{t('nav.guidance')}</span>
          </button>

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1 bg-amber-900/60 border border-amber-700/60 rounded-xl px-2 py-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={i18n.language}
              onChange={changeLanguage}
              className="bg-transparent text-amber-100 font-bold focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-amber-950 text-amber-100">EN (English)</option>
              <option value="hi" className="bg-amber-950 text-amber-100">HI (हिंदी)</option>
              <option value="te" className="bg-amber-950 text-amber-100">TE (తెలుగు)</option>
              <option value="ta" className="bg-amber-950 text-amber-100">TA (தமிழ்)</option>
              <option value="bn" className="bg-amber-950 text-amber-100">BN (বাংলা)</option>
            </select>
          </div>

          {/* Shopping Cart Icon */}
          <Link to="/cart" className="relative p-2 bg-amber-900/60 hover:bg-amber-800/80 rounded-xl border border-amber-700/60 text-amber-100 transition">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-amber-950 animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Auth Buttons */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden lg:inline text-xs bg-amber-900/90 text-amber-200 px-2.5 py-1 rounded-lg border border-amber-700 font-bold">
                {user.role}
              </span>
              <button
                onClick={onLogout}
                className="p-2 text-slate-300 hover:text-white hover:bg-amber-900/80 rounded-xl transition"
                title={t('nav.logout')}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>{t('nav.login')}</span>
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}
