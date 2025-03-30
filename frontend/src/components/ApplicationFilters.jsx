import React from "react";
import { Filter } from "lucide-react";

const ApplicationFilters = ({ currentStatus, onStatusChange }) => {
  const statuses = ["", "Applied", "Shortlisted", "Interview", "Hired", "Rejected"];
  
  // Function to get appropriate color classes based on status
  const getStatusClasses = (status, isSelected) => {
    if (isSelected) {
      const selectedClasses = {
        "": "bg-blue-600 text-white border-blue-500",
        "Applied": "bg-indigo-900 text-indigo-300 border-indigo-700",
        "Shortlisted": "bg-blue-900 text-blue-300 border-blue-700",
        "Interview": "bg-cyan-900 text-cyan-300 border-cyan-700",
        "Hired": "bg-green-900 text-green-300 border-green-700", 
        "Rejected": "bg-red-900 text-red-300 border-red-700"
      };
      return selectedClasses[status];
    } else {
      return "bg-neutral-800 text-neutral-400 border-neutral-700 hover:bg-neutral-700 hover:text-neutral-300";
    }
  };

  return (
    <div className="mb-6 p-4 bg-neutral-800/50 border border-neutral-700 rounded-xl">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center text-neutral-400 text-sm">
          <Filter size={16} className="mr-2" />
          <span>Filter by status:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {statuses.map(status => (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-3 py-1 text-xs font-medium border rounded-full transition-colors duration-150 ${
                getStatusClasses(status, currentStatus === status)
              }`}
            >
              {status || "All"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationFilters;