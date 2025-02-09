from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
import os

app = Flask(_name_)
CORS(app)  # Enable cross-origin requests
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "your_secret_key")
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Database connection
client = MongoClient("mongodb://localhost:27017/")
db = client["umi_database"]
users_collection = db["users"]
medical_history_collection = db["medical_history"]
consultants_collection = db["consultants"]

# User Registration Route
@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    if password != confirm_password:
        return jsonify({"msg": "Passwords don't match!"}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"msg": "User already exists!"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    user = {
        "username": username,
        "email": email,
        "password": hashed_password
    }

    users_collection.insert_one(user)
    return jsonify({"msg": "Registration successful!"}), 201


# User Login Route
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({"email": email})
    if not user:
        return jsonify({"msg": "User does not exist!"}), 400

    if not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"msg": "Invalid credentials!"}), 400

    token = jwt.create_access_token(identity=str(user["_id"]))
    return jsonify({"token": token}), 200


# Get User Profile
@app.route('/api/profile/<user_id>', methods=['GET'])
def get_profile(user_id):
    user = users_collection.find_one({"_id": user_id})
    if not user:
        return jsonify({"msg": "User not found!"}), 404
    return jsonify({
        "username": user["username"],
        "email": user["email"],
        "contact": user.get("contact", "Not provided")
    })


# Update User Profile
@app.route('/api/profile/<user_id>', methods=['PUT'])
def update_profile(user_id):
    data = request.get_json()
    updated_data = {
        "username": data.get('username'),
        "email": data.get('email'),
        "contact": data.get('contact')
    }
    users_collection.update_one({"_id": user_id}, {"$set": updated_data})
    return jsonify({"msg": "Profile updated successfully!"})


# Get Medical History
@app.route('/api/medical-history/<user_id>', methods=['GET'])
def get_medical_history(user_id):
    history = medical_history_collection.find_one({"user_id": user_id})
    if not history:
        return jsonify({"msg": "Medical history not found!"}), 404
    return jsonify(history)


# Update Medical History
@app.route('/api/medical-history/<user_id>', methods=['PUT'])
def update_medical_history(user_id):
    data = request.get_json()
    medical_history = {
        "illnesses": data.get('illnesses'),
        "prescriptions": data.get('prescriptions'),
        "allergies": data.get('allergies'),
        "vaccinations": data.get('vaccinations')
    }
    medical_history_collection.update_one({"user_id": user_id}, {"$set": medical_history})
    return jsonify({"msg": "Medical history updated!"})


# Get Consultants
@app.route('/api/consultants', methods=['GET'])
def get_consultants():
    consultants = consultants_collection.find()
    consultants_list = []
    for consultant in consultants:
        consultants_list.append({
            "name": consultant["name"],
            "specialization": consultant["specialization"],
            "contact": consultant["contact"]
        })
    return jsonify(consultants_list)


if _name_ == '_main_':
    app.run(debug=True)