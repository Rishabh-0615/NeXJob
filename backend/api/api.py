from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime
import pandas as pd

app = Flask(__name__)
CORS(app) 
 # Enable CORS for React frontend
 

# Simulated Data Processor Function
def process_data():
    return {
        "locationDemand": [
            {"location": "Bangalore", "job_count": 200},
            {"location": "Mumbai", "job_count": 150},
            {"location": "Delhi NCR", "job_count": 100}
        ],
        "salaryByLocation": [
            {"location": "Bangalore", "avg_salary": 12},
            {"location": "Mumbai", "avg_salary": 10}
        ],
        "roleDemand": [
            {"standardized_title": "Software Engineer", "count": 300},
            {"standardized_title": "Data Scientist", "count": 100}
        ],
        "skillDemand": [
            {"skill": "Python", "count": 200},
            {"skill": "React", "count": 150}
        ],
        "experienceDistribution": [
            {"experience_range": "0-2 years", "count": 100},
            {"experience_range": "3-5 years", "count": 120}
        ],
        "industryDistribution": [
            {"industry": "IT Services", "count": 200},
            {"industry": "Banking", "count": 100}
        ],
        "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        "totalJobs": 500
    }

@app.route('/api/job-market-data', methods=['GET'])
def get_job_market_data():
    return jsonify(process_data())

@app.route('/api/refresh-data', methods=['POST'])
def refresh_data():
    return jsonify({"message": "Data refreshed successfully"})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
