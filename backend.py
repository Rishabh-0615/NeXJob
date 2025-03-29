from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import io
import base64
import time
import re
import pdf2image
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = FastAPI()

# CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to restrict access
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AI Prompt for ATS
INPUT_PROMPT = """
You are an ATS scanner with expertise in recruitment.
Evaluate the resume against the job description and provide:
1. Match Score (format: "Match Score: XX%").
2. Missing keywords.
3. Strengths & Weaknesses.
4. Final thoughts.
"""

class JobDescription(BaseModel):
    description: str

def process_pdf(uploaded_file):
    """Converts PDF to a compressed image."""
    images = pdf2image.convert_from_bytes(uploaded_file)
    first_page = images[0]
    img_byte_arr = io.BytesIO()
    first_page.save(img_byte_arr, format='JPEG', quality=50)  # Compress image
    return {
        "mime_type": "image/jpeg",
        "data": base64.b64encode(img_byte_arr.getvalue()).decode()
    }

def get_gemini_response(job_description, pdf_content, mode, max_retries=5):
    """Fetches response from Gemini API with retry mechanism."""
    model = genai.GenerativeModel('gemini-1.5-pro')
    retry_delay = 2  # Initial delay in seconds

    for attempt in range(max_retries):
        try:
            input_prompt = INPUT_PROMPT
            if mode == "job_seeker":
                input_prompt += "\nProvide resume improvement suggestions."
            else:
                input_prompt += "\nProvide ATS score, missing keywords, and final thoughts."

            response = model.generate_content([input_prompt, job_description, pdf_content])
            return response.text
        except Exception as e:
            if "429" in str(e) and attempt < max_retries - 1:  # Rate limit handling
                time.sleep(retry_delay)
                retry_delay *= 2
            else:
                return f"Error: {str(e)}"
    return "Error: Unexpected failure after retries."

@app.post("/analyze/")
async def analyze_resume(description: str = Form(...), file: UploadFile = File(...)):
    """Processes a single resume and provides feedback."""
    try:
        pdf_content = process_pdf(await file.read())
        response = get_gemini_response(description, pdf_content, "job_seeker")
        return {"filename": file.filename, "resume_feedback": response}
    except Exception as e:
        return {"error": str(e)}

@app.post("/bulk-analyze/")
async def bulk_analyze(description: str = Form(...), files: list[UploadFile] = File(...)):
    """Processes multiple resumes for recruiters and ranks them."""
    results = []
    for file in files:
        pdf_content = process_pdf(await file.read())
        response = get_gemini_response(description, pdf_content, "recruiter")

        match = re.search(r'(\d+)%', response)
        match_score = int(match.group(1)) if match else 0
        details = response.replace(match.group(0), "").strip() if match else response

        results.append({"filename": file.filename, "match_score": match_score, "details": details})

    return {"results": sorted(results, key=lambda x: x["match_score"], reverse=True)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
