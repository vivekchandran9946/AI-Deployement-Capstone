import React from 'react';

interface DoughnutChartProps {
  probabilityStay: number;
  probabilityChurn: number;
}

export const DoughnutChart: React.FC<DoughnutChartProps> = ({
  probabilityStay,
  probabilityChurn,
}) => {
  const radius = 65;
  const circumference = 2 * Math.PI * radius;
  
  const stayOffset = 0;
  const stayLength = (probabilityStay / 100) * circumference;
  const churnLength = (probabilityChurn / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-md">
      <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
        Stay vs Churn Distribution
      </h4>
      
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
          {/* Background Ring */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="text-slate-200 dark:text-slate-700 stroke-current"
            strokeWidth="18"
            fill="transparent"
          />

          {/* Stay Segment (Green) */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="text-emerald-500 stroke-current transition-all duration-1000 ease-out"
            strokeWidth="18"
            strokeDasharray={`${stayLength} ${circumference - stayLength}`}
            strokeDashoffset={stayOffset}
            strokeLinecap="round"
            fill="transparent"
          />

          {/* Churn Segment (Rose/Red) */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="text-rose-500 stroke-current transition-all duration-1000 ease-out"
            strokeWidth="18"
            strokeDasharray={`${churnLength} ${circumference - churnLength}`}
            strokeDashoffset={-stayLength}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-slate-900 dark:text-white">
            {probabilityStay}%
          </span>
          <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
            Retention Rate
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 w-full text-xs font-black text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
          Stay ({probabilityStay}%)
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500"></span>
          Churn ({probabilityChurn}%)
        </div>
      </div>
    </div>
  );
};

