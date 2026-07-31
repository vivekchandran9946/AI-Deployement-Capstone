import React from 'react';
import { Cpu, BarChart3, Layers, CheckCircle2 } from 'lucide-react';

export const AboutModel: React.FC = () => {
  const metrics = [
    { label: 'Model Accuracy', value: '84.7%', desc: 'Overall classification accuracy' },
    { label: 'Precision Rate', value: '82.1%', desc: 'Correct positive churn predictions' },
    { label: 'Recall (Sensitivity)', value: '79.4%', desc: 'Actual churners correctly identified' },
    { label: 'ROC-AUC Score', value: '0.882', desc: 'Discriminative power curve area' },
  ];

  const featureImportances = [
    { name: 'Contract Type (Month-to-month vs 2-Yr)', weight: 28, color: 'bg-blue-600' },
    { name: 'Tenure (Length of Customer Relationship)', weight: 22, color: 'bg-indigo-600' },
    { name: 'Monthly Charges ($ Amount)', weight: 18, color: 'bg-sky-600' },
    { name: 'Internet Service (Fiber Optic vs DSL)', weight: 12, color: 'bg-teal-600' },
    { name: 'Tech Support & Online Security Add-ons', weight: 11, color: 'bg-emerald-600' },
    { name: 'Payment Method (Electronic Check)', weight: 9, color: 'bg-amber-600' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 text-white rounded-3xl p-8 border border-blue-500/30 shadow-xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-blue-500/20 text-cyan-300 border border-blue-400/30">
            <Cpu className="w-8 h-8 animate-pulse text-blue-400" />
          </div>
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30 uppercase tracking-wider">
              Architecture & Performance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              ConnectTel AI Random Forest Engine
            </h2>
          </div>
        </div>
        <p className="text-slate-200 text-sm max-w-3xl leading-relaxed">
          The ConnectTel Customer Churn Model utilizes an ensemble Random Forest classifier trained on 7,043 customer accounts across 19 behavioral, financial, and service parameters. It produces highly calibrated probability scores for proactive customer retention.
        </p>
      </div>

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="app-card rounded-3xl p-6 shadow-sm space-y-2 bg-white border border-slate-200"
          >
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              {m.label}
            </span>
            <div className="text-3xl font-black text-slate-900">
              {m.value}
            </div>
            <p className="text-xs text-slate-500 font-bold">
              {m.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Feature Importance & Confusion Matrix Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Feature Importance Chart */}
        <div className="app-card rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 bg-white border border-slate-200">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900">
                Top Model Feature Importances
              </h3>
              <p className="text-xs text-slate-500 font-bold">
                Key variables influencing churn probability
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {featureImportances.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-black text-slate-800">
                  <span>{item.name}</span>
                  <span className="text-blue-700">{item.weight}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className={`${item.color} h-full rounded-full transition-all duration-1000`}
                    style={{ width: `${item.weight * 3}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline & Technical Specifications */}
        <div className="app-card rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 bg-white border border-slate-200">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-900">
                Prediction Pipeline Architecture
              </h3>
              <p className="text-xs text-slate-500 font-bold">
                End-to-end data transformation & inference flow
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-black text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                1. Feature Encoding & Normalization
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                Categorical features (Gender, InternetService, Contract) are One-Hot Encoded. Tenure and MonthlyCharges are StandardScaled before inference.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-black text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                2. Random Forest Decision Ensemble
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                100 decision trees vote on the final binary class while outputting class probabilities (`probability_stay`, `probability_churn`).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 font-black text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                3. FastAPI REST Endpoint
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">
                Exposed via asynchronous Python FastAPI server at <code className="bg-blue-100 px-2 py-0.5 rounded text-blue-800 font-mono font-bold border border-blue-200">POST http://127.0.0.1:8000/predict</code> with JSON response contract.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
