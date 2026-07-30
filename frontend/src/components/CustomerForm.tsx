import React from 'react';
import { CustomerFormData, CustomerPreset } from '../types/churn';
import { PRESETS } from '../data/presets';
import { 
  User, 
  Wifi, 
  CreditCard, 
  Sparkles, 
  RotateCcw, 
  Calendar,
  Zap,
  Shield,
  Smartphone,
  Tv,
  Film,
  Lock,
  Headphones,
  HardDrive
} from 'lucide-react';

interface CustomerFormProps {
  formData: CustomerFormData;
  onChange: (updated: CustomerFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  onSelectPreset: (preset: CustomerPreset) => void;
  isLoading: boolean;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  formData,
  onChange,
  onSubmit,
  onReset,
  onSelectPreset,
  isLoading,
}) => {

  const handleFieldChange = (field: keyof CustomerFormData, value: any) => {
    let updated = { ...formData, [field]: value };

    // Auto update dependent services if Phone Service is disabled
    if (field === 'PhoneService' && value === 'No') {
      updated.MultipleLines = 'No phone service';
    } else if (field === 'PhoneService' && value === 'Yes' && updated.MultipleLines === 'No phone service') {
      updated.MultipleLines = 'No';
    }

    // Auto update dependent services if Internet Service is 'No'
    if (field === 'InternetService' && value === 'No') {
      updated.OnlineSecurity = 'No internet service';
      updated.OnlineBackup = 'No internet service';
      updated.DeviceProtection = 'No internet service';
      updated.TechSupport = 'No internet service';
      updated.StreamingTV = 'No internet service';
      updated.StreamingMovies = 'No internet service';
    } else if (field === 'InternetService' && value !== 'No') {
      const internetFields: (keyof CustomerFormData)[] = [
        'OnlineSecurity',
        'OnlineBackup',
        'DeviceProtection',
        'TechSupport',
        'StreamingTV',
        'StreamingMovies',
      ];
      internetFields.forEach((f) => {
        if (updated[f] === 'No internet service') {
          (updated as any)[f] = 'No';
        }
      });
    }

    // Recalculate Total Charges suggestion if tenure or monthly charges change
    if (field === 'tenure' || field === 'MonthlyCharges') {
      const computed = Number((updated.tenure * updated.MonthlyCharges).toFixed(2));
      if (computed > 0) {
        updated.TotalCharges = computed;
      }
    }

    onChange(updated);
  };

  const autoComputeTotalCharges = () => {
    const computed = Number((formData.tenure * formData.MonthlyCharges).toFixed(2));
    handleFieldChange('TotalCharges', computed);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8 animate-fade-in w-full">
      
      {/* Quick Presets Bar */}
      <div className="p-[1.5px] rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-500 theme-dark-blue:from-blue-600 theme-dark-blue:via-indigo-600 theme-dark-blue:to-cyan-400 theme-light:from-blue-600 theme-light:to-cyan-600 shadow-xl glow-green theme-dark-blue:glow-blue">
        <div className="bg-[#0b111a]/95 theme-dark-blue:bg-[#0a1224]/95 theme-light:bg-white backdrop-blur-xl p-4 sm:p-5 rounded-[23px] flex flex-wrap items-center justify-between gap-3 border border-white/10 theme-light:border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 theme-dark-blue:from-blue-600 theme-dark-blue:to-indigo-600 theme-light:from-blue-600 theme-light:to-indigo-600 text-white shadow-md glow-green theme-dark-blue:glow-blue">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <span className="text-xs sm:text-sm font-black text-white theme-light:text-slate-900 uppercase tracking-wider">
              Quick Customer Profiles:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                type="button"
                key={p.id}
                onClick={() => onSelectPreset(p)}
                className="px-3.5 py-1.5 text-xs font-black rounded-xl bg-slate-900 theme-light:bg-slate-100 text-slate-200 theme-light:text-slate-800 border border-white/15 theme-light:border-slate-300 shadow-sm hover:border-emerald-500 theme-dark-blue:hover:border-cyan-400 hover:text-emerald-400 theme-dark-blue:hover:text-cyan-300 transition-all cursor-pointer"
              >
                {p.name}
              </button>
            ))}
            <button
              type="button"
              onClick={onReset}
              className="px-3.5 py-1.5 text-xs font-black rounded-xl bg-slate-800 theme-light:bg-slate-200 text-slate-300 theme-light:text-slate-800 border border-white/10 theme-light:border-slate-300 hover:bg-slate-700 theme-light:hover:bg-slate-300 transition-all flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Graphical Curved Form Cards (Full tab width grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
        
        {/* CARD 1: DEMOGRAPHICS */}
        <div className="p-[1.5px] rounded-3xl bg-gradient-to-b from-emerald-500/40 via-teal-500/20 to-transparent theme-dark-blue:from-blue-600/40 theme-dark-blue:via-cyan-500/20 theme-light:from-blue-400/30 theme-light:to-indigo-300/20 shadow-2xl">
          <div className="app-card rounded-[23px] p-6 sm:p-7 space-y-5 h-full transition-all duration-300">
            <div className="flex items-center space-x-3 pb-3 border-b border-white/10 theme-light:border-slate-200">
              <div className="p-3 rounded-2xl bg-emerald-500/10 theme-dark-blue:bg-blue-500/10 theme-light:bg-blue-50 text-emerald-400 theme-dark-blue:text-cyan-400 theme-light:text-blue-600 border border-emerald-500/30 theme-dark-blue:border-blue-500/30 theme-light:border-blue-200 glow-green theme-dark-blue:glow-blue">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-white theme-light:text-slate-900 uppercase tracking-wide">
                  Customer Demographics
                </h3>
                <p className="text-xs text-slate-400 theme-light:text-slate-500 font-bold">Personal & family attributes</p>
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-black text-slate-200 theme-light:text-slate-700 mb-1.5 uppercase tracking-wider">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Male', 'Female'].map((g) => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => handleFieldChange('gender', g)}
                    className={`py-2.5 px-3 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                      formData.gender === g
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 theme-dark-blue:from-blue-600 theme-dark-blue:to-indigo-600 theme-light:from-blue-600 theme-light:to-indigo-600 text-white border-emerald-400 theme-dark-blue:border-blue-400 theme-light:border-blue-600 shadow-md glow-green theme-dark-blue:glow-blue'
                        : 'bg-slate-900/80 theme-light:bg-slate-100 text-slate-300 theme-light:text-slate-700 border-white/10 theme-light:border-slate-300 hover:border-slate-600 hover:bg-slate-800 theme-light:hover:bg-slate-200'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Senior Citizen */}
            <div>
              <label className="block text-xs font-black text-slate-200 theme-light:text-slate-700 mb-1.5 uppercase tracking-wider">
                Senior Citizen Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'No (Under 65)', val: 0 },
                  { label: 'Yes (65+)', val: 1 },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.val}
                    onClick={() => handleFieldChange('SeniorCitizen', opt.val)}
                    className={`py-2.5 px-3 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                      formData.SeniorCitizen === opt.val
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 theme-dark-blue:from-blue-600 theme-dark-blue:to-indigo-600 theme-light:from-blue-600 theme-light:to-indigo-600 text-white border-emerald-400 theme-dark-blue:border-blue-400 theme-light:border-blue-600 shadow-md glow-green theme-dark-blue:glow-blue'
                        : 'bg-slate-900/80 theme-light:bg-slate-100 text-slate-300 theme-light:text-slate-700 border-white/10 theme-light:border-slate-300 hover:border-slate-600 hover:bg-slate-800 theme-light:hover:bg-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Partner */}
            <div>
              <label className="block text-xs font-black text-slate-200 theme-light:text-slate-700 mb-1.5 uppercase tracking-wider">
                Partner
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Yes', 'No'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => handleFieldChange('Partner', opt)}
                    className={`py-2.5 px-3 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                      formData.Partner === opt
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 theme-dark-blue:from-blue-600 theme-dark-blue:to-indigo-600 theme-light:from-blue-600 theme-light:to-indigo-600 text-white border-emerald-400 theme-dark-blue:border-blue-400 theme-light:border-blue-600 shadow-md glow-green theme-dark-blue:glow-blue'
                        : 'bg-slate-900/80 theme-light:bg-slate-100 text-slate-300 theme-light:text-slate-700 border-white/10 theme-light:border-slate-300 hover:border-slate-600 hover:bg-slate-800 theme-light:hover:bg-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Dependents */}
            <div>
              <label className="block text-xs font-black text-slate-200 theme-light:text-slate-700 mb-1.5 uppercase tracking-wider">
                Dependents
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Yes', 'No'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => handleFieldChange('Dependents', opt)}
                    className={`py-2.5 px-3 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                      formData.Dependents === opt
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 theme-dark-blue:from-blue-600 theme-dark-blue:to-indigo-600 theme-light:from-blue-600 theme-light:to-indigo-600 text-white border-emerald-400 theme-dark-blue:border-blue-400 theme-light:border-blue-600 shadow-md glow-green theme-dark-blue:glow-blue'
                        : 'bg-slate-900/80 theme-light:bg-slate-100 text-slate-300 theme-light:text-slate-700 border-white/10 theme-light:border-slate-300 hover:border-slate-600 hover:bg-slate-800 theme-light:hover:bg-slate-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* CARD 2: TELECOM & SERVICES */}
        <div className="p-[1.5px] rounded-3xl bg-gradient-to-b from-cyan-500/40 via-blue-500/20 to-transparent theme-light:from-cyan-400/30 theme-light:to-blue-300/20 shadow-2xl">
          <div className="app-card rounded-[23px] p-6 sm:p-7 space-y-4 h-full transition-all duration-300">
            <div className="flex items-center space-x-3 pb-3 border-b border-white/10 theme-light:border-slate-200">
              <div className="p-3 rounded-2xl bg-cyan-500/10 theme-light:bg-cyan-50 text-cyan-400 theme-light:text-cyan-600 border border-cyan-500/30 theme-light:border-cyan-200 glow-cyan">
                <Wifi className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-white theme-light:text-slate-900 uppercase tracking-wide">
                  Telecom & Subscribed Services
                </h3>
                <p className="text-xs text-slate-400 theme-light:text-slate-500 font-bold">Internet, voice & add-ons</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5 max-h-[420px] overflow-y-auto pr-1">
              
              {/* Phone Service */}
              <div>
                <label className="block text-xs font-black text-slate-200 theme-light:text-slate-700 mb-1 uppercase tracking-wider">
                  Phone Service
                </label>
                <select
                  value={formData.PhoneService}
                  onChange={(e) => handleFieldChange('PhoneService', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-black rounded-xl bg-slate-900 theme-light:bg-slate-50 border border-white/15 theme-light:border-slate-300 text-slate-100 theme-light:text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-xs"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Multiple Lines */}
              <div>
                <label className="block text-xs font-black text-slate-200 theme-light:text-slate-700 mb-1 uppercase tracking-wider">
                  Multiple Lines
                </label>
                <select
                  value={formData.MultipleLines}
                  disabled={formData.PhoneService === 'No'}
                  onChange={(e) => handleFieldChange('MultipleLines', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-black rounded-xl bg-slate-900 theme-light:bg-slate-50 border border-white/15 theme-light:border-slate-300 text-slate-100 theme-light:text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-xs disabled:opacity-50"
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                  <option value="No phone service">No phone service</option>
                </select>
              </div>

              {/* Internet Service */}
              <div>
                <label className="block text-xs font-black text-slate-200 theme-light:text-slate-700 mb-1 uppercase tracking-wider">
                  Internet Service Provider
                </label>
                <select
                  value={formData.InternetService}
                  onChange={(e) => handleFieldChange('InternetService', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-black rounded-xl bg-slate-900 theme-light:bg-slate-50 border border-white/15 theme-light:border-slate-300 text-slate-100 theme-light:text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-xs"
                >
                  <option value="Fiber optic">Fiber optic (High Speed)</option>
                  <option value="DSL">DSL (Standard)</option>
                  <option value="No">No Internet Service</option>
                </select>
              </div>

              {/* Online Security & Backup */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-black text-slate-200 theme-light:text-slate-700 mb-1 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-cyan-400 theme-light:text-blue-600" /> Security
                  </label>
                  <select
                    value={formData.OnlineSecurity}
                    disabled={formData.InternetService === 'No'}
                    onChange={(e) => handleFieldChange('OnlineSecurity', e.target.value)}
                    className="w-full px-2.5 py-2 text-xs font-black rounded-xl bg-slate-900 theme-light:bg-slate-50 border border-white/15 theme-light:border-slate-300 text-slate-100 theme-light:text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-xs disabled:opacity-50"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">No internet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-200 theme-light:text-slate-700 mb-1 flex items-center gap-1">
                    <HardDrive className="w-3 h-3 text-indigo-400 theme-light:text-indigo-600" /> Backup
                  </label>
                  <select
                    value={formData.OnlineBackup}
                    disabled={formData.InternetService === 'No'}
                    onChange={(e) => handleFieldChange('OnlineBackup', e.target.value)}
                    className="w-full px-2.5 py-2 text-xs font-black rounded-xl bg-slate-900 theme-light:bg-slate-50 border border-white/15 theme-light:border-slate-300 text-slate-100 theme-light:text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-xs disabled:opacity-50"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">No internet</option>
                  </select>
                </div>
              </div>

              {/* Device Protection & Tech Support */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-black text-slate-200 theme-light:text-slate-700 mb-1 flex items-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-400 theme-light:text-emerald-600" /> Protection
                  </label>
                  <select
                    value={formData.DeviceProtection}
                    disabled={formData.InternetService === 'No'}
                    onChange={(e) => handleFieldChange('DeviceProtection', e.target.value)}
                    className="w-full px-2.5 py-2 text-xs font-black rounded-xl bg-slate-900 theme-light:bg-slate-50 border border-white/15 theme-light:border-slate-300 text-slate-100 theme-light:text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-xs disabled:opacity-50"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">No internet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-200 theme-light:text-slate-700 mb-1 flex items-center gap-1">
                    <Headphones className="w-3 h-3 text-teal-400 theme-light:text-teal-600" /> Tech Support
                  </label>
                  <select
                    value={formData.TechSupport}
                    disabled={formData.InternetService === 'No'}
                    onChange={(e) => handleFieldChange('TechSupport', e.target.value)}
                    className="w-full px-2.5 py-2 text-xs font-black rounded-xl bg-slate-900 theme-light:bg-slate-50 border border-white/15 theme-light:border-slate-300 text-slate-100 theme-light:text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-xs disabled:opacity-50"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">No internet</option>
                  </select>
                </div>
              </div>

              {/* Streaming TV & Streaming Movies */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-black text-slate-200 theme-light:text-slate-700 mb-1 flex items-center gap-1">
                    <Tv className="w-3 h-3 text-purple-400 theme-light:text-purple-600" /> TV Stream
                  </label>
                  <select
                    value={formData.StreamingTV}
                    disabled={formData.InternetService === 'No'}
                    onChange={(e) => handleFieldChange('StreamingTV', e.target.value)}
                    className="w-full px-2.5 py-2 text-xs font-black rounded-xl bg-slate-900 theme-light:bg-slate-50 border border-white/15 theme-light:border-slate-300 text-slate-100 theme-light:text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-xs disabled:opacity-50"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">No internet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-black text-slate-200 theme-light:text-slate-700 mb-1 flex items-center gap-1">
                    <Film className="w-3 h-3 text-rose-400 theme-light:text-rose-600" /> Movies
                  </label>
                  <select
                    value={formData.StreamingMovies}
                    disabled={formData.InternetService === 'No'}
                    onChange={(e) => handleFieldChange('StreamingMovies', e.target.value)}
                    className="w-full px-2.5 py-2 text-xs font-black rounded-xl bg-slate-900 theme-light:bg-slate-50 border border-white/15 theme-light:border-slate-300 text-slate-100 theme-light:text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-xs disabled:opacity-50"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">No internet</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* CARD 3: CONTRACT & BILLING */}
        <div className="p-[1.5px] rounded-3xl bg-gradient-to-b from-teal-500/40 via-emerald-500/20 to-transparent theme-dark-blue:from-blue-500/40 theme-dark-blue:via-cyan-500/20 theme-light:from-indigo-400/30 theme-light:to-blue-300/20 shadow-2xl">
          <div className="app-card rounded-[23px] p-6 sm:p-7 space-y-5 h-full transition-all duration-300">
            <div className="flex items-center space-x-3 pb-3 border-b border-white/10 theme-light:border-slate-200">
              <div className="p-3 rounded-2xl bg-teal-500/10 theme-dark-blue:bg-blue-500/10 theme-light:bg-indigo-50 text-teal-400 theme-dark-blue:text-cyan-400 theme-light:text-indigo-600 border border-teal-500/30 theme-dark-blue:border-blue-500/30 theme-light:border-indigo-200 glow-green theme-dark-blue:glow-blue">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-white theme-light:text-slate-900 uppercase tracking-wide">
                  Contract & Billing
                </h3>
                <p className="text-xs text-slate-400 theme-light:text-slate-500 font-bold">Tenure, payment & charges</p>
              </div>
            </div>

            {/* Tenure Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-black text-slate-200 theme-light:text-slate-700 flex items-center gap-1 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400 theme-dark-blue:text-cyan-400 theme-light:text-blue-600" /> Tenure (Months)
                </label>
                <span className="px-2.5 py-1 text-xs font-black rounded-lg bg-emerald-500/20 theme-dark-blue:bg-blue-500/20 theme-light:bg-blue-100 text-emerald-300 theme-dark-blue:text-cyan-300 theme-light:text-blue-800 border border-emerald-500/40 theme-dark-blue:border-blue-500/40 theme-light:border-blue-300 glow-green theme-dark-blue:glow-blue">
                  {formData.tenure} {formData.tenure === 1 ? 'Month' : 'Months'} ({(formData.tenure / 12).toFixed(1)} yrs)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="72"
                step="1"
                value={formData.tenure}
                onChange={(e) => handleFieldChange('tenure', parseInt(e.target.value) || 0)}
                className="w-full h-2.5 bg-slate-800 theme-light:bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500 theme-dark-blue:accent-cyan-400 theme-light:accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 theme-light:text-slate-500 mt-1 font-bold">
                <span>0 m</span>
                <span>12 m</span>
                <span>24 m</span>
                <span>36 m</span>
                <span>48 m</span>
                <span>60 m</span>
                <span>72 m</span>
              </div>
            </div>

            {/* Contract */}
            <div>
              <label className="block text-xs font-black text-slate-200 theme-light:text-slate-700 mb-1 uppercase tracking-wider">
                Contract Type
              </label>
              <select
                value={formData.Contract}
                onChange={(e) => handleFieldChange('Contract', e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs font-black rounded-xl bg-slate-900 theme-light:bg-slate-50 border border-white/15 theme-light:border-slate-300 text-slate-100 theme-light:text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-xs"
              >
                <option value="Month-to-month">Month-to-month</option>
                <option value="One year">One year</option>
                <option value="Two year">Two year</option>
              </select>
            </div>

            {/* Paperless Billing & Payment Method */}
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-xs font-black text-slate-200 theme-light:text-slate-700 mb-1 uppercase tracking-wider">
                  Paperless Billing
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Yes', 'No'].map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => handleFieldChange('PaperlessBilling', opt)}
                      className={`py-2 px-3 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                        formData.PaperlessBilling === opt
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 theme-dark-blue:from-blue-600 theme-dark-blue:to-indigo-600 theme-light:from-blue-600 theme-light:to-indigo-600 text-white border-emerald-400 theme-dark-blue:border-blue-400 theme-light:border-blue-600 shadow-md glow-green theme-dark-blue:glow-blue'
                          : 'bg-slate-900/80 theme-light:bg-slate-100 text-slate-300 theme-light:text-slate-700 border-white/10 theme-light:border-slate-300 hover:border-slate-600 hover:bg-slate-800 theme-light:hover:bg-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-200 theme-light:text-slate-700 mb-1 uppercase tracking-wider">
                  Payment Method
                </label>
                <select
                  value={formData.PaymentMethod}
                  onChange={(e) => handleFieldChange('PaymentMethod', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-black rounded-xl bg-slate-900 theme-light:bg-slate-50 border border-white/15 theme-light:border-slate-300 text-slate-100 theme-light:text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-xs"
                >
                  <option value="Electronic check">Electronic check</option>
                  <option value="Mailed check">Mailed check</option>
                  <option value="Bank transfer (automatic)">Bank transfer (automatic)</option>
                  <option value="Credit card (automatic)">Credit card (automatic)</option>
                </select>
              </div>
            </div>

            {/* Monthly & Total Charges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-black text-slate-200 theme-light:text-slate-700 mb-1 uppercase tracking-wider">
                  Monthly Charges ($)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 theme-light:text-slate-500 text-xs font-black">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="300"
                    value={formData.MonthlyCharges}
                    onChange={(e) => handleFieldChange('MonthlyCharges', parseFloat(e.target.value) || 0)}
                    className="w-full pl-6 pr-2 py-2.5 text-xs font-black rounded-xl bg-slate-900 theme-light:bg-slate-50 border border-white/15 theme-light:border-slate-300 text-slate-100 theme-light:text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-xs"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[11px] font-black text-slate-200 theme-light:text-slate-700 uppercase tracking-wider">
                    Total Charges ($)
                  </label>
                  <button
                    type="button"
                    onClick={autoComputeTotalCharges}
                    className="text-[10px] text-emerald-400 theme-dark-blue:text-cyan-400 theme-light:text-blue-600 hover:underline font-black uppercase"
                  >
                    Auto
                  </button>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 theme-light:text-slate-500 text-xs font-black">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.10"
                    min="0"
                    max="50000"
                    value={formData.TotalCharges}
                    onChange={(e) => handleFieldChange('TotalCharges', parseFloat(e.target.value) || 0)}
                    className="w-full pl-6 pr-2 py-2.5 text-xs font-black rounded-xl bg-slate-900 theme-light:bg-slate-50 border border-white/15 theme-light:border-slate-300 text-slate-100 theme-light:text-slate-900 focus:ring-2 focus:ring-emerald-500 shadow-xs"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Large Glowing Adaptive CTA Submit Button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-16 py-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-500 theme-dark-blue:from-blue-600 theme-dark-blue:via-indigo-600 theme-dark-blue:to-cyan-400 theme-light:from-blue-600 theme-light:to-indigo-600 text-white font-black text-base uppercase tracking-wider shadow-2xl glow-green theme-dark-blue:glow-blue hover:scale-105 active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer border border-emerald-400/40 theme-dark-blue:border-blue-400/40 theme-light:border-blue-500/30 disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing customer behavior...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-teal-200 animate-bounce" />
              <span>RUN RETENTION PREDICTION</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
};




