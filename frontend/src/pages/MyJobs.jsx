import React, { useEffect, useState } from "react";
import { getMyJobs, deleteJobPost } from "../services/jobService";
import JobCard from "../components/JobCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getMyJobs();
      setJobs(response.data.posts);
    } catch (error) {
      toast.error("Failed to load jobs");
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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Job Posts</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => navigate("/post")}
      >
        + Create Job Post
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default MyJobs;
