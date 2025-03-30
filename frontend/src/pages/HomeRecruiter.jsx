import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CircleCheckBig,
  XCircle,
  Clock,
  CalendarDays,
  Users,
  Filter,
  Search,
  ArrowLeft,
  ArrowRight,
  Briefcase,
} from "lucide-react";

const HomeRecruiter = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState("all");
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [loadingJobDetails, setLoadingJobDetails] = useState(false);
  const itemsPerPage = 10;

  // Fetch recruiter's jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/application/recruiter");
        setJobs(response.data);
        if (response.data.length > 0) {
          setSelectedJobId(response.data[0]._id);
        }
      } catch (err) {
        setError(
          "Failed to fetch jobs: " +
            (err.response?.data?.message || err.message)
        );
      }
    };

    fetchJobs();
  }, []);

  // Fetch applications based on current view
  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        let response;

        if (currentView === "all") {
          // Using the new endpoint for getting all applications
          response = await axios.get("/api/application/getall");
        } else {
          // Keep existing status-based filtering
          response = await axios.get(
            `/api/application/getStatus/${currentView}`
          );
        }

        setApplications(response.data);
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.message;
        setError(`Failed to fetch applications: ${errorMsg}`);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [currentView]);

  // Fetch application details when selecting an application
  const fetchApplicationDetails = async (id) => {
    setLoadingJobDetails(true);
    try {
      const response = await axios.get(
        `/api/application/jobapplicantsId/${id}`
      );
      setSelectedApp(response.data);
    } catch (err) {
      setError(
        "Failed to fetch application details: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoadingJobDetails(false);
    }
  };

  // Filter applications based on selected job and search term
  const jobFilteredApplications = selectedJobId
    ? applications.filter((app) => app.job._id === selectedJobId)
    : applications;

  const filteredApplications = jobFilteredApplications.filter(
    (app) =>
      app.applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const currentItems = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle status update
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`/api/application/status/${id}`, { status: newStatus });

      // Update UI after successful API call
      setApplications((apps) =>
        apps.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        )
      );

      if (selectedApp && selectedApp._id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus });
      }
    } catch (err) {
      setError(
        "Failed to update status: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      shortlisted: "bg-blue-100 text-blue-800",
      rejected: "bg-red-100 text-red-800",
      hired: "bg-green-100 text-green-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          styles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r flex-shrink-0 p-4">
          <h2 className="text-lg font-medium mb-4">Filter Applications</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Job
            </label>
            <select
              value={selectedJobId}
              onChange={(e) => {
                setSelectedJobId(e.target.value);
                setSelectedApp(null);
                setCurrentPage(1);
              }}
              className="w-full p-2 border rounded-md"
            >
              <option value="">All Jobs</option>
              {jobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-3 border-t">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => {
                    setCurrentView("all");
                    setSelectedApp(null);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    currentView === "all"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Filter size={18} className="mr-2" />
                  All Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView("pending");
                    setSelectedApp(null);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    currentView === "pending"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Clock size={18} className="mr-2 text-yellow-500" />
                  Pending
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView("shortlisted");
                    setSelectedApp(null);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    currentView === "shortlisted"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <Users size={18} className="mr-2 text-blue-500" />
                  Shortlisted
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView("hired");
                    setSelectedApp(null);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    currentView === "hired"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <CircleCheckBig size={18} className="mr-2 text-green-500" />
                  Hired
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView("rejected");
                    setSelectedApp(null);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center ${
                    currentView === "rejected"
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <XCircle size={18} className="mr-2 text-red-500" />
                  Rejected
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search bar */}
          <div className="bg-white p-4 border-b flex">
            <div className="relative flex-1 max-w-3xl">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by name, email, or job title..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex">
            {/* Applications list */}
            <div
              className={`${
                selectedApp ? "w-1/2" : "w-full"
              } border-r overflow-y-auto`}
            >
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  Loading applications...
                </div>
              ) : error ? (
                <div className="text-red-500 text-center p-4">{error}</div>
              ) : currentItems.length === 0 ? (
                <div className="text-center p-8 text-gray-500">
                  No applications found
                </div>
              ) : (
                <>
                  <ul className="divide-y">
                    {currentItems.map((app) => (
                      <li
                        key={app._id}
                        onClick={() => fetchApplicationDetails(app._id)}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${
                          selectedApp && selectedApp._id === app._id
                            ? "bg-blue-50"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h3 className="font-medium text-gray-900">
                                {app.applicant.name}
                              </h3>
                              <span className="ml-2 text-gray-500">·</span>
                              <span className="ml-2 text-sm text-gray-500">
                                {app.applicant.email}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Applied for:{" "}
                              <span className="font-medium">
                                {app.job.title}
                              </span>
                            </p>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <CalendarDays size={14} className="mr-1" />
                              Applied {formatDate(app.appliedAt)}
                            </div>
                          </div>
                          <StatusBadge status={app.status} />
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Pagination */}
                  {filteredApplications.length > 0 && (
                    <div className="flex justify-between items-center p-4 border-t">
                      <div className="text-sm text-gray-600">
                        Showing{" "}
                        {Math.min(
                          (currentPage - 1) * itemsPerPage + 1,
                          filteredApplications.length
                        )}{" "}
                        to{" "}
                        {Math.min(
                          currentPage * itemsPerPage,
                          filteredApplications.length
                        )}{" "}
                        of {filteredApplications.length}
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.max(1, p - 1))
                          }
                          disabled={currentPage === 1}
                          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                        >
                          <ArrowLeft size={16} />
                        </button>
                        <button
                          onClick={() =>
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
                          }
                          disabled={currentPage === totalPages}
                          className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                        >
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Application details */}
            {selectedApp && (
              <div className="w-1/2 overflow-y-auto p-6">
                {loadingJobDetails ? (
                  <div className="flex justify-center items-center h-64">
                    Loading application details...
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <h2 className="text-xl font-bold">
                        {selectedApp.applicant.name}
                      </h2>
                      <div>
                        <button
                          onClick={() => setSelectedApp(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <XCircle size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">
                          Application Details
                        </h3>
                        <StatusBadge status={selectedApp.status} />
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Role
                          </p>
                          <p className="mt-1">{selectedApp.job.title}</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Applied on
                          </p>
                          <p className="mt-1">
                            {formatDate(selectedApp.appliedAt)}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            ATS Score
                          </p>
                          <div className="mt-1 flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{
                                  width: `${selectedApp.atsScore || 0}%`,
                                }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm font-medium text-gray-700">
                              {selectedApp.atsScore || 0}%
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 border-t">
                          <p className="text-sm font-medium text-gray-500">
                            Contact Information
                          </p>
                          <p className="mt-1">{selectedApp.applicant.email}</p>
                          <p className="mt-1">{selectedApp.applicant.phone}</p>
                        </div>
                      </div>
                    </div>

                    {selectedApp.coverLetter && (
                      <div className="bg-white rounded-lg shadow-sm border mb-6">
                        <div className="p-4 border-b">
                          <h3 className="text-lg font-medium">Cover Letter</h3>
                        </div>
                        <div className="p-4">
                          <p className="text-gray-600">
                            {selectedApp.coverLetter}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedApp.resumeUrl && (
                      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Resume</h3>
                          <a
                            href={selectedApp.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <Briefcase size={16} className="mr-1" />
                            Download
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
                      <h3 className="text-lg font-medium mb-4">
                        Update Status
                      </h3>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() =>
                            updateStatus(selectedApp._id, "pending")
                          }
                          className={`flex items-center justify-center p-3 rounded-md ${
                            selectedApp.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 border-2 border-yellow-300"
                              : "border hover:bg-gray-50"
                          }`}
                        >
                          <Clock size={18} className="mr-2 text-yellow-500" />
                          Pending
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(selectedApp._id, "shortlisted")
                          }
                          className={`flex items-center justify-center p-3 rounded-md ${
                            selectedApp.status === "shortlisted"
                              ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                              : "border hover:bg-gray-50"
                          }`}
                        >
                          <Users size={18} className="mr-2 text-blue-500" />
                          Shortlist
                        </button>

                        <button
                          onClick={() => updateStatus(selectedApp._id, "hired")}
                          className={`flex items-center justify-center p-3 rounded-md ${
                            selectedApp.status === "hired"
                              ? "bg-green-100 text-green-800 border-2 border-green-300"
                              : "border hover:bg-gray-50"
                          }`}
                        >
                          <CircleCheckBig
                            size={18}
                            className="mr-2 text-green-500"
                          />
                          Hire
                        </button>

                        <button
                          onClick={() =>
                            updateStatus(selectedApp._id, "rejected")
                          }
                          className={`flex items-center justify-center p-3 rounded-md ${
                            selectedApp.status === "rejected"
                              ? "bg-red-100 text-red-800 border-2 border-red-300"
                              : "border hover:bg-gray-50"
                          }`}
                        >
                          <XCircle size={18} className="mr-2 text-red-500" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeRecruiter;
