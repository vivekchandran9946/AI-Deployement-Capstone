from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import CustomerData
from app.predictor import predict_churn

app = FastAPI(
    title="Customer Churn Prediction API",
    version="1.0.0"
)

# Allow React frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite React frontend
        "http://localhost:3000",  # React default
        "https://ai-deployement-capstone.onrender.com"  # Render frontend (if same domain)
    ],
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