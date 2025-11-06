import React, { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [formData, setFormData] = useState({
    gender: "Female",
    age: "",
    hypertension: 0,
    heart_disease: 0,
    smoking_history: "never",
    bmi: "",
    HbA1c_level: "",
    blood_glucose_level: "",
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post("https://diabetes-prediction-fasaapi-react.onrender.com/predict", formData);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      alert("⚠️ Error connecting to backend. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <h1 className="title">🩺 Predict Your Diabetes Risk</h1>

        <form onSubmit={handleSubmit} className="form-grid">
          {/* Gender */}
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </select>
          </div>

          {/* Age */}
          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </div>

          {/* Hypertension */}
          <div className="form-group">
            <label>Hypertension</label>
            <select name="hypertension" value={formData.hypertension} onChange={handleChange}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Heart Disease */}
          <div className="form-group">
            <label>Heart Disease</label>
            <select name="heart_disease" value={formData.heart_disease} onChange={handleChange}>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          {/* Smoking History */}
          <div className="form-group">
            <label>Smoking History</label>
            <select
              name="smoking_history"
              value={formData.smoking_history}
              onChange={handleChange}
            >
              <option value="never">Never</option>
              <option value="former">Former</option>
              <option value="current">Current</option>
              <option value="ever">Ever</option>
              <option value="not current">Not current</option>
            </select>
          </div>

          {/* BMI */}
          <div className="form-group">
            <label>BMI</label>
            <input type="number" name="bmi" value={formData.bmi} onChange={handleChange} required />
          </div>

          {/* HbA1c Level */}
          <div className="form-group">
            <label>HbA1c Level</label>
            <input
              type="number"
              step="0.1"
              name="HbA1c_level"
              value={formData.HbA1c_level}
              onChange={handleChange}
              required
            />
          </div>

          {/* Glucose Level */}
          <div className="form-group">
            <label>Blood Glucose Level</label>
            <input
              type="number"
              name="blood_glucose_level"
              value={formData.blood_glucose_level}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group full-width">
            <button type="submit" disabled={loading}>
              {loading ? "Predicting..." : "Predict Diabetes"}
            </button>
          </div>
        </form>

        {result && (
          <div
            className={`result-box ${
              result.prediction === 1 ? "result-positive" : "result-negative"
            }`}
          >
            <h2>
              {result.prediction === 1 ? "⚠️ Diabetic" : "✅ Non-Diabetic"}
            </h2>
            <p>
              Probability of Diabetes:{" "}
              <strong>{(result.probability_of_diabetes * 100).toFixed(2)}%</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
