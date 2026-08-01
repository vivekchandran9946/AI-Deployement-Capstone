import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import CustomerData
from app.predictor import predict_churn

app = FastAPI(
    title="Customer Churn Prediction API",
    version="1.0.0"
)

allowed_origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
]

env_origins = os.getenv("ALLOWED_ORIGINS", "")
if env_origins:
    allowed_origins.extend(origin.strip() for origin in env_origins.split(",") if origin.strip())

# Allow React frontend access from local dev and Render deployments
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.onrender\.com",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Customer Churn Prediction API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/predict")
def predict(customer: CustomerData):
    result = predict_churn(customer.model_dump())

    return result


@app.post("/test")
def test():
    return {
        "message": "POST request working successfully"
    }