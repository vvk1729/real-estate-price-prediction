# real-estate-price-prediction
# 🏠 Real Estate Price Prediction - Bangalore

A machine learning web application built with **Flask** that predicts house prices in Bangalore based on location, square footage, number of BHK, and bathrooms.

---

## 🚀 Features

- Predicts house price based on user inputs
- Trained using real-world housing data
- Simple and interactive web interface using HTML/CSS/JavaScript
- Built using Flask (backend) and scikit-learn (model)

---

## 🛠️ Tech Stack

- **Backend:** Python, Flask
- **Frontend:** HTML, CSS, JavaScript
- **Machine Learning:** scikit-learn, pandas, numpy
- **Deployment Ready:** Can be hosted on platforms like Heroku, Render, or Railway

---

## 📁 Project Structure
├── app.py # Main Flask backend
├── templates/
│ └── app.html # Frontend HTML page
├── static/
│ ├── css/
│ │ └── app.css # CSS for styling
│ └── js/
│ └── app.js # JavaScript for interactivity
│ ── banglore_home_prices_model.pickle # Trained ML model
├── real_estate_model.ipynb # Notebook for model training
├── columns.json # Metadata for features
├── requirements.txt # Python dependencies
└── README.md
Install dependencies:
pip install -r requirements.txt


Run the Flask app:
python app.py

Open in browser:
http://127.0.0.1:5000
