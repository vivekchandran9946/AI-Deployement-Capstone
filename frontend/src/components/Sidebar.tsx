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
      id: 'dashboard' as NavTab,
      label: 'Executive Overview',
      icon: LayoutDashboard,
      desc: 'System Analytics & Trends',
    },
    {
      id: 'predict' as NavTab,
      label: 'Predict Customer Churn',
      icon: UserCheck,
      desc: '19-Feature Inference Workspace',
      badge: predictionCount > 0 ? `${predictionCount} Evaluated` : undefined,
    },
    {
      id: 'about' as NavTab,
      label: 'Model Intelligence',
      icon: Cpu,
      desc: 'Random Forest Architecture',
    },
  ];

  return (
    <aside className="w-full lg:w-72 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 flex flex-col justify-between shadow-xs shrink-0 transition-colors duration-300">
      <div className="space-y-6">
        <div>
          <p className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-3 mb-3">
            Navigation Workspace
          </p>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-medium text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-cyan-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold leading-tight text-xs sm:text-sm">{item.label}</div>
                      <div className={`text-[11px] font-normal ${isActive ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
                        {item.desc}
                      </div>
                    </div>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[10px] font-black rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-cyan-400 border border-blue-200 dark:border-blue-800">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4 text-blue-100" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Model Spec Box */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white border border-slate-700/80 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-black text-cyan-400">
              <ShieldCheck className="w-4 h-4" /> Random Forest
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              84.7% Accuracy
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            Calibrated machine learning decision ensemble trained on 7,043 Telco records.
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 border-t border-slate-700/80 pt-3">
            <div>
              <span className="block text-slate-400 text-[10px]">Decision Trees</span>
              <span className="font-bold text-white">100 Trees</span>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px]">Inference Time</span>
              <span className="font-bold text-white">~12 ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* API Link */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-medium">
          <Database className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> REST API Endpoint
        </span>
        <span className="text-[11px] font-mono font-bold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800">
          /predict
        </span>
      </div>
    </aside>
  );
};
