from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import CustomerData
from app.predictor import predict_churn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend only"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/predict")
def predict(customer: CustomerData):
    return predict_churn(customer.model_dump())

@app.post("/test")
def test():
    return {"message": "POST works"}

@app.get("/vivek")
def vivek():
    return {"message": "THIS IS THE NEW BACKEND"}