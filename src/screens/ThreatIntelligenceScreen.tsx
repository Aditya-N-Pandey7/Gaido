import React from 'react';
import { AlertTriangle, Radio, MapPin, ShieldAlert } from 'lucide-react';

export const ThreatIntelligenceScreen: React.FC = () => {
  return (
    <div className="pb-24 pt-4 px-4 w-full space-y-4 bg-background min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-textDark flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-warning" /> Threat Intelligence
          </h1>
          <p className="text-xs text-textGray">Real-time safety advisories & crowd alerts</p>
        </div>
        <span className="bg-red-100 text-warning text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
          <Radio className="w-3 h-3" /> Live
        </span>
      </div>

      <div className="relative h-52 bg-slate-200 rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600"
          alt="Map Layer"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-warning/30 rounded-full animate-ping" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-warning text-white font-bold text-[10px] px-2.5 py-1 rounded-md shadow-lg flex items-center gap-1">
          <MapPin className="w-3 h-3" /> Jaipur Region Active
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-2">
        <span className="text-[10px] font-bold text-textGray tracking-wider">GAIDO TELEMETRY ALERTS</span>
        <h3 className="text-base font-bold text-textDark">Jaipur, Rajasthan</h3>
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-2 text-xs text-amber-950">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p>Elevated festival crowd density near City Palace & Johari Bazaar. Consider alternative pedestrian routes.</p>
        </div>
      </div>
    </div>
  );
};
