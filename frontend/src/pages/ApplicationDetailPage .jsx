import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ChevronLeft, Eye, Download, PlusCircle, CheckCircle } from "lucide-react";

const ApplicationDetailPage = () => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/application/getapplications/${id}`);
        setApplication(response.data.application);
        setError(null);
      } catch (error) {
        console.error("Error fetching application", error);
        if (error.response?.status === 403) {
          setError("You are not authorized to view this application.");
        } else if (error.response?.status === 404) {
          setError("Application not found.");
        } else {
          setError("Failed to load application details. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const getStatusColor = (status) => {
    const colors = {
      "Applied": "bg-indigo-900/30 text-indigo-400 border-indigo-800/50",
      "Shortlisted": "bg-purple-900/30 text-purple-400 border-purple-800/50",
      "Interview": "bg-yellow-900/30 text-yellow-400 border-yellow-800/50",
      "Hired": "bg-green-900/30 text-green-400 border-green-800/50",
      "Rejected": "bg-red-900/30 text-red-400 border-red-800/50"
    };
    return colors[status] || "bg-neutral-900/30 text-neutral-400 border-neutral-800/50";
  };

  const handleGoBack = () => {
    navigate("/myapplication");
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
        
        <div className="animate-pulse text-center text-neutral-300">
          <div className="h-8 w-64 bg-neutral-800 rounded-lg mb-4 mx-auto"></div>
          <div className="h-4 w-32 bg-neutral-800 rounded-lg mb-2 mx-auto"></div>
          <div className="h-4 w-48 bg-neutral-800 rounded-lg mb-2 mx-auto"></div>
          <div className="h-4 w-40 bg-neutral-800 rounded-lg mx-auto"></div>
          <p className="mt-4 text-neutral-500">Loading application details...</p>
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
        
        <div className="bg-neutral-900 border border-red-800/50 rounded-2xl shadow-2xl overflow-hidden max-w-md w-full relative z-10 backdrop-blur-sm backdrop-filter">
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-400 mb-2">Error Loading Application</h2>
            <p className="text-neutral-400 mb-6">{error}</p>
            <button 
              onClick={handleGoBack}
              className="w-full py-3 px-4 border border-transparent rounded-xl font-medium text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60">
          <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-w-md w-full relative z-10 backdrop-blur-sm backdrop-filter">
          <div className="p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-800 flex items-center justify-center">
              <svg className="w-8 h-8 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No Application Found</h2>
            <p className="text-neutral-400 mb-6">The application you're looking for doesn't exist or has been removed.</p>
            <button 
              onClick={handleGoBack}
              className="w-full py-3 px-4 border border-transparent rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              Go Back to Applications
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex justify-center p-4 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-4xl w-full py-8 relative z-10">
        <button 
          onClick={handleGoBack}
          className="flex items-center text-indigo-400 hover:text-indigo-300 mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to My Applications
        </button>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm backdrop-filter">
          {/* Header section */}
          <div className="relative px-8 pt-10 pb-6 border-b border-neutral-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-10 rounded-bl-full"></div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-white">{application?.job?.title || "Job Application"}</h1>
                <p className="text-neutral-400 mt-1">
                  {application?.job?.company?.name || "Company"} • {application?.job?.location || "Location"}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                {application.status}
              </span>
            </div>
          </div>

          {/* Content section */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Application Details</h2>
                
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50">
                    <p className="text-sm font-medium text-neutral-400">Applied On</p>
                    <p className="mt-1 text-neutral-300">
                      {application.appliedAt ? format(new Date(application.appliedAt), "MMMM d, yyyy") : "N/A"}
                    </p>
                  </div>
                  
                  <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50">
                    <p className="text-sm font-medium text-neutral-400">Job Description</p>
                    <p className="mt-1 text-neutral-300 line-clamp-3">
                      {application?.job?.description || "No description available"}
                    </p>
                  </div>
                  
                  {application.status !== "Applied" && (
                    <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50">
                      <div className="flex items-center mb-2">
                        <div className={`w-2 h-2 rounded-full mr-2 ${application.status === "Rejected" ? "bg-red-500" : "bg-green-500"}`}></div>
                        <p className="text-sm font-medium text-neutral-300">Application Status</p>
                      </div>
                      <p className="text-sm text-neutral-400 pl-4">
                        Your application is currently <span className="font-medium text-neutral-200">{application.status}</span>
                        {application.status === "Shortlisted" && ". You might be contacted soon for an interview."}
                        {application.status === "Interview" && ". Prepare for your upcoming interview!"}
                        {application.status === "Hired" && ". Congratulations!"}
                        {application.status === "Rejected" && ". Thank you for your interest."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">My Documents</h2>
                
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50">
                    <p className="text-sm font-medium text-neutral-400 mb-3">My Resume</p>
                    <div className="flex flex-wrap gap-2">
                      <a 
                        href={application?.resume} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm font-medium text-neutral-300 hover:bg-neutral-700 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-2 text-indigo-400" />
                        View Resume
                      </a>
                      <a 
                        href={application?.resume} 
                        download
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-sm font-medium text-white hover:from-indigo-500 hover:to-purple-500 transition-colors"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </div>
                  </div>
                  
                  {application?.coverLetter && (
                    <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50">
                      <p className="text-sm font-medium text-neutral-400 mb-3">My Cover Letter</p>
                      <div className="flex flex-wrap gap-2">
                        <a 
                          href={application.coverLetter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm font-medium text-neutral-300 hover:bg-neutral-700 transition-colors"
                        >
                          <Eye className="w-4 h-4 mr-2 text-indigo-400" />
                          View Cover Letter
                        </a>
                        <a 
                          href={application.coverLetter} 
                          download
                          className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-sm font-medium text-white hover:from-indigo-500 hover:to-purple-500 transition-colors"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-800">
                  <h3 className="text-md font-semibold text-white mb-4">Application Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-900/50 text-indigo-400 border border-indigo-800/50">
                          <PlusCircle className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-neutral-200">Applied</p>
                        <p className="text-xs text-neutral-500">
                          {application.appliedAt ? format(new Date(application.appliedAt), "MMM d, yyyy") : "N/A"}
                        </p>
                      </div>
                    </div>

                    {application.status !== "Applied" && (
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            application.status === "Rejected" 
                              ? "bg-red-900/50 text-red-400 border border-red-800/50" 
                              : "bg-green-900/50 text-green-400 border border-green-800/50"
                          }`}>
                            <CheckCircle className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-neutral-200">Status Updated to {application.status}</p>
                          <p className="text-xs text-neutral-500">
                            {application.updatedAt ? format(new Date(application.updatedAt), "MMM d, yyyy") : "N/A"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailPage;