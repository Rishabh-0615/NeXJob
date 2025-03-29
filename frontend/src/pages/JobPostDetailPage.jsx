import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ApplyButton from "../components/ApplyButton";
import { ChevronLeft, MapPin, Briefcase, DollarSign } from "lucide-react";

const JobPostDetailPage = () => {
  const [jobPost, setJobPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/jobPost/getJob/${id}`);
        setJobPost(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching job post", error);
        setError(
          error.response?.data?.message || "Failed to load job details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobPost();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full relative z-10 backdrop-blur-sm backdrop-filter p-8">
          <div className="w-full h-8 bg-neutral-800 rounded animate-pulse mb-4"></div>
          <div className="w-full h-64 bg-neutral-800 rounded animate-pulse mb-4"></div>
          <div className="w-2/3 h-6 bg-neutral-800 rounded animate-pulse mb-2"></div>
          <div className="w-1/2 h-6 bg-neutral-800 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full relative z-10 backdrop-blur-sm backdrop-filter text-center p-8">
          <h2 className="text-xl font-bold text-red-400 mb-4">Error</h2>
          <p className="mb-6 text-neutral-300">{error}</p>
          <button 
            onClick={handleBack}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {jobPost && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full relative z-10 backdrop-blur-sm backdrop-filter">
          {/* Header section */}
          <div className="p-8 border-b border-neutral-800 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-10 rounded-bl-full"></div>
            
            <div className="flex justify-between items-center mb-6">
              <button 
                onClick={handleBack}
                className="text-indigo-400 hover:text-indigo-300 flex items-center group transition-colors duration-200"
              >
                <ChevronLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform duration-200" />
                <span>Back to Jobs</span>
              </button>
              <span className="bg-green-900/30 text-green-400 text-sm font-medium px-3 py-1 rounded-full border border-green-700/30">
                {jobPost.type || "Full-time"}
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mb-3">
              {jobPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-neutral-400 text-sm">
              <div className="flex items-center">
                <Briefcase size={16} className="mr-2 text-indigo-400" />
                <span>{jobPost.company?.name || "Company"}</span>
              </div>
              
              <div className="flex items-center">
                <MapPin size={16} className="mr-2 text-indigo-400" />
                <span>{jobPost.location.city}, {jobPost.location.country}</span>
              </div>
              
              {jobPost.salary && (
                <div className="flex items-center">
                  <DollarSign size={16} className="mr-2 text-indigo-400" />
                  <span>{jobPost.salary}</span>
                </div>
              )}
            </div>
          </div>

          {/* Content section */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3 text-neutral-200">Job Description</h2>
              <div className="text-neutral-400 whitespace-pre-line">
                {jobPost.description}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-3 text-neutral-200">Skills Required</h2>
              <div className="flex flex-wrap gap-2">
                {jobPost.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-indigo-900/30 text-indigo-400 text-sm font-medium px-3 py-1 rounded-full border border-indigo-700/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {jobPost.responsibilities && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3 text-neutral-200">Responsibilities</h2>
                <ul className="list-disc pl-5 text-neutral-400 space-y-2">
                  {Array.isArray(jobPost.responsibilities) ? 
                    jobPost.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    )) : 
                    <li>{jobPost.responsibilities}</li>
                  }
                </ul>
              </div>
            )}

            {jobPost.requirements && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-3 text-neutral-200">Requirements</h2>
                <ul className="list-disc pl-5 text-neutral-400 space-y-2">
                  {Array.isArray(jobPost.requirements) ? 
                    jobPost.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    )) : 
                    <li>{jobPost.requirements}</li>
                  }
                </ul>
              </div>
            )}

            {/* Application section */}
            <div className="mt-8 pt-6 border-t border-neutral-800">
              <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-indigo-800/30 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mb-6">
                  Ready to apply?
                </h2>
                <ApplyButton jobId={id} jobTitle={jobPost.title} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPostDetailPage;