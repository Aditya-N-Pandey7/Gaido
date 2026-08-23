import React from 'react';
import { Lock, FileText, Plane, Hotel, CheckCircle, Shield, AlertTriangle, Activity } from 'lucide-react';
import { LeftBorderCard } from '../components/common/LeftBorderCard';

export const SafetyHubScreen: React.FC = () => {
  return (
    <div className="pb-24 pt-4 px-4 w-full space-y-5 bg-background min-h-screen">
      <div>
        <h1 className="text-xl font-bold text-textDark flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" /> Safety & Security Hub
        </h1>
        <p className="text-xs text-textGray mt-0.5">
          Your centralized dashboard for travel protection and intelligence.
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center space-y-3 shadow-sm">
        <div className="w-16 h-16 bg-warning text-white rounded-full flex items-center justify-center font-extrabold text-lg mx-auto shadow-md ring-4 ring-red-100 animate-pulse">
          SOS
        </div>
        <div>
          <h3 className="font-bold text-xs text-red-950 uppercase tracking-wider">Emergency Response Active</h3>
          <p className="text-xs text-red-900 mt-1 px-2">
            Slide or tap to immediately alert local Indian emergency services and primary contacts.
          </p>
        </div>
      </div>

      <LeftBorderCard borderColor="border-accent">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-bold text-textDark">Active Policy</span>
          <span className="bg-amber-100 text-amber-800 font-extrabold text-[9px] px-2 py-0.5 rounded-full">ACTIVE</span>
        </div>
        <h3 className="font-bold text-sm text-textDark">Premium Coverage Plus</h3>
        <p className="text-xs text-textGray font-mono mt-0.5">Policy #IGP-9482-110A</p>
        <div className="mt-3 flex justify-between items-end border-t border-gray-100 pt-2">
          <div>
            <span className="text-[9px] text-textGray font-bold uppercase">VALID UNTIL</span>
            <p className="text-xs font-bold text-textDark">Oct 12, 2024</p>
          </div>
          <button className="text-xs font-bold text-primary hover:underline">VIEW DETAILS &gt;</button>
        </div>
      </LeftBorderCard>

      <div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-amber-600 border-y border-r border-gray-100 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xs text-textDark flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-amber-600" /> Health & Travel Clearance
          </h3>
          <span className="bg-gray-100 text-textGray text-[9px] font-bold px-2 py-0.5 rounded-full">PRE-TRAVEL</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-textGray">Required Vaccinations</span>
            <span className="bg-emerald-50 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded">CLEARED</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-textGray">Travel Prescriptions</span>
            <span className="bg-amber-50 text-amber-800 font-bold text-[10px] px-2 py-0.5 rounded">READY</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-textGray">Local Health Advisories</span>
            <span className="bg-amber-100 text-amber-900 font-bold text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> REVIEW
            </span>
          </div>
        </div>

        <button className="text-xs font-bold text-primary hover:underline block pt-1">
          ACCESS MEDICAL RECORDS &gt;
        </button>
      </div>

      <div className="bg-gradient-to-br from-primary via-indigo-900 to-black p-4 rounded-2xl text-white space-y-3 shadow-md">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-sm">Gaido Secure Vault</h3>
        </div>
        <p className="text-xs text-indigo-200 leading-relaxed">
          Your travel documents are AES-256 encrypted and accessible offline.
        </p>

        <div className="space-y-2">
          <button className="w-full border border-white/20 rounded-xl p-2.5 text-xs font-semibold flex items-center gap-2 hover:bg-white/5 transition">
            <FileText className="w-4 h-4 text-amber-300" /> PASSPORT SCAN
          </button>
          <button className="w-full border border-white/20 rounded-xl p-2.5 text-xs font-semibold flex items-center gap-2 hover:bg-white/5 transition">
            <Plane className="w-4 h-4 text-amber-300" /> FLIGHT ITINERARY
          </button>
          <button className="w-full border border-white/20 rounded-xl p-2.5 text-xs font-semibold flex items-center gap-2 hover:bg-white/5 transition">
            <Hotel className="w-4 h-4 text-amber-300" /> HOTEL CONFIRMATIONS
          </button>
        </div>

        <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[10px] text-indigo-300">
          <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-emerald-400" /> SYNCED & ENCRYPTED</span>
          <span>Last sync: 2m ago</span>
        </div>
      </div>
    </div>
  );
};
