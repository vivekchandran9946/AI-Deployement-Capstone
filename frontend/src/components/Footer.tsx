import React from 'react';
import { Radio, Server, Cpu, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-[#05080e] theme-dark-blue:bg-[#040814] theme-light:bg-white text-slate-300 theme-light:text-slate-700 border-t border-white/10 theme-light:border-slate-200 text-xs shadow-2xl transition-colors duration-300">
      <div className="max-w-[1650px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 theme-dark-blue:from-blue-600 theme-dark-blue:to-cyan-500 theme-light:from-blue-600 theme-light:to-indigo-600 flex items-center justify-center text-white shadow-md glow-green theme-dark-blue:glow-blue">
                <Radio className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-white theme-light:text-slate-900 uppercase tracking-wider">ConnectTel AI <span className="text-emerald-400 theme-dark-blue:text-cyan-400 theme-light:text-blue-600 text-xs font-normal">RETENTION ENGINE</span></span>
            </div>
            <p className="text-slate-400 theme-light:text-slate-600 leading-relaxed max-w-md font-medium">
              Enterprise customer churn prediction platform powered by machine learning decision ensembles and FastAPI backend services.
            </p>
          </div>

          {/* Tech Stack Metadata */}
          <div>
            <h4 className="text-white theme-light:text-slate-900 font-black text-xs uppercase tracking-widest mb-3">
              Technology Stack
            </h4>
            <ul className="space-y-2 text-slate-300 theme-light:text-slate-700 font-bold">
              <li className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-emerald-400 theme-dark-blue:text-cyan-400 theme-light:text-blue-600" /> Powered by FastAPI
              </li>
              <li className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-400 theme-light:text-indigo-600" /> Machine Learning
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 theme-light:text-emerald-600" /> Random Forest Classifier
              </li>
            </ul>
          </div>

          {/* System Spec */}
          <div>
            <h4 className="text-white theme-light:text-slate-900 font-black text-xs uppercase tracking-widest mb-3">
              System Specification
            </h4>
            <ul className="space-y-2 text-slate-300 theme-light:text-slate-700 font-bold">
              <li>Multi-Theme SaaS Workspace</li>
              <li>Version 3.0 Enterprise</li>
              <li className="text-emerald-400 theme-dark-blue:text-cyan-400 theme-light:text-blue-600 font-black">REST Endpoint: /predict</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 theme-light:border-slate-200 flex flex-col sm:flex-row items-center justify-between text-slate-400 theme-light:text-slate-500 font-bold gap-4">
          <p>© {new Date().getFullYear()} ConnectTel AI System. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-xs">
            <span className="hover:text-emerald-400 theme-dark-blue:hover:text-cyan-400 theme-light:hover:text-blue-600 transition cursor-pointer">FastAPI REST</span>
            <span>•</span>
            <span className="hover:text-emerald-400 theme-dark-blue:hover:text-cyan-400 theme-light:hover:text-blue-600 transition cursor-pointer">Machine Learning</span>
            <span>•</span>
            <span className="hover:text-emerald-400 theme-dark-blue:hover:text-cyan-400 theme-light:hover:text-blue-600 transition cursor-pointer">Random Forest</span>
          </div>
        </div>

      </div>
    </footer>
  );
};




