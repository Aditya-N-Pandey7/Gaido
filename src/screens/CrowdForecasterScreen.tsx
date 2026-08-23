import React from 'react';
import { Lock, ArrowRight, BarChart2, ShieldCheck, MapPin } from 'lucide-react';

export const CrowdForecasterScreen: React.FC = () => {
  return (
    <div className="pb-24 pt-4 px-4 w-full space-y-5 bg-background min-h-screen">
      <div>
        <h1 className="text-xl font-bold text-textDark flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-primary" /> Crowd Density Forecaster
        </h1>
        <p className="text-xs text-textGray mt-0.5">
          Real-time intelligence for optimal travel pacing across India.
        </p>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex justify-between items-center text-xs">
          <div>
            <span className="font-bold text-textDark block">National Density Heatmap</span>
            <span className="text-[10px] text-textGray">Gaido Sensor data + predictive modeling</span>
          </div>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg text-[10px] font-semibold">
            <button className="px-2 py-1 rounded">1 Month</button>
            <button className="px-2 py-1 bg-primary text-white rounded shadow-xs">4 Months</button>
          </div>
        </div>

        <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2 border-b border-gray-100">
          {[
            { month: 'Sep', h: '35%', val: '35%', color: 'bg-primary' },
            { month: 'Oct', h: '60%', val: '60%', color: 'bg-accent' },
            { month: 'Nov', h: '92%', val: '92%', color: 'bg-warning' },
            { month: 'Dec', h: '75%', val: '75%', color: 'bg-accent' },
          ].map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
              <span className="text-[9px] font-bold text-textGray">{bar.val}</span>
              <div className={`w-full ${bar.color} rounded-t-lg transition-all duration-700 shadow-sm`} style={{ height: bar.h }} />
              <span className="text-[10px] text-textGray font-bold">{bar.month}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-around text-[10px] text-textGray pt-1 font-medium">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Low</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent" /> Moderate</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> Peak</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary via-indigo-900 to-slate-900 rounded-2xl p-4 text-white shadow-md space-y-3">
        <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
          <Lock className="w-3.5 h-3.5" /> GAIDO PREDICTIVE INSIGHT
        </div>
        <h3 className="font-bold text-sm">Best Time to Visit: Rajasthan</h3>
        <p className="text-xs text-indigo-100 leading-relaxed">
          Based on predictive modeling of the Pushkar Camel Fair and historical pricing data, late October offers a 40% reduction in crowd density while retaining key cultural events.
        </p>
        <button className="w-full bg-accent hover:bg-amber-600 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 transition shadow-md">
          VIEW OPTIMIZED ITINERARY <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-bold text-textDark">Key Destinations Telemetry</h2>

        {[
          { name: 'Varanasi', region: 'Uttar Pradesh', level: 'LOW', pct: 25, color: 'border-primary', tagBg: 'bg-primary/10 text-primary' },
          { name: 'Jaipur', region: 'Rajasthan', level: 'MODERATE', pct: 55, color: 'border-accent', tagBg: 'bg-amber-100 text-amber-800' },
          { name: 'Agra', region: 'Uttar Pradesh', level: 'PEAK', pct: 88, color: 'border-warning', tagBg: 'bg-red-100 text-red-800' },
        ].map((item, i) => (
          <div key={i} className={`bg-white p-3.5 rounded-xl shadow-sm border-l-4 ${item.color} border-y border-r border-gray-100 space-y-2`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-xs text-textDark flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-textGray" /> {item.name}
                </h3>
                <span className="text-[10px] text-textGray">{item.region}</span>
              </div>
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${item.tagBg}`}>
                {item.level}
              </span>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${item.color.replace('border-', 'bg-')}`}
                style={{ width: `${item.pct}%` }}
              />
            </div>

            <div className="flex justify-between items-center pt-1 text-[10px]">
              <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> PRIVACY VERIFIED
              </span>
              <button className="text-primary font-bold hover:underline">DETAILS &gt;</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
