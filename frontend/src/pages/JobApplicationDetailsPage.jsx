import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getJobApplicationById } from "../services/api";
import { JobApplicationContext } from "../context/JobApplicationContext";
import ResumeViewer from "../components/ResumeViewer";
import StatusUpdateModal from "../components/StatusUpdateModal";
import ApplicantInfo from "../components/ApplicantInfo";
import JobInfo from "../components/jobInfo";
import { ChevronLeft } from "lucide-react";

const JobApplicationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateStatus } = useContext(JobApplicationContext);
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchApplication() {
      try {
        const data = await getJobApplicationById(id);
        setApplication(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching application", error);
        setError("Failed to load application details. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      fetchApplication();
    }
  }, [id]);

  const handleStatusUpdate = async (newStatus) => {
    if (!updateStatus) {
      console.error("updateStatus function is undefined!");
      return;
    }
  
    const result = await updateStatus(application._id, newStatus);
    
    if (result.success) {
      setApplication(prev => prev ? { ...prev, status: newStatus } : prev);
      setShowModal(false);
    } else {
      alert(`Failed to update status: ${result.error}`);
    }
  };
  
  const getStatusBadgeClass = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-semibold";
    const statusClasses = {
      "Applied": "bg-indigo-900/20 text-indigo-400 border border-indigo-800/50",
      "Shortlisted": "bg-yellow-900/20 text-yellow-400 border border-yellow-800/50",
      "Interview": "bg-purple-900/20 text-purple-400 border border-purple-800/50",
      "Hired": "bg-green-900/20 text-green-400 border border-green-800/50",
      "Rejected": "bg-red-900/20 text-red-400 border border-red-800/50"
    };
    
    return `${baseClasses} ${statusClasses[status] || "bg-neutral-900/20 text-neutral-400 border border-neutral-800/50"}`;
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="bg-red-900/20 border border-red-800/50 text-red-400 px-6 py-4 rounded-xl max-w-md w-full relative z-10 backdrop-blur-sm backdrop-filter">
        <strong className="font-bold">Error! </strong>
        <span className="block sm:inline">{error}</span>
        <button 
          onClick={() => navigate('/applications')}
          className="mt-4 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-200"
        >
          Back to Applications
        </button>
      </div>
    </div>
  );

  if (!application) return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-600 rounded-full filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-w-md w-full relative z-10 backdrop-blur-sm backdrop-filter p-8 text-center">
        <p className="text-xl text-neutral-300 mb-4">Application not found</p>
        <button 
          onClick={() => navigate('/applications')}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-200"
        >
          Back to Applications
        </button>
      </div>
    </div>
  );

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
      
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full relative z-10 backdrop-blur-sm backdrop-filter my-8">
        <div className="relative px-8 pt-10 pb-6 border-b border-neutral-800">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-10 rounded-bl-full"></div>
          
          <button 
            onClick={() => navigate('/applications')}
            className="mb-4 flex items-center text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
          >
            <ChevronLeft size={18} className="mr-1" />
            Back to Applications
          </button>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
                Application Details
              </h1>
              <p className="text-neutral-400 text-sm mt-2">
                Applied: {new Date(application.appliedAt).toLocaleDateString()} at {new Date(application.appliedAt).toLocaleTimeString()}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center">
              <span className={getStatusBadgeClass(application.status)}>
                {application.status}
              </span>
              <button 
                onClick={() => setShowModal(true)} 
                className="ml-4 px-4 py-2 border border-transparent rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-200"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700">
            <ApplicantInfo applicant={application.applicant} />
          </div>
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700">
            <JobInfo job={application.job} />
          </div>
        </div>

        <div className="p-6 border-t border-neutral-800">
          <h2 className="text-xl font-semibold mb-4 text-white">Resume</h2>
          <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700">
            <ResumeViewer resumeUrl={application.resume} />
          </div>
        </div>

        {application.coverLetter && (
          <div className="p-6 border-t border-neutral-800">
            <h2 className="text-xl font-semibold mb-4 text-white">Cover Letter</h2>
            <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700">
              <p className="whitespace-pre-line text-neutral-300">{application.coverLetter}</p>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <StatusUpdateModal
          applicationId={application._id}
          currentStatus={application.status}
          onUpdate={handleStatusUpdate}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default JobApplicationDetailsPage;