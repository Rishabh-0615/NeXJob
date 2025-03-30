import React, { useState } from "react";
import axios from "axios";

const JobApplicationsList = ({ applications, onRowClick }) => {
  const [schedulingId, setSchedulingId] = useState(null);
  const [interviewLink, setInterviewLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!applications || applications.length === 0) {
    return (
      <div className="bg-gray-50 border rounded p-8 text-center">
        <p className="text-gray-500">No applications found.</p>
      </div>
    );
  }

  const getStatusBadgeClass = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    const statusClasses = {
      "Applied": "bg-blue-100 text-blue-800",
      "Shortlisted": "bg-yellow-100 text-yellow-800",
      "Interview": "bg-purple-100 text-purple-800",
      "Hired": "bg-green-100 text-green-800",
      "Rejected": "bg-red-100 text-red-800"
    };
    
    return `${baseClasses} ${statusClasses[status] || "bg-gray-100 text-gray-800"}`;
  };

  const handleScheduleInterview = async (applicationId, candidateId, jobId) => {
    setSchedulingId(applicationId);
    setLoading(true);
    setError("");
    setInterviewLink("");

    try {
      const response = await axios.post(
        "/api/interview/schedule-interview",
        {
          candidateId,
          jobId,
          applicationId
        },
        { withCredentials: true }
      );

      setInterviewLink(response.data.interviewLink);
      
      // Update application status locally
      const updatedApplications = applications.map(app => 
        app._id === applicationId ? {...app, status: "Interview"} : app
      );
      
      // If you have a state update function passed as prop, you could update the parent
      // onApplicationsUpdate(updatedApplications);
      
    } catch (error) {
      console.error("❌ Error scheduling interview:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to schedule interview.");
    }

    setLoading(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applicant
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Applied Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((app) => (
            <tr 
              key={app._id} 
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap" onClick={() => onRowClick(app._id)}>
                <div className="flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {app.applicant?.name || "N/A"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {app.applicant?.email || "N/A"}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap" onClick={() => onRowClick(app._id)}>
                <div className="text-sm text-gray-900">{app.job?.title || "Unknown Job"}</div>
                <div className="text-xs text-gray-500">{app.job?.company?.name || "Unknown Company"}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap" onClick={() => onRowClick(app._id)}>
                <div className="text-sm text-gray-900">
                  {new Date(app.appliedAt).toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(app.appliedAt).toLocaleTimeString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap" onClick={() => onRowClick(app._id)}>
                <span className={getStatusBadgeClass(app.status)}>
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {app.status === "Shortlisted" && (
                  <div>
                    <button
                      onClick={() => handleScheduleInterview(app._id, app.applicant?._id, app.job?._id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
                      disabled={loading && schedulingId === app._id}
                    >
                      {loading && schedulingId === app._id ? "Scheduling..." : "Schedule Interview"}
                    </button>
                    
                    {error && schedulingId === app._id && (
                      <p className="text-red-500 text-xs mt-1">{error}</p>
                    )}
                    
                    {interviewLink && schedulingId === app._id && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-700 mb-1">Interview Link:</p>
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={interviewLink}
                            readOnly
                            className="text-xs border rounded py-1 px-2 flex-grow mr-1"
                          />
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(interviewLink);
                              alert("Link copied to clipboard!");
                            }}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs py-1 px-2 rounded"
                          >
                            Copy
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {app.status === "Interview" && app.interviewLink && (
                  <div>
                    <a
                      href={app.interviewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm inline-block"
                    >
                      Join Interview
                    </a>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobApplicationsList;