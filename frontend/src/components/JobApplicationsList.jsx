import React, { useState } from "react";
import { User, Briefcase, Calendar, Clock } from "lucide-react";
import axios from "axios";

const JobApplicationsList = ({ applications, onRowClick }) => {
  const [schedulingId, setSchedulingId] = useState(null);
  const [interviewLink, setInterviewLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!applications || applications.length === 0) {
    return (
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-8 text-center">
        <p className="text-neutral-400">No applications found.</p>
      </div>
    );
  }

  const getStatusBadgeClass = (status) => {
    const baseClasses =
      "px-3 py-1 inline-flex text-xs font-medium rounded-full border";
    const statusClasses = {
      Applied: "bg-indigo-900/50 text-indigo-300 border-indigo-800/50",
      Shortlisted: "bg-blue-900/50 text-blue-300 border-blue-800/50",
      Interview: "bg-cyan-900/50 text-cyan-300 border-cyan-800/50",
      Hired: "bg-green-900/50 text-green-300 border-green-800/50",
      Rejected: "bg-red-900/50 text-red-300 border-red-800/50",
    };

    return `${baseClasses} ${
      statusClasses[status] ||
      "bg-neutral-800 text-neutral-300 border-neutral-700"
    }`;
  };

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
          applicationId,
        },
        { withCredentials: true }
      );

      setInterviewLink(response.data.interviewLink);

      // Update application status locally
      const updatedApplications = applications.map((app) =>
        app._id === applicationId ? { ...app, status: "Interview" } : app
      );

      // If you have a state update function passed as prop, you could update the parent
      // onApplicationsUpdate(updatedApplications);
    } catch (error) {
      console.error(
        "❌ Error scheduling interview:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.error || "Failed to schedule interview.");
    }

    setLoading(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-700">
        <thead className="bg-neutral-800">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
            >
              Applicant
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
            >
              Job
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
            >
              Applied Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-700">
          {applications.map((app) => (
            <tr
              key={app._id}
              onClick={() => onRowClick(app._id)}
              className="hover:bg-neutral-800/70 cursor-pointer transition-colors duration-150"
            >
              <td
                className="px-6 py-4 whitespace-nowrap"
                onClick={() => onRowClick(app._id)}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-white">
                      {app.applicant?.name || "N/A"}
                    </div>
                    <div className="text-sm text-neutral-400">
                      {app.applicant?.email || "N/A"}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-start">
                  <Briefcase
                    size={16}
                    className="text-neutral-500 mr-2 mt-0.5"
                  />
                  <div>
                    <div className="text-sm text-white">
                      {app.job?.title || "Unknown Job"}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {app.job?.company?.name || "Unknown Company"}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-start">
                  <Calendar
                    size={16}
                    className="text-neutral-500 mr-2 mt-0.5"
                  />
                  <div>
                    <div className="text-sm text-white">
                      {formatDate(app.appliedAt)}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {formatTime(app.appliedAt)}
                    </div>
                  </div>
                </div>
              </td>
              <td
                className="px-6 py-4 whitespace-nowrap"
                onClick={() => onRowClick(app._id)}
              >
                <span className={getStatusBadgeClass(app.status)}>
                  {app.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {app.status === "Shortlisted" && (
                  <div>
                    <button
                      onClick={() =>
                        handleScheduleInterview(
                          app._id,
                          app.applicant?._id,
                          app.job?._id
                        )
                      }
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm"
                      disabled={loading && schedulingId === app._id}
                    >
                      {loading && schedulingId === app._id
                        ? "Scheduling..."
                        : "Schedule Interview"}
                    </button>

                    {error && schedulingId === app._id && (
                      <p className="text-red-500 text-xs mt-1">{error}</p>
                    )}

                    {interviewLink && schedulingId === app._id && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-700 mb-1">
                          Interview Link:
                        </p>
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
