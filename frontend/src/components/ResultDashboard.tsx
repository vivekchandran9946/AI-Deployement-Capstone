import React from 'react';
import { CustomerFormData, PredictionResponse, RiskInfo } from '../types/churn';
import { DoughnutChart } from './DoughnutChart';
import { GaugeChart } from './GaugeChart';
import { 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  ShieldAlert, 
  ShieldCheck, 
  Lightbulb, 
  Download, 
  Table, 
  FileText
} from 'lucide-react';

interface ResultDashboardProps {
  predictionData: PredictionResponse;
  customerData: CustomerFormData;
  onDownloadReport: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({
  predictionData,
  customerData,
  onDownloadReport,
}) => {
  const { prediction, prediction_code, probability_stay, probability_churn, recommendation } = predictionData;

  // Determine Risk Level according to rules:
  // 0-30% Green LOW RISK, 31-70% Orange MEDIUM RISK, 71-100% Red HIGH RISK
  const getRiskInfo = (probChurn: number): RiskInfo => {
    if (probChurn > 70) {
      return {
        level: 'HIGH RISK',
        color: 'text-rose-700',
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-200',
        badgeBg: 'bg-rose-600 text-white',
        textColor: 'text-rose-800',
      };
    } else if (probChurn > 30) {
      return {
        level: 'MEDIUM RISK',
        color: 'text-amber-700',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        badgeBg: 'bg-amber-500 text-white',
        textColor: 'text-amber-800',
      };
    } else {
      return {
        level: 'LOW RISK',
        color: 'text-emerald-700',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        badgeBg: 'bg-emerald-600 text-white',
        textColor: 'text-emerald-800',
      };
    }
  };

  const riskInfo = getRiskInfo(probability_churn);
  const isStay = prediction_code === 0;

  return (
    <div id="results-section" className="space-y-8 animate-fade-in scroll-mt-24">
      
      {/* ---------------------------------------------------- */}
      {/* 1. LARGE PREDICTION CARD                             */}
      {/* ---------------------------------------------------- */}
      <div
        className={`rounded-3xl p-7 sm:p-9 border-2 shadow-2xl transition-all duration-500 ${
          isStay
            ? 'bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 border-emerald-400/50 text-white shadow-emerald-500/20'
            : 'bg-gradient-to-r from-rose-600 via-red-700 to-slate-900 border-rose-400/50 text-white shadow-rose-500/20'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div
              className={`p-4 rounded-2xl ${
                isStay ? 'bg-white/20 text-emerald-100 border border-white/30' : 'bg-white/20 text-rose-100 border border-white/30'
              }`}
            >
              {isStay ? (
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              ) : (
                <AlertTriangle className="w-10 h-10 animate-pulse" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black uppercase tracking-widest text-slate-200">
                  AI Model Output
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    isStay ? 'bg-emerald-300 text-slate-950' : 'bg-rose-300 text-slate-950'
                  }`}
                >
                  Code: {prediction_code}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                {prediction}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">
                {isStay
                  ? 'Customer retention indicators are strong. Low probability of account cancellation.'
                  : 'High likelihood of customer churn detected. Proactive retention measures advised.'}
              </p>
            </div>
          </div>

          <button
            onClick={onDownloadReport}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 shrink-0"
          >
            <Download className="w-4 h-4 text-blue-600" />
            Download Prediction Report
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 2. KPI CARDS                                         */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI 1: Stay Probability */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg shadow-slate-200/50 space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs font-extrabold uppercase tracking-wider">
            <span>Stay Probability</span>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-slate-900">
              {probability_stay}%
            </span>
            <span className="text-xs font-bold text-emerald-700">
              Retention Rate
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${probability_stay}%` }}
            ></div>
          </div>
        </div>

        {/* KPI 2: Churn Probability */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-lg shadow-slate-200/50 space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs font-extrabold uppercase tracking-wider">
            <span>Churn Probability</span>
            <ShieldAlert className="w-5 h-5 text-rose-600" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-slate-900">
              {probability_churn}%
            </span>
            <span className="text-xs font-bold text-rose-700">
              Attrition Risk
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-rose-500 h-full rounded-full transition-all duration-1000"
              style={{ width: `${probability_churn}%` }}
            ></div>
          </div>
        </div>

        {/* KPI 3: Risk Level */}
        <div className={`rounded-3xl p-6 border ${riskInfo.borderColor} ${riskInfo.bgColor} shadow-lg shadow-slate-200/40 space-y-3`}>
          <div className="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider text-slate-600">
            <span>Calculated Risk Level</span>
            <TrendingUp className={`w-5 h-5 ${riskInfo.color}`} />
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-2xl sm:text-3xl font-black ${riskInfo.color}`}>
              {riskInfo.level}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${riskInfo.badgeBg}`}>
              {probability_churn}% Churn
            </span>
          </div>
          <p className="text-xs text-slate-600 font-bold pt-1">
            Rules: 0-30% Low (Green), 31-70% Med (Orange), 71-100% High (Red)
          </p>
        </div>

      </div>

      {/* ---------------------------------------------------- */}
      {/* 3. VISUALIZATIONS                                    */}
      {/* ---------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoughnutChart
          probabilityStay={probability_stay}
          probabilityChurn={probability_churn}
        />
        <GaugeChart churnProbability={probability_churn} />
      </div>

      {/* ---------------------------------------------------- */}
      {/* 4. AI RECOMMENDATION CARD                            */}
      {/* ---------------------------------------------------- */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-7 sm:p-8 border border-blue-500/30 shadow-xl space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-blue-500/20 text-cyan-300 border border-blue-400/30">
            <Lightbulb className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold">ConnectTel AI Strategic Recommendation</h3>
            <p className="text-xs text-slate-300">Automated retention action plan</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
          <p className="text-base font-bold text-cyan-200 leading-relaxed">
            "{recommendation}"
          </p>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 5. CUSTOMER SUMMARY TABLE                            */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
              <Table className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">
                Customer Information Summary
              </h3>
              <p className="text-xs text-slate-500">
                19 features evaluated during AI model inference
              </p>
            </div>
          </div>
          <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {customerData.Contract} • {customerData.tenure} Months Tenure
          </span>
        </div>

        {/* Responsive Summary Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase font-black text-[10px] tracking-wider bg-slate-50">
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Parameter Name</th>
                <th className="py-3 px-4">Submitted Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
              
              {/* Demographics */}
              <tr>
                <td className="py-2.5 px-4 font-bold text-blue-600" rowSpan={4}>
                  Demographics
                </td>
                <td className="py-2.5 px-4">Gender</td>
                <td className="py-2.5 px-4">{customerData.gender}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Senior Citizen</td>
                <td className="py-2.5 px-4">{customerData.SeniorCitizen === 1 ? 'Yes (Senior)' : 'No'}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Partner</td>
                <td className="py-2.5 px-4">{customerData.Partner}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Dependents</td>
                <td className="py-2.5 px-4">{customerData.Dependents}</td>
              </tr>

              {/* Services */}
              <tr className="bg-slate-50/60">
                <td className="py-2.5 px-4 font-bold text-indigo-600" rowSpan={9}>
                  Subscribed Services
                </td>
                <td className="py-2.5 px-4">Phone Service</td>
                <td className="py-2.5 px-4">{customerData.PhoneService}</td>
              </tr>
              <tr className="bg-slate-50/60">
                <td className="py-2.5 px-4">Multiple Lines</td>
                <td className="py-2.5 px-4">{customerData.MultipleLines}</td>
              </tr>
              <tr className="bg-slate-50/60">
                <td className="py-2.5 px-4">Internet Service</td>
                <td className="py-2.5 px-4 font-extrabold text-slate-900">{customerData.InternetService}</td>
              </tr>
              <tr className="bg-slate-50/60">
                <td className="py-2.5 px-4">Online Security</td>
                <td className="py-2.5 px-4">{customerData.OnlineSecurity}</td>
              </tr>
              <tr className="bg-slate-50/60">
                <td className="py-2.5 px-4">Online Backup</td>
                <td className="py-2.5 px-4">{customerData.OnlineBackup}</td>
              </tr>
              <tr className="bg-slate-50/60">
                <td className="py-2.5 px-4">Device Protection</td>
                <td className="py-2.5 px-4">{customerData.DeviceProtection}</td>
              </tr>
              <tr className="bg-slate-50/60">
                <td className="py-2.5 px-4">Tech Support</td>
                <td className="py-2.5 px-4">{customerData.TechSupport}</td>
              </tr>
              <tr className="bg-slate-50/60">
                <td className="py-2.5 px-4">Streaming TV</td>
                <td className="py-2.5 px-4">{customerData.StreamingTV}</td>
              </tr>
              <tr className="bg-slate-50/60">
                <td className="py-2.5 px-4">Streaming Movies</td>
                <td className="py-2.5 px-4">{customerData.StreamingMovies}</td>
              </tr>

              {/* Account & Billing */}
              <tr>
                <td className="py-2.5 px-4 font-bold text-emerald-600" rowSpan={6}>
                  Billing & Financials
                </td>
                <td className="py-2.5 px-4">Tenure</td>
                <td className="py-2.5 px-4 font-bold">{customerData.tenure} Months</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Contract</td>
                <td className="py-2.5 px-4 font-extrabold text-blue-600">{customerData.Contract}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Paperless Billing</td>
                <td className="py-2.5 px-4">{customerData.PaperlessBilling}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Payment Method</td>
                <td className="py-2.5 px-4">{customerData.PaymentMethod}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Monthly Charges</td>
                <td className="py-2.5 px-4 font-bold">${customerData.MonthlyCharges.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4">Total Charges</td>
                <td className="py-2.5 px-4 font-bold">${customerData.TotalCharges.toFixed(2)}</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
