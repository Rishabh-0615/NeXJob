import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiExternalLink, FiTrash2, FiRefreshCw, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/api/application/getapplications");
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching applications", error);
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleWithdraw = async (applicationId) => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      try {
        await axios.delete(`/api/application/withdraw/${applicationId}`);
        setApplications((prev) => prev.filter((app) => app._id !== applicationId));
      } catch (error) {
        console.error("Error withdrawing application", error);
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "Applied":
        return <FiClock className="text-yellow-500" />;
      case "reviewing":
        return <FiRefreshCw className="text-blue-500" />;
      case "accepted":
        return <FiCheckCircle className="text-green-500" />;
      case "rejected":
        return <FiXCircle className="text-red-500" />;
      default:
        return <FiClock className="text-gray-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewing":
        return "bg-blue-100 text-blue-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filter === "Applied") return true;
    return app.status.toLowerCase() === filter.toLowerCase(); 
  });

  return (
    <div className="bg-gradient-to-b from-gray-900 to-blue-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Applications</h1>
          <div className="flex space-x-2">
            <button 
              onClick={() => setFilter("Applied")} 
              className={`px-4 py-2 rounded-full ${filter === "Applied" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
            >
              Applied
            </button>
            <button 
              onClick={() => setFilter("Shortlisted")} 
              className={`px-4 py-2 rounded-full ${filter === "Shortlisted" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
            >
              Shortlisted
            </button>
            <button 
              onClick={() => setFilter("Interview")} 
              className={`px-4 py-2 rounded-full ${filter === "Interview" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
            >
              Interview
            </button>
            <button 
              onClick={() => setFilter("Hired")} 
              className={`px-4 py-2 rounded-full ${filter === "Hired" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
            >
              Accepted
            </button>
            <button 
              onClick={() => setFilter("Rejected")} 
              className={`px-4 py-2 rounded-full ${filter === "Rejected" ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
            >
              Rejected
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div>
            {filteredApplications.length === 0 ? (
              <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 text-center">
                <p className="text-xl mb-4">No applications found</p>
                <Link to="/alljobs" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium">
                  Browse Jobs
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredApplications.map((application) => (
                  <div key={application._id} className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{application.job.title}</h3>
                          <p className="text-gray-300 text-sm">{application.job.companyName}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${getStatusClass(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1">{application.status}</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-gray-300 text-sm">
                          <span className="font-medium">Applied on:</span> {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-300 text-sm">
                          <span className="font-medium">Location:</span> {application.job.location}
                        </p>
                      </div>
                      <div className="flex justify-between pt-4 border-t border-gray-700">
                        <button
                          onClick={() => handleWithdraw(application._id)}
                          className="text-red-400 hover:text-red-300 flex items-center text-sm"
                        >
                          <FiTrash2 className="mr-1" /> Withdraw
                        </button>
                        <Link
                          to={`/application/${application._id}`}
                          className="text-blue-400 hover:text-blue-300 flex items-center text-sm"
                        >
                          View Details <FiExternalLink className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplicationsPage;