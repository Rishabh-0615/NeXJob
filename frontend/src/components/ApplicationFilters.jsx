import React from "react";

const ApplicationFilters = ({ currentStatus, onStatusChange }) => {
  const statuses = ["", "Applied", "Shortlisted", "Interview", "Hired", "Rejected"];
  
  return (
    <div className="flex flex-wrap gap-2">
      <div className="font-medium text-gray-700 mr-2">Filter by status:</div>
      {statuses.map(status => (
        <button
          key={status || "all"}
          onClick={() => onStatusChange(status)}
          className={`px-3 py-1 rounded-full text-sm ${
            currentStatus === status
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          {status || "All"}
        </button>
      ))}
    </div>
  );
};

export default ApplicationFilters;

