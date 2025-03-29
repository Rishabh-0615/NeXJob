import React, { useState } from "react";
import axios from "axios";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

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
    <div className="w-full">
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-800/50 text-red-400 rounded-xl flex items-start">
          <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-800/50 text-green-400 rounded-xl flex items-start">
          <CheckCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <div className="mb-5">
        <label className="block text-neutral-300 font-medium mb-2">
          Upload Resume (PDF/DOC) *
        </label>
        <div className="relative group">
          <input
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            accept=".pdf,.doc,.docx"
            className="w-full text-sm text-neutral-400 
              file:mr-4 file:py-2 file:px-4 
              file:rounded-lg file:border-0 
              file:text-sm file:font-medium 
              file:bg-indigo-600/30 file:text-indigo-400 
              file:transition-colors file:duration-200
              file:cursor-pointer
              hover:file:bg-indigo-600/40
              focus:outline-none
              rounded-lg border border-neutral-700 py-2 px-2"
          />
          {resume && (
            <div className="mt-2 flex items-center text-sm text-green-400">
              <FileText size={14} className="mr-1" />
              Selected: {resume.name}
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-neutral-300 font-medium mb-2">
          Upload Cover Letter (Optional, PDF/DOC)
        </label>
        <div className="relative group">
          <input
            type="file"
            onChange={(e) => setCoverLetter(e.target.files[0])}
            accept=".pdf,.doc,.docx"
            className="w-full text-sm text-neutral-400 
              file:mr-4 file:py-2 file:px-4 
              file:rounded-lg file:border-0 
              file:text-sm file:font-medium 
              file:bg-indigo-600/30 file:text-indigo-400 
              file:transition-colors file:duration-200
              file:cursor-pointer
              hover:file:bg-indigo-600/40
              focus:outline-none
              rounded-lg border border-neutral-700 py-2 px-2"
          />
          {coverLetter && (
            <div className="mt-2 flex items-center text-sm text-green-400">
              <FileText size={14} className="mr-1" />
              Selected: {coverLetter.name}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handleApply}
        disabled={isApplying}
        className={`w-full flex justify-between items-center py-3 px-4 rounded-xl font-medium
          ${isApplying 
            ? "bg-gradient-to-r from-indigo-600/70 to-purple-600/70 text-white cursor-not-allowed" 
            : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500"
          } transition-all duration-200 group`}
      >
        <span className="flex items-center">
          {isApplying ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Applying...
            </>
          ) : (
            <>
              <Upload size={18} className="mr-2" />
              Apply Now
            </>
          )}
        </span>
        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-200">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>
    </div>
  );
};

export default ApplyButton;