import React from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 py-16">
      <GlassCard className="max-w-md w-full text-center py-12 px-8" hoverEffect={false}>
        <div className="w-16 h-16 bg-white/80 rounded-2xl border border-white/90 shadow-sm flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-charcoal" />
        </div>

        <span className="text-xs font-semibold tracking-widest text-neutral-mid uppercase bg-white/70 px-3.5 py-1 rounded-full border border-white/80">
          404 Error
        </span>

        <h1 className="text-3xl font-light text-charcoal mt-4 mb-2">
          Page Not Found
        </h1>

        <p className="text-xs text-neutral-mid leading-relaxed mb-8">
          The advisory resource or link you are looking for does not exist or has been relocated within the BAELIT workspace.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3 bg-charcoal text-white rounded-xl text-xs uppercase tracking-wider font-medium hover:bg-stone-accent transition-all shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </GlassCard>
    </div>
  );
}
