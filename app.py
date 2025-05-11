from flask import Flask, request, jsonify, render_template
import pickle
import json
import numpy as np

app = Flask(__name__, static_folder='static', template_folder='templates')

# Global variables to hold data
__locations = None
__data_columns = None
__model = None

# Load model and data columns
def load_saved_artifacts():
    global __data_columns
    global __locations
    global __model

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[3:]  # Assuming location columns start from index 3

    with open("./artifacts/banglore_home_prices_model.pickle", "rb") as f:
        __model = pickle.load(f)

# Prediction function
def get_estimated_price(location, sqft, bhk, bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except ValueError:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)

# API route: predict home price
@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    data = request.get_json()
    try:
        total_sqft = float(data['total_sqft'])
        location = data['location']
        bhk = int(data['bhk'])
        bath = int(data['bath'])
    except (KeyError, TypeError, ValueError):
        return jsonify({"error": "Invalid input"}), 400

    estimated_price = get_estimated_price(location, total_sqft, bhk, bath)

    return jsonify({
        'estimated_price': estimated_price
    })

# API route: get location names
@app.route('/get_location_names', methods=['GET'])
def get_location_names_route():
    response = jsonify({
        'locations': __locations
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Route for frontend (app.html)
@app.route('/')
def index():
     return render_template('app.html')

# Run the server
if __name__ == "__main__":
    print("Loading saved artifacts and starting server...")
    load_saved_artifacts()
    app.run(debug=True)
