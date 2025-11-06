from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd

# === Create FastAPI app ===
app = FastAPI(title="Diabetes Prediction API")

# === Add CORS middleware ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Load the model ===
model = joblib.load("pipeline.joblib")

# === Input Schema ===
class Patient(BaseModel):
    gender: str
    age: float
    hypertension: int
    heart_disease: int
    smoking_history: str
    bmi: float
    HbA1c_level: float
    blood_glucose_level: float

@app.get("/")
def root():
    return {"message": "Diabetes Prediction API is running!"}

@app.post("/predict")
def predict(patient: Patient):
    try:
        # Convert input to DataFrame
        data = pd.DataFrame([patient.model_dump()])

        # Predict using pipeline
        pred = model.predict(data)[0]
        prob = model.predict_proba(data)[0][1]

        return {
            "prediction": int(pred),
            "probability_of_diabetes": round(float(prob), 3),
            "label": "Diabetic" if pred == 1 else "Non-Diabetic"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
