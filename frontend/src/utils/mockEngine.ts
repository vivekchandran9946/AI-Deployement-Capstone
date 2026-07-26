import { CustomerFormData, PredictionResponse } from '../types/churn';

export const runMockInference = (data: CustomerFormData): PredictionResponse => {
  let churnRiskScore = 30; // base score

  // Contract weighting
  if (data.Contract === 'Month-to-month') churnRiskScore += 32;
  if (data.Contract === 'One year') churnRiskScore += 5;
  if (data.Contract === 'Two year') churnRiskScore -= 25;

  // Tenure weighting
  if (data.tenure <= 6) churnRiskScore += 25;
  else if (data.tenure <= 18) churnRiskScore += 10;
  else if (data.tenure >= 48) churnRiskScore -= 20;

  // Internet & Services
  if (data.InternetService === 'Fiber optic') churnRiskScore += 12;
  if (data.TechSupport === 'No') churnRiskScore += 8;
  if (data.TechSupport === 'Yes') churnRiskScore -= 10;
  if (data.OnlineSecurity === 'No') churnRiskScore += 7;
  if (data.OnlineSecurity === 'Yes') churnRiskScore -= 8;

  // Financials
  if (data.PaymentMethod === 'Electronic check') churnRiskScore += 14;
  if (data.MonthlyCharges > 85) churnRiskScore += 10;
  if (data.SeniorCitizen === 1) churnRiskScore += 6;

  // Clamp churn percentage between 5 and 95
  const probability_churn = Math.max(5, Math.min(95, Math.round(churnRiskScore)));
  const probability_stay = 100 - probability_churn;

  const isChurn = probability_churn > 50;

  let recommendation = '';
  if (isChurn) {
    if (data.Contract === 'Month-to-month') {
      recommendation = 'Offer a 15% discount incentive to migrate from Month-to-month to a 1-Year or 2-Year Contract with free Tech Support add-on.';
    } else if (data.MonthlyCharges > 80) {
      recommendation = 'High monthly spending detected. Assign a dedicated customer success agent and bundle complimentary Online Security & Device Protection.';
    } else {
      recommendation = 'Initiate proactive retention outreach within 48 hours. Offer custom loyalty service upgrades.';
    }
  } else {
    if (data.tenure > 36) {
      recommendation = 'Customer is highly stable & loyal. Continue regular engagement and invite to Premium VIP Telecom Rewards Program.';
    } else {
      recommendation = 'Customer is stable. Continue regular engagement and recommend cross-selling streaming add-on bundles.';
    }
  }

  return {
    prediction: isChurn ? 'Customer is likely to Churn' : 'Customer is likely to Stay',
    prediction_code: isChurn ? 1 : 0,
    probability_stay,
    probability_churn,
    recommendation,
  };
};
