import React, { useEffect, useState } from "react";
import { getMyJobs, deleteJobPost } from "../services/jobService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FiEdit, FiTrash2, FiPlus, FiUsers, FiClock, FiMapPin, FiDollarSign, FiBriefcase } from "react-icons/fi";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await getMyJobs();
      setJobs(response.data.posts);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load jobs");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJobPost(id);
      toast.success("Job deleted successfully!");
      fetchJobs();
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleViewApplicants = (id) => {
    navigate(`/allapplication`);
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-blue-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Job Postings</h1>
          <button
            onClick={() => navigate("/post")}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-medium flex items-center"
          >
            <FiPlus className="mr-2" /> Create Job Post
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 text-center">
            <h3 className="text-xl mb-4">No job postings found</h3>
            <p className="text-gray-300 mb-6">Start recruiting top talent by creating your first job posting</p>
            <button
              onClick={() => navigate("/post")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium inline-flex items-center"
            >
              <FiPlus className="mr-2" /> Create Job Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <div 
                key={job._id} 
                className="bg-gray-800 bg-opacity-50 rounded-lg overflow-hidden transform transition-transform hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                      <p className="text-gray-300 text-sm mb-2">{job.companyName || "Your Company"}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-xs flex items-center">
                          <FiBriefcase className="mr-1" /> {job.jobType || "Full-time"}
                        </span>
                        <span className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-xs flex items-center">
                          <FiMapPin className="mr-1" /> {job.location.city || "Remote"}
                        </span>
                        {job.salary && (
                          <span className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-xs flex items-center">
                            <FiDollarSign className="mr-1" /> {job.salary}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs flex items-center">
                        <FiClock className="mr-1" /> {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 overflow-hidden text-ellipsis line-clamp-2">
                    {job.description ? job.description.substring(0, 150) : ""}
                    {job.description && job.description.length > 150 ? "..." : ""}
                  </p>
                  
                  <div className="border-t border-gray-700 pt-4 mt-2 flex justify-between">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(job._id)}
                        className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded flex items-center text-sm"
                      >
                        <FiEdit className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="bg-red-900 hover:bg-red-800 px-3 py-2 rounded flex items-center text-sm"
                      >
                        <FiTrash2 className="mr-1" /> Delete
                      </button>
                    </div>
                    <button
                      onClick={() => handleViewApplicants(job._id)}
                      className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded flex items-center text-sm"
                    >
                      <FiUsers className="mr-1" /> 
                      View Applicants {job.applicantsCount ? `(${job.applicantsCount})` : ""}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;