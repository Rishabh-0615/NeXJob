import React from "react";
import { User, Briefcase, Calendar, Clock } from 'lucide-react';

const JobApplicationsList = ({ applications, onRowClick }) => {
  if (!applications || applications.length === 0) {
    return (
      <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-8 text-center">
        <p className="text-neutral-400">No applications found.</p>
      </div>
    );
  }

  const getStatusBadgeClass = (status) => {
    const baseClasses = "px-3 py-1 inline-flex text-xs font-medium rounded-full border";
    const statusClasses = {
      "Applied": "bg-indigo-900/50 text-indigo-300 border-indigo-800/50",
      "Shortlisted": "bg-blue-900/50 text-blue-300 border-blue-800/50",
      "Interview": "bg-cyan-900/50 text-cyan-300 border-cyan-800/50",
      "Hired": "bg-green-900/50 text-green-300 border-green-800/50",
      "Rejected": "bg-red-900/50 text-red-300 border-red-800/50"
    };
    
    return `${baseClasses} ${statusClasses[status] || "bg-neutral-800 text-neutral-300 border-neutral-700"}`;
  };

  // Format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-700">
        <thead className="bg-neutral-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Applicant
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Job
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Applied Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-700">
          {applications.map((app) => (
            <tr
              key={app._id}
              onClick={() => onRowClick(app._id)}
              className="hover:bg-neutral-800/70 cursor-pointer transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-white">
                      {app.applicant?.name || "N/A"}
                    </div>
                    <div className="text-sm text-neutral-400">
                      {app.applicant?.email || "N/A"}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-start">
                  <Briefcase size={16} className="text-neutral-500 mr-2 mt-0.5" />
                  <div>
                    <div className="text-sm text-white">{app.job?.title || "Unknown Job"}</div>
                    <div className="text-xs text-neutral-400">{app.job?.company?.name || "Unknown Company"}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-start">
                  <Calendar size={16} className="text-neutral-500 mr-2 mt-0.5" />
                  <div>
                    <div className="text-sm text-white">
                      {formatDate(app.appliedAt)}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {formatTime(app.appliedAt)}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={getStatusBadgeClass(app.status)}>
                  {app.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobApplicationsList;