import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegistrationGuidanceModal from './components/RegistrationGuidanceModal';
import AiChatbot from './components/AiChatbot';

import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CartCheckout from './pages/CartCheckout';
import Orders from './pages/Orders';
import WeaverDashboard from './pages/WeaverDashboard';
import LoginRegister from './pages/LoginRegister';

export default function App() {
  // Tab-isolated session storage so multiple windows/tabs can run Weaver and Customer simultaneously!
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('weavemart_user') || localStorage.getItem('weavemart_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cart, setCart] = useState(() => {
    const saved = sessionStorage.getItem('weavemart_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [showGuidanceModal, setShowGuidanceModal] = useState(false);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('weavemart_user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('weavemart_user');
    }
  }, [user]);

  useEffect(() => {
    sessionStorage.setItem('weavemart_cart', JSON.stringify(cart));
  }, [cart]);

  const handleLoginSuccess = (userData, token) => {
    setUser(userData);
    sessionStorage.setItem('weavemart_token', token);
    sessionStorage.setItem('weavemart_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('weavemart_token');
    sessionStorage.removeItem('weavemart_user');
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between selection:bg-amber-200 selection:text-amber-900">
        
        {/* Navigation Bar */}
        <Navbar
          user={user}
          onLogout={handleLogout}
          cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
          onOpenGuidance={() => setShowGuidanceModal(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home onOpenGuidance={() => setShowGuidanceModal(true)} />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
            <Route
              path="/cart"
              element={
                <CartCheckout
                  cart={cart}
                  onRemoveFromCart={handleRemoveFromCart}
                  onClearCart={handleClearCart}
                  user={user}
                />
              }
            />
            <Route path="/orders" element={<Orders user={user} />} />
            <Route
              path="/dashboard"
              element={user ? <WeaverDashboard user={user} /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/login"
              element={
                <LoginRegister
                  onLoginSuccess={handleLoginSuccess}
                  onOpenGuidance={() => setShowGuidanceModal(true)}
                />
              }
            />
          </Routes>
          </ErrorBoundary>
        </main>

        {/* Registration Guidance Video Player Modal */}
        <RegistrationGuidanceModal
          isOpen={showGuidanceModal}
          onClose={() => setShowGuidanceModal(false)}
        />

        {/* Multi-Lingual AI Assistant */}
        <AiChatbot />

        {/* Footer */}
        <Footer />

      </div>
    </Router>
  );
}
