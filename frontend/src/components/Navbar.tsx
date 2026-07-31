import React from 'react';
import { CustomerPreset } from '../types/churn';
import { PRESETS } from '../data/presets';
import { Radio, RefreshCw, Zap, Server, Cpu, Sparkles, Sun } from 'lucide-react';

interface NavbarProps {
  onSelectPreset: (preset: CustomerPreset) => void;
  isBackendOnline: boolean | null;
  useDemoMode: boolean;
  onToggleDemoMode: (val: boolean) => void;
  onCheckConnection: () => void;
  isCheckingConn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectPreset,
  isBackendOnline,
  useDemoMode,
  onCheckConnection,
  isCheckingConn,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 text-slate-900 transition-colors duration-300 shadow-xs">
      <div className="max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl shadow-md ring-2 bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 ring-blue-500/30 text-white">
            <Radio className="w-6 h-6 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase">
                ConnectTel <span className="text-blue-600">AI</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-50 text-blue-700 border border-blue-200">
                <Sparkles className="w-3 h-3 text-blue-600" /> RETENTION ENGINE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-bold hidden sm:block">
              AI Customer Retention & Attrition Intelligence Platform
            </p>
          </div>
        </div>

        {/* Controls & Active Theme Display */}
        <div className="flex items-center space-x-3">
          
          {/* Quick Presets Menu */}
          <div className="hidden xl:flex items-center space-x-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
            <span className="text-xs text-slate-500 px-2 font-bold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-blue-600" /> Presets:
            </span>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPreset(p)}
                className="px-3 py-1.5 text-xs font-black rounded-xl bg-white text-slate-700 shadow-xs hover:text-blue-600 hover:border-blue-300 transition-all cursor-pointer border border-slate-200"
                title={p.description}
              >
                {p.badge}
              </button>
            ))}
          </div>

          {/* Backend Status Indicator */}
          <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-2xl border border-slate-200 text-xs shadow-xs font-bold">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-slate-500" />
              {useDemoMode ? (
                <span className="flex items-center gap-1.5 text-amber-800 font-black bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  <Cpu className="w-3.5 h-3.5 text-amber-600" /> Demo Engine
                </span>
              ) : isBackendOnline === true ? (
                <span className="flex items-center gap-1.5 text-emerald-800 font-black bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  FastAPI Connected
                </span>
              ) : isBackendOnline === false ? (
                <span className="flex items-center gap-1.5 text-rose-800 font-black bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  Backend Offline
                </span>
              ) : (
                <span className="flex items-center gap-1 text-slate-500 font-bold">
                  <RefreshCw className="w-3 h-3 animate-spin text-blue-600" /> Checking...
                </span>
              )}
            </div>

            <button
              onClick={onCheckConnection}
              disabled={isCheckingConn}
              className="p-1 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-200 transition cursor-pointer"
              title="Ping FastAPI Server (http://127.0.0.1:8000/predict)"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCheckingConn ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Locked Theme Indicator Badge */}
          <div className="flex items-center px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-black text-slate-700 shadow-xs gap-2">
            <div className="p-1 rounded-lg bg-amber-100 text-amber-700">
              <Sun className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <span className="hidden sm:inline text-slate-700 font-extrabold text-xs">White Theme</span>
          </div>

        </div>
      </div>
    </header>
  );
};
