import { CustomerFormData, PredictionResponse } from '../types/churn';

export const downloadPredictionReport = (
  pred: PredictionResponse,
  customer: CustomerFormData
) => {
  const timestamp = new Date().toLocaleString();
  const riskLevel =
    pred.probability_churn > 70
      ? 'HIGH RISK'
      : pred.probability_churn > 30
      ? 'MEDIUM RISK'
      : 'LOW RISK';

  const reportText = `===================================================================
CONNECTTEL AI - CUSTOMER CHURN PREDICTION REPORT
Generated: ${timestamp}
===================================================================

[ PREDICTION SUMMARY ]
-------------------------------------------------------------------
Outcome             : ${pred.prediction} (Code: ${pred.prediction_code})
Stay Probability    : ${pred.probability_stay}%
Churn Probability   : ${pred.probability_churn}%
Calculated Risk     : ${riskLevel}

[ AI RECOMMENDATION ]
-------------------------------------------------------------------
${pred.recommendation}

[ CUSTOMER SUBMITTED PROFILE ]
-------------------------------------------------------------------
-- Demographics --
Gender              : ${customer.gender}
Senior Citizen      : ${customer.SeniorCitizen === 1 ? 'Yes' : 'No'}
Partner             : ${customer.Partner}
Dependents          : ${customer.Dependents}

-- Subscribed Services --
Phone Service       : ${customer.PhoneService}
Multiple Lines      : ${customer.MultipleLines}
Internet Service    : ${customer.InternetService}
Online Security     : ${customer.OnlineSecurity}
Online Backup       : ${customer.OnlineBackup}
Device Protection   : ${customer.DeviceProtection}
Tech Support        : ${customer.TechSupport}
Streaming TV        : ${customer.StreamingTV}
Streaming Movies    : ${customer.StreamingMovies}

-- Contract & Billing --
Tenure (Months)     : ${customer.tenure}
Contract            : ${customer.Contract}
Paperless Billing   : ${customer.PaperlessBilling}
Payment Method      : ${customer.PaymentMethod}
Monthly Charges     : $${customer.MonthlyCharges.toFixed(2)}
Total Charges       : $${customer.TotalCharges.toFixed(2)}

===================================================================
ConnectTel AI Dashboard v1.0 | Powered by FastAPI & Random Forest
===================================================================
`;

  const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ConnectTel_Churn_Report_${Date.now()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
