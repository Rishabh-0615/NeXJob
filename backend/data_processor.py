import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json
import re
import os

# Function to clean and normalize the data
def clean_job_data(df):
    # Make a copy to avoid modifying the original
    cleaned_df = df.copy()
    
    # Handle missing values
    cleaned_df = cleaned_df.fillna({
        'job_title': 'Not Specified',
        'company': 'Not Specified',
        'location': 'Not Specified',
        'experience_required': 'Not Specified',
        'salary': 'Not Disclosed',
        'job_description': '',
        'industry': 'Other'
    })
    
    # Standardize locations (group similar locations)
    location_mapping = {
        'Bengaluru': 'Bangalore',
        'Bengaluru/Bangalore': 'Bangalore',
        'Gurugram': 'Delhi NCR',
        'Gurgaon': 'Delhi NCR',
        'Noida': 'Delhi NCR',
        'New Delhi': 'Delhi NCR'
        # Add more mappings as needed
    }
    
    for old_loc, new_loc in location_mapping.items():
        cleaned_df['location'] = cleaned_df['location'].str.replace(old_loc, new_loc, regex=False)
    
    # Parse salary information
    cleaned_df['salary_min'], cleaned_df['salary_max'] = zip(*cleaned_df['salary'].apply(parse_indian_salary))
    
    # Parse experience information
    cleaned_df['min_experience'] = cleaned_df['experience_required'].apply(extract_min_exp)
    
    # Standardize job titles
    cleaned_df['standardized_title'] = cleaned_df['job_title'].apply(standardize_job_title)
    
    # Convert posting_date to datetime if it's not already
    if not pd.api.types.is_datetime64_any_dtype(cleaned_df['posting_date']):
        cleaned_df['posting_date'] = pd.to_datetime(cleaned_df['posting_date'], errors='coerce')
    
    return cleaned_df

# Helper functions
def parse_indian_salary(salary_text):
    """Parse Indian salary formats (LPA, CTC, etc.)"""
    if not isinstance(salary_text, str):
        return 0.0, 0.0
        
    try:
        # Remove "LPA", "CTC", etc. and extract numbers
        salary_clean = salary_text.replace("LPA", "").replace("CTC", "").strip()
        
        if "-" in salary_clean:
            min_val, max_val = salary_clean.split("-")
            return float(min_val.strip()), float(max_val.strip())
        elif "to" in salary_clean.lower():
            min_val, max_val = salary_clean.lower().split("to")
            return float(min_val.strip()), float(max_val.strip())
        elif "up to" in salary_clean.lower():
            max_val = salary_clean.lower().replace("up to", "").strip()
            return 0.0, float(max_val)
        else:
            val = float(salary_clean)
            return val, val
    except:
        # Return zeros for unparseable salaries
        return 0.0, 0.0

def extract_min_exp(exp_text):
    """Extract minimum experience from text"""
    if not isinstance(exp_text, str):
        return 0.0
        
    try:
        # Try to find patterns like "3-5 years", "3+ years", etc.
        if "-" in exp_text:
            min_val = exp_text.split("-")[0]
            return float(re.findall(r'\d+', min_val)[0])
        elif "+" in exp_text:
            return float(re.findall(r'\d+', exp_text)[0])
        else:
            # Try to extract any numbers
            numbers = re.findall(r'\d+', exp_text)
            if numbers:
                return float(numbers[0])
            return 0.0
    except:
        return 0.0

def standardize_job_title(title):
    """Standardize job titles to group similar roles"""
    title = title.lower()
    
    # Map common variations
    if any(term in title for term in ['software engineer', 'software developer', 'programmer']):
        return 'Software Engineer'
    elif any(term in title for term in ['data scientist', 'machine learning', 'ml engineer']):
        return 'Data Scientist'
    elif any(term in title for term in ['full stack', 'fullstack']):
        return 'Full Stack Developer'
    elif any(term in title for term in ['frontend', 'front end', 'front-end']):
        return 'Frontend Developer'
    elif any(term in title for term in ['backend', 'back end', 'back-end']):
        return 'Backend Developer'
    elif any(term in title for term in ['devops', 'dev ops', 'site reliability']):
        return 'DevOps Engineer'
    elif any(term in title for term in ['product manager']):
        return 'Product Manager'
    # Add more mappings as needed
    
    # Return original title with proper capitalization if no match
    return ' '.join(word.capitalize() for word in title.split())

# Analyze job data to extract trends
def analyze_job_data(df):
    # Location-based analysis
    location_demand = df.groupby('location').size().reset_index(name='job_count')
    location_demand = location_demand.sort_values('job_count', ascending=False)
    
    # Role demand analysis
    role_demand = df.groupby('standardized_title').size().reset_index(name='count')
    role_demand = role_demand.sort_values('count', ascending=False).head(10)
    
    # Salary analysis by location
    salary_by_location = df.groupby('location').agg({
        'salary_min': 'mean',
        'salary_max': 'mean'
    }).reset_index()
    salary_by_location['avg_salary'] = (salary_by_location['salary_min'] + salary_by_location['salary_max']) / 2
    
    # Skill demand analysis
    # Extract skills from 'skills' column (assuming it's a list or string)
    if df['skills'].dtype == 'object':
        # If skills is stored as string, parse it
        if isinstance(df['skills'].iloc[0], str):
            try:
                df['skills_list'] = df['skills'].apply(lambda x: json.loads(x) if x else [])
            except:
                df['skills_list'] = df['skills'].apply(lambda x: x.split(',') if x else [])
        else:
            # If it's already a list
            df['skills_list'] = df['skills']
    
    all_skills = []
    for skill_list in df['skills_list']:
        if isinstance(skill_list, list):
            all_skills.extend([s.strip() for s in skill_list if s])
    
    skill_counts = pd.Series(all_skills).value_counts().reset_index()
    skill_counts.columns = ['skill', 'count']
    
    # Experience distribution
    experience_distribution = df.groupby(pd.cut(df['min_experience'], 
                                          bins=[0, 1, 3, 5, 8, 100],
                                          labels=['Fresher', '1-3 Years', '3-5 Years', '5-8 Years', '8+ Years']
                                         )).size().reset_index()
    experience_distribution.columns = ['experience_range', 'count']
    
    # Convert the categorical to string for JSON serialization
    experience_distribution['experience_range'] = experience_distribution['experience_range'].astype(str)
    
    # Industry distribution
    industry_distribution = df.groupby('industry').size().reset_index(name='count')
    industry_distribution = industry_distribution.sort_values('count', ascending=False)
    
    # Package results
    analysis_results = {
        'locationDemand': location_demand.to_dict('records'),
        'roleDemand': role_demand.to_dict('records'),
        'salaryByLocation': salary_by_location.to_dict('records'),
        'skillDemand': skill_counts.head(20).to_dict('records'),
        'experienceDistribution': experience_distribution.to_dict('records'),
        'industryDistribution': industry_distribution.to_dict('records'),
        'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'totalJobs': len(df)
    }
    
    return analysis_results

# Main processing function
def process_data():
    # Get the latest data file
    data_dir = 'data'
    data_files = [f for f in os.listdir(data_dir) if f.startswith('raw_job_data_') and f.endswith('.csv')]
    if not data_files:
        print("No data files found!")
        return None
    
    latest_file = max(data_files)
    file_path = os.path.join(data_dir, latest_file)
    
    # Read data
    df = pd.read_csv(file_path)
    
    # Clean data
    cleaned_df = clean_job_data(df)
    
    # Remove outdated listings (older than 60 days)
    cutoff_date = datetime.now() - timedelta(days=60)
    current_data = cleaned_df[cleaned_df['posting_date'] >= cutoff_date]
    
    # Save processed data
    today = datetime.now().strftime('%Y-%m-%d')
    processed_file = f'data/processed_job_data_{today}.csv'
    current_data.to_csv(processed_file, index=False)
    
    # Analyze trends
    analysis_results = analyze_job_data(current_data)
    
    # Save analysis results as JSON
    with open(f'data/job_analysis_{today}.json', 'w') as f:
        json.dump(analysis_results, f, indent=2)
    
    print(f"Processed {len(current_data)} job listings")
    print(f"Analysis results saved to data/job_analysis_{today}.json")
    
    return analysis_results

if __name__ == "__main__":
    process_data()