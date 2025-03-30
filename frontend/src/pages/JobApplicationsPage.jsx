import React, { useContext, useState } from "react";
import { JobApplicationContext } from "../context/JobApplicationContext";
import JobApplicationsList from "../components/JobApplicationsList";
import ApplicationFilters from "../components/ApplicationFilters";
import StatsSummary from "../components/SummaryStat";
import { useNavigate } from "react-router-dom";
import { Search, AlertCircle, Briefcase } from 'lucide-react';

const JobApplicationsPage = () => {
  const {
    applications,
    allApplications,
    loading,
    error,
    filters,
    setStatusFilter
  } = useContext(JobApplicationContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredApplications = searchTerm
    ? applications.filter(app =>
        app.applicant?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.applicant?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.job?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : applications;

  // Calculate statistics
  const stats = {
    total: allApplications.length,
    applied: allApplications.filter(app => app.status === "Applied").length,
    shortlisted: allApplications.filter(app => app.status === "Shortlisted").length,
    interview: allApplications.filter(app => app.status === "Interview").length,
    hired: allApplications.filter(app => app.status === "Hired").length,
    rejected: allApplications.filter(app => app.status === "Rejected").length
  };

  const handleRowClick = (applicationId) => {
    navigate(`/allapplication/${applicationId}`);
  };

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
      
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden max-w-6xl w-full relative z-10 backdrop-blur-sm backdrop-filter">
        {/* Brand header */}
        <div className="relative px-8 pt-10 pb-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-10 rounded-bl-full"></div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
            NeX<span className="text-white">Job</span>
          </h1>
          <p className="text-neutral-400 mt-2 text-sm">The next generation job portal</p>
          
          <h2 className="text-2xl font-bold text-white mt-6">Your Applications</h2>
          <p className="text-neutral-400 text-sm">Track and manage your job opportunities</p>
        </div>
        
        <div className="px-8 pb-8 space-y-6">
          {error && (
            <div className="bg-red-900/20 border border-red-800/50 text-red-400 px-4 py-3 rounded-lg flex items-center text-sm">
              <AlertCircle size={16} className="mr-2 flex-shrink-0" />
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center">
                <svg className="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="mt-3 text-neutral-400">Loading your applications...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative group w-full md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-neutral-500 group-focus-within:text-indigo-400 transition-colors duration-200" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="bg-neutral-800/50 rounded-xl p-6 border border-neutral-700">
                <h3 className="text-lg font-semibold text-white mb-4">Application Summary</h3>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                  <div className="bg-neutral-800 p-4 rounded-lg border border-neutral-700">
                    <p className="text-neutral-400 text-sm">Total</p>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                  </div>
                  <div className="bg-indigo-900/30 p-4 rounded-lg border border-indigo-800/30">
                    <p className="text-indigo-300 text-sm">Applied</p>
                    <p className="text-2xl font-bold text-white">{stats.applied}</p>
                  </div>
                  <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-800/30">
                    <p className="text-blue-300 text-sm">Shortlisted</p>
                    <p className="text-2xl font-bold text-white">{stats.shortlisted}</p>
                  </div>
                  <div className="bg-cyan-900/30 p-4 rounded-lg border border-cyan-800/30">
                    <p className="text-cyan-300 text-sm">Interview</p>
                    <p className="text-2xl font-bold text-white">{stats.interview}</p>
                  </div>
                  <div className="bg-green-900/30 p-4 rounded-lg border border-green-800/30">
                    <p className="text-green-300 text-sm">Hired</p>
                    <p className="text-2xl font-bold text-white">{stats.hired}</p>
                  </div>
                  <div className="bg-red-900/30 p-4 rounded-lg border border-red-800/30">
                    <p className="text-red-300 text-sm">Rejected</p>
                    <p className="text-2xl font-bold text-white">{stats.rejected}</p>
                  </div>
                </div>
              </div>
              
              <div className="my-6">
                <h3 className="text-lg font-semibold text-white mb-4">Filter Applications</h3>
                <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700">
                  <ApplicationFilters
                    currentStatus={filters.status}
                    onStatusChange={setStatusFilter}
                  />
                </div>
              </div>
              
              <div className="bg-neutral-800/50 rounded-xl overflow-hidden border border-neutral-700">
                <div className="p-4 border-b border-neutral-700">
                  <h3 className="text-lg font-semibold text-white">Applications List</h3>
                </div>
                {filteredApplications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    <Briefcase size={48} className="text-neutral-600 mb-4" />
                    <h4 className="text-xl font-medium text-white mb-2">No applications found</h4>
                    <p className="text-neutral-400 max-w-md">
                      {searchTerm ? "Try adjusting your search query or filters" : "Start applying to jobs to see your applications here"}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <JobApplicationsList
                      applications={filteredApplications}
                      onRowClick={handleRowClick}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationsPage;