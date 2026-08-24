import React, { useState } from 'react';
import { AuthModal } from './components/common/AuthModal';
import { Compass, Calendar, AlertTriangle, ShieldCheck } from 'lucide-react';

export const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(true);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center relative overflow-hidden font-sans">
      {/* Privacy Header Ticker */}
      <div className="w-full bg-amber-900/30 border-b border-amber-500/20 py-1.5 px-4 text-center text-xs text-amber-200 flex items-center justify-center gap-2">
        <span className="font-bold tracking-wider text-[10px] uppercase text-orange-400">Privacy Verified by Gaido</span>
        <span>•</span>
        <span className="text-amber-300/80">Government-grade telemetry encryption. Zero track logging.</span>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md flex-1 p-4 pb-20 space-y-4">
        {/* App Title Header */}
        <div className="flex items-center justify-between py-2">
          <h1 className="text-xl font-bold tracking-tight">Gaido AI Suggestions</h1>
          <button 
            onClick={() => setShowAuthModal(true)}
            className="text-xs text-orange-400 font-semibold underline"
          >
            {isAuthenticated ? 'Account Settings' : 'Sign In'}
          </button>
        </div>

        {/* Travel Suggestion Hero Card */}
        <div className="relative rounded-2xl overflow-hidden bg-indigo-950 border border-indigo-800 shadow-xl">
          <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80')` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/20 to-transparent" />
          </div>
          <div className="p-4 relative -mt-8">
            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wide">
              Optimal Season
            </span>
            <h2 className="text-xl font-bold mt-1 text-white">Kerala Backwaters & Munnar</h2>
            <div className="flex items-center gap-3 mt-3 text-xs text-slate-300">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-orange-400" /> 5 Days</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 text-[10px] font-medium">
                Low Crowd Forecast
              </span>
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Threat Monitoring Status</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Normal
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 inset-x-0 bg-slate-950 border-t border-slate-800 py-3 px-6 flex justify-around text-slate-400 text-[10px] font-medium max-w-md mx-auto">
        <button className="flex flex-col items-center gap-1 text-orange-400">
          <Compass className="w-5 h-5" />
          <span>Discover</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <Calendar className="w-5 h-5" />
          <span>AI Planner</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <AlertTriangle className="w-5 h-5" />
          <span>Safety Hub</span>
        </button>
      </div>

      {/* Interactive Modal System */}
      <AuthModal
        isOpen={showAuthModal}
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          setShowAuthModal(false);
        }}
      />
    </div>
  );
};
