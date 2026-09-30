import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, profile, loading, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-warm">
        <div className="glass-panel p-8 rounded-2xl flex flex-col items-center">
          <div className="w-8 h-8 border-2 border-charcoal border-t-transparent rounded-full animate-spin mb-3" />
          <span className="text-xs uppercase tracking-widest text-neutral-mid">Authenticating...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin && profile?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
