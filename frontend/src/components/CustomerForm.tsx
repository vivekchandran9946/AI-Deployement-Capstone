import React from 'react';
import { CustomerFormData, CustomerPreset } from '../types/churn';
import { PRESETS } from '../data/presets';
import { 
  User, 
  Wifi, 
  CreditCard, 
  Sparkles, 
  RotateCcw, 
  HelpCircle, 
  DollarSign, 
  Calendar,
  Sliders,
  CheckCircle2
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
    const updated: CustomerFormData = { ...formData, [field]: value };

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
      // Re-enable options if previously set to 'No internet service'
      if (updated.OnlineSecurity === 'No internet service') updated.OnlineSecurity = 'No';
      if (updated.OnlineBackup === 'No internet service') updated.OnlineBackup = 'No';
      if (updated.DeviceProtection === 'No internet service') updated.DeviceProtection = 'No';
      if (updated.TechSupport === 'No internet service') updated.TechSupport = 'No';
      if (updated.StreamingTV === 'No internet service') updated.StreamingTV = 'No';
      if (updated.StreamingMovies === 'No internet service') updated.StreamingMovies = 'No';
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
    <form onSubmit={onSubmit} className="space-y-8">
      
      {/* Quick Presets Bar */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 dark:from-slate-800/90 dark:to-slate-900 p-4 rounded-2xl border border-blue-200/80 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-cyan-400 animate-spin-slow" />
          <span className="text-sm font-bold text-slate-800 dark:text-white">
            Quick Customer Scenarios:
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              type="button"
              key={p.id}
              onClick={() => onSelectPreset(p)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-blue-500 hover:text-blue-600 transition-all cursor-pointer"
            >
              {p.name}
            </button>
          ))}
          <button
            type="button"
            onClick={onReset}
            className="px-3 py-1.5 text-xs font-medium rounded-xl bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 transition-all flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Grid of Form Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: DEMOGRAPHICS */}
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-lg shadow-slate-200/50 dark:shadow-none space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100 dark:border-slate-700">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-cyan-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-800 dark:text-white">
                Customer Demographics
              </h3>
              <p className="text-xs text-slate-400">Personal & family details</p>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Male', 'Female'].map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => handleFieldChange('gender', g)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    formData.gender === g
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Senior Citizen */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
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
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    formData.SeniorCitizen === opt.val
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Partner */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Partner
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Yes', 'No'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleFieldChange('Partner', opt)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    formData.Partner === opt
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Dependents */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Dependents
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Yes', 'No'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleFieldChange('Dependents', opt)}
                  className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                    formData.Dependents === opt
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* CARD 2: TELECOM & SERVICES */}
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-lg shadow-slate-200/50 dark:shadow-none space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100 dark:border-slate-700">
            <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-800 dark:text-white">
                Telecom & Subscribed Services
              </h3>
              <p className="text-xs text-slate-400">Internet, voice & add-ons</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 max-h-[420px] overflow-y-auto pr-1">
            
            {/* Phone Service */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Service
              </label>
              <select
                value={formData.PhoneService}
                onChange={(e) => handleFieldChange('PhoneService', e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Multiple Lines */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Multiple Lines
              </label>
              <select
                value={formData.MultipleLines}
                disabled={formData.PhoneService === 'No'}
                onChange={(e) => handleFieldChange('MultipleLines', e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <option value="No">No</option>
                <option value="Yes">Yes</option>
                <option value="No phone service">No phone service</option>
              </select>
            </div>

            {/* Internet Service */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Internet Service Provider
              </label>
              <select
                value={formData.InternetService}
                onChange={(e) => handleFieldChange('InternetService', e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Fiber optic">Fiber optic (High Speed)</option>
                <option value="DSL">DSL (Standard)</option>
                <option value="No">No Internet Service</option>
              </select>
            </div>

            {/* Online Security & Backup */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Online Security
                </label>
                <select
                  value={formData.OnlineSecurity}
                  disabled={formData.InternetService === 'No'}
                  onChange={(e) => handleFieldChange('OnlineSecurity', e.target.value)}
                  className="w-full px-2.5 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="No internet service">No internet</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Online Backup
                </label>
                <select
                  value={formData.OnlineBackup}
                  disabled={formData.InternetService === 'No'}
                  onChange={(e) => handleFieldChange('OnlineBackup', e.target.value)}
                  className="w-full px-2.5 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Device Protection
                </label>
                <select
                  value={formData.DeviceProtection}
                  disabled={formData.InternetService === 'No'}
                  onChange={(e) => handleFieldChange('DeviceProtection', e.target.value)}
                  className="w-full px-2.5 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="No internet service">No internet</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tech Support
                </label>
                <select
                  value={formData.TechSupport}
                  disabled={formData.InternetService === 'No'}
                  onChange={(e) => handleFieldChange('TechSupport', e.target.value)}
                  className="w-full px-2.5 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Streaming TV
                </label>
                <select
                  value={formData.StreamingTV}
                  disabled={formData.InternetService === 'No'}
                  onChange={(e) => handleFieldChange('StreamingTV', e.target.value)}
                  className="w-full px-2.5 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="No internet service">No internet</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Streaming Movies
                </label>
                <select
                  value={formData.StreamingMovies}
                  disabled={formData.InternetService === 'No'}
                  onChange={(e) => handleFieldChange('StreamingMovies', e.target.value)}
                  className="w-full px-2.5 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="No internet service">No internet</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* CARD 3: CONTRACT & BILLING */}
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-lg shadow-slate-200/50 dark:shadow-none space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100 dark:border-slate-700">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-800 dark:text-white">
                Contract & Billing
              </h3>
              <p className="text-xs text-slate-400">Tenure, payment & charges</p>
            </div>
          </div>

          {/* Tenure Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-500" /> Tenure (Months)
              </label>
              <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-cyan-300">
                {formData.tenure} {formData.tenure === 1 ? 'Month' : 'Months'} ({ (formData.tenure / 12).toFixed(1) } yrs)
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="72"
              step="1"
              value={formData.tenure}
              onChange={(e) => handleFieldChange('tenure', parseInt(e.target.value) || 0)}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
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
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Contract Type
            </label>
            <select
              value={formData.Contract}
              onChange={(e) => handleFieldChange('Contract', e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
            >
              <option value="Month-to-month">Month-to-month</option>
              <option value="One year">One year</option>
              <option value="Two year">Two year</option>
            </select>
          </div>

          {/* Paperless Billing & Payment Method */}
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Paperless Billing
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Yes', 'No'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => handleFieldChange('PaperlessBilling', opt)}
                    className={`py-2 px-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                      formData.PaperlessBilling === opt
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Payment Method
              </label>
              <select
                value={formData.PaymentMethod}
                onChange={(e) => handleFieldChange('PaymentMethod', e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Monthly Charges ($)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">
                  $
                </span>
                <input
                  type="number"
                  step="0.05"
                  min="0"
                  max="300"
                  value={formData.MonthlyCharges}
                  onChange={(e) => handleFieldChange('MonthlyCharges', parseFloat(e.target.value) || 0)}
                  className="w-full pl-6 pr-2 py-2 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Total Charges ($)
                </label>
                <button
                  type="button"
                  onClick={autoComputeTotalCharges}
                  className="text-[10px] text-blue-500 hover:underline font-medium"
                >
                  Auto
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-400 text-xs">
                  $
                </span>
                <input
                  type="number"
                  step="0.10"
                  min="0"
                  max="50000"
                  value={formData.TotalCharges}
                  onChange={(e) => handleFieldChange('TotalCharges', parseFloat(e.target.value) || 0)}
                  className="w-full pl-6 pr-2 py-2 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Large Blue CTA Submit Button */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-extrabold text-base shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer border border-blue-400/30 disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing customer behaviour...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-cyan-300 animate-bounce" />
              <span>Predict Customer Churn</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
};
