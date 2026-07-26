import React from 'react';

interface GaugeChartProps {
  churnProbability: number;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ churnProbability }) => {
  // Clamp value 0-100
  const value = Math.max(0, Math.min(100, churnProbability));
  
  // Angle for semi-circle: 0% -> -90deg, 100% -> +90deg
  const needleAngle = -90 + (value / 100) * 180;

  // Determine Risk Category Color
  let riskColor = 'text-emerald-500';
  let riskBadgeBg = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
  let riskText = 'LOW RISK';

  if (value > 70) {
    riskColor = 'text-rose-500';
    riskBadgeBg = 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
    riskText = 'HIGH RISK';
  } else if (value > 30) {
    riskColor = 'text-amber-500';
    riskBadgeBg = 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
    riskText = 'MEDIUM RISK';
  }

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-md">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
        Churn Risk Gauge (0 - 100%)
      </h4>

      <div className="relative w-56 h-32 flex justify-center items-end overflow-hidden pt-2">
        {/* SVG Semi-Circle Gauge */}
        <svg className="w-full h-full" viewBox="0 0 200 110">
          
          {/* Green Zone: 0% to 30% (angles: 180 to 126 deg) */}
          <path
            d="M 20,100 A 80,80 0 0,1 52.96,35.28"
            fill="none"
            stroke="#10b981"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Orange Zone: 30% to 70% (angles: 126 to 54 deg) */}
          <path
            d="M 52.96,35.28 A 80,80 0 0,1 147.04,35.28"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="18"
          />

          {/* Red Zone: 70% to 100% (angles: 54 to 0 deg) */}
          <path
            d="M 147.04,35.28 A 80,80 0 0,1 180,100"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Center Pivot Point */}
          <circle cx="100" cy="100" r="10" className="fill-slate-800 dark:fill-white" />
          <circle cx="100" cy="100" r="5" className="fill-slate-400" />
        </svg>

        {/* Animated Needle */}
        <div
          className="absolute bottom-2 left-1/2 w-1.5 h-20 bg-slate-800 dark:bg-white rounded-full origin-bottom transform -translate-x-1/2 transition-transform duration-1000 ease-out shadow-lg"
          style={{ transform: `translateX(-50%) rotate(${needleAngle}deg)` }}
        >
          <div className="w-3 h-3 bg-red-500 rounded-full -mt-1 -ml-0.75"></div>
        </div>
      </div>

      {/* Numerical Value & Risk Badge */}
      <div className="mt-2 text-center">
        <div className="text-2xl font-black text-slate-800 dark:text-white">
          {value}% <span className="text-xs font-medium text-slate-400">Churn Prob.</span>
        </div>
        <div className={`mt-1 inline-block px-3 py-0.5 rounded-full text-xs font-extrabold tracking-wide uppercase ${riskBadgeBg}`}>
          {riskText}
        </div>
      </div>

      {/* Range Markers */}
      <div className="flex justify-between w-full text-[10px] font-bold text-slate-400 mt-2 px-4 border-t border-slate-100 dark:border-slate-700/80 pt-1.5">
        <span className="text-emerald-600">0-30% Low</span>
        <span className="text-amber-600">31-70% Med</span>
        <span className="text-rose-600">71-100% High</span>
      </div>
    </div>
  );
};
