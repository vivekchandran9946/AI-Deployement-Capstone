import React from 'react';
import { LayoutDashboard, UserCheck, Cpu, ShieldCheck, Database, ChevronRight } from 'lucide-react';

export type NavTab = 'dashboard' | 'predict' | 'about';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  predictionCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, predictionCount }) => {
  const navItems = [
    {
      id: 'predict' as NavTab,
      label: 'Predict Customer Churn',
      icon: UserCheck,
      desc: '19-Feature Inference Workspace',
      badge: predictionCount > 0 ? `${predictionCount} Evaluated` : undefined,
    },
    {
      id: 'dashboard' as NavTab,
      label: 'Executive Analytics',
      icon: LayoutDashboard,
      desc: 'System Benchmarks & Trends',
    },
    {
      id: 'about' as NavTab,
      label: 'Model Architecture',
      icon: Cpu,
      desc: 'Random Forest Specifications',
    },
  ];

  return (
    <aside className="w-full lg:w-80 app-card p-5 sm:p-6 flex flex-col justify-between shrink-0 transition-all duration-300 rounded-3xl lg:my-6">
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-black text-slate-400 theme-light:text-slate-500 uppercase tracking-widest px-3 mb-3">
            WORKSPACE NAVIGATION
          </p>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-500 theme-dark-blue:from-blue-600 theme-dark-blue:via-indigo-600 theme-dark-blue:to-cyan-500 theme-light:from-blue-600 theme-light:to-indigo-600 text-white shadow-xl glow-green theme-dark-blue:glow-blue'
                      : 'text-slate-300 theme-light:text-slate-700 hover:bg-slate-800/80 theme-light:hover:bg-slate-100 hover:text-emerald-400 theme-dark-blue:hover:text-cyan-400 theme-light:hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-slate-800 theme-light:bg-slate-200 text-slate-300 theme-light:text-slate-700'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-black leading-tight text-xs sm:text-sm">{item.label}</div>
                      <div className={`text-[11px] ${isActive ? 'text-white/90 font-semibold' : 'text-slate-400 theme-light:text-slate-500 font-semibold'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  {item.badge && (
                    <span className="px-2.5 py-0.5 text-[10px] font-black rounded-full bg-emerald-500/20 theme-dark-blue:bg-blue-500/20 theme-light:bg-blue-100 text-emerald-300 theme-dark-blue:text-cyan-300 theme-light:text-blue-800 border border-emerald-500/40 theme-dark-blue:border-blue-500/40 theme-light:border-blue-300">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4 text-white/90" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Model Spec Box */}
        <div className="p-5 rounded-3xl bg-slate-950 theme-dark-blue:bg-[#071126] theme-light:bg-slate-900 text-white border border-emerald-500/30 theme-dark-blue:border-blue-500/30 theme-light:border-slate-800 shadow-2xl space-y-3 glow-green theme-dark-blue:glow-blue">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-black text-emerald-400 theme-dark-blue:text-cyan-400">
              <ShieldCheck className="w-4 h-4" /> Random Forest
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              84.7% Accuracy
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-semibold">
            Calibrated machine learning decision ensemble trained on 7,043 Telco records.
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 border-t border-white/10 pt-3">
            <div>
              <span className="block text-slate-400 text-[10px] font-bold">Decision Trees</span>
              <span className="font-black text-white">100 Trees</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px] font-bold">Inference Time</span>
              <span className="font-black text-white">~12 ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* API Link */}
      <div className="pt-4 border-t border-white/10 theme-light:border-slate-200 text-xs text-slate-300 theme-light:text-slate-600 flex items-center justify-between font-bold mt-6">
        <span className="flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-emerald-400 theme-dark-blue:text-cyan-400 theme-light:text-blue-600" /> REST API Endpoint
        </span>
        <span className="text-[11px] font-mono font-black text-emerald-400 theme-dark-blue:text-cyan-400 theme-light:text-blue-700 bg-emerald-500/10 theme-dark-blue:bg-blue-500/10 theme-light:bg-blue-50 px-2.5 py-1 rounded-lg border border-emerald-500/30 theme-dark-blue:border-blue-500/30 theme-light:border-blue-200">
          /predict
        </span>
      </div>
    </aside>
  );
};




