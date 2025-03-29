import React, { useState, useEffect } from "react";
import axios from "axios";

const RecruiterScheduleInterview = () => {
  const [candidateId, setCandidateId] = useState("");
  const [jobId, setJobId] = useState("");
  const [interviewLink, setInterviewLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recruiterId, setRecruiterId] = useState(""); // Store recruiter ID

  // Fetch logged-in recruiter ID on mount (optional)
  

  const handleSchedule = async () => {
    setLoading(true);
    setError("");
    setInterviewLink("");

    try {
      const response = await axios.post(
        `/api/interview/schedule-interview`,
         
        { withCredentials: true } // Ensure cookies are sent
      );

      setInterviewLink(response.data.interviewLink);
      alert(`✅ Interview Scheduled! Share this link: ${response.data.interviewLink}`);
    } catch (error) {
      console.error("❌ Error scheduling interview:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to schedule interview.");
    }

    setLoading(false);
  };

  return (
    <div className="schedule-interview">
      <h2>📅 Schedule an Interview</h2>

      {error && <p className="error">⚠️ {error}</p>}

      <button onClick={handleSchedule} disabled={loading}>
        {loading ? "Scheduling..." : "Schedule Interview"}
      </button>

      {interviewLink && (
        <p>
          🎥 Interview Link: <a href={interviewLink} target="_blank" rel="noopener noreferrer">{interviewLink}</a>
        </p>
      )}
    </div>
  );
};

export default RecruiterScheduleInterview;
