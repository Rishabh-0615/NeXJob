import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const RecruiterInterviewDashboard = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "scheduled", "completed"

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get("/api/interview/recruiter-interviews", {
          withCredentials: true
        });
        setInterviews(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching interviews:", err);
        setError("Failed to load interviews. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchInterviews();
  }, []);

  const filteredInterviews = interviews.filter(interview => {
    if (filter === "all") return true;
    return interview.status.toLowerCase() === filter;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return <div className="p-8 text-center">Loading interviews...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="interview-dashboard p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Interview Management</h1>
        <div className="filter-controls">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Interviews</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {filteredInterviews.length === 0 ? (
        <div className="bg-gray-50 border rounded p-8 text-center">
          <p className="text-gray-500">No interviews found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Job Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scheduled Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInterviews.map((interview) => (
                <tr key={interview._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {interview.candidateId?.name || "Unknown Candidate"}
                    </div>
                    <div className="text-sm text-gray-500">
                      {interview.candidateId?.email || "No email"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {interview.jobId?.title || "Unknown Position"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {interview.jobId?.company?.name || ""}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(interview.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      interview.status === "Scheduled" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {interview.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {interview.status === "Scheduled" ? (
                      <Link
                        to={`/interview/${interview.interviewId}`}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm mr-2"
                      >
                        Join Interview
                      </Link>
                    ) : (
                      <Link
                        to={`/interview/results/${interview._id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      >
                        View Results
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(interview.interviewLink);
                        alert("Interview link copied to clipboard!");
                      }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs py-1 px-2 rounded ml-2"
                    >
                      Copy Link
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecruiterInterviewDashboard;