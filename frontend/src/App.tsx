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
  Brain, 
  TrendingDown, 
  Users, 
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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const BACKEND_URL = 'http://127.0.0.1:8000/predict';

  // Toggle Dark Mode Class on Document Root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Check Backend Connectivity on mount
  const checkBackendHealth = async () => {
    setIsCheckingConn(true);
    try {
      await axios.options('http://127.0.0.1:8000/predict', { timeout: 3000 }).catch(() => {
        return axios.get('http://127.0.0.1:8000/', { timeout: 2500 });
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white transition-colors duration-300">
      
      {/* Top Navbar */}
      <Navbar
        onSelectPreset={handleSelectPreset}
        isBackendOnline={isBackendOnline}
        useDemoMode={useDemoMode}
        onToggleDemoMode={setUseDemoMode}
        onCheckConnection={checkBackendHealth}
        isCheckingConn={isCheckingConn}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Page Layout with Left Sidebar */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row">
        
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          predictionCount={predictionCount}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-x-hidden">
          
          {/* Hero Banner Section */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-colors duration-300">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" /> AI Customer Retention Engine
                </span>
                {useDemoMode && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    Demo Engine Active
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                AI-Powered Customer Churn Prediction
              </h2>
              
              <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                Predict whether a telecommunications customer is likely to churn based on customer demographics, subscribed voice & fiber internet services, billing options, and contract tenure.
              </p>
            </div>

            {/* Quick Stat Badge */}
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 p-4.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shrink-0">
              <div className="p-3 rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="block text-2xl font-black text-slate-900 dark:text-white">
                  19 Features
                </span>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Telco Standard Model
                </span>
              </div>
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
                
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-3">
                  <div className="flex justify-between items-center text-xs font-extrabold text-slate-400 uppercase">
                    <span>Average Churn Rate</span>
                    <TrendingDown className="w-5 h-5 text-rose-500" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">26.5%</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Benchmark across 7,000+ Telco accounts</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-3">
                  <div className="flex justify-between items-center text-xs font-extrabold text-slate-400 uppercase">
                    <span>Top Churn Factor</span>
                    <Zap className="w-5 h-5 text-amber-500" />
                  </div>
                  <div className="text-xl font-black text-blue-600 dark:text-cyan-400">Month-to-Month</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Short contracts account for 55% churns</p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-3">
                  <div className="flex justify-between items-center text-xs font-extrabold text-slate-400 uppercase">
                    <span>Predictions Performed</span>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">{predictionCount}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Evaluations during this session</p>
                </div>

              </div>

              {/* Action Banner */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white rounded-3xl p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-black">Ready to evaluate a customer profile?</h3>
                  <p className="text-xs text-blue-100 font-medium">
                    Input customer demographics, tenure, and billing details into the ConnectTel AI prediction form.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('predict')}
                  className="px-6 py-3.5 rounded-2xl bg-white text-blue-700 hover:bg-slate-100 font-extrabold text-xs shadow-lg flex items-center gap-2 cursor-pointer shrink-0 transition"
                >
                  Go to Prediction Form <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Sample Presets Showcase */}
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">
                  Pre-configured Test Profiles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PRESETS.map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-lg hover:border-blue-500 transition-all cursor-pointer space-y-3 group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400">
                          {preset.name}
                        </span>
                        <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-cyan-400 border border-blue-200 dark:border-blue-800">
                          {preset.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{preset.description}</p>
                      <div className="text-xs text-blue-600 dark:text-cyan-400 font-extrabold flex items-center gap-1 group-hover:underline">
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
