import React, { useState } from 'react';
import { Shield, Eye, EyeOff, User, Mail, Lock, Key, ArrowRight, Info, X } from 'lucide-react';
import gaidoLogo from '../../../Gaido_logo.jpeg';

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState('');

  if (!isOpen) return null;

  const handleGenerateKey = () => {
    const randomKey = 'GDO-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setEncryptionKey(randomKey);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-md my-6 bg-[#0e1626]/90 border border-slate-800 rounded-3xl p-8 shadow-2xl relative space-y-6 text-slate-100 transition-all">
        
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header Logo */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center gap-2 mb-1">
            <img 
              src={gaidoLogo} 
              alt="Gaido Logo" 
              className="h-10 w-auto bg-white/95 rounded-lg px-2.5 py-0.5 shadow-sm" 
            />
          </div>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">
            {mode === 'signin' ? 'Sign In to Gaido' : 'Join Gaido'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="space-y-4">
          {mode === 'signin' ? (
            /* ================= SIGN IN VIEW ================= */
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-[#0b0d12] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#0b0d12] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] px-1 text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-800 bg-[#0b0d12] text-amber-500 focus:ring-amber-500" 
                  />
                  Remember me
                </label>
                <button type="button" className="text-amber-400 font-semibold hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="button"
                onClick={onLoginSuccess}
                className="w-full mt-2 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 rounded-xl transition shadow-[0_0_20px_rgba(251,191,36,0.2)] active:scale-[0.99]"
              >
                <span>EXPLORE NOW</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800/80" />
                </div>
                <span className="relative bg-[#0e1626] px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  OR CONTINUE WITH
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 bg-[#0b0d12] border border-slate-800 rounded-xl hover:border-slate-700 font-bold text-slate-200 text-xs shadow-sm transition">
                  <span className="text-red-500 font-bold">G</span> Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 bg-[#0b0d12] border border-slate-800 rounded-xl hover:border-slate-700 font-bold text-slate-200 text-xs shadow-sm transition">
                  <span></span> Apple
                </button>
              </div>

              <p className="text-center text-xs text-slate-400 pt-3">
                Don't have an account?
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-amber-400 font-bold hover:underline ml-1"
                >
                  Sign up securely
                </button>
              </p>
            </div>
          ) : (
            /* ================= SIGN UP VIEW ================= */
            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full bg-[#0b0d12] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full bg-[#0b0d12] border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full bg-[#0b0d12] border border-slate-800 rounded-xl py-2.5 pl-10 pr-10 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                
                {/* Strength Bar */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="h-1 w-1/4 bg-emerald-500 rounded-full" />
                  <div className="h-1 w-1/4 bg-slate-800 rounded-full" />
                  <div className="h-1 w-1/4 bg-slate-800 rounded-full" />
                  <span className="text-[9px] font-bold text-emerald-500 uppercase ml-auto font-mono">WEAK</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Encryption Key</label>
                  <Info className="w-3.5 h-3.5 text-slate-500 cursor-pointer hover:text-slate-300" />
                </div>
                <div className="relative flex items-center">
                  <Key className="absolute left-3.5 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    readOnly
                    value={encryptionKey}
                    placeholder="Generate secure key"
                    className="w-full bg-[#0b0d12] border border-slate-800 rounded-xl py-2.5 pl-10 pr-24 text-[11px] font-mono text-slate-300 placeholder-slate-600 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateKey}
                    className="absolute right-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-[10px] font-bold uppercase rounded-lg transition"
                  >
                    GENERATE
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={onLoginSuccess}
                className="w-full mt-2 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 rounded-xl transition shadow-[0_0_20px_rgba(251,191,36,0.2)] active:scale-[0.99]"
              >
                <span>CREATE SECURE ACCOUNT</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <div className="relative my-2.5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800/80" />
                </div>
                <span className="relative bg-[#0e1626] px-3 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  OR SIGN UP WITH
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 bg-[#0b0d12] border border-slate-800 rounded-xl hover:border-slate-700 font-bold text-slate-200 text-xs shadow-sm transition">
                  <span className="text-red-500 font-bold">G</span> Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-2.5 bg-[#0b0d12] border border-slate-800 rounded-xl hover:border-slate-700 font-bold text-slate-200 text-xs shadow-sm transition">
                  <span></span> Apple
                </button>
              </div>

              <p className="text-center text-xs text-slate-400 pt-1">
                Already have an account?
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-amber-400 font-bold hover:underline ml-1"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}

          {/* Privacy Badge Card */}
          <div className="p-3.5 bg-amber-500/5 border border-amber-500/10 rounded-xl flex items-start gap-2.5 text-left">
            <Shield className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <div className="text-[11px]">
              <p className="font-bold text-amber-400">Privacy Verified by Gaido</p>
              <p className="text-slate-400 leading-snug mt-0.5">Government-grade telemetry encryption. Zero track logging.</p>
            </div>
          </div>

          {/* Footer Legal Section */}
          <div className="mt-5 pt-3 border-t border-slate-800/80 text-center space-y-1.5 text-[10px] text-slate-500">
            <div className="flex justify-center gap-3 font-medium text-slate-400">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Security Whitepaper</a>
            </div>
            <p className="text-[9px] uppercase tracking-wider font-semibold text-amber-500/40">
              © 2026 GAIDO PRIVACY FIRST TRAVEL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
