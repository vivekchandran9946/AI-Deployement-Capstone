from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import CustomerData
from app.predictor import predict_churn

app = FastAPI(
    title="Customer Churn Prediction API",
    description="Predict whether a telecom customer will churn.",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Customer Churn Prediction API is live ",
        "project": "AI-Based Telecom Customer Churn Prediction",
        "status": "Running",
        "version": "1.0"
    }
@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/predict")
def predict(customer: CustomerData):
    result = predict_churn(customer.model_dump())
    return result