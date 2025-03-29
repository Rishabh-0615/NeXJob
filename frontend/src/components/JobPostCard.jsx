import React from "react";
import { useNavigate } from "react-router-dom";

const jobPostCard = ({ jobPost  }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-bold">{jobPost.title}</h3>
      <p className="text-gray-600">{jobPost.industry} - {jobPost.jobPostType}</p>
      <p className="text-gray-600">{jobPost.location.type} - {jobPost.location.city}, {jobPost.location.country}</p>
      <p className="text-gray-600">Status: {jobPost.status}</p>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => navigate(`/jobpost/${jobPost._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default jobPostCard;
