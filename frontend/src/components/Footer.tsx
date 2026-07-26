import React from 'react';
import { Radio, Server, Cpu, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                <Radio className="w-4 h-4" />
              </div>
              <span className="text-lg font-black text-white">ConnectTel AI</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              Enterprise customer churn prediction platform powered by machine learning decision ensembles and FastAPI backend services.
            </p>
          </div>

          {/* Tech Stack Metadata */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Technology Stack
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-blue-400" /> Powered by FastAPI
              </li>
              <li className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Machine Learning
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Random Forest Classifier
              </li>
            </ul>
          </div>

          {/* System Spec */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              System Specification
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>Professional SaaS Dashboard</li>
              <li>Version 1.0 Enterprise</li>
              <li className="text-emerald-400 font-medium">REST Endpoint: /predict</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ConnectTel AI System. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-white transition">FastAPI REST</span>
            <span>•</span>
            <span className="hover:text-white transition">Machine Learning</span>
            <span>•</span>
            <span className="hover:text-white transition">Random Forest</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
