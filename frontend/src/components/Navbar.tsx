import React from 'react';
import { CustomerPreset } from '../types/churn';
import { PRESETS } from '../data/presets';
import { Radio, RefreshCw, Zap, Server, Cpu, Sun, Moon, Sparkles } from 'lucide-react';

interface NavbarProps {
  onSelectPreset: (preset: CustomerPreset) => void;
  isBackendOnline: boolean | null;
  useDemoMode: boolean;
  onToggleDemoMode: (val: boolean) => void;
  onCheckConnection: () => void;
  isCheckingConn: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSelectPreset,
  isBackendOnline,
  useDemoMode,
  onToggleDemoMode,
  onCheckConnection,
  isCheckingConn,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 shadow-lg shadow-blue-500/25 ring-4 ring-blue-50 dark:ring-slate-800">
            <Radio className="w-6 h-6 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                ConnectTel <span className="text-blue-600 dark:text-cyan-400 font-extrabold">AI</span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-800">
                <Sparkles className="w-3 h-3 text-blue-500 dark:text-cyan-400" /> Enterprise v1.0
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              AI Customer Retention & Attrition Intelligence Platform
            </p>
          </div>
        </div>

        {/* Controls & Theme Switcher */}
        <div className="flex items-center space-x-3">
          
          {/* Quick Presets Menu */}
          <div className="hidden lg:flex items-center space-x-2 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-xs text-slate-500 dark:text-slate-400 px-2 font-bold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Presets:
            </span>
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPreset(p)}
                className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-xs hover:text-blue-600 dark:hover:text-cyan-400 hover:shadow-md transition-all cursor-pointer border border-slate-200/60 dark:border-slate-600"
                title={p.description}
              >
                {p.badge}
              </button>
            ))}
          </div>

          {/* Backend Status Indicator */}
          <div className="flex items-center gap-2 bg-slate-100/90 dark:bg-slate-800/90 px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs shadow-xs">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              {useDemoMode ? (
                <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                  <Cpu className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> Demo Engine
                </span>
              ) : isBackendOnline === true ? (
                <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  FastAPI Connected
                </span>
              ) : isBackendOnline === false ? (
                <span className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-800">
                  <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                  Backend Offline
                </span>
              ) : (
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
                  <RefreshCw className="w-3 h-3 animate-spin text-blue-600 dark:text-cyan-400" /> Checking...
                </span>
              )}
            </div>

            <button
              onClick={onCheckConnection}
              disabled={isCheckingConn}
              className="p-1 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-700 transition cursor-pointer"
              title="Ping FastAPI Server (http://127.0.0.1:8000/predict)"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCheckingConn ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {/* Theme Toggle Button (Light <-> Dark Mode) */}
          <button
            onClick={onToggleDarkMode}
            className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-amber-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition shadow-xs flex items-center gap-2 cursor-pointer font-bold text-xs"
            title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span className="hidden sm:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600" />
                <span className="hidden sm:inline">Dark Mode</span>
              </>
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
