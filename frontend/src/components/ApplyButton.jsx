import React, { useState } from "react";
import axios from "axios";

const ApplyButton = ({ jobId }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleApply = async () => {
    setError("");
    setSuccess("");

    if (!resume) {
      setError("Resume is required.");
      return;
    }

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("resume", resume);
    if (coverLetter) formData.append("coverLetter", coverLetter);

    try {
      setIsApplying(true);
      const response = await axios.post("/api/application/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccess(response.data.message);
    } catch (error) {
      console.error("Error applying for job", error);
      setError(error.response?.data?.message || "Failed to apply for job.");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <label>Upload Resume (PDF/DOC)</label>
      <input
        type="file"
        onChange={(e) => setResume(e.target.files[0])}
        accept=".pdf,.doc,.docx"
      />

      <label>Upload Cover Letter (Optional, PDF/DOC)</label>
      <input
        type="file"
        onChange={(e) => setCoverLetter(e.target.files[0])}
        accept=".pdf,.doc,.docx"
      />

      <button onClick={handleApply} disabled={isApplying}>
        {isApplying ? "Applying..." : "Apply Now"}
      </button>
    </div>
  );
};

export default ApplyButton;
