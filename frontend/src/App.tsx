import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CustomerFormData, PredictionResponse, CustomerPreset } from './types/churn';
import { DEFAULT_FORM_DATA, PRESETS } from './data/presets';
import { runMockInference } from './utils/mockEngine';
import { downloadPredictionReport } from './utils/reportExporter';

import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { CustomerForm } from './components/CustomerForm';
import { ResultDashboard } from './components/ResultDashboard';
import { AboutModel } from './components/AboutModel';
import { ErrorAlert } from './components/ErrorAlert';
import { Footer } from './components/Footer';

import { 
  TrendingDown, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
} from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('predict');
  const [formData, setFormData] = useState<CustomerFormData>(DEFAULT_FORM_DATA);
  const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null);
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);
  const [useDemoMode, setUseDemoMode] = useState<boolean>(false);
  const [hasConnectionError, setHasConnectionError] = useState<boolean>(false);
  const [isCheckingConn, setIsCheckingConn] = useState<boolean>(false);
  const [predictionCount, setPredictionCount] = useState<number>(0);

  const BACKEND_URL = '';

  // Force Professional White Theme on Root & Body Elements
  useEffect(() => {
    document.documentElement.classList.remove('theme-cyber', 'theme-dark-blue', 'dark');
    document.body.classList.remove('theme-cyber', 'theme-dark-blue', 'dark');

    document.documentElement.classList.add('theme-light');
    document.body.classList.add('theme-light');
  }, []);

  // Check Backend Connectivity on mount
  const checkBackendHealth = async () => {
    setIsCheckingConn(true);
    try {
      await axios.options('/predict', { timeout: 3000 }).catch(() => {
        return axios.get('/', { timeout: 2500 });
      });
      setIsBackendOnline(true);
      setHasConnectionError(false);
    } catch (err) {
      setIsBackendOnline(false);
    } finally {
      setIsCheckingConn(false);
    }
  };

  useEffect(() => {
    checkBackendHealth();
  }, []);

  // Handle Preset Load
  const handleSelectPreset = (preset: CustomerPreset) => {
    setFormData({ ...preset.data });
    setActiveTab('predict');
    setHasConnectionError(false);
  };

  // Handle Form Submit & Prediction Request
  const handleSubmitPrediction = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasConnectionError(false);

    const startMs = Date.now();

    if (useDemoMode) {
      setTimeout(() => {
        const mockResult = runMockInference(formData);
        setPredictionResult(mockResult);
        setIsLoading(false);
        setPredictionCount((prev) => prev + 1);
        scrollToResults();
      }, 900);
      return;
    }

    try {
      const response = await axios.post<PredictionResponse>(BACKEND_URL, formData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 8000,
      });

      const elapsed = Date.now() - startMs;
      const delay = Math.max(0, 800 - elapsed);

      setTimeout(() => {
        setPredictionResult(response.data);
        setIsBackendOnline(true);
        setIsLoading(false);
        setPredictionCount((prev) => prev + 1);
        scrollToResults();
      }, delay);

    } catch (err: any) {
      console.warn('Backend connection failed:', err);
      setIsBackendOnline(false);
      setIsLoading(false);
      setHasConnectionError(true);
    }
  };

  const scrollToResults = () => {
    setTimeout(() => {
      const elem = document.getElementById('results-section');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  const handleDownloadReport = () => {
    if (predictionResult) {
      downloadPredictionReport(predictionResult, formData);
    }
  };

  const handleResetForm = () => {
    setFormData(DEFAULT_FORM_DATA);
    setPredictionResult(null);
    setHasConnectionError(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300 bg-grid-pattern w-full bg-slate-50 text-slate-900">
      
      {/* Top Navbar */}
      <Navbar
        onSelectPreset={handleSelectPreset}
        isBackendOnline={isBackendOnline}
        useDemoMode={useDemoMode}
        onToggleDemoMode={setUseDemoMode}
        onCheckConnection={checkBackendHealth}
        isCheckingConn={isCheckingConn}
      />

      {/* Main Page Layout */}
      <div className="flex-1 w-full max-w-[1650px] mx-auto px-3 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          predictionCount={predictionCount}
        />

        {/* Main Content Area */}
        <main className="flex-1 py-6 space-y-8 overflow-x-hidden w-full">
          
          {/* Professional White Hero Header Section */}
          <div className="relative overflow-hidden rounded-3xl app-card p-8 sm:p-12 text-center shadow-lg flex flex-col items-center space-y-6 border border-slate-200 bg-white">
            
            {/* Soft Ambient Background Lighting */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 blur-[100px] rounded-full pointer-events-none bg-blue-500/10"></div>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              CUSTOMER CHURN PREDICTION PLATFORM
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight text-slate-900 max-w-4xl">
              ADVANCED CHURN INTELLIGENCE <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">ENTERPRISE SYSTEM</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-medium max-w-3xl leading-relaxed">
              Predict customer attrition with high precision using our 19-parameter Random Forest decision ensemble engine.
            </p>

            {/* Quick Action / Scenario Input Bar */}
            <div className="w-full max-w-2xl flex items-center bg-slate-50 border border-slate-300 rounded-2xl p-1.5 shadow-sm focus-within:border-blue-500 transition-all">
              <input
                type="text"
                placeholder="Select scenario preset or enter customer profile..."
                readOnly
                onClick={() => handleSelectPreset(PRESETS[0])}
                className="w-full bg-transparent px-4 py-3 text-xs sm:text-sm text-slate-800 font-semibold focus:outline-none cursor-pointer placeholder-slate-400"
              />
              <button
                type="button"
                onClick={() => handleSelectPreset(PRESETS[0])}
                className="px-6 py-3 rounded-xl text-white font-black text-xs uppercase tracking-wider shadow-md transition flex items-center gap-2 cursor-pointer shrink-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 glow-blue"
              >
                <Zap className="w-4 h-4 fill-current" /> RUN INFERENCE
              </button>
            </div>

            {/* Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-slate-200 w-full text-xs">
              <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] mr-1">Workspace:</span>
              <button
                onClick={() => setActiveTab('predict')}
                className={`px-4 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer border ${
                  activeTab === 'predict'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-blue-700'
                }`}
              >
                Inference Form
              </button>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer border ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-blue-700'
                }`}
              >
                Executive Analytics
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className={`px-4 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer border ${
                  activeTab === 'about'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-blue-700'
                }`}
              >
                Model Architecture
              </button>
            </div>

          </div>


          {/* TAB 1: PREDICT CUSTOMER */}
          {activeTab === 'predict' && (
            <div className="space-y-8">
              
              {/* Form Section */}
              <CustomerForm
                formData={formData}
                onChange={setFormData}
                onSubmit={handleSubmitPrediction}
                onReset={handleResetForm}
                onSelectPreset={handleSelectPreset}
                isLoading={isLoading}
              />

              {/* Connection Error Card */}
              {hasConnectionError && (
                <ErrorAlert
                  onRetry={checkBackendHealth}
                  onEnableDemoMode={() => {
                    setUseDemoMode(true);
                    setHasConnectionError(false);
                    const mockResult = runMockInference(formData);
                    setPredictionResult(mockResult);
                    setPredictionCount((prev) => prev + 1);
                    scrollToResults();
                  }}
                  isRetrying={isCheckingConn}
                />
              )}

              {/* Results Dashboard Section */}
              {predictionResult && !hasConnectionError && (
                <ResultDashboard
                  predictionData={predictionResult}
                  customerData={formData}
                  onDownloadReport={handleDownloadReport}
                />
              )}

            </div>
          )}

          {/* TAB 2: EXECUTIVE OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-center text-xs font-black text-slate-700 uppercase">
                    <span>Average Churn Rate</span>
                    <TrendingDown className="w-5 h-5 text-rose-500" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">26.5%</div>
                  <p className="text-xs text-slate-500 font-bold">Benchmark across 7,000+ Telco accounts</p>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-center text-xs font-black text-slate-700 uppercase">
                    <span>Top Churn Factor</span>
                    <Zap className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="text-xl font-black text-blue-700">Month-to-Month</div>
                  <p className="text-xs text-slate-500 font-bold">Short contracts account for 55% churns</p>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-center text-xs font-black text-slate-700 uppercase">
                    <span>Predictions Performed</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-3xl font-black text-slate-900">{predictionCount}</div>
                  <p className="text-xs text-slate-500 font-bold">Evaluations during this session</p>
                </div>

              </div>

              {/* Action Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-3xl p-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-black">Ready to evaluate a customer profile?</h3>
                  <p className="text-xs text-blue-100 font-semibold">
                    Input customer demographics, tenure, and billing details into the ConnectTel AI prediction form.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('predict')}
                  className="px-6 py-3.5 rounded-2xl bg-white text-blue-700 hover:bg-slate-100 font-black text-xs shadow-md flex items-center gap-2 cursor-pointer shrink-0 transition"
                >
                  Go to Prediction Form <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Sample Presets Showcase */}
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-4">
                  Pre-configured Test Profiles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PRESETS.map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-500 transition-all cursor-pointer space-y-3 group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-black text-sm text-slate-900 group-hover:text-blue-600">
                          {preset.name}
                        </span>
                        <span className="px-2.5 py-0.5 text-xs font-black rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {preset.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">{preset.description}</p>
                      <div className="text-xs text-blue-700 font-black flex items-center gap-1 group-hover:underline">
                        Load into form <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}


          {/* TAB 3: ABOUT MODEL */}
          {activeTab === 'about' && <AboutModel />}

        </main>
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};
