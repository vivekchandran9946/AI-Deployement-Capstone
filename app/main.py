from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.schemas import CustomerData
from app.predictor import predict_churn
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

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

frontend_dist = Path(__file__).resolve().parents[1] / "frontend" / "dist"
if frontend_dist.exists() and frontend_dist.is_dir():
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")

else:
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
app.mount("/assets", StaticFiles(directory="app/static/assets"), name="assets")

@app.get("/")
def frontend():
    return FileResponse("app/static/index.html")