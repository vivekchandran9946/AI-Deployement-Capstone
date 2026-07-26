import joblib
import pandas as pd


# Load trained pipeline
model = joblib.load("model/churn_model.pkl")


def predict_churn(customer_data: dict):

    df = pd.DataFrame([customer_data])

    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0]

    if prediction == 1:
        result = "Customer is likely to Churn"
    else:
        result = "Customer is likely to Stay"

    return {
        "prediction": result,
        "prediction_code": int(prediction),
        "probability_stay": round(float(probability[0]) * 100, 2),
        "probability_churn": round(float(probability[1]) * 100, 2),
        "recommendation":
            "Offer a retention plan or discount immediately."
            if prediction == 1
            else
            "Customer is stable. Continue regular engagement."
    }