# 🩺 Diabetes Prediction App (FastAPI + React)

A web application that predicts whether a person is diabetic or not using a **Machine Learning** model built with **Scikit-learn**, served via **FastAPI**, and connected to a **React** frontend.

---

## ⚙️ Tech Stack
- **Frontend:** React.js  
- **Backend:** FastAPI  
- **Machine Learning Model:** Random Forest Classifier  
- **Languages:** Python, JavaScript  
- **Accuracy:** 97.06%

---

## 🧠 Model Input Features
- Gender  
- Age  
- Hypertension  
- Heart Disease  
- Smoking History  
- BMI  
- HbA1c Level  
- Blood Glucose Level  

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/AdnanZamanNiloy/Diabetes-Prediction-Fastapi-React.git
cd Diabetes-Prediction-Fastapi-React
```
### 2️⃣ Backend Setup (FastAPI)
```
cd backend
python -m venv venv
source venv/bin/activate       # For Linux/Mac
venv\Scripts\activate          # For Windows
pip install -r requirements.txt
uvicorn app:app --reload
```
3️⃣ Frontend Setup (React)
```
cd ../frontend
npm install
npm start
```
<img width="1221" height="722" alt="image" src="https://github.com/user-attachments/assets/b24245a8-ff1b-4ba4-9cc5-24642b024bde" />
