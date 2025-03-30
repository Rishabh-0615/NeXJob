from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from datetime import datetime
import pandas as pd
from data_processor import process_data

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/job-market-data', methods=['GET'])
def get_job_market_data():
    timeframe = request.args.get('timeframe', '30days')
    location = request.args.get('location', 'All India')
    
    # In a real implementation, you'd filter by timeframe and location
    # For now, we'll use the latest analysis results
    
    data_dir = 'data'
    analysis_files = [f for f in os.listdir(data_dir) if f.startswith('job_analysis_') and f.endswith('.json')]
    
    if not analysis_files:
        # If no analysis file exists, run the processing pipeline
        analysis_results = process_data()
        if not analysis_results:
            return jsonify({"error": "No data available"}), 404
    else:
        # Use the latest analysis file
        latest_file = max(analysis_files)
        file_path = os.path.join(data_dir, latest_file)
        
        with open(file_path, 'r') as f:
            analysis_results = json.load(f)
    
    # Filter by location if specified
    if location != 'All India':
        # Filter location-specific data
        # This is a simplified example - you'd do more complex filtering in a real app
        if 'locationDemand' in analysis_results:
            analysis_results['locationDemand'] = [loc for loc in analysis_results['locationDemand'] 
                                                if loc['location'] == location]
        
        if 'salaryByLocation' in analysis_results:
            analysis_results['salaryByLocation'] = [loc for loc in analysis_results['salaryByLocation'] 
                                                  if loc['location'] == location]
    
    return jsonify(analysis_results)

@app.route('/api/refresh-data', methods=['POST'])
def refresh_data():
    # This endpoint triggers a data refresh
    # In a production system, you'd use authentication here
    
    try:
        # Process the data
        analysis_results = process_data()
        if not analysis_results:
            return jsonify({"error": "Data processing failed"}), 500
        
        return jsonify({"message": "Data refreshed successfully", 
                       "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S')})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Make sure the data directory exists
    if not os.path.exists('data'):
        os.makedirs('data')
    
    app.run(debug=True, port=5001)