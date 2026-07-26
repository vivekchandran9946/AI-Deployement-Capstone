import React from 'react';
import { LayoutDashboard, UserCheck, Cpu, ShieldCheck, Database, FileText, ChevronRight } from 'lucide-react';

export type NavTab = 'dashboard' | 'predict' | 'about';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  predictionCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, predictionCount }) => {
  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      desc: 'Overview & Quick Stats',
    },
    {
      id: 'predict' as NavTab,
      label: 'Predict Customer',
      icon: UserCheck,
      desc: 'Inference Form & Results',
      badge: predictionCount > 0 ? `${predictionCount} Done` : undefined,
    },
    {
      id: 'about' as NavTab,
      label: 'About Model',
      icon: Cpu,
      desc: 'Random Forest Metrics',
    },
  ];

  return (
    <aside className="w-full lg:w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 sm:p-6 flex flex-col justify-between shadow-sm shrink-0">
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-3">
            Main Menu
          </p>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <div className="text-left">
                      <div className="font-semibold leading-tight">{item.label}</div>
                      <div className={`text-[11px] font-normal ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4 text-blue-200" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Model Spec Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-blue-950 text-white border border-slate-800 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
              <ShieldCheck className="w-4 h-4" /> Random Forest
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              84.7% Acc
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Trained on Telco retention dataset with 19 customer features.
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2">
            <div>
              <span className="block text-slate-500">Trees</span>
              <span className="font-semibold text-slate-200">100 Estimators</span>
            </div>
            <div>
              <span className="block text-slate-500">Latency</span>
              <span className="font-semibold text-slate-200">~12 ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Docs Link */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-slate-400" /> REST API Ready
        </span>
        <span className="text-[11px] font-mono text-blue-500 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
          /predict
        </span>
      </div>
    </aside>
  );
};
