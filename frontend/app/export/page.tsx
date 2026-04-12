'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { 
  Globe, 
  ArrowRight, 
  Plus, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Map as MapIcon,
  ShieldCheck,
  FileText
} from 'lucide-react';

// Leaflet is problematic with SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const MARKET_DATA = [
  { id: 'US', name: 'USA', status: 'In Progress', readiness: 45, lat: 37.0902, lng: -95.7129, color: '#f59e0b' },
  { id: 'UK', name: 'United Kingdom', status: 'Ready', readiness: 92, lat: 55.3781, lng: -3.4360, color: '#10b981' },
  { id: 'EU', name: 'European Union', status: 'Not Started', readiness: 15, lat: 50.8503, lng: 4.3517, color: '#ef4444' },
];

const BRIDGE_STEPS = [
  { 
    id: 1, 
    title: 'India CDSCO Transfer', 
    desc: 'Mapping current Clinical Data to EU MDR Annex XIV', 
    time: '3-4 Weeks', 
    cost: '$0 (Internal)', 
    status: 'completed' 
  },
  { 
    id: 2, 
    title: 'ISO 13485:2016 Audit', 
    desc: 'Gap analysis for Medical Device QMS', 
    time: '2 Months', 
    cost: '$5,500', 
    status: 'in-progress' 
  },
  { 
    id: 3, 
    title: 'CE Marking Technical File', 
    desc: 'Preparation of technical dossier for EU Notified Body', 
    time: '4-6 Months', 
    cost: '$12,000', 
    status: 'pending' 
  },
];

export default function ExportIntelligence() {
  const [selectedMarket, setSelectedMarket] = useState(MARKET_DATA[0]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Global Bridge Intelligence</h1>
          <p className="text-slate-500 mt-1">Export Compliance Automation & Market Readiness Analysis</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <Plus size={18} />
            New Market Analysis
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-shadow shadow-sm">
            <Globe size={18} />
            Launch Export Pipeline
          </button>
        </div>
      </div>

      {/* Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm h-[600px] flex flex-col">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
            <div className="flex items-center gap-2">
              <MapIcon className="text-indigo-600" size={20} />
              <span className="font-semibold text-slate-800">Operational Market Map</span>
            </div>
            <div className="flex gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> Ready</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> In Progress</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div> Gap Detected</div>
            </div>
          </div>
          
          <div className="flex-1 relative bg-slate-100">
            {isClient ? (
              <MapContainer 
                center={[30, 0] as any} 
                zoom={2} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {MARKET_DATA.map(market => (
                  <Marker 
                    key={market.id} 
                    position={[market.lat, market.lng] as any}
                    eventHandlers={{
                      click: () => setSelectedMarket(market),
                    }}
                  >
                    <Popup>
                      <div className="p-1">
                        <p className="font-bold text-slate-900 m-0">{market.name}</p>
                        <p className="text-xs text-slate-500 m-0">Readiness: {market.readiness}%</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-slate-400">Loading Global Map...</p>
              </div>
            )}
          </div>
        </div>

        {/* Market Profile Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="text-indigo-600" size={20} />
              Market Intelligence: {selectedMarket.name}
            </h3>
          </div>

          <div className="p-6 space-y-8 flex-1 overflow-y-auto">
            {/* Readiness Score */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-500">Compliance Readiness</span>
                <span className={`text-sm font-bold ${selectedMarket.readiness > 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {selectedMarket.readiness}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${selectedMarket.readiness > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${selectedMarket.readiness}%` }}
                />
              </div>
            </div>

            {/* Bridge Path */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Bridge Roadmap</h4>
              <div className="space-y-4">
                {BRIDGE_STEPS.map((step, idx) => (
                  <div key={step.id} className="relative pl-8">
                    {idx !== BRIDGE_STEPS.length - 1 && (
                      <div className="absolute left-3 top-7 bottom-0 w-px bg-slate-100" />
                    )}
                    <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2 bg-white ${
                      step.status === 'completed' ? 'border-emerald-500 text-emerald-500' : 
                      step.status === 'in-progress' ? 'border-amber-500 text-amber-500 animate-pulse' : 
                      'border-slate-200 text-slate-400'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 size={12} /> : idx + 1}
                    </div>
                    <div className="space-y-1">
                      <p className={`text-sm font-semibold ${step.status === 'pending' ? 'text-slate-500' : 'text-slate-900'}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                      <div className="flex gap-4 pt-1">
                        <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                          <Clock size={10} /> {step.time}
                        </span>
                        <span className="text-[10px] font-medium text-slate-500 flex items-center gap-1">
                          <TrendingUp size={10} /> {step.cost}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col gap-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                    <FileText size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold">Generate Gap Report</p>
                    <p className="text-[10px] opacity-70">PDF Audit for {selectedMarket.name}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="-translate-x-1 group-hover:translate-x-0 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <AlertCircle className="text-rose-500" />, title: 'Market Gaps', value: '4', desc: 'Critical requirements missing for EU market.' },
          { icon: <Clock className="text-indigo-500" />, title: 'Expiring Soon', value: '2', desc: 'GST LUT & Spice Board renewals due in 12 days.' },
          { icon: <TrendingUp className="text-emerald-500" />, title: 'Export Readiness', value: 'Medium', desc: 'Ready for UK & USA low-risk product tiers.' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-50 rounded-lg">{stat.icon}</div>
              <ChevronRight className="text-slate-300" size={16} />
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.title}</p>
            <p className="text-2xl font-bold text-slate-900 my-1">{stat.value}</p>
            <p className="text-xs text-slate-400">{stat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
