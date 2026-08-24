import React, { useState } from 'react';
import { Shield, Eye, EyeOff, User, Mail, Lock, Key, ArrowRight, Info } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onLoginSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onLoginSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [encryptionKey, setEncryptionKey] = useState('');

  if (!isOpen) return null;

  const handleGenerateKey = () => {
    const randomKey = 'GDO-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setEncryptionKey(randomKey);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-sm my-6 bg-slate-100 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 transition-all">
        
        {/* Header Logo */}
        <div className="pt-6 pb-2 px-6 text-center bg-gradient-to-b from-slate-200/50 to-transparent">
          <div className="inline-flex items-center justify-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold shadow-sm">
              <Shield className="w-4 h-4 fill-white text-orange-500" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-indigo-950">Gaido</span>
          </div>
          {mode === 'signin' && (
            <p className="text-xs text-slate-500 font-medium mt-0.5">Intelligence through Privacy.</p>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 pt-2">
          {mode === 'signin' ? (
            /* ================= IMAGE 1: LOGIN PAGE ================= */
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-slate-900 mb-5">Welcome to Gaido</h2>

              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm"
                />
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm"
                />
              </div>

              <div className="flex items-center justify-between text-xs px-1 text-slate-500">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" className="rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                  Remember me
                </label>
                <button type="button" className="text-indigo-900 font-bold hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="button"
                onClick={onLoginSuccess}
                className="w-full mt-2 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 active:scale-[0.99] transition"
              >
                <span>EXPLORE NOW</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-slate-100 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  OR CONTINUE WITH
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-bold text-slate-800 text-sm shadow-sm transition">
                  G
                </button>
                <button type="button" className="flex items-center justify-center py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 font-bold text-slate-800 text-sm shadow-sm transition">
                  <span className="font-serif font-black">f</span>
                </button>
              </div>

              <p className="text-center text-xs text-slate-500 pt-3">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="font-bold text-indigo-900 hover:underline"
                >
                  Sign up securely
                </button>
              </p>
            </div>
          ) : (
            /* ================= IMAGE 2: REGISTER PAGE ================= */
            <div className="space-y-3.5">
              <div className="text-center mb-3">
                <h2 className="text-xl font-bold text-indigo-950">Join Gaido</h2>
                <p className="text-xs text-slate-500 mt-0.5">Create your privacy-first travel profile.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                
                {/* Strength Bar */}
                <div className="flex items-center gap-1.5 mt-2">
                  <div className="h-1 w-1/4 bg-emerald-500 rounded-full" />
                  <div className="h-1 w-1/4 bg-slate-200 rounded-full" />
                  <div className="h-1 w-1/4 bg-slate-200 rounded-full" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase ml-auto">WEAK</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">Encryption Key</label>
                  <Info className="w-3.5 h-3.5 text-indigo-900 cursor-pointer" />
                </div>
                <div className="relative flex items-center">
                  <Key className="absolute left-3.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    readOnly
                    value={encryptionKey}
                    placeholder="Generate automatic key"
                    className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-24 text-xs font-mono text-slate-700 placeholder-slate-400"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateKey}
                    className="absolute right-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 text-[10px] font-bold uppercase rounded-lg transition"
                  >
                    GENERATE
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={onLoginSuccess}
                className="w-full mt-2 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 active:scale-[0.99] transition"
              >
                <span>CREATE SECURE ACCOUNT</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <div className="relative my-2.5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-slate-100 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  OR SIGN UP WITH
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button type="button" className="flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50">
                  <span className="text-red-500 font-bold">G</span> Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50">
                  <span></span> Apple
                </button>
              </div>

              {/* Privacy Badge Card */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-2.5 text-left">
                <Shield className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
                <div className="text-[11px]">
                  <p className="font-bold text-orange-700">Privacy Verified by Gaido</p>
                  <p className="text-amber-900/70 leading-tight">Government-grade telemetry encryption. Zero track logging.</p>
                </div>
              </div>

              <p className="text-center text-xs text-slate-500 pt-1">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="font-bold text-indigo-900 hover:underline"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}

          {/* Footer Legal Section */}
          <div className="mt-5 pt-3 border-t border-slate-200 text-center space-y-1.5 text-[10px] text-slate-400">
            <div className="flex justify-center gap-3 font-medium text-slate-500">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">Terms of Service</a>
              <a href="#" className="hover:underline">Security Whitepaper</a>
            </div>
            <p className="text-[9px] uppercase tracking-wider font-semibold text-amber-900/60">
              © 2026 GAIDO PRIVACY FIRST TRAVEL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
