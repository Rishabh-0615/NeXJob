import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold">{job.title}</h3>
      <p className="text-gray-600">{job.industry} - {job.jobType}</p>
      <p className="text-gray-600">{job.location.type} - {job.location.city}, {job.location.country}</p>
      <p className="text-gray-600">Status: {job.status}</p>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => navigate(`/edit/${job._id}`)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => onDelete(job._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
