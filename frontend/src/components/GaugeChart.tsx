import React from 'react';

interface GaugeChartProps {
  churnProbability: number;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ churnProbability }) => {
  const value = Math.max(0, Math.min(100, churnProbability));
  const needleAngle = -90 + (value / 100) * 180;

  let riskBadgeBg = 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800';
  let riskText = 'LOW RISK';

  if (value > 70) {
    riskBadgeBg = 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800';
    riskText = 'HIGH RISK';
  } else if (value > 30) {
    riskBadgeBg = 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800';
    riskText = 'MEDIUM RISK';
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-md">
      <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
        Churn Risk Gauge (0 - 100%)
      </h4>

      <div className="relative w-56 h-32 flex justify-center items-end overflow-hidden pt-2">
        <svg className="w-full h-full" viewBox="0 0 200 110">
          
          {/* Green Zone: 0% to 30% */}
          <path
            d="M 20,100 A 80,80 0 0,1 52.96,35.28"
            fill="none"
            stroke="#10b981"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Orange Zone: 30% to 70% */}
          <path
            d="M 52.96,35.28 A 80,80 0 0,1 147.04,35.28"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="18"
          />

          {/* Red Zone: 70% to 100% */}
          <path
            d="M 147.04,35.28 A 80,80 0 0,1 180,100"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="18"
            strokeLinecap="round"
          />

          <circle cx="100" cy="100" r="10" className="fill-slate-900 dark:fill-white" />
          <circle cx="100" cy="100" r="5" className="fill-slate-400 dark:fill-slate-600" />
        </svg>

        {/* Animated Needle */}
        <div
          className="absolute bottom-2 left-1/2 w-1.5 h-20 bg-slate-900 dark:bg-white rounded-full origin-bottom transform -translate-x-1/2 transition-transform duration-1000 ease-out shadow-lg"
          style={{ transform: `translateX(-50%) rotate(${needleAngle}deg)` }}
        >
          <div className="w-3.5 h-3.5 bg-rose-600 rounded-full -mt-1 -ml-1"></div>
        </div>
      </div>

      {/* Numerical Value & Risk Badge */}
      <div className="mt-3 text-center">
        <div className="text-3xl font-black text-slate-900 dark:text-white">
          {value}% <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Churn Prob.</span>
        </div>
        <div className={`mt-1.5 inline-block px-3.5 py-1 rounded-full text-xs font-black tracking-wide uppercase ${riskBadgeBg}`}>
          {riskText}
        </div>
      </div>

      {/* Range Markers */}
      <div className="flex justify-between w-full text-[10px] font-black text-slate-600 dark:text-slate-400 mt-3 px-4 border-t border-slate-200 dark:border-slate-800 pt-2">
        <span className="text-emerald-700 dark:text-emerald-400">0-30% Low</span>
        <span className="text-amber-700 dark:text-amber-400">31-70% Med</span>
        <span className="text-rose-700 dark:text-rose-400">71-100% High</span>
      </div>
    </div>
  );
};

