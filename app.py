import streamlit as st
import requests

st.set_page_config(page_title="NeXJob Resume Expert", layout="wide")

st.markdown("<div class='main-header'>NeXJob ATS System</div>", unsafe_allow_html=True)

# Job Description Input
st.markdown("<div class='section-header'>Job Description</div>", unsafe_allow_html=True)
input_text = st.text_area("Enter job description here:", key="input", height=200)

# Resume Upload Section
st.markdown("<div class='section-header'>Upload Resume(s) (PDF)</div>", unsafe_allow_html=True)
uploaded_files = st.file_uploader("Upload one or multiple resumes", type=["pdf"], accept_multiple_files=True)

# Button to analyze resumes
col1, col2 = st.columns([1, 1])
with col1:
    analyze_button = st.button("Analyze Resume (For Job Seeker)")
with col2:
    bulk_analyze_button = st.button("Analyze & Rank Resumes (For Recruiters)")

# Process single resume for job seekers
if analyze_button and uploaded_files:
    file = uploaded_files[0]
    files = {"file": (file.name, file.getvalue(), "application/pdf")}
    data = {"description": input_text}

    response = requests.post("http://localhost:8000/analyze/", files=files, data=data)

    if response.status_code == 200:
        result = response.json()
        st.markdown(f"### Resume Feedback for {result['filename']}")
        st.markdown(result["resume_feedback"])
    else:
        st.error(f"Error processing {file.name}: {response.text}")

# Process bulk resumes for recruiters
if bulk_analyze_button and uploaded_files:
    files = [("files", (file.name, file.getvalue(), "application/pdf")) for file in uploaded_files]
    data = {"description": input_text}

    response = requests.post("http://localhost:8000/bulk-analyze/", files=files, data=data)

    if response.status_code == 200:
        results = response.json()["results"]
        st.markdown("## Ranked ATS Scores")
        for rank, entry in enumerate(results, start=1):
            st.markdown(f"### Rank {rank}: {entry['match_score']}% Match - {entry['filename']}")
            st.markdown(f"**Details:** {entry['details']}")
    else:
        st.error("Error processing resumes.")
