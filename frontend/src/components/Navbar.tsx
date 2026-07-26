import React from 'react';
import { CustomerPreset } from '../types/churn';
import { PRESETS } from '../data/presets';
import { Radio, Activity, RefreshCw, Zap, Server, Cpu } from 'lucide-react';

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
  onToggleDemoMode,
  onCheckConnection,
  isCheckingConn,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25 ring-2 ring-blue-400/20">
            <Radio className="w-6 h-6 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-300"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400">
                ConnectTel <span className="text-cyan-400 font-semibold">AI</span>
              </h1>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                v1.0 Enterprise
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Customer Churn Prediction Dashboard
            </p>
          </div>
        </div>

        {/* Action Controls & Backend Status */}
        <div className="flex items-center space-x-3">
          
          {/* Preset Selector */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <span className="text-xs text-slate-400 px-2 font-medium flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Presets:
            </span>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPreset(p)}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg text-slate-200 hover:text-white hover:bg-slate-700/80 transition-all cursor-pointer"
                title={p.description}
              >
                {p.badge}
              </button>
            ))}
          </div>

          {/* Backend Status Indicator & Demo Switch */}
          <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-slate-400" />
              {useDemoMode ? (
                <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                  <Cpu className="w-3.5 h-3.5" /> Demo AI Engine
                </span>
              ) : isBackendOnline === true ? (
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  FastAPI Connected
                </span>
              ) : isBackendOnline === false ? (
                <span className="flex items-center gap-1.5 text-rose-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  Backend Offline
                </span>
              ) : (
                <span className="flex items-center gap-1 text-slate-400">
                  <RefreshCw className="w-3 h-3 animate-spin" /> Checking...
                </span>
              )}
            </div>

            <button
              onClick={onCheckConnection}
              disabled={isCheckingConn}
              className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700 transition"
              title="Ping Backend API (http://127.0.0.1:8000/predict)"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCheckingConn ? 'animate-spin' : ''}`} />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
