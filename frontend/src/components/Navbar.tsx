import React from 'react';
import { CustomerPreset } from '../types/churn';
import { PRESETS } from '../data/presets';
import { Radio, RefreshCw, Zap, Server, Cpu, Sun, Moon, Sparkles } from 'lucide-react';

export type ThemeMode = 'cyber' | 'dark-blue';

interface NavbarProps {
  onSelectPreset: (preset: CustomerPreset) => void;
  isBackendOnline: boolean | null;
  useDemoMode: boolean;
  onToggleDemoMode: (val: boolean) => void;
  onCheckConnection: () => void;
  isCheckingConn: boolean;
  themeMode: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectPreset,
  isBackendOnline,
  useDemoMode,
  onToggleDemoMode,
  onCheckConnection,
  isCheckingConn,
  themeMode,
  onSelectTheme,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#06090e]/90 theme-dark-blue:bg-[#050a15]/90 backdrop-blur-2xl border-b border-white/10 text-white transition-colors duration-300 shadow-2xl">
      <div className="max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className={`relative flex items-center justify-center w-11 h-11 rounded-2xl shadow-lg ring-2 ${
            themeMode === 'cyber'
              ? 'bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 glow-green ring-emerald-500/40'
              : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 glow-blue ring-blue-500/40'
          }`}>
            <Radio className="w-6 h-6 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                themeMode === 'cyber' ? 'bg-emerald-400' : 'bg-cyan-400'
              } opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${
                themeMode === 'cyber' ? 'bg-emerald-400' : 'bg-cyan-400'
              }`}></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white uppercase">
                ConnectTel <span className={
                  themeMode === 'cyber'
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent'
                    : 'text-cyan-400'
                }>AI</span>
              </h1>
              <span className={`hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                themeMode === 'cyber'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-blue-500/10 text-cyan-400 border border-blue-500/30'
              }`}>
                <Sparkles className="w-3 h-3" /> {themeMode === 'cyber' ? 'CYBER ENGINE' : 'DARK BLUE ENGINE'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-bold hidden sm:block">
              AI Customer Retention & Attrition Intelligence Platform
            </p>
          </div>
        </div>

        {/* Controls & Theme Mode Selector */}
        <div className="flex items-center space-x-3">
          
          {/* Quick Presets Menu */}
          <div className="hidden xl:flex items-center space-x-2 bg-slate-900/90 p-1.5 rounded-2xl border border-white/10">
            <span className="text-xs text-slate-400 px-2 font-bold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400 theme-dark-blue:text-cyan-400" /> Presets:
            </span>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPreset(p)}
                className="px-3 py-1.5 text-xs font-black rounded-xl bg-slate-800 text-slate-200 shadow-xs hover:text-emerald-400 theme-dark-blue:hover:text-cyan-400 transition-all cursor-pointer border border-white/10"
                title={p.description}
              >
                {p.badge}
              </button>
            ))}
          </div>

          {/* Backend Status Indicator */}
          <div className="flex items-center gap-2 bg-slate-900/90 px-3.5 py-2 rounded-2xl border border-white/10 text-xs shadow-xs font-bold">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-slate-400" />
              {useDemoMode ? (
                <span className="flex items-center gap-1.5 text-amber-300 font-black bg-amber-950/80 px-2.5 py-0.5 rounded-md border border-amber-800">
                  <Cpu className="w-3.5 h-3.5 text-amber-400" /> Demo Engine
                </span>
              ) : isBackendOnline === true ? (
                <span className="flex items-center gap-1.5 text-emerald-300 font-black bg-emerald-950/80 px-2.5 py-0.5 rounded-md border border-emerald-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  FastAPI Connected
                </span>
              ) : isBackendOnline === false ? (
                <span className="flex items-center gap-1.5 text-rose-300 font-black bg-rose-950/80 px-2.5 py-0.5 rounded-md border border-rose-800">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  Backend Offline
                </span>
              ) : (
                <span className="flex items-center gap-1 text-slate-400 font-bold">
                  <RefreshCw className="w-3 h-3 animate-spin text-emerald-400" /> Checking...
                </span>
              )}
            </div>

            <button
              onClick={onCheckConnection}
              disabled={isCheckingConn}
              className="p-1 text-slate-400 hover:text-emerald-400 rounded-lg hover:bg-slate-800 transition cursor-pointer"
              title="Ping FastAPI Server (http://127.0.0.1:8000/predict)"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCheckingConn ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* THEME MODE SELECTOR PILL MENU */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-900/90 border border-white/10">
            
            {/* Cyber Green Option */}
            <button
              onClick={() => onSelectTheme('cyber')}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition flex items-center gap-1.5 cursor-pointer ${
                themeMode === 'cyber'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md glow-green'
                  : 'text-slate-400 hover:text-emerald-400'
              }`}
              title="Switch to Cyber Green Theme"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="hidden sm:inline">Cyber Green</span>
            </button>

            {/* Dark Blue Option */}
            <button
              onClick={() => onSelectTheme('dark-blue')}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition flex items-center gap-1.5 cursor-pointer ${
                themeMode === 'dark-blue'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md glow-blue'
                  : 'text-slate-400 hover:text-cyan-400'
              }`}
              title="Switch to Dark Theme (Blue & Black)"
            >
              <Moon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Dark Blue</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};





