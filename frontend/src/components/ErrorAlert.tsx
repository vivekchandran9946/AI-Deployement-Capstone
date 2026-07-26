import React from 'react';
import { WifiOff, RefreshCw, Cpu, AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  onRetry: () => void;
  onEnableDemoMode: () => void;
  isRetrying: boolean;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  onRetry,
  onEnableDemoMode,
  isRetrying,
}) => {
  return (
    <div className="bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-200 dark:border-rose-800 rounded-3xl p-6 sm:p-8 shadow-xl animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
        <div className="p-4 rounded-2xl bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 shrink-0">
          <WifiOff className="w-8 h-8 animate-bounce" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200">
              Connection Failed
            </span>
            <span className="text-xs text-slate-500 font-mono">http://127.0.0.1:8000/predict</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-rose-900 dark:text-rose-100">
            Unable to connect to AI Prediction Server.
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            The FastAPI backend server is currently unreachable. Please ensure your local server is running on port 8000 or switch to Demo Mode.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-rose-200/80 dark:border-rose-900/60">
        <button
          onClick={onRetry}
          disabled={isRetrying}
          className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer transition disabled:opacity-60"
        >
          <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
          {isRetrying ? 'Attempting Connection...' : 'Retry Connection'}
        </button>

        <button
          onClick={onEnableDemoMode}
          className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-cyan-300 font-bold text-xs sm:text-sm border border-slate-700 shadow-md flex items-center gap-2 cursor-pointer transition"
        >
          <Cpu className="w-4 h-4 text-amber-400" />
          Enable Demo / Mock AI Engine
        </button>
      </div>
    </div>
  );
};
