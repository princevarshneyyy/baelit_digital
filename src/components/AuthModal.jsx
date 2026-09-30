import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, CheckCircle, Lock, Mail, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BRAND_NAME } from '../data/mockData';

export default function AuthModal({ isOpen, onClose }) {
  const { login, signup, resetPassword } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsSuccess(false);
      setAuthError(null);
      setErrors({});
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
    if (authError) setAuthError(null);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (activeTab !== 'forgot') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }

    if (activeTab === 'signup') {
      if (!formData.name.trim()) {
        newErrors.name = 'Full name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setAuthError(null);

    try {
      if (activeTab === 'login') {
        const res = await login(formData.email, formData.password);
        if (res.error) throw res.error;
        setIsSuccess(true);
      } else if (activeTab === 'signup') {
        const res = await signup(formData.email, formData.password, formData.name);
        if (res.error) throw res.error;
        setIsSuccess(true);
      } else if (activeTab === 'forgot') {
        const res = await resetPassword(formData.email);
        if (res.error) throw res.error;
        setIsSuccess(true);
      }
    } catch (err) {
      setAuthError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setErrors({});
    setAuthError(null);
    setIsSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-charcoal/40 backdrop-blur-md z-50 flex items-center justify-center p-4"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 w-full max-w-md glass-modal rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-modal-title"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-neutral-mid hover:text-charcoal hover:bg-neutral-light/50 transition-colors focus:outline-none focus:ring-2 focus:ring-charcoal"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Brand Title */}
            <div className="text-center mb-6">
              <span className="text-xs font-semibold tracking-widest text-neutral-mid uppercase">
                {BRAND_NAME} Client Portal
              </span>
              <h2 id="auth-modal-title" className="text-2xl font-light text-charcoal mt-1">
                {activeTab === 'login' && 'Welcome Back'}
                {activeTab === 'signup' && 'Create Account'}
                {activeTab === 'forgot' && 'Reset Password'}
              </h2>
            </div>

            {/* Tab Switcher */}
            {activeTab !== 'forgot' && (
              <div className="flex bg-neutral-warm/80 rounded-xl p-1 mb-6 border border-white/60">
                <button
                  type="button"
                  onClick={() => switchTab('login')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeTab === 'login'
                      ? 'bg-white text-charcoal shadow-sm'
                      : 'text-neutral-mid hover:text-charcoal'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => switchTab('signup')}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                    activeTab === 'signup'
                      ? 'bg-white text-charcoal shadow-sm'
                      : 'text-neutral-mid hover:text-charcoal'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            )}

            {authError && (
              <div className="p-3 mb-4 bg-red-50/80 border border-red-200 rounded-xl flex items-center gap-2.5 text-xs text-red-600">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6 flex flex-col items-center"
              >
                <CheckCircle className="w-12 h-12 text-charcoal mb-3" />
                <h3 className="text-xl font-medium text-charcoal">
                  {activeTab === 'login' && 'Authentication Successful'}
                  {activeTab === 'signup' && 'Account Created'}
                  {activeTab === 'forgot' && 'Password Reset Link Sent'}
                </h3>
                <p className="text-sm text-neutral-mid mt-2 max-w-xs">
                  {activeTab === 'forgot'
                    ? 'Check your email for instructions to reset your password.'
                    : 'Access granted to your client workspace.'}
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2 bg-charcoal text-white rounded-lg text-sm font-medium hover:bg-stone-accent transition-colors"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {activeTab === 'signup' && (
                  <div>
                    <label className="block text-xs font-medium text-neutral-mid mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-neutral-mid" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full pl-10 pr-4 py-2.5 bg-white/70 border ${
                          errors.name ? 'border-red-400' : 'border-neutral-light'
                        } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal transition-all`}
                      />
                    </div>
                    {errors.name && (
                      <span className="text-xs text-red-500 mt-1 block">{errors.name}</span>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-neutral-mid mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-neutral-mid" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="client@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 bg-white/70 border ${
                        errors.email ? 'border-red-400' : 'border-neutral-light'
                      } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal transition-all`}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-xs text-red-500 mt-1 block">{errors.email}</span>
                  )}
                </div>

                {activeTab !== 'forgot' && (
                  <div>
                    <label className="block text-xs font-medium text-neutral-mid mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-neutral-mid" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-10 py-2.5 bg-white/70 border ${
                          errors.password ? 'border-red-400' : 'border-neutral-light'
                        } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal transition-all`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-neutral-mid hover:text-charcoal"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-xs text-red-500 mt-1 block">{errors.password}</span>
                    )}
                  </div>
                )}

                {activeTab === 'signup' && (
                  <div>
                    <label className="block text-xs font-medium text-neutral-mid mb-1">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-neutral-mid" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-4 py-2.5 bg-white/70 border ${
                          errors.confirmPassword ? 'border-red-400' : 'border-neutral-light'
                        } rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-charcoal transition-all`}
                      />
                    </div>
                    {errors.confirmPassword && (
                      <span className="text-xs text-red-500 mt-1 block">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                )}

                {activeTab === 'login' && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => switchTab('forgot')}
                      className="text-xs text-neutral-mid hover:text-charcoal transition-colors underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {activeTab === 'forgot' && (
                  <div className="flex justify-start">
                    <button
                      type="button"
                      onClick={() => switchTab('login')}
                      className="text-xs text-neutral-mid hover:text-charcoal transition-colors underline"
                    >
                      ← Back to Sign In
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-charcoal text-white rounded-xl text-sm font-medium hover:bg-stone-accent transition-all shadow-md mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : activeTab === 'login' ? (
                    'Sign In to Portal'
                  ) : activeTab === 'signup' ? (
                    'Create Account'
                  ) : (
                    'Send Reset Instructions'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
