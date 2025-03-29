import React, { useContext, useState, useEffect } from "react";
import { JobApplicationContext } from "../context/JobApplicationContext";
import JobApplicationsList from "../components/JobApplicationsList";
import ApplicationFilters from "../components/ApplicationFilters";
import StatsSummary from "../components/SummaryStat";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const JobApplicationsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: "" });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`/api/application/jobapplicants/${jobId}`);
        setApplications(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  const setStatusFilter = (status) => {
    setFilters((prevFilters) => ({ ...prevFilters, status }));
  };

  const filteredApplications = applications.filter(app =>
    (!searchTerm ||
      app.applicant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicant?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.job?.title?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!filters.status || app.status === filters.status)
  );

  // Calculate statistics
  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === "Applied").length,
    shortlisted: applications.filter(app => app.status === "Shortlisted").length,
    interview: applications.filter(app => app.status === "Interview").length,
    hired: applications.filter(app => app.status === "Hired").length,
    rejected: applications.filter(app => app.status === "Rejected").length
  };

  const handleRowClick = (applicationId) => {
    navigate(`/allapplication/${applicationId}`);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <strong className="font-bold">Error! </strong>
      <span className="block sm:inline">{error}</span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>
          <div className="mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <StatsSummary stats={stats} />
        
        <div className="my-6">
          <ApplicationFilters 
            currentStatus={filters.status} 
            onStatusChange={setStatusFilter} 
          />
        </div>

        <JobApplicationsList 
          applications={filteredApplications} 
          onRowClick={handleRowClick} 
        />
      </div>
    </div>
  );
};

export default JobApplicationsPage;
