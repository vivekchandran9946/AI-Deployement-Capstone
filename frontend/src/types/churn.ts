export interface CustomerFormData {
  gender: 'Female' | 'Male';
  SeniorCitizen: number; // 0 or 1
  Partner: 'Yes' | 'No';
  Dependents: 'Yes' | 'No';
  tenure: number; // 0 - 72
  PhoneService: 'Yes' | 'No';
  MultipleLines: 'No' | 'Yes' | 'No phone service';
  InternetService: 'DSL' | 'Fiber optic' | 'No';
  OnlineSecurity: 'Yes' | 'No' | 'No internet service';
  OnlineBackup: 'Yes' | 'No' | 'No internet service';
  DeviceProtection: 'Yes' | 'No' | 'No internet service';
  TechSupport: 'Yes' | 'No' | 'No internet service';
  StreamingTV: 'Yes' | 'No' | 'No internet service';
  StreamingMovies: 'Yes' | 'No' | 'No internet service';
  Contract: 'Month-to-month' | 'One year' | 'Two year';
  PaperlessBilling: 'Yes' | 'No';
  PaymentMethod: 
    | 'Electronic check'
    | 'Mailed check'
    | 'Bank transfer (automatic)'
    | 'Credit card (automatic)';
  MonthlyCharges: number;
  TotalCharges: number;
}

export interface PredictionResponse {
  prediction: string;
  prediction_code: 0 | 1;
  probability_stay: number;
  probability_churn: number;
  recommendation: string;
}

export interface CustomerPreset {
  id: string;
  name: string;
  badge: string;
  description: string;
  data: CustomerFormData;
}

export type RiskLevel = 'LOW RISK' | 'MEDIUM RISK' | 'HIGH RISK';

export interface RiskInfo {
  level: RiskLevel;
  color: string;
  bgColor: string;
  borderColor: string;
  badgeBg: string;
  textColor: string;
}

export type ThemeMode = 'light' | 'dark';
